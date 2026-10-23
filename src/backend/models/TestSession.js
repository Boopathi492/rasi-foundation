import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScholarshipQuestion',
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    selectedAnswer: {
        type: String,
        enum: ['A', 'B', 'C', 'D', null],
        default: null,
    },
    isCorrect: {
        type: Boolean,
        default: false,
    },
    timeTaken: {
        type: Number, // seconds spent on this question
        default: 0,
    },
});

const TestSessionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScholarshipStudent',
        required: true,
        index: true,
    },
    registrationToken: {
        type: String,
        required: true,
        unique: true,
    },

    // Subjects configuration
    subjects: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length === 3;
            },
            message: 'Must have exactly 3 subjects (Physics, Chemistry, and one elective)',
        },
    },

    // Questions assigned to this session (randomized per student)
    questions: {
        type: [{
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ScholarshipQuestion',
            },
            subject: String,
            orderIndex: Number,
        }],
    },

    // Answers submitted by student
    answers: [AnswerSchema],

    // Test timing
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    duration: {
        type: Number, // in minutes
        default: 90, // 90 minutes default
    },

    // Scoring
    totalQuestions: {
        type: Number,
        default: 0,
    },
    attemptedQuestions: {
        type: Number,
        default: 0,
    },
    correctAnswers: {
        type: Number,
        default: 0,
    },
    score: {
        type: Number,
        default: 0,
    },
    subjectWiseScore: {
        Physics: { type: Number, default: 0 },
        Chemistry: { type: Number, default: 0 },
        Mathematics: { type: Number, default: 0 },
        Botany: { type: Number, default: 0 },
        Zoology: { type: Number, default: 0 },
        Biology: { type: Number, default: 0 },
    },

    // Status
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'expired', 'disqualified'],
        default: 'pending',
    },

    // Browser/device info for security
    userAgent: String,
    ipAddress: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Calculate score before saving
TestSessionSchema.pre('save', function (next) {
    if (this.answers && this.answers.length > 0) {
        this.attemptedQuestions = this.answers.filter(a => a.selectedAnswer !== null).length;
        this.correctAnswers = this.answers.filter(a => a.isCorrect).length;
        this.score = this.correctAnswers; // 1 mark per correct answer

        // Calculate subject-wise scores
        const subjectScores = {};
        this.answers.forEach(answer => {
            if (!subjectScores[answer.subject]) {
                subjectScores[answer.subject] = 0;
            }
            if (answer.isCorrect) {
                subjectScores[answer.subject]++;
            }
        });

        Object.keys(subjectScores).forEach(subject => {
            this.subjectWiseScore[subject] = subjectScores[subject];
        });
    }

    this.updatedAt = new Date();
    next();
});

export default mongoose.models.TestSession || mongoose.model('TestSession', TestSessionSchema);
