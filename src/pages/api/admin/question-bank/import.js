import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import { withAuth } from '@/backend/lib/auth';

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { questions } = req.body;

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Request body must contain a non-empty array of questions in "questions" field',
            });
        }

        const validAllowedOptions = ['A', 'B', 'C', 'D'];
        const validSubjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];

        let imported = 0;
        let updated = 0;
        let errors = [];

        for (let i = 0; i < questions.length; i++) {
            const raw = questions[i];
            const rowNum = i + 1;

            if (!raw.code || !raw.subject || !raw.questionText || !raw.questionTextTamil || !raw.correctAnswer) {
                errors.push(`Row ${rowNum}: missing required fields (code, subject, questionText, questionTextTamil, correctAnswer)`);
                continue;
            }

            if (!validSubjects.includes(raw.subject)) {
                errors.push(`Row ${rowNum}: invalid subject '${raw.subject}'`);
                continue;
            }

            if (!validAllowedOptions.includes(raw.correctAnswer)) {
                errors.push(`Row ${rowNum}: invalid correctAnswer '${raw.correctAnswer}'`);
                continue;
            }

            const formattedDoc = {
                code: String(raw.code).trim().toUpperCase(),
                subject: raw.subject,
                topic: String(raw.topic || 'General').trim(),
                difficulty: ['easy', 'medium', 'hard'].includes(raw.difficulty) ? raw.difficulty : 'medium',
                questionText: String(raw.questionText).trim(),
                questionTextTamil: String(raw.questionTextTamil).trim(),
                options: Array.isArray(raw.options) && raw.options.length === 4
                    ? raw.options
                    : [
                        { label: 'A', text: String(raw.optionA || '') },
                        { label: 'B', text: String(raw.optionB || '') },
                        { label: 'C', text: String(raw.optionC || '') },
                        { label: 'D', text: String(raw.optionD || '') },
                    ],
                optionsTamil: Array.isArray(raw.optionsTamil) && raw.optionsTamil.length === 4
                    ? raw.optionsTamil
                    : [
                        { label: 'A', text: String(raw.optionTamilA || raw.optionA || '') },
                        { label: 'B', text: String(raw.optionTamilB || raw.optionB || '') },
                        { label: 'C', text: String(raw.optionTamilC || raw.optionC || '') },
                        { label: 'D', text: String(raw.optionTamilD || raw.optionD || '') },
                    ],
                correctAnswer: raw.correctAnswer,
                explanation: String(raw.explanation || '').trim(),
                explanationTamil: String(raw.explanationTamil || '').trim(),
                marks: Number(raw.marks) || 1,
                negativeMarks: Number(raw.negativeMarks) || 0,
                language: 'Bilingual',
                isActive: raw.isActive !== undefined ? Boolean(raw.isActive) : true,
            };

            const existing = await ScholarshipQuestion.findOne({ code: formattedDoc.code });
            if (existing) {
                await ScholarshipQuestion.updateOne({ _id: existing._id }, { $set: formattedDoc });
                updated++;
            } else {
                await ScholarshipQuestion.create(formattedDoc);
                imported++;
            }
        }

        return res.status(200).json({
            success: true,
            message: `Import processed: ${imported} added, ${updated} updated, ${errors.length} errors`,
            imported,
            updated,
            errors: errors.slice(0, 10), // return top 10 errors if any
        });

    } catch (error) {
        console.error('Question bank import error:', error);
        return res.status(500).json({ success: false, message: 'Failed to import questions' });
    }
}

export default withAuth(handler);
