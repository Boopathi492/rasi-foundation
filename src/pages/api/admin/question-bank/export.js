import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import { withAuth } from '@/backend/lib/auth';

async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { format = 'json', subject = '' } = req.query;

        const query = {};
        if (subject && subject !== 'all') {
            query.subject = subject;
        }

        const questions = await ScholarshipQuestion.find(query).sort({ code: 1 }).lean();

        if (format === 'csv') {
            const escapeCsv = (str) => {
                if (str === null || str === undefined) return '""';
                return `"${String(str).replace(/"/g, '""').replace(/[\r\n]+/g, ' ')}"`;
            };

            const headers = [
                'Code',
                'Subject',
                'Topic',
                'Difficulty',
                'Question (English)',
                'Option A (EN)',
                'Option B (EN)',
                'Option C (EN)',
                'Option D (EN)',
                'Question (Tamil)',
                'Option A (TA)',
                'Option B (TA)',
                'Option C (TA)',
                'Option D (TA)',
                'Correct Answer',
                'Explanation (English)',
                'Explanation (Tamil)',
                'Status',
                'Usage Count',
            ];

            const rows = questions.map(q => {
                const optEN = {};
                (q.options || []).forEach(o => { optEN[o.label] = o.text; });
                const optTA = {};
                (q.optionsTamil || []).forEach(o => { optTA[o.label] = o.text; });

                return [
                    escapeCsv(q.code),
                    escapeCsv(q.subject),
                    escapeCsv(q.topic),
                    escapeCsv(q.difficulty),
                    escapeCsv(q.questionText),
                    escapeCsv(optEN['A'] || ''),
                    escapeCsv(optEN['B'] || ''),
                    escapeCsv(optEN['C'] || ''),
                    escapeCsv(optEN['D'] || ''),
                    escapeCsv(q.questionTextTamil),
                    escapeCsv(optTA['A'] || ''),
                    escapeCsv(optTA['B'] || ''),
                    escapeCsv(optTA['C'] || ''),
                    escapeCsv(optTA['D'] || ''),
                    escapeCsv(q.correctAnswer),
                    escapeCsv(q.explanation),
                    escapeCsv(q.explanationTamil),
                    escapeCsv(q.isActive ? 'Active' : 'Inactive'),
                    escapeCsv(q.usageCount || 0),
                ].join(',');
            });

            // Include UTF-8 BOM so Excel opens Tamil Unicode characters seamlessly!
            const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');

            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
            res.setHeader('Content-Disposition', `attachment; filename="rasi-question-bank-${subject || 'all'}.csv"`);
            return res.status(200).send(csvContent);
        }

        // Default: JSON export
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="rasi-question-bank-${subject || 'all'}.json"`);
        return res.status(200).send(JSON.stringify(questions, null, 2));

    } catch (error) {
        console.error('Question bank export error:', error);
        return res.status(500).json({ success: false, message: 'Failed to export questions' });
    }
}

export default withAuth(handler);
