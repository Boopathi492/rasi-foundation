import dbConnect from '@/backend/lib/mongodb';
import TestSession from '@/backend/models/TestSession';
import { withAuth } from '@/backend/lib/auth';

async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const { page = 1, limit = 20, search = '', status = 'all' } = req.query;
            const skip = (parseInt(page) - 1) * parseInt(limit);

            // Build query for test sessions
            let sessionQuery = {};

            if (status !== 'all') {
                sessionQuery.status = status;
            }

            // Get all sessions with student data
            const sessions = await TestSession.find(sessionQuery)
                .populate('studentId', 'name studentEmail studentMobile plus2Group admissionCourse collegeName')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .lean();

            // Filter by search if provided
            let filteredSessions = sessions;
            if (search) {
                const searchLower = search.toLowerCase();
                filteredSessions = sessions.filter(session => {
                    const student = session.studentId;
                    if (!student) return false;
                    return (
                        student.name?.toLowerCase().includes(searchLower) ||
                        student.studentEmail?.toLowerCase().includes(searchLower) ||
                        student.studentMobile?.includes(search) ||
                        session.registrationToken?.toLowerCase().includes(searchLower)
                    );
                });
            }

            const total = await TestSession.countDocuments(sessionQuery);

            // Calculate statistics
            const allCompletedSessions = await TestSession.find({ status: 'completed' }).lean();

            const stats = {
                total: total,
                completed: await TestSession.countDocuments({ status: 'completed' }),
                inProgress: await TestSession.countDocuments({ status: 'in_progress' }),
                pending: await TestSession.countDocuments({ status: 'pending' }),
                expired: await TestSession.countDocuments({ status: 'expired' }),
            };

            // Calculate average score for completed tests
            if (allCompletedSessions.length > 0) {
                const totalScore = allCompletedSessions.reduce((sum, s) => sum + (s.score || 0), 0);
                const totalQuestions = allCompletedSessions.reduce((sum, s) => sum + (s.totalQuestions || 0), 0);
                stats.avgScore = totalQuestions > 0
                    ? Math.round((totalScore / totalQuestions) * 100)
                    : 0;
                stats.highestScore = Math.max(...allCompletedSessions.map(s => s.score || 0));
            } else {
                stats.avgScore = 0;
                stats.highestScore = 0;
            }

            // Recent stats (last 7 days)
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            stats.last7Days = await TestSession.countDocuments({
                createdAt: { $gte: sevenDaysAgo }
            });

            res.status(200).json({
                results: filteredSessions,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit)),
                },
                statistics: stats,
            });
        } catch (error) {
            console.error('Get scholarship results error:', error);
            res.status(500).json({ message: 'Failed to fetch results' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ message: 'Result ID is required' });
            }

            await TestSession.findByIdAndDelete(id);
            res.status(200).json({ message: 'Result deleted successfully' });
        } catch (error) {
            console.error('Delete scholarship result error:', error);
            res.status(500).json({ message: 'Failed to delete result' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default withAuth(handler);
