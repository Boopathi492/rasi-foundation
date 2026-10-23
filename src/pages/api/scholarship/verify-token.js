import dbConnect from '@/backend/lib/mongodb';
import ScholarshipStudent from '@/backend/models/ScholarshipStudent';
import TestSession from '@/backend/models/TestSession';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Registration token is required',
            });
        }

        // Find student
        const student = await ScholarshipStudent.findOne({ registrationToken: token });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Invalid registration token. Please check and try again.',
            });
        }

        // Check if test already completed
        const testSession = await TestSession.findOne({ registrationToken: token });

        if (testSession?.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'You have already completed the scholarship test.',
                testCompleted: true,
            });
        }

        // Check if test is in progress
        if (testSession?.status === 'in_progress') {
            const endTime = new Date(testSession.startTime);
            endTime.setMinutes(endTime.getMinutes() + testSession.duration);

            if (new Date() < endTime) {
                return res.status(200).json({
                    success: true,
                    message: 'Test in progress',
                    data: {
                        name: student.name,
                        email: student.studentEmail,
                        plus2Group: student.plus2Group,
                        thirdSubject: student.thirdSubject,
                    },
                    testInProgress: true,
                    sessionId: testSession._id,
                });
            }
        }

        res.status(200).json({
            success: true,
            data: {
                name: student.name,
                email: student.studentEmail,
                plus2Group: student.plus2Group,
                testStatus: student.testStatus,
            },
        });

    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify token',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
