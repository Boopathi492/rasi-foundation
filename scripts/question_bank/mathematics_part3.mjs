// scripts/question_bank/mathematics_part3.mjs
// Questions MAT-111 to MAT-200: Matrices, Complex Numbers, Equations, Inverse Trig, 2D Geometry & Vectors (90 Questions)

export const mathematicsPart3 = [
  {
    "code": "MAT-111",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Properties of Determinants",
    "difficulty": "easy",
    "questionText": "If A is a square matrix of order 3 and |A| = 4, then the value of |2A| is:",
    "questionTextTamil": "A என்பது வரிசை 3 உடைய ஒரு சதுர அணி மற்றும் |A| = 4 எனில், |2A| இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "8"
      },
      {
        "label": "B",
        "text": "16"
      },
      {
        "label": "C",
        "text": "32"
      },
      {
        "label": "D",
        "text": "64"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "8"
      },
      {
        "label": "B",
        "text": "16"
      },
      {
        "label": "C",
        "text": "32"
      },
      {
        "label": "D",
        "text": "64"
      }
    ],
    "correctAnswer": "C",
    "explanation": "For an n x n matrix, |kA| = k^n |A|. Here n = 3, so |2A| = 2^3 * |A| = 8 * 4 = 32.",
    "explanationTamil": "வரிசை n உடைய சதுர அணிக்கு |kA| = k^n |A|. இங்கு n = 3, எனவே |2A| = 2^3 * 4 = 8 * 4 = 32."
  },
  {
    "code": "MAT-112",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Adjoint of Matrix",
    "difficulty": "medium",
    "questionText": "If A is a non-singular matrix of order n, then |adj(A)| is equal to:",
    "questionTextTamil": "A என்பது வரிசை n உடைய பூஜ்ஜியமற்ற அணிக்கோவை அணி எனில், |adj(A)| இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "|A|^n"
      },
      {
        "label": "B",
        "text": "|A|^(n-1)"
      },
      {
        "label": "C",
        "text": "|A|^(n+1)"
      },
      {
        "label": "D",
        "text": "|A|^(n-2)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|A|^n"
      },
      {
        "label": "B",
        "text": "|A|^(n-1)"
      },
      {
        "label": "C",
        "text": "|A|^(n+1)"
      },
      {
        "label": "D",
        "text": "|A|^(n-2)"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Since A * adj(A) = |A| * I, taking determinant of both sides yields |A| * |adj(A)| = |A|^n, so |adj(A)| = |A|^(n-1).",
    "explanationTamil": "A * adj(A) = |A| * I என்பதால் அணிக்கோவை காணும்போது |A| * |adj(A)| = |A|^n, எனவே |adj(A)| = |A|^(n-1)."
  },
  {
    "code": "MAT-113",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Rank of a Matrix",
    "difficulty": "easy",
    "questionText": "The rank of an identity matrix of order 4 is:",
    "questionTextTamil": "வரிசை 4 உடைய அலகு அணியின் தரம் (rank) யாது?",
    "options": [
      {
        "label": "A",
        "text": "1"
      },
      {
        "label": "B",
        "text": "2"
      },
      {
        "label": "C",
        "text": "3"
      },
      {
        "label": "D",
        "text": "4"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "1"
      },
      {
        "label": "B",
        "text": "2"
      },
      {
        "label": "C",
        "text": "3"
      },
      {
        "label": "D",
        "text": "4"
      }
    ],
    "correctAnswer": "D",
    "explanation": "The identity matrix I_n is of full rank n because its determinant is 1 (non-zero). For order 4, rank is 4.",
    "explanationTamil": "அலகு அணி I_4 இன் அணிக்கோவை மதிப்பு 1 (பூஜ்ஜியமற்றது) என்பதால் அதன் தரம் 4 ஆகும்."
  },
  {
    "code": "MAT-114",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Cramer's Rule",
    "difficulty": "medium",
    "questionText": "Cramer's rule is applicable for solving a system of linear equations only when the determinant of the coefficient matrix Delta satisfies:",
    "questionTextTamil": "கிராமரின் விதியை ஒரு நேரியல் சமன்பாட்டுத் தொகுப்பைத் தீர்க்கப் பயன்படுத்த கெழுக்களின் அணிக்கோவை Delta எதனை நிறைவு செய்ய வேண்டும்?",
    "options": [
      {
        "label": "A",
        "text": "Delta = 0"
      },
      {
        "label": "B",
        "text": "Delta != 0"
      },
      {
        "label": "C",
        "text": "Delta > 0"
      },
      {
        "label": "D",
        "text": "Delta < 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "Delta = 0"
      },
      {
        "label": "B",
        "text": "Delta != 0"
      },
      {
        "label": "C",
        "text": "Delta > 0"
      },
      {
        "label": "D",
        "text": "Delta < 0"
      }
    ],
    "correctAnswer": "B",
    "explanation": "In Cramer's rule, x = Delta_x / Delta; therefore Delta must be non-zero to provide a unique solution.",
    "explanationTamil": "கிராமரின் விதியில் x = Delta_x / Delta என்பதால் ஒரேயொரு தீர்வு கிடைக்க Delta != 0 ஆக இருக்க வேண்டும்."
  },
  {
    "code": "MAT-115",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Orthogonal Matrix",
    "difficulty": "medium",
    "questionText": "A square matrix A is said to be orthogonal if:",
    "questionTextTamil": "ஒரு சதுர அணி A செங்குத்து அணி (orthogonal matrix) எனில் அது நிறைவு செய்யும் நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "A * A^T = I"
      },
      {
        "label": "B",
        "text": "A = A^T"
      },
      {
        "label": "C",
        "text": "A = -A^T"
      },
      {
        "label": "D",
        "text": "A^2 = I"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "A * A^T = I"
      },
      {
        "label": "B",
        "text": "A = A^T"
      },
      {
        "label": "C",
        "text": "A = -A^T"
      },
      {
        "label": "D",
        "text": "A^2 = I"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A real square matrix A is orthogonal if its transpose equals its inverse, i.e., A * A^T = A^T * A = I.",
    "explanationTamil": "ஒரு சதுர அணி A இன் இடமாற்று அணி அதன் நேர்மாறுக்கு சமமாக இருப்பின் (A * A^T = I) அது செங்குத்து அணியாகும்."
  },
  {
    "code": "MAT-116",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Inverse of a Matrix",
    "difficulty": "easy",
    "questionText": "If A is a square matrix, the inverse matrix A^(-1) exists if and only if:",
    "questionTextTamil": "சதுர அணி A க்கு நேர்மாறு அணி A^(-1) இருப்பதற்கான தேவையானதும் போதுமானதுமான நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "|A| != 0 (A is non-singular)"
      },
      {
        "label": "B",
        "text": "|A| = 0 (A is singular)"
      },
      {
        "label": "C",
        "text": "A is symmetric"
      },
      {
        "label": "D",
        "text": "A is diagonal"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|A| != 0 (A பூஜ்ஜியமற்ற அணிக்கோவை அணி)"
      },
      {
        "label": "B",
        "text": "|A| = 0 (A பூஜ்ஜிய அணிக்கோவை அணி)"
      },
      {
        "label": "C",
        "text": "A சமச்சீர் அணி"
      },
      {
        "label": "D",
        "text": "A மூலைவிட்ட அணி"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A^(-1) = (1 / |A|) * adj(A); division by zero is undefined, so A^(-1) exists if and only if |A| != 0.",
    "explanationTamil": "A^(-1) = (1 / |A|) * adj(A) என்பதால் |A| != 0 என இருக்கும்போது மட்டுமே நேர்மாறு அணி இருக்கும்."
  },
  {
    "code": "MAT-117",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "System Consistency",
    "difficulty": "hard",
    "questionText": "For a non-homogeneous system of linear equations AX = B, if rank(A) = rank([A|B]) < number of unknowns n, then the system has:",
    "questionTextTamil": "AX = B என்ற சமபடித்தானதற்ற நேரியல் சமன்பாட்டுத் தொகுப்பில் rank(A) = rank([A|B]) < மாறிகளின் எண்ணிக்கை n எனில், தொகுப்பு:",
    "options": [
      {
        "label": "A",
        "text": "Infinitely many solutions"
      },
      {
        "label": "B",
        "text": "A unique solution"
      },
      {
        "label": "C",
        "text": "No solution (inconsistent)"
      },
      {
        "label": "D",
        "text": "Exactly two solutions"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "எண்ணிக்கையற்ற தீர்வுகள் பெற்றுள்ளது"
      },
      {
        "label": "B",
        "text": "ஒரேயொரு தீர்வு பெற்றுள்ளது"
      },
      {
        "label": "C",
        "text": "தீர்வு ஏதுமில்லை (ஒருங்கமைவற்றது)"
      },
      {
        "label": "D",
        "text": "சரியாக இரண்டு தீர்வுகள் பெற்றுள்ளது"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By Rouche-Capelli theorem, when rank(A) = rank([A|B]) = r < n, the system is consistent with infinitely many solutions parameterized by (n - r) free variables.",
    "explanationTamil": "ரூச்சே-கபெல்லி தேற்றத்தின்படி, rank(A) = rank([A|B]) < n எனில் தொகுப்பு ஒருங்கமைவு உடையது மற்றும் எண்ணிக்கையற்ற தீர்வுகள் கொண்டது."
  },
  {
    "code": "MAT-118",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Homogeneous System",
    "difficulty": "medium",
    "questionText": "The homogeneous system AX = 0 has a non-trivial (non-zero) solution if and only if:",
    "questionTextTamil": "AX = 0 என்ற சமபடித்தான தொகுப்பு வெளிப்படையற்ற (பூஜ்ஜியமற்ற) தீர்வைக் கொண்டிருக்க நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "|A| = 0"
      },
      {
        "label": "B",
        "text": "|A| != 0"
      },
      {
        "label": "C",
        "text": "|A| = 1"
      },
      {
        "label": "D",
        "text": "A is identity matrix"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|A| = 0"
      },
      {
        "label": "B",
        "text": "|A| != 0"
      },
      {
        "label": "C",
        "text": "|A| = 1"
      },
      {
        "label": "D",
        "text": "A அலகு அணி"
      }
    ],
    "correctAnswer": "A",
    "explanation": "For AX = 0, if |A| != 0, the only solution is X = 0 (trivial). If |A| = 0, rank(A) < n, giving non-trivial solutions.",
    "explanationTamil": "AX = 0 தொகுப்பில் |A| = 0 எனில் மட்டுமே பூஜ்ஜியமற்ற வெளிப்படையற்ற தீர்வுகள் கிடைக்கும்."
  },
  {
    "code": "MAT-119",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Skew-Symmetric Matrix",
    "difficulty": "medium",
    "questionText": "The determinant of any skew-symmetric matrix of odd order is always:",
    "questionTextTamil": "ஒற்றைப்படை வரிசை கொண்ட எந்தவொரு எதிர் சமச்சீர் அணியின் அணிக்கோவை மதிப்பு எப்போதும்:",
    "options": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "Undefined"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "வரையறுக்கப்படவில்லை"
      }
    ],
    "correctAnswer": "A",
    "explanation": "If A^T = -A and order n is odd, |A| = |A^T| = |-A| = (-1)^n |A| = -|A| => 2|A| = 0 => |A| = 0.",
    "explanationTamil": "வரிசை n ஒற்றைப்படை எனில் |A| = |-A| = (-1)^n |A| = -|A|, எனவே 2|A| = 0 => |A| = 0."
  },
  {
    "code": "MAT-120",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Trace of a Matrix",
    "difficulty": "easy",
    "questionText": "The trace of a square matrix is defined as:",
    "questionTextTamil": "ஒரு சதுர அணியின் சுவடு (trace) என்பது:",
    "options": [
      {
        "label": "A",
        "text": "Sum of its main diagonal elements"
      },
      {
        "label": "B",
        "text": "Product of its main diagonal elements"
      },
      {
        "label": "C",
        "text": "Determinant of the matrix"
      },
      {
        "label": "D",
        "text": "Sum of all its elements"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "முதன்மை மூலைவிட்ட உறுப்புகளின் கூடுதல்"
      },
      {
        "label": "B",
        "text": "முதன்மை மூலைவிட்ட உறுப்புகளின் பெருக்கல்"
      },
      {
        "label": "C",
        "text": "அணியின் அணிக்கோவை மதிப்பு"
      },
      {
        "label": "D",
        "text": "அனைத்து உறுப்புகளின் கூடுதல்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Trace tr(A) is the sum of the principal diagonal entries: sum_{i=1}^n a_ii.",
    "explanationTamil": "அணியின் சுவடு tr(A) என்பது அதன் முதன்மை மூலைவிட்ட உறுப்புகளின் கூடுதலாகும்."
  },
  {
    "code": "MAT-121",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Powers of i",
    "difficulty": "easy",
    "questionText": "The value of i^(2024) + i^(2025) + i^(2026) + i^(2027) is:",
    "questionTextTamil": "i^(2024) + i^(2025) + i^(2026) + i^(2027) இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "i"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "i"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The sum of any four consecutive powers of i is always zero: i^0 + i^1 + i^2 + i^3 = 1 + i - 1 - i = 0.",
    "explanationTamil": "அடுத்தடுத்த நான்கு i இன் அடுக்குகளின் கூடுதல் எப்போதும் பூஜ்ஜியமாகும்: 1 + i - 1 - i = 0."
  },
  {
    "code": "MAT-122",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Modulus and Conjugate",
    "difficulty": "medium",
    "questionText": "For any complex number z, the product z * bar(z) is equal to:",
    "questionTextTamil": "எந்தவொரு கலப்பெண் z க்கும் z * bar(z) இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "|z|^2"
      },
      {
        "label": "B",
        "text": "|z|"
      },
      {
        "label": "C",
        "text": "2 * Re(z)"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|z|^2"
      },
      {
        "label": "B",
        "text": "|z|"
      },
      {
        "label": "C",
        "text": "2 * Re(z)"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "If z = x + iy, then z * bar(z) = (x + iy)(x - iy) = x^2 + y^2 = |z|^2.",
    "explanationTamil": "z = x + iy எனில் z * bar(z) = (x + iy)(x - iy) = x^2 + y^2 = |z|^2."
  },
  {
    "code": "MAT-123",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Triangle Inequality",
    "difficulty": "medium",
    "questionText": "For two complex numbers z1 and z2, the triangle inequality states that:",
    "questionTextTamil": "z1 மற்றும் z2 ஆகிய இரண்டு கலப்பெண்களுக்கு முக்கோண சமனிலி கூறுவது:",
    "options": [
      {
        "label": "A",
        "text": "|z1 + z2| <= |z1| + |z2|"
      },
      {
        "label": "B",
        "text": "|z1 + z2| >= |z1| + |z2|"
      },
      {
        "label": "C",
        "text": "|z1 - z2| = |z1| - |z2|"
      },
      {
        "label": "D",
        "text": "|z1 + z2|^2 = |z1|^2 + |z2|^2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|z1 + z2| <= |z1| + |z2|"
      },
      {
        "label": "B",
        "text": "|z1 + z2| >= |z1| + |z2|"
      },
      {
        "label": "C",
        "text": "|z1 - z2| = |z1| - |z2|"
      },
      {
        "label": "D",
        "text": "|z1 + z2|^2 = |z1|^2 + |z2|^2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The modulus of the sum of two complex numbers is always less than or equal to the sum of their individual moduli: |z1 + z2| <= |z1| + |z2|.",
    "explanationTamil": "இரு கலப்பெண்களின் கூடுதலின் மட்டு அவற்றின் தனித்தனி மட்டுகளின் கூடுதலை விட குறைவாகவோ அல்லது சமமாகவோ இருக்கும்: |z1 + z2| <= |z1| + |z2|."
  },
  {
    "code": "MAT-124",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Polar Form",
    "difficulty": "medium",
    "questionText": "The principal argument Arg(z) of a complex number z lies in the interval:",
    "questionTextTamil": "ஒரு கலப்பெண் z இன் முதன்மை வீச்சு Arg(z) எந்த இடைவெளியில் அமையும்?",
    "options": [
      {
        "label": "A",
        "text": "(-pi, pi]"
      },
      {
        "label": "B",
        "text": "[0, 2*pi)"
      },
      {
        "label": "C",
        "text": "[0, pi]"
      },
      {
        "label": "D",
        "text": "[-pi/2, pi/2]"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(-pi, pi]"
      },
      {
        "label": "B",
        "text": "[0, 2*pi)"
      },
      {
        "label": "C",
        "text": "[0, pi]"
      },
      {
        "label": "D",
        "text": "[-pi/2, pi/2]"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By international convention, principal argument Arg(z) is uniquely defined in the half-open interval -pi < theta <= pi.",
    "explanationTamil": "சர்வதேச மரபுப்படி முதன்மை வீச்சு Arg(z) ஆனது -pi < theta <= pi என்ற இடைவெளியில் அமையும்."
  },
  {
    "code": "MAT-125",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Cube Roots of Unity",
    "difficulty": "easy",
    "questionText": "If omega is a complex cube root of unity, then 1 + omega + omega^2 equals:",
    "questionTextTamil": "omega என்பது ஒன்றின் கலப்பெண் முப்படி மூலம் எனில், 1 + omega + omega^2 இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "3"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "3"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The sum of all n-th roots of unity is zero; for n = 3, 1 + omega + omega^2 = 0.",
    "explanationTamil": "ஒன்றின் அனைத்து n-ஆம் படி மூலங்களின் கூடுதல் பூஜ்ஜியமாகும், எனவே 1 + omega + omega^2 = 0."
  },
  {
    "code": "MAT-126",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "De Moivre's Theorem",
    "difficulty": "medium",
    "questionText": "According to de Moivre's theorem, (cos theta + i sin theta)^n equals:",
    "questionTextTamil": "டி மாய்வரின் தேற்றத்தின்படி, (cos theta + i sin theta)^n இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "cos(n*theta) + i sin(n*theta)"
      },
      {
        "label": "B",
        "text": "cos^n(theta) + i sin^n(theta)"
      },
      {
        "label": "C",
        "text": "cos(n*theta) - i sin(n*theta)"
      },
      {
        "label": "D",
        "text": "n cos(theta) + i n sin(theta)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "cos(n*theta) + i sin(n*theta)"
      },
      {
        "label": "B",
        "text": "cos^n(theta) + i sin^n(theta)"
      },
      {
        "label": "C",
        "text": "cos(n*theta) - i sin(n*theta)"
      },
      {
        "label": "D",
        "text": "n cos(theta) + i n sin(theta)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "De Moivre's theorem states that for any rational n, (cos theta + i sin theta)^n = cos(n*theta) + i sin(n*theta).",
    "explanationTamil": "டி மாய்வரின் தேற்றத்தின்படி விகிதமுறு எண் n க்கு (cos theta + i sin theta)^n = cos(n*theta) + i sin(n*theta)."
  },
  {
    "code": "MAT-127",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Locus in Complex Plane",
    "difficulty": "hard",
    "questionText": "The equation |z - z0| = r (where r > 0) in the complex plane represents a:",
    "questionTextTamil": "கலப்பெண் தளத்தில் |z - z0| = r (இங்கு r > 0) என்ற சமன்பாடு எதனைக் குறிக்கிறது?",
    "options": [
      {
        "label": "A",
        "text": "Circle with center z0 and radius r"
      },
      {
        "label": "B",
        "text": "Straight line through z0"
      },
      {
        "label": "C",
        "text": "Parabola with focus z0"
      },
      {
        "label": "D",
        "text": "Ellipse with focal distance r"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "மையம் z0 மற்றும் ஆரம் r உடைய வட்டம்"
      },
      {
        "label": "B",
        "text": "z0 வழியே செல்லும் நேர்க்கோடு"
      },
      {
        "label": "C",
        "text": "குவியம் z0 உடைய பரவளையம்"
      },
      {
        "label": "D",
        "text": "நீள்வட்டம்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "|z - z0| is the Euclidean distance from z to z0; fixing this distance to constant r defines a circle centered at z0 with radius r.",
    "explanationTamil": "|z - z0| என்பது z க்கும் z0 க்கும் இடையே உள்ள தூரம்; அது நிலையான எண் r க்கு சமமாக இருப்பதால் மையம் z0, ஆரம் r உடைய வட்டத்தைக் குறிக்கிறது."
  },
  {
    "code": "MAT-128",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Geometric Representation",
    "difficulty": "medium",
    "questionText": "If |z1| = |z2| and arg(z1) + arg(z2) = 0, then z1 and z2 are:",
    "questionTextTamil": "|z1| = |z2| மற்றும் arg(z1) + arg(z2) = 0 எனில், z1 மற்றும் z2 எத்தகையவை?",
    "options": [
      {
        "label": "A",
        "text": "Complex conjugates of each other (z1 = bar(z2))"
      },
      {
        "label": "B",
        "text": "Equal (z1 = z2)"
      },
      {
        "label": "C",
        "text": "Opposite in sign (z1 = -z2)"
      },
      {
        "label": "D",
        "text": "Reciprocals"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "ஒன்றற்கொன்று இணை கலப்பெண்கள் (z1 = bar(z2))"
      },
      {
        "label": "B",
        "text": "சமமானவை (z1 = z2)"
      },
      {
        "label": "C",
        "text": "எதிர்க்குறி உடையவை (z1 = -z2)"
      },
      {
        "label": "D",
        "text": "தலைகீழிகள்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "If arg(z1) = theta, then arg(z2) = -theta. Since magnitudes are equal, z2 = r(cos(-theta) + i sin(-theta)) = r(cos theta - i sin theta) = bar(z1).",
    "explanationTamil": "மட்டுகள் சமமாகவும் வீச்சுகள் எதிர்க்குறியாகவும் இருப்பதால் z1 மற்றும் z2 ஒன்றற்கொன்று இணை கலப்பெண்களாகும்."
  },
  {
    "code": "MAT-129",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Fourth Roots of Unity",
    "difficulty": "easy",
    "questionText": "The fourth roots of unity are:",
    "questionTextTamil": "ஒன்றின் நான்காம் படி மூலங்கள் எவை?",
    "options": [
      {
        "label": "A",
        "text": "1, -1, i, -i"
      },
      {
        "label": "B",
        "text": "1, omega, omega^2, omega^3"
      },
      {
        "label": "C",
        "text": "1, -1, 0, i"
      },
      {
        "label": "D",
        "text": "2, -2, 2i, -2i"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "1, -1, i, -i"
      },
      {
        "label": "B",
        "text": "1, omega, omega^2, omega^3"
      },
      {
        "label": "C",
        "text": "1, -1, 0, i"
      },
      {
        "label": "D",
        "text": "2, -2, 2i, -2i"
      }
    ],
    "correctAnswer": "A",
    "explanation": "z^4 = 1 has solutions z = e^(i * 2*k*pi / 4) for k=0,1,2,3 which give 1, i, -1, -i.",
    "explanationTamil": "z^4 = 1 இன் தீர்வுகள் 1, -1, i, -i ஆகும்."
  },
  {
    "code": "MAT-130",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Perpendicularity Condition",
    "difficulty": "hard",
    "questionText": "If the segments joining the origin to z1 and z2 are mutually perpendicular, then Re(z1 * bar(z2)) is:",
    "questionTextTamil": "ஆதிப்புள்ளியிலிருந்து z1 மற்றும் z2 ஐ இணைக்கும் கோட்டுத்துண்டுகள் ஒன்றுக்கொன்று செங்குத்து எனில், Re(z1 * bar(z2)) இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "|z1||z2|"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "|z1||z2|"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Perpendicular segments imply arg(z1 / z2) = +- pi/2, so z1 / z2 is purely imaginary, which implies Re(z1 * bar(z2)) = 0.",
    "explanationTamil": "கோடுகள் செங்குத்து எனில் z1 / z2 என்பது முற்றிலும் கற்பனை எண், எனவே Re(z1 * bar(z2)) = 0."
  },
  {
    "code": "MAT-131",
    "subject": "Mathematics",
    "chapter": "Theory of Equations",
    "topic": "Vieta's Formulas",
    "difficulty": "easy",
    "questionText": "For a cubic equation ax^3 + bx^2 + cx + d = 0, the sum of roots (alpha + beta + gamma) is:",
    "questionTextTamil": "ax^3 + bx^2 + cx + d = 0 என்ற முப்படி சமன்பாட்டின் மூலங்களின் கூடுதல் (alpha + beta + gamma) யாது?",
    "options": [
      {
        "label": "A",
        "text": "-b / a"
      },
      {
        "label": "B",
        "text": "c / a"
      },
      {
        "label": "C",
        "text": "-d / a"
      },
      {
        "label": "D",
        "text": "b / a"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "-b / a"
      },
      {
        "label": "B",
        "text": "c / a"
      },
      {
        "label": "C",
        "text": "-d / a"
      },
      {
        "label": "D",
        "text": "b / a"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By Vieta's relations, the sum of the roots taken one at a time is S1 = -b/a.",
    "explanationTamil": "வியேட்டாவின் சூத்திரப்படி மூலங்களின் கூடுதல் S1 = -b/a ஆகும்."
  },
  {
    "code": "MAT-132",
    "subject": "Mathematics",
    "chapter": "Theory of Equations",
    "topic": "Complex Conjugate Root Theorem",
    "difficulty": "easy",
    "questionText": "If a polynomial equation with real coefficients has 2 + 3i as a root, another root must be:",
    "questionTextTamil": "மெய் எண்களைக் கெழுக்களாகக் கொண்ட பல்லுறுப்புக் கோவை சமன்பாட்டின் ஒரு மூலம் 2 + 3i எனில், மற்றொரு மூலம் கட்டாயமாக என்னவாக இருக்கும்?",
    "options": [
      {
        "label": "A",
        "text": "2 - 3i"
      },
      {
        "label": "B",
        "text": "-2 + 3i"
      },
      {
        "label": "C",
        "text": "-2 - 3i"
      },
      {
        "label": "D",
        "text": "3 + 2i"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2 - 3i"
      },
      {
        "label": "B",
        "text": "-2 + 3i"
      },
      {
        "label": "C",
        "text": "-2 - 3i"
      },
      {
        "label": "D",
        "text": "3 + 2i"
      }
    ],
    "correctAnswer": "A",
    "explanation": "In any polynomial equation with real coefficients, complex non-real roots always occur in conjugate pairs (a +- ib).",
    "explanationTamil": "மெய் கெழுக்களைக் கொண்ட சமன்பாட்டில் கலப்பெண் மூலங்கள் எப்போதும் இணை ஜோடிகளாகவே (a +- ib) தோன்றும்."
  },
  {
    "code": "MAT-133",
    "subject": "Mathematics",
    "chapter": "Theory of Equations",
    "topic": "Descartes' Rule of Signs",
    "difficulty": "medium",
    "questionText": "Descartes' rule of signs states that the number of positive real roots of a polynomial P(x) = 0 cannot exceed:",
    "questionTextTamil": "டெகார்ட்டேயின் குறி விதிப்படி, P(x) = 0 என்ற பல்லுறுப்புக் கோவையின் மிகை மெய் மூலங்களின் எண்ணிக்கை எதை விட அதிகமாக இருக்க முடியாது?",
    "options": [
      {
        "label": "A",
        "text": "The number of sign changes in the coefficients of P(x)"
      },
      {
        "label": "B",
        "text": "The degree of P(x)"
      },
      {
        "label": "C",
        "text": "The number of terms in P(x)"
      },
      {
        "label": "D",
        "text": "The constant term"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "P(x) இன் கெழுக்களின் குறி மாற்றங்களின் எண்ணிக்கை"
      },
      {
        "label": "B",
        "text": "P(x) இன் படி"
      },
      {
        "label": "C",
        "text": "P(x) இல் உள்ள உறுப்புகளின் எண்ணிக்கை"
      },
      {
        "label": "D",
        "text": "மாறிலி உறுப்பு"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Descartes' rule of signs dictates that the number of positive roots is at most the number of sign changes between consecutive nonzero coefficients of P(x).",
    "explanationTamil": "P(x) இன் கெழுக்களில் ஏற்படும் குறி மாற்றங்களின் எண்ணிக்கையே மிகை மூலங்களின் அதிகபட்ச எண்ணிக்கையாகும்."
  },
  {
    "code": "MAT-134",
    "subject": "Mathematics",
    "chapter": "Theory of Equations",
    "topic": "Irrational Conjugate Roots",
    "difficulty": "easy",
    "questionText": "If 3 - sqrt(5) is a root of a polynomial equation with rational coefficients, then its conjugate root is:",
    "questionTextTamil": "விகிதமுறு கெழுக்களைக் கொண்ட பல்லுறுப்புக் கோவை சமன்பாட்டின் ஒரு மூலம் 3 - sqrt(5) எனில், அதன் இணை மூலம்:",
    "options": [
      {
        "label": "A",
        "text": "3 + sqrt(5)"
      },
      {
        "label": "B",
        "text": "-3 + sqrt(5)"
      },
      {
        "label": "C",
        "text": "-3 - sqrt(5)"
      },
      {
        "label": "D",
        "text": "sqrt(5) - 3"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "3 + sqrt(5)"
      },
      {
        "label": "B",
        "text": "-3 + sqrt(5)"
      },
      {
        "label": "C",
        "text": "-3 - sqrt(5)"
      },
      {
        "label": "D",
        "text": "sqrt(5) - 3"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Irrational roots of the form p - sqrt(q) always occur in pairs with p + sqrt(q) for polynomials with rational coefficients.",
    "explanationTamil": "விகிதமுறு கெழுக்களைக் கொண்ட சமன்பாட்டில் p - sqrt(q) என்பது மூலம் எனில் p + sqrt(q) மற்றொரு மூலமாகும்."
  },
  {
    "code": "MAT-135",
    "subject": "Mathematics",
    "chapter": "Theory of Equations",
    "topic": "Reciprocal Equations",
    "difficulty": "medium",
    "questionText": "A polynomial equation P(x) = 0 is called a reciprocal equation of Type I if:",
    "questionTextTamil": "P(x) = 0 என்ற பல்லுறுப்புக் கோவை சமன்பாடு வகை I தலைகீழ் சமன்பாடு என அழைக்கப்பட நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "P(1/x) = P(x)"
      },
      {
        "label": "B",
        "text": "P(1/x) = -P(x)"
      },
      {
        "label": "C",
        "text": "P(-x) = P(x)"
      },
      {
        "label": "D",
        "text": "P(x) = 0 for all x"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "P(1/x) = P(x)"
      },
      {
        "label": "B",
        "text": "P(1/x) = -P(x)"
      },
      {
        "label": "C",
        "text": "P(-x) = P(x)"
      },
      {
        "label": "D",
        "text": "அனைத்து x க்கும் P(x) = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Type I reciprocal equations remain unchanged when x is replaced by 1/x (coefficients equidistant from beginning and end are equal).",
    "explanationTamil": "x க்கு பதிலாக 1/x ஐப் பிரதியிடும்போது சமன்பாடு மாறாமல் இருப்பின் P(1/x) = P(x) அது வகை I தலைகீழ் சமன்பாடாகும்."
  },
  {
    "code": "MAT-136",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Principal Value Branch",
    "difficulty": "easy",
    "questionText": "The principal value branch of sin^(-1)(x) is:",
    "questionTextTamil": "sin^(-1)(x) இன் முதன்மை மதிப்பு கிளை எது?",
    "options": [
      {
        "label": "A",
        "text": "[-pi/2, pi/2]"
      },
      {
        "label": "B",
        "text": "[0, pi]"
      },
      {
        "label": "C",
        "text": "(-pi/2, pi/2)"
      },
      {
        "label": "D",
        "text": "[0, 2*pi]"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "[-pi/2, pi/2]"
      },
      {
        "label": "B",
        "text": "[0, pi]"
      },
      {
        "label": "C",
        "text": "(-pi/2, pi/2)"
      },
      {
        "label": "D",
        "text": "[0, 2*pi]"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By definition, the range of principal values of sin^(-1)(x) is [-pi/2, pi/2].",
    "explanationTamil": "வரையறைப்படி sin^(-1)(x) இன் முதன்மை மதிப்பு வீச்சகம் [-pi/2, pi/2] ஆகும்."
  },
  {
    "code": "MAT-137",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Principal Value Branch of cos^(-1)",
    "difficulty": "easy",
    "questionText": "The principal value branch of cos^(-1)(x) is:",
    "questionTextTamil": "cos^(-1)(x) இன் முதன்மை மதிப்பு கிளை எது?",
    "options": [
      {
        "label": "A",
        "text": "[0, pi]"
      },
      {
        "label": "B",
        "text": "[-pi/2, pi/2]"
      },
      {
        "label": "C",
        "text": "(0, pi)"
      },
      {
        "label": "D",
        "text": "[-pi, pi]"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "[0, pi]"
      },
      {
        "label": "B",
        "text": "[-pi/2, pi/2]"
      },
      {
        "label": "C",
        "text": "(0, pi)"
      },
      {
        "label": "D",
        "text": "[-pi, pi]"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The range of principal value branch of cos^(-1)(x) is [0, pi].",
    "explanationTamil": "cos^(-1)(x) இன் முதன்மை மதிப்பு வீச்சகம் [0, pi] ஆகும்."
  },
  {
    "code": "MAT-138",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Complementary Angles",
    "difficulty": "easy",
    "questionText": "For any x in [-1, 1], the value of sin^(-1)(x) + cos^(-1)(x) is:",
    "questionTextTamil": "x in [-1, 1] எனில், sin^(-1)(x) + cos^(-1)(x) இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "pi / 2"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "0"
      },
      {
        "label": "D",
        "text": "2*pi"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "pi / 2"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "0"
      },
      {
        "label": "D",
        "text": "2*pi"
      }
    ],
    "correctAnswer": "A",
    "explanation": "sin^(-1)(x) + cos^(-1)(x) = pi/2 for all x in [-1, 1].",
    "explanationTamil": "அனைத்து x in [-1, 1] க்கும் sin^(-1)(x) + cos^(-1)(x) = pi/2 ஆகும்."
  },
  {
    "code": "MAT-139",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Evaluation",
    "difficulty": "medium",
    "questionText": "The value of cos^(-1)(cos(7*pi / 6)) is:",
    "questionTextTamil": "cos^(-1)(cos(7*pi / 6)) இன் மதிப்பு என்ன?",
    "options": [
      {
        "label": "A",
        "text": "5*pi / 6"
      },
      {
        "label": "B",
        "text": "7*pi / 6"
      },
      {
        "label": "C",
        "text": "pi / 6"
      },
      {
        "label": "D",
        "text": "-pi / 6"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "5*pi / 6"
      },
      {
        "label": "B",
        "text": "7*pi / 6"
      },
      {
        "label": "C",
        "text": "pi / 6"
      },
      {
        "label": "D",
        "text": "-pi / 6"
      }
    ],
    "correctAnswer": "A",
    "explanation": "7*pi/6 is outside [0, pi]. cos(7*pi/6) = cos(2*pi - 5*pi/6) = cos(5*pi/6). Since 5*pi/6 is in [0, pi], answer is 5*pi/6.",
    "explanationTamil": "7*pi/6 வீச்சகமான [0, pi] இல் இல்லை. cos(7*pi/6) = cos(5*pi/6), எனவே விடை 5*pi/6."
  },
  {
    "code": "MAT-140",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "tan^(-1) Addition Formula",
    "difficulty": "medium",
    "questionText": "If xy < 1, then tan^(-1)(x) + tan^(-1)(y) equals:",
    "questionTextTamil": "xy < 1 எனில், tan^(-1)(x) + tan^(-1)(y) எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "tan^(-1)((x + y) / (1 - xy))"
      },
      {
        "label": "B",
        "text": "tan^(-1)((x - y) / (1 + xy))"
      },
      {
        "label": "C",
        "text": "pi + tan^(-1)((x + y) / (1 - xy))"
      },
      {
        "label": "D",
        "text": "cot^(-1)((x + y) / (1 - xy))"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "tan^(-1)((x + y) / (1 - xy))"
      },
      {
        "label": "B",
        "text": "tan^(-1)((x - y) / (1 + xy))"
      },
      {
        "label": "C",
        "text": "pi + tan^(-1)((x + y) / (1 - xy))"
      },
      {
        "label": "D",
        "text": "cot^(-1)((x + y) / (1 - xy))"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard identity: tan^(-1)(x) + tan^(-1)(y) = tan^(-1)((x + y) / (1 - xy)) whenever xy < 1.",
    "explanationTamil": "xy < 1 எனும்போது tan^(-1)(x) + tan^(-1)(y) = tan^(-1)((x + y) / (1 - xy)) ஆகும்."
  },
  {
    "code": "MAT-141",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Eccentricity of Conics",
    "difficulty": "easy",
    "questionText": "The eccentricity e of a parabola is always equal to:",
    "questionTextTamil": "பரவளையத்தின் மையத்தொலைத்தகவு e எப்போதும் எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "1"
      },
      {
        "label": "B",
        "text": "0"
      },
      {
        "label": "C",
        "text": "e < 1"
      },
      {
        "label": "D",
        "text": "e > 1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "1"
      },
      {
        "label": "B",
        "text": "0"
      },
      {
        "label": "C",
        "text": "e < 1"
      },
      {
        "label": "D",
        "text": "e > 1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "For a circle e = 0, for an ellipse 0 < e < 1, for a parabola e = 1, and for a hyperbola e > 1.",
    "explanationTamil": "வட்டத்திற்கு e = 0, நீள்வட்டத்திற்கு e < 1, பரவளையத்திற்கு e = 1, அதிபரவளையத்திற்கு e > 1."
  },
  {
    "code": "MAT-142",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Latus Rectum of Parabola",
    "difficulty": "easy",
    "questionText": "The length of the latus rectum of the standard parabola y^2 = 4ax is:",
    "questionTextTamil": "y^2 = 4ax என்ற பரவளையத்தின் செவ்வகலத்தின் நீளம் யாது?",
    "options": [
      {
        "label": "A",
        "text": "4a"
      },
      {
        "label": "B",
        "text": "2a"
      },
      {
        "label": "C",
        "text": "a"
      },
      {
        "label": "D",
        "text": "8a"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "4a"
      },
      {
        "label": "B",
        "text": "2a"
      },
      {
        "label": "C",
        "text": "a"
      },
      {
        "label": "D",
        "text": "8a"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The chord passing through the focus perpendicular to the axis is the latus rectum, having length 4a.",
    "explanationTamil": "குவியத்தின் வழியே அச்சுக்கு செங்குத்தாகச் செல்லும் செவ்வகலத்தின் நீளம் 4a ஆகும்."
  },
  {
    "code": "MAT-143",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Ellipse Eccentricity",
    "difficulty": "medium",
    "questionText": "If the equation of an ellipse is x^2 / 16 + y^2 / 9 = 1, its eccentricity e is:",
    "questionTextTamil": "x^2 / 16 + y^2 / 9 = 1 என்ற நீள்வட்டத்தின் மையத்தொலைத்தகவு e யாது?",
    "options": [
      {
        "label": "A",
        "text": "sqrt(7) / 4"
      },
      {
        "label": "B",
        "text": "3 / 4"
      },
      {
        "label": "C",
        "text": "7 / 16"
      },
      {
        "label": "D",
        "text": "sqrt(7) / 3"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "sqrt(7) / 4"
      },
      {
        "label": "B",
        "text": "3 / 4"
      },
      {
        "label": "C",
        "text": "7 / 16"
      },
      {
        "label": "D",
        "text": "sqrt(7) / 3"
      }
    ],
    "correctAnswer": "A",
    "explanation": "a^2 = 16, b^2 = 9. e = sqrt(1 - b^2 / a^2) = sqrt(1 - 9/16) = sqrt(7/16) = sqrt(7) / 4.",
    "explanationTamil": "e = sqrt(1 - b^2/a^2) = sqrt(1 - 9/16) = sqrt(7) / 4."
  },
  {
    "code": "MAT-144",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Asymptotes of Hyperbola",
    "difficulty": "medium",
    "questionText": "The angle between the asymptotes of a rectangular hyperbola is:",
    "questionTextTamil": "செவ்வக அதிபரவளையத்தின் தொலைத்தொடுகோடுகளுக்கு இடைப்பட்ட கோணம் யாது?",
    "options": [
      {
        "label": "A",
        "text": "pi / 2 (90°)"
      },
      {
        "label": "B",
        "text": "pi / 4 (45°)"
      },
      {
        "label": "C",
        "text": "pi / 3 (60°)"
      },
      {
        "label": "D",
        "text": "pi (180°)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "pi / 2 (90°)"
      },
      {
        "label": "B",
        "text": "pi / 4 (45°)"
      },
      {
        "label": "C",
        "text": "pi / 3 (60°)"
      },
      {
        "label": "D",
        "text": "pi (180°)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A rectangular hyperbola has perpendicular asymptotes, meaning the angle between them is 90° (pi/2).",
    "explanationTamil": "செவ்வக அதிபரவளையத்தின் தொலைத்தொடுகோடுகள் ஒன்றுக்கொன்று செங்குத்தானவை (90°)."
  },
  {
    "code": "MAT-145",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Rectangular Hyperbola Eccentricity",
    "difficulty": "easy",
    "questionText": "The eccentricity of any rectangular hyperbola is always equal to:",
    "questionTextTamil": "எந்தவொரு செவ்வக அதிபரவளையத்தின் மையத்தொலைத்தகவும் எப்போதும் எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "sqrt(2)"
      },
      {
        "label": "B",
        "text": "2"
      },
      {
        "label": "C",
        "text": "1 / sqrt(2)"
      },
      {
        "label": "D",
        "text": "sqrt(3)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "sqrt(2)"
      },
      {
        "label": "B",
        "text": "2"
      },
      {
        "label": "C",
        "text": "1 / sqrt(2)"
      },
      {
        "label": "D",
        "text": "sqrt(3)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "For a rectangular hyperbola, a = b, so e = sqrt(1 + b^2/a^2) = sqrt(1 + 1) = sqrt(2).",
    "explanationTamil": "செவ்வக அதிபரவளையத்தில் a = b என்பதால் e = sqrt(1 + 1) = sqrt(2) ஆகும்."
  },
  {
    "code": "MAT-146",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Tangent Condition",
    "difficulty": "medium",
    "questionText": "The line y = mx + c is a tangent to the circle x^2 + y^2 = a^2 if and only if:",
    "questionTextTamil": "y = mx + c என்ற நேர்க்கோடு x^2 + y^2 = a^2 என்ற வட்டத்திற்கு தொடுகோடாக அமைய நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "c^2 = a^2 * (1 + m^2)"
      },
      {
        "label": "B",
        "text": "c^2 = a^2 * (1 - m^2)"
      },
      {
        "label": "C",
        "text": "c = a * m"
      },
      {
        "label": "D",
        "text": "c^2 = a * (1 + m)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "c^2 = a^2 * (1 + m^2)"
      },
      {
        "label": "B",
        "text": "c^2 = a^2 * (1 - m^2)"
      },
      {
        "label": "C",
        "text": "c = a * m"
      },
      {
        "label": "D",
        "text": "c^2 = a * (1 + m)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Perpendicular distance from origin to line must equal radius a: |c| / sqrt(1 + m^2) = a => c^2 = a^2(1 + m^2).",
    "explanationTamil": "ஆதியிலிருந்து கோட்டிற்குள்ள செங்குத்து தூரம் ஆரம் a க்கு சமமாக அமைய c^2 = a^2(1 + m^2) ஆகும்."
  },
  {
    "code": "MAT-147",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Director Circle",
    "difficulty": "hard",
    "questionText": "The locus of the point of intersection of perpendicular tangents to an ellipse x^2/a^2 + y^2/b^2 = 1 is called the director circle, whose equation is:",
    "questionTextTamil": "x^2/a^2 + y^2/b^2 = 1 என்ற நீள்வட்டத்தின் செங்குத்து தொடுகோடுகள் வெட்டிக்கொள்ளும் புள்ளியின் நியமப்பாதையான இயக்கு வட்டத்தின் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "x^2 + y^2 = a^2 + b^2"
      },
      {
        "label": "B",
        "text": "x^2 + y^2 = a^2 - b^2"
      },
      {
        "label": "C",
        "text": "x^2 + y^2 = a^2 * b^2"
      },
      {
        "label": "D",
        "text": "x^2 - y^2 = a^2 + b^2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x^2 + y^2 = a^2 + b^2"
      },
      {
        "label": "B",
        "text": "x^2 + y^2 = a^2 - b^2"
      },
      {
        "label": "C",
        "text": "x^2 + y^2 = a^2 * b^2"
      },
      {
        "label": "D",
        "text": "x^2 - y^2 = a^2 + b^2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The director circle of an ellipse is concentric and has radius sqrt(a^2 + b^2), giving x^2 + y^2 = a^2 + b^2.",
    "explanationTamil": "நீள்வட்டத்தின் இயக்கு வட்டத்தின் சமன்பாடு x^2 + y^2 = a^2 + b^2 ஆகும்."
  },
  {
    "code": "MAT-148",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Focal Property of Ellipse",
    "difficulty": "medium",
    "questionText": "The sum of the focal distances of any point P on an ellipse with major axis 2a is always equal to:",
    "questionTextTamil": "பேரச்சு நீளம் 2a கொண்ட நீள்வட்டத்தின் மீதுள்ள ஏதேனும் ஒரு புள்ளி P இன் குவிய தூரங்களின் கூடுதல் எப்போதும் எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "2a (length of major axis)"
      },
      {
        "label": "B",
        "text": "2b (length of minor axis)"
      },
      {
        "label": "C",
        "text": "4a"
      },
      {
        "label": "D",
        "text": "2ae"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2a (பேரச்சின் நீளம்)"
      },
      {
        "label": "B",
        "text": "2b (சிற்றச்சின் நீளம்)"
      },
      {
        "label": "C",
        "text": "4a"
      },
      {
        "label": "D",
        "text": "2ae"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By definition, SP + S'P = 2a, which is a constant equal to the length of the major axis.",
    "explanationTamil": "நீள்வட்டத்தின் வரையறைப்படி SP + S'P = 2a (பேரச்சின் நீளம்) என்பது மாறிலியாகும்."
  },
  {
    "code": "MAT-149",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Normal to Parabola",
    "difficulty": "hard",
    "questionText": "The maximum number of normals that can be drawn from an external point to a parabola is:",
    "questionTextTamil": "ஒரு வெளிப்புறப் புள்ளியிலிருந்து ஒரு பரவளையத்திற்கு வரையக்கூடிய செங்கோடுகளின் அதிகபட்ச எண்ணிக்கை யாது?",
    "options": [
      {
        "label": "A",
        "text": "3"
      },
      {
        "label": "B",
        "text": "2"
      },
      {
        "label": "C",
        "text": "4"
      },
      {
        "label": "D",
        "text": "1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "3"
      },
      {
        "label": "B",
        "text": "2"
      },
      {
        "label": "C",
        "text": "4"
      },
      {
        "label": "D",
        "text": "1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The equation of normal in slope form is y = mx - 2am - am^3, which is cubic in m, admitting at most 3 real slopes.",
    "explanationTamil": "செங்கோட்டின் சாய்வு சமன்பாடு m இல் முப்படி சமன்பாடாக இருப்பதால் அதிகபட்சம் 3 செங்கோடுகள் வரைய முடியும்."
  },
  {
    "code": "MAT-150",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Directrix of Parabola",
    "difficulty": "easy",
    "questionText": "The equation of the directrix of the parabola y^2 = 8x is:",
    "questionTextTamil": "y^2 = 8x என்ற பரவளையத்தின் இயக்குவரையின் சமன்பாடு யாது?",
    "options": [
      {
        "label": "A",
        "text": "x = -2"
      },
      {
        "label": "B",
        "text": "x = 2"
      },
      {
        "label": "C",
        "text": "y = -2"
      },
      {
        "label": "D",
        "text": "y = 2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x = -2"
      },
      {
        "label": "B",
        "text": "x = 2"
      },
      {
        "label": "C",
        "text": "y = -2"
      },
      {
        "label": "D",
        "text": "y = 2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "4a = 8 => a = 2. The directrix is perpendicular to the x-axis at distance a behind the vertex, given by x = -a = -2.",
    "explanationTamil": "4a = 8 => a = 2. இயக்குவரையின் சமன்பாடு x = -a = -2 ஆகும்."
  },
  {
    "code": "MAT-151",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Scalar Triple Product",
    "difficulty": "easy",
    "questionText": "The scalar triple product [a, b, c] geometrically represents the volume of a:",
    "questionTextTamil": "திசையிலிகளின் முப்பெருக்கம் [a, b, c] வடிவவியல் ரீதியாக எதன் கனஅளவைக் குறிக்கிறது?",
    "options": [
      {
        "label": "A",
        "text": "Parallelepiped formed by co-terminus edges a, b, c"
      },
      {
        "label": "B",
        "text": "Tetrahedron"
      },
      {
        "label": "C",
        "text": "Right circular cone"
      },
      {
        "label": "D",
        "text": "Sphere"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a, b, c ஐ ஒரு முனை விளிம்புகளாகக் கொண்ட இணைகரத் திண்மம்"
      },
      {
        "label": "B",
        "text": "நான்முகி"
      },
      {
        "label": "C",
        "text": "நேர்வட்டக் கூம்பு"
      },
      {
        "label": "D",
        "text": "கோளம்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The scalar triple product [a, b, c] = a . (b x c) represents the volume of the parallelepiped with adjacent edges a, b, c.",
    "explanationTamil": "[a, b, c] என்பது a, b, c ஐ ஒரு முனை விளிம்புகளாகக் கொண்ட இணைகரத் திண்மத்தின் கனஅளவாகும்."
  },
  {
    "code": "MAT-152",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Coplanar Vectors",
    "difficulty": "easy",
    "questionText": "Three non-zero vectors a, b, and c are coplanar if and only if:",
    "questionTextTamil": "பூஜ்ஜியமற்ற மூன்று வெக்டர்கள் a, b, மற்றும் c ஒரே தளத்தில் அமைய (ஒருதள வெக்டர்களாக இருக்க) நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "[a, b, c] = 0"
      },
      {
        "label": "B",
        "text": "[a, b, c] = 1"
      },
      {
        "label": "C",
        "text": "a . b = 0"
      },
      {
        "label": "D",
        "text": "a x b = c"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "[a, b, c] = 0"
      },
      {
        "label": "B",
        "text": "[a, b, c] = 1"
      },
      {
        "label": "C",
        "text": "a . b = 0"
      },
      {
        "label": "D",
        "text": "a x b = c"
      }
    ],
    "correctAnswer": "A",
    "explanation": "If vectors lie in the same plane, the height of the parallelepiped is zero, making the volume [a, b, c] = 0.",
    "explanationTamil": "வெக்டர்கள் ஒரே தளத்தில் அமைந்தால் இணைகரத் திண்மத்தின் கனஅளவு பூஜ்ஜியமாகும், எனவே [a, b, c] = 0."
  },
  {
    "code": "MAT-153",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Vector Triple Product",
    "difficulty": "medium",
    "questionText": "The vector triple product a x (b x c) is equal to:",
    "questionTextTamil": "a x (b x c) என்ற வெக்டர் முப்பெருக்கத்தின் மதிப்பு எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "(a . c)b - (a . b)c"
      },
      {
        "label": "B",
        "text": "(a . b)c - (a . c)b"
      },
      {
        "label": "C",
        "text": "(b . c)a - (a . c)b"
      },
      {
        "label": "D",
        "text": "[a, b, c]"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(a . c)b - (a . b)c"
      },
      {
        "label": "B",
        "text": "(a . b)c - (a . c)b"
      },
      {
        "label": "C",
        "text": "(b . c)a - (a . c)b"
      },
      {
        "label": "D",
        "text": "[a, b, c]"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Vector triple product BAC-CAB rule: a x (b x c) = b(a . c) - c(a . b) = (a . c)b - (a . b)c.",
    "explanationTamil": "வெக்டர் முப்பெருக்க விரிவு a x (b x c) = (a . c)b - (a . b)c ஆகும்."
  },
  {
    "code": "MAT-154",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Skew Lines Distance",
    "difficulty": "hard",
    "questionText": "The shortest distance between two skew lines r = a1 + s*u and r = a2 + t*v is given by:",
    "questionTextTamil": "r = a1 + s*u மற்றும் r = a2 + t*v என்ற இரு கோடமைவற்ற கோடுகளுக்கு இடைப்பட்ட மிகக் குறைந்த தொலைவு:",
    "options": [
      {
        "label": "A",
        "text": "| (a2 - a1) . (u x v) | / |u x v|"
      },
      {
        "label": "B",
        "text": "| (a2 - a1) x (u x v) |"
      },
      {
        "label": "C",
        "text": "|u x v| / |a2 - a1|"
      },
      {
        "label": "D",
        "text": "(a2 - a1) . (u + v)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "| (a2 - a1) . (u x v) | / |u x v|"
      },
      {
        "label": "B",
        "text": "| (a2 - a1) x (u x v) |"
      },
      {
        "label": "C",
        "text": "|u x v| / |a2 - a1|"
      },
      {
        "label": "D",
        "text": "(a2 - a1) . (u + v)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Shortest distance is the projection of displacement vector (a2 - a1) along the common normal direction (u x v).",
    "explanationTamil": "இரு கோடுகளுக்கு இடைப்பட்ட செங்குத்து தூரம் d = |(a2 - a1) . (u x v)| / |u x v| ஆகும்."
  },
  {
    "code": "MAT-155",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Angle Between Planes",
    "difficulty": "medium",
    "questionText": "The angle between two planes r . n1 = d1 and r . n2 = d2 is equal to the angle between their:",
    "questionTextTamil": "r . n1 = d1 மற்றும் r . n2 = d2 என்ற இரு தளங்களுக்கு இடைப்பட்ட கோணம் எவற்றிற்கு இடைப்பட்ட கோணத்திற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "Normal vectors n1 and n2"
      },
      {
        "label": "B",
        "text": "Position vectors"
      },
      {
        "label": "C",
        "text": "Intercepts"
      },
      {
        "label": "D",
        "text": "Origins"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "செங்குத்து வெக்டர்கள் n1 மற்றும் n2"
      },
      {
        "label": "B",
        "text": "நிலை வெக்டர்கள்"
      },
      {
        "label": "C",
        "text": "வெட்டுத்துண்டுகள்"
      },
      {
        "label": "D",
        "text": "ஆதிப்புள்ளிகள்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The dihedral angle between two planes is equal to the angle between their respective normal vectors n1 and n2: cos theta = |n1 . n2| / (|n1||n2|).",
    "explanationTamil": "இரு தளங்களுக்கு இடைப்பட்ட கோணம் அவற்றின் செங்குத்து வெக்டர்கள் n1 மற்றும் n2 க்கு இடைப்பட்ட கோணமாகும்."
  },
  {
    "code": "MAT-156",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Rolle's Theorem",
    "difficulty": "medium",
    "questionText": "Rolle's theorem requires a function f(x) to satisfy which of the following conditions on [a, b]?",
    "questionTextTamil": "ரோலின் தேற்றம் நிறைவேறுவதற்கு [a, b] இல் ஒரு சார்பு f(x) பின்வரும் எந்த நிபந்தனைகளை நிறைவு செய்ய வேண்டும்?",
    "options": [
      {
        "label": "A",
        "text": "Continuous on [a, b], differentiable on (a, b), and f(a) = f(b)"
      },
      {
        "label": "B",
        "text": "Continuous on (a, b) and f(a) != f(b)"
      },
      {
        "label": "C",
        "text": "Differentiable on [a, b] and f(a) > f(b)"
      },
      {
        "label": "D",
        "text": "Monotonic on [a, b]"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "[a, b] இல் தொடர்ச்சியானது, (a, b) இல் வகையிடத்தக்கது மற்றும் f(a) = f(b)"
      },
      {
        "label": "B",
        "text": "(a, b) இல் தொடர்ச்சியானது மற்றும் f(a) != f(b)"
      },
      {
        "label": "C",
        "text": "[a, b] இல் வகையிடத்தக்கது மற்றும் f(a) > f(b)"
      },
      {
        "label": "D",
        "text": "[a, b] இல் ஒருமுகத்தன்மை கொண்டது"
      }
    ],
    "correctAnswer": "A",
    "explanation": "If f is continuous on [a, b], differentiable on (a, b), and f(a) = f(b), there exists c in (a, b) such that f'(c) = 0.",
    "explanationTamil": "ரோலின் தேற்றத்தின்படி சார்பு [a, b] இல் தொடர்ச்சியாகவும், (a, b) இல் வகையிடத்தக்கதாகவும் மற்றும் f(a) = f(b) ஆகவும் இருக்க வேண்டும்."
  },
  {
    "code": "MAT-157",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Lagrange Mean Value Theorem",
    "difficulty": "medium",
    "questionText": "Lagrange's Mean Value Theorem guarantees the existence of c in (a, b) such that f'(c) equals:",
    "questionTextTamil": "லெக்ராஞ்சியின் சராசரி மதிப்பு தேற்றத்தின்படி (a, b) இல் உள்ள c க்கு f'(c) இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "(f(b) - f(a)) / (b - a)"
      },
      {
        "label": "B",
        "text": "0"
      },
      {
        "label": "C",
        "text": "(f(b) + f(a)) / 2"
      },
      {
        "label": "D",
        "text": "(b - a) / (f(b) - f(a))"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(f(b) - f(a)) / (b - a)"
      },
      {
        "label": "B",
        "text": "0"
      },
      {
        "label": "C",
        "text": "(f(b) + f(a)) / 2"
      },
      {
        "label": "D",
        "text": "(b - a) / (f(b) - f(a))"
      }
    ],
    "correctAnswer": "A",
    "explanation": "LMVT states that average rate of change equals instantaneous rate of change: f'(c) = [f(b) - f(a)] / (b - a).",
    "explanationTamil": "லெக்ராஞ்சியின் சராசரி மதிப்பு தேற்றத்தின்படி f'(c) = [f(b) - f(a)] / (b - a) ஆகும்."
  },
  {
    "code": "MAT-158",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Point of Inflection",
    "difficulty": "medium",
    "questionText": "At a point of inflection on a curve y = f(x), the curve changes its:",
    "questionTextTamil": "y = f(x) என்ற வளைவரையின் வளைவு மாற்றுப் புள்ளியில் (point of inflection), வளைவரை எதனை மாற்றுகிறது?",
    "options": [
      {
        "label": "A",
        "text": "Concavity (concave upward to downward or vice versa)"
      },
      {
        "label": "B",
        "text": "Slope from positive to negative"
      },
      {
        "label": "C",
        "text": "Sign of x coordinate"
      },
      {
        "label": "D",
        "text": "Continuity"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "குழிவுத் தன்மை (மேல்நோக்கிய குழிவிலிருந்து கீழ்நோக்கிய குழிவாக அல்லது எதிர்மாறாக)"
      },
      {
        "label": "B",
        "text": "சாய்வு மிகையிலிருந்து குறையாக"
      },
      {
        "label": "C",
        "text": "x ஆய அச்சு குறி"
      },
      {
        "label": "D",
        "text": "தொடர்ச்சித் தன்மை"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A point of inflection is a point where the second derivative f''(x) changes sign, switching concavity.",
    "explanationTamil": "வளைவு மாற்றுப் புள்ளியில் இரண்டாம் வகைக்கெழு f''(x) குறியை மாற்றி, குழிவுத் தன்மையை மாற்றுகிறது."
  },
  {
    "code": "MAT-159",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "L'Hopital's Rule",
    "difficulty": "easy",
    "questionText": "L'Hopital's rule can be directly applied to evaluate limits that result in indeterminate forms:",
    "questionTextTamil": "எல்-ஹாஸ்பிட்டல் விதியை நேரடியாகப் பயன்படுத்தி எல்லைகளை கணக்கிடக்கூடிய தேறா வடிவங்கள் எவை?",
    "options": [
      {
        "label": "A",
        "text": "0 / 0 or infinity / infinity"
      },
      {
        "label": "B",
        "text": "0 * infinity only"
      },
      {
        "label": "C",
        "text": "1^infinity only"
      },
      {
        "label": "D",
        "text": "infinity - infinity only"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "0 / 0 அல்லது முடிவிலி / முடிவிலி"
      },
      {
        "label": "B",
        "text": "0 * முடிவிலி மட்டுமே"
      },
      {
        "label": "C",
        "text": "1^முடிவிலி மட்டுமே"
      },
      {
        "label": "D",
        "text": "முடிவிலி - முடிவிலி மட்டுமே"
      }
    ],
    "correctAnswer": "A",
    "explanation": "L'Hopital's rule directly applies when lim f(x)/g(x) produces 0/0 or inf/inf, differentiating numerator and denominator separately.",
    "explanationTamil": "0/0 அல்லது முடிவிலி/முடிவிலி வடிவங்களுக்கு தொகுதி மற்றும் பகுதியை தனித்தனியாக வகையிட்டு எல்-ஹாஸ்பிட்டல் விதியைப் பயன்படுத்தலாம்."
  },
  {
    "code": "MAT-160",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Euler's Theorem for Homogeneous Functions",
    "difficulty": "hard",
    "questionText": "If u(x, y) is a homogeneous function of degree n in x and y, then Euler's theorem states:",
    "questionTextTamil": "u(x, y) என்பது x மற்றும் y இல் படி n கொண்ட சமபடித்தான சார்பு எனில் ஆய்லரின் தேற்றம் கூறுவது:",
    "options": [
      {
        "label": "A",
        "text": "x * (du/dx) + y * (du/dy) = n * u"
      },
      {
        "label": "B",
        "text": "x * (du/dx) - y * (du/dy) = n * u"
      },
      {
        "label": "C",
        "text": "(du/dx) + (du/dy) = n"
      },
      {
        "label": "D",
        "text": "x^2 * (du/dx) + y^2 * (du/dy) = u"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x * (du/dx) + y * (du/dy) = n * u"
      },
      {
        "label": "B",
        "text": "x * (du/dx) - y * (du/dy) = n * u"
      },
      {
        "label": "C",
        "text": "(du/dx) + (du/dy) = n"
      },
      {
        "label": "D",
        "text": "x^2 * (du/dx) + y^2 * (du/dy) = u"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Euler's theorem for homogeneous function u of degree n: x(du/dx) + y(du/dy) = n*u.",
    "explanationTamil": "படி n உடைய சமபடித்தான சார்பு u விற்கு ஆய்லரின் தேற்ற சமன்பாடு x(du/dx) + y(du/dy) = n*u ஆகும்."
  },
  {
    "code": "MAT-161",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Singular Matrix",
    "difficulty": "easy",
    "questionText": "If the matrix [[2, k], [4, 6]] is singular, the value of k is:",
    "questionTextTamil": "[[2, k], [4, 6]] என்ற அணி பூஜ்ஜியக் கோவையணி எனில் k இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "3"
      },
      {
        "label": "B",
        "text": "2"
      },
      {
        "label": "C",
        "text": "4"
      },
      {
        "label": "D",
        "text": "6"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "3"
      },
      {
        "label": "B",
        "text": "2"
      },
      {
        "label": "C",
        "text": "4"
      },
      {
        "label": "D",
        "text": "6"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Determinant = (2)(6) - 4k = 0 => 12 = 4k => k = 3.",
    "explanationTamil": "அணிக்கோவை மதிப்பு 2(6) - 4k = 0 => 12 = 4k => k = 3."
  },
  {
    "code": "MAT-162",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Idempotent Matrix",
    "difficulty": "medium",
    "questionText": "A square matrix A is called idempotent if:",
    "questionTextTamil": "சதுர அணி A தன்னடுக்கணி (idempotent matrix) எனில் அது நிறைவு செய்யும் நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "A^2 = A"
      },
      {
        "label": "B",
        "text": "A^2 = I"
      },
      {
        "label": "C",
        "text": "A^2 = 0"
      },
      {
        "label": "D",
        "text": "A^T = A"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "A^2 = A"
      },
      {
        "label": "B",
        "text": "A^2 = I"
      },
      {
        "label": "C",
        "text": "A^2 = 0"
      },
      {
        "label": "D",
        "text": "A^T = A"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A matrix satisfying A^2 = A is defined as an idempotent matrix.",
    "explanationTamil": "A^2 = A என நிறைவு செய்யும் அணி தன்னடுக்கணி எனப்படுகிறது."
  },
  {
    "code": "MAT-163",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Nilpotent Matrix",
    "difficulty": "medium",
    "questionText": "A square matrix A is called nilpotent of index k if:",
    "questionTextTamil": "சதுர அணி A சுழிஅடுக்கணி (nilpotent matrix) எனில் அது நிறைவு செய்யும் நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "A^k = 0 and A^(k-1) != 0"
      },
      {
        "label": "B",
        "text": "A^k = I"
      },
      {
        "label": "C",
        "text": "A^k = A"
      },
      {
        "label": "D",
        "text": "kA = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "A^k = 0 மற்றும் A^(k-1) != 0"
      },
      {
        "label": "B",
        "text": "A^k = I"
      },
      {
        "label": "C",
        "text": "A^k = A"
      },
      {
        "label": "D",
        "text": "kA = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A nilpotent matrix satisfies A^k = 0 for some positive integer k.",
    "explanationTamil": "A^k = 0 என ஒரு மிகை முழு எண் k க்கு அமைந்தால் அது சுழிஅடுக்கணியாகும்."
  },
  {
    "code": "MAT-164",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Argument Properties",
    "difficulty": "medium",
    "questionText": "If z1 and z2 are two non-zero complex numbers, then arg(z1 / z2) is:",
    "questionTextTamil": "z1 மற்றும் z2 பூஜ்ஜியமற்ற இரு கலப்பெண்கள் எனில், arg(z1 / z2) எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "arg(z1) - arg(z2)"
      },
      {
        "label": "B",
        "text": "arg(z1) + arg(z2)"
      },
      {
        "label": "C",
        "text": "arg(z1) * arg(z2)"
      },
      {
        "label": "D",
        "text": "arg(z1) / arg(z2)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "arg(z1) - arg(z2)"
      },
      {
        "label": "B",
        "text": "arg(z1) + arg(z2)"
      },
      {
        "label": "C",
        "text": "arg(z1) * arg(z2)"
      },
      {
        "label": "D",
        "text": "arg(z1) / arg(z2)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By properties of argument, arg(z1 / z2) = arg(z1) - arg(z2).",
    "explanationTamil": "வீச்சுகளின் பண்பின்படி arg(z1 / z2) = arg(z1) - arg(z2) ஆகும்."
  },
  {
    "code": "MAT-165",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Real Part of Complex Number",
    "difficulty": "easy",
    "questionText": "For any complex number z, the real part Re(z) can be expressed as:",
    "questionTextTamil": "எந்தவொரு கலப்பெண் z க்கும் அதன் மெய்ப்பகுதி Re(z) எவ்வாறு எழுதப்படலாம்?",
    "options": [
      {
        "label": "A",
        "text": "(z + bar(z)) / 2"
      },
      {
        "label": "B",
        "text": "(z - bar(z)) / 2i"
      },
      {
        "label": "C",
        "text": "z * bar(z)"
      },
      {
        "label": "D",
        "text": "z + bar(z)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(z + bar(z)) / 2"
      },
      {
        "label": "B",
        "text": "(z - bar(z)) / 2i"
      },
      {
        "label": "C",
        "text": "z * bar(z)"
      },
      {
        "label": "D",
        "text": "z + bar(z)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "If z = x + iy, then z + bar(z) = 2x, so Re(z) = (z + bar(z))/2.",
    "explanationTamil": "z = x + iy எனில் z + bar(z) = 2x, எனவே Re(z) = (z + bar(z))/2."
  },
  {
    "code": "MAT-166",
    "subject": "Mathematics",
    "chapter": "Theory of Equations",
    "topic": "Degree and Roots",
    "difficulty": "easy",
    "questionText": "The Fundamental Theorem of Algebra states that every polynomial of degree n >= 1 with complex coefficients has exactly:",
    "questionTextTamil": "இயற்கணிதத்தின் அடிப்படை தேற்றத்தின்படி படி n >= 1 உடைய கலப்பெண் பல்லுறுப்புக் கோவை சரியாக எத்தனை மூலங்களைக் கொண்டிருக்கும்?",
    "options": [
      {
        "label": "A",
        "text": "n roots (counting multiplicity)"
      },
      {
        "label": "B",
        "text": "n - 1 roots"
      },
      {
        "label": "C",
        "text": "At least n + 1 roots"
      },
      {
        "label": "D",
        "text": "Infinite roots"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "n மூலங்கள் (மடங்குத்தன்மையுடன் சேர்த்து)"
      },
      {
        "label": "B",
        "text": "n - 1 மூலங்கள்"
      },
      {
        "label": "C",
        "text": "குறைந்தது n + 1 மூலங்கள்"
      },
      {
        "label": "D",
        "text": "எண்ணற்ற மூலங்கள்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Every polynomial of degree n over the complex numbers has exactly n roots counting algebraic multiplicities.",
    "explanationTamil": "படி n கொண்ட பல்லுறுப்புக் கோவைக்கு சரியாக n மூலங்கள் இருக்கும்."
  },
  {
    "code": "MAT-167",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Identity",
    "difficulty": "easy",
    "questionText": "For any real number x, tan^(-1)(x) + cot^(-1)(x) is equal to:",
    "questionTextTamil": "அனைத்து மெய் எண்கள் x க்கும் tan^(-1)(x) + cot^(-1)(x) இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "pi / 2"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "0"
      },
      {
        "label": "D",
        "text": "1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "pi / 2"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "0"
      },
      {
        "label": "D",
        "text": "1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "tan^(-1)(x) + cot^(-1)(x) = pi/2 for all real x.",
    "explanationTamil": "அனைத்து மெய் எண்களுக்கும் tan^(-1)(x) + cot^(-1)(x) = pi/2 ஆகும்."
  },
  {
    "code": "MAT-168",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Circle Equation",
    "difficulty": "easy",
    "questionText": "The center and radius of the circle x^2 + y^2 - 4x + 6y - 12 = 0 are:",
    "questionTextTamil": "x^2 + y^2 - 4x + 6y - 12 = 0 என்ற வட்டத்தின் மையம் மற்றும் ஆரம் யாவை?",
    "options": [
      {
        "label": "A",
        "text": "Center (2, -3), Radius = 5"
      },
      {
        "label": "B",
        "text": "Center (-2, 3), Radius = 5"
      },
      {
        "label": "C",
        "text": "Center (2, -3), Radius = 25"
      },
      {
        "label": "D",
        "text": "Center (4, -6), Radius = 12"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "மையம் (2, -3), ஆரம் = 5"
      },
      {
        "label": "B",
        "text": "மையம் (-2, 3), ஆரம் = 5"
      },
      {
        "label": "C",
        "text": "மையம் (2, -3), ஆரம் = 25"
      },
      {
        "label": "D",
        "text": "மையம் (4, -6), ஆரம் = 12"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Center = (-g, -f) = (2, -3). Radius r = sqrt(g^2 + f^2 - c) = sqrt(4 + 9 - (-12)) = sqrt(25) = 5.",
    "explanationTamil": "மையம் (-g, -f) = (2, -3). ஆரம் r = sqrt(4 + 9 + 12) = sqrt(25) = 5."
  },
  {
    "code": "MAT-169",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Condition for Second Degree Equation",
    "difficulty": "hard",
    "questionText": "The general second degree equation ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0 represents a pair of straight lines if:",
    "questionTextTamil": "ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0 என்ற பொது இருபடிச் சமன்பாடு ஒரு இரட்டை நேர்க்கோட்டைக் குறிக்க நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "abc + 2fgh - af^2 - bg^2 - ch^2 = 0"
      },
      {
        "label": "B",
        "text": "h^2 - ab = 0"
      },
      {
        "label": "C",
        "text": "a + b = 0"
      },
      {
        "label": "D",
        "text": "f^2 + g^2 = c"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "abc + 2fgh - af^2 - bg^2 - ch^2 = 0"
      },
      {
        "label": "B",
        "text": "h^2 - ab = 0"
      },
      {
        "label": "C",
        "text": "a + b = 0"
      },
      {
        "label": "D",
        "text": "f^2 + g^2 = c"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The condition for a degenerate conic (pair of lines) is that the 3x3 determinant Delta = abc + 2fgh - af^2 - bg^2 - ch^2 = 0.",
    "explanationTamil": "இருபடிச் சமன்பாடு இரட்டை நேர்க்கோட்டைக் குறிக்க அணிக்கோவை Delta = abc + 2fgh - af^2 - bg^2 - ch^2 = 0 ஆக இருக்க வேண்டும்."
  },
  {
    "code": "MAT-170",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Perpendicular Lines Condition",
    "difficulty": "easy",
    "questionText": "The pair of straight lines ax^2 + 2hxy + by^2 = 0 are mutually perpendicular if:",
    "questionTextTamil": "ax^2 + 2hxy + by^2 = 0 என்ற இரட்டை நேர்க்கோடுகள் ஒன்றுக்கொன்று செங்குத்தாக அமைய நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "a + b = 0"
      },
      {
        "label": "B",
        "text": "h^2 = ab"
      },
      {
        "label": "C",
        "text": "a = b"
      },
      {
        "label": "D",
        "text": "h = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a + b = 0"
      },
      {
        "label": "B",
        "text": "h^2 = ab"
      },
      {
        "label": "C",
        "text": "a = b"
      },
      {
        "label": "D",
        "text": "h = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Angle formula tan theta = 2*sqrt(h^2 - ab)/(a + b). The lines are perpendicular (theta = 90°) when denominator a + b = 0.",
    "explanationTamil": "கோடுகள் செங்குத்தாக இருக்க நிபந்தனை a + b = 0 (x^2 கெழு + y^2 கெழு = 0)."
  },
  {
    "code": "MAT-171",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Dot Product",
    "difficulty": "easy",
    "questionText": "If two non-zero vectors a and b are perpendicular, then their dot product a . b is:",
    "questionTextTamil": "பூஜ்ஜியமற்ற இரு வெக்டர்கள் a மற்றும் b செங்குத்தானவை எனில் அவற்றின் புள்ளிப் பெருக்கம் a . b:",
    "options": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "|a||b|"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "|a||b|"
      }
    ],
    "correctAnswer": "A",
    "explanation": "a . b = |a||b| cos(90°) = 0.",
    "explanationTamil": "செங்குத்து வெக்டர்களுக்கு இடைப்பட்ட கோணம் 90° என்பதால் புள்ளிப் பெருக்கம் a . b = 0."
  },
  {
    "code": "MAT-172",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Cross Product",
    "difficulty": "easy",
    "questionText": "The magnitude of the cross product |a x b| represents the area of a:",
    "questionTextTamil": "வெக்டர் பெருக்கத்தின் எண்மதிப்பு |a x b| வடிவவியல் ரீதியாக எதன் பரப்பளவைக் குறிக்கிறது?",
    "options": [
      {
        "label": "A",
        "text": "Parallelogram with adjacent sides a and b"
      },
      {
        "label": "B",
        "text": "Triangle with sides a and b"
      },
      {
        "label": "C",
        "text": "Circle of diameter |a|"
      },
      {
        "label": "D",
        "text": "Trapezium"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a மற்றும் b ஐ அடுத்தடுத்த பக்கங்களாகக் கொண்ட இணைகரம்"
      },
      {
        "label": "B",
        "text": "முக்கோணம்"
      },
      {
        "label": "C",
        "text": "வட்டம்"
      },
      {
        "label": "D",
        "text": "சரிவகம்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "|a x b| = |a||b| sin theta, which equals the area of the parallelogram spanned by a and b.",
    "explanationTamil": "|a x b| என்பது a மற்றும் b ஐ அடுத்தடுத்த பக்கங்களாகக் கொண்ட இணைகரத்தின் பரப்பளவாகும்."
  },
  {
    "code": "MAT-173",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Area of Triangle",
    "difficulty": "easy",
    "questionText": "The area of a triangle with adjacent sides represented by vectors a and b is:",
    "questionTextTamil": "a மற்றும் b ஐ அடுத்தடுத்த பக்கங்களாகக் கொண்ட முக்கோணத்தின் பரப்பளவு:",
    "options": [
      {
        "label": "A",
        "text": "(1/2) * |a x b|"
      },
      {
        "label": "B",
        "text": "|a x b|"
      },
      {
        "label": "C",
        "text": "a . b"
      },
      {
        "label": "D",
        "text": "(1/2) * (a . b)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(1/2) * |a x b|"
      },
      {
        "label": "B",
        "text": "|a x b|"
      },
      {
        "label": "C",
        "text": "a . b"
      },
      {
        "label": "D",
        "text": "(1/2) * (a . b)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The triangle area is half of the parallelogram area, so Area = (1/2)|a x b|.",
    "explanationTamil": "முக்கோணத்தின் பரப்பளவு இணைகரத்தின் பரப்பில் பாதியாகும்: (1/2)|a x b|."
  },
  {
    "code": "MAT-174",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Projection of Vector",
    "difficulty": "medium",
    "questionText": "The scalar projection of vector a on vector b is given by:",
    "questionTextTamil": "வெக்டர் b இன் மீது வெக்டர் a இன் திசையிலி வீழல்:",
    "options": [
      {
        "label": "A",
        "text": "(a . b) / |b|"
      },
      {
        "label": "B",
        "text": "(a . b) / |a|"
      },
      {
        "label": "C",
        "text": "|a x b| / |b|"
      },
      {
        "label": "D",
        "text": "a . b"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(a . b) / |b|"
      },
      {
        "label": "B",
        "text": "(a . b) / |a|"
      },
      {
        "label": "C",
        "text": "|a x b| / |b|"
      },
      {
        "label": "D",
        "text": "a . b"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Projection of a on b is |a| cos theta = (a . b) / |b|.",
    "explanationTamil": "b இன் மீது a இன் வீழல் = (a . b) / |b|."
  },
  {
    "code": "MAT-175",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Unit Vector",
    "difficulty": "easy",
    "questionText": "A unit vector in the direction of vector a is:",
    "questionTextTamil": "வெக்டர் a இன் திசையில் உள்ள ஓரலகு வெக்டர்:",
    "options": [
      {
        "label": "A",
        "text": "a / |a|"
      },
      {
        "label": "B",
        "text": "|a| * a"
      },
      {
        "label": "C",
        "text": "a / |a|^2"
      },
      {
        "label": "D",
        "text": "1 / a"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a / |a|"
      },
      {
        "label": "B",
        "text": "|a| * a"
      },
      {
        "label": "C",
        "text": "a / |a|^2"
      },
      {
        "label": "D",
        "text": "1 / a"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Dividing any non-zero vector by its magnitude yields a unit vector with magnitude 1 in the same direction.",
    "explanationTamil": "ஒரு வெக்டரை அதன் எண்மதிப்பால் வகுத்தால் அதே திசையில் ஓரலகு வெக்டர் a / |a| கிடைக்கும்."
  },
  {
    "code": "MAT-176",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Derivative of |x|",
    "difficulty": "medium",
    "questionText": "The derivative of f(x) = |x| at x = 0 is:",
    "questionTextTamil": "x = 0 இல் f(x) = |x| இன் வகைக்கெழு:",
    "options": [
      {
        "label": "A",
        "text": "Does not exist"
      },
      {
        "label": "B",
        "text": "0"
      },
      {
        "label": "C",
        "text": "1"
      },
      {
        "label": "D",
        "text": "-1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "கிடையாது (வரையறுக்கப்படவில்லை)"
      },
      {
        "label": "B",
        "text": "0"
      },
      {
        "label": "C",
        "text": "1"
      },
      {
        "label": "D",
        "text": "-1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Left hand derivative is -1 and right hand derivative is +1; because they are unequal, f is not differentiable at x = 0.",
    "explanationTamil": "இடது வகைக்கெழு -1 மற்றும் வலது வகைக்கெழு +1 சமமாக இல்லாததால் x = 0 இல் வகையிடத்தக்கதல்ல."
  },
  {
    "code": "MAT-177",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Increasing Function",
    "difficulty": "easy",
    "questionText": "A differentiable function f(x) is strictly increasing on an interval (a, b) if:",
    "questionTextTamil": "ஒரு வகையிடத்தக்க சார்பு f(x) இடைவெளி (a, b) இல் திட்டமாக ஏறும் சார்பாக இருக்க நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "f'(x) > 0 for all x in (a, b)"
      },
      {
        "label": "B",
        "text": "f'(x) < 0 for all x in (a, b)"
      },
      {
        "label": "C",
        "text": "f'(x) = 0 for all x in (a, b)"
      },
      {
        "label": "D",
        "text": "f''(x) > 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "அனைத்து x in (a, b) க்கும் f'(x) > 0"
      },
      {
        "label": "B",
        "text": "அனைத்து x in (a, b) க்கும் f'(x) < 0"
      },
      {
        "label": "C",
        "text": "அனைத்து x in (a, b) க்கும் f'(x) = 0"
      },
      {
        "label": "D",
        "text": "f''(x) > 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A positive derivative f'(x) > 0 indicates that the slope is strictly positive and the function value increases with x.",
    "explanationTamil": "முதல் வகைக்கெழு f'(x) > 0 எனில் சார்பு திட்டமாக ஏறும் சார்பாகும்."
  },
  {
    "code": "MAT-178",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Local Extrema",
    "difficulty": "easy",
    "questionText": "If f'(c) = 0 and f''(c) < 0, then at x = c, f(x) has a:",
    "questionTextTamil": "f'(c) = 0 மற்றும் f''(c) < 0 எனில் x = c இல் f(x) எதனைப் பெற்றுள்ளது?",
    "options": [
      {
        "label": "A",
        "text": "Local maximum"
      },
      {
        "label": "B",
        "text": "Local minimum"
      },
      {
        "label": "C",
        "text": "Point of inflection"
      },
      {
        "label": "D",
        "text": "Discontinuity"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "உள்ளூர் பெருமம்"
      },
      {
        "label": "B",
        "text": "உள்ளூர் சிறுமம்"
      },
      {
        "label": "C",
        "text": "வளைவு மாற்றுப் புள்ளி"
      },
      {
        "label": "D",
        "text": "தொடர்ச்சியற்ற தன்மை"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Second derivative test: f'(c) = 0 and f''(c) < 0 implies the curve is concave down, corresponding to a local maximum.",
    "explanationTamil": "f'(c) = 0 மற்றும் f''(c) < 0 எனில் அது உள்ளூர் பெரும மதிப்பாகும்."
  },
  {
    "code": "MAT-179",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Slope of Tangent",
    "difficulty": "easy",
    "questionText": "The slope of the tangent to the curve y = x^3 - x at x = 2 is:",
    "questionTextTamil": "y = x^3 - x என்ற வளைவரைக்கு x = 2 இல் தொடுகோட்டின் சாய்வு யாது?",
    "options": [
      {
        "label": "A",
        "text": "11"
      },
      {
        "label": "B",
        "text": "12"
      },
      {
        "label": "C",
        "text": "6"
      },
      {
        "label": "D",
        "text": "5"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "11"
      },
      {
        "label": "B",
        "text": "12"
      },
      {
        "label": "C",
        "text": "6"
      },
      {
        "label": "D",
        "text": "5"
      }
    ],
    "correctAnswer": "A",
    "explanation": "dy/dx = 3x^2 - 1. At x = 2, slope m = 3(2)^2 - 1 = 3(4) - 1 = 11.",
    "explanationTamil": "dy/dx = 3x^2 - 1. x = 2 எனில் சாய்வு m = 3(4) - 1 = 11."
  },
  {
    "code": "MAT-180",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Normal Slope",
    "difficulty": "easy",
    "questionText": "If the slope of the tangent to a curve at a point is 3/4, then the slope of the normal at that point is:",
    "questionTextTamil": "ஒரு புள்ளியில் வளைவரைக்கு தொடுகோட்டின் சாய்வு 3/4 எனில், அப்புள்ளியில் செங்கோட்டின் சாய்வு யாது?",
    "options": [
      {
        "label": "A",
        "text": "-4 / 3"
      },
      {
        "label": "B",
        "text": "4 / 3"
      },
      {
        "label": "C",
        "text": "-3 / 4"
      },
      {
        "label": "D",
        "text": "3 / 4"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "-4 / 3"
      },
      {
        "label": "B",
        "text": "4 / 3"
      },
      {
        "label": "C",
        "text": "-3 / 4"
      },
      {
        "label": "D",
        "text": "3 / 4"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Normal is perpendicular to tangent, so m_normal = -1 / m_tangent = -1 / (3/4) = -4/3.",
    "explanationTamil": "செங்கோடு தொடுகோடுக்கு செங்குத்து என்பதால் m_செங்கோடு = -1 / (3/4) = -4/3."
  },
  {
    "code": "MAT-181",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Matrix Multiplication",
    "difficulty": "easy",
    "questionText": "If matrix A is of order 2 x 3 and B is of order 3 x 4, then the order of the product AB is:",
    "questionTextTamil": "அணி A இன் வரிசை 2 x 3 மற்றும் B இன் வரிசை 3 x 4 எனில் பெருக்கல் அணி AB இன் வரிசை:",
    "options": [
      {
        "label": "A",
        "text": "2 x 4"
      },
      {
        "label": "B",
        "text": "3 x 3"
      },
      {
        "label": "C",
        "text": "4 x 2"
      },
      {
        "label": "D",
        "text": "Undefined"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2 x 4"
      },
      {
        "label": "B",
        "text": "3 x 3"
      },
      {
        "label": "C",
        "text": "4 x 2"
      },
      {
        "label": "D",
        "text": "வரையறுக்கப்படவில்லை"
      }
    ],
    "correctAnswer": "A",
    "explanation": "For (m x k) * (k x n), the resulting matrix has order m x n = 2 x 4.",
    "explanationTamil": "(2 x 3) மற்றும் (3 x 4) அணிகளின் பெருக்கல் அணியின் வரிசை 2 x 4 ஆகும்."
  },
  {
    "code": "MAT-182",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Transpose Properties",
    "difficulty": "easy",
    "questionText": "For any two conformable matrices A and B, the transpose of their product (AB)^T equals:",
    "questionTextTamil": "பெருக்கத்தக்க இரு அணிகள் A மற்றும் B க்கு (AB)^T இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "B^T * A^T"
      },
      {
        "label": "B",
        "text": "A^T * B^T"
      },
      {
        "label": "C",
        "text": "A * B^T"
      },
      {
        "label": "D",
        "text": "B * A^T"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "B^T * A^T"
      },
      {
        "label": "B",
        "text": "A^T * B^T"
      },
      {
        "label": "C",
        "text": "A * B^T"
      },
      {
        "label": "D",
        "text": "B * A^T"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Reversal law of transposes: (AB)^T = B^T * A^T.",
    "explanationTamil": "இடமாற்று அணியின் வரிசை மாற்ற விதிப்படி (AB)^T = B^T * A^T ஆகும்."
  },
  {
    "code": "MAT-183",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Imaginary Unit",
    "difficulty": "easy",
    "questionText": "The square root of -16 in the set of complex numbers is:",
    "questionTextTamil": "கலப்பெண்களில் -16 இன் வர்க்க மூலம் யாது?",
    "options": [
      {
        "label": "A",
        "text": "+- 4i"
      },
      {
        "label": "B",
        "text": "+- 4"
      },
      {
        "label": "C",
        "text": "-4"
      },
      {
        "label": "D",
        "text": "16i"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "+- 4i"
      },
      {
        "label": "B",
        "text": "+- 4"
      },
      {
        "label": "C",
        "text": "-4"
      },
      {
        "label": "D",
        "text": "16i"
      }
    ],
    "correctAnswer": "A",
    "explanation": "sqrt(-16) = sqrt(16 * -1) = +- 4i.",
    "explanationTamil": "sqrt(-16) = +- 4i ஆகும்."
  },
  {
    "code": "MAT-184",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Modulus of Product",
    "difficulty": "easy",
    "questionText": "For any two complex numbers z1 and z2, |z1 * z2| is equal to:",
    "questionTextTamil": "இரு கலப்பெண்கள் z1 மற்றும் z2 க்கு |z1 * z2| இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "|z1| * |z2|"
      },
      {
        "label": "B",
        "text": "|z1| + |z2|"
      },
      {
        "label": "C",
        "text": "|z1| - |z2|"
      },
      {
        "label": "D",
        "text": "|z1| / |z2|"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|z1| * |z2|"
      },
      {
        "label": "B",
        "text": "|z1| + |z2|"
      },
      {
        "label": "C",
        "text": "|z1| - |z2|"
      },
      {
        "label": "D",
        "text": "|z1| / |z2|"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The modulus of a product of complex numbers equals the product of their moduli.",
    "explanationTamil": "கலப்பெண்களின் பெருக்கலின் மட்டு அவற்றின் தனித்தனி மட்டுகளின் பெருக்கலுக்கு சமம்: |z1 * z2| = |z1| * |z2|."
  },
  {
    "code": "MAT-185",
    "subject": "Mathematics",
    "chapter": "Theory of Equations",
    "topic": "Discriminant of Quadratic",
    "difficulty": "easy",
    "questionText": "The quadratic equation ax^2 + bx + c = 0 has two distinct real roots if its discriminant Delta satisfies:",
    "questionTextTamil": "ax^2 + bx + c = 0 என்ற இருபடிச் சமன்பாடு இரு வெவ்வேறு மெய் மூலங்களைப் பெற அதன் தன்மைகாட்டி Delta:",
    "options": [
      {
        "label": "A",
        "text": "Delta > 0"
      },
      {
        "label": "B",
        "text": "Delta = 0"
      },
      {
        "label": "C",
        "text": "Delta < 0"
      },
      {
        "label": "D",
        "text": "Delta <= 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "Delta > 0"
      },
      {
        "label": "B",
        "text": "Delta = 0"
      },
      {
        "label": "C",
        "text": "Delta < 0"
      },
      {
        "label": "D",
        "text": "Delta <= 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Delta = b^2 - 4ac > 0 gives two distinct real roots.",
    "explanationTamil": "Delta = b^2 - 4ac > 0 எனில் இரு வெவ்வேறு மெய் மூலங்கள் கிடைக்கும்."
  },
  {
    "code": "MAT-186",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Domain of sin^(-1)",
    "difficulty": "easy",
    "questionText": "The domain of the function f(x) = sin^(-1)(x) is:",
    "questionTextTamil": "f(x) = sin^(-1)(x) என்ற சார்பின் சார்பகம் யாது?",
    "options": [
      {
        "label": "A",
        "text": "[-1, 1]"
      },
      {
        "label": "B",
        "text": "(-infinity, infinity)"
      },
      {
        "label": "C",
        "text": "[0, 1]"
      },
      {
        "label": "D",
        "text": "[-pi/2, pi/2]"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "[-1, 1]"
      },
      {
        "label": "B",
        "text": "(-infinity, infinity)"
      },
      {
        "label": "C",
        "text": "[0, 1]"
      },
      {
        "label": "D",
        "text": "[-pi/2, pi/2]"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Since sine values range from -1 to 1, the domain of sin^(-1)(x) is [-1, 1].",
    "explanationTamil": "sin(x) இன் மதிப்பு -1 முதல் 1 வரை இருப்பதால் sin^(-1)(x) இன் சார்பகம் [-1, 1] ஆகும்."
  },
  {
    "code": "MAT-187",
    "subject": "Mathematics",
    "chapter": "Inverse Trigonometric Functions",
    "topic": "Domain of cos^(-1)",
    "difficulty": "easy",
    "questionText": "The domain of the function f(x) = cos^(-1)(x) is:",
    "questionTextTamil": "f(x) = cos^(-1)(x) என்ற சார்பின் சார்பகம் யாது?",
    "options": [
      {
        "label": "A",
        "text": "[-1, 1]"
      },
      {
        "label": "B",
        "text": "(0, infinity)"
      },
      {
        "label": "C",
        "text": "[0, pi]"
      },
      {
        "label": "D",
        "text": "[-pi, pi]"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "[-1, 1]"
      },
      {
        "label": "B",
        "text": "(0, infinity)"
      },
      {
        "label": "C",
        "text": "[0, pi]"
      },
      {
        "label": "D",
        "text": "[-pi, pi]"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The domain of cos^(-1)(x) is the interval [-1, 1].",
    "explanationTamil": "cos^(-1)(x) இன் சார்பகம் [-1, 1] ஆகும்."
  },
  {
    "code": "MAT-188",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Focus of Parabola",
    "difficulty": "easy",
    "questionText": "The coordinates of the focus of the parabola y^2 = 12x are:",
    "questionTextTamil": "y^2 = 12x என்ற பரவளையத்தின் குவியத்தின் ஆயத்தொலைவுகள்:",
    "options": [
      {
        "label": "A",
        "text": "(3, 0)"
      },
      {
        "label": "B",
        "text": "(0, 3)"
      },
      {
        "label": "C",
        "text": "(-3, 0)"
      },
      {
        "label": "D",
        "text": "(6, 0)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(3, 0)"
      },
      {
        "label": "B",
        "text": "(0, 3)"
      },
      {
        "label": "C",
        "text": "(-3, 0)"
      },
      {
        "label": "D",
        "text": "(6, 0)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "4a = 12 => a = 3. Standard open-right parabola has focus at (a, 0) = (3, 0).",
    "explanationTamil": "4a = 12 => a = 3. குவியம் (a, 0) = (3, 0) ஆகும்."
  },
  {
    "code": "MAT-189",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Vertex of Parabola",
    "difficulty": "easy",
    "questionText": "The vertex of the parabola (y - 2)^2 = 8(x - 3) is:",
    "questionTextTamil": "(y - 2)^2 = 8(x - 3) என்ற பரவளையத்தின் முனைப்புள்ளி யாது?",
    "options": [
      {
        "label": "A",
        "text": "(3, 2)"
      },
      {
        "label": "B",
        "text": "(2, 3)"
      },
      {
        "label": "C",
        "text": "(-3, -2)"
      },
      {
        "label": "D",
        "text": "(0, 0)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(3, 2)"
      },
      {
        "label": "B",
        "text": "(2, 3)"
      },
      {
        "label": "C",
        "text": "(-3, -2)"
      },
      {
        "label": "D",
        "text": "(0, 0)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Comparing with (y - k)^2 = 4a(x - h), vertex (h, k) is (3, 2).",
    "explanationTamil": "(y - k)^2 = 4a(x - h) உடன் ஒப்பிட முனை (h, k) = (3, 2) ஆகும்."
  },
  {
    "code": "MAT-190",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Auxiliary Circle of Ellipse",
    "difficulty": "medium",
    "questionText": "The auxiliary circle of the ellipse x^2/a^2 + y^2/b^2 = 1 (a > b) has equation:",
    "questionTextTamil": "x^2/a^2 + y^2/b^2 = 1 (a > b) என்ற நீள்வட்டத்தின் துணை வட்டத்தின் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "x^2 + y^2 = a^2"
      },
      {
        "label": "B",
        "text": "x^2 + y^2 = b^2"
      },
      {
        "label": "C",
        "text": "x^2 + y^2 = a^2 + b^2"
      },
      {
        "label": "D",
        "text": "x^2 + y^2 = a^2 - b^2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x^2 + y^2 = a^2"
      },
      {
        "label": "B",
        "text": "x^2 + y^2 = b^2"
      },
      {
        "label": "C",
        "text": "x^2 + y^2 = a^2 + b^2"
      },
      {
        "label": "D",
        "text": "x^2 + y^2 = a^2 - b^2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The auxiliary circle is described on the major axis (length 2a) as diameter, so x^2 + y^2 = a^2.",
    "explanationTamil": "நீள்வட்டத்தின் பேரச்சை விட்டமாகக் கொண்டு வரையப்படும் துணை வட்டத்தின் சமன்பாடு x^2 + y^2 = a^2."
  },
  {
    "code": "MAT-191",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Collinear Vectors",
    "difficulty": "easy",
    "questionText": "Two non-zero vectors a and b are collinear (parallel) if and only if:",
    "questionTextTamil": "பூஜ்ஜியமற்ற இரு வெக்டர்கள் a மற்றும் b ஒரே கோட்டமை வெக்டர்களாக இருக்க நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "a x b = 0"
      },
      {
        "label": "B",
        "text": "a . b = 0"
      },
      {
        "label": "C",
        "text": "[a, b, c] = 1"
      },
      {
        "label": "D",
        "text": "a + b = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a x b = 0"
      },
      {
        "label": "B",
        "text": "a . b = 0"
      },
      {
        "label": "C",
        "text": "[a, b, c] = 1"
      },
      {
        "label": "D",
        "text": "a + b = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "If vectors are parallel, sin theta = sin(0°) = 0, so |a x b| = 0, hence a x b = 0.",
    "explanationTamil": "வெக்டர்கள் இணையாக இருந்தால் கோணம் 0° என்பதால் அவற்றின் வெக்டர் பெருக்கம் a x b = 0 ஆகும்."
  },
  {
    "code": "MAT-192",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Work Done by Force",
    "difficulty": "easy",
    "questionText": "The work done W by a constant force F in displacing a particle by displacement vector d is:",
    "questionTextTamil": "ஒரு நிலையான விசை F ஒரு துகளை d என்ற இடப்பெயர்ச்சி வெக்டருக்கு நகர்த்துவதில் செய்யப்பட்ட வேலை W:",
    "options": [
      {
        "label": "A",
        "text": "F . d"
      },
      {
        "label": "B",
        "text": "F x d"
      },
      {
        "label": "C",
        "text": "|F x d|"
      },
      {
        "label": "D",
        "text": "|F| / |d|"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "F . d"
      },
      {
        "label": "B",
        "text": "F x d"
      },
      {
        "label": "C",
        "text": "|F x d|"
      },
      {
        "label": "D",
        "text": "|F| / |d|"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Work is a scalar quantity defined by the scalar product of force and displacement: W = F . d.",
    "explanationTamil": "வேலை என்பது விசை மற்றும் இடப்பெயர்ச்சியின் புள்ளிப் பெருக்கமாகும்: W = F . d."
  },
  {
    "code": "MAT-193",
    "subject": "Mathematics",
    "chapter": "Vector Algebra",
    "topic": "Torque / Moment of Force",
    "difficulty": "easy",
    "questionText": "The torque (moment of force) M of a force F acting at a point with position vector r about the origin is:",
    "questionTextTamil": "நிலை வெக்டர் r கொண்ட புள்ளியில் செயல்படும் விசை F இன் ஆதிப்புள்ளியைப் பொறுத்த திருப்புத்திறன் M:",
    "options": [
      {
        "label": "A",
        "text": "r x F"
      },
      {
        "label": "B",
        "text": "r . F"
      },
      {
        "label": "C",
        "text": "F x r"
      },
      {
        "label": "D",
        "text": "|r||F|"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "r x F"
      },
      {
        "label": "B",
        "text": "r . F"
      },
      {
        "label": "C",
        "text": "F x r"
      },
      {
        "label": "D",
        "text": "|r||F|"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Torque is the vector product of position vector and force vector: M = r x F.",
    "explanationTamil": "விசையின் திருப்புத்திறன் வெக்டர் M = r x F ஆகும்."
  },
  {
    "code": "MAT-194",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Stationary Points",
    "difficulty": "easy",
    "questionText": "A point x = c where f'(c) = 0 is known as a:",
    "questionTextTamil": "f'(c) = 0 என அமையும் புள்ளி x = c எவ்வாறு அழைக்கப்படுகிறது?",
    "options": [
      {
        "label": "A",
        "text": "Stationary point"
      },
      {
        "label": "B",
        "text": "Discontinuous point"
      },
      {
        "label": "C",
        "text": "Asymptote"
      },
      {
        "label": "D",
        "text": "Intercept"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "நிலைப்புள்ளி (Stationary point)"
      },
      {
        "label": "B",
        "text": "தொடர்ச்சியற்ற புள்ளி"
      },
      {
        "label": "C",
        "text": "தொலைத்தொடுகோடு"
      },
      {
        "label": "D",
        "text": "வெட்டுத்துண்டு"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Points where the first derivative vanishes (f'(c) = 0) are defined as stationary points.",
    "explanationTamil": "முதல் வகைக்கெழு சுழியாகும் புள்ளிகள் நிலைப்புள்ளிகள் எனப்படுகின்றன."
  },
  {
    "code": "MAT-195",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Rate of Change",
    "difficulty": "easy",
    "questionText": "If the radius of a circle increases at a constant rate of 2 cm/s, the rate of increase of its area when r = 10 cm is:",
    "questionTextTamil": "ஒரு வட்டத்தின் ஆரம் 2 cm/s என்ற சீரான வீதத்தில் அதிகரித்தால், r = 10 cm ஆக இருக்கும்போது அதன் பரப்பளவு அதிகரிக்கும் வீதம்:",
    "options": [
      {
        "label": "A",
        "text": "40*pi cm^2/s"
      },
      {
        "label": "B",
        "text": "20*pi cm^2/s"
      },
      {
        "label": "C",
        "text": "100*pi cm^2/s"
      },
      {
        "label": "D",
        "text": "4*pi cm^2/s"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "40*pi cm^2/s"
      },
      {
        "label": "B",
        "text": "20*pi cm^2/s"
      },
      {
        "label": "C",
        "text": "100*pi cm^2/s"
      },
      {
        "label": "D",
        "text": "4*pi cm^2/s"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A = pi * r^2 => dA/dt = 2*pi*r * (dr/dt) = 2*pi*(10)*(2) = 40*pi cm^2/s.",
    "explanationTamil": "dA/dt = 2*pi*r (dr/dt) = 2*pi(10)(2) = 40*pi cm^2/s."
  },
  {
    "code": "MAT-196",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Taylor Series",
    "difficulty": "medium",
    "questionText": "The expansion of f(x) in powers of x around x = 0 is specifically known as:",
    "questionTextTamil": "x = 0 ஐப் பொறுத்து x இன் அடுக்குகளாக f(x) ஐ விரித்தெழுதும் தொடர் எவ்வாறு அழைக்கப்படுகிறது?",
    "options": [
      {
        "label": "A",
        "text": "Maclaurin's series"
      },
      {
        "label": "B",
        "text": "Fourier series"
      },
      {
        "label": "C",
        "text": "Laurent series"
      },
      {
        "label": "D",
        "text": "Binomial series"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "மெக்லாரனின் தொடர்"
      },
      {
        "label": "B",
        "text": "ஃபூரியர் தொடர்"
      },
      {
        "label": "C",
        "text": "லாரன்ட் தொடர்"
      },
      {
        "label": "D",
        "text": "ஈருறுப்புத் தொடர்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A Taylor series centered at x = 0 is defined as Maclaurin's series: sum f^(n)(0)/n! * x^n.",
    "explanationTamil": "x = 0 இல் மையப்படுத்தப்பட்ட டெய்லரின் தொடரே மெக்லாரனின் தொடராகும்."
  },
  {
    "code": "MAT-197",
    "subject": "Mathematics",
    "chapter": "Matrices and Determinants",
    "topic": "Cramer's Rule Inconsistency",
    "difficulty": "medium",
    "questionText": "In a system of three linear equations, if Delta = 0 and at least one of Delta_x, Delta_y, Delta_z is non-zero, then the system has:",
    "questionTextTamil": "மூன்று மாறிகளில் அமைந்த நேரியல் சமன்பாட்டுத் தொகுப்பில் Delta = 0 மற்றும் Delta_x, Delta_y, Delta_z ஆகியவற்றில் ஏதேனும் ஒன்று பூஜ்ஜியமற்றது எனில் தொகுப்பு:",
    "options": [
      {
        "label": "A",
        "text": "No solution (Inconsistent)"
      },
      {
        "label": "B",
        "text": "Unique solution"
      },
      {
        "label": "C",
        "text": "Infinitely many solutions"
      },
      {
        "label": "D",
        "text": "Zero solution"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "தீர்வு ஏதுமில்லை (ஒருங்கமைவற்றது)"
      },
      {
        "label": "B",
        "text": "ஒரேயொரு தீர்வு"
      },
      {
        "label": "C",
        "text": "எண்ணிக்கையற்ற தீர்வுகள்"
      },
      {
        "label": "D",
        "text": "பூஜ்ஜியத் தீர்வு"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Delta = 0 with at least one non-zero numerator Delta_i creates division by zero (constant / 0), meaning lines/planes do not intersect concurrently, giving no solution.",
    "explanationTamil": "Delta = 0 ஆக இருந்து ஏதேனும் ஒரு Delta_i != 0 எனில் சமன்பாட்டுத் தொகுப்புக்கு தீர்வு ஏதுமில்லை."
  },
  {
    "code": "MAT-198",
    "subject": "Mathematics",
    "chapter": "Complex Numbers",
    "topic": "Roots of Unity Product",
    "difficulty": "easy",
    "questionText": "The product of the n roots of unity is equal to:",
    "questionTextTamil": "ஒன்றின் n-ஆம் படி மூலங்களின் பெருக்கற்பலன் எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "(-1)^(n - 1)"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(-1)^(n - 1)"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "-1"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Roots of z^n - 1 = 0 satisfy product of roots = -(-1)^n * (-1) / 1 = (-1)^(n-1).",
    "explanationTamil": "z^n - 1 = 0 சமன்பாட்டின் மூலங்களின் பெருக்கல் (-1)^(n - 1) ஆகும்."
  },
  {
    "code": "MAT-199",
    "subject": "Mathematics",
    "chapter": "Theory of Equations",
    "topic": "Roots in Arithmetic Progression",
    "difficulty": "medium",
    "questionText": "If the roots of the cubic equation x^3 - 12x^2 + 39x - 28 = 0 are in Arithmetic Progression (A.P.), the middle root is:",
    "questionTextTamil": "x^3 - 12x^2 + 39x - 28 = 0 என்ற முப்படி சமன்பாட்டின் மூலங்கள் கூட்டுத் தொடர்முறையில் (A.P.) அமைந்தால் நடு மூலம் யாது?",
    "options": [
      {
        "label": "A",
        "text": "4"
      },
      {
        "label": "B",
        "text": "3"
      },
      {
        "label": "C",
        "text": "2"
      },
      {
        "label": "D",
        "text": "5"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "4"
      },
      {
        "label": "B",
        "text": "3"
      },
      {
        "label": "C",
        "text": "2"
      },
      {
        "label": "D",
        "text": "5"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Let roots be a - d, a, a + d. Sum of roots = 3a = 12 => a = 4.",
    "explanationTamil": "மூலங்கள் a - d, a, a + d எனில் கூடுதல் 3a = 12 => நடு மூலம் a = 4."
  },
  {
    "code": "MAT-200",
    "subject": "Mathematics",
    "chapter": "Two Dimensional Analytical Geometry",
    "topic": "Conjugate Hyperbola",
    "difficulty": "medium",
    "questionText": "The conjugate hyperbola of x^2/a^2 - y^2/b^2 = 1 has the equation:",
    "questionTextTamil": "x^2/a^2 - y^2/b^2 = 1 என்ற அதிபரவளையத்தின் துணை அதிபரவளையத்தின் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "x^2/a^2 - y^2/b^2 = -1 (or y^2/b^2 - x^2/a^2 = 1)"
      },
      {
        "label": "B",
        "text": "x^2/a^2 + y^2/b^2 = 1"
      },
      {
        "label": "C",
        "text": "x^2/b^2 - y^2/a^2 = 1"
      },
      {
        "label": "D",
        "text": "x*y = a*b"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x^2/a^2 - y^2/b^2 = -1 (அல்லது y^2/b^2 - x^2/a^2 = 1)"
      },
      {
        "label": "B",
        "text": "x^2/a^2 + y^2/b^2 = 1"
      },
      {
        "label": "C",
        "text": "x^2/b^2 - y^2/a^2 = 1"
      },
      {
        "label": "D",
        "text": "x*y = a*b"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Replacing 1 with -1 in the standard hyperbola equation gives its conjugate hyperbola.",
    "explanationTamil": "நிலையான அதிபரவளைய சமன்பாட்டில் 1 க்கு பதில் -1 என அமைத்தால் துணை அதிபரவளையம் கிடைக்கும்."
  }
];
