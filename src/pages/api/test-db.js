import dbConnect from '@/lib/mongodb';

export default async function handler(req, res) {
    try {
        await dbConnect();
        res.status(200).json({ success: true, message: 'Connected to MongoDB successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
