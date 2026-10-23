import dbConnect from '@/backend/lib/mongodb';
import Achievement from '@/backend/models/Achievement';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Achievement ID is required' });
    }

    try {
        await dbConnect();

        const achievement = await Achievement.findByIdAndUpdate(
            id,
            { $inc: { reactions: 1 } },
            { new: true }
        );

        if (!achievement) {
            return res.status(404).json({ message: 'Achievement not found' });
        }

        res.status(200).json({ success: true, reactions: achievement.reactions });
    } catch (error) {
        console.error('Error updating reaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
