// Physics Practice Questions from Half-Yearly Examination 2025
// Extracted from the exam papers provided

export const physicsQuestions = [
    // Part I - Multiple Choice Questions (15 x 1 = 15 marks)
    {
        id: 'phys_001',
        questionText: 'An object is placed in front of a convex mirror of focal length of f and the maximum and minimum distance of an object from the mirror such that the image formed is real and magnified. What are these distances?',
        options: [
            { label: 'A', text: '2f and c' },
            { label: 'B', text: 'c and ∞' },
            { label: 'C', text: 'f and 0' },
            { label: 'D', text: 'none of these' },
        ],
        correctAnswer: 'B',
        difficulty: 'medium',
        topic: 'Optics',
    },
    {
        id: 'phys_002',
        questionText: 'The zener diode is primarily used as:',
        options: [
            { label: 'A', text: 'Rectifier' },
            { label: 'B', text: 'Amplifier' },
            { label: 'C', text: 'Oscillator' },
            { label: 'D', text: 'Voltage regulator' },
        ],
        correctAnswer: 'D',
        difficulty: 'easy',
        topic: 'Semiconductors',
    },
    {
        id: 'phys_003',
        questionText: 'The kinetic energy of slow neutrons is:',
        options: [
            { label: 'A', text: '0 to 10 eV' },
            { label: 'B', text: '0 to 12 eV' },
            { label: 'C', text: '0.5 to 10 MeV' },
            { label: 'D', text: '0.5 to 1000 eV' },
        ],
        correctAnswer: 'A',
        difficulty: 'medium',
        topic: 'Nuclear Physics',
    },
    {
        id: 'phys_004',
        questionText: 'If the nuclear radius of ²⁷Al is 3.6 Fermi, the approximate nuclear radius of ⁶⁴Cu in fermi is:',
        options: [
            { label: 'A', text: '2.4' },
            { label: 'B', text: '1.2' },
            { label: 'C', text: '4.8' },
            { label: 'D', text: '3.6' },
        ],
        correctAnswer: 'C',
        difficulty: 'hard',
        topic: 'Nuclear Physics',
    },
    {
        id: 'phys_005',
        questionText: 'The flux linked with a coil at any instant is given by Φₐ = 10t² - 50t + 250. The inductance emf at t = 3s is:',
        options: [
            { label: 'A', text: '-190 V' },
            { label: 'B', text: '-10V' },
            { label: 'C', text: '10V' },
            { label: 'D', text: '190V' },
        ],
        correctAnswer: 'B',
        difficulty: 'hard',
        topic: 'Electromagnetic Induction',
    },
    {
        id: 'phys_006',
        questionText: '"Ski wax" is an application of nano product in the field of:',
        options: [
            { label: 'A', text: 'Medicine' },
            { label: 'B', text: 'Textile' },
            { label: 'C', text: 'Sports' },
            { label: 'D', text: 'Automobile industry' },
        ],
        correctAnswer: 'C',
        difficulty: 'easy',
        topic: 'Nanotechnology',
    },
    {
        id: 'phys_007',
        questionText: 'A toaster operating at 240 V has a resistance of 120Ω. Its power is:',
        options: [
            { label: 'A', text: '400 W' },
            { label: 'B', text: '2 W' },
            { label: 'C', text: '480 W' },
            { label: 'D', text: '240 W' },
        ],
        correctAnswer: 'C',
        difficulty: 'medium',
        topic: 'Current Electricity',
    },
    {
        id: 'phys_008',
        questionText: 'A non-conducting charged ring carrying a charge of q, mass m, and radius r is rotated about its own axis with constant angular speed ω. Find the ratio of its magnetic moment with angular momentum.',
        options: [
            { label: 'A', text: 'q/m' },
            { label: 'B', text: '2q/m' },
            { label: 'C', text: 'q/2m' },
            { label: 'D', text: 'q/4m' },
        ],
        correctAnswer: 'C',
        difficulty: 'hard',
        topic: 'Magnetism',
    },
    {
        id: 'phys_009',
        questionText: 'When an electric current flows through a long straight copper conductor, if the magnetic field at a perpendicular distance of 5 cm is B, then what is the magnetic field at a distance of 20 cm.',
        options: [
            { label: 'A', text: 'B/6' },
            { label: 'B', text: 'B/5' },
            { label: 'C', text: 'B/3' },
            { label: 'D', text: 'B/2' },
        ],
        correctAnswer: 'B',
        difficulty: 'medium',
        topic: 'Magnetism',
    },
    {
        id: 'phys_010',
        questionText: 'Fraunhofer lines are an example of _________ spectrum.',
        options: [
            { label: 'A', text: 'line emission' },
            { label: 'B', text: 'line absorption' },
            { label: 'C', text: 'band emission' },
            { label: 'D', text: 'bond absorption' },
        ],
        correctAnswer: 'B',
        difficulty: 'easy',
        topic: 'Optics',
    },
    {
        id: 'phys_011',
        questionText: 'In an electromagnetic wave travelling in free space the rms value of the electric field is 3Vm⁻¹. The peak value of the magnetic field is:',
        options: [
            { label: 'A', text: '1.414 x 10⁻⁸ T' },
            { label: 'B', text: '1.0 x 10⁻⁸ T' },
            { label: 'C', text: '2.828 x 10⁻⁸ T' },
            { label: 'D', text: '2.0 x 10⁻⁸ T' },
        ],
        correctAnswer: 'A',
        difficulty: 'hard',
        topic: 'Electromagnetic Waves',
    },
    {
        id: 'phys_012',
        questionText: 'Which of the following electromagnetic radiations provide information about the structure of atomic nuclei?',
        options: [
            { label: 'A', text: 'X-ray' },
            { label: 'B', text: 'Gamma-ray' },
            { label: 'C', text: 'micro wave' },
            { label: 'D', text: 'both (a) and (b)' },
        ],
        correctAnswer: 'D',
        difficulty: 'medium',
        topic: 'Electromagnetic Waves',
    },
    {
        id: 'phys_013',
        questionText: 'The threshold wavelength for a metal surface whose photoelectric work function is 3.313 eV is:',
        options: [
            { label: 'A', text: '4125 Å' },
            { label: 'B', text: '3750 Å' },
            { label: 'C', text: '6000 Å' },
            { label: 'D', text: '2062 Å' },
        ],
        correctAnswer: 'B',
        difficulty: 'hard',
        topic: 'Photoelectric Effect',
    },
    {
        id: 'phys_014',
        questionText: 'The blue print for making ultra durable synthetic material is mimicked from:',
        options: [
            { label: 'A', text: 'Lotus leaf' },
            { label: 'B', text: 'Morpho butterfly' },
            { label: 'C', text: 'Parrot fish' },
            { label: 'D', text: 'Peacock feather' },
        ],
        correctAnswer: 'B',
        difficulty: 'easy',
        topic: 'Materials Science',
    },
    {
        id: 'phys_015',
        questionText: 'When two batteries are connected in series or in parallel, if the same current is passed through the circuit with a 2Ω resistor, the internal resistance of the battery is:',
        options: [
            { label: 'A', text: '1Ω' },
            { label: 'B', text: '2Ω' },
            { label: 'C', text: '0.5Ω' },
            { label: 'D', text: '2.5Ω' },
        ],
        correctAnswer: 'B',
        difficulty: 'hard',
        topic: 'Current Electricity',
    },
    // Additional questions from Paper 2
    {
        id: 'phys_016',
        questionText: 'The temperature coefficient of resistance of a wire is 0.00125/°C. At 300K, its resistance is 1Ω. The resistance of the wire will be at 2Ω is:',
        options: [
            { label: 'A', text: '1154K' },
            { label: 'B', text: '1100K' },
            { label: 'C', text: '1400K' },
            { label: 'D', text: '1127K' },
        ],
        correctAnswer: 'D',
        difficulty: 'hard',
        topic: 'Current Electricity',
    },
    {
        id: 'phys_017',
        questionText: 'If voltage applied on a Capacitor is increased from V to 2V, choose the correct conclusion:',
        options: [
            { label: 'A', text: 'Q remains the same, C is doubled' },
            { label: 'B', text: 'Q is doubled, C doubled' },
            { label: 'C', text: 'C remains same, Q doubled' },
            { label: 'D', text: 'Both Q and C remain same' },
        ],
        correctAnswer: 'C',
        difficulty: 'medium',
        topic: 'Electrostatics',
    },
    {
        id: 'phys_018',
        questionText: 'The internal resistance of a 2.1V cell which gives a current of 0.2A through a resistance of 10Ω is:',
        options: [
            { label: 'A', text: '0.2Ω' },
            { label: 'B', text: '0.5Ω' },
            { label: 'C', text: '0.8Ω' },
            { label: 'D', text: '1.0Ω' },
        ],
        correctAnswer: 'B',
        difficulty: 'medium',
        topic: 'Current Electricity',
    },
    {
        id: 'phys_019',
        questionText: 'A circular coil of radius 5cm and 50 turns carries a Current of 3 Ampere. The magnetic dipole moment of the coil is:',
        options: [
            { label: 'A', text: '1.0 Am²' },
            { label: 'B', text: '1.2 Am²' },
            { label: 'C', text: '0.5Am²' },
            { label: 'D', text: '0.8 m²' },
        ],
        correctAnswer: 'A',
        difficulty: 'medium',
        topic: 'Magnetism',
    },
    {
        id: 'phys_020',
        questionText: 'In a transformer, the number of turns in the primary and the secondary are 410 and 1230 respectively. If the Current in primary is 6A, then that in the secondary coil is:',
        options: [
            { label: 'A', text: '2A' },
            { label: 'B', text: '18A' },
            { label: 'C', text: '12 A' },
            { label: 'D', text: '1A' },
        ],
        correctAnswer: 'A',
        difficulty: 'medium',
        topic: 'AC Circuits',
    },
    {
        id: 'phys_021',
        questionText: 'The radius of curvature of curved surface at a thin plano convex lens is 10cm and the refractive index is 1.5. If the plane surface is silvered then the focal length will be:',
        options: [
            { label: 'A', text: '5cm' },
            { label: 'B', text: '10cm' },
            { label: 'C', text: '15cm' },
            { label: 'D', text: '20cm' },
        ],
        correctAnswer: 'B',
        difficulty: 'hard',
        topic: 'Optics',
    },
    {
        id: 'phys_022',
        questionText: 'The transverse nature of light is shown in:',
        options: [
            { label: 'A', text: 'Interference' },
            { label: 'B', text: 'Diffraction' },
            { label: 'C', text: 'Scattering' },
            { label: 'D', text: 'Polarisation' },
        ],
        correctAnswer: 'D',
        difficulty: 'easy',
        topic: 'Wave Optics',
    },
    {
        id: 'phys_023',
        questionText: 'If the input of the NOT gate is A=1011, it outputs is:',
        options: [
            { label: 'A', text: '0100' },
            { label: 'B', text: '1000' },
            { label: 'C', text: '1100' },
            { label: 'D', text: '0011' },
        ],
        correctAnswer: 'A',
        difficulty: 'easy',
        topic: 'Digital Electronics',
    },
    {
        id: 'phys_024',
        questionText: 'A current carrying wire produces in the neighborhood:',
        options: [
            { label: 'A', text: 'Electric and magnetic fields' },
            { label: 'B', text: 'Electric field only' },
            { label: 'C', text: 'Magnetic field only' },
            { label: 'D', text: 'No field' },
        ],
        correctAnswer: 'A',
        difficulty: 'easy',
        topic: 'Magnetism',
    },
    {
        id: 'phys_025',
        questionText: 'If the net reactance of the LCR Series AC Circuit is zero, the phase difference between the resultant Voltage and current in the circuit is:',
        options: [
            { label: 'A', text: '30°' },
            { label: 'B', text: '45°' },
            { label: 'C', text: '60°' },
            { label: 'D', text: '0°' },
        ],
        correctAnswer: 'D',
        difficulty: 'medium',
        topic: 'AC Circuits',
    },
    {
        id: 'phys_026',
        questionText: 'What is the ratio of the energies of the hydrogen atom in its first to a second excited state?',
        options: [
            { label: 'A', text: '9:4' },
            { label: 'B', text: '3:3' },
            { label: 'C', text: '4:1' },
            { label: 'D', text: '1:2' },
        ],
        correctAnswer: 'A',
        difficulty: 'hard',
        topic: 'Atomic Physics',
    },
    {
        id: 'phys_027',
        questionText: 'The electric field at the equator of a dipole is E. If the strength of the dipole and distance are now doubled, then the electric field will be:',
        options: [
            { label: 'A', text: 'E/2' },
            { label: 'B', text: 'E/8' },
            { label: 'C', text: 'E/4' },
            { label: 'D', text: 'E' },
        ],
        correctAnswer: 'C',
        difficulty: 'hard',
        topic: 'Electrostatics',
    },
    // Part II - Short Answer Questions (2 marks each)
    {
        id: 'phys_028',
        questionText: 'What are LC oscillations?',
        options: [
            { label: 'A', text: 'Oscillations in a circuit containing only resistance' },
            { label: 'B', text: 'Oscillations in a circuit with inductor and capacitor' },
            { label: 'C', text: 'Oscillations caused by external force' },
            { label: 'D', text: 'Damped oscillations' },
        ],
        correctAnswer: 'B',
        difficulty: 'easy',
        topic: 'AC Circuits',
    },
    {
        id: 'phys_029',
        questionText: 'What are the conditions for total internal reflection to take place?',
        options: [
            { label: 'A', text: 'Light must travel from denser to rarer medium' },
            { label: 'B', text: 'Light must travel from rarer to denser medium' },
            { label: 'C', text: 'Angle of incidence must be less than critical angle' },
            { label: 'D', text: 'Both A and angle of incidence greater than critical angle' },
        ],
        correctAnswer: 'D',
        difficulty: 'medium',
        topic: 'Optics',
    },
    {
        id: 'phys_030',
        questionText: 'Why do stars twinkle?',
        options: [
            { label: 'A', text: 'Due to nuclear reactions in stars' },
            { label: 'B', text: 'Due to refraction of light through atmospheric layers' },
            { label: 'C', text: 'Due to reflection from clouds' },
            { label: 'D', text: 'Due to diffraction' },
        ],
        correctAnswer: 'B',
        difficulty: 'easy',
        topic: 'Optics',
    },
    {
        id: 'phys_031',
        questionText: 'Which of the following is a use of polaroids?',
        options: [
            { label: 'A', text: 'To see ultraviolet light' },
            { label: 'B', text: '3D movie projection' },
            { label: 'C', text: 'To amplify sound' },
            { label: 'D', text: 'To generate electricity' },
        ],
        correctAnswer: 'B',
        difficulty: 'easy',
        topic: 'Wave Optics',
    },
    {
        id: 'phys_032',
        questionText: 'The unit of inductance is:',
        options: [
            { label: 'A', text: 'Ohm' },
            { label: 'B', text: 'Henry' },
            { label: 'C', text: 'Farad' },
            { label: 'D', text: 'Weber' },
        ],
        correctAnswer: 'B',
        difficulty: 'easy',
        topic: 'Electromagnetic Induction',
    },
    {
        id: 'phys_033',
        questionText: 'State de Broglie hypothesis:',
        options: [
            { label: 'A', text: 'Light has only wave nature' },
            { label: 'B', text: 'Matter has only particle nature' },
            { label: 'C', text: 'Moving particles have wave nature with wavelength λ = h/mv' },
            { label: 'D', text: 'Energy is always conserved' },
        ],
        correctAnswer: 'C',
        difficulty: 'easy',
        topic: 'Quantum Physics',
    },
    {
        id: 'phys_034',
        questionText: 'What is the key difference between drift velocity and mobility?',
        options: [
            { label: 'A', text: 'Both are the same' },
            { label: 'B', text: 'Drift velocity is per unit electric field, mobility is absolute' },
            { label: 'C', text: 'Mobility is drift velocity per unit electric field' },
            { label: 'D', text: 'Neither depends on electric field' },
        ],
        correctAnswer: 'C',
        difficulty: 'medium',
        topic: 'Current Electricity',
    },
    {
        id: 'phys_035',
        questionText: 'What is the value of x when the Wheatstone\'s network is balanced? P = 500Ω, Q = 800Ω, R = (x + 400)Ω and S = 1000Ω',
        options: [
            { label: 'A', text: '225Ω' },
            { label: 'B', text: '625Ω' },
            { label: 'C', text: '800Ω' },
            { label: 'D', text: '400Ω' },
        ],
        correctAnswer: 'A',
        difficulty: 'hard',
        topic: 'Current Electricity',
    },
];

// Function to get random questions
export function getRandomQuestions(count = 15) {
    const shuffled = [...physicsQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, physicsQuestions.length));
}

// Function to get questions by difficulty
export function getQuestionsByDifficulty(difficulty, count = 5) {
    const filtered = physicsQuestions.filter(q => q.difficulty === difficulty);
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, filtered.length));
}

// Function to get a balanced set of questions
export function getBalancedQuestions(totalCount = 15) {
    const easyCount = Math.floor(totalCount * 0.3);
    const mediumCount = Math.floor(totalCount * 0.4);
    const hardCount = totalCount - easyCount - mediumCount;

    const easyQuestions = getQuestionsByDifficulty('easy', easyCount);
    const mediumQuestions = getQuestionsByDifficulty('medium', mediumCount);
    const hardQuestions = getQuestionsByDifficulty('hard', hardCount);

    const combined = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
    return combined.sort(() => 0.5 - Math.random());
}

export default physicsQuestions;
