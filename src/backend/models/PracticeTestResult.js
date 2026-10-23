import mongoose from 'mongoose';

const PracticeTestResultSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, 'Please provide student name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
        default: 'Physics',
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
    wrongAnswers: {
        type: Number,
        required: true,
    },
    unanswered: {
        type: Number,
        default: 0,
    },
    score: {
        type: Number,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    timeTaken: {
        type: Number, // in seconds
        default: 0,
    },
    answers: [{
        questionId: String,
        selectedAnswer: String,
        correctAnswer: String,
        isCorrect: Boolean,
    }],
    status: {
        type: String,
        enum: ['completed', 'abandoned'],
        default: 'completed',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for efficient queries
PracticeTestResultSchema.index({ email: 1, createdAt: -1 });
PracticeTestResultSchema.index({ createdAt: -1 });

export default mongoose.models.PracticeTestResult || mongoose.model('PracticeTestResult', PracticeTestResultSchema);
