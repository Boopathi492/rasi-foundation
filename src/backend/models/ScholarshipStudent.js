import mongoose from 'mongoose';

const ScholarshipStudentSchema = new mongoose.Schema({
    // Personal Details
    name: {
        type: String,
        required: [true, 'Please provide student name'],
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please provide date of birth'],
    },
    fatherName: {
        type: String,
        required: [true, 'Please provide father\'s name'],
        maxlength: [100, 'Father\'s name cannot be more than 100 characters'],
    },
    community: {
        type: String,
        required: [true, 'Please provide community'],
        enum: ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST', 'Other'],
    },
    address: {
        type: String,
        required: [true, 'Please provide full address'],
        maxlength: [500, 'Address cannot be more than 500 characters'],
    },

    // Contact Details
    studentEmail: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    studentMobile: {
        type: String,
        required: [true, 'Please provide student mobile number'],
        match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit mobile number'],
    },
    fatherMobile: {
        type: String,
        required: [true, 'Please provide father\'s mobile number'],
        match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit mobile number'],
    },
    motherMobile: {
        type: String,
        match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit mobile number'],
    },

    // Academic Details
    admissionCourse: {
        type: String,
        required: [true, 'Please provide the course applied for'],
    },
    collegeName: {
        type: String,
        required: [true, 'Please provide college name'],
    },
    plus2Group: {
        type: String,
        required: [true, 'Please select +2 group'],
        enum: ['Academic', 'Vocational'],
    },
    plus2ExamNumber: {
        type: String,
        required: [true, 'Please provide +2 exam number'],
    },
    expectedCutOff: {
        type: Number,
        required: [true, 'Please provide expected cut off'],
        min: [0, 'Cut off cannot be less than 0'],
        max: [200, 'Cut off cannot be more than 200'],
    },
    lastStudiedSchool: {
        type: String,
        required: [true, 'Please provide last studied school & place'],
    },
    studiedInGovtSchool: {
        type: Boolean,
        required: [true, 'Please specify if studied in government school'],
        default: false,
    },
    firstGenerationGraduate: {
        type: Boolean,
        required: [true, 'Please specify if first generation graduate'],
        default: false,
    },

    // Test Details
    thirdSubject: {
        type: String,
        enum: ['Mathematics', 'Botany', 'Zoology', 'Biology'],
    },
    testStatus: {
        type: String,
        enum: ['registered', 'in_progress', 'completed'],
        default: 'registered',
    },
    testStartTime: {
        type: Date,
    },
    testEndTime: {
        type: Date,
    },

    // Registration Token for secure test access
    registrationToken: {
        type: String,
        unique: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Generate unique registration token before saving
ScholarshipStudentSchema.pre('save', function (next) {
    if (!this.registrationToken) {
        this.registrationToken = 'RASI-' + Date.now().toString(36).toUpperCase() + '-' +
            Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    this.updatedAt = new Date();
    next();
});

export default mongoose.models.ScholarshipStudent || mongoose.model('ScholarshipStudent', ScholarshipStudentSchema);
