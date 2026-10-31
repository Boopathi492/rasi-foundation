import mongoose from 'mongoose';

const SubjectConfigSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    questionCount: {
        type: Number,
        required: true,
        default: 20,
        min: 1,
    },
    difficultyDistribution: {
        easy: { type: Number, default: 7 },
        medium: { type: Number, default: 9 },
        hard: { type: Number, default: 4 },
    },
}, { _id: false });

const ScholarshipExamConfigSchema = new mongoose.Schema({
    configKey: {
        type: String,
        required: true,
        unique: true,
        default: 'default_scholarship_config',
    },
    examTitle: {
        type: String,
        required: true,
        default: 'Rasi Foundation Scholarship Examination',
        trim: true,
    },
    examDurationMinutes: {
        type: Number,
        required: true,
        default: 90,
        min: 10,
        max: 300,
    },
    totalQuestions: {
        type: Number,
        required: true,
        default: 60,
    },
    marksPerQuestion: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
    },
    negativeMarking: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    compulsorySubjects: {
        type: [SubjectConfigSchema],
        default: [
            { name: 'Physics', questionCount: 20, difficultyDistribution: { easy: 7, medium: 9, hard: 4 } },
            { name: 'Chemistry', questionCount: 20, difficultyDistribution: { easy: 7, medium: 9, hard: 4 } },
        ],
    },
    optionalSubjects: {
        type: [SubjectConfigSchema],
        default: [
            { name: 'Mathematics', questionCount: 20, difficultyDistribution: { easy: 7, medium: 9, hard: 4 } },
            { name: 'Biology', questionCount: 20, difficultyDistribution: { easy: 7, medium: 9, hard: 4 } },
        ],
    },
    languages: {
        type: [String],
        enum: ['English', 'Tamil'],
        default: ['English', 'Tamil'],
    },
    practiceTestConfig: {
        allowedSubjects: {
            type: [String],
            default: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
        },
        defaultQuestionCount: {
            type: Number,
            default: 20,
        },
        durationPerQuestionMinutes: {
            type: Number,
            default: 2,
        },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    updatedBy: {
        type: String,
        default: 'system',
    },
}, {
    timestamps: true,
});

// Helper static method to fetch active config or create default
ScholarshipExamConfigSchema.statics.getActiveConfig = async function () {
    let config = await this.findOne({ configKey: 'default_scholarship_config', isActive: true });
    if (!config) {
        config = await this.create({
            configKey: 'default_scholarship_config',
            examTitle: 'Rasi Foundation Scholarship Examination',
            examDurationMinutes: 90,
            totalQuestions: 60,
            marksPerQuestion: 1,
            negativeMarking: 0,
            compulsorySubjects: [
                { name: 'Physics', questionCount: 20, difficultyDistribution: { easy: 7, medium: 9, hard: 4 } },
                { name: 'Chemistry', questionCount: 20, difficultyDistribution: { easy: 7, medium: 9, hard: 4 } },
            ],
            optionalSubjects: [
                { name: 'Mathematics', questionCount: 20, difficultyDistribution: { easy: 7, medium: 9, hard: 4 } },
                { name: 'Biology', questionCount: 20, difficultyDistribution: { easy: 7, medium: 9, hard: 4 } },
            ],
            languages: ['English', 'Tamil'],
            practiceTestConfig: {
                allowedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
                defaultQuestionCount: 15,
                durationPerQuestionMinutes: 2,
            },
            isActive: true,
        });
    }
    return config;
};

export default mongoose.models.ScholarshipExamConfig || mongoose.model('ScholarshipExamConfig', ScholarshipExamConfigSchema);
