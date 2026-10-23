import dbConnect from '@/backend/lib/mongodb';
import Achievement from '@/backend/models/Achievement';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        // Fetch all active and published achievements
        const achievements = await Achievement.find({
            isActive: true,
            status: 'published'
        })
            .sort({ order: 1, createdAt: -1 })
            .lean();

        // Group achievements for the frontend with defaults
        const grouped = {
            stats: achievements.filter(a => a.type === 'stat'),
            milestones: achievements.filter(a => a.type === 'milestone'),
            recognitions: achievements.filter(a => a.type === 'recognition'),
            placements: achievements.filter(a => a.type === 'placement'),
            spotlights: achievements.filter(a => a.type === 'spotlight')
        };

        res.status(200).json(grouped);
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
