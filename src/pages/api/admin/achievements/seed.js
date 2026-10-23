import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import Achievement from '@/backend/models/Achievement';

const initialAchievements = [
    // Stats
    { type: 'stat', value: '5000+', title: 'Students Guided', color: 'red', order: 1 },
    { type: 'stat', value: '100+', title: 'Partner Colleges', color: 'green', order: 2 },
    { type: 'stat', value: '15+', title: 'Years of Excellence', color: 'amber', order: 3 },
    { type: 'stat', value: '98%', title: 'Satisfaction Rate', color: 'blue', order: 4 },

    // Placement Highlights
    { type: 'placement', course: 'Medical', value: '800+', color: 'red', order: 5 },
    { type: 'placement', course: 'Engineering', value: '1500+', color: 'blue', order: 6 },
    { type: 'placement', course: 'Management', value: '1200+', color: 'green', order: 7 },
    { type: 'placement', course: 'Law', value: '500+', color: 'purple', order: 8 },
    { type: 'placement', course: 'Education', value: '600+', color: 'amber', order: 9 },
    { type: 'placement', course: 'Others', value: '400+', color: 'teal', order: 10 },

    // Milestones
    { type: 'milestone', year: '2008', title: 'Foundation Established', description: 'Rasi Foundation was established with a vision to guide students towards successful careers.', order: 20 },
    { type: 'milestone', year: '2012', title: 'Expanded Services', description: 'Extended guidance services to include Medical, Engineering, and Management courses.', order: 21 },
    { type: 'milestone', year: '2015', title: '1000+ Students Milestone', description: 'Successfully guided over 1000 students to secure admissions in prestigious colleges.', order: 22 },
    { type: 'milestone', year: '2024', title: '5000+ Students & Growing', description: 'Proudly serving 5000+ students with 100+ college partnerships nationwide.', order: 23 },

    // Success Stories
    { type: 'success_story', name: 'Dr. Arun Kumar', achievement: 'MBBS at Government Medical College', image: 'AK', quote: 'Rasi Foundation was instrumental in my journey to becoming a doctor. Their guidance through NEET preparation and college selection was invaluable.', course: 'Medical', color: 'red', order: 30 },
    { type: 'success_story', name: 'Priya Venkatesh', achievement: 'B.Tech at NIT Trichy', image: 'PV', quote: 'The expert counseling helped me choose the right engineering branch. Now I am working at a top tech company!', course: 'Engineering', color: 'blue', order: 31 },
    { type: 'success_story', name: 'Karthik Rajan', achievement: 'MBA at IIM Bangalore', image: 'KR', quote: 'From CAT preparation guidance to interview tips, Rasi Foundation supported me throughout my MBA journey.', course: 'Management', color: 'green', order: 32 },

    // Recognitions
    { type: 'recognition', title: 'Best Education Consultancy', description: 'Recognized for excellence in career guidance services', color: 'amber', order: 40 },
    { type: 'recognition', title: 'Student Choice Award', description: 'Voted as the most trusted consultancy by students', color: 'amber', order: 41 },
];

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();
        const count = await Achievement.countDocuments();

        if (count > 0) {
            return res.status(400).json({ message: 'Achievements database is not empty' });
        }

        const seeded = await Achievement.insertMany(initialAchievements.map(a => ({
            ...a,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        })));

        res.status(201).json({ message: 'Seeded successfully', count: seeded.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default withAuth(handler);
