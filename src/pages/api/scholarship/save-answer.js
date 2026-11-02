import mongoose from 'mongoose';
import dbConnect from '../../../backend/lib/mongodb.js';
import ScholarshipQuestion from '../../../backend/models/ScholarshipQuestion.js';
import TestSession from '../../../backend/models/TestSession.js';
import { setNoCacheHeaders } from '../../../backend/lib/apiSecurity.js';
import { authorizeScholarshipRequest } from '../../../backend/lib/scholarshipAuth.js';

export default async function handler(req, res) {
    setNoCacheHeaders(res);
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { sessionId, questionId, answer, markedForReview } = req.body || {};

        if (!sessionId || !questionId) {
            return res.status(400).json({
                success: false,
                message: 'Session ID and Question ID are required',
            });
        }

        if (!mongoose.Types.ObjectId.isValid(String(sessionId))) {
            return res.status(404).json({
                success: false,
                message: 'Examination session not found',
            });
        }

        await dbConnect();

        const testSession = await TestSession.findById(sessionId);
        if (!testSession) {
            return res.status(404).json({
                success: false,
                message: 'Examination session not found',
            });
        }

        // Enforce strict session ownership (401 if unauthenticated/expired, 403 if wrong student)
        const auth = authorizeScholarshipRequest(req, {
            expectedApplicationNumber: testSession.registrationToken,
            expectedStudentRef: testSession.studentReferenceId || (testSession.studentId ? String(testSession.studentId) : null),
            expectedSessionId: String(testSession._id),
        });
        if (!auth.ok) {
            return res.status(auth.statusCode).json({
                success: false,
                reason: auth.reason,
                message: auth.message,
            });
        }

        if (testSession.status !== 'in_progress') {
            return res.status(400).json({
                success: false,
                message: `Cannot modify answer. Examination is ${testSession.status}.`,
            });
        }

        // Authoritative server-side deadline check
        const startTime = new Date(testSession.startTime);
        const endTime = new Date(startTime.getTime() + (testSession.duration * 60 * 1000));

        if (new Date() > endTime) {
            testSession.status = 'expired';
            await testSession.save();
            return res.status(400).json({
                success: false,
                testExpired: true,
                message: 'Examination time has expired',
            });
        }

        const sessionQuestion = testSession.questions.find(
            (q) => q.questionId.toString() === questionId.toString()
        );

        if (!sessionQuestion) {
            return res.status(400).json({
                success: false,
                message: 'This question does not belong to your examination paper',
            });
        }

        if (markedForReview !== undefined) {
            sessionQuestion.markedForReview = Boolean(markedForReview);
        }

        if (answer !== undefined) {
            const validAnswer = answer && ['A', 'B', 'C', 'D'].includes(answer) ? answer : null;

            let correctAnswer = sessionQuestion.snapshot?.correctAnswer;
            let questionSubject = sessionQuestion.snapshot?.subject || sessionQuestion.subject;

            if (!correctAnswer) {
                const question = await ScholarshipQuestion.findById(questionId);
                if (question) {
                    correctAnswer = question.correctAnswer;
                    questionSubject = question.subject;
                } else {
                    return res.status(404).json({
                        success: false,
                        message: 'Question not found in question bank',
                    });
                }
            }

            let isCorrect = false;
            let originalSelected = validAnswer;
            if (validAnswer && correctAnswer) {
                if (Array.isArray(sessionQuestion.shuffledOptions) && sessionQuestion.shuffledOptions.length === 4) {
                    const match = sessionQuestion.shuffledOptions.find((o) => o.displayLabel === validAnswer);
                    if (match) {
                        originalSelected = match.originalLabel;
                    }
                }
                isCorrect = originalSelected === correctAnswer;
            }

            const existingAnswerIndex = testSession.answers.findIndex(
                (a) => a.questionId.toString() === questionId.toString()
            );

            const answerData = {
                questionId,
                subject: questionSubject || sessionQuestion.subject,
                selectedAnswer: validAnswer,
                originalSelectedAnswer: originalSelected,
                isCorrect,
                isMarkedForReview: Boolean(sessionQuestion.markedForReview),
                timeTaken: 0,
            };

            if (existingAnswerIndex >= 0) {
                testSession.answers[existingAnswerIndex] = answerData;
            } else {
                testSession.answers.push(answerData);
            }
        }

        await testSession.save();

        const answeredCount = testSession.answers.filter(
            (a) => a.selectedAnswer !== null && a.selectedAnswer !== ''
        ).length;
        const markedCount = testSession.questions.filter((q) => q.markedForReview).length;

        // Never expose `isCorrect` or `correctAnswer` to the client during an active exam
        return res.status(200).json({
            success: true,
            message: 'Answer updated successfully',
            data: {
                questionId,
                selectedAnswer: answer !== undefined ? (answer && ['A', 'B', 'C', 'D'].includes(answer) ? answer : null) : undefined,
                markedForReview: sessionQuestion.markedForReview,
                answeredCount,
                markedCount,
            },
        });
    } catch (error) {
        console.error('[Scholarship Save Answer Error]:', error?.name || 'Error');
        return res.status(500).json({
            success: false,
            message: 'Failed to save answer',
        });
    }
}
