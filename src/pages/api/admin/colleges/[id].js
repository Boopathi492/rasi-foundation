import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import College from '@/backend/models/College';

async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const college = await College.findById(id).lean();
      if (!college) {
        return res.status(404).json({ message: 'College not found' });
      }
      res.status(200).json(college);
    } catch (error) {
      console.error('Error fetching college:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const { name, location, district, tneaCode, note, isActive, order, departments, website } = req.body;

      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (location !== undefined) updateData.location = location;
      if (district !== undefined) updateData.district = district;
      if (tneaCode !== undefined) updateData.tneaCode = tneaCode;
      if (note !== undefined) updateData.note = note;
      if (isActive !== undefined) updateData.isActive = isActive;
      if (order !== undefined) updateData.order = order;
      if (departments !== undefined) updateData.departments = departments;
      if (website !== undefined) updateData.website = website;
      updateData.updatedAt = Date.now();

      const college = await College.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!college) {
        return res.status(404).json({ message: 'College not found' });
      }

      res.status(200).json(college);
    } catch (error) {
      console.error('Error updating college:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const college = await College.findByIdAndDelete(id);
      if (!college) {
        return res.status(404).json({ message: 'College not found' });
      }
      res.status(200).json({ message: 'College deleted successfully' });
    } catch (error) {
      console.error('Error deleting college:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
