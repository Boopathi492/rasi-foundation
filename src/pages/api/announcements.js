import dbConnect from '@/backend/lib/mongodb';
import Announcement from '@/backend/models/Announcement';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();
        const announcements = await Announcement.find({
            isActive: true,
            $or: [
                { expiryDate: { $exists: false } },
                { expiryDate: { $gt: new Date() } }
            ]
        }).sort({ priority: -1, createdAt: -1 });

        res.status(200).json({ success: true, data: announcements });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
