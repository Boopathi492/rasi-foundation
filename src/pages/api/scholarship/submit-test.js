import dbConnect from '@/lib/mongodb';
import ScholarshipStudent from '@/models/ScholarshipStudent';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import TestSession from '@/models/TestSession';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: 'Session ID is required',
            });
        }

        // Find test session
        const testSession = await TestSession.findById(sessionId);

        if (!testSession) {
            return res.status(404).json({
                success: false,
                message: 'Examination session not found',
            });
        }

        // If already submitted, return current result idempotently
        if (testSession.status === 'completed') {
            const subjectScores = [];
            testSession.subjects.forEach(subject => {
                const subjectQuestions = testSession.questions.filter(q => q.subject === subject).length || 20;
                const correctCount = testSession.subjectWiseScore?.[subject] || 0;
                subjectScores.push({
                    subject,
                    correct: correctCount,
                    total: subjectQuestions,
                    percentage: subjectQuestions > 0 ? Math.round((correctCount / subjectQuestions) * 100) : 0,
                });
            });

            return res.status(200).json({
                success: true,
                message: 'Examination already submitted',
                data: {
                    sessionId: testSession._id,
                    totalQuestions: testSession.totalQuestions || 60,
                    attemptedQuestions: testSession.attemptedQuestions,
                    unattemptedQuestions: testSession.unattemptedQuestions || ((testSession.totalQuestions || 60) - testSession.attemptedQuestions),
                    correctAnswers: testSession.correctAnswers,
                    wrongAnswers: testSession.wrongAnswers || (testSession.attemptedQuestions - testSession.correctAnswers),
                    score: testSession.score,
                    percentage: testSession.percentage || Math.round((testSession.score / (testSession.totalQuestions || 60)) * 100),
                    subjectWiseScores: subjectScores,
                    timeTaken: {
                        start: testSession.startTime,
                        end: testSession.endTime,
                        durationMinutes: Math.round(((testSession.endTime || new Date()) - testSession.startTime) / 60000),
                    },
                },
            });
        }

        // Authoritative re-evaluation of all answers against immutable session snapshots
        const needsDbLookup = testSession.questions.some(q => !q.snapshot || !q.snapshot.correctAnswer);
        let questionMap = new Map();

        if (needsDbLookup) {
            const questionIds = testSession.questions.map(q => q.questionId).filter(Boolean);
            const questionsInDb = await ScholarshipQuestion.find({ _id: { $in: questionIds } });
            questionMap = new Map(questionsInDb.map(q => [q._id.toString(), q]));
        }

        let calculatedScore = 0;
        let calculatedCorrect = 0;
        let calculatedAttempted = 0;
        const subjectWiseMap = {};

        testSession.subjects.forEach(s => {
            subjectWiseMap[s] = 0;
        });

        testSession.answers.forEach(ans => {
            if (ans.selectedAnswer) {
                calculatedAttempted++;
                const sessionQ = testSession.questions.find(sq => sq.questionId.toString() === ans.questionId.toString());
                const snap = sessionQ?.snapshot && sessionQ.snapshot.correctAnswer ? sessionQ.snapshot : null;
                const dbQ = questionMap.get(ans.questionId.toString());
                const targetQ = snap || dbQ;

                if (targetQ) {
                    let originalSelected = ans.selectedAnswer;
                    if (sessionQ && Array.isArray(sessionQ.shuffledOptions) && sessionQ.shuffledOptions.length === 4) {
                        const perm = sessionQ.shuffledOptions.find(o => o.displayLabel === ans.selectedAnswer);
                        if (perm) {
                            originalSelected = perm.originalLabel;
                        }
                    }

                    const isCorrect = originalSelected === targetQ.correctAnswer;
                    ans.isCorrect = isCorrect;

                    if (isCorrect) {
                        calculatedCorrect++;
                        calculatedScore += (targetQ.marks || testSession.configSnapshot?.marksPerQuestion || 1);
                        const sub = ans.subject || targetQ.subject || sessionQ?.subject;
                        subjectWiseMap[sub] = (subjectWiseMap[sub] || 0) + 1;
                    } else if (ans.selectedAnswer && (targetQ.negativeMarks || testSession.configSnapshot?.negativeMarking)) {
                        const penalty = targetQ.negativeMarks || testSession.configSnapshot?.negativeMarking || 0;
                        calculatedScore = Math.max(0, calculatedScore - penalty);
                    }
                }
            } else {
                ans.isCorrect = false;
            }
        });

        const totalQ = testSession.totalQuestions || testSession.questions.length || 60;
        const calculatedUnattempted = Math.max(0, totalQ - calculatedAttempted);
        const calculatedWrong = Math.max(0, calculatedAttempted - calculatedCorrect);
        const calculatedPercentage = totalQ > 0 ? Math.round((calculatedScore / totalQ) * 100) : 0;

        // Mark test as completed
        testSession.status = 'completed';
        testSession.endTime = new Date();
        testSession.score = calculatedScore;
        testSession.correctAnswers = calculatedCorrect;
        testSession.attemptedQuestions = calculatedAttempted;
        testSession.unattemptedQuestions = calculatedUnattempted;
        testSession.wrongAnswers = calculatedWrong;
        testSession.percentage = calculatedPercentage;
        testSession.subjectWiseScore = subjectWiseMap;

        await testSession.save();

        // Update student record
        await ScholarshipStudent.findByIdAndUpdate(testSession.studentId, {
            testStatus: 'completed',
            testEndTime: new Date(),
            testScore: calculatedScore,
        });

        // Prepare subject scores
        const subjectScores = [];
        testSession.subjects.forEach(subject => {
            const subjectQuestions = testSession.questions.filter(q => q.subject === subject).length || 20;
            const correctCount = subjectWiseMap[subject] || 0;
            subjectScores.push({
                subject,
                correct: correctCount,
                total: subjectQuestions,
                percentage: subjectQuestions > 0 ? Math.round((correctCount / subjectQuestions) * 100) : 0,
            });
        });

        res.status(200).json({
            success: true,
            message: 'Examination submitted successfully!',
            data: {
                sessionId: testSession._id,
                totalQuestions: totalQ,
                attemptedQuestions: calculatedAttempted,
                unattemptedQuestions: calculatedUnattempted,
                correctAnswers: calculatedCorrect,
                wrongAnswers: calculatedWrong,
                score: calculatedScore,
                percentage: calculatedPercentage,
                subjectWiseScores: subjectScores,
                timeTaken: {
                    start: testSession.startTime,
                    end: testSession.endTime,
                    durationMinutes: Math.round((testSession.endTime - testSession.startTime) / 60000),
                },
            },
        });

    } catch (error) {
        console.error('Submit test error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit examination',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
