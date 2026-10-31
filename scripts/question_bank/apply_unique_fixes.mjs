// scripts/question_bank/apply_unique_fixes.mjs
import fs from 'fs';
import { physicsPart4 } from './physics_part4.mjs';
import { physicsPart5 } from './physics_part5.mjs';
import { chemistryPart4 } from './chemistry_part4.mjs';
import { chemistryPart5 } from './chemistry_part5.mjs';
import { biologyPart5 } from './biology_part5.mjs';

const fixes = {
  "PHY-273": {
    code: "PHY-273", subject: "Physics", chapter: "Mechanics", topic: "Fluid Dynamics", difficulty: "easy",
    questionText: "Venturi-meter used to measure the rate of liquid flow through a pipe works on the principle of:",
    questionTextTamil: "குழாய் வழியே பாயும் திரவத்தின் பாய்வு வீதத்தை அளவிடப் பயன்படும் வெஞ்சுரி-மானி எந்த தத்துவத்தின் அடிப்படையில் செயல்படுகிறது?",
    options: [
      { label: "A", text: "Bernoulli's theorem" },
      { label: "B", text: "Archimedes' principle" },
      { label: "C", text: "Stokes' law" },
      { label: "D", text: "Pascal's law" }
    ],
    optionsTamil: [
      { label: "A", text: "பெர்னோலியின் தேற்றம்" },
      { label: "B", text: "ஆர்க்கிமிடிஸ் தத்துவம்" },
      { label: "C", text: "ஸ்டோக்ஸ் விதி" },
      { label: "D", text: "பாஸ்கல் விதி" }
    ],
    correctAnswer: "A",
    explanation: "Venturi-meter utilizes Bernoulli's principle where speed increases and pressure drops at constrictions to measure flow velocity.",
    explanationTamil: "குழாயின் குறுகிய பகுதியில் திசைவேகம் அதிகரித்து அழுத்தம் குறையும் பெர்னோலியின் தேற்ற அடிப்படையில் வெஞ்சுரி-மானி செயல்படுகிறது."
  },
  "PHY-290": {
    code: "PHY-290", subject: "Physics", chapter: "Heat and Thermodynamics", topic: "Indicator Diagram", difficulty: "medium",
    questionText: "In an indicator diagram (P-V graph), the net mechanical work done during a complete thermodynamic cyclic process is represented by the:",
    questionTextTamil: "அழுத்தம்-பருமன் வரைபடத்தில் (P-V வரைபடம்) ஒரு முழுமையான சுழற்சி செயல்முறையில் செய்யப்பட்ட நிகர வேலை எதனால் குறிக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Area enclosed by the cyclic P-V curve" },
      { label: "B", text: "Slope of the curve at initial state" },
      { label: "C", text: "Area under the curve up to pressure axis only" },
      { label: "D", text: "Perimeter of the closed curve" }
    ],
    optionsTamil: [
      { label: "A", text: "சுழற்சி P-V வளைவரையால் அடைபடும் பரப்பளவு" },
      { label: "B", text: "தொடக்க நிலையில் வளைவரையின் சாய்வு" },
      { label: "C", text: "அழுத்த அச்சு வரை உள்ள பரப்பு" },
      { label: "D", text: "மூடிய வளைவரையின் சுற்றளவு" }
    ],
    correctAnswer: "A",
    explanation: "The integral of P dV over a closed loop equals the geometric area enclosed within the cyclic path on the P-V plane.",
    explanationTamil: "P-V தளத்தில் மூடிய சுழற்சி வளைவரையால் அடைபடும் பரப்பளவே ஒரு முழு சுழற்சியில் செய்யப்பட்ட நிகர வேலைக்கு சமமாகும்."
  },
  "PHY-326": {
    code: "PHY-326", subject: "Physics", chapter: "Current Electricity", topic: "Potentiometer Sensitivity", difficulty: "medium",
    questionText: "The sensitivity of a potentiometer can be effectively increased by:",
    questionTextTamil: "மின்னழுத்தமானியின் (Potentiometer) உணர்திறனை எவ்வாறு திறம்பட அதிகரிக்கலாம்?",
    options: [
      { label: "A", text: "Increasing the length of the potentiometer wire" },
      { label: "B", text: "Decreasing the length of the wire" },
      { label: "C", text: "Increasing the current in the primary circuit" },
      { label: "D", text: "Using a shorter thicker wire" }
    ],
    optionsTamil: [
      { label: "A", text: "மின்னழுத்தமானி கம்பியின் நீளத்தை அதிகரிப்பதன் மூலம்" },
      { label: "B", text: "கம்பியின் நீளத்தை குறைப்பதன் மூலம்" },
      { label: "C", text: "முதன்மை சுற்றில் மின்னோட்டத்தை அதிகரிப்பதன் மூலம்" },
      { label: "D", text: "குறைந்த நீளமுள்ள தடித்த கம்பியைப் பயன்படுத்துவதன் மூலம்" }
    ],
    correctAnswer: "A",
    explanation: "Potential gradient k = V / L. Increasing wire length L reduces k, producing a longer balance length for small voltages and increasing sensitivity.",
    explanationTamil: "மின்னழுத்த சரிவு k = V / L ஆகும். கம்பியின் நீளம் L அதிகரிக்கும் போது மின்னழுத்த சரிவு குறைந்து உணர்திறன் கூடுகிறது."
  },
  "PHY-356": {
    code: "PHY-356", subject: "Physics", chapter: "Magnetism and Matter", topic: "Curie-Weiss Law", difficulty: "easy",
    questionText: "Above the Curie temperature (Tc), a ferromagnetic substance transitions and behaves as a:",
    questionTextTamil: "கியூரி வெப்பநிலைக்கு (Tc) மேல், ஒரு ஃபெர்ரோ காந்தப் பொருள் எவ்வாறாக மாறுகிறது?",
    options: [
      { label: "A", text: "Paramagnetic substance" },
      { label: "B", text: "Diamagnetic substance" },
      { label: "C", text: "Ferrimagnetic substance" },
      { label: "D", text: "Superconductor" }
    ],
    optionsTamil: [
      { label: "A", text: "பாரா காந்தப் பொருள்" },
      { label: "B", text: "டயா காந்தப் பொருள்" },
      { label: "C", text: "ஃபெர்ரி காந்தப் பொருள்" },
      { label: "D", text: "மீக்கடத்தி" }
    ],
    correctAnswer: "A",
    explanation: "Thermal agitation above Curie temperature disrupts domain orientation, turning ferromagnets into paramagnets obeying chi = C / (T - Tc).",
    explanationTamil: "கியூரி வெப்பநிலைக்கு மேல் வெப்ப அதிர்வினால் டொமைன்கள் சிதைந்து ஃபெர்ரோ காந்தப் பொருள் பாரா காந்தப் பொருளாக மாறுகிறது."
  },
  "PHY-362": {
    code: "PHY-362", subject: "Physics", chapter: "Wave Optics", topic: "Malus's Law", difficulty: "medium",
    questionText: "According to Malus's law, the intensity I of linearly polarized light transmitted through an analyzer is given by:",
    questionTextTamil: "மாலஸ் விதியின்படி (Malus's law), பகுப்பாய்வி வழியே வெளிவரும் தளவிளைவுற்ற ஒளியின் செறிவு I என்பது:",
    options: [
      { label: "A", text: "I = I0 * cos^2(theta)" },
      { label: "B", text: "I = I0 * cos(theta)" },
      { label: "C", text: "I = I0 * sin^2(theta)" },
      { label: "D", text: "I = I0 * tan(theta)" }
    ],
    optionsTamil: [
      { label: "A", text: "I = I0 * cos^2(theta)" },
      { label: "B", text: "I = I0 * cos(theta)" },
      { label: "C", text: "I = I0 * sin^2(theta)" },
      { label: "D", text: "I = I0 * tan(theta)" }
    ],
    correctAnswer: "A",
    explanation: "Malus's law states that transmitted intensity is proportional to square of cosine of angle between transmission axes: I = I0 cos^2 theta.",
    explanationTamil: "மாலஸ் விதியின்படி வெளிவரும் ஒளியின் செறிவு I = I0 cos^2(theta) ஆகும்."
  },
  "PHY-368": {
    code: "PHY-368", subject: "Physics", chapter: "Dual Nature of Radiation and Matter", topic: "De Broglie Wavelength", difficulty: "medium",
    questionText: "The de Broglie wavelength lambda of an electron accelerated from rest across an electric potential difference of V volts is approximately:",
    questionTextTamil: "V வோல்ட் மின்னழுத்த வேறுபாட்டில் ஓய்வு நிலையிலிருந்து முடுக்கப்படும் எலக்ட்ரானின் டி பிராய் அலைநீளம் lambda தோராயமாக:",
    options: [
      { label: "A", text: "12.27 / sqrt(V) Angstroms (or 1.227 / sqrt(V) nm)" },
      { label: "B", text: "12.27 * sqrt(V) Angstroms" },
      { label: "C", text: "sqrt(V) / 12.27 Angstroms" },
      { label: "D", text: "1.227 * V nm" }
    ],
    optionsTamil: [
      { label: "A", text: "12.27 / sqrt(V) Angstrom (அல்லது 1.227 / sqrt(V) nm)" },
      { label: "B", text: "12.27 * sqrt(V) Angstrom" },
      { label: "C", text: "sqrt(V) / 12.27 Angstrom" },
      { label: "D", text: "1.227 * V nm" }
    ],
    correctAnswer: "A",
    explanation: "lambda = h / p = h / sqrt(2m e V) = 1.227 / sqrt(V) nm = 12.27 / sqrt(V) Angstroms.",
    explanationTamil: "முடுக்கப்பட்ட எலக்ட்ரானின் டி பிராய் அலைநீளம் lambda = 12.27 / sqrt(V) Angstrom ஆகும்."
  },
  "CHE-290": {
    code: "CHE-290", subject: "Chemistry", chapter: "Coordination Compounds", topic: "Chelate Effect", difficulty: "medium",
    questionText: "Metal complexes containing polydentate chelating ligands are significantly more thermodynamically stable than complexes with unidentate ligands. This is known as the:",
    questionTextTamil: "பலமுனை பிணைப்பு ஈனிகளைக் கொண்ட அணைவுச் சேர்மங்கள் ஒருமுனை ஈனி சேர்மங்களை விட அதிக வெப்ப இயக்கவியல் நிலைப்புத்தன்மை கொண்டிருப்பது:",
    options: [
      { label: "A", text: "Chelate effect" },
      { label: "B", text: "Jahn-Teller effect" },
      { label: "C", text: "Trans effect" },
      { label: "D", text: "Inductive effect" }
    ],
    optionsTamil: [
      { label: "A", text: "கீலேட் விளைவு (Chelate effect)" },
      { label: "B", text: "ஜான்-டெல்லர் விளைவு" },
      { label: "C", text: "டிரான்ஸ் விளைவு" },
      { label: "D", text: "தூண்டல் விளைவு" }
    ],
    correctAnswer: "A",
    explanation: "Chelic ring formation increases entropy (Delta S > 0) due to release of bound water molecules, enhancing stability.",
    explanationTamil: "கீலேட் வளையம் உருவாவதால் என்ட்ரோபி அதிகரித்து அணைவுச் சேர்மத்தின் நிலைப்புத்தன்மை கூடுகிறது."
  },
  "CHE-291": {
    code: "CHE-291", subject: "Chemistry", chapter: "Coordination Compounds", topic: "Crystal Field Splitting", difficulty: "medium",
    questionText: "In an octahedral coordination entity, the crystal field splitting energy Delta_o corresponds to an energy difference of:",
    questionTextTamil: "எண்முகி அணைவுச் சேர்மத்தில் t2g மற்றும் eg ஆர்பிட்டால்களுக்கு இடையேயான படிக புல பிளப்பு ஆற்றல் Delta_o எதற்கு சமம்?",
    options: [
      { label: "A", text: "10 Dq" },
      { label: "B", text: "4 Dq" },
      { label: "C", text: "6 Dq" },
      { label: "D", text: "2 Dq" }
    ],
    optionsTamil: [
      { label: "A", text: "10 Dq" },
      { label: "B", text: "4 Dq" },
      { label: "C", text: "6 Dq" },
      { label: "D", text: "2 Dq" }
    ],
    correctAnswer: "A",
    explanation: "Octahedral splitting Delta_o = 10 Dq, where t2g is stabilized by -0.4 Delta_o (-4 Dq) and eg is destabilized by +0.6 Delta_o (+6 Dq).",
    explanationTamil: "எண்முகி படிக புலத்தில் பிளப்பு ஆற்றல் Delta_o = 10 Dq ஆகும்."
  },
  "CHE-346": {
    code: "CHE-346", subject: "Chemistry", chapter: "Amines", topic: "Carbylamine Reaction Mechanism", difficulty: "medium",
    questionText: "In the carbylamine test for primary amines using chloroform and alcoholic KOH, the reactive electrophilic intermediate is:",
    questionTextTamil: "குளோரோஃபார்ம் மற்றும் ஆல்கஹால் KOH பயன்படுத்தும் கார்பைலமீன் சோதனையில் உருவாகும் வினைபடு எலக்ட்ரான் கவர் இடைநிலை எது?",
    options: [
      { label: "A", text: "Dichlorocarbene (:CCl2)" },
      { label: "B", text: "Trichloromethyl anion (:CCl3^-)" },
      { label: "C", text: "Chloronium ion (Cl^+)" },
      { label: "D", text: "Methyl carbocation" }
    ],
    optionsTamil: [
      { label: "A", text: "டைகுளோரோகார்பீன் (:CCl2)" },
      { label: "B", text: "ட்ரைகுளோரோமீத்தைல் எதிர் அயனி" },
      { label: "C", text: "குளோரோனியம் அயனி" },
      { label: "D", text: "மெத்தில் கார்போகேஷன்" }
    ],
    correctAnswer: "A",
    explanation: "Base deprotonates chloroform followed by alpha-elimination of Cl- generating singlet dichlorocarbene (:CCl2) which attacks primary amines.",
    explanationTamil: "குளோரோஃபார்மிலிருந்து ஆல்ஃபா-நீக்க முறையில் உருவாகும் டைகுளோரோகார்பீன் (:CCl2) ஓரிணைய அமீனைத் தாக்கி ஐசோசயனைடைத் தருகிறது."
  },
  "CHE-365": {
    code: "CHE-365", subject: "Chemistry", chapter: "Biomolecules", topic: "Vitamins Deficiency Rickets", difficulty: "easy",
    questionText: "Deficiency of Vitamin D (calciferol) causes which childhood bone disease characterized by soft, curved bones?",
    questionTextTamil: "வைட்டமின் D (கால்சிஃபெரால்) குறைபாட்டினால் குழந்தைகளுக்கு எலும்புகள் மென்மையாகி வளையும் நோய் எது?",
    options: [
      { label: "A", text: "Rickets" },
      { label: "B", text: "Scurvy" },
      { label: "C", text: "Pellagra" },
      { label: "D", text: "Beri-beri" }
    ],
    optionsTamil: [
      { label: "A", text: "ரிக்கெட்ஸ் (Rickets)" },
      { label: "B", text: "ஸ்கர்வி" },
      { label: "C", text: "பெல்லாக்ரா" },
      { label: "D", text: "பெரி-பெரி" }
    ],
    correctAnswer: "A",
    explanation: "Vitamin D regulates calcium absorption in bones; its deficiency impairs mineralization leading to rickets in children and osteomalacia in adults.",
    explanationTamil: "வைட்டமின் D குறைபாட்டினால் கால்சியம் உறிஞ்சுதல் குறைந்து குழந்தைகளுக்கு ரிக்கெட்ஸ் நோய் உண்டாகிறது."
  },
  "CHE-369": {
    code: "CHE-369", subject: "Chemistry", chapter: "Polymers", topic: "Buna-S Rubber", difficulty: "medium",
    questionText: "Buna-S (Styrene-Butadiene Rubber) is an addition copolymer synthesized by the polymerization of:",
    questionTextTamil: "பியூனா-S (ஸ்டைரீன்-பியூட்டாடையீன் ரப்பர்) எந்த இரு ஒற்றைப்படிகளின் பாலிமராக்கலால் பெறப்படும் சேர்க்கை துணை பாலிமர் ஆகும்?",
    options: [
      { label: "A", text: "1,3-Butadiene and Styrene in 3:1 ratio" },
      { label: "B", text: "1,3-Butadiene and Acrylonitrile" },
      { label: "C", text: "Isoprene and Isobutylene" },
      { label: "D", text: "Chloroprene only" }
    ],
    optionsTamil: [
      { label: "A", text: "1,3-பியூட்டாடையீன் மற்றும் ஸ்டைரீன் (3:1 விகிதத்தில்)" },
      { label: "B", text: "1,3-பியூட்டாடையீன் மற்றும் அக்ரிலோநைட்ரைல்" },
      { label: "C", text: "ஐசோப்ரீன் மற்றும் ஐசோபியூட்டிலீன்" },
      { label: "D", text: "குளோரோப்ரீன் மட்டுமே" }
    ],
    correctAnswer: "A",
    explanation: "Buna-S is copolymerized from 1,3-butadiene and styrene in the presence of sodium catalyst (Bu = Butadiene, Na = Sodium, S = Styrene).",
    explanationTamil: "சோடியம் வினையூக்கி முன்னிலையில் 1,3-பியூட்டாடையீன் மற்றும் ஸ்டைரீன் இணைந்து பியூனா-S ரப்பரை உருவாக்குகின்றன."
  },
  "BIO-325": {
    code: "BIO-325", subject: "Biology", chapter: "Organisms and Populations", topic: "Competitive Release", difficulty: "medium",
    questionText: "Connell's field experiments on the rocky sea coast of Scotland demonstrated that the larger barnacle Balanus excluded the smaller barnacle Chthamalus from the intertidal zone. This phenomenon is known as:",
    questionTextTamil: "ஸ்காட்லாந்து பாறை கடற்கரைகளில் கானல் செய்த கள சோதனைகளில் பெரிய பாலனஸ் சிப்பிகள் சிறிய தாமலஸ் சிப்பிகளை பாறைப் பகுதியிலிருந்து வெளியேற்றிய நிகழ்வு எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Competitive release / Competitive exclusion" },
      { label: "B", text: "Mutualism" },
      { label: "C", text: "Commensalism" },
      { label: "D", text: "Amensalism" }
    ],
    optionsTamil: [
      { label: "A", text: "போட்டி வெளியேற்றம் / போட்டி தளர்வு (Competitive release)" },
      { label: "B", text: "கூட்டுயிர் வாழ்க்கை" },
      { label: "C", text: "உடன் உண்ணும் வாழ்க்கை" },
      { label: "D", text: "அமென்சாலிசம்" }
    ],
    correctAnswer: "A",
    explanation: "Removing the competitively superior Balanus allowed Chthamalus to expand its niche, demonstrating competitive exclusion and release in natural populations.",
    explanationTamil: "வலிமையான பாலனஸ் சிப்பிகள் அகற்றப்பட்ட போது தாமலஸ் சிப்பிகள் பரவியது இயற்கை போட்டி வெளியேற்றத்திற்கு சிறந்த சான்றாகும்."
  },
  "BIO-328": {
    code: "BIO-328", subject: "Biology", chapter: "Organisms and Populations", topic: "Sexual Deceit in Ophrys", difficulty: "medium",
    questionText: "The Mediterranean orchid Ophrys employs 'sexual deceit' to achieve cross-pollination by mimicking:",
    questionTextTamil: "மத்திய தரைக்கடல் ஆர்க்கிட் மலரான ஆப்ரிஸ் (Ophrys) அயல் மகரந்தச் சேர்க்கை நிகழ்த்த எதனைப் பிரதிபலித்து பாலியல் ஏமாற்று (sexual deceit) செய்கிறது?",
    options: [
      { label: "A", text: "Female Colpa bee in size, color markings, and pheromone scent (pseudocopulation)" },
      { label: "B", text: "Nectar of other flowers only" },
      { label: "C", text: "Pollen grain clusters of roses" },
      { label: "D", text: "A rival male bee" }
    ],
    optionsTamil: [
      { label: "A", text: "பெண் கோல்பா தேனீயின் அளவு, நிற வரிகள் மற்றும் பெரோமோன் வாசனை (போலி புணர்ச்சி)" },
      { label: "B", text: "மலர்களின் தேன் சுவை மட்டுமே" },
      { label: "C", text: "ரோஜாவின் மகரந்த கொத்துகள்" },
      { label: "D", text: "எதிர் ஆண் தேனீயின் தோற்றம்" }
    ],
    correctAnswer: "A",
    explanation: "Ophrys petal mimics the female bee so accurately that male bees pseudocopulate with it, picking up pollinia and depositing them on the next flower.",
    explanationTamil: "ஆப்ரிஸ் மலரின் ஒரு இதழ் பெண் தேனீயைப் போலவே தோற்றமளித்து ஆண் தேனீயை ஏமாற்றி போலி புணர்ச்சி மூலம் மகரந்தச் சேர்க்கை செய்கிறது."
  }
};

function updateArray(arr, file, varName) {
  for (const q of arr) {
    if (fixes[q.code]) {
      Object.assign(q, fixes[q.code]);
      console.log(`Updated ${q.code}`);
    }
  }
  const content = `// ${file}\nexport const ${varName} = ${JSON.stringify(arr, null, 2)};\n`;
  fs.writeFileSync(file, content, 'utf8');
}

updateArray(physicsPart4, 'scripts/question_bank/physics_part4.mjs', 'physicsPart4');
updateArray(physicsPart5, 'scripts/question_bank/physics_part5.mjs', 'physicsPart5');
updateArray(chemistryPart4, 'scripts/question_bank/chemistry_part4.mjs', 'chemistryPart4');
updateArray(chemistryPart5, 'scripts/question_bank/chemistry_part5.mjs', 'chemistryPart5');
updateArray(biologyPart5, 'scripts/question_bank/biology_part5.mjs', 'biologyPart5');

console.log("All 13 duplicate questions updated successfully!");
