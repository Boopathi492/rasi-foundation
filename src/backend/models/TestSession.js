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
    originalSelectedAnswer: {
        type: String,
        enum: ['A', 'B', 'C', 'D', null],
        default: null,
    },
    isCorrect: {
        type: Boolean,
        default: false,
    },
    isMarkedForReview: {
        type: Boolean,
        default: false,
    },
    timeTaken: {
        type: Number, // seconds spent on this question
        default: 0,
    },
});

const SessionQuestionSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScholarshipQuestion',
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    orderIndex: {
        type: Number,
        required: true,
    },
    // Server-randomized option mapping for anti-cheating & integrity
    shuffledOptions: [{
        label: { type: String, enum: ['A', 'B', 'C', 'D'] },
        originalLabel: { type: String, enum: ['A', 'B', 'C', 'D'] }
    }],
    markedForReview: {
        type: Boolean,
        default: false,
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
        index: true,
    },

    // Subjects configuration
    subjects: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length === 3;
            },
            message: 'Must have exactly 3 subjects (Physics, Chemistry, and one optional subject)',
        },
    },

    optionalSubject: {
        type: String,
        enum: ['Mathematics', 'Biology', 'Botany', 'Zoology'],
        default: function () {
            return this.subjects?.[2] || 'Mathematics';
        },
    },

    // Question language for this test session
    language: {
        type: String,
        enum: ['English', 'Tamil'],
        default: 'English',
    },
    medium: {
        type: String,
        enum: ['English', 'Tamil'],
        default: 'English',
    },

    // Configurable pagination setting (5 or 10 questions per page)
    pageSize: {
        type: Number,
        default: 5,
        enum: [5, 10],
    },

    // Questions assigned to this session (randomized per student)
    questions: [SessionQuestionSchema],

    // Answers submitted by student
    answers: [AnswerSchema],

    // Test timing
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
    },
    duration: {
        type: Number, // in minutes
        default: 90, // 90 minutes official duration
    },

    // Scoring
    totalQuestions: {
        type: Number,
        default: 60,
    },
    attemptedQuestions: {
        type: Number,
        default: 0,
    },
    unattemptedQuestions: {
        type: Number,
        default: 60,
    },
    correctAnswers: {
        type: Number,
        default: 0,
    },
    wrongAnswers: {
        type: Number,
        default: 0,
    },
    score: {
        type: Number,
        default: 0,
    },
    percentage: {
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
        default: 'in_progress',
        index: true,
    },

    // Post-Exam Feedback Status
    feedbackSubmitted: {
        type: Boolean,
        default: false,
    },

    // Browser/device info for audit & security
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

// Calculate score and metrics before saving
TestSessionSchema.pre('save', function (next) {
    if (this.questions && this.questions.length > 0) {
        this.totalQuestions = this.questions.length;
    }

    if (this.answers && this.answers.length > 0) {
        this.attemptedQuestions = this.answers.filter(a => a.selectedAnswer !== null && a.selectedAnswer !== '').length;
        this.correctAnswers = this.answers.filter(a => a.isCorrect).length;
        this.wrongAnswers = Math.max(0, this.attemptedQuestions - this.correctAnswers);
        this.unattemptedQuestions = Math.max(0, this.totalQuestions - this.attemptedQuestions);
        this.score = this.correctAnswers; // 1 mark per correct answer, 0 negative
        this.percentage = this.totalQuestions > 0 ? Math.round((this.score / this.totalQuestions) * 100) : 0;

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
            if (this.subjectWiseScore && this.subjectWiseScore[subject] !== undefined) {
                this.subjectWiseScore[subject] = subjectScores[subject];
            }
        });
    } else {
        this.unattemptedQuestions = this.totalQuestions || 60;
    }

    this.updatedAt = new Date();
    next();
});

export default mongoose.models.TestSession || mongoose.model('TestSession', TestSessionSchema);
