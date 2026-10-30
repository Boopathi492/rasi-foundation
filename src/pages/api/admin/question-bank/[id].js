import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import { withAuth } from '@/backend/lib/auth';

async function handler(req, res) {
    await dbConnect();

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const question = await ScholarshipQuestion.findById(id);
            if (!question) {
                return res.status(404).json({ success: false, message: 'Question not found' });
            }
            return res.status(200).json({ success: true, data: question });
        } catch (error) {
            console.error('Get question error:', error);
            return res.status(500).json({ success: false, message: 'Failed to retrieve question' });
        }
    } else if (req.method === 'PATCH' || req.method === 'PUT') {
        try {
            const updateFields = { ...req.body };

            // If code is being updated, check uniqueness
            if (updateFields.code) {
                updateFields.code = String(updateFields.code).trim().toUpperCase();
                const duplicate = await ScholarshipQuestion.findOne({
                    code: updateFields.code,
                    _id: { $ne: id },
                });
                if (duplicate) {
                    return res.status(400).json({
                        success: false,
                        message: `Question code '${updateFields.code}' is already used by another question.`,
                    });
                }
            }

            const updatedQuestion = await ScholarshipQuestion.findByIdAndUpdate(
                id,
                { $set: updateFields },
                { new: true, runValidators: true }
            );

            if (!updatedQuestion) {
                return res.status(404).json({ success: false, message: 'Question not found' });
            }

            return res.status(200).json({
                success: true,
                message: 'Question updated successfully',
                data: updatedQuestion,
            });
        } catch (error) {
            console.error('Update question error:', error);
            return res.status(500).json({ success: false, message: 'Failed to update question' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { permanent = false } = req.query;

            if (permanent === 'true' || permanent === true) {
                await ScholarshipQuestion.findByIdAndDelete(id);
                return res.status(200).json({
                    success: true,
                    message: 'Question permanently deleted from database',
                });
            } else {
                // Soft delete / deactivate safely
                const deactivated = await ScholarshipQuestion.findByIdAndUpdate(
                    id,
                    { $set: { isActive: false } },
                    { new: true }
                );
                return res.status(200).json({
                    success: true,
                    message: 'Question safely deactivated',
                    data: deactivated,
                });
            }
        } catch (error) {
            console.error('Delete question error:', error);
            return res.status(500).json({ success: false, message: 'Failed to delete question' });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
