import dbConnect from '@/backend/lib/mongodb';
import College from '@/backend/models/College';
import Course from '@/backend/models/Course';
import { TN_DISTRICTS } from '@/data/siteConfig';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Cache for 60 seconds, allow stale up to 5 minutes
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

  try {
    await dbConnect();

    // 1. Unique active course count
    const uniqueCourseNames = await Course.distinct('name', { isActive: true });
    const coursesListed = uniqueCourseNames.length > 0 ? uniqueCourseNames.length : 361;

    // 2. Academic Streams count from active colleges
    const streams = await College.distinct('type', {
      isActive: true,
      type: { $ne: null, $nin: ['', 'Other'] }
    });
    const academicStreams = streams.length > 0 ? streams.length : 8;

    // 3. Unique Tamil Nadu Districts covered by active colleges
    const rawDistricts = await College.distinct('district', { isActive: true });
    const matchedDistricts = new Set();

    rawDistricts.forEach((d) => {
      if (!d) return;
      const clean = d.replace(/\s*(District|Zone)\s*/gi, '').trim().toLowerCase();
      const match = TN_DISTRICTS.find((tnd) => {
        const tndLower = tnd.toLowerCase();
        if (tndLower === clean) return true;
        if (clean === 'kancheepuram' && tndLower === 'kanchipuram') return true;
        if (clean === 'kanchipuram' && tndLower === 'kancheepuram') return true;
        if (clean === 'tirupattur' && tndLower === 'tirupathur') return true;
        if (clean === 'tirupathur' && tndLower === 'tirupattur') return true;
        return false;
      });
      if (match) {
        matchedDistricts.add(match);
      }
    });

    const districtsCovered = matchedDistricts.size > 0 ? matchedDistricts.size : TN_DISTRICTS.length;

    // 4. Configured Admission Roadmap Steps
    const admissionRoadmapSteps = 6;

    return res.status(200).json({
      success: true,
      data: {
        coursesListed,
        academicStreams,
        districtsCovered,
        admissionRoadmapSteps,
      },
    });
  } catch (error) {
    console.error('[Statistics API Error]:', error);
    // Graceful fallback to authoritative defaults on database failure
    return res.status(200).json({
      success: true,
      fallback: true,
      data: {
        coursesListed: 361,
        academicStreams: 8,
        districtsCovered: TN_DISTRICTS.length || 38,
        admissionRoadmapSteps: 6,
      },
    });
  }
}
