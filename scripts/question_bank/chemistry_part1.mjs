// scripts/question_bank/chemistry_part1.mjs
// Questions CHE-001 to CHE-075: Solid State, Solutions, Electrochemistry, Kinetics, Surface Chemistry

export const chemistryPart1 = [
  // 1-15 Solid State
  {
    code: "CHE-001", subject: "Chemistry", topic: "Solid State", difficulty: "easy",
    questionText: "The coordination number of a constituent particle in a face-centred cubic (fcc) lattice is:",
    questionTextTamil: "முகப்பு மையக் கனசதுர (fcc) அமைப்பில் உள்ள ஒரு அணுவின் அணைவு எண் யாது?",
    options: [
      { label: "A", text: "4" }, { label: "B", text: "6" }, { label: "C", text: "8" }, { label: "D", text: "12" }
    ],
    optionsTamil: [
      { label: "A", text: "4" }, { label: "B", text: "6" }, { label: "C", text: "8" }, { label: "D", text: "12" }
    ],
    correctAnswer: "D",
    explanation: "In an fcc unit cell (e.g., Cu, Al, Au), each atom touches 12 nearest neighbours, giving coordination number 12.",
    explanationTamil: "fcc அமைப்பில் ஒவ்வொரு அணுவும் 12 அருகாமை அணுக்களுடன் தொட்டுக்கொண்டிருப்பதால் அணைவு எண் 12 ஆகும்."
  },
  {
    code: "CHE-002", subject: "Chemistry", topic: "Solid State", difficulty: "medium",
    questionText: "The packing efficiency in a body-centred cubic (bcc) crystal is:",
    questionTextTamil: "பொருள் மையக் கனசதுர (bcc) படிகத்தின் பொதிவுத்திறன் எவ்வளவு?",
    options: [
      { label: "A", text: "52.4 %" }, { label: "B", text: "68 %" }, { label: "C", text: "74 %" }, { label: "D", text: "90 %" }
    ],
    optionsTamil: [
      { label: "A", text: "52.4 % (எளிய கனசதுரம்)" }, { label: "B", text: "68 %" }, { label: "C", text: "74 % (fcc / ccp)" }, { label: "D", text: "90 %" }
    ],
    correctAnswer: "B",
    explanation: "Packing efficiency: Simple cubic = 52.4%, bcc = 68%, fcc/ccp = 74%.",
    explanationTamil: "bcc அமைப்பின் பொதிவுத்திறன் 68% ஆகும் (எளிய கனசதுரம் 52.4%, fcc 74%)."
  },
  {
    code: "CHE-003", subject: "Chemistry", topic: "Solid State", difficulty: "medium",
    questionText: "Schottky defect in ionic crystals results in:",
    questionTextTamil: "அயனிப் படிகங்களில் ஏற்படும் ஷாட்கி குறைபாட்டினால் படிகத்தின்:",
    options: [
      { label: "A", text: "Decrease in density" },
      { label: "B", text: "Increase in density" },
      { label: "C", text: "No change in density" },
      { label: "D", text: "Increase in dielectric constant" }
    ],
    optionsTamil: [
      { label: "A", text: "அடர்த்தி குறைகிறது" },
      { label: "B", text: "அடர்த்தி அதிகரிக்கிறது" },
      { label: "C", text: "அடர்த்தி மாறுவதில்லை" },
      { label: "D", text: "மின்காப்பு மாறிலி அதிகரிக்கிறது" }
    ],
    correctAnswer: "A",
    explanation: "Schottky defect involves missing equal numbers of cations and anions from lattice sites, lowering density.",
    explanationTamil: "சம எண்ணிக்கையிலான நேர் மற்றும் எதிர் அயனிகள் விடுபடுவதால் படிகத்தின் அடர்த்தி குறைகிறது."
  },
  {
    code: "CHE-004", subject: "Chemistry", topic: "Solid State", difficulty: "medium",
    questionText: "Frenkel defect is commonly observed in crystals where:",
    questionTextTamil: "ஃபிரெங்கல் குறைபாடு பொதுவாக எந்தப் படிகங்களில் காணப்படுகிறது?",
    options: [
      { label: "A", text: "There is large difference in size between cation and anion (e.g., AgCl, ZnS)" },
      { label: "B", text: "Cation and anion have almost identical sizes" },
      { label: "C", text: "Coordination number is very high" },
      { label: "D", text: "Only molecular crystals" }
    ],
    optionsTamil: [
      { label: "A", text: "நேரயனி மற்றும் எதிரயனியின் உருவளவில் பெரிய வேறுபாடு இருக்கும் படிகங்களில் (எ.கா. AgCl, ZnS)" },
      { label: "B", text: "அயனிகள் ஒரே அளவுடையதாக இருக்கும்போது" },
      { label: "C", text: "அணைவு எண் மிக அதிகமாக இருக்கும்போது" },
      { label: "D", text: "மூலக்கூறு படிகங்களில் மட்டுமே" }
    ],
    correctAnswer: "A",
    explanation: "Small cation (e.g., Ag⁺, Zn²⁺) dislocates into an interstitial space without altering overall density.",
    explanationTamil: "சிறிய நேரயனி இடைச்செருகல் நிலைக்கு நகர்வதால் ஃபிரெங்கல் குறைபாடு ஏற்படுகிறது (அடர்த்தி மாறாது)."
  },
  {
    code: "CHE-005", subject: "Chemistry", topic: "Solid State", difficulty: "easy",
    questionText: "Which compound exhibits both Schottky and Frenkel defects?",
    questionTextTamil: "ஷாட்கி மற்றும் ஃபிரெங்கல் ஆகிய இரு குறைபாடுகளையும் காட்டும் சேர்மம் எது?",
    options: [
      { label: "A", text: "AgBr" }, { label: "B", text: "NaCl" }, { label: "C", text: "CsCl" }, { label: "D", text: "KCl" }
    ],
    optionsTamil: [
      { label: "A", text: "AgBr (சில்வர் புரோமைடு)" }, { label: "B", text: "NaCl" }, { label: "C", text: "CsCl" }, { label: "D", text: "KCl" }
    ],
    correctAnswer: "A",
    explanation: "Silver bromide (AgBr) uniquely displays both Schottky and Frenkel defects.",
    explanationTamil: "AgBr படிகமானது ஷாட்கி மற்றும் ஃபிரெங்கல் ஆகிய இரண்டு குறைபாடுகளையும் வெளிப்படுத்துகிறது."
  },
  {
    code: "CHE-006", subject: "Chemistry", topic: "Solid State", difficulty: "easy",
    questionText: "An example of a covalent (network) crystal is:",
    questionTextTamil: "சகப்பிணைப்பு (வலைப்பின்னல்) படிகத்திற்கு ஒரு உதாரணம்:",
    options: [
      { label: "A", text: "Diamond (C)" }, { label: "B", text: "NaCl" }, { label: "C", text: "Dry ice (CO₂)" }, { label: "D", text: "Copper (Cu)" }
    ],
    optionsTamil: [
      { label: "A", text: "வைரம் (Diamond - C)" }, { label: "B", text: "NaCl" }, { label: "C", text: "உலர் பனிக்கட்டி (CO₂)" }, { label: "D", text: "தாமிரம்" }
    ],
    correctAnswer: "A",
    explanation: "Diamond, graphite, and quartz (SiO₂) form giant 3D covalent networks.",
    explanationTamil: "வைரம், கிராஃபைட் மற்றும் குவார்ட்ஸ் ஆகியவை சகப்பிணைப்பு வலைப்பின்னல் படிகங்களாகும்."
  },
  {
    code: "CHE-007", subject: "Chemistry", topic: "Solid State", difficulty: "hard",
    questionText: "Total number of atoms in a face-centred cubic (fcc) unit cell is:",
    questionTextTamil: "முகப்பு மையக் கனசதுர (fcc) அலகுக்கூட்டில் உள்ள மொத்த அணுக்களின் எண்ணிக்கை:",
    options: [
      { label: "A", text: "4" }, { label: "B", text: "2" }, { label: "C", text: "1" }, { label: "D", text: "6" }
    ],
    optionsTamil: [
      { label: "A", text: "4" }, { label: "B", text: "2 (bcc)" }, { label: "C", text: "1 (எளிய கனசதுரம்)" }, { label: "D", text: "6" }
    ],
    correctAnswer: "A",
    explanation: "Corners: 8 × (1/8) = 1; Faces: 6 × (1/2) = 3; Total = 1 + 3 = 4 atoms.",
    explanationTamil: "மூலைகள்: 8 × (1/8) = 1; முகப்புகள்: 6 × (1/2) = 3; மொத்தம் = 4 அணுக்கள்."
  },
  {
    code: "CHE-008", subject: "Chemistry", topic: "Solid State", difficulty: "medium",
    questionText: "Total number of atoms in a body-centred cubic (bcc) unit cell is:",
    questionTextTamil: "பொருள் மையக் கனசதுர (bcc) அலகுக்கூட்டில் உள்ள அணுக்களின் எண்ணிக்கை:",
    options: [
      { label: "A", text: "2" }, { label: "B", text: "1" }, { label: "C", text: "4" }, { label: "D", text: "8" }
    ],
    optionsTamil: [
      { label: "A", text: "2" }, { label: "B", text: "1" }, { label: "C", text: "4" }, { label: "D", text: "8" }
    ],
    correctAnswer: "A",
    explanation: "Corners: 8 × (1/8) = 1; Body centre: 1; Total = 2 atoms.",
    explanationTamil: "மூலைகள்: 8 × (1/8) = 1; மையம்: 1; மொத்தம் = 2 அணுக்கள்."
  },
  {
    code: "CHE-009", subject: "Chemistry", topic: "Solid State", difficulty: "easy",
    questionText: "Bragg's equation for X-ray diffraction by crystal planes is:",
    questionTextTamil: "படிகத் தளங்களில் எக்ஸ் கதிர் விளிம்பு விளைவுக்கான பிராக் சமன்பாடு யாது?",
    options: [
      { label: "A", text: "2 d sin θ = n λ" }, { label: "B", text: "d sin θ = 2 n λ" }, { label: "C", text: "2 d cos θ = n λ" }, { label: "D", text: "d / sin θ = n λ" }
    ],
    optionsTamil: [
      { label: "A", text: "2 d sin θ = n λ" }, { label: "B", text: "d sin θ = 2 n λ" }, { label: "C", text: "2 d cos θ = n λ" }, { label: "D", text: "d / sin θ = n λ" }
    ],
    correctAnswer: "A",
    explanation: "Bragg's Law: 2 d sin θ = n λ.",
    explanationTamil: "பிராக் சமன்பாடு 2 d sin θ = n λ ஆகும்."
  },
  {
    code: "CHE-010", subject: "Chemistry", topic: "Solid State", difficulty: "medium",
    questionText: "The yellow colour of NaCl crystals heated in sodium vapour is due to:",
    questionTextTamil: "சோடியம் ஆவியில் சூடுபடுத்தப்பட்ட NaCl படிகம் மஞ்சள் நிறமடையக் காரணம்:",
    options: [
      { label: "A", text: "F-centres (anionic vacancies trapped by electrons)" },
      { label: "B", text: "Schottky defect" },
      { label: "C", text: "Frenkel defect" },
      { label: "D", text: "Doping with calcium" }
    ],
    optionsTamil: [
      { label: "A", text: "F-மையங்கள் (எலக்ட்ரானால் நிரப்பப்பட்ட எதிர் அயனி வெற்றிடம்)" },
      { label: "B", text: "ஷாட்கி குறைபாடு" },
      { label: "C", text: "ஃபிரெங்கல் குறைபாடு" },
      { label: "D", text: "கால்சியம் மாசு" }
    ],
    correctAnswer: "A",
    explanation: "Electrons trapped in anion vacancies (F-centres or Farbe centres) absorb visible light, giving yellow colour.",
    explanationTamil: "எதிர் அயனி வெற்றிடத்தில் சிக்கும் எலக்ட்ரான்கள் (F-மையங்கள்) ஒளியை உறிஞ்சி மஞ்சள் நிறத்தைத் தருகின்றன."
  },
  {
    code: "CHE-011", subject: "Chemistry", topic: "Solid State", difficulty: "easy",
    questionText: "Glass is classified as a/an:",
    questionTextTamil: "கண்ணாடி எந்த வகையான திண்மமாக வகைப்படுத்தப்படுகிறது?",
    options: [
      { label: "A", text: "Pseudo solid or supercooled liquid (amorphous)" },
      { label: "B", text: "Crystalline solid" },
      { label: "C", text: "Ionic crystal" },
      { label: "D", text: "Metallic solid" }
    ],
    optionsTamil: [
      { label: "A", text: "போலித் திண்மம் அல்லது மீகுளிர்ந்த திரவம் (வடிவமற்ற திண்மம்)" },
      { label: "B", text: "படிக வடிவத் திண்மம்" },
      { label: "C", text: "அயனிப் படிகம்" },
      { label: "D", text: "உலோகத் திண்மம்" }
    ],
    correctAnswer: "A",
    explanation: "Glass has short-range order only and flows slowly over years like a supercooled liquid.",
    explanationTamil: "கண்ணாடி ஒரு படிக உருவமற்ற போலித் திண்மம் அல்லது மிகைக்குளிர்வடைந்த திரவமாகும்."
  },
  {
    code: "CHE-012", subject: "Chemistry", topic: "Solid State", difficulty: "medium",
    questionText: "Ferromagnetic substances retain magnetism after removing magnetic field. An example is:",
    questionTextTamil: "காந்தப்புலத்தை நீக்கிய பிறகும் காந்தத்தன்மையை தக்கவைத்துக்கொள்ளும் ஃபெர்ரோ காந்தப்பொருளுக்கு உதாரணம்:",
    options: [
      { label: "A", text: "Iron (Fe)" }, { label: "B", text: "NaCl" }, { label: "C", text: "Benzene" }, { label: "D", text: "Water" }
    ],
    optionsTamil: [
      { label: "A", text: "இரும்பு (Iron - Fe)" }, { label: "B", text: "NaCl" }, { label: "C", text: "பென்சீன்" }, { label: "D", text: "நீர்" }
    ],
    correctAnswer: "A",
    explanation: "Fe, Co, Ni, and CrO₂ are strongly ferromagnetic due to spontaneous domain alignment.",
    explanationTamil: "இரும்பு, கோபால்ட், நிக்கல் ஆகியவை சிறந்த ஃபெர்ரோ காந்தப் பொருட்களாகும்."
  },
  {
    code: "CHE-013", subject: "Chemistry", topic: "Solid State", difficulty: "hard",
    questionText: "In a face-centred cubic lattice with edge length a, the atomic radius r is:",
    questionTextTamil: "விளிம்பு நீளம் a கொண்ட fcc படிகத்தில் அணு ஆரம் r எதற்கு சமம்?",
    options: [
      { label: "A", text: "a / (2 √2)" }, { label: "B", text: "(√3 a) / 4" }, { label: "C", text: "a / 2" }, { label: "D", text: "√2 a" }
    ],
    optionsTamil: [
      { label: "A", text: "a / (2 √2)" }, { label: "B", text: "(√3 a) / 4 (bcc)" }, { label: "C", text: "a / 2 (எளிய கனசதுரம்)" }, { label: "D", text: "√2 a" }
    ],
    correctAnswer: "A",
    explanation: "Across face diagonal: 4r = √2 a => r = √2 a / 4 = a / (2√2).",
    explanationTamil: "முகப்பு மூலைவிட்டம் வழியே 4r = √2 a => r = a / (2√2)."
  },
  {
    code: "CHE-014", subject: "Chemistry", topic: "Solid State", difficulty: "easy",
    questionText: "How many Bravais space lattices are there in three dimensions?",
    questionTextTamil: "முப்பரிமாணத்தில் எத்தனை பிராவே படிக அமைப்புகள் (Bravais lattices) உள்ளன?",
    options: [
      { label: "A", text: "14" }, { label: "B", text: "7" }, { label: "C", text: "32" }, { label: "D", text: "230" }
    ],
    optionsTamil: [
      { label: "A", text: "14" }, { label: "B", text: "7 (படிக அமைப்புகள்)" }, { label: "C", text: "32" }, { label: "D", text: "230" }
    ],
    correctAnswer: "A",
    explanation: "There are 7 crystal systems and exactly 14 Bravais lattices in 3D.",
    explanationTamil: "7 படிக அமைப்புகளின் கீழ் 14 பிராவே இடவமைப்பு கூட்டமைப்புகள் உள்ளன."
  },
  {
    code: "CHE-015", subject: "Chemistry", topic: "Solid State", difficulty: "medium",
    questionText: "Anisotropy (different physical properties in different directions) is a characteristic of:",
    questionTextTamil: "வெவ்வேறு திசைகளில் வெவ்வேறு இயற்பியல் பண்புகளைக் கொண்டிருக்கும் திசையொவ்வாப் பண்பு (Anisotropy) எதன் சிறப்பியல்பு?",
    options: [
      { label: "A", text: "Crystalline solids" }, { label: "B", text: "Amorphous solids" }, { label: "C", text: "Liquids" }, { label: "D", text: "Gases" }
    ],
    optionsTamil: [
      { label: "A", text: "படிக வடிவத் திண்மங்கள் (Crystalline solids)" }, { label: "B", text: "வடிவமற்ற திண்மங்கள்" }, { label: "C", text: "திரவங்கள்" }, { label: "D", text: "வாயுக்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Crystalline solids have long-range ordered arrangements resulting in anisotropic optical and electrical properties.",
    explanationTamil: "படிகத் திண்மங்கள் ஒழுங்கான அமைப்பால் திசையொவ்வாப் பண்பைப் பெற்றுள்ளன."
  },

  // 16-30 Solutions & Colligative Properties
  {
    code: "CHE-016", subject: "Chemistry", topic: "Solutions", difficulty: "easy",
    questionText: "Henry's law constant K_H for solubility of gases in liquids:",
    questionTextTamil: "திரவங்களில் வாயுக்களின் கரைதிறனுக்கான ஹென்றி விதி மாறிலி K_H:",
    options: [
      { label: "A", text: "Increases with increase in temperature, decreasing solubility" },
      { label: "B", text: "Decreases with temperature" },
      { label: "C", text: "Remains constant" },
      { label: "D", text: "Is zero for all gases" }
    ],
    optionsTamil: [
      { label: "A", text: "வெப்பநிலை அதிகரிக்கும் போது அதிகரிக்கிறது (கரைதிறன் குறைகிறது)" },
      { label: "B", text: "வெப்பநிலையுடன் குறைகிறது" },
      { label: "C", text: "மாறாது" },
      { label: "D", text: "சுழி" }
    ],
    correctAnswer: "A",
    explanation: "P = K_H * x. Higher K_H at higher temperatures means lower gas solubility, explaining why aquatic species prefer cold water.",
    explanationTamil: "வெப்பநிலை கூடும் போது K_H உயர்ந்து வாயுக்களின் கரைதிறன் குறைகிறது."
  },
  {
    code: "CHE-017", subject: "Chemistry", topic: "Solutions", difficulty: "easy",
    questionText: "Which concentration unit does NOT depend on temperature?",
    questionTextTamil: "வெப்பநிலையைச் சாராத செறிவு முறை எது?",
    options: [
      { label: "A", text: "Molality and mole fraction" },
      { label: "B", text: "Molarity" },
      { label: "C", text: "Normality" },
      { label: "D", text: "Formality" }
    ],
    optionsTamil: [
      { label: "A", text: "மோலாலிட்டி (Molality) மற்றும் மோல் பின்னம்" },
      { label: "B", text: "மோலாரிட்டி" },
      { label: "C", text: "நார்மாலிட்டி" },
      { label: "D", text: "ஃபார்மாலிட்டி" }
    ],
    correctAnswer: "A",
    explanation: "Molality and mole fraction are based on mass (which does not expand with temperature), unlike volume-dependent molarity.",
    explanationTamil: "மோலாலிட்டி நிறையை அடிப்படையாகக் கொண்டதால் வெப்பநிலையைச் சார்ந்திருக்காது."
  },
  {
    code: "CHE-018", subject: "Chemistry", topic: "Solutions", difficulty: "medium",
    questionText: "An ideal solution obeys Raoult's law over all concentrations and satisfies:",
    questionTextTamil: "ரவுல்ட் விதிக்கு முழுமையாகக் கட்டுப்படும் நல்லியல்பு கரைசலில்:",
    options: [
      { label: "A", text: "ΔH_mixing = 0 and ΔV_mixing = 0" },
      { label: "B", text: "ΔH_mixing > 0 and ΔV_mixing > 0" },
      { label: "C", text: "ΔH_mixing < 0 and ΔV_mixing < 0" },
      { label: "D", text: "ΔS_mixing = 0" }
    ],
    optionsTamil: [
      { label: "A", text: "ΔH_mixing = 0 மற்றும் ΔV_mixing = 0" },
      { label: "B", text: "ΔH_mixing > 0 மற்றும் ΔV_mixing > 0" },
      { label: "C", text: "ΔH_mixing < 0 மற்றும் ΔV_mixing < 0" },
      { label: "D", text: "ΔS_mixing = 0" }
    ],
    correctAnswer: "A",
    explanation: "For ideal solutions (e.g. benzene + toluene), enthalpy and volume change of mixing are both zero.",
    explanationTamil: "நல்லியல்பு கரைசல்களில் கலக்கும் போது வெப்பமாற்றம் மற்றும் பருமன் மாற்றம் இரண்டும் சுழியாகும்."
  },
  {
    code: "CHE-019", subject: "Chemistry", topic: "Solutions", difficulty: "medium",
    questionText: "A solution of Ethanol and Acetone exhibits:",
    questionTextTamil: "எத்தனால் மற்றும் அசிட்டோன் கலந்த கரைசல் வெளிப்படுத்துவது:",
    options: [
      { label: "A", text: "Positive deviation from Raoult's law" },
      { label: "B", text: "Negative deviation from Raoult's law" },
      { label: "C", text: "Ideal behaviour" },
      { label: "D", text: "Zero vapour pressure" }
    ],
    optionsTamil: [
      { label: "A", text: "ரவுல்ட் விதியிலிருந்து நேர் விலகல் (Positive deviation)" },
      { label: "B", text: "எதிர் விலகல்" },
      { label: "C", text: "நல்லியல்பு தன்மை" },
      { label: "D", text: "சுழி ஆவி அழுத்தம்" }
    ],
    correctAnswer: "A",
    explanation: "Acetone molecules disrupt hydrogen bonding between ethanol molecules, increasing vapour pressure (positive deviation).",
    explanationTamil: "அசிட்டோன் எத்தனாலின் ஹைட்ரஜன் பிணைப்பை பலவீனப்படுத்துவதால் ஆவி அழுத்தம் அதிகரித்து நேர் விலகல் தோன்றுகிறது."
  },
  {
    code: "CHE-020", subject: "Chemistry", topic: "Solutions", difficulty: "medium",
    questionText: "A solution of Chloroform and Acetone exhibits negative deviation from Raoult's law because:",
    questionTextTamil: "குளோரோஃபார்ம் மற்றும் அசிட்டோன் கரைசல் ரவுல்ட் விதியிலிருந்து எதிர் விலகலைக் காட்டக் காரணம்:",
    options: [
      { label: "A", text: "Intermolecular hydrogen bonding forms between them" },
      { label: "B", text: "They repel each other" },
      { label: "C", text: "Volume increases on mixing" },
      { label: "D", text: "Enthalpy increases on mixing" }
    ],
    optionsTamil: [
      { label: "A", text: "அவற்றிற்கு இடையே மூலக்கூறுகளுக்கிடையேயான ஹைட்ரஜன் பிணைப்பு உருவாகிறது" },
      { label: "B", text: "ஒன்றையொன்று விலக்குகின்றன" },
      { label: "C", text: "பருமன் அதிகரிக்கிறது" },
      { label: "D", text: "வெப்பம் உறிஞ்சப்படுகிறது" }
    ],
    correctAnswer: "A",
    explanation: "Cl₃C-H ··· O=C(CH₃)₂ hydrogen bond forms, lowering escape tendency and vapour pressure.",
    explanationTamil: "அசிட்டோன் மற்றும் குளோரோஃபார்ம் இடையே புதிய ஹைட்ரஜன் பிணைப்பு உருவாகி ஆவி அழுத்தம் குறைகிறது."
  },
  {
    code: "CHE-021", subject: "Chemistry", topic: "Solutions", difficulty: "easy",
    questionText: "Which of the following is NOT a colligative property?",
    questionTextTamil: "பின்வருவனவற்றுள் எது தொகைசார் பண்பு (Colligative property) அல்ல?",
    options: [
      { label: "A", text: "Optical activity" },
      { label: "B", text: "Relative lowering of vapour pressure" },
      { label: "C", text: "Elevation of boiling point" },
      { label: "D", text: "Osmotic pressure" }
    ],
    optionsTamil: [
      { label: "A", text: "ஒளிசுழற்றும் பண்பு (Optical activity)" },
      { label: "B", text: "ஒப்பு ஆவி அழுத்தக் குறைவு" },
      { label: "C", text: "கொதிநிலை ஏற்றம்" },
      { label: "D", text: "சவ்வூடுபரவல் அழுத்தம்" }
    ],
    correctAnswer: "A",
    explanation: "Colligative properties depend only on number of solute particles. Optical activity depends on molecular structure.",
    explanationTamil: "ஒளிசுழற்றும் திறன் மூலக்கூறு அமைப்பைச் சார்ந்தது, துகள்களின் எண்ணிக்கையை மட்டுமே சார்ந்த தொகைசார் பண்பு அல்ல."
  },
  {
    code: "CHE-022", subject: "Chemistry", topic: "Solutions", difficulty: "easy",
    questionText: "Osmotic pressure Π of a dilute solution is given by van 't Hoff equation:",
    questionTextTamil: "வான்ட் ஹாஃப் சமன்பாட்டின்படி சவ்வூடுபரவல் அழுத்தம் Π எதற்கு சமம்?",
    options: [
      { label: "A", text: "Π = C R T" }, { label: "B", text: "Π = C / (R T)" }, { label: "C", text: "Π = R T / C" }, { label: "D", text: "Π = C² R T" }
    ],
    optionsTamil: [
      { label: "A", text: "Π = C R T" }, { label: "B", text: "Π = C / (R T)" }, { label: "C", text: "Π = R T / C" }, { label: "D", text: "Π = C² R T" }
    ],
    correctAnswer: "A",
    explanation: "Π = (n/V) R T = C R T where C is molarity.",
    explanationTamil: "சவ்வூடுபரவல் அழுத்தம் Π = C R T ஆகும்."
  },
  {
    code: "CHE-023", subject: "Chemistry", topic: "Solutions", difficulty: "medium",
    questionText: "Reverse osmosis is widely used for desalination of seawater by applying pressure:",
    questionTextTamil: "கடல்நீரை குடிநீராக்கும் எதிர் சவ்வூடுபரவல் முறையில் பயன்படுத்தப்படும் அழுத்தம்:",
    options: [
      { label: "A", text: "Greater than osmotic pressure on the saline water side" },
      { label: "B", text: "Equal to atmospheric pressure" },
      { label: "C", text: "Less than osmotic pressure" },
      { label: "D", text: "Zero pressure" }
    ],
    optionsTamil: [
      { label: "A", text: "உப்புநீர் பகுதியில் சவ்வூடுபரவல் அழுத்தத்தை விட அதிக அழுத்தம் செலுத்தப்படும் போது" },
      { label: "B", text: "வளிமண்டல அழுத்தத்திற்கு சமமாக" },
      { label: "C", text: "சவ்வூடுபரவல் அழுத்தத்தை விட குறைவாக" },
      { label: "D", text: "அழுத்தமின்றி" }
    ],
    correctAnswer: "A",
    explanation: "Applying hydrostatic pressure P > Π reverses solvent flow through semipermeable membrane from solution to pure water.",
    explanationTamil: "சவ்வூடுபரவல் அழுத்தத்தை விட அதிக அழுத்தம் செலுத்தப்பட்டு தூய நீர் சவ்வின் வழியே பிரிக்கப்படுகிறது."
  },
  {
    code: "CHE-024", subject: "Chemistry", topic: "Solutions", difficulty: "hard",
    questionText: "van 't Hoff factor i for complete dissociation of BaCl₂ in aqueous solution is:",
    questionTextTamil: "BaCl₂ நீரில் முழுமையாக அயனியுறும்போது அதன் வான்ட் ஹாஃப் காரணி i மதிப்பு:",
    options: [
      { label: "A", text: "3" }, { label: "B", text: "2" }, { label: "C", text: "1" }, { label: "D", text: "4" }
    ],
    optionsTamil: [
      { label: "A", text: "3" }, { label: "B", text: "2" }, { label: "C", text: "1" }, { label: "D", text: "4" }
    ],
    correctAnswer: "A",
    explanation: "BaCl₂ → Ba²⁺ + 2 Cl⁻ produces 1 + 2 = 3 ions, so i = 3.",
    explanationTamil: "BaCl₂ சிதைந்து 1 Ba²⁺ + 2 Cl⁻ என 3 அயனிகளைத் தருவதால் i = 3."
  },
  {
    code: "CHE-025", subject: "Chemistry", topic: "Solutions", difficulty: "medium",
    questionText: "When acetic acid is dissolved in benzene, it undergoes dimerization, resulting in van 't Hoff factor i:",
    questionTextTamil: "பென்சீனில் அசிட்டிக் அமிலம் இரட்டையாக (dimer) மாறும் போது அதன் வான்ட் ஹாஃப் காரணி i மதிப்பு:",
    options: [
      { label: "A", text: "i ≈ 0.5" }, { label: "B", text: "i = 2" }, { label: "C", text: "i = 1" }, { label: "D", text: "i = 0" }
    ],
    optionsTamil: [
      { label: "A", text: "i ≈ 0.5 (1-ஐ விடக் குறைவு)" }, { label: "B", text: "i = 2" }, { label: "C", text: "i = 1" }, { label: "D", text: "i = 0" }
    ],
    correctAnswer: "A",
    explanation: "2 CH₃COOH ⇌ (CH₃COOH)₂ via hydrogen bonding reduces particle count by half, so i < 1 (i ≈ 0.5).",
    explanationTamil: "இரு மூலக்கூறுகள் இணைந்து ஒரு மூலக்கூறாக மாறுவதால் துகள்கள் பாதியாகி i ≈ 0.5 ஆகிறது."
  },

  // 26-45 Electrochemistry
  {
    code: "CHE-026", subject: "Chemistry", topic: "Electrochemistry", difficulty: "easy",
    questionText: "The standard reduction potential of Standard Hydrogen Electrode (SHE) is assigned as:",
    questionTextTamil: "திட்ட ஹைட்ரஜன் மின்முனையின் (SHE) திட்ட ஒடுக்க மின்னழுத்தம் எவ்வளவாகக் கொள்ளப்படுகிறது?",
    options: [
      { label: "A", text: "0.00 V" }, { label: "B", text: "1.00 V" }, { label: "C", text: "-0.76 V" }, { label: "D", text: "+0.34 V" }
    ],
    optionsTamil: [
      { label: "A", text: "0.00 V" }, { label: "B", text: "1.00 V" }, { label: "C", text: "-0.76 V" }, { label: "D", text: "+0.34 V" }
    ],
    correctAnswer: "A",
    explanation: "SHE is the universal reference electrode defined to have E° = 0.00 V at all temperatures.",
    explanationTamil: "திட்ட ஹைட்ரஜன் மின்முனையின் மின்னழுத்தம் திட்ட அளவாக 0.00 V எனக் கொள்ளப்படுகிறது."
  },
  {
    code: "CHE-027", subject: "Chemistry", topic: "Electrochemistry", difficulty: "medium",
    questionText: "Nernst equation for single electrode potential E at 298 K is:",
    questionTextTamil: "298 K-ல் ஒற்றை மின்முனை மின்னழுத்தத்திற்கான நெர்ன்ஸ்ட் சமன்பாடு:",
    options: [
      { label: "A", text: "E = E° - (0.0591 / n) log [Red] / [Ox]" },
      { label: "B", text: "E = E° + (0.0591 / n) log [Red]" },
      { label: "C", text: "E = E° * (0.0591 / n)" },
      { label: "D", text: "E = E° - (n / 0.0591) log Q" }
    ],
    optionsTamil: [
      { label: "A", text: "E = E° - (0.0591 / n) log Q" },
      { label: "B", text: "E = E° + (0.0591 / n) log [Red]" },
      { label: "C", text: "E = E° * (0.0591 / n)" },
      { label: "D", text: "E = E° - (n / 0.0591) log Q" }
    ],
    correctAnswer: "A",
    explanation: "Nernst equation: E = E° - (2.303 RT / nF) log Q = E° - (0.0591 / n) log Q at 25°C.",
    explanationTamil: "நெர்ன்ஸ்ட் சமன்பாடு E = E° - (0.0591 / n) log Q ஆகும்."
  },
  {
    code: "CHE-028", subject: "Chemistry", topic: "Electrochemistry", difficulty: "medium",
    questionText: "Kohlrausch's law of independent migration of ions states that at infinite dilution:",
    questionTextTamil: "முடிவிலா நீர்த்தலில் கோல்ராஷ் விதியின்படி ஒரு மின்பகுளியின் மோலார் கடத்துத்திறன்:",
    options: [
      { label: "A", text: "Λ°_m is sum of individual contributions of cation and anion" },
      { label: "B", text: "Conductance becomes zero" },
      { label: "C", text: "Resistance becomes infinite" },
      { label: "D", text: "Solvent decomposes" }
    ],
    optionsTamil: [
      { label: "A", text: "Λ°_m என்பது நேரயனி மற்றும் எதிரயனிகளின் மோலார் கடத்துத்திறன்களின் கூடுதலுக்கு சமம்" },
      { label: "B", text: "கடத்துத்திறன் சுழியாகும்" },
      { label: "C", text: "மின்தடை முடிவிலியாகும்" },
      { label: "D", text: "கரைப்பான் சிதைகிறது" }
    ],
    correctAnswer: "A",
    explanation: "Λ°_m = ν₊ λ°₊ + ν₋ λ°₋.",
    explanationTamil: "கோல்ராஷ் விதிப்படி Λ°_m = ν₊ λ°₊ + ν₋ λ°₋ ஆகும்."
  },
  {
    code: "CHE-029", subject: "Chemistry", topic: "Electrochemistry", difficulty: "easy",
    questionText: "Faraday's first law of electrolysis states that mass m deposited at an electrode is proportional to:",
    questionTextTamil: "பாரடேயின் முதல் மின்னாற்பகுப்பு விதிப்படி படியும் பொருளின் நிறை m எதற்கு நேர்தகவில் அமையும்?",
    options: [
      { label: "A", text: "Quantity of electric charge Q passed (m = Z Q = Z I t)" },
      { label: "B", text: "Voltage applied" },
      { label: "C", text: "Resistance of solution" },
      { label: "D", text: "Temperature of cell" }
    ],
    optionsTamil: [
      { label: "A", text: "சுற்றில் பாய்ந்த மின்னூட்டத்தின் அளவு Q (m = Z I t)" },
      { label: "B", text: "மின்னழுத்தம்" },
      { label: "C", text: "மின்தடை" },
      { label: "D", text: "வெப்பநிலை" }
    ],
    correctAnswer: "A",
    explanation: "m = Z * Q = Z * I * t where Z is electrochemical equivalent.",
    explanationTamil: "படியும் நிறை m = Z * I * t பாயும் மின்னூட்டத்திற்கு நேர்தகவில் அமையும்."
  },
  {
    code: "CHE-030", subject: "Chemistry", topic: "Electrochemistry", difficulty: "easy",
    questionText: "Rusting of iron is chemically an electrochemical process involving formation of:",
    questionTextTamil: "இரும்பு துருப்பிடித்தல் என்பது வேதியியல் ரீதியாக எதனை உருவாக்கும் மின்வேதி வினையாகும்?",
    options: [
      { label: "A", text: "Hydrated ferric oxide (Fe₂O₃ · xH₂O)" },
      { label: "B", text: "FeO" },
      { label: "C", text: "FeCO₃" },
      { label: "D", text: "FeCl₃" }
    ],
    optionsTamil: [
      { label: "A", text: "நீரேறிய ஃபெர்ரிக் ஆக்சைடு (Fe₂O₃ · xH₂O)" },
      { label: "B", text: "FeO" },
      { label: "C", text: "FeCO₃" },
      { label: "D", text: "FeCl₃" }
    ],
    correctAnswer: "A",
    explanation: "Rust is hydrated ferric oxide Fe₂O₃ · xH₂O formed by electrochemical oxidation of iron in presence of O₂ and moisture.",
    explanationTamil: "துரு என்பது நீரேறிய ஃபெர்ரிக் ஆக்சைடு Fe₂O₃ · xH₂O ஆகும்."
  },
  {
    code: "CHE-031", subject: "Chemistry", topic: "Electrochemistry", difficulty: "easy",
    questionText: "Sacrificial protection (galvanization) of iron is carried out by coating it with:",
    questionTextTamil: "இரும்பை துருப்பிடிக்காமல் பாதுகாக்க துத்தநாகப் பூச்சு (Galvanization) எதனால் பூசப்படுகிறது?",
    options: [
      { label: "A", text: "Zinc (Zn)" }, { label: "B", text: "Copper (Cu)" }, { label: "C", text: "Nickel (Ni)" }, { label: "D", text: "Silver (Ag)" }
    ],
    optionsTamil: [
      { label: "A", text: "துத்தநாகம் (Zinc - Zn)" }, { label: "B", text: "தாமிரம்" }, { label: "C", text: "நிக்கல்" }, { label: "D", text: "வெள்ளி" }
    ],
    correctAnswer: "A",
    explanation: "Zinc has more negative reduction potential than iron (E° = -0.76 V vs -0.44 V) and oxidizes preferentially.",
    explanationTamil: "இரும்பை விட துத்தநாகம் அதிக வினைதிறன் கொண்டு தியாக மின்முனையாக செயல்பட்டு இரும்பைப் பாதுகாக்கிறது."
  },
  {
    code: "CHE-032", subject: "Chemistry", topic: "Electrochemistry", difficulty: "medium",
    questionText: "In a lead-acid storage battery during discharging, which compound is deposited on both electrodes?",
    questionTextTamil: "லெட்-அமில சேம மின்கலம் மின்னிறக்கம் அடையும் போது இரு மின்முனைகளிலும் படியும் சேர்மம்:",
    options: [
      { label: "A", text: "PbSO₄" }, { label: "B", text: "PbO₂" }, { label: "C", text: "Pb" }, { label: "D", text: "PbS" }
    ],
    optionsTamil: [
      { label: "A", text: "PbSO₄ (லெட் சல்பேட்)" }, { label: "B", text: "PbO₂" }, { label: "C", text: "Pb" }, { label: "D", text: "PbS" }
    ],
    correctAnswer: "A",
    explanation: "Discharging converts Pb (anode) and PbO₂ (cathode) both into solid PbSO₄, consuming H₂SO₄.",
    explanationTamil: "மின்னிறக்கத்தின் போது நேர்மின்வாய் மற்றும் எதிர்மின்வாய் இரண்டிலும் PbSO₄ படிகிறது."
  },
  {
    code: "CHE-033", subject: "Chemistry", topic: "Electrochemistry", difficulty: "easy",
    questionText: "Fuel cells directly convert chemical energy of fuels into electrical energy with high efficiency. A common example is:",
    questionTextTamil: "எரிபொருளின் வேதி ஆற்றலை நேரடியாக மின்னாற்றலாக மாற்றும் எரிபொருள் மின்கலத்திற்கு சிறந்த உதாரணம்:",
    options: [
      { label: "A", text: "H₂ - O₂ fuel cell (Apollo space mission)" },
      { label: "B", text: "Daniell cell" },
      { label: "C", text: "Leclanché cell" },
      { label: "D", text: "Dry cell" }
    ],
    optionsTamil: [
      { label: "A", text: "H₂ - O₂ எரிபொருள் மின்கலம்" },
      { label: "B", text: "டேனியல் மின்கலம்" },
      { label: "C", text: "லெக்லாஞ்சி மின்கலம்" },
      { label: "D", text: "உலர் மின்கலம்" }
    ],
    correctAnswer: "A",
    explanation: "Hydrogen-oxygen fuel cell produces water with ~70% efficiency and was used in Apollo spacecraft.",
    explanationTamil: "அப்பல்லோ விண்கலத்தில் பயன்படுத்தப்பட்ட H₂ - O₂ மின்கலம் சுமார் 70% உயர் பயனுறு திறன் கொண்டது."
  },
  {
    code: "CHE-034", subject: "Chemistry", topic: "Electrochemistry", difficulty: "medium",
    questionText: "The standard Gibbs free energy change ΔG° of a cell reaction is related to cell EMF E° by:",
    questionTextTamil: "திட்ட கிப்ஸ் கட்டிலா ஆற்றல் மாற்றம் ΔG° மற்றும் மின்கல மின்னழுத்தம் E° இடையிலான தொடர்பு:",
    options: [
      { label: "A", text: "ΔG° = - n F E°" }, { label: "B", text: "ΔG° = + n F E°" }, { label: "C", text: "ΔG° = - E° / (n F)" }, { label: "D", text: "ΔG° = - n F / E°" }
    ],
    optionsTamil: [
      { label: "A", text: "ΔG° = - n F E°" }, { label: "B", text: "ΔG° = + n F E°" }, { label: "C", text: "ΔG° = - E° / (n F)" }, { label: "D", text: "ΔG° = - n F / E°" }
    ],
    correctAnswer: "A",
    explanation: "ΔG° = - n F E°. Spontaneous cell reactions have positive E° and negative ΔG°.",
    explanationTamil: "ΔG° = - n F E° ஆகும் (தன்னிச்சை வினைகளுக்கு E° நேர்மதிப்பும் ΔG° எதிர்மதிப்பும் பெறும்)."
  },
  {
    code: "CHE-035", subject: "Chemistry", topic: "Electrochemistry", difficulty: "hard",
    questionText: "If E° of Cu²⁺/Cu is +0.34 V and Zn²⁺/Zn is -0.76 V, standard EMF of Daniell cell is:",
    questionTextTamil: "Cu²⁺/Cu-ன் E° = +0.34 V மற்றும் Zn²⁺/Zn-ன் E° = -0.76 V எனில் டேனியல் மின்கலத்தின் திட்ட EMF:",
    options: [
      { label: "A", text: "+1.10 V" }, { label: "B", text: "+0.42 V" }, { label: "C", text: "-1.10 V" }, { label: "D", text: "+0.90 V" }
    ],
    optionsTamil: [
      { label: "A", text: "+1.10 V" }, { label: "B", text: "+0.42 V" }, { label: "C", text: "-1.10 V" }, { label: "D", text: "+0.90 V" }
    ],
    correctAnswer: "A",
    explanation: "E°_cell = E°_cathode - E°_anode = +0.34 - (-0.76) = +1.10 V.",
    explanationTamil: "E°_cell = E°_cathode - E°_anode = +0.34 - (-0.76) = +1.10 V."
  },

  // 36-50 Chemical Kinetics
  {
    code: "CHE-036", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "easy",
    questionText: "The unit of rate constant k for a first-order reaction is:",
    questionTextTamil: "முதல் வகை வினைக்கான வினைவேக மாறிலி k-ன் அலகு யாது?",
    options: [
      { label: "A", text: "s⁻¹ (time⁻¹)" }, { label: "B", text: "mol L⁻¹ s⁻¹" }, { label: "C", text: "L mol⁻¹ s⁻¹" }, { label: "D", text: "L² mol⁻² s⁻¹" }
    ],
    optionsTamil: [
      { label: "A", text: "s⁻¹ (வினாடி⁻¹)" }, { label: "B", text: "mol L⁻¹ s⁻¹ (சுழி வகை)" }, { label: "C", text: "L mol⁻¹ s⁻¹ (இரண்டாம் வகை)" }, { label: "D", text: "L² mol⁻² s⁻¹" }
    ],
    correctAnswer: "A",
    explanation: "For nth order, unit is (mol/L)^(1-n) s⁻¹. For n=1, unit is s⁻¹.",
    explanationTamil: "முதல் வகை வினையில் k-ன் அலகு வினாடி⁻¹ (s⁻¹) ஆகும்."
  },
  {
    code: "CHE-037", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "easy",
    questionText: "The half-life period t_(1/2) of a first-order reaction is:",
    questionTextTamil: "முதல் வகை வினையின் அரை ஆயுட்காலம் t_(1/2):",
    options: [
      { label: "A", text: "Independent of initial concentration: t_(1/2) = 0.693 / k" },
      { label: "B", text: "Directly proportional to initial concentration" },
      { label: "C", text: "Inversely proportional to initial concentration" },
      { label: "D", text: "Proportional to square of initial concentration" }
    ],
    optionsTamil: [
      { label: "A", text: "தொடக்க செறிவைச் சார்ந்திராது: t_(1/2) = 0.693 / k" },
      { label: "B", text: "தொடக்க செறிவுக்கு நேர்தகவில் அமையும்" },
      { label: "C", text: "தொடக்க செறிவுக்கு எதிர்த்தகவில் அமையும்" },
      { label: "D", text: "செறிவின் இருமடிக்கு நேர்தகவு" }
    ],
    correctAnswer: "A",
    explanation: "t_(1/2) = 0.693 / k, completely independent of initial reactant concentration [A]₀.",
    explanationTamil: "முதல் வகை வினையின் அரை ஆயுட்காலம் t_(1/2) = 0.693 / k தொடக்க செறிவைச் சார்ந்திராது."
  },
  {
    code: "CHE-038", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "medium",
    questionText: "Arrhenius equation showing temperature dependence of rate constant is:",
    questionTextTamil: "வினைவேக மாறிலியின் வெப்பநிலை சார்ந்த ஆர்ஹீனியஸ் சமன்பாடு:",
    options: [
      { label: "A", text: "k = A e^(-Ea / RT)" }, { label: "B", text: "k = A e^(+Ea / RT)" }, { label: "C", text: "k = A / (RT)" }, { label: "D", text: "k = A ln(Ea / RT)" }
    ],
    optionsTamil: [
      { label: "A", text: "k = A e^(-Ea / RT)" }, { label: "B", text: "k = A e^(+Ea / RT)" }, { label: "C", text: "k = A / (RT)" }, { label: "D", text: "k = A ln(Ea / RT)" }
    ],
    correctAnswer: "A",
    explanation: "k = A e^(-Ea / RT) where A is pre-exponential factor and Ea is activation energy.",
    explanationTamil: "ஆர்ஹீனியஸ் சமன்பாடு k = A e^(-Ea / RT) ஆகும்."
  },
  {
    code: "CHE-039", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "hard",
    questionText: "In a reaction, doubling concentration of reactant A quadruples the reaction rate. The order with respect to A is:",
    questionTextTamil: "ஒரு வினையில் A-ன் செறிவை இருமடங்காக்கும் போது வினைவேகம் நான்கு மடங்காக அதிகரித்தால் A-ஐப் பொறுத்து வினையின் படி:",
    options: [
      { label: "A", text: "2" }, { label: "B", text: "1" }, { label: "C", text: "0" }, { label: "D", text: "3" }
    ],
    optionsTamil: [
      { label: "A", text: "2" }, { label: "B", text: "1" }, { label: "C", text: "0" }, { label: "D", text: "3" }
    ],
    correctAnswer: "A",
    explanation: "Rate ∝ [A]^n => 4 = 2^n => n = 2. Second-order reaction.",
    explanationTamil: "வினைவேகம் ∝ [A]^n => 4 = 2^n => n = 2 (இரண்டாம் வகை வினை)."
  },
  {
    code: "CHE-040", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "easy",
    questionText: "A catalyst increases reaction rate by:",
    questionTextTamil: "ஒரு வினைவேக மாற்றி எவ்வாறு வினைவேகத்தை அதிகரிக்கிறது?",
    options: [
      { label: "A", text: "Providing an alternate pathway with lower activation energy" },
      { label: "B", text: "Increasing enthalpy of reaction" },
      { label: "C", text: "Increasing threshold energy" },
      { label: "D", text: "Consuming products" }
    ],
    optionsTamil: [
      { label: "A", text: "குறைந்த கிளர்வுறு ஆற்றல் கொண்ட மாற்றுப் பாதையை வழங்குவதன் மூலம்" },
      { label: "B", text: "வினை என்தால்பியை அதிகரிப்பதன் மூலம்" },
      { label: "C", text: "தொடக்க ஆற்றலை அதிகரிப்பதன் மூலம்" },
      { label: "D", text: "விளைபொருளை உறிஞ்சுவதன் மூலம்" }
    ],
    correctAnswer: "A",
    explanation: "Catalysts lower the activation energy barrier without altering equilibrium constant K or ΔG.",
    explanationTamil: "வினைவேக மாற்றி வினையின் கிளர்வுறு ஆற்றலைக் குறைத்து வினைவேகத்தை உயர்த்துகிறது."
  },
  {
    code: "CHE-041", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "medium",
    questionText: "Hydrolysis of ethyl acetate in acidic medium CH₃COOC₂H₅ + H₂O --H⁺--> CH₃COOH + C₂H₅OH is an example of:",
    questionTextTamil: "அமில ஊடகத்தில் எத்தில் அசிட்டேட்டின் நீராற்பகுப்பு வினை எதற்கு உதாரணம்?",
    options: [
      { label: "A", text: "Pseudo first-order reaction" },
      { label: "B", text: "Zero order reaction" },
      { label: "C", text: "Second order reaction" },
      { label: "D", text: "Third order reaction" }
    ],
    optionsTamil: [
      { label: "A", text: "போலி முதல் வகை வினை (Pseudo first order)" },
      { label: "B", text: "சுழி வகை வினை" },
      { label: "C", text: "இரண்டாம் வகை வினை" },
      { label: "D", text: "மூன்றாம் வகை வினை" }
    ],
    correctAnswer: "A",
    explanation: "Water is present in large excess so its concentration remains practically constant, making rate = k'[ester].",
    explanationTamil: "நீர் மிக அதிக அளவில் உள்ளதால் அதன் செறிவு மாறாது, எனவே இது போலி முதல் வகை வினையாகும்."
  },
  {
    code: "CHE-042", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "medium",
    questionText: "For a zero-order reaction, a plot of reactant concentration [R] versus time t is:",
    questionTextTamil: "சுழி வகை வினைக்கு செறிவு [R] மற்றும் காலம் t இடையே வரையப்படும் வரைபடம்:",
    options: [
      { label: "A", text: "A straight line with negative slope (-k)" },
      { label: "B", text: "An exponential curve" },
      { label: "C", text: "A straight line passing through origin with positive slope" },
      { label: "D", text: "A parabola" }
    ],
    optionsTamil: [
      { label: "A", text: "எதிர் சாய்வு (-k) கொண்ட நேர்க்கோடு" },
      { label: "B", text: "அடுக்குக்குறி வளைகோடு" },
      { label: "C", text: "நேர் சாய்வு கொண்ட நேர்க்கோடு" },
      { label: "D", text: "பரவளையம்" }
    ],
    correctAnswer: "A",
    explanation: "[R] = [R]₀ - k t. Slope = -k and intercept = [R]₀.",
    explanationTamil: "[R] = [R]₀ - k t என்பதால் -k சாய்வு கொண்ட நேர்க்கோடு கிடைக்கும்."
  },
  {
    code: "CHE-043", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "easy",
    questionText: "The molecularity of an elementary reaction can never be:",
    questionTextTamil: "ஒரு அடிப்படை வினையின் மூலக்கூறு எண் (Molecularity) ஒருபோதும் எவ்வாறாக இருக்க முடியாது?",
    options: [
      { label: "A", text: "Zero or a fraction" }, { label: "B", text: "1" }, { label: "C", text: "2" }, { label: "D", text: "3" }
    ],
    optionsTamil: [
      { label: "A", text: "சுழி அல்லது பின்னம்" }, { label: "B", text: "1" }, { label: "C", text: "2" }, { label: "D", text: "3" }
    ],
    correctAnswer: "A",
    explanation: "Molecularity is the number of colliding species, which must be a positive integer (1, 2, 3), never zero or fractional.",
    explanationTamil: "மூலக்கூறு எண் என்பது முழு எண்ணாக மட்டுமே இருக்கும் (1, 2, 3); ஒருபோதும் சுழியாகவோ பின்னமாகவோ இருக்காது."
  },
  {
    code: "CHE-044", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "hard",
    questionText: "For a first order reaction, time required for 99.9% completion is related to half life t_(1/2) as:",
    questionTextTamil: "முதல் வகை வினையில் 99.9% நிறைவடைய ஆகும் காலம் அரை ஆயுட்காலம் t_(1/2) உடன் எவ்வாறு தொடர்புடையது?",
    options: [
      { label: "A", text: "t_(99.9%) ≈ 10 * t_(1/2)" },
      { label: "B", text: "t_(99.9%) ≈ 2 * t_(1/2)" },
      { label: "C", text: "t_(99.9%) ≈ 5 * t_(1/2)" },
      { label: "D", text: "t_(99.9%) ≈ 20 * t_(1/2)" }
    ],
    optionsTamil: [
      { label: "A", text: "t_(99.9%) ≈ 10 × t_(1/2)" },
      { label: "B", text: "t_(99.9%) ≈ 2 × t_(1/2)" },
      { label: "C", text: "t_(99.9%) ≈ 5 × t_(1/2)" },
      { label: "D", text: "t_(99.9%) ≈ 20 × t_(1/2)" }
    ],
    correctAnswer: "A",
    explanation: "t = (2.303/k) log(100/0.1) = (2.303/k) * 3 ≈ 10 * (0.693/k) = 10 t_(1/2).",
    explanationTamil: "t_(99.9%) ≈ 10 × t_(1/2) ஆகும்."
  },
  {
    code: "CHE-045", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "easy",
    questionText: "In a photochemical reaction, the rate is independent of reactant concentration and depends only on:",
    questionTextTamil: "ஒளிவேதி வினைகளில் வினைவேகம் செறிவைச் சார்ந்திருக்காமல் எதனை மட்டுமே சார்ந்தது?",
    options: [
      { label: "A", text: "Intensity of absorbed light" },
      { label: "B", text: "Pressure" },
      { label: "C", text: "Volume of vessel" },
      { label: "D", text: "Viscosity" }
    ],
    optionsTamil: [
      { label: "A", text: "உறிஞ்சப்பட்ட ஒளியின் செறிவு" },
      { label: "B", text: "அழுத்தம்" },
      { label: "C", text: "கலனின் பருமன்" },
      { label: "D", text: "பாகுநிலை" }
    ],
    correctAnswer: "A",
    explanation: "Photochemical reactions follow Stark-Einstein law; rate depends on photon absorption rate (light intensity).",
    explanationTamil: "ஒளிவேதி வினைகள் உறிஞ்சப்படும் ஒளியின் செறிவை மட்டுமே சார்ந்த சுழி வகை வினைகளாகும்."
  },

  // 46-60 Surface Chemistry
  {
    code: "CHE-046", subject: "Chemistry", topic: "Surface Chemistry", difficulty: "easy",
    questionText: "Physisorption (physical adsorption) is characterized by:",
    questionTextTamil: "இயற்பியல் பரப்புக்கவர்ச்சியின் (Physisorption) முக்கியப் பண்பு யாது?",
    options: [
      { label: "A", text: "Weak van der Waals forces, reversible, non-specific" },
      { label: "B", text: "Strong chemical bond formation" },
      { label: "C", text: "Irreversible nature" },
      { label: "D", text: "High activation energy" }
    ],
    optionsTamil: [
      { label: "A", text: "வலியற்ற வாண்டர்வால்ஸ் விசை, மீளக்கூடியது, குறிப்பிட்ட தன்மையற்றது" },
      { label: "B", text: "வலுவான வேதிப்பிணைப்பு உருவாவது" },
      { label: "C", text: "மீளாத தன்மை" },
      { label: "D", text: "அதிக கிளர்வுறு ஆற்றல்" }
    ],
    correctAnswer: "A",
    explanation: "Physisorption involves multi-layer van der Waals attraction with low adsorption enthalpy (20-40 kJ/mol).",
    explanationTamil: "இயற்பியல் பரப்புக்கவர்ச்சி பல அடுக்குகளாகவும் மீளக்கூடியதாகவும் குறைந்த வெப்பத்துடனும் நிகழ்கிறது."
  },
  {
    code: "CHE-047", subject: "Chemistry", topic: "Surface Chemistry", difficulty: "medium",
    questionText: "Chemisorption (chemical adsorption) is:",
    questionTextTamil: "வேதியியல் பரப்புக்கவர்ச்சி எத்தகையது?",
    options: [
      { label: "A", text: "Unimolecular layer, irreversible, highly specific with high enthalpy" },
      { label: "B", text: "Multimolecular layer" },
      { label: "C", text: "Reversible at room temperature" },
      { label: "D", text: "Independent of surface area" }
    ],
    optionsTamil: [
      { label: "A", text: "ஓரடுக்கு மூலக்கூறு படலம், மீளாதது, அதிக வெப்பம் மற்றும் குறிப்பிட்ட தன்மை உடையது" },
      { label: "B", text: "பல்மூலக்கூறு படலம்" },
      { label: "C", text: "மீளக்கூடியது" },
      { label: "D", text: "பரப்பளவைச் சார்ந்திராதது" }
    ],
    correctAnswer: "A",
    explanation: "Chemisorption forms chemical bonds (covalent/ionic), strictly limited to a monolayer.",
    explanationTamil: "வேதிப் பிணைப்பு ஏற்படுவதால் இது ஓரடுக்கு மட்டுமே உருவாகும் மீளாத நிகழ்வாகும்."
  },
  {
    code: "CHE-048", subject: "Chemistry", topic: "Surface Chemistry", difficulty: "medium",
    questionText: "Freundlich adsorption isotherm relates mass of gas adsorbed per gram of adsorbent (x/m) to pressure P as:",
    questionTextTamil: "ஃப்ராய்ண்ட்லிச் பரப்புக்கவர்ச்சி சமன்பாடு x/m மற்றும் அழுத்தம் P இடையே எவ்வாறு அமைகிறது?",
    options: [
      { label: "A", text: "x / m = k P^(1/n) where n > 1" },
      { label: "B", text: "x / m = k P^n" },
      { label: "C", text: "x / m = k / P" },
      { label: "D", text: "x / m = k P²" }
    ],
    optionsTamil: [
      { label: "A", text: "x / m = k P^(1/n) (இங்கு n > 1)" },
      { label: "B", text: "x / m = k P^n" },
      { label: "C", text: "x / m = k / P" },
      { label: "D", text: "x / m = k P²" }
    ],
    correctAnswer: "A",
    explanation: "Freundlich isotherm: x/m = k P^(1/n) with 0 < 1/n < 1.",
    explanationTamil: "ஃப்ராய்ண்ட்லிச் சமன்பாடு x/m = k P^(1/n) ஆகும்."
  },
  {
    code: "CHE-049", subject: "Chemistry", topic: "Surface Chemistry", difficulty: "easy",
    questionText: "Tyndall effect is the scattering of light observed in:",
    questionTextTamil: "டிண்டால் விளைவு (ஒளிச்சிதறல்) எதில் காணப்படுகிறது?",
    options: [
      { label: "A", text: "Colloidal solutions" }, { label: "B", text: "True solutions (e.g., NaCl in water)" }, { label: "C", text: "Pure solvents" }, { label: "D", text: "Vacuum" }
    ],
    optionsTamil: [
      { label: "A", text: "கூழ்மக் கரைசல்கள் (Colloidal solutions)" }, { label: "B", text: "உண்மைக் கரைசல்கள்" }, { label: "C", text: "தூய கரைப்பான்கள்" }, { label: "D", text: "வெற்றிடம்" }
    ],
    correctAnswer: "A",
    explanation: "Colloid particles (1-1000 nm) scatter light path, making it visible (Tyndall cone).",
    explanationTamil: "கூழ்மத் துகள்களின் அளவு ஒளியின் அலைநீளத்திற்கு ஒத்திருப்பதால் டிண்டால் விளைவு தோன்றுகிறது."
  },
  {
    code: "CHE-050", subject: "Chemistry", topic: "Surface Chemistry", difficulty: "easy",
    questionText: "Brownian movement of colloidal particles is caused by:",
    questionTextTamil: "கூழ்மத் துகள்களின் பிரவுனியன் இயக்கத்திற்கு (Brownian motion) காரணம் என்ன?",
    options: [
      { label: "A", text: "Unbalanced bombardment by molecules of dispersion medium" },
      { label: "B", text: "Gravitational pull" },
      { label: "C", text: "Electrostatic attraction between particles" },
      { label: "D", text: "Convection currents" }
    ],
    optionsTamil: [
      { label: "A", text: "பிரித்தெறியும் ஊடக மூலக்கூறுகளின் சீரற்ற மோதல்" },
      { label: "B", text: "ஈர்ப்பு விசை" },
      { label: "C", text: "நிலைமின் கவர்ச்சி" },
      { label: "D", text: "வெப்பச் சலனம்" }
    ],
    correctAnswer: "A",
    explanation: "Continuous random collision of solvent molecules against colloidal particles imparts zigzag motion, preventing settling.",
    explanationTamil: "ஊடக மூலக்கூறுகள் கூழ்மத் துகள்களின் மீது ஒழுங்கற்ற முறையில் மோதுவதால் பிரவுனியன் இயக்கம் ஏற்படுகிறது."
  },
  {
    code: "CHE-051", subject: "Chemistry", topic: "Surface Chemistry", difficulty: "medium",
    questionText: "Electrophoresis is the movement of colloidal particles under the influence of an applied:",
    questionTextTamil: "மின்புலத்தின் கீழ் கூழ்மத் துகள்கள் நகரும் நிகழ்வு எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Electric field" }, { label: "B", text: "Magnetic field" }, { label: "C", text: "Gravitational field" }, { label: "D", text: "Centrifugal force" }
    ],
    optionsTamil: [
      { label: "A", text: "மின்புலம் (Electrophoresis - மின்னாற்பகுப்பு இயக்கம்)" },
      { label: "B", text: "காந்தப்புலம்" },
      { label: "C", text: "ஈர்ப்புப் புலம்" },
      { label: "D", text: "மையவிலக்கு விசை" }
    ],
    correctAnswer: "A",
    explanation: "Colloidal particles carry surface charge and migrate toward opposite electrode in electric field (electrophoresis).",
    explanationTamil: "மின்புலத்தைப் பயன்படுத்தி கூழ்மத் துகள்களை நகர்த்துவது மின்னாற்பகுப்பு நகர்ச்சி எனப்படும்."
  },
  {
    code: "CHE-052", subject: "Chemistry", topic: "Surface Chemistry", difficulty: "hard",
    questionText: "According to Hardy-Schulze rule, the coagulating power of an electrolyte for an As₂S₃ negative sol increases with:",
    questionTextTamil: "ஹார்டி-ஷூல்ஸ் விதிப்படி As₂S₃ எதிர்மின் கூழ்மத்தை திரிக்க வைக்கும் திறன் எதில் அதிகமாக இருக்கும்?",
    options: [
      { label: "A", text: "Al³⁺ > Ba²⁺ > Na⁺" },
      { label: "B", text: "Na⁺ > Ba²⁺ > Al³⁺" },
      { label: "C", text: "PO₄³⁻ > SO₄²⁻ > Cl⁻" },
      { label: "D", text: "Cl⁻ > Br⁻ > I⁻" }
    ],
    optionsTamil: [
      { label: "A", text: "Al³⁺ > Ba²⁺ > Na⁺" },
      { label: "B", text: "Na⁺ > Ba²⁺ > Al³⁺" },
      { label: "C", text: "PO₄³⁻ > SO₄²⁻ > Cl⁻" },
      { label: "D", text: "Cl⁻ > Br⁻ > I⁻" }
    ],
    correctAnswer: "A",
    explanation: "Hardy-Schulze rule: Higher valency of coagulating ion gives exponentially greater coagulating power (Al³⁺ > Ba²⁺ > Na⁺).",
    explanationTamil: "ஹார்டி-ஷூல்ஸ் விதிப்படி அதிக இணைதிறன் கொண்ட அயனி (Al³⁺) அதிக வீழ்படிவாக்கும் திறன் கொண்டது."
  },
  {
    code: "CHE-053", subject: "Chemistry", topic: "Surface Chemistry", difficulty: "easy",
    questionText: "Butter is an example of an emulsion of type:",
    questionTextTamil: "வெண்ணெய் எந்த வகை பால்மத்திற்கு (Emulsion) சிறந்த உதாரணம்?",
    options: [
      { label: "A", text: "Water dispersed in oil (W/O)" },
      { label: "B", text: "Oil dispersed in water (O/W)" },
      { label: "C", text: "Gas in liquid" },
      { label: "D", text: "Solid in gas" }
    ],
    optionsTamil: [
      { label: "A", text: "எண்ணெயில் நீர் (Water in Oil - W/O)" },
      { label: "B", text: "நீரில் எண்ணெய் (பால் போன்ற O/W)" },
      { label: "C", text: "திரவத்தில் வாயு" },
      { label: "D", text: "வாயுவில் திண்மம்" }
    ],
    correctAnswer: "A",
    explanation: "Butter is water dispersed in fat (W/O), whereas milk is fat dispersed in water (O/W).",
    explanationTamil: "வெண்ணெய் என்பது கொழுப்பில் நீர் பரவியுள்ள (W/O) பால்மமாகும் (பால் என்பது O/W)."
  },

  // 54-75 Metallurgy & General Inorganic Principles
  {
    code: "CHE-054", subject: "Chemistry", topic: "Metallurgy", difficulty: "easy",
    questionText: "Froth floatation process is specifically employed for the concentration of which ores?",
    questionTextTamil: "நுரை மிதப்பு முறை எந்த வகை தாதுக்களை அடர்ப்பிக்க பிரத்யேகமாகப் பயன்படுகிறது?",
    options: [
      { label: "A", text: "Sulphide ores (e.g., ZnS, PbS, CuFeS₂)" },
      { label: "B", text: "Oxide ores" },
      { label: "C", text: "Carbonate ores" },
      { label: "D", text: "Halide ores" }
    ],
    optionsTamil: [
      { label: "A", text: "சல்பைடு தாதுக்கள் (எ.கா. கலீனா PbS, ஜிங்க் பிளண்ட் ZnS)" },
      { label: "B", text: "ஆக்சைடு தாதுக்கள்" },
      { label: "C", text: "கார்பனேட் தாதுக்கள்" },
      { label: "D", text: "ஹாலைடு தாதுக்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Froth floatation exploits preferential wetting of sulphide particles by pine oil while gangue is wetted by water.",
    explanationTamil: "சல்பைடு தாதுக்கள் பைன் எண்ணெயால் ஈரப்படுத்தப்பட்டு நுரையுடன் மேலே மிதக்கின்றன."
  },
  {
    code: "CHE-055", subject: "Chemistry", topic: "Metallurgy", difficulty: "easy",
    questionText: "Calcination is the process of heating the ore strongly:",
    questionTextTamil: "காற்றில்லாச் சுடுதல் (Calcination) என்பது தாதுவை எவ்வாறு சூடுபடுத்துவது?",
    options: [
      { label: "A", text: "In the absence or limited supply of air below melting point" },
      { label: "B", text: "In excess air" },
      { label: "C", text: "With carbon above melting point" },
      { label: "D", text: "In liquid nitrogen" }
    ],
    optionsTamil: [
      { label: "A", text: "காற்றில்லா அல்லது குறைந்த காற்றுச் சூழலில் உருகுநிலைக்குக் கீழே சூடுபடுத்துதல்" },
      { label: "B", text: "அதிகப்படியான காற்றில்" },
      { label: "C", text: "உருகிய நிலையில்" },
      { label: "D", text: "குளிர்ந்த நிலையில்" }
    ],
    correctAnswer: "A",
    explanation: "Calcination expels volatile impurities, moisture and CO₂ from carbonates (e.g. CaCO₃ → CaO + CO₂) without air.",
    explanationTamil: "காற்றில்லாச் சூழலில் சூடுபடுத்தி கார்பனேட் மற்றும் நீரேறிய தாதுக்களிலிருந்து நீர், வாயுக்கள் வெளியேற்றப்படுகின்றன."
  },
  {
    code: "CHE-056", subject: "Chemistry", topic: "Metallurgy", difficulty: "easy",
    questionText: "Roasting of sulphide ores produces which gas as a by-product?",
    questionTextTamil: "சல்பைடு தாதுக்களை காற்றில் வறுக்கும் போது (Roasting) வெளியேறும் உப-வாயு எது?",
    options: [
      { label: "A", text: "Sulphur dioxide (SO₂)" },
      { label: "B", text: "Carbon monoxide (CO)" },
      { label: "C", text: "Hydrogen sulphide (H₂S)" },
      { label: "D", text: "Nitrogen dioxide (NO₂)" }
    ],
    optionsTamil: [
      { label: "A", text: "சல்பர் டை ஆக்சைடு (SO₂)" },
      { label: "B", text: "கார்பன் மோனாக்சைடு" },
      { label: "C", text: "ஹைட்ரஜன் சல்பைடு" },
      { label: "D", text: "நைட்ரஜன் டை ஆக்சைடு" }
    ],
    correctAnswer: "A",
    explanation: "2 ZnS + 3 O₂ → 2 ZnO + 2 SO₂. The SO₂ produced is commonly captured to manufacture sulphuric acid.",
    explanationTamil: "2 ZnS + 3 O₂ → 2 ZnO + 2 SO₂ (சல்பர் டை ஆக்சைடு வாயு வெளியேறுகிறது)."
  },
  {
    code: "CHE-057", subject: "Chemistry", topic: "Metallurgy", difficulty: "medium",
    questionText: "Ellingham diagram is a plot of:",
    questionTextTamil: "எல்லிங்கம் வரைபடம் (Ellingham Diagram) எதற்கு இடையே வரையப்படும் வரைபடமாகும்?",
    options: [
      { label: "A", text: "ΔG° versus absolute temperature T for oxide formation" },
      { label: "B", text: "ΔH° versus T" },
      { label: "C", text: "ΔS° versus T" },
      { label: "D", text: "Vapour pressure versus temperature" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆக்சைடு உருவாக்கத்திற்கான ΔG° மற்றும் தனி வெப்பநிலை T" },
      { label: "B", text: "ΔH° மற்றும் T" },
      { label: "C", text: "ΔS° மற்றும் T" },
      { label: "D", text: "ஆவி அழுத்தம் மற்றும் T" }
    ],
    correctAnswer: "A",
    explanation: "Ellingham diagram plots standard Gibbs energy of formation ΔfG° vs T, identifying feasibility of reducing agents.",
    explanationTamil: "ஆக்சைடு உருவாக்கத்திற்கான கிப்ஸ் கட்டிலா ஆற்றல் ΔG° மற்றும் வெப்பநிலை T இடையே வரையப்படுகிறது."
  },
  {
    code: "CHE-058", subject: "Chemistry", topic: "Metallurgy", difficulty: "medium",
    questionText: "Mond process is used for the refining of which metal?",
    questionTextTamil: "மான்ட் செயல்முறை (Mond Process) எந்த உலோகத்தை தூய்மையாக்கப் பயன்படுகிறது?",
    options: [
      { label: "A", text: "Nickel (Ni)" }, { label: "B", text: "Titanium (Ti)" }, { label: "C", text: "Zirconium (Zr)" }, { label: "D", text: "Copper (Cu)" }
    ],
    optionsTamil: [
      { label: "A", text: "நிக்கல் (Nickel - Ni)" }, { label: "B", text: "டைட்டானியம்" }, { label: "C", text: "சிர்கோனியம்" }, { label: "D", text: "தாமிரம்" }
    ],
    correctAnswer: "A",
    explanation: "Ni forms volatile Ni(CO)₄ at 330 K, which decomposes into pure Ni at 450 K.",
    explanationTamil: "நிக்கல் கார்பன் மோனாக்சைடுடன் இணைந்து ஆவியாகும் நிக்கல் டெட்ராகார்பனைல் Ni(CO)₄ உருவாக்கி தூய்மையாக்கப்படுகிறது."
  },
  {
    code: "CHE-059", subject: "Chemistry", topic: "Metallurgy", difficulty: "medium",
    questionText: "Van Arkel method is used for ultra-purification of which metals?",
    questionTextTamil: "வான் ஆர்கல் முறை (Van Arkel Method) எவற்றை மீத்தூய்மையாக்கப் பயன்படுகிறது?",
    options: [
      { label: "A", text: "Zirconium (Zr) and Titanium (Ti)" },
      { label: "B", text: "Nickel and Iron" },
      { label: "C", text: "Copper and Zinc" },
      { label: "D", text: "Aluminium and Gold" }
    ],
    optionsTamil: [
      { label: "A", text: "சிர்கோனியம் (Zr) மற்றும் டைட்டானியம் (Ti)" },
      { label: "B", text: "நிக்கல் மற்றும் இரும்பு" },
      { label: "C", text: "தாமிரம் மற்றும் துத்தநாகம்" },
      { label: "D", text: "அலுமினியம் மற்றும் தங்கம்" }
    ],
    correctAnswer: "A",
    explanation: "Zr or Ti is heated with Iodine to form volatile tetraiodide, decomposed on hot tungsten filament to pure metal.",
    explanationTamil: "அயோடைடு ஆவி மூலம் சிர்கோனியம் மற்றும் டைட்டானியம் மிகத் தூய்மையாகப் பெறப்படுகின்றன."
  },
  {
    code: "CHE-060", subject: "Chemistry", topic: "Metallurgy", difficulty: "easy",
    questionText: "Zone refining process is based on the principle of:",
    questionTextTamil: "புலத் தூய்மையாக்கல் (Zone refining) முறை எந்த தத்துவத்தின் அடிப்படையில் செயல்படுகிறது?",
    options: [
      { label: "A", text: "Impurities are more soluble in molten metal than in solid state" },
      { label: "B", text: "Impurities have higher boiling point" },
      { label: "C", text: "Different magnetic properties" },
      { label: "D", text: "Sublimation" }
    ],
    optionsTamil: [
      { label: "A", text: "மாசுக்கள் திண்ம நிலையை விட உருகிய நிலையில் அதிகம் கரையும்" },
      { label: "B", text: "மாசுக்களின் கொதிநிலை அதிகம்" },
      { label: "C", text: "காந்தப் பண்பு வேறுபாடு" },
      { label: "D", text: "பதங்கமாதல்" }
    ],
    correctAnswer: "A",
    explanation: "Zone refining produces semiconductor-grade Silicon and Germanium (99.9999% purity) using fractional crystallization.",
    explanationTamil: "குறைக்கடத்திகளான சிலிக்கான், ஜெர்மானியத்தை மிக உயர் தூய்மையாக்க புலத் தூய்மையாக்கல் பயன்படுகிறது."
  },
  {
    code: "CHE-061", subject: "Chemistry", topic: "Metallurgy", difficulty: "easy",
    questionText: "In the Hall-Héroult process for extraction of aluminium, cryolite (Na₃AlF₆) is added to alumina to:",
    questionTextTamil: "அலுமினியம் பிரித்தெடுக்கும் ஹால்-ஹெரால்ட் முறையில் கிரையோலைட் (Na₃AlF₆) எதற்காகச் சேர்க்கப்படுகிறது?",
    options: [
      { label: "A", text: "Lower melting point of alumina and increase electrical conductivity" },
      { label: "B", text: "Remove iron impurities" },
      { label: "C", text: "Prevent oxidation" },
      { label: "D", text: "Act as catalyst" }
    ],
    optionsTamil: [
      { label: "A", text: "அலுமினாவின் உருகுநிலையைக் குறைத்து மின்கடத்துத்திறனை அதிகரிக்க" },
      { label: "B", text: "இரும்பு மாசை நீக்க" },
      { label: "C", text: "ஆக்சிஜனேற்றத்தைத் தடுக்க" },
      { label: "D", text: "வினைவேக மாற்றியாக" }
    ],
    correctAnswer: "A",
    explanation: "Pure Al₂O₃ melts at ~2050°C; cryolite reduces melting point to ~950°C and provides mobile conducting ions.",
    explanationTamil: "கிரையோலைட் அலுமினாவின் உருகுநிலையை 2050°C-லிருந்து 950°C-க்குக் குறைத்து மின்கடத்துத்திறனைக் கூட்டுகிறது."
  },
  {
    code: "CHE-062", subject: "Chemistry", topic: "Metallurgy", difficulty: "easy",
    questionText: "Blister copper is produced during extraction from copper pyrites. The blisters are formed by escaping bubbles of:",
    questionTextTamil: "கொப்புளத் தாமிரம் (Blister copper) உருவாகும் போது மேற்பரப்பில் கொப்புளங்கள் எதன் வெளியேற்றத்தால் தோன்றுகின்றன?",
    options: [
      { label: "A", text: "SO₂ gas" }, { label: "B", text: "CO₂ gas" }, { label: "C", text: "O₂ gas" }, { label: "D", text: "H₂ gas" }
    ],
    optionsTamil: [
      { label: "A", text: "SO₂ வாயு" }, { label: "B", text: "CO₂ வாயு" }, { label: "C", text: "O₂ வாயு" }, { label: "D", text: "H₂ வாயு" }
    ],
    correctAnswer: "A",
    explanation: "Solidifying molten copper releases dissolved SO₂ gas, creating blister-like bumps on copper surface (98% pure Cu).",
    explanationTamil: "உருகிய தாமிரத்திலிருந்து SO₂ வாயு வெளியேறி திடமாவதால் கொப்புளத் தாமிரம் உருவாகிறது."
  },
  {
    code: "CHE-063", subject: "Chemistry", topic: "Metallurgy", difficulty: "medium",
    questionText: "The role of depressant NaCN in the froth floatation separation of PbS and ZnS ore mixture is:",
    questionTextTamil: "PbS மற்றும் ZnS கலவையில் NaCN சேர்க்கப்படுவதன் நோக்கம் என்ன?",
    options: [
      { label: "A", text: "Selectively prevents ZnS from coming into froth by forming soluble complex [Zn(CN)₄]²⁻" },
      { label: "B", text: "Prevents PbS from floating" },
      { label: "C", text: "Acts as collector" },
      { label: "D", text: "Neutralizes gangue" }
    ],
    optionsTamil: [
      { label: "A", text: "ZnS-ஐ நுரைக்கு வரவிடாமல் தடுத்து கரையக்கூடிய அணைவு அயனியாக மாற்றுகிறது" },
      { label: "B", text: "PbS மிதப்பதைத் தடுக்கிறது" },
      { label: "C", text: "சேகரிப்பானாக செயல்படுகிறது" },
      { label: "D", text: "கழிவை நீக்குகிறது" }
    ],
    correctAnswer: "A",
    explanation: "NaCN forms soluble complex with ZnS allowing PbS to float selectively with froth.",
    explanationTamil: "NaCN துத்தநாக சல்பைடை நுரைக்கு வரவிடாமல் குறைப்பானாக செயல்பட்டு PbS-ஐ மட்டும் மிதக்க விடுகிறது."
  },
  {
    code: "CHE-064", subject: "Chemistry", topic: "Solid State", difficulty: "easy",
    questionText: "A semiconductor formed by doping Silicon with Phosphorus contains which majority charge carriers?",
    questionTextTamil: "சிலிக்கானுடன் பாஸ்பரஸ் மாசூட்டப்படும் போது உருவாகும் குறைக்கடத்தியில் பெரும்பான்மை ஊர்திகள் எவை?",
    options: [
      { label: "A", text: "Electrons (n-type)" }, { label: "B", text: "Holes (p-type)" }, { label: "C", text: "Protons" }, { label: "D", text: "Positrons" }
    ],
    optionsTamil: [
      { label: "A", text: "எலக்ட்ரான்கள் (n-வகை)" }, { label: "B", text: "துளைகள் (p-வகை)" }, { label: "C", text: "புரோட்டான்கள்" }, { label: "D", text: "பாசிட்ரான்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Phosphorus has 5 valence electrons. 4 bond with silicon and 1 free electron contributes to n-type conduction.",
    explanationTamil: "ஐந்து இணைதிறன் கொண்ட பாஸ்பரஸ் எலக்ட்ரான்களை வழங்கி n-வகை குறைக்கடத்தியை உருவாக்குகிறது."
  },
  {
    code: "CHE-065", subject: "Chemistry", topic: "Solid State", difficulty: "medium",
    questionText: "Ferrimagnetic substance among the following is:",
    questionTextTamil: "பின்வருவனவற்றுள் ஃபெர்ரி காந்தப்பொருள் (Ferrimagnetic) எது?",
    options: [
      { label: "A", text: "Magnetite (Fe₃O₄)" }, { label: "B", text: "NaCl" }, { label: "C", text: "CrO₂" }, { label: "D", text: "MnO" }
    ],
    optionsTamil: [
      { label: "A", text: "மேக்னடைட் (Fe₃O₄)" }, { label: "B", text: "NaCl" }, { label: "C", text: "CrO₂" }, { label: "D", text: "MnO (ஆன்டிஃபெர்ரோ)" }
    ],
    correctAnswer: "A",
    explanation: "Fe₃O₄ and ferrites have unequal antiparallel magnetic dipole moments, exhibiting ferrimagnetism.",
    explanationTamil: "Fe₃O₄ சமமற்ற எதிர் இணை காந்த திருப்புத்திறன்களைக் கொண்ட ஃபெர்ரி காந்தப் பொருளாகும்."
  },
  {
    code: "CHE-066", subject: "Chemistry", topic: "Solutions", difficulty: "easy",
    questionText: "An azeotropic mixture is a liquid mixture that:",
    questionTextTamil: "மாறாக் கொதிநிலைக் கலவை (Azeotrope) என்பது:",
    options: [
      { label: "A", text: "Boils at a constant temperature and distils without change in composition" },
      { label: "B", text: "Can be separated by fractional distillation" },
      { label: "C", text: "Obeys Raoult's law perfectly" },
      { label: "D", text: "Contains no solute" }
    ],
    optionsTamil: [
      { label: "A", text: "இயைபு மாறாமல் மாறா வெப்பநிலையில் ஆவியாகும் இருமக் கரைசல்" },
      { label: "B", text: "பின்னக் காய்ச்சி வடித்தல் மூலம் பிரிக்க முடிகிற கலவை" },
      { label: "C", text: "ரவுல்ட் விதிக்குக் கட்டுப்படும் கரைசல்" },
      { label: "D", text: "கரைபொருளற்ற கரைசல்" }
    ],
    correctAnswer: "A",
    explanation: "Azeotropes boil at constant temperature with identical liquid and vapour phase compositions.",
    explanationTamil: "திரவ மற்றும் ஆவி நிலையில் ஒரே இயைபைக் கொண்டு மாறா வெப்பநிலையில் கொதிக்கும் கலவை அசியோட்ரோப் ஆகும்."
  },
  {
    code: "CHE-067", subject: "Chemistry", topic: "Solutions", difficulty: "medium",
    questionText: "The boiling point elevation constant K_b is also called:",
    questionTextTamil: "கொதிநிலை ஏற்ற மாறிலி K_b எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Ebullioscopic constant" }, { label: "B", text: "Cryoscopic constant" }, { label: "C", text: "Gas constant" }, { label: "D", text: "Boltzmann constant" }
    ],
    optionsTamil: [
      { label: "A", text: "எபுலியோஸ்கோபிக் மாறிலி (Ebullioscopic constant)" },
      { label: "B", text: "கிரையோஸ்கோபிக் மாறிலி (உறைநிலை தாழ்வு)" },
      { label: "C", text: "வாயு மாறிலி" },
      { label: "D", text: "போல்ட்ஸ்மேன் மாறிலி" }
    ],
    correctAnswer: "A",
    explanation: "ΔT_b = K_b * m where K_b is the ebullioscopic constant (K kg mol⁻¹).",
    explanationTamil: "கொதிநிலை மாறிலி K_b எபுலியோஸ்கோபிக் மாறிலி என அழைக்கப்படுகிறது."
  },
  {
    code: "CHE-068", subject: "Chemistry", topic: "Solutions", difficulty: "medium",
    questionText: "Freezing point depression constant K_f is also known as:",
    questionTextTamil: "உறைநிலைத் தாழ்வு மாறிலி K_f எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Cryoscopic constant" }, { label: "B", text: "Ebullioscopic constant" }, { label: "C", text: "Henry constant" }, { label: "D", text: "Faraday constant" }
    ],
    optionsTamil: [
      { label: "A", text: "கிரையோஸ்கோபிக் மாறிலி (Cryoscopic constant)" },
      { label: "B", text: "எபுலியோஸ்கோபிக் மாறிலி" },
      { label: "C", text: "ஹென்றி மாறிலி" },
      { label: "D", text: "பாரடே மாறிலி" }
    ],
    correctAnswer: "A",
    explanation: "ΔT_f = K_f * m where K_f is the cryoscopic constant of solvent.",
    explanationTamil: "உறைநிலைத் தாழ்வு மாறிலி K_f கிரையோஸ்கோபிக் மாறிலி எனப்படும்."
  },
  {
    code: "CHE-069", subject: "Chemistry", topic: "Electrochemistry", difficulty: "easy",
    questionText: "The unit of cell constant of a conductivity cell is:",
    questionTextTamil: "மின்கடத்து மின்கலத்தின் மின்கல மாறிலியின் (Cell constant) அலகு யாது?",
    options: [
      { label: "A", text: "cm⁻¹ (or m⁻¹)" }, { label: "B", text: "cm" }, { label: "C", text: "Ω cm" }, { label: "D", text: "S cm⁻¹" }
    ],
    optionsTamil: [
      { label: "A", text: "cm⁻¹ (அல்லது m⁻¹)" }, { label: "B", text: "cm" }, { label: "C", text: "Ω cm" }, { label: "D", text: "S cm⁻¹" }
    ],
    correctAnswer: "A",
    explanation: "Cell constant G* = l / A, length divided by area, unit is cm⁻¹ or m⁻¹.",
    explanationTamil: "மின்கல மாறிலி G* = l / A, இதன் அலகு cm⁻¹ அல்லது m⁻¹ ஆகும்."
  },
  {
    code: "CHE-070", subject: "Chemistry", topic: "Electrochemistry", difficulty: "medium",
    questionText: "Molar conductivity of a strong electrolyte increases slightly with dilution because:",
    questionTextTamil: "வலிமைமிகு மின்பகுளியின் மோலார் கடத்துத்திறன் நீர்த்தலின் போது சிறிதளவு அதிகரிக்க காரணம்:",
    options: [
      { label: "A", text: "Interionic attractions decrease, increasing ion mobility" },
      { label: "B", text: "Number of ions increases drastically" },
      { label: "C", text: "Solvent decomposes" },
      { label: "D", text: "Temperature increases" }
    ],
    optionsTamil: [
      { label: "A", text: "அயனிகளுக்கு இடையேயான கவர்ச்சி குறைந்து அயனிகளின் இயக்கம் அதிகரிப்பதால்" },
      { label: "B", text: "அயனிகளின் எண்ணிக்கை பெருமளவில் கூடுவதால்" },
      { label: "C", text: "கரைப்பான் சிதைவதால்" },
      { label: "D", text: "வெப்பநிலை உயர்வதால்" }
    ],
    correctAnswer: "A",
    explanation: "Strong electrolytes are already 100% dissociated; dilution separates ions, reducing mutual interionic drag.",
    explanationTamil: "வலிமைமிகு மின்பகுளிகள் ஏற்கனவே முழுமையாக அயனியுற்றவை; நீர்க்கும்போது அயனிகளுக்கிடை கவர்ச்சி குறைந்து வேகம் கூடுகிறது."
  },
  {
    code: "CHE-071", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "easy",
    questionText: "Radioactive decay follows which order of kinetics?",
    questionTextTamil: "கதிரியக்கச் சிதைவு எந்த வகை வினைவேகவியலைப் பின்பற்றுகிறது?",
    options: [
      { label: "A", text: "First-order kinetics" }, { label: "B", text: "Zero-order kinetics" }, { label: "C", text: "Second-order kinetics" }, { label: "D", text: "Third-order kinetics" }
    ],
    optionsTamil: [
      { label: "A", text: "முதல் வகை வினைவேகவியல் (First order)" },
      { label: "B", text: "சுழி வகை" },
      { label: "C", text: "இரண்டாம் வகை" },
      { label: "D", text: "மூன்றாம் வகை" }
    ],
    correctAnswer: "A",
    explanation: "All natural and artificial radioactive decays strictly follow first-order rate law: dN/dt = -λ N.",
    explanationTamil: "அனைத்து கதிரியக்கச் சிதைவுகளும் முதல் வகை வினைவேக விதியைப் பின்பற்றுகின்றன."
  },
  {
    code: "CHE-072", subject: "Chemistry", topic: "Chemical Kinetics", difficulty: "medium",
    questionText: "In the presence of a positive catalyst, the value of activation energy Ea:",
    questionTextTamil: "நேர் வினைவேக மாற்றியின் முன்னிலையில் கிளர்வுறு ஆற்றல் Ea-ன் மதிப்பு:",
    options: [
      { label: "A", text: "Decreases" }, { label: "B", text: "Increases" }, { label: "C", text: "Remains unchanged" }, { label: "D", text: "Becomes zero" }
    ],
    optionsTamil: [
      { label: "A", text: "குறைகிறது" }, { label: "B", text: "அதிகரிக்கிறது" }, { label: "C", text: "மாறாது" }, { label: "D", text: "சுழியாகும்" }
    ],
    correctAnswer: "A",
    explanation: "Catalyst opens an alternate mechanism with lower activation energy threshold.",
    explanationTamil: "வினைவேக மாற்றி கிளர்வுறு ஆற்றலைக் குறைத்து வினைவேகத்தை உயர்த்துகிறது."
  },
  {
    code: "CHE-073", subject: "Chemistry", topic: "Surface Chemistry", difficulty: "easy",
    questionText: "Milk is an emulsion stabilized naturally by which emulsifying agent?",
    questionTextTamil: "பால் என்பது எந்த இயற்கை பால்மமாக்கியால் (Emulsifier) நிலைப்படுத்தப்பட்ட பால்மமாகும்?",
    options: [
      { label: "A", text: "Casein (protein)" }, { label: "B", text: "Lactose" }, { label: "C", text: "Fat" }, { label: "D", text: "Calcium phosphate" }
    ],
    optionsTamil: [
      { label: "A", text: "கேசின் (Casein - புரதம்)" }, { label: "B", text: "லாக்டோஸ்" }, { label: "C", text: "கொழுப்பு" }, { label: "D", text: "கால்சியம் பாஸ்பேட்" }
    ],
    correctAnswer: "A",
    explanation: "Casein forms protective coats around dispersed fat droplets in water.",
    explanationTamil: "கேசின் என்ற பாற்புரதம் பாலை நிலைப்படுத்தும் இயற்கை பால்மமாக்கியாகச் செயல்படுகிறது."
  },
  {
    code: "CHE-074", subject: "Chemistry", topic: "Surface Chemistry", difficulty: "medium",
    questionText: "Alum (potash alum) purifies muddy river water by:",
    questionTextTamil: "படிகாரம் கலங்கல் ஆற்றுநீரை எதன் மூலம் தூய்மைப்படுத்துகிறது?",
    options: [
      { label: "A", text: "Coagulation of negatively charged mud particles by Al³⁺ ions" },
      { label: "B", text: "Oxidation of organic matter" },
      { label: "C", text: "Dialysis" },
      { label: "D", text: "Neutralization of acid" }
    ],
    optionsTamil: [
      { label: "A", text: "Al³⁺ அயனிகள் எதிர்மின்னூட்டம் கொண்ட களிமண் துகள்களைத் திரித்து வீழ்படிவாக்குதல்" },
      { label: "B", text: "ஆக்சிஜனேற்றம்" },
      { label: "C", text: "டயாலிசிஸ்" },
      { label: "D", text: "அமில சமநிலை" }
    ],
    correctAnswer: "A",
    explanation: "Trivalent Al³⁺ ions rapidly coagulate negatively charged colloidal clay/mud particles to settle at bottom.",
    explanationTamil: "படிகாரத்திலுள்ள Al³⁺ அயனிகள் சேற்றுத் துகள்களைத் திரியச் செய்து வீழ்படிவாக்குகின்றன."
  },
  {
    code: "CHE-075", subject: "Chemistry", topic: "Metallurgy", difficulty: "easy",
    questionText: "The chief ore of aluminium is:",
    questionTextTamil: "அலுமினியத்தின் முக்கியமான தாது எது?",
    options: [
      { label: "A", text: "Bauxite (Al₂O₃ · 2H₂O)" },
      { label: "B", text: "Cryolite" },
      { label: "C", text: "Corundum" },
      { label: "D", text: "Kaolinite" }
    ],
    optionsTamil: [
      { label: "A", text: "பாக்சைட் (Bauxite - Al₂O₃ · 2H₂O)" },
      { label: "B", text: "கிரையோலைட்" },
      { label: "C", text: "குருந்தம்" },
      { label: "D", text: "கயோலினைட்" }
    ],
    correctAnswer: "A",
    explanation: "Bauxite is the primary commercial ore mined for aluminium extraction worldwide.",
    explanationTamil: "அலுமினியத்தின் முக்கிய மூலத்தாது பாக்சைட் (Al₂O₃ · 2H₂O) ஆகும்."
  }
];
