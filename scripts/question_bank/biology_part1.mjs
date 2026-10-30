// scripts/question_bank/biology_part1.mjs
// Questions BIO-001 to BIO-055: Plant Reproduction, Genetics, Molecular Biology, Biotechnology

export const biologyPart1 = [
  // 1-15 Plant Reproduction & Reproduction in Organisms
  {
    code: "BIO-001", subject: "Biology", topic: "Reproduction in Plants", difficulty: "easy",
    questionText: "The transfer of pollen grains from the anther to the stigma of another flower of the same plant is called:",
    questionTextTamil: "ஒரு தாவரத்தின் மகரந்தப்பையிலிருந்து அதே தாவரத்தின் மற்றொரு மலரின் சூல்முடிக்கு மகரந்தம் மாற்றப்படுவது:",
    options: [
      { label: "A", text: "Geitonogamy" }, { label: "B", text: "Autogamy" }, { label: "C", text: "Xenogamy" }, { label: "D", text: "Cleistogamy" }
    ],
    optionsTamil: [
      { label: "A", text: "கெய்ட்டனோகேமி (Geitonogamy)" }, { label: "B", text: "ஆட்டோகேமி (Autogamy)" }, { label: "C", text: "செனோகேமி (Xenogamy)" }, { label: "D", text: "கிளீஸ்டோகேமி (Cleistogamy)" }
    ],
    correctAnswer: "A",
    explanation: "Geitonogamy is functionally cross-pollination involving a pollinator, but genetically similar to autogamy as pollen comes from the same plant.",
    explanationTamil: "ஒரே தாவரத்தில் உள்ள இரு மலர்களுக்கு இடையே நடைபெறும் மகரந்தச் சேர்க்கை கெய்ட்டனோகேமி எனப்படும்."
  },
  {
    code: "BIO-002", subject: "Biology", topic: "Reproduction in Plants", difficulty: "medium",
    questionText: "Double fertilization is a characteristic feature of which group of plants?",
    questionTextTamil: "இரட்டைக்கருவுறுதல் (Double fertilization) என்பது எந்த தாவரக் குழுவின் தனித்துவமான பண்பு?",
    options: [
      { label: "A", text: "Angiosperms" }, { label: "B", text: "Gymnosperms" }, { label: "C", text: "Pteridophytes" }, { label: "D", text: "Bryophytes" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆஞ்சியோஸ்பெர்ம்கள்" }, { label: "B", text: "ஜிம்னோஸ்பெர்ம்கள்" }, { label: "C", text: "டெரிடோபைட்டுகள்" }, { label: "D", text: "பிரையோபைட்டுகள்" }
    ],
    correctAnswer: "A",
    explanation: "Double fertilization (syngamy + triple fusion) was discovered by Nawaschin and is unique to angiosperms.",
    explanationTamil: "நவாஷினால் கண்டறியப்பட்ட இரட்டைக்கருவுறுதல் பூக்கும் தாவரங்களான ஆஞ்சியோஸ்பெர்ம்களில் மட்டுமே நிகழும் தனித்துவ நிகழ்வு."
  },
  {
    code: "BIO-003", subject: "Biology", topic: "Reproduction in Plants", difficulty: "medium",
    questionText: "The nutritive tissue that nourishes the developing embryo in angiosperm seeds is:",
    questionTextTamil: "ஆஞ்சியோஸ்பெர்ம் விதைகளில் வளரும் கருவிற்கு ஊட்டமளிக்கும் திசு எது?",
    options: [
      { label: "A", text: "Endosperm (3n)" }, { label: "B", text: "Nucellus (2n)" }, { label: "C", text: "Tapetum (2n)" }, { label: "D", text: "Perisperm (2n)" }
    ],
    optionsTamil: [
      { label: "A", text: "கருவூண் திசு - Endosperm (3n)" }, { label: "B", text: "சூல்திசு - Nucellus (2n)" }, { label: "C", text: "டபேட்டம் - Tapetum (2n)" }, { label: "D", text: "பெரிஸ்பெர்ம் - Perisperm (2n)" }
    ],
    correctAnswer: "A",
    explanation: "In angiosperms, triple fusion of one sperm nucleus with two polar nuclei forms triploid (3n) endosperm.",
    explanationTamil: "ஆஞ்சியோஸ்பெர்ம்களில் மும்மைய இணைவினால் (3n) உருவாகும் எண்டோஸ்பெர்ம் (கருவூண்திசு) வளரும் கருவிற்கு ஊட்டமளிக்கிறது."
  },
  {
    code: "BIO-004", subject: "Biology", topic: "Reproduction in Plants", difficulty: "easy",
    questionText: "The inner nutritive layer of the microsporangium wall that provides nutrition to developing microspores is:",
    questionTextTamil: "வளரும் நுண்வித்துக்களுக்கு ஊட்டமளிக்கும் மகரந்தப்பையின் உட்சுவர் அடுக்கு:",
    options: [
      { label: "A", text: "Tapetum" }, { label: "B", text: "Endothecium" }, { label: "C", text: "Middle layers" }, { label: "D", text: "Epidermis" }
    ],
    optionsTamil: [
      { label: "A", text: "டபேட்டம் (Tapetum)" }, { label: "B", text: "எண்டோதீசியம் (Endothecium)" }, { label: "C", text: "இடை அடுக்குகள்" }, { label: "D", text: "புறத்தோல் (Epidermis)" }
    ],
    correctAnswer: "A",
    explanation: "Tapetum is the innermost layer of the anther wall that nourishes developing microspores and pollen grains.",
    explanationTamil: "டபேட்டம் என்பது மகரந்தப்பையின் உட்புற ஊட்டமளிக்கும் அடுக்காகும்."
  },
  {
    code: "BIO-005", subject: "Biology", topic: "Reproduction in Plants", difficulty: "medium",
    questionText: "Pollen exine is composed of an extremely resistant organic material known as:",
    questionTextTamil: "மகரந்தத்தின் வெளி அடுக்கு (Exine) சிதைக்க முடியாத எந்த வேதிப்பொருளால் ஆனது?",
    options: [
      { label: "A", text: "Sporopollenin" }, { label: "B", text: "Cellulose" }, { label: "C", text: "Pectin" }, { label: "D", text: "Chitin" }
    ],
    optionsTamil: [
      { label: "A", text: "ஸ்போரோபோலனின் (Sporopollenin)" }, { label: "B", text: "செல்லுலோஸ்" }, { label: "C", text: "பெக்டின்" }, { label: "D", text: "கைட்டின்" }
    ],
    correctAnswer: "A",
    explanation: "Sporopollenin is one of the most resistant biological polymers, withstanding high temperatures, strong acids, and alkali.",
    explanationTamil: "ஸ்போரோபோலனின் என்பது அமிலங்கள் மற்றும் அதிக வெப்பநிலையைத் தாங்கக்கூடிய மிகக் கடினமான கரிமப் பொருளாகும்."
  },
  {
    code: "BIO-006", subject: "Biology", topic: "Reproduction in Plants", difficulty: "easy",
    questionText: "In a typical female gametophyte (embryo sac) of angiosperms at maturity, there are:",
    questionTextTamil: "முதிர்ந்த ஒரு ஆஞ்சியோஸ்பெர்ம் கருப்பையானது (Embryo sac) எத்தனை செல்கள் மற்றும் உட்கருக்களைக் கொண்டது?",
    options: [
      { label: "A", text: "7 cells and 8 nuclei" }, { label: "B", text: "8 cells and 7 nuclei" }, { label: "C", text: "8 cells and 8 nuclei" }, { label: "D", text: "7 cells and 7 nuclei" }
    ],
    optionsTamil: [
      { label: "A", text: "7 செல்கள் மற்றும் 8 உட்கருக்கள்" }, { label: "B", text: "8 செல்கள் மற்றும் 7 உட்கருக்கள்" }, { label: "C", text: "8 செல்கள் மற்றும் 8 உட்கருக்கள்" }, { label: "D", text: "7 செல்கள் மற்றும் 7 உட்கருக்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Polygonum type embryo sac consists of 3 antipodals, 2 synergids, 1 egg cell, and 1 large central cell with 2 polar nuclei (7 cells, 8 nuclei).",
    explanationTamil: "முதிர்ந்த கருப்பை 7 செல்கள் மற்றும் 8 உட்கருக்களைக் கொண்டுள்ளது (பாலிStyle கோனம் வகை)."
  },
  {
    code: "BIO-007", subject: "Biology", topic: "Reproduction in Plants", difficulty: "medium",
    questionText: "The filiform apparatus is a specialized cellular thickening located at the micropylar tip of:",
    questionTextTamil: "இழை போன்ற உபகரணம் (Filiform apparatus) எதன் நுனியில் காணப்படுகிறது?",
    options: [
      { label: "A", text: "Synergids" }, { label: "B", text: "Egg cell" }, { label: "C", text: "Antipodals" }, { label: "D", text: "Secondary nucleus" }
    ],
    optionsTamil: [
      { label: "A", text: "சினெர்ஜிட்கள் (Synergids)" }, { label: "B", text: "அண்ட செல்" }, { label: "C", text: "எதிர்த்திசை செல்கள்" }, { label: "D", text: "இரண்டாம் நிலை உட்கரு" }
    ],
    correctAnswer: "A",
    explanation: "Synergids possess finger-like projections called the filiform apparatus that guides the pollen tube into the embryo sac.",
    explanationTamil: "சினெர்ஜிட்களில் உள்ள இழை போன்ற அமைப்பு மகரந்தக்குழாயை கருப்பைக்குள் வழிகாட்ட உதவுகிறது."
  },
  {
    code: "BIO-008", subject: "Biology", topic: "Reproduction in Plants", difficulty: "medium",
    questionText: "Development of fruits without fertilization is known as:",
    questionTextTamil: "கருவுறுதல் நடைபெறாமல் பழங்கள் உருவாகும் முறை எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Parthenocarpy" }, { label: "B", text: "Parthenogenesis" }, { label: "C", text: "Apomixis" }, { label: "D", text: "Amphimixis" }
    ],
    optionsTamil: [
      { label: "A", text: "பார்த்தினோகார்பி (Parthenocarpy)" }, { label: "B", text: "பார்த்தினோஜெனிசிஸ்" }, { label: "C", text: "அபோமிக்சிஸ் (Apomixis)" }, { label: "D", text: "ஆம்பிமிக்ஸிஸ்" }
    ],
    correctAnswer: "A",
    explanation: "Parthenocarpy produces seedless fruit without fertilization (e.g., banana).",
    explanationTamil: "கருவுறாமல் விதையற்ற பழங்கள் உருவாகும் நிகழ்வு பார்த்தினோகார்பி (எ.கா. வாழை) எனப்படும்."
  },
  {
    code: "BIO-009", subject: "Biology", topic: "Reproduction in Plants", difficulty: "hard",
    questionText: "Persistent nucellus present in seeds like black pepper and beet is called:",
    questionTextTamil: "கருவுறுதலுக்குப் பின்னும் சில விதைகளில் (மிளகு, பீட்ரூட்) எஞ்சியிருக்கும் சூல்திசு இவ்வாறு அழைக்கப்படுகிறது:",
    options: [
      { label: "A", text: "Perisperm" }, { label: "B", text: "Pericarp" }, { label: "C", text: "Endocarp" }, { label: "D", text: "Scutellum" }
    ],
    optionsTamil: [
      { label: "A", text: "பெரிஸ்பெர்ம் (Perisperm)" }, { label: "B", text: "பெரிகார்ப் (Pericarp)" }, { label: "C", text: "எண்டோகார்ப்" }, { label: "D", text: "ஸ்கூட்டெல்லம்" }
    ],
    correctAnswer: "A",
    explanation: "Residual, persistent nucellus is termed perisperm (found in black pepper and beet seeds).",
    explanationTamil: "விதைகளில் அழியாமல் எஞ்சியிருக்கும் சூல்திசுவிற்கு பெரிஸ்பெர்ம் என்று பெயர்."
  },
  {
    code: "BIO-010", subject: "Biology", topic: "Reproduction in Plants", difficulty: "medium",
    questionText: "The single shield-shaped cotyledon found in grass and cereal monocot embryos is termed:",
    questionTextTamil: "புல் மற்றும் தானிய ஒருவிதையிலைத் தாவர கருவில் உள்ள ஒரே கேடய வடிவ வித்திலை எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Scutellum" }, { label: "B", text: "Coleoptile" }, { label: "C", text: "Coleorhiza" }, { label: "D", text: "Epiblast" }
    ],
    optionsTamil: [
      { label: "A", text: "ஸ்கூட்டெல்லம் (Scutellum)" }, { label: "B", text: "முளைக்குருத்து உறை (Coleoptile)" }, { label: "C", text: "முளைவேர் உறை (Coleorhiza)" }, { label: "D", text: "எபிபிளாஸ்ட்" }
    ],
    correctAnswer: "A",
    explanation: "In monocotyledonous grass seeds, the single large shield-shaped cotyledon is called scutellum.",
    explanationTamil: "ஒருவிதையிலைத் தாவர கருவின் தனி வித்திலை ஸ்கூட்டெல்லம் எனப்படும்."
  },
  {
    code: "BIO-011", subject: "Biology", topic: "Reproduction in Plants", difficulty: "easy",
    questionText: "Pollination by wind is scientifically known as:",
    questionTextTamil: "காற்றின் மூலம் நடைபெறும் மகரந்தச்சேர்க்கை எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Anemophily" }, { label: "B", text: "Entomophily" }, { label: "C", text: "Hydrophily" }, { label: "D", text: "Ornithophily" }
    ],
    optionsTamil: [
      { label: "A", text: "அனிமோபிலி (Anemophily)" }, { label: "B", text: "என்டமோபிலி (Entomophily)" }, { label: "C", text: "ஹைட்ரோபிலி (Hydrophily)" }, { label: "D", text: "ஆர்னிதோபிலி (Ornithophily)" }
    ],
    correctAnswer: "A",
    explanation: "Anemophily is wind pollination; Entomophily is insect pollination; Hydrophily is water pollination; Ornithophily is bird pollination.",
    explanationTamil: "காற்றினால் மகரந்தச்சேர்க்கை நடைபெறுவது அனிமோபிலி எனப்படும்."
  },
  {
    code: "BIO-012", subject: "Biology", topic: "Reproduction in Plants", difficulty: "medium",
    questionText: "Which part of the ovule develops into the seed coat (testa and tegmen) after fertilization?",
    questionTextTamil: "கருவுறுதலுக்குப் பிறகு விதையின் விதை உறைகளாக (டெஸ்டா & டெக்மென்) மாறுவது எது?",
    options: [
      { label: "A", text: "Integuments" }, { label: "B", text: "Nucellus" }, { label: "C", text: "Funiculus" }, { label: "D", text: "Hilum" }
    ],
    optionsTamil: [
      { label: "A", text: "சூல் உறைகள் (Integuments)" }, { label: "B", text: "சூல்திசு (Nucellus)" }, { label: "C", text: "சூல் காம்பு (Funiculus)" }, { label: "D", text: "சூல் தழும்பு (Hilum)" }
    ],
    correctAnswer: "A",
    explanation: "Outer integument forms the outer seed coat (testa), and inner integument forms the inner coat (tegmen).",
    explanationTamil: "சூலின் வெளி மற்றும் உள் உறைகள் முதிர்ந்த விதையின் உறைகளாக மாறுகின்றன."
  },
  {
    code: "BIO-013", subject: "Biology", topic: "Reproduction in Plants", difficulty: "hard",
    questionText: "Cleistogamous flowers are characterized by being:",
    questionTextTamil: "கிளீஸ்டோகேமஸ் மலர்களின் (Cleistogamous flowers) முக்கிய பண்பு என்ன?",
    options: [
      { label: "A", text: "Invariably autogamous as they never open" }, { label: "B", text: "Exclusively cross-pollinated by bees" }, { label: "C", text: "Wind-pollinated with feathery stigmas" }, { label: "D", text: "Opening only during night time" }
    ],
    optionsTamil: [
      { label: "A", text: "மலர்கள் ஒருபோதும் திறக்காததால் எப்போதும் தன்மகரந்தச்சேர்க்கை மட்டுமே அடையும்" }, { label: "B", text: "தேனீக்களால் மட்டுமே அயல்மகரந்தச்சேர்க்கை அடையும்" }, { label: "C", text: "இறகு போன்ற சூல்முடியால் காற்றினால் சேர்க்கை அடையும்" }, { label: "D", text: "இரவு நேரத்தில் மட்டுமே மலரும்" }
    ],
    correctAnswer: "A",
    explanation: "Cleistogamous flowers do not open at all, ensuring complete self-pollination (autogamy) without needing external pollinators (e.g. Commelina, Oxalis, Viola).",
    explanationTamil: "கிளீஸ்டோகேமஸ் மலர்கள் திறக்கவே திறக்காது, இதனால் முழுமையான தன்மகரந்தச்சேர்க்கை மட்டுமே நடைபெறும்."
  },
  {
    code: "BIO-014", subject: "Biology", topic: "Reproduction in Plants", difficulty: "medium",
    questionText: "Apospory and apomixis are forms of reproduction where seeds are produced:",
    questionTextTamil: "அபோஸ்போரி மற்றும் அபோமிக்சிஸ் முறையில் விதைகள் உருவாவது:",
    options: [
      { label: "A", text: "Without fertilization mimicking sexual reproduction" }, { label: "B", text: "Only after cross fertilization" }, { label: "C", text: "By fusion of haploid gametes" }, { label: "D", text: "Through vegetative stem cuttings" }
    ],
    optionsTamil: [
      { label: "A", text: "கருவுறுதல் இன்றியே பாலினப்பெருக்கத்தைப் போன்று விதைகள் உருவாதல்" }, { label: "B", text: "அயல் கருவுறுதலுக்குப் பின் மட்டுமே" }, { label: "C", text: "ஒற்றைமய கேமீட்டுகளின் இணைவினால்" }, { label: "D", text: "தண்டு வெட்டுதல் மூலம்" }
    ],
    correctAnswer: "A",
    explanation: "Apomixis is a form of asexual reproduction that mimics sexual reproduction, producing seeds without fertilization.",
    explanationTamil: "அபோமிக்சிஸ் என்பது கருவுறுதல் இல்லாமல் விதைகளை உருவாக்கும் பாலிலா இனப்பெருக்க முறையாகும்."
  },
  {
    code: "BIO-015", subject: "Biology", topic: "Reproduction in Plants", difficulty: "easy",
    questionText: "The edible fleshy part of an apple is the modified:",
    questionTextTamil: "ஆப்பிள் பழத்தில் நாம் உண்ணும் சதைப்பற்றான பகுதி எது?",
    options: [
      { label: "A", text: "Thalamus" }, { label: "B", text: "Mesocarp" }, { label: "C", text: "Endocarp" }, { label: "D", text: "Pericarp" }
    ],
    optionsTamil: [
      { label: "A", text: "பூத்தளம் (Thalamus)" }, { label: "B", text: "நடு அடுக்கு (Mesocarp)" }, { label: "C", text: "உள் அடுக்கு (Endocarp)" }, { label: "D", text: "கனித்தோல் (Pericarp)" }
    ],
    correctAnswer: "A",
    explanation: "Apple is a false fruit (pome) where the thalamus encloses the ovary and becomes fleshy and edible.",
    explanationTamil: "ஆப்பிள் ஒரு பொய் கனி (False fruit) ஆகும்; இதில் பூத்தளமே (Thalamus) சதைப்பற்றுடன் உண்ணக்கூடியதாகிறது."
  },

  // 16-30 Genetics & Principles of Inheritance
  {
    code: "BIO-016", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "easy",
    questionText: "The phenotypic ratio of a standard Mendelian dihybrid cross in the F2 generation is:",
    questionTextTamil: "மெண்டலின் இருபண்பு கலப்பின் F2 தலைமுறை புறத்தோற்ற விகிதம் (Phenotypic ratio):",
    options: [
      { label: "A", text: "9:3:3:1" }, { label: "B", text: "3:1" }, { label: "C", text: "1:2:1" }, { label: "D", text: "9:7" }
    ],
    optionsTamil: [
      { label: "A", text: "9:3:3:1" }, { label: "B", text: "3:1" }, { label: "C", text: "1:2:1" }, { label: "D", text: "9:7" }
    ],
    correctAnswer: "A",
    explanation: "In a standard dihybrid cross (e.g. RrYy x RrYy), the phenotypic ratio is 9:3:3:1.",
    explanationTamil: "மெண்டலின் இருபண்புக் கலப்பில் F2 புறத்தோற்ற விகிதம் 9:3:3:1 ஆகும்."
  },
  {
    code: "BIO-017", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "medium",
    questionText: "A cross between an individual of unknown genotype showing dominant phenotype and a homozygous recessive parent is called a:",
    questionTextTamil: "ஓங்கு பண்பு கொண்ட ஒரு தாவரத்தின் மரபணு வகையை அறிய அதனை ஒடுங்கு பெற்றோருடன் கலப்பு செய்வது:",
    options: [
      { label: "A", text: "Test cross" }, { label: "B", text: "Back cross" }, { label: "C", text: "Reciprocal cross" }, { label: "D", text: "Monohybrid cross" }
    ],
    optionsTamil: [
      { label: "A", text: "சோதனைக் கலப்பு (Test cross)" }, { label: "B", text: "பிற்கலப்பு (Back cross)" }, { label: "C", text: "பரிமாற்றக் கலப்பு (Reciprocal cross)" }, { label: "D", text: "ஒருபண்புக் கலப்பு" }
    ],
    correctAnswer: "A",
    explanation: "A test cross (crossing dominant phenotype with homozygous recessive) determines whether the dominant individual is homozygous or heterozygous.",
    explanationTamil: "ஓங்கு பண்புடைய தாவரத்தை ஒடுங்கு பண்பு பெற்றோருடன் கலப்பு செய்து மரபணுவை அறிவது சோதனைக் கலப்பு எனப்படும்."
  },
  {
    code: "BIO-018", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "medium",
    questionText: "In Mirabilis jalapa (4 o'clock plant), crossing red flowers (RR) with white flowers (rr) produces pink flowers (Rr). This phenomenon is known as:",
    questionTextTamil: "அந்திமந்தாரை தாவரத்தில் சிவப்பு மலர் (RR) மற்றும் வெள்ளை மலர் (rr) கலப்பில் இளஞ்சிவப்பு மலர் (Rr) தோன்றுவது:",
    options: [
      { label: "A", text: "Incomplete dominance" }, { label: "B", text: "Codominance" }, { label: "C", text: "Pleiotropy" }, { label: "D", text: "Epistasis" }
    ],
    optionsTamil: [
      { label: "A", text: "முழுமையற்ற ஓங்குதன்மை (Incomplete dominance)" }, { label: "B", text: "இணை ஓங்குதன்மை (Codominance)" }, { label: "C", text: "பிளியோட்ராபி (Pleiotropy)" }, { label: "D", text: "எபிஸ்டாசிஸ் (Epistasis)" }
    ],
    correctAnswer: "A",
    explanation: "Incomplete dominance produces an intermediate heterozygous phenotype (ratio 1:2:1 for both phenotype and genotype).",
    explanationTamil: "இரு பெற்றோரின் பண்புகளும் கலந்த இடைப்பட்ட பண்பு வெளிப்படுவது முழுமையற்ற ஓங்குதன்மை எனப்படும்."
  },
  {
    code: "BIO-019", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "medium",
    questionText: "Human ABO blood groups are determined by gene I with three alleles (I^A, I^B, i). This illustrates:",
    questionTextTamil: "மனிதனின் ABO இரத்த வகைகளைத் தீர்மானிக்கும் மூன்று அல்லீல்கள் (I^A, I^B, i) எதற்கு சிறந்த உதாரணம்?",
    options: [
      { label: "A", text: "Multiple alleles and Codominance" }, { label: "B", text: "Incomplete dominance and linkage" }, { label: "C", text: "Polygenic inheritance" }, { label: "D", text: "Pleiotropy" }
    ],
    optionsTamil: [
      { label: "A", text: "பல்கூட்டு அல்லீல்கள் மற்றும் இணை ஓங்குதன்மை" }, { label: "B", text: "முழுமையற்ற ஓங்குதன்மை மற்றும் பிணைப்பு" }, { label: "C", text: "பல்மரபணு மரபுவழி" }, { label: "D", text: "பிளியோட்ராபி" }
    ],
    correctAnswer: "A",
    explanation: "Gene I exhibits multiple allelism (three alleles), and I^A I^B shows codominance (AB blood group).",
    explanationTamil: "மனித ABO இரத்த வகை பல்கூட்டு அல்லீல்கள் மற்றும் இணை ஓங்குதன்மைக்குச் சிறந்த உதாரணமாகும்."
  },
  {
    code: "BIO-020", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "hard",
    questionText: "Morgan used which organism extensively for his groundbreaking chromosomal and linkage studies?",
    questionTextTamil: "டி.ஹெச். மார்கன் தனது புகழ்பெற்ற பிணைப்பு மற்றும் மரபணு சோதனைகளுக்குப் பயன்படுத்திய உயிரினம் எது?",
    options: [
      { label: "A", text: "Drosophila melanogaster" }, { label: "B", text: "Pisum sativum" }, { label: "C", text: "Neurospora crassa" }, { label: "D", text: "Escherichia coli" }
    ],
    optionsTamil: [
      { label: "A", text: "ட்ரோசோபிலா மெலனோகாஸ்டர் (பழப்பூச்சி)" }, { label: "B", text: "பைசம் சட்டைவம் (பட்டாணி)" }, { label: "C", text: "நியூரோஸ்போரா கிராஸா" }, { label: "D", text: "எஸ்செரிச்சியா கோலை" }
    ],
    correctAnswer: "A",
    explanation: "Thomas Hunt Morgan used fruit fly (Drosophila melanogaster) as a model organism due to its short life cycle, clear dimorphism, and few chromosomes.",
    explanationTamil: "மார்கன் பழப்பூச்சியான ட்ரோசோபிலாவைப் பயன்படுத்தி மரபணு பிணைப்பு மற்றும் குறுக்கேற்றத்தைக் கண்டறிந்தார்."
  },
  {
    code: "BIO-021", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "medium",
    questionText: "The chromosomal condition represented by 2n + 1 (such as in Down syndrome) is known as:",
    questionTextTamil: "டவுன் சிண்ட்ரோமில் காணப்படும் 2n + 1 என்ற குரோமோசோம் நிலை எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Trisomy" }, { label: "B", text: "Monosomy" }, { label: "C", text: "Triploidy" }, { label: "D", text: "Tetrasomy" }
    ],
    optionsTamil: [
      { label: "A", text: "டிரைசோமி (Trisomy)" }, { label: "B", text: "மோனோசோமி (Monosomy)" }, { label: "C", text: "டிரிப்ளாய்டி (Triploidy)" }, { label: "D", text: "டெட்ராசோமி" }
    ],
    correctAnswer: "A",
    explanation: "Down syndrome is Trisomy 21 (addition of one extra chromosome to pair 21, represented as 2n + 1 = 47).",
    explanationTamil: "21-வது குரோமோசோமில் ஓர் கூடுதல் குரோமோசோம் இருப்பது டிரிசோமி (2n + 1 = 47) எனப்படும்."
  },
  {
    code: "BIO-022", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "medium",
    questionText: "Turner syndrome in human females is characterized by the karyotype:",
    questionTextTamil: "பெண்களில் காணப்படும் டர்னர் சிண்ட்ரோமின் (Turner syndrome) குரோமோசோம் அமைப்பு:",
    options: [
      { label: "A", text: "45, XO" }, { label: "B", text: "47, XXY" }, { label: "C", text: "47, XYY" }, { label: "D", text: "47, XXX" }
    ],
    optionsTamil: [
      { label: "A", text: "45, XO" }, { label: "B", text: "47, XXY" }, { label: "C", text: "47, XYY" }, { label: "D", text: "47, XXX" }
    ],
    correctAnswer: "A",
    explanation: "Turner syndrome is caused by the absence of one X chromosome (monosomy 2n - 1 = 45 with XO configuration).",
    explanationTamil: "டர்னர் சிண்ட்ரோம் என்பது ஒரு X குரோமோசோம் குறைபாட்டினால் (45, XO) ஏற்படும் மோனோசோமியாகும்."
  },
  {
    code: "BIO-023", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "medium",
    questionText: "Klinefelter syndrome is a genetic condition in males characterized by the chromosomal karyotype:",
    questionTextTamil: "ஆண்களில் ஏற்படும் கிளைன்பெல்டர் சிண்ட்ரோமின் (Klinefelter syndrome) மரபணு அமைப்பு:",
    options: [
      { label: "A", text: "47, XXY" }, { label: "B", text: "45, XO" }, { label: "C", text: "47, XYY" }, { label: "D", text: "46, XY" }
    ],
    optionsTamil: [
      { label: "A", text: "47, XXY" }, { label: "B", text: "45, XO" }, { label: "C", text: "47, XYY" }, { label: "D", text: "46, XY" }
    ],
    correctAnswer: "A",
    explanation: "Klinefelter syndrome is caused by an extra X chromosome in males (47, XXY).",
    explanationTamil: "ஆண்களில் ஓர் கூடுதல் X குரோமோசோம் இருப்பதால் (47, XXY) கிளைன்பெல்டர் சிண்ட்ரோம் உண்டாகிறது."
  },
  {
    code: "BIO-024", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "hard",
    questionText: "Sickle cell anemia is caused by a point mutation leading to substitution of which amino acid at the 6th position of the beta-globin chain?",
    questionTextTamil: "அரிவாள் செல் இரத்த சோகை நோயில் ஹீமோகுளோபின் பீட்டா சங்கிலியின் 6-வது இடத்தில் குளுட்டாமிக் அமிலத்திற்குப் பதிலாக மாற்றப்படும் அமினோ அமிலம்:",
    options: [
      { label: "A", text: "Valine" }, { label: "B", text: "Leucine" }, { label: "C", text: "Alanine" }, { label: "D", text: "Glycine" }
    ],
    optionsTamil: [
      { label: "A", text: "வாலின் (Valine)" }, { label: "B", text: "லூசின் (Leucine)" }, { label: "C", text: "அலனைன் (Alanine)" }, { label: "D", text: "கிளைசின் (Glycine)" }
    ],
    correctAnswer: "A",
    explanation: "Point mutation GAG -> GUG changes Glutamic acid to Valine at the 6th position of the β-globin chain.",
    explanationTamil: "GAG மரபணுக் குறியீடு GUG-ஆக மாறுவதால் 6-வது இடத்தில் குளுட்டாமிக் அமிலத்திற்குப் பதிலாக வாலின் இணைகிறது."
  },
  {
    code: "BIO-025", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "easy",
    questionText: "Haemophilia is a genetic disorder inherited as an:",
    questionTextTamil: "ஹீமோபிலியா (இரத்தம் உறையாமை நோய்) என்பது எந்த வகை மரபு வழி நோய்?",
    options: [
      { label: "A", text: "X-linked recessive trait" }, { label: "B", text: "Autosomal dominant trait" }, { label: "C", text: "Autosomal recessive trait" }, { label: "D", text: "Y-linked trait" }
    ],
    optionsTamil: [
      { label: "A", text: "X-சார்ந்த ஒடுங்கு மரபுப் பண்பு (X-linked recessive)" }, { label: "B", text: "உடல் குரோமோசோம் ஓங்கு பண்பு" }, { label: "C", text: "உடல் குரோமோசோம் ஒடுங்கு பண்பு" }, { label: "D", text: "Y-சார்ந்த பண்பு" }
    ],
    correctAnswer: "A",
    explanation: "Haemophilia and red-green colour blindness are classic X-linked recessive disorders transmitted from carrier females to sons.",
    explanationTamil: "ஹீமோபிலியா என்பது X-குரோமோசோம் சார்ந்த ஒடுங்கு மரபணு நோயாகும்."
  },
  {
    code: "BIO-026", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "medium",
    questionText: "In birds, sex determination follows which chromosomal mechanism?",
    questionTextTamil: "பறவைகளில் பாலின நிர்ணயம் எந்த குரோமோசோம் முறையில் தீர்மானிக்கப்படுகிறது?",
    options: [
      { label: "A", text: "ZW - ZZ type (Female heterogamety)" }, { label: "B", text: "XX - XY type (Male heterogamety)" }, { label: "C", text: "XX - XO type" }, { label: "D", text: "Haplodiploid type" }
    ],
    optionsTamil: [
      { label: "A", text: "ZW - ZZ முறை (பெண் பல்தன்மை)" }, { label: "B", text: "XX - XY முறை (ஆண் பல்தன்மை)" }, { label: "C", text: "XX - XO முறை" }, { label: "D", text: "ஹேப்ளோடிப்ளாய்டு முறை" }
    ],
    correctAnswer: "A",
    explanation: "In birds, females produce two different gametes (ZW) and males produce one type (ZZ) - female heterogamety.",
    explanationTamil: "பறவைகளில் பெண் பறவை இருவேறு பாலின குரோமோசோம்களைக் (ZW) கொண்டுள்ளதால் பெண் பல்தன்மை முறை நிலவுகிறது."
  },
  {
    code: "BIO-027", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "hard",
    questionText: "When a single gene influences multiple phenotypic traits, this genetic phenomenon is termed:",
    questionTextTamil: "ஒரு தனி மரபணு பல புறத்தோற்றப் பண்புகளைக் கட்டுப்படுத்தும் நிகழ்வு எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Pleiotropy" }, { label: "B", text: "Polygenic inheritance" }, { label: "C", text: "Epistasis" }, { label: "D", text: "Complementary genes" }
    ],
    optionsTamil: [
      { label: "A", text: "பிளியோட்ராபி (Pleiotropy)" }, { label: "B", text: "பல்மரபணு மரபுவழி" }, { label: "C", text: "எபிஸ்டாசிஸ்" }, { label: "D", text: "நிரப்பு மரபணுக்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Pleiotropy occurs when one gene affects multiple unrelated phenotypic characteristics (e.g. Phenylketonuria).",
    explanationTamil: "ஒரே மரபணு பல புறப்பண்புகளை பாதிப்பது பிளியோட்ராபி எனப்படும் (எ.கா: பினைல்கீட்டோநியூரியா)."
  },
  {
    code: "BIO-028", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "medium",
    questionText: "Human skin colour is a classic example of which type of inheritance?",
    questionTextTamil: "மனிதனின் தோல் நிறம் எந்த வகை மரபுவழி பண்பிற்குச் சிறந்த எடுத்துக்காட்டு?",
    options: [
      { label: "A", text: "Polygenic inheritance" }, { label: "B", text: "Codominance" }, { label: "C", text: "Multiple allelism" }, { label: "D", text: "Maternal inheritance" }
    ],
    optionsTamil: [
      { label: "A", text: "பல்மரபணு மரபுவழி (Polygenic inheritance)" }, { label: "B", text: "இணை ஓங்குதன்மை" }, { label: "C", text: "பல்கூட்டு அல்லீல்கள்" }, { label: "D", text: "தாய்வழி மரபு" }
    ],
    correctAnswer: "A",
    explanation: "Human skin colour is controlled by multiple additive genes (polygenes A, B, C) exhibiting a bell-shaped phenotypic distribution.",
    explanationTamil: "மனித தோல் நிறம் பல மரபணுக்களின் கூட்டு விளைவால் (Polygenic) தீர்மானிக்கப்படுகிறது."
  },
  {
    code: "BIO-029", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "easy",
    questionText: "Mendel formulated the Law of Independent Assortment based on the results of:",
    questionTextTamil: "மெண்டல் எதன் அடிப்படையில் சார்பின்றி ஒதுங்குதல் விதியை (Law of Independent Assortment) உருவாக்கினார்?",
    options: [
      { label: "A", text: "Dihybrid cross" }, { label: "B", text: "Monohybrid cross" }, { label: "C", text: "Test cross" }, { label: "D", text: "Reciprocal cross" }
    ],
    optionsTamil: [
      { label: "A", text: "இருபண்புக் கலப்பு (Dihybrid cross)" }, { label: "B", text: "ஒருபண்புக் கலப்பு" }, { label: "C", text: "சோதனைக் கலப்பு" }, { label: "D", text: "பரிமாற்றக் கலப்பு" }
    ],
    correctAnswer: "A",
    explanation: "The Law of Independent Assortment was derived from dihybrid cross experiments where alleles of two different genes segregate independently.",
    explanationTamil: "இருபண்புக் கலப்பின் முடிவுகளின் அடிப்படையிலேயே சார்பின்றி ஒதுங்குதல் விதியை மெண்டல் வெளியிட்டார்."
  },
  {
    code: "BIO-030", subject: "Biology", topic: "Genetics & Inheritance", difficulty: "hard",
    questionText: "The frequency of recombination between gene pairs on the same chromosome as a measure of the distance between genes was first used by:",
    questionTextTamil: "ஒரே குரோமோசோமில் உள்ள மரபணுக்களுக்கு இடையேயான மறுசேர்க்கை விகிதத்தை மரபணு வரைபடத் தூரமாகப் பயன்படுத்தியவர்:",
    options: [
      { label: "A", text: "Alfred Sturtevant" }, { label: "B", text: "Thomas Hunt Morgan" }, { label: "C", text: "Gregor Mendel" }, { label: "D", text: "Sutton and Boveri" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆல்ஃபிரட் ஸ்டூர்டிவென்ட் (Alfred Sturtevant)" }, { label: "B", text: "தாமஸ் ஹன்ட் மார்கன்" }, { label: "C", text: "கிரிகோர் மெண்டல்" }, { label: "D", text: "சட்டன் மற்றும் போவரி" }
    ],
    correctAnswer: "A",
    explanation: "Alfred Sturtevant (Morgan's student) constructed the first genetic chromosome map using recombination frequencies.",
    explanationTamil: "மார்கனின் மாணவரான ஆல்ஃபிரட் ஸ்டூர்டிவென்ட் முதன்முதலில் மரபணு வரைபடத்தை உருவாக்கினார்."
  },

  // 31-45 Molecular Basis of Inheritance
  {
    code: "BIO-031", subject: "Biology", topic: "Molecular Biology", difficulty: "easy",
    questionText: "The Watson-Crick double helix model of B-DNA has a pitch (distance of one complete turn) equal to:",
    questionTextTamil: "வாட்சன்-கிரிக் B-டி.என்.ஏ இரட்டைச் சுருளின் ஒரு முழு சுற்றின் சுருள் இடைவெளி (Pitch):",
    options: [
      { label: "A", text: "3.4 nm (34 Å)" }, { label: "B", text: "0.34 nm (3.4 Å)" }, { label: "C", text: "2.0 nm (20 Å)" }, { label: "D", text: "34 nm" }
    ],
    optionsTamil: [
      { label: "A", text: "3.4 nm (34 Å)" }, { label: "B", text: "0.34 nm (3.4 Å)" }, { label: "C", text: "2.0 nm (20 Å)" }, { label: "D", text: "34 nm" }
    ],
    correctAnswer: "A",
    explanation: "One complete helical turn is 3.4 nm (34 Å) and contains 10 base pairs, with distance between adjacent base pairs being 0.34 nm.",
    explanationTamil: "ஒரு முழுச் சுற்றின் தூரம் 3.4 நானோமீட்டர் (34 Å); அதில் 10 கார இணைகள் இருக்கும்."
  },
  {
    code: "BIO-032", subject: "Biology", topic: "Molecular Biology", difficulty: "medium",
    questionText: "According to Chargaff's rules for double-stranded DNA:",
    questionTextTamil: "இரட்டை இழை டி.என்.ஏ-வில் சார்காப்பின் விதியின்படி (Chargaff's rules):",
    options: [
      { label: "A", text: "A + G = T + C (Purines = Pyrimidines)" }, { label: "B", text: "A + T = G + C" }, { label: "C", text: "A / T > G / C" }, { label: "D", text: "Purines > Pyrimidines" }
    ],
    optionsTamil: [
      { label: "A", text: "A + G = T + C (பியூரின்கள் = பிரிமிடின்கள்)" }, { label: "B", text: "A + T = G + C" }, { label: "C", text: "A / T > G / C" }, { label: "D", text: "பியூரின்கள் > பிரிமிடின்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Chargaff showed that adenine equals thymine (A=T) and guanine equals cytosine (G=C), meaning total purines (A+G) equal total pyrimidines (T+C).",
    explanationTamil: "சார்காப்பின் விதிப்படி பியூரின்களின் மொத்த அளவு பிரிமிடின்களின் அளவிற்கு சமம்: A + G = T + C."
  },
  {
    code: "BIO-033", subject: "Biology", topic: "Molecular Biology", difficulty: "medium",
    questionText: "The semi-conservative nature of DNA replication was experimentally proven by Meselson and Stahl using which isotope?",
    questionTextTamil: "மெசல்சன் மற்றும் ஸ்டால் டி.என்.ஏ இரட்டிப்பாதல் பாதி-பழமை பேணும் முறை என நிரூபிக்க பயன்படுத்திய ஐசோடோப் எது?",
    options: [
      { label: "A", text: "¹⁵N (Heavy nitrogen)" }, { label: "B", text: "³²P (Radioactive phosphorus)" }, { label: "C", text: "³⁵S (Radioactive sulfur)" }, { label: "D", text: "¹⁴C (Radioactive carbon)" }
    ],
    optionsTamil: [
      { label: "A", text: "¹⁵N (கன நைட்ரஜன்)" }, { label: "B", text: "³²P (கதிரியக்க பாஸ்பரஸ்)" }, { label: "C", text: "³⁵S (கதிரியக்க கந்தகம்)" }, { label: "D", text: "¹⁴C (கதிரியக்க கார்பன்)" }
    ],
    correctAnswer: "A",
    explanation: "Meselson and Stahl grew E. coli in ¹⁵NH₄Cl and used CsCl density gradient centrifugation to prove semi-conservative replication.",
    explanationTamil: "மெசல்சன் மற்றும் ஸ்டால் ¹⁵N கன நைட்ரஜனைப் பயன்படுத்தி டி.என்.ஏ பாதி-பழமை பேணும் முறையில் இரட்டிப்பாகிறது என்பதை நிரூபித்தனர்."
  },
  {
    code: "BIO-034", subject: "Biology", topic: "Molecular Biology", difficulty: "hard",
    questionText: "Hershey and Chase unequivocally proved DNA is the genetic material in T2 bacteriophage by radiolabelling DNA and protein with:",
    questionTextTamil: "ஹெர்ஷி மற்றும் சேஸ் டி.என்.ஏ-வே மரபுப்பொருள் என நிரூபிக்க டி.என்.ஏ மற்றும் புரதங்களை எவற்றால் கதிரியக்க குறியிட்டனர்?",
    options: [
      { label: "A", text: "³²P for DNA and ³⁵S for protein" }, { label: "B", text: "³⁵S for DNA and ³²P for protein" }, { label: "C", text: "¹⁵N for DNA and ¹⁴C for protein" }, { label: "D", text: "³H for DNA and ³²P for protein" }
    ],
    optionsTamil: [
      { label: "A", text: "டி.என்.ஏ-வுக்கு ³²P மற்றும் புரதத்திற்கு ³⁵S" }, { label: "B", text: "டி.என்.ஏ-வுக்கு ³⁵S மற்றும் புரதத்திற்கு ³²P" }, { label: "C", text: "டி.என்.ஏ-வுக்கு ¹⁵N மற்றும் புரதத்திற்கு ¹⁴C" }, { label: "D", text: "டி.என்.ஏ-வுக்கு ³H மற்றும் புரதத்திற்கு ³²P" }
    ],
    correctAnswer: "A",
    explanation: "DNA contains phosphorus but no sulfur (labelled with ³²P), while protein contains sulfur but no phosphorus (labelled with ³⁵S).",
    explanationTamil: "டி.என்.ஏ-வில் பாஸ்பரஸ் உள்ளதால் ³²P-ஆலும், புரதத்தில் கந்தகம் உள்ளதால் ³⁵S-ஆலும் குறியிடப்பட்டது."
  },
  {
    code: "BIO-035", subject: "Biology", topic: "Molecular Biology", difficulty: "medium",
    questionText: "The nucleosome core particle consists of an octamer of which histone proteins?",
    questionTextTamil: "நியூக்ளியோசோம் மைய அமைப்பில் உள்ள ஹிஸ்டோன் எண்மம் (Octamer) எவற்றால் ஆனது?",
    options: [
      { label: "A", text: "Two molecules each of H2A, H2B, H3, and H4" }, { label: "B", text: "Two molecules each of H1, H2A, H2B, and H3" }, { label: "C", text: "One molecule each of H1, H2A, H2B, H3, H4" }, { label: "D", text: "Four molecules each of H3 and H4" }
    ],
    optionsTamil: [
      { label: "A", text: "H2A, H2B, H3 மற்றும் H4 ஆகியவற்றின் தலா இரு மூலக்கூறுகள்" }, { label: "B", text: "H1, H2A, H2B மற்றும் H3 ஆகியவற்றின் தலா இரு மூலக்கூறுகள்" }, { label: "C", text: "H1, H2A, H2B, H3, H4 ஆகியவற்றின் தலா ஒரு மூலக்கூறு" }, { label: "D", text: "H3 மற்றும் H4 ஆகியவற்றின் தலா நான்கு மூலக்கூறுகள்" }
    ],
    correctAnswer: "A",
    explanation: "Histone octamer consists of 2 copies of H2A, H2B, H3, and H4. Histone H1 binds the linker DNA externally.",
    explanationTamil: "ஹிஸ்டோன் எண்மத்தில் H2A, H2B, H3 மற்றும் H4 ஆகியவற்றில் தலா இரண்டு என மொத்தம் 8 புரத மூலக்கூறுகள் உள்ளன."
  },
  {
    code: "BIO-036", subject: "Biology", topic: "Molecular Biology", difficulty: "easy",
    questionText: "Which of the following is the universal start codon in protein synthesis that also codes for methionine?",
    questionTextTamil: "புரதச்சேர்க்கையைத் தொடங்கும் உலகளாவிய தொடக்கக் குறியீடு (Start codon) எது?",
    options: [
      { label: "A", text: "AUG" }, { label: "B", text: "UAA" }, { label: "C", text: "UAG" }, { label: "D", text: "UGA" }
    ],
    optionsTamil: [
      { label: "A", text: "AUG" }, { label: "B", text: "UAA" }, { label: "C", text: "UAG" }, { label: "D", text: "UGA" }
    ],
    correctAnswer: "A",
    explanation: "AUG serves dual functions: it acts as the initiation (start) codon and codes for the amino acid Methionine.",
    explanationTamil: "AUG என்பது தொடக்கக் குறியீடாகவும், மெத்தியோனைன் அமினோ அமிலத்திற்கான குறியீடாகவும் செயல்படுகிறது."
  },
  {
    code: "BIO-037", subject: "Biology", topic: "Molecular Biology", difficulty: "medium",
    questionText: "The three stop (nonsense) codons that terminate translation are:",
    questionTextTamil: "புரதச்சேர்க்கையை நிறுத்தும் மூன்று நிறுத்தக் குறியீடுகள் (Stop codons):",
    options: [
      { label: "A", text: "UAA, UAG, UGA" }, { label: "B", text: "AUG, UAA, UAG" }, { label: "C", text: "UAA, UGG, UGA" }, { label: "D", text: "UGA, UAC, UAA" }
    ],
    optionsTamil: [
      { label: "A", text: "UAA, UAG, UGA" }, { label: "B", text: "AUG, UAA, UAG" }, { label: "C", text: "UAA, UGG, UGA" }, { label: "D", text: "UGA, UAC, UAA" }
    ],
    correctAnswer: "A",
    explanation: "The stop codons are UAA (ochre), UAG (amber), and UGA (opal). They do not code for any amino acid.",
    explanationTamil: "UAA, UAG மற்றும் UGA ஆகிய மூன்று குறியீடுகள் எந்த அமினோ அமிலத்தையும் குறிக்காமல் புரதச்சேர்க்கையை நிறுத்துகின்றன."
  },
  {
    code: "BIO-038", subject: "Biology", topic: "Molecular Biology", difficulty: "medium",
    questionText: "In DNA replication, short fragments synthesized on the lagging strand are known as:",
    questionTextTamil: "டி.என்.ஏ இரட்டிப்பாதலில் பின்தங்கிய இழையில் (Lagging strand) துண்டு துண்டாக உருவாக்கப்படும் டி.என்.ஏ பகுதிகள்:",
    options: [
      { label: "A", text: "Okazaki fragments" }, { label: "B", text: "Klenow fragments" }, { label: "C", text: "Primer fragments" }, { label: "D", text: "Splice fragments" }
    ],
    optionsTamil: [
      { label: "A", text: "ஒகசாகி துண்டுகள் (Okazaki fragments)" }, { label: "B", text: "கிளெனாவ் துண்டுகள்" }, { label: "C", text: "பிரைமர் துண்டுகள்" }, { label: "D", text: "இணைவுத் துண்டுகள்" }
    ],
    correctAnswer: "A",
    explanation: "Okazaki fragments are synthesized discontinuously in the 5' -> 3' direction on the lagging strand and joined by DNA ligase.",
    explanationTamil: "பின்தங்கிய இழையில் உருவாக்கப்படும் சிறிய துண்டுகள் ஒகசாகி துண்டுகள் எனப்படுகின்றன; இவை டி.என்.ஏ லிகேஸால் இணைக்கப்படுகின்றன."
  },
  {
    code: "BIO-039", subject: "Biology", topic: "Molecular Biology", difficulty: "hard",
    questionText: "The enzyme responsible for unwinding the DNA double helix at the replication fork is:",
    questionTextTamil: "டி.என்.ஏ இரட்டிப்புக் கவையில் இரட்டை இழைகளை பிரித்து சுருளை அவிழ்க்கும் என்சைம்:",
    options: [
      { label: "A", text: "DNA Helicase" }, { label: "B", text: "DNA Ligase" }, { label: "C", text: "Topoisomerase" }, { label: "D", text: "DNA Polymerase III" }
    ],
    optionsTamil: [
      { label: "A", text: "டி.என்.ஏ ஹெலிகேஸ் (Helicase)" }, { label: "B", text: "டி.என்.ஏ லிகேஸ் (Ligase)" }, { label: "C", text: "டோபோஐசோமெரேஸ்" }, { label: "D", text: "டி.என்.ஏ பாலிமரேஸ் III" }
    ],
    correctAnswer: "A",
    explanation: "DNA Helicase breaks hydrogen bonds between bases to unwind the double helix, creating replication forks.",
    explanationTamil: "ஹெலிகேஸ் நொதி நைட்ரஜன் காரங்களுக்கு இடையிலான ஹைட்ரஜன் பிணைப்புகளை உடைத்து இரட்டை இழையை பிரிக்கிறது."
  },
  {
    code: "BIO-040", subject: "Biology", topic: "Molecular Biology", difficulty: "medium",
    questionText: "In the lac operon of E. coli, the inducer molecule that binds to the repressor protein is:",
    questionTextTamil: "E. coli-ன் லாக் ஓபரானில் ஒடுக்கி புரதத்துடன் இணையும் தூண்டுவி (Inducer) மூலக்கூறு எது?",
    options: [
      { label: "A", text: "Allolactose (or Lactose)" }, { label: "B", text: "Glucose" }, { label: "C", text: "Galactose" }, { label: "D", text: "cAMP" }
    ],
    optionsTamil: [
      { label: "A", text: "அலோலாக்டோஸ் / லாக்டோஸ்" }, { label: "B", text: "குளுக்கோஸ்" }, { label: "C", text: "கேலக்டோஸ்" }, { label: "D", text: "cAMP" }
    ],
    correctAnswer: "A",
    explanation: "Lactose (specifically allolactose) binds to the lac repressor, inactivating it and allowing RNA polymerase to transcribe structural genes.",
    explanationTamil: "அலோலாக்டோஸ் ஒடுக்கியுடன் இணைந்து அதனை செயலற்றதாக்குவதால் லாக் ஓபரான் இயங்கத் தொடங்குகிறது."
  },
  {
    code: "BIO-041", subject: "Biology", topic: "Molecular Biology", difficulty: "medium",
    questionText: "The process of removing non-coding introns and joining coding exons in eukaryotic hnRNA is called:",
    questionTextTamil: "யூகேரியோட்டுகளின் hnRNA-ல் குறியீடற்ற இன்ட்ரான்களை நீக்கி எக்சான்களை இணைக்கும் செயல்முறை:",
    options: [
      { label: "A", text: "Splicing" }, { label: "B", text: "Capping" }, { label: "C", text: "Tailing" }, { label: "D", text: "Translation" }
    ],
    optionsTamil: [
      { label: "A", text: "ஸ்பிளைசிங் (Splicing / பிளத்தல் & இணைத்தல்)" }, { label: "B", text: "தொப்பி போடுதல் (Capping)" }, { label: "C", text: "வால் சேர்த்தல் (Tailing)" }, { label: "D", text: "மொழிபெயர்ப்பு (Translation)" }
    ],
    correctAnswer: "A",
    explanation: "RNA splicing removes intervening non-coding sequences (introns) and splices together expressed sequences (exons) via spliceosomes.",
    explanationTamil: "இன்ட்ரான்களை நீக்கி எக்சான்களை ஒன்றிணைக்கும் முறை ஆர்.என்.ஏ ஸ்பிளைசிங் எனப்படும்."
  },
  {
    code: "BIO-042", subject: "Biology", topic: "Molecular Biology", difficulty: "hard",
    questionText: "Capping of eukaryotic mRNA involves addition of which modified nucleotide at the 5' end?",
    questionTextTamil: "யூகேரியோட் mRNA-ன் 5' முனையில் தொப்பியாக சேர்க்கப்படும் மாற்றியமைக்கப்பட்ட நியூக்ளியோடைடு எது?",
    options: [
      { label: "A", text: "7-methylguanosine triphosphate" }, { label: "B", text: "Adenylate residues" }, { label: "C", text: "Poly-U residues" }, { label: "D", text: "Deoxythymidine" }
    ],
    optionsTamil: [
      { label: "A", text: "7-மெத்தில் குவானோசின் டிரைபாஸ்பேட்" }, { label: "B", text: "அடினைலேட் மூலக்கூறுகள்" }, { label: "C", text: "பாலி-யு மூலக்கூறுகள்" }, { label: "D", text: "டியாக்சி தைமிடின்" }
    ],
    correctAnswer: "A",
    explanation: "Capping involves adding an unusual nucleotide, 7-methylguanosine triphosphate, to the 5' end of hnRNA.",
    explanationTamil: "5' முனையில் 7-மெத்தில் குவானோசின் டிரைபாஸ்பேட் சேர்க்கப்படுவது தொப்பி போடுதல் (Capping) எனப்படும்."
  },
  {
    code: "BIO-043", subject: "Biology", topic: "Molecular Biology", difficulty: "easy",
    questionText: "The clover-leaf secondary model of tRNA has an anticodon arm that reads mRNA codons in the:",
    questionTextTamil: "tRNA-ன் கிராம்பு இலை வடிவ இரண்டாம் நிலை அமைப்பில் உள்ள எதிர்க் குறியீட்டுப் பகுதி mRNA-ன் குறியீடுகளை வாசிக்கும் திசை:",
    options: [
      { label: "A", text: "Antiparallel direction (3' to 5')" }, { label: "B", text: "Parallel direction (5' to 3')" }, { label: "C", text: "Both directions" }, { label: "D", text: "Unidirectional without polarity" }
    ],
    optionsTamil: [
      { label: "A", text: "எதிர் இணை திசையில் (3' முதல் 5')" }, { label: "B", text: "இணை திசையில் (5' முதல் 3')" }, { label: "C", text: "இரு திசைகளிலும்" }, { label: "D", text: "திசையற்ற முறையில்" }
    ],
    correctAnswer: "A",
    explanation: "The anticodon on tRNA pairs antiparallel with the mRNA codon (5' to 3' codon pairs with 3' to 5' anticodon).",
    explanationTamil: "tRNA-ன் எதிர்க்குறியீடு mRNA-ன் குறியீட்டுடன் எதிரிணைத் திசையில் (Antiparallel) கார இணைவு கொள்கிறது."
  },
  {
    code: "BIO-044", subject: "Biology", topic: "Molecular Biology", difficulty: "hard",
    questionText: "In the Human Genome Project, the chromosome with the highest number of genes (2968 genes) is:",
    questionTextTamil: "மனித மரபணு திட்டத்தில் (HGP) அதிக எண்ணிக்கையிலான மரபணுக்களைக் (2968 மரபணுக்கள்) கொண்ட குரோமோசோம் எது?",
    options: [
      { label: "A", text: "Chromosome 1" }, { label: "B", text: "Chromosome Y" }, { label: "C", text: "Chromosome X" }, { label: "D", text: "Chromosome 21" }
    ],
    optionsTamil: [
      { label: "A", text: "குரோமோசோம் 1" }, { label: "B", text: "குரோமோசோம் Y" }, { label: "C", text: "குரோமோசோம் X" }, { label: "D", text: "குரோமோசோம் 21" }
    ],
    correctAnswer: "A",
    explanation: "Chromosome 1 has the most genes (2968), and the Y chromosome has the fewest genes (231).",
    explanationTamil: "குரோமோசோம் 1 அதிகபட்சமாக 2968 மரபணுக்களையும், Y குரோமோசோம் மிகக் குறைவாக 231 மரபணுக்களையும் கொண்டுள்ளன."
  },
  {
    code: "BIO-045", subject: "Biology", topic: "Molecular Biology", difficulty: "medium",
    questionText: "VNTRs (Variable Number of Tandem Repeats) utilized in DNA fingerprinting belong to which class of satellite DNA?",
    questionTextTamil: "டி.என்.ஏ கைரேகை தொழில்நுட்பத்தில் பயன்படும் VNTR-கள் எந்த வகை சாட்டிலைட் டி.என்.ஏ-வைச் சேர்ந்தவை?",
    options: [
      { label: "A", text: "Minisatellite" }, { label: "B", text: "Microsatellite" }, { label: "C", text: "Macrosatellite" }, { label: "D", text: "Centromeric DNA" }
    ],
    optionsTamil: [
      { label: "A", text: "மினிசாட்டிலைட் (Minisatellite)" }, { label: "B", text: "மைக்ரோசாட்டிலைட் (Microsatellite)" }, { label: "C", text: "மேக்ரோசாட்டிலைட்" }, { label: "D", text: "சென்ட்ரோமியர் டி.என்.ஏ" }
    ],
    correctAnswer: "A",
    explanation: "VNTR belongs to a class of satellite DNA referred to as minisatellite (repeat units of 10-60 bp).",
    explanationTamil: "VNTR என்பது மினிசாட்டிலைட் வகை டி.என்.ஏ வரிசையாகும்; இது டி.என்.ஏ கைரேகை பதிவில் பயன்படுகிறது."
  },

  // 46-55 Biotechnology & Its Applications
  {
    code: "BIO-046", subject: "Biology", topic: "Biotechnology", difficulty: "easy",
    questionText: "Restriction endonucleases are enzymes widely called:",
    questionTextTamil: "ரெஸ்ட்ரிக்ஷன் எண்டோநியூக்ளியேஸ்கள் பொதுவாக எவ்வாறு அழைக்கப்படுகின்றன?",
    options: [
      { label: "A", text: "Molecular scissors" }, { label: "B", text: "Molecular stitchers" }, { label: "C", text: "Molecular vehicles" }, { label: "D", text: "Molecular probes" }
    ],
    optionsTamil: [
      { label: "A", text: "மூலக்கூறு கத்தரிக்கோல்கள் (Molecular scissors)" }, { label: "B", text: "மூலக்கூறு தையற்கருவிகள்" }, { label: "C", text: "மூலக்கூறு ஊர்திகள்" }, { label: "D", text: "மூலக்கூறு துருவிகள்" }
    ],
    correctAnswer: "A",
    explanation: "Restriction enzymes cleave DNA at specific palindromic recognition sequences, acting as molecular scissors.",
    explanationTamil: "குறிப்பிட்ட பாலிண்ட்ரோம் வரிசைகளில் டி.என்.ஏ-வை துண்டிப்பதால் இவை மூலக்கூறு கத்தரிக்கோல்கள் எனப்படுகின்றன."
  },
  {
    code: "BIO-047", subject: "Biology", topic: "Biotechnology", difficulty: "medium",
    questionText: "In agarose gel electrophoresis, DNA fragments separate according to their size because:",
    questionTextTamil: "அகரோஸ் ஜெல் எலக்ட்ரோபோரசிஸில் டி.என்.ஏ துண்டுகள் அவற்றின் அளவின் அடிப்படையில் பிரியக் காரணம்:",
    options: [
      { label: "A", text: "DNA is negatively charged and smaller fragments move faster towards the anode" }, { label: "B", text: "DNA is positively charged and moves to cathode" }, { label: "C", text: "Larger fragments move faster through the gel pores" }, { label: "D", text: "DNA has no charge and separates by density" }
    ],
    optionsTamil: [
      { label: "A", text: "டி.என்.ஏ எதிர் மின்சுமை கொண்டது மற்றும் சிறிய துண்டுகள் நேர்மின்முனையை நோக்கி வேகமாக நகர்கின்றன" }, { label: "B", text: "டி.என்.ஏ நேர் மின்சுமை கொண்டது" }, { label: "C", text: "பெரிய துண்டுகள் வேகமாக நகர்கின்றன" }, { label: "D", text: "டி.என்.ஏ மின்சுமையற்றது" }
    ],
    correctAnswer: "A",
    explanation: "DNA has negative charge due to phosphate backbone and migrates toward positive anode; agarose pores sieve smaller fragments faster.",
    explanationTamil: "பாஸ்பேட் தொகுதியால் எதிர் மின்சுமை கொண்ட டி.என்.ஏ நேர்மின்முனை நோக்கி நகர்கிறது; சிறிய துண்டுகள் வேகமாகச் செல்கின்றன."
  },
  {
    code: "BIO-048", subject: "Biology", topic: "Biotechnology", difficulty: "easy",
    questionText: "To visualize DNA bands under UV transilluminator, the agarose gel is stained with:",
    questionTextTamil: "புறஊதாக் கதிர்களின் கீழ் டி.என்.ஏ பட்டைகளைக் காண அகரோஸ் ஜெல் எதனால் சாயமேற்றப்படுகிறது?",
    options: [
      { label: "A", text: "Ethidium bromide" }, { label: "B", text: "Methylene blue" }, { label: "C", text: "Safranin" }, { label: "D", text: "Acetocarmine" }
    ],
    optionsTamil: [
      { label: "A", text: "எத்திடியம் புரோமைடு (Ethidium bromide)" }, { label: "B", text: "மெத்திலீன் நீலம்" }, { label: "C", text: "சாஃப்ரனின்" }, { label: "D", text: "அசிட்டோகார்மைன்" }
    ],
    correctAnswer: "A",
    explanation: "Ethidium bromide (EtBr) intercalates between base pairs and fluoresces bright orange under UV light.",
    explanationTamil: "எத்திடியம் புரோமைடால் சாயமேற்றப்பட்டு UV ஒளியில் பார்க்கும்போது டி.என்.ஏ ஆரஞ்சு நிறத்தில் ஒளிர்கிறது."
  },
  {
    code: "BIO-049", subject: "Biology", topic: "Biotechnology", difficulty: "medium",
    questionText: "The thermostable DNA polymerase (Taq polymerase) used in Polymerase Chain Reaction (PCR) is isolated from:",
    questionTextTamil: "PCR தொழில்நுட்பத்தில் பயன்படுத்தப்படும் வெப்பத்தைத் தாங்கும் Taq பாலிமரேஸ் எந்த பாக்டீரியத்திலிருந்து பெறப்படுகிறது?",
    options: [
      { label: "A", text: "Thermus aquaticus" }, { label: "B", text: "Escherichia coli" }, { label: "C", text: "Bacillus thuringiensis" }, { label: "D", text: "Agrobacterium tumefaciens" }
    ],
    optionsTamil: [
      { label: "A", text: "தெர்மஸ் அக்வாடிகஸ் (Thermus aquaticus)" }, { label: "B", text: "எஸ்செரிச்சியா கோலை" }, { label: "C", text: "பேசில்லஸ் துரிஞ்சியென்சிஸ்" }, { label: "D", text: "அக்ரோபாக்டீரியம் டூமிபேசியன்ஸ்" }
    ],
    correctAnswer: "A",
    explanation: "Taq polymerase is extracted from the thermophilic bacterium Thermus aquaticus and can withstand 94°C denaturation temperature.",
    explanationTamil: "Taq பாலிமரேஸ் தெர்மஸ் அக்வாடிகஸ் என்ற வெந்நீர் ஊற்று பாக்டீரியத்திலிருந்து பிரித்தெடுக்கப்படுகிறது."
  },
  {
    code: "BIO-050", subject: "Biology", topic: "Biotechnology", difficulty: "medium",
    questionText: "The correct sequence of the three thermal cycles in PCR is:",
    questionTextTamil: "PCR சுழற்சியின் மூன்று தொடர் படிகளின் சரியான வரிசை எது?",
    options: [
      { label: "A", text: "Denaturation -> Annealing -> Extension" }, { label: "B", text: "Annealing -> Denaturation -> Extension" }, { label: "C", text: "Extension -> Denaturation -> Annealing" }, { label: "D", text: "Denaturation -> Extension -> Annealing" }
    ],
    optionsTamil: [
      { label: "A", text: "இயல்பு திரிதல் -> பதப்படுத்துதல் (இணைதல்) -> நீட்சி அடைதல்" }, { label: "B", text: "பதப்படுத்துதல் -> இயல்பு திரிதல் -> நீட்சி அடைதல்" }, { label: "C", text: "நீட்சி அடைதல் -> இயல்பு திரிதல் -> பதப்படுத்துதல்" }, { label: "D", text: "இயல்பு திரிதல் -> நீட்சி அடைதல் -> பதப்படுத்துதல்" }
    ],
    correctAnswer: "A",
    explanation: "PCR proceeds via Denaturation (~94°C) -> Primer Annealing (~54°C) -> Primer Extension (~72°C).",
    explanationTamil: "PCR படிகள்: இயல்பு திரிதல் (~94°C) -> பிரைமர் இணைதல் (~54°C) -> தொடர் நீட்சி (~72°C)."
  },
  {
    code: "BIO-051", subject: "Biology", topic: "Biotechnology", difficulty: "medium",
    questionText: "Bt toxin proteins produced by Bacillus thuringiensis kill insects by:",
    questionTextTamil: "பேசில்லஸ் துரிஞ்சியென்சிஸ் உருவாக்கும் Bt நச்சுப் புரதம் பூச்சிகளைக் கொல்லும் விதம்:",
    options: [
      { label: "A", text: "Creating pores in midgut epithelial cells upon solubilization in alkaline pH" }, { label: "B", text: "Inhibiting acetylcholinesterase in nerves" }, { label: "C", text: "Blocking protein synthesis in ribosomes" }, { label: "D", text: "Coagulating hemolymph fluids" }
    ],
    optionsTamil: [
      { label: "A", text: "கார pH-ல் கரைந்து நடுக்குடல் எபிதீலிய செல்களில் துளைகளை ஏற்படுத்தி செல் வெடிப்பு உண்டாக்குகிறது" }, { label: "B", text: "நரம்பு மண்டலத்தை முடக்குகிறது" }, { label: "C", text: "புரதச் சேர்க்கையைத் தடுக்கிறது" }, { label: "D", text: "ஹீமோலிம்பை உறைய வைக்கிறது" }
    ],
    correctAnswer: "A",
    explanation: "Inactive protoxin is solubilized by the alkaline pH of the insect midgut and converted into active toxin, creating pores and cell lysis.",
    explanationTamil: "பூச்சியின் நடுக்குடலில் உள்ள காரத்தன்மையால் நச்சு வீரியமடைந்து நடுக்குடல் சுவரில் துளைகளை இட்டு அழிக்கிறது."
  },
  {
    code: "BIO-052", subject: "Biology", topic: "Biotechnology", difficulty: "hard",
    questionText: "The first clinical gene therapy was given in 1990 to a 4-year-old girl suffering from deficiency of which enzyme?",
    questionTextTamil: "1990-ல் 4 வயது சிறுமிக்கு அளிக்கப்பட்ட முதல் மரபணு சிகிச்சையில் எந்த நொதியின் குறைபாடு சரிசெய்யப்பட்டது?",
    options: [
      { label: "A", text: "Adenosine deaminase (ADA)" }, { label: "B", text: "Tyrosinase" }, { label: "C", text: "Phenylalanine hydroxylase" }, { label: "D", text: "Beta-galactosidase" }
    ],
    optionsTamil: [
      { label: "A", text: "அடினோசின் டிஅமினேஸ் (ADA)" }, { label: "B", text: "டைரோசினேஸ்" }, { label: "C", text: "பினைல்அலனைன் ஹைட்ராக்சிலேஸ்" }, { label: "D", text: "பீட்டா-கேலக்டோசிடேஸ்" }
    ],
    correctAnswer: "A",
    explanation: "ADA deficiency causes severe combined immunodeficiency (SCID); functional ADA cDNA was introduced into the patient's lymphocytes.",
    explanationTamil: "SCID நோய் தாக்கிய சிறுமிக்கு அடினோசின் டிஅமினேஸ் (ADA) நொதியை உருவாக்கும் மரபணு சிகிச்சை வழங்கப்பட்டது."
  },
  {
    code: "BIO-053", subject: "Biology", topic: "Biotechnology", difficulty: "medium",
    questionText: "In pBR322 plasmid vector, the insertion of foreign DNA at the BamHI site in the tetracycline resistance gene causes:",
    questionTextTamil: "pBR322 பிளாஸ்மிட் வெக்டரில் டெட்ராசைக்ளின் எதிர்ப்பு பகுதியில் BamHI இடத்தில் அயல் டி.என்.ஏ இணைக்கப்பட்டால்:",
    options: [
      { label: "A", text: "Loss of tetracycline resistance (Insertional inactivation)" }, { label: "B", text: "Loss of ampicillin resistance" }, { label: "C", text: "Loss of replication origin" }, { label: "D", text: "Resistance to both antibiotics" }
    ],
    optionsTamil: [
      { label: "A", text: "டெட்ராசைக்ளின் எதிர்ப்புத் திறன் இழப்பு (செருகலால் செயலற்றதாதல்)" }, { label: "B", text: "ஆம்பிசிலின் எதிர்ப்புத் திறன் இழப்பு" }, { label: "C", text: "இரட்டிப்பாதல் தொடங்கும் தளம் அழிவு" }, { label: "D", text: "இரண்டு மருந்துகளையும் எதிர்க்கும் திறன்" }
    ],
    correctAnswer: "A",
    explanation: "Insertion of foreign DNA into the coding sequence of the tet^R gene disrupts its function, termed insertional inactivation.",
    explanationTamil: "டெட்ராசைக்ளின் ஜீனில் வெளி டி.என்.ஏ புகுத்தப்படுவதால் அது செயலற்றுப் போகிறது (Insertional inactivation)."
  },
  {
    code: "BIO-054", subject: "Biology", topic: "Biotechnology", difficulty: "medium",
    questionText: "Rosie, the first transgenic cow produced in 1997, produced human protein-enriched milk containing:",
    questionTextTamil: "1997-ல் உருவாக்கப்பட்ட முதல் மரபணு மாற்றப்பட்ட பசுவான ரோசி (Rosie) சுரந்த பாலில் இருந்த மனித புரதம் எது?",
    options: [
      { label: "A", text: "Human alpha-lactalbumin" }, { label: "B", text: "Human insulin" }, { label: "C", text: "Alpha-1-antitrypsin" }, { label: "D", text: "Human growth hormone" }
    ],
    optionsTamil: [
      { label: "A", text: "மனித ஆல்ஃபா-லாக்டால்புமின் (Human alpha-lactalbumin)" }, { label: "B", text: "மனித இன்சுலின்" }, { label: "C", text: "ஆல்ஃபா-1-ஆன்டிடிரிப்சின்" }, { label: "D", text: "மனித வளர்ச்சி ஹார்மோன்" }
    ],
    correctAnswer: "A",
    explanation: "Transgenic cow Rosie produced milk enriched with human alpha-lactalbumin (2.4 grams per litre), making it nutritionally balanced for babies.",
    explanationTamil: "ரோசி பசுவின் பாலில் மனித ஆல்ஃபா-லாக்டால்புமின் (2.4 கிராம்/லிட்டர்) புரதம் அதிக அளவில் இருந்தது."
  },
  {
    code: "BIO-055", subject: "Biology", topic: "Biotechnology", difficulty: "easy",
    questionText: "The technique used to silence specific mRNA in cellular defense in eukaryotes is:",
    questionTextTamil: "யூகேரியோட்டுகளின் செல்லுலார் பாதுகாப்பில் குறிப்பிட்ட mRNA-ஐ அமைதிப்படுத்த (Gene silencing) பயன்படும் முறை:",
    options: [
      { label: "A", text: "RNA interference (RNAi)" }, { label: "B", text: "Northern blotting" }, { label: "C", text: "Western blotting" }, { label: "D", text: "ELISA" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆர்.என்.ஏ குறுக்கீடு (RNA interference - RNAi)" }, { label: "B", text: "நார்தர்ன் பிளாட்டிங்" }, { label: "C", text: "வெஸ்டர்ன் பிளாட்டிங்" }, { label: "D", text: "எலிசா (ELISA)" }
    ],
    correctAnswer: "A",
    explanation: "RNA interference (RNAi) uses double-stranded RNA (dsRNA) to silence complementary target mRNA.",
    explanationTamil: "ஆர்.என்.ஏ குறுக்கீடு (RNAi) முறையில் இரட்டை இழை RNA குறிப்பிட்ட mRNA-ஐ அமைதிப்படுத்துகிறது."
  }
];
