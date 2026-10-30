// scripts/question_bank/biology_part2.mjs
// Questions BIO-056 to BIO-110: Evolution, Human Reproduction, Health & Diseases, Ecology & Environment

export const biologyPart2 = [
  // 56-68 Evolution
  {
    code: "BIO-056", subject: "Biology", topic: "Evolution", difficulty: "medium",
    questionText: "In Miller and Urey's experiment simulating primitive Earth conditions, the gases used in the spark discharge chamber were:",
    questionTextTamil: "தொன்மை புவியின் சூழலை உருவகப்படுத்திய மில்லர்-யூரே சோதனையில் மின்பொறி அறையில் பயன்படுத்தப்பட்ட வாயுக்கள்:",
    options: [
      { label: "A", text: "CH₄, NH₃, H₂, and water vapor at 800°C" }, { label: "B", text: "CO₂, O₂, N₂, and water vapor" }, { label: "C", text: "CH₄, CO₂, N₂, and NH₃" }, { label: "D", text: "O₂, H₂, NH₃, and CO" }
    ],
    optionsTamil: [
      { label: "A", text: "CH₄, NH₃, H₂ மற்றும் 800°C-ல் நீராவி" }, { label: "B", text: "CO₂, O₂, N₂ மற்றும் நீராவி" }, { label: "C", text: "CH₄, CO₂, N₂ மற்றும் NH₃" }, { label: "D", text: "O₂, H₂, NH₃ மற்றும் CO" }
    ],
    correctAnswer: "A",
    explanation: "Miller mixed CH₄, NH₃, H₂ (2:1:2 ratio) and water vapor in a closed flask at 800°C and produced simple amino acids.",
    explanationTamil: "மில்லர் 800°C வெப்பநிலையில் மீத்தேன், அம்மோனியா, ஹைட்ரஜன் மற்றும் நீராவியைக் கொண்டு அமினோ அமிலங்களை உருவாக்கிக் காட்டினார்."
  },
  {
    code: "BIO-057", subject: "Biology", topic: "Evolution", difficulty: "easy",
    questionText: "Structures with similar anatomical structure and origin but performing different functions are called:",
    questionTextTamil: "ஒரே விதமான அடிப்படை உள்ளமைப்பும் தோற்றமும் கொண்டு, வெவ்வேறு பணிகளைச் செய்யும் உறுப்புகள் எவ்வாறு அழைக்கப்படுகின்றன?",
    options: [
      { label: "A", text: "Homologous organs" }, { label: "B", text: "Analogous organs" }, { label: "C", text: "Vestigial organs" }, { label: "D", text: "Atavistic structures" }
    ],
    optionsTamil: [
      { label: "A", text: "அமைப்பு ஒத்த உறுப்புகள் (Homologous organs)" }, { label: "B", text: "செயல் ஒத்த உறுப்புகள் (Analogous organs)" }, { label: "C", text: "எச்ச உறுப்புகள் (Vestigial organs)" }, { label: "D", text: "முதுமரபு மீட்சி உறுப்புகள்" }
    ],
    correctAnswer: "A",
    explanation: "Homologous organs (e.g. forelimbs of whale, bat, cheetah, human) indicate divergent evolution and common ancestry.",
    explanationTamil: "ஒரே தோற்றமும் வெவ்வேறு பணிகளையும் கொண்ட உறுப்புகள் அமைப்பு ஒத்த உறுப்புகள் (விரி பரிணாமம்) ஆகும்."
  },
  {
    code: "BIO-058", subject: "Biology", topic: "Evolution", difficulty: "easy",
    questionText: "The wings of a butterfly and the wings of a bird are an example of:",
    questionTextTamil: "பட்டாம்பூச்சியின் இறக்கைகளும் பறவையின் இறக்கைகளும் எதற்கு எடுத்துக்காட்டு?",
    options: [
      { label: "A", text: "Analogous organs (Convergent evolution)" }, { label: "B", text: "Homologous organs (Divergent evolution)" }, { label: "C", text: "Adaptive radiation" }, { label: "D", text: "Industrial melanism" }
    ],
    optionsTamil: [
      { label: "A", text: "செயல் ஒத்த உறுப்புகள் - குவி பரிணாமம் (Convergent evolution)" }, { label: "B", text: "அமைப்பு ஒத்த உறுப்புகள் - விரி பரிணாமம்" }, { label: "C", text: "தகவமைப்பு பரவல்" }, { label: "D", text: "தொழில்முறை மெலனின் ஆக்கம்" }
    ],
    correctAnswer: "A",
    explanation: "Wings of insects and birds perform the same function (flight) but have completely different anatomy, showing convergent evolution.",
    explanationTamil: "இவை பறக்கும் ஒரே செயலைச் செய்தாலும் உடலமைப்பில் மாறுபட்டதால் செயல் ஒத்த உறுப்புகளாகும் (குவி பரிணாமம்)."
  },
  {
    code: "BIO-059", subject: "Biology", topic: "Evolution", difficulty: "medium",
    questionText: "According to the Hardy-Weinberg principle, allele frequencies in a population remain stable from generation to generation in the absence of:",
    questionTextTamil: "ஹார்டி-வெயின்பெர்க் சமன்பாட்டின்படி ஒரு உயிர்த்தொகையில் அல்லீல்களின் அதிர்வெண் மாறாமல் சமநிலையில் இருக்க எது நிகழக்கூடாது?",
    options: [
      { label: "A", text: "Mutation, gene migration, genetic drift, and natural selection" }, { label: "B", text: "Random mating" }, { label: "C", text: "Large population size" }, { label: "D", text: "Equal fertility" }
    ],
    optionsTamil: [
      { label: "A", text: "சடுதிமாற்றம், மரபணு இடம்பெயர்வு, மரபணு நகர்வு மற்றும் இயற்கை தேர்வு" }, { label: "B", text: "சமவாய்ப்பு இனச்சேர்க்கை" }, { label: "C", text: "பெரிய அளவிலான உயிர்த்தொகை" }, { label: "D", text: "சம கருவுறுதல் திறன்" }
    ],
    correctAnswer: "A",
    explanation: "Hardy-Weinberg equilibrium (p² + 2pq + q² = 1) is maintained when there are no mutations, gene flow, genetic drift, or natural selection.",
    explanationTamil: "சடுதிமாற்றம், மரபணுப் பாய்வு, மரபணு நகர்வு மற்றும் தேர்வு இல்லாதபோது மரபணு அதிர்வெண் மாறிலியாக இருக்கும்."
  },
  {
    code: "BIO-060", subject: "Biology", topic: "Evolution", difficulty: "hard",
    questionText: "When natural selection favors intermediate variants over individuals with extreme phenotypes, it is called:",
    questionTextTamil: "இயற்கைத் தேர்வு தீவிர புறத்தோற்றங்களை விட இடைப்பட்ட சராசரி பண்புடைய உயிரிகளை ஆதரித்தால் அது எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Stabilizing selection" }, { label: "B", text: "Directional selection" }, { label: "C", text: "Disruptive selection" }, { label: "D", text: "Balancing selection" }
    ],
    optionsTamil: [
      { label: "A", text: "நிலைப்படுத்தும் தேர்வு (Stabilizing selection)" }, { label: "B", text: "திசைமுகத் தேர்வு (Directional selection)" }, { label: "C", text: "பிளவுபடுத்தும் தேர்வு (Disruptive selection)" }, { label: "D", text: "சமநிலைத் தேர்வு" }
    ],
    correctAnswer: "A",
    explanation: "Stabilizing selection favors mean phenotypes (e.g., human infant birth weight) and narrows the phenotypic curve.",
    explanationTamil: "நிலைப்படுத்தும் தேர்வில் சராசரி பண்புகள் பாதுகாக்கப்பட்டு இருமுனை தீவிர பண்புகள் அகற்றப்படுகின்றன."
  },
  {
    code: "BIO-061", subject: "Biology", topic: "Evolution", difficulty: "medium",
    questionText: "Industrial melanism observed in the peppered moth (Biston betularia) in England is a classic demonstration of:",
    questionTextTamil: "இங்கிலாந்தில் பிஸ்டன் பெட்டுலேரியா அந்துப்பூச்சியில் நிகழ்ந்த தொழில்முறை மெலனின் ஆக்கம் எதற்கு உதாரணம்?",
    options: [
      { label: "A", text: "Natural selection in action" }, { label: "B", text: "Genetic drift" }, { label: "C", text: "Inheritance of acquired characters" }, { label: "D", text: "Artificial selection" }
    ],
    optionsTamil: [
      { label: "A", text: "இயற்கைத் தேர்விற்கான நேரடி சான்று" }, { label: "B", text: "மரபியல் நகர்வு" }, { label: "C", text: "பெறப்பட்ட பண்புகள் மரபுவழி கூடுதல்" }, { label: "D", text: "செயற்கைத் தேர்வு" }
    ],
    correctAnswer: "A",
    explanation: "Dark melanic moths survived better on soot-covered trees during the industrial revolution, showing natural selection.",
    explanationTamil: "தொழில்புரட்சிக்குப் பின் புகைக் கரியால் கருமை நிற அந்துப்பூச்சிகள் தப்பிப்பிழைத்தது இயற்கைத் தேர்வுக்குச் சிறந்த சான்று."
  },
  {
    code: "BIO-062", subject: "Biology", topic: "Evolution", difficulty: "medium",
    questionText: "Darwin's finches on the Galapagos Islands represent an outstanding example of:",
    questionTextTamil: "கலாபகஸ் தீவுகளில் டார்வின் கண்டறிந்த குருவிகள் (Finches) எதற்கு மிகச்சிறந்த எடுத்துக்காட்டு?",
    options: [
      { label: "A", text: "Adaptive radiation" }, { label: "B", text: "Convergent evolution" }, { label: "C", text: "Parallel evolution" }, { label: "D", text: "Saltation" }
    ],
    optionsTamil: [
      { label: "A", text: "தகவமைப்பு பரவல் (Adaptive radiation)" }, { label: "B", text: "குவி பரிணாமம்" }, { label: "C", text: "இணை பரிணாமம்" }, { label: "D", text: "திடீர் குதிப்பு (Saltation)" }
    ],
    correctAnswer: "A",
    explanation: "Adaptive radiation is the process of evolution of different species in a given geographical area radiating out from a common point.",
    explanationTamil: "ஓர் பொதுவான மூதாதையரிடமிருந்து வெவ்வேறு உணவு முறைக்கு ஏற்ப அலகுகள் தகவமைப்படைந்தது தகவமைப்பு பரவல் எனப்படும்."
  },
  {
    code: "BIO-063", subject: "Biology", topic: "Evolution", difficulty: "hard",
    questionText: "Hugo de Vries proposed the mutation theory of evolution based on his work on which plant?",
    questionTextTamil: "ஹியூகோ டி விரிஸ் எந்த தாவரத்தில் ஆய்வு செய்து சடுதிமாற்ற பரிணாமக் கோட்பாட்டை முன்வைத்தார்?",
    options: [
      { label: "A", text: "Oenothera lamarckiana (Evening primrose)" }, { label: "B", text: "Pisum sativum" }, { label: "C", text: "Mirabilis jalapa" }, { label: "D", text: "Lathyrus odoratus" }
    ],
    optionsTamil: [
      { label: "A", text: "ஈவினிங் பிரிம்ரோஸ் (Oenothera lamarckiana)" }, { label: "B", text: "பட்டாணி" }, { label: "C", text: "அந்திமந்தாரை" }, { label: "D", text: "இனிப்பு பட்டாணி" }
    ],
    correctAnswer: "A",
    explanation: "Hugo de Vries studied evening primrose (Oenothera lamarckiana) and coined the term 'mutation' for single-step large variations (saltation).",
    explanationTamil: "ஹியூகோ டி விரிஸ் அந்திப்பரிமளம் (Evening primrose) தாவரத்தில் ஆய்வு செய்து சடுதிமாற்றக் கொள்கையை வெளியிட்டார்."
  },
  {
    code: "BIO-064", subject: "Biology", topic: "Evolution", difficulty: "medium",
    questionText: "The hominid with cranial capacity of approximately 1400 cc who used hides to protect their body and buried their dead was:",
    questionTextTamil: "சுமார் 1400 cc மூளையளவைக் கொண்ட, உடலை மறைக்க தோல்களைப் பயன்படுத்திய மற்றும் இறந்தவர்களை அடக்கம் செய்த மனித மூதாதையர்:",
    options: [
      { label: "A", text: "Neanderthal man" }, { label: "B", text: "Homo erectus" }, { label: "C", text: "Homo habilis" }, { label: "D", text: "Australopithecus" }
    ],
    optionsTamil: [
      { label: "A", text: "நியாண்டர்தால் மனிதன் (Neanderthal man)" }, { label: "B", text: "ஹோமோ எரெக்டஸ்" }, { label: "C", text: "ஹோமோ ஹேபிலிஸ்" }, { label: "D", text: "ஆஸ்ட்ரலோபித்திகஸ்" }
    ],
    correctAnswer: "A",
    explanation: "Neanderthal man lived 100,000 to 40,000 years ago, had a cranial capacity of ~1400 cc, and buried their dead with rituals.",
    explanationTamil: "1400 cc மூளைத் திறன் கொண்டு இறந்தவர்களை புதைக்கும் பண்பைக் கொண்டிருந்தவர் நியாண்டர்தால் மனிதன்."
  },
  {
    code: "BIO-065", subject: "Biology", topic: "Evolution", difficulty: "easy",
    questionText: "The first human-like hominid tool-maker with a brain capacity between 650-800 cc was:",
    questionTextTamil: "650-800 cc மூளையளவைக் கொண்ட, கருவிகளைச் செய்யத் தெரிந்த முதல் மனித மூதாதையர்:",
    options: [
      { label: "A", text: "Homo habilis" }, { label: "B", text: "Homo erectus" }, { label: "C", text: "Australopithecus" }, { label: "D", text: "Ramapithecus" }
    ],
    optionsTamil: [
      { label: "A", text: "ஹோமோ ஹேபிலிஸ் (Homo habilis)" }, { label: "B", text: "ஹோமோ எரெக்டஸ்" }, { label: "C", text: "ஆஸ்ட்ரலோபித்திகஸ்" }, { label: "D", text: "ராமாபித்திகஸ்" }
    ],
    correctAnswer: "A",
    explanation: "Homo habilis (the 'handy man') had cranial capacity 650-800 cc and did not eat meat.",
    explanationTamil: "ஹோமோ ஹேபிலிஸ் மனிதன் கைவினை மனிதன் எனப்படுகிறார்; மூளைக் கொள்ளளவு 650-800 cc."
  },
  {
    code: "BIO-066", subject: "Biology", topic: "Evolution", difficulty: "hard",
    questionText: "The Coelacanth (Latimeria) discovered in South Africa in 1938 is considered a living fossil connecting:",
    questionTextTamil: "1938-ல் தென்னாப்பிரிக்காவில் பிடிபட்ட சீலகாந்த் (Latimeria) எந்த இரு விலங்கு வகுப்புகளுக்கு இடைப்பட்ட இணைப்பு உயிரி?",
    options: [
      { label: "A", text: "Fishes and Amphibians" }, { label: "B", text: "Amphibians and Reptiles" }, { label: "C", text: "Reptiles and Birds" }, { label: "D", text: "Reptiles and Mammals" }
    ],
    optionsTamil: [
      { label: "A", text: "மீன்கள் மற்றும் இருவாழ்விகள்" }, { label: "B", text: "இருவாழ்விகள் மற்றும் ஊர்வன" }, { label: "C", text: "ஊர்வன மற்றும் பறவைகள்" }, { label: "D", text: "ஊர்வன மற்றும் பாலூட்டிகள்" }
    ],
    correctAnswer: "A",
    explanation: "Coelacanth is a lobed-fin fish that evolved into the first amphibians that lived on both land and water.",
    explanationTamil: "சீலகாந்த் என்பது துடுப்பு மீன் வகையாகும்; இது மீன்களிலிருந்து நிலவாழ் இருவாழ்விகள் தோன்றியதற்கான வாழும் புதைபடிவ சான்றாகும்."
  },
  {
    code: "BIO-067", subject: "Biology", topic: "Evolution", difficulty: "medium",
    questionText: "The concept of 'Omnis cellula-e cellula' (all cells arise from pre-existing cells) was proposed by:",
    questionTextTamil: "'Omnis cellula-e cellula' (செல்கள் அனைத்தும் ஏற்கெனவே உள்ள செல்களிலிருந்தே உருவாகின்றன) என்ற கோட்பாட்டைக் கூறியவர்:",
    options: [
      { label: "A", text: "Rudolf Virchow" }, { label: "B", text: "Theodor Schwann" }, { label: "C", text: "Matthias Schleiden" }, { label: "D", text: "Robert Brown" }
    ],
    optionsTamil: [
      { label: "A", text: "ருடால்ப் விர்ச்சோ (Rudolf Virchow)" }, { label: "B", text: "தியோடர் ஸ்வான்" }, { label: "C", text: "மத்தியாஸ் ஸ்லைடன்" }, { label: "D", text: "ராபர்ட் பிரவுன்" }
    ],
    correctAnswer: "A",
    explanation: "Rudolf Virchow (1855) modified the cell theory by establishing that new cells originate from pre-existing cells.",
    explanationTamil: "1855-ல் ருடால்ப் விர்ச்சோ செல்கள் முன்பிருந்த செல்களிலிருந்தே பகுப்படைந்து உருவாகின்றன என்பதை விளக்கினார்."
  },
  {
    code: "BIO-068", subject: "Biology", topic: "Evolution", difficulty: "medium",
    questionText: "Which theory of origin of life states that life came to Earth from outer space in the form of spores?",
    questionTextTamil: "விண்வெளியிலிருந்து வித்துக்கள் (spores) மூலமாக பூமிக்கு உயிர் வந்தது எனக் கூறும் கோட்பாடு எது?",
    options: [
      { label: "A", text: "Panspermia theory (Cosmozoic theory)" }, { label: "B", text: "Biogenesis" }, { label: "C", text: "Abiogenesis (Spontaneous generation)" }, { label: "D", text: "Chemical evolution" }
    ],
    optionsTamil: [
      { label: "A", text: "பான்ஸ்பெர்மியா கோட்பாடு (Panspermia)" }, { label: "B", text: "உயிர்வழித் தோற்றக் கோட்பாடு" }, { label: "C", text: "தன்னிச்சை பிறப்புக் கோட்பாடு" }, { label: "D", text: "வேதிப் பரிணாமக் கோட்பாடு" }
    ],
    correctAnswer: "A",
    explanation: "Panspermia theory believes that units of life called spores were transferred to different planets including Earth.",
    explanationTamil: "பான்ஸ்பெர்மியா கோட்பாடு விண்வெளியிலிருந்து வித்துக்களாக பூமிக்கு உயிர் வந்தது எனக் கூறுகிறது."
  },

  // 69-80 Human Reproduction & Reproductive Health
  {
    code: "BIO-069", subject: "Biology", topic: "Human Reproduction", difficulty: "easy",
    questionText: "Spermatogenesis takes place in which specific tubules of the human testes?",
    questionTextTamil: "மனித விந்தகத்தில் விந்தணுவாக்கம் (Spermatogenesis) நடைபெறும் நுண்குழல்கள்:",
    options: [
      { label: "A", text: "Seminiferous tubules" }, { label: "B", text: "Epididymis" }, { label: "C", text: "Vas deferens" }, { label: "D", text: "Vasa efferentia" }
    ],
    optionsTamil: [
      { label: "A", text: "செமினிஃபெரஸ் நுண்குழல்கள்" }, { label: "B", text: "எபிடிடிமிஸ்" }, { label: "C", text: "விந்து நாளம் (Vas deferens)" }, { label: "D", text: "வாசா எஃபெரன்சியா" }
    ],
    correctAnswer: "A",
    explanation: "Spermatogenesis occurs inside the seminiferous tubules of the testes, lined by spermatogonia and Sertoli cells.",
    explanationTamil: "செமினிஃபெரஸ் நுண்குழல்களின் எபிதீலியத்தில் விந்தணுவாக்கம் நடைபெறுகிறது."
  },
  {
    code: "BIO-070", subject: "Biology", topic: "Human Reproduction", difficulty: "medium",
    questionText: "Leydig cells (interstitial cells) present in testicular intertubular spaces synthesize and secrete:",
    questionTextTamil: "செமினிஃபெரஸ் குழல்களுக்கு இடையே உள்ள லீடிக் செல்கள் (இடைசெல்கள்) எதனை உற்பத்தி செய்து சுரக்கின்றன?",
    options: [
      { label: "A", text: "Androgens (mainly Testosterone)" }, { label: "B", text: "Estrogen" }, { label: "C", text: "Inhibin" }, { label: "D", text: "Progesterone" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆண்ட்ரோஜன்கள் (டெஸ்டோஸ்டிரோன்)" }, { label: "B", text: "ஈஸ்ட்ரோஜன்" }, { label: "C", text: "இன்ஹிபின்" }, { label: "D", text: "புரோஜெஸ்டிரோன்" }
    ],
    correctAnswer: "A",
    explanation: "Leydig cells secrete male sex hormones called androgens (primarily testosterone) under LH stimulation.",
    explanationTamil: "லீடிக் செல்கள் LH ஹார்மோனின் தூண்டுதலால் டெஸ்டோஸ்டிரோன் எனும் ஆண் ஹார்மோனைச் சுரக்கின்றன."
  },
  {
    code: "BIO-071", subject: "Biology", topic: "Human Reproduction", difficulty: "easy",
    questionText: "The primary function of Sertoli cells located within the seminiferous tubules is to:",
    questionTextTamil: "செமினிஃபெரஸ் குழல்களுக்குள் உள்ள செர்டோலி செல்களின் (Sertoli cells) முக்கிய பணி என்ன?",
    options: [
      { label: "A", text: "Provide nourishment to developing germ cells" }, { label: "B", text: "Secrete testosterone" }, { label: "C", text: "Form sperm flagellum" }, { label: "D", text: "Digest dead sperms" }
    ],
    optionsTamil: [
      { label: "A", text: "வளரும் விந்தணுக்களுக்கு ஊட்டமளித்தல் (செவிலி செல்கள்)" }, { label: "B", text: "டெஸ்டோஸ்டிரோன் சுரத்தல்" }, { label: "C", text: "விந்தின் கசையிழையை உருவாக்குதல்" }, { label: "D", text: "இறந்த விந்துகளைச் செரித்தல்" }
    ],
    correctAnswer: "A",
    explanation: "Sertoli cells (nurse cells) provide nutrition and mechanical support to differentiating spermatogenic cells.",
    explanationTamil: "செர்டோலி செல்கள் செவிலி செல்களாகச் செயல்பட்டு வளரும் விந்தணுக்களுக்கு ஊட்டமளிக்கின்றன."
  },
  {
    code: "BIO-072", subject: "Biology", topic: "Human Reproduction", difficulty: "medium",
    questionText: "Ovulation in the human menstrual cycle is triggered by a sudden surge in which pituitary hormone?",
    questionTextTamil: "மனித மாதவிடாய் சுழற்சியில் அண்டம் விடுபடுதலை (Ovulation) தூண்டும் பிட்யூட்டரி ஹார்மோன் எது?",
    options: [
      { label: "A", text: "Luteinizing Hormone (LH surge)" }, { label: "B", text: "Progesterone" }, { label: "C", text: "Oxytocin" }, { label: "D", text: "Prolactin" }
    ],
    optionsTamil: [
      { label: "A", text: "லூட்டினைசிங் ஹார்மோன் (LH surge)" }, { label: "B", text: "புரோஜெஸ்டிரோன்" }, { label: "C", text: "ஆக்சிடாசின்" }, { label: "D", text: "புரோலாக்டின்" }
    ],
    correctAnswer: "A",
    explanation: "Rapid secretion of LH leading to its maximum level mid-cycle (~14th day), called LH surge, induces rupture of Graafian follicle and ovulation.",
    explanationTamil: "சுழற்சியின் 14-வது நாளில் ஏற்படும் LH ஹார்மோனின் உச்ச அதிகரிப்பால் (LH surge) கிராஃபியன் பாலிக்கிள் வெடித்து அண்டம் விடுபடுகிறது."
  },
  {
    code: "BIO-073", subject: "Biology", topic: "Human Reproduction", difficulty: "medium",
    questionText: "The remnant of the ruptured Graafian follicle after ovulation transforms into the yellow endocrine body called:",
    questionTextTamil: "அண்டம் விடுபட்ட பிறகு எஞ்சியுள்ள கிராஃபியன் பாலிக்கிள் எந்த மஞ்சள் நிற நாளமில்லா சுரப்பியாக மாறுகிறது?",
    options: [
      { label: "A", text: "Corpus luteum" }, { label: "B", text: "Corpus albicans" }, { label: "C", text: "Corpus callosum" }, { label: "D", text: "Zona pellucida" }
    ],
    optionsTamil: [
      { label: "A", text: "கார்ப்பஸ் லூட்டியம் (Corpus luteum)" }, { label: "B", text: "கார்ப்பஸ் அல்பிகன்ஸ்" }, { label: "C", text: "கார்ப்பஸ் கலோசம்" }, { label: "D", text: "சோனா பெலுசிடா" }
    ],
    correctAnswer: "A",
    explanation: "The ruptured follicle turns into the corpus luteum, which secretes large amounts of progesterone essential for maintaining the endometrium.",
    explanationTamil: "கார்ப்பஸ் லூட்டியம் அதிக அளவு புரோஜெஸ்டிரோன் ஹார்மோனைச் சுரந்து கருப்பையை கரு பதிவதற்கு தயார் செய்கிறது."
  },
  {
    code: "BIO-074", subject: "Biology", topic: "Human Reproduction", difficulty: "easy",
    questionText: "In human females, fertilization of the ovum typically occurs in which specific region of the Fallopian tube?",
    questionTextTamil: "பெண்ணின் அண்டக்குழாயில் (Fallopian tube) கருவுறுதல் பொதுவாக நடைபெறும் குறிப்பிட்ட பகுதி எது?",
    options: [
      { label: "A", text: "Ampulla" }, { label: "B", text: "Isthmus" }, { label: "C", text: "Infundibulum" }, { label: "D", text: "Fimbriae" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆம்புல்லா (Ampulla)" }, { label: "B", text: "இஸ்துமஸ் (Isthmus)" }, { label: "C", text: "இன்ஃபெண்டிபுலம்" }, { label: "D", text: "ஃபிம்பிரியே" }
    ],
    correctAnswer: "A",
    explanation: "Fertilization takes place at the ampullary region of the Fallopian (uterine) tube.",
    explanationTamil: "அண்டக்குழாயின் ஆம்புல்லா பகுதியில் கருவுறுதல் நிகழ்கிறது."
  },
  {
    code: "BIO-075", subject: "Biology", topic: "Human Reproduction", difficulty: "medium",
    questionText: "The acrosome of the mammalian sperm is derived from which cellular organelle during spermiogenesis?",
    questionTextTamil: "விந்தணுவின் தலைப்பகுதியில் உள்ள அக்ரோசோம் (Acrosome) எந்த செல் உறுப்பிலிருந்து உருவாகிறது?",
    options: [
      { label: "A", text: "Golgi apparatus" }, { label: "B", text: "Mitochondria" }, { label: "C", text: "Centriole" }, { label: "D", text: "Endoplasmic reticulum" }
    ],
    optionsTamil: [
      { label: "A", text: "கோல்கை உடலம் (Golgi apparatus)" }, { label: "B", text: "மைட்டோகாண்ட்ரியா" }, { label: "C", text: "சென்ட்ரியோல்" }, { label: "D", text: "எண்டோபிளாச வலை" }
    ],
    correctAnswer: "A",
    explanation: "The acrosome is a modified cap-like vesicle derived from the Golgi complex, containing hydrolytic enzymes like hyaluronidase.",
    explanationTamil: "அக்ரோசோம் கோல்கை உறுப்பிலிருந்து உருவாகி கருமுட்டையை துளைக்கும் நொதிகளைக் கொண்டுள்ளது."
  },
  {
    code: "BIO-076", subject: "Biology", topic: "Human Reproduction", difficulty: "hard",
    questionText: "Which hormone is produced in women only during pregnancy and is detected by home pregnancy test kits?",
    questionTextTamil: "கர்ப்ப காலத்தில் மட்டுமே பெண்களின் நஞ்சுக்கொடியால் சுரக்கப்படும் மற்றும் கர்ப்ப பரிசோதனையில் கண்டறியப்படும் ஹார்மோன் எது?",
    options: [
      { label: "A", text: "human Chorionic Gonadotropin (hCG)" }, { label: "B", text: "Estrogen" }, { label: "C", text: "Progesterone" }, { label: "D", text: "Prolactin" }
    ],
    optionsTamil: [
      { label: "A", text: "hCG (human Chorionic Gonadotropin)" }, { label: "B", text: "ஈஸ்ட்ரோஜன்" }, { label: "C", text: "புரோஜெஸ்டிரோன்" }, { label: "D", text: "புரோலாக்டின்" }
    ],
    correctAnswer: "A",
    explanation: "hCG, hPL, and relaxin are produced only during pregnancy. hCG excreted in urine is the basis of home pregnancy tests.",
    explanationTamil: "hCG ஹார்மோன் நஞ்சுக்கொடியால் சுரக்கப்பட்டு சிறுநீரில் வெளியேறுவதால் கர்ப்ப பரிசோதனையில் பயன்படுகிறது."
  },
  {
    code: "BIO-077", subject: "Biology", topic: "Human Reproduction", difficulty: "medium",
    questionText: "Colostrum, the yellowish fluid secreted by the mother during the initial days of lactation, is rich in which antibody?",
    questionTextTamil: "பிரசவத்திற்குப் பின் முதல் சில நாட்கள் சுரக்கும் சீம்பாலில் (Colostrum) அதிக அளவில் உள்ள ஆன்டிபாடி எது?",
    options: [
      { label: "A", text: "IgA" }, { label: "B", text: "IgG" }, { label: "C", text: "IgM" }, { label: "D", text: "IgE" }
    ],
    optionsTamil: [
      { label: "A", text: "IgA" }, { label: "B", text: "IgG" }, { label: "C", text: "IgM" }, { label: "D", text: "IgE" }
    ],
    correctAnswer: "A",
    explanation: "Colostrum contains abundant secretory IgA antibodies that provide passive immunity to the newborn infant.",
    explanationTamil: "சீம்பாலில் உள்ள IgA ஆன்டிபாடிகள் பிறந்த குழந்தைக்கு இயற்கையான மந்தநிலை நோய் எதிர்ப்புச் சக்தியைத் தருகின்றன."
  },
  {
    code: "BIO-078", subject: "Biology", topic: "Human Reproduction", difficulty: "medium",
    questionText: "Saheli, an oral non-steroidal contraceptive pill developed by CDRI Lucknow, is taken:",
    questionTextTamil: "லக்னோ சி.டி.ஆர்.ஐ உருவாக்கிய ஸ்டீராய்டு அல்லாத 'சஹேலி' கருத்தடை மாத்திரை உட்கொள்ளப்படும் முறை:",
    options: [
      { label: "A", text: "Once a week" }, { label: "B", text: "Daily" }, { label: "C", text: "Once a month" }, { label: "D", text: "Only after intercourse" }
    ],
    optionsTamil: [
      { label: "A", text: "வாரத்திற்கு ஒரு முறை (Once a week)" }, { label: "B", text: "தினமும்" }, { label: "C", text: "மாதத்திற்கு ஒரு முறை" }, { label: "D", text: "உடலுறவுக்குப் பின் மட்டும்" }
    ],
    correctAnswer: "A",
    explanation: "Saheli contains centchroman (ormeloxifene); it is a non-steroidal 'once-a-week' pill with very few side effects.",
    explanationTamil: "சஹேலி என்பது வாரத்திற்கு ஒரு முறை மட்டுமே உட்கொள்ளப்படும் பக்கவிளைவற்ற கருத்தடை மாத்திரையாகும்."
  },
  {
    code: "BIO-079", subject: "Biology", topic: "Human Reproduction", difficulty: "hard",
    questionText: "In Assisted Reproductive Technology (ART), ZIFT stands for:",
    questionTextTamil: "இனப்பெருக்க உதவி தொழில்நுட்பத்தில் (ART) ZIFT என்பதன் விரிவாக்கம்:",
    options: [
      { label: "A", text: "Zygote Intra-Fallopian Transfer" }, { label: "B", text: "Zygote Inter-Fallopian Transfer" }, { label: "C", text: "Zygote Implantation in Fallopian Tube" }, { label: "D", text: "Zygote In-vitro Fertilization Technique" }
    ],
    optionsTamil: [
      { label: "A", text: "சைகோட் இன்ட்ரா-ஃபலோபியன் டிரான்ஸ்ஃபர் (Zygote Intra-Fallopian Transfer)" }, { label: "B", text: "சைகோட் இன்டர் ஃபலோபியன் டிரான்ஸ்ஃபர்" }, { label: "C", text: "சைகோட் இம்ப்ளான்டேஷன் ஃபலோபியன் டியூப்" }, { label: "D", text: "சைகோட் இன்விட்ரோ நுட்பம்" }
    ],
    correctAnswer: "A",
    explanation: "ZIFT involves transferring a zygote or early embryo (up to 8 blastomeres) directly into the Fallopian tube.",
    explanationTamil: "ZIFT என்பது 8 கருக்கோள நிலைக்குட்பட்ட சைகோட்டை ஃபலோபியன் குழாயினுள் செலுத்தும் முறையாகும்."
  },
  {
    code: "BIO-080", subject: "Biology", topic: "Human Reproduction", difficulty: "easy",
    questionText: "Surgical sterilization procedure in human males involving cutting and tying of the sperm duct is called:",
    questionTextTamil: "ஆண்களில் விந்து நாளங்களை வெட்டி முடிச்சிடும் நிரந்தர கருத்தடை அறுவை சிகிச்சை:",
    options: [
      { label: "A", text: "Vasectomy" }, { label: "B", text: "Tubectomy" }, { label: "C", text: "Castration" }, { label: "D", text: "Hysterectomy" }
    ],
    optionsTamil: [
      { label: "A", text: "வாசக்டமி (Vasectomy)" }, { label: "B", text: "டியூபக்டமி (Tubectomy)" }, { label: "C", text: "காஸ்ட்ரேஷன்" }, { label: "D", text: "ஹிஸ்டிரக்டமி" }
    ],
    correctAnswer: "A",
    explanation: "Vasectomy involves cutting and ligating a small part of each vas deferens in males; tubectomy is done in females.",
    explanationTamil: "ஆண்களில் விந்து நாளத்தை வெட்டி முடிச்சிடுவது வாசக்டமி எனப்படும் (பெண்களில் டியூபக்டமி)."
  },

  // 81-95 Human Health & Diseases
  {
    code: "BIO-081", subject: "Biology", topic: "Human Health & Diseases", difficulty: "easy",
    questionText: "The Widal test is a diagnostic serological test used to confirm which bacterial disease?",
    questionTextTamil: "வைடால் சோதனை (Widal test) எந்த பாக்டீரிய நோயைக் கண்டறிய பயன்படுகிறது?",
    options: [
      { label: "A", text: "Typhoid fever" }, { label: "B", text: "Pneumonia" }, { label: "C", text: "Cholera" }, { label: "D", text: "Tuberculosis" }
    ],
    optionsTamil: [
      { label: "A", text: "டைபாய்டு காய்ச்சல் (Typhoid)" }, { label: "B", text: "நிமோனியா" }, { label: "C", text: "காலரா" }, { label: "D", text: "காசநோய்" }
    ],
    correctAnswer: "A",
    explanation: "Typhoid caused by Salmonella typhi is definitively confirmed by the Widal test (detecting anti-O and anti-H antibodies).",
    explanationTamil: "சால்மோனெல்லா டைபியால் ஏற்படும் டைபாய்டு காய்ச்சலை உறுதி செய்ய வைடால் சோதனை செய்யப்படுகிறது."
  },
  {
    code: "BIO-082", subject: "Biology", topic: "Human Health & Diseases", difficulty: "medium",
    questionText: "The malignant and fatal form of malaria is caused by which protozoan parasite?",
    questionTextTamil: "மனிதனில் மிகக் கொடிய மற்றும் உயிருக்கு ஆபத்தான வீரியமிக்க மலேரியாவை உண்டாக்கும் பிளாஸ்மோடிய இனம் எது?",
    options: [
      { label: "A", text: "Plasmodium falciparum" }, { label: "B", text: "Plasmodium vivax" }, { label: "C", text: "Plasmodium malariae" }, { label: "D", text: "Plasmodium ovale" }
    ],
    optionsTamil: [
      { label: "A", text: "பிளாஸ்மோடியம் ஃபால்சிபாரம் (Plasmodium falciparum)" }, { label: "B", text: "பிளாஸ்மோடியம் வைவாக்ஸ்" }, { label: "C", text: "பிளாஸ்மோடியம் மலேரியே" }, { label: "D", text: "பிளாஸ்மோடியம் ஓவேல்" }
    ],
    correctAnswer: "A",
    explanation: "Plasmodium falciparum causes malignant tertian (cerebral) malaria, which can be fatal.",
    explanationTamil: "பிளாஸ்மோடியம் ஃபால்சிபாரம் தீவிரமான மூளை மலேரியாவை உண்டாக்கி மரணத்தை விளைவிக்கும்."
  },
  {
    code: "BIO-083", subject: "Biology", topic: "Human Health & Diseases", difficulty: "medium",
    questionText: "The infectious stage of Plasmodium that enters the human body through the bite of an infected female Anopheles mosquito is:",
    questionTextTamil: "பெண் அனாபிலஸ் கொசு கடிக்கும்போது மனித உடலினுள் நுழையும் மலேரியா ஒட்டுண்ணியின் தொற்று நிலை:",
    options: [
      { label: "A", text: "Sporozoite" }, { label: "B", text: "Trophozoite" }, { label: "C", text: "Merozoite" }, { label: "D", text: "Gametocyte" }
    ],
    optionsTamil: [
      { label: "A", text: "ஸ்போரோசோய்ட் (Sporozoite)" }, { label: "B", text: "ட்ரோபோசோய்ட்" }, { label: "C", text: "மீரோசோய்ட்" }, { label: "D", text: "கேமீட்டோசைட்" }
    ],
    correctAnswer: "A",
    explanation: "Mosquito injects Plasmodium sporozoites with its saliva into human blood, which travel directly to liver cells.",
    explanationTamil: "கொசுவின் உமிழ்நீரிலிருந்து ஸ்போரோசோய்ட்டுகள் மனித இரத்தத்தில் நுழைந்து கல்லீரலை அடைகின்றன."
  },
  {
    code: "BIO-084", subject: "Biology", topic: "Human Health & Diseases", difficulty: "easy",
    questionText: "Elephantiasis (Filariasis) is caused by the filarial worm Wuchereria bancrofti, transmitted by the vector:",
    questionTextTamil: "உச்சரியேரியா பான்கிராஃப்டியால் ஏற்படும் யானைக்கால் நோய் எந்த கொசுவினால் பரப்பப்படுகிறது?",
    options: [
      { label: "A", text: "Culex mosquito" }, { label: "B", text: "Anopheles mosquito" }, { label: "C", text: "Aedes mosquito" }, { label: "D", text: "Tsetse fly" }
    ],
    optionsTamil: [
      { label: "A", text: "கியூலெக்ஸ் கொசு (Culex)" }, { label: "B", text: "அனாபிலஸ் கொசு" }, { label: "C", text: "ஏடிஸ் கொசு" }, { label: "D", text: "செட்சி ஈ" }
    ],
    correctAnswer: "A",
    explanation: "Filariasis is transmitted by female Culex mosquitoes; the worms block lymphatic vessels.",
    explanationTamil: "யானைக்கால் புழுவின் லார்வாக்கள் பெண் கியூலெக்ஸ் கொசுவினால் மனிதனுக்குப் பரவுகின்றன."
  },
  {
    code: "BIO-085", subject: "Biology", topic: "Human Health & Diseases", difficulty: "medium",
    questionText: "An antibody molecule has a 'Y' shape composed of four peptide chains represented as:",
    questionTextTamil: "ஓர் ஆன்டிபாடி மூலக்கூறானது 'Y' வடிவில் எத்தனை பாலிபெப்டைடு சங்கிலிகளைக் கொண்டுள்ளது?",
    options: [
      { label: "A", text: "H₂L₂ (Two heavy chains and two light chains)" }, { label: "B", text: "H₄L₂" }, { label: "C", text: "H₂L₄" }, { label: "D", text: "H₁L₁" }
    ],
    optionsTamil: [
      { label: "A", text: "H₂L₂ (இரண்டு கனச் சங்கிலிகள் மற்றும் இரண்டு இலகுச் சங்கிலிகள்)" }, { label: "B", text: "H₄L₂" }, { label: "C", text: "H₂L₄" }, { label: "D", text: "H₁L₁" }
    ],
    correctAnswer: "A",
    explanation: "Each antibody monomer consists of 2 identical heavy (H) chains and 2 identical light (L) chains connected by disulfide bonds (H₂L₂).",
    explanationTamil: "ஆன்டிபாடியில் இரு கனமான (H) மற்றும் இரு லேசான (L) பாலிபெப்டைட் சங்கிலிகள் டைசல்பைட் பிணைப்புகளால் இணைந்துள்ளன (H₂L₂)."
  },
  {
    code: "BIO-086", subject: "Biology", topic: "Human Health & Diseases", difficulty: "medium",
    questionText: "Which class of antibody is responsible for mediating allergic reactions and anaphylaxis?",
    questionTextTamil: "ஒவ்வாமை வினைகளில் (Allergic reactions) ஈடுபடும் ஆன்டிபாடி எது?",
    options: [
      { label: "A", text: "IgE" }, { label: "B", text: "IgA" }, { label: "C", text: "IgG" }, { label: "D", text: "IgM" }
    ],
    optionsTamil: [
      { label: "A", text: "IgE" }, { label: "B", text: "IgA" }, { label: "C", text: "IgG" }, { label: "D", text: "IgM" }
    ],
    correctAnswer: "A",
    explanation: "IgE antibodies bind to mast cells and basophils, triggering release of histamine and serotonin during allergic responses.",
    explanationTamil: "IgE ஆன்டிபாடிகள் மாஸ்ட் செல்களிலிருந்து ஹிஸ்டமைனை வெளிப்படுத்தி ஒவ்வாமையை ஏற்படுத்துகின்றன."
  },
  {
    code: "BIO-087", subject: "Biology", topic: "Human Health & Diseases", difficulty: "easy",
    questionText: "Which is the only antibody class capable of crossing the human placental barrier to protect the fetus?",
    questionTextTamil: "தாயிடமிருந்து நஞ்சுக்கொடியைத் தாண்டி கருவை அடையக்கூடிய ஒரே ஆன்டிபாடி எது?",
    options: [
      { label: "A", text: "IgG" }, { label: "B", text: "IgM" }, { label: "C", text: "IgA" }, { label: "D", text: "IgD" }
    ],
    optionsTamil: [
      { label: "A", text: "IgG" }, { label: "B", text: "IgM" }, { label: "C", text: "IgA" }, { label: "D", text: "IgD" }
    ],
    correctAnswer: "A",
    explanation: "IgG is the most abundant immunoglobulin (~80%) and the only antibody able to cross the placenta.",
    explanationTamil: "IgG மட்டுமே நஞ்சுக்கொடியைக் கடந்து கருவிற்கு இயற்கையான செயலற்ற நோய் எதிர்ப்புத் திறனை வழங்குகிறது."
  },
  {
    code: "BIO-088", subject: "Biology", topic: "Human Health & Diseases", difficulty: "hard",
    questionText: "HIV selectively infects and destroys which key cells of the human immune system?",
    questionTextTamil: "எய்ட்ஸ் நோயை உண்டாக்கும் HIV வைரஸ் மனிதனின் எந்த நோய் எதிர்ப்பு செல்களைத் தாக்கி அழிக்கிறது?",
    options: [
      { label: "A", text: "Helper T-lymphocytes (CD4+ T-cells)" }, { label: "B", text: "Cytotoxic T-cells (CD8+)" }, { label: "C", text: "B-lymphocytes" }, { label: "D", text: "Neutrophils" }
    ],
    optionsTamil: [
      { label: "A", text: "உதவி T-செல்கள் (T-helper / CD4+ செல்கள்)" }, { label: "B", text: "கொல்லும் T-செல்கள் (CD8+)" }, { label: "C", text: "B-செல்கள்" }, { label: "D", text: "நியூட்ரோபில்கள்" }
    ],
    correctAnswer: "A",
    explanation: "HIV uses CD4 receptors to enter and replicate inside helper T-lymphocytes (T_H cells), progressively depleting them.",
    explanationTamil: "HIV வைரஸ் CD4 ஏற்பிகள் கொண்ட உதவி T-செல்களை அழிப்பதால் நோய் எதிர்ப்பு சக்தி முற்றிலும் குறைகிறது."
  },
  {
    code: "BIO-089", subject: "Biology", topic: "Human Health & Diseases", difficulty: "medium",
    questionText: "The standard diagnostic test widely used as the primary screening tool for AIDS is:",
    questionTextTamil: "எய்ட்ஸ் நோயைக் கண்டறிய முதல்நிலை பரிசோதனையாக பரவலாக செய்யப்படும் சோதனை எது?",
    options: [
      { label: "A", text: "ELISA (Enzyme Linked Immunosorbent Assay)" }, { label: "B", text: "Western Blot" }, { label: "C", text: "Widal test" }, { label: "D", text: "Mantoux test" }
    ],
    optionsTamil: [
      { label: "A", text: "எலிசா சோதனை (ELISA)" }, { label: "B", text: "வெஸ்டர்ன் பிளாட்" }, { label: "C", text: "வைடால் சோதனை" }, { label: "D", text: "மான்டூ சோதனை" }
    ],
    correctAnswer: "A",
    explanation: "ELISA is the primary screening test for HIV antibodies, followed by Western Blot for confirmatory diagnosis.",
    explanationTamil: "எலிசா (ELISA) சோதனை எய்ட்ஸ் நோயைக் கண்டறியும் தொடக்கநிலை பரிசோதனையாகும்."
  },
  {
    code: "BIO-090", subject: "Biology", topic: "Human Health & Diseases", difficulty: "hard",
    questionText: "Normal cells show contact inhibition which inhibits their uncontrolled proliferation. In cancer cells, contact inhibition is:",
    questionTextTamil: "இயல்பான செல்களில் உள்ள தொடு உட்கட்டுப்பாடு (Contact inhibition) புற்றுநோய் செல்களில்:",
    options: [
      { label: "A", text: "Completely lost" }, { label: "B", text: "Highly increased" }, { label: "C", text: "Unchanged" }, { label: "D", text: "Reversible by radiation" }
    ],
    optionsTamil: [
      { label: "A", text: "முழுமையாக இழக்கப்படுகிறது" }, { label: "B", text: "அதிகரிக்கிறது" }, { label: "C", text: "மாற்றமடைவதில்லை" }, { label: "D", text: "கதிர்வீச்சால் மீட்டமைக்கப்படுகிறது" }
    ],
    correctAnswer: "A",
    explanation: "Cancer cells lose contact inhibition, causing them to continue dividing uncontrollably and pile up into masses called tumors.",
    explanationTamil: "புற்றுநோய் செல்கள் தொடு உட்கட்டுப்பாட்டை இழப்பதால் தொடர்ச்சியாக பிரிந்து கட்டிகளை (Tumors) உருவாக்குகின்றன."
  },
  {
    code: "BIO-091", subject: "Biology", topic: "Human Health & Diseases", difficulty: "medium",
    questionText: "The spread of cancerous cells from a primary tumor to distant parts of the body through blood or lymph is called:",
    questionTextTamil: "புற்றுநோய் செல்கள் இரத்தத்தின் வழியாக உடலின் பிற பகுதிகளுக்குப் பரவும் நிலை எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Metastasis" }, { label: "B", text: "Benign tumor" }, { label: "C", text: "Apoptosis" }, { label: "D", text: "Hyperplasia" }
    ],
    optionsTamil: [
      { label: "A", text: "மெட்டாஸ்டாசிஸ் (Metastasis)" }, { label: "B", text: "தீங்கற்ற கட்டி" }, { label: "C", text: "அபோப்டோசிஸ்" }, { label: "D", text: "ஹைப்பர்பிளாசியா" }
    ],
    correctAnswer: "A",
    explanation: "Metastasis is the most feared and lethal property of malignant neoplasms, spreading cancer cells to distant sites.",
    explanationTamil: "மெட்டாஸ்டாசிஸ் என்பது வீரியமிக்க கட்டிகளின் புற்றுநோய் செல்கள் உடலின் பிற பாகங்களுக்குப் பரவும் அபாயகரமான பண்பாகும்."
  },
  {
    code: "BIO-092", subject: "Biology", topic: "Human Health & Diseases", difficulty: "easy",
    questionText: "Morphine and heroin are powerful analgesics extracted from the latex of which plant?",
    questionTextTamil: "மார்ஃபின் மற்றும் ஹெராயின் போன்ற வலி நிவாரணி போதை மருந்துகள் எந்த தாவரத்தின் பாலில் இருந்து எடுக்கப்படுகின்றன?",
    options: [
      { label: "A", text: "Papaver somniferum (Opium poppy)" }, { label: "B", text: "Cannabis sativa" }, { label: "C", text: "Erythroxylum coca" }, { label: "D", text: "Atropa belladonna" }
    ],
    optionsTamil: [
      { label: "A", text: "பப்பாவர் சோம்னிபெரம் (கசகசா / ஓபியம் பாப்பி)" }, { label: "B", text: "கஞ்சா (Cannabis sativa)" }, { label: "C", text: "கோகோ தாவரம்" }, { label: "D", text: "அட்ரோபா பெல்லடோனா" }
    ],
    correctAnswer: "A",
    explanation: "Morphine is extracted from the dried latex of Papaver somniferum (opium poppy); diacetylmorphine is heroin (smack).",
    explanationTamil: "ஓபியம் பாப்பி தாவரத்தின் பாலிலிருந்து மார்ஃபின் மற்றும் ஹெராயின் பிரித்தெடுக்கப்படுகின்றன."
  },
  {
    code: "BIO-093", subject: "Biology", topic: "Human Health & Diseases", difficulty: "medium",
    questionText: "Cannabinoid receptors in the human body are principally located in the:",
    questionTextTamil: "மனித உடலில் கன்னாபினாய்டு ஏற்பிகள் (Cannabinoid receptors) முதன்மையாக எங்கு காணப்படுகின்றன?",
    options: [
      { label: "A", text: "Brain" }, { label: "B", text: "Heart" }, { label: "C", text: "Liver" }, { label: "D", text: "Kidneys" }
    ],
    optionsTamil: [
      { label: "A", text: "மூளை (Brain)" }, { label: "B", text: "இதயம்" }, { label: "C", text: "கல்லீரல்" }, { label: "D", text: "சிறுநீரகம்" }
    ],
    correctAnswer: "A",
    explanation: "Natural cannabinoids interact with cannabinoid receptors present principally in the brain, affecting the cardiovascular system.",
    explanationTamil: "கன்னாபினாய்டு ஏற்பிகள் முதன்மையாக மூளையில் அமைந்து நரம்பு சமிக்ஞைகளை பாதிக்கின்றன."
  },
  {
    code: "BIO-094", subject: "Biology", topic: "Human Health & Diseases", difficulty: "medium",
    questionText: "Cocaine, an alkaloid that interferes with the transport of dopamine and produces euphoria, is obtained from:",
    questionTextTamil: "டோபமைன் கடத்தலைத் தடுத்து கிளர்ச்சியைத் தூண்டும் கொகைன் எந்த தாவரத்திலிருந்து பெறப்படுகிறது?",
    options: [
      { label: "A", text: "Erythroxylum coca" }, { label: "B", text: "Datura stramonium" }, { label: "C", text: "Claviceps purpurea" }, { label: "D", text: "Papaver somniferum" }
    ],
    optionsTamil: [
      { label: "A", text: "எரித்ராக்சிலம் கோகோ (Erythroxylum coca)" }, { label: "B", text: "ஊமத்தை (Datura)" }, { label: "C", text: "கிளாவிசெப்ஸ் பர்பூரியா" }, { label: "D", text: "பாப்பி செடி" }
    ],
    correctAnswer: "A",
    explanation: "Cocaine is obtained from South American coca plant Erythroxylum coca and interferes with dopamine reuptake.",
    explanationTamil: "கொகைன் தென் அமெரிக்க தாவரமான எரித்ராக்சிலம் கோகோவிலிருந்து பெறப்படுகிறது."
  },
  {
    code: "BIO-095", subject: "Biology", topic: "Human Health & Diseases", difficulty: "easy",
    questionText: "Which of the following is a pair of viral diseases?",
    questionTextTamil: "கீழ்க்கண்டவற்றுள் வைரஸால் உண்டாகும் நோய் ஜோடி எது?",
    options: [
      { label: "A", text: "Common cold and AIDS" }, { label: "B", text: "Typhoid and Tuberculosis" }, { label: "C", text: "Malaria and Amoebiasis" }, { label: "D", text: "Ringworm and Ascariasis" }
    ],
    optionsTamil: [
      { label: "A", text: "சாதாரண சளி மற்றும் எய்ட்ஸ்" }, { label: "B", text: "டைபாய்டு மற்றும் காசநோய்" }, { label: "C", text: "மலேரியா மற்றும் அமீபியாசிஸ்" }, { label: "D", text: "படை மற்றும் உருளைப்புழு நோய்" }
    ],
    correctAnswer: "A",
    explanation: "Common cold is caused by Rhino viruses and AIDS is caused by Retrovirus (HIV); both are viral diseases.",
    explanationTamil: "சாதாரண சளி (ரைனோ வைரஸ்) மற்றும் எய்ட்ஸ் (HIV) இரண்டும் வைரஸ் நோய்களாகும்."
  },

  // 96-110 Ecology, Environment & Biodiversity
  {
    code: "BIO-096", subject: "Biology", topic: "Ecology & Environment", difficulty: "easy",
    questionText: "According to Lindeman's 10% law of energy transfer between trophic levels in an ecosystem:",
    questionTextTamil: "லிண்ட்மேனின் 10 சதவீத விதியின்படி ஒரு உணவு மட்டத்திலிருந்து அடுத்த மட்டத்திற்கு மாற்றப்படும் ஆற்றல் அளவு:",
    options: [
      { label: "A", text: "Only 10% of the energy is transferred to the next higher trophic level" }, { label: "B", text: "90% of energy is transferred" }, { label: "C", text: "10% of energy is lost as heat" }, { label: "D", text: "50% of energy is conserved" }
    ],
    optionsTamil: [
      { label: "A", text: "10% ஆற்றல் மட்டுமே அடுத்த ஊட்ட மட்டத்திற்கு மாற்றப்படுகிறது" }, { label: "B", text: "90% ஆற்றல் மாற்றப்படுகிறது" }, { label: "C", text: "10% ஆற்றல் மட்டுமே வெப்பமாக இழக்கப்படுகிறது" }, { label: "D", text: "50% ஆற்றல் சேமிக்கப்படுகிறது" }
    ],
    correctAnswer: "A",
    explanation: "Only about 10% of energy available at one trophic level is incorporated into the biomass of the next level; ~90% is dissipated as heat/metabolism.",
    explanationTamil: "ஒவ்வொரு ஊட்ட மட்டத்திலும் 10% ஆற்றல் மட்டுமே அடுத்த நிலைக்கு கடத்தப்படுகிறது, மீதி 90% இழக்கப்படுகிறது."
  },
  {
    code: "BIO-097", subject: "Biology", topic: "Ecology & Environment", difficulty: "easy",
    questionText: "In any terrestrial ecosystem, the ecological pyramid of energy is always:",
    questionTextTamil: "எந்த ஒரு சூழல்மண்டலத்திலும் ஆற்றல் பிரமிடு எப்போதும் எவ்வாறு இருக்கும்?",
    options: [
      { label: "A", text: "Always upright" }, { label: "B", text: "Always inverted" }, { label: "C", text: "Spindle-shaped" }, { label: "D", text: "Inverted or upright depending on season" }
    ],
    optionsTamil: [
      { label: "A", text: "எப்போதும் நேராக இருக்கும் (Upright)" }, { label: "B", text: "எப்போதும் தலைகீழாக இருக்கும்" }, { label: "C", text: "கதிர் வடிவம்" }, { label: "D", text: "பருவநிலைக்கு ஏற்ப மாறும்" }
    ],
    correctAnswer: "A",
    explanation: "Pyramid of energy is always upright because energy is lost as heat at each step and never flows backwards (second law of thermodynamics).",
    explanationTamil: "ஒவ்வொரு மட்டத்திலும் ஆற்றல் இழக்கப்படுவதால் ஆற்றல் பிரமிடு எப்போதுமே நேராக மட்டுமே இருக்கும்."
  },
  {
    code: "BIO-098", subject: "Biology", topic: "Ecology & Environment", difficulty: "medium",
    questionText: "The ecological pyramid of biomass in a deep aquatic (ocean) ecosystem is generally:",
    questionTextTamil: "ஆழ்கடல் சூழல்மண்டலத்தில் உயிர்த்திரள் பிரமிடு (Pyramid of biomass) பொதுவாக எவ்வாறு இருக்கும்?",
    options: [
      { label: "A", text: "Inverted" }, { label: "B", text: "Upright" }, { label: "C", text: "Horizontal" }, { label: "D", text: "Circular" }
    ],
    optionsTamil: [
      { label: "A", text: "தலைகீழாக இருக்கும் (Inverted)" }, { label: "B", text: "நேராக இருக்கும்" }, { label: "C", text: "கிடைமட்டமாக இருக்கும்" }, { label: "D", text: "வட்ட வடிவம்" }
    ],
    correctAnswer: "A",
    explanation: "Biomass of tiny phytoplankton producers is very small compared to the biomass of large predatory fishes, making the ocean biomass pyramid inverted.",
    explanationTamil: "மீன்களின் உயிர்த்திரளை விட உற்பத்தியாளர்களான மிதவை தாவரங்களின் உயிர்த்திரள் குறைவாக இருப்பதால் கடல் உயிர்த்திரள் பிரமிடு தலைகீழாக இருக்கும்."
  },
  {
    code: "BIO-099", subject: "Biology", topic: "Ecology & Environment", difficulty: "medium",
    questionText: "Primary ecological succession begins in an area where:",
    questionTextTamil: "முதல்நிலை சூழலியல் வழிமுறை வளர்ச்சி (Primary succession) எங்கு தொடங்குகிறது?",
    options: [
      { label: "A", text: "No living organisms ever existed before (e.g. bare rock or newly cooled lava)" }, { label: "B", text: "A forest was cleared by fire" }, { label: "C", text: "An agricultural field was abandoned" }, { label: "D", text: "A flooded riverbed dried up" }
    ],
    optionsTamil: [
      { label: "A", text: "முன்பு உயிரினங்களே இல்லாத பகுதியில் (வெற்றுப் பாறை அல்லது புதிய எரிமலைக் குழம்பு)" }, { label: "B", text: "தீயினால் அழிக்கப்பட்ட காட்டில்" }, { label: "C", text: "கைவிடப்பட்ட விவசாய நிலத்தில்" }, { label: "D", text: "வெள்ளத்தால் மூழ்கிய ஆற்றுப்படுகையில்" }
    ],
    correctAnswer: "A",
    explanation: "Primary succession starts in barren habitats lacking soil (bare rock, newly cooled lava, sand dunes); secondary succession occurs where vegetation was destroyed.",
    explanationTamil: "மண் கூட இல்லாத வெற்று பாறை அல்லது எரிமலைக் குழம்பில் முதல்நிலை வழிமுறை வளர்ச்சி தொடங்குகிறது."
  },
  {
    code: "BIO-100", subject: "Biology", topic: "Ecology & Environment", difficulty: "hard",
    questionText: "Pioneer species that initiate primary ecological succession on bare dry rocks (Xerarch succession) are:",
    questionTextTamil: "வெற்று வறண்ட பாறைகளில் (Xerarch) வழிமுறை வளர்ச்சியைத் தொடங்கும் முன்னோடி உயிரினங்கள் (Pioneers):",
    options: [
      { label: "A", text: "Lichens" }, { label: "B", text: "Mosses" }, { label: "C", text: "Grasses" }, { label: "D", text: "Shrubs" }
    ],
    optionsTamil: [
      { label: "A", text: "லைக்கன்கள் (Lichens)" }, { label: "B", text: "பாசிகள் (Mosses)" }, { label: "C", text: "புற்கள்" }, { label: "D", text: "புதர்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Crustose lichens secrete organic acids that weather rocks into soil, paving the way for mosses and higher plants.",
    explanationTamil: "பாறைகளை அரித்து மண்ணாக மாற்றும் அமிலங்களைச் சுரக்கும் லைக்கன்களே பாறை வழிமுறை வளர்ச்சியின் முன்னோடி உயிரினங்கள்."
  },
  {
    code: "BIO-101", subject: "Biology", topic: "Ecology & Environment", difficulty: "medium",
    questionText: "The interactive relationship between cattle egrets and grazing cattle is an example of:",
    questionTextTamil: "மேயும் மாடுகளுக்கும் மாடுகளின் அருகில் திரியும் உண்ணிக்கொக்குகளுக்கும் இடையேயான இடைவினை எதற்கு உதாரணம்?",
    options: [
      { label: "A", text: "Commensalism" }, { label: "B", text: "Mutualism" }, { label: "C", text: "Parasitism" }, { label: "D", text: "Amensalism" }
    ],
    optionsTamil: [
      { label: "A", text: "கமென்சலிசம் - உடனுண்ணும் நிலை (Commensalism)" }, { label: "B", text: "மியூச்சுவலிசம் (Mutualism)" }, { label: "C", text: "ஒட்டுண்ணி வாழ்க்கை" }, { label: "D", text: "அமென்சலிசம்" }
    ],
    correctAnswer: "A",
    explanation: "In commensalism, one species benefits (+), and the other is unaffected (0). Egret benefits by easily finding flushed insects; cattle are neither helped nor harmed.",
    explanationTamil: "கொக்கு உணவைப் பெற்று பயனடைகிறது (+), மாடுகளுக்கு எவ்வித நன்மையும் தீமையும் இல்லை (0) - இது கமென்சலிசம் ஆகும்."
  },
  {
    code: "BIO-102", subject: "Biology", topic: "Ecology & Environment", difficulty: "medium",
    questionText: "Lichens represent an intimate mutualistic relationship between:",
    questionTextTamil: "லைக்கன்கள் (Lichens) எந்த இரு உயிரினங்களுக்கு இடையே உள்ள கூட்டுயிர் வாழ்க்கையைக் குறிக்கின்றன?",
    options: [
      { label: "A", text: "An alga and a fungus" }, { label: "B", text: "A fungus and roots of higher plants" }, { label: "C", text: "A bacterium and an alga" }, { label: "D", text: "A virus and a bacterium" }
    ],
    optionsTamil: [
      { label: "A", text: "பாசி மற்றும் பூஞ்சை" }, { label: "B", text: "பூஞ்சை மற்றும் உயர் தாவர வேர்கள்" }, { label: "C", text: "பாக்டீரியா மற்றும் பாசி" }, { label: "D", text: "வைரஸ் மற்றும் பாக்டீரியா" }
    ],
    correctAnswer: "A",
    explanation: "Lichens are a mutualistic association between a photosynthetic partner (alga/phycobiont) and a heterotrophic partner (fungus/mycobiont).",
    explanationTamil: "லைக்கன் என்பது ஒளிச்சேர்க்கை செய்யும் பாசி மற்றும் ஊட்டமளிக்கும் பூஞ்சையின் நெருங்கிய கூட்டு வாழ்க்கை ஆகும்."
  },
  {
    code: "BIO-103", subject: "Biology", topic: "Ecology & Environment", difficulty: "hard",
    questionText: "Gause's Competitive Exclusion Principle states that:",
    questionTextTamil: "காஸேயின் போட்டி விலக்கல் விதி (Competitive Exclusion Principle) கூறுவது என்ன?",
    options: [
      { label: "A", text: "Two closely related species competing for the same limiting resources cannot coexist indefinitely" }, { label: "B", text: "Larger organisms always outcompete smaller organisms" }, { label: "C", text: "Species always share resources equally" }, { label: "D", text: "Predators eliminate all prey over time" }
    ],
    optionsTamil: [
      { label: "A", text: "ஒரே வரையறுக்கப்பட்ட வளங்களுக்காக போட்டியிடும் இரு நெருங்கிய இனங்கள் ஒன்றாக நீண்ட காலம் வாழ முடியாது" }, { label: "B", text: "பெரிய உயிரினங்கள் சிறியவற்றை விரட்டிவிடும்" }, { label: "C", text: "இனங்கள் வளங்களை எப்போதும் சமமாகப் பகிர்ந்து கொள்ளும்" }, { label: "D", text: "வேட்டையாடுபவை இரையை முற்றிலும் அழிக்கும்" }
    ],
    correctAnswer: "A",
    explanation: "Two species competing for identical limiting resources cannot stably coexist; the competitively superior species will eliminate the inferior one.",
    explanationTamil: "ஒரே வளத்திற்காகப் போட்டியிடும் இரு இனங்களில் வலிமையானது பலவீனமான இனத்தை முற்றிலுமாக வெளியேற்றும்."
  },
  {
    code: "BIO-104", subject: "Biology", topic: "Ecology & Environment", difficulty: "medium",
    questionText: "The 'Evil Quartet' is a sobriquet coined by ecologists to describe four major causes of:",
    questionTextTamil: "சூழலியலாளர்கள் 'தீய நால்வர்' (Evil Quartet) என்ற சொல்லை எதன் நான்கு முக்கிய காரணங்களைக் குறிக்கப் பயன்படுத்தினர்?",
    options: [
      { label: "A", text: "Biodiversity loss and extinction" }, { label: "B", text: "Ozone layer depletion" }, { label: "C", text: "Global warming" }, { label: "D", text: "Water pollution" }
    ],
    optionsTamil: [
      { label: "A", text: "பல்லுயிர் இழப்பு மற்றும் இன அழிவு" }, { label: "B", text: "ஓசோன் அடுக்கு சிதைவு" }, { label: "C", text: "புவி வெப்பமயமாதல்" }, { label: "D", text: "நீர் மாசுபாடு" }
    ],
    correctAnswer: "A",
    explanation: "The 'Evil Quartet' causes of biodiversity loss: Habitat loss/fragmentation, Over-exploitation, Alien species invasions, and Co-extinctions.",
    explanationTamil: "வாழிட இழப்பு, அதிகப்படியான சுரண்டல், ஆக்கிரமிப்பு இனங்கள், உடன்-அழிவு ஆகிய நான்கும் பல்லுயிர் இழப்பிற்கான 'தீய நால்வர்' காரணங்கள் ஆகும்."
  },
  {
    code: "BIO-105", subject: "Biology", topic: "Ecology & Environment", difficulty: "easy",
    questionText: "Which of the following regions in India is recognized as a global biodiversity hotspot?",
    questionTextTamil: "இந்தியாவில் உள்ள உலகளாவிய பல்லுயிர் பெருக்க வெப்ப மையம் (Biodiversity Hotspot) எது?",
    options: [
      { label: "A", text: "Western Ghats" }, { label: "B", text: "Thar Desert" }, { label: "C", text: "Gangetic Plain" }, { label: "D", text: "Deccan Plateau" }
    ],
    optionsTamil: [
      { label: "A", text: "மேற்குத் தொடர்ச்சி மலை (Western Ghats)" }, { label: "B", text: "தார் பாலைவனம்" }, { label: "C", text: "கங்கை சமவெளி" }, { label: "D", text: "தக்காண பீடபூமி" }
    ],
    correctAnswer: "A",
    explanation: "India has 4 major biodiversity hotspots: Western Ghats & Sri Lanka, Indo-Burma, Himalayas, and Sundaland.",
    explanationTamil: "மேற்குத் தொடர்ச்சி மலை மற்றும் இமயமலை இந்தியாவின் முக்கிய பல்லுயிர் வெப்ப மண்டலங்களாகும்."
  },
  {
    code: "BIO-106", subject: "Biology", topic: "Ecology & Environment", difficulty: "medium",
    questionText: "An example of ex-situ (off-site) biodiversity conservation is:",
    questionTextTamil: "வாழிடத்திற்கு வெளியே (Ex-situ) உயிரினங்களைப் பாதுகாக்கும் முறைக்கு ஓர் எடுத்துக்காட்டு:",
    options: [
      { label: "A", text: "Botanical gardens and Zoological parks" }, { label: "B", text: "National Parks" }, { label: "C", text: "Biosphere Reserves" }, { label: "D", text: "Sanctuaries" }
    ],
    optionsTamil: [
      { label: "A", text: "தாவரவியல் பூங்காக்கள் மற்றும் உயிரியல் பூங்காக்கள்" }, { label: "B", text: "தேசியப் பூங்காக்கள்" }, { label: "C", text: "உயிர்க்கோளக் காப்பகங்கள்" }, { label: "D", text: "வனவிலங்கு சரணாலயங்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Ex-situ conservation preserves endangered species outside natural habitats in botanical gardens, zoos, and cryopreservation banks.",
    explanationTamil: "இயற்கை வாழிடத்திற்கு வெளியில் தாவரவியல் மற்றும் விலங்கியல் பூங்காக்களில் பாதுகாப்பது Ex-situ முறையாகும்."
  },
  {
    code: "BIO-107", subject: "Biology", topic: "Ecology & Environment", difficulty: "medium",
    questionText: "Biomagnification of non-biodegradable toxic substances like DDT in an aquatic food chain is highest in:",
    questionTextTamil: "கடல் உணவுச் சங்கிலியில் DDT போன்ற நச்சுப் பொருட்களின் உயிரி உருப்பெருக்கம் (Biomagnification) யாருக்கு அதிகபட்சமாக இருக்கும்?",
    options: [
      { label: "A", text: "Fish-eating birds (Top carnivores)" }, { label: "B", text: "Large fish" }, { label: "C", text: "Zooplankton" }, { label: "D", text: "Phytoplankton" }
    ],
    optionsTamil: [
      { label: "A", text: "மீன் உண்ணும் பறவைகள் (உச்ச வேட்டையாடிகள்)" }, { label: "B", text: "பெரிய மீன்கள்" }, { label: "C", text: "விலங்கு மிதவை உயிரிகள்" }, { label: "D", text: "தாவர மிதவை உயிரிகள்" }
    ],
    correctAnswer: "A",
    explanation: "DDT concentration magnifies at successive trophic levels reaching peak concentration in fish-eating top predatory birds (e.g., 25 ppm in birds vs 0.003 ppb in water).",
    explanationTamil: "உணவுச் சங்கிலியின் உச்சத்தில் உள்ள மீன் உண்ணும் பறவைகளின் உடலிலேயே DDT நச்சு அதிகபட்ச செறிவை எட்டுகிறது."
  },
  {
    code: "BIO-108", subject: "Biology", topic: "Ecology & Environment", difficulty: "easy",
    questionText: "The 'good ozone' that protects Earth from harmful ultraviolet-B (UV-B) radiation is located in the:",
    questionTextTamil: "தீங்கு விளைவிக்கும் புறஊதாக் கதிர்களைத் தடுத்து பூமியைப் பாதுகாக்கும் 'நல்ல ஓசோன்' வளிமண்டலத்தின் எந்த அடுக்கில் உள்ளது?",
    options: [
      { label: "A", text: "Stratosphere" }, { label: "B", text: "Troposphere" }, { label: "C", text: "Mesosphere" }, { label: "D", text: "Thermosphere" }
    ],
    optionsTamil: [
      { label: "A", text: "ஸ்ட்ரேட்டோஸ்பியர் (Stratosphere)" }, { label: "B", text: "ட்ரோபோஸ்பியர்" }, { label: "C", text: "மீசோஸ்பியர்" }, { label: "D", text: "தெர்மோஸ்பியர்" }
    ],
    correctAnswer: "A",
    explanation: "Stratospheric ozone is 'good' because it absorbs deadly UV-B radiation. Tropospheric ozone is a harmful pollutant.",
    explanationTamil: "ஸ்ட்ரேட்டோஸ்பியர் அடுக்கில் உள்ள ஓசோன் புறஊதாக் கதிர்களை உறிஞ்சி உயிர்களைப் பாதுகாக்கிறது."
  },
  {
    code: "BIO-109", subject: "Biology", topic: "Ecology & Environment", difficulty: "medium",
    questionText: "The Montreal Protocol signed in 1987 became effective in 1989 to control the emission of:",
    questionTextTamil: "1987-ல் கையெழுத்திடப்பட்டு 1989-ல் அமலுக்கு வந்த மாண்ட்ரீல் ஒப்பந்தம் எதன் உமிழ்வைக் கட்டுப்படுத்த உருவாக்கப்பட்டது?",
    options: [
      { label: "A", text: "Ozone depleting substances (CFCs)" }, { label: "B", text: "Greenhouse gases (CO₂)" }, { label: "C", text: "Hazardous radioactive wastes" }, { label: "D", text: "Heavy metals into water bodies" }
    ],
    optionsTamil: [
      { label: "A", text: "ஓசோனைச் சிதைக்கும் பொருட்கள் - CFC (குளோரோஃபுளோரோகார்பன்)" }, { label: "B", text: "பசுமை இல்ல வாயுக்கள் (CO₂)" }, { label: "C", text: "கதிரியக்கக் கழிவுகள்" }, { label: "D", text: "கன உலோகங்கள்" }
    ],
    correctAnswer: "A",
    explanation: "The Montreal Protocol was enacted to protect the stratospheric ozone layer by phasing out the production of ozone-depleting substances like CFCs.",
    explanationTamil: "ஓசோன் அடுக்கைப் பாதுகாக்க CFC போன்ற ஓசோன் சிதைவுப் பொருட்களைத் தடை செய்ய மாண்ட்ரீல் ஒப்பந்தம் இயற்றப்பட்டது."
  },
  {
    code: "BIO-110", subject: "Biology", topic: "Ecology & Environment", difficulty: "hard",
    questionText: "According to Robert May's global estimate, the total number of species living on Earth is approximately:",
    questionTextTamil: "ராபர்ட் மேயின் (Robert May) உலகளாவிய அறிவியல் மதிப்பீட்டின்படி பூமியில் உள்ள மொத்த உயிரினங்களின் எண்ணிக்கை தோராயமாக:",
    options: [
      { label: "A", text: "7 million" }, { label: "B", text: "1.5 million" }, { label: "C", text: "20 to 50 million" }, { label: "D", text: "100 million" }
    ],
    optionsTamil: [
      { label: "A", text: "70 லட்சம் (7 மில்லியன்)" }, { label: "B", text: "15 லட்சம் (1.5 மில்லியன்)" }, { label: "C", text: "2 முதல் 5 கோடி" }, { label: "D", text: "10 கோடி" }
    ],
    correctAnswer: "A",
    explanation: "Robert May placed the global species diversity at a scientifically sound estimate of approximately 7 million species (only ~22% are currently catalogued).",
    explanationTamil: "ராபர்ட் மேயின் அறிவியல் மதிப்பீட்டின்படி பூமியில் சுமார் 70 லட்சம் (7 மில்லியன்) உயிரினங்கள் வாழ்கின்றன."
  }
];
