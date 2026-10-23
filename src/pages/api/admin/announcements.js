import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import Announcement from '@/backend/models/Announcement';

async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const announcements = await Announcement.find({}).sort({ priority: -1, createdAt: -1 });
                res.status(200).json({ success: true, data: announcements });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                const announcement = await Announcement.create(req.body);
                res.status(201).json({ success: true, data: announcement });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'PUT':
        case 'PATCH':
            try {
                const id = req.query.id || req.body.id || req.body._id;
                const { _id, ...updateData } = req.body;

                const announcement = await Announcement.findByIdAndUpdate(id, updateData, {
                    new: true,
                    runValidators: true,
                });

                if (!announcement) {
                    return res.status(404).json({ success: false, message: 'Announcement not found' });
                }
                res.status(200).json({ success: true, data: announcement });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.query;
                const deletedAnnouncement = await Announcement.deleteOne({ _id: id });
                if (!deletedAnnouncement) {
                    return res.status(400).json({ success: false, message: 'Announcement not found' });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}

export default withAuth(handler);
