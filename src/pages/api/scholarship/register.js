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
            gender,
            dateOfBirth,
            fatherName,
            community,
            address,
            aadhaarNumber,
            studentEmail,
            studentMobile,
            fatherMobile,
            motherMobile,
            admissionCourse,
            collegeName,
            board,
            currentClass,
            academicYear,
            plus2Group,
            plus2ExamNumber,
            expectedCutOff,
            lastStudiedSchool,
            studiedInGovtSchool,
            firstGenerationGraduate,
            preferredDistrict,
            preferredCourse,
            preferredColleges,
            thirdSubject,
            selectedElective,
            examLanguage,
        } = req.body;

        // Validate required candidate fields
        const requiredFields = [
            'name', 'dateOfBirth', 'fatherName', 'community', 'address',
            'studentMobile', 'fatherMobile',
            'admissionCourse', 'collegeName', 'plus2Group', 'plus2ExamNumber',
            'expectedCutOff', 'lastStudiedSchool'
        ];

        for (const field of requiredFields) {
            if (!req.body[field] && req.body[field] !== 0) {
                return res.status(400).json({
                    success: false,
                    message: `${field.replace(/([A-Z])/g, ' $1').trim()} is required`,
                });
            }
        }

        // Validate student mobile format
        const cleanMobile = String(studentMobile).replace(/\D/g, '');
        if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid 10-digit student mobile number',
            });
        }

        // Validate Aadhaar if provided (optional unless policy required, 12 digits)
        let cleanedAadhaar = '';
        if (aadhaarNumber && String(aadhaarNumber).trim()) {
            cleanedAadhaar = String(aadhaarNumber).replace(/\D/g, '');
            if (!/^\d{12}$/.test(cleanedAadhaar)) {
                return res.status(400).json({
                    success: false,
                    message: 'Aadhaar number must contain exactly 12 digits',
                });
            }
        }

        // Check if student already registered with same mobile or email
        const query = { studentMobile: cleanMobile };
        if (studentEmail && studentEmail.trim()) {
            query.$or = [{ studentEmail: studentEmail.toLowerCase().trim() }, { studentMobile: cleanMobile }];
            delete query.studentMobile;
        }

        const existingStudent = await ScholarshipStudent.findOne(query);

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: existingStudent.studentMobile === cleanMobile
                    ? 'A student with this mobile number has already registered'
                    : 'A student with this email has already registered',
                existingToken: existingStudent.registrationToken,
            });
        }

        // Determine elective subject
        const chosenElective = selectedElective || thirdSubject || (plus2Group === 'Vocational' ? 'Mathematics' : 'Mathematics');

        // Create new student record
        const student = await ScholarshipStudent.create({
            name: name.trim(),
            gender: gender || 'Other',
            dateOfBirth: new Date(dateOfBirth),
            fatherName: fatherName.trim(),
            community,
            address: address.trim(),
            aadhaarNumber: cleanedAadhaar || undefined,
            studentEmail: studentEmail ? studentEmail.toLowerCase().trim() : undefined,
            studentMobile: cleanMobile,
            fatherMobile: String(fatherMobile).replace(/\D/g, ''),
            motherMobile: motherMobile ? String(motherMobile).replace(/\D/g, '') : '',
            admissionCourse: admissionCourse.trim(),
            collegeName: collegeName.trim(),
            board: board || 'Tamil Nadu State Board',
            currentClass: currentClass || '+2 / 12th Standard',
            academicYear: academicYear || '2025-2026',
            plus2Group,
            plus2ExamNumber: plus2ExamNumber.trim(),
            expectedCutOff: parseFloat(expectedCutOff),
            lastStudiedSchool: lastStudiedSchool.trim(),
            studiedInGovtSchool: studiedInGovtSchool === true || studiedInGovtSchool === 'true',
            firstGenerationGraduate: firstGenerationGraduate === true || firstGenerationGraduate === 'true',
            preferredDistrict: preferredDistrict || '',
            preferredCourse: preferredCourse || admissionCourse,
            preferredColleges: Array.isArray(preferredColleges) ? preferredColleges : [],
            thirdSubject: chosenElective,
            selectedElective: chosenElective,
            examLanguage: examLanguage === 'Tamil' ? 'Tamil' : 'English',
        });

        // Masked Aadhaar for response
        const maskedAadhaar = cleanedAadhaar ? `XXXX-XXXX-${cleanedAadhaar.slice(-4)}` : '';

        res.status(201).json({
            success: true,
            message: 'Scholarship registration successful!',
            data: {
                registrationToken: student.registrationToken,
                name: student.name,
                email: student.studentEmail,
                studentMobile: student.studentMobile,
                plus2Group: student.plus2Group,
                thirdSubject: student.thirdSubject,
                examLanguage: student.examLanguage,
                college: student.collegeName,
                course: student.admissionCourse,
                maskedAadhaar,
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
