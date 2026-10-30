// scripts/question_bank/mathematics_part1.mjs
// Questions MAT-001 to MAT-055: Matrices, Complex Numbers, Theory of Equations, Inverse Trig

export const mathematicsPart1 = [
  // 1-15 Matrices & Determinants
  {
    code: "MAT-001", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "easy",
    questionText: "If A is a square matrix of order 3 and |A| = 4, then the value of |adj A| is:",
    questionTextTamil: "A என்பது வரிசை 3 கொண்ட சதுர அணி மற்றும் |A| = 4 எனில், |adj A|-ன் மதிப்பு:",
    options: [
      { label: "A", text: "16" }, { label: "B", text: "4" }, { label: "C", text: "64" }, { label: "D", text: "12" }
    ],
    optionsTamil: [
      { label: "A", text: "16" }, { label: "B", text: "4" }, { label: "C", text: "64" }, { label: "D", text: "12" }
    ],
    correctAnswer: "A",
    explanation: "For a square matrix of order n, |adj A| = |A|^(n-1). Here n=3, so |adj A| = 4^(3-1) = 4² = 16.",
    explanationTamil: "வரிசை n கொண்ட அணிக்கு |adj A| = |A|^(n-1). இங்கு n=3 என்பதால் |adj A| = 4² = 16."
  },
  {
    code: "MAT-002", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "medium",
    questionText: "If A is an invertible matrix such that A * (adj A) = k * I, then k is equal to:",
    questionTextTamil: "A என்பது பூச்சியமற்ற அணிக்கோவை அணி மற்றும் A * (adj A) = k * I எனில், k-ன் மதிப்பு:",
    options: [
      { label: "A", text: "|A|" }, { label: "B", text: "|A|²" }, { label: "C", text: "1 / |A|" }, { label: "D", text: "trace(A)" }
    ],
    optionsTamil: [
      { label: "A", text: "|A|" }, { label: "B", text: "|A|²" }, { label: "C", text: "1 / |A|" }, { label: "D", text: "trace(A)" }
    ],
    correctAnswer: "A",
    explanation: "By property of adjoint matrix, A * (adj A) = (adj A) * A = |A| * I_n, so k = |A|.",
    explanationTamil: "அணிப் பண்பின்படி A * (adj A) = |A| * I, எனவே k = |A|."
  },
  {
    code: "MAT-003", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "easy",
    questionText: "A square matrix A is called singular if:",
    questionTextTamil: "ஒரு சதுர அணி A பூச்சியக்கோவை அணி (Singular matrix) எனில்:",
    options: [
      { label: "A", text: "|A| = 0" }, { label: "B", text: "|A| ≠ 0" }, { label: "C", text: "A = Aᵀ" }, { label: "D", text: "A = -Aᵀ" }
    ],
    optionsTamil: [
      { label: "A", text: "|A| = 0" }, { label: "B", text: "|A| ≠ 0" }, { label: "C", text: "A = Aᵀ" }, { label: "D", text: "A = -Aᵀ" }
    ],
    correctAnswer: "A",
    explanation: "A singular matrix has determinant equal to zero and does not possess an inverse.",
    explanationTamil: "அணிக்கோவையின் மதிப்பு |A| = 0 எனில் அது பூச்சியக்கோவை அணியாகும் (இதற்கு நேர்மாறு கிடையாது)."
  },
  {
    code: "MAT-004", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "medium",
    questionText: "If A is an orthogonal matrix, then the value of |A| is:",
    questionTextTamil: "A என்பது ஒரு செங்குத்து அணி (Orthogonal matrix) எனில், |A|-ன் மதிப்பு:",
    options: [
      { label: "A", text: "±1" }, { label: "B", text: "0" }, { label: "C", text: "2" }, { label: "D", text: "Any real number" }
    ],
    optionsTamil: [
      { label: "A", text: "±1" }, { label: "B", text: "0" }, { label: "C", text: "2" }, { label: "D", text: "எந்த மெய்யெண்ணும்" }
    ],
    correctAnswer: "A",
    explanation: "A * Aᵀ = I => |A * Aᵀ| = |A|² = |I| = 1 => |A| = ±1.",
    explanationTamil: "A * Aᵀ = I என்பதால் |A|² = 1 => |A| = ±1."
  },
  {
    code: "MAT-005", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "easy",
    questionText: "The inverse of an orthogonal matrix A is equal to:",
    questionTextTamil: "செங்குத்து அணி A-ன் நேர்மாறு அணி A⁻¹ எதற்கு சமம்?",
    options: [
      { label: "A", text: "Aᵀ (Transpose of A)" }, { label: "B", text: "-A" }, { label: "C", text: "adj A" }, { label: "D", text: "A²" }
    ],
    optionsTamil: [
      { label: "A", text: "Aᵀ (A-ன் நிரை நிரல் மாற்று அணி)" },
      { label: "B", text: "-A" },
      { label: "C", text: "adj A" },
      { label: "D", text: "A²" }
    ],
    correctAnswer: "A",
    explanation: "By definition of orthogonal matrix, A * Aᵀ = I, so A⁻¹ = Aᵀ.",
    explanationTamil: "செங்குத்து அணியின் வரையறைப்படி A⁻¹ = Aᵀ ஆகும்."
  },
  {
    code: "MAT-006", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "medium",
    questionText: "If rank of coefficient matrix ρ(A) equals rank of augmented matrix ρ([A|B]) and equals number of unknowns n, the system has:",
    questionTextTamil: "ρ(A) = ρ([A|B]) = n (மதிப்பிட வேண்டிய மாறிகளின் எண்ணிக்கை) எனில் நேரியல் சமன்பாட்டுத் தொகுப்பு:",
    options: [
      { label: "A", text: "A unique solution (consistent)" },
      { label: "B", text: "Infinitely many solutions" },
      { label: "C", text: "No solution (inconsistent)" },
      { label: "D", text: "Zero solution only" }
    ],
    optionsTamil: [
      { label: "A", text: "ஒரே ஒரு தீர்வு பெற்றிருக்கும் (ஒருங்கமைவு உடையது)" },
      { label: "B", text: "எண்ணற்ற தீர்வுகள்" },
      { label: "C", text: "தீர்வு இல்லை (ஒருங்கமைவற்றது)" },
      { label: "D", text: "சுழித் தீர்வு மட்டும்" }
    ],
    correctAnswer: "A",
    explanation: "By Rouché-Capelli theorem, ρ(A) = ρ([A|B]) = n implies unique solution.",
    explanationTamil: "ரூச்சே-கபெல்லி தேற்றப்படி தரம் சமமாகவும் மாறிகளின் எண்ணிக்கைக்கு சமமாகவும் இருந்தால் ஒரே ஒரு தீர்வு உண்டு."
  },
  {
    code: "MAT-007", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "medium",
    questionText: "If ρ(A) = ρ([A|B]) < n (number of unknowns), the system of equations has:",
    questionTextTamil: "ρ(A) = ρ([A|B]) < n எனில் நேரியல் சமன்பாட்டுத் தொகுப்பு எத்தகைய தீர்வுகளைப் பெற்றிருக்கும்?",
    options: [
      { label: "A", text: "Infinitely many solutions" },
      { label: "B", text: "Unique solution" },
      { label: "C", text: "No solution" },
      { label: "D", text: "Trivial solution only" }
    ],
    optionsTamil: [
      { label: "A", text: "எண்ணற்ற தீர்வுகள் பெற்றிருக்கும்" },
      { label: "B", text: "ஒரே ஒரு தீர்வு" },
      { label: "C", text: "தீர்வு இல்லை" },
      { label: "D", text: "வெளிப்படையான தீர்வு மட்டும்" }
    ],
    correctAnswer: "A",
    explanation: "When system is consistent but rank is less than n, there are (n - r) free parameters giving infinitely many solutions.",
    explanationTamil: "தரம் மாறிகளின் எண்ணிக்கையை விடக் குறைவாக இருந்தால் எண்ணற்ற தீர்வுகள் கிடைக்கும்."
  },
  {
    code: "MAT-008", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "easy",
    questionText: "Cramer's rule is applicable to solve AX = B only when:",
    questionTextTamil: "கிராமரின் விதியைப் பயன்படுத்தி சமன்பாடுகளைத் தீர்க்க அடிப்படை நிபந்தனை:",
    options: [
      { label: "A", text: "Determinant of coefficient matrix Δ ≠ 0" },
      { label: "B", text: "Δ = 0" },
      { label: "C", text: "A is a rectangular matrix" },
      { label: "D", text: "B is zero" }
    ],
    optionsTamil: [
      { label: "A", text: "கெழுக்களின் அணிக்கோவை மதிப்பு Δ ≠ 0" },
      { label: "B", text: "Δ = 0" },
      { label: "C", text: "செவ்வக அணி" },
      { label: "D", text: "B சுழியாக இருத்தல்" }
    ],
    correctAnswer: "A",
    explanation: "Cramer's rule evaluates x = Δx/Δ, which requires non-zero determinant Δ ≠ 0.",
    explanationTamil: "x = Δx/Δ என்பதால் வகுக்கும் எண் Δ ≠ 0 ஆக இருக்க வேண்டும்."
  },
  {
    code: "MAT-009", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "hard",
    questionText: "If A is a 3 × 3 matrix and |A| = 2, then |2 A| is equal to:",
    questionTextTamil: "A என்பது 3 × 3 வரிசை கொண்ட அணி மற்றும் |A| = 2 எனில், |2 A|-ன் மதிப்பு:",
    options: [
      { label: "A", text: "16" }, { label: "B", text: "4" }, { label: "C", text: "8" }, { label: "D", text: "6" }
    ],
    optionsTamil: [
      { label: "A", text: "16" }, { label: "B", text: "4" }, { label: "C", text: "8" }, { label: "D", text: "6" }
    ],
    correctAnswer: "A",
    explanation: "For an n × n matrix, |k A| = k^n |A|. For n=3, |2 A| = 2³ |A| = 8 × 2 = 16.",
    explanationTamil: "|k A| = k^n |A| வாய்பாட்டின்படி |2 A| = 2³ × 2 = 8 × 2 = 16."
  },
  {
    code: "MAT-010", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "medium",
    questionText: "For a skew-symmetric matrix A of odd order, the determinant |A| is always:",
    questionTextTamil: "ஒற்றைப்படை வரிசை கொண்ட எதிர் சமச்சீர் அணியின் அணிக்கோவை மதிப்பு எப்போதும்:",
    options: [
      { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "-1" }, { label: "D", text: "Positive" }
    ],
    optionsTamil: [
      { label: "A", text: "0 (சுழி)" }, { label: "B", text: "1" }, { label: "C", text: "-1" }, { label: "D", text: "நேர்மதிப்பு" }
    ],
    correctAnswer: "A",
    explanation: "Aᵀ = -A => |A| = |-A| = (-1)^n |A|. For odd n, |A| = -|A| => 2|A| = 0 => |A| = 0.",
    explanationTamil: "ஒற்றைப்படை வரிசை எதிர் சமச்சீர் அணியின் அணிக்கோவை எப்போதும் சுழியாகும்."
  },

  // 11-25 Complex Numbers
  {
    code: "MAT-011", subject: "Mathematics", topic: "Complex Numbers", difficulty: "easy",
    questionText: "The value of i¹⁹⁹⁹ is equal to:",
    questionTextTamil: "i¹⁹⁹⁹-ன் மதிப்பு எதற்கு சமம்?",
    options: [
      { label: "A", text: "-i" }, { label: "B", text: "+i" }, { label: "C", text: "1" }, { label: "D", text: "-1" }
    ],
    optionsTamil: [
      { label: "A", text: "-i" }, { label: "B", text: "+i" }, { label: "C", text: "1" }, { label: "D", text: "-1" }
    ],
    correctAnswer: "A",
    explanation: "1999 = 4 × 499 + 3. Hence i¹⁹⁹⁹ = (i⁴)⁴⁹⁹ × i³ = 1 × (-i) = -i.",
    explanationTamil: "1999 = 4(499) + 3 என்பதால் i¹⁹⁹⁹ = i³ = -i."
  },
  {
    code: "MAT-012", subject: "Mathematics", topic: "Complex Numbers", difficulty: "easy",
    questionText: "The modulus of the complex number z = 3 - 4i is:",
    questionTextTamil: "z = 3 - 4i என்ற கலப்பெண்ணின் மட்டு (Modulus) மதிப்பு:",
    options: [
      { label: "A", text: "5" }, { label: "B", text: "25" }, { label: "C", text: "7" }, { label: "D", text: "1" }
    ],
    optionsTamil: [
      { label: "A", text: "5" }, { label: "B", text: "25" }, { label: "C", text: "7" }, { label: "D", text: "1" }
    ],
    correctAnswer: "A",
    explanation: "|z| = √(3² + (-4)²) = √(9 + 16) = √25 = 5.",
    explanationTamil: "|z| = √(3² + (-4)²) = √25 = 5."
  },
  {
    code: "MAT-013", subject: "Mathematics", topic: "Complex Numbers", difficulty: "medium",
    questionText: "The principal argument of the complex number z = -1 - i√3 is:",
    questionTextTamil: "z = -1 - i√3 என்ற கலப்பெண்ணின் முதன்மை வீச்சு (Principal argument):",
    options: [
      { label: "A", text: "- 2π / 3" }, { label: "B", text: "4π / 3" }, { label: "C", text: "2π / 3" }, { label: "D", text: "- π / 3" }
    ],
    optionsTamil: [
      { label: "A", text: "- 2π / 3" }, { label: "B", text: "4π / 3" }, { label: "C", text: "2π / 3" }, { label: "D", text: "- π / 3" }
    ],
    correctAnswer: "A",
    explanation: "z is in 3rd quadrant (x<0, y<0). α = tan⁻¹(√3/1) = π/3. Principal argument θ = -(π - α) = -(π - π/3) = -2π/3.",
    explanationTamil: "மூன்றாம் காற்பகுதியில் அமைவதால் முதன்மை வீச்சு θ = -(π - π/3) = -2π/3."
  },
  {
    code: "MAT-014", subject: "Mathematics", topic: "Complex Numbers", difficulty: "medium",
    questionText: "Euler's formula states that e^(iθ) is equal to:",
    questionTextTamil: "ஆய்லரின் சமன்பாட்டின்படி e^(iθ) எதற்கு சமம்?",
    options: [
      { label: "A", text: "cos θ + i sin θ" }, { label: "B", text: "cos θ - i sin θ" }, { label: "C", text: "sin θ + i cos θ" }, { label: "D", text: "cos² θ + sin² θ" }
    ],
    optionsTamil: [
      { label: "A", text: "cos θ + i sin θ" }, { label: "B", text: "cos θ - i sin θ" }, { label: "C", text: "sin θ + i cos θ" }, { label: "D", text: "cos² θ + sin² θ" }
    ],
    correctAnswer: "A",
    explanation: "Euler's identity: e^(iθ) = cos θ + i sin θ.",
    explanationTamil: "ஆய்லர் வாய்ப்பாடு e^(iθ) = cos θ + i sin θ ஆகும்."
  },
  {
    code: "MAT-015", subject: "Mathematics", topic: "Complex Numbers", difficulty: "easy",
    questionText: "If ω is a complex cube root of unity, then the value of 1 + ω + ω² is:",
    questionTextTamil: "ω என்பது ஒன்றின் கலப்பெண் முப்படி மூலம் எனில் 1 + ω + ω²-ன் மதிப்பு:",
    options: [
      { label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "-1" }, { label: "D", text: "3" }
    ],
    optionsTamil: [
      { label: "A", text: "0 (சுழி)" }, { label: "B", text: "1" }, { label: "C", text: "-1" }, { label: "D", text: "3" }
    ],
    correctAnswer: "A",
    explanation: "The sum of all nth roots of unity is zero: 1 + ω + ω² = 0. Also ω³ = 1.",
    explanationTamil: "ஒன்றின் முப்படி மூலங்களின் கூடுதல் 1 + ω + ω² = 0 மற்றும் ω³ = 1."
  },
  {
    code: "MAT-016", subject: "Mathematics", topic: "Complex Numbers", difficulty: "medium",
    questionText: "The locus of z satisfying |z - z₁| = |z - z₂| represents:",
    questionTextTamil: "|z - z₁| = |z - z₂| என்ற சமன்பாட்டை நிறைவு செய்யும் z-ன் நியமப்பாதை:",
    options: [
      { label: "A", text: "Perpendicular bisector of line segment joining z₁ and z₂" },
      { label: "B", text: "A circle" },
      { label: "C", text: "An ellipse" },
      { label: "D", text: "A parabola" }
    ],
    optionsTamil: [
      { label: "A", text: "z₁ மற்றும் z₂ புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் மையக்குத்துக் கோடு" },
      { label: "B", text: "ஒரு வட்டம்" },
      { label: "C", text: "நீள்வட்டம்" },
      { label: "D", text: "பரவளையம்" }
    ],
    correctAnswer: "A",
    explanation: "Equidistant from two fixed points defines the perpendicular bisector line in complex plane.",
    explanationTamil: "இரு புள்ளிகளிலிருந்து சமதொலைவில் உள்ள புள்ளிகளின் பாதை மையக்குத்துக் கோடாகும்."
  },
  {
    code: "MAT-017", subject: "Mathematics", topic: "Complex Numbers", difficulty: "easy",
    questionText: "The equation |z - z₀| = r represents a:",
    questionTextTamil: "|z - z₀| = r என்ற சமன்பாடு எதனைக் குறிக்கிறது?",
    options: [
      { label: "A", text: "Circle with centre z₀ and radius r" },
      { label: "B", text: "Straight line" },
      { label: "C", text: "Parabola" },
      { label: "D", text: "Hyperbola" }
    ],
    optionsTamil: [
      { label: "A", text: "மையம் z₀ மற்றும் ஆரம் r கொண்ட வட்டம்" },
      { label: "B", text: "நேர்க்கோடு" },
      { label: "C", text: "பரவளையம்" },
      { label: "D", text: "அதிபரவளையம்" }
    ],
    correctAnswer: "A",
    explanation: "Distance between z and z₀ is fixed at r, tracing a circle.",
    explanationTamil: "மையப்புள்ளி z₀-விலிருந்து மாறாத தூரம் r கொண்ட புள்ளிகளின் நியமப்பாதை வட்டமாகும்."
  },
  {
    code: "MAT-018", subject: "Mathematics", topic: "Complex Numbers", difficulty: "hard",
    questionText: "De Moivre's theorem states that for any rational number n, (cos θ + i sin θ)^n equals:",
    questionTextTamil: "டி மாய்வரின் தேற்றப்படி (cos θ + i sin θ)^n எதற்கு சமம்?",
    options: [
      { label: "A", text: "cos(nθ) + i sin(nθ)" },
      { label: "B", text: "cos^n θ + i sin^n θ" },
      { label: "C", text: "cos(nθ) - i sin(nθ)" },
      { label: "D", text: "n cos θ + i n sin θ" }
    ],
    optionsTamil: [
      { label: "A", text: "cos(nθ) + i sin(nθ)" },
      { label: "B", text: "cos^n θ + i sin^n θ" },
      { label: "C", text: "cos(nθ) - i sin(nθ)" },
      { label: "D", text: "n cos θ + i n sin θ" }
    ],
    correctAnswer: "A",
    explanation: "De Moivre's theorem: (cos θ + i sin θ)^n = cos(nθ) + i sin(nθ).",
    explanationTamil: "டி மாய்வர் தேற்றம்: (cos θ + i sin θ)^n = cos(nθ) + i sin(nθ)."
  },
  {
    code: "MAT-019", subject: "Mathematics", topic: "Complex Numbers", difficulty: "easy",
    questionText: "If z = x + iy, then z + z̄ is equal to:",
    questionTextTamil: "z = x + iy எனில் z + z̄ எதற்கு சமம்?",
    options: [
      { label: "A", text: "2 Re(z) = 2x (purely real)" },
      { label: "B", text: "2 Im(z) = 2iy" },
      { label: "C", text: "0" },
      { label: "D", text: "x² + y²" }
    ],
    optionsTamil: [
      { label: "A", text: "2 Re(z) = 2x (மெய் மதிப்பு)" },
      { label: "B", text: "2iy (கற்பனை)" },
      { label: "C", text: "0" },
      { label: "D", text: "x² + y²" }
    ],
    correctAnswer: "A",
    explanation: "(x + iy) + (x - iy) = 2x = 2 Re(z).",
    explanationTamil: "கலப்பெண்ணையும் அதன் இணை கலப்பெண்ணையும் கூட்டினால் மெய்ப்பகுதி 2x கிடைக்கும்."
  },
  {
    code: "MAT-020", subject: "Mathematics", topic: "Complex Numbers", difficulty: "medium",
    questionText: "The value of (1 + i) / (1 - i) is equal to:",
    questionTextTamil: "(1 + i) / (1 - i)-ன் மதிப்பு எதற்கு சமம்?",
    options: [
      { label: "A", text: "i" }, { label: "B", text: "-i" }, { label: "C", text: "1" }, { label: "D", text: "-1" }
    ],
    optionsTamil: [
      { label: "A", text: "i" }, { label: "B", text: "-i" }, { label: "C", text: "1" }, { label: "D", text: "-1" }
    ],
    correctAnswer: "A",
    explanation: "(1 + i)² / (1 - i²) = (1 + 2i - 1) / (1 - (-1)) = 2i / 2 = i.",
    explanationTamil: "(1 + i)(1 + i) / ((1 - i)(1 + i)) = 2i / 2 = i."
  },

  // 21-35 Theory of Equations
  {
    code: "MAT-021", subject: "Mathematics", topic: "Theory of Equations", difficulty: "easy",
    questionText: "If α, β, γ are the roots of the cubic equation x³ + p x² + q x + r = 0, then the sum of the roots (α + β + γ) is:",
    questionTextTamil: "x³ + p x² + q x + r = 0 சமன்பாட்டின் மூலங்கள் α, β, γ எனில் மூலங்களின் கூடுதல் (α + β + γ):",
    options: [
      { label: "A", text: "-p" }, { label: "B", text: "p" }, { label: "C", text: "q" }, { label: "D", text: "-r" }
    ],
    optionsTamil: [
      { label: "A", text: "-p" }, { label: "B", text: "p" }, { label: "C", text: "q" }, { label: "D", text: "-r" }
    ],
    correctAnswer: "A",
    explanation: "By Vieta's formulas, Σα = - coefficient of x² / coefficient of x³ = -p.",
    explanationTamil: "வியட்டாவின் சூத்திரப்படி மூலங்களின் கூடுதல் = -p."
  },
  {
    code: "MAT-022", subject: "Mathematics", topic: "Theory of Equations", difficulty: "easy",
    questionText: "Product of the roots α β γ of the cubic equation x³ + p x² + q x + r = 0 is:",
    questionTextTamil: "x³ + p x² + q x + r = 0 என்ற சமன்பாட்டின் மூலங்களின் பெருக்கற்பலன் α β γ:",
    options: [
      { label: "A", text: "-r" }, { label: "B", text: "r" }, { label: "C", text: "q" }, { label: "D", text: "-q" }
    ],
    optionsTamil: [
      { label: "A", text: "-r" }, { label: "B", text: "r" }, { label: "C", text: "q" }, { label: "D", text: "-q" }
    ],
    correctAnswer: "A",
    explanation: "Product of roots = (-1)³ * constant term = -r.",
    explanationTamil: "வியட்டாவின் விதிப்படி மூலங்களின் பெருக்கற்பலன் = -r."
  },
  {
    code: "MAT-023", subject: "Mathematics", topic: "Theory of Equations", difficulty: "medium",
    questionText: "Descartes' rule of signs gives an upper bound on:",
    questionTextTamil: "டெஸ்கார்ட்டின் குறி விதி எதனுடைய அதிகபட்ச எண்ணிக்கையைத் தீர்மானிக்க உதவுகிறது?",
    options: [
      { label: "A", text: "Number of positive and negative real roots of a polynomial" },
      { label: "B", text: "Exact values of roots" },
      { label: "C", text: "Complex roots only" },
      { label: "D", text: "Degree of polynomial" }
    ],
    optionsTamil: [
      { label: "A", text: "ஒரு பல்லுறுப்புக் கோவையின் மிகை மற்றும் குறை மெய் மூலங்களின் எண்ணிக்கை" },
      { label: "B", text: "மூலங்களின் சரியான மதிப்பு" },
      { label: "C", text: "கலப்பெண் மூலங்கள் மட்டும்" },
      { label: "D", text: "படி" }
    ],
    correctAnswer: "A",
    explanation: "Number of positive real roots cannot exceed the number of sign changes in coefficients of P(x).",
    explanationTamil: "டெஸ்கார்ட்டின் விதி குறி மாற்றங்களின் மூலம் மிகை மற்றும் குறை மூலங்களின் அதிகபட்ச எண்ணிக்கையைத் தருகிறது."
  },
  {
    code: "MAT-024", subject: "Mathematics", topic: "Theory of Equations", difficulty: "easy",
    questionText: "If 2 + i√3 is a root of a polynomial equation with real coefficients, another root must be:",
    questionTextTamil: "மெய் கெழுக்களைக் கொண்ட பல்லுறுப்புக் கோவை சமன்பாட்டின் ஒரு மூலம் 2 + i√3 எனில் மற்றொரு மூலம்:",
    options: [
      { label: "A", text: "2 - i√3 (complex conjugate)" },
      { label: "B", text: "-2 + i√3" },
      { label: "C", text: "-2 - i√3" },
      { label: "D", text: "√3 + 2i" }
    ],
    optionsTamil: [
      { label: "A", text: "2 - i√3 (இணை கலப்பெண்)" },
      { label: "B", text: "-2 + i√3" },
      { label: "C", text: "-2 - i√3" },
      { label: "D", text: "√3 + 2i" }
    ],
    correctAnswer: "A",
    explanation: "Complex roots of real-coefficient polynomials always occur in conjugate pairs.",
    explanationTamil: "மெய் கெழுக்கள் கொண்ட சமன்பாட்டின் கலப்பெண் மூலங்கள் எப்போதும் இணைகளாகவே (conjugate pairs) அமையும்."
  },
  {
    code: "MAT-025", subject: "Mathematics", topic: "Theory of Equations", difficulty: "medium",
    questionText: "A polynomial equation of degree n has exactly:",
    questionTextTamil: "n படி கொண்ட பல்லுறுப்புக் கோவை சமன்பாடு சரியாக எத்தனை மூலங்களைப் பெற்றிருக்கும்?",
    options: [
      { label: "A", text: "n roots (real or complex, counting multiplicity)" },
      { label: "B", text: "At most n real roots" },
      { label: "C", text: "n² roots" },
      { label: "D", text: "n - 1 roots" }
    ],
    optionsTamil: [
      { label: "A", text: "சரியாக n மூலங்கள் (மெய் அல்லது கலப்பெண் மூலங்கள்)" },
      { label: "B", text: "அதிகபட்சம் n" },
      { label: "C", text: "n² மூலங்கள்" },
      { label: "D", text: "n - 1 மூலங்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Fundamental Theorem of Algebra ensures every nth-degree polynomial has exactly n roots in complex field.",
    explanationTamil: "இயற்கணிதத்தின் அடிப்படை தேற்றப்படி n படி சமன்பாட்டிற்கு சரியாக n மூலங்கள் இருக்கும்."
  },

  // 36-55 Inverse Trigonometric Functions
  {
    code: "MAT-026", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "easy",
    questionText: "The principal value branch of sin⁻¹(x) is:",
    questionTextTamil: "sin⁻¹(x)-ன் முதன்மை மதிப்பு வீச்சகம் யாது?",
    options: [
      { label: "A", text: "[-π/2, π/2]" }, { label: "B", text: "[0, π]" }, { label: "C", text: "(-π/2, π/2)" }, { label: "D", text: "[0, 2π]" }
    ],
    optionsTamil: [
      { label: "A", text: "[-π/2, π/2]" }, { label: "B", text: "[0, π] (cos⁻¹x)" }, { label: "C", text: "(-π/2, π/2) (tan⁻¹x)" }, { label: "D", text: "[0, 2π]" }
    ],
    correctAnswer: "A",
    explanation: "sin⁻¹: [-1, 1] → [-π/2, π/2].",
    explanationTamil: "sin⁻¹(x)-ன் முதன்மை வீச்சகம் [-π/2, π/2] ஆகும்."
  },
  {
    code: "MAT-027", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "easy",
    questionText: "The principal value branch of cos⁻¹(x) is:",
    questionTextTamil: "cos⁻¹(x)-ன் முதன்மை மதிப்பு வீச்சகம் யாது?",
    options: [
      { label: "A", text: "[0, π]" }, { label: "B", text: "[-π/2, π/2]" }, { label: "C", text: "(0, π)" }, { label: "D", text: "[-π, π]" }
    ],
    optionsTamil: [
      { label: "A", text: "[0, π]" }, { label: "B", text: "[-π/2, π/2]" }, { label: "C", text: "(0, π)" }, { label: "D", text: "[-π, π]" }
    ],
    correctAnswer: "A",
    explanation: "cos⁻¹: [-1, 1] → [0, π].",
    explanationTamil: "cos⁻¹(x)-ன் முதன்மை வீச்சகம் [0, π] ஆகும்."
  },
  {
    code: "MAT-028", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "easy",
    questionText: "The value of sin⁻¹(1/2) is:",
    questionTextTamil: "sin⁻¹(1/2)-ன் முதன்மை மதிப்பு யாது?",
    options: [
      { label: "A", text: "π / 6 (30°)" }, { label: "B", text: "π / 3 (60°)" }, { label: "C", text: "π / 4 (45°)" }, { label: "D", text: "π / 2" }
    ],
    optionsTamil: [
      { label: "A", text: "π / 6 (30°)" }, { label: "B", text: "π / 3 (60°)" }, { label: "C", text: "π / 4 (45°)" }, { label: "D", text: "π / 2" }
    ],
    correctAnswer: "A",
    explanation: "sin(π/6) = 1/2, so sin⁻¹(1/2) = π/6.",
    explanationTamil: "sin(30°) = 1/2 என்பதால் sin⁻¹(1/2) = π/6."
  },
  {
    code: "MAT-029", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "medium",
    questionText: "The value of cos⁻¹(-1/2) is:",
    questionTextTamil: "cos⁻¹(-1/2)-ன் முதன்மை மதிப்பு யாது?",
    options: [
      { label: "A", text: "2π / 3 (120°)" }, { label: "B", text: "π / 3 (60°)" }, { label: "C", text: "- π / 3" }, { label: "D", text: "5π / 6" }
    ],
    optionsTamil: [
      { label: "A", text: "2π / 3 (120°)" }, { label: "B", text: "π / 3" }, { label: "C", text: "- π / 3" }, { label: "D", text: "5π / 6" }
    ],
    correctAnswer: "A",
    explanation: "cos⁻¹(-x) = π - cos⁻¹(x) = π - π/3 = 2π/3.",
    explanationTamil: "cos⁻¹(-x) = π - cos⁻¹(x) = π - π/3 = 2π/3."
  },
  {
    code: "MAT-030", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "easy",
    questionText: "For all x ∈ [-1, 1], the value of sin⁻¹(x) + cos⁻¹(x) is equal to:",
    questionTextTamil: "x ∈ [-1, 1] எனில் sin⁻¹(x) + cos⁻¹(x)-ன் மதிப்பு:",
    options: [
      { label: "A", text: "π / 2" }, { label: "B", text: "π" }, { label: "C", text: "0" }, { label: "D", text: "2π" }
    ],
    optionsTamil: [
      { label: "A", text: "π / 2" }, { label: "B", text: "π" }, { label: "C", text: "0" }, { label: "D", text: "2π" }
    ],
    correctAnswer: "A",
    explanation: "Standard identity: sin⁻¹(x) + cos⁻¹(x) = π/2.",
    explanationTamil: "முக்கிய முற்றொருமை: sin⁻¹(x) + cos⁻¹(x) = π/2."
  },
  {
    code: "MAT-031", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "easy",
    questionText: "For all real x, tan⁻¹(x) + cot⁻¹(x) is equal to:",
    questionTextTamil: "அனைத்து மெய் எண் x-க்கும் tan⁻¹(x) + cot⁻¹(x)-ன் மதிப்பு:",
    options: [
      { label: "A", text: "π / 2" }, { label: "B", text: "π" }, { label: "C", text: "0" }, { label: "D", text: "1" }
    ],
    optionsTamil: [
      { label: "A", text: "π / 2" }, { label: "B", text: "π" }, { label: "C", text: "0" }, { label: "D", text: "1" }
    ],
    correctAnswer: "A",
    explanation: "tan⁻¹(x) + cot⁻¹(x) = π/2 for all x ∈ ℝ.",
    explanationTamil: "tan⁻¹(x) + cot⁻¹(x) = π/2 ஆகும்."
  },
  {
    code: "MAT-032", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "medium",
    questionText: "tan⁻¹(1/2) + tan⁻¹(1/3) is equal to:",
    questionTextTamil: "tan⁻¹(1/2) + tan⁻¹(1/3)-ன் மதிப்பு:",
    options: [
      { label: "A", text: "π / 4" }, { label: "B", text: "π / 2" }, { label: "C", text: "π / 6" }, { label: "D", text: "π / 3" }
    ],
    optionsTamil: [
      { label: "A", text: "π / 4" }, { label: "B", text: "π / 2" }, { label: "C", text: "π / 6" }, { label: "D", text: "π / 3" }
    ],
    correctAnswer: "A",
    explanation: "tan⁻¹[(1/2 + 1/3) / (1 - 1/6)] = tan⁻¹[(5/6) / (5/6)] = tan⁻¹(1) = π/4.",
    explanationTamil: "tan⁻¹[(1/2 + 1/3) / (1 - 1/6)] = tan⁻¹(1) = π/4."
  },
  {
    code: "MAT-033", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "medium",
    questionText: "The value of sin(2 tan⁻¹ x) in terms of algebraic expression is:",
    questionTextTamil: "sin(2 tan⁻¹ x)-ன் இயற்கணித வடிவம் யாது?",
    options: [
      { label: "A", text: "2x / (1 + x²)" }, { label: "B", text: "(1 - x²) / (1 + x²)" }, { label: "C", text: "2x / (1 - x²)" }, { label: "D", text: "x / √(1 + x²)" }
    ],
    optionsTamil: [
      { label: "A", text: "2x / (1 + x²)" }, { label: "B", text: "(1 - x²) / (1 + x²)" }, { label: "C", text: "2x / (1 - x²)" }, { label: "D", text: "x / √(1 + x²)" }
    ],
    correctAnswer: "A",
    explanation: "Let θ = tan⁻¹ x => tan θ = x. sin(2θ) = 2 tan θ / (1 + tan² θ) = 2x / (1 + x²).",
    explanationTamil: "sin(2 tan⁻¹ x) = 2x / (1 + x²) ஆகும்."
  },
  {
    code: "MAT-034", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "easy",
    questionText: "The domain of sin⁻¹(x) is:",
    questionTextTamil: "sin⁻¹(x) சார்பின் சார்பகம் (Domain) யாது?",
    options: [
      { label: "A", text: "[-1, 1]" }, { label: "B", text: "(-∞, ∞)" }, { label: "C", text: "[0, 1]" }, { label: "D", text: "(-1, 1)" }
    ],
    optionsTamil: [
      { label: "A", text: "[-1, 1]" }, { label: "B", text: "(-∞, ∞)" }, { label: "C", text: "[0, 1]" }, { label: "D", text: "(-1, 1)" }
    ],
    correctAnswer: "A",
    explanation: "sin⁻¹(x) is defined only for -1 ≤ x ≤ 1.",
    explanationTamil: "sin⁻¹(x)-ன் சார்பகம் [-1, 1] ஆகும்."
  },
  {
    code: "MAT-035", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "easy",
    questionText: "The value of tan⁻¹(√3) is:",
    questionTextTamil: "tan⁻¹(√3)-ன் முதன்மை மதிப்பு யாது?",
    options: [
      { label: "A", text: "π / 3 (60°)" }, { label: "B", text: "π / 6 (30°)" }, { label: "C", text: "π / 4 (45°)" }, { label: "D", text: "π / 2" }
    ],
    optionsTamil: [
      { label: "A", text: "π / 3 (60°)" }, { label: "B", text: "π / 6" }, { label: "C", text: "π / 4" }, { label: "D", text: "π / 2" }
    ],
    correctAnswer: "A",
    explanation: "tan(π/3) = √3, so tan⁻¹(√3) = π/3.",
    explanationTamil: "tan(60°) = √3 என்பதால் tan⁻¹(√3) = π/3."
  },

  // 36-55 Additional Matrices & Complex Numbers
  {
    code: "MAT-036", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "medium",
    questionText: "If A is a square matrix such that A² = A, then A is called:",
    questionTextTamil: "A² = A என்ற நிபந்தனையை நிறைவு செய்யும் சதுர அணி A எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Idempotent matrix" }, { label: "B", text: "Involutory matrix" }, { label: "C", text: "Nilpotent matrix" }, { label: "D", text: "Orthogonal matrix" }
    ],
    optionsTamil: [
      { label: "A", text: "தன்னடுக்கு அணி (Idempotent matrix)" },
      { label: "B", text: "சுழல் அணி (Involutory - A² = I)" },
      { label: "C", text: "பூச்சிய அடுக்கு அணி" },
      { label: "D", text: "செங்குத்து அணி" }
    ],
    correctAnswer: "A",
    explanation: "A matrix satisfying A² = A is called an idempotent matrix.",
    explanationTamil: "A² = A எனில் அது தன்னடுக்கு அணி (Idempotent matrix) எனப்படும்."
  },
  {
    code: "MAT-037", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "medium",
    questionText: "If A² = I, then matrix A is called:",
    questionTextTamil: "A² = I எனில் சதுர அணி A எவ்வாறு அழைக்கப்படுகிறது?",
    options: [
      { label: "A", text: "Involutory matrix" }, { label: "B", text: "Idempotent matrix" }, { label: "C", text: "Singular matrix" }, { label: "D", text: "Symmetric matrix" }
    ],
    optionsTamil: [
      { label: "A", text: "எதிர் சுழல் அணி (Involutory matrix - A⁻¹ = A)" },
      { label: "B", text: "தன்னடுக்கு அணி" },
      { label: "C", text: "பூச்சியக்கோவை அணி" },
      { label: "D", text: "சமச்சீர் அணி" }
    ],
    correctAnswer: "A",
    explanation: "A² = I means A = A⁻¹, which defines an involutory matrix.",
    explanationTamil: "A² = I எனில் A = A⁻¹ ஆக இருக்கும், இது இன்வொலூட்டரி அணி எனப்படும்."
  },
  {
    code: "MAT-038", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "easy",
    questionText: "The determinant of a diagonal matrix is equal to:",
    questionTextTamil: "ஒரு மூலைவிட்ட அணியின் அணிக்கோவை மதிப்பு எதற்கு சமம்?",
    options: [
      { label: "A", text: "Product of its principal diagonal elements" },
      { label: "B", text: "Sum of its diagonal elements" },
      { label: "C", text: "Zero" },
      { label: "D", text: "Trace of matrix" }
    ],
    optionsTamil: [
      { label: "A", text: "அதன் முதன்மை மூலைவிட்ட உறுப்புகளின் பெருக்கற்பலன்" },
      { label: "B", text: "மூலைவிட்ட உறுப்புகளின் கூடுதல்" },
      { label: "C", text: "சுழி" },
      { label: "D", text: "அணியின் சுவடு" }
    ],
    correctAnswer: "A",
    explanation: "|diag(a₁, a₂, ..., a_n)| = a₁ × a₂ × ... × a_n.",
    explanationTamil: "மூலைவிட்ட அணியின் அணிக்கோவை மதிப்பு அதன் மூலைவிட்ட உறுப்புகளின் பெருக்கற்பலனுக்கு சமம்."
  },
  {
    code: "MAT-039", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "medium",
    questionText: "If A and B are square matrices of same order, then (A B)ᵀ is equal to:",
    questionTextTamil: "A, B ஒரே வரிசையுடைய அணிகள் எனில் (A B)ᵀ எதற்கு சமம்?",
    options: [
      { label: "A", text: "Bᵀ Aᵀ (Reversal law for transpose)" },
      { label: "B", text: "Aᵀ Bᵀ" },
      { label: "C", text: "A B" },
      { label: "D", text: "- Bᵀ Aᵀ" }
    ],
    optionsTamil: [
      { label: "A", text: "Bᵀ Aᵀ (நிரை நிரல் மாற்றின் வரிசை மாற்ற விதி)" },
      { label: "B", text: "Aᵀ Bᵀ" },
      { label: "C", text: "A B" },
      { label: "D", text: "- Bᵀ Aᵀ" }
    ],
    correctAnswer: "A",
    explanation: "Reversal law of transpose: (A B)ᵀ = Bᵀ Aᵀ.",
    explanationTamil: "(A B)ᵀ = Bᵀ Aᵀ என்பது நிரை நிரல் மாற்றலின் அடிப்படைப் பண்பாகும்."
  },
  {
    code: "MAT-040", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "medium",
    questionText: "If A and B are invertible matrices of same order, then (A B)⁻¹ is equal to:",
    questionTextTamil: "(A B)⁻¹ எதற்கு சமம்?",
    options: [
      { label: "A", text: "B⁻¹ A⁻¹" }, { label: "B", text: "A⁻¹ B⁻¹" }, { label: "C", text: "A B" }, { label: "D", text: "- B⁻¹ A⁻¹" }
    ],
    optionsTamil: [
      { label: "A", text: "B⁻¹ A⁻¹" }, { label: "B", text: "A⁻¹ B⁻¹" }, { label: "C", text: "A B" }, { label: "D", text: "- B⁻¹ A⁻¹" }
    ],
    correctAnswer: "A",
    explanation: "Reversal law of inverse: (A B)⁻¹ = B⁻¹ A⁻¹.",
    explanationTamil: "நேர்மாறு அணியின் வரிசை மாற்ற விதி: (A B)⁻¹ = B⁻¹ A⁻¹."
  },
  {
    code: "MAT-041", subject: "Mathematics", topic: "Complex Numbers", difficulty: "easy",
    questionText: "The value of |z₁ · z₂| for any two complex numbers is:",
    questionTextTamil: "இரு கலப்பெண்களுக்கு |z₁ · z₂|-ன் மதிப்பு:",
    options: [
      { label: "A", text: "|z₁| · |z₂|" }, { label: "B", text: "|z₁| + |z₂|" }, { label: "C", text: "|z₁| / |z₂|" }, { label: "D", text: "|z₁|² · |z₂|²" }
    ],
    optionsTamil: [
      { label: "A", text: "|z₁| · |z₂|" }, { label: "B", text: "|z₁| + |z₂|" }, { label: "C", text: "|z₁| / |z₂|" }, { label: "D", text: "|z₁|² · |z₂|²" }
    ],
    correctAnswer: "A",
    explanation: "The modulus of a product equals the product of the moduli: |z₁ z₂| = |z₁| |z₂|.",
    explanationTamil: "பெருக்குத்தொகையின் மட்டு மதிப்புகளின் பெருக்கற்பலனுக்கு சமம்: |z₁ z₂| = |z₁| |z₂|."
  },
  {
    code: "MAT-042", subject: "Mathematics", topic: "Complex Numbers", difficulty: "easy",
    questionText: "Triangle inequality for complex numbers states that:",
    questionTextTamil: "கலப்பெண்களுக்கான முக்கோணச் சமனிலியின் கூற்று:",
    options: [
      { label: "A", text: "|z₁ + z₂| ≤ |z₁| + |z₂|" },
      { label: "B", text: "|z₁ + z₂| ≥ |z₁| + |z₂|" },
      { label: "C", text: "|z₁ + z₂| = |z₁| + |z₂|" },
      { label: "D", text: "|z₁ + z₂| ≤ |z₁| - |z₂|" }
    ],
    optionsTamil: [
      { label: "A", text: "|z₁ + z₂| ≤ |z₁| + |z₂|" },
      { label: "B", text: "|z₁ + z₂| ≥ |z₁| + |z₂|" },
      { label: "C", text: "|z₁ + z₂| = |z₁| + |z₂|" },
      { label: "D", text: "|z₁ + z₂| ≤ |z₁| - |z₂|" }
    ],
    correctAnswer: "A",
    explanation: "Triangle inequality: length of any side of a triangle cannot exceed sum of other two sides.",
    explanationTamil: "முக்கோண சமனிலி: |z₁ + z₂| ≤ |z₁| + |z₂|."
  },
  {
    code: "MAT-043", subject: "Mathematics", topic: "Complex Numbers", difficulty: "medium",
    questionText: "The argument of a purely imaginary number with positive imaginary part (e.g., 5i) is:",
    questionTextTamil: "மிகை கற்பனைப் பகுதியைக் கொண்ட தூய கற்பனை எண்ணின் (எ.கா. 5i) வீச்சு:",
    options: [
      { label: "A", text: "π / 2" }, { label: "B", text: "- π / 2" }, { label: "C", text: "0" }, { label: "D", text: "π" }
    ],
    optionsTamil: [
      { label: "A", text: "π / 2 (90°)" }, { label: "B", text: "- π / 2" }, { label: "C", text: "0" }, { label: "D", text: "π" }
    ],
    correctAnswer: "A",
    explanation: "Lies on positive y-axis, θ = π/2.",
    explanationTamil: "நேர் கற்பனை அச்சில் அமைவதால் கோணம் π/2 (90°) ஆகும்."
  },
  {
    code: "MAT-044", subject: "Mathematics", topic: "Complex Numbers", difficulty: "medium",
    questionText: "The argument of a purely negative real number (e.g., -5) is:",
    questionTextTamil: "எதிர் மெய்யெண்ணின் (எ.கா. -5) முதன்மை வீச்சு யாது?",
    options: [
      { label: "A", text: "π" }, { label: "B", text: "0" }, { label: "C", text: "π / 2" }, { label: "D", text: "- π / 2" }
    ],
    optionsTamil: [
      { label: "A", text: "π (180°)" }, { label: "B", text: "0" }, { label: "C", text: "π / 2" }, { label: "D", text: "- π / 2" }
    ],
    correctAnswer: "A",
    explanation: "Lies on negative real axis, argument = π.",
    explanationTamil: "எதிர் மெய் அச்சில் அமைவதால் முதன்மை வீச்சு π ஆகும்."
  },
  {
    code: "MAT-045", subject: "Mathematics", topic: "Complex Numbers", difficulty: "hard",
    questionText: "The four fourth roots of unity are:",
    questionTextTamil: "ஒன்றின் நான்கு நான்குபடி மூலங்கள் யாவை?",
    options: [
      { label: "A", text: "1, -1, i, -i" }, { label: "B", text: "1, ω, ω², ω³" }, { label: "C", text: "1, 2, 3, 4" }, { label: "D", text: "±1, ±2" }
    ],
    optionsTamil: [
      { label: "A", text: "1, -1, i, -i" }, { label: "B", text: "1, ω, ω², ω³" }, { label: "C", text: "1, 2, 3, 4" }, { label: "D", text: "±1, ±2" }
    ],
    correctAnswer: "A",
    explanation: "z⁴ = 1 => (z² - 1)(z² + 1) = 0 => z = ±1, ±i.",
    explanationTamil: "z⁴ = 1 என்ற சமன்பாட்டின் மூலங்கள் 1, -1, i, -i ஆகும்."
  },
  {
    code: "MAT-046", subject: "Mathematics", topic: "Theory of Equations", difficulty: "easy",
    questionText: "If the discriminant Δ = b² - 4ac > 0 for a quadratic equation ax² + bx + c = 0, the roots are:",
    questionTextTamil: "ax² + bx + c = 0 சமன்பாட்டில் b² - 4ac > 0 எனில் மூலங்களின் தன்மை:",
    options: [
      { label: "A", text: "Real and distinct" }, { label: "B", text: "Real and equal" }, { label: "C", text: "Complex conjugate" }, { label: "D", text: "Purely imaginary" }
    ],
    optionsTamil: [
      { label: "A", text: "மெய் மற்றும் வெவ்வேறானவை" },
      { label: "B", text: "மெய் மற்றும் சமமானவை (Δ = 0)" },
      { label: "C", text: "கலப்பெண் இணைகள் (Δ < 0)" },
      { label: "D", text: "கற்பனை மூலங்கள்" }
    ],
    correctAnswer: "A",
    explanation: "Δ > 0 implies two distinct real roots.",
    explanationTamil: "b² - 4ac > 0 எனில் மூலங்கள் மெய் மற்றும் வெவ்வேறானவை."
  },
  {
    code: "MAT-047", subject: "Mathematics", topic: "Theory of Equations", difficulty: "medium",
    questionText: "The condition that roots of ax³ + bx² + cx + d = 0 are in Arithmetic Progression (A.P.) is:",
    questionTextTamil: "ax³ + bx² + cx + d = 0 சமன்பாட்டின் மூலங்கள் கூட்டுத் தொடரில் (A.P.) அமைய நிபந்தனை:",
    options: [
      { label: "A", text: "2 b³ - 9 a b c + 27 a² d = 0" },
      { label: "B", text: "b³ = a c d" },
      { label: "C", text: "a + d = b + c" },
      { label: "D", text: "b² = 4 a c" }
    ],
    optionsTamil: [
      { label: "A", text: "2 b³ - 9 a b c + 27 a² d = 0" },
      { label: "B", text: "b³ = a c d" },
      { label: "C", text: "a + d = b + c" },
      { label: "D", text: "b² = 4 a c" }
    ],
    correctAnswer: "A",
    explanation: "Let roots be α - d, α, α + d. Sum 3α = -b/a => α = -b/(3a). Substituting x = -b/(3a) yields 2b³ - 9abc + 27a²d = 0.",
    explanationTamil: "மூலங்கள் கூட்டுத் தொடரில் அமைய 2 b³ - 9 a b c + 27 a² d = 0."
  },
  {
    code: "MAT-048", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "medium",
    questionText: "The value of sec⁻¹(x) + cosec⁻¹(x) for |x| ≥ 1 is:",
    questionTextTamil: "|x| ≥ 1 எனில் sec⁻¹(x) + cosec⁻¹(x)-ன் மதிப்பு:",
    options: [
      { label: "A", text: "π / 2" }, { label: "B", text: "π" }, { label: "C", text: "0" }, { label: "D", text: "2π" }
    ],
    optionsTamil: [
      { label: "A", text: "π / 2" }, { label: "B", text: "π" }, { label: "C", text: "0" }, { label: "D", text: "2π" }
    ],
    correctAnswer: "A",
    explanation: "sec⁻¹(x) + cosec⁻¹(x) = cos⁻¹(1/x) + sin⁻¹(1/x) = π/2.",
    explanationTamil: "sec⁻¹(x) + cosec⁻¹(x) = π/2 ஆகும்."
  },
  {
    code: "MAT-049", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "hard",
    questionText: "The value of sin⁻¹(sin(2π/3)) is:",
    questionTextTamil: "sin⁻¹(sin(2π/3))-ன் மதிப்பு யாது?",
    options: [
      { label: "A", text: "π / 3" }, { label: "B", text: "2π / 3" }, { label: "C", text: "- π / 3" }, { label: "D", text: "4π / 3" }
    ],
    optionsTamil: [
      { label: "A", text: "π / 3" }, { label: "B", text: "2π / 3 (வீச்சகத்திற்கு வெளியே உள்ளது)" }, { label: "C", text: "- π / 3" }, { label: "D", text: "4π / 3" }
    ],
    correctAnswer: "A",
    explanation: "2π/3 ∉ [-π/2, π/2]. sin(2π/3) = sin(π - π/3) = sin(π/3). Hence sin⁻¹(sin(π/3)) = π/3.",
    explanationTamil: "2π/3 என்பது [-π/2, π/2] வீச்சகத்தில் இல்லாததால் sin(π - π/3) = sin(π/3) என மாற்றப்பட்டு மதிப்பு π/3 ஆகும்."
  },
  {
    code: "MAT-050", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "hard",
    questionText: "The value of cos⁻¹(cos(7π/6)) is:",
    questionTextTamil: "cos⁻¹(cos(7π/6))-ன் மதிப்பு யாது?",
    options: [
      { label: "A", text: "5π / 6" }, { label: "B", text: "7π / 6" }, { label: "C", text: "π / 6" }, { label: "D", text: "- π / 6" }
    ],
    optionsTamil: [
      { label: "A", text: "5π / 6" }, { label: "B", text: "7π / 6" }, { label: "C", text: "π / 6" }, { label: "D", text: "- π / 6" }
    ],
    correctAnswer: "A",
    explanation: "7π/6 ∉ [0, π]. cos(7π/6) = cos(2π - 5π/6) = cos(5π/6). Since 5π/6 ∈ [0, π], result is 5π/6.",
    explanationTamil: "7π/6 முதன்மை வீச்சகமான [0, π]-ல் இல்லை. cos(2π - 5π/6) = cos(5π/6), எனவே விடை 5π/6."
  },
  {
    code: "MAT-051", subject: "Mathematics", topic: "Theory of Equations", difficulty: "easy",
    questionText: "A real polynomial equation of odd degree with real coefficients has at least:",
    questionTextTamil: "மெய் கெழுக்கள் கொண்ட ஒற்றைப்படை படி பல்லுறுப்புக் கோவை சமன்பாட்டிற்கு குறைந்தது எத்தனை மெய் மூலங்கள் இருக்கும்?",
    options: [
      { label: "A", text: "One real root" }, { label: "B", text: "Two real roots" }, { label: "C", text: "Zero real roots" }, { label: "D", text: "No roots" }
    ],
    optionsTamil: [
      { label: "A", text: "குறைந்தது ஒரு மெய் மூலம் (At least one real root)" },
      { label: "B", text: "இரு மெய் மூலங்கள்" },
      { label: "C", text: "சுழி மெய் மூலங்கள்" },
      { label: "D", text: "மூலங்கள் இல்லை" }
    ],
    correctAnswer: "A",
    explanation: "Complex roots occur in pairs, so an odd-degree polynomial must leave at least one root real.",
    explanationTamil: "கலப்பெண் மூலங்கள் இணையாகவே வருவதால் ஒற்றைப்படை படி சமன்பாட்டிற்கு குறைந்தது ஒரு மெய் மூலம் கட்டாயம் இருக்கும்."
  },
  {
    code: "MAT-052", subject: "Mathematics", topic: "Complex Numbers", difficulty: "easy",
    questionText: "The conjugate of complex number z = -3 + 4i is:",
    questionTextTamil: "z = -3 + 4i என்ற கலப்பெண்ணின் இணை கலப்பெண் z̄:",
    options: [
      { label: "A", text: "-3 - 4i" }, { label: "B", text: "3 - 4i" }, { label: "C", text: "3 + 4i" }, { label: "D", text: "-4 + 3i" }
    ],
    optionsTamil: [
      { label: "A", text: "-3 - 4i" }, { label: "B", text: "3 - 4i" }, { label: "C", text: "3 + 4i" }, { label: "D", text: "-4 + 3i" }
    ],
    correctAnswer: "A",
    explanation: "The conjugate of x + iy is x - iy. For -3 + 4i, conjugate is -3 - 4i.",
    explanationTamil: "கற்பனைப் பகுதியின் குறியை மாற்றினால் -3 - 4i கிடைக்கும்."
  },
  {
    code: "MAT-053", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "easy",
    questionText: "If A is a symmetric matrix, then:",
    questionTextTamil: "A என்பது சமச்சீர் அணி (Symmetric matrix) எனில்:",
    options: [
      { label: "A", text: "Aᵀ = A" }, { label: "B", text: "Aᵀ = -A" }, { label: "C", text: "A⁻¹ = A" }, { label: "D", text: "|A| = 0" }
    ],
    optionsTamil: [
      { label: "A", text: "Aᵀ = A" }, { label: "B", text: "Aᵀ = -A (எதிர் சமச்சீர்)" }, { label: "C", text: "A⁻¹ = A" }, { label: "D", text: "|A| = 0" }
    ],
    correctAnswer: "A",
    explanation: "A symmetric matrix equals its transpose: Aᵀ = A.",
    explanationTamil: "நிரை நிரல் மாற்று அணி மூல அணிக்கு சமமாக (Aᵀ = A) இருந்தால் அது சமச்சீர் அணியாகும்."
  },
  {
    code: "MAT-054", subject: "Mathematics", topic: "Matrices & Determinants", difficulty: "easy",
    questionText: "The diagonal elements of a skew-symmetric matrix are always:",
    questionTextTamil: "ஓர் எதிர் சமச்சீர் அணியின் மூலைவிட்ட உறுப்புகள் எப்போதும் எத்தகையதாக இருக்கும்?",
    options: [
      { label: "A", text: "All zeroes" }, { label: "B", text: "All ones" }, { label: "C", text: "Any real numbers" }, { label: "D", text: "Imaginary numbers" }
    ],
    optionsTamil: [
      { label: "A", text: "அனைத்தும் பூச்சியங்கள் (Zero)" },
      { label: "B", text: "அனைத்தும் 1" },
      { label: "C", text: "ஏதேனும் மெய்யெண்கள்" },
      { label: "D", text: "கற்பனை எண்கள்" }
    ],
    correctAnswer: "A",
    explanation: "a_ii = - a_ii => 2 a_ii = 0 => a_ii = 0 for all diagonal entries.",
    explanationTamil: "a_ii = -a_ii => 2a_ii = 0 => a_ii = 0. எனவே மூலைவிட்ட உறுப்புகள் அனைத்தும் பூச்சியமாகும்."
  },
  {
    code: "MAT-055", subject: "Mathematics", topic: "Inverse Trigonometry", difficulty: "medium",
    questionText: "The value of 2 tan⁻¹(1/3) is equal to:",
    questionTextTamil: "2 tan⁻¹(1/3)-ன் மதிப்பு:",
    options: [
      { label: "A", text: "tan⁻¹(3/4)" }, { label: "B", text: "tan⁻¹(2/3)" }, { label: "C", text: "tan⁻¹(1/6)" }, { label: "D", text: "π / 4" }
    ],
    optionsTamil: [
      { label: "A", text: "tan⁻¹(3/4)" }, { label: "B", text: "tan⁻¹(2/3)" }, { label: "C", text: "tan⁻¹(1/6)" }, { label: "D", text: "π / 4" }
    ],
    correctAnswer: "A",
    explanation: "2 tan⁻¹ x = tan⁻¹[2x / (1 - x²)] = tan⁻¹[(2/3) / (1 - 1/9)] = tan⁻¹[(2/3) / (8/9)] = tan⁻¹(6/8) = tan⁻¹(3/4).",
    explanationTamil: "2 tan⁻¹(1/3) = tan⁻¹[(2/3) / (1 - 1/9)] = tan⁻¹(3/4)."
  }
];
