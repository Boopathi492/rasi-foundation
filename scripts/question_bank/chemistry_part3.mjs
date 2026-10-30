// scripts/question_bank/chemistry_part3.mjs
// Questions CHE-126 to CHE-215: Organic Chemistry, Biomolecules, Polymers

export const chemistryPart3 = [
  // 126-140 Haloalkanes & Haloarenes
  {
    code: "CHE-126", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "SN1 nucleophilic substitution reaction of alkyl halides proceeds with:",
    questionTextTamil: "அல்கைல் ஹாலைடுகளின் SN1 கருக்கவர் பதிலீட்டு வினையின் வழிமுறை எதன் மூலம் நிகழ்கிறது?",
    options: [
      { label: "A", text: "Two steps via intermediate carbocation and racemization" },
      { label: "B", text: "Single step via pentavalent transition state" },
      { label: "C", text: "Complete inversion of configuration only" },
      { label: "D", text: "Free radical formation" }
    ],
    optionsTamil: [
      { label: "A", text: "கார்போநேரயனி இடைநிலை மற்றும் சுழிமக் கலவை (Racemisation) உருவாக்கும் இருபடி வினை" },
      { label: "B", text: "ஒரே படியில் நிகழும் வினை" },
      { label: "C", text: "முழுமையான வடிவமைப்பு தலைகீழாதல் மட்டுமே" },
      { label: "D", text: "கட்டற்ற ரேடிக்கல் வினை" }
    ],
    correctAnswer: "A",
    explanation: "SN1 involves rate-determining carbocation formation followed by attack from both sides (racemization).",
    explanationTamil: "SN1 வினையானது கார்போநேரயனி இடைநிலை வழியாக இரு படிகளில் நிகழ்ந்து சுழிமக் கலவையைத் தருகிறது."
  },
  {
    code: "CHE-127", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "SN2 nucleophilic substitution reaction proceeds with:",
    questionTextTamil: "SN2 கருக்கவர் பதிலீட்டு வினை எதனுடன் நிகழ்கிறது?",
    options: [
      { label: "A", text: "Single concerted step with 100% Walden inversion of configuration" },
      { label: "B", text: "Carbocation intermediate" },
      { label: "C", text: "Complete racemization" },
      { label: "D", text: "Rearrangement of carbon skeleton" }
    ],
    optionsTamil: [
      { label: "A", text: "ஒரே படியில் வால்டன் தலைகீழாதலுடன் (Inversion of configuration)" },
      { label: "B", text: "கார்போநேரயனி உருவாக்கம்" },
      { label: "C", text: "சுழிமக் கலவை உருவாதல்" },
      { label: "D", text: "மாற்றியமைத்தல்" }
    ],
    correctAnswer: "A",
    explanation: "Backside nucleophilic attack causes inversion of configuration (Walden inversion). Order of reactivity: 1° > 2° > 3°.",
    explanationTamil: "பின்புறத் தாக்குதல் காரணமாக முழுமையான வால்டன் தலைகீழாதல் நிகழ்ந்து வினை நடைபெறுகிறது (1° > 2° > 3°)."
  },
  {
    code: "CHE-128", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Wurtz reaction involves coupling of alkyl halides with sodium in dry ether to form:",
    questionTextTamil: "உலர் ஈதரில் அல்கைல் ஹாலைடு சோடியத்துடன் வினைபுரியும் வுர்ட்ஸ் வினையில் (Wurtz reaction) உருவாவது:",
    options: [
      { label: "A", text: "Symmetrical higher alkanes with even number of carbons" },
      { label: "B", text: "Alkenes" },
      { label: "C", text: "Alcohols" },
      { label: "D", text: "Aldehydes" }
    ],
    optionsTamil: [
      { label: "A", text: "இரட்டை எண்ணிக்கையில் கார்பன்களைக் கொண்ட சமச்சீர் ஆல்கேன்கள்" },
      { label: "B", text: "ஆல்கீன்கள்" },
      { label: "C", text: "ஆல்கஹால்கள்" },
      { label: "D", text: "ஆல்டிஹைடுகள்" }
    ],
    correctAnswer: "A",
    explanation: "2 R-X + 2 Na → R-R + 2 NaX in dry ether.",
    explanationTamil: "2 R-X + 2 Na → R-R + 2 NaX (சமச்சீர் ஆல்கேன்கள் உருவாகின்றன)."
  },
  {
    code: "CHE-129", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Fittig reaction is the reaction of aryl halides with sodium in dry ether to form:",
    questionTextTamil: "அரைல் ஹாலைடு சோடியத்துடன் உலர் ஈதரில் வினைபுரியும் ஃபிட்டிக் வினையில் உருவாவது:",
    options: [
      { label: "A", text: "Diphenyl (Biphenyl)" }, { label: "B", text: "Toluene" }, { label: "C", text: "Benzene" }, { label: "D", text: "Phenol" }
    ],
    optionsTamil: [
      { label: "A", text: "டைபீனைல் (பைபீனைல் - Biphenyl)" },
      { label: "B", text: "தொலுயீன் (வுர்ட்ஸ்-ஃபிட்டிக் வினை)" },
      { label: "C", text: "பென்சீன்" },
      { label: "D", text: "பீனால்" }
    ],
    correctAnswer: "A",
    explanation: "2 C₆H₅Br + 2 Na --dry ether--> C₆H₅-C₆H₅ + 2 NaBr.",
    explanationTamil: "2 C₆H₅Br + 2 Na → C₆H₅-C₆H₅ (டைபீனைல் உருவாகிறது)."
  },
  {
    code: "CHE-130", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Grignard reagent (RMgX) is prepared by reacting alkyl halide with Magnesium in:",
    questionTextTamil: "கிரிக்னார்டு காரணி (RMgX) தயாரிக்க மெக்னீசியத்துடன் அல்கைல் ஹாலைடு எதில் வினைபடுத்தப்படுகிறது?",
    options: [
      { label: "A", text: "Dry ether" }, { label: "B", text: "Water" }, { label: "C", text: "Alcohol" }, { label: "D", text: "Conc. H₂SO₄" }
    ],
    optionsTamil: [
      { label: "A", text: "உலர் ஈதர் (Dry ether)" },
      { label: "B", text: "நீர்" },
      { label: "C", text: "ஆல்கஹால்" },
      { label: "D", text: "அமிலம்" }
    ],
    correctAnswer: "A",
    explanation: "Grignard reagent RMgX reacts vigorously with moisture to give alkane, so strictly dry ether is required.",
    explanationTamil: "கிரிக்னார்டு காரணி நீருடன் தீவிரமாக வினைபுரிந்து ஆல்கேனாக மாறுவதால் உலர் ஈதர் ஊடகத்தில் தயாரிக்கப்படுகிறது."
  },
  {
    code: "CHE-131", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Chloroform (CHCl₃) stored in clear bottles in sunlight undergoes oxidation to form a poisonous gas called:",
    questionTextTamil: "குளோரோஃபார்ம் காற்றில் சூரிய ஒளியில் ஆக்சிஜனேற்றமடைந்து உருவாகும் நச்சு வாயு எது?",
    options: [
      { label: "A", text: "Phosgene (COCl₂)" }, { label: "B", text: "Tear gas (CCl₃NO₂)" }, { label: "C", text: "Mustard gas" }, { label: "D", text: "Carbon monoxide" }
    ],
    optionsTamil: [
      { label: "A", text: "பாஸ்ஜீன் (Phosgene - COCl₂)" },
      { label: "B", text: "கண்ணீர்ப்புகை வாயு" },
      { label: "C", text: "கடுகு வாயு" },
      { label: "D", text: "கார்பன் மோனாக்சைடு" }
    ],
    correctAnswer: "A",
    explanation: "2 CHCl₃ + O₂ --light--> 2 COCl₂ (phosgene) + 2 HCl. Stored in dark brown bottles with 1% ethanol stabilizer.",
    explanationTamil: "சூரிய ஒளியில் பாஸ்ஜீன் (COCl₂) என்ற நச்சு வாயு உருவாகிறது."
  },
  {
    code: "CHE-132", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Iodoform test (formation of yellow precipitate of CHI₃) is given by compounds containing which group?",
    questionTextTamil: "மஞ்சள் நிற அயோடோஃபார்ம் (CHI₃) வீழ்படிவு சோதனையைத் தரும் வேதித் தொகுதி எது?",
    options: [
      { label: "A", text: "CH₃-C=O or CH₃-CH(OH)-" },
      { label: "B", text: "-COOH group" },
      { label: "C", text: "-NH₂ group" },
      { label: "D", text: "-OCH₃ group" }
    ],
    optionsTamil: [
      { label: "A", text: "CH₃-C=O அல்லது CH₃-CH(OH)- தொகுதி" },
      { label: "B", text: "-COOH தொகுதி" },
      { label: "C", text: "-NH₂ தொகுதி" },
      { label: "D", text: "-OCH₃ தொகுதி" }
    ],
    correctAnswer: "A",
    explanation: "Ethanol, acetaldehyde, and methyl ketones (CH₃COR) form yellow CHI₃ when treated with I₂ + NaOH.",
    explanationTamil: "CH₃CO- அல்லது CH₃CH(OH)- தொகுதி கொண்ட சேர்மங்கள் I₂ + NaOH உடன் மஞ்சள் நிற CHI₃-ஐத் தருகின்றன."
  },
  {
    code: "CHE-133", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Finkelstein reaction for preparation of alkyl iodides involves treating alkyl chloride with NaI in:",
    questionTextTamil: "அல்கைல் அயோடைடு தயாரிக்கும் ஃபிங்கில்ஸ்டீன் வினையில் (Finkelstein reaction) பயன்படும் கரைப்பான்:",
    options: [
      { label: "A", text: "Dry Acetone" }, { label: "B", text: "Water" }, { label: "C", text: "Ether" }, { label: "D", text: "Benzene" }
    ],
    optionsTamil: [
      { label: "A", text: "உலர் அசிட்டோன் (Dry Acetone)" },
      { label: "B", text: "நீர்" },
      { label: "C", text: "ஈதர்" },
      { label: "D", text: "பென்சீன்" }
    ],
    correctAnswer: "A",
    explanation: "R-Cl + NaI --dry acetone--> R-I + NaCl↓. NaCl precipitates in acetone, driving reaction forward (Le Chatelier).",
    explanationTamil: "அசிட்டோனில் NaCl கரையாமல் வீழ்படிவாவதால் முன்னோக்கு வினை நடைபெறுகிறது."
  },
  {
    code: "CHE-134", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Swarts reaction is specifically used for the synthesis of:",
    questionTextTamil: "ஸ்வார்ட்ஸ் வினை (Swarts reaction) எதனைத் தயாரிக்கப் பயன்படுகிறது?",
    options: [
      { label: "A", text: "Alkyl fluorides (e.g., CH₃F using AgF or SbF₃)" },
      { label: "B", text: "Alkyl chlorides" },
      { label: "C", text: "Alkyl bromides" },
      { label: "D", text: "Alkyl iodides" }
    ],
    optionsTamil: [
      { label: "A", text: "அல்கைல் புளோரைடுகள் (AgF, CoF₂ போன்ற உலோக புளோரைடுகளைப் பயன்படுத்தி)" },
      { label: "B", text: "அல்கைல் குளோரைடுகள்" },
      { label: "C", text: "அல்கைல் புரோமைடுகள்" },
      { label: "D", text: "அல்கைல் அயோடைடுகள்" }
    ],
    correctAnswer: "A",
    explanation: "R-Br + AgF → R-F + AgBr. Metallic fluorides yield alkyl fluorides conveniently.",
    explanationTamil: "அல்கைல் புளோரைடுகளைத் தயாரிக்க உலோக புளோரைடுகளுடன் ஸ்வார்ட்ஸ் வினை நிகழ்த்தப்படுகிறது."
  },
  {
    code: "CHE-135", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Chlorobenzene is extremely unreactive towards nucleophilic substitution compared to chloroethane because of:",
    questionTextTamil: "குளோரோ ஈத்தேனுடன் ஒப்பிடும் போது குளோரோபென்சீன் கருக்கவர் பதிலீட்டு வினைகளில் மந்தமாக இருப்பதற்கு காரணம்:",
    options: [
      { label: "A", text: "Resonance stabilization giving partial double bond character to C-Cl bond and sp² hybridized carbon" },
      { label: "B", text: "Steric hindrance" },
      { label: "C", text: "High volatility" },
      { label: "D", text: "Non-polar nature" }
    ],
    optionsTamil: [
      { label: "A", text: "உடனிசைவு காரணமாக C-Cl பிணைப்பிற்கு பகுதி இரட்டைப் பிணைப்புத் தன்மை மற்றும் sp² கார்பன் அமைவது" },
      { label: "B", text: "இடநெருக்கடி" },
      { label: "C", text: "எளிதில் ஆவியாதல்" },
      { label: "D", text: "முனைவற்ற தன்மை" }
    ],
    correctAnswer: "A",
    explanation: "Resonance delocalization of chlorine lone pair into benzene ring imparts double-bond character, making C-Cl difficult to cleave.",
    explanationTamil: "உடனிசைவினால் C-Cl பிணைப்பு பகுதி இரட்டைப் பிணைப்பைப் பெற்று வலிமை அடைவதால் எளிதில் பிளக்க முடியாது."
  },

  // 141-160 Alcohols, Phenols & Ethers
  {
    code: "CHE-136", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Lucas test is used to distinguish between primary, secondary, and tertiary alcohols. Lucas reagent is:",
    questionTextTamil: "ஆல்கஹால்களை வேறுபடுத்தப் பயன்படும் லூகாஸ் காரணி என்பது:",
    options: [
      { label: "A", text: "Anhydrous ZnCl₂ + Conc. HCl" },
      { label: "B", text: "Dilute HCl + Zn" },
      { label: "C", text: "Conc. H₂SO₄ + KMnO₄" },
      { label: "D", text: "Br₂ water" }
    ],
    optionsTamil: [
      { label: "A", text: "நீரற்ற ZnCl₂ + அடர் HCl" },
      { label: "B", text: "நீர்த்த HCl + Zn" },
      { label: "C", text: "அடர் கந்தக அமிலம்" },
      { label: "D", text: "புரோமின் நீர்" }
    ],
    correctAnswer: "A",
    explanation: "3° alcohol reacts immediately giving cloudiness; 2° in 5 minutes; 1° does not react at room temperature.",
    explanationTamil: "நீரற்ற ZnCl₂ மற்றும் அடர் HCl கலவை லூகாஸ் காரணியாகும். 3° ஆல்கஹால் உடனடியாக கலங்கலைத் தரும்."
  },
  {
    code: "CHE-137", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Phenol is more acidic than ethanol because:",
    questionTextTamil: "எத்தனாலை விட பீனால் அதிக அமிலத்தன்மை கொண்டதாக இருக்கக் காரணம்:",
    options: [
      { label: "A", text: "Phenoxide ion is resonance stabilized, whereas ethoxide ion is not" },
      { label: "B", text: "Phenol has higher molecular mass" },
      { label: "C", text: "Phenol forms intramolecular H-bonds" },
      { label: "D", text: "Ethanol has planar ring" }
    ],
    optionsTamil: [
      { label: "A", text: "பீனாக்சைடு அயனி உடனிசைவால் நிலைப்புத்தன்மை பெறுகிறது (ஈத்தாக்சைடு அயனி அவ்வாறு நிலைப்பதில்லை)" },
      { label: "B", text: "பீனாலின் மூலக்கூறு நிறை அதிகம்" },
      { label: "C", text: "அக ஹைட்ரஜன் பிணைப்பு" },
      { label: "D", text: "தள வடிவம்" }
    ],
    correctAnswer: "A",
    explanation: "Negative charge in phenoxide ion is delocalized over ortho and para positions of benzene ring.",
    explanationTamil: "பீனாக்சைடு அயனியின் எதிர்மின்சுமை பென்சீன் வளையத்தில் உடனிசைவால் விரவி நிலைப்புத்தன்மை அடைகிறது."
  },
  {
    code: "CHE-138", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Kolbe's reaction of sodium phenoxide with CO₂ at 400 K and 4-7 atm followed by acidification gives:",
    questionTextTamil: "சோடியம் பீனாக்சைடு CO₂-உடன் 400 K அழுத்தத்தில் வினைபுரிந்து அமிலமாக்கும் கோல்ப் வினையில் (Kolbe's reaction) உருவாவது:",
    options: [
      { label: "A", text: "Salicylic acid (2-hydroxybenzoic acid)" },
      { label: "B", text: "Salicylaldehyde" },
      { label: "C", text: "Benzoic acid" },
      { label: "D", text: "Benzene" }
    ],
    optionsTamil: [
      { label: "A", text: "சாலிசிலிக் அமிலம் (ஆஸ்பிரின் தயாரிப்பில் பயன்படுகிறது)" },
      { label: "B", text: "சாலிசிலால்டிஹைடு" },
      { label: "C", text: "பென்சாயிக் அமிலம்" },
      { label: "D", text: "பென்சீன்" }
    ],
    correctAnswer: "A",
    explanation: "Kolbe-Schmitt reaction introduces carboxyl group ortho to phenolic OH, yielding salicylic acid (precursor to aspirin).",
    explanationTamil: "கோல்ப் வினையில் சாலிசிலிக் அமிலம் உருவாகிறது, இது ஆஸ்பிரின் மருந்து தயாரிப்பில் பயன்படுகிறது."
  },
  {
    code: "CHE-139", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Reimer-Tiemann reaction of phenol with CHCl₃ and aqueous NaOH introduces which group to form salicylaldehyde?",
    questionTextTamil: "பீனால் CHCl₃ மற்றும் NaOH-உடன் வினைபுரியும் ரீமர்-டீமன் வினையில் சாலிசிலால்டிஹைடு உருவாக அறிமுகமாகும் தொகுதி:",
    options: [
      { label: "A", text: "-CHO (formyl group) at ortho position via dichlorocarbene (:CCl₂)" },
      { label: "B", text: "-COOH group" },
      { label: "C", text: "-CH₃ group" },
      { label: "D", text: "-NO₂ group" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆர்த்தோ நிலையில் -CHO தொகுதி (:CCl₂ டைகுளோரோகார்பீன் இடைநிலை மூலம்)" },
      { label: "B", text: "-COOH தொகுதி" },
      { label: "C", text: "-CH₃ தொகுதி" },
      { label: "D", text: "-NO₂ தொகுதி" }
    ],
    correctAnswer: "A",
    explanation: "Reimer-Tiemann reaction involves electrophilic attack of dichlorocarbene (:CCl₂) on phenoxide, forming salicylaldehyde.",
    explanationTamil: "ரீமர்-டீமன் வினையில் பீனாலுடன் குளோரோஃபார்ம் வினைபுரிந்து சாலிசிலால்டிஹைடு உருவாகிறது."
  },
  {
    code: "CHE-140", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Williamson's synthesis for preparation of symmetrical and unsymmetrical ethers is an SN2 reaction between:",
    questionTextTamil: "ஈதர்கள் தயாரிக்கும் வில்லியம்சன் தொகுப்பு முறையில் எவற்றுக்கிடையே SN2 வினை நிகழ்கிறது?",
    options: [
      { label: "A", text: "Sodium alkoxide (R-ONa) and primary alkyl halide (R'-X)" },
      { label: "B", text: "Tertiary alkyl halide and alcohol" },
      { label: "C", text: "Two alcohols with conc. H₂SO₄" },
      { label: "D", text: "Grignard reagent and ester" }
    ],
    optionsTamil: [
      { label: "A", text: "சோடியம் அல்காக்சைடு (R-ONa) மற்றும் முதன்மை அல்கைல் ஹாலைடு (R'-X)" },
      { label: "B", text: "மூன்றாம் நிலை ஹாலைடு மற்றும் ஆல்கஹால்" },
      { label: "C", text: "இரு ஆல்கஹால்கள்" },
      { label: "D", text: "கிரிக்னார்டு காரணி" }
    ],
    correctAnswer: "A",
    explanation: "R-O⁻ Na⁺ + R'-X → R-O-R' + NaX. Alkyl halide must be 1° to avoid competing E2 elimination.",
    explanationTamil: "வில்லியம்சன் முறையில் அல்காக்சைடு அயனி முதன்மை அல்கைல் ஹாலைடைத் தாக்கி ஈதரைத் தருகிறது."
  },
  {
    code: "CHE-141", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Picric acid is chemically:",
    questionTextTamil: "பிக்ரிக் அமிலம் (Picric acid) என்பது வேதியியல் ரீதியாக:",
    options: [
      { label: "A", text: "2,4,6-Trinitrophenol" }, { label: "B", text: "2,4,6-Trinitrotoluene (TNT)" }, { label: "C", text: "o-Nitrophenol" }, { label: "D", text: "Trinitrobenzene" }
    ],
    optionsTamil: [
      { label: "A", text: "2,4,6-டிரைநைட்ரோபீனால்" },
      { label: "B", text: "TNT (டிரைநைட்ரோதொலுயீன்)" },
      { label: "C", text: "ஆர்த்தோ நைட்ரோபீனால்" },
      { label: "D", text: "டிரைநைட்ரோபென்சீன்" }
    ],
    correctAnswer: "A",
    explanation: "Nitration of phenol with conc. HNO₃ in conc. H₂SO₄ yields 2,4,6-trinitrophenol (picric acid), a strong organic acid.",
    explanationTamil: "பீனாலை அடர் நைட்ரிக் அமிலத்துடன் நைட்ரோயேற்றம் செய்யும்போது பிக்ரிக் அமிலம் உருவாகிறது."
  },
  {
    code: "CHE-142", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Distillation of phenol with zinc dust yields:",
    questionTextTamil: "பீனாலை துத்தநாகத் தூளுடன் காய்ச்சி வடித்தால் கிடைப்பது:",
    options: [
      { label: "A", text: "Benzene" }, { label: "B", text: "Toluene" }, { label: "C", text: "Benzoic acid" }, { label: "D", text: "Cyclohexane" }
    ],
    optionsTamil: [
      { label: "A", text: "பென்சீன் (Benzene)" },
      { label: "B", text: "தொலுயீன்" },
      { label: "C", text: "பென்சாயிக் அமிலம்" },
      { label: "D", text: "சைக்ளோஹெக்சேன்" }
    ],
    correctAnswer: "A",
    explanation: "C₆H₅OH + Zn → C₆H₅ + ZnO (deoxygenation of phenol to benzene).",
    explanationTamil: "C₆H₅OH + Zn → C₆H₆ + ZnO (பீனால் பென்சீனாக ஒடுக்கமடைகிறது)."
  },

  // 143-160 Aldehydes, Ketones & Carboxylic Acids
  {
    code: "CHE-143", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Rosenmund reduction converts acyl chlorides (acid chlorides) into aldehydes using which catalyst?",
    questionTextTamil: "அமில குளோரைடுகளை ஆல்டிஹைடுகளாக ஒடுக்கும் ரோசன்மண்ட் வினையில் (Rosenmund reduction) பயன்படும் வினைவேக மாற்றி:",
    options: [
      { label: "A", text: "Pd / BaSO₄ poisoned with sulphur or quinoline" },
      { label: "B", text: "Ni / H₂" },
      { label: "C", text: "LiAlH₄" },
      { label: "D", text: "NaBH₄" }
    ],
    optionsTamil: [
      { label: "A", text: "கந்தகம் அல்லது குயினோலினால் விஷமூட்டப்பட்ட Pd / BaSO₄ (லிண்ட்லர் வினையூக்கி போன்றது)" },
      { label: "B", text: "நிக்கல்" },
      { label: "C", text: "LiAlH₄" },
      { label: "D", text: "NaBH₄" }
    ],
    correctAnswer: "A",
    explanation: "R-COCl + H₂ --Pd/BaSO₄--> R-CHO + HCl. Poisoning prevents further reduction of aldehyde to alcohol.",
    explanationTamil: "ரோசன்மண்ட் வினையில் அமில குளோரைடு ஆல்டிஹைடாக ஒடுக்கப்படுகிறது."
  },
  {
    code: "CHE-144", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Stephen's reaction reduces nitriles (cyanides) to aldehydes using:",
    questionTextTamil: "சைனைடுகளை (Nitriles) ஆல்டிஹைடுகளாக மாற்றும் ஸ்டீபன் வினையில் பயன்படுவது:",
    options: [
      { label: "A", text: "SnCl₂ + Conc. HCl followed by hydrolysis" },
      { label: "B", text: "LiAlH₄" },
      { label: "C", text: "KMnO₄" },
      { label: "D", text: "Zn / HCl" }
    ],
    optionsTamil: [
      { label: "A", text: "SnCl₂ + அடர் HCl மற்றும் நீராற்பகுப்பு" },
      { label: "B", text: "LiAlH₄" },
      { label: "C", text: "KMnO₄" },
      { label: "D", text: "துத்தநாகம்" }
    ],
    correctAnswer: "A",
    explanation: "R-CN + SnCl₂ + HCl → R-CH=NH·HCl --H₂O--> R-CHO + NH₄Cl.",
    explanationTamil: "SnCl₂ மற்றும் HCl முன்னிலையில் இமைனாக ஒடுக்கப்பட்டு நீராற்பகுப்பில் ஆல்டிஹைடு தருகிறது."
  },
  {
    code: "CHE-145", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Aldol condensation is shown by aldehydes or ketones containing:",
    questionTextTamil: "ஆல்டால் குறுக்க வினை (Aldol condensation) நிகழ ஆல்டிஹைடு அல்லது கீட்டோனில் என்ன இருக்க வேண்டும்?",
    options: [
      { label: "A", text: "At least one α-hydrogen atom" },
      { label: "B", text: "No α-hydrogen atom" },
      { label: "C", text: "Aromatic ring only" },
      { label: "D", text: "Halogen atom" }
    ],
    optionsTamil: [
      { label: "A", text: "குறைந்தது ஒரு ஆல்ஃபா-ஹைட்ரஜன் (α-H) அணு இருக்க வேண்டும்" },
      { label: "B", text: "ஆல்ஃபா-ஹைட்ரஜன் இருக்கக் கூடாது" },
      { label: "C", text: "அரோமேட்டிக் வளையம் மட்டுமே" },
      { label: "D", text: "ஹாலஜன்" }
    ],
    correctAnswer: "A",
    explanation: "Dilute alkali abstracts acidic α-hydrogen to form enolate ion, which attacks carbonyl carbon.",
    explanationTamil: "ஆல்ஃபா-ஹைட்ரஜன் கொண்ட ஆல்டிஹைடுகள் நீர்த்த காரத்தின் முன்னிலையில் ஆல்டால் குறுக்கம் அடைகின்றன."
  },
  {
    code: "CHE-146", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Cannizzaro reaction is a self-redox (disproportionation) reaction shown by aldehydes that:",
    questionTextTamil: "கானிசரோ வினையை (Cannizzaro reaction) வெளிப்படுத்தும் ஆல்டிஹைடுகளின் பண்பு:",
    options: [
      { label: "A", text: "Do not contain any α-hydrogen atom (e.g., HCHO, C₆H₅CHO)" },
      { label: "B", text: "Contain α-hydrogen atoms" },
      { label: "C", text: "Are ketones only" },
      { label: "D", text: "Contain double bonds" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆல்ஃபா-ஹைட்ரஜன் அணு இல்லாத ஆல்டிஹைடுகள் (எ.கா. ஃபார்மால்டிஹைடு, பென்சால்டிஹைடு)" },
      { label: "B", text: "ஆல்ஃபா-ஹைட்ரஜன் உள்ளவை" },
      { label: "C", text: "கீட்டோன்கள்" },
      { label: "D", text: "இரட்டைப் பிணைப்பு உள்ளவை" }
    ],
    correctAnswer: "A",
    explanation: "In conc. alkali: 2 HCHO + NaOH → CH₃OH (reduction) + HCOONa (oxidation).",
    explanationTamil: "ஆல்ஃபா-ஹைட்ரஜன் அற்ற ஆல்டிஹைடுகள் அடர் காரத்துடன் விகிதச்சிதைவு வினையில் ஆல்கஹால் மற்றும் அமில உப்பைத் தருகின்றன."
  },
  {
    code: "CHE-147", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Clemmensen reduction converts carbonyl (>C=O) group of aldehydes or ketones into methylene (>CH₂) group using:",
    questionTextTamil: "கார்பனைல் தொகுதியை (>C=O) மெத்திலீன் தொகுதியாக (>CH₂) மாற்றும் கிளமென்சன் ஒடுக்கத்தில் (Clemmensen reduction) பயன்படுவது:",
    options: [
      { label: "A", text: "Zinc amalgam and conc. HCl (Zn-Hg / conc. HCl)" },
      { label: "B", text: "Hydrazine and KOH (Wolff-Kishner)" },
      { label: "C", text: "LiAlH₄" },
      { label: "D", text: "H₂ / Pd" }
    ],
    optionsTamil: [
      { label: "A", text: "துத்தநாக ரசக்கலவை மற்றும் அடர் HCl (Zn-Hg / அடர் HCl)" },
      { label: "B", text: "ஹைட்ரசீன் மற்றும் KOH (வுல்ஃப்-கிஷ்னர்)" },
      { label: "C", text: "LiAlH₄" },
      { label: "D", text: "H₂ / Pd" }
    ],
    correctAnswer: "A",
    explanation: "Clemmensen reduction: >C=O + 4[H] --Zn(Hg)/HCl--> >CH₂ + H₂O.",
    explanationTamil: "துத்தநாக ரசக்கலவை மற்றும் அடர் HCl முன்னிலையில் கார்பனைல் தொகுதி ஹைட்ரோகார்பனாக மாறுகிறது."
  },
  {
    code: "CHE-148", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Wolff-Kishner reduction uses which reagent to reduce carbonyl groups to hydrocarbons?",
    questionTextTamil: "வுல்ஃப்-கிஷ்னர் ஒடுக்க வினையில் (Wolff-Kishner) பயன்படும் காரணி எது?",
    options: [
      { label: "A", text: "Hydrazine (NH₂NH₂) followed by heating with KOH in ethylene glycol" },
      { label: "B", text: "Zn-Hg / HCl" },
      { label: "C", text: "Na / alcohol" },
      { label: "D", text: "P / HI" }
    ],
    optionsTamil: [
      { label: "A", text: "ஹைட்ரசீன் (NH₂NH₂) மற்றும் எத்திலீன் கிளைக்காலில் KOH உடன் சூடுபடுத்துதல்" },
      { label: "B", text: "Zn-Hg / HCl" },
      { label: "C", text: "Na / ஆல்கஹால்" },
      { label: "D", text: "பாஸ்பரஸ்" }
    ],
    correctAnswer: "A",
    explanation: "Forms hydrazone intermediate, which on heating with strong base in glycol eliminates N₂ to yield alkane.",
    explanationTamil: "ஹைட்ரசீன் மற்றும் KOH கார ஊடகத்தில் N₂ வாயுவை வெளியேற்றி ஆல்கேனாக ஒடுக்குகிறது."
  },
  {
    code: "CHE-149", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Tollens' reagent used to distinguish aldehydes from ketones is:",
    questionTextTamil: "ஆல்டிஹைடுகளைக் கண்டறியப் பயன்படும் டாலன்ஸ் காரணி (Tollens' reagent) என்பது:",
    options: [
      { label: "A", text: "Ammoniacal silver nitrate solution [Ag(NH₃)₂]⁺ OH⁻" },
      { label: "B", text: "Alkaline copper sulphate + sodium potassium tartrate" },
      { label: "C", text: "Neutral FeCl₃" },
      { label: "D", text: "K₂Cr₂O₇ / H₂SO₄" }
    ],
    optionsTamil: [
      { label: "A", text: "அம்மோனியா கலந்த சில்வர் நைட்ரேட் கரைசல் (வெள்ளி ஆடி சோதனையைத் தரும்)" },
      { label: "B", text: "பெலிங் கரைசல்" },
      { label: "C", text: "FeCl₃" },
      { label: "D", text: "பொட்டாசியம் டைக்ரோமேட்" }
    ],
    correctAnswer: "A",
    explanation: "Aldehydes reduce Tollens' reagent to form a shining silver mirror on the inner wall of test tube.",
    explanationTamil: "ஆல்டிஹைடுகள் டாலன்ஸ் காரணியை ஒடுக்கி பளபளப்பான வெள்ளி ஆடியை உருவாக்குகின்றன."
  },
  {
    code: "CHE-150", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Fehling's solution test gives a red precipitate of which oxide with aliphatic aldehydes?",
    questionTextTamil: "பெலிங் சோதனையில் அலிஃபாட்டிக் ஆல்டிஹைடுகள் எந்த சேர்மத்தின் சிவப்பு நிற வீழ்படிவைத் தருகின்றன?",
    options: [
      { label: "A", text: "Cuprous oxide (Cu₂O)" }, { label: "B", text: "Cupric oxide (CuO)" }, { label: "C", text: "CuSO₄" }, { label: "D", text: "CuCl₂" }
    ],
    optionsTamil: [
      { label: "A", text: "குப்ரஸ் ஆக்சைடு (Cu₂O - சிவப்பு வீழ்படிவு)" },
      { label: "B", text: "குப்ரிக் ஆக்சைடு" },
      { label: "C", text: "தாமிர சல்பேட்" },
      { label: "D", text: "குளோரைடு" }
    ],
    correctAnswer: "A",
    explanation: "R-CHO + 2 Cu²⁺ + 5 OH⁻ → R-COO⁻ + Cu₂O↓ (red) + 3 H₂O.",
    explanationTamil: "ஆல்டிஹைடு Cu²⁺ அயனியை Cu₂O (செம்பழுப்பு வீழ்படிவு) ஆக ஒடுக்குகிறது."
  },
  {
    code: "CHE-151", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Hell-Volhard-Zelinsky (HVZ) reaction chlorinates or brominates carboxylic acids at:",
    questionTextTamil: "ஹெல்-வோல்ஹார்ட்-ஜெலின்ஸ்கி (HVZ) வினையில் கார்பாக்சிலிக் அமிலத்தின் எந்த கார்பனில் ஹாலஜனேற்றம் நிகழ்கிறது?",
    options: [
      { label: "A", text: "α-carbon position in presence of red phosphorus" },
      { label: "B", text: "β-carbon position" },
      { label: "C", text: "Carboxyl carbon" },
      { label: "D", text: "Benzene ring" }
    ],
    optionsTamil: [
      { label: "A", text: "சிவப்பு பாஸ்பரஸ் முன்னிலையில் ஆல்ஃபா (α) கார்பனில்" },
      { label: "B", text: "பீட்டா கார்பனில்" },
      { label: "C", text: "கார்பாக்சில் கார்பனில்" },
      { label: "D", text: "பென்சீன் வளையத்தில்" }
    ],
    correctAnswer: "A",
    explanation: "R-CH₂-COOH + X₂ --red P--> R-CH(X)-COOH + HX.",
    explanationTamil: "சிவப்பு பாஸ்பரஸ் முன்னிலையில் ஆல்ஃபா-ஹைட்ரஜன் நீக்கப்பட்டு α-ஹாலோ அமிலம் உருவாகிறது."
  },
  {
    code: "CHE-152", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Aspirin is chemically prepared by acetylation of salicylic acid and is:",
    questionTextTamil: "ஆஸ்பிரின் (Aspirin) என்பது வேதியியல் ரீதியாக:",
    options: [
      { label: "A", text: "Acetylsalicylic acid" }, { label: "B", text: "Methyl salicylate (Oil of wintergreen)" }, { label: "C", text: "Phenyl salicylate (Salol)" }, { label: "D", text: "Sodium salicylate" }
    ],
    optionsTamil: [
      { label: "A", text: "அசிட்டைல் சாலிசிலிக் அமிலம் (Acetylsalicylic acid)" },
      { label: "B", text: "மெத்தில் சாலிசிலேட்" },
      { label: "C", text: "ஃபீனைல் சாலிசிலேட்" },
      { label: "D", text: "சோடியம் சாலிசிலேட்" }
    ],
    correctAnswer: "A",
    explanation: "Salicylic acid + Acetic anhydride --H⁺--> Acetylsalicylic acid (aspirin, painkiller/antipyretic).",
    explanationTamil: "சாலிசிலிக் அமிலத்தை அசிட்டைலேற்றம் செய்து ஆஸ்பிரின் தயாரிக்கப்படுகிறது."
  },

  // 153-170 Nitrogen Compounds (Amines & Diazonium Salts)
  {
    code: "CHE-153", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Gabriel phthalimide synthesis is exclusively used for the preparation of:",
    questionTextTamil: "கேப்ரியல் தாலிமைடு தொகுப்பு முறை எதனைத் தயாரிக்க மட்டுமே பயன்படுகிறது?",
    options: [
      { label: "A", text: "Primary aliphatic amines" },
      { label: "B", text: "Aromatic primary amines (aniline)" },
      { label: "C", text: "Secondary amines" },
      { label: "D", text: "Tertiary amines" }
    ],
    optionsTamil: [
      { label: "A", text: "முதன்மை அலிஃபாட்டிக் அமீன்கள் (Primary aliphatic amines)" },
      { label: "B", text: "அரோமேட்டிக் அமீன்கள் (அனிலின் தயாரிக்க முடியாது)" },
      { label: "C", text: "இரண்டாம் நிலை அமீன்கள்" },
      { label: "D", text: "மூன்றாம் நிலை அமீன்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Aryl halides do not undergo nucleophilic substitution with potassium phthalimide, so aniline cannot be prepared.",
    explanationTamil: "அரைல் ஹாலைடுகள் கருக்கவர் பதிலீட்டிற்கு உட்படாததால் இம்முறையில் அனிலினைத் தயாரிக்க முடியாது."
  },
  {
    code: "CHE-154", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Hoffmann's bromamide degradation reaction converts an amide into an amine having:",
    questionTextTamil: "ஹாஃப்மனின் புரோமமைடு சிதைவு வினையில் அமைடு எந்த வகை அமீனாக மாறுகிறது?",
    options: [
      { label: "A", text: "One carbon less than the starting amide" },
      { label: "B", text: "One carbon more" },
      { label: "C", text: "Same number of carbons" },
      { label: "D", text: "Two carbons less" }
    ],
    optionsTamil: [
      { label: "A", text: "தொடக்க அமைடை விட ஒரு கார்பன் குறைவாகக் கொண்ட முதன்மை அமீன்" },
      { label: "B", text: "ஒரு கார்பன் அதிகம்" },
      { label: "C", text: "சம எண்ணிக்கையிலான கார்பன்" },
      { label: "D", text: "இரண்டு கார்பன் குறைவு" }
    ],
    correctAnswer: "A",
    explanation: "R-CONH₂ + Br₂ + 4 KOH → R-NH₂ + K₂CO₃ + 2 KBr + 2 H₂O (step-down degradation).",
    explanationTamil: "R-CONH₂ சேர்மம் Br₂/KOH-உடன் ஒரு கார்பன் குறைந்த R-NH₂ அமீனாக மாறுகிறது."
  },
  {
    code: "CHE-155", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Carbylamine test (isocyanide test) is a specific diagnostic test for:",
    questionTextTamil: "கார்பைலமீன் சோதனை (ஐசோசயனைடு சோதனை) எதனைக் கண்டறியும் பிரத்யேக சோதனையாகும்?",
    options: [
      { label: "A", text: "Primary amines (both aliphatic and aromatic)" },
      { label: "B", text: "Secondary amines" },
      { label: "C", text: "Tertiary amines" },
      { label: "D", text: "Amides" }
    ],
    optionsTamil: [
      { label: "A", text: "முதன்மை அமீன்கள் (அலிஃபாட்டிக் மற்றும் அரோமேட்டிக் 1° அமீன்கள்)" },
      { label: "B", text: "2° அமீன்கள்" },
      { label: "C", text: "3° அமீன்கள்" },
      { label: "D", text: "அமைடுகள்" }
    ],
    correctAnswer: "A",
    explanation: "R-NH₂ + CHCl₃ + 3 KOH --heat--> R-NC (extremely foul-smelling isocyanide/carbylamine) + 3 KCl + 3 H₂O.",
    explanationTamil: "முதன்மை அமீன்கள் குளோரோஃபார்ம் மற்றும் KOH உடன் அருவருக்கத்தக்க வாசனையுடைய ஐசோசயனைடைத் தருகின்றன."
  },
  {
    code: "CHE-156", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Hinsberg's reagent used for distinguishing primary, secondary, and tertiary amines is:",
    questionTextTamil: "அமீன்களை வேறுபடுத்தப் பயன்படும் ஹின்ஸ்பெர்க் காரணி (Hinsberg's reagent) என்பது:",
    options: [
      { label: "A", text: "Benzenesulphonyl chloride (C₆H₅SO₂Cl)" },
      { label: "B", text: "Benzoyl chloride" },
      { label: "C", text: "Acetyl chloride" },
      { label: "D", text: "Thionyl chloride" }
    ],
    optionsTamil: [
      { label: "A", text: "பென்சீன்சல்போனைல் குளோரைடு (C₆H₅SO₂Cl)" },
      { label: "B", text: "பென்சாயில் குளோரைடு" },
      { label: "C", text: "அசிட்டைல் குளோரைடு" },
      { label: "D", text: "தயோனைல் குளோரைடு" }
    ],
    correctAnswer: "A",
    explanation: "1° amine gives sulphonamide soluble in alkali; 2° amine gives insoluble sulphonamide; 3° amine does not react.",
    explanationTamil: "பென்சீன்சல்போனைல் குளோரைடுடன் 1°, 2°, 3° அமீன்கள் வெவ்வேறு முறையில் செயல்பட்டு வேறுபடுகின்றன."
  },
  {
    code: "CHE-157", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Diazotization reaction of aniline with NaNO₂ + HCl at 0-5°C produces:",
    questionTextTamil: "0-5°C வெப்பநிலையில் அனிலின் NaNO₂ மற்றும் HCl-உடன் வினைபுரியும் டயசோ ஆக்கல் வினையில் உருவாவது:",
    options: [
      { label: "A", text: "Benzenediazonium chloride (C₆H₅N₂⁺ Cl⁻)" },
      { label: "B", text: "Nitrobenzene" },
      { label: "C", text: "Phenol" },
      { label: "D", text: "Chlorobenzene" }
    ],
    optionsTamil: [
      { label: "A", text: "பென்சீன்டயசோனியம் குளோரைடு (C₆H₅N₂⁺ Cl⁻)" },
      { label: "B", text: "நைட்ரோபென்சீன்" },
      { label: "C", text: "பீனால்" },
      { label: "D", text: "குளோரோபென்சீன்" }
    ],
    correctAnswer: "A",
    explanation: "C₆H₅NH₂ + HNO₂ + HCl --273-278 K--> C₆H₅N₂⁺ Cl⁻ + 2 H₂O. Stable at low temperature.",
    explanationTamil: "குளிர்ந்த நிலையில் அனிலின் நைட்ரஸ் அமிலத்துடன் பென்சீன்டயசோனியம் குளோரைடைத் தருகிறது."
  },
  {
    code: "CHE-158", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Sandmeyer reaction replaces the diazonium group in benzenediazonium chloride by Cl or Br using:",
    questionTextTamil: "சான்ட்மேயர் வினையில் (Sandmeyer reaction) பென்சீன்டயசோனியம் குளோரைடிலிருந்து குளோரோபென்சீன் தயாரிக்கப் பயன்படுவது:",
    options: [
      { label: "A", text: "Cu₂Cl₂ / HCl or Cu₂Br₂ / HBr" },
      { label: "B", text: "Copper powder / HCl (Gattermann)" },
      { label: "C", text: "KI" },
      { label: "D", text: "HBF₄" }
    ],
    optionsTamil: [
      { label: "A", text: "Cu₂Cl₂ / HCl அல்லது Cu₂Br₂ / HBr" },
      { label: "B", text: "தாமிரத்தூள் / HCl (காட்டர்மேன் வினை)" },
      { label: "C", text: "KI" },
      { label: "D", text: "HBF₄" }
    ],
    correctAnswer: "A",
    explanation: "Sandmeyer uses cuprous halide (Cu₂X₂ / HX). Gattermann reaction uses Cu powder.",
    explanationTamil: "சான்ட்மேயர் வினையில் குப்ரஸ் ஹாலைடுகள் (Cu₂Cl₂/HCl) வினைவேக மாற்றியாகப் பயன்படுகின்றன."
  },
  {
    code: "CHE-159", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Coupling reaction of benzenediazonium chloride with phenol in weakly basic medium (pH 9-10) yields:",
    questionTextTamil: "கார ஊடகத்தில் பென்சீன்டயசோனியம் குளோரைடு பீனாலுடன் இணையும் வினையில் கிடைக்கும் சேர்மம்:",
    options: [
      { label: "A", text: "p-Hydroxyazobenzene (orange dye)" },
      { label: "B", text: "p-Aminoazobenzene (yellow dye)" },
      { label: "C", text: "Chlorobenzene" },
      { label: "D", text: "Diphenyl ether" }
    ],
    optionsTamil: [
      { label: "A", text: "பாரா-ஹைட்ராக்ஸிஅசோபென்சீன் (ஆரஞ்சு நிற சாயம்)" },
      { label: "B", text: "பாரா-அமினோஅசோபென்சீன்" },
      { label: "C", text: "குளோரோபென்சீன்" },
      { label: "D", text: "ஈதர்" }
    ],
    correctAnswer: "A",
    explanation: "C₆H₅N₂⁺ Cl⁻ + C₆H₅OH --OH⁻--> p-HOC₆H₄-N=N-C₆H₅ (bright orange azo dye).",
    explanationTamil: "இணைப்பு வினையின் மூலம் ஆரஞ்சு நிற பாரா-ஹைட்ராக்ஸிஅசோபென்சீன் சாயம் உருவாகிறது."
  },
  {
    code: "CHE-160", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "The strongest base in aqueous solution among methylamines is:",
    questionTextTamil: "நீர்க்கரைசலில் மெத்தில் அமீன்களுள் மிக வலிமையான காரத்தன்மை கொண்டது எது?",
    options: [
      { label: "A", text: "(CH₃)₂NH (secondary amine)" },
      { label: "B", text: "CH₃NH₂ (primary amine)" },
      { label: "C", text: "(CH₃)₃N (tertiary amine)" },
      { label: "D", text: "NH₃ (ammonia)" }
    ],
    optionsTamil: [
      { label: "A", text: "(CH₃)₂NH (டைமெத்தில் அமீன் - 2° அமீன்)" },
      { label: "B", text: "CH₃NH₂ (1°)" },
      { label: "C", text: "(CH₃)₃N (3°)" },
      { label: "D", text: "NH₃" }
    ],
    correctAnswer: "A",
    explanation: "Due to combined inductive, solvation, and steric effects, basicity order in water is (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃.",
    explanationTamil: "தூண்டல் விளைவு, நீரேற்ற ஆற்றல் மற்றும் இடநெருக்கடி காரணமாக (CH₃)₂NH அதிக காரத்தன்மை கொண்டது."
  },

  // 161-175 Biomolecules & Polymers
  {
    code: "CHE-161", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Glucose and Fructose are related as:",
    questionTextTamil: "குளுக்கோஸ் மற்றும் பிரக்டோஸ் எவ்வகையான மாற்றியங்கள்?",
    options: [
      { label: "A", text: "Functional isomers (aldohexose and ketohexose)" },
      { label: "B", text: "Chain isomers" },
      { label: "C", text: "Position isomers" },
      { label: "D", text: "Enantiomers" }
    ],
    optionsTamil: [
      { label: "A", text: "வினைச்செயல் தொகுதி மாற்றியங்கள் (ஆல்டோஹெக்சோஸ் மற்றும் கீட்டோஹெக்சோஸ்)" },
      { label: "B", text: "சங்கிலி மாற்றியங்கள்" },
      { label: "C", text: "இட மாற்றியங்கள்" },
      { label: "D", text: "ஒளி மாற்றியங்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Both have molecular formula C₆H₁₂O₆. Glucose is an aldohexose (-CHO), Fructose is a ketohexose (>C=O).",
    explanationTamil: "குளுக்கோஸ் (-CHO) மற்றும் பிரக்டோஸ் (>C=O) வினைச்செயல் தொகுதி மாற்றியங்களாகும்."
  },
  {
    code: "CHE-162", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Sucrose (cane sugar) on hydrolysis yields an equimolar mixture of:",
    questionTextTamil: "சுக்ரோஸ் நீராற்பகுக்கப்படும் போது உருவாகும் சமமோலார் கலவை:",
    options: [
      { label: "A", text: "D-(+)-Glucose and D-(-)-Fructose (Invert sugar)" },
      { label: "B", text: "Two glucose molecules" },
      { label: "C", text: "Two fructose molecules" },
      { label: "D", text: "Glucose and Galactose" }
    ],
    optionsTamil: [
      { label: "A", text: "D-(+)-குளுக்கோஸ் மற்றும் D-(-)-பிரக்டோஸ் (தலைகீழ் சர்க்கரை)" },
      { label: "B", text: "இரு குளுக்கோஸ் மூலக்கூறுகள்" },
      { label: "C", text: "இரு பிரக்டோஸ் மூலக்கூறுகள்" },
      { label: "D", text: "குளுக்கோஸ் மற்றும் காலக்டோஸ்" }
    ],
    correctAnswer: "A",
    explanation: "C₁₂H₂₂O₁₁ + H₂O → D-glucose + D-fructose. The optical rotation inverts from dextro to laevo (invert sugar).",
    explanationTamil: "சுக்ரோஸ் நீராற்பகுப்பில் குளுக்கோஸ் மற்றும் பிரக்டோஸ் உருவாவதுடன் ஒளிசுழற்சி தலைகீழாக மாறுகிறது."
  },
  {
    code: "CHE-163", subject: "Chemistry", topic: "Biomolecules", difficulty: "medium",
    questionText: "Proteins are polymers of α-amino acids linked together by:",
    questionTextTamil: "புரதங்களில் ஆல்ஃபா அமினோ அமிலங்களை ஒன்றிணைக்கும் பிணைப்பு எது?",
    options: [
      { label: "A", text: "Peptide bonds (-CO-NH-)" },
      { label: "B", text: "Glycosidic bonds" },
      { label: "C", text: "Phosphodiester bonds" },
      { label: "D", text: "Ester bonds" }
    ],
    optionsTamil: [
      { label: "A", text: "பெப்டைட் பிணைப்புகள் (-CO-NH-)" },
      { label: "B", text: "கிளைகோசிடிக் பிணைப்புகள்" },
      { label: "C", text: "பாஸ்போடைஎஸ்டர் பிணைப்புகள்" },
      { label: "D", text: "எஸ்டர் பிணைப்புகள்" }
    ],
    correctAnswer: "A",
    explanation: "Amide linkage formed between -COOH of one amino acid and -NH₂ of next amino acid is a peptide bond.",
    explanationTamil: "அமினோ அமிலங்களுக்கு இடையே நீர் மூலக்கூறு வெளியேறி உருவாகும் அமைடு பிணைப்பு பெப்டைட் பிணைப்பாகும்."
  },
  {
    code: "CHE-164", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Deficiency of Vitamin C (Ascorbic acid) leads to which disease?",
    questionTextTamil: "வைட்டமின் C (அஸ்கார்பிக் அமிலம்) குறைபாட்டினால் ஏற்படும் நோய் எது?",
    options: [
      { label: "A", text: "Scurvy (bleeding gums)" },
      { label: "B", text: "Rickets" },
      { label: "C", text: "Beri-beri" },
      { label: "D", text: "Night blindness" }
    ],
    optionsTamil: [
      { label: "A", text: "ஸ்கர்வி (ஈறுகளில் ரத்தக்கசிவு)" },
      { label: "B", text: "ரிக்கெட்ஸ் (வைட்டமின் D)" },
      { label: "C", text: "பெரிபெரி (வைட்டமின் B1)" },
      { label: "D", text: "மாலைக்கண் நோய் (வைட்டமின் A)" }
    ],
    correctAnswer: "A",
    explanation: "Vitamin C is essential for collagen synthesis; deficiency causes scurvy with bleeding gums and poor wound healing.",
    explanationTamil: "வைட்டமின் C குறைபாட்டினால் ஸ்கர்வி நோய் ஏற்படுகிறது."
  },
  {
    code: "CHE-165", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Which base is present in RNA but NOT in DNA?",
    questionTextTamil: "DNA-வில் இல்லாமல் RNA-வில் மட்டுமே உள்ள நைட்ரஜன் காரம் எது?",
    options: [
      { label: "A", text: "Uracil (U)" }, { label: "B", text: "Thymine (T)" }, { label: "C", text: "Adenine (A)" }, { label: "D", text: "Guanine (G)" }
    ],
    optionsTamil: [
      { label: "A", text: "யுராசில் (Uracil - U)" },
      { label: "B", text: "தயமின் (DNA-வில் மட்டுமே உள்ளது)" },
      { label: "C", text: "அடினைன்" },
      { label: "D", text: "குவானைன்" }
    ],
    correctAnswer: "A",
    explanation: "DNA contains A, G, C, T. In RNA, Thymine is replaced by Uracil (U).",
    explanationTamil: "DNA-ல் உள்ள தயமினுக்குப் பதிலாக RNA-ல் யுராசில் (U) உள்ளது."
  },
  {
    code: "CHE-166", subject: "Chemistry", topic: "Biomolecules", difficulty: "medium",
    questionText: "In DNA double helix, Adenine pairs with Thymine through:",
    questionTextTamil: "DNA இரட்டைச் சுருள் அமைப்பில் அடினைன் (A) மற்றும் தயமின் (T) இடையே உள்ள பிணைப்பு:",
    options: [
      { label: "A", text: "Two hydrogen bonds (A = T)" },
      { label: "B", text: "Three hydrogen bonds (G ≡ C)" },
      { label: "C", text: "Covalent bond" },
      { label: "D", text: "Ionic bond" }
    ],
    optionsTamil: [
      { label: "A", text: "இரண்டு ஹைட்ரஜன் பிணைப்புகள் (A = T)" },
      { label: "B", text: "மூன்று ஹைட்ரஜன் பிணைப்புகள் (G ≡ C)" },
      { label: "C", text: "சகப்பிணைப்பு" },
      { label: "D", text: "அயனிப் பிணைப்பு" }
    ],
    correctAnswer: "A",
    explanation: "A pairs with T via 2 hydrogen bonds; Guanine pairs with Cytosine via 3 hydrogen bonds.",
    explanationTamil: "அடினைன் தயமினுடன் 2 ஹைட்ரஜன் பிணைப்புகளாலும், குவானைன் சைட்டோசினுடன் 3 ஹைட்ரஜன் பிணைப்புகளாலும் இணைகின்றன."
  },
  {
    code: "CHE-167", subject: "Chemistry", topic: "Polymers", difficulty: "easy",
    questionText: "Nylon-6,6 is a condensation polyamide synthesized from:",
    questionTextTamil: "நைலான்-6,6 என்ற பாலிஅமைடு எவற்றின் குறுக்க பலபடியாக்கல் மூலம் பெறப்படுகிறது?",
    options: [
      { label: "A", text: "Hexamethylenediamine and Adipic acid" },
      { label: "B", text: "Caprolactam" },
      { label: "C", text: "Ethylene glycol and Terephthalic acid" },
      { label: "D", text: "Phenol and Formaldehyde" }
    ],
    optionsTamil: [
      { label: "A", text: "ஹெக்சாமெத்திலீன் டைஅமீன் மற்றும் அடிபிக் அமிலம்" },
      { label: "B", text: "கேப்ரோலாக்டம் (நைலான்-6)" },
      { label: "C", text: "டெரிலீன்" },
      { label: "D", text: "பேக்கலைட்" }
    ],
    correctAnswer: "A",
    explanation: "Polymerization of H₂N-(CH₂)₆-NH₂ and HOOC-(CH₂)₄-COOH with loss of water yields Nylon-6,6.",
    explanationTamil: "ஹெக்சாமெத்திலீன் டைஅமீன் மற்றும் அடிபிக் அமிலம் இணைந்து நைலான்-6,6 பாலிஅமைடைத் தருகின்றன."
  },
  {
    code: "CHE-168", subject: "Chemistry", topic: "Polymers", difficulty: "easy",
    questionText: "Terylene (Dacron) is a polyester prepared from:",
    questionTextTamil: "டெரிலீன் (டாக்ரான்) என்ற பாலியெஸ்டர் எவற்றிலிருந்து தயாரிக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Ethylene glycol and Terephthalic acid" },
      { label: "B", text: "Phenol and Formaldehyde" },
      { label: "C", text: "Urea and Formaldehyde" },
      { label: "D", text: "Glycerol and Phthalic anhydride" }
    ],
    optionsTamil: [
      { label: "A", text: "எத்திலீன் கிளைக்கால் மற்றும் டெரிப்தாலிக் அமிலம்" },
      { label: "B", text: "பீனால் மற்றும் ஃபார்மால்டிஹைடு" },
      { label: "C", text: "யூரியா ஃபார்மால்டிஹைடு" },
      { label: "D", text: "கிளிசரால்" }
    ],
    correctAnswer: "A",
    explanation: "Condensation of ethylene glycol with terephthalic acid at 420-460 K yields terylene polyester.",
    explanationTamil: "எத்திலீன் கிளைக்கால் மற்றும் டெரிப்தாலிக் அமிலம் இணைந்து டெரிலீன் பாலியெஸ்டர் உருவாகிறது."
  },
  {
    code: "CHE-169", subject: "Chemistry", topic: "Polymers", difficulty: "easy",
    questionText: "Bakelite is a thermosetting polymer obtained by condensation of:",
    questionTextTamil: "பேக்கலைட் (Bakelite) என்பது எவற்றின் குறுக்க பலபடியாக்கலால் பெறப்படும் வெப்பத்தால் இளகா பிளாஸ்டிக்?",
    options: [
      { label: "A", text: "Phenol and Formaldehyde" },
      { label: "B", text: "Melamine and Formaldehyde" },
      { label: "C", text: "Styrene and Butadiene" },
      { label: "D", text: "Vinyl chloride" }
    ],
    optionsTamil: [
      { label: "A", text: "பீனால் மற்றும் ஃபார்மால்டிஹைடு (சுவிட்சுகள் செய்யப் பயன்படுகிறது)" },
      { label: "B", text: "மெலமைன் ஃபார்மால்டிஹைடு" },
      { label: "C", text: "பியூனா-எஸ்" },
      { label: "D", text: "PVC" }
    ],
    correctAnswer: "A",
    explanation: "Phenol-formaldehyde crosslinked resin forms hard, heat-resistant Bakelite used in electrical switches.",
    explanationTamil: "பீனால் மற்றும் ஃபார்மால்டிஹைடு இணைந்து மின்சுவிட்சுகள் செய்யப் பயன்படும் பேக்கலைட் உருவாகிறது."
  },
  {
    code: "CHE-170", subject: "Chemistry", topic: "Polymers", difficulty: "easy",
    questionText: "Natural rubber is a polymer of which monomer?",
    questionTextTamil: "இயற்கை ரப்பர் எந்த ஒற்றைப்படியின் பலபடியாகும்?",
    options: [
      { label: "A", text: "cis-1,4-Polyisoprene (2-methylbuta-1,3-diene)" },
      { label: "B", text: "Chloroprene (Neoprene)" },
      { label: "C", text: "Butadiene" },
      { label: "D", text: "Styrene" }
    ],
    optionsTamil: [
      { label: "A", text: "சிஸ்-1,4-பாலிஐசோபிரீன் (2-மெத்தில்பியூட்டா-1,3-டையீன்)" },
      { label: "B", text: "குளோரோபிரீன் (செயற்கை நியோபிரீன்)" },
      { label: "C", text: "பியூட்டாடையீன்" },
      { label: "D", text: "ஸ்டைரீன்" }
    ],
    correctAnswer: "A",
    explanation: "Natural rubber latex is cis-1,4-polyisoprene. Trans-isomer is Gutta-percha.",
    explanationTamil: "இயற்கை ரப்பர் என்பது சிஸ்-1,4-பாலிஐசோபிரீன் ஆகும்."
  },
  {
    code: "CHE-171", subject: "Chemistry", topic: "Polymers", difficulty: "easy",
    questionText: "Vulcanization of rubber involves heating raw rubber with which element to create crosslinks?",
    questionTextTamil: "ரப்பரை வல்கனைஸ் செய்ய கச்சா ரப்பருடன் எதனைச் சேர்த்து சூடுபடுத்த வேண்டும்?",
    options: [
      { label: "A", text: "Sulphur (S)" }, { label: "B", text: "Phosphorus" }, { label: "C", text: "Carbon" }, { label: "D", text: "Nitrogen" }
    ],
    optionsTamil: [
      { label: "A", text: "கந்தகம் (Sulphur - 373 K முதல் 415 K வரை)" },
      { label: "B", text: "பாஸ்பரஸ்" },
      { label: "C", text: "கரிமம்" },
      { label: "D", text: "நைட்ரஜன்" }
    ],
    correctAnswer: "A",
    explanation: "Sulphur forms disulfide cross-links across polyisoprene chains, imparting elasticity and mechanical toughness.",
    explanationTamil: "கந்தகத்தைச் சேர்த்து சூடுபடுத்துவதன் மூலம் குறுக்கு பிணைப்புகள் உருவாகி ரப்பர் கடினத்தன்மையும் மீள்தன்மையும் பெறுகிறது."
  },
  {
    code: "CHE-172", subject: "Chemistry", topic: "Polymers", difficulty: "easy",
    questionText: "Teflon (PTFE) is prepared by polymerization of:",
    questionTextTamil: "டெஃப்லான் (Teflon) எதனைப் பலபடியாக்கல் செய்து தயாரிக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Tetrafluoroethene (CF₂=CF₂)" },
      { label: "B", text: "Vinyl chloride" },
      { label: "C", text: "Acrylonitrile" },
      { label: "D", text: "Ethene" }
    ],
    optionsTamil: [
      { label: "A", text: "டெட்ராபுளோரோஈத்தீன் (CF₂=CF₂)" },
      { label: "B", text: "வினைல் குளோரைடு" },
      { label: "C", text: "அக்ரிலோநைட்ரைல்" },
      { label: "D", text: "ஈத்தீன்" }
    ],
    correctAnswer: "A",
    explanation: "n CF₂=CF₂ --peroxide--> -[CF₂-CF₂]n-. Chemically inert, heat-resistant non-stick coating.",
    explanationTamil: "டெட்ராபுளோரோஈத்தீனை பலபடியாக்கி ஒட்டாத பாத்திரங்களில் பூசப்படும் டெஃப்லான் பெறப்படுகிறது."
  },
  {
    code: "CHE-173", subject: "Chemistry", topic: "Polymers", difficulty: "medium",
    questionText: "PHBV (Poly-β-hydroxybutyrate-co-β-hydroxyvalerate) is celebrated as a:",
    questionTextTamil: "PHBV பலபடி எதற்காக பரவலாகப் பாராட்டப்படுகிறது?",
    options: [
      { label: "A", text: "Biodegradable aliphatic polyester used in specialty packaging and drug delivery" },
      { label: "B", text: "Conducting polymer" },
      { label: "C", text: "Synthetic rubber" },
      { label: "D", text: "Thermosetting resin" }
    ],
    optionsTamil: [
      { label: "A", text: "உயிர்வழி சிதையும் (Biodegradable) அலிஃபாட்டிக் பாலியெஸ்டர்" },
      { label: "B", text: "மின்கடத்தும் பலபடி" },
      { label: "C", text: "செயற்கை ரப்பர்" },
      { label: "D", text: "தெர்மோசெட்டிங் பிளாஸ்டிக்" }
    ],
    correctAnswer: "A",
    explanation: "PHBV undergoes bacterial degradation in soil without environmental pollution.",
    explanationTamil: "PHBV என்பது பாக்டீரியாக்களால் இயற்கையிலேயே சிதைக்கப்படும் மக்கும் பலபடியாகும்."
  },
  {
    code: "CHE-174", subject: "Chemistry", topic: "Polymers", difficulty: "easy",
    questionText: "Neoprene synthetic rubber is a polymer of:",
    questionTextTamil: "செயற்கை ரப்பரான நியோபிரீன் எதனுடைய பலபடியாகும்?",
    options: [
      { label: "A", text: "Chloroprene (2-chlorobuta-1,3-diene)" },
      { label: "B", text: "Isoprene" },
      { label: "C", text: "Propene" },
      { label: "D", text: "But-2-ene" }
    ],
    optionsTamil: [
      { label: "A", text: "குளோரோபிரீன் (2-குளோரோபியூட்டா-1,3-டையீன்)" },
      { label: "B", text: "ஐசோபிரீன்" },
      { label: "C", text: "புரோப்பீன்" },
      { label: "D", text: "பியூட்-2-ஈன்" }
    ],
    correctAnswer: "A",
    explanation: "Polymerization of chloroprene yields Neoprene, resistant to oils, petrol, and solvents.",
    explanationTamil: "குளோரோபிரீனை பலபடியாக்கல் செய்து நியோபிரீன் செயற்கை ரப்பர் தயாரிக்கப்படுகிறது."
  },
  {
    code: "CHE-175", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Keratin in hair and nails and Myosin in muscles are examples of:",
    questionTextTamil: "முடி, நகங்களிலுள்ள கெரட்டின் மற்றும் தசைகளிலுள்ள மயோசின் எந்த வகைப் புரதங்கள்?",
    options: [
      { label: "A", text: "Fibrous proteins (insoluble in water)" },
      { label: "B", text: "Globular proteins (soluble in water)" },
      { label: "C", text: "Enzymes" },
      { label: "D", text: "Hormones" }
    ],
    optionsTamil: [
      { label: "A", text: "இழைப் புரதங்கள் (நீரில் கரையாதவை - Fibrous proteins)" },
      { label: "B", text: "கோளப் புரதங்கள்" },
      { label: "C", text: "நொதிகள்" },
      { label: "D", text: "ஹார்மோன்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Polypeptide chains run parallel held by hydrogen and disulfide bonds in fibrous proteins.",
    explanationTamil: "இழைப் புரதங்கள் இணையாக நீண்ட சங்கிலிகளால் அமைந்த நீரில் கரையாத புரதங்களாகும்."
  },
  {
    code: "CHE-176", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "When propyne reacts with water in presence of HgSO₄ and dil. H₂SO₄ at 333 K, the major product is:",
    questionTextTamil: "HgSO₄ மற்றும் நீர்த்த H₂SO₄ முன்னிலையில் புரோப்பைன் நீரேற்றம் அடையும் போது உருவாகும் முதன்மை விளைபொருள்:",
    options: [
      { label: "A", text: "Acetone (propan-2-one)" },
      { label: "B", text: "Propanal" },
      { label: "C", text: "Propanoic acid" },
      { label: "D", text: "Propan-1-ol" }
    ],
    optionsTamil: [
      { label: "A", text: "அசிட்டோன் (புரோப்பனான்)" },
      { label: "B", text: "புரோப்பனல்" },
      { label: "C", text: "புரோப்பனாயிக் அமிலம்" },
      { label: "D", text: "புரோப்பனால்" }
    ],
    correctAnswer: "A",
    explanation: "Markovnikov addition of water forms an enol CH₃-C(OH)=CH₂ which tautomerizes to stable acetone CH₃COCH₃.",
    explanationTamil: "மார்கோனிகாவ் சேர்க்கை மூலம் ஈனால் உருவாகி இயங்கு சமநிலை மூலம் அசிட்டோனாக மாறுகிறது."
  },
  {
    code: "CHE-177", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Formalin is an aqueous solution containing approximately:",
    questionTextTamil: "உயிரியல் மாதிரிகளைப் பாதுகாக்க பயன்படும் ஃபார்மலின் (Formalin) என்பது:",
    options: [
      { label: "A", text: "40% Formaldehyde in water" },
      { label: "B", text: "10% Acetic acid" },
      { label: "C", text: "100% Acetaldehyde" },
      { label: "D", text: "50% Acetone" }
    ],
    optionsTamil: [
      { label: "A", text: "40% ஃபார்மால்டிஹைடு நீர்க்கரைசல்" },
      { label: "B", text: "10% அசிட்டிக் அமிலம்" },
      { label: "C", text: "அசிட்டால்டிஹைடு" },
      { label: "D", text: "அசிட்டோன்" }
    ],
    correctAnswer: "A",
    explanation: "Formalin (40% HCHO aqueous solution) is widely used for preserving biological specimens.",
    explanationTamil: "40% ஃபார்மால்டிஹைடைக் கொண்ட நீர்க்கரைசல் ஃபார்மலின் எனப்படுகிறது."
  },
  {
    code: "CHE-178", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Aniline reacts with bromine water (Br₂ / H₂O) at room temperature to form a white precipitate of:",
    questionTextTamil: "அனிலின் புரோமின் நீருடன் அறை வெப்பநிலையில் வினைபுரிந்து தரும் வெண்மை நிற வீழ்படிவு:",
    options: [
      { label: "A", text: "2,4,6-Tribromoaniline" },
      { label: "B", text: "p-Bromoaniline" },
      { label: "C", text: "o-Bromoaniline" },
      { label: "D", text: "Bromobenzene" }
    ],
    optionsTamil: [
      { label: "A", text: "2,4,6-டிரைபுரோமோஅனிலின் (வெள்ளை வீழ்படிவு)" },
      { label: "B", text: "பாரா-புரோமோஅனிலின்" },
      { label: "C", text: "ஆர்த்தோ-புரோமோஅனிலின்" },
      { label: "D", text: "புரோமோபென்சீன்" }
    ],
    correctAnswer: "A",
    explanation: "-NH₂ group strongly activates ortho and para positions, leading to instantaneous tribromination.",
    explanationTamil: "-NH₂ தொகுதியின் அதீத கிளர்வுறுத்தும் தன்மையால் 2,4,6-டிரைபுரோமோஅனிலின் வெள்ளை வீழ்படிவாகிறது."
  },
  {
    code: "CHE-179", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Which amino acid is optically inactive (non-chiral) among the 20 standard amino acids?",
    questionTextTamil: "20 புரத அமினோ அமிலங்களுள் சீர்மை உடையதும் ஒளிசுழற்றும் தன்மையற்றதுமான அமினோ அமிலம் எது?",
    options: [
      { label: "A", text: "Glycine (H₂N-CH₂-COOH)" },
      { label: "B", text: "Alanine" },
      { label: "C", text: "Valine" },
      { label: "D", text: "Leucine" }
    ],
    optionsTamil: [
      { label: "A", text: "கிளைசின் (Glycine - H₂N-CH₂-COOH)" },
      { label: "B", text: "அலனைன்" },
      { label: "C", text: "வாலின்" },
      { label: "D", text: "லியூசின்" }
    ],
    correctAnswer: "A",
    explanation: "Glycine's α-carbon is bonded to two identical hydrogen atoms, making it achiral.",
    explanationTamil: "கிளைசினில் ஆல்ஃபா கார்பனுடன் 2 ஹைட்ரஜன்கள் இணைந்துள்ளதால் கைரல் தன்மையற்றது."
  },
  {
    code: "CHE-180", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Glycerol (propane-1,2,3-triol) is a:",
    questionTextTamil: "கிளிசரால் (புரோப்பேன்-1,2,3-டிரையால்) என்பது ஒரு:",
    options: [
      { label: "A", text: "Trihydric alcohol" }, { label: "B", text: "Monohydric alcohol" }, { label: "C", text: "Dihydric alcohol" }, { label: "D", text: "Phenol" }
    ],
    optionsTamil: [
      { label: "A", text: "மும்மை ஹைட்ரிக் ஆல்கஹால் (Trihydric alcohol)" },
      { label: "B", text: "ஒருமை ஆல்கஹால்" },
      { label: "C", text: "இருமை ஆல்கஹால்" },
      { label: "D", text: "பீனால்" }
    ],
    correctAnswer: "A",
    explanation: "Glycerol CH₂(OH)-CH(OH)-CH₂(OH) contains 3 hydroxyl (-OH) groups.",
    explanationTamil: "கிளிசராலில் 3 -OH தொகுதிகள் உள்ளதால் இது மும்மை ஹைட்ரிக் ஆல்கஹால் ஆகும்."
  },
  {
    code: "CHE-181", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Nitrobenzene on reduction with Lithium Aluminium Hydride (LiAlH₄) gives:",
    questionTextTamil: "நைட்ரோபென்சீனை LiAlH₄ கொண்டு ஒடுக்கும் போது கிடைப்பது:",
    options: [
      { label: "A", text: "Azobenzene" }, { label: "B", text: "Aniline" }, { label: "C", text: "Hydrazobenzene" }, { label: "D", text: "Benzene" }
    ],
    optionsTamil: [
      { label: "A", text: "அசோபென்சீன் (C₆H₅-N=N-C₆H₅)" },
      { label: "B", text: "அனிலின் (Fe/HCl கொண்டு ஒடுக்கினால் கிடைப்பது)" },
      { label: "C", text: "ஹைட்ராசோபென்சீன்" },
      { label: "D", text: "பென்சீன்" }
    ],
    correctAnswer: "A",
    explanation: "Aromatic nitro compounds with LiAlH₄ undergo bimolecular reduction to form azobenzene.",
    explanationTamil: "நைட்ரோபென்சீன் LiAlH₄ முன்னிலையில் அசோபென்சீனாக ஒடுக்கமடைகிறது."
  },
  {
    code: "CHE-182", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "When an ether is heated with excess concentrated HI, the products formed are:",
    questionTextTamil: "ஓர் ஈதர் அதிகப்படியான அடர் HI உடன் சூடுபடுத்தப்படும் போது உருவாகும் விளைபொருள்:",
    options: [
      { label: "A", text: "Alkyl iodides and water (R-I + R'-I + H₂O)" },
      { label: "B", text: "Alcohol and alkane" },
      { label: "C", text: "Aldehyde and acid" },
      { label: "D", text: "Alkene and iodine" }
    ],
    optionsTamil: [
      { label: "A", text: "அல்கைல் அயோடைடுகள் மற்றும் நீர் (R-I + R'-I + H₂O)" },
      { label: "B", text: "ஆல்கஹால் மற்றும் ஆல்கேன்" },
      { label: "C", text: "ஆல்டிஹைடு" },
      { label: "D", text: "ஆல்கீன்" }
    ],
    correctAnswer: "A",
    explanation: "R-O-R + 2 HI → 2 R-I + H₂O.",
    explanationTamil: "ஈதர் அதிகப்படியான HI உடன் இரு மூலக்கூறு அல்கைல் அயோடைடுகளைத் தருகிறது."
  },
  {
    code: "CHE-183", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Zwitterion structure of an amino acid contains:",
    questionTextTamil: "அமினோ அமிலத்தின் சுவிட்டர் அயனி (Zwitterion) அமைப்பில் காணப்படுவது:",
    options: [
      { label: "A", text: "Both positive (-NH₃⁺) and negative (-COO⁻) charges in the same molecule (dipolar)" },
      { label: "B", text: "Only positive charge" },
      { label: "C", text: "Only negative charge" },
      { label: "D", text: "Zero dipole moment" }
    ],
    optionsTamil: [
      { label: "A", text: "ஒரே மூலக்கூறில் நேர் (-NH₃⁺) மற்றும் எதிர் (-COO⁻) மின்சுமைகள் (இருமுனை அயனி)" },
      { label: "B", text: "நேர்மின்சுமை மட்டும்" },
      { label: "C", text: "எதிர்மின்சுமை மட்டும்" },
      { label: "D", text: "மின்சுமையற்றது" }
    ],
    correctAnswer: "A",
    explanation: "Internal proton transfer creates dipolar ion H₃N⁺-CH(R)-COO⁻ with net neutral charge at isoelectric point.",
    explanationTamil: "புரோட்டான் பரிமாற்றத்தால் ஒரே மூலக்கூறில் நேர் மற்றும் எதிர் அயனிகள் உருவாகி சுவிட்டர் அயனி தோன்றுகிறது."
  },
  {
    code: "CHE-184", subject: "Chemistry", topic: "Polymers", difficulty: "easy",
    questionText: "Buna-S synthetic rubber is an elastomer copolymer of:",
    questionTextTamil: "பியூனா-எஸ் (Buna-S) செயற்கை ரப்பர் எவற்றின் இணை பலபடியாகும்?",
    options: [
      { label: "A", text: "Buta-1,3-diene and Styrene" },
      { label: "B", text: "Buta-1,3-diene and Acrylonitrile (Buna-N)" },
      { label: "C", text: "Chloroprene" },
      { label: "D", text: "Isoprene and Isobutylene" }
    ],
    optionsTamil: [
      { label: "A", text: "பியூட்டா-1,3-டையீன் மற்றும் ஸ்டைரீன் (டயர் தயாரிப்பில் பயன்படுகிறது)" },
      { label: "B", text: "பியூட்டாடையீன் மற்றும் அக்ரிலோநைட்ரைல் (பியூனா-N)" },
      { label: "C", text: "குளோரோபிரீன்" },
      { label: "D", text: "ஐசோபிரீன்" }
    ],
    correctAnswer: "A",
    explanation: "75% Buta-1,3-diene + 25% Styrene polymerized with sodium (Na) catalyst yields Buna-S (SBR).",
    explanationTamil: "பியூட்டா-1,3-டையீன் மற்றும் ஸ்டைரீன் பலபடியாக்கல் மூலம் பியூனா-எஸ் பெறப்படுகிறது."
  },
  {
    code: "CHE-185", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Starch is a reserve carbohydrate in plants consisting of two components:",
    questionTextTamil: "தாவரங்களில் சேமிக்கப்படும் ஸ்டார்ச் எந்த இரு கூறுகளால் ஆனது?",
    options: [
      { label: "A", text: "Water-soluble Amylose (15-20%) and water-insoluble branched Amylopectin (80-85%)" },
      { label: "B", text: "Glucose and Fructose" },
      { label: "C", text: "Cellulose and Glycogen" },
      { label: "D", text: "Maltose and Lactose" }
    ],
    optionsTamil: [
      { label: "A", text: "நீரில் கரையும் அமைலோஸ் மற்றும் நீரில் கரையாத கிளைத்த அமைலோபெக்டின்" },
      { label: "B", text: "குளுக்கோஸ் மற்றும் பிரக்டோஸ்" },
      { label: "C", text: "செல்லுலோஸ்" },
      { label: "D", text: "மால்டோஸ்" }
    ],
    correctAnswer: "A",
    explanation: "Amylose is linear α-(1→4) chain giving blue colour with iodine; amylopectin is highly branched with α-(1→6) branch points.",
    explanationTamil: "ஸ்டார்ச் நேர்கோட்டு அமைலோஸ் மற்றும் கிளைத்த அமைலோபெக்டின் ஆகியவற்றால் ஆனது."
  },
  {
    code: "CHE-186", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Acidity order of haloacetic acids follows:",
    questionTextTamil: "ஹாலோஅசிட்டிக் அமிலங்களின் அமிலத்தன்மை வரிசை எது?",
    options: [
      { label: "A", text: "CF₃COOH > CCl₃COOH > CHCl₂COOH > CH₂ClCOOH > CH₃COOH" },
      { label: "B", text: "CH₃COOH > CH₂ClCOOH > CCl₃COOH" },
      { label: "C", text: "CH₂ClCOOH > CCl₃COOH" },
      { label: "D", text: "All have equal acidity" }
    ],
    optionsTamil: [
      { label: "A", text: "CF₃COOH > CCl₃COOH > CHCl₂COOH > CH₂ClCOOH > CH₃COOH" },
      { label: "B", text: "CH₃COOH > CH₂ClCOOH > CCl₃COOH" },
      { label: "C", text: "CH₂ClCOOH > CCl₃COOH" },
      { label: "D", text: "அனைத்தும் சமம்" }
    ],
    correctAnswer: "A",
    explanation: "Strong electron-withdrawing (-I) inductive effect disperses negative charge on carboxylate ion, stabilizing it and enhancing acidity.",
    explanationTamil: "எலக்ட்ரான் கவர் தூண்டல் விளைவு (-I) அதிகரிக்க அதிகரிக்க அமிலத்தன்மை உயர்கிறது."
  },
  {
    code: "CHE-187", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Which carboxylic acid reduces Tollens' reagent and Fehling's solution like an aldehyde?",
    questionTextTamil: "ஆல்டிஹைடுகளைப் போல டாலன்ஸ் மற்றும் பெலிங் கரைசல்களை ஒடுக்கும் கார்பாக்சிலிக் அமிலம் எது?",
    options: [
      { label: "A", text: "Formic acid (HCOOH)" },
      { label: "B", text: "Acetic acid (CH₃COOH)" },
      { label: "C", text: "Benzoic acid" },
      { label: "D", text: "Oxalic acid" }
    ],
    optionsTamil: [
      { label: "A", text: "ஃபார்மிக் அமிலம் (HCOOH - ஆல்டிஹைடு தொகுதி போன்ற -CHO பண்பைக் கொண்டுள்ளது)" },
      { label: "B", text: "அசிட்டிக் அமிலம்" },
      { label: "C", text: "பென்சாயிக் அமிலம்" },
      { label: "D", text: "ஆக்சாலிக் அமிலம்" }
    ],
    correctAnswer: "A",
    explanation: "HCOOH contains both a -COOH group and an aldehydic -C(=O)H hydrogen, enabling it to act as reducing agent.",
    explanationTamil: "ஃபார்மிக் அமிலம் ஆல்டிஹைடு பண்பையும் பெற்றுள்ளதால் டாலன்ஸ் காரணியை ஒடுக்குகிறது."
  },
  {
    code: "CHE-188", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Gattermann-Koch reaction synthesizes benzaldehyde by treating benzene with:",
    questionTextTamil: "காட்டர்மேன்-கோச் வினையில் பென்சீனிலிருந்து பென்சால்டிஹைடு தயாரிக்கப் பயன்படும் வினைக்காரணிகள்:",
    options: [
      { label: "A", text: "CO + HCl in presence of anhydrous AlCl₃ / CuCl" },
      { label: "B", text: "HCN + HCl" },
      { label: "C", text: "CHCl₃ + KOH" },
      { label: "D", text: "CH₃COCl + AlCl₃" }
    ],
    optionsTamil: [
      { label: "A", text: "CO + HCl நீரற்ற AlCl₃ / CuCl முன்னிலையில்" },
      { label: "B", text: "HCN + HCl" },
      { label: "C", text: "CHCl₃ + KOH" },
      { label: "D", text: "அசிட்டைல் குளோரைடு" }
    ],
    correctAnswer: "A",
    explanation: "C₆H₆ + CO + HCl --AlCl₃/CuCl--> C₆H₅CHO + HCl.",
    explanationTamil: "பென்சீனுடன் CO மற்றும் HCl வாயுக்கள் AlCl₃ முன்னிலையில் வினைபுரிந்து பென்சால்டிஹைடு உருவாகிறது."
  },
  {
    code: "CHE-189", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Denaturation of a protein disrupts which structural levels while keeping primary structure intact?",
    questionTextTamil: "புரதங்களின் இயல்பிழத்தலின் (Denaturation) போது எந்த கட்டமைப்புகள் பாதிக்கப்பட்டு முதல்நிலை கட்டமைப்பு மட்டும் மாறாமல் இருக்கிறது?",
    options: [
      { label: "A", text: "Secondary, tertiary, and quaternary structures" },
      { label: "B", text: "Primary structure only" },
      { label: "C", text: "Only peptide bonds" },
      { label: "D", text: "All amino acid identities" }
    ],
    optionsTamil: [
      { label: "A", text: "இரண்டாம் நிலை, மூன்றாம் நிலை மற்றும் நான்காம் நிலை கட்டமைப்புகள்" },
      { label: "B", text: "முதல்நிலை கட்டமைப்பு மட்டும்" },
      { label: "C", text: "பெப்டைட் பிணைப்புகள்" },
      { label: "D", text: "அமினோ அமிலங்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Denaturation unwinds hydrogen and disulfide bonds, destroying 2°, 3°, 4° folding while leaving primary peptide sequence intact.",
    explanationTamil: "இயல்பிழத்தலின் போது ஹைட்ரஜன் பிணைப்புகள் உடைந்து புரதம் தன் உயிரியல் செயல்பாட்டை இழக்கிறது; பெப்டைட் சங்கிலி மாறாது."
  },
  {
    code: "CHE-190", subject: "Chemistry", topic: "Polymers", difficulty: "easy",
    questionText: "Melamine-formaldehyde resin is widely used for manufacturing:",
    questionTextTamil: "மெலமைன்-ஃபார்மால்டிஹைடு பிசின் எதனைத் தயாரிக்க பரவலாகப் பயன்படுகிறது?",
    options: [
      { label: "A", text: "Unbreakable crockery and dinnerware" },
      { label: "B", text: "Rubber tyres" },
      { label: "C", text: "Raincoats" },
      { label: "D", text: "Pipes" }
    ],
    optionsTamil: [
      { label: "A", text: "உடையாத பீங்கான் போன்ற தட்டுகள் மற்றும் பாத்திரங்கள் (Unbreakable crockery)" },
      { label: "B", text: "டயர்கள்" },
      { label: "C", text: "மழைக்கோட்டுகள்" },
      { label: "D", text: "குழாய்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Cross-linked melamine polymer is hard, scratch-resistant and used for unbreakable kitchenware.",
    explanationTamil: "மெலமைன் பலபடி கடினமானது என்பதால் உடையாத தட்டுகள் செய்யப் பயன்படுகிறது."
  },
  {
    code: "CHE-191", subject: "Chemistry", topic: "Environmental Chemistry", difficulty: "easy",
    questionText: "The major atmospheric pollutant responsible for Acid Rain is:",
    questionTextTamil: "அமில மழைக்கு (Acid rain) காரணமான முக்கியமான வளிமண்டல மாசுக்கள்:",
    options: [
      { label: "A", text: "Sulphur dioxide (SO₂) and Nitrogen oxides (NOx)" },
      { label: "B", text: "Carbon monoxide (CO)" },
      { label: "C", text: "Methane (CH₄)" },
      { label: "D", text: "Chlorofluorocarbons" }
    ],
    optionsTamil: [
      { label: "A", text: "சல்பர் டை ஆக்சைடு (SO₂) மற்றும் நைட்ரஜன் ஆக்சைடுகள் (NOx)" },
      { label: "B", text: "கார்பன் மோனாக்சைடு" },
      { label: "C", text: "மீத்தேன்" },
      { label: "D", text: "CFC" }
    ],
    correctAnswer: "A",
    explanation: "SO₂ and NO₂ react with cloud moisture to form H₂SO₄ and HNO₃, lowering rain pH below 5.6.",
    explanationTamil: "SO₂ மற்றும் NO₂ மழைநீருடன் இணைந்து கந்தக மற்றும் நைட்ரிக் அமிலங்களாக மாறி அமில மழையை உண்டாக்குகின்றன."
  },
  {
    code: "CHE-192", subject: "Chemistry", topic: "Environmental Chemistry", difficulty: "easy",
    questionText: "BOD (Biochemical Oxygen Demand) is an indicator of:",
    questionTextTamil: "BOD (உயிர்வேதியியல் ஆக்சிஜன் தேவை) என்பது எதன் அளவீடாகும்?",
    options: [
      { label: "A", text: "Level of organic pollution in water" },
      { label: "B", text: "Dissolved oxygen for fish" },
      { label: "C", text: "Heavy metal toxicity" },
      { label: "D", text: "Salinity" }
    ],
    optionsTamil: [
      { label: "A", text: "நீரில் உள்ள கரிம மாசுபாட்டின் அளவு" },
      { label: "B", text: "மீன்களுக்கான ஆக்சிஜன்" },
      { label: "C", text: "உலோக நச்சுத்தன்மை" },
      { label: "D", text: "உப்புத்தன்மை" }
    ],
    correctAnswer: "A",
    explanation: "Higher BOD (>17 ppm) indicates heavily polluted water requiring extensive microbial oxygen consumption.",
    explanationTamil: "BOD மதிப்பு அதிகமாக இருந்தால் நீரில் கரிம கழிவுகளின் மாசுபாடு அதிகம் என்பதைக் குறிக்கும்."
  },
  {
    code: "CHE-193", subject: "Chemistry", topic: "Everyday Chemistry", difficulty: "easy",
    questionText: "An example of a broad-spectrum antibiotic active against both Gram-positive and Gram-negative bacteria is:",
    questionTextTamil: "கிராம்-பாசிட்டிவ் மற்றும் கிராம்-நெகட்டிவ் ஆகிய இரு பாக்டீரியாக்களையும் அழிக்கும் விரிந்த வீச்சு எதிர் நுண்ணுயிரி (Antibiotic):",
    options: [
      { label: "A", text: "Chloramphenicol / Amoxicillin" },
      { label: "B", text: "Penicillin G (narrow spectrum)" },
      { label: "C", text: "Paracetamol" },
      { label: "D", text: "Aspirin" }
    ],
    optionsTamil: [
      { label: "A", text: "குளோராம்பெனிகால் (Chloramphenicol) / அமோக்சிசிலின்" },
      { label: "B", text: "பென்சிலின் G (குறுகிய வீச்சு)" },
      { label: "C", text: "பாராசிட்டமால்" },
      { label: "D", text: "ஆஸ்பிரின்" }
    ],
    correctAnswer: "A",
    explanation: "Chloramphenicol, ampicillin, and tetracycline treat typhoid, pneumonia, and dysentery across diverse bacterial strains.",
    explanationTamil: "குளோராம்பெனிகால் இருவகை பாக்டீரியாக்களையும் கொல்லும் அகன்ற வீச்சு நுண்ணுயிர் எதிர்ப்பியாகும்."
  },
  {
    code: "CHE-194", subject: "Chemistry", topic: "Everyday Chemistry", difficulty: "easy",
    questionText: "Artificial sweetener Aspartame is unstable at cooking temperatures and is limited to use in:",
    questionTextTamil: "அஸ்பார்டேம் (Aspartame) என்ற செயற்கை இனிப்பூட்டி வெப்பத்தில் சிதைவதால் எதில் மட்டுமே பயன்படுத்தப்படுகிறது?",
    options: [
      { label: "A", text: "Cold foods and soft drinks" },
      { label: "B", text: "Baked cakes" },
      { label: "C", text: "Boiled sweets" },
      { label: "D", text: "Hot beverages" }
    ],
    optionsTamil: [
      { label: "A", text: "குளிர்ந்த உணவுகள் மற்றும் மென்பானங்கள் (Cold drinks)" },
      { label: "B", text: "சுடப்படும் கேக்குகள்" },
      { label: "C", text: "மிட்டாய்கள்" },
      { label: "D", text: "சூடான தேநீர்" }
    ],
    correctAnswer: "A",
    explanation: "Aspartame is a methyl ester of dipeptide (aspartic acid + phenylalanine) which hydrolyzes upon heating.",
    explanationTamil: "அஸ்பார்டேம் சூடாக்கும் போது சிதைவதால் குளிர்ந்த உணவுகளில் மட்டுமே பயன்படுகிறது."
  },
  {
    code: "CHE-195", subject: "Chemistry", topic: "Everyday Chemistry", difficulty: "easy",
    questionText: "Soaps do not work effectively in hard water because:",
    questionTextTamil: "கடின நீரில் சோப்புகள் நுரையைத் தராமல் செயலிழக்கக் காரணம் என்ன?",
    options: [
      { label: "A", text: "Calcium and Magnesium ions form insoluble scum/precipitate with soap anions" },
      { label: "B", text: "Soap hydrolyzes into alcohol" },
      { label: "C", text: "Hard water is basic" },
      { label: "D", text: "Soap is insoluble in pure water" }
    ],
    optionsTamil: [
      { label: "A", text: "கால்சியம் மற்றும் மெக்னீசியம் அயனிகளுடன் நீரில் கரையாத கசடை (Scum) உருவாக்குவதால்" },
      { label: "B", text: "சோப் சிதைந்து ஆல்கஹாலாவதால்" },
      { label: "C", text: "நீர் காரத்தன்மை பெறுவதால்" },
      { label: "D", text: "சோப் நீரில் கரையாததால்" }
    ],
    correctAnswer: "A",
    explanation: "2 C₁₇H₃₅COONa + Ca²⁺ → (C₁₇H₃₅COO)₂Ca↓ + 2 Na⁺ forms an insoluble curdy precipitate.",
    explanationTamil: "கடின நீரிலுள்ள Ca²⁺, Mg²⁺ அயனிகளுடன் இணைந்து கரையாத கசடை உருவாக்கி சோப்பின் திறனைக் குறைக்கிறது."
  },
  {
    code: "CHE-196", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Reactivity of carbonyl compounds towards nucleophilic addition follows the order:",
    questionTextTamil: "கருக்கவர் சேர்க்கை வினைகளில் கார்பனைல் சேர்மங்களின் வினைத்திறன் வரிசை எது?",
    options: [
      { label: "A", text: "HCHO > CH₃CHO > CH₃COCH₃" },
      { label: "B", text: "CH₃COCH₃ > CH₃CHO > HCHO" },
      { label: "C", text: "CH₃CHO > HCHO > CH₃COCH₃" },
      { label: "D", text: "All have identical reactivity" }
    ],
    optionsTamil: [
      { label: "A", text: "HCHO > CH₃CHO > CH₃COCH₃ (ஃபார்மால்டிஹைடு அதிக வினைத்திறன் கொண்டது)" },
      { label: "B", text: "கீட்டோன் > ஆல்டிஹைடு" },
      { label: "C", text: "அசிட்டால்டிஹைடு > ஃபார்மால்டிஹைடு" },
      { label: "D", text: "அனைத்தும் சமம்" }
    ],
    correctAnswer: "A",
    explanation: "Steric hindrance and +I electron-donating alkyl groups reduce positive charge on carbonyl carbon.",
    explanationTamil: "இடநெருக்கடி மற்றும் +I விளைவு குறைவதால் ஃபார்மால்டிஹைடு அதிக வினைத்திறன் கொண்டது."
  },
  {
    code: "CHE-197", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Reduction of nitrobenzene in neutral medium using Zinc dust and ammonium chloride (NH₄Cl) gives:",
    questionTextTamil: "நடுநிலை ஊடகத்தில் Zn/NH₄Cl கொண்டு நைட்ரோபென்சீனை ஒடுக்கும் போது கிடைப்பது:",
    options: [
      { label: "A", text: "Phenylhydroxylamine (C₆H₅NHOH)" },
      { label: "B", text: "Aniline" },
      { label: "C", text: "Nitrosobenzene" },
      { label: "D", text: "Azoxybenzene" }
    ],
    optionsTamil: [
      { label: "A", text: "பீனைல்ஹைட்ராக்சிலமீன் (C₆H₅NHOH)" },
      { label: "B", text: "அனிலின்" },
      { label: "C", text: "நைட்ரோசோபென்சீன்" },
      { label: "D", text: "அசாக்ஸிபென்சீன்" }
    ],
    correctAnswer: "A",
    explanation: "C₆H₅NO₂ + 4[H] --Zn/NH₄Cl--> C₆H₅NHOH + H₂O.",
    explanationTamil: "Zn மற்றும் NH₄Cl முன்னிலையில் நடுநிலை ஒடுக்கத்தில் பீனைல்ஹைட்ராக்சிலமீன் உருவாகிறது."
  },
  {
    code: "CHE-198", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Boiling points of isomeric alcohols follow the order:",
    questionTextTamil: "ஒரே மூலக்கூறு வாய்பாடு கொண்ட ஆல்கஹால்களின் கொதிநிலை வரிசை எது?",
    options: [
      { label: "A", text: "Primary (1°) > Secondary (2°) > Tertiary (3°)" },
      { label: "B", text: "3° > 2° > 1°" },
      { label: "C", text: "2° > 1° > 3°" },
      { label: "D", text: "Equal boiling points" }
    ],
    optionsTamil: [
      { label: "A", text: "முதன்மை (1°) > இரண்டாம் நிலை (2°) > மூன்றாம் நிலை (3°)" },
      { label: "B", text: "3° > 2° > 1°" },
      { label: "C", text: "2° > 1° > 3°" },
      { label: "D", text: "அனைத்தும் சமம்" }
    ],
    correctAnswer: "A",
    explanation: "Branching decreases surface area and van der Waals attraction, so 1° has highest boiling point.",
    explanationTamil: "கிளைகள் அதிகரிக்கும் போது பரப்பளவு குறைந்து கொதிநிலை குறைகிறது (1° > 2° > 3°)."
  },
  {
    code: "CHE-199", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Aniline on heating with conc. H₂SO₄ at 450-475 K undergoes sulphonation to give:",
    questionTextTamil: "அனிலினை அடர் கந்தக அமிலத்துடன் 450-475 K-ல் சூடுபடுத்தும்போது உருவாகும் சல்பானிலிக் அமிலம் வெளிப்படுத்துவது:",
    options: [
      { label: "A", text: "Sulphanilic acid which exists as a dipolar Zwitterion" },
      { label: "B", text: "o-Aminobenzenesulphonic acid only" },
      { label: "C", text: "Nitrobenzene" },
      { label: "D", text: "Benzene" }
    ],
    optionsTamil: [
      { label: "A", text: "சுவிட்டர் அயனி அமைப்பில் இருக்கும் சல்பானிலிக் அமிலம் (Sulphanilic acid)" },
      { label: "B", text: "ஆர்த்தோ அமிலம்" },
      { label: "C", text: "நைட்ரோபென்சீன்" },
      { label: "D", text: "பென்சீன்" }
    ],
    correctAnswer: "A",
    explanation: "Sulphanilic acid exists in equilibrium as zwitterion H₃N⁺-C₆H₄-SO₃⁻.",
    explanationTamil: "சல்பானிலிக் அமிலம் இருமுனை சுவிட்டர் அயனி அமைப்பில் நிலைத்து நிற்கிறது."
  },
  {
    code: "CHE-200", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Which vitamin is water soluble among the following?",
    questionTextTamil: "பின்வருவனவற்றுள் நீரில் கரையும் வைட்டமின் எது?",
    options: [
      { label: "A", text: "Vitamin B and Vitamin C" },
      { label: "B", text: "Vitamin A" },
      { label: "C", text: "Vitamin D" },
      { label: "D", text: "Vitamin K" }
    ],
    optionsTamil: [
      { label: "A", text: "வைட்டமின் B மற்றும் C (நீரில் கரையும்)" },
      { label: "B", text: "வைட்டமின் A (கொழுப்பில் கரையும்)" },
      { label: "C", text: "வைட்டமின் D" },
      { label: "D", text: "வைட்டமின் K" }
    ],
    correctAnswer: "A",
    explanation: "Vitamins B and C are water-soluble and excreted in urine; A, D, E, K are fat-soluble.",
    explanationTamil: "வைட்டமின் B மற்றும் C நீரில் கரையும் தன்மையுடையவை (A, D, E, K கொழுப்பில் கரையும்)."
  },
  {
    code: "CHE-201", subject: "Chemistry", topic: "Biomolecules", difficulty: "medium",
    questionText: "Anomers are diastereomers of cyclic monosaccharides that differ in configuration at which carbon?",
    questionTextTamil: "அனோமர்கள் (Anomers) வளைய மோனோசாக்கரைடுகளில் எந்த கார்பனில் உள்ள அமைப்பில் மட்டுமே வேறுபடுகின்றன?",
    options: [
      { label: "A", text: "C-1 (anomeric carbon in aldoses)" },
      { label: "B", text: "C-2" },
      { label: "C", text: "C-4" },
      { label: "D", text: "C-6" }
    ],
    optionsTamil: [
      { label: "A", text: "C-1 கார்பன் (அனோமெரிக் கார்பன்)" },
      { label: "B", text: "C-2" },
      { label: "C", text: "C-4" },
      { label: "D", text: "C-6" }
    ],
    correctAnswer: "A",
    explanation: "α-D-glucose and β-D-glucose differ only in orientation of -OH group at C-1.",
    explanationTamil: "α-குளுக்கோஸ் மற்றும் β-குளுக்கோஸ் C-1 கார்பனில் உள்ள -OH தொகுதியின் அமைப்பில் மட்டுமே வேறுபடுகின்றன."
  },
  {
    code: "CHE-202", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Cellulose is a linear unbranched polymer composed of which repeating unit?",
    questionTextTamil: "தாவர செல்சுவரிலுள்ள செல்லுலோஸ் எந்த ஒருபடியின் பலபடியாகும்?",
    options: [
      { label: "A", text: "β-D-Glucose linked by β-1,4-glycosidic bonds" },
      { label: "B", text: "α-D-Glucose" },
      { label: "C", text: "Fructose" },
      { label: "D", text: "Ribose" }
    ],
    optionsTamil: [
      { label: "A", text: "β-D-குளுக்கோஸ் (β-1,4-கிளைக்கோசிடிக் பிணைப்பு)" },
      { label: "B", text: "α-D-குளுக்கோஸ்" },
      { label: "C", text: "பிரக்டோஸ்" },
      { label: "D", text: "ரைபோஸ்" }
    ],
    correctAnswer: "A",
    explanation: "Cellulose consists exclusively of β-D-glucopyranose units linked by β-1,4-bonds.",
    explanationTamil: "செல்லுலோஸ் β-D-குளுக்கோஸ் மூலக்கூறுகள் β-1,4 பிணைப்பால் இணைக்கப்பட்ட நீண்ட சங்கிலியாகும்."
  },
  {
    code: "CHE-203", subject: "Chemistry", topic: "Polymers", difficulty: "easy",
    questionText: "Glyptal is a polymer manufactured from:",
    questionTextTamil: "கிளிப்டால் (Glyptal) பலபடி எவற்றிலிருந்து தயாரிக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Ethylene glycol and Phthalic acid" },
      { label: "B", text: "Ethylene glycol and Terephthalic acid" },
      { label: "C", text: "Phenol and Urea" },
      { label: "D", text: "Melamine and Formaldehyde" }
    ],
    optionsTamil: [
      { label: "A", text: "எத்திலீன் கிளைக்கால் மற்றும் தாலிக் அமிலம் (வண்ணப்பூச்சுகளில் பயன்படுகிறது)" },
      { label: "B", text: "டெரிப்தாலிக் அமிலம் (டெரிலீன்)" },
      { label: "C", text: "பீனால்" },
      { label: "D", text: "மெலமைன்" }
    ],
    correctAnswer: "A",
    explanation: "Glyptal is an alkyd resin used in paints and lacquers.",
    explanationTamil: "எத்திலீன் கிளைக்கால் மற்றும் தாலிக் அமிலம் இணைந்து வண்ணப்பூச்சுகளில் பயன்படும் கிளிப்டால் உருவாகிறது."
  },
  {
    code: "CHE-204", subject: "Chemistry", topic: "Polymers", difficulty: "easy",
    questionText: "Orlon (polyacrylonitrile) is used as a synthetic wool substitute and is prepared from:",
    questionTextTamil: "கம்பளிக்கு மாற்றாகப் பயன்படும் ஆர்லான் (PAN) எதனுடைய பலபடியாகும்?",
    options: [
      { label: "A", text: "Acrylonitrile (CH₂=CH-CN)" },
      { label: "B", text: "Vinyl chloride" },
      { label: "C", text: "Styrene" },
      { label: "D", text: "Propene" }
    ],
    optionsTamil: [
      { label: "A", text: "அக்ரிலோநைட்ரைல் (CH₂=CH-CN)" },
      { label: "B", text: "வினைல் குளோரைடு" },
      { label: "C", text: "ஸ்டைரீன்" },
      { label: "D", text: "புரோப்பீன்" }
    ],
    correctAnswer: "A",
    explanation: "Polymerization of vinyl cyanide (acrylonitrile) produces Orlon/Acrilan fibers.",
    explanationTamil: "அக்ரிலோநைட்ரைல் பலபடியாக்கல் மூலம் செயற்கைக் கம்பளியான ஆர்லான் பெறப்படுகிறது."
  },
  {
    code: "CHE-205", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Hydroboration-oxidation of propene (CH₃-CH=CH₂) with B₂H₆ followed by H₂O₂ / OH⁻ yields:",
    questionTextTamil: "புரோப்பீனை B₂H₆ மற்றும் H₂O₂/OH⁻ கொண்டு ஹைட்ரோபோரேஷன்-ஆக்சிஜனேற்றம் செய்யும் போது கிடைக்கும் விளைபொருள்:",
    options: [
      { label: "A", text: "Propan-1-ol (anti-Markovnikov addition of water)" },
      { label: "B", text: "Propan-2-ol" },
      { label: "C", text: "Propanoic acid" },
      { label: "D", text: "Propane" }
    ],
    optionsTamil: [
      { label: "A", text: "புரோப்பேன்-1-ஆல் (ஆண்டி-மார்கோனிகாவ் விளைபொருள்)" },
      { label: "B", text: "புரோப்பேன்-2-ஆல் (மார்கோனிகாவ்)" },
      { label: "C", text: "புரோப்பனாயிக் அமிலம்" },
      { label: "D", text: "புரோப்பேன்" }
    ],
    correctAnswer: "A",
    explanation: "Hydroboration-oxidation gives overall anti-Markovnikov hydration, yielding 1° alcohol propan-1-ol.",
    explanationTamil: "ஹைட்ரோபோரேஷன்-ஆக்சிஜனேற்றம் ஆண்டி-மார்கோனிகாவ் முறையில் 1° ஆல்கஹாலான புரோப்பேன்-1-ஆலைத் தருகிறது."
  },
  {
    code: "CHE-206", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Reaction of phenol with neutral ferric chloride (FeCl₃) produces which characteristic colour?",
    questionTextTamil: "நடுநிலை FeCl₃-உடன் பீனால் தரும் சிறப்பியல்பு நிறம் யாது?",
    options: [
      { label: "A", text: "Violet colour" }, { label: "B", text: "Blue colour" }, { label: "C", text: "Green colour" }, { label: "D", text: "Yellow colour" }
    ],
    optionsTamil: [
      { label: "A", text: "ஊதா நிறம் (Violet complex)" },
      { label: "B", text: "நீல நிறம்" },
      { label: "C", text: "பச்சை நிறம்" },
      { label: "D", text: "மஞ்சள் நிறம்" }
    ],
    correctAnswer: "A",
    explanation: "Phenol forms coordination complex [Fe(OC₆H₅)₆]³⁻ giving characteristic violet coloration.",
    explanationTamil: "பீனால் நடுநிலை பெர்ரிக் குளோரைடுடன் ஊதா நிற அணைவுச் சேர்மத்தைத் தருகிறது."
  },
  {
    code: "CHE-207", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Anisole (methoxybenzene) on reaction with HI at 373 K yields:",
    questionTextTamil: "அனிசோல் (மெத்தாக்சிபென்சீன்) HI உடன் சூடுபடுத்தப்படும் போது உருவாகும் விளைபொருட்கள்:",
    options: [
      { label: "A", text: "Phenol and Methyl iodide (CH₃I)" },
      { label: "B", text: "Iodobenzene and Methanol" },
      { label: "C", text: "Benzene and Methyl alcohol" },
      { label: "D", text: "Chlorobenzene" }
    ],
    optionsTamil: [
      { label: "A", text: "பீனால் மற்றும் மெத்தில் அயோடைடு (CH₃I)" },
      { label: "B", text: "அயோடோபென்சீன்" },
      { label: "C", text: "பென்சீன்" },
      { label: "D", text: "குளோரோபென்சீன்" }
    ],
    correctAnswer: "A",
    explanation: "C₆H₅-O bond has partial double bond character. I⁻ attacks the methyl carbocation via SN2 to give CH₃I + C₆H₅OH.",
    explanationTamil: "C₆H₅-O பிணைப்பு வலிமையானது என்பதால் மெத்தில் தொகுதி பிளக்கப்பட்டு பீனால் மற்றும் CH₃I கிடைக்கின்றன."
  },
  {
    code: "CHE-208", subject: "Chemistry", topic: "Everyday Chemistry", difficulty: "easy",
    questionText: "Paracetamol is widely used as an:",
    questionTextTamil: "பாராசிட்டமால் (Paracetamol) மருத்துவத்தில் எதற்காகப் பயன்படுகிறது?",
    options: [
      { label: "A", text: "Antipyretic (fever reducer) and analgesic" },
      { label: "B", text: "Antibiotic" },
      { label: "C", text: "Antiseptic" },
      { label: "D", text: "Tranquilizer" }
    ],
    optionsTamil: [
      { label: "A", text: "காய்ச்சல் தணிப்பி (Antipyretic) மற்றும் வலி நிவாரணி" },
      { label: "B", text: "நுண்ணுயிர் கொல்லி" },
      { label: "C", text: "கிருமிநாசினி" },
      { label: "D", text: "மன அமைதி மருந்து" }
    ],
    correctAnswer: "A",
    explanation: "Paracetamol (4-acetamidophenol) reduces body temperature during fever and relieves mild pain.",
    explanationTamil: "பாராசிட்டமால் காய்ச்சல் குறைக்கும் ஆன்டிபைரெடிக் மற்றும் வலி நிவாரணியாகப் பயன்படுகிறது."
  },
  {
    code: "CHE-209", subject: "Chemistry", topic: "Everyday Chemistry", difficulty: "easy",
    questionText: "Tincture of iodine used as an antiseptic is:",
    questionTextTamil: "கிருமிநாசினியாகப் பயன்படும் டிஞ்சர் அயோடின் (Tincture of iodine) என்பது:",
    options: [
      { label: "A", text: "2-3% solution of iodine in alcohol-water mixture" },
      { label: "B", text: "Pure liquid iodine" },
      { label: "C", text: "Aqueous KI only" },
      { label: "D", text: "Iodoform solution" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆல்கஹால்-நீர் கலவையில் 2-3% அயோடின் கரைசல்" },
      { label: "B", text: "தூய அயோடின்" },
      { label: "C", text: "KI கரைசல்" },
      { label: "D", text: "அயோடோஃபார்ம்" }
    ],
    correctAnswer: "A",
    explanation: "Tincture of iodine (2-3% I₂ in alcohol-water) is applied on wounds as a skin antiseptic.",
    explanationTamil: "ஆல்கஹால்-நீரில் கலந்த 2-3% அயோடின் கரைசல் டிஞ்சர் அயோடின் எனப்படும்."
  },
  {
    code: "CHE-210", subject: "Chemistry", topic: "Biomolecules", difficulty: "medium",
    questionText: "Which linkage binds the two nucleotide units in a nucleic acid strand?",
    questionTextTamil: "நியூக்ளிக் அமில சங்கிலியில் நியூக்ளியோடைடுகளை இணைக்கும் பிணைப்பு எது?",
    options: [
      { label: "A", text: "Phosphodiester linkage (between 3' and 5' carbon atoms of sugars)" },
      { label: "B", text: "Peptide linkage" },
      { label: "C", text: "Glycosidic linkage" },
      { label: "D", text: "Disulfide linkage" }
    ],
    optionsTamil: [
      { label: "A", text: "பாஸ்போடைஎஸ்டர் பிணைப்பு (3' மற்றும் 5' கார்பன்களுக்கு இடையே)" },
      { label: "B", text: "பெப்டைட் பிணைப்பு" },
      { label: "C", text: "கிளைகோசிடிக் பிணைப்பு" },
      { label: "D", text: "டைசல்பைடு பிணைப்பு" }
    ],
    correctAnswer: "A",
    explanation: "Phosphate esterifies 5'-OH of one pentose sugar and 3'-OH of preceding sugar.",
    explanationTamil: "3'-OH மற்றும் 5'-OH கார்பன்களுக்கு இடையே பாஸ்போடைஎஸ்டர் பிணைப்பு உருவாகிறது."
  },
  {
    code: "CHE-211", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Dry ice is:",
    questionTextTamil: "உலர் பனிக்கட்டி (Dry Ice) என்பது என்ன?",
    options: [
      { label: "A", text: "Solid carbon dioxide (CO₂)" },
      { label: "B", text: "Solid water at -50°C" },
      { label: "C", text: "Solid nitrogen" },
      { label: "D", text: "Solid methane" }
    ],
    optionsTamil: [
      { label: "A", text: "திண்ம கார்பன் டை ஆக்சைடு (CO₂)" },
      { label: "B", text: "பனிக்கட்டி" },
      { label: "C", text: "திண்ம நைட்ரஜன்" },
      { label: "D", text: "திண்ம மீத்தேன்" }
    ],
    correctAnswer: "A",
    explanation: "Solid CO₂ sublimes directly into gas at -78.5°C without melting, used as coolant.",
    explanationTamil: "திண்ம கார்பன் டை ஆக்சைடு உலர் பனிக்கட்டி எனப்படுகிறது."
  },
  {
    code: "CHE-212", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Ozonolysis of 2-methylbut-2-ene followed by reductive workup with Zn/H₂O gives:",
    questionTextTamil: "2-மெத்தில்பியூட்-2-ஈனை ஓசோனேற்றம் செய்து Zn/H₂O உடன் வினைப்படுத்தினால் கிடைக்கும் பொருட்கள்:",
    options: [
      { label: "A", text: "Acetone and Acetaldehyde" },
      { label: "B", text: "Two molecules of acetone" },
      { label: "C", text: "Formaldehyde and acetone" },
      { label: "D", text: "Two molecules of acetaldehyde" }
    ],
    optionsTamil: [
      { label: "A", text: "அசிட்டோன் மற்றும் அசிட்டால்டிஹைடு" },
      { label: "B", text: "இரு அசிட்டோன் மூலக்கூறுகள்" },
      { label: "C", text: "ஃபார்மால்டிஹைடு" },
      { label: "D", text: "அசிட்டால்டிஹைடு" }
    ],
    correctAnswer: "A",
    explanation: "(CH₃)₂C=CH-CH₃ cleaves at double bond into (CH₃)₂C=O (acetone) + CH₃CHO (ethanal).",
    explanationTamil: "இரட்டைப் பிணைப்பு பிளக்கப்பட்டு அசிட்டோன் மற்றும் அசிட்டால்டிஹைடு உருவாகின்றன."
  },
  {
    code: "CHE-213", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "easy",
    questionText: "Markovnikov's rule predicts that addition of unsymmetrical reagent (e.g. HBr) to an unsymmetrical alkene adds the negative part to:",
    questionTextTamil: "மார்கோனிகாவ் விதிப்படி HBr-ன் எதிர்மின் பகுதியான புரோமின் எங்கு இணையும்?",
    options: [
      { label: "A", text: "The doubly bonded carbon having lesser number of hydrogen atoms" },
      { label: "B", text: "The carbon with more hydrogen atoms" },
      { label: "C", text: "Any carbon randomly" },
      { label: "D", text: "Only terminal carbons" }
    ],
    optionsTamil: [
      { label: "A", text: "குறைந்த எண்ணிக்கையில் ஹைட்ரஜன் கொண்ட இரட்டைப் பிணைப்பு கார்பனில்" },
      { label: "B", text: "அதிக ஹைட்ரஜன் கொண்ட கார்பனில்" },
      { label: "C", text: "எந்த கார்பனிலும்" },
      { label: "D", text: "முனை கார்பனில்" }
    ],
    correctAnswer: "A",
    explanation: "Halide anion adds to more substituted carbon to form more stable secondary/tertiary carbocation.",
    explanationTamil: "எதிர்மின் அயனி குறைந்த ஹைட்ரஜனைக் கொண்ட கார்பனில் இணைந்து நிலையான சேர்மத்தைத் தருகிறது."
  },
  {
    code: "CHE-214", subject: "Chemistry", topic: "Organic Chemistry", difficulty: "medium",
    questionText: "Kharasch effect (Peroxide effect) in the addition of HBr to propene gives anti-Markovnikov product only with:",
    questionTextTamil: "பெராக்சைடு முன்னிலையில் ஆண்டி-மார்கோனிகாவ் விளைவு (Kharasch effect) எதற்கு மட்டுமே நிகழ்கிறது?",
    options: [
      { label: "A", text: "HBr only (not with HCl or HI)" },
      { label: "B", text: "HCl only" },
      { label: "C", text: "HI only" },
      { label: "D", text: "HF only" }
    ],
    optionsTamil: [
      { label: "A", text: "HBr-க்கு மட்டுமே (HCl மற்றும் HI-க்கு நிகழாது)" },
      { label: "B", text: "HCl-க்கு மட்டும்" },
      { label: "C", text: "HI-க்கு மட்டும்" },
      { label: "D", text: "HF-க்கு மட்டும்" }
    ],
    correctAnswer: "A",
    explanation: "For HCl, H-Cl bond is too strong; for HI, I-I dimerization is favoured; only for HBr both propagation steps are exothermic.",
    explanationTamil: "ஆற்றல் கணக்கீடுகளின்படி பெராக்சைடு விளைவு HBr-க்கு மட்டுமே சாதகமாக அமைகிறது."
  },
  {
    code: "CHE-215", subject: "Chemistry", topic: "Biomolecules", difficulty: "easy",
    questionText: "Keratin, collagen, and elastin are essential animal proteins classified as:",
    questionTextTamil: "கொலாஜன், கெரட்டின் மற்றும் எலாஸ்டின் ஆகியவை எந்த வகைப் புரதங்களாகக் கருதப்படுகின்றன?",
    options: [
      { label: "A", text: "Structural proteins" }, { label: "B", text: "Transport proteins" }, { label: "C", text: "Enzymatic proteins" }, { label: "D", text: "Regulatory hormones" }
    ],
    optionsTamil: [
      { label: "A", text: "கட்டமைப்புப் புரதங்கள் (Structural proteins)" },
      { label: "B", text: "கடத்துப் புரதங்கள்" },
      { label: "C", text: "நொதிகள்" },
      { label: "D", text: "ஹார்மோன்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Collagen and keratin provide structural framework and mechanical strength to tissues, bones, skin, and tendons.",
    explanationTamil: "இவை உடலின் திசுக்கள், எலும்புகள், கூந்தல் ஆகியவற்றிற்கு வலிமையளிக்கும் கட்டமைப்புப் புரதங்களாகும்."
  }
];
