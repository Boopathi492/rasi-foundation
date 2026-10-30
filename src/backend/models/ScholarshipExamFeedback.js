import mongoose from 'mongoose';

const ScholarshipExamFeedbackSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScholarshipStudent',
        required: true,
        index: true,
    },
    testSessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestSession',
        required: true,
        unique: true,
        index: true,
    },
    registrationToken: {
        type: String,
        required: true,
        index: true,
    },
    studentName: {
        type: String,
        trim: true,
    },
    overallRating: {
        type: Number,
        required: [true, 'Please provide overall rating'],
        min: 1,
        max: 5,
    },
    difficultyRating: {
        type: String,
        required: [true, 'Please specify exam difficulty'],
        enum: ['easy', 'moderate', 'challenging', 'very_hard'],
    },
    clarityRating: {
        type: Number,
        required: [true, 'Please provide question clarity rating'],
        min: 1,
        max: 5,
    },
    uiRating: {
        type: Number,
        required: [true, 'Please provide platform UI rating'],
        min: 1,
        max: 5,
    },
    comments: {
        type: String,
        maxlength: [1000, 'Comments cannot exceed 1000 characters'],
        trim: true,
        default: '',
    },
    language: {
        type: String,
        enum: ['English', 'Tamil'],
        default: 'English',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.ScholarshipExamFeedback || mongoose.model('ScholarshipExamFeedback', ScholarshipExamFeedbackSchema);
