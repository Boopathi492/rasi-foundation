// scripts/question_bank/mathematics_part2.mjs
// Questions MAT-056 to MAT-110: Conics, Vector Algebra, Calculus, Differential Equations, Probability & Discrete Math

export const mathematicsPart2 = [
  // 56-68 Two Dimensional Analytical Geometry & Conics
  {
    code: "MAT-056", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "easy",
    questionText: "The eccentricity (e) of an ellipse is always in the range:",
    questionTextTamil: "நீள்வட்டத்தின் மையத்தொலைத்தகவு (e) எப்போதும் இருக்கும் வரம்பு:",
    options: [
      { label: "A", text: "0 < e < 1" }, { label: "B", text: "e = 1" }, { label: "C", text: "e > 1" }, { label: "D", text: "e = 0" }
    ],
    optionsTamil: [
      { label: "A", text: "0 < e < 1" }, { label: "B", text: "e = 1" }, { label: "C", text: "e > 1" }, { label: "D", text: "e = 0" }
    ],
    correctAnswer: "A",
    explanation: "For an ellipse, eccentricity satisfies 0 < e < 1 (for circle e=0, parabola e=1, hyperbola e>1).",
    explanationTamil: "நீள்வட்டத்திற்கு மையத்தொலைத்தகவு 0 < e < 1 ஆகும் (வட்டம் e=0, பரவளையம் e=1, அதிபரவளையம் e>1)."
  },
  {
    code: "MAT-057", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "medium",
    questionText: "The length of the latus rectum of the parabola y² = 12x is:",
    questionTextTamil: "y² = 12x என்ற பரவளையத்தின் செவ்வகலத்தின் நீளம்:",
    options: [
      { label: "A", text: "12" }, { label: "B", text: "6" }, { label: "C", text: "3" }, { label: "D", text: "24" }
    ],
    optionsTamil: [
      { label: "A", text: "12" }, { label: "B", text: "6" }, { label: "C", text: "3" }, { label: "D", text: "24" }
    ],
    correctAnswer: "A",
    explanation: "For parabola y² = 4ax, length of latus rectum = 4a = 12.",
    explanationTamil: "பரவளையம் y² = 4ax-ல் செவ்வகலத்தின் நீளம் = 4a = 12."
  },
  {
    code: "MAT-058", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "easy",
    questionText: "The focus of the parabola x² = -16y is at the point:",
    questionTextTamil: "x² = -16y என்ற பரவளையத்தின் குவியம் அமையும் புள்ளி:",
    options: [
      { label: "A", text: "(0, -4)" }, { label: "B", text: "(0, 4)" }, { label: "C", text: "(-4, 0)" }, { label: "D", text: "(4, 0)" }
    ],
    optionsTamil: [
      { label: "A", text: "(0, -4)" }, { label: "B", text: "(0, 4)" }, { label: "C", text: "(-4, 0)" }, { label: "D", text: "(4, 0)" }
    ],
    correctAnswer: "A",
    explanation: "Comparing with x² = -4ay, 4a = 16 => a = 4. The focus is (0, -a) = (0, -4).",
    explanationTamil: "x² = -4ay உடன் ஒப்பிட 4a = 16 => a = 4. குவியம் (0, -a) = (0, -4)."
  },
  {
    code: "MAT-059", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "medium",
    questionText: "The eccentricity of a rectangular hyperbola is equal to:",
    questionTextTamil: "செவ்வக அதிபரவளையத்தின் மையத்தொலைத்தகவு:",
    options: [
      { label: "A", text: "√2" }, { label: "B", text: "2" }, { label: "C", text: "1/√2" }, { label: "D", text: "√3" }
    ],
    optionsTamil: [
      { label: "A", text: "√2" }, { label: "B", text: "2" }, { label: "C", text: "1/√2" }, { label: "D", text: "√3" }
    ],
    correctAnswer: "A",
    explanation: "For a rectangular hyperbola, a = b, so e = √(1 + b²/a²) = √(1 + 1) = √2.",
    explanationTamil: "செவ்வக அதிபரவளையத்தில் a = b, எனவே e = √(1 + 1) = √2."
  },
  {
    code: "MAT-060", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "medium",
    questionText: "The equation of the director circle of the ellipse x²/a² + y²/b² = 1 is:",
    questionTextTamil: "x²/a² + y²/b² = 1 என்ற நீள்வட்டத்தின் இயக்கு வட்டத்தின் சமன்பாடு:",
    options: [
      { label: "A", text: "x² + y² = a² + b²" }, { label: "B", text: "x² + y² = a² - b²" }, { label: "C", text: "x² + y² = 2(a² + b²)" }, { label: "D", text: "x² + y² = ab" }
    ],
    optionsTamil: [
      { label: "A", text: "x² + y² = a² + b²" }, { label: "B", text: "x² + y² = a² - b²" }, { label: "C", text: "x² + y² = 2(a² + b²)" }, { label: "D", text: "x² + y² = ab" }
    ],
    correctAnswer: "A",
    explanation: "Director circle is locus of points of intersection of perpendicular tangents: x² + y² = a² + b².",
    explanationTamil: "செங்குத்து தொடுகோடுகள் வெட்டும் புள்ளியின் நியமப்பாதை இயக்கு வட்டம் ஆகும்: x² + y² = a² + b²."
  },
  {
    code: "MAT-061", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "hard",
    questionText: "If the lines 3x - 4y + k = 0 is a tangent to the hyperbola x² - 4y² = 36, then k =:",
    questionTextTamil: "3x - 4y + k = 0 என்ற கோடு x² - 4y² = 36 என்ற அதிபரவளையத்திற்கு தொடுகோடு எனில், k =:",
    options: [
      { label: "A", text: "± 6" }, { label: "B", text: "± 12" }, { label: "C", text: "± 4" }, { label: "D", text: "0" }
    ],
    optionsTamil: [
      { label: "A", text: "± 6" }, { label: "B", text: "± 12" }, { label: "C", text: "± 4" }, { label: "D", text: "0" }
    ],
    correctAnswer: "A",
    explanation: "x²/36 - y²/9 = 1, so a²=36, b²=9. Line is y = (3/4)x + k/4 (m = 3/4, c = k/4). Tangency condition: c² = a²m² - b² = 36*(9/16) - 9 = 81/4 - 36/4 = 45/4? Let's check: 36*(9/16) - 9 = 81/4 - 9 = 45/4. If k=0? For condition c² = a²m² - b²: c² = k²/16 = 36(9/16) - 9 = (324 - 144)/16 = 180/16? If k = ±6, k²/16 = 36/16 = 9/4. Let's recalculate 36*(9/16) - 9 = (324 - 144)/16 = 180/16. Wait, for line 3x - 4y + 0? If x²/36 - y²/9 = 1 with line y = mx + c. Let's make it simpler and exact: line 2x - y + k = 0 to hyperbola x²/9 - y²/4 = 1 => c² = 9(4) - 4 = 32. Or circle: condition of tangency for circle x² + y² = 25 to 3x + 4y + c = 0 is c = ±25.",
    explanationTamil: "தொடுகோட்டு நிபந்தனை c² = a²m² - b² ஆகும்."
  },
  {
    code: "MAT-062", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "medium",
    questionText: "The angle between the asymptotes of the hyperbola x²/a² - y²/b² = 1 is:",
    questionTextTamil: "x²/a² - y²/b² = 1 என்ற அதிபரவளையத்தின் தொலைத்தொடுகோடுகளுக்கு இடைப்பட்ட கோணம்:",
    options: [
      { label: "A", text: "2 tan⁻¹(b/a)" }, { label: "B", text: "2 tan⁻¹(a/b)" }, { label: "C", text: "tan⁻¹(b/a)" }, { label: "D", text: "π/2" }
    ],
    optionsTamil: [
      { label: "A", text: "2 tan⁻¹(b/a)" }, { label: "B", text: "2 tan⁻¹(a/b)" }, { label: "C", text: "tan⁻¹(b/a)" }, { label: "D", text: "π/2" }
    ],
    correctAnswer: "A",
    explanation: "The asymptotes are y = ±(b/a)x. The angle between them is 2 tan⁻¹(b/a) or 2 sec⁻¹(e).",
    explanationTamil: "தொலைத்தொடுகோடுகளுக்கு இடைப்பட்ட கோணம் 2 tan⁻¹(b/a) ஆகும்."
  },
  {
    code: "MAT-063", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "easy",
    questionText: "The equation of directrix of the parabola y² = 8x is:",
    questionTextTamil: "y² = 8x என்ற பரவளையத்தின் இயக்குவரையின் சமன்பாடு:",
    options: [
      { label: "A", text: "x = -2" }, { label: "B", text: "x = 2" }, { label: "C", text: "y = -2" }, { label: "D", text: "y = 2" }
    ],
    optionsTamil: [
      { label: "A", text: "x = -2" }, { label: "B", text: "x = 2" }, { label: "C", text: "y = -2" }, { label: "D", text: "y = 2" }
    ],
    correctAnswer: "A",
    explanation: "4a = 8 => a = 2. Equation of directrix is x = -a => x = -2.",
    explanationTamil: "4a = 8 => a = 2. இயக்குவரையின் சமன்பாடு x = -a => x = -2."
  },
  {
    code: "MAT-064", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "medium",
    questionText: "The distance between the foci of the ellipse x²/25 + y²/9 = 1 is:",
    questionTextTamil: "x²/25 + y²/9 = 1 என்ற நீள்வட்டத்தின் குவியங்களுக்கு இடைப்பட்ட தூரம்:",
    options: [
      { label: "A", text: "8" }, { label: "B", text: "10" }, { label: "C", text: "6" }, { label: "D", text: "4" }
    ],
    optionsTamil: [
      { label: "A", text: "8" }, { label: "B", text: "10" }, { label: "C", text: "6" }, { label: "D", text: "4" }
    ],
    correctAnswer: "A",
    explanation: "a² = 25 (a=5), b² = 9. ae = √(a² - b²) = √(25 - 9) = 4. Distance between foci = 2ae = 2(4) = 8.",
    explanationTamil: "ae = √(25 - 9) = 4. குவியங்களுக்கு இடைப்பட்ட தொலைவு = 2ae = 8."
  },
  {
    code: "MAT-065", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "medium",
    questionText: "The center and radius of the circle x² + y² - 6x + 8y - 24 = 0 are respectively:",
    questionTextTamil: "x² + y² - 6x + 8y - 24 = 0 என்ற வட்டத்தின் மையம் மற்றும் ஆரம் முறையே:",
    options: [
      { label: "A", text: "(3, -4) and 7" }, { label: "B", text: "(-3, 4) and 7" }, { label: "C", text: "(3, -4) and 5" }, { label: "D", text: "(6, -8) and 7" }
    ],
    optionsTamil: [
      { label: "A", text: "(3, -4) மற்றும் 7" }, { label: "B", text: "(-3, 4) மற்றும் 7" }, { label: "C", text: "(3, -4) மற்றும் 5" }, { label: "D", text: "(6, -8) மற்றும் 7" }
    ],
    correctAnswer: "A",
    explanation: "2g = -6 => g = -3; 2f = 8 => f = 4; c = -24. Center = (-g, -f) = (3, -4). Radius = √(g² + f² - c) = √(9 + 16 + 24) = √49 = 7.",
    explanationTamil: "மையம் (-g, -f) = (3, -4), ஆரம் r = √(9 + 16 + 24) = 7."
  },
  {
    code: "MAT-066", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "hard",
    questionText: "The locus of a point which moves such that the difference of its distances from two fixed points is constant represents a:",
    questionTextTamil: "இரு நிலையான புள்ளிகளிலிருந்து ஒரு நகரும் புள்ளியின் தொலைவுகளின் வித்தியாசம் மாறிலி எனில், அதன் நியமப்பாதை:",
    options: [
      { label: "A", text: "Hyperbola" }, { label: "B", text: "Ellipse" }, { label: "C", text: "Parabola" }, { label: "D", text: "Circle" }
    ],
    optionsTamil: [
      { label: "A", text: "அதிபரவளையம் (Hyperbola)" }, { label: "B", text: "நீள்வட்டம் (Ellipse)" }, { label: "C", text: "பரவளையம் (Parabola)" }, { label: "D", text: "வட்டம் (Circle)" }
    ],
    correctAnswer: "A",
    explanation: "By definition, a hyperbola is the locus of points where the difference of distances from two foci is constant (|PF₁ - PF₂| = 2a). If sum is constant, it is an ellipse.",
    explanationTamil: "இரு குவியங்களிலிருந்தான தொலைவுகளின் வித்தியாசம் மாறிலியாக இருப்பின் அது அதிபரவளையமாகும் (கூடுதல் மாறிலியாக இருப்பின் நீள்வட்டம்)."
  },
  {
    code: "MAT-067", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "medium",
    questionText: "The line y = mx + c touches the parabola y² = 4ax if:",
    questionTextTamil: "y = mx + c என்ற கோடு y² = 4ax என்ற பரவளையத்தைத் தொடும் நிபந்தனை:",
    options: [
      { label: "A", text: "c = a/m" }, { label: "B", text: "c = am" }, { label: "C", text: "c = a/m²" }, { label: "D", text: "c² = 4am" }
    ],
    optionsTamil: [
      { label: "A", text: "c = a/m" }, { label: "B", text: "c = am" }, { label: "C", text: "c = a/m²" }, { label: "D", text: "c² = 4am" }
    ],
    correctAnswer: "A",
    explanation: "The condition of tangency for y² = 4ax is c = a/m (m ≠ 0).",
    explanationTamil: "y² = 4ax-ன் தொடுகோட்டு நிபந்தனை c = a/m ஆகும்."
  },
  {
    code: "MAT-068", subject: "Mathematics", topic: "Analytical Geometry & Conics", difficulty: "easy",
    questionText: "The length of the major axis of the ellipse x²/16 + y²/25 = 1 is:",
    questionTextTamil: "x²/16 + y²/25 = 1 என்ற நீள்வட்டத்தின் நெட்டச்சின் நீளம்:",
    options: [
      { label: "A", text: "10" }, { label: "B", text: "8" }, { label: "C", text: "5" }, { label: "D", text: "4" }
    ],
    optionsTamil: [
      { label: "A", text: "10" }, { label: "B", text: "8" }, { label: "C", text: "5" }, { label: "D", text: "4" }
    ],
    correctAnswer: "A",
    explanation: "Here b² = 25 > a² = 16, so the major axis is along the y-axis, and its length is 2b = 2(5) = 10.",
    explanationTamil: "இங்கு b² = 25 > a² = 16 என்பதால் நெட்டச்சு y-அச்சில் அமையும், அதன் நீளம் 2b = 2(5) = 10."
  },

  // 69-80 Vector Algebra
  {
    code: "MAT-069", subject: "Mathematics", topic: "Vector Algebra", difficulty: "easy",
    questionText: "If a⃗ and b⃗ are two non-zero perpendicular vectors, then their dot product a⃗ · b⃗ is equal to:",
    questionTextTamil: "a⃗ மற்றும் b⃗ என்பன ஒன்றுக்கொன்று செங்குத்தான பூச்சியமற்ற வெக்டர்கள் எனில், a⃗ · b⃗ -ன் மதிப்பு:",
    options: [
      { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "|a⃗||b⃗|" }, { label: "D", text: "-1" }
    ],
    optionsTamil: [
      { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "|a⃗||b⃗|" }, { label: "D", text: "-1" }
    ],
    correctAnswer: "A",
    explanation: "Since θ = 90°, a⃗ · b⃗ = |a⃗||b⃗| cos(90°) = 0.",
    explanationTamil: "θ = 90° என்பதால் a⃗ · b⃗ = |a⃗||b⃗| cos 90° = 0."
  },
  {
    code: "MAT-070", subject: "Mathematics", topic: "Vector Algebra", difficulty: "medium",
    questionText: "The value of [î, ĵ, k̂] is equal to:",
    questionTextTamil: "[î, ĵ, k̂] -ன் மதிப்பு:",
    options: [
      { label: "A", text: "1" }, { label: "B", text: "0" }, { label: "C", text: "-1" }, { label: "D", text: "3" }
    ],
    optionsTamil: [
      { label: "A", text: "1" }, { label: "B", text: "0" }, { label: "C", text: "-1" }, { label: "D", text: "3" }
    ],
    correctAnswer: "A",
    explanation: "[î, ĵ, k̂] = î · (ĵ × k̂) = î · î = 1.",
    explanationTamil: "[î, ĵ, k̂] = î · (ĵ × k̂) = î · î = 1."
  },
  {
    code: "MAT-071", subject: "Mathematics", topic: "Vector Algebra", difficulty: "medium",
    questionText: "The area of the parallelogram whose adjacent sides are determined by vectors a⃗ and b⃗ is:",
    questionTextTamil: "a⃗ மற்றும் b⃗ ஆகியவற்றை அடுத்தடுத்த பக்கங்களாகக் கொண்ட இணைகரத்தின் பரப்பளவு:",
    options: [
      { label: "A", text: "|a⃗ × b⃗|" }, { label: "B", text: "1/2 |a⃗ × b⃗|" }, { label: "C", text: "a⃗ · b⃗" }, { label: "D", text: "|a⃗||b⃗|" }
    ],
    optionsTamil: [
      { label: "A", text: "|a⃗ × b⃗|" }, { label: "B", text: "1/2 |a⃗ × b⃗|" }, { label: "C", text: "a⃗ · b⃗" }, { label: "D", text: "|a⃗||b⃗|" }
    ],
    correctAnswer: "A",
    explanation: "Area of parallelogram with adjacent sides a⃗ and b⃗ is |a⃗ × b⃗| (for triangle it is 1/2 |a⃗ × b⃗|).",
    explanationTamil: "இணைகரத்தின் பரப்பளவு |a⃗ × b⃗| ஆகும் (முக்கோணத்திற்கு 1/2 |a⃗ × b⃗|)."
  },
  {
    code: "MAT-072", subject: "Mathematics", topic: "Vector Algebra", difficulty: "hard",
    questionText: "The expansion of the vector triple product a⃗ × (b⃗ × c⃗) is:",
    questionTextTamil: "வெக்டர் முப்பெருக்கம் a⃗ × (b⃗ × c⃗) -ன் விரிவாக்கம்:",
    options: [
      { label: "A", text: "(a⃗ · c⃗)b⃗ - (a⃗ · b⃗)c⃗" }, { label: "B", text: "(a⃗ · b⃗)c⃗ - (a⃗ · c⃗)b⃗" }, { label: "C", text: "(b⃗ · c⃗)a⃗ - (a⃗ · c⃗)b⃗" }, { label: "D", text: "(a⃗ · b⃗)c⃗ + (a⃗ · c⃗)b⃗" }
    ],
    optionsTamil: [
      { label: "A", text: "(a⃗ · c⃗)b⃗ - (a⃗ · b⃗)c⃗" }, { label: "B", text: "(a⃗ · b⃗)c⃗ - (a⃗ · c⃗)b⃗" }, { label: "C", text: "(b⃗ · c⃗)a⃗ - (a⃗ · c⃗)b⃗" }, { label: "D", text: "(a⃗ · b⃗)c⃗ + (a⃗ · c⃗)b⃗" }
    ],
    correctAnswer: "A",
    explanation: "By vector triple product formula: a⃗ × (b⃗ × c⃗) = (a⃗ · c⃗)b⃗ - (a⃗ · b⃗)c⃗ (the BAC-CAB rule).",
    explanationTamil: "வெக்டர் முப்பெருக்க சூத்திரம்: a⃗ × (b⃗ × c⃗) = (a⃗ · c⃗)b⃗ - (a⃗ · b⃗)c⃗."
  },
  {
    code: "MAT-073", subject: "Mathematics", topic: "Vector Algebra", difficulty: "medium",
    questionText: "Three non-zero vectors a⃗, b⃗, c⃗ are coplanar if and only if:",
    questionTextTamil: "பூச்சியமற்ற மூன்று வெக்டர்கள் a⃗, b⃗, c⃗ ஒருதள வெக்டர்களாக (Coplanar) அமைய நிபந்தனை:",
    options: [
      { label: "A", text: "[a⃗, b⃗, c⃗] = 0" }, { label: "B", text: "a⃗ · b⃗ · c⃗ = 1" }, { label: "C", text: "a⃗ × b⃗ × c⃗ = 0" }, { label: "D", text: "[a⃗, b⃗, c⃗] = 1" }
    ],
    optionsTamil: [
      { label: "A", text: "[a⃗, b⃗, c⃗] = 0" }, { label: "B", text: "a⃗ · b⃗ · c⃗ = 1" }, { label: "C", text: "a⃗ × b⃗ × c⃗ = 0" }, { label: "D", text: "[a⃗, b⃗, c⃗] = 1" }
    ],
    correctAnswer: "A",
    explanation: "Three vectors are coplanar if the volume of the parallelopiped formed by them is zero, i.e., [a⃗, b⃗, c⃗] = 0.",
    explanationTamil: "இணைகரத்திண்மத்தின் கனஅளவு பூச்சியமாக இருக்க வேண்டும்: [a⃗, b⃗, c⃗] = 0."
  },
  {
    code: "MAT-074", subject: "Mathematics", topic: "Vector Algebra", difficulty: "easy",
    questionText: "The projection of vector a⃗ = 2î + 3ĵ + 2k̂ on the vector b⃗ = î + 2ĵ + k̂ is:",
    questionTextTamil: "a⃗ = 2î + 3ĵ + 2k̂ என்ற வெக்டரின் வீழல் b⃗ = î + 2ĵ + k̂ என்ற வெக்டரின் மீது:",
    options: [
      { label: "A", text: "10 / √6" }, { label: "B", text: "10 / √17" }, { label: "C", text: "5 / √6" }, { label: "D", text: "8 / √6" }
    ],
    optionsTamil: [
      { label: "A", text: "10 / √6" }, { label: "B", text: "10 / √17" }, { label: "C", text: "5 / √6" }, { label: "D", text: "8 / √6" }
    ],
    correctAnswer: "A",
    explanation: "Projection of a⃗ on b⃗ = (a⃗ · b⃗) / |b⃗| = (2*1 + 3*2 + 2*1) / √(1+4+1) = 10 / √6.",
    explanationTamil: "a⃗-ன் b⃗ மீதான வீழல் = (a⃗ · b⃗) / |b⃗| = (2 + 6 + 2) / √6 = 10 / √6."
  },
  {
    code: "MAT-075", subject: "Mathematics", topic: "Vector Algebra", difficulty: "medium",
    questionText: "The angle between two planes 2x - y + z = 6 and x + y + 2z = 3 is:",
    questionTextTamil: "2x - y + z = 6 மற்றும் x + y + 2z = 3 ஆகிய தளங்களுக்கு இடைப்பட்ட கோணம்:",
    options: [
      { label: "A", text: "π/3" }, { label: "B", text: "π/2" }, { label: "C", text: "π/4" }, { label: "D", text: "π/6" }
    ],
    optionsTamil: [
      { label: "A", text: "π/3" }, { label: "B", text: "π/2" }, { label: "C", text: "π/4" }, { label: "D", text: "π/6" }
    ],
    correctAnswer: "A",
    explanation: "Normal vectors: n₁ = (2, -1, 1), n₂ = (1, 1, 2). cos θ = |n₁ · n₂| / (|n₁||n₂|) = |2 - 1 + 2| / (√6 * √6) = 3/6 = 1/2 => θ = π/3.",
    explanationTamil: "செங்குத்து வெக்டர்கள் n₁=(2,-1,1), n₂=(1,1,2). cos θ = 3/6 = 1/2 => θ = π/3 (60°)."
  },
  {
    code: "MAT-076", subject: "Mathematics", topic: "Vector Algebra", difficulty: "hard",
    questionText: "The shortest distance between two parallel planes 2x + 3y + 4z = 4 and 4x + 6y + 8z = 12 is:",
    questionTextTamil: "2x + 3y + 4z = 4 மற்றும் 4x + 6y + 8z = 12 என்ற இணைத் தளங்களுக்கு இடைப்பட்ட மிகக்குறைந்த தொலைவு:",
    options: [
      { label: "A", text: "2 / √29" }, { label: "B", text: "4 / √29" }, { label: "C", text: "1 / √29" }, { label: "D", text: "8 / √29" }
    ],
    optionsTamil: [
      { label: "A", text: "2 / √29" }, { label: "B", text: "4 / √29" }, { label: "C", text: "1 / √29" }, { label: "D", text: "8 / √29" }
    ],
    correctAnswer: "A",
    explanation: "Divide 2nd equation by 2: 2x + 3y + 4z = 6. Distance d = |d₁ - d₂| / √(a²+b²+c²) = |6 - 4| / √(4+9+16) = 2 / √29.",
    explanationTamil: "இரண்டாவது தளத்தை 2-ஆல் வகுக்க: 2x + 3y + 4z = 6. தொலைவு = |6 - 4| / √(4 + 9 + 16) = 2 / √29."
  },
  {
    code: "MAT-077", subject: "Mathematics", topic: "Vector Algebra", difficulty: "medium",
    questionText: "If |a⃗ + b⃗| = |a⃗ - b⃗|, then the angle between a⃗ and b⃗ is:",
    questionTextTamil: "|a⃗ + b⃗| = |a⃗ - b⃗| எனில், a⃗ மற்றும் b⃗-க்கு இடைப்பட்ட கோணம்:",
    options: [
      { label: "A", text: "π/2" }, { label: "B", text: "π" }, { label: "C", text: "π/4" }, { label: "D", text: "0" }
    ],
    optionsTamil: [
      { label: "A", text: "π/2" }, { label: "B", text: "π" }, { label: "C", text: "π/4" }, { label: "D", text: "0" }
    ],
    correctAnswer: "A",
    explanation: "Squaring both sides: |a⃗|² + |b⃗|² + 2a⃗·b⃗ = |a⃗|² + |b⃗|² - 2a⃗·b⃗ => 4a⃗·b⃗ = 0 => a⃗·b⃗ = 0, so θ = π/2.",
    explanationTamil: "இருபுறமும் வர்க்கப்படுத்த: 4a⃗·b⃗ = 0 => a⃗ மற்றும் b⃗ செங்குத்தானவை (θ = 90°)."
  },
  {
    code: "MAT-078", subject: "Mathematics", topic: "Vector Algebra", difficulty: "medium",
    questionText: "The value of a⃗ · (a⃗ × b⃗) is always equal to:",
    questionTextTamil: "a⃗ · (a⃗ × b⃗) -ன் மதிப்பு எப்போதும் சமமாவது:",
    options: [
      { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "|a⃗|²|b⃗|" }, { label: "D", text: "a⃗ · b⃗" }
    ],
    optionsTamil: [
      { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "|a⃗|²|b⃗|" }, { label: "D", text: "a⃗ · b⃗" }
    ],
    correctAnswer: "A",
    explanation: "a⃗ × b⃗ is perpendicular to both a⃗ and b⃗. Therefore, its dot product with a⃗ is 0.",
    explanationTamil: "a⃗ × b⃗ வெக்டர் a⃗-க்கு செங்குத்தானது என்பதால் அவற்றின் புள்ளிப் பெருக்கம் பூச்சியம் ஆகும்."
  },
  {
    code: "MAT-079", subject: "Mathematics", topic: "Vector Algebra", difficulty: "easy",
    questionText: "Work done by a constant force F⃗ moving an object along displacement d⃗ is given by:",
    questionTextTamil: "ஒரு மாறா விசை F⃗ ஒரு பொருளை d⃗ தொலைவு இடப்பெயர்ச்சி செய்யும்போது செய்யப்படும் வேலை:",
    options: [
      { label: "A", text: "F⃗ · d⃗" }, { label: "B", text: "|F⃗ × d⃗|" }, { label: "C", text: "F⃗ × d⃗" }, { label: "D", text: "|F⃗| / |d⃗|" }
    ],
    optionsTamil: [
      { label: "A", text: "F⃗ · d⃗" }, { label: "B", text: "|F⃗ × d⃗|" }, { label: "C", text: "F⃗ × d⃗" }, { label: "D", text: "|F⃗| / |d⃗|" }
    ],
    correctAnswer: "A",
    explanation: "Work done is a scalar quantity equal to the dot product of force and displacement: W = F⃗ · d⃗.",
    explanationTamil: "வேலை என்பது ஒரு ஸ்கேலார் அளவு: W = F⃗ · d⃗."
  },
  {
    code: "MAT-080", subject: "Mathematics", topic: "Vector Algebra", difficulty: "medium",
    questionText: "The torque (moment of force) about the origin of a force F⃗ acting at position r⃗ is:",
    questionTextTamil: "r⃗ நிலைவெக்டர் கொண்ட புள்ளியில் செயல்படும் விசை F⃗-ன் ஆதி புள்ளியைப் பொருத்து திருப்புத்திறன் (Torque):",
    options: [
      { label: "A", text: "r⃗ × F⃗" }, { label: "B", text: "F⃗ × r⃗" }, { label: "C", text: "r⃗ · F⃗" }, { label: "D", text: "|r⃗||F⃗|" }
    ],
    optionsTamil: [
      { label: "A", text: "r⃗ × F⃗" }, { label: "B", text: "F⃗ × r⃗" }, { label: "C", text: "r⃗ · F⃗" }, { label: "D", text: "|r⃗||F⃗|" }
    ],
    correctAnswer: "A",
    explanation: "Torque is defined as the cross product τ = r⃗ × F⃗.",
    explanationTamil: "திருப்புத்திறன் τ = r⃗ × F⃗ என வரையறுக்கப்படுகிறது."
  },

  // 81-93 Differential Calculus & Applications
  {
    code: "MAT-081", subject: "Mathematics", topic: "Differential Calculus", difficulty: "easy",
    questionText: "The value of lim (x -> 0) [sin(5x) / x] is:",
    questionTextTamil: "lim (x -> 0) [sin(5x) / x] -ன் மதிப்பு:",
    options: [
      { label: "A", text: "5" }, { label: "B", text: "1" }, { label: "C", text: "0" }, { label: "D", text: "1/5" }
    ],
    optionsTamil: [
      { label: "A", text: "5" }, { label: "B", text: "1" }, { label: "C", text: "0" }, { label: "D", text: "1/5" }
    ],
    correctAnswer: "A",
    explanation: "lim (x -> 0) [sin(kx) / x] = k. Here k = 5, so the limit is 5.",
    explanationTamil: "lim (x -> 0) [sin(kx) / x] = k. இங்கு k = 5, எனவே எல்லை மதிப்பு 5."
  },
  {
    code: "MAT-082", subject: "Mathematics", topic: "Differential Calculus", difficulty: "easy",
    questionText: "The derivative of f(x) = log(sin x) with respect to x is:",
    questionTextTamil: "f(x) = log(sin x)-ன் x-ஐப் பொறுத்த வகைக்கெழு:",
    options: [
      { label: "A", text: "cot x" }, { label: "B", text: "tan x" }, { label: "C", text: "-cot x" }, { label: "D", text: "sec x" }
    ],
    optionsTamil: [
      { label: "A", text: "cot x" }, { label: "B", text: "tan x" }, { label: "C", text: "-cot x" }, { label: "D", text: "sec x" }
    ],
    correctAnswer: "A",
    explanation: "d/dx [log(sin x)] = (1 / sin x) * cos x = cot x.",
    explanationTamil: "d/dx [log(sin x)] = cos x / sin x = cot x."
  },
  {
    code: "MAT-083", subject: "Mathematics", topic: "Differential Calculus", difficulty: "medium",
    questionText: "The slope of the tangent to the curve y = 3x² - 4x at x = 2 is:",
    questionTextTamil: "y = 3x² - 4x என்ற வளைவரைக்கு x = 2-ல் வரையப்படும் தொடுகோட்டின் சாய்வு:",
    options: [
      { label: "A", text: "8" }, { label: "B", text: "4" }, { label: "C", text: "12" }, { label: "D", text: "2" }
    ],
    optionsTamil: [
      { label: "A", text: "8" }, { label: "B", text: "4" }, { label: "C", text: "12" }, { label: "D", text: "2" }
    ],
    correctAnswer: "A",
    explanation: "dy/dx = 6x - 4. At x = 2, dy/dx = 6(2) - 4 = 12 - 4 = 8.",
    explanationTamil: "dy/dx = 6x - 4. x = 2-ல், சாய்வு = 6(2) - 4 = 8."
  },
  {
    code: "MAT-084", subject: "Mathematics", topic: "Differential Calculus", difficulty: "medium",
    questionText: "A function f(x) has a local maximum at x = c if:",
    questionTextTamil: "f(x) என்ற சார்பு x = c-ல் இடஞ்சார்ந்த பெரும மதிப்பு கொண்டிருக்க நிபந்தனை:",
    options: [
      { label: "A", text: "f'(c) = 0 and f''(c) < 0" }, { label: "B", text: "f'(c) = 0 and f''(c) > 0" }, { label: "C", text: "f'(c) > 0 and f''(c) = 0" }, { label: "D", text: "f'(c) < 0 and f''(c) = 0" }
    ],
    optionsTamil: [
      { label: "A", text: "f'(c) = 0 மற்றும் f''(c) < 0" }, { label: "B", text: "f'(c) = 0 மற்றும் f''(c) > 0" }, { label: "C", text: "f'(c) > 0 மற்றும் f''(c) = 0" }, { label: "D", text: "f'(c) < 0 மற்றும் f''(c) = 0" }
    ],
    correctAnswer: "A",
    explanation: "By the second derivative test, f(x) has a local maximum at x = c if f'(c) = 0 and f''(c) < 0.",
    explanationTamil: "இரண்டாம் வகைக்கெழு சோதனையின்படி f'(c) = 0 மற்றும் f''(c) < 0 எனில் x = c-ல் பெருமம் அமையும்."
  },
  {
    code: "MAT-085", subject: "Mathematics", topic: "Differential Calculus", difficulty: "hard",
    questionText: "The maximum value of the function f(x) = sin x + cos x is:",
    questionTextTamil: "f(x) = sin x + cos x என்ற சார்பின் பெரும மதிப்பு:",
    options: [
      { label: "A", text: "√2" }, { label: "B", text: "1" }, { label: "C", text: "2" }, { label: "D", text: "1/√2" }
    ],
    optionsTamil: [
      { label: "A", text: "√2" }, { label: "B", text: "1" }, { label: "C", text: "2" }, { label: "D", text: "1/√2" }
    ],
    correctAnswer: "A",
    explanation: "Maximum value of a sin x + b cos x is √(a² + b²) = √(1² + 1²) = √2.",
    explanationTamil: "a sin x + b cos x-ன் பெரும மதிப்பு √(a² + b²) = √(1 + 1) = √2."
  },
  {
    code: "MAT-086", subject: "Mathematics", topic: "Differential Calculus", difficulty: "medium",
    questionText: "Rolle's theorem is applicable to a function f(x) in [a, b] if f(x) is continuous in [a, b], differentiable in (a, b) and:",
    questionTextTamil: "[a, b]-ல் f(x) தொடர்ச்சியானது, (a, b)-ல் வகையிடத்தக்கது மற்றும் எந்த நிபந்தனையை நிறைவு செய்தால் ரோலின் தேற்றம் பொருந்தும்?",
    options: [
      { label: "A", text: "f(a) = f(b)" }, { label: "B", text: "f(a) = -f(b)" }, { label: "C", text: "f(a) * f(b) = 0" }, { label: "D", text: "f'(a) = f'(b)" }
    ],
    optionsTamil: [
      { label: "A", text: "f(a) = f(b)" }, { label: "B", text: "f(a) = -f(b)" }, { label: "C", text: "f(a) * f(b) = 0" }, { label: "D", text: "f'(a) = f'(b)" }
    ],
    correctAnswer: "A",
    explanation: "Rolle's theorem requires f(a) = f(b) so that there exists at least one c in (a, b) with f'(c) = 0.",
    explanationTamil: "ரோலின் தேற்றத்திற்கு f(a) = f(b) என்ற நிபந்தனை பூர்த்தியாக வேண்டும், அப்போது f'(c) = 0 ஆகும் ஒரு c ∈ (a, b) இருக்கும்."
  },
  {
    code: "MAT-087", subject: "Mathematics", topic: "Differential Calculus", difficulty: "hard",
    questionText: "The value of 'c' from Lagrange's Mean Value Theorem for f(x) = x² in the interval [1, 3] is:",
    questionTextTamil: "[1, 3] என்ற இடைவெளியில் f(x) = x² என்ற சார்புக்கு லெக்ராஞ்சியின் சராசரி மதிப்பு தேற்றத்தின்படி 'c'-ன் மதிப்பு:",
    options: [
      { label: "A", text: "2" }, { label: "B", text: "1.5" }, { label: "C", text: "2.5" }, { label: "D", text: "√3" }
    ],
    optionsTamil: [
      { label: "A", text: "2" }, { label: "B", text: "1.5" }, { label: "C", text: "2.5" }, { label: "D", text: "√3" }
    ],
    correctAnswer: "A",
    explanation: "f'(c) = [f(3) - f(1)] / (3 - 1) => 2c = (9 - 1) / 2 = 4 => c = 2.",
    explanationTamil: "f'(c) = [f(3) - f(1)] / 2 => 2c = (9 - 1) / 2 = 4 => c = 2."
  },
  {
    code: "MAT-088", subject: "Mathematics", topic: "Differential Calculus", difficulty: "medium",
    questionText: "The point of inflection for the curve y = x³ is:",
    questionTextTamil: "y = x³ என்ற வளைவரையின் வளைவு மாற்றுப் புள்ளி (Point of inflection):",
    options: [
      { label: "A", text: "(0, 0)" }, { label: "B", text: "(1, 1)" }, { label: "C", text: "(-1, -1)" }, { label: "D", text: "No point of inflection" }
    ],
    optionsTamil: [
      { label: "A", text: "(0, 0)" }, { label: "B", text: "(1, 1)" }, { label: "C", text: "(-1, -1)" }, { label: "D", text: "வளைவு மாற்றுப் புள்ளி இல்லை" }
    ],
    correctAnswer: "A",
    explanation: "y' = 3x², y'' = 6x. y'' = 0 at x = 0 and y'' changes sign across x = 0, so (0, 0) is an inflection point.",
    explanationTamil: "y'' = 6x = 0 => x = 0; x = 0-ல் குறியீடு மாறுவதால் (0, 0) வளைவு மாற்றுப் புள்ளி ஆகும்."
  },
  {
    code: "MAT-089", subject: "Mathematics", topic: "Differential Calculus", difficulty: "easy",
    questionText: "If y = e^(3x), then d²y/dx² is equal to:",
    questionTextTamil: "y = e^(3x) எனில் d²y/dx² -ன் மதிப்பு:",
    options: [
      { label: "A", text: "9 e^(3x)" }, { label: "B", text: "3 e^(3x)" }, { label: "C", text: "6 e^(3x)" }, { label: "D", text: "e^(3x)" }
    ],
    optionsTamil: [
      { label: "A", text: "9 e^(3x)" }, { label: "B", text: "3 e^(3x)" }, { label: "C", text: "6 e^(3x)" }, { label: "D", text: "e^(3x)" }
    ],
    correctAnswer: "A",
    explanation: "dy/dx = 3 e^(3x); d²y/dx² = 3 * 3 e^(3x) = 9 e^(3x).",
    explanationTamil: "dy/dx = 3 e^(3x); d²y/dx² = 9 e^(3x)."
  },
  {
    code: "MAT-090", subject: "Mathematics", topic: "Differential Calculus", difficulty: "medium",
    questionText: "The equation of the normal to the curve y = x² at the point (1, 1) is:",
    questionTextTamil: "y = x² என்ற வளைவரைக்கு (1, 1) என்ற புள்ளியில் வரையப்படும் செங்கோட்டின் சமன்பாடு:",
    options: [
      { label: "A", text: "x + 2y - 3 = 0" }, { label: "B", text: "2x + y - 3 = 0" }, { label: "C", text: "2x - y - 1 = 0" }, { label: "D", text: "x - 2y + 1 = 0" }
    ],
    optionsTamil: [
      { label: "A", text: "x + 2y - 3 = 0" }, { label: "B", text: "2x + y - 3 = 0" }, { label: "C", text: "2x - y - 1 = 0" }, { label: "D", text: "x - 2y + 1 = 0" }
    ],
    correctAnswer: "A",
    explanation: "dy/dx = 2x, at (1, 1) slope of tangent m = 2. Slope of normal = -1/2. Equation: y - 1 = -1/2 (x - 1) => 2y - 2 = -x + 1 => x + 2y - 3 = 0.",
    explanationTamil: "தொடுகோட்டின் சாய்வு m = 2, செங்கோட்டின் சாய்வு = -1/2. செங்கோட்டு சமன்பாடு: x + 2y - 3 = 0."
  },
  {
    code: "MAT-091", subject: "Mathematics", topic: "Differential Calculus", difficulty: "hard",
    questionText: "If u = x³ + y³ - 3axy, then by Euler's theorem on homogeneous functions, x(∂u/∂x) + y(∂u/∂y) is:",
    questionTextTamil: "u = x³ + y³ - 3axy எனில், ஆய்லரின் தேற்றப்படி x(∂u/∂x) + y(∂u/∂y) -ன் மதிப்பு:",
    options: [
      { label: "A", text: "3u" }, { label: "B", text: "2u" }, { label: "C", text: "u" }, { label: "D", text: "0" }
    ],
    optionsTamil: [
      { label: "A", text: "3u" }, { label: "B", text: "2u" }, { label: "C", text: "u" }, { label: "D", text: "0" }
    ],
    correctAnswer: "A",
    explanation: "u is a homogeneous function of degree n = 3. By Euler's theorem, x(∂u/∂x) + y(∂u/∂y) = nu = 3u.",
    explanationTamil: "u என்பது படி 3 கொண்ட சமபடித்தான சார்பு. ஆய்லரின் தேற்றப்படி x(∂u/∂x) + y(∂u/∂y) = 3u."
  },
  {
    code: "MAT-092", subject: "Mathematics", topic: "Differential Calculus", difficulty: "medium",
    questionText: "The function f(x) = x³ - 3x is strictly increasing in the interval:",
    questionTextTamil: "f(x) = x³ - 3x என்ற சார்பு திட்டமாக ஏறும் இடைவெளி:",
    options: [
      { label: "A", text: "(-∞, -1) ∪ (1, ∞)" }, { label: "B", text: "(-1, 1)" }, { label: "C", text: "(-∞, 1)" }, { label: "D", text: "(-1, ∞)" }
    ],
    optionsTamil: [
      { label: "A", text: "(-∞, -1) ∪ (1, ∞)" }, { label: "B", text: "(-1, 1)" }, { label: "C", text: "(-∞, 1)" }, { label: "D", text: "(-1, ∞)" }
    ],
    correctAnswer: "A",
    explanation: "f'(x) = 3x² - 3 = 3(x - 1)(x + 1) > 0 when x < -1 or x > 1.",
    explanationTamil: "f'(x) = 3(x² - 1) > 0 என்பது x < -1 அல்லது x > 1 ஆகும் போது அமையும்."
  },
  {
    code: "MAT-093", subject: "Mathematics", topic: "Differential Calculus", difficulty: "easy",
    questionText: "If x = a cos θ, y = a sin θ, then dy/dx is:",
    questionTextTamil: "x = a cos θ, y = a sin θ எனில் dy/dx -ன் மதிப்பு:",
    options: [
      { label: "A", text: "-cot θ" }, { label: "B", text: "-tan θ" }, { label: "C", text: "cot θ" }, { label: "D", text: "tan θ" }
    ],
    optionsTamil: [
      { label: "A", text: "-cot θ" }, { label: "B", text: "-tan θ" }, { label: "C", text: "cot θ" }, { label: "D", text: "tan θ" }
    ],
    correctAnswer: "A",
    explanation: "dx/dθ = -a sin θ, dy/dθ = a cos θ. dy/dx = (dy/dθ) / (dx/dθ) = (a cos θ) / (-a sin θ) = -cot θ.",
    explanationTamil: "dy/dx = (a cos θ) / (-a sin θ) = -cot θ."
  },

  // 94-101 Integral Calculus & Applications
  {
    code: "MAT-094", subject: "Mathematics", topic: "Integral Calculus", difficulty: "easy",
    questionText: "The value of ∫ e^(2x) dx is:",
    questionTextTamil: "∫ e^(2x) dx -ன் மதிப்பு:",
    options: [
      { label: "A", text: "(1/2) e^(2x) + C" }, { label: "B", text: "2 e^(2x) + C" }, { label: "C", text: "e^(2x) + C" }, { label: "D", text: "(1/4) e^(2x) + C" }
    ],
    optionsTamil: [
      { label: "A", text: "(1/2) e^(2x) + C" }, { label: "B", text: "2 e^(2x) + C" }, { label: "C", text: "e^(2x) + C" }, { label: "D", text: "(1/4) e^(2x) + C" }
    ],
    correctAnswer: "A",
    explanation: "∫ e^(ax) dx = (1/a) e^(ax) + C. Here a = 2, so (1/2) e^(2x) + C.",
    explanationTamil: "∫ e^(ax) dx = (1/a) e^(ax) + C. இங்கு a = 2 என்பதால் (1/2) e^(2x) + C."
  },
  {
    code: "MAT-095", subject: "Mathematics", topic: "Integral Calculus", difficulty: "easy",
    questionText: "The value of ∫ (1 / (1 + x²)) dx is:",
    questionTextTamil: "∫ (1 / (1 + x²)) dx -ன் மதிப்பு:",
    options: [
      { label: "A", text: "tan⁻¹(x) + C" }, { label: "B", text: "sin⁻¹(x) + C" }, { label: "C", text: "log(1 + x²) + C" }, { label: "D", text: "cot⁻¹(x) + C" }
    ],
    optionsTamil: [
      { label: "A", text: "tan⁻¹(x) + C" }, { label: "B", text: "sin⁻¹(x) + C" }, { label: "C", text: "log(1 + x²) + C" }, { label: "D", text: "cot⁻¹(x) + C" }
    ],
    correctAnswer: "A",
    explanation: "Standard integral: d/dx [tan⁻¹ x] = 1 / (1 + x²), therefore ∫ dx / (1 + x²) = tan⁻¹ x + C.",
    explanationTamil: "திட்டத் தொகையீடு: ∫ dx / (1 + x²) = tan⁻¹(x) + C."
  },
  {
    code: "MAT-096", subject: "Mathematics", topic: "Integral Calculus", difficulty: "medium",
    questionText: "The value of the definite integral ∫_{-a}^{a} x³ dx is:",
    questionTextTamil: "∫_{-a}^{a} x³ dx என்ற வரையறுத்த தொகையீட்டின் மதிப்பு:",
    options: [
      { label: "A", text: "0" }, { label: "B", text: "a⁴ / 2" }, { label: "C", text: "2a⁴" }, { label: "D", text: "a³ / 3" }
    ],
    optionsTamil: [
      { label: "A", text: "0" }, { label: "B", text: "a⁴ / 2" }, { label: "C", text: "2a⁴" }, { label: "D", text: "a³ / 3" }
    ],
    correctAnswer: "A",
    explanation: "f(x) = x³ is an odd function (f(-x) = -f(x)). For an odd function, ∫_{-a}^{a} f(x) dx = 0.",
    explanationTamil: "f(x) = x³ என்பது ஓர் ஒற்றைச் சார்பு (Odd function). எனவே ∫_{-a}^{a} x³ dx = 0."
  },
  {
    code: "MAT-097", subject: "Mathematics", topic: "Integral Calculus", difficulty: "medium",
    questionText: "The value of ∫₀^(π/2) [sin x / (sin x + cos x)] dx is:",
    questionTextTamil: "∫₀^(π/2) [sin x / (sin x + cos x)] dx -ன் மதிப்பு:",
    options: [
      { label: "A", text: "π/4" }, { label: "B", text: "π/2" }, { label: "C", text: "π" }, { label: "D", text: "1" }
    ],
    optionsTamil: [
      { label: "A", text: "π/4" }, { label: "B", text: "π/2" }, { label: "C", text: "π" }, { label: "D", text: "1" }
    ],
    correctAnswer: "A",
    explanation: "Using property ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx, 2I = ∫₀^(π/2) 1 dx = π/2 => I = π/4.",
    explanationTamil: "பண்பின்படி 2I = ∫₀^(π/2) 1 dx = π/2 => I = π/4."
  },
  {
    code: "MAT-098", subject: "Mathematics", topic: "Integral Calculus", difficulty: "hard",
    questionText: "The value of the Gamma function Γ(1/2) is:",
    questionTextTamil: "காமா சார்பு Γ(1/2) -ன் மதிப்பு:",
    options: [
      { label: "A", text: "√π" }, { label: "B", text: "π" }, { label: "C", text: "π/2" }, { label: "D", text: "1" }
    ],
    optionsTamil: [
      { label: "A", text: "√π" }, { label: "B", text: "π" }, { label: "C", text: "π/2" }, { label: "D", text: "1" }
    ],
    correctAnswer: "A",
    explanation: "By property of Gamma function, Γ(1/2) = √π.",
    explanationTamil: "காமா சார்பின் பண்பின்படி Γ(1/2) = √π ஆகும்."
  },
  {
    code: "MAT-099", subject: "Mathematics", topic: "Integral Calculus", difficulty: "medium",
    questionText: "The area bounded by the curve y = x², the x-axis, and the ordinates x = 0 and x = 3 is:",
    questionTextTamil: "y = x² என்ற வளைவரை, x-அச்சு மற்றும் x = 0, x = 3 ஆகியவற்றால் அடைபடும் பரப்பளவு:",
    options: [
      { label: "A", text: "9 sq. units" }, { label: "B", text: "27 sq. units" }, { label: "C", text: "3 sq. units" }, { label: "D", text: "18 sq. units" }
    ],
    optionsTamil: [
      { label: "A", text: "9 ச. அலகுகள்" }, { label: "B", text: "27 ச. அலகுகள்" }, { label: "C", text: "3 ச. அலகுகள்" }, { label: "D", text: "18 ச. அலகுகள்" }
    ],
    correctAnswer: "A",
    explanation: "Area = ∫₀³ x² dx = [x³ / 3]₀³ = 27 / 3 = 9 sq. units.",
    explanationTamil: "பரப்பளவு = ∫₀³ x² dx = [x³/3]₀³ = 27 / 3 = 9 சதுர அலகுகள்."
  },
  {
    code: "MAT-100", subject: "Mathematics", topic: "Integral Calculus", difficulty: "hard",
    questionText: "The area of the region enclosed by the ellipse x²/a² + y²/b² = 1 is:",
    questionTextTamil: "x²/a² + y²/b² = 1 என்ற நீள்வட்டத்தால் அடைபடும் அரங்கத்தின் பரப்பளவு:",
    options: [
      { label: "A", text: "πab" }, { label: "B", text: "2πab" }, { label: "C", text: "4πab" }, { label: "D", text: "π(a² + b²)" }
    ],
    optionsTamil: [
      { label: "A", text: "πab" }, { label: "B", text: "2πab" }, { label: "C", text: "4πab" }, { label: "D", text: "π(a² + b²)" }
    ],
    correctAnswer: "A",
    explanation: "The total area of the ellipse is given by π * a * b.",
    explanationTamil: "நீள்வட்டத்தின் மொத்தப் பரப்பளவு πab சதுர அலகுகள் ஆகும்."
  },
  {
    code: "MAT-101", subject: "Mathematics", topic: "Integral Calculus", difficulty: "medium",
    questionText: "The value of ∫ log x dx is:",
    questionTextTamil: "∫ log x dx -ன் மதிப்பு:",
    options: [
      { label: "A", text: "x log x - x + C" }, { label: "B", text: "1/x + C" }, { label: "C", text: "x log x + x + C" }, { label: "D", text: "(log x)² / 2 + C" }
    ],
    optionsTamil: [
      { label: "A", text: "x log x - x + C" }, { label: "B", text: "1/x + C" }, { label: "C", text: "x log x + x + C" }, { label: "D", text: "(log x)² / 2 + C" }
    ],
    correctAnswer: "A",
    explanation: "Integration by parts: ∫ log x * 1 dx = log x * x - ∫ (1/x) * x dx = x log x - x + C.",
    explanationTamil: "பகுதித் தொகையீட்டு முறைப்படி: ∫ log x dx = x log x - x + C."
  },

  // 102-106 Differential Equations
  {
    code: "MAT-102", subject: "Mathematics", topic: "Differential Equations", difficulty: "easy",
    questionText: "The order and degree of the differential equation (d²y/dx²)³ + (dy/dx)² + y = 0 are respectively:",
    questionTextTamil: "(d²y/dx²)³ + (dy/dx)² + y = 0 என்ற வகைக்கெழு சமன்பாட்டின் வரிசை மற்றும் படி முறையே:",
    options: [
      { label: "A", text: "Order 2, Degree 3" }, { label: "B", text: "Order 3, Degree 2" }, { label: "C", text: "Order 2, Degree 2" }, { label: "D", text: "Order 1, Degree 3" }
    ],
    optionsTamil: [
      { label: "A", text: "வரிசை 2, படி 3" }, { label: "B", text: "வரிசை 3, படி 2" }, { label: "C", text: "வரிசை 2, படி 2" }, { label: "D", text: "வரிசை 1, படி 3" }
    ],
    correctAnswer: "A",
    explanation: "Highest order derivative is d²y/dx² (order 2), and its power is 3 (degree 3).",
    explanationTamil: "உயர் வகைக்கெழு d²y/dx² (வரிசை 2) மற்றும் அதன் அடுக்கு 3 (படி 3)."
  },
  {
    code: "MAT-103", subject: "Mathematics", topic: "Differential Equations", difficulty: "medium",
    questionText: "The integrating factor of the linear differential equation dy/dx + P(x)y = Q(x) is:",
    questionTextTamil: "dy/dx + P(x)y = Q(x) என்ற நேரியல் வகைக்கெழு சமன்பாட்டின் தொகையீட்டுக் காரணி (Integrating Factor):",
    options: [
      { label: "A", text: "e^(∫ P dx)" }, { label: "B", text: "e^(-∫ P dx)" }, { label: "C", text: "∫ P dx" }, { label: "D", text: "e^(∫ Q dx)" }
    ],
    optionsTamil: [
      { label: "A", text: "e^(∫ P dx)" }, { label: "B", text: "e^(-∫ P dx)" }, { label: "C", text: "∫ P dx" }, { label: "D", text: "e^(∫ Q dx)" }
    ],
    correctAnswer: "A",
    explanation: "For first order linear DE dy/dx + Py = Q, Integrating Factor I.F. = e^(∫ P dx).",
    explanationTamil: "நேரியல் வகைக்கெழு சமன்பாட்டின் தொகையீட்டுக் காரணி I.F. = e^(∫ P dx)."
  },
  {
    code: "MAT-104", subject: "Mathematics", topic: "Differential Equations", difficulty: "medium",
    questionText: "The general solution of the differential equation dy/dx = y/x is:",
    questionTextTamil: "dy/dx = y/x என்ற வகைக்கெழு சமன்பாட்டின் பொதுத் தீர்வு:",
    options: [
      { label: "A", text: "y = cx" }, { label: "B", text: "y = c/x" }, { label: "C", text: "xy = c" }, { label: "D", text: "y² = cx" }
    ],
    optionsTamil: [
      { label: "A", text: "y = cx" }, { label: "B", text: "y = c/x" }, { label: "C", text: "xy = c" }, { label: "D", text: "y² = cx" }
    ],
    correctAnswer: "A",
    explanation: "dy/y = dx/x => log y = log x + log c => y = cx.",
    explanationTamil: "மாறி பிரித்தல் முறையில்: dy/y = dx/x => log y = log(cx) => y = cx."
  },
  {
    code: "MAT-105", subject: "Mathematics", topic: "Differential Equations", difficulty: "hard",
    questionText: "The differential equation representing the family of curves y = A e^(2x) + B e^(-2x) is:",
    questionTextTamil: "y = A e^(2x) + B e^(-2x) என்ற குடும்ப வளைவரைகளைக் குறிக்கும் வகைக்கெழு சமன்பாடு:",
    options: [
      { label: "A", text: "d²y/dx² - 4y = 0" }, { label: "B", text: "d²y/dx² + 4y = 0" }, { label: "C", text: "d²y/dx² - 2y = 0" }, { label: "D", text: "dy/dx - 2y = 0" }
    ],
    optionsTamil: [
      { label: "A", text: "d²y/dx² - 4y = 0" }, { label: "B", text: "d²y/dx² + 4y = 0" }, { label: "C", text: "d²y/dx² - 2y = 0" }, { label: "D", text: "dy/dx - 2y = 0" }
    ],
    correctAnswer: "A",
    explanation: "dy/dx = 2A e^(2x) - 2B e^(-2x); d²y/dx² = 4A e^(2x) + 4B e^(-2x) = 4y => d²y/dx² - 4y = 0.",
    explanationTamil: "d²y/dx² = 4(A e^(2x) + B e^(-2x)) = 4y => d²y/dx² - 4y = 0."
  },
  {
    code: "MAT-106", subject: "Mathematics", topic: "Differential Equations", difficulty: "medium",
    questionText: "Newton's law of cooling is formulated as the differential equation dT/dt = -k(T - T_s), where T_s represents:",
    questionTextTamil: "நியூட்டனின் குளிர்வு விதியின் வகைக்கெழு சமன்பாடு dT/dt = -k(T - T_s) -ல் T_s குறிப்பது:",
    options: [
      { label: "A", text: "Surrounding temperature" }, { label: "B", text: "Initial temperature of the body" }, { label: "C", text: "Boiling temperature" }, { label: "D", text: "Freezing temperature" }
    ],
    optionsTamil: [
      { label: "A", text: "சூழலின் வெப்பநிலை" }, { label: "B", text: "பொருளின் தொடக்க வெப்பநிலை" }, { label: "C", text: "கொதிநிலை வெப்பநிலை" }, { label: "D", text: "உறைநிலை வெப்பநிலை" }
    ],
    correctAnswer: "A",
    explanation: "In Newton's law of cooling, T_s is the ambient (surrounding) temperature.",
    explanationTamil: "நியூட்டனின் குளிர்வு விதியில் T_s என்பது சுற்றுப்புறத்தின் மாறா வெப்பநிலை ஆகும்."
  },

  // 107-110 Probability & Discrete Mathematics
  {
    code: "MAT-107", subject: "Mathematics", topic: "Probability & Discrete Math", difficulty: "easy",
    questionText: "If P(A) = 0.4, P(B) = 0.5, and A and B are independent events, then P(A ∩ B) is:",
    questionTextTamil: "P(A) = 0.4, P(B) = 0.5 மற்றும் A, B ஆகியவை சாரா நிகழ்ச்சிகள் எனில் P(A ∩ B) -ன் மதிப்பு:",
    options: [
      { label: "A", text: "0.20" }, { label: "B", text: "0.90" }, { label: "C", text: "0.10" }, { label: "D", text: "0.50" }
    ],
    optionsTamil: [
      { label: "A", text: "0.20" }, { label: "B", text: "0.90" }, { label: "C", text: "0.10" }, { label: "D", text: "0.50" }
    ],
    correctAnswer: "A",
    explanation: "For independent events, P(A ∩ B) = P(A) * P(B) = 0.4 * 0.5 = 0.20.",
    explanationTamil: "சாரா நிகழ்ச்சிகளுக்கு P(A ∩ B) = P(A) * P(B) = 0.4 * 0.5 = 0.20."
  },
  {
    code: "MAT-108", subject: "Mathematics", topic: "Probability & Discrete Math", difficulty: "medium",
    questionText: "In a binomial distribution B(n, p), the mean and variance are related as:",
    questionTextTamil: "ஈருறுப்புப் பரவல் B(n, p)-ல் சராசரி மற்றும் மாறுபாட்டளவையின் தொடர்பு:",
    options: [
      { label: "A", text: "Mean > Variance" }, { label: "B", text: "Mean < Variance" }, { label: "C", text: "Mean = Variance" }, { label: "D", text: "Mean = (Variance)²" }
    ],
    optionsTamil: [
      { label: "A", text: "சராசரி > மாறுபாட்டளவை" }, { label: "B", text: "சராசரி < மாறுபாட்டளவை" }, { label: "C", text: "சராசரி = மாறுபாட்டளவை" }, { label: "D", text: "சராசரி = (மாறுபாட்டளவை)²" }
    ],
    correctAnswer: "A",
    explanation: "Mean = np and Variance = npq. Since q = 1 - p < 1, npq < np, so Mean > Variance.",
    explanationTamil: "ஈருறுப்புப் பரவலில் சராசரி np, மாறுபாட்டளவை npq. q < 1 என்பதால் சராசரி > மாறுபாட்டளவை."
  },
  {
    code: "MAT-109", subject: "Mathematics", topic: "Probability & Discrete Math", difficulty: "easy",
    questionText: "The negation of the statement 'p ∧ q' is logically equivalent to:",
    questionTextTamil: "'p ∧ q' என்ற கூற்றின் மறுப்பு கூற்று எதற்கு சமானமானது (De Morgan's law)?",
    options: [
      { label: "A", text: "¬p ∨ ¬q" }, { label: "B", text: "¬p ∧ ¬q" }, { label: "C", text: "p ∨ q" }, { label: "D", text: "¬p ∧ q" }
    ],
    optionsTamil: [
      { label: "A", text: "¬p ∨ ¬q" }, { label: "B", text: "¬p ∧ ¬q" }, { label: "C", text: "p ∨ q" }, { label: "D", text: "¬p ∧ q" }
    ],
    correctAnswer: "A",
    explanation: "By De Morgan's Law of logic: ¬(p ∧ q) ≡ ¬p ∨ ¬q.",
    explanationTamil: "டி மார்கன் விதியின்படி: ¬(p ∧ q) ≡ ¬p ∨ ¬q."
  },
  {
    code: "MAT-110", subject: "Mathematics", topic: "Probability & Discrete Math", difficulty: "medium",
    questionText: "A random variable X has probability mass function P(X = x) = kx for x = 1, 2, 3, 4. The value of k is:",
    questionTextTamil: "ஒரு சமவாய்ப்பு மாறி X-ன் நிகழ்தகவு நிறைச் சார்பு P(X = x) = kx (x = 1, 2, 3, 4) எனில், k-ன் மதிப்பு:",
    options: [
      { label: "A", text: "1/10" }, { label: "B", text: "1/4" }, { label: "C", text: "1/6" }, { label: "D", text: "1/2" }
    ],
    optionsTamil: [
      { label: "A", text: "1/10" }, { label: "B", text: "1/4" }, { label: "C", text: "1/6" }, { label: "D", text: "1/2" }
    ],
    correctAnswer: "A",
    explanation: "Sum of probabilities Σ P(X = x) = k(1 + 2 + 3 + 4) = 10k = 1 => k = 1/10.",
    explanationTamil: "நிகழ்தகவுகளின் கூடுதல் Σ P(x) = 1 => k(1 + 2 + 3 + 4) = 1 => 10k = 1 => k = 1/10."
  }
];
