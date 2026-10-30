// scripts/question_bank/physics_part2.mjs
// Questions PHY-076 to PHY-150: EMI, AC Circuits, EM Waves, Optics

export const physicsPart2 = [
  // 76-100 Electromagnetic Induction (EMI)
  {
    code: "PHY-076", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "easy",
    questionText: "Faraday's second law states that the induced EMF in a circuit is proportional to:",
    questionTextTamil: "பாரடேயின் இரண்டாம் விதிப்படி தூண்டப்பட்ட மின்னியக்கு விசை எதற்கு விகிதசமத்தில் இருக்கும்?",
    options: [
      { label: "A", text: "Rate of change of magnetic flux" },
      { label: "B", text: "Total magnetic flux" },
      { label: "C", text: "Resistance of coil" },
      { label: "D", text: "Electric field" }
    ],
    optionsTamil: [
      { label: "A", text: "காந்தப்பாய மாற்றம் அடையும் வீதம்" },
      { label: "B", text: "மொத்த காந்தப்பாயம்" },
      { label: "C", text: "சுருளின் மின்தடை" },
      { label: "D", text: "மின்புலம்" }
    ],
    correctAnswer: "A",
    explanation: "Induced EMF e = - dΦ_B / dt, proportional to the time rate of change of magnetic flux.",
    explanationTamil: "தூண்டப்பட்ட மின்னியக்கு விசை e = - dΦ_B / dt காந்தப்பாயம் மாறும் வீதத்திற்கு நேர்தகவில் அமையும்."
  },
  {
    code: "PHY-077", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "easy",
    questionText: "Lenz's law is a direct consequence of the conservation of:",
    questionTextTamil: "லென்ஸ் விதி எந்த மாறா விதியின் நேரடி விளைவாகும்?",
    options: [
      { label: "A", text: "Energy" }, { label: "B", text: "Electric charge" }, { label: "C", text: "Linear momentum" }, { label: "D", text: "Mass" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆற்றல்" }, { label: "B", text: "மின்னூட்டம்" }, { label: "C", text: "நேர்கோட்டு உந்தம்" }, { label: "D", text: "நிறை" }
    ],
    correctAnswer: "A",
    explanation: "Lenz's law expresses conservation of energy; mechanical work done opposing induced field converts to electrical energy.",
    explanationTamil: "லென்ஸ் விதி ஆற்றல் மாறா விதியை அடிப்படையாகக் கொண்டது."
  },
  {
    code: "PHY-078", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "easy",
    questionText: "The SI unit of magnetic flux is:",
    questionTextTamil: "காந்தப்பாயத்தின் SI அலகு யாது?",
    options: [
      { label: "A", text: "Weber (Wb)" }, { label: "B", text: "Tesla (T)" }, { label: "C", text: "Henry (H)" }, { label: "D", text: "Joule (J)" }
    ],
    optionsTamil: [
      { label: "A", text: "வெபர் (Wb)" }, { label: "B", text: "டெஸ்லா (T)" }, { label: "C", text: "ஹென்றி (H)" }, { label: "D", text: "ஜூல் (J)" }
    ],
    correctAnswer: "A",
    explanation: "Magnetic flux Φ = B · A has the SI unit Weber (1 Wb = 1 T m²).",
    explanationTamil: "காந்தப்பாயத்தின் SI அலகு வெபர் (Wb) ஆகும் (1 Wb = 1 டெஸ்லா × மீ²)."
  },
  {
    code: "PHY-079", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "easy",
    questionText: "The SI unit of self-inductance and mutual inductance is:",
    questionTextTamil: "தன் மின்தூண்டல் எண் மற்றும் பரிமாற்று மின்தூண்டல் எண்ணின் SI அலகு யாது?",
    options: [
      { label: "A", text: "Henry (H)" }, { label: "B", text: "Weber (Wb)" }, { label: "C", text: "Tesla (T)" }, { label: "D", text: "Farad (F)" }
    ],
    optionsTamil: [
      { label: "A", text: "ஹென்றி (H)" }, { label: "B", text: "வெபர் (Wb)" }, { label: "C", text: "டெஸ்லா (T)" }, { label: "D", text: "பாரட் (F)" }
    ],
    correctAnswer: "A",
    explanation: "Unit of inductance is Henry (H) = Wb/A = V s / A = Ω s.",
    explanationTamil: "மின்தூண்டல் எண்ணின் SI அலகு ஹென்றி (H) ஆகும்."
  },
  {
    code: "PHY-080", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "medium",
    questionText: "Eddy currents (Foucault currents) are produced when:",
    questionTextTamil: "சுழல் மின்னோட்டம் (ஃபூக்கோ மின்னோட்டம்) எப்போது உருவாகிறது?",
    options: [
      { label: "A", text: "A bulk piece of metal is subjected to changing magnetic flux" },
      { label: "B", text: "A steady DC current passes through a wire" },
      { label: "C", text: "A conductor is kept in electrostatic field" },
      { label: "D", text: "A magnet is heated" }
    ],
    optionsTamil: [
      { label: "A", text: "திடமான உலோகப் பட்டை மாறும் காந்தப்பாயத்திற்கு உட்படுத்தப்படும் போது" },
      { label: "B", text: "நேர்திசை மின்னோட்டம் கம்பியில் பாயும் போது" },
      { label: "C", text: "கடத்தி நிலைமின்புலத்தில் வைக்கப்படும் போது" },
      { label: "D", text: "காந்தம் சூடாக்கப்படும் போது" }
    ],
    correctAnswer: "A",
    explanation: "Changing magnetic flux induces closed swirling loops of electric current inside thick conductors called eddy currents.",
    explanationTamil: "மாறும் காந்தப்பாயத்தினால் திடமான உலோகத் தட்டினுள் சுழல் போன்ற தூண்டப்பட்ட மின்னோட்டம் தோன்றுகிறது."
  },
  {
    code: "PHY-081", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "medium",
    questionText: "Eddy currents are minimized in transformer cores by:",
    questionTextTamil: "மின்மாற்றியில் சுழல் மின்னோட்ட இழப்பை எதன் மூலம் குறைக்கலாம்?",
    options: [
      { label: "A", text: "Using laminated cores insulated with varnish" },
      { label: "B", text: "Using a thick solid copper block" },
      { label: "C", text: "Increasing primary voltage" },
      { label: "D", text: "Decreasing secondary turns" }
    ],
    optionsTamil: [
      { label: "A", text: "வார்னிஷ் பூசப்பட்ட மெல்லிய மென்தகடுகளாக்கப்பட்ட உள்ளகத்தைப் பயன்படுத்துவதன் மூலம்" },
      { label: "B", text: "தடித்த தாமிரக் கட்டியைப் பயன்படுத்துவதன் மூலம்" },
      { label: "C", text: "முதன்மை மின்னழுத்தத்தை அதிகரிப்பதன் மூலம்" },
      { label: "D", text: "துணைச்சுருள் சுற்றுகளைக் குறைப்பதன் மூலம்" }
    ],
    correctAnswer: "A",
    explanation: "Thin insulated laminations break continuous electrical paths, drastically reducing eddy current energy loss.",
    explanationTamil: "மெல்லிய மென்தகடுகளாக அமைப்பதன் மூலம் சுழல் மின்னோட்டப் பாதை தடைபட்டு ஆற்றல் இழப்பு குறைகிறது."
  },
  {
    code: "PHY-082", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "medium",
    questionText: "The energy stored in an inductor of inductance L carrying current I is:",
    questionTextTamil: "L மின்தூண்டல் கொண்ட சுருளில் I மின்னோட்டம் பாயும் போது அதில் சேமிக்கப்படும் காந்த ஆற்றல்:",
    options: [
      { label: "A", text: "(1/2) L I²" }, { label: "B", text: "L I" }, { label: "C", text: "L I²" }, { label: "D", text: "(1/2) L² I" }
    ],
    optionsTamil: [
      { label: "A", text: "(1/2) L I²" }, { label: "B", text: "L I" }, { label: "C", text: "L I²" }, { label: "D", text: "(1/2) L² I" }
    ],
    correctAnswer: "A",
    explanation: "Magnetic energy stored in inductor U_B = (1/2) L I².",
    explanationTamil: "மின்தூண்டியில் சேமிக்கப்படும் காந்த ஆற்றல் U = (1/2) L I² ஆகும்."
  },
  {
    code: "PHY-083", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "hard",
    questionText: "A conducting rod of length l moves with velocity v perpendicular to uniform magnetic field B. Motional EMF induced is:",
    questionTextTamil: "B சீரான காந்தப்புலத்திற்கு செங்குத்தாக l நீளமுள்ள கடத்தும் தண்டு v திசைவேகத்தில் இயங்கினால் தூண்டப்படும் இயக்க மின்னியக்கு விசை:",
    options: [
      { label: "A", text: "B l v" }, { label: "B", text: "B l / v" }, { label: "C", text: "B v / l" }, { label: "D", text: "Zero" }
    ],
    optionsTamil: [
      { label: "A", text: "B l v" }, { label: "B", text: "B l / v" }, { label: "C", text: "B v / l" }, { label: "D", text: "சுழி" }
    ],
    correctAnswer: "A",
    explanation: "Motional EMF ε = B l v when B, l, and v are mutually orthogonal.",
    explanationTamil: "இயக்க மின்னியக்கு விசை ε = B l v ஆகும்."
  },
  {
    code: "PHY-084", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "medium",
    questionText: "Self-inductance of a long solenoid of length l, area A, and total turns N is:",
    questionTextTamil: "நீளம் l, குறுக்குவெட்டுப் பரப்பு A மற்றும் N சுற்றுகள் கொண்ட நீண்ட வரிச்சுருளின் தன் மின்தூண்டல் எண்:",
    options: [
      { label: "A", text: "µ₀ N² A / l" }, { label: "B", text: "µ₀ N A / l" }, { label: "C", text: "µ₀ N² l / A" }, { label: "D", text: "µ₀ N A l" }
    ],
    optionsTamil: [
      { label: "A", text: "µ₀ N² A / l" }, { label: "B", text: "µ₀ N A / l" }, { label: "C", text: "µ₀ N² l / A" }, { label: "D", text: "µ₀ N A l" }
    ],
    correctAnswer: "A",
    explanation: "Self-inductance L = µ₀ n² A l = µ₀ (N/l)² A l = µ₀ N² A / l.",
    explanationTamil: "வரிச்சுருளின் தன் மின்தூண்டல் எண் L = µ₀ N² A / l ஆகும்."
  },
  {
    code: "PHY-085", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "easy",
    questionText: "An application of eddy currents is:",
    questionTextTamil: "சுழல் மின்னோட்டத்தின் ஒரு நடைமுறைப் பயன்பாடு:",
    options: [
      { label: "A", text: "Electromagnetic damping in dead-beat galvanometer" },
      { label: "B", text: "Induction furnace" },
      { label: "C", text: "Electric brakes in high-speed trains" },
      { label: "D", text: "All of the above" }
    ],
    optionsTamil: [
      { label: "A", text: "கால்வனோமீட்டரில் மின்காந்தத் தணிப்பு" },
      { label: "B", text: "தூண்டல் உலை" },
      { label: "C", text: "ரயில்களில் மின்காந்தத் தடை (Brakes)" },
      { label: "D", text: "மேற்கண்ட அனைத்தும்" }
    ],
    correctAnswer: "D",
    explanation: "Induction furnace, electromagnetic damping, electric brakes, and speedometer all use eddy currents.",
    explanationTamil: "தூண்டல் உலை, மின்காந்தத் தணிப்பு, மின்காந்தத் தடை அனைத்தும் சுழல் மின்னோட்டப் பயன்பாடுகளாகும்."
  },
  {
    code: "PHY-086", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "medium",
    questionText: "Working principle of an AC generator is based on:",
    questionTextTamil: "மாறுதிசை மின்னியற்றி (AC Generator) எந்த தத்துவத்தின் அடிப்படையில் இயங்குகிறது?",
    options: [
      { label: "A", text: "Electromagnetic induction" }, { label: "B", text: "Joule heating effect" }, { label: "C", text: "Peltier effect" }, { label: "D", text: "Chemical effect of current" }
    ],
    optionsTamil: [
      { label: "A", text: "மின்காந்தத் தூண்டல்" }, { label: "B", text: "ஜூல் வெப்ப விளைவு" }, { label: "C", text: "பெல்டியர் விளைவு" }, { label: "D", text: "மின்னோட்டத்தின் வேதி விளைவு" }
    ],
    correctAnswer: "A",
    explanation: "AC generator rotates a coil in magnetic field to produce alternating EMF by electromagnetic induction.",
    explanationTamil: "காந்தப்புலத்தில் சுருள் சுழலும் போது ஏற்படும் மின்காந்தத் தூண்டல் தத்துவத்தின் அடிப்படையில் இயங்குகிறது."
  },
  {
    code: "PHY-087", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "hard",
    questionText: "If the number of turns in an inductor coil is doubled, its self-inductance:",
    questionTextTamil: "மின்தூண்டிச் சுருளின் சுற்றுகளின் எண்ணிக்கை இருமடங்காக அதிகரிக்கப்பட்டால் அதன் தன் மின்தூண்டல் எண்:",
    options: [
      { label: "A", text: "Becomes doubled" }, { label: "B", text: "Becomes quadrupled (4 times)" }, { label: "C", text: "Becomes halved" }, { label: "D", text: "Remains unchanged" }
    ],
    optionsTamil: [
      { label: "A", text: "இருமடங்காகும்" }, { label: "B", text: "நான்கு மடங்காகும் (4 times)" }, { label: "C", text: "பாதியாகும்" }, { label: "D", text: "மாறாது" }
    ],
    correctAnswer: "B",
    explanation: "L ∝ N², so when N doubles, L increases by 2² = 4 times.",
    explanationTamil: "L ∝ N² என்பதால் சுற்றுகள் இருமடங்காகும்போது தன் மின்தூண்டல் எண் 4 மடங்காகும்."
  },
  {
    code: "PHY-088", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "medium",
    questionText: "The coefficient of coupling k between two magnetically coupled coils with self-inductances L₁ and L₂ is given by:",
    questionTextTamil: "L₁, L₂ தன் மின்தூண்டல் கொண்ட இரு சுருள்களுக்கு இடையிலான பிணைப்புக் குணகம் k:",
    options: [
      { label: "A", text: "k = M / √(L₁ L₂)" }, { label: "B", text: "k = M * √(L₁ L₂)" }, { label: "C", text: "k = √(L₁ L₂) / M" }, { label: "D", text: "k = M / (L₁ + L₂)" }
    ],
    optionsTamil: [
      { label: "A", text: "k = M / √(L₁ L₂)" }, { label: "B", text: "k = M * √(L₁ L₂)" }, { label: "C", text: "k = √(L₁ L₂) / M" }, { label: "D", text: "k = M / (L₁ + L₂)" }
    ],
    correctAnswer: "A",
    explanation: "Mutual inductance M = k √(L₁ L₂), so coupling coefficient k = M / √(L₁ L₂) with 0 ≤ k ≤ 1.",
    explanationTamil: "பிணைப்புக் குணகம் k = M / √(L₁ L₂) ஆகும் (0 ≤ k ≤ 1)."
  },
  {
    code: "PHY-089", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "easy",
    questionText: "A transformer works on the principle of:",
    questionTextTamil: "மின்மாற்றி (Transformer) எந்த தத்துவத்தின் அடிப்படையில் இயங்குகிறது?",
    options: [
      { label: "A", text: "Self induction" }, { label: "B", text: "Mutual induction" }, { label: "C", text: "Seebeck effect" }, { label: "D", text: "Lorentz force" }
    ],
    optionsTamil: [
      { label: "A", text: "தன் மின்தூண்டல்" }, { label: "B", text: "பரிமாற்று மின்தூண்டல் (Mutual Induction)" }, { label: "C", text: "சீபெக் விளைவு" }, { label: "D", text: "லாரன்ஸ் விசை" }
    ],
    correctAnswer: "B",
    explanation: "Transformer operates on mutual induction between primary and secondary coils sharing magnetic flux.",
    explanationTamil: "மின்மாற்றி முதன்மை மற்றும் துணைச் சுருள்களுக்கு இடையேயான பரிமாற்று மின்தூண்டல் தத்துவத்தில் இயங்குகிறது."
  },
  {
    code: "PHY-090", subject: "Physics", topic: "Electromagnetic Induction", difficulty: "medium",
    questionText: "A transformer cannot be used to step up or step down:",
    questionTextTamil: "மின்மாற்றியை எதனை உயர்த்தவோ குறைக்கவோ பயன்படுத்த முடியாது?",
    options: [
      { label: "A", text: "Alternating voltage (AC)" }, { label: "B", text: "Direct voltage (DC)" }, { label: "C", text: "Radio frequency AC" }, { label: "D", text: "Audio frequency AC" }
    ],
    optionsTamil: [
      { label: "A", text: "மாறுதிசை மின்னழுத்தம் (AC)" }, { label: "B", text: "நேர்திசை மின்னழுத்தம் (DC)" }, { label: "C", text: "வானொலி அதிர்வெண் AC" }, { label: "D", text: "கேள் ஒலி அதிர்வெண் AC" }
    ],
    correctAnswer: "B",
    explanation: "DC has zero rate of flux change (dΦ/dt = 0), so no EMF is induced in secondary coil.",
    explanationTamil: "DC மின்னழுத்தத்தில் காந்தப்பாய மாற்றம் சுழி என்பதால் துணைச்சுருளில் தூண்டல் மின்னழுத்தம் ஏற்படாது."
  },

  // 91-110 Alternating Current (AC)
  {
    code: "PHY-091", subject: "Physics", topic: "Alternating Current", difficulty: "easy",
    questionText: "The RMS value of an alternating current I = I₀ sin(ωt) is:",
    questionTextTamil: "I = I₀ sin(ωt) என்ற மாறுதிசை மின்னோட்டத்தின் RMS மதிப்பு யாது?",
    options: [
      { label: "A", text: "I₀ / √2" }, { label: "B", text: "I₀ / 2" }, { label: "C", text: "2 I₀ / π" }, { label: "D", text: "√2 * I₀" }
    ],
    optionsTamil: [
      { label: "A", text: "I₀ / √2 (தோராயமாக 0.707 I₀)" }, { label: "B", text: "I₀ / 2" }, { label: "C", text: "2 I₀ / π" }, { label: "D", text: "√2 * I₀" }
    ],
    correctAnswer: "A",
    explanation: "I_rms = I₀ / √2 ≈ 0.707 I₀.",
    explanationTamil: "RMS மதிப்பு I_rms = I₀ / √2 ≈ 0.707 I₀ ஆகும்."
  },
  {
    code: "PHY-092", subject: "Physics", topic: "Alternating Current", difficulty: "easy",
    questionText: "In India, domestic AC supply has voltage and frequency:",
    questionTextTamil: "இந்தியாவில் வீட்டு உபயோக AC மின்சாரத்தின் மின்னழுத்தம் மற்றும் அதிர்வெண் முறையே:",
    options: [
      { label: "A", text: "220 V, 50 Hz" }, { label: "B", text: "110 V, 60 Hz" }, { label: "C", text: "220 V, 60 Hz" }, { label: "D", text: "440 V, 50 Hz" }
    ],
    optionsTamil: [
      { label: "A", text: "220 V, 50 Hz" }, { label: "B", text: "110 V, 60 Hz" }, { label: "C", text: "220 V, 60 Hz" }, { label: "D", text: "440 V, 50 Hz" }
    ],
    correctAnswer: "A",
    explanation: "Standard domestic AC in India is 220 V RMS at 50 Hz frequency.",
    explanationTamil: "இந்தியாவில் வீட்டு உபயோகத்திற்கான தரநிலை AC மின்னழுத்தம் 220 V மற்றும் அதிர்வெண் 50 Hz ஆகும்."
  },
  {
    code: "PHY-093", subject: "Physics", topic: "Alternating Current", difficulty: "medium",
    questionText: "In a purely inductive AC circuit, current:",
    questionTextTamil: "தூய மின்தூண்டி மட்டுமே கொண்ட AC சுற்றில் மின்னோட்டமானது:",
    options: [
      { label: "A", text: "Lags voltage by 90° (π/2 radians)" },
      { label: "B", text: "Leads voltage by 90°" },
      { label: "C", text: "Is in phase with voltage" },
      { label: "D", text: "Lags voltage by 180°" }
    ],
    optionsTamil: [
      { label: "A", text: "மின்னழுத்தத்தை விட 90° (π/2) கட்டத்தில் பின்தங்கி இருக்கும்" },
      { label: "B", text: "மின்னழுத்தத்தை விட 90° கட்டத்தில் முன்னிலையில் இருக்கும்" },
      { label: "C", text: "மின்னழுத்தத்துடன் ஒரே கட்டத்தில் இருக்கும்" },
      { label: "D", text: "180° பின்தங்கி இருக்கும்" }
    ],
    correctAnswer: "A",
    explanation: "In purely inductive circuit, current lags voltage by π/2 (90°).",
    explanationTamil: "தூய மின்தூண்டி சுற்றில் மின்னோட்டம் மின்னழுத்தத்தை விட π/2 (90°) கட்டத்தில் பின்தங்கும்."
  },
  {
    code: "PHY-094", subject: "Physics", topic: "Alternating Current", difficulty: "medium",
    questionText: "In a purely capacitive AC circuit, current:",
    questionTextTamil: "தூய மின்தேக்கி மட்டுமே உள்ள AC சுற்றில் மின்னோட்டமானது:",
    options: [
      { label: "A", text: "Leads voltage by 90° (π/2 radians)" },
      { label: "B", text: "Lags voltage by 90°" },
      { label: "C", text: "Is in phase with voltage" },
      { label: "D", text: "Lags voltage by 180°" }
    ],
    optionsTamil: [
      { label: "A", text: "மின்னழுத்தத்தை விட 90° (π/2) கட்டத்தில் முன்னிலையில் இருக்கும்" },
      { label: "B", text: "மின்னழுத்தத்தை விட 90° பின்தங்கி இருக்கும்" },
      { label: "C", text: "மின்னழுத்தத்துடன் ஒரே கட்டத்தில் இருக்கும்" },
      { label: "D", text: "180° பின்தங்கி இருக்கும்" }
    ],
    correctAnswer: "A",
    explanation: "In purely capacitive circuit, current leads voltage by π/2 (90°).",
    explanationTamil: "தூய மின்தேக்கி சுற்றில் மின்னோட்டம் மின்னழுத்தத்தை விட π/2 (90°) முன்னிலையில் இருக்கும்."
  },
  {
    code: "PHY-095", subject: "Physics", topic: "Alternating Current", difficulty: "easy",
    questionText: "Inductive reactance X_L of an inductor of inductance L at angular frequency ω is:",
    questionTextTamil: "L மின்தூண்டல் கொண்ட சுருளின் தூண்டல் மின்மறுப்பு X_L:",
    options: [
      { label: "A", text: "ω L" }, { label: "B", text: "1 / (ω L)" }, { label: "C", text: "ω / L" }, { label: "D", text: "L / ω" }
    ],
    optionsTamil: [
      { label: "A", text: "ω L" }, { label: "B", text: "1 / (ω L)" }, { label: "C", text: "ω / L" }, { label: "D", text: "L / ω" }
    ],
    correctAnswer: "A",
    explanation: "Inductive reactance X_L = ω L = 2π f L. Increases with frequency.",
    explanationTamil: "தூண்டல் மின்மறுப்பு X_L = ω L = 2π f L ஆகும்."
  },
  {
    code: "PHY-096", subject: "Physics", topic: "Alternating Current", difficulty: "easy",
    questionText: "Capacitive reactance X_C of a capacitor of capacitance C at angular frequency ω is:",
    questionTextTamil: "C மின்தேக்குத்திறன் கொண்ட மின்தேக்கியின் தேக்க மின்மறுப்பு X_C:",
    options: [
      { label: "A", text: "1 / (ω C)" }, { label: "B", text: "ω C" }, { label: "C", text: "ω / C" }, { label: "D", text: "C / ω" }
    ],
    optionsTamil: [
      { label: "A", text: "1 / (ω C)" }, { label: "B", text: "ω C" }, { label: "C", text: "ω / C" }, { label: "D", text: "C / ω" }
    ],
    correctAnswer: "A",
    explanation: "Capacitive reactance X_C = 1 / (ω C) = 1 / (2π f C). Decreases as frequency increases.",
    explanationTamil: "தேக்க மின்மறுப்பு X_C = 1 / (ω C) ஆகும்."
  },
  {
    code: "PHY-097", subject: "Physics", topic: "Alternating Current", difficulty: "medium",
    questionText: "At series electrical resonance in an LCR circuit, the impedance Z is:",
    questionTextTamil: "தொடர் LCR சுற்றில் ஒத்ததிர்வின் போது மின்மறிப்பு Z:",
    options: [
      { label: "A", text: "Minimum and equal to resistance R" },
      { label: "B", text: "Maximum" },
      { label: "C", text: "Zero" },
      { label: "D", text: "Infinite" }
    ],
    optionsTamil: [
      { label: "A", text: "குறைந்தபட்சம் மற்றும் மின்தடை R-க்கு சமம்" },
      { label: "B", text: "பெருமம்" },
      { label: "C", text: "சுழி" },
      { label: "D", text: "முடிவிலி" }
    ],
    correctAnswer: "A",
    explanation: "At resonance X_L = X_C, so Z = √[R² + (X_L - X_C)²] = R (minimum), giving maximum current.",
    explanationTamil: "ஒத்ததிர்வில் X_L = X_C எனவே Z = R (குறைந்தபட்சம்) மற்றும் மின்னோட்டம் பெருமமாகும்."
  },
  {
    code: "PHY-098", subject: "Physics", topic: "Alternating Current", difficulty: "medium",
    questionText: "Resonant angular frequency ω₀ of a series LCR circuit is:",
    questionTextTamil: "தொடர் LCR சுற்றின் ஒத்ததிர்வு கோண அதிர்வெண் ω₀:",
    options: [
      { label: "A", text: "1 / √(L C)" }, { label: "B", text: "√(L C)" }, { label: "C", text: "L / C" }, { label: "D", text: "C / L" }
    ],
    optionsTamil: [
      { label: "A", text: "1 / √(L C)" }, { label: "B", text: "√(L C)" }, { label: "C", text: "L / C" }, { label: "D", text: "C / L" }
    ],
    correctAnswer: "A",
    explanation: "ω₀ L = 1 / (ω₀ C) => ω₀² = 1 / (LC) => ω₀ = 1 / √(LC).",
    explanationTamil: "ஒத்ததிர்வு கோண அதிர்வெண் ω₀ = 1 / √(L C) ஆகும்."
  },
  {
    code: "PHY-099", subject: "Physics", topic: "Alternating Current", difficulty: "hard",
    questionText: "The Quality factor (Q-factor) of a series resonant LCR circuit is given by:",
    questionTextTamil: "தொடர் LCR சுற்றின் தரக்காரணி (Q-factor) யாது?",
    options: [
      { label: "A", text: "(1 / R) * √(L / C)" }, { label: "B", text: "R * √(L / C)" }, { label: "C", text: "(1 / R) * √(C / L)" }, { label: "D", text: "R * √(C / L)" }
    ],
    optionsTamil: [
      { label: "A", text: "(1 / R) * √(L / C)" }, { label: "B", text: "R * √(L / C)" }, { label: "C", text: "(1 / R) * √(C / L)" }, { label: "D", text: "R * √(C / L)" }
    ],
    correctAnswer: "A",
    explanation: "Q = ω₀ L / R = (1 / R) √(L / C). Higher Q implies sharper resonance peak.",
    explanationTamil: "தரக்காரணி Q = (1 / R) √(L / C) ஆகும்."
  },
  {
    code: "PHY-100", subject: "Physics", topic: "Alternating Current", difficulty: "medium",
    questionText: "Power factor of a pure inductor or pure capacitor AC circuit is:",
    questionTextTamil: "தூய மின்தூண்டி அல்லது தூய மின்தேக்கி AC சுற்றின் திறன் காரணி (Power factor):",
    options: [
      { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "0.5" }, { label: "D", text: "Infinite" }
    ],
    optionsTamil: [
      { label: "A", text: "0 (சுழி)" }, { label: "B", text: "1" }, { label: "C", text: "0.5" }, { label: "D", text: "முடிவிலி" }
    ],
    correctAnswer: "A",
    explanation: "Power factor = cos Φ. Since phase angle Φ = 90°, cos 90° = 0 (wattless current).",
    explanationTamil: "கட்டக் கோணம் Φ = 90° என்பதால் திறன் காரணி cos 90° = 0 (திறனற்ற மின்னோட்டம்)."
  },

  // 101-120 Transformers & Electromagnetic Waves
  {
    code: "PHY-101", subject: "Physics", topic: "Alternating Current", difficulty: "easy",
    questionText: "In a step-up transformer, which quantity increases from primary to secondary?",
    questionTextTamil: "ஒரு ஏற்று மின்மாற்றியில் முதன்மைச் சுருளிலிருந்து துணைச் சுருளுக்கு எது அதிகரிக்கும்?",
    options: [
      { label: "A", text: "Voltage" }, { label: "B", text: "Current" }, { label: "C", text: "Frequency" }, { label: "D", text: "Power" }
    ],
    optionsTamil: [
      { label: "A", text: "மின்னழுத்தம்" }, { label: "B", text: "மின்னோட்டம்" }, { label: "C", text: "அதிர்வெண்" }, { label: "D", text: "திறன்" }
    ],
    correctAnswer: "A",
    explanation: "Step-up transformer increases voltage (V_s > V_p) while current decreases proportionately (I_s < I_p).",
    explanationTamil: "ஏற்று மின்மாற்றி மின்னழுத்தத்தை உயர்த்துகிறது (மின்னோட்டம் குறைகிறது)."
  },
  {
    code: "PHY-102", subject: "Physics", topic: "Alternating Current", difficulty: "medium",
    questionText: "For an ideal transformer, the transformation ratio k is:",
    questionTextTamil: "ஒரு இலட்சிய மின்மாற்றியில் மாற்ற விகிதம் k என்பது:",
    options: [
      { label: "A", text: "k = V_s / V_p = N_s / N_p = I_p / I_s" },
      { label: "B", text: "k = V_s / V_p = N_p / N_s = I_s / I_p" },
      { label: "C", text: "k = V_p / V_s = N_s / N_p" },
      { label: "D", text: "k = V_s * V_p" }
    ],
    optionsTamil: [
      { label: "A", text: "k = V_s / V_p = N_s / N_p = I_p / I_s" },
      { label: "B", text: "k = V_s / V_p = N_p / N_s = I_s / I_p" },
      { label: "C", text: "k = V_p / V_s = N_s / N_p" },
      { label: "D", text: "k = V_s * V_p" }
    ],
    correctAnswer: "A",
    explanation: "V_s / V_p = N_s / N_p = I_p / I_s = k.",
    explanationTamil: "மாற்ற விகிதம் k = V_s / V_p = N_s / N_p = I_p / I_s ஆகும்."
  },
  {
    code: "PHY-103", subject: "Physics", topic: "Electromagnetic Waves", difficulty: "easy",
    questionText: "Electromagnetic waves were theoretically predicted by:",
    questionTextTamil: "மின்காந்த அலைகளை கோட்பாட்டு ரீதியாக முதலில் முன்மொழிந்தவர் யார்?",
    options: [
      { label: "A", text: "James Clerk Maxwell" }, { label: "B", text: "Heinrich Hertz" }, { label: "C", text: "Guglielmo Marconi" }, { label: "D", text: "J.C. Bose" }
    ],
    optionsTamil: [
      { label: "A", text: "ஜேம்ஸ் கிளார்க் மேக்ஸ்வெல்" }, { label: "B", text: "ஹென்ரிக் ஹெர்ட்ஸ்" }, { label: "C", text: "மார்கோனி" }, { label: "D", text: "ஜே.சி. போஸ்" }
    ],
    correctAnswer: "A",
    explanation: "Maxwell predicted EM waves in 1865 using his modified electromagnetic equations.",
    explanationTamil: "மேக்ஸ்வெல் 1865-ல் மின்காந்த அலைகள் இருப்பதை கணிதவியல் முறையில் நிறுவினார்."
  },
  {
    code: "PHY-104", subject: "Physics", topic: "Electromagnetic Waves", difficulty: "medium",
    questionText: "Displacement current arises due to:",
    questionTextTamil: "இடப்பெயர்ச்சி மின்னோட்டம் (Displacement current) எதனால் உருவாகிறது?",
    options: [
      { label: "A", text: "Time-varying electric flux" },
      { label: "B", text: "Steady flow of electrons" },
      { label: "C", text: "Static magnetic field" },
      { label: "D", text: "Zero electric field" }
    ],
    optionsTamil: [
      { label: "A", text: "காலத்தைப் பொறுத்து மாறும் மின்பாயம்" },
      { label: "B", text: "சீரான எலக்ட்ரான் ஓட்டம்" },
      { label: "C", text: "நிலையான காந்தப்புலம்" },
      { label: "D", text: "சுழி மின்புலம்" }
    ],
    correctAnswer: "A",
    explanation: "Displacement current I_d = ε₀ (dΦ_E / dt) is produced by time-varying electric flux.",
    explanationTamil: "இடப்பெயர்ச்சி மின்னோட்டம் I_d = ε₀ (dΦ_E / dt) மாறும் மின்பாயத்தால் உருவாகிறது."
  },
  {
    code: "PHY-105", subject: "Physics", topic: "Electromagnetic Waves", difficulty: "easy",
    questionText: "The speed of electromagnetic waves in vacuum is given by:",
    questionTextTamil: "வெற்றிடத்தில் மின்காந்த அலையின் வேகம் c எதற்கு சமம்?",
    options: [
      { label: "A", text: "1 / √(µ₀ ε₀)" }, { label: "B", text: "√(µ₀ ε₀)" }, { label: "C", text: "µ₀ / ε₀" }, { label: "D", text: "ε₀ / µ₀" }
    ],
    optionsTamil: [
      { label: "A", text: "1 / √(µ₀ ε₀)" }, { label: "B", text: "√(µ₀ ε₀)" }, { label: "C", text: "µ₀ / ε₀" }, { label: "D", text: "ε₀ / µ₀" }
    ],
    correctAnswer: "A",
    explanation: "c = 1 / √(µ₀ ε₀) ≈ 3 × 10⁸ m/s.",
    explanationTamil: "மின்காந்த அலையின் வேகம் c = 1 / √(µ₀ ε₀) ≈ 3 × 10⁸ மீ/வி ஆகும்."
  },
  {
    code: "PHY-106", subject: "Physics", topic: "Electromagnetic Waves", difficulty: "medium",
    questionText: "In an electromagnetic wave, the phase difference between electric field E and magnetic field B is:",
    questionTextTamil: "மின்காந்த அலையில் மின்புலம் E மற்றும் காந்தப்புலம் B இடையே உள்ள கட்ட வேறுபாடு:",
    options: [
      { label: "A", text: "0° (in phase)" }, { label: "B", text: "90°" }, { label: "C", text: "180°" }, { label: "D", text: "45°" }
    ],
    optionsTamil: [
      { label: "A", text: "0° (ஒரே கட்டத்தில் இருக்கும்)" }, { label: "B", text: "90°" }, { label: "C", text: "180°" }, { label: "D", text: "45°" }
    ],
    correctAnswer: "A",
    explanation: "E and B reach maxima and minima at the same time and position; their phase difference is 0°.",
    explanationTamil: "E மற்றும் B ஒரே நேரத்தில் பெருமத்தையும் சிறுமத்தையும் அடைகின்றன, எனவே கட்ட வேறுபாடு 0°."
  },
  {
    code: "PHY-107", subject: "Physics", topic: "Electromagnetic Waves", difficulty: "easy",
    questionText: "Which electromagnetic waves have the shortest wavelength and highest frequency?",
    questionTextTamil: "மிகக் குறைந்த அலைநீளமும் அதிகபட்ச அதிர்வெண்ணும் கொண்ட மின்காந்த அலைகள் எவை?",
    options: [
      { label: "A", text: "Gamma rays" }, { label: "B", text: "Radio waves" }, { label: "C", text: "Microwaves" }, { label: "D", text: "Visible light" }
    ],
    optionsTamil: [
      { label: "A", text: "காமா கதிர்கள்" }, { label: "B", text: "வானொலி அலைகள்" }, { label: "C", text: "நுண்ணலைகள் (Microwaves)" }, { label: "D", text: "கண்ணுறு ஒளி" }
    ],
    correctAnswer: "A",
    explanation: "Gamma rays have wavelengths < 10⁻¹² m and highest photon energies.",
    explanationTamil: "காமா கதிர்கள் மிகக் குறுகிய அலைநீளமும் அதிக ஆற்றலும் அதிர்வெண்ணும் கொண்டவை."
  },
  {
    code: "PHY-108", subject: "Physics", topic: "Electromagnetic Waves", difficulty: "easy",
    questionText: "Microwaves are primarily used in:",
    questionTextTamil: "நுண்ணலைகள் (Microwaves) முதன்மையாக எதில் பயன்படுகின்றன?",
    options: [
      { label: "A", text: "Radar systems and microwave ovens" },
      { label: "B", text: "Cancer treatment" },
      { label: "C", text: "Sterilizing surgical instruments" },
      { label: "D", text: "Photography in dark" }
    ],
    optionsTamil: [
      { label: "A", text: "ரேடார் அமைப்புகள் மற்றும் மைக்ரோவேவ் அடுப்புகள்" },
      { label: "B", text: "புற்றுநோய் சிகிச்சை" },
      { label: "C", text: "அறுவை சிகிச்சைக் கருவிகளைத் தூய்மைப்படுத்தல்" },
      { label: "D", text: "இருட்டில் புகைப்படம் எடுத்தல்" }
    ],
    correctAnswer: "A",
    explanation: "Microwaves are used in aircraft navigation radar and dielectric heating in microwave ovens.",
    explanationTamil: "ரேடார் தொடர்பு அமைப்புகள் மற்றும் மைக்ரோவேவ் அடுப்புகளில் நுண்ணலைகள் பயன்படுகின்றன."
  },
  {
    code: "PHY-109", subject: "Physics", topic: "Electromagnetic Waves", difficulty: "medium",
    questionText: "Greenhouse effect on Earth is mainly caused by absorption of which radiation by atmosphere?",
    questionTextTamil: "புவியில் பசுமைக்குடில் விளைவு முக்கியமாக வளிமண்டலம் எந்த கதிர்வீச்சை உறிஞ்சுவதால் ஏற்படுகிறது?",
    options: [
      { label: "A", text: "Infrared radiation" }, { label: "B", text: "Ultraviolet radiation" }, { label: "C", text: "X-rays" }, { label: "D", text: "Gamma rays" }
    ],
    optionsTamil: [
      { label: "A", text: "அகச்சிவப்புக் கதிர்கள் (Infrared)" }, { label: "B", text: "புற ஊதாக் கதிர்கள்" }, { label: "C", text: "எக்ஸ் கதிர்கள்" }, { label: "D", text: "காமா கதிர்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Earth reradiates heat as long-wavelength infrared radiation which is trapped by CO₂ and water vapour.",
    explanationTamil: "புவியிலிருந்து வெளிப்படும் நீண்ட அலைநீள அகச்சிவப்புக் கதிர்கள் பசுமைக்குடில் வாயுக்களால் உறிஞ்சப்படுகின்றன."
  },
  {
    code: "PHY-110", subject: "Physics", topic: "Electromagnetic Waves", difficulty: "easy",
    questionText: "The ozone layer in the stratosphere protects life on Earth by absorbing:",
    questionTextTamil: "வளிமண்டல ஓசோன் படலம் எதனை உறிஞ்சி புவியில் உள்ள உயிரினங்களைப் பாதுகாக்கிறது?",
    options: [
      { label: "A", text: "Ultraviolet (UV) radiation from the Sun" },
      { label: "B", text: "Infrared rays" },
      { label: "C", text: "Radio waves" },
      { label: "D", text: "Cosmic rays" }
    ],
    optionsTamil: [
      { label: "A", text: "சூரியனிலிருந்து வரும் தீங்கு விளைவிக்கும் புற ஊதாக் (UV) கதிர்கள்" },
      { label: "B", text: "அகச்சிவப்புக் கதிர்கள்" },
      { label: "C", text: "வானொலி அலைகள்" },
      { label: "D", text: "காஸ்மிக் கதிர்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Ozone (O₃) absorbs harmful high-energy UV-B and UV-C radiation.",
    explanationTamil: "ஓசோன் படலம் ஆபத்தான புற ஊதாக் கதிர்களை உறிஞ்சி வடிகட்டுகிறது."
  },

  // 111-135 Optics (Ray & Wave)
  {
    code: "PHY-111", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "Total internal reflection occurs when light travels from:",
    questionTextTamil: "முழு அக எதிரொளிப்பு நிகழ ஒளி எந்த ஊடகத்திலிருந்து எதற்கு செல்ல வேண்டும்?",
    options: [
      { label: "A", text: "Denser medium to rarer medium at angle greater than critical angle" },
      { label: "B", text: "Rarer medium to denser medium" },
      { label: "C", text: "Denser to rarer at angle less than critical angle" },
      { label: "D", text: "Air to glass at 90°" }
    ],
    optionsTamil: [
      { label: "A", text: "அடர்மிகு ஊடகத்திலிருந்து அடர்குறை ஊடகத்திற்கு மாறுநிலைக் கோணத்தை விட அதிக கோணத்தில் செல்லும்போது" },
      { label: "B", text: "அடர்குறை ஊடகத்திலிருந்து அடர்மிகு ஊடகத்திற்கு" },
      { label: "C", text: "மாறுநிலைக் கோணத்தை விடக் குறைவான கோணத்தில்" },
      { label: "D", text: "காற்றிலிருந்து கண்ணாடிக்கு 90°-ல்" }
    ],
    correctAnswer: "A",
    explanation: "Two conditions for TIR: light must travel from denser to rarer medium, and angle of incidence i > critical angle C.",
    explanationTamil: "முழு அக எதிரொளிப்பு நிபந்தனை: ஒளி அடர்மிகு ஊடகத்திலிருந்து அடர்குறைக்கு செல்ல வேண்டும் மற்றும் படுகோணம் i > மாறுநிலைக் கோணம் C."
  },
  {
    code: "PHY-112", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "Optical fibres transmit light signals over long distances without significant loss based on:",
    questionTextTamil: "ஒளியிழை (Optical Fibre) எந்த தத்துவத்தின் அடிப்படையில் ஒளியைக் கடத்துகிறது?",
    options: [
      { label: "A", text: "Total internal reflection" }, { label: "B", text: "Diffraction" }, { label: "C", text: "Scattering" }, { label: "D", text: "Polarization" }
    ],
    optionsTamil: [
      { label: "A", text: "முழு அக எதிரொளிப்பு (Total Internal Reflection)" }, { label: "B", text: "விளிம்பு விளைவு" }, { label: "C", text: "ஒளிச்சிதறல்" }, { label: "D", text: "தளவிளைவு" }
    ],
    correctAnswer: "A",
    explanation: "Light undergoes repeated total internal reflections inside the higher refractive index core.",
    explanationTamil: "ஒளியிழையின் உள்ளகத்தில் தொடர் முழு அக எதிரொளிப்பு மூலம் ஒளி சைகைகள் கடத்தப்படுகின்றன."
  },
  {
    code: "PHY-113", subject: "Physics", topic: "Optics", difficulty: "medium",
    questionText: "The relation between critical angle C and refractive index n of denser medium is:",
    questionTextTamil: "மாறுநிலைக் கோணம் C மற்றும் ஒளிவிலகல் எண் n இடையிலான தொடர்பு:",
    options: [
      { label: "A", text: "sin C = 1 / n" }, { label: "B", text: "cos C = 1 / n" }, { label: "C", text: "tan C = 1 / n" }, { label: "D", text: "sin C = n" }
    ],
    optionsTamil: [
      { label: "A", text: "sin C = 1 / n" }, { label: "B", text: "cos C = 1 / n" }, { label: "C", text: "tan C = 1 / n" }, { label: "D", text: "sin C = n" }
    ],
    correctAnswer: "A",
    explanation: "By Snell's law at critical angle, n sin C = 1 * sin 90° => sin C = 1/n.",
    explanationTamil: "ஸ்நெல் விதிப்படி, n sin C = sin 90° => sin C = 1/n."
  },
  {
    code: "PHY-114", subject: "Physics", topic: "Optics", difficulty: "medium",
    questionText: "Lens Maker's formula for a thin lens of refractive index n and radii of curvature R₁ and R₂ is:",
    questionTextTamil: "மெல்லிய வில்லைக்கான வில்லை உருவாக்குபவரின் சமன்பாடு (Lens Maker's Formula):",
    options: [
      { label: "A", text: "1/f = (n - 1) [1/R₁ - 1/R₂]" },
      { label: "B", text: "1/f = (n + 1) [1/R₁ + 1/R₂]" },
      { label: "C", text: "f = (n - 1) [R₁ - R₂]" },
      { label: "D", text: "1/f = (n - 1) [R₁ / R₂]" }
    ],
    optionsTamil: [
      { label: "A", text: "1/f = (n - 1) [1/R₁ - 1/R₂]" },
      { label: "B", text: "1/f = (n + 1) [1/R₁ + 1/R₂]" },
      { label: "C", text: "f = (n - 1) [R₁ - R₂]" },
      { label: "D", text: "1/f = (n - 1) [R₁ / R₂]" }
    ],
    correctAnswer: "A",
    explanation: "Lens maker's equation: 1/f = (n - 1) (1/R₁ - 1/R₂).",
    explanationTamil: "வில்லை தயாரிப்பாளர் சமன்பாடு 1/f = (n - 1) [1/R₁ - 1/R₂] ஆகும்."
  },
  {
    code: "PHY-115", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "The power P of a lens having focal length 50 cm is:",
    questionTextTamil: "50 cm குவியத் தொலைவு கொண்ட ஒரு குவிலென்ஸின் திறன் (Power):",
    options: [
      { label: "A", text: "+2 Dioptres" }, { label: "B", text: "-2 Dioptres" }, { label: "C", text: "+0.5 Dioptres" }, { label: "D", text: "+5 Dioptres" }
    ],
    optionsTamil: [
      { label: "A", text: "+2 டையாப்டர் (D)" }, { label: "B", text: "-2 டையாப்டர்" }, { label: "C", text: "+0.5 டையாப்டர்" }, { label: "D", text: "+5 டையாப்டர்" }
    ],
    correctAnswer: "A",
    explanation: "P = 1 / f(m) = 1 / 0.5 m = +2 D.",
    explanationTamil: "வில்லைத்திறன் P = 1 / f(மீட்டர்) = 1 / 0.5 = +2 டையாப்டர் (D)."
  },
  {
    code: "PHY-116", subject: "Physics", topic: "Optics", difficulty: "medium",
    questionText: "Two thin lenses of powers +3 D and -1 D are placed in contact. The power and focal length of combination are:",
    questionTextTamil: "+3 D மற்றும் -1 D திறன் கொண்ட இரு மெல்லிய லென்ஸ்கள் தொட்டுக்கொண்டிருக்கும் போது தொகுபயன் திறன் மற்றும் குவியத்தூரம்:",
    options: [
      { label: "A", text: "+2 D, +50 cm" }, { label: "B", text: "+4 D, +25 cm" }, { label: "C", text: "-2 D, -50 cm" }, { label: "D", text: "+2 D, +20 cm" }
    ],
    optionsTamil: [
      { label: "A", text: "+2 D, +50 cm" }, { label: "B", text: "+4 D, +25 cm" }, { label: "C", text: "-2 D, -50 cm" }, { label: "D", text: "+2 D, +20 cm" }
    ],
    correctAnswer: "A",
    explanation: "P = P₁ + P₂ = 3 - 1 = +2 D; f = 1/P = 1/2 m = +50 cm.",
    explanationTamil: "P = P₁ + P₂ = +2 D; f = 100/P = 100/2 = +50 cm."
  },
  {
    code: "PHY-117", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "Myopia (short-sightedness) is corrected using a:",
    questionTextTamil: "கிட்டப்பார்வை (Myopia) குறைபாட்டை சரிசெய்ய பயன்படுவது:",
    options: [
      { label: "A", text: "Concave lens" }, { label: "B", text: "Convex lens" }, { label: "C", text: "Cylindrical lens" }, { label: "D", text: "Bifocal lens" }
    ],
    optionsTamil: [
      { label: "A", text: "குழி லென்ஸ் (Concave lens)" }, { label: "B", text: "குவி லென்ஸ்" }, { label: "C", text: "உருளை லென்ஸ்" }, { label: "D", text: "இரு குவிய லென்ஸ்" }
    ],
    correctAnswer: "A",
    explanation: "In myopia, light focuses in front of retina; a diverging (concave) lens moves focus onto retina.",
    explanationTamil: "கிட்டப்பார்வை குறைபாட்டை சரிசெய்ய விரிக்கும் குழி லென்ஸ் பயன்படுத்தப்படுகிறது."
  },
  {
    code: "PHY-118", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "Hypermetropia (long-sightedness) is corrected using a:",
    questionTextTamil: "தூரப்பார்வை (Hypermetropia) குறைபாட்டை சரிசெய்ய பயன்படுவது:",
    options: [
      { label: "A", text: "Convex lens" }, { label: "B", text: "Concave lens" }, { label: "C", text: "Prism" }, { label: "D", text: "Cylindrical lens" }
    ],
    optionsTamil: [
      { label: "A", text: "குவி லென்ஸ் (Convex lens)" }, { label: "B", text: "குழி லென்ஸ்" }, { label: "C", text: "முப்பட்டகம்" }, { label: "D", text: "உருளை லென்ஸ்" }
    ],
    correctAnswer: "A",
    explanation: "Hypermetropia focuses behind retina; converging (convex) lens brings focus onto retina.",
    explanationTamil: "தூரப்பார்வையை சரிசெய்ய குவிக்கும் குவி லென்ஸ் பயன்படுகிறது."
  },
  {
    code: "PHY-119", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "Astigmatism of eye is corrected using:",
    questionTextTamil: "விழிக் கோளத்தின் சீரற்ற வளைவால் ஏற்படும் விழிப்பார்வை குறைபாட்டை (Astigmatism) சரிசெய்ய உதவுவது:",
    options: [
      { label: "A", text: "Cylindrical lens" }, { label: "B", text: "Convex lens" }, { label: "C", text: "Concave lens" }, { label: "D", text: "Tinted glass" }
    ],
    optionsTamil: [
      { label: "A", text: "உருளை வில்லை (Cylindrical lens)" }, { label: "B", text: "குவி லென்ஸ்" }, { label: "C", text: "குழி லென்ஸ்" }, { label: "D", text: "வண்ணக் கண்ணாடி" }
    ],
    correctAnswer: "A",
    explanation: "Astigmatism is due to different curvatures in horizontal and vertical meridians, corrected by cylindrical lenses.",
    explanationTamil: "கார்னியாவின் சீரற்ற வளைவை சரிசெய்ய உருளை லென்ஸ் பயன்படுகிறது."
  },
  {
    code: "PHY-120", subject: "Physics", topic: "Optics", difficulty: "medium",
    questionText: "According to Rayleigh's scattering law, scattered light intensity I is proportional to wavelength λ as:",
    questionTextTamil: "ராலே ஒளிச்சிதறல் விதிப்படி சிதறலடைந்த ஒளியின் செறிவு I அலைநீளம் λ உடன் எவ்வாறு தொடர்புடையது?",
    options: [
      { label: "A", text: "I ∝ 1 / λ⁴" }, { label: "B", text: "I ∝ 1 / λ²" }, { label: "C", text: "I ∝ λ⁴" }, { label: "D", text: "I ∝ 1 / λ" }
    ],
    optionsTamil: [
      { label: "A", text: "I ∝ 1 / λ⁴" }, { label: "B", text: "I ∝ 1 / λ²" }, { label: "C", text: "I ∝ λ⁴" }, { label: "D", text: "I ∝ 1 / λ" }
    ],
    correctAnswer: "A",
    explanation: "Rayleigh scattering intensity is inversely proportional to fourth power of wavelength (1/λ⁴), explaining why sky appears blue.",
    explanationTamil: "ராலே சிதறலின் அளவு அலைநீளத்தின் நான்குமடிக்கு எதிர்த்தகவில் (1/λ⁴) அமையும். இதனால் வானம் நீல நிறமாகத் தெரிகிறது."
  },

  // 121-135 Wave Optics (Huygens, Interference, Diffraction, Polarization)
  {
    code: "PHY-121", subject: "Physics", topic: "Optics", difficulty: "medium",
    questionText: "Huygens' wave theory of light could not explain:",
    questionTextTamil: "ஹைகன்ஸின் அலைக்கொள்கையால் விளக்க முடியாத நிகழ்வு எது?",
    options: [
      { label: "A", text: "Photoelectric effect" }, { label: "B", text: "Interference" }, { label: "C", text: "Diffraction" }, { label: "D", text: "Refraction" }
    ],
    optionsTamil: [
      { label: "A", text: "ஒளிமின் விளைவு" }, { label: "B", text: "குறுக்கீட்டு விளைவு" }, { label: "C", text: "விளிம்பு விளைவு" }, { label: "D", text: "ஒளிவிலகல்" }
    ],
    correctAnswer: "A",
    explanation: "Photoelectric effect requires quantum / particle nature of light (photons), which wave theory cannot explain.",
    explanationTamil: "ஒளிமின் விளைவை ஒளியின் குவாண்டம் கொள்கை மட்டுமே விளக்குகிறது; அலைக்கொள்கையால் விளக்க முடியாது."
  },
  {
    code: "PHY-122", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "Wavefront originating from a point source at finite distance is:",
    questionTextTamil: "வரையறுக்கப்பட்ட தொலைவில் உள்ள ஒரு புள்ளி மூலத்திலிருந்து வெளிவரும் அலைமுகப்பு எத்தகையது?",
    options: [
      { label: "A", text: "Spherical" }, { label: "B", text: "Cylindrical" }, { label: "C", text: "Plane" }, { label: "D", text: "Elliptical" }
    ],
    optionsTamil: [
      { label: "A", text: "கோள வடிவ அலைமுகப்பு" }, { label: "B", text: "உருளை வடிவ அலைமுகப்பு" }, { label: "C", text: "தள அலைமுகப்பு" }, { label: "D", text: "நீள்வட்ட அலைமுகப்பு" }
    ],
    correctAnswer: "A",
    explanation: "A point source radiates symmetrically in 3D producing spherical wavefronts.",
    explanationTamil: "புள்ளி மூலத்திலிருந்து அனைத்து திசைகளிலும் சீராகப் பரவி கோள வடிவ அலைமுகப்பு உருவாகும்."
  },
  {
    code: "PHY-123", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "Fringe width β in Young's double slit experiment is given by:",
    questionTextTamil: "யங் இரட்டைப் பிளவு ஆய்வில் பட்டை அகலம் β-க்கான வாய்ப்பாடு:",
    options: [
      { label: "A", text: "β = λ D / d" }, { label: "B", text: "β = λ d / D" }, { label: "C", text: "β = d D / λ" }, { label: "D", text: "β = λ / (d D)" }
    ],
    optionsTamil: [
      { label: "A", text: "β = λ D / d" }, { label: "B", text: "β = λ d / D" }, { label: "C", text: "β = d D / λ" }, { label: "D", text: "β = λ / (d D)" }
    ],
    correctAnswer: "A",
    explanation: "Fringe width β = λD / d where D is screen distance and d is slit separation.",
    explanationTamil: "பட்டை அகலம் β = λ D / d ஆகும்."
  },
  {
    code: "PHY-124", subject: "Physics", topic: "Optics", difficulty: "medium",
    questionText: "If Young's double slit apparatus is immersed in water (refractive index 4/3), fringe width becomes:",
    questionTextTamil: "யங் இரட்டைப் பிளவு சாதனம் நீரில் (ஒளிவிலகல் எண் 4/3) மூழ்க வைக்கப்பட்டால் பட்டை அகலம்:",
    options: [
      { label: "A", text: "3/4 times original width" },
      { label: "B", text: "4/3 times original width" },
      { label: "C", text: "Remains unchanged" },
      { label: "D", text: "Becomes zero" }
    ],
    optionsTamil: [
      { label: "A", text: "அசல் அகலத்தில் 3/4 மடங்காகக் குறையும்" },
      { label: "B", text: "4/3 மடங்காக அதிகரிக்கும்" },
      { label: "C", text: "மாறாது" },
      { label: "D", text: "சுழியாகும்" }
    ],
    correctAnswer: "A",
    explanation: "In medium of refractive index n, wavelength λ' = λ/n. Hence fringe width β' = β/n = β / (4/3) = (3/4) β.",
    explanationTamil: "நீரில் அலைநீளம் λ/n எனக் குறைவதால் புதிய பட்டை அகலம் β' = 3/4 β ஆகும்."
  },
  {
    code: "PHY-125", subject: "Physics", topic: "Optics", difficulty: "medium",
    questionText: "The ratio of maximum to minimum intensity in interference of two waves with amplitudes A₁ and A₂ is:",
    questionTextTamil: "A₁, A₂ வீச்சுகள் கொண்ட இரு அலைகளின் குறுக்கீட்டு விளைவில் பெரும மற்றும் சிறும செறிவுகளின் விகிதம்:",
    options: [
      { label: "A", text: "(A₁ + A₂)² / (A₁ - A₂)²" },
      { label: "B", text: "(A₁ + A₂) / (A₁ - A₂)" },
      { label: "C", text: "A₁² / A₂²" },
      { label: "D", text: "(A₁² + A₂²) / (A₁² - A₂²)" }
    ],
    optionsTamil: [
      { label: "A", text: "(A₁ + A₂)² / (A₁ - A₂)²" },
      { label: "B", text: "(A₁ + A₂) / (A₁ - A₂)" },
      { label: "C", text: "A₁² / A₂²" },
      { label: "D", text: "(A₁² + A₂²) / (A₁² - A₂²)" }
    ],
    correctAnswer: "A",
    explanation: "I_max = (A₁ + A₂)² and I_min = (A₁ - A₂)², giving the ratio (A₁ + A₂)² / (A₁ - A₂)². ",
    explanationTamil: "I_max / I_min = (A₁ + A₂)² / (A₁ - A₂)²."
  },
  {
    code: "PHY-126", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "Diffraction of light is observed only when the size of obstacle/aperture is:",
    questionTextTamil: "ஒளியின் விளிம்பு விளைவு தெளிவாகத் தெரிய தடையின் அளவு எதற்கு ஒப்பிடக்கூடியதாக இருக்க வேண்டும்?",
    options: [
      { label: "A", text: "Comparable to wavelength of light" },
      { label: "B", text: "Much larger than wavelength of light" },
      { label: "C", text: "Independent of wavelength" },
      { label: "D", text: "Equal to 1 metre" }
    ],
    optionsTamil: [
      { label: "A", text: "ஒளியின் அலைநீளத்திற்கு ஒப்பிடக்கூடிய அளவில்" },
      { label: "B", text: "ஒளியின் அலைநீளத்தை விட மிக அதிகமாக" },
      { label: "C", text: "அலைநீளத்தைச் சார்ந்திராமல்" },
      { label: "D", text: "1 மீட்டருக்கு சமமாக" }
    ],
    correctAnswer: "A",
    explanation: "Diffraction requires obstacle size a ≈ λ.",
    explanationTamil: "விளிம்பு விளைவு நிகழ தடையின் அளவு ஒளியின் அலைநீளத்தின் வரிசையில் (a ≈ λ) இருக்க வேண்டும்."
  },
  {
    code: "PHY-127", subject: "Physics", topic: "Optics", difficulty: "medium",
    questionText: "Brewster's law relating polarizing angle ip and refractive index n of medium is:",
    questionTextTamil: "தளவிளைவுக் கோணம் ip மற்றும் ஒளிவிலகல் எண் n இடையிலான புரூஸ்டர் விதி:",
    options: [
      { label: "A", text: "n = tan(ip)" }, { label: "B", text: "n = sin(ip)" }, { label: "C", text: "n = cos(ip)" }, { label: "D", text: "n = cot(ip)" }
    ],
    optionsTamil: [
      { label: "A", text: "n = tan(ip)" }, { label: "B", text: "n = sin(ip)" }, { label: "C", text: "n = cos(ip)" }, { label: "D", text: "n = cot(ip)" }
    ],
    correctAnswer: "A",
    explanation: "Brewster's Law: n = tan(ip). At this angle, reflected and refracted rays are mutually perpendicular.",
    explanationTamil: "புரூஸ்டர் விதி n = tan(ip). இந்நிலையின் போது எதிரொளிப்பு மற்றும் விலகல் கதிர்கள் ஒன்றுக்கொன்று செங்குத்தாக இருக்கும்."
  },
  {
    code: "PHY-128", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "Which phenomenon proves the transverse wave nature of light?",
    questionTextTamil: "ஒளி ஓர் குறுக்கலை என்பதை நிரூபிக்கும் ஒளியியல் நிகழ்வு எது?",
    options: [
      { label: "A", text: "Polarization" }, { label: "B", text: "Interference" }, { label: "C", text: "Diffraction" }, { label: "D", text: "Refraction" }
    ],
    optionsTamil: [
      { label: "A", text: "தளவிளைவு (Polarization)" }, { label: "B", text: "குறுக்கீட்டு விளைவு" }, { label: "C", text: "விளிம்பு விளைவு" }, { label: "D", text: "ஒளிவிலகல்" }
    ],
    correctAnswer: "A",
    explanation: "Longitudinal waves cannot be polarized; only transverse waves show polarization.",
    explanationTamil: "நெட்டலைகளில் தளவிளைவு நிகழாது; குறுக்கலைகளில் மட்டுமே தளவிளைவு நிகழும்."
  },
  {
    code: "PHY-129", subject: "Physics", topic: "Optics", difficulty: "medium",
    questionText: "According to Malus' law, intensity of polarized light transmitted through an analyzer is:",
    questionTextTamil: "மாலஸ் விதிப்படி பகுப்பாய்வி வழியாக வெளிவரும் தளவிளைவுற்ற ஒளியின் செறிவு I:",
    options: [
      { label: "A", text: "I = I₀ cos² θ" }, { label: "B", text: "I = I₀ cos θ" }, { label: "C", text: "I = I₀ sin² θ" }, { label: "D", text: "I = I₀ tan θ" }
    ],
    optionsTamil: [
      { label: "A", text: "I = I₀ cos² θ" }, { label: "B", text: "I = I₀ cos θ" }, { label: "C", text: "I = I₀ sin² θ" }, { label: "D", text: "I = I₀ tan θ" }
    ],
    correctAnswer: "A",
    explanation: "Malus's Law states I = I₀ cos² θ where θ is the angle between transmission axes.",
    explanationTamil: "மாலஸ் விதி I = I₀ cos² θ ஆகும்."
  },
  {
    code: "PHY-130", subject: "Physics", topic: "Optics", difficulty: "hard",
    questionText: "If the polarizing angle of a medium is 60°, the critical angle of the medium is:",
    questionTextTamil: "ஒரு ஊடகத்தின் தளவிளைவுக் கோணம் 60° எனில் அந்த ஊடகத்தின் மாறுநிலைக் கோணம்:",
    options: [
      { label: "A", text: "sin⁻¹(1 / √3)" }, { label: "B", text: "sin⁻¹(√3 / 2)" }, { label: "C", text: "45°" }, { label: "D", text: "30°" }
    ],
    optionsTamil: [
      { label: "A", text: "sin⁻¹(1 / √3)" }, { label: "B", text: "sin⁻¹(√3 / 2)" }, { label: "C", text: "45°" }, { label: "D", text: "30°" }
    ],
    correctAnswer: "A",
    explanation: "n = tan 60° = √3. Critical angle sin C = 1/n = 1/√3 => C = sin⁻¹(1/√3).",
    explanationTamil: "n = tan 60° = √3. மாறுநிலைக் கோணம் sin C = 1/n = 1/√3 => C = sin⁻¹(1/√3)."
  },
  {
    code: "PHY-131", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "In a single slit Fraunhofer diffraction, the angular width of central maximum is:",
    questionTextTamil: "ஒற்றைப் பிளவு ஃபிரான்ஹோஃபர் விளிம்பு விளைவில் மையப் பெருமத்தின் கோண அகலம்:",
    options: [
      { label: "A", text: "2λ / a" }, { label: "B", text: "λ / a" }, { label: "C", text: "a / λ" }, { label: "D", text: "λ a" }
    ],
    optionsTamil: [
      { label: "A", text: "2λ / a" }, { label: "B", text: "λ / a" }, { label: "C", text: "a / λ" }, { label: "D", text: "λ a" }
    ],
    correctAnswer: "A",
    explanation: "Central maximum extends between first minima on either side (θ = ± λ/a), giving 2θ = 2λ/a.",
    explanationTamil: "மையப் பெருமத்தின் கோண அகலம் 2θ = 2λ/a ஆகும்."
  },
  {
    code: "PHY-132", subject: "Physics", topic: "Optics", difficulty: "medium",
    questionText: "Resolving power of an astronomical telescope increases when:",
    questionTextTamil: "ஒரு வானியல் தொலைநோக்கியின் பிரிதிறன் எப்போது அதிகரிக்கும்?",
    options: [
      { label: "A", text: "Aperture diameter D of objective lens is increased" },
      { label: "B", text: "Wavelength of light is increased" },
      { label: "C", text: "Focal length of eyepiece is increased" },
      { label: "D", text: "Diameter of objective lens is decreased" }
    ],
    optionsTamil: [
      { label: "A", text: "பொருளருகு லென்ஸின் விட்டம் D அதிகரிக்கப்படும் போது" },
      { label: "B", text: "ஒளியின் அலைநீளம் அதிகரிக்கப்படும் போது" },
      { label: "C", text: "விழியருகு லென்ஸின் குவியத்தூரம் அதிகரிக்கப்படும் போது" },
      { label: "D", text: "லென்ஸின் விட்டம் குறைக்கப்படும் போது" }
    ],
    correctAnswer: "A",
    explanation: "Resolving power = D / (1.22 λ). Larger objective aperture increases resolution.",
    explanationTamil: "பிரிதிறன் = D / (1.22 λ). பொருளருகு வில்லையின் விட்டம் அதிகமானால் பிரிதிறன் கூடும்."
  },
  {
    code: "PHY-133", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "The colour of thin soap films in sunlight is due to:",
    questionTextTamil: "சூரிய ஒளியில் சோப்புக் குமிழிகள் பல வண்ணங்களாகக் காட்சிளிக்கக் காரணம்:",
    options: [
      { label: "A", text: "Interference of light" }, { label: "B", text: "Diffraction" }, { label: "C", text: "Dispersion" }, { label: "D", text: "Polarization" }
    ],
    optionsTamil: [
      { label: "A", text: "ஒளியின் குறுக்கீட்டு விளைவு" }, { label: "B", text: "விளிம்பு விளைவு" }, { label: "C", text: "நிறப்பிரிகை" }, { label: "D", text: "தளவிளைவு" }
    ],
    correctAnswer: "A",
    explanation: "Colours in thin soap films arise from interference of light reflected from top and bottom surfaces.",
    explanationTamil: "மெல்லிய ஏடுகளில் மேல் மற்றும் கீழ் பரப்புகளில் எதிரொளிக்கும் ஒளிக்கதிர்களின் குறுக்கீட்டு விளைவால் வண்ணங்கள் தோன்றுகின்றன."
  },
  {
    code: "PHY-134", subject: "Physics", topic: "Optics", difficulty: "medium",
    questionText: "Mirage in deserts is a phenomenon caused by:",
    questionTextTamil: "பாலைவனங்களில் கானல் நீர் (Mirage) தோன்றுவதற்கு காரணமான நிகழ்வு:",
    options: [
      { label: "A", text: "Total internal reflection in air layers of varying density" },
      { label: "B", text: "Scattering of light" },
      { label: "C", text: "Diffraction of light" },
      { label: "D", text: "Dispersion of light" }
    ],
    optionsTamil: [
      { label: "A", text: "வெவ்வேறு அடர்த்தி கொண்ட காற்று அடுக்குகளில் ஏற்படும் முழு அக எதிரொளிப்பு" },
      { label: "B", text: "ஒளிச்சிதறல்" },
      { label: "C", text: "விளிம்பு விளைவு" },
      { label: "D", text: "நிறப்பிரிகை" }
    ],
    correctAnswer: "A",
    explanation: "Hot ground lowers density of bottom air layer, causing light rays to bend upwards via total internal reflection.",
    explanationTamil: "தரைக்கு அருகிலுள்ள சூடான காற்றின் அடர்த்தி குறைவால் ஒளிக்கதிர்கள் முழு அக எதிரொளிப்பு அடைந்து கானல் நீர் தோன்றுகிறது."
  },
  {
    code: "PHY-135", subject: "Physics", topic: "Optics", difficulty: "easy",
    questionText: "The refractive index of glass is maximum for which colour of light?",
    questionTextTamil: "கண்ணாடியின் ஒளிவிலகல் எண் எந்த நிற ஒளிக்கு மிக அதிகமாக இருக்கும்?",
    options: [
      { label: "A", text: "Violet" }, { label: "B", text: "Red" }, { label: "C", text: "Yellow" }, { label: "D", text: "Green" }
    ],
    optionsTamil: [
      { label: "A", text: "ஊதா (Violet)" }, { label: "B", text: "சிவப்பு" }, { label: "C", text: "மஞ்சள்" }, { label: "D", text: "பச்சை" }
    ],
    correctAnswer: "A",
    explanation: "By Cauchy's relation n = A + B/λ², shortest wavelength (violet) has the highest refractive index.",
    explanationTamil: "குறைந்த அலைநீளம் கொண்ட ஊதா நிறத்திற்கு ஒளிவிலகல் எண் பெருமமாக இருக்கும்."
  },

  // 136-150 Modern Optics & Dual Nature
  {
    code: "PHY-136", subject: "Physics", topic: "Dual Nature", difficulty: "easy",
    questionText: "Energy E of a photon of frequency ν is given by:",
    questionTextTamil: "ν அதிர்வெண் கொண்ட ஃபோட்டானின் ஆற்றல் E எதற்கு சமம்?",
    options: [
      { label: "A", text: "h ν" }, { label: "B", text: "h / ν" }, { label: "C", text: "h ν²" }, { label: "D", text: "c / (h ν)" }
    ],
    optionsTamil: [
      { label: "A", text: "h ν" }, { label: "B", text: "h / ν" }, { label: "C", text: "h ν²" }, { label: "D", text: "c / (h ν)" }
    ],
    correctAnswer: "A",
    explanation: "Planck's quantum relation E = h ν = h c / λ.",
    explanationTamil: "பிளாங்க் குவாண்டம் சமன்பாடு E = h ν = h c / λ ஆகும்."
  },
  {
    code: "PHY-137", subject: "Physics", topic: "Dual Nature", difficulty: "easy",
    questionText: "Work function of a metal is:",
    questionTextTamil: "ஒரு உலோகத்தின் வெளியேற்று ஆற்றல் (Work function) என்பது:",
    options: [
      { label: "A", text: "Minimum energy required to liberate an electron from metal surface" },
      { label: "B", text: "Maximum kinetic energy of photoelectrons" },
      { label: "C", text: "Energy of absorbed photon" },
      { label: "D", text: "Ionization potential" }
    ],
    optionsTamil: [
      { label: "A", text: "உலோகப் பரப்பிலிருந்து எலக்ட்ரானை வெளியேற்றத் தேவையான குறைந்தபட்ச ஆற்றல்" },
      { label: "B", text: "எலக்ட்ரான்களின் பெரும இயக்க ஆற்றல்" },
      { label: "C", text: "ஃபோட்டானின் ஆற்றல்" },
      { label: "D", text: "அயனியாக்கும் ஆற்றல்" }
    ],
    correctAnswer: "A",
    explanation: "Work function Φ₀ = h ν₀ is the threshold energy required for photoelectron emission.",
    explanationTamil: "உலோகப் பரப்பிலிருந்து எலக்ட்ரானை உமிழத் தேவையான குறைந்தபட்ச ஆற்றல் வெளியேற்று ஆற்றல் ஆகும்."
  },
  {
    code: "PHY-138", subject: "Physics", topic: "Dual Nature", difficulty: "medium",
    questionText: "Einstein's photoelectric equation is:",
    questionTextTamil: "ஐன்ஸ்டீனின் ஒளிமின் சமன்பாடு யாது?",
    options: [
      { label: "A", text: "K_max = h ν - Φ₀" }, { label: "B", text: "K_max = h ν + Φ₀" }, { label: "C", text: "K_max = Φ₀ - h ν" }, { label: "D", text: "K_max = h ν / Φ₀" }
    ],
    optionsTamil: [
      { label: "A", text: "K_max = h ν - Φ₀" }, { label: "B", text: "K_max = h ν + Φ₀" }, { label: "C", text: "K_max = Φ₀ - h ν" }, { label: "D", text: "K_max = h ν / Φ₀" }
    ],
    correctAnswer: "A",
    explanation: "Energy of incident photon hν = Φ₀ + K_max, so K_max = hν - Φ₀ = e V₀.",
    explanationTamil: "ஒளிமின் ஆற்றல் சமன்பாடு K_max = h ν - Φ₀ ஆகும்."
  },
  {
    code: "PHY-139", subject: "Physics", topic: "Dual Nature", difficulty: "medium",
    questionText: "The maximum kinetic energy of emitted photoelectrons depends on:",
    questionTextTamil: "உமிழப்படும் ஒளி எலக்ட்ரான்களின் பெரும இயக்க ஆற்றல் எதைச் சார்ந்தது?",
    options: [
      { label: "A", text: "Frequency of incident light" },
      { label: "B", text: "Intensity of incident light" },
      { label: "C", text: "Distance of light source" },
      { label: "D", text: "Time of exposure" }
    ],
    optionsTamil: [
      { label: "A", text: "படும் ஒளியின் அதிர்வெண்" },
      { label: "B", text: "படும் ஒளியின் செறிவு" },
      { label: "C", text: "ஒளி மூலத்தின் தொலைவு" },
      { label: "D", text: "ஒளிபடும் கால அளவு" }
    ],
    correctAnswer: "A",
    explanation: "K_max = hν - Φ₀ depends only on frequency ν and target metal work function Φ₀, not on light intensity.",
    explanationTamil: "இயக்க ஆற்றல் ஒளியின் அதிர்வெண்ணைச் சார்ந்தது; ஒளியின் செறிவைச் சார்ந்ததல்ல."
  },
  {
    code: "PHY-140", subject: "Physics", topic: "Dual Nature", difficulty: "easy",
    questionText: "The number of photoelectrons emitted per second (photocurrent) is proportional to:",
    questionTextTamil: "ஒரு வினாடியில் உமிழப்படும் ஒளி எலக்ட்ரான்களின் எண்ணிக்கை (ஒளிமின்னோட்டம்) எதற்கு நேர்தகவில் அமையும்?",
    options: [
      { label: "A", text: "Intensity of incident light" },
      { label: "B", text: "Frequency of incident light" },
      { label: "C", text: "Work function" },
      { label: "D", text: "Threshold frequency" }
    ],
    optionsTamil: [
      { label: "A", text: "படும் ஒளியின் செறிவு" },
      { label: "B", text: "படும் ஒளியின் அதிர்வெண்" },
      { label: "C", text: "வெளியேற்று ஆற்றல்" },
      { label: "D", text: "பயன்தொடக்க அதிர்வெண்" }
    ],
    correctAnswer: "A",
    explanation: "Higher intensity means more incident photons per second, thus more emitted electrons.",
    explanationTamil: "ஒளியின் செறிவு அதிகரிக்கும் போது உமிழப்படும் எலக்ட்ரான்களின் எண்ணிக்கை (மின்னோட்டம்) அதிகரிக்கும்."
  },
  {
    code: "PHY-141", subject: "Physics", topic: "Dual Nature", difficulty: "easy",
    questionText: "de Broglie wavelength λ of a particle of mass m moving with velocity v is:",
    questionTextTamil: "v திசைவேகத்தில் இயங்கும் m நிறை கொண்ட துகளின் டி பிராய் அலைநீளம் λ:",
    options: [
      { label: "A", text: "h / (m v)" }, { label: "B", text: "m v / h" }, { label: "C", text: "h m / v" }, { label: "D", text: "h v / m" }
    ],
    optionsTamil: [
      { label: "A", text: "h / (m v)" }, { label: "B", text: "m v / h" }, { label: "C", text: "h m / v" }, { label: "D", text: "h v / m" }
    ],
    correctAnswer: "A",
    explanation: "de Broglie relation: λ = h / p = h / (m v).",
    explanationTamil: "டி பிராய் அலைநீளம் λ = h / p = h / (m v) ஆகும்."
  },
  {
    code: "PHY-142", subject: "Physics", topic: "Dual Nature", difficulty: "medium",
    questionText: "de Broglie wavelength of an electron accelerated through potential difference V is:",
    questionTextTamil: "V மின்னழுத்த வேறுபாட்டால் முடுக்கப்பட்ட எலக்ட்ரானின் டி பிராய் அலைநீளம்:",
    options: [
      { label: "A", text: "12.27 / √V Å" }, { label: "B", text: "1.227 / √V Å" }, { label: "C", text: "122.7 / √V Å" }, { label: "D", text: "√V / 12.27 Å" }
    ],
    optionsTamil: [
      { label: "A", text: "12.27 / √V Å" }, { label: "B", text: "1.227 / √V Å" }, { label: "C", text: "122.7 / √V Å" }, { label: "D", text: "√V / 12.27 Å" }
    ],
    correctAnswer: "A",
    explanation: "λ = h / √(2m e V) = 1.227 / √V nm = 12.27 / √V Å.",
    explanationTamil: "எலக்ட்ரானின் டி பிராய் அலைநீளம் λ = 12.27 / √V Å ஆகும்."
  },
  {
    code: "PHY-143", subject: "Physics", topic: "Dual Nature", difficulty: "easy",
    questionText: "Davisson and Germer experiment proved:",
    questionTextTamil: "டேவிசன்-ஜெர்மர் ஆய்வு எதனை நிரூபித்தது?",
    options: [
      { label: "A", text: "Wave nature of electrons" },
      { label: "B", text: "Particle nature of light" },
      { label: "C", text: "Nuclear model of atom" },
      { label: "D", text: "Radioactivity" }
    ],
    optionsTamil: [
      { label: "A", text: "எலக்ட்ரான்களின் அலைப்பண்பு (Wave nature of electrons)" },
      { label: "B", text: "ஒளியின் துகள்பண்பு" },
      { label: "C", text: "அணுக்கரு மாதிரி" },
      { label: "D", text: "கதிரியக்கம்" }
    ],
    correctAnswer: "A",
    explanation: "Davisson and Germer demonstrated diffraction of electrons by nickel crystal, verifying de Broglie's hypothesis.",
    explanationTamil: "நிக்கல் படிகத்தின் மூலம் எலக்ட்ரான்களின் விளிம்பு விளைவை நிரூபித்து எலக்ட்ரானின் அலைப்பண்பை உறுதிப்படுத்தினர்."
  },
  {
    code: "PHY-144", subject: "Physics", topic: "Dual Nature", difficulty: "medium",
    questionText: "Rest mass of a photon is:",
    questionTextTamil: "ஃபோட்டானின் ஓய்வு நிலை நிறை (Rest mass):",
    options: [
      { label: "A", text: "Zero" }, { label: "B", text: "h ν / c²" }, { label: "C", text: "9.1 × 10⁻³¹ kg" }, { label: "D", text: "Infinite" }
    ],
    optionsTamil: [
      { label: "A", text: "சுழி (Zero)" }, { label: "B", text: "h ν / c²" }, { label: "C", text: "9.1 × 10⁻³¹ கிகி" }, { label: "D", text: "முடிவிலி" }
    ],
    correctAnswer: "A",
    explanation: "Photons travel at speed c and have zero rest mass.",
    explanationTamil: "ஒளித்துகளான ஃபோட்டானின் ஓய்வு நிறை சுழியாகும்."
  },
  {
    code: "PHY-145", subject: "Physics", topic: "Dual Nature", difficulty: "hard",
    questionText: "If the momentum of a particle is doubled, its de Broglie wavelength:",
    questionTextTamil: "ஒரு துகளின் உந்தம் இருமடங்காக அதிகரிக்கப்பட்டால் அதன் டி பிராய் அலைநீளம்:",
    options: [
      { label: "A", text: "Becomes halved" }, { label: "B", text: "Becomes doubled" }, { label: "C", text: "Becomes four times" }, { label: "D", text: "Remains unchanged" }
    ],
    optionsTamil: [
      { label: "A", text: "பாதியாகும்" }, { label: "B", text: "இருமடங்காகும்" }, { label: "C", text: "நான்கு மடங்காகும்" }, { label: "D", text: "மாறாது" }
    ],
    correctAnswer: "A",
    explanation: "λ = h / p, inversely proportional to momentum. Doubling p halves λ.",
    explanationTamil: "λ = h / p என்பதால் உந்தம் இருமடங்காகும்போது அலைநீளம் பாதியாகும்."
  },
  {
    code: "PHY-146", subject: "Physics", topic: "Dual Nature", difficulty: "easy",
    questionText: "An electron microscope uses which property to achieve very high magnification?",
    questionTextTamil: "எலக்ட்ரான் நுண்ணோக்கி மிக உயர் உருப்பெருக்கத்தைப் பெற எலக்ட்ரானின் எந்தப் பண்பைப் பயன்படுத்துகிறது?",
    options: [
      { label: "A", text: "Wave nature of electrons having very short de Broglie wavelength" },
      { label: "B", text: "Negative charge of electrons" },
      { label: "C", text: "Mass of electron" },
      { label: "D", text: "Magnetic moment" }
    ],
    optionsTamil: [
      { label: "A", text: "எலக்ட்ரான்களின் மிகக் குறைந்த டி பிராய் அலைநீளம் கொண்ட அலைப்பண்பு" },
      { label: "B", text: "எலக்ட்ரானின் எதிர்மின்னூட்டம்" },
      { label: "C", text: "எலக்ட்ரானின் நிறை" },
      { label: "D", text: "காந்த திருப்புத்திறன்" }
    ],
    correctAnswer: "A",
    explanation: "Fast electrons have wavelengths ~100,000 times shorter than visible light, giving sub-nanometre resolving power.",
    explanationTamil: "எலக்ட்ரான்களின் மிகக் குறைந்த அலைநீளம் மிக அதிக பிரிதிறனையும் உருப்பெருக்கத்தையும் தருகிறது."
  },
  {
    code: "PHY-147", subject: "Physics", topic: "Dual Nature", difficulty: "medium",
    questionText: "Stopping potential V₀ in photoelectric effect is related to maximum kinetic energy K_max by:",
    questionTextTamil: "ஒளிமின் விளைவில் நிறுத்து மின்னழுத்தம் V₀ மற்றும் பெரும இயக்க ஆற்றல் K_max இடையிலான தொடர்பு:",
    options: [
      { label: "A", text: "K_max = e V₀" }, { label: "B", text: "K_max = V₀ / e" }, { label: "C", text: "K_max = e / V₀" }, { label: "D", text: "K_max = 2 e V₀" }
    ],
    optionsTamil: [
      { label: "A", text: "K_max = e V₀" }, { label: "B", text: "K_max = V₀ / e" }, { label: "C", text: "K_max = e / V₀" }, { label: "D", text: "K_max = 2 e V₀" }
    ],
    correctAnswer: "A",
    explanation: "At stopping potential, work done by retarding electric field equals K_max: K_max = e V₀.",
    explanationTamil: "நிறுத்து மின்னழுத்தத்தில் K_max = e V₀ ஆகும்."
  },
  {
    code: "PHY-148", subject: "Physics", topic: "Dual Nature", difficulty: "hard",
    questionText: "The slope of stopping potential (V₀) versus frequency (ν) graph in photoelectric effect equals:",
    questionTextTamil: "ஒளிமின் விளைவில் நிறுத்து மின்னழுத்தம் V₀ மற்றும் அதிர்வெண் ν வரைபடத்தின் சாய்வு எதற்கு சமம்?",
    options: [
      { label: "A", text: "h / e" }, { label: "B", text: "e / h" }, { label: "C", text: "h * e" }, { label: "D", text: "h" }
    ],
    optionsTamil: [
      { label: "A", text: "h / e" }, { label: "B", text: "e / h" }, { label: "C", text: "h * e" }, { label: "D", text: "h" }
    ],
    correctAnswer: "A",
    explanation: "eV₀ = hν - Φ₀ => V₀ = (h/e) ν - (Φ₀/e). The slope of V₀ vs ν is h/e (universal constant).",
    explanationTamil: "V₀ = (h/e) ν - (Φ₀/e) என்பதால் சாய்வு h/e ஆகும்."
  },
  {
    code: "PHY-149", subject: "Physics", topic: "Dual Nature", difficulty: "medium",
    questionText: "Which metal among the following has the lowest work function and is widely used in photocells?",
    questionTextTamil: "பின்வருவனவற்றுள் மிகக் குறைந்த வெளியேற்று ஆற்றல் கொண்டதும் ஒளிமின்கலங்களில் அதிகம் பயன்படுவதும் எது?",
    options: [
      { label: "A", text: "Caesium (Cs)" }, { label: "B", text: "Platinum (Pt)" }, { label: "C", text: "Copper (Cu)" }, { label: "D", text: "Iron (Fe)" }
    ],
    optionsTamil: [
      { label: "A", text: "சீசியம் (Caesium - Cs)" }, { label: "B", text: "பிளாட்டினம்" }, { label: "C", text: "தாமிரம்" }, { label: "D", text: "இரும்பு" }
    ],
    correctAnswer: "A",
    explanation: "Caesium has lowest work function (~2.14 eV) and easily emits electrons even with visible light.",
    explanationTamil: "சீசியம் மிகக் குறைந்த வெளியேற்று ஆற்றல் (~2.14 eV) கொண்டுள்ளதால் கண்ணுறு ஒளியிலும் எலக்ட்ரான்களை உமிழும்."
  },
  {
    code: "PHY-150", subject: "Physics", topic: "Dual Nature", difficulty: "easy",
    questionText: "Photoelectric effect could not be explained by classical wave theory because:",
    questionTextTamil: "ஒளிமின் விளைவை கிளாசிக்கல் அலைக்கொள்கையால் விளக்க முடியாததன் காரணம்:",
    options: [
      { label: "A", text: "Emission is instantaneous and depends on threshold frequency, not on intensity" },
      { label: "B", text: "Electrons have negative charge" },
      { label: "C", text: "Light travels in straight lines" },
      { label: "D", text: "Metals conduct electricity" }
    ],
    optionsTamil: [
      { label: "A", text: "எலக்ட்ரான் உமிழ்வு காலதாமதமின்றி உடனடியானது மற்றும் பயன்தொடக்க அதிர்வெண்ணைச் சார்ந்தது" },
      { label: "B", text: "எலக்ட்ரான்கள் எதிர்மின்னூட்டம் கொண்டவை" },
      { label: "C", text: "ஒளி நேர்கோட்டில் செல்லும்" },
      { label: "D", text: "உலோகங்கள் மின்கடத்தும்" }
    ],
    correctAnswer: "A",
    explanation: "Wave theory predicted continuous energy accumulation over hours and emission at any frequency if intensity is high, which contradicts experiments.",
    explanationTamil: "அலைக்கொள்கைப்படி எலக்ட்ரான் வெளியேற நீண்ட நேரம் எடுக்கும் என்று கருதப்பட்டது; ஆனால் ஒளிமின் உமிழ்வு உடனடியானது."
  }
];
