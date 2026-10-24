import dbConnect from '@/lib/mongodb';

export default async function handler(req, res) {
    try {
        await dbConnect();
        res.status(200).json({ success: true, message: 'Connected to MongoDB successfully' });
    } catch (error) {
        console.error('test-db error:', error.message);
        // Do not leak driver/connection details to unauthenticated callers.
        res.status(500).json({ success: false, error: 'Database connection failed' });
    }
}
