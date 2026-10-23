import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import Achievement from '@/backend/models/Achievement';

async function handler(req, res) {
    await dbConnect();

    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const achievement = await Achievement.findById(id);
                if (!achievement) {
                    return res.status(404).json({ success: false, message: 'Achievement not found' });
                }
                res.status(200).json(achievement);
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        case 'PATCH':
        case 'PUT':
            try {
                const achievement = await Achievement.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!achievement) {
                    return res.status(404).json({ success: false, message: 'Achievement not found' });
                }
                res.status(200).json(achievement);
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        case 'DELETE':
            try {
                const deletedAchievement = await Achievement.deleteOne({ _id: id });
                if (!deletedAchievement) {
                    return res.status(404).json({ success: false, message: 'Achievement not found' });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'PATCH']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export default withAuth(handler);
