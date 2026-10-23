import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import Achievement from '@/backend/models/Achievement';

async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const achievements = await Achievement.find({}).sort({ order: 1, createdAt: -1 });
                res.status(200).json(achievements);
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        case 'POST':
            try {
                const achievement = await Achievement.create(req.body);
                res.status(201).json(achievement);
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export default withAuth(handler);
