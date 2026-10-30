import dbConnect from '@/lib/mongodb';
import TestSession from '@/models/TestSession';
import ScholarshipStudent from '@/models/ScholarshipStudent';
import ScholarshipExamFeedback from '@/backend/models/ScholarshipExamFeedback';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const {
                sessionId,
                rating,
                difficultyRating,
                clarityRating,
                portalRating,
                comments,
                language = 'English',
            } = req.body;

            if (!sessionId) {
                return res.status(400).json({
                    success: false,
                    message: 'Session ID is required',
                });
            }

            const testSession = await TestSession.findById(sessionId);
            if (!testSession) {
                return res.status(404).json({
                    success: false,
                    message: 'Examination session not found',
                });
            }

            if (testSession.status !== 'completed') {
                return res.status(400).json({
                    success: false,
                    message: 'Feedback can only be submitted after completing the examination',
                });
            }

            // Check if feedback already submitted
            const existingFeedback = await ScholarshipExamFeedback.findOne({ testSessionId: testSession._id });
            if (existingFeedback || testSession.feedbackSubmitted) {
                return res.status(400).json({
                    success: false,
                    message: 'Feedback has already been submitted for this examination',
                });
            }

            // Normalize ratings to schema expectations
            const normOverall = Number(req.body.overallRating || req.body.rating) || 5;
            const normUi = Number(req.body.uiRating || req.body.portalRating) || 5;
            
            let normClarity = 5;
            if (typeof req.body.clarityRating === 'number') {
                normClarity = req.body.clarityRating;
            } else if (req.body.clarityRating === 'Fair') {
                normClarity = 3;
            } else if (req.body.clarityRating === 'Unclear') {
                normClarity = 1;
            }

            let normDifficulty = 'moderate';
            const rawDiff = String(req.body.difficultyRating || '').toLowerCase();
            if (rawDiff.includes('easy')) normDifficulty = 'easy';
            else if (rawDiff.includes('hard') || rawDiff.includes('challenging')) normDifficulty = 'challenging';
            else normDifficulty = 'moderate';

            const student = await ScholarshipStudent.findById(testSession.studentId);

            // Create feedback document
            const feedback = await ScholarshipExamFeedback.create({
                testSessionId: testSession._id,
                studentId: testSession.studentId,
                registrationToken: testSession.registrationToken,
                studentName: student ? student.name : 'Unknown Candidate',
                studentEmail: student ? student.studentEmail : '',
                overallRating: normOverall,
                difficultyRating: normDifficulty,
                clarityRating: normClarity,
                uiRating: normUi,
                comments: req.body.comments ? String(req.body.comments).trim().slice(0, 1000) : '',
                language: req.body.language === 'Tamil' ? 'Tamil' : 'English',
            });

            // Update session flag
            testSession.feedbackSubmitted = true;
            await testSession.save();

            return res.status(201).json({
                success: true,
                message: 'Thank you! Your feedback has been recorded successfully.',
                data: feedback,
            });

        } catch (error) {
            console.error('Submit feedback error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to record feedback',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
            });
        }
    } else if (req.method === 'GET') {
        try {
            const { sessionId } = req.query;

            if (sessionId) {
                const feedback = await ScholarshipExamFeedback.findOne({ testSessionId: sessionId });
                return res.status(200).json({
                    success: true,
                    submitted: Boolean(feedback),
                    data: feedback || null,
                });
            }

            // Return summary metrics for admin
            const totalFeedbacks = await ScholarshipExamFeedback.countDocuments();
            const averageRating = await ScholarshipExamFeedback.aggregate([
                { $group: { _id: null, avgRating: { $avg: '$rating' }, avgPortal: { $avg: '$portalRating' } } },
            ]);
            const difficultyBreakdown = await ScholarshipExamFeedback.aggregate([
                { $group: { _id: '$difficultyRating', count: { $sum: 1 } } },
            ]);

            return res.status(200).json({
                success: true,
                total: totalFeedbacks,
                averages: averageRating[0] || { avgRating: 0, avgPortal: 0 },
                difficultyBreakdown,
            });

        } catch (error) {
            console.error('Get feedback error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve feedback data',
            });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}
