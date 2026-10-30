// scripts/question_bank/chemistry_part2.mjs
// Questions CHE-076 to CHE-150: p-Block, d & f-Block Elements, Coordination Chemistry

export const chemistryPart2 = [
  // 76-100 p-Block Elements
  {
    code: "CHE-076", subject: "Chemistry", topic: "p-Block Elements", difficulty: "easy",
    questionText: "The inert pair effect is most pronounced in the heavier members of p-block. Which oxidation state is most stable for Thallium (Tl)?",
    questionTextTamil: "மந்த இணை விளைவின் காரணமாக தாலியம் (Tl) தனிமத்திற்கு எந்த ஆக்சிஜனேற்ற நிலை மிகவும் நிலையானது?",
    options: [
      { label: "A", text: "+1" }, { label: "B", text: "+3" }, { label: "C", text: "+2" }, { label: "D", text: "+4" }
    ],
    optionsTamil: [
      { label: "A", text: "+1" }, { label: "B", text: "+3" }, { label: "C", text: "+2" }, { label: "D", text: "+4" }
    ],
    correctAnswer: "A",
    explanation: "Due to inert pair effect, the 6s² electrons remain unshared; Tl⁺ is more stable than Tl³⁺.",
    explanationTamil: "மந்த இணை விளைவினால் 6s² எலக்ட்ரான்கள் பிணைப்பில் ஈடுபடாததால் Tl⁺ நிலை Tl³⁺-ஐ விட நிலையானது."
  },
  {
    code: "CHE-077", subject: "Chemistry", topic: "p-Block Elements", difficulty: "medium",
    questionText: "Diborane (B₂H₆) contains which unique type of chemical bonds?",
    questionTextTamil: "டைபோரேன் (B₂H₆) மூலக்கூறில் காணப்படும் தனித்துவமான பிணைப்பு வகை எது?",
    options: [
      { label: "A", text: "Two 3-centre 2-electron (3c-2e) banana bonds (B-H-B)" },
      { label: "B", text: "Pure ionic bonds" },
      { label: "C", text: "Coordinate bonds only" },
      { label: "D", text: "Hydrogen bonds only" }
    ],
    optionsTamil: [
      { label: "A", text: "இரண்டு 3-மைய 2-எலக்ட்ரான் (3c-2e) வாழைப்பழ வடிவ பாலப் பிணைப்புகள் (B-H-B)" },
      { label: "B", text: "தூய அயனிப் பிணைப்பு" },
      { label: "C", text: "ஈதல் சகப்பிணைப்பு மட்டுமே" },
      { label: "D", text: "ஹைட்ரஜன் பிணைப்பு மட்டுமே" }
    ],
    correctAnswer: "A",
    explanation: "B₂H₆ has four normal terminal 2c-2e B-H bonds and two bridged 3c-2e banana bonds.",
    explanationTamil: "டைபோரேனில் இரு B-H-B பாலப் பிணைப்புகள் (3c-2e) உள்ளன."
  },
  {
    code: "CHE-078", subject: "Chemistry", topic: "p-Block Elements", difficulty: "easy",
    questionText: "Which allotrope of carbon is thermodynamically the most stable at standard conditions?",
    questionTextTamil: "திட்ட வெப்ப அழுத்த நிலையில் வெப்ப இயக்கவியல் ரீதியாக மிகவும் நிலையான கார்பனின் புறவேற்றுமை வடிவம் எது?",
    options: [
      { label: "A", text: "Graphite" }, { label: "B", text: "Diamond" }, { label: "C", text: "Fullerene (C₆₀)" }, { label: "D", text: "Carbon black" }
    ],
    optionsTamil: [
      { label: "A", text: "கிராஃபைட் (Graphite)" }, { label: "B", text: "வைரம்" }, { label: "C", text: "ஃபுல்லரின் (C₆₀)" }, { label: "D", text: "கரிமம்" }
    ],
    correctAnswer: "A",
    explanation: "Standard enthalpy of formation of graphite is taken as 0; graphite is more stable than diamond by 1.9 kJ/mol.",
    explanationTamil: "திட்ட வெப்பநிலையில் கிராஃபைட் வைரத்தை விட அதிக வெப்ப இயக்கவியல் நிலைப்புத்தன்மை கொண்டது."
  },
  {
    code: "CHE-079", subject: "Chemistry", topic: "p-Block Elements", difficulty: "easy",
    questionText: "Buckminsterfullerene molecule C₆₀ contains:",
    questionTextTamil: "பக்மின்ஸ்டர் ஃபுல்லரின் (C₆₀) மூலக்கூறில் உள்ள வளையங்களின் எண்ணிக்கை:",
    options: [
      { label: "A", text: "20 hexagons and 12 pentagons" },
      { label: "B", text: "12 hexagons and 20 pentagons" },
      { label: "C", text: "30 hexagons" },
      { label: "D", text: "24 pentagons" }
    ],
    optionsTamil: [
      { label: "A", text: "20 அருங்கோணங்கள் மற்றும் 12 ஐங்கோணங்கள்" },
      { label: "B", text: "12 அருங்கோணங்கள் மற்றும் 20 ஐங்கோணங்கள்" },
      { label: "C", text: "30 அருங்கோணங்கள்" },
      { label: "D", text: "24 ஐங்கோணங்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Soccer-ball shaped C₆₀ has 20 six-membered rings and 12 five-membered rings.",
    explanationTamil: "கால்பந்து வடிவ C₆₀ மூலக்கூறில் 20 ஆறு உறுப்பினர் வளையங்களும் 12 ஐந்து உறுப்பினர் வளையங்களும் உள்ளன."
  },
  {
    code: "CHE-080", subject: "Chemistry", topic: "p-Block Elements", difficulty: "medium",
    questionText: "In the industrial manufacture of ammonia by Haber process, the catalyst used is:",
    questionTextTamil: "ஹேபர் முறையில் அம்மோனியா தயாரிப்பில் பயன்படுத்தப்படும் வினைவேக மாற்றி எது?",
    options: [
      { label: "A", text: "Finely divided Iron (Fe) with Molybdenum / K₂O / Al₂O₃ promoter" },
      { label: "B", text: "Platinum gauge" },
      { label: "C", text: "Nickel" },
      { label: "D", text: "Vanadium pentoxide" }
    ],
    optionsTamil: [
      { label: "A", text: "மாலிப்டினம் / Al₂O₃ ஊக்குவிக்கப்பட்ட நுண்ணிய இரும்புத்தூள் (Fe)" },
      { label: "B", text: "பிளாட்டினம் வலை" },
      { label: "C", text: "நிக்கல்" },
      { label: "D", text: "வனேடியம் பென்டாக்சைடு" }
    ],
    correctAnswer: "A",
    explanation: "Haber process N₂ + 3 H₂ ⇌ 2 NH₃ operates at 450-500°C and 200 atm with iron catalyst.",
    explanationTamil: "ஹேபர் முறையில் இரும்பு வினைவேக மாற்றியாகவும் மாலிப்டினம் ஊக்குவிப்பானாகவும் செயல்படுகின்றன."
  },
  {
    code: "CHE-081", subject: "Chemistry", topic: "p-Block Elements", difficulty: "easy",
    questionText: "Nitric acid (HNO₃) is manufactured industrially by which process?",
    questionTextTamil: "நைட்ரிக் அமிலம் (HNO₃) பெருமளவில் தயாரிக்கப்படும் தொழில்முறை எது?",
    options: [
      { label: "A", text: "Ostwald's process (catalytic oxidation of NH₃)" },
      { label: "B", text: "Contact process" },
      { label: "C", text: "Haber process" },
      { label: "D", text: "Birkeland-Eyde process" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆஸ்ட்வால்ட் முறை (Ostwald's process)" },
      { label: "B", text: "தொடுமுறை (Contact process)" },
      { label: "C", text: "ஹேபர் முறை" },
      { label: "D", text: "பிளான்ட் முறை" }
    ],
    correctAnswer: "A",
    explanation: "Ostwald process oxidizes NH₃ over Pt-Rh gauge at 500 K to NO, then NO₂, and absorbs in water to yield HNO₃.",
    explanationTamil: "ஆஸ்ட்வால்ட் முறையில் அம்மோனியா பிளாட்டினம் முன்னிலையில் ஆக்சிஜனேற்றம் செய்யப்பட்டு நைட்ரிக் அமிலம் பெறப்படுகிறது."
  },
  {
    code: "CHE-082", subject: "Chemistry", topic: "p-Block Elements", difficulty: "medium",
    questionText: "White phosphorus (P₄) is stored under water because:",
    questionTextTamil: "வெண் பாஸ்பரஸ் (P₄) தண்ணீருக்கு அடியில் வைக்கப்பட காரணம் என்ன?",
    options: [
      { label: "A", text: "It catches fire spontaneously in air (ignites at ~30°C)" },
      { label: "B", text: "It dissolves in water" },
      { label: "C", text: "It reacts violently with water" },
      { label: "D", text: "It sublimes in vacuum" }
    ],
    optionsTamil: [
      { label: "A", text: "காற்றில் தானாகவே தீப்பற்றி எரியும் (~30°C-ல் தீப்பற்றும்)" },
      { label: "B", text: "நீரில் கரையும்" },
      { label: "C", text: "நீருடன் தீவிரமாக வினரியும்" },
      { label: "D", text: "பதங்கமாகும்" }
    ],
    correctAnswer: "A",
    explanation: "Highly reactive tetrahedral P₄ has angular strain (60° bond angles) and bursts into flame in air to form P₄O₁₀.",
    explanationTamil: "வெண் பாஸ்பரஸ் காற்றில் தன்னிச்சையாக தீப்பிடிக்கும் என்பதால் நீரில் மூழ்கி வைக்கப்படுகிறது."
  },
  {
    code: "CHE-083", subject: "Chemistry", topic: "p-Block Elements", difficulty: "medium",
    questionText: "The basicity (number of replaceable ionizable H⁺ ions) of orthophosphoric acid (H₃PO₄) is:",
    questionTextTamil: "ஆர்த்தோ பாஸ்பாரிக் அமிலத்தின் (H₃PO₄) காரத்துவம் (Basicity) எவ்வளவு?",
    options: [
      { label: "A", text: "3 (tribasic)" }, { label: "B", text: "2 (dibasic)" }, { label: "C", text: "1 (monobasic)" }, { label: "D", text: "4" }
    ],
    optionsTamil: [
      { label: "A", text: "3 (முக்காரத்துவ அமிலம்)" }, { label: "B", text: "2 (இருக்காரத்துவ அமிலம்)" }, { label: "C", text: "1" }, { label: "D", text: "4" }
    ],
    correctAnswer: "A",
    explanation: "H₃PO₄ structure has three P-OH groups and one P=O, so all 3 hydrogens are ionizable (tribasic).",
    explanationTamil: "H₃PO₄ மூன்று P-OH தொகுதிகளைக் கொண்டுள்ளதால் அதன் காரத்துவம் 3 ஆகும்."
  },
  {
    code: "CHE-084", subject: "Chemistry", topic: "p-Block Elements", difficulty: "medium",
    questionText: "The basicity of phosphorous acid (H₃PO₃) is:",
    questionTextTamil: "பாஸ்பரஸ் அமிலத்தின் (H₃PO₃) காரத்துவம் எவ்வளவு?",
    options: [
      { label: "A", text: "2 (dibasic)" }, { label: "B", text: "3 (tribasic)" }, { label: "C", text: "1" }, { label: "D", text: "0" }
    ],
    optionsTamil: [
      { label: "A", text: "2 (இருக்காரத்துவ அமிலம்)" }, { label: "B", text: "3" }, { label: "C", text: "1" }, { label: "D", text: "0" }
    ],
    correctAnswer: "A",
    explanation: "H₃PO₃ has two P-OH groups and one P-H bond (non-ionizable), making it dibasic.",
    explanationTamil: "H₃PO₃ இரண்டு P-OH மற்றும் ஒரு P-H பிணைப்பைக் கொண்டுள்ளதால் இதன் காரத்துவம் 2 ஆகும்."
  },
  {
    code: "CHE-085", subject: "Chemistry", topic: "p-Block Elements", difficulty: "medium",
    questionText: "The catalyst used in Contact Process for manufacture of Sulphuric acid (H₂SO₄) is:",
    questionTextTamil: "கந்தக அமிலம் தயாரிக்கும் தொடுமுறையில் பயன்படும் வினைவேக மாற்றி எது?",
    options: [
      { label: "A", text: "Vanadium pentoxide (V₂O₅)" },
      { label: "B", text: "Finely divided Iron" },
      { label: "C", text: "Nickel" },
      { label: "D", text: "Copper" }
    ],
    optionsTamil: [
      { label: "A", text: "வனேடியம் பென்டாக்சைடு (V₂O₅)" },
      { label: "B", text: "இரும்புத்தூள்" },
      { label: "C", text: "நிக்கல்" },
      { label: "D", text: "தாமிரம்" }
    ],
    correctAnswer: "A",
    explanation: "2 SO₂ + O₂ --V₂O₅--> 2 SO₃ at 720 K. V₂O₅ is poison-resistant and highly effective.",
    explanationTamil: "தொடுமுறையில் SO₂-ஐ SO₃-ஆக மாற்ற V₂O₅ சிறந்த வினைவேக மாற்றியாகப் பயன்படுகிறது."
  },
  {
    code: "CHE-086", subject: "Chemistry", topic: "p-Block Elements", difficulty: "hard",
    questionText: "In qualitative analysis, the brown ring test for nitrate (NO₃⁻) ion produces a coordination complex of formula:",
    questionTextTamil: "நைட்ரேட் அயனிக்கான பழுப்பு வளைய சோதனையில் உருவாகும் அணைவுச் சேர்மத்தின் வாய்பாடு:",
    options: [
      { label: "A", text: "[Fe(H₂O)₅(NO)]SO₄" },
      { label: "B", text: "[Fe(CN)₅(NO)]²⁻" },
      { label: "C", text: "Fe₄[Fe(CN)₆]₃" },
      { label: "D", text: "[Fe(H₂O)₆]SO₄" }
    ],
    optionsTamil: [
      { label: "A", text: "[Fe(H₂O)₅(NO)]SO₄" },
      { label: "B", text: "[Fe(CN)₅(NO)]²⁻" },
      { label: "C", text: "Fe₄[Fe(CN)₆]₃" },
      { label: "D", text: "[Fe(H₂O)₆]SO₄" }
    ],
    correctAnswer: "A",
    explanation: "Pentaaquanitrosyliron(I) sulphate [Fe(H₂O)₅(NO)]²⁺ forms the characteristic brown junction ring.",
    explanationTamil: "பழுப்பு வளையம் [Fe(H₂O)₅(NO)]²⁺ என்ற நைட்ரோசோ அணைவுச் சேர்மத்தால் உருவாகிறது."
  },
  {
    code: "CHE-087", subject: "Chemistry", topic: "p-Block Elements", difficulty: "easy",
    questionText: "Which halogen has the highest electron gain enthalpy (most exothermic)?",
    questionTextTamil: "எந்த ஹாலஜனுக்கு எலக்ட்ரான் நாட்டம் (Electron gain enthalpy) மிக அதிகமாக உள்ளது?",
    options: [
      { label: "A", text: "Chlorine (Cl)" }, { label: "B", text: "Fluorine (F)" }, { label: "C", text: "Bromine (Br)" }, { label: "D", text: "Iodine (I)" }
    ],
    optionsTamil: [
      { label: "A", text: "குளோரின் (Chlorine - Cl)" }, { label: "B", text: "புளோரின்" }, { label: "C", text: "புரோமின்" }, { label: "D", text: "அயோடின்" }
    ],
    correctAnswer: "A",
    explanation: "Chlorine has higher electron affinity (-349 kJ/mol) than fluorine (-328 kJ/mol) due to small 2p size and interelectronic repulsions in F.",
    explanationTamil: "புளோரினின் சிறிய 2p கூட்டில் ஏற்படும் எலக்ட்ரான் விலக்கத்தால் குளோரின் அதிக எலக்ட்ரான் நாட்டத்தைப் பெற்றுள்ளது."
  },
  {
    code: "CHE-088", subject: "Chemistry", topic: "p-Block Elements", difficulty: "easy",
    questionText: "The strongest oxidizing agent among the halogens is:",
    questionTextTamil: "ஹாலஜன்களுள் மிக வலிமையான ஆக்சிஜனேற்றி எது?",
    options: [
      { label: "A", text: "Fluorine (F₂)" }, { label: "B", text: "Chlorine (Cl₂)" }, { label: "C", text: "Bromine (Br₂)" }, { label: "D", text: "Iodine (I₂)" }
    ],
    optionsTamil: [
      { label: "A", text: "புளோரின் (F₂)" }, { label: "B", text: "குளோரின்" }, { label: "C", text: "புரோமின்" }, { label: "D", text: "அயோடின்" }
    ],
    correctAnswer: "A",
    explanation: "F₂ has highest standard reduction potential (+2.87 V) due to low F-F bond dissociation energy and high hydration enthalpy of F⁻.",
    explanationTamil: "புளோரின் மிக அதிக திட்ட ஒடுக்க மின்னழுத்தம் (+2.87 V) கொண்டு மிகச் சிறந்த ஆக்சிஜனேற்றியாக உள்ளது."
  },
  {
    code: "CHE-089", subject: "Chemistry", topic: "p-Block Elements", difficulty: "medium",
    questionText: "The geometry and hybridization of Xenon tetrafluoride (XeF₄) are:",
    questionTextTamil: "செனான் டெட்ராபுளோரைடின் (XeF₄) வடிவமைப்பு மற்றும் இனக்கலப்பு:",
    options: [
      { label: "A", text: "Square planar, sp³d²" },
      { label: "B", text: "Tetrahedral, sp³" },
      { label: "C", text: "Octahedral, sp³d²" },
      { label: "D", text: "Trigonal bipyramidal, sp³d" }
    ],
    optionsTamil: [
      { label: "A", text: "தளச் சதுரம் (Square planar), sp³d²" },
      { label: "B", text: "நான்முகி, sp³" },
      { label: "C", text: "எண்முகி, sp³d²" },
      { label: "D", text: "முக்கோண இருபிரமிடு" }
    ],
    correctAnswer: "A",
    explanation: "Xe has 8 valence electrons. In XeF₄, 4 bond pairs and 2 lone pairs occupy octahedral positions, giving square planar geometry.",
    explanationTamil: "XeF₄-ல் 4 பிணைப்பு மற்றும் 2 தனித்த இரட்டைகள் இருப்பதால் sp³d² இனக்கலப்பில் தளச் சதுர வடிவம் பெறுகிறது."
  },
  {
    code: "CHE-090", subject: "Chemistry", topic: "p-Block Elements", difficulty: "medium",
    questionText: "The shape of Xenon difluoride (XeF₂) is:",
    questionTextTamil: "செனான் டைபுளோரைடின் (XeF₂) மூலக்கூறு வடிவம்:",
    options: [
      { label: "A", text: "Linear" }, { label: "B", text: "Bent / V-shaped" }, { label: "C", text: "T-shaped" }, { label: "D", text: "Tetrahedral" }
    ],
    optionsTamil: [
      { label: "A", text: "நேர்கோடு (Linear)" }, { label: "B", text: "வளைந்த வடிவம்" }, { label: "C", text: "T-வடிவம்" }, { label: "D", text: "நான்முகி" }
    ],
    correctAnswer: "A",
    explanation: "XeF₂ has 2 bond pairs and 3 equatorial lone pairs in sp³d hybridization, resulting in a strictly linear geometry.",
    explanationTamil: "XeF₂-ல் 3 தனித்த இரட்டைகள் நடுவரை தளத்தில் அமைவதால் நேர்கோட்டு வடிவம் (Linear) பெறுகிறது."
  },
  {
    code: "CHE-091", subject: "Chemistry", topic: "p-Block Elements", difficulty: "easy",
    questionText: "Helium is used to dilute oxygen in deep-sea diving gas cylinders because:",
    questionTextTamil: "ஆழ்கடல் மூழ்காளர்கள் சுவாசிக்கும் சிலிண்டர்களில் ஆக்சிஜனுடன் ஹீலியம் கலக்கப்பட காரணம்:",
    options: [
      { label: "A", text: "It has very low solubility in blood even at high pressure" },
      { label: "B", text: "It is lighter than hydrogen" },
      { label: "C", text: "It is flammable" },
      { label: "D", text: "It produces oxygen" }
    ],
    optionsTamil: [
      { label: "A", text: "உயர் அழுத்தத்திலும் ரத்தத்தில் மிகக் குறைந்த கரைதிறன் கொண்டது" },
      { label: "B", text: "ஹைட்ரஜனை விட லேசானது" },
      { label: "C", text: "எரியக்கூடியது" },
      { label: "D", text: "ஆக்சிஜனை உருவாக்குகிறது" }
    ],
    correctAnswer: "A",
    explanation: "Helium prevents the painful condition 'bends' caused by nitrogen bubbles dissolving in blood at deep sea pressures.",
    explanationTamil: "ரத்தத்தில் நைட்ரஜன் குமிழ்கள் அடைபடுவதைத் தடுக்க குறைந்த கரைதிறன் கொண்ட ஹீலியம் பயன்படுகிறது."
  },
  {
    code: "CHE-092", subject: "Chemistry", topic: "p-Block Elements", difficulty: "medium",
    questionText: "Bleaching powder has the chemical formula:",
    questionTextTamil: "சலவைத் தூளின் (Bleaching powder) வேதியியல் வாய்பாடு யாது?",
    options: [
      { label: "A", text: "CaOCl₂" }, { label: "B", text: "CaCl₂" }, { label: "C", text: "Ca(ClO₃)₂" }, { label: "D", text: "CaCO₃" }
    ],
    optionsTamil: [
      { label: "A", text: "CaOCl₂ (கால்சியம் ஆக்ஸிகுளோரைடு)" },
      { label: "B", text: "CaCl₂" },
      { label: "C", text: "Ca(ClO₃)₂" },
      { label: "D", text: "CaCO₃" }
    ],
    correctAnswer: "A",
    explanation: "Formed by action of chlorine on dry slaked lime: Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O.",
    explanationTamil: "நீற்றுப்பூசிய சுண்ணாம்பு மீது குளோரின் வாயுவைச் செலுத்தி CaOCl₂ பெறப்படுகிறது."
  },
  {
    code: "CHE-093", subject: "Chemistry", topic: "p-Block Elements", difficulty: "easy",
    questionText: "Aqua regia is a 3:1 mixture of:",
    questionTextTamil: "ராஜதிராவகம் (Aqua regia) என்பது 3:1 விகிதத்தில் கலந்த எந்த அமிலங்களின் கலவையாகும்?",
    options: [
      { label: "A", text: "Conc. HCl and Conc. HNO₃" },
      { label: "B", text: "Conc. HNO₃ and Conc. H₂SO₄" },
      { label: "C", text: "Conc. H₂SO₄ and Conc. HCl" },
      { label: "D", text: "Dil. HCl and Dil. HNO₃" }
    ],
    optionsTamil: [
      { label: "A", text: "அடர் HCl மற்றும் அடர் HNO₃ (3:1 விகிதம்)" },
      { label: "B", text: "அடர் HNO₃ மற்றும் அடர் H₂SO₄" },
      { label: "C", text: "அடர் H₂SO₄ மற்றும் அடர் HCl" },
      { label: "D", text: "நீர்த்த அமிலங்கள்" }
    ],
    correctAnswer: "A",
    explanation: "3 parts conc. HCl + 1 part conc. HNO₃ dissolves noble metals like gold and platinum via nascent chlorine.",
    explanationTamil: "3 பங்கு அடர் HCl மற்றும் 1 பங்கு அடர் HNO₃ கலவை தங்கம் மற்றும் பிளாட்டினத்தைக் கரைக்கும் ராஜதிராவகம் ஆகும்."
  },
  {
    code: "CHE-094", subject: "Chemistry", topic: "p-Block Elements", difficulty: "medium",
    questionText: "Oleum is chemically:",
    questionTextTamil: "ஓலியம் (Oleum) என்பது வேதியியல் ரீதியாக எதைக் குறிக்கிறது?",
    options: [
      { label: "A", text: "Pyrosulphuric acid (H₂S₂O₇ = H₂SO₄ + SO₃)" },
      { label: "B", text: "Caro's acid (H₂SO₅)" },
      { label: "C", text: "Marshall's acid (H₂S₂O₈)" },
      { label: "D", text: "Dithionic acid" }
    ],
    optionsTamil: [
      { label: "A", text: "புகையும் கந்தக அமிலம் / பைரோசல்பூரிக் அமிலம் (H₂S₂O₇)" },
      { label: "B", text: "காரோ அமிலம்" },
      { label: "C", text: "மார்ஷல் அமிலம்" },
      { label: "D", text: "டைதயோனிக் அமிலம்" }
    ],
    correctAnswer: "A",
    explanation: "Absorption of SO₃ in 98% H₂SO₄ yields Oleum (fuming sulphuric acid, H₂S₂O₇).",
    explanationTamil: "H₂SO₄-ல் SO₃ உறிஞ்சப்படும் போது ஓலியம் (H₂S₂O₇) உருவாகிறது."
  },
  {
    code: "CHE-095", subject: "Chemistry", topic: "p-Block Elements", difficulty: "easy",
    questionText: "Which noble gas does NOT occur in the atmosphere?",
    questionTextTamil: "வளிமண்டலத்தில் இயற்கையாகக் காணப்படாத மந்த வாயு எது?",
    options: [
      { label: "A", text: "Radon (Rn)" }, { label: "B", text: "Argon (Ar)" }, { label: "C", text: "Neon (Ne)" }, { label: "D", text: "Krypton (Kr)" }
    ],
    optionsTamil: [
      { label: "A", text: "ரேடான் (Radon - Rn)" }, { label: "B", text: "ஆர்கான்" }, { label: "C", text: "நியான்" }, { label: "D", text: "கிரிப்டான்" }
    ],
    correctAnswer: "A",
    explanation: "Radon is a radioactive decay product of radium with short half-life and does not accumulate in normal atmosphere.",
    explanationTamil: "ரேடான் ஒரு கதிரியக்கத் தனிமமாகும், இது வளிமண்டலத்தில் இயல்பாக இருப்பதில்லை."
  },

  // 96-115 d- and f-Block Elements
  {
    code: "CHE-096", subject: "Chemistry", topic: "d-Block Elements", difficulty: "easy",
    questionText: "Transition metals form coloured complexes primarily due to:",
    questionTextTamil: "இடைநிலைத் தனிமங்கள் வண்ணச் சேர்மங்களை உருவாக்க முக்கியக் காரணம்:",
    options: [
      { label: "A", text: "d-d electronic transitions in presence of ligands" },
      { label: "B", text: "Completely filled d-subshell" },
      { label: "C", text: "High density" },
      { label: "D", text: "Presence of unpaired s-electrons" }
    ],
    optionsTamil: [
      { label: "A", text: "ஈனிகள் முன்னிலையில் ஏற்படும் d-d எலக்ட்ரான் பரிமாற்றம்" },
      { label: "B", text: "முழுமையாக நிரம்பிய d-கூடு" },
      { label: "C", text: "அதிக அடர்த்தி" },
      { label: "D", text: "s-எலக்ட்ரான்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Splitting of degenerate d-orbitals allows absorption of visible light by electron jumping between d-levels (d-d transition).",
    explanationTamil: "படிகப் புலப் பிளப்பினால் d-d எலக்ட்ரான் பரிமாற்றம் நிகழ்ந்து கண்ணுறு ஒளியை உறிஞ்சி நிறம் தருகிறது."
  },
  {
    code: "CHE-097", subject: "Chemistry", topic: "d-Block Elements", difficulty: "medium",
    questionText: "Spin-only magnetic moment µ_s of an ion with n unpaired electrons is calculated by:",
    questionTextTamil: "n தனித்த எலக்ட்ரான்களைக் கொண்ட ஒரு அயனியின் சுழற்சி காந்த திருப்புத்திறன் வாய்பாடு:",
    options: [
      { label: "A", text: "µ = √[n(n + 2)] Bohr Magnetons (BM)" },
      { label: "B", text: "µ = √[n(n + 1)] BM" },
      { label: "C", text: "µ = n(n + 2) BM" },
      { label: "D", text: "µ = 2n + 1 BM" }
    ],
    optionsTamil: [
      { label: "A", text: "µ = √[n(n + 2)] போர் மேக்னட்டான் (BM)" },
      { label: "B", text: "µ = √[n(n + 1)] BM" },
      { label: "C", text: "µ = n(n + 2) BM" },
      { label: "D", text: "µ = 2n + 1 BM" }
    ],
    correctAnswer: "A",
    explanation: "µ = √[n(n + 2)] BM. For instance, Fe³⁺ (3d⁵, n=5) has µ = √35 ≈ 5.92 BM.",
    explanationTamil: "சுழற்சி மட்டுமேயான காந்த திருப்புத்திறன் µ = √[n(n + 2)] BM ஆகும்."
  },
  {
    code: "CHE-098", subject: "Chemistry", topic: "d-Block Elements", difficulty: "easy",
    questionText: "Which ion is colourless in aqueous solution among the following?",
    questionTextTamil: "பின்வருவனவற்றுள் நீர்க்கரைசலில் நிறமற்ற அயனி எது?",
    options: [
      { label: "A", text: "Sc³⁺ and Zn²⁺ (3d⁰ and 3d¹⁰)" },
      { label: "B", text: "Cu²⁺ (3d⁹)" },
      { label: "C", text: "Fe³⁺ (3d⁵)" },
      { label: "D", text: "Cr³⁺ (3d³)" }
    ],
    optionsTamil: [
      { label: "A", text: "Sc³⁺ மற்றும் Zn²⁺ (3d⁰ மற்றும் 3d¹⁰ - தனித்த d எலக்ட்ரான்கள் இல்லை)" },
      { label: "B", text: "Cu²⁺ (நீல நிறம்)" },
      { label: "C", text: "Fe³⁺ (மஞ்சள் நிறம்)" },
      { label: "D", text: "Cr³⁺ (பச்சை நிறம்)" }
    ],
    correctAnswer: "A",
    explanation: "Sc³⁺ has 3d⁰ and Zn²⁺ has 3d¹⁰. Without unpaired d-electrons, d-d transitions cannot occur.",
    explanationTamil: "Sc³⁺ (3d⁰) மற்றும் Zn²⁺ (3d¹⁰) ஆகியவற்றில் தனித்த d-எலக்ட்ரான்கள் இல்லாததால் நிறமற்றவை."
  },
  {
    code: "CHE-099", subject: "Chemistry", topic: "d-Block Elements", difficulty: "medium",
    questionText: "The maximum oxidation state shown by an element in 3d series is +7, exhibited by:",
    questionTextTamil: "3d இடைநிலை வரிசையில் +7 என்ற பெரும ஆக்சிஜனேற்ற நிலையை வெளிப்படுத்தும் தனிமம் எது?",
    options: [
      { label: "A", text: "Manganese (Mn in KMnO₄)" },
      { label: "B", text: "Chromium (Cr)" },
      { label: "C", text: "Iron (Fe)" },
      { label: "D", text: "Vanadium (V)" }
    ],
    optionsTamil: [
      { label: "A", text: "மாங்கனீசு (Mn - KMnO₄-ல் +7)" },
      { label: "B", text: "குரோமியம்" },
      { label: "C", text: "இரும்பு" },
      { label: "D", text: "வனேடியம்" }
    ],
    correctAnswer: "A",
    explanation: "Mn has 3d⁵ 4s² configuration and can lose/share all 7 valence electrons.",
    explanationTamil: "மாங்கனீசு 3d⁵ 4s² எலக்ட்ரான் அமைப்பைக் கொண்டு +7 வரை ஆக்சிஜனேற்ற நிலைகளைக் காட்டுகிறது."
  },
  {
    code: "CHE-100", subject: "Chemistry", topic: "d-Block Elements", difficulty: "medium",
    questionText: "Lanthanoid contraction causes the atomic and ionic radii of which pair of elements to be nearly identical?",
    questionTextTamil: "லாந்தனாய்டு குறுக்கத்தின் காரணமாக எந்த இரு தனிமங்களின் ஆரங்கள் கிட்டத்தட்ட சமமாக உள்ளன?",
    options: [
      { label: "A", text: "Zirconium (Zr) and Hafnium (Hf)" },
      { label: "B", text: "Titanium and Zirconium" },
      { label: "C", text: "Iron and Nickel" },
      { label: "D", text: "Copper and Zinc" }
    ],
    optionsTamil: [
      { label: "A", text: "சிர்கோனியம் (Zr) மற்றும் ஹாஃப்னியம் (Hf)" },
      { label: "B", text: "டைட்டானியம் மற்றும் சிர்கோனியம்" },
      { label: "C", text: "இரும்பு மற்றும் நிக்கல்" },
      { label: "D", text: "தாமிரம் மற்றும் துத்தநாகம்" }
    ],
    correctAnswer: "A",
    explanation: "Poor shielding by 4f electrons counteracts expected size increase; Zr (160 pm) and Hf (159 pm) have identical sizes.",
    explanationTamil: "4f எலக்ட்ரான்களின் மோசமான திரைமறைப்பினால் Zr மற்றும் Hf கிட்டத்தட்ட சமமான உருவளவைப் பெற்றுள்ளன."
  },
  {
    code: "CHE-101", subject: "Chemistry", topic: "d-Block Elements", difficulty: "easy",
    questionText: "Potassium permanganate (KMnO₄) acts as a powerful oxidizing agent. In acidic medium, MnO₄⁻ is reduced to:",
    questionTextTamil: "அமில ஊடகத்தில் பொட்டாசியம் பெர்மாங்கனேட் (KMnO₄) எவ்வகையான அயனியாக ஒடுக்கமடைகிறது?",
    options: [
      { label: "A", text: "Mn²⁺ (change in oxidation state = 5)" },
      { label: "B", text: "MnO₂ (change = 3)" },
      { label: "C", text: "MnO₄²⁻ (change = 1)" },
      { label: "D", text: "Mn metallic" }
    ],
    optionsTamil: [
      { label: "A", text: "Mn²⁺ அயனி (ஆக்சிஜனேற்ற எண் மாற்றம் = 5)" },
      { label: "B", text: "MnO₂" },
      { label: "C", text: "MnO₄²⁻" },
      { label: "D", text: "Mn உலோகம்" }
    ],
    correctAnswer: "A",
    explanation: "MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O. Equivalent weight = M / 5.",
    explanationTamil: "அமில ஊடகத்தில் MnO₄⁻ 5 எலக்ட்ரான்களை ஏற்று Mn²⁺ ஆக ஒடுக்கமடைகிறது."
  },
  {
    code: "CHE-102", subject: "Chemistry", topic: "d-Block Elements", difficulty: "medium",
    questionText: "Potassium dichromate (K₂Cr₂O₇) in acidic medium oxidizes Fe²⁺ to Fe³⁺. The equivalent weight of K₂Cr₂O₇ is:",
    questionTextTamil: "அமில ஊடகத்தில் K₂Cr₂O₇-ன் சமமான எடை (Equivalent weight) எதற்கு சமம்?",
    options: [
      { label: "A", text: "Molecular weight / 6 (M / 6)" },
      { label: "B", text: "M / 3" },
      { label: "C", text: "M / 1" },
      { label: "D", text: "M / 2" }
    ],
    optionsTamil: [
      { label: "A", text: "மூலக்கூறு எடை / 6 (M / 6)" },
      { label: "B", text: "M / 3" },
      { label: "C", text: "M / 1" },
      { label: "D", text: "M / 2" }
    ],
    correctAnswer: "A",
    explanation: "Cr₂O₇²⁻ + 14 H⁺ + 6 e⁻ → 2 Cr³⁺ + 7 H₂O. Each formula unit consumes 6 electrons, so Eq. wt = M / 6.",
    explanationTamil: "ஒரு மூலக்கூறு K₂Cr₂O₇ 6 எலக்ட்ரான்களை ஏற்பதால் சமமான எடை = M / 6."
  },
  {
    code: "CHE-103", subject: "Chemistry", topic: "d-Block Elements", difficulty: "easy",
    questionText: "Interstitial compounds of transition metals are formed when small atoms like H, C, or N occupy lattice voids. They are characterized by:",
    questionTextTamil: "இடைநிலைத் தனிமங்கள் உருவாக்கும் இடைச்செருகல் சேர்மங்கள் (Interstitial compounds) எத்தகைய பண்புகளைப் பெற்றுள்ளன?",
    options: [
      { label: "A", text: "High melting points, extreme hardness, and retained metallic conductivity" },
      { label: "B", text: "Low melting points" },
      { label: "C", text: "Poor conductors" },
      { label: "D", text: "Highly reactive" }
    ],
    optionsTamil: [
      { label: "A", text: "உயர் உருகுநிலை, அதீத கடினத்தன்மை மற்றும் மின்கடத்துத்திறன்" },
      { label: "B", text: "குறைந்த உருகுநிலை" },
      { label: "C", text: "மின்கடத்தாப் பொருள்" },
      { label: "D", text: "அதிக வினைதிறன்" }
    ],
    correctAnswer: "A",
    explanation: "Interstitial hydrides, carbides (e.g. TiC, Fe₃C) are harder than parent metals and retain electrical conductivity.",
    explanationTamil: "இடைச்செருகல் சேர்மங்கள் தூய உலோகத்தை விட கடினமானவையாகவும் உயர் உருகுநிலை கொண்டவையாகவும் இருக்கும்."
  },
  {
    code: "CHE-104", subject: "Chemistry", topic: "d-Block Elements", difficulty: "easy",
    questionText: "The most common and stable oxidation state of lanthanoid elements is:",
    questionTextTamil: "லாந்தனாய்டு தனிமங்களின் பொதுவான மற்றும் நிலையான ஆக்சிஜனேற்ற நிலை:",
    options: [
      { label: "A", text: "+3" }, { label: "B", text: "+2" }, { label: "C", text: "+4" }, { label: "D", text: "+5" }
    ],
    optionsTamil: [
      { label: "A", text: "+3" }, { label: "B", text: "+2" }, { label: "C", text: "+4" }, { label: "D", text: "+5" }
    ],
    correctAnswer: "A",
    explanation: "All 14 lanthanoids predominantly exhibit +3 oxidation state (Ln³⁺) in aqueous solutions and solid compounds.",
    explanationTamil: "அனைத்து லாந்தனாய்டுகளும் முதன்மையாக +3 ஆக்சிஜனேற்ற நிலையை வெளிப்படுத்துகின்றன."
  },
  {
    code: "CHE-105", subject: "Chemistry", topic: "d-Block Elements", difficulty: "medium",
    questionText: "Cerium shows stable +4 oxidation state (Ce⁴⁺) because:",
    questionTextTamil: "சீரியம் +4 ஆக்சிஜனேற்ற நிலையை (Ce⁴⁺) காட்டக் காரணம்:",
    options: [
      { label: "A", text: "It achieves completely empty noble gas core ([Xe] 4f⁰)" },
      { label: "B", text: "Half-filled 4f shell" },
      { label: "C", text: "Filled 4f shell" },
      { label: "D", text: "High electronegativity" }
    ],
    optionsTamil: [
      { label: "A", text: "மந்த வாயுவான செனானின் எலக்ட்ரான் அமைப்பைப் பெறுவதால் ([Xe] 4f⁰)" },
      { label: "B", text: "பாதி நிரம்பிய 4f கூடு" },
      { label: "C", text: "முழுமையாக நிரம்பிய 4f கூடு" },
      { label: "D", text: "அதிக எலக்ட்ரான் கவர் தன்மை" }
    ],
    correctAnswer: "A",
    explanation: "Ce⁴⁺ acquires stable noble gas electronic configuration [Xe] 4f⁰ and acts as a powerful analytical oxidant.",
    explanationTamil: "Ce⁴⁺ அயனி நிலையான செனான் [Xe] 4f⁰ எலக்ட்ரான் அமைப்பைப் பெறுகிறது."
  },

  // 106-125 Coordination Chemistry
  {
    code: "CHE-106", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "easy",
    questionText: "According to Werner's coordination theory, primary valency corresponds to:",
    questionTextTamil: "வெர்னரின் அணைவுக் கொள்கைப்படி முதன்மை இணைதிறன் (Primary valency) எதனைக் குறிக்கிறது?",
    options: [
      { label: "A", text: "Oxidation state of central metal (ionizable)" },
      { label: "B", text: "Coordination number (non-ionizable)" },
      { label: "C", text: "Number of chelating rings" },
      { label: "D", text: "Number of unpaired electrons" }
    ],
    optionsTamil: [
      { label: "A", text: "மைய உலோகத்தின் ஆக்சிஜனேற்ற நிலை (அயனியாகக் கூடியது)" },
      { label: "B", text: "அணைவு எண் (அயனியாகாதது)" },
      { label: "C", text: "வளையங்களின் எண்ணிக்கை" },
      { label: "D", text: "தனித்த எலக்ட்ரான்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Primary valency is ionizable and satisfies the formal oxidation state of central metal ion.",
    explanationTamil: "முதன்மை இணைதிறன் அயனியாகக் கூடியது மற்றும் ஆக்சிஜனேற்ற நிலைக்குச் சமமானது."
  },
  {
    code: "CHE-107", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "easy",
    questionText: "Secondary valency in Werner's theory represents:",
    questionTextTamil: "வெர்னர் கொள்கையில் இரண்டாம் நிலை இணைதிறன் எதனைக் குறிக்கிறது?",
    options: [
      { label: "A", text: "Coordination number (fixed, directional, non-ionizable)" },
      { label: "B", text: "Oxidation state" },
      { label: "C", text: "Charge of complex" },
      { label: "D", text: "Dipole moment" }
    ],
    optionsTamil: [
      { label: "A", text: "அணைவு எண் (திசைப்பண்புடையது, அயனியாகாதது)" },
      { label: "B", text: "ஆக்சிஜனேற்ற நிலை" },
      { label: "C", text: "அணைவு மின்சுமை" },
      { label: "D", text: "திருப்புத்திறன்" }
    ],
    correctAnswer: "A",
    explanation: "Secondary valency is non-ionizable, fixed for a given metal ion, and gives directional spatial geometry.",
    explanationTamil: "இரண்டாம் நிலை இணைதிறன் அணைவு எண்ணைக் குறிப்பதுடன் குறிப்பிட்ட திசைப்பண்பைக் கொண்டுள்ளது."
  },
  {
    code: "CHE-108", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "medium",
    questionText: "An ambidentate ligand is one that:",
    questionTextTamil: "இருவழிப் பிணைப்பு ஈனி (Ambidentate ligand) என்பது:",
    options: [
      { label: "A", text: "Has two different donor atoms and can coordinate through either (e.g., NO₂⁻ and SCN⁻)" },
      { label: "B", text: "Forms six coordinate bonds" },
      { label: "C", text: "Cannot donate electron pairs" },
      { label: "D", text: "Is always neutral" }
    ],
    optionsTamil: [
      { label: "A", text: "இரு வெவ்வேறு ஈனி அணுக்களைக் கொண்டு ஏதேனும் ஒன்றின் வழியே பிணைப்பை ஏற்படுத்தும் ஈனி (எ.கா. NO₂⁻, SCN⁻)" },
      { label: "B", text: "ஆறு பிணைப்புகளை மட்டுமே ஏற்படுத்தும் ஈனி" },
      { label: "C", text: "எலக்ட்ரான்களை வழங்காத ஈனி" },
      { label: "D", text: "எப்போதும் நடுநிலையானது" }
    ],
    correctAnswer: "A",
    explanation: "NO₂⁻ coordinates via N (nitro) or O (nitrito); SCN⁻ coordinates via S (thiocyanato) or N (isothiocyanato).",
    explanationTamil: "NO₂⁻ (N அல்லது O வழி) மற்றும் SCN⁻ (S அல்லது N வழி) இணைவதால் இணைப்பு மாற்றியம் தோன்றுகிறது."
  },
  {
    code: "CHE-109", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "easy",
    questionText: "EDTA⁴⁻ (Ethylenediaminetetraacetate) is which type of ligand?",
    questionTextTamil: "EDTA⁴⁻ எந்த வகை ஈனிக்கு சிறந்த உதாரணமாகும்?",
    options: [
      { label: "A", text: "Hexadentate chelating ligand" },
      { label: "B", text: "Bidentate ligand" },
      { label: "C", text: "Monodentate ligand" },
      { label: "D", text: "Tridentate ligand" }
    ],
    optionsTamil: [
      { label: "A", text: "அறுமுனை இடுக்காக்கி ஈனி (Hexadentate ligand)" },
      { label: "B", text: "இருமுனை ஈனி" },
      { label: "C", text: "ஒருமுனை ஈனி" },
      { label: "D", text: "மும்முனை ஈனி" }
    ],
    correctAnswer: "A",
    explanation: "EDTA binds through 2 nitrogen atoms and 4 carboxylate oxygen atoms, acting as a hexadentate chelate.",
    explanationTamil: "EDTA இரண்டு நைட்ரஜன் மற்றும் நான்கு ஆக்சிஜன் அணுக்கள் மூலம் 6 பிணைப்புகளை ஏற்படுத்தும் அறுமுனை ஈனியாகும்."
  },
  {
    code: "CHE-110", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "medium",
    questionText: "IUPAC name of [Co(NH₃)₅Cl]Cl₂ is:",
    questionTextTamil: "[Co(NH₃)₅Cl]Cl₂ அணைவுச் சேர்மத்தின் சரியான IUPAC பெயர்:",
    options: [
      { label: "A", text: "Pentaamminechloridocobalt(III) chloride" },
      { label: "B", text: "Chloropentaamminecobalt(II) chloride" },
      { label: "C", text: "Pentaamminecobalt(III) trichloride" },
      { label: "D", text: "Cobalt pentaammine dichloride" }
    ],
    optionsTamil: [
      { label: "A", text: "பென்டாஅம்மைன்குளோரிடோகோபால்ட்(III) குளோரைடு" },
      { label: "B", text: "குளோரோபென்டாஅம்மைன்கோபால்ட்(II) குளோரைடு" },
      { label: "C", text: "பென்டாஅம்மைன்கோபால்ட் டிரைகுளோரைடு" },
      { label: "D", text: "கோபால்ட் டைக்குளோரைடு" }
    ],
    correctAnswer: "A",
    explanation: "Co oxidation state = +3. Ligands alphabetical: ammine before chlorido => Pentaamminechloridocobalt(III) chloride.",
    explanationTamil: "அகர வரிசையில் அம்மைன் முதலில் வந்து கோபால்ட்டின் ஆக்சிஜனேற்ற நிலை (III) ஆகும்."
  },
  {
    code: "CHE-111", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "medium",
    questionText: "The type of isomerism shown by [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄ is:",
    questionTextTamil: "[Co(NH₃)₅(SO₄)]Br மற்றும் [Co(NH₃)₅Br]SO₄ அணைவுச் சேர்மங்கள் காட்டும் மாற்றியம்:",
    options: [
      { label: "A", text: "Ionisation isomerism" },
      { label: "B", text: "Linkage isomerism" },
      { label: "C", text: "Coordination isomerism" },
      { label: "D", text: "Optical isomerism" }
    ],
    optionsTamil: [
      { label: "A", text: "அயனியாதல் மாற்றியம் (Ionisation isomerism)" },
      { label: "B", text: "இணைப்பு மாற்றியம்" },
      { label: "C", text: "அணைவு மாற்றியம்" },
      { label: "D", text: "ஒளிசுழற்சி மாற்றியம்" }
    ],
    correctAnswer: "A",
    explanation: "They yield different ions in solution (one gives Br⁻ precipitating with AgNO₃, the other gives SO₄²⁻ with BaCl₂).",
    explanationTamil: "கரைசலில் வெவ்வேறு அயனிகளைத் தருவதால் இவை அயனியாதல் மாற்றியங்கள் ஆகும்."
  },
  {
    code: "CHE-112", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "medium",
    questionText: "According to Crystal Field Theory (CFT), in an octahedral complex the five d-orbitals split into:",
    questionTextTamil: "படிகப் புலக் கொள்கைப்படி (CFT) எண்முகி அணைவில் 5 d-ஆர்பிட்டால்கள் எவ்வாறு பிளவடைகின்றன?",
    options: [
      { label: "A", text: "Lower energy t₂g (triply degenerate) and higher energy eg (doubly degenerate)" },
      { label: "B", text: "Lower eg and higher t₂g" },
      { label: "C", text: "Equal energies" },
      { label: "D", text: "Four lower and one higher" }
    ],
    optionsTamil: [
      { label: "A", text: "குறைந்த ஆற்றல் கொண்ட t₂g (3 ஆர்பிட்டால்கள்) மற்றும் உயர் ஆற்றல் கொண்ட eg (2 ஆர்பிட்டால்கள்)" },
      { label: "B", text: "குறைந்த eg மற்றும் உயர் t₂g" },
      { label: "C", text: "சம ஆற்றல் மட்டங்கள்" },
      { label: "D", text: "நான்கு சம மட்டங்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Ligands approach along x, y, z axes, repelling d_x²-y² and d_z² (eg) higher than d_xy, d_yz, d_zx (t₂g).",
    explanationTamil: "அச்சுகளின் வழியே ஈனிகள் அணுகுவதால் eg ஆர்பிட்டால்கள் உயர் ஆற்றலையும் t₂g குறைந்த ஆற்றலையும் பெறுகின்றன."
  },
  {
    code: "CHE-113", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "hard",
    questionText: "Relationship between crystal field splitting in tetrahedral (Δt) and octahedral (Δo) complexes is:",
    questionTextTamil: "நான்முகி (Δt) மற்றும் எண்முகி (Δo) படிகப் புலப் பிளப்புகளுக்கு இடையிலான தொடர்பு:",
    options: [
      { label: "A", text: "Δt = (4/9) Δo" }, { label: "B", text: "Δt = (9/4) Δo" }, { label: "C", text: "Δt = Δo" }, { label: "D", text: "Δt = (2/3) Δo" }
    ],
    optionsTamil: [
      { label: "A", text: "Δt = (4/9) Δo" }, { label: "B", text: "Δt = (9/4) Δo" }, { label: "C", text: "Δt = Δo" }, { label: "D", text: "Δt = (2/3) Δo" }
    ],
    correctAnswer: "A",
    explanation: "Because there are only 4 ligands in tetrahedral vs 6 in octahedral and none point directly at d-orbitals, Δt = (4/9) Δo.",
    explanationTamil: "நான்முகி அணைவில் 4 ஈனிகள் மட்டுமே உள்ளதால் படிகப் புலப் பிளப்பு Δt = (4/9) Δo ஆகும்."
  },
  {
    code: "CHE-114", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "medium",
    questionText: "Which of the following ligands produces the strongest crystal field according to the Spectrochemical Series?",
    questionTextTamil: "நிறமாலையியல் வேதி வரிசைப்படி (Spectrochemical series) மிக வலிமையான படிகப்புலத்தை உருவாக்கும் ஈனி எது?",
    options: [
      { label: "A", text: "CO (Carbonyl)" }, { label: "B", text: "CN⁻" }, { label: "C", text: "NH₃" }, { label: "D", text: "I⁻" }
    ],
    optionsTamil: [
      { label: "A", text: "CO (கார்பனைல் - மிக வலிமையான ஈனி)" },
      { label: "B", text: "CN⁻" },
      { label: "C", text: "NH₃" },
      { label: "D", text: "I⁻ (வலிமை குறைந்த ஈனி)" }
    ],
    correctAnswer: "A",
    explanation: "Spectrochemical series: I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < CN⁻ < CO.",
    explanationTamil: "CO கார்பனைல் ஈனி வலிமையான π-பின்னிணைப்பைக் கொண்டு அதிகபட்ச படிகப் புலப் பிளப்பை ஏற்படுத்துகிறது."
  },
  {
    code: "CHE-115", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "easy",
    questionText: "Chlorophyll, the green photosynthetic pigment, is a coordination complex of which metal?",
    questionTextTamil: "தாவரங்களின் ஒளிச்சேர்க்கை நிறமியான பச்சையம் (Chlorophyll) எந்த உலோகத்தின் அணைவுச் சேர்மமாகும்?",
    options: [
      { label: "A", text: "Magnesium (Mg)" }, { label: "B", text: "Iron (Fe)" }, { label: "C", text: "Cobalt (Co)" }, { label: "D", text: "Copper (Cu)" }
    ],
    optionsTamil: [
      { label: "A", text: "மெக்னீசியம் (Magnesium - Mg)" },
      { label: "B", text: "இரும்பு (ஹீமோகுளோபின்)" },
      { label: "C", text: "கோபால்ட் (வைட்டமின் B12)" },
      { label: "D", text: "தாமிரம்" }
    ],
    correctAnswer: "A",
    explanation: "Chlorophyll contains central Mg²⁺ porphyrin complex. Haemoglobin contains Fe²⁺; Vitamin B₁₂ contains Co³⁺.",
    explanationTamil: "பச்சையத்தில் மைய உலோக அயனியாக மெக்னீசியம் (Mg²⁺) உள்ளது (ஹீமோகுளோபினில் இரும்பு உள்ளது)."
  },
  {
    code: "CHE-116", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "easy",
    questionText: "Vitamin B₁₂ is a coordination complex containing which metal ion?",
    questionTextTamil: "வைட்டமின் B₁₂ எந்த உலோகத்தைக் கொண்ட அணைவுச் சேர்மமாகும்?",
    options: [
      { label: "A", text: "Cobalt (Co³⁺)" }, { label: "B", text: "Iron (Fe)" }, { label: "C", text: "Magnesium (Mg)" }, { label: "D", text: "Zinc (Zn)" }
    ],
    optionsTamil: [
      { label: "A", text: "கோபால்ட் (Cobalt - Co)" }, { label: "B", text: "இரும்பு" }, { label: "C", text: "மெக்னீசியம்" }, { label: "D", text: "துத்தநாகம்" }
    ],
    correctAnswer: "A",
    explanation: "Cyanocobalamin (Vitamin B₁₂) is an octahedral coordination complex of cobalt.",
    explanationTamil: "வைட்டமின் B₁₂ கோபால்ட் அணைவுச் சேர்மமாகும்."
  },
  {
    code: "CHE-117", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "medium",
    questionText: "Wilkinson's catalyst used for homogeneous hydrogenation of alkenes is:",
    questionTextTamil: "ஆல்கீன்களின் ஹைட்ரஜனேற்ற வினையில் பயன்படும் வில்கின்சன் வினைவேக மாற்றி எது?",
    options: [
      { label: "A", text: "[RhCl(PPh₃)₃]" }, { label: "B", text: "cis-[Pt(NH₃)₂Cl₂]" }, { label: "C", text: "TiCl₄ + Al(C₂H₅)₃" }, { label: "D", text: "[Ni(CO)₄]" }
    ],
    optionsTamil: [
      { label: "A", text: "[RhCl(PPh₃)₃] (ரோடியம் அணைவு)" },
      { label: "B", text: "சிஸ்பிளாட்டின்" },
      { label: "C", text: "சீக்லர்-நட்டா வினைவேக மாற்றி" },
      { label: "D", text: "நிக்கல் கார்பனைல்" }
    ],
    correctAnswer: "A",
    explanation: "Wilkinson's catalyst is chloridotris(triphenylphosphine)rhodium(I) [RhCl(PPh₃)₃].",
    explanationTamil: "வில்கின்சன் வினைவேக மாற்றி [RhCl(PPh₃)₃] ஆகும்."
  },
  {
    code: "CHE-118", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "easy",
    questionText: "Cis-platin cis-[Pt(NH₃)₂Cl₂] is widely used in medicine as a/an:",
    questionTextTamil: "சிஸ்பிளாட்டின் (Cis-platin) மருத்துவத்தில் எதற்காகப் பயன்படுகிறது?",
    options: [
      { label: "A", text: "Anticancer chemotherapy drug" },
      { label: "B", text: "Analgesic" },
      { label: "C", text: "Antibiotic" },
      { label: "D", text: "Antacid" }
    ],
    optionsTamil: [
      { label: "A", text: "புற்றுநோய் எதிர்ப்பு மருந்து (Anticancer drug)" },
      { label: "B", text: "வலி நிவாரணி" },
      { label: "C", text: "நுண்ணுயிர் கொல்லி" },
      { label: "D", text: "அமிலநீக்கி" }
    ],
    correctAnswer: "A",
    explanation: "Cis-platin crosslinks DNA strands in cancer cells, arresting rapid tumor cell division.",
    explanationTamil: "சிஸ்பிளாட்டின் புற்றுநோய் கட்டிகளைக் குணப்படுத்தும் வேதிசிகிச்சை மருந்தாகப் பயன்படுகிறது."
  },
  {
    code: "CHE-119", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "hard",
    questionText: "Hybridization and magnetic nature of [Fe(CN)₆]³⁻ are:",
    questionTextTamil: "[Fe(CN)₆]³⁻ அணைவின் இனக்கலப்பு மற்றும் காந்தத்தன்மை முறையே:",
    options: [
      { label: "A", text: "d²sp³, paramagnetic with 1 unpaired electron" },
      { label: "B", text: "sp³d², diamagnetic" },
      { label: "C", text: "sp³d², paramagnetic with 5 unpaired electrons" },
      { label: "D", text: "dsp², diamagnetic" }
    ],
    optionsTamil: [
      { label: "A", text: "d²sp³ (உள் ஆர்பிட்டால்), 1 தனித்த எலக்ட்ரான் கொண்ட பாராகாந்தத்தன்மை" },
      { label: "B", text: "sp³d², டயாகாந்தத்தன்மை" },
      { label: "C", text: "sp³d², 5 தனித்த எலக்ட்ரான்கள்" },
      { label: "D", text: "dsp², டயாகாந்தத்தன்மை" }
    ],
    correctAnswer: "A",
    explanation: "Fe³⁺ is 3d⁵. Strong field ligand CN⁻ forces pairing: t₂g⁵ eg⁰, leaving 1 unpaired electron (d²sp³, paramagnetic).",
    explanationTamil: "CN⁻ வலிமைமிகு ஈனி என்பதால் எலக்ட்ரான்களை இணை சேர்த்து d²sp³ இனக்கலப்புடன் 1 தனித்த எலக்ட்ரானைக் கொண்டுள்ளது."
  },
  {
    code: "CHE-120", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "medium",
    questionText: "Optical isomerism is exhibited by which octahedral coordination complex?",
    questionTextTamil: "பின்வருவனவற்றுள் ஒளிசுழற்சி மாற்றியத்தை (Optical isomerism) வெளிப்படுத்தும் அணைவுச் சேர்மம் எது?",
    options: [
      { label: "A", text: "[Co(en)₃]³⁺" }, { label: "B", text: "[Co(NH₃)₆]³⁺" }, { label: "C", text: "trans-[Pt(NH₃)₂Cl₂]" }, { label: "D", text: "[Ni(CN)₄]²⁻" }
    ],
    optionsTamil: [
      { label: "A", text: "[Co(en)₃]³⁺ (சமச்சீரற்ற கைரல் அணைவு)" },
      { label: "B", text: "[Co(NH₃)₆]³⁺" },
      { label: "C", text: "trans-[Pt(NH₃)₂Cl₂]" },
      { label: "D", text: "[Ni(CN)₄]²⁻" }
    ],
    correctAnswer: "A",
    explanation: "Tris(ethylenediamine)cobalt(III) has non-superimposable mirror images (dextro and laevo enantiomers).",
    explanationTamil: "[Co(en)₃]³⁺ சமச்சீரற்ற மூலக்கூறு அமைப்பினால் இடஞ்சுழி மற்றும் வலஞ்சுழி ஒளி மாற்றியங்களைக் காட்டுகிறது."
  },
  {
    code: "CHE-121", subject: "Chemistry", topic: "d-Block Elements", difficulty: "easy",
    questionText: "The catalyst used in the manufacture of polyethylene (HDPE) by Ziegler-Natta process is:",
    questionTextTamil: "சீக்லர்-நட்டா முறையில் பாலிஎத்திலீன் தயாரிக்கப் பயன்படும் வினைவேக மாற்றி:",
    options: [
      { label: "A", text: "TiCl₄ + (C₂H₅)₃Al" }, { label: "B", text: "V₂O₅" }, { label: "C", text: "Fe + Mo" }, { label: "D", text: "Pt / Rh" }
    ],
    optionsTamil: [
      { label: "A", text: "TiCl₄ + (C₂H₅)₃Al (டைட்டானியம் டெட்ராகுளோரைடு + டிரைஎத்தில்அலுமினியம்)" },
      { label: "B", text: "V₂O₅" },
      { label: "C", text: "Fe + Mo" },
      { label: "D", text: "Pt / Rh" }
    ],
    correctAnswer: "A",
    explanation: "Ziegler-Natta catalyst TiCl₄ + Al(C₂H₅)₃ carries out coordination polymerization of ethene into high-density polyethylene.",
    explanationTamil: "TiCl₄ மற்றும் Al(C₂H₅)₃ கலவை உயர் அடர்த்தி பாலிஎத்திலீன் தயாரிக்கப் பயன்படுகிறது."
  },
  {
    code: "CHE-122", subject: "Chemistry", topic: "d-Block Elements", difficulty: "medium",
    questionText: "Brass is an alloy of which metals?",
    questionTextTamil: "பித்தளை (Brass) என்பது எந்த உலோகங்களின் உலோகக் கலவையாகும்?",
    options: [
      { label: "A", text: "Copper (Cu) and Zinc (Zn)" },
      { label: "B", text: "Copper (Cu) and Tin (Sn)" },
      { label: "C", text: "Copper and Nickel" },
      { label: "D", text: "Iron and Carbon" }
    ],
    optionsTamil: [
      { label: "A", text: "தாமிரம் (Cu) மற்றும் துத்தநாகம் (Zn)" },
      { label: "B", text: "தாமிரம் மற்றும் வெள்ளீயம் (வெண்கலம் - Bronze)" },
      { label: "C", text: "தாமிரம் மற்றும் நிக்கல்" },
      { label: "D", text: "இரும்பு மற்றும் கார்பன்" }
    ],
    correctAnswer: "A",
    explanation: "Brass is Cu + Zn (~60:40). Bronze is Cu + Sn (~90:10).",
    explanationTamil: "பித்தளை என்பது தாமிரம் (Cu) மற்றும் துத்தநாகம் (Zn) கலந்த கலவையாகும்."
  },
  {
    code: "CHE-123", subject: "Chemistry", topic: "p-Block Elements", difficulty: "easy",
    questionText: "Phosphine (PH₃) gas is purified and prepared by reacting calcium phosphide with:",
    questionTextTamil: "பாஸ்பீன் (PH₃) வாயு கால்சியம் பாஸ்பைடுடன் எதனை வினைப்படுத்திப் பெறப்படுகிறது?",
    options: [
      { label: "A", text: "Water (H₂O) or dilute HCl" },
      { label: "B", text: "Concentrated H₂SO₄" },
      { label: "C", text: "Liquid ammonia" },
      { label: "D", text: "Sodium hydroxide" }
    ],
    optionsTamil: [
      { label: "A", text: "நீர் அல்லது நீர்த்த HCl" },
      { label: "B", text: "அடர் கந்தக அமிலம்" },
      { label: "C", text: "திரவ அம்மோனியா" },
      { label: "D", text: "சோடியம் ஹைட்ராக்சைடு" }
    ],
    correctAnswer: "A",
    explanation: "Ca₃P₂ + 6 H₂O → 3 Ca(OH)₂ + 2 PH₃.",
    explanationTamil: "கால்சியம் பாஸ்பைடு நீருடன் வினைபுரிந்து பாஸ்பீன் வாயுவைத் தருகிறது."
  },
  {
    code: "CHE-124", subject: "Chemistry", topic: "p-Block Elements", difficulty: "medium",
    questionText: "Holme's signals used in sea navigation utilize mixture of:",
    questionTextTamil: "கடல் பயணங்களில் பயன்படும் ஹோம்ஸ் சமிக்கைகளில் (Holme's signals) பயன்படும் கலவை:",
    options: [
      { label: "A", text: "Calcium carbide (CaC₂) and Calcium phosphide (Ca₃P₂)" },
      { label: "B", text: "Sodium and Potassium" },
      { label: "C", text: "Phosphorus and Sulphur" },
      { label: "D", text: "Magnesium and Carbon" }
    ],
    optionsTamil: [
      { label: "A", text: "கால்சியம் கார்பைடு (CaC₂) மற்றும் கால்சியம் பாஸ்பைடு (Ca₃P₂)" },
      { label: "B", text: "சோடியம் மற்றும் பொட்டாசியம்" },
      { label: "C", text: "பாஸ்பரஸ் மற்றும் கந்தகம்" },
      { label: "D", text: "மெக்னீசியம் மற்றும் கார்பன்" }
    ],
    correctAnswer: "A",
    explanation: "Water reaction generates acetylene (C₂H₂) and phosphine (PH₃). Spontaneously flammable P₂H₄ ignites acetylene into a bright flame.",
    explanationTamil: "நீருடன் வினைபுரிந்து அசிட்டிலீன் மற்றும் பாஸ்பீன் வாயுக்கள் தோன்றி சுடர்விட்டு எரிகிறது."
  },
  {
    code: "CHE-125", subject: "Chemistry", topic: "Coordination Chemistry", difficulty: "easy",
    questionText: "The coordination number of cobalt in [Co(en)₃]³⁺ is:",
    questionTextTamil: "[Co(en)₃]³⁺ அணைவுச் சேர்மத்தில் கோபால்ட்டின் அணைவு எண் என்ன?",
    options: [
      { label: "A", text: "6" }, { label: "B", text: "3" }, { label: "C", text: "4" }, { label: "D", text: "12" }
    ],
    optionsTamil: [
      { label: "A", text: "6" }, { label: "B", text: "3" }, { label: "C", text: "4" }, { label: "D", text: "12" }
    ],
    correctAnswer: "A",
    explanation: "Ethylenediamine (en) is a bidentate ligand. 3 × 2 = 6 coordinate bonds.",
    explanationTamil: "ஈத்தீன் டைஅமீன் (en) ஓர் இருமுனை ஈனி என்பதால் 3 × 2 = 6 அணைவு எண் ஆகும்."
  }
];
