import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import { withAuth } from '@/backend/lib/auth';

async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        // Find duplicates by questionText (English)
        const duplicateEnglish = await ScholarshipQuestion.aggregate([
            {
                $group: {
                    _id: { $toLower: { $trim: { input: "$questionText" } } },
                    count: { $sum: 1 },
                    codes: { $push: "$code" },
                    subjects: { $push: "$subject" },
                    ids: { $push: "$_id" }
                }
            },
            { $match: { count: { $gt: 1 } } }
        ]);

        // Find duplicates by questionTextTamil (Tamil)
        const duplicateTamil = await ScholarshipQuestion.aggregate([
            {
                $group: {
                    _id: { $toLower: { $trim: { input: "$questionTextTamil" } } },
                    count: { $sum: 1 },
                    codes: { $push: "$code" },
                    subjects: { $push: "$subject" },
                    ids: { $push: "$_id" }
                }
            },
            { $match: { count: { $gt: 1 } } }
        ]);

        return res.status(200).json({
            success: true,
            totalDuplicateGroups: duplicateEnglish.length + duplicateTamil.length,
            duplicateEnglish: duplicateEnglish.map(d => ({
                text: d._id,
                count: d.count,
                codes: d.codes,
                subjects: d.subjects,
                ids: d.ids,
            })),
            duplicateTamil: duplicateTamil.map(d => ({
                text: d._id,
                count: d.count,
                codes: d.codes,
                subjects: d.subjects,
                ids: d.ids,
            })),
        });

    } catch (error) {
        console.error('Check duplicates error:', error);
        return res.status(500).json({ success: false, message: 'Failed to check duplicates' });
    }
}

export default withAuth(handler);
