// scripts/question_bank/physics_part1.mjs
// Questions PHY-001 to PHY-075: Electrostatics, Current Electricity, Magnetism

export const physicsPart1 = [
  // 1-10 Electrostatics
  {
    code: "PHY-001", subject: "Physics", topic: "Electrostatics", difficulty: "easy",
    questionText: "What is the SI unit of electric dipole moment?",
    questionTextTamil: "மின்னிருமுனை திருப்புத்திறனின் SI அலகு யாது?",
    options: [
      { label: "A", text: "Newton per Coulomb (N/C)" },
      { label: "B", text: "Coulomb metre (C m)" },
      { label: "C", text: "Coulomb per metre (C/m)" },
      { label: "D", text: "Joule per Coulomb (J/C)" }
    ],
    optionsTamil: [
      { label: "A", text: "நியூட்டன் / கூலும் (N/C)" },
      { label: "B", text: "கூலும் மீட்டர் (C m)" },
      { label: "C", text: "கூலும் / மீட்டர் (C/m)" },
      { label: "D", text: "ஜூல் / கூலும் (J/C)" }
    ],
    correctAnswer: "B",
    explanation: "Electric dipole moment p = q * 2a. Its SI unit is Coulomb metre (C m).",
    explanationTamil: "மின்னிருமுனை திருப்புத்திறன் p = q * 2a, இதன் SI அலகு கூலும் மீட்டர் (C m) ஆகும்."
  },
  {
    code: "PHY-002", subject: "Physics", topic: "Electrostatics", difficulty: "easy",
    questionText: "Coulomb force between two point charges varies with distance r as:",
    questionTextTamil: "இரு புள்ளி மின்னூட்டங்களுக்கு இடையிலான கூலும் விசை தொலைவு r-ஐ பொறுத்து எவ்வாறு மாறுபடும்?",
    options: [
      { label: "A", text: "r" }, { label: "B", text: "1/r" }, { label: "C", text: "1/r²" }, { label: "D", text: "r²" }
    ],
    optionsTamil: [
      { label: "A", text: "r" }, { label: "B", text: "1/r" }, { label: "C", text: "1/r²" }, { label: "D", text: "r²" }
    ],
    correctAnswer: "C",
    explanation: "Coulomb's Law states F ∝ 1/r².",
    explanationTamil: "கூலும் விதியின்படி விசை தொலைவின் இருமடிக்கு எதிர்த்தகவில் (1/r²) அமையும்."
  },
  {
    code: "PHY-003", subject: "Physics", topic: "Electrostatics", difficulty: "medium",
    questionText: "The electrostatic potential inside a charged conducting hollow sphere is:",
    questionTextTamil: "மின்னூட்டம் பெற்ற உள்ளீடற்ற கோளக் கடத்தியின் உட்புறத்தில் மின்னழுத்தம்:",
    options: [
      { label: "A", text: "Zero" },
      { label: "B", text: "Constant and equal to that at the surface" },
      { label: "C", text: "Increases towards centre" },
      { label: "D", text: "Decreases towards centre" }
    ],
    optionsTamil: [
      { label: "A", text: "சுழி" },
      { label: "B", text: "மாறிலி மற்றும் பரப்பில் உள்ள மின்னழுத்தத்திற்கு சமம்" },
      { label: "C", text: "மையத்தை நோக்கி அதிகரிக்கும்" },
      { label: "D", text: "மையத்தை நோக்கி குறையும்" }
    ],
    correctAnswer: "B",
    explanation: "Electric field is zero inside a conductor, hence potential V is constant and equals surface potential.",
    explanationTamil: "கடத்தியினுள் மின்புலம் சுழி என்பதால் மின்னழுத்தம் மாறிலியாகவும் பரப்பின் மதிப்புக்கு சமமாகவும் இருக்கும்."
  },
  {
    code: "PHY-004", subject: "Physics", topic: "Electrostatics", difficulty: "medium",
    questionText: "The electric flux through a closed surface enclosing net charge q is given by:",
    questionTextTamil: "q நிகர மின்னூட்டத்தை உள்ளடக்கிய மூடிய பரப்பின் வழியே பாயும் மின்பாயம்:",
    options: [
      { label: "A", text: "q / ε₀" }, { label: "B", text: "q * ε₀" }, { label: "C", text: "ε₀ / q" }, { label: "D", text: "q / (4πε₀)" }
    ],
    optionsTamil: [
      { label: "A", text: "q / ε₀" }, { label: "B", text: "q * ε₀" }, { label: "C", text: "ε₀ / q" }, { label: "D", text: "q / (4πε₀)" }
    ],
    correctAnswer: "A",
    explanation: "Gauss's law states that total electric flux Φ = q_enclosed / ε₀.",
    explanationTamil: "காஸ் விதியின்படி, மூடிய பரப்பின் வழியே பாயும் மொத்த மின்பாயம் Φ = q / ε₀ ஆகும்."
  },
  {
    code: "PHY-005", subject: "Physics", topic: "Electrostatics", difficulty: "medium",
    questionText: "When a dielectric slab of dielectric constant K is inserted between the plates of a parallel plate capacitor, its capacitance:",
    questionTextTamil: "இணைத்தட்டு மின்தேக்கியில் K மின்காப்பு மாறிலி கொண்ட பொருள் வைக்கப்படும் போது மின்தேக்குத்திறன்:",
    options: [
      { label: "A", text: "Decreases K times" },
      { label: "B", text: "Increases K times" },
      { label: "C", text: "Remains unchanged" },
      { label: "D", text: "Becomes zero" }
    ],
    optionsTamil: [
      { label: "A", text: "K மடங்கு குறையும்" },
      { label: "B", text: "K மடங்கு அதிகரிக்கும்" },
      { label: "C", text: "மாறாமல் இருக்கும்" },
      { label: "D", text: "சுழியாகும்" }
    ],
    correctAnswer: "B",
    explanation: "Capacitance increases K times: C' = K * C.",
    explanationTamil: "மின்தேக்குத்திறன் K மடங்கு அதிகரித்து C' = K * C ஆகிறது."
  },
  {
    code: "PHY-006", subject: "Physics", topic: "Electrostatics", difficulty: "easy",
    questionText: "The electrostatic potential energy stored in a capacitor of capacitance C and voltage V is:",
    questionTextTamil: "C மின்தேக்குத்திறன் மற்றும் V மின்னழுத்தம் கொண்ட மின்தேக்கியில் சேமிக்கப்படும் ஆற்றல்:",
    options: [
      { label: "A", text: "CV" }, { label: "B", text: "(1/2) C V²" }, { label: "C", text: "2 C V²" }, { label: "D", text: "(1/2) C² V" }
    ],
    optionsTamil: [
      { label: "A", text: "CV" }, { label: "B", text: "(1/2) C V²" }, { label: "C", text: "2 C V²" }, { label: "D", text: "(1/2) C² V" }
    ],
    correctAnswer: "B",
    explanation: "Energy stored in a capacitor U = (1/2) C V².",
    explanationTamil: "மின்தேக்கியில் சேமிக்கப்படும் ஆற்றல் U = (1/2) C V² ஆகும்."
  },
  {
    code: "PHY-007", subject: "Physics", topic: "Electrostatics", difficulty: "hard",
    questionText: "The ratio of electric field at an axial point to that at an equatorial point of a short dipole at equal distances is:",
    questionTextTamil: "சம தொலைவில் உள்ள ஒரு சிறு மின்னிருமுனையின் அச்சுக்கோடு மற்றும் நடுவரைக் கோட்டுப் புள்ளிகளில் உள்ள மின்புலங்களின் விகிதம்:",
    options: [
      { label: "A", text: "1 : 1" }, { label: "B", text: "1 : 2" }, { label: "C", text: "2 : 1" }, { label: "D", text: "4 : 1" }
    ],
    optionsTamil: [
      { label: "A", text: "1 : 1" }, { label: "B", text: "1 : 2" }, { label: "C", text: "2 : 1" }, { label: "D", text: "4 : 1" }
    ],
    correctAnswer: "C",
    explanation: "E_axial = 2kp/r³ and E_equatorial = kp/r³, so the ratio is 2 : 1.",
    explanationTamil: "E_axial = 2kp/r³ மற்றும் E_equatorial = kp/r³, எனவே விகிதம் 2 : 1 ஆகும்."
  },
  {
    code: "PHY-008", subject: "Physics", topic: "Electrostatics", difficulty: "medium",
    questionText: "The work done in moving a test charge over an equipotential surface is:",
    questionTextTamil: "சமமின்னழுத்தப் பரப்பின் மீது ஒரு சோதனை மின்னூட்டத்தை நகர்த்துவதில் செய்யப்படும் வேலை:",
    options: [
      { label: "A", text: "Positive" }, { label: "B", text: "Negative" }, { label: "C", text: "Zero" }, { label: "D", text: "Infinite" }
    ],
    optionsTamil: [
      { label: "A", text: "நேர்மதிப்பு" }, { label: "B", text: "எதிர்மதிப்பு" }, { label: "C", text: "சுழி (Zero)" }, { label: "D", text: "முடிவிலி" }
    ],
    correctAnswer: "C",
    explanation: "W = q * ΔV. On an equipotential surface, ΔV = 0, so work is zero.",
    explanationTamil: "வேலை W = q * ΔV. சமமின்னழுத்தப் பரப்பில் ΔV = 0 என்பதால் வேலை சுழியாகும்."
  },
  {
    code: "PHY-009", subject: "Physics", topic: "Electrostatics", difficulty: "easy",
    questionText: "Two identical capacitors of capacitance C are connected in parallel. Their equivalent capacitance is:",
    questionTextTamil: "C மின்தேக்குத்திறன் கொண்ட இரு ஒத்த மின்தேக்கிகள் பக்க இணைப்பில் இணைக்கப்பட்டால் தொகுபயன் மின்தேக்குத்திறன்:",
    options: [
      { label: "A", text: "C / 2" }, { label: "B", text: "C" }, { label: "C", text: "2C" }, { label: "D", text: "4C" }
    ],
    optionsTamil: [
      { label: "A", text: "C / 2" }, { label: "B", text: "C" }, { label: "C", text: "2C" }, { label: "D", text: "4C" }
    ],
    correctAnswer: "C",
    explanation: "In parallel combination, C_eq = C₁ + C₂ = C + C = 2C.",
    explanationTamil: "பக்க இணைப்பில் C_eq = C + C = 2C ஆகும்."
  },
  {
    code: "PHY-010", subject: "Physics", topic: "Electrostatics", difficulty: "medium",
    questionText: "The torque acting on an electric dipole of dipole moment p in uniform electric field E is:",
    questionTextTamil: "சீரான மின்புலம் E-ல் p திருப்புத்திறன் கொண்ட மின்னிருமுனை உணரும் திருப்புவிசை:",
    options: [
      { label: "A", text: "p · E" }, { label: "B", text: "p × E" }, { label: "C", text: "Zero" }, { label: "D", text: "E × p" }
    ],
    optionsTamil: [
      { label: "A", text: "p · E" }, { label: "B", text: "p × E" }, { label: "C", text: "சுழி" }, { label: "D", text: "E × p" }
    ],
    correctAnswer: "B",
    explanation: "Torque τ = p × E.",
    explanationTamil: "திருப்புவிசை வெக்டர் வடிவில் τ = p × E ஆகும்."
  },

  // 11-20 Electrostatics & Capacitance
  {
    code: "PHY-011", subject: "Physics", topic: "Electrostatics", difficulty: "easy",
    questionText: "The permittivity of free space ε₀ has unit:",
    questionTextTamil: "வெற்றிடத்தின் விடுதிறன் ε₀-ன் அலகு யாது?",
    options: [
      { label: "A", text: "C² N⁻¹ m⁻²" }, { label: "B", text: "N m² C⁻²" }, { label: "C", text: "C N⁻¹ m⁻¹" }, { label: "D", text: "N C⁻¹ m²" }
    ],
    optionsTamil: [
      { label: "A", text: "C² N⁻¹ m⁻²" }, { label: "B", text: "N m² C⁻²" }, { label: "C", text: "C N⁻¹ m⁻¹" }, { label: "D", text: "N C⁻¹ m²" }
    ],
    correctAnswer: "A",
    explanation: "From Coulomb's Law F = q₁q₂ / (4πε₀r²), ε₀ unit is C² N⁻¹ m⁻².",
    explanationTamil: "கூலும் விதியிலிருந்து ε₀ அலகு C² N⁻¹ m⁻²."
  },
  {
    code: "PHY-012", subject: "Physics", topic: "Electrostatics", difficulty: "easy",
    questionText: "Quantization of electric charge is expressed by:",
    questionTextTamil: "மின்னூட்டத்தின் குவாண்டமாக்கல் எந்த தொடர்பால் குறிக்கப்படுகிறது?",
    options: [
      { label: "A", text: "q = m c²" }, { label: "B", text: "q = ± n e" }, { label: "C", text: "q = C V" }, { label: "D", text: "q = I t" }
    ],
    optionsTamil: [
      { label: "A", text: "q = m c²" }, { label: "B", text: "q = ± n e" }, { label: "C", text: "q = C V" }, { label: "D", text: "q = I t" }
    ],
    correctAnswer: "B",
    explanation: "Electric charge exists in integral multiples of electron charge: q = ± n e.",
    explanationTamil: "மின்னூட்டம் எலக்ட்ரான் மின்னூட்டத்தின் முழு மடங்காக அமையும்: q = ± n e."
  },
  {
    code: "PHY-013", subject: "Physics", topic: "Electrostatics", difficulty: "medium",
    questionText: "The energy density in an electric field E in vacuum is:",
    questionTextTamil: "வெற்றிடத்தில் மின்புலம் E கொண்ட பகுதியில் மின்னாற்றல் அடர்த்தி:",
    options: [
      { label: "A", text: "(1/2) ε₀ E" }, { label: "B", text: "(1/2) ε₀ E²" }, { label: "C", text: "ε₀ E²" }, { label: "D", text: "(1/2) E² / ε₀" }
    ],
    optionsTamil: [
      { label: "A", text: "(1/2) ε₀ E" }, { label: "B", text: "(1/2) ε₀ E²" }, { label: "C", text: "ε₀ E²" }, { label: "D", text: "(1/2) E² / ε₀" }
    ],
    correctAnswer: "B",
    explanation: "Electrostatic energy density u = (1/2) ε₀ E².",
    explanationTamil: "நிலைமின்னழுத்த ஆற்றல் அடர்த்தி u = (1/2) ε₀ E²."
  },
  {
    code: "PHY-014", subject: "Physics", topic: "Electrostatics", difficulty: "easy",
    questionText: "A device used to generate very high electrostatic potential is:",
    questionTextTamil: "மிக அதிக நிலைமின்னழுத்த வேறுபாட்டை உருவாக்கப் பயன்படும் கருவி:",
    options: [
      { label: "A", text: "Van de Graaff generator" }, { label: "B", text: "Cyclotron" }, { label: "C", text: "Transformer" }, { label: "D", text: "Potentiometer" }
    ],
    optionsTamil: [
      { label: "A", text: "வான் டி கிராப் மின்னியற்றி" }, { label: "B", text: "சைக்ளோட்ரான்" }, { label: "C", text: "மின்மாற்றி" }, { label: "D", text: "மின்னழுத்தமானி" }
    ],
    correctAnswer: "A",
    explanation: "Van de Graaff generator produces electrostatic potentials of several million volts.",
    explanationTamil: "வான் டி கிராப் மின்னியற்றி பல மில்லியன் வோல்ட் மின்னழுத்தத்தை உருவாக்குகிறது."
  },
  {
    code: "PHY-015", subject: "Physics", topic: "Electrostatics", difficulty: "hard",
    questionText: "Three capacitors of 6 µF each are connected in series. Their equivalent capacitance is:",
    questionTextTamil: "ஒவ்வொன்றும் 6 µF கொண்ட மூன்று மின்தேக்கிகள் தொடரிணைப்பில் இணைக்கப்பட்டால் தொகுபயன் மின்தேக்குத்திறன்:",
    options: [
      { label: "A", text: "18 µF" }, { label: "B", text: "6 µF" }, { label: "C", text: "2 µF" }, { label: "D", text: "0.5 µF" }
    ],
    optionsTamil: [
      { label: "A", text: "18 µF" }, { label: "B", text: "6 µF" }, { label: "C", text: "2 µF" }, { label: "D", text: "0.5 µF" }
    ],
    correctAnswer: "C",
    explanation: "1/C_eq = 1/6 + 1/6 + 1/6 = 3/6 = 1/2, so C_eq = 2 µF.",
    explanationTamil: "1/C_eq = 1/6 + 1/6 + 1/6 = 3/6, எனவே C_eq = 2 µF."
  },
  {
    code: "PHY-016", subject: "Physics", topic: "Electrostatics", difficulty: "medium",
    questionText: "If the radius of a charged spherical conductor is doubled, its capacitance:",
    questionTextTamil: "ஒரு கோளக் கடத்தியின் ஆரம் இருமடங்காக அதிகரிக்கப்பட்டால் அதன் மின்தேக்குத்திறன்:",
    options: [
      { label: "A", text: "Remains same" }, { label: "B", text: "Becomes doubled" }, { label: "C", text: "Becomes four times" }, { label: "D", text: "Becomes halved" }
    ],
    optionsTamil: [
      { label: "A", text: "மாறாது" }, { label: "B", text: "இருமடங்காகும்" }, { label: "C", text: "நான்கு மடங்காகும்" }, { label: "D", text: "பாதியாகும்" }
    ],
    correctAnswer: "B",
    explanation: "C = 4πε₀ R, so capacitance is directly proportional to radius.",
    explanationTamil: "கோளக் கடத்தியின் மின்தேக்குத்திறன் C = 4πε₀ R ஆரத்திற்கு நேர்தகவில் அமையும்."
  },
  {
    code: "PHY-017", subject: "Physics", topic: "Electrostatics", difficulty: "easy",
    questionText: "The SI unit of electric flux is:",
    questionTextTamil: "மின்பாயத்தின் SI அலகு யாது?",
    options: [
      { label: "A", text: "N m² C⁻¹" }, { label: "B", text: "N C⁻¹" }, { label: "C", text: "C m⁻²" }, { label: "D", text: "J C⁻¹" }
    ],
    optionsTamil: [
      { label: "A", text: "N m² C⁻¹ (அல்லது V m)" }, { label: "B", text: "N C⁻¹" }, { label: "C", text: "C m⁻²" }, { label: "D", text: "J C⁻¹" }
    ],
    correctAnswer: "A",
    explanation: "Φ = E * A, unit is (N/C) * m² = N m² C⁻¹ or Volt metre (V m).",
    explanationTamil: "மின்பாயம் Φ = E * A, இதன் SI அலகு N m² C⁻¹ அல்லது வோல்ட் மீட்டர் (V m) ஆகும்."
  },
  {
    code: "PHY-018", subject: "Physics", topic: "Electrostatics", difficulty: "medium",
    questionText: "An electric dipole of moment p is placed parallel to uniform electric field E. The potential energy of the dipole is:",
    questionTextTamil: "p திருப்புத்திறன் கொண்ட மின்னிருமுனை சீரான மின்புலம் E-க்கு இணையாக வைக்கப்படும் போது அதன் நிலையாற்றல்:",
    options: [
      { label: "A", text: "0" }, { label: "B", text: "-pE" }, { label: "C", text: "+pE" }, { label: "D", text: "2pE" }
    ],
    optionsTamil: [
      { label: "A", text: "0" }, { label: "B", text: "-pE" }, { label: "C", text: "+pE" }, { label: "D", text: "2pE" }
    ],
    correctAnswer: "B",
    explanation: "U = -p · E = -pE cos 0° = -pE (minimum and stable equilibrium).",
    explanationTamil: "நிலையாற்றல் U = -pE cos 0° = -pE (குறைந்தபட்ச ஆற்றல் மற்றும் நிலையான சமநிலை)."
  },
  {
    code: "PHY-019", subject: "Physics", topic: "Electrostatics", difficulty: "hard",
    questionText: "The electric field outside an infinitely long charged straight wire of linear charge density λ at distance r is:",
    questionTextTamil: "λ நீள் அடர்த்தி கொண்ட முடிவிலா நீளமுள்ள கம்பிக்கு r தொலைவில் உள்ள மின்புலம்:",
    options: [
      { label: "A", text: "λ / (2πε₀ r)" }, { label: "B", text: "λ / (4πε₀ r²)" }, { label: "C", text: "2λ / (πε₀ r²)" }, { label: "D", text: "λ / (2πε₀ r²)" }
    ],
    optionsTamil: [
      { label: "A", text: "λ / (2πε₀ r)" }, { label: "B", text: "λ / (4πε₀ r²)" }, { label: "C", text: "2λ / (πε₀ r²)" }, { label: "D", text: "λ / (2πε₀ r²)" }
    ],
    correctAnswer: "A",
    explanation: "By Gauss's law, electric field of infinite linear charge is E = λ / (2πε₀ r).",
    explanationTamil: "காஸ் விதியின்படி முடிவிலா நேர்கோட்டு மின்னூட்ட மின்புலம் E = λ / (2πε₀ r)."
  },
  {
    code: "PHY-020", subject: "Physics", topic: "Electrostatics", difficulty: "medium",
    questionText: "Electric field E and electric potential V at distance r are related by:",
    questionTextTamil: "மின்புலம் E மற்றும் மின்னழுத்தம் V இடையே உள்ள தொடர்பு:",
    options: [
      { label: "A", text: "E = - dV/dr" }, { label: "B", text: "E = dV/dr" }, { label: "C", text: "V = - dE/dr" }, { label: "D", text: "E = V * r" }
    ],
    optionsTamil: [
      { label: "A", text: "E = - dV/dr" }, { label: "B", text: "E = dV/dr" }, { label: "C", text: "V = - dE/dr" }, { label: "D", text: "E = V * r" }
    ],
    correctAnswer: "A",
    explanation: "Electric field is the negative gradient of potential: E = - dV/dr.",
    explanationTamil: "மின்புலமானது மின்னழுத்தத்தின் எதிர்மறை சாய்வு ஆகும்: E = - dV/dr."
  },

  // 21-25 More Electrostatics
  {
    code: "PHY-021", subject: "Physics", topic: "Electrostatics", difficulty: "easy",
    questionText: "The dielectric constant K of vacuum is:",
    questionTextTamil: "வெற்றிடத்தின் மின்காப்பு மாறிலி K-ன் மதிப்பு:",
    options: [
      { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "Infinite" }, { label: "D", text: "8.85 × 10⁻¹²" }
    ],
    optionsTamil: [
      { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "முடிவிலி" }, { label: "D", text: "8.85 × 10⁻¹²" }
    ],
    correctAnswer: "B",
    explanation: "Dielectric constant of vacuum is exactly 1.",
    explanationTamil: "வெற்றிடத்திற்கான ஒப்புமை விடுதிறன் (மின்காப்பு மாறிலி) 1 ஆகும்."
  },
  {
    code: "PHY-022", subject: "Physics", topic: "Electrostatics", difficulty: "medium",
    questionText: "The dielectric constant K of a perfect metallic conductor is:",
    questionTextTamil: "ஒரு சிறந்த உலோகக் கடத்தியின் மின்காப்பு மாறிலி K-ன் மதிப்பு:",
    options: [
      { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "Infinity (∞)" }, { label: "D", text: "-1" }
    ],
    optionsTamil: [
      { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "முடிவிலி (∞)" }, { label: "D", text: "-1" }
    ],
    correctAnswer: "C",
    explanation: "Inside a conductor, E = 0, so dielectric constant K = E₀/E = ∞.",
    explanationTamil: "கடத்தியினுள் மின்புலம் சுழி என்பதால் அதன் மின்காப்பு மாறிலி முடிவிலி (∞) ஆகும்."
  },
  {
    code: "PHY-023", subject: "Physics", topic: "Electrostatics", difficulty: "easy",
    questionText: "One Faraday of electric charge is approximately equal to:",
    questionTextTamil: "ஒரு பாரடே (Faraday) மின்னூட்டம் தோராயமாக எத்தனை கூலும்களுக்கு சமம்?",
    options: [
      { label: "A", text: "96,500 C" }, { label: "B", text: "1.6 × 10⁻¹⁹ C" }, { label: "C", text: "6.023 × 10²³ C" }, { label: "D", text: "3 × 10⁸ C" }
    ],
    optionsTamil: [
      { label: "A", text: "96,500 C" }, { label: "B", text: "1.6 × 10⁻¹⁹ C" }, { label: "C", text: "6.023 × 10²³ C" }, { label: "D", text: "3 × 10⁸ C" }
    ],
    correctAnswer: "A",
    explanation: "1 Faraday = N_A * e ≈ 96,485 C ≈ 96,500 C.",
    explanationTamil: "ஒரு மோல் எலக்ட்ரான்களின் மொத்த மின்னூட்டம் 1 பாரடே ≈ 96,500 C ஆகும்."
  },
  {
    code: "PHY-024", subject: "Physics", topic: "Electrostatics", difficulty: "hard",
    questionText: "Two equal point charges Q are placed at distance 2a. A third charge q is placed at midpoint. For the system to be in equilibrium, q must be:",
    questionTextTamil: "2a தொலைவில் வைக்கப்பட்டுள்ள இரு Q மின்னூட்டங்களின் நடுப்புள்ளியில் வைக்கப்படும் q மின்னூட்டம் சமநிலையில் இருக்க அதன் மதிப்பு:",
    options: [
      { label: "A", text: "-Q / 4" }, { label: "B", text: "-Q / 2" }, { label: "C", text: "+Q / 4" }, { label: "D", text: "+Q / 2" }
    ],
    optionsTamil: [
      { label: "A", text: "-Q / 4" }, { label: "B", text: "-Q / 2" }, { label: "C", text: "+Q / 4" }, { label: "D", text: "+Q / 2" }
    ],
    correctAnswer: "A",
    explanation: "Net force on corner charge Q: kQ²/(2a)² + kQq/a² = 0 => q = -Q/4.",
    explanationTamil: "முனையில் உள்ள மின்னூட்டத்தின் மீதான நிகர விசை சுழியாக q = -Q/4 ஆக இருக்க வேண்டும்."
  },
  {
    code: "PHY-025", subject: "Physics", topic: "Electrostatics", difficulty: "medium",
    questionText: "Electric field lines never cross each other because:",
    questionTextTamil: "மின்புலக் கோடுகள் ஒருபோதும் ஒன்றை ஒன்று வெட்டிக் கொள்வதில்லை ஏனெனில்:",
    options: [
      { label: "A", text: "They repel each other" },
      { label: "B", text: "At point of intersection, there would be two directions of electric field which is impossible" },
      { label: "C", text: "They are parallel lines always" },
      { label: "D", text: "They start from infinity" }
    ],
    optionsTamil: [
      { label: "A", text: "அவை ஒன்றை ஒன்று விலக்குகின்றன" },
      { label: "B", text: "வெட்டும் புள்ளியில் மின்புலத்திற்கு இரு திசைகள் ஏற்படும், அது இயலாது" },
      { label: "C", text: "அவை எப்போதும் இணைக்கோடுகள்" },
      { label: "D", text: "அவை முடிவிலியிலிருந்து தொடங்குகின்றன" }
    ],
    correctAnswer: "B",
    explanation: "A point in an electric field can have only one unique direction for the net electric field vector.",
    explanationTamil: "ஒரு புள்ளியில் மின்புலத்திற்கு ஒரே ஒரு நிகர திசை மட்டுமே இருக்க முடியும்."
  },

  // 26-50 Current Electricity
  {
    code: "PHY-026", subject: "Physics", topic: "Current Electricity", difficulty: "easy",
    questionText: "Ohm's law is valid for conductors when:",
    questionTextTamil: "ஓமின் விதி கடத்திகளுக்கு எப்போது பொருந்தும்?",
    options: [
      { label: "A", text: "Temperature remains constant" },
      { label: "B", text: "Pressure changes" },
      { label: "C", text: "Voltage is very high" },
      { label: "D", text: "Current is alternating" }
    ],
    optionsTamil: [
      { label: "A", text: "வெப்பநிலை மாறாமல் இருக்கும் போது" },
      { label: "B", text: "அழுத்தம் மாறும் போது" },
      { label: "C", text: "மின்னழுத்தம் மிக அதிகமாகும்போது" },
      { label: "D", text: "மாறுதிசை மின்னோட்டம் பாயும் போது" }
    ],
    correctAnswer: "A",
    explanation: "V = IR holds good at constant physical conditions, especially temperature.",
    explanationTamil: "மாறா வெப்பநிலையில் கடத்தியில் பாயும் மின்னோட்டம் மின்னழுத்தத்திற்கு நேர்தகவில் இருக்கும்."
  },
  {
    code: "PHY-027", subject: "Physics", topic: "Current Electricity", difficulty: "easy",
    questionText: "The drift velocity vd of free electrons in a conductor is proportional to electric field E as:",
    questionTextTamil: "கடத்தியில் எலக்ட்ரான்களின் இழுப்புத் திசைவேகம் vd மின்புலம் E உடன் எவ்வாறு தொடர்புடையது?",
    options: [
      { label: "A", text: "vd ∝ E" }, { label: "B", text: "vd ∝ E²" }, { label: "C", text: "vd ∝ 1/E" }, { label: "D", text: "vd ∝ √E" }
    ],
    optionsTamil: [
      { label: "A", text: "vd ∝ E" }, { label: "B", text: "vd ∝ E²" }, { label: "C", text: "vd ∝ 1/E" }, { label: "D", text: "vd ∝ √E" }
    ],
    correctAnswer: "A",
    explanation: "vd = µ E, so drift velocity is directly proportional to electric field.",
    explanationTamil: "vd = µ E என்பதால் இழுப்புத் திசைவேகம் மின்புலத்திற்கு நேர்தகவில் அமையும்."
  },
  {
    code: "PHY-028", subject: "Physics", topic: "Current Electricity", difficulty: "medium",
    questionText: "Specific resistance (resistivity) of a metallic wire depends on:",
    questionTextTamil: "ஒரு உலோகக் கம்பியின் மின்தடை எண் (Resistivity) எதைச் சார்ந்தது?",
    options: [
      { label: "A", text: "Length of wire" }, { label: "B", text: "Cross-sectional area" }, { label: "C", text: "Material and temperature" }, { label: "D", text: "Mass of wire" }
    ],
    optionsTamil: [
      { label: "A", text: "கம்பியின் நீளம்" }, { label: "B", text: "குறுக்குவெட்டுப் பரப்பு" }, { label: "C", text: "பொருளின் தன்மை மற்றும் வெப்பநிலை" }, { label: "D", text: "கம்பியின் நிறை" }
    ],
    correctAnswer: "C",
    explanation: "Resistivity is an intrinsic material property depending on temperature, not geometry.",
    explanationTamil: "மின்தடை எண் பொருளின் தன்மை மற்றும் வெப்பநிலையை மட்டுமே சார்ந்தது, பரிமாணங்களை அல்ல."
  },
  {
    code: "PHY-029", subject: "Physics", topic: "Current Electricity", difficulty: "medium",
    questionText: "Kirchhoff's first law (Junction rule) is based on the conservation of:",
    questionTextTamil: "கிர்க்காஃபின் முதல் விதி (சந்தி விதி) எந்த மாறா விதியின் அடிப்படையில் அமைந்துள்ளது?",
    options: [
      { label: "A", text: "Energy" }, { label: "B", text: "Electric charge" }, { label: "C", text: "Momentum" }, { label: "D", text: "Mass" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆற்றல்" }, { label: "B", text: "மின்னூட்டம்" }, { label: "C", text: "உந்தம்" }, { label: "D", text: "நிறை" }
    ],
    correctAnswer: "B",
    explanation: "Junction rule states incoming charge equals outgoing charge (conservation of charge).",
    explanationTamil: "சந்தி விதி மின்னூட்ட மாறா விதியை அடிப்படையாகக் கொண்டது."
  },
  {
    code: "PHY-030", subject: "Physics", topic: "Current Electricity", difficulty: "medium",
    questionText: "Kirchhoff's second law (Loop rule) is based on the conservation of:",
    questionTextTamil: "கிர்க்காஃபின் இரண்டாம் விதி (சுற்று விதி) எதன் மாறா விதியை அடிப்படையாகக் கொண்டது?",
    options: [
      { label: "A", text: "Electric charge" }, { label: "B", text: "Momentum" }, { label: "C", text: "Energy" }, { label: "D", text: "Angular momentum" }
    ],
    optionsTamil: [
      { label: "A", text: "மின்னூட்டம்" }, { label: "B", text: "உந்தம்" }, { label: "C", text: "ஆற்றல்" }, { label: "D", text: "கோண உந்தம்" }
    ],
    correctAnswer: "C",
    explanation: "Loop rule ΣV = 0 represents the conservation of energy in a closed circuit.",
    explanationTamil: "சுற்று விதி ஆற்றல் மாறா விதியை அடிப்படையாகக் கொண்டது."
  },
  {
    code: "PHY-031", subject: "Physics", topic: "Current Electricity", difficulty: "easy",
    questionText: "The balance condition for a Wheatstone bridge with resistors P, Q, R, S is:",
    questionTextTamil: "P, Q, R, S மின்தடைகள் கொண்ட வீட்ஸ்டோன் சமனச்சுற்றின் சமநிலை நிபந்தனை யாது?",
    options: [
      { label: "A", text: "P / Q = R / S" }, { label: "B", text: "P * Q = R * S" }, { label: "C", text: "P + Q = R + S" }, { label: "D", text: "P - Q = R - S" }
    ],
    optionsTamil: [
      { label: "A", text: "P / Q = R / S" }, { label: "B", text: "P * Q = R * S" }, { label: "C", text: "P + Q = R + S" }, { label: "D", text: "P - Q = R - S" }
    ],
    correctAnswer: "A",
    explanation: "At bridge balance (null deflection), P/Q = R/S.",
    explanationTamil: "கால்வனோமீட்டர் சுழி விலகல் காட்டும் போது P/Q = R/S ஆகும்."
  },
  {
    code: "PHY-032", subject: "Physics", topic: "Current Electricity", difficulty: "medium",
    questionText: "Potentiometer measures potential difference more accurately than voltmeter because:",
    questionTextTamil: "வோல்ட்மீட்டரை விட மின்னழுத்தமானி மின்னழுத்த வேறுபாட்டை துல்லியமாக அளக்க காரணம்:",
    options: [
      { label: "A", text: "It has zero resistance" },
      { label: "B", text: "It draws no current from the circuit at balance" },
      { label: "C", text: "It uses AC supply" },
      { label: "D", text: "It has very small size" }
    ],
    optionsTamil: [
      { label: "A", text: "அதன் மின்தடை சுழி" },
      { label: "B", text: "சமநிலையில் மின்சுற்றிலிருந்து எந்த மின்னோட்டத்தையும் எடுப்பதில்லை" },
      { label: "C", text: "மாறுதிசை மின்னோட்டத்தில் இயங்குகிறது" },
      { label: "D", text: "மிகச் சிறிய அளவுடையது" }
    ],
    correctAnswer: "B",
    explanation: "At null point, potentiometer draws zero current, acting as an ideal voltmeter.",
    explanationTamil: "சுழி விலகல் நிலையில் மின்னழுத்தமானி சுற்றிலிருந்து மின்னோட்டம் எடுப்பதில்லை."
  },
  {
    code: "PHY-033", subject: "Physics", topic: "Current Electricity", difficulty: "easy",
    questionText: "The temperature coefficient of resistance is negative for:",
    questionTextTamil: "மின்தடை வெப்பநிலை எண் எதிர்க்குறியாக இருப்பது எதற்கு?",
    options: [
      { label: "A", text: "Copper" }, { label: "B", text: "Silver" }, { label: "C", text: "Semiconductors (e.g., Silicon)" }, { label: "D", text: "Aluminium" }
    ],
    optionsTamil: [
      { label: "A", text: "தாமிரம்" }, { label: "B", text: "வெள்ளி" }, { label: "C", text: "குறைக்கடத்திகள் (எ.கா. சிலிக்கான்)" }, { label: "D", text: "அலுமினியம்" }
    ],
    correctAnswer: "C",
    explanation: "For semiconductors, resistance decreases as temperature increases (negative α).",
    explanationTamil: "குறைக்கடத்திகளில் வெப்பநிலை அதிகரிக்கும் போது மின்தடை குறைகிறது (எதிர் வெப்பநிலை எண்)."
  },
  {
    code: "PHY-034", subject: "Physics", topic: "Current Electricity", difficulty: "hard",
    questionText: "A wire of resistance R is stretched uniformly to twice its original length. Its new resistance is:",
    questionTextTamil: "R மின்தடை கொண்ட ஒரு கம்பி சீராக அதன் அசல் நீளத்தை விட இருமடங்காக நீட்டப்பட்டால் புதிய மின்தடை:",
    options: [
      { label: "A", text: "2R" }, { label: "B", text: "4R" }, { label: "C", text: "R/2" }, { label: "D", text: "R/4" }
    ],
    optionsTamil: [
      { label: "A", text: "2R" }, { label: "B", text: "4R" }, { label: "C", text: "R/2" }, { label: "D", text: "R/4" }
    ],
    correctAnswer: "B",
    explanation: "Volume remains constant. When length doubles, area halves. R' = ρ (2L) / (A/2) = 4R.",
    explanationTamil: "பருமன் மாறாது. நீளம் இருமடங்காகும் போது பரப்பு பாதியாகும், எனவே R' = 4R."
  },
  {
    code: "PHY-035", subject: "Physics", topic: "Current Electricity", difficulty: "easy",
    questionText: "The commercial unit of electrical energy (1 kilowatt-hour) equals:",
    questionTextTamil: "மின்னாற்றலின் வணிக அலகு (1 kWh) எத்தனை ஜூல்களுக்கு சமம்?",
    options: [
      { label: "A", text: "3.6 × 10⁶ J" }, { label: "B", text: "3.6 × 10³ J" }, { label: "C", text: "1000 J" }, { label: "D", text: "360 J" }
    ],
    optionsTamil: [
      { label: "A", text: "3.6 × 10⁶ J" }, { label: "B", text: "3.6 × 10³ J" }, { label: "C", text: "1000 J" }, { label: "D", text: "360 J" }
    ],
    correctAnswer: "A",
    explanation: "1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J.",
    explanationTamil: "1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J."
  },
  {
    code: "PHY-036", subject: "Physics", topic: "Current Electricity", difficulty: "medium",
    questionText: "Internal resistance of a primary cell can be determined using:",
    questionTextTamil: "ஒரு முதன்மை மின்கலத்தின் அகமின்தடையை துல்லியமாக அளக்க பயன்படுவது:",
    options: [
      { label: "A", text: "Meter bridge" }, { label: "B", text: "Potentiometer" }, { label: "C", text: "Ammeter" }, { label: "D", text: "Multimeter" }
    ],
    optionsTamil: [
      { label: "A", text: "மீட்டர் சமனச்சுற்று" }, { label: "B", text: "மின்னழுத்தமானி" }, { label: "C", text: "அம்மீட்டர்" }, { label: "D", text: "மல்டிமீட்டர்" }
    ],
    correctAnswer: "B",
    explanation: "Potentiometer formula for internal resistance is r = R(l₁/l₂ - 1).",
    explanationTamil: "மின்னழுத்தமானி மூலம் r = R(l₁/l₂ - 1) என்ற வாய்பாட்டால் அகமின்தடை அளவிடப்படுகிறது."
  },
  {
    code: "PHY-037", subject: "Physics", topic: "Current Electricity", difficulty: "easy",
    questionText: "Superconductivity was discovered by:",
    questionTextTamil: "மீக்கடத்துத்திறன் (Superconductivity) யாரால் கண்டறியப்பட்டது?",
    options: [
      { label: "A", text: "Heike Kamerlingh Onnes" }, { label: "B", text: "Michael Faraday" }, { label: "C", text: "J.J. Thomson" }, { label: "D", text: "Lord Kelvin" }
    ],
    optionsTamil: [
      { label: "A", text: "காமர்லிங் ஆன்ஸ்" }, { label: "B", text: "மைக்கேல் பாரடே" }, { label: "C", text: "ஜே.ஜே. தாம்சன்" }, { label: "D", text: "கெல்வின்" }
    ],
    correctAnswer: "A",
    explanation: "Kamerlingh Onnes discovered superconductivity in Mercury at 4.2 K in 1911.",
    explanationTamil: "1911-ல் பாதரசத்தில் 4.2 K வெப்பநிலையில் காமர்லிங் ஆன்ஸ் மீக்கடத்துத்திறனைக் கண்டறிந்தார்."
  },
  {
    code: "PHY-038", subject: "Physics", topic: "Current Electricity", difficulty: "medium",
    questionText: "According to Joule's law of heating, heat generated H in resistor R is proportional to:",
    questionTextTamil: "ஜூல் வெப்ப விதியின்படி R மின்தடையில் உருவாகும் வெப்பம் H எதற்கு நேர்தகவில் அமையும்?",
    options: [
      { label: "A", text: "I" }, { label: "B", text: "I²" }, { label: "C", text: "√I" }, { label: "D", text: "1/I²" }
    ],
    optionsTamil: [
      { label: "A", text: "I" }, { label: "B", text: "I²" }, { label: "C", text: "√I" }, { label: "D", text: "1/I²" }
    ],
    correctAnswer: "B",
    explanation: "H = I² R t, so heat is directly proportional to square of current.",
    explanationTamil: "H = I² R t, எனவே வெப்பம் மின்னோட்டத்தின் இருமடிக்கு நேர்தகவில் அமையும்."
  },
  {
    code: "PHY-039", subject: "Physics", topic: "Current Electricity", difficulty: "hard",
    questionText: "In a meter bridge experiment, balance point is at 40 cm. If known resistance is 3 Ω in left gap, unknown resistance in right gap is:",
    questionTextTamil: "மீட்டர் சமனச்சுற்றில் இடது இடைவெளியில் 3 Ω மின்தடை உள்ளபோது சமன்செய் நீளம் 40 cm எனில் வலது இடைவெளியில் உள்ள மின்தடை:",
    options: [
      { label: "A", text: "4.5 Ω" }, { label: "B", text: "2 Ω" }, { label: "C", text: "6 Ω" }, { label: "D", text: "1.5 Ω" }
    ],
    optionsTamil: [
      { label: "A", text: "4.5 Ω" }, { label: "B", text: "2 Ω" }, { label: "C", text: "6 Ω" }, { label: "D", text: "1.5 Ω" }
    ],
    correctAnswer: "A",
    explanation: "3/Q = 40/60 => Q = 3 * 60 / 40 = 4.5 Ω.",
    explanationTamil: "3/Q = 40/60 => Q = 180/40 = 4.5 Ω."
  },
  {
    code: "PHY-040", subject: "Physics", topic: "Current Electricity", difficulty: "easy",
    questionText: "The reciprocal of electrical resistivity is called:",
    questionTextTamil: "மின்தடை எண்ணின் தலைகீழி எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Conductance" }, { label: "B", text: "Electrical Conductivity" }, { label: "C", text: "Susceptibility" }, { label: "D", text: "Permittivity" }
    ],
    optionsTamil: [
      { label: "A", text: "மின்கடத்துத்திறன்" }, { label: "B", text: "மின்கடத்து எண் (Conductivity)" }, { label: "C", text: "காந்த ஏற்புத்திறன்" }, { label: "D", text: "விடுதிறன்" }
    ],
    correctAnswer: "B",
    explanation: "Conductivity σ = 1 / ρ. Its unit is Siemens per metre (S m⁻¹).",
    explanationTamil: "மின்கடத்து எண் σ = 1 / ρ. இதன் அலகு S m⁻¹ அல்லது Ω⁻¹ m⁻¹."
  },
  {
    code: "PHY-041", subject: "Physics", topic: "Current Electricity", difficulty: "medium",
    questionText: "Seebeck effect is the basis of:",
    questionTextTamil: "சீபெக் விளைவு எதன் செயல்பாட்டுக்கு அடிப்படையானது?",
    options: [
      { label: "A", text: "Thermocouple" }, { label: "B", text: "Solar cell" }, { label: "C", text: "Transformer" }, { label: "D", text: "Transistor" }
    ],
    optionsTamil: [
      { label: "A", text: "வெப்பமின் இரட்டை (Thermocouple)" }, { label: "B", text: "சூரிய மின்கலம்" }, { label: "C", text: "மின்மாற்றி" }, { label: "D", text: "டிரான்சிஸ்டர்" }
    ],
    correctAnswer: "A",
    explanation: "Seebeck effect produces thermoelectric EMF across two dissimilar metals kept at different temperatures.",
    explanationTamil: "இருவேறு உலோக சந்திகளில் வெப்பநிலை வேறுபாடு உள்ளபோது மின்னழுத்தம் தோன்றும் சீபெக் விளைவு வெப்பமின் இரட்டையில் பயன்படுகிறது."
  },
  {
    code: "PHY-042", subject: "Physics", topic: "Current Electricity", difficulty: "medium",
    questionText: "Peltier effect is the reverse of:",
    questionTextTamil: "பெல்டியர் விளைவு எதன் தலைகீழ் விளைவாகும்?",
    options: [
      { label: "A", text: "Joule effect" }, { label: "B", text: "Seebeck effect" }, { label: "C", text: "Thomson effect" }, { label: "D", text: "Compton effect" }
    ],
    optionsTamil: [
      { label: "A", text: "ஜூல் விளைவு" }, { label: "B", text: "சீபெக் விளைவு" }, { label: "C", text: "தாம்சன் விளைவு" }, { label: "D", text: "காம்டன் விளைவு" }
    ],
    correctAnswer: "B",
    explanation: "Peltier effect is the exact thermodynamically reversible counterpart of Seebeck effect.",
    explanationTamil: "பெல்டியர் விளைவு சீபெக் விளைவின் நேரெதிர் தலைகீழ் விளைவாகும்."
  },
  {
    code: "PHY-043", subject: "Physics", topic: "Current Electricity", difficulty: "easy",
    questionText: "Two resistors of 10 Ω and 40 Ω are connected in parallel. Their equivalent resistance is:",
    questionTextTamil: "10 Ω மற்றும் 40 Ω கொண்ட இரு மின்தடைகள் பக்க இணைப்பில் இணைக்கப்பட்டால் தொகுபயன் மின்தடை:",
    options: [
      { label: "A", text: "50 Ω" }, { label: "B", text: "8 Ω" }, { label: "C", text: "4 Ω" }, { label: "D", text: "25 Ω" }
    ],
    optionsTamil: [
      { label: "A", text: "50 Ω" }, { label: "B", text: "8 Ω" }, { label: "C", text: "4 Ω" }, { label: "D", text: "25 Ω" }
    ],
    correctAnswer: "B",
    explanation: "R_eq = (10 * 40) / (10 + 40) = 400 / 50 = 8 Ω.",
    explanationTamil: "R_eq = (10 * 40) / 50 = 8 Ω."
  },
  {
    code: "PHY-044", subject: "Physics", topic: "Current Electricity", difficulty: "hard",
    questionText: "In a potentiometer circuit, cell of EMF 1.5 V gives balance at 60 cm. Another cell gives balance at 80 cm. EMF of second cell is:",
    questionTextTamil: "மின்னழுத்தமானியில் 1.5 V மின்கலத்திற்கு சமன்செய் நீளம் 60 cm. மற்றொரு மின்கலத்திற்கு 80 cm எனில் அதன் மின்னியக்கு விசை:",
    options: [
      { label: "A", text: "2.0 V" }, { label: "B", text: "1.8 V" }, { label: "C", text: "2.5 V" }, { label: "D", text: "1.2 V" }
    ],
    optionsTamil: [
      { label: "A", text: "2.0 V" }, { label: "B", text: "1.8 V" }, { label: "C", text: "2.5 V" }, { label: "D", text: "1.2 V" }
    ],
    correctAnswer: "A",
    explanation: "E₁/E₂ = l₁/l₂ => 1.5/E₂ = 60/80 = 3/4 => E₂ = 2.0 V.",
    explanationTamil: "1.5/E₂ = 60/80 => E₂ = 2.0 V."
  },
  {
    code: "PHY-045", subject: "Physics", topic: "Current Electricity", difficulty: "easy",
    questionText: "Standard resistance coils are typically made of Constantan or Manganin because of their:",
    questionTextTamil: "நிலையான மின்தடைச் சுருள்கள் மாங்கனின் அல்லது கான்ஸ்டண்டனால் செய்யப்பட காரணம்:",
    options: [
      { label: "A", text: "High resistivity and very low temperature coefficient" },
      { label: "B", text: "Low resistivity and high melting point" },
      { label: "C", text: "High ductility" },
      { label: "D", text: "Zero resistance" }
    ],
    optionsTamil: [
      { label: "A", text: "உயர் மின்தடை எண் மற்றும் மிகக் குறைந்த மின்தடை வெப்பநிலை எண்" },
      { label: "B", text: "குறைந்த மின்தடை எண் மற்றும் உயர் உருகுநிலை" },
      { label: "C", text: "அதிக நீளும் தன்மை" },
      { label: "D", text: "சுழி மின்தடை" }
    ],
    correctAnswer: "A",
    explanation: "Manganin has nearly zero temperature coefficient of resistance.",
    explanationTamil: "மாங்கனின் மிகக் குறைந்த வெப்பநிலை மின்தடை எண் கொண்டிருப்பதால் மின்தடை மாறாது."
  },
  {
    code: "PHY-046", subject: "Physics", topic: "Current Electricity", difficulty: "medium",
    questionText: "The mobility µ of free electrons is related to relaxation time τ by:",
    questionTextTamil: "எலக்ட்ரான்களின் இயக்க எண் µ மற்றும் தளர்வு நேரம் τ இடையிலான தொடர்பு:",
    options: [
      { label: "A", text: "µ = e τ / m" }, { label: "B", text: "µ = m τ / e" }, { label: "C", text: "µ = e m / τ" }, { label: "D", text: "µ = e / (m τ)" }
    ],
    optionsTamil: [
      { label: "A", text: "µ = e τ / m" }, { label: "B", text: "µ = m τ / e" }, { label: "C", text: "µ = e m / τ" }, { label: "D", text: "µ = e / (m τ)" }
    ],
    correctAnswer: "A",
    explanation: "Mobility µ = vd / E = e τ / m.",
    explanationTamil: "இயக்க எண் µ = e τ / m ஆகும்."
  },
  {
    code: "PHY-047", subject: "Physics", topic: "Current Electricity", difficulty: "easy",
    questionText: "The colour code for a carbon resistor having resistance 47 kΩ ± 5% starts with colours:",
    questionTextTamil: "47 kΩ ± 5% மதிப்பு கொண்ட கார்பன் மின்தடையின் முதல் இரு வண்ண வளையங்கள் முறையே:",
    options: [
      { label: "A", text: "Yellow, Violet" }, { label: "B", text: "Yellow, Blue" }, { label: "C", text: "Orange, Violet" }, { label: "D", text: "Green, Blue" }
    ],
    optionsTamil: [
      { label: "A", text: "மஞ்சள், ஊதா" }, { label: "B", text: "மஞ்சள், நீலம்" }, { label: "C", text: "ஆரஞ்சு, ஊதா" }, { label: "D", text: "பச்சை, நீலம்" }
    ],
    correctAnswer: "A",
    explanation: "BBROYGBVGW: 4 is Yellow, 7 is Violet.",
    explanationTamil: "வண்ணக் குறியீட்டில் 4 - மஞ்சள், 7 - ஊதா."
  },
  {
    code: "PHY-048", subject: "Physics", topic: "Current Electricity", difficulty: "hard",
    questionText: "A voltmeter of range 3 V has resistance 1000 Ω. To extend its range to 30 V, required series multiplier resistance is:",
    questionTextTamil: "1000 Ω மின்தடையும் 3 V வீச்சும் கொண்ட வோல்ட்மீட்டரை 30 V வரை அளவிட அதனுடன் தொடராக இணைக்க வேண்டிய மின்தடை:",
    options: [
      { label: "A", text: "9000 Ω" }, { label: "B", text: "10,000 Ω" }, { label: "C", text: "3000 Ω" }, { label: "D", text: "27,000 Ω" }
    ],
    optionsTamil: [
      { label: "A", text: "9000 Ω" }, { label: "B", text: "10,000 Ω" }, { label: "C", text: "3000 Ω" }, { label: "D", text: "27,000 Ω" }
    ],
    correctAnswer: "A",
    explanation: "Multiplier R_s = G(V/V_g - 1) = 1000 * (30/3 - 1) = 9000 Ω.",
    explanationTamil: "R_s = G(n - 1) = 1000 * (10 - 1) = 9000 Ω."
  },
  {
    code: "PHY-049", subject: "Physics", topic: "Current Electricity", difficulty: "medium",
    questionText: "Thomson effect is zero for which metal?",
    questionTextTamil: "எந்த உலோகத்திற்கு தாம்சன் விளைவு சுழியாகும்?",
    options: [
      { label: "A", text: "Lead (Pb)" }, { label: "B", text: "Copper (Cu)" }, { label: "C", text: "Iron (Fe)" }, { label: "D", text: "Bismuth (Bi)" }
    ],
    optionsTamil: [
      { label: "A", text: "காரீயம் (Lead - Pb)" }, { label: "B", text: "தாமிரம்" }, { label: "C", text: "இரும்பு" }, { label: "D", text: "பிஸ்மத்" }
    ],
    correctAnswer: "A",
    explanation: "Lead shows no Thomson effect and is used as reference metal in thermoelectric diagrams.",
    explanationTamil: "காரீயத்திற்கு தாம்சன் விளைவு சுழி என்பதால் அது குறிப்பு உலோகமாகப் பயன்படுகிறது."
  },
  {
    code: "PHY-050", subject: "Physics", topic: "Current Electricity", difficulty: "easy",
    questionText: "Electric current density is a:",
    questionTextTamil: "மின்னோட்ட அடர்த்தி என்பது ஒரு:",
    options: [
      { label: "A", text: "Scalar quantity" }, { label: "B", text: "Vector quantity" }, { label: "C", text: "Dimensionless quantity" }, { label: "D", text: "Tensor of rank 2" }
    ],
    optionsTamil: [
      { label: "A", text: "ஸ்கேலார் அளவு" }, { label: "B", text: "வெக்டார் அளவு" }, { label: "C", text: "பரிமாணமற்ற அளவு" }, { label: "D", text: "டென்சார்" }
    ],
    correctAnswer: "B",
    explanation: "Current is a scalar, but current density J = I/A is a vector quantity pointing along current flow.",
    explanationTamil: "மின்னோட்டம் ஸ்கேலார் ஆனால் மின்னோட்ட அடர்த்தி வெக்டார் அளவாகும்."
  },

  // 51-75 Magnetism & Magnetic Effects of Current
  {
    code: "PHY-051", subject: "Physics", topic: "Magnetism", difficulty: "easy",
    questionText: "Biot-Savart law in vector form for a current element Idl is:",
    questionTextTamil: "மின்னோட்டக் கூறு Idl-க்கான பயோ-சாவர்ட் விதியின் வெக்டர் வடிவம்:",
    options: [
      { label: "A", text: "dB = (µ₀/4π) * (I dl × r̂) / r²" },
      { label: "B", text: "dB = (µ₀/4π) * (I dl · r̂) / r²" },
      { label: "C", text: "dB = (µ₀/4π) * (I dl × r) / r" },
      { label: "D", text: "dB = (µ₀/4π) * I dl / r²" }
    ],
    optionsTamil: [
      { label: "A", text: "dB = (µ₀/4π) * (I dl × r̂) / r²" },
      { label: "B", text: "dB = (µ₀/4π) * (I dl · r̂) / r²" },
      { label: "C", text: "dB = (µ₀/4π) * (I dl × r) / r" },
      { label: "D", text: "dB = (µ₀/4π) * I dl / r²" }
    ],
    correctAnswer: "A",
    explanation: "Biot-Savart Law gives dB = (µ₀/4π) (I dl × r̂)/r².",
    explanationTamil: "பயோ-சாவர்ட் விதியின் வெக்டர் வடிவம் dB = (µ₀/4π) (I dl × r̂)/r²."
  },
  {
    code: "PHY-052", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "The magnetic field at the centre of a circular coil of radius R carrying current I is:",
    questionTextTamil: "R ஆரம் கொண்ட வட்ட வடிவ மின்னோட்டச் சுருளின் மையத்தில் உருவாகும் காந்தப்புலம்:",
    options: [
      { label: "A", text: "µ₀ I / (2 R)" }, { label: "B", text: "µ₀ I / (4π R)" }, { label: "C", text: "µ₀ I / (2π R)" }, { label: "D", text: "µ₀ I / R" }
    ],
    optionsTamil: [
      { label: "A", text: "µ₀ I / (2 R)" }, { label: "B", text: "µ₀ I / (4π R)" }, { label: "C", text: "µ₀ I / (2π R)" }, { label: "D", text: "µ₀ I / R" }
    ],
    correctAnswer: "A",
    explanation: "B_centre = µ₀ I / (2R). For N turns, B = µ₀ N I / (2R).",
    explanationTamil: "வட்டச் சுருளின் மையத்தில் காந்தப்புலம் B = µ₀ I / (2R) ஆகும்."
  },
  {
    code: "PHY-053", subject: "Physics", topic: "Magnetism", difficulty: "easy",
    questionText: "The SI unit of magnetic field (magnetic flux density) is:",
    questionTextTamil: "காந்தப்புலத்தின் (காந்தப்பாய அடர்த்தி) SI அலகு யாது?",
    options: [
      { label: "A", text: "Weber (Wb)" }, { label: "B", text: "Tesla (T)" }, { label: "C", text: "Henry (H)" }, { label: "D", text: "Ampere per metre (A/m)" }
    ],
    optionsTamil: [
      { label: "A", text: "வெபர் (Wb)" }, { label: "B", text: "டெஸ்லா (T)" }, { label: "C", text: "ஹென்றி (H)" }, { label: "D", text: "ஆம்பியர் / மீட்டர் (A/m)" }
    ],
    correctAnswer: "B",
    explanation: "SI unit of magnetic field is Tesla (T), equal to Wb/m² or N A⁻¹ m⁻¹.",
    explanationTamil: "காந்தப்புலத்தின் SI அலகு டெஸ்லா (T) அல்லது Wb/m² ஆகும்."
  },
  {
    code: "PHY-054", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "Lorentz force on a charge q moving with velocity v in electric field E and magnetic field B is:",
    questionTextTamil: "மின்புலம் E மற்றும் காந்தப்புலம் B-ல் v திசைவேகத்தில் இயங்கும் q மின்னூட்டம் உணரும் லாரன்ஸ் விசை:",
    options: [
      { label: "A", text: "F = q (E + v × B)" },
      { label: "B", text: "F = q (E · v + B)" },
      { label: "C", text: "F = q (E + v · B)" },
      { label: "D", text: "F = q (v × E + B)" }
    ],
    optionsTamil: [
      { label: "A", text: "F = q (E + v × B)" },
      { label: "B", text: "F = q (E · v + B)" },
      { label: "C", text: "F = q (E + v · B)" },
      { label: "D", text: "F = q (v × E + B)" }
    ],
    correctAnswer: "A",
    explanation: "Total Lorentz force F = F_e + F_m = qE + q(v × B) = q(E + v × B).",
    explanationTamil: "மொத்த லாரன்ஸ் விசை F = q (E + v × B) ஆகும்."
  },
  {
    code: "PHY-055", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "Cyclotron frequency of a charged particle of charge q and mass m in magnetic field B is:",
    questionTextTamil: "B காந்தப்புலத்தில் m நிறை மற்றும் q மின்னூட்டம் கொண்ட துகளின் சைக்ளோட்ரான் அதிர்வெண்:",
    options: [
      { label: "A", text: "q B / (2π m)" }, { label: "B", text: "2π m / (q B)" }, { label: "C", text: "q m / (2π B)" }, { label: "D", text: "B m / (2π q)" }
    ],
    optionsTamil: [
      { label: "A", text: "q B / (2π m)" }, { label: "B", text: "2π m / (q B)" }, { label: "C", text: "q m / (2π B)" }, { label: "D", text: "B m / (2π q)" }
    ],
    correctAnswer: "A",
    explanation: "Time period T = 2πm / (qB), hence frequency f = 1/T = qB / (2πm).",
    explanationTamil: "அலைவுக்காலம் T = 2πm / (qB), எனவே அதிர்வெண் f = qB / (2πm) ஆகும்."
  },
  {
    code: "PHY-056", subject: "Physics", topic: "Magnetism", difficulty: "easy",
    questionText: "Cyclotron cannot accelerate which particle?",
    questionTextTamil: "சைக்ளோட்ரானால் எதனை முடுக்க முடியாது?",
    options: [
      { label: "A", text: "Proton" }, { label: "B", text: "Alpha particle" }, { label: "C", text: "Neutron" }, { label: "D", text: "Deuteron" }
    ],
    optionsTamil: [
      { label: "A", text: "புரோட்டான்" }, { label: "B", text: "ஆல்ஃபா துகள்" }, { label: "C", text: "நியூட்ரான்" }, { label: "D", text: "டியூட்ரான்கள்" }
    ],
    correctAnswer: "C",
    explanation: "Neutrons carry zero electric charge, hence experiences no magnetic or electric force.",
    explanationTamil: "நியூட்ரான் மின்னூட்டமற்ற நடுநிலைத் துகள் என்பதால் அதை சைக்ளோட்ரானால் முடுக்க முடியாது."
  },
  {
    code: "PHY-057", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "Ampere's circuital law is expressed as:",
    questionTextTamil: "ஆம்பியரின் சுற்று விதி எவ்வாறு குறிக்கப்படுகிறது?",
    options: [
      { label: "A", text: "∮ B · dl = µ₀ I" }, { label: "B", text: "∮ B · dA = 0" }, { label: "C", text: "∮ E · dl = - dΦ/dt" }, { label: "D", text: "∮ B · dl = I / µ₀" }
    ],
    optionsTamil: [
      { label: "A", text: "∮ B · dl = µ₀ I" }, { label: "B", text: "∮ B · dA = 0" }, { label: "C", text: "∮ E · dl = - dΦ/dt" }, { label: "D", text: "∮ B · dl = I / µ₀" }
    ],
    correctAnswer: "A",
    explanation: "Line integral of magnetic field around closed path equals µ₀ times enclosed current: ∮ B · dl = µ₀ I.",
    explanationTamil: "மூடிய சுற்றின் மீதான காந்தப்புலத்தின் கோட்டு வழித்தொகையீடு ∮ B · dl = µ₀ I ஆகும்."
  },
  {
    code: "PHY-058", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "The magnetic field inside a long ideal solenoid having n turns per unit length carrying current I is:",
    questionTextTamil: "ஓரலகு நீளத்தில் n சுற்றுகளும் I மின்னோட்டமும் கொண்ட நீண்ட வரிச்சுருளின் உட்புறத்தில் காந்தப்புலம்:",
    options: [
      { label: "A", text: "µ₀ n I" }, { label: "B", text: "µ₀ n I / 2" }, { label: "C", text: "2 µ₀ n I" }, { label: "D", text: "Zero" }
    ],
    optionsTamil: [
      { label: "A", text: "µ₀ n I" }, { label: "B", text: "µ₀ n I / 2" }, { label: "C", text: "2 µ₀ n I" }, { label: "D", text: "சுழி" }
    ],
    correctAnswer: "A",
    explanation: "Magnetic field inside an ideal solenoid is uniform and B = µ₀ n I.",
    explanationTamil: "வரிச்சுருளின் உட்புறக் காந்தப்புலம் B = µ₀ n I ஆகும்."
  },
  {
    code: "PHY-059", subject: "Physics", topic: "Magnetism", difficulty: "hard",
    questionText: "Force per unit length between two parallel conductors carrying currents I₁ and I₂ separated by distance r is:",
    questionTextTamil: "r தொலைவில் உள்ள இரு இணை கடத்திகளில் I₁, I₂ மின்னோட்டங்கள் பாயும்போது ஓரலகு நீளத்திற்கான விசை:",
    options: [
      { label: "A", text: "(µ₀ / 2π) * (I₁ I₂ / r)" },
      { label: "B", text: "(µ₀ / 4π) * (I₁ I₂ / r²)" },
      { label: "C", text: "(µ₀ / 2π) * (I₁ I₂ / r²)" },
      { label: "D", text: "(µ₀ / 4π) * (I₁ I₂ / r)" }
    ],
    optionsTamil: [
      { label: "A", text: "(µ₀ / 2π) * (I₁ I₂ / r)" },
      { label: "B", text: "(µ₀ / 4π) * (I₁ I₂ / r²)" },
      { label: "C", text: "(µ₀ / 2π) * (I₁ I₂ / r²)" },
      { label: "D", text: "(µ₀ / 4π) * (I₁ I₂ / r)" }
    ],
    correctAnswer: "A",
    explanation: "F/L = (µ₀ / 2π) * (I₁ I₂ / r). Attractive if currents are parallel, repulsive if antiparallel.",
    explanationTamil: "ஓரலகு நீளத்திற்கான விசை F/L = (µ₀ / 2π) * (I₁ I₂ / r) ஆகும்."
  },
  {
    code: "PHY-060", subject: "Physics", topic: "Magnetism", difficulty: "easy",
    questionText: "To convert a moving coil galvanometer into an ammeter, one must connect:",
    questionTextTamil: "ஒரு கால்வனோமீட்டரை அம்மீட்டராக மாற்ற என்ன செய்ய வேண்டும்?",
    options: [
      { label: "A", text: "A low resistance in parallel (shunt)" },
      { label: "B", text: "A high resistance in series" },
      { label: "C", text: "A low resistance in series" },
      { label: "D", text: "A high resistance in parallel" }
    ],
    optionsTamil: [
      { label: "A", text: "குறைந்த மின்தடையை (shunt) பக்க இணைப்பில் இணைக்க வேண்டும்" },
      { label: "B", text: "உயர் மின்தடையை தொடரிணைப்பில் இணைக்க வேண்டும்" },
      { label: "C", text: "குறைந்த மின்தடையை தொடரிணைப்பில் இணைக்க வேண்டும்" },
      { label: "D", text: "உயர் மின்தடையை பக்க இணைப்பில் இணைக்க வேண்டும்" }
    ],
    correctAnswer: "A",
    explanation: "A small shunt resistance connected in parallel diverts majority of current, converting galvanometer to ammeter.",
    explanationTamil: "குறைந்த மதிப்புள்ள ஷண்ட் மின்தடையை பக்க இணைப்பில் இணைத்து அம்மீட்டராக மாற்றலாம்."
  },
  {
    code: "PHY-061", subject: "Physics", topic: "Magnetism", difficulty: "easy",
    questionText: "To convert a moving coil galvanometer into a voltmeter, one must connect:",
    questionTextTamil: "கால்வனோமீட்டரை வோல்ட்மீட்டராக மாற்ற என்ன செய்ய வேண்டும்?",
    options: [
      { label: "A", text: "A high resistance in series" },
      { label: "B", text: "A low resistance in parallel" },
      { label: "C", text: "A high resistance in parallel" },
      { label: "D", text: "A low resistance in series" }
    ],
    optionsTamil: [
      { label: "A", text: "உயர் மின்தடையை தொடரிணைப்பில் இணைக்க வேண்டும்" },
      { label: "B", text: "குறைந்த மின்தடையை பக்க இணைப்பில் இணைக்க வேண்டும்" },
      { label: "C", text: "உயர் மின்தடையை பக்க இணைப்பில் இணைக்க வேண்டும்" },
      { label: "D", text: "குறைந்த மின்தடையை தொடரிணைப்பில் இணைக்க வேண்டும்" }
    ],
    correctAnswer: "A",
    explanation: "A high multiplier resistance connected in series ensures high overall resistance for voltmeter.",
    explanationTamil: "உயர் மதிப்புடைய மின்தடையைத் தொடரிணைப்பில் இணைத்து வோல்ட்மீட்டராக மாற்றலாம்."
  },
  {
    code: "PHY-062", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "The magnetic susceptibility χ of a diamagnetic substance is:",
    questionTextTamil: "டயா காந்தப் பொருளின் காந்த ஏற்புத்திறன் χ எத்தகையது?",
    options: [
      { label: "A", text: "Small and negative" },
      { label: "B", text: "Small and positive" },
      { label: "C", text: "Large and positive" },
      { label: "D", text: "Zero" }
    ],
    optionsTamil: [
      { label: "A", text: "சிறிய மற்றும் எதிர்க்குறி மதிப்புடையது" },
      { label: "B", text: "சிறிய மற்றும் நேர்க்குறி மதிப்புடையது" },
      { label: "C", text: "மிகப்பெரிய நேர்க்குறி மதிப்புடையது" },
      { label: "D", text: "சுழி" }
    ],
    correctAnswer: "A",
    explanation: "Diamagnetic materials have small negative susceptibility and are weakly repelled by magnets.",
    explanationTamil: "டயா காந்தப் பொருட்களுக்கு காந்த ஏற்புத்திறன் சிறிய மற்றும் எதிர்க்குறி மதிப்புடையது."
  },
  {
    code: "PHY-063", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "Curie's law for paramagnetic substances states that magnetic susceptibility χ is proportional to:",
    questionTextTamil: "பாராகாந்தப் பொருட்களுக்கான கியூரி விதிப்படி காந்த ஏற்புத்திறன் χ எதற்கு விகிதசமத்தில் இருக்கும்?",
    options: [
      { label: "A", text: "Absolute temperature T" },
      { label: "B", text: "1 / T" },
      { label: "C", text: "T²" },
      { label: "D", text: "1 / T²" }
    ],
    optionsTamil: [
      { label: "A", text: "தனி வெப்பநிலை T" },
      { label: "B", text: "1 / T (வெப்பநிலைக்கு எதிர்த்தகவு)" },
      { label: "C", text: "T²" },
      { label: "D", text: "1 / T²" }
    ],
    correctAnswer: "B",
    explanation: "Curie's law: χ = C / T, susceptibility is inversely proportional to absolute temperature.",
    explanationTamil: "கியூரி விதியின்படி, χ = C / T (தனி வெப்பநிலைக்கு எதிர்த்தகவு)."
  },
  {
    code: "PHY-064", subject: "Physics", topic: "Magnetism", difficulty: "easy",
    questionText: "The temperature above which a ferromagnetic material becomes paramagnetic is called:",
    questionTextTamil: "ஃபெர்ரோ காந்தப்பொருள் பாரா காந்தப்பொருளாக மாறும் வெப்பநிலை எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Curie temperature" }, { label: "B", text: "Inversion temperature" }, { label: "C", text: "Boyle temperature" }, { label: "D", text: "Critical temperature" }
    ],
    optionsTamil: [
      { label: "A", text: "கியூரி வெப்பநிலை" }, { label: "B", text: "தலைகீழ் வெப்பநிலை" }, { label: "C", text: "பாயில் வெப்பநிலை" }, { label: "D", text: "மாறுநிலை வெப்பநிலை" }
    ],
    correctAnswer: "A",
    explanation: "Above Curie temperature, thermal agitation destroys domain alignment, turning ferromagnet into paramagnet.",
    explanationTamil: "கியூரி வெப்பநிலைக்கு மேல் ஃபெர்ரோ காந்தப்பொருள் பாரா காந்தப்பொருளாக மாறுகிறது."
  },
  {
    code: "PHY-065", subject: "Physics", topic: "Magnetism", difficulty: "easy",
    questionText: "At the magnetic poles of Earth, the angle of dip (inclination) is:",
    questionTextTamil: "புவியின் காந்த துருவங்களில் சரிவுக் கோணம் (Angle of Dip) எவ்வளவு?",
    options: [
      { label: "A", text: "0°" }, { label: "B", text: "45°" }, { label: "C", text: "90°" }, { label: "D", text: "180°" }
    ],
    optionsTamil: [
      { label: "A", text: "0°" }, { label: "B", text: "45°" }, { label: "C", text: "90°" }, { label: "D", text: "180°" }
    ],
    correctAnswer: "C",
    explanation: "At the magnetic poles, magnetic field is completely vertical, so angle of dip is 90° (0° at equator).",
    explanationTamil: "காந்த துருவங்களில் காந்தப்புலம் செங்குத்தாக இருப்பதால் சரிவுக் கோணம் 90° ஆகும் (நடுக்கோட்டில் 0°)."
  },
  {
    code: "PHY-066", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "Bohr magneton (µB) is the magnetic dipole moment of:",
    questionTextTamil: "போர் மேக்னட்டான் (µB) என்பது எதனுடைய காந்த திருப்புத்திறனைக் குறிக்கிறது?",
    options: [
      { label: "A", text: "Electron in first orbit of hydrogen atom" },
      { label: "B", text: "Proton in nucleus" },
      { label: "C", text: "Neutron" },
      { label: "D", text: "Alpha particle" }
    ],
    optionsTamil: [
      { label: "A", text: "ஹைட்ரஜன் அணுவின் முதல் சுற்றுப்பாதையில் உள்ள எலக்ட்ரான்" },
      { label: "B", text: "அணுக்கருவில் உள்ள புரோட்டான்" },
      { label: "C", text: "நியூட்ரான்" },
      { label: "D", text: "ஆல்ஃபா துகள்" }
    ],
    correctAnswer: "A",
    explanation: "µB = eħ / (2m_e) ≈ 9.27 × 10⁻²⁴ A m².",
    explanationTamil: "போர் மேக்னட்டான் µB = eh / (4π m_e) ≈ 9.27 × 10⁻²⁴ A m² ஆகும்."
  },
  {
    code: "PHY-067", subject: "Physics", topic: "Magnetism", difficulty: "easy",
    questionText: "The core of electromagnets and transformers is made of soft iron because soft iron has:",
    questionTextTamil: "மின்மாற்றி மற்றும் மின்காந்தங்களின் உள்ளகம் தேனிரும்பினால் செய்யப்பட காரணம்:",
    options: [
      { label: "A", text: "High permeability and low hysteresis loss" },
      { label: "B", text: "Low permeability and high retentivity" },
      { label: "C", text: "High coercivity and high retentivity" },
      { label: "D", text: "Zero susceptibility" }
    ],
    optionsTamil: [
      { label: "A", text: "அதிக காந்த உட்புகுதிறன் மற்றும் குறைந்த காந்த தயக்க இழப்பு" },
      { label: "B", text: "குறைந்த உட்புகுதிறன் மற்றும் அதிக தேக்குத்திறன்" },
      { label: "C", text: "அதிக நீக்குத்திறன் மற்றும் அதிக தேக்குத்திறன்" },
      { label: "D", text: "சுழி ஏற்புத்திறன்" }
    ],
    correctAnswer: "A",
    explanation: "Soft iron easily magnetizes and demagnetizes, giving high magnetic field with minimal hysteresis energy loss.",
    explanationTamil: "தேனிரும்பு அதிக காந்த ஏற்புத்திறன், உட்புகுதிறன் மற்றும் குறைந்த தயக்க இழப்பைக் கொண்டுள்ளது."
  },
  {
    code: "PHY-068", subject: "Physics", topic: "Magnetism", difficulty: "hard",
    questionText: "A current loop of area A and current I acts as a magnetic dipole of magnetic moment M equal to:",
    questionTextTamil: "A பரப்பு கொண்ட சுற்றில் I மின்னோட்டம் பாயும் போது அதன் காந்த இருமுனை திருப்புத்திறன் M:",
    options: [
      { label: "A", text: "I A" }, { label: "B", text: "I / A" }, { label: "C", text: "I² A" }, { label: "D", text: "I A²" }
    ],
    optionsTamil: [
      { label: "A", text: "I A" }, { label: "B", text: "I / A" }, { label: "C", text: "I² A" }, { label: "D", text: "I A²" }
    ],
    correctAnswer: "A",
    explanation: "Magnetic dipole moment M = I * A. For N turns, M = N I A.",
    explanationTamil: "காந்த திருப்புத்திறன் M = I * A (N சுற்றுகளுக்கு M = N I A)."
  },
  {
    code: "PHY-069", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "The SI unit of magnetic dipole moment is:",
    questionTextTamil: "காந்த இருமுனை திருப்புத்திறனின் SI அலகு யாது?",
    options: [
      { label: "A", text: "Ampere metre² (A m²)" },
      { label: "B", text: "Joule per Tesla (J T⁻¹)" },
      { label: "C", text: "Both A and B" },
      { label: "D", text: "Tesla metre (T m)" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆம்பியர் மீட்டர்² (A m²)" },
      { label: "B", text: "ஜூல் / டெஸ்லா (J T⁻¹)" },
      { label: "C", text: "A மற்றும் B இரண்டும்" },
      { label: "D", text: "டெஸ்லா மீட்டர் (T m)" }
    ],
    correctAnswer: "C",
    explanation: "M = I A gives A m²; τ = M × B gives M = τ / B in J T⁻¹. Both are equivalent.",
    explanationTamil: "M = IA என்பதிலிருந்து A m² மற்றும் τ = MB என்பதிலிருந்து J T⁻¹ ஆகிய இரண்டும் சரியான அலகுகளாகும்."
  },
  {
    code: "PHY-070", subject: "Physics", topic: "Magnetism", difficulty: "easy",
    questionText: "Permanent magnets are preferably made of:",
    questionTextTamil: "நிலையான காந்தங்கள் செய்ய பொதுவாக பயன்படுவது எது?",
    options: [
      { label: "A", text: "Steel / Alnico (high retentivity and high coercivity)" },
      { label: "B", text: "Soft iron" },
      { label: "C", text: "Copper" },
      { label: "D", text: "Aluminium" }
    ],
    optionsTamil: [
      { label: "A", text: "எஃகு / அல்னிகோ (அதிக தேக்குத்திறன் மற்றும் அதிக நீக்குத்திறன்)" },
      { label: "B", text: "தேனிரும்பு" },
      { label: "C", text: "தாமிரம்" },
      { label: "D", text: "அலுமினியம்" }
    ],
    correctAnswer: "A",
    explanation: "Steel and Alnico have high coercivity so they do not demagnetize easily.",
    explanationTamil: "எஃகு மற்றும் அல்னிகோ அதிக காந்த நீக்குத்திறன் கொண்டிருப்பதால் எளிதில் காந்தத்தன்மையை இழக்காது."
  },
  {
    code: "PHY-071", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "A charged particle moves perpendicular to a uniform magnetic field. Its path is a:",
    questionTextTamil: "சீரான காந்தப்புலத்திற்கு செங்குத்தாக இயங்கும் ஒரு மின்னூட்டம் பெற்ற துகளின் பாதை:",
    options: [
      { label: "A", text: "Straight line" }, { label: "B", text: "Circle" }, { label: "C", text: "Helix" }, { label: "D", text: "Parabola" }
    ],
    optionsTamil: [
      { label: "A", text: "நேர்க்கோடு" }, { label: "B", text: "வட்டம்" }, { label: "C", text: "சுருள்வடிவம் (Helix)" }, { label: "D", text: "பரவளையம்" }
    ],
    correctAnswer: "B",
    explanation: "The magnetic force acts as centripetal force perpendicular to velocity, producing circular motion.",
    explanationTamil: "காந்த விசை திசைவேகத்திற்கு செங்குத்தாக மையநோக்கு விசையாக செயல்படுவதால் வட்டப்பாதையில் இயங்கும்."
  },
  {
    code: "PHY-072", subject: "Physics", topic: "Magnetism", difficulty: "hard",
    questionText: "The radius of the circular path of a particle of mass m, charge q in perpendicular magnetic field B is:",
    questionTextTamil: "B காந்தப்புலத்திற்கு செங்குத்தாக இயங்கும் m நிறை, q மின்னூட்டம் கொண்ட துகளின் வட்டப்பாதை ஆரம்:",
    options: [
      { label: "A", text: "r = m v / (q B)" }, { label: "B", text: "r = q B / (m v)" }, { label: "C", text: "r = m B / (q v)" }, { label: "D", text: "r = q v / (m B)" }
    ],
    optionsTamil: [
      { label: "A", text: "r = m v / (q B)" }, { label: "B", text: "r = q B / (m v)" }, { label: "C", text: "r = m B / (q v)" }, { label: "D", text: "r = q v / (m B)" }
    ],
    correctAnswer: "A",
    explanation: "Centripetal force m v² / r = q v B => r = m v / (q B).",
    explanationTamil: "m v² / r = q v B என்பதிலிருந்து ஆரம் r = m v / (q B)."
  },
  {
    code: "PHY-073", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "When an electron moves parallel to a uniform magnetic field, the magnetic force on it is:",
    questionTextTamil: "ஒரு எலக்ட்ரான் சீரான காந்தப்புலத்திற்கு இணையாக இயங்கும் போது அது உணரும் காந்த விசை:",
    options: [
      { label: "A", text: "Maximum" }, { label: "B", text: "Zero" }, { label: "C", text: "e v B" }, { label: "D", text: "Infinite" }
    ],
    optionsTamil: [
      { label: "A", text: "பெருமம்" }, { label: "B", text: "சுழி" }, { label: "C", text: "e v B" }, { label: "D", text: "முடிவிலி" }
    ],
    correctAnswer: "B",
    explanation: "F = q v B sin θ. Here θ = 0°, so sin 0° = 0 and force is zero.",
    explanationTamil: "F = q v B sin θ. இங்கு θ = 0° என்பதால் காந்த விசை சுழியாகும்."
  },
  {
    code: "PHY-074", subject: "Physics", topic: "Magnetism", difficulty: "easy",
    questionText: "Tangent galvanometer works on the principle of:",
    questionTextTamil: "டேன்ஜென்ட் கால்வனோமீட்டர் எந்த தத்துவத்தின் அடிப்படையில் செயல்படுகிறது?",
    options: [
      { label: "A", text: "Tangent law of magnetism" },
      { label: "B", text: "Faraday's law" },
      { label: "C", text: "Ohm's law" },
      { label: "D", text: "Gauss's law" }
    ],
    optionsTamil: [
      { label: "A", text: "டேன்ஜென்ட் விதி (B = B_H tan θ)" },
      { label: "B", text: "பாரடே விதி" },
      { label: "C", text: "ஓமின் விதி" },
      { label: "D", text: "காஸ் விதி" }
    ],
    correctAnswer: "A",
    explanation: "Tangent galvanometer operates on tangent law: B = B_H tan θ.",
    explanationTamil: "டேன்ஜென்ட் விதியின்படி (B = B_H tan θ) செயல்படுகிறது."
  },
  {
    code: "PHY-075", subject: "Physics", topic: "Magnetism", difficulty: "medium",
    questionText: "Neutral points in a magnetic field are points where:",
    questionTextTamil: "காந்தப்புலத்தில் நடுநிலை புள்ளிகள் என்பது:",
    options: [
      { label: "A", text: "Magnetic field of magnet is exactly balanced by Earth's horizontal component B_H" },
      { label: "B", text: "Earth's magnetic field is zero" },
      { label: "C", text: "Magnetic field of magnet is infinite" },
      { label: "D", text: "Angle of dip is 90°" }
    ],
    optionsTamil: [
      { label: "A", text: "காந்தத்தின் காந்தப்புலம் புவியின் கிடைத்தளக் கூறு B_H-ஆல் சரியாக சமன்செய்யப்படும் புள்ளிகள்" },
      { label: "B", text: "புவிக் காந்தப்புலம் சுழியாகும் புள்ளிகள்" },
      { label: "C", text: "காந்தப்புலம் முடிவிலியாகும் புள்ளிகள்" },
      { label: "D", text: "சரிவுக் கோணம் 90° ஆகும் புள்ளிகள்" }
    ],
    correctAnswer: "A",
    explanation: "At neutral points, net resultant magnetic field is zero because magnet's field equals and opposes B_H.",
    explanationTamil: "நடுநிலை புள்ளிகளில் நிகர காந்தப்புலம் சுழியாகும்."
  }
];
