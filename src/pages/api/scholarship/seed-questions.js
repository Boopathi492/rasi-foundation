import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';

// Curriculum-accurate questions for Tamil Nadu State Board (Class 12)
const sampleQuestions = {
    Physics: [
        {
            questionText: "Which of the following is the unit of electric dipole moment?",
            options: [
                { label: 'A', text: 'newton/coulomb' },
                { label: 'B', text: 'coulomb-metre' },
                { label: 'C', text: 'coulomb/metre' },
                { label: 'D', text: 'newton-metre' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "The force per unit charge is known as:",
            options: [
                { label: 'A', text: 'Electric potential' },
                { label: 'B', text: 'Electric flux' },
                { label: 'C', text: 'Electric field' },
                { label: 'D', text: 'Electric current' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "The internal resistance of a cell is measured using:",
            options: [
                { label: 'A', text: 'Voltmeter' },
                { label: 'B', text: 'Ammeter' },
                { label: 'C', text: 'Potentiometer' },
                { label: 'D', text: 'Galvanometer' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
        {
            questionText: "Which material is used for making standard resistors?",
            options: [
                { label: 'A', text: 'Copper' },
                { label: 'B', text: 'Constantan' },
                { label: 'C', text: 'Silver' },
                { label: 'D', text: 'Aluminium' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "The principle of working of a transformer is:",
            options: [
                { label: 'A', text: 'Self induction' },
                { label: 'B', text: 'Mutual induction' },
                { label: 'C', text: 'Eddy currents' },
                { label: 'D', text: 'Hysteresis' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Electromagnetic waves are produced by:",
            options: [
                { label: 'A', text: 'Static charges' },
                { label: 'B', text: 'Accelerated charges' },
                { label: 'C', text: 'Moving charges with constant velocity' },
                { label: 'D', text: 'Chargeless particles' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "Brewster's angle (ip) and refractive index (n) of a medium are related as:",
            options: [
                { label: 'A', text: 'n = sin ip' },
                { label: 'B', text: 'n = cos ip' },
                { label: 'C', text: 'n = tan ip' },
                { label: 'D', text: 'n = cot ip' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
        {
            questionText: "The dual nature of light is exhibited by:",
            options: [
                { label: 'A', text: 'Photoelectric effect' },
                { label: 'B', text: 'Interference' },
                { label: 'C', text: 'Diffraction' },
                { label: 'D', text: 'Photoelectric effect and Interference' },
            ],
            correctAnswer: 'D',
            difficulty: 'hard',
        },
        {
            questionText: "The ratio of the radius of the 2nd orbit to the 1st orbit of hydrogen atom is:",
            options: [
                { label: 'A', text: '2:1' },
                { label: 'B', text: '1:2' },
                { label: 'C', text: '4:1' },
                { label: 'D', text: '1:4' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
        {
            questionText: "The band gap energy is maximum for:",
            options: [
                { label: 'A', text: 'Metals' },
                { label: 'B', text: 'Semiconductors' },
                { label: 'C', text: 'Insulators' },
                { label: 'D', text: 'Superconductors' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
    ],
    Chemistry: [
        {
            questionText: "The coordination number of an atom in a face-centered cubic unit cell (fcc) is:",
            options: [
                { label: 'A', text: '4' },
                { label: 'B', text: '6' },
                { label: 'C', text: '8' },
                { label: 'D', text: '12' },
            ],
            correctAnswer: 'D',
            difficulty: 'medium',
        },
        {
            questionText: "The unit of rate constant for a first-order reaction is:",
            options: [
                { label: 'A', text: 'mol L⁻¹ s⁻¹' },
                { label: 'B', text: 'L mol⁻¹ s⁻¹' },
                { label: 'C', text: 's⁻¹' },
                { label: 'D', text: 'L² mol⁻² s⁻¹' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "Which of the following noble gases is most reactive?",
            options: [
                { label: 'A', text: 'He' },
                { label: 'B', text: 'Ne' },
                { label: 'C', text: 'Ar' },
                { label: 'D', text: 'Xe' },
            ],
            correctAnswer: 'D',
            difficulty: 'medium',
        },
        {
            questionText: "Oxidation state of iron in [Fe(CN)₆]³⁻ is:",
            options: [
                { label: 'A', text: '+2' },
                { label: 'B', text: '+3' },
                { label: 'C', text: '+4' },
                { label: 'D', text: '+6' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "The generic formula for Alkynes is:",
            options: [
                { label: 'A', text: 'CnH2n+2' },
                { label: 'B', text: 'CnH2n' },
                { label: 'C', text: 'CnH2n-2' },
                { label: 'D', text: 'CnH2n-1' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "Which among the following is a natural polymer?",
            options: [
                { label: 'A', text: 'Nylon-6,6' },
                { label: 'B', text: 'Terylene' },
                { label: 'C', text: 'Neoprene' },
                { label: 'D', text: 'Natural rubber' },
            ],
            correctAnswer: 'D',
            difficulty: 'easy',
        },
        {
            questionText: "Phenol on distillation with Zinc dust gives:",
            options: [
                { label: 'A', text: 'Benzene' },
                { label: 'B', text: 'Toluene' },
                { label: 'C', text: 'Benzaldehyde' },
                { label: 'D', text: 'Benzoic acid' },
            ],
            correctAnswer: 'A',
            difficulty: 'medium',
        },
        {
            questionText: "The reagent used in Reimer-Tiemann reaction is:",
            options: [
                { label: 'A', text: 'CHCl₃ / NaOH' },
                { label: 'B', text: 'CO₂ / NaOH' },
                { label: 'C', text: 'Br₂ / Fe' },
                { label: 'D', text: 'Zn / HCl' },
            ],
            correctAnswer: 'A',
            difficulty: 'hard',
        },
        {
            questionText: "Glucose is a/an:",
            options: [
                { label: 'A', text: 'Aldohexose' },
                { label: 'B', text: 'Ketohexose' },
                { label: 'C', text: 'Aldopentose' },
                { label: 'D', text: 'Ketopentose' },
            ],
            correctAnswer: 'A',
            difficulty: 'easy',
        },
        {
            questionText: "Transition elements are located in which block of the periodic table?",
            options: [
                { label: 'A', text: 's-block' },
                { label: 'B', text: 'p-block' },
                { label: 'C', text: 'd-block' },
                { label: 'D', text: 'f-block' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
    ],
    Mathematics: [
        {
            questionText: "If A is a square matrix of order 3 and |A| = 5, then |adj A| is:",
            options: [
                { label: 'A', text: '5' },
                { label: 'B', text: '25' },
                { label: 'C', text: '125' },
                { label: 'D', text: '15' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "The modulus of 1 + i√3 is:",
            options: [
                { label: 'A', text: '1' },
                { label: 'B', text: '2' },
                { label: 'C', text: '3' },
                { label: 'D', text: '4' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "The value of 'n' in the term iⁿ which equals -1 is:",
            options: [
                { label: 'A', text: '1' },
                { label: 'B', text: '2' },
                { label: 'C', text: '3' },
                { label: 'D', text: '4' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "The eccentricity of a rectangular hyperbola is:",
            options: [
                { label: 'A', text: '√2' },
                { label: 'B', text: '1' },
                { label: 'C', text: '1/√2' },
                { label: 'D', text: '2' },
            ],
            correctAnswer: 'A',
            difficulty: 'medium',
        },
        {
            questionText: "The direction cosines of the x-axis are:",
            options: [
                { label: 'A', text: '(1, 0, 0)' },
                { label: 'B', text: '(0, 1, 0)' },
                { label: 'C', text: '(0, 0, 1)' },
                { label: 'D', text: '(1, 1, 1)' },
            ],
            correctAnswer: 'A',
            difficulty: 'easy',
        },
        {
            questionText: "The derivative of tan⁻¹(x) is:",
            options: [
                { label: 'A', text: '1/(1-x²)' },
                { label: 'B', text: '1/(1+x²)' },
                { label: 'C', text: '1/√(1-x²)' },
                { label: 'D', text: 'sec²x' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "The value of ∫ sin x dx is:",
            options: [
                { label: 'A', text: 'cos x + C' },
                { label: 'B', text: '-cos x + C' },
                { label: 'C', text: 'sin x + C' },
                { label: 'D', text: '-sin x + C' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "The degree of the differential equation (dy/dx)² + y = x is:",
            options: [
                { label: 'A', text: '1' },
                { label: 'B', text: '2' },
                { label: 'C', text: '0' },
                { label: 'D', text: 'Not defined' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "Which of the following is a binary operation on R?",
            options: [
                { label: 'A', text: 'a * b = a - b' },
                { label: 'B', text: 'a * b = a/b' },
                { label: 'C', text: 'a * b = √(a+b)' },
                { label: 'D', text: 'a * b = log(a+b)' },
            ],
            correctAnswer: 'A',
            difficulty: 'medium',
        },
        {
            questionText: "Mean of a Binomial distribution with parameters n and p is:",
            options: [
                { label: 'A', text: 'np' },
                { label: 'B', text: 'npq' },
                { label: 'C', text: '√np' },
                { label: 'D', text: 'p/n' },
            ],
            correctAnswer: 'A',
            difficulty: 'easy',
        },
    ],
    Botany: [
        {
            questionText: "Who is known as the Father of Indian Plant Anatomy?",
            options: [
                { label: 'A', text: 'M.S. Swaminathan' },
                { label: 'B', text: 'P. Maheshwari' },
                { label: 'C', text: 'K.A. Chowdhury' },
                { label: 'D', text: 'Birbal Sahni' },
            ],
            correctAnswer: 'C',
            difficulty: 'hard',
        },
        {
            questionText: "The functional unit of inheritance is:",
            options: [
                { label: 'A', text: 'Cistron' },
                { label: 'B', text: 'Muton' },
                { label: 'C', text: 'Recon' },
                { label: 'D', text: 'Chromosome' },
            ],
            correctAnswer: 'A',
            difficulty: 'medium',
        },
        {
            questionText: "Glycolysis occurs in:",
            options: [
                { label: 'A', text: 'Mitochondria' },
                { label: 'B', text: 'Cytoplasm' },
                { label: 'C', text: 'Chloroplast' },
                { label: 'D', text: 'Ribosome' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Which of the following is an example of a C4 plant?",
            options: [
                { label: 'A', text: 'Rice' },
                { label: 'B', text: 'Wheat' },
                { label: 'C', text: 'Maize' },
                { label: 'D', text: 'Mango' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
        {
            questionText: "The process of production of clones of organisms with same genotype is:",
            options: [
                { label: 'A', text: 'Tissue culture' },
                { label: 'B', text: 'Hybridization' },
                { label: 'C', text: 'Polyploidy' },
                { label: 'D', text: 'Mutation' },
            ],
            correctAnswer: 'A',
            difficulty: 'medium',
        },
    ],
    Zoology: [
        {
            questionText: "Which hormone is called the 'Emergency Hormone'?",
            options: [
                { label: 'A', text: 'Thyroxine' },
                { label: 'B', text: 'Insulin' },
                { label: 'C', text: 'Adrenaline' },
                { label: 'D', text: 'Estrogen' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "The volume of air inhaled or exhaled during normal breathing is:",
            options: [
                { label: 'A', text: 'Tidal volume' },
                { label: 'B', text: 'Vital capacity' },
                { label: 'C', text: 'Residual volume' },
                { label: 'D', text: 'Inspiratory capacity' },
            ],
            correctAnswer: 'A',
            difficulty: 'medium',
        },
        {
            questionText: "Which organ is known as the 'Graveyard of RBCs'?",
            options: [
                { label: 'A', text: 'Liver' },
                { label: 'B', text: 'Spleen' },
                { label: 'C', text: 'Kidney' },
                { label: 'D', text: 'Heart' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Double fertilization is the characteristic of:",
            options: [
                { label: 'A', text: 'Algae' },
                { label: 'B', text: 'Fungi' },
                { label: 'C', text: 'Angiosperms' },
                { label: 'D', text: 'Gymnosperms' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
        {
            questionText: "The scientific name of human beings is:",
            options: [
                { label: 'A', text: 'Homo habilis' },
                { label: 'B', text: 'Homo erectus' },
                { label: 'C', text: 'Homo sapiens' },
                { label: 'D', text: 'Homo neanderthalensis' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
    ],
    Biology: [
        {
            questionText: "B-lymphocytes are responsible for:",
            options: [
                { label: 'A', text: 'Cell-mediated immunity' },
                { label: 'B', text: 'Humoral immunity' },
                { label: 'C', text: 'Innate immunity' },
                { label: 'D', text: 'Passive immunity' },
            ],
            correctAnswer: 'B',
            difficulty: 'medium',
        },
        {
            questionText: "Which of the following is a structural and functional unit of ecology?",
            options: [
                { label: 'A', text: 'Population' },
                { label: 'B', text: 'Community' },
                { label: 'C', text: 'Ecosystem' },
                { label: 'D', text: 'Biome' },
            ],
            correctAnswer: 'C',
            difficulty: 'easy',
        },
        {
            questionText: "The first successfully cloned mammal was:",
            options: [
                { label: 'A', text: 'Polly the sheep' },
                { label: 'B', text: 'Dolly the sheep' },
                { label: 'C', text: 'Molly the sheep' },
                { label: 'D', text: 'Holly the sheep' },
            ],
            correctAnswer: 'B',
            difficulty: 'easy',
        },
        {
            questionText: "Restricted enzymes are also known as:",
            options: [
                { label: 'A', text: 'Molecular scissors' },
                { label: 'B', text: 'Molecular glue' },
                { label: 'C', text: 'Genetic vectors' },
                { label: 'D', text: 'Cloning agents' },
            ],
            correctAnswer: 'A',
            difficulty: 'easy',
        },
        {
            questionText: "The term 'Ecology' was coined by:",
            options: [
                { label: 'A', text: 'Aristotle' },
                { label: 'B', text: 'Charles Darwin' },
                { label: 'C', text: 'Ernst Haeckel' },
                { label: 'D', text: 'Gregor Mendel' },
            ],
            correctAnswer: 'C',
            difficulty: 'medium',
        },
    ],
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        // Check for admin authorization
        const { adminKey } = req.body;
        if (adminKey !== 'rasi-admin-seed-2024') {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized. Invalid admin key.',
            });
        }

        // Clear existing questions to ensure fresh start with TN syllabus
        await ScholarshipQuestion.deleteMany({});

        const insertedCounts = {};

        for (const [subject, questions] of Object.entries(sampleQuestions)) {
            const questionsWithSubject = questions.map(q => ({
                ...q,
                subject,
                source: 'TN State Board Syllabus (Class 12)',
                isActive: true,
            }));

            // Insert questions multiple times to reach at least 50 per subject for randomness
            const targetCount = 50;
            const toInsert = [];

            while (toInsert.length < targetCount) {
                for (const q of questionsWithSubject) {
                    if (toInsert.length >= targetCount) break;
                    toInsert.push({
                        ...q,
                        _id: undefined,
                    });
                }
            }

            if (toInsert.length > 0) {
                await ScholarshipQuestion.insertMany(toInsert);
            }
            insertedCounts[subject] = toInsert.length;
        }

        // Get final counts
        const finalCounts = {};
        for (const subject of Object.keys(sampleQuestions)) {
            finalCounts[subject] = await ScholarshipQuestion.countDocuments({ subject });
        }

        res.status(200).json({
            success: true,
            message: 'TN State Board Syllabus Questions seeded successfully',
            inserted: insertedCounts,
            totalQuestions: finalCounts,
        });

    } catch (error) {
        console.error('Seed questions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to seed questions',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
