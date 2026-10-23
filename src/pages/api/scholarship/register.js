import dbConnect from '@/lib/mongodb';
import ScholarshipStudent from '@/models/ScholarshipStudent';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const {
            name,
            dateOfBirth,
            fatherName,
            community,
            address,
            studentEmail,
            studentMobile,
            fatherMobile,
            motherMobile,
            admissionCourse,
            collegeName,
            plus2Group,
            plus2ExamNumber,
            expectedCutOff,
            lastStudiedSchool,
            studiedInGovtSchool,
            firstGenerationGraduate,
        } = req.body;

        // Validate required fields
        const requiredFields = [
            'name', 'dateOfBirth', 'fatherName', 'community', 'address',
            'studentMobile', 'fatherMobile',
            'admissionCourse', 'collegeName', 'plus2Group', 'plus2ExamNumber',
            'expectedCutOff', 'lastStudiedSchool'
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    success: false,
                    message: `${field.replace(/([A-Z])/g, ' $1').trim()} is required`,
                });
            }
        }

        // Check if student already registered with same email or mobile
        const query = { studentMobile };
        if (studentEmail && studentEmail.trim()) {
            query.$or = [{ studentEmail: studentEmail.toLowerCase().trim() }, { studentMobile }];
            delete query.studentMobile;
        }

        const existingStudent = await ScholarshipStudent.findOne(studentEmail && studentEmail.trim() ? query : { studentMobile });

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: existingStudent.studentMobile === studentMobile
                    ? 'A student with this mobile number has already registered'
                    : 'A student with this email has already registered',
                existingToken: existingStudent.registrationToken,
            });
        }

        // Create new student
        const student = await ScholarshipStudent.create({
            name: name.trim(),
            dateOfBirth: new Date(dateOfBirth),
            fatherName: fatherName.trim(),
            community,
            address: address.trim(),
            studentEmail: studentEmail ? studentEmail.toLowerCase().trim() : undefined,
            studentMobile,
            fatherMobile,
            motherMobile: motherMobile || '',
            admissionCourse: admissionCourse.trim(),
            collegeName: collegeName.trim(),
            plus2Group,
            plus2ExamNumber: plus2ExamNumber.trim(),
            expectedCutOff: parseFloat(expectedCutOff),
            lastStudiedSchool: lastStudiedSchool.trim(),
            studiedInGovtSchool: studiedInGovtSchool === true || studiedInGovtSchool === 'true',
            firstGenerationGraduate: firstGenerationGraduate === true || firstGenerationGraduate === 'true',
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            data: {
                registrationToken: student.registrationToken,
                name: student.name,
                email: student.studentEmail,
                plus2Group: student.plus2Group,
            },
        });

    } catch (error) {
        console.error('Registration error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', '),
            });
        }

        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
