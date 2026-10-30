import mongoose from 'mongoose';

const ScholarshipQuestionSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        index: true,
    },
    subject: {
        type: String,
        required: [true, 'Please provide subject'],
        enum: ['Physics', 'Chemistry', 'Mathematics', 'Botany', 'Zoology', 'Biology'],
        index: true,
    },
    topic: {
        type: String,
        default: 'General',
        trim: true,
        index: true,
    },
    questionText: {
        type: String,
        required: [true, 'Please provide question text'],
        trim: true,
    },
    questionTextTamil: {
        type: String,
        default: '',
        trim: true,
    },
    options: {
        type: [{
            label: {
                type: String,
                required: true,
                enum: ['A', 'B', 'C', 'D'],
            },
            text: {
                type: String,
                required: true,
                trim: true,
            }
        }],
        validate: {
            validator: function (v) {
                return v && v.length === 4;
            },
            message: 'Question must have exactly 4 options (A, B, C, D)',
        },
    },
    optionsTamil: {
        type: [{
            label: {
                type: String,
                required: true,
                enum: ['A', 'B', 'C', 'D'],
            },
            text: {
                type: String,
                required: true,
                trim: true,
            }
        }],
        default: [],
    },
    correctAnswer: {
        type: String,
        required: [true, 'Please provide correct answer'],
        enum: ['A', 'B', 'C', 'D'],
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium',
        index: true,
    },
    source: {
        type: String,
        default: 'RASI Foundation Question Bank (TN State Board / Higher Secondary)',
    },
    explanation: {
        type: String,
        default: '',
        trim: true,
    },
    explanationTamil: {
        type: String,
        default: '',
        trim: true,
    },
    language: {
        type: String,
        enum: ['English', 'Tamil', 'Bilingual'],
        default: 'Bilingual',
        index: true,
    },
    usageCount: {
        type: Number,
        default: 0,
        index: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
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

// Indexes for efficient, fast randomized question selection and admin queries
ScholarshipQuestionSchema.index({ subject: 1, isActive: 1, difficulty: 1 });
ScholarshipQuestionSchema.index({ subject: 1, topic: 1, isActive: 1 });
ScholarshipQuestionSchema.index({ subject: 1, usageCount: 1 });

ScholarshipQuestionSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.models.ScholarshipQuestion || mongoose.model('ScholarshipQuestion', ScholarshipQuestionSchema);
