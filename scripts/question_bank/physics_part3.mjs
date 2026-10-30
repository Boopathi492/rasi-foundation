// scripts/question_bank/physics_part3.mjs
// Questions PHY-151 to PHY-215: Atomic Physics, Nuclear Physics, Semiconductors, Mechanics

export const physicsPart3 = [
  // 151-170 Atomic Physics
  {
    code: "PHY-151", subject: "Physics", topic: "Atomic Physics", difficulty: "easy",
    questionText: "According to Bohr's postulate, angular momentum L of an electron in a stable orbit is quantized as:",
    questionTextTamil: "போரின் எடுகோளின்படி நிலையான சுற்றுப்பாதையில் எலக்ட்ரானின் கோண உந்தம் L எதற்கு சமம்?",
    options: [
      { label: "A", text: "n h / (2π)" }, { label: "B", text: "n h / π" }, { label: "C", text: "2π / (n h)" }, { label: "D", text: "n² h / (2π)" }
    ],
    optionsTamil: [
      { label: "A", text: "n h / (2π)" }, { label: "B", text: "n h / π" }, { label: "C", text: "2π / (n h)" }, { label: "D", text: "n² h / (2π)" }
    ],
    correctAnswer: "A",
    explanation: "Bohr's quantization condition: L = m v r = n h / (2π) where n = 1, 2, 3...",
    explanationTamil: "போரின் குவாண்டமாக்கல் நிபந்தனை: கோண உந்தம் L = m v r = n h / (2π) ஆகும்."
  },
  {
    code: "PHY-152", subject: "Physics", topic: "Atomic Physics", difficulty: "medium",
    questionText: "The radius r_n of nth Bohr orbit of hydrogen atom is proportional to principal quantum number n as:",
    questionTextTamil: "ஹைட்ரஜன் அணுவின் n-வது போர் சுற்றுப்பாதையின் ஆரம் r_n எதற்கு விகிதசமத்தில் இருக்கும்?",
    options: [
      { label: "A", text: "n²" }, { label: "B", text: "n" }, { label: "C", text: "1/n" }, { label: "D", text: "1/n²" }
    ],
    optionsTamil: [
      { label: "A", text: "n²" }, { label: "B", text: "n" }, { label: "C", text: "1/n" }, { label: "D", text: "1/n²" }
    ],
    correctAnswer: "A",
    explanation: "Radius r_n = 0.529 Å * n² / Z. For hydrogen (Z=1), r_n ∝ n².",
    explanationTamil: "போர் சுற்றுப்பாதை ஆரம் r_n = 0.529 Å × n² எனவே r_n ∝ n²."
  },
  {
    code: "PHY-153", subject: "Physics", topic: "Atomic Physics", difficulty: "easy",
    questionText: "Radius of the first orbit (Bohr radius a₀) of hydrogen atom is approximately:",
    questionTextTamil: "ஹைட்ரஜன் அணுவின் முதல் சுற்றுப்பாதை ஆரம் (போர் ஆரம் a₀) தோராயமாக:",
    options: [
      { label: "A", text: "0.529 Å (0.053 nm)" }, { label: "B", text: "1.058 Å" }, { label: "C", text: "0.265 Å" }, { label: "D", text: "5.29 Å" }
    ],
    optionsTamil: [
      { label: "A", text: "0.529 Å (0.053 nm)" }, { label: "B", text: "1.058 Å" }, { label: "C", text: "0.265 Å" }, { label: "D", text: "5.29 Å" }
    ],
    correctAnswer: "A",
    explanation: "Bohr radius a₀ = ε₀ h² / (π m e²) ≈ 0.529 Å = 0.53 × 10⁻¹⁰ m.",
    explanationTamil: "ஹைட்ரஜனின் முதல் போர் ஆரம் a₀ ≈ 0.529 Å ஆகும்."
  },
  {
    code: "PHY-154", subject: "Physics", topic: "Atomic Physics", difficulty: "medium",
    questionText: "Total energy of an electron in the nth orbit of hydrogen atom is given by:",
    questionTextTamil: "ஹைட்ரஜன் அணுவின் n-வது சுற்றுப்பாதையில் உள்ள எலக்ட்ரானின் மொத்த ஆற்றல்:",
    options: [
      { label: "A", text: "- 13.6 / n² eV" }, { label: "B", text: "+ 13.6 / n² eV" }, { label: "C", text: "- 13.6 * n² eV" }, { label: "D", text: "- 13.6 / n eV" }
    ],
    optionsTamil: [
      { label: "A", text: "- 13.6 / n² eV" }, { label: "B", text: "+ 13.6 / n² eV" }, { label: "C", text: "- 13.6 * n² eV" }, { label: "D", text: "- 13.6 / n eV" }
    ],
    correctAnswer: "A",
    explanation: "E_n = - 13.6 / n² eV. Negative sign indicates bound state.",
    explanationTamil: "மொத்த ஆற்றல் E_n = - 13.6 / n² eV. எதிர்க்குறி பிணைப்பு நிலையைக் குறிக்கிறது."
  },
  {
    code: "PHY-155", subject: "Physics", topic: "Atomic Physics", difficulty: "easy",
    questionText: "The ground state ionization energy of hydrogen atom is:",
    questionTextTamil: "ஹைட்ரஜன் அணுவின் அடிநிலை அயனியாக்கும் ஆற்றல் யாது?",
    options: [
      { label: "A", text: "13.6 eV" }, { label: "B", text: "3.4 eV" }, { label: "C", text: "1.51 eV" }, { label: "D", text: "0 eV" }
    ],
    optionsTamil: [
      { label: "A", text: "13.6 eV" }, { label: "B", text: "3.4 eV" }, { label: "C", text: "1.51 eV" }, { label: "D", text: "0 eV" }
    ],
    correctAnswer: "A",
    explanation: "Ionization energy = E_∞ - E₁ = 0 - (-13.6 eV) = +13.6 eV.",
    explanationTamil: "அடிநிலையிலுள்ள எலக்ட்ரானை வெளியேற்றத் தேவையான அயனியாக்கும் ஆற்றல் 13.6 eV."
  },
  {
    code: "PHY-156", subject: "Physics", topic: "Atomic Physics", difficulty: "easy",
    questionText: "Which spectral series of hydrogen atom lies in the visible region?",
    questionTextTamil: "ஹைட்ரஜன் நிறமாலையில் கண்ணுறு ஒளிப் பகுதியில் அமையும் வரிசை எது?",
    options: [
      { label: "A", text: "Balmer series" }, { label: "B", text: "Lyman series" }, { label: "C", text: "Paschen series" }, { label: "D", text: "Pfund series" }
    ],
    optionsTamil: [
      { label: "A", text: "பால்மர் வரிசை (Balmer series)" }, { label: "B", text: "லைமன் வரிசை" }, { label: "C", text: "பாஷன் வரிசை" }, { label: "D", text: "ஃபண்ட் வரிசை" }
    ],
    correctAnswer: "A",
    explanation: "Balmer series transitions end at n=2 and lie in visible region. Lyman is in UV; Paschen, Brackett, Pfund are in IR.",
    explanationTamil: "பால்மர் வரிசை கண்ணுறு பகுதியில் அமைகிறது (லைமன் புற ஊதாவிலும், பாஷன் அகச்சிவப்பிலும் அமையும்)."
  },
  {
    code: "PHY-157", subject: "Physics", topic: "Atomic Physics", difficulty: "easy",
    questionText: "Lyman series of hydrogen spectrum lies in which electromagnetic region?",
    questionTextTamil: "ஹைட்ரஜன் நிறமாலையின் லைமன் வரிசை எந்த பகுதியில் அமைகிறது?",
    options: [
      { label: "A", text: "Ultraviolet (UV) region" }, { label: "B", text: "Visible region" }, { label: "C", text: "Infrared region" }, { label: "D", text: "X-ray region" }
    ],
    optionsTamil: [
      { label: "A", text: "புற ஊதாப் பகுதி (UV)" }, { label: "B", text: "கண்ணுறு பகுதி" }, { label: "C", text: "அகச்சிவப்பு பகுதி" }, { label: "D", text: "எக்ஸ் கதிர் பகுதி" }
    ],
    correctAnswer: "A",
    explanation: "Transitions to n=1 produce high-energy photons in the ultraviolet region.",
    explanationTamil: "n=1 நிலைக்குத் தாவும் போது வெளிப்படும் லைமன் வரிசை புற ஊதாப் பகுதியில் அமைகிறது."
  },
  {
    code: "PHY-158", subject: "Physics", topic: "Atomic Physics", difficulty: "medium",
    questionText: "Rydberg constant R has the SI unit:",
    questionTextTamil: "ரிட்பெர்க் மாறிலி R-ன் SI அலகு யாது?",
    options: [
      { label: "A", text: "m⁻¹" }, { label: "B", text: "m" }, { label: "C", text: "s⁻¹" }, { label: "D", text: "J⁻¹" }
    ],
    optionsTamil: [
      { label: "A", text: "m⁻¹ (மீட்டர்⁻¹)" }, { label: "B", text: "m" }, { label: "C", text: "s⁻¹" }, { label: "D", text: "J⁻¹" }
    ],
    correctAnswer: "A",
    explanation: "Wave number 1/λ = R [1/n₁² - 1/n₂²], so R has unit m⁻¹ (R ≈ 1.097 × 10⁷ m⁻¹).",
    explanationTamil: "அலை எண் 1/λ = R [1/n₁² - 1/n₂²] என்பதால் R-ன் அலகு m⁻¹ ஆகும்."
  },
  {
    code: "PHY-159", subject: "Physics", topic: "Atomic Physics", difficulty: "medium",
    questionText: "Characteristic X-rays are emitted when:",
    questionTextTamil: "சிறப்பியல்பு எக்ஸ் கதிர்கள் எப்போது உமிழப்படுகின்றன?",
    options: [
      { label: "A", text: "An electron from outer shell transitions into an inner shell vacancy in target atom" },
      { label: "B", text: "Fast electrons decelerate near nucleus (Bremsstrahlung)" },
      { label: "C", text: "Protons decay inside nucleus" },
      { label: "D", text: "Thermal electrons boil off filament" }
    ],
    optionsTamil: [
      { label: "A", text: "இலக்கு அணுவின் உட்புற கூட்டில் எற்பட்ட வெற்றிடத்திற்கு வெளிக்கூட்டிலிருந்து எலக்ட்ரான் தாவும் போது" },
      { label: "B", text: "அணுக்கருவின் அருகே எலக்ட்ரான் வேகத்தணிப்பு அடையும் போது" },
      { label: "C", text: "அணுக்கருவில் புரோட்டான் சிதையும் போது" },
      { label: "D", text: "வெப்பத்தால் எலக்ட்ரான் உமிழப்படும் போது" }
    ],
    correctAnswer: "A",
    explanation: "Inner shell vacancy created by collision is filled by an outer electron, releasing characteristic X-ray photon.",
    explanationTamil: "உட்கூட்டு வெற்றிடத்தை நிரப்ப வெளிக்கூட்டு எலக்ட்ரான் தாவும்போது சிறப்பியல்பு எக்ஸ்-கதிர்கள் உருவாகின்றன."
  },
  {
    code: "PHY-160", subject: "Physics", topic: "Atomic Physics", difficulty: "medium",
    questionText: "Moseley's law relates the frequency ν of characteristic X-rays to atomic number Z as:",
    questionTextTamil: "மோஸ்லே விதி சிறப்பியல்பு எக்ஸ்-கதிர் அதிர்வெண் ν-ஐ அணு எண் Z உடன் எவ்வாறு தொடர்புபடுத்துகிறது?",
    options: [
      { label: "A", text: "√ν = a (Z - b)" }, { label: "B", text: "ν = a (Z - b)²" }, { label: "C", text: "ν² = a (Z - b)" }, { label: "D", text: "√ν = a Z²" }
    ],
    optionsTamil: [
      { label: "A", text: "√ν = a (Z - b)" }, { label: "B", text: "ν = a (Z - b)²" }, { label: "C", text: "ν² = a (Z - b)" }, { label: "D", text: "√ν = a Z²" }
    ],
    correctAnswer: "A",
    explanation: "Moseley's law √ν = a(Z - b) established atomic number Z as the true fundamental property of elements.",
    explanationTamil: "மோஸ்லே விதி √ν = a (Z - b) அணு எண் Z-ஐ தனிமங்களின் அடிப்படைப் பண்பாக நிறுவியது."
  },
  {
    code: "PHY-161", subject: "Physics", topic: "Atomic Physics", difficulty: "easy",
    questionText: "The cutoff (minimum) wavelength λ_min of continuous X-rays emitted from an X-ray tube operated at voltage V is:",
    questionTextTamil: "V மின்னழுத்தத்தில் இயங்கும் எக்ஸ் கதிர் குழாயிலிருந்து வெளிவரும் தொடர் எக்ஸ் கதிர்களின் குறைந்தபட்ச அலைநீளம் λ_min:",
    options: [
      { label: "A", text: "λ_min = h c / (e V)" }, { label: "B", text: "λ_min = e V / (h c)" }, { label: "C", text: "λ_min = h V / (e c)" }, { label: "D", text: "λ_min = h e / (c V)" }
    ],
    optionsTamil: [
      { label: "A", text: "λ_min = h c / (e V)" }, { label: "B", text: "λ_min = e V / (h c)" }, { label: "C", text: "λ_min = h V / (e c)" }, { label: "D", text: "λ_min = h e / (c V)" }
    ],
    correctAnswer: "A",
    explanation: "Duane-Hunt Law: e V = h c / λ_min => λ_min = 12400 / V Å.",
    explanationTamil: "டுயேன்-ஹண்ட் விதிப்படி λ_min = h c / (e V) ஆகும்."
  },
  {
    code: "PHY-162", subject: "Physics", topic: "Atomic Physics", difficulty: "easy",
    questionText: "LASER is an acronym for:",
    questionTextTamil: "லேசர் (LASER) என்பதன் விரிவாக்கம்:",
    options: [
      { label: "A", text: "Light Amplification by Stimulated Emission of Radiation" },
      { label: "B", text: "Light Absorption by Stimulated Emission of Radiation" },
      { label: "C", text: "Light Amplification by Spontaneous Emission of Radiation" },
      { label: "D", text: "Light Attenuation by Stimulated Emission of Rays" }
    ],
    optionsTamil: [
      { label: "A", text: "Light Amplification by Stimulated Emission of Radiation (தூண்டப்பட்ட கதிர்வீச்சு உமிழ்வு மூலம் ஒளி பெருக்கம்)" },
      { label: "B", text: "Light Absorption by Stimulated Emission" },
      { label: "C", text: "Light Amplification by Spontaneous Emission" },
      { label: "D", text: "Light Attenuation by Stimulated Emission" }
    ],
    correctAnswer: "A",
    explanation: "LASER stands for Light Amplification by Stimulated Emission of Radiation.",
    explanationTamil: "லேசர் என்பது தூண்டப்பட்ட உமிழ்வு மூலம் ஒளியைப் பெருக்குவதைக் குறிக்கிறது."
  },
  {
    code: "PHY-163", subject: "Physics", topic: "Atomic Physics", difficulty: "medium",
    questionText: "Population inversion in lasers means:",
    questionTextTamil: "லேசரில் மக்கள்தொகை தலைகீழாக்கம் (Population Inversion) என்பது:",
    options: [
      { label: "A", text: "Number of atoms in higher excited state exceeds that in ground state" },
      { label: "B", text: "Number of atoms in ground state exceeds that in excited state" },
      { label: "C", text: "All atoms are ionized" },
      { label: "D", text: "Zero atoms in excited state" }
    ],
    optionsTamil: [
      { label: "A", text: "உயர் ஆற்றல் மட்டத்தில் உள்ள அணுக்களின் எண்ணிக்கை அடிநிலையை விட அதிகமாக இருப்பது" },
      { label: "B", text: "அடிநிலை அணுக்களின் எண்ணிக்கை அதிகமாக இருப்பது" },
      { label: "C", text: "அனைத்து அணுக்களும் அயனியாதல்" },
      { label: "D", text: "கிளர்வு நிலையில் அணுக்கள் இல்லாமை" }
    ],
    correctAnswer: "A",
    explanation: "Population inversion (N₂ > N₁) is required to sustain stimulated emission over absorption.",
    explanationTamil: "தூண்டப்பட்ட உமிழ்வு மேலோங்க உயர் ஆற்றல் மட்டத்தில் அதிக அணுக்கள் இருக்க வேண்டும்."
  },
  {
    code: "PHY-164", subject: "Physics", topic: "Atomic Physics", difficulty: "hard",
    questionText: "The ratio of kinetic energy to total energy of an electron in a Bohr orbit of hydrogen is:",
    questionTextTamil: "போர் சுற்றுப்பாதையில் உள்ள எலக்ட்ரானின் இயக்க ஆற்றலுக்கும் மொத்த ஆற்றலுக்கும் உள்ள விகிதம்:",
    options: [
      { label: "A", text: "-1" }, { label: "B", text: "+1" }, { label: "C", text: "+2" }, { label: "D", text: "-2" }
    ],
    optionsTamil: [
      { label: "A", text: "-1" }, { label: "B", text: "+1" }, { label: "C", text: "+2" }, { label: "D", text: "-2" }
    ],
    correctAnswer: "A",
    explanation: "Total energy E = - K. Hence K / E = -1.",
    explanationTamil: "மொத்த ஆற்றல் E = - K (இயக்க ஆற்றல் K நேர்மதிப்புடையது), எனவே K / E = -1."
  },
  {
    code: "PHY-165", subject: "Physics", topic: "Atomic Physics", difficulty: "medium",
    questionText: "Rutherford's alpha particle scattering experiment led to the discovery of:",
    questionTextTamil: "ரூதர்போர்டின் ஆல்ஃபா துகள் சிதறல் ஆய்வு எதன் கண்டுபிடிப்புக்கு வழிவகுத்தது?",
    options: [
      { label: "A", text: "Atomic nucleus" }, { label: "B", text: "Electron" }, { label: "C", text: "Neutron" }, { label: "D", text: "Positron" }
    ],
    optionsTamil: [
      { label: "A", text: "அணுக்கரு (Atomic nucleus)" }, { label: "B", text: "எலக்ட்ரான்" }, { label: "C", text: "நியூட்ரான்" }, { label: "D", text: "பாசிட்ரான்" }
    ],
    correctAnswer: "A",
    explanation: "Large-angle deflection of alpha particles showed that almost all mass and positive charge is concentrated in a tiny central nucleus.",
    explanationTamil: "அணுவின் மையத்தில் நேர்மின்னூட்டமும் நிறையும் குவிந்துள்ள அணுக்கருவை ரூதர்போர்ட் கண்டறிந்தார்."
  },

  // 166-185 Nuclear Physics
  {
    code: "PHY-166", subject: "Physics", topic: "Nuclear Physics", difficulty: "easy",
    questionText: "The nuclear radius R of a nucleus of mass number A is proportional to:",
    questionTextTamil: "நிறை எண் A கொண்ட அணுக்கருவின் ஆரம் R எதற்கு விகிதசமத்தில் இருக்கும்?",
    options: [
      { label: "A", text: "A^(1/3)" }, { label: "B", text: "A^(2/3)" }, { label: "C", text: "A" }, { label: "D", text: "A³" }
    ],
    optionsTamil: [
      { label: "A", text: "A^(1/3)" }, { label: "B", text: "A^(2/3)" }, { label: "C", text: "A" }, { label: "D", text: "A³" }
    ],
    correctAnswer: "A",
    explanation: "Nuclear radius R = R₀ A^(1/3) where R₀ ≈ 1.2 × 10⁻¹⁵ m (1.2 fm).",
    explanationTamil: "அணுக்கரு ஆரம் R = R₀ A^(1/3) (R₀ ≈ 1.2 ஃபெர்மி)."
  },
  {
    code: "PHY-167", subject: "Physics", topic: "Nuclear Physics", difficulty: "easy",
    questionText: "Nuclear density across different nuclei is approximately:",
    questionTextTamil: "அனைத்து அணுக்கருக்களின் அடர்த்தியும் தோராயமாக:",
    options: [
      { label: "A", text: "Constant, around 2.3 × 10¹⁷ kg/m³" },
      { label: "B", text: "Proportional to mass number A" },
      { label: "C", text: "Inversely proportional to A" },
      { label: "D", text: "Zero" }
    ],
    optionsTamil: [
      { label: "A", text: "மாறிலி, சுமார் 2.3 × 10¹⁷ கிகி/மீ³" },
      { label: "B", text: "நிறை எண் A-க்கு நேர்தகவில் அமையும்" },
      { label: "C", text: "A-க்கு எதிர்த்தகவில் அமையும்" },
      { label: "D", text: "சுழி" }
    ],
    correctAnswer: "A",
    explanation: "Nuclear density ρ = M / V is independent of mass number A and is extremely large (~10¹⁷ kg/m³).",
    explanationTamil: "அணுக்கருவின் அடர்த்தி நிறை எண்ணைச் சார்ந்திராமல் மாறிலியாக (~10¹⁷ கிகி/மீ³) உள்ளது."
  },
  {
    code: "PHY-168", subject: "Physics", topic: "Nuclear Physics", difficulty: "easy",
    questionText: "1 atomic mass unit (1 u) is equivalent to energy of approximately:",
    questionTextTamil: "1 அணு நிறை அலகு (1 u) எத்தனை ஆற்றலுக்கு சமம்?",
    options: [
      { label: "A", text: "931.5 MeV" }, { label: "B", text: "93.15 MeV" }, { label: "C", text: "1.6 × 10⁻¹⁹ J" }, { label: "D", text: "13.6 eV" }
    ],
    optionsTamil: [
      { label: "A", text: "931.5 MeV" }, { label: "B", text: "93.15 MeV" }, { label: "C", text: "1.6 × 10⁻¹⁹ J" }, { label: "D", text: "13.6 eV" }
    ],
    correctAnswer: "A",
    explanation: "E = m c² = (1.6605 × 10⁻²⁷ kg) × c² ≈ 931.5 MeV.",
    explanationTamil: "1 u நிறை இழப்புக்கு சமமான ஆற்றல் 931.5 MeV ஆகும்."
  },
  {
    code: "PHY-169", subject: "Physics", topic: "Nuclear Physics", difficulty: "medium",
    questionText: "The binding energy per nucleon is maximum for which nucleus?",
    questionTextTamil: "ஒரு நியூக்ளியானுக்கான பிணைப்பாற்றல் எந்த அணுக்கருவிற்கு பெருமமாக உள்ளது?",
    options: [
      { label: "A", text: "Iron-56 (⁵⁶Fe, ~8.8 MeV)" },
      { label: "B", text: "Uranium-235 (²³⁵U)" },
      { label: "C", text: "Helium-4 (⁴He)" },
      { label: "D", text: "Hydrogen (¹H)" }
    ],
    optionsTamil: [
      { label: "A", text: "இரும்பு-56 (⁵⁶Fe, ~8.8 MeV)" },
      { label: "B", text: "யுரேனியம்-235" },
      { label: "C", text: "ஹீலியம்-4" },
      { label: "D", text: "ஹைட்ரஜன்-1" }
    ],
    correctAnswer: "A",
    explanation: "⁵⁶Fe has the highest binding energy per nucleon (~8.8 MeV/nucleon), making it the most tightly bound and stable nucleus.",
    explanationTamil: "இரும்பு ⁵⁶Fe அணுக்கருவிற்கு ஒரு நியூக்ளியானுக்கான பிணைப்பாற்றல் பெருமமாக (~8.8 MeV) உள்ளது."
  },
  {
    code: "PHY-170", subject: "Physics", topic: "Nuclear Physics", difficulty: "easy",
    questionText: "Nuclear forces that bind nucleons together are:",
    questionTextTamil: "அணுக்கருவினுள் நியூக்ளியான்களைப் பிணைக்கும் அணுக்கரு விசை எத்தகையது?",
    options: [
      { label: "A", text: "Short-range, charge-independent, strongest in nature" },
      { label: "B", text: "Long-range and electrostatic" },
      { label: "C", text: "Gravitational in nature" },
      { label: "D", text: "Repulsive at all distances" }
    ],
    optionsTamil: [
      { label: "A", text: "குறுகிய நெடுக்கை, மின்னூட்டம் சாராத, இயற்கையின் மிக வலிமையான விசை" },
      { label: "B", text: "நீண்ட நெடுக்கை மற்றும் நிலைமின்னியல் விசை" },
      { label: "C", text: "ஈர்ப்பு விசை போன்றது" },
      { label: "D", text: "எப்போதும் விலக்கு விசை" }
    ],
    correctAnswer: "A",
    explanation: "Strong nuclear force operates within ~10⁻¹⁵ m, is independent of charge, and is ~100 times stronger than electrostatic force.",
    explanationTamil: "அணுக்கரு விசை மிகக் குறுகிய தொலைவு விசை, மின்னூட்டம் சாராதது மற்றும் மிக வலிமையானது."
  },
  {
    code: "PHY-171", subject: "Physics", topic: "Nuclear Physics", difficulty: "easy",
    questionText: "The half-life T_(1/2) and decay constant λ of a radioactive substance are related by:",
    questionTextTamil: "கதிரியக்கப் பொருளின் அரை ஆயுட்காலம் T_(1/2) மற்றும் சிதைவு மாறிலி λ இடையிலான தொடர்பு:",
    options: [
      { label: "A", text: "T_(1/2) = 0.693 / λ" }, { label: "B", text: "T_(1/2) = λ / 0.693" }, { label: "C", text: "T_(1/2) = 0.693 * λ" }, { label: "D", text: "T_(1/2) = 1 / λ" }
    ],
    optionsTamil: [
      { label: "A", text: "T_(1/2) = 0.693 / λ" }, { label: "B", text: "T_(1/2) = λ / 0.693" }, { label: "C", text: "T_(1/2) = 0.693 * λ" }, { label: "D", text: "T_(1/2) = 1 / λ" }
    ],
    correctAnswer: "A",
    explanation: "T_(1/2) = ln(2) / λ ≈ 0.693 / λ.",
    explanationTamil: "அரை ஆயுட்காலம் T_(1/2) = ln(2) / λ = 0.693 / λ ஆகும்."
  },
  {
    code: "PHY-172", subject: "Physics", topic: "Nuclear Physics", difficulty: "medium",
    questionText: "In alpha decay of a nucleus (A, Z), the daughter nucleus has mass number and atomic number:",
    questionTextTamil: "ஒரு அணுக்கரு (A, Z) ஆல்ஃபா சிதைவடையும் போது உருவாகும் சேய் அணுக்கருவின் நிறை மற்றும் அணு எண்கள்:",
    options: [
      { label: "A", text: "A - 4, Z - 2" }, { label: "B", text: "A, Z + 1" }, { label: "C", text: "A, Z - 1" }, { label: "D", text: "A - 2, Z - 4" }
    ],
    optionsTamil: [
      { label: "A", text: "A - 4, Z - 2" }, { label: "B", text: "A, Z + 1" }, { label: "C", text: "A, Z - 1" }, { label: "D", text: "A - 2, Z - 4" }
    ],
    correctAnswer: "A",
    explanation: "Alpha particle is a Helium nucleus (⁴₂He). Emission reduces mass number by 4 and atomic number by 2.",
    explanationTamil: "ஆல்ஃபா துகள் (⁴₂He) வெளியேறுவதால் நிறை எண் 4-ம், அணு எண் 2-ம் குறையும்."
  },
  {
    code: "PHY-173", subject: "Physics", topic: "Nuclear Physics", difficulty: "medium",
    questionText: "In negative beta (β⁻) decay, a neutron transforms into:",
    questionTextTamil: "பீட்டா (β⁻) சிதைவின் போது ஒரு நியூட்ரான் எவ்வாறாக மாறுகிறது?",
    options: [
      { label: "A", text: "A proton, an electron, and an antineutrino" },
      { label: "B", text: "A proton and positron" },
      { label: "C", text: "An alpha particle" },
      { label: "D", text: "Two protons" }
    ],
    optionsTamil: [
      { label: "A", text: "புரோட்டான், எலக்ட்ரான் மற்றும் ஆன்டிநியூட்ரானோ (Antineutrino)" },
      { label: "B", text: "புரோட்டான் மற்றும் பாசிட்ரான்" },
      { label: "C", text: "ஆல்ஃபா துகள்" },
      { label: "D", text: "இரு புரோட்டான்கள்" }
    ],
    correctAnswer: "A",
    explanation: "n → p + e⁻ + ν̄_e. Conserves charge, baryon number, and lepton number.",
    explanationTamil: "n → p + e⁻ + ν̄_e என்ற சமன்பாட்டின்படி நியூட்ரான் புரோட்டானாகவும் எலக்ட்ரானாகவும் மாறுகிறது."
  },
  {
    code: "PHY-174", subject: "Physics", topic: "Nuclear Physics", difficulty: "easy",
    questionText: "The penetrating power is maximum for:",
    questionTextTamil: "மிக அதிக ஊடுருவும் திறன் கொண்டது எது?",
    options: [
      { label: "A", text: "Gamma rays" }, { label: "B", text: "Beta particles" }, { label: "C", text: "Alpha particles" }, { label: "D", text: "Protons" }
    ],
    optionsTamil: [
      { label: "A", text: "காமா கதிர்கள் (Gamma rays)" }, { label: "B", text: "பீட்டா துகள்கள்" }, { label: "C", text: "ஆல்ஃபா துகள்கள்" }, { label: "D", text: "புரோட்டான்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Gamma rays have no charge and high frequency, penetrating deep through dense matter like lead.",
    explanationTamil: "காமா கதிர்கள் மின்னூட்டமற்றவை என்பதால் மிக அதிக ஊடுருவு திறன் கொண்டவை."
  },
  {
    code: "PHY-175", subject: "Physics", topic: "Nuclear Physics", difficulty: "easy",
    questionText: "The primary source of stellar energy in the Sun is:",
    questionTextTamil: "சூரியனில் ஆற்றல் உற்பத்திக்கான முதன்மையான மூல நிகழ்வு எது?",
    options: [
      { label: "A", text: "Nuclear fusion (proton-proton chain reaction)" },
      { label: "B", text: "Nuclear fission" },
      { label: "C", text: "Chemical combustion of hydrogen" },
      { label: "D", text: "Gravitational contraction only" }
    ],
    optionsTamil: [
      { label: "A", text: "அணுக்கரு இணைவு (புரோட்டான்-புரோட்டான் சுழற்சி)" },
      { label: "B", text: "அணுக்கரு பிளவு" },
      { label: "C", text: "ஹைட்ரஜன் எரிதல்" },
      { label: "D", text: "ஈர்ப்பு சுருக்கம் மட்டுமே" }
    ],
    correctAnswer: "A",
    explanation: "Sun fuses hydrogen nuclei into helium via proton-proton chain at tens of millions of degrees.",
    explanationTamil: "சூரியனில் ஹைட்ரஜன் அணுக்கருக்கள் இணைந்து ஹீலியமாக மாறும் அணுக்கரு இணைவு மூலம் அபரிமிதமான ஆற்றல் வெளியாகிறது."
  },
  {
    code: "PHY-176", subject: "Physics", topic: "Nuclear Physics", difficulty: "medium",
    questionText: "Heavy water (D₂O) or graphite is used in a nuclear reactor as a:",
    questionTextTamil: "அணு உலைகளில் கனநீர் (D₂O) அல்லது கிராஃபைட் எதற்காகப் பயன்படுகிறது?",
    options: [
      { label: "A", text: "Moderator to slow down fast fission neutrons" },
      { label: "B", text: "Control rod to absorb neutrons" },
      { label: "C", text: "Nuclear fuel" },
      { label: "D", text: "Shielding material" }
    ],
    optionsTamil: [
      { label: "A", text: "வேக நியூட்ரான்களின் வேகத்தைத் தணிக்கும் தணிப்பான் (Moderator)" },
      { label: "B", text: "நியூட்ரான்களை உறிஞ்சும் கட்டுப்பாட்டுக் கழி" },
      { label: "C", text: "அணு எரிபொருள்" },
      { label: "D", text: "கவசப் பொருள்" }
    ],
    correctAnswer: "A",
    explanation: "Moderators slow down fast neutrons to thermal energies (~0.025 eV) for sustaining ²³⁵U fission.",
    explanationTamil: "வேக நியூட்ரான்களை வெப்ப நியூட்ரான்களாக மாற்றும் தணிப்பானாக கனநீர் பயன்படுகிறது."
  },
  {
    code: "PHY-177", subject: "Physics", topic: "Nuclear Physics", difficulty: "easy",
    questionText: "Cadmium and Boron rods in a nuclear reactor serve as:",
    questionTextTamil: "அணு உலைகளில் காட்மியம் மற்றும் போரான் தண்டுகள் எதற்காகப் பயன்படுகின்றன?",
    options: [
      { label: "A", text: "Control rods to absorb excess neutrons" },
      { label: "B", text: "Coolant" },
      { label: "C", text: "Moderator" },
      { label: "D", text: "Nuclear fuel" }
    ],
    optionsTamil: [
      { label: "A", text: "நியூட்ரான்களை உறிஞ்சி வினையை கட்டுப்படுத்தும் கட்டுப்பாட்டு தண்டுகள்" },
      { label: "B", text: "குளிர்விப்பான்" },
      { label: "C", text: "தணிப்பான்" },
      { label: "D", text: "எரிபொருள்" }
    ],
    correctAnswer: "A",
    explanation: "Cadmium and boron have high neutron capture cross-sections, controlling chain reaction rate.",
    explanationTamil: "காட்மியம் மற்றும் போரான் தண்டுகள் அதிக நியூட்ரான்களை உறிஞ்சி அணுக்கரு தொடர்வினையை சீராகக் கட்டுப்படுத்துகின்றன."
  },
  {
    code: "PHY-178", subject: "Physics", topic: "Nuclear Physics", difficulty: "hard",
    questionText: "A radioactive sample has half-life of 20 days. The fraction remaining undecayed after 60 days is:",
    questionTextTamil: "20 நாட்கள் அரை ஆயுட்காலம் கொண்ட கதிரியக்கப் பொருளில் 60 நாட்களுக்குப் பிறகு சிதையாமல் எஞ்சியிருக்கும் பகுதி:",
    options: [
      { label: "A", text: "1 / 8" }, { label: "B", text: "1 / 4" }, { label: "C", text: "1 / 16" }, { label: "D", text: "1 / 3" }
    ],
    optionsTamil: [
      { label: "A", text: "1 / 8" }, { label: "B", text: "1 / 4" }, { label: "C", text: "1 / 16" }, { label: "D", text: "1 / 3" }
    ],
    correctAnswer: "A",
    explanation: "Number of half-lives n = 60 / 20 = 3. Remaining fraction = (1/2)³ = 1/8.",
    explanationTamil: "அரை ஆயுட்காலங்களின் எண்ணிக்கை n = 60/20 = 3. எஞ்சியிருக்கும் பகுதி = (1/2)³ = 1/8."
  },

  // 179-195 Semiconductors & Electronics
  {
    code: "PHY-179", subject: "Physics", topic: "Semiconductors", difficulty: "easy",
    questionText: "Energy band gap Eg is zero for which class of materials?",
    questionTextTamil: "விலக்கப்பட்ட ஆற்றல் இடைவெளி Eg சுழியாக இருப்பது எவற்றில்?",
    options: [
      { label: "A", text: "Metals (conductors)" }, { label: "B", text: "Semiconductors" }, { label: "C", text: "Insulators" }, { label: "D", text: "Polymers" }
    ],
    optionsTamil: [
      { label: "A", text: "உலோகங்கள் (கடத்திகள்)" }, { label: "B", text: "குறைக்கடத்திகள்" }, { label: "C", text: "மின்காப்பிகள்" }, { label: "D", text: "பாலிமர்கள்" }
    ],
    correctAnswer: "A",
    explanation: "In conductors, valence band and conduction band overlap, so Eg ≈ 0.",
    explanationTamil: "கடத்திகளில் இணைதிறன் பட்டையும் கடத்துப் பட்டையும் ஒன்றன் மீது ஒன்று மேற்பொருந்துவதால் Eg = 0."
  },
  {
    code: "PHY-180", subject: "Physics", topic: "Semiconductors", difficulty: "easy",
    questionText: "The energy band gap for Silicon (Si) at room temperature is approximately:",
    questionTextTamil: "அறை வெப்பநிலையில் சிலிக்கானின் (Si) ஆற்றல் இடைவெளி Eg தோராயமாக:",
    options: [
      { label: "A", text: "1.1 eV" }, { label: "B", text: "0.7 eV" }, { label: "C", text: "6.0 eV" }, { label: "D", text: "0 eV" }
    ],
    optionsTamil: [
      { label: "A", text: "1.1 eV" }, { label: "B", text: "0.7 eV (ஜெர்மானியம்)" }, { label: "C", text: "6.0 eV" }, { label: "D", text: "0 eV" }
    ],
    correctAnswer: "A",
    explanation: "Silicon has Eg ≈ 1.1 eV while Germanium has Eg ≈ 0.7 eV.",
    explanationTamil: "சிலிக்கானின் ஆற்றல் இடைவெளி 1.1 eV ஆகும் (ஜெர்மானியத்திற்கு 0.7 eV)."
  },
  {
    code: "PHY-181", subject: "Physics", topic: "Semiconductors", difficulty: "easy",
    questionText: "An n-type semiconductor is obtained by doping pure Silicon with:",
    questionTextTamil: "தூய சிலிக்கானுடன் எதனை மாசூட்டினால் n-வகை குறைக்கடத்தி கிடைக்கும்?",
    options: [
      { label: "A", text: "Pentavalent impurities (e.g., Phosphorus, Arsenic)" },
      { label: "B", text: "Trivalent impurities (e.g., Boron, Aluminium)" },
      { label: "C", text: "Divalent impurities" },
      { label: "D", text: "Carbon" }
    ],
    optionsTamil: [
      { label: "A", text: "ஐந்து இணைதிறன் கொண்ட மாசுக்கள் (எ.கா. பாஸ்பரஸ், ஆர்சனிக்)" },
      { label: "B", text: "மூன்று இணைதிறன் கொண்ட மாசுக்கள் (போரான், அலுமினியம்)" },
      { label: "C", text: "இரு இணைதிறன் மாசுக்கள்" },
      { label: "D", text: "கார்பன்" }
    ],
    correctAnswer: "A",
    explanation: "Pentavalent donor atoms provide extra conduction electrons, creating n-type semiconductor.",
    explanationTamil: "ஐந்து இணைதிறன் கொண்ட அணுக்கள் கூடுதல் எலக்ட்ரான்களை வழங்கி n-வகை குறைக்கடத்தியை உருவாக்குகின்றன."
  },
  {
    code: "PHY-182", subject: "Physics", topic: "Semiconductors", difficulty: "easy",
    questionText: "A p-type semiconductor is obtained by doping pure Silicon with:",
    questionTextTamil: "தூய சிலிக்கானுடன் எதனை மாசூட்டினால் p-வகை குறைக்கடத்தி உருவாகும்?",
    options: [
      { label: "A", text: "Trivalent impurities (e.g., Boron, Indium)" },
      { label: "B", text: "Pentavalent impurities" },
      { label: "C", text: "Tetravalent impurities" },
      { label: "D", text: "Inert gases" }
    ],
    optionsTamil: [
      { label: "A", text: "மூன்று இணைதிறன் மாசுக்கள் (போரான், இண்டியம், கேலியம்)" },
      { label: "B", text: "ஐந்து இணைதிறன் மாசுக்கள்" },
      { label: "C", text: "நான்கு இணைதிறன் மாசுக்கள்" },
      { label: "D", text: "மந்த வாயுக்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Trivalent acceptor atoms create positive holes as majority charge carriers, yielding p-type semiconductor.",
    explanationTamil: "மூன்று இணைதிறன் மாசுக்கள் துளைகளை (holes) பெரும்பான்மை ஊர்திகளாக உருவாக்கி p-வகை குறைக்கடத்தியைத் தருகின்றன."
  },
  {
    code: "PHY-183", subject: "Physics", topic: "Semiconductors", difficulty: "medium",
    questionText: "In an unbiased p-n junction, the depletion region consists of:",
    questionTextTamil: "பயனற்ற (unbiased) p-n சந்தியின் இயங்கு மின்சுமை அற்ற பகுதியில் (Depletion region) இருப்பது:",
    options: [
      { label: "A", text: "Immobile positive and negative ions" },
      { label: "B", text: "Free electrons and holes" },
      { label: "C", text: "Only free electrons" },
      { label: "D", text: "Neutral atoms only" }
    ],
    optionsTamil: [
      { label: "A", text: "நகராத நேர் மற்றும் எதிர் அயனிகள்" },
      { label: "B", text: "கட்டற்ற எலக்ட்ரான்கள் மற்றும் துளைகள்" },
      { label: "C", text: "எலக்ட்ரான்கள் மட்டுமே" },
      { label: "D", text: "நடுநிலை அணுக்கள் மட்டுமே" }
    ],
    correctAnswer: "A",
    explanation: "Diffusion of mobile carriers leaves behind uncompensated immobile donor (+) and acceptor (-) ions in the depletion zone.",
    explanationTamil: "இயங்கு மின்சுமை அற்ற பகுதியில் நகராத நேர் மற்றும் எதிர் அயனிகள் மட்டுமே இருக்கும்."
  },
  {
    code: "PHY-184", subject: "Physics", topic: "Semiconductors", difficulty: "easy",
    questionText: "Under forward bias of a p-n junction diode:",
    questionTextTamil: "ஒரு p-n சந்தி டையோடு முன்னோக்கு சார்புடையதாக இருக்கும் போது:",
    options: [
      { label: "A", text: "Depletion width decreases and current conducts easily" },
      { label: "B", text: "Depletion width increases" },
      { label: "C", text: "Current is zero" },
      { label: "D", text: "Barrier potential increases" }
    ],
    optionsTamil: [
      { label: "A", text: "இயங்கு மின்சுமை அற்ற பகுதியின் அகலம் குறைந்து எளிதில் மின்னோட்டம் பாய்கிறது" },
      { label: "B", text: "அகலம் அதிகரிக்கிறது" },
      { label: "C", text: "மின்னோட்டம் சுழியாகும்" },
      { label: "D", text: "தடை மின்னழுத்தம் அதிகரிக்கும்" }
    ],
    correctAnswer: "A",
    explanation: "Forward bias opposes built-in potential, reducing depletion layer width and barrier height.",
    explanationTamil: "முன்னோக்கு சார்பில் தடை மின்னழுத்தமும் பகுதியின் அகலமும் குறைந்து மின்னோட்டம் பாயும்."
  },
  {
    code: "PHY-185", subject: "Physics", topic: "Semiconductors", difficulty: "easy",
    questionText: "A Zener diode is operated in which mode for voltage regulation?",
    questionTextTamil: "மின்னழுத்த சீரமைப்பியாக செயல்பட ஜீனர் டையோடு எந்த சார்பு நிலையில் இணைக்கப்பட வேண்டும்?",
    options: [
      { label: "A", text: "Reverse breakdown region" },
      { label: "B", text: "Forward bias" },
      { label: "C", text: "Zero bias" },
      { label: "D", text: "High temperature saturation" }
    ],
    optionsTamil: [
      { label: "A", text: "பின்னோக்கு முறிவுப் பகுதி (Reverse breakdown)" },
      { label: "B", text: "முன்னோக்கு சார்பு" },
      { label: "C", text: "சார்பற்ற நிலை" },
      { label: "D", text: "வெப்ப செறிவு நிலை" }
    ],
    correctAnswer: "A",
    explanation: "In reverse breakdown, Zener diode maintains constant voltage across its terminals despite current variations.",
    explanationTamil: "ஜீனர் டையோடு பின்னோக்கு முறிவுப் பகுதியில் மின்னழுத்தத்தை மாறிலியாக வைத்து சீரமைக்கிறது."
  },
  {
    code: "PHY-186", subject: "Physics", topic: "Semiconductors", difficulty: "medium",
    questionText: "The maximum efficiency of a half-wave rectifier is approximately:",
    questionTextTamil: "அரை அலை திருத்தியின் பெரும பயனுறு திறன் தோராயமாக:",
    options: [
      { label: "A", text: "40.6 %" }, { label: "B", text: "81.2 %" }, { label: "C", text: "50 %" }, { label: "D", text: "100 %" }
    ],
    optionsTamil: [
      { label: "A", text: "40.6 %" }, { label: "B", text: "81.2 % (முழு அலை திருத்தி)" }, { label: "C", text: "50 %" }, { label: "D", text: "100 %" }
    ],
    correctAnswer: "A",
    explanation: "Half-wave rectifier efficiency η_max = 40.6%. Full-wave rectifier is 81.2%.",
    explanationTamil: "அரை அலை திருத்தியின் பெரும பயனுறு திறன் 40.6% ஆகும்."
  },
  {
    code: "PHY-187", subject: "Physics", topic: "Semiconductors", difficulty: "easy",
    questionText: "Which logic gate is known as the universal gate?",
    questionTextTamil: "எந்த தர்க்க வாயில் (Logic Gate) பொதுமை வாயில் (Universal gate) என அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "NAND and NOR gates" },
      { label: "B", text: "AND and OR gates" },
      { label: "C", text: "NOT gate only" },
      { label: "D", text: "XOR gate only" }
    ],
    optionsTamil: [
      { label: "A", text: "NAND மற்றும் NOR வாயில்கள்" },
      { label: "B", text: "AND மற்றும் OR வாயில்கள்" },
      { label: "C", text: "NOT வாயில் மட்டும்" },
      { label: "D", text: "XOR வாயில் மட்டும்" }
    ],
    correctAnswer: "A",
    explanation: "NAND and NOR gates can implement all other boolean logic operations (AND, OR, NOT).",
    explanationTamil: "NAND மற்றும் NOR வாயில்களைக் கொண்டு மற்ற அனைத்து தர்க்க வாயில்களையும் அமைக்க முடியும்."
  },
  {
    code: "PHY-188", subject: "Physics", topic: "Semiconductors", difficulty: "medium",
    questionText: "The Boolean expression for a NOR gate with inputs A and B is:",
    questionTextTamil: "A, B உள்ளீடுகள் கொண்ட NOR வாயிலின் பூலியன் சமன்பாடு:",
    options: [
      { label: "A", text: "Y = (A + B)̅" }, { label: "B", text: "Y = A · B" }, { label: "C", text: "Y = (A · B)̅" }, { label: "D", text: "Y = A + B" }
    ],
    optionsTamil: [
      { label: "A", text: "Y = (A + B)̅" }, { label: "B", text: "Y = A · B" }, { label: "C", text: "Y = (A · B)̅" }, { label: "D", text: "Y = A + B" }
    ],
    correctAnswer: "A",
    explanation: "NOR = NOT of OR: Y = (A + B)̅.",
    explanationTamil: "NOR வாயிலின் வெளியீடு Y = (A + B)̅ ஆகும்."
  },
  {
    code: "PHY-189", subject: "Physics", topic: "Semiconductors", difficulty: "easy",
    questionText: "Light Emitting Diode (LED) operates in:",
    questionTextTamil: "ஒளி உமிழ் டையோடு (LED) எந்த சார்பு நிலையில் இயங்குகிறது?",
    options: [
      { label: "A", text: "Forward bias" }, { label: "B", text: "Reverse bias" }, { label: "C", text: "Breakdown region" }, { label: "D", text: "Unbiased condition" }
    ],
    optionsTamil: [
      { label: "A", text: "முன்னோக்கு சார்பு நிலை" }, { label: "B", text: "பின்னோக்கு சார்பு நிலை" }, { label: "C", text: "முறிவுப் பகுதி" }, { label: "D", text: "சார்பற்ற நிலை" }
    ],
    correctAnswer: "A",
    explanation: "In forward bias, electron-hole recombination across the junction emits visible photons.",
    explanationTamil: "முன்னோக்கு சார்பில் எலக்ட்ரான்-துளை மீளிணைவின் போது ஒளி உமிழப்படுகிறது."
  },
  {
    code: "PHY-190", subject: "Physics", topic: "Semiconductors", difficulty: "medium",
    questionText: "Solar cells and photodiodes work on which semiconductor junction property?",
    questionTextTamil: "சூரிய மின்கலங்கள் மற்றும் ஒளி உணரி டையோடுகள் எந்த தத்துவத்தில் செயல்படுகின்றன?",
    options: [
      { label: "A", text: "Photovoltaic effect by electron-hole pair generation via light absorption" },
      { label: "B", text: "Thermionic emission" },
      { label: "C", text: "Secondary emission" },
      { label: "D", text: "Field emission" }
    ],
    optionsTamil: [
      { label: "A", text: "ஒளி உறிஞ்சப்பட்டு எலக்ட்ரான்-துளை இரட்டைகள் உருவாகும் ஒளி மின்னழுத்த விளைவு (Photovoltaic effect)" },
      { label: "B", text: "வெப்பயன் உமிழ்வு" },
      { label: "C", text: "இரண்டாம் நிலை உமிழ்வு" },
      { label: "D", text: "புல உமிழ்வு" }
    ],
    correctAnswer: "A",
    explanation: "Incident photons with energy > bandgap create electron-hole pairs separated by junction electric field.",
    explanationTamil: "ஒளி படும்போது எலக்ட்ரான்-துளை இரட்டைகள் உருவாக்கப்பட்டு மின்னியக்கு விசை தோன்றுகிறது."
  },

  // 191-215 General Mechanics, Thermodynamics & Properties of Matter
  {
    code: "PHY-191", subject: "Physics", topic: "Mechanics", difficulty: "easy",
    questionText: "The escape velocity from the surface of Earth (radius R, mass M) is approximately:",
    questionTextTamil: "புவிப் பரப்பிலிருந்து விடுபடு திசைவேகம் (Escape velocity) தோராயமாக எவ்வளவு?",
    options: [
      { label: "A", text: "11.2 km/s" }, { label: "B", text: "8.0 km/s" }, { label: "C", text: "9.8 km/s" }, { label: "D", text: "3.0 km/s" }
    ],
    optionsTamil: [
      { label: "A", text: "11.2 கிமீ/வி" }, { label: "B", text: "8.0 கிமீ/வி" }, { label: "C", text: "9.8 கிமீ/வி" }, { label: "D", text: "3.0 கிமீ/வி" }
    ],
    correctAnswer: "A",
    explanation: "v_e = √(2gR) = √(2 × 9.8 × 6.4 × 10⁶) ≈ 11.2 km/s.",
    explanationTamil: "புவியின் விடுபடு வேகம் v_e = √(2gR) ≈ 11.2 கிமீ/வி."
  },
  {
    code: "PHY-192", subject: "Physics", topic: "Mechanics", difficulty: "easy",
    questionText: "Orbital velocity v_o of a satellite revolving close to Earth's surface is related to escape velocity v_e as:",
    questionTextTamil: "புவிக்கு மிக அருகில் சுற்றும் செயற்கைக்கோளின் சுற்றியக்க வேகம் v_o விடுபடு வேகம் v_e உடன் எவ்வாறு தொடர்புடையது?",
    options: [
      { label: "A", text: "v_e = √2 * v_o" }, { label: "B", text: "v_o = √2 * v_e" }, { label: "C", text: "v_e = 2 * v_o" }, { label: "D", text: "v_e = v_o / √2" }
    ],
    optionsTamil: [
      { label: "A", text: "v_e = √2 * v_o" }, { label: "B", text: "v_o = √2 * v_e" }, { label: "C", text: "v_e = 2 * v_o" }, { label: "D", text: "v_e = v_o / √2" }
    ],
    correctAnswer: "A",
    explanation: "v_o = √(gR) and v_e = √(2gR), hence v_e = √2 * v_o.",
    explanationTamil: "v_e = √(2gR) மற்றும் v_o = √(gR), எனவே v_e = √2 * v_o."
  },
  {
    code: "PHY-193", subject: "Physics", topic: "Mechanics", difficulty: "easy",
    questionText: "The time period of a geostationary satellite revolving around Earth is:",
    questionTextTamil: "புவி நிலைத் துணைக்கோளின் (Geostationary satellite) சுழற்சிக் காலம்:",
    options: [
      { label: "A", text: "24 hours" }, { label: "B", text: "12 hours" }, { label: "C", text: "365 days" }, { label: "D", text: "84 minutes" }
    ],
    optionsTamil: [
      { label: "A", text: "24 மணி நேரம்" }, { label: "B", text: "12 மணி நேரம்" }, { label: "C", text: "365 நாட்கள்" }, { label: "D", text: "84 நிமிடங்கள்" }
    ],
    correctAnswer: "A",
    explanation: "A geostationary satellite completes one orbit in 24 hours in the direction of Earth's rotation.",
    explanationTamil: "புவி நிலைக்கோளின் சுழற்சிக் காலம் புவியின் தற்சுழற்சி காலமான 24 மணி நேரத்திற்கு சமம்."
  },
  {
    code: "PHY-194", subject: "Physics", topic: "Mechanics", difficulty: "medium",
    questionText: "Hooke's law states that within the elastic limit:",
    questionTextTamil: "மீட்சி எல்லைக்குள் ஹூக் விதி எதனை வரையறுக்கிறது?",
    options: [
      { label: "A", text: "Stress is directly proportional to strain" },
      { label: "B", text: "Stress is inversely proportional to strain" },
      { label: "C", text: "Strain is constant" },
      { label: "D", text: "Stress equals strain" }
    ],
    optionsTamil: [
      { label: "A", text: "தகைவு திரிபுக்கு நேர்தகவில் அமையும் (Stress ∝ Strain)" },
      { label: "B", text: "தகைவு திரிபுக்கு எதிர்த்தகவில் அமையும்" },
      { label: "C", text: "திரிபு மாறிலி" },
      { label: "D", text: "தகைவு = திரிபு" }
    ],
    correctAnswer: "A",
    explanation: "Hooke's law: Stress / Strain = Modulus of Elasticity (constant).",
    explanationTamil: "ஹூக் விதிப்படி மீட்சி எல்லைக்குள் தகைவு திரிபுக்கு நேர்தகவில் அமையும்."
  },
  {
    code: "PHY-195", subject: "Physics", topic: "Mechanics", difficulty: "easy",
    questionText: "The SI unit of surface tension is:",
    questionTextTamil: "பரப்பு இழுவிசையின் SI அலகு யாது?",
    options: [
      { label: "A", text: "N m⁻¹ (or J m⁻²)" }, { label: "B", text: "N m⁻²" }, { label: "C", text: "N m" }, { label: "D", text: "J m⁻¹" }
    ],
    optionsTamil: [
      { label: "A", text: "N m⁻¹ (அல்லது J m⁻²)" }, { label: "B", text: "N m⁻²" }, { label: "C", text: "N m" }, { label: "D", text: "J m⁻¹" }
    ],
    correctAnswer: "A",
    explanation: "Surface tension T = Force / Length = N/m, also equals surface energy per unit area = J/m².",
    explanationTamil: "பரப்பு இழுவிசையின் SI அலகு N m⁻¹ அல்லது J m⁻² ஆகும்."
  },
  {
    code: "PHY-196", subject: "Physics", topic: "Mechanics", difficulty: "medium",
    questionText: "Bernoulli's theorem for fluid flow is based on the law of conservation of:",
    questionTextTamil: "பெர்னௌலியின் தேற்றம் எந்த அழியா விதியின் அடிப்படையில் அமைந்துள்ளது?",
    options: [
      { label: "A", text: "Energy" }, { label: "B", text: "Mass" }, { label: "C", text: "Linear momentum" }, { label: "D", text: "Angular momentum" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆற்றல் மாறா விதி (Conservation of Energy)" },
      { label: "B", text: "நிறை மாறா விதி" },
      { label: "C", text: "உந்த மாறா விதி" },
      { label: "D", text: "கோண உந்த விதி" }
    ],
    correctAnswer: "A",
    explanation: "P + (1/2)ρv² + ρgh = constant represents energy conservation per unit volume for streamline flow.",
    explanationTamil: "பெர்னௌலி தேற்றம் வரிச்சீர் ஓட்டத்தில் பாயும் திரவத்தின் ஆற்றல் மாறா விதியாகும்."
  },
  {
    code: "PHY-197", subject: "Physics", topic: "Mechanics", difficulty: "easy",
    questionText: "Stokes' law for viscous force F acting on a spherical particle of radius r moving with velocity v in fluid of viscosity η is:",
    questionTextTamil: "η பாகியல் எண் கொண்ட பாய்மத்தில் v திசைவேகத்தில் இயங்கும் r ஆரம் கொண்ட கோளத்தின் மீதான ஸ்டோக்ஸ் விசை:",
    options: [
      { label: "A", text: "F = 6π η r v" }, { label: "B", text: "F = 6π η r² v" }, { label: "C", text: "F = (6π η v) / r" }, { label: "D", text: "F = 3π η r v" }
    ],
    optionsTamil: [
      { label: "A", text: "F = 6π η r v" }, { label: "B", text: "F = 6π η r² v" }, { label: "C", text: "F = (6π η v) / r" }, { label: "D", text: "F = 3π η r v" }
    ],
    correctAnswer: "A",
    explanation: "Stokes' Law: Viscous drag F = 6π η r v.",
    explanationTamil: "ஸ்டோக்ஸ் விதி F = 6π η r v ஆகும்."
  },
  {
    code: "PHY-198", subject: "Physics", topic: "Mechanics", difficulty: "medium",
    questionText: "Terminal velocity v_t of a spherical body falling in a viscous fluid is proportional to radius r as:",
    questionTextTamil: "பாகுநிலை திரவத்தில் விழும் கோளத்தின் முற்றுத் திசைவேகம் v_t ஆரம் r உடன் எவ்வாறு தொடர்புடையது?",
    options: [
      { label: "A", text: "v_t ∝ r²" }, { label: "B", text: "v_t ∝ r" }, { label: "C", text: "v_t ∝ 1/r" }, { label: "D", text: "v_t ∝ 1/r²" }
    ],
    optionsTamil: [
      { label: "A", text: "v_t ∝ r²" }, { label: "B", text: "v_t ∝ r" }, { label: "C", text: "v_t ∝ 1/r" }, { label: "D", text: "v_t ∝ 1/r²" }
    ],
    correctAnswer: "A",
    explanation: "v_t = (2/9) r² (ρ - σ) g / η, directly proportional to square of radius.",
    explanationTamil: "முற்றுத் திசைவேகம் ஆரத்தின் இருமடிக்கு நேர்தகவில் (v_t ∝ r²) அமையும்."
  },
  {
    code: "PHY-199", subject: "Physics", topic: "Thermodynamics", difficulty: "easy",
    questionText: "First law of thermodynamics is an expression of the law of conservation of:",
    questionTextTamil: "வெப்ப இயக்கவியலின் முதல் விதி எதன் மாறா விதியை விளக்குகிறது?",
    options: [
      { label: "A", text: "Energy (ΔQ = ΔU + ΔW)" },
      { label: "B", text: "Mass" },
      { label: "C", text: "Entropy" },
      { label: "D", text: "Temperature" }
    ],
    optionsTamil: [
      { label: "A", text: "ஆற்றல் மாறா விதி (ΔQ = ΔU + ΔW)" },
      { label: "B", text: "நிறை" },
      { label: "C", text: "என்ட்ரோபி" },
      { label: "D", text: "வெப்பநிலை" }
    ],
    correctAnswer: "A",
    explanation: "First Law ΔQ = ΔU + W represents conservation of energy.",
    explanationTamil: "வெப்ப இயக்கவியலின் முதல் விதி ஆற்றல் மாறா விதியாகும் (ΔQ = ΔU + ΔW)."
  },
  {
    code: "PHY-200", subject: "Physics", topic: "Thermodynamics", difficulty: "easy",
    questionText: "Zeroth law of thermodynamics forms the basis for the definition of:",
    questionTextTamil: "வெப்ப இயக்கவியலின் சுழி விதி (Zeroth law) எதனை வரையறுக்க அடிப்படையானது?",
    options: [
      { label: "A", text: "Temperature" }, { label: "B", text: "Internal energy" }, { label: "C", text: "Entropy" }, { label: "D", text: "Pressure" }
    ],
    optionsTamil: [
      { label: "A", text: "வெப்பநிலை (Temperature)" }, { label: "B", text: "அக ஆற்றல்" }, { label: "C", text: "என்ட்ரோபி" }, { label: "D", text: "அழுத்தம்" }
    ],
    correctAnswer: "A",
    explanation: "Zeroth law establishes thermal equilibrium and introduces the concept of temperature.",
    explanationTamil: "சுழி விதி வெப்பச் சமநிலையை விளக்கி வெப்பநிலையை வரையறுக்கிறது."
  },
  {
    code: "PHY-201", subject: "Physics", topic: "Thermodynamics", difficulty: "medium",
    questionText: "In an adiabatic process involving an ideal gas:",
    questionTextTamil: "ஒரு நல்லியல்பு வாயுவின் வெப்பப்பரிமாற்றமில்லா நிகழ்வில் (Adiabatic process):",
    options: [
      { label: "A", text: "No heat enters or leaves the system (ΔQ = 0)" },
      { label: "B", text: "Temperature remains constant (ΔT = 0)" },
      { label: "C", text: "Pressure remains constant (ΔP = 0)" },
      { label: "D", text: "Volume remains constant (ΔV = 0)" }
    ],
    optionsTamil: [
      { label: "A", text: "அமைப்பிற்குள் வெப்பம் உட்செல்லவோ வெளியேறவோ இல்லை (ΔQ = 0)" },
      { label: "B", text: "வெப்பநிலை மாறாது" },
      { label: "C", text: "அழுத்தம் மாறாது" },
      { label: "D", text: "பருமன் மாறாது" }
    ],
    correctAnswer: "A",
    explanation: "In adiabatic processes, the system is thermally insulated so ΔQ = 0 and PV^γ = constant.",
    explanationTamil: "வெப்பப்பரிமாற்றமில்லா நிகழ்வில் அமைப்புடன் வெப்பப் பரிமாற்றம் சுழியாகும் (ΔQ = 0)."
  },
  {
    code: "PHY-202", subject: "Physics", topic: "Thermodynamics", difficulty: "medium",
    questionText: "Efficiency η of an ideal Carnot heat engine operating between temperatures T₁ (source) and T₂ (sink) is:",
    questionTextTamil: "T₁ (மூலம்) மற்றும் T₂ (ஏற்பி) வெப்பநிலைகளுக்கு இடையே இயங்கும் கார்னோ இயந்திரத்தின் பயனுறு திறன் η:",
    options: [
      { label: "A", text: "1 - (T₂ / T₁)" }, { label: "B", text: "1 - (T₁ / T₂)" }, { label: "C", text: "T₂ / T₁" }, { label: "D", text: "(T₁ + T₂) / T₁" }
    ],
    optionsTamil: [
      { label: "A", text: "1 - (T₂ / T₁)" }, { label: "B", text: "1 - (T₁ / T₂)" }, { label: "C", text: "T₂ / T₁" }, { label: "D", text: "(T₁ + T₂) / T₁" }
    ],
    correctAnswer: "A",
    explanation: "Carnot efficiency η = (T₁ - T₂) / T₁ = 1 - T₂/T₁ (T in Kelvin).",
    explanationTamil: "கார்னோ இயந்திரத்தின் திறன் η = 1 - (T₂ / T₁) ஆகும்."
  },
  {
    code: "PHY-203", subject: "Physics", topic: "Thermodynamics", difficulty: "easy",
    questionText: "Molar specific heat ratio γ = C_p / C_v for a monoatomic ideal gas is:",
    questionTextTamil: "ஓரணு நல்லியல்பு வாயுவின் தன்வெப்ப ஏற்புத்திறன் விகிதம் γ = C_p / C_v:",
    options: [
      { label: "A", text: "5/3 (1.67)" }, { label: "B", text: "7/5 (1.40)" }, { label: "C", text: "4/3 (1.33)" }, { label: "D", text: "1.00" }
    ],
    optionsTamil: [
      { label: "A", text: "5/3 (1.67)" }, { label: "B", text: "7/5 (1.40)" }, { label: "C", text: "4/3 (1.33)" }, { label: "D", text: "1.00" }
    ],
    correctAnswer: "A",
    explanation: "For monoatomic gas with degrees of freedom f=3: C_v = 3R/2, C_p = 5R/2, γ = 5/3 ≈ 1.67.",
    explanationTamil: "ஓரணு வாயுவிற்கு γ = (5R/2) / (3R/2) = 5/3 ≈ 1.67."
  },
  {
    code: "PHY-204", subject: "Physics", topic: "Thermodynamics", difficulty: "medium",
    questionText: "According to Wien's displacement law, maximum emission wavelength λ_m and absolute temperature T are related as:",
    questionTextTamil: "வீனின் இடப்பெயர்ச்சி விதிப்படி பெரும உமிழ்வு அலைநீளம் λ_m மற்றும் தனி வெப்பநிலை T இடையிலான தொடர்பு:",
    options: [
      { label: "A", text: "λ_m * T = b (constant)" },
      { label: "B", text: "λ_m / T = constant" },
      { label: "C", text: "λ_m * T⁴ = constant" },
      { label: "D", text: "λ_m = constant * T" }
    ],
    optionsTamil: [
      { label: "A", text: "λ_m * T = b (மாறிலி)" },
      { label: "B", text: "λ_m / T = மாறிலி" },
      { label: "C", text: "λ_m * T⁴ = மாறிலி" },
      { label: "D", text: "λ_m = மாறிலி * T" }
    ],
    correctAnswer: "A",
    explanation: "Wien's law states λ_m T = b where b ≈ 2.898 × 10⁻³ m K.",
    explanationTamil: "வீனின் விதிப்படி λ_m T = b (2.898 × 10⁻³ m K)."
  },
  {
    code: "PHY-205", subject: "Physics", topic: "Thermodynamics", difficulty: "easy",
    questionText: "Stefan-Boltzmann law states that total emissive power E of a black body is proportional to:",
    questionTextTamil: "ஸ்டீஃபான்-போல்ட்ஸ்மேன் விதிப்படி கரும்பொருளின் கதிர்வீச்சுத் திறன் E எதற்கு விகிதசமத்தில் இருக்கும்?",
    options: [
      { label: "A", text: "T⁴" }, { label: "B", text: "T²" }, { label: "C", text: "T" }, { label: "D", text: "T³" }
    ],
    optionsTamil: [
      { label: "A", text: "T⁴" }, { label: "B", text: "T²" }, { label: "C", text: "T" }, { label: "D", text: "T³" }
    ],
    correctAnswer: "A",
    explanation: "E = σ T⁴ where σ is Stefan's constant (5.67 × 10⁻⁸ W m⁻² K⁻⁴).",
    explanationTamil: "E = σ T⁴ (தனி வெப்பநிலையின் நான்குமடிக்கு நேர்தகவு)."
  },
  {
    code: "PHY-206", subject: "Physics", topic: "Oscillations", difficulty: "easy",
    questionText: "For a simple pendulum of length L executing SHM, time period T is:",
    questionTextTamil: "நீளம் L கொண்ட தனி ஊசலின் அலைவுக்காலம் T-க்கான வாய்ப்பாடு:",
    options: [
      { label: "A", text: "T = 2π √(L / g)" }, { label: "B", text: "T = 2π √(g / L)" }, { label: "C", text: "T = (1 / 2π) √(L / g)" }, { label: "D", text: "T = 2π (L / g)" }
    ],
    optionsTamil: [
      { label: "A", text: "T = 2π √(L / g)" }, { label: "B", text: "T = 2π √(g / L)" }, { label: "C", text: "T = (1 / 2π) √(L / g)" }, { label: "D", text: "T = 2π (L / g)" }
    ],
    correctAnswer: "A",
    explanation: "Time period of simple pendulum T = 2π √(L/g). Independent of bob mass.",
    explanationTamil: "தனி ஊசலின் அலைவுக்காலம் T = 2π √(L / g) ஆகும்."
  },
  {
    code: "PHY-207", subject: "Physics", topic: "Oscillations", difficulty: "medium",
    questionText: "In simple harmonic motion (SHM), the acceleration a is related to displacement x by:",
    questionTextTamil: "சீரான சீரிசை இயக்கத்தில் (SHM) முடுக்கம் a இடப்பெயர்ச்சி x உடன் எவ்வாறு தொடர்புடையது?",
    options: [
      { label: "A", text: "a = - ω² x" }, { label: "B", text: "a = ω² x" }, { label: "C", text: "a = - ω x" }, { label: "D", text: "a = - ω x²" }
    ],
    optionsTamil: [
      { label: "A", text: "a = - ω² x" }, { label: "B", text: "a = ω² x" }, { label: "C", text: "a = - ω x" }, { label: "D", text: "a = - ω x²" }
    ],
    correctAnswer: "A",
    explanation: "Acceleration is directly proportional to displacement and directed towards equilibrium: a = - ω² x.",
    explanationTamil: "முடுக்கம் a = - ω² x (மையப்புள்ளியை நோக்கி செயல்படும்)."
  },
  {
    code: "PHY-208", subject: "Physics", topic: "Oscillations", difficulty: "medium",
    questionText: "When two identical tuning forks of frequency 256 Hz are sounded together, 4 beats per second are heard. The frequency of the second fork could be:",
    questionTextTamil: "256 Hz அதிர்வெண் கொண்ட ஒரு இசைக்கவையுடன் மற்றொரு இசைக்கவை ஒலிக்கப்படும் போது வினாடிக்கு 4 துடிப்புகள் தோன்றினால் இரண்டாவது இசைக்கவையின் அதிர்வெண்:",
    options: [
      { label: "A", text: "252 Hz or 260 Hz" }, { label: "B", text: "254 Hz only" }, { label: "C", text: "258 Hz only" }, { label: "D", text: "512 Hz" }
    ],
    optionsTamil: [
      { label: "A", text: "252 Hz அல்லது 260 Hz" }, { label: "B", text: "254 Hz மட்டும்" }, { label: "C", text: "258 Hz மட்டும்" }, { label: "D", text: "512 Hz" }
    ],
    correctAnswer: "A",
    explanation: "Beat frequency f_beat = |f₁ - f₂| => 4 = |256 - f₂| => f₂ = 252 Hz or 260 Hz.",
    explanationTamil: "துடிப்பு அதிர்வெண் = |f₁ - f₂| = 4 => f₂ = 256 ± 4 = 252 அல்லது 260 Hz."
  },
  {
    code: "PHY-209", subject: "Physics", topic: "Waves", difficulty: "easy",
    questionText: "The apparent change in frequency of sound heard by an observer due to relative motion between source and observer is called:",
    questionTextTamil: "ஒலி மூலம் மற்றும் கேட்பவருக்கு இடையே உள்ள சார்பியக்கம் காரணமாக அதிர்வெண்ணில் ஏற்படும் தோற்ற மாற்றம் எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Doppler effect" }, { label: "B", text: "Raman effect" }, { label: "C", text: "Compton effect" }, { label: "D", text: "Tyndall effect" }
    ],
    optionsTamil: [
      { label: "A", text: "டாப்ளர் விளைவு (Doppler effect)" }, { label: "B", text: "ராமன் விளைவு" }, { label: "C", text: "காம்டன் விளைவு" }, { label: "D", text: "டிண்டால் விளைவு" }
    ],
    correctAnswer: "A",
    explanation: "Doppler effect describes apparent shift in sound or light frequency due to relative velocity.",
    explanationTamil: "டாப்ளர் விளைவு சார்பியக்கத்தினால் ஏற்படும் அலை அதிர்வெண் மாற்றத்தை விளக்குகிறது."
  },
  {
    code: "PHY-210", subject: "Physics", topic: "Mechanics", difficulty: "easy",
    questionText: "Moment of inertia I of a uniform solid sphere of mass M and radius R about its diameter is:",
    questionTextTamil: "M நிறை மற்றும் R ஆரம் கொண்ட திண்மக் கோளத்தின் விட்டத்தைப் பற்றிய நிலைமத் திருப்புத்திறன்:",
    options: [
      { label: "A", text: "(2/5) M R²" }, { label: "B", text: "(2/3) M R²" }, { label: "C", text: "(1/2) M R²" }, { label: "D", text: "M R²" }
    ],
    optionsTamil: [
      { label: "A", text: "(2/5) M R²" }, { label: "B", text: "(2/3) M R² (உள்ளீடற்ற கோளம்)" }, { label: "C", text: "(1/2) M R²" }, { label: "D", text: "M R²" }
    ],
    correctAnswer: "A",
    explanation: "For solid sphere, I_dia = (2/5) M R².",
    explanationTamil: "திண்மக் கோளத்தின் நிலைமத் திருப்புத்திறன் I = (2/5) M R² ஆகும்."
  },
  {
    code: "PHY-211", subject: "Physics", topic: "Mechanics", difficulty: "easy",
    questionText: "Law of conservation of angular momentum states that if external torque is zero:",
    questionTextTamil: "கோண உந்த மாறா விதிப்படி அமைப்பின் மீதான புற திருப்புவிசை சுழியாக இருந்தால்:",
    options: [
      { label: "A", text: "L = I ω = constant" }, { label: "B", text: "I = constant" }, { label: "C", text: "ω = constant" }, { label: "D", text: "I / ω = constant" }
    ],
    optionsTamil: [
      { label: "A", text: "L = I ω = மாறிலி" }, { label: "B", text: "I = மாறிலி" }, { label: "C", text: "ω = மாறிலி" }, { label: "D", text: "I / ω = மாறிலி" }
    ],
    correctAnswer: "A",
    explanation: "When net external torque τ = dL/dt = 0, angular momentum L = I ω is conserved.",
    explanationTamil: "புற திருப்புவிசை சுழி எனில் கோண உந்தம் L = I ω மாறிலியாக இருக்கும்."
  },
  {
    code: "PHY-212", subject: "Physics", topic: "Mechanics", difficulty: "easy",
    questionText: "Work done by a centripetal force in moving a body along a circular path is:",
    questionTextTamil: "வட்டப்பாதையில் ஒரு பொருளை இயக்கும் மையநோக்கு விசை செய்யும் வேலை:",
    options: [
      { label: "A", text: "Zero" }, { label: "B", text: "Positive" }, { label: "C", text: "Negative" }, { label: "D", text: "Infinite" }
    ],
    optionsTamil: [
      { label: "A", text: "சுழி (Zero)" }, { label: "B", text: "நேர்மதிப்பு" }, { label: "C", text: "எதிர்மதிப்பு" }, { label: "D", text: "முடிவிலி" }
    ],
    correctAnswer: "A",
    explanation: "Centripetal force is always perpendicular to displacement (θ = 90°), so W = F d cos 90° = 0.",
    explanationTamil: "விசையும் இடப்பெயர்ச்சியும் செங்குத்தாக (90°) இருப்பதால் வேலை W = F d cos 90° = 0."
  },
  {
    code: "PHY-213", subject: "Physics", topic: "Mechanics", difficulty: "medium",
    questionText: "A body of mass 2 kg moving with velocity 4 m/s collides head-on with a stationary body of mass 2 kg and sticks to it. Their common velocity after collision is:",
    questionTextTamil: "4 மீ/வி வேகத்தில் செல்லும் 2 கிகி நிறை கொண்ட பொருள், ஓய்விலுள்ள 2 கிகி நிறையுடன் மோதி ஒட்டிக்கொண்டால் மோதலுக்குப் பின் அவற்றின் பொதுவான திசைவேகம்:",
    options: [
      { label: "A", text: "2 m/s" }, { label: "B", text: "4 m/s" }, { label: "C", text: "1 m/s" }, { label: "D", text: "Zero" }
    ],
    optionsTamil: [
      { label: "A", text: "2 மீ/வி" }, { label: "B", text: "4 மீ/வி" }, { label: "C", text: "1 மீ/வி" }, { label: "D", text: "சுழி" }
    ],
    correctAnswer: "A",
    explanation: "Conservation of momentum: (2 kg)(4 m/s) + 0 = (2 + 2) v => 8 = 4v => v = 2 m/s.",
    explanationTamil: "உந்த மாறா விதிப்படி: 2 × 4 = (2 + 2) v => v = 8/4 = 2 மீ/வி."
  },
  {
    code: "PHY-214", subject: "Physics", topic: "Thermodynamics", difficulty: "easy",
    questionText: "Absolute zero temperature (0 K) corresponds to Celsius temperature of:",
    questionTextTamil: "தனிச்சுழி வெப்பநிலை (0 K) என்பது எத்தனை செல்சியஸ் (°C) வெப்பநிலைக்கு சமம்?",
    options: [
      { label: "A", text: "- 273.15 °C" }, { label: "B", text: "0 °C" }, { label: "C", text: "+ 273.15 °C" }, { label: "D", text: "- 100 °C" }
    ],
    optionsTamil: [
      { label: "A", text: "- 273.15 °C" }, { label: "B", text: "0 °C" }, { label: "C", text: "+ 273.15 °C" }, { label: "D", text: "- 100 °C" }
    ],
    correctAnswer: "A",
    explanation: "T(°C) = T(K) - 273.15 => 0 K = - 273.15 °C.",
    explanationTamil: "0 K தனிச்சுழி வெப்பநிலை = - 273.15 °C ஆகும்."
  },
  {
    code: "PHY-215", subject: "Physics", topic: "Modern Physics", difficulty: "easy",
    questionText: "Raman effect involves which type of light scattering?",
    questionTextTamil: "சர் சி.வி. ராமன் கண்டறிந்த ராமன் விளைவு எந்த வகை ஒளிச்சிதறலை அடிப்படையாகக் கொண்டது?",
    options: [
      { label: "A", text: "Inelastic scattering of photons by molecules" },
      { label: "B", text: "Elastic scattering" },
      { label: "C", text: "Total reflection" },
      { label: "D", text: "Compton scattering by free electrons" }
    ],
    optionsTamil: [
      { label: "A", text: "மூலக்கூறுகளால் ஏற்படும் மீட்சியற்ற ஒளிச்சிதறல் (Inelastic scattering)" },
      { label: "B", text: "மீட்சிச் சிதறல்" },
      { label: "C", text: "முழு எதிரொளிப்பு" },
      { label: "D", text: "காம்டன் சிதறல்" }
    ],
    correctAnswer: "A",
    explanation: "Raman effect is the inelastic scattering of light by molecules, changing photon frequency (Stokes and anti-Stokes lines).",
    explanationTamil: "ராமன் விளைவு என்பது மூலக்கூறுகளால் நிகழும் மீட்சியற்ற ஒளிச்சிதறல் ஆகும் (நோபல் பரிசு 1930)."
  }
];
