import mongoose from 'mongoose';

const ScholarshipQuestionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Please provide subject'],
        enum: ['Physics', 'Chemistry', 'Mathematics', 'Botany', 'Zoology', 'Biology'],
        index: true,
    },
    questionText: {
        type: String,
        required: [true, 'Please provide question text'],
    },
    questionTextTamil: {
        type: String,
        default: '',
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
    },
    source: {
        type: String,
        default: 'RASI Foundation',
    },
    explanation: {
        type: String,
        default: '',
    },
    explanationTamil: {
        type: String,
        default: '',
    },
    language: {
        type: String,
        enum: ['English', 'Tamil', 'Bilingual'],
        default: 'English',
        index: true,
    },
    isActive: {
        type: Boolean,
        default: true,
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

// Index for efficient question selection
ScholarshipQuestionSchema.index({ subject: 1, isActive: 1, difficulty: 1 });
ScholarshipQuestionSchema.index({ subject: 1, language: 1, isActive: 1 });

export default mongoose.models.ScholarshipQuestion || mongoose.model('ScholarshipQuestion', ScholarshipQuestionSchema);
