// scripts/question_bank/mathematics_part4.mjs
// Questions MAT-201 to MAT-300: Integrals, DEs, Differentials, Series, Combinatorics, Binomial, Trigonometry (100 Questions)

export const mathematicsPart4 = [
  {
    "code": "MAT-201",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Definite Integrals - Properties",
    "difficulty": "easy",
    "questionText": "The value of integral from -a to a of an odd function f(x) dx is always:",
    "questionTextTamil": "ஒரு ஒற்றைச் சார்பு f(x) க்கான -a முதல் a வரையிலான தொகையீட்டின் மதிப்பு எப்போதும்:",
    "options": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "2 * integral from 0 to a of f(x) dx"
      },
      {
        "label": "C",
        "text": "a"
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
        "text": "2 * integral from 0 to a of f(x) dx"
      },
      {
        "label": "C",
        "text": "a"
      },
      {
        "label": "D",
        "text": "வரையறுக்கப்படவில்லை"
      }
    ],
    "correctAnswer": "A",
    "explanation": "For an odd function f(-x) = -f(x), integral from -a to a of f(x) dx = 0.",
    "explanationTamil": "ஒற்றைச் சார்புக்கு f(-x) = -f(x) என்பதால் -a முதல் a வரையிலான தொகையீட்டு மதிப்பு 0 ஆகும்."
  },
  {
    "code": "MAT-202",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Definite Integrals - Even Function",
    "difficulty": "easy",
    "questionText": "If f(x) is an even function (f(-x) = f(x)), then integral from -a to a of f(x) dx is:",
    "questionTextTamil": "f(x) ஒரு இரட்டைச் சார்பு (f(-x) = f(x)) எனில் -a முதல் a வரையிலான தொகையீட்டு மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "2 * integral from 0 to a of f(x) dx"
      },
      {
        "label": "B",
        "text": "0"
      },
      {
        "label": "C",
        "text": "integral from 0 to a of f(x) dx"
      },
      {
        "label": "D",
        "text": "f(a) - f(-a)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2 * integral from 0 to a of f(x) dx"
      },
      {
        "label": "B",
        "text": "0"
      },
      {
        "label": "C",
        "text": "integral from 0 to a of f(x) dx"
      },
      {
        "label": "D",
        "text": "f(a) - f(-a)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By symmetry for an even function, the areas on both sides of y-axis add up to 2 * integral from 0 to a.",
    "explanationTamil": "இரட்டைச் சார்புக்கு y-அச்சின் இருபுறமும் சமபரப்பு உள்ளதால் 2 * integral from 0 to a என அமையும்."
  },
  {
    "code": "MAT-203",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Definite Integral Property",
    "difficulty": "medium",
    "questionText": "The value of integral from 0 to pi/2 of [sin(x) / (sin(x) + cos(x))] dx is:",
    "questionTextTamil": "0 முதல் pi/2 வரை [sin(x) / (sin(x) + cos(x))] dx இன் மதிப்பு என்ன?",
    "options": [
      {
        "label": "A",
        "text": "pi / 4"
      },
      {
        "label": "B",
        "text": "pi / 2"
      },
      {
        "label": "C",
        "text": "1"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "pi / 4"
      },
      {
        "label": "B",
        "text": "pi / 2"
      },
      {
        "label": "C",
        "text": "1"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Using King's property: I = integral sin/(sin+cos), I = integral cos/(cos+sin). 2I = integral 1 dx = pi/2 => I = pi/4.",
    "explanationTamil": "தொகையீட்டு பண்பின்படி 2I = pi/2, எனவே I = pi/4."
  },
  {
    "code": "MAT-204",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Bernoulli's Formula",
    "difficulty": "medium",
    "questionText": "Bernoulli's formula for integration by parts integral u v dx is expressed as:",
    "questionTextTamil": "பெர்னோலியின் பகுதித் தொகையீட்டு சூத்திரம் integral u v dx என்பது:",
    "options": [
      {
        "label": "A",
        "text": "u v1 - u' v2 + u'' v3 - ..."
      },
      {
        "label": "B",
        "text": "u v1 + u' v2 + u'' v3 + ..."
      },
      {
        "label": "C",
        "text": "u' v1 - u'' v2 + ..."
      },
      {
        "label": "D",
        "text": "u v - integral v du"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "u v1 - u' v2 + u'' v3 - ..."
      },
      {
        "label": "B",
        "text": "u v1 + u' v2 + u'' v3 + ..."
      },
      {
        "label": "C",
        "text": "u' v1 - u'' v2 + ..."
      },
      {
        "label": "D",
        "text": "u v - integral v du"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Bernoulli's generalized integration by parts is an alternating series: u v1 - u' v2 + u'' v3 - ...",
    "explanationTamil": "பெர்னோலியின் சூத்திரம் குறிகள் மாறி மாறி வரும் விரிவாகும்: u v1 - u' v2 + u'' v3 - ..."
  },
  {
    "code": "MAT-205",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Reduction Formula",
    "difficulty": "medium",
    "questionText": "The reduction formula value for integral from 0 to pi/2 of sin^n(x) dx when n is an odd positive integer is:",
    "questionTextTamil": "n ஒரு ஒற்றைப்படை மிகை முழு எண் எனில், 0 முதல் pi/2 வரை sin^n(x) dx இன் குறைப்புச் சூத்திர மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "((n-1)/n) * ((n-3)/(n-2)) * ... * (2/3) * 1"
      },
      {
        "label": "B",
        "text": "((n-1)/n) * ((n-3)/(n-2)) * ... * (1/2) * (pi/2)"
      },
      {
        "label": "C",
        "text": "1 / n"
      },
      {
        "label": "D",
        "text": "n!"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "((n-1)/n) * ((n-3)/(n-2)) * ... * (2/3) * 1"
      },
      {
        "label": "B",
        "text": "((n-1)/n) * ((n-3)/(n-2)) * ... * (1/2) * (pi/2)"
      },
      {
        "label": "C",
        "text": "1 / n"
      },
      {
        "label": "D",
        "text": "n!"
      }
    ],
    "correctAnswer": "A",
    "explanation": "When n is odd, the Wallis reduction formula ends with 1 (no pi/2 factor).",
    "explanationTamil": "n ஒற்றைப்படை எண் எனில் வாலிஸ் குறைப்பு சூத்திரம் 1 இல் முடியும் (pi/2 வராது)."
  },
  {
    "code": "MAT-206",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Reduction Formula Even",
    "difficulty": "medium",
    "questionText": "The reduction formula value for integral from 0 to pi/2 of sin^n(x) dx when n is an even positive integer ends with factor:",
    "questionTextTamil": "n ஒரு இரட்டைப்படை மிகை முழு எண் எனில் குறைப்பு சூத்திரம் எந்த காரணியில் முடியும்?",
    "options": [
      {
        "label": "A",
        "text": "pi / 2"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "pi"
      },
      {
        "label": "D",
        "text": "2 / 3"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "pi / 2"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "pi"
      },
      {
        "label": "D",
        "text": "2 / 3"
      }
    ],
    "correctAnswer": "A",
    "explanation": "When n is even, Wallis formula ends with factor (1/2) * (pi/2).",
    "explanationTamil": "n இரட்டைப்படை எண் எனில் வாலிஸ் சூத்திரம் (1/2) * (pi/2) இல் முடியும்."
  },
  {
    "code": "MAT-207",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Gamma Function",
    "difficulty": "hard",
    "questionText": "The value of Gamma(1/2) is equal to:",
    "questionTextTamil": "காமா சார்பு Gamma(1/2) இன் மதிப்பு எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "sqrt(pi)"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "pi / 2"
      },
      {
        "label": "D",
        "text": "1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "sqrt(pi)"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "pi / 2"
      },
      {
        "label": "D",
        "text": "1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By Euler's reflection formula or Gaussian integral, Gamma(1/2) = sqrt(pi).",
    "explanationTamil": "ஆய்லரின் காமா சூத்திரப்படி Gamma(1/2) = sqrt(pi) ஆகும்."
  },
  {
    "code": "MAT-208",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Gamma Function Recurrence",
    "difficulty": "easy",
    "questionText": "For any positive integer n, Gamma(n + 1) is equal to:",
    "questionTextTamil": "எந்தவொரு மிகை முழு எண் n க்கும் Gamma(n + 1) இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "n!"
      },
      {
        "label": "B",
        "text": "(n - 1)!"
      },
      {
        "label": "C",
        "text": "(n + 1)!"
      },
      {
        "label": "D",
        "text": "n^n"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "n!"
      },
      {
        "label": "B",
        "text": "(n - 1)!"
      },
      {
        "label": "C",
        "text": "(n + 1)!"
      },
      {
        "label": "D",
        "text": "n^n"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Gamma(n + 1) = n * Gamma(n) = n! for integer n >= 0.",
    "explanationTamil": "மிகை முழு எண் n க்கு Gamma(n + 1) = n! ஆகும்."
  },
  {
    "code": "MAT-209",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Area Bounded by Curve",
    "difficulty": "easy",
    "questionText": "The area bounded by the parabola y^2 = 4ax and its latus rectum x = a is:",
    "questionTextTamil": "y^2 = 4ax என்ற பரவளையம் மற்றும் அதன் செவ்வகலம் x = a ஆகியவற்றால் அடைபடும் பரப்பளவு:",
    "options": [
      {
        "label": "A",
        "text": "(8/3) * a^2"
      },
      {
        "label": "B",
        "text": "(4/3) * a^2"
      },
      {
        "label": "C",
        "text": "8 * a^2"
      },
      {
        "label": "D",
        "text": "(16/3) * a^2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(8/3) * a^2"
      },
      {
        "label": "B",
        "text": "(4/3) * a^2"
      },
      {
        "label": "C",
        "text": "8 * a^2"
      },
      {
        "label": "D",
        "text": "(16/3) * a^2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Area = 2 * integral from 0 to a of 2 sqrt(a) x^(1/2) dx = 4 sqrt(a) * (2/3) a^(3/2) = (8/3) a^2.",
    "explanationTamil": "பரப்பளவு = 2 * integral from 0 to a of 2 sqrt(ax) dx = (8/3) a^2."
  },
  {
    "code": "MAT-210",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Area of Ellipse",
    "difficulty": "easy",
    "questionText": "The total area enclosed by the ellipse x^2/a^2 + y^2/b^2 = 1 is:",
    "questionTextTamil": "x^2/a^2 + y^2/b^2 = 1 என்ற நீள்வட்டத்தால் அடைபடும் மொத்த பரப்பளவு:",
    "options": [
      {
        "label": "A",
        "text": "pi * a * b"
      },
      {
        "label": "B",
        "text": "2 * pi * a * b"
      },
      {
        "label": "C",
        "text": "4 * pi * a * b"
      },
      {
        "label": "D",
        "text": "pi * (a^2 + b^2)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "pi * a * b"
      },
      {
        "label": "B",
        "text": "2 * pi * a * b"
      },
      {
        "label": "C",
        "text": "4 * pi * a * b"
      },
      {
        "label": "D",
        "text": "pi * (a^2 + b^2)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The area of standard ellipse is pi * a * b.",
    "explanationTamil": "நீள்வட்டத்தின் மொத்த பரப்பளவு pi * a * b ஆகும்."
  },
  {
    "code": "MAT-211",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Volume of Revolution",
    "difficulty": "medium",
    "questionText": "The volume of the solid generated by revolving the region bounded by y = f(x), x = a, x = b about the x-axis is:",
    "questionTextTamil": "y = f(x), x = a, x = b என்ற வரம்புகளை x-அச்சைச் சுற்றி சுழற்றுவதால் உருவாகும் திண்மத்தின் கனஅளவு:",
    "options": [
      {
        "label": "A",
        "text": "pi * integral from a to b of y^2 dx"
      },
      {
        "label": "B",
        "text": "2*pi * integral from a to b of y dx"
      },
      {
        "label": "C",
        "text": "pi * integral from a to b of x^2 dy"
      },
      {
        "label": "D",
        "text": "integral from a to b of y^2 dx"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "pi * integral from a to b of y^2 dx"
      },
      {
        "label": "B",
        "text": "2*pi * integral from a to b of y dx"
      },
      {
        "label": "C",
        "text": "pi * integral from a to b of x^2 dy"
      },
      {
        "label": "D",
        "text": "integral from a to b of y^2 dx"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Disk method volume about x-axis: V = pi * integral from a to b of [f(x)]^2 dx.",
    "explanationTamil": "x-அச்சைச் சுற்றி சுழற்றும்போது கனஅளவு V = pi * integral y^2 dx ஆகும்."
  },
  {
    "code": "MAT-212",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Volume of Sphere",
    "difficulty": "easy",
    "questionText": "Revolving the circle x^2 + y^2 = r^2 about the x-axis generates a sphere of volume:",
    "questionTextTamil": "x^2 + y^2 = r^2 என்ற வட்டத்தை x-அச்சைச் சுற்றி சுழற்றினால் கிடைக்கும் கோளத்தின் கனஅளவு:",
    "options": [
      {
        "label": "A",
        "text": "(4/3) * pi * r^3"
      },
      {
        "label": "B",
        "text": "4 * pi * r^2"
      },
      {
        "label": "C",
        "text": "(2/3) * pi * r^3"
      },
      {
        "label": "D",
        "text": "pi * r^3"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(4/3) * pi * r^3"
      },
      {
        "label": "B",
        "text": "4 * pi * r^2"
      },
      {
        "label": "C",
        "text": "(2/3) * pi * r^3"
      },
      {
        "label": "D",
        "text": "pi * r^3"
      }
    ],
    "correctAnswer": "A",
    "explanation": "V = pi * integral from -r to r of (r^2 - x^2) dx = (4/3) pi r^3.",
    "explanationTamil": "சுழற்சி திண்ம முறையில் கோளத்தின் கனஅளவு (4/3) pi r^3 ஆகும்."
  },
  {
    "code": "MAT-213",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Fundamental Theorem of Calculus",
    "difficulty": "easy",
    "questionText": "If F(x) = integral from a to x of f(t) dt where f is continuous, then F'(x) is equal to:",
    "questionTextTamil": "தொடக்க கால்குலஸின் அடிப்படை தேற்றப்படி F(x) = integral from a to x of f(t) dt எனில் F'(x) இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "f(x)"
      },
      {
        "label": "B",
        "text": "f'(x)"
      },
      {
        "label": "C",
        "text": "F(x)"
      },
      {
        "label": "D",
        "text": "f(x) - f(a)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "f(x)"
      },
      {
        "label": "B",
        "text": "f'(x)"
      },
      {
        "label": "C",
        "text": "F(x)"
      },
      {
        "label": "D",
        "text": "f(x) - f(a)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The Fundamental Theorem of Calculus Part 1 establishes d/dx [integral from a to x of f(t) dt] = f(x).",
    "explanationTamil": "கால்குலஸின் அடிப்படை தேற்றப்படி d/dx [integral from a to x of f(t) dt] = f(x) ஆகும்."
  },
  {
    "code": "MAT-214",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Leibniz Rule",
    "difficulty": "hard",
    "questionText": "By Leibniz integral rule, d/dx [integral from 0 to x^2 of sin(t) dt] is equal to:",
    "questionTextTamil": "லெப்னிஸ் விதிப்படி d/dx [integral from 0 to x^2 of sin(t) dt] இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "2x * sin(x^2)"
      },
      {
        "label": "B",
        "text": "sin(x^2)"
      },
      {
        "label": "C",
        "text": "cos(x^2)"
      },
      {
        "label": "D",
        "text": "2x * cos(x^2)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2x * sin(x^2)"
      },
      {
        "label": "B",
        "text": "sin(x^2)"
      },
      {
        "label": "C",
        "text": "cos(x^2)"
      },
      {
        "label": "D",
        "text": "2x * cos(x^2)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By Leibniz rule: d/dx [integral from u(x) to v(x) f(t)dt] = f(v(x))*v'(x) - f(u(x))*u'(x) = sin(x^2) * 2x.",
    "explanationTamil": "லெப்னிஸ் விதியின்படி f(v(x))*v'(x) = sin(x^2) * 2x ஆகும்."
  },
  {
    "code": "MAT-215",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Improper Integrals",
    "difficulty": "medium",
    "questionText": "The value of integral from 0 to infinity of e^(-x) dx is:",
    "questionTextTamil": "0 முதல் முடிவிலி வரை e^(-x) dx இன் மதிப்பு என்ன?",
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
        "text": "infinity"
      },
      {
        "label": "D",
        "text": "-1"
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
        "text": "infinity"
      },
      {
        "label": "D",
        "text": "-1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "[-e^(-x)] from 0 to inf = 0 - (-e^0) = 1.",
    "explanationTamil": "[-e^(-x)] எல்லைகளைப் பிரதியிட 0 - (-1) = 1 ஆகும்."
  },
  {
    "code": "MAT-216",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Order and Degree",
    "difficulty": "easy",
    "questionText": "The order and degree of the differential equation (d^2y/dx^2)^3 + (dy/dx)^4 + y = 0 are:",
    "questionTextTamil": "(d^2y/dx^2)^3 + (dy/dx)^4 + y = 0 என்ற வகைக்கெழுச் சமன்பாட்டின் வரிசை மற்றும் படி முறையே:",
    "options": [
      {
        "label": "A",
        "text": "Order = 2, Degree = 3"
      },
      {
        "label": "B",
        "text": "Order = 3, Degree = 2"
      },
      {
        "label": "C",
        "text": "Order = 2, Degree = 4"
      },
      {
        "label": "D",
        "text": "Order = 4, Degree = 3"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "வரிசை = 2, படி = 3"
      },
      {
        "label": "B",
        "text": "வரிசை = 3, படி = 2"
      },
      {
        "label": "C",
        "text": "வரிசை = 2, படி = 4"
      },
      {
        "label": "D",
        "text": "வரிசை = 4, படி = 3"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The highest derivative is d^2y/dx^2 (order 2), and its power is 3 (degree 3).",
    "explanationTamil": "உயர்ந்த வகைக்கெழு d^2y/dx^2 (வரிசை 2), அதன் அடுக்கு 3 (படி 3)."
  },
  {
    "code": "MAT-217",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Degree of Non-polynomial Derivative",
    "difficulty": "medium",
    "questionText": "The degree of the differential equation d^2y/dx^2 + sin(dy/dx) = 0 is:",
    "questionTextTamil": "d^2y/dx^2 + sin(dy/dx) = 0 என்ற வகைக்கெழுச் சமன்பாட்டின் படி:",
    "options": [
      {
        "label": "A",
        "text": "Not defined"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "2"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "வரையறுக்கப்படவில்லை"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "2"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The equation cannot be written as a polynomial in its derivatives due to sin(dy/dx), so degree is not defined.",
    "explanationTamil": "வகைக்கெழுக்களில் பல்லுறுப்புக் கோவையாக எழுத முடியாததால் படி வரையறுக்கப்படவில்லை."
  },
  {
    "code": "MAT-218",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Formation of Differential Equation",
    "difficulty": "medium",
    "questionText": "The differential equation representing the family of curves y = A * e^(2x) + B * e^(-2x) (where A and B are arbitrary constants) is:",
    "questionTextTamil": "y = A * e^(2x) + B * e^(-2x) என்ற குடும்ப வளைவரைகளைக் குறிக்கும் வகைக்கெழுச் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "d^2y/dx^2 - 4y = 0"
      },
      {
        "label": "B",
        "text": "d^2y/dx^2 + 4y = 0"
      },
      {
        "label": "C",
        "text": "d^2y/dx^2 - 2y = 0"
      },
      {
        "label": "D",
        "text": "dy/dx - 2y = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "d^2y/dx^2 - 4y = 0"
      },
      {
        "label": "B",
        "text": "d^2y/dx^2 + 4y = 0"
      },
      {
        "label": "C",
        "text": "d^2y/dx^2 - 2y = 0"
      },
      {
        "label": "D",
        "text": "dy/dx - 2y = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "dy/dx = 2Ae^(2x) - 2Be^(-2x); d^2y/dx^2 = 4Ae^(2x) + 4Be^(-2x) = 4y => d^2y/dx^2 - 4y = 0.",
    "explanationTamil": "இருமுறை வகையிட d^2y/dx^2 = 4y => d^2y/dx^2 - 4y = 0 கிடைக்கும்."
  },
  {
    "code": "MAT-219",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Variable Separable Form",
    "difficulty": "easy",
    "questionText": "The general solution of dy/dx = e^(x - y) is:",
    "questionTextTamil": "dy/dx = e^(x - y) என்ற வகைக்கெழுச் சமன்பாட்டின் பொதுத் தீர்வு:",
    "options": [
      {
        "label": "A",
        "text": "e^y = e^x + C"
      },
      {
        "label": "B",
        "text": "e^x + e^y = C"
      },
      {
        "label": "C",
        "text": "e^(-y) = e^x + C"
      },
      {
        "label": "D",
        "text": "y = x + C"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "e^y = e^x + C"
      },
      {
        "label": "B",
        "text": "e^x + e^y = C"
      },
      {
        "label": "C",
        "text": "e^(-y) = e^x + C"
      },
      {
        "label": "D",
        "text": "y = x + C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "dy/dx = e^x / e^y => e^y dy = e^x dx. Integrating both sides gives e^y = e^x + C.",
    "explanationTamil": "மாறிகளைப் பிரிக்க e^y dy = e^x dx, தொகையிட e^y = e^x + C ஆகும்."
  },
  {
    "code": "MAT-220",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Integrating Factor",
    "difficulty": "easy",
    "questionText": "The integrating factor (I.F.) for the linear differential equation dy/dx + P(x)*y = Q(x) is:",
    "questionTextTamil": "dy/dx + P(x)*y = Q(x) என்ற நேரியல் வகைக்கெழுச் சமன்பாட்டின் தொகையீட்டுக் காரணி (I.F.):",
    "options": [
      {
        "label": "A",
        "text": "e^(integral P(x) dx)"
      },
      {
        "label": "B",
        "text": "e^(-integral P(x) dx)"
      },
      {
        "label": "C",
        "text": "integral P(x) dx"
      },
      {
        "label": "D",
        "text": "e^(integral Q(x) dx)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "e^(integral P(x) dx)"
      },
      {
        "label": "B",
        "text": "e^(-integral P(x) dx)"
      },
      {
        "label": "C",
        "text": "integral P(x) dx"
      },
      {
        "label": "D",
        "text": "e^(integral Q(x) dx)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The standard integrating factor for first-order linear DE is I.F. = e^(integral P dx).",
    "explanationTamil": "முதல் வரிசை நேரியல் வகைக்கெழுச் சமன்பாட்டின் தொகையீட்டுக் காரணி I.F. = e^(integral P dx)."
  },
  {
    "code": "MAT-221",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Linear Differential Equation",
    "difficulty": "medium",
    "questionText": "The integrating factor for dy/dx + (1/x)*y = x^2 is:",
    "questionTextTamil": "dy/dx + (1/x)*y = x^2 என்ற சமன்பாட்டின் தொகையீட்டுக் காரணி:",
    "options": [
      {
        "label": "A",
        "text": "x"
      },
      {
        "label": "B",
        "text": "log(x)"
      },
      {
        "label": "C",
        "text": "e^x"
      },
      {
        "label": "D",
        "text": "1 / x"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x"
      },
      {
        "label": "B",
        "text": "log(x)"
      },
      {
        "label": "C",
        "text": "e^x"
      },
      {
        "label": "D",
        "text": "1 / x"
      }
    ],
    "correctAnswer": "A",
    "explanation": "P = 1/x. I.F. = e^(integral (1/x) dx) = e^(ln x) = x.",
    "explanationTamil": "P = 1/x என்பதால் I.F. = e^(ln x) = x ஆகும்."
  },
  {
    "code": "MAT-222",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Homogeneous Differential Equation",
    "difficulty": "medium",
    "questionText": "A differential equation dy/dx = f(x, y) is homogeneous of degree 0 if it can be written as:",
    "questionTextTamil": "dy/dx = f(x, y) என்ற வகைக்கெழுச் சமன்பாடு சமபடித்தானது எனில் அதனை எவ்வாறாக எழுதலாம்?",
    "options": [
      {
        "label": "A",
        "text": "dy/dx = g(y / x)"
      },
      {
        "label": "B",
        "text": "dy/dx = g(x * y)"
      },
      {
        "label": "C",
        "text": "dy/dx = g(x + y)"
      },
      {
        "label": "D",
        "text": "dy/dx = g(x^2 + y^2)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "dy/dx = g(y / x)"
      },
      {
        "label": "B",
        "text": "dy/dx = g(x * y)"
      },
      {
        "label": "C",
        "text": "dy/dx = g(x + y)"
      },
      {
        "label": "D",
        "text": "dy/dx = g(x^2 + y^2)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A homogeneous differential equation can always be expressed in the form dy/dx = F(y/x).",
    "explanationTamil": "சமபடித்தான வகைக்கெழுச் சமன்பாட்டை dy/dx = F(y/x) என்ற வடிவில் எழுதலாம்."
  },
  {
    "code": "MAT-223",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Substitution in Homogeneous DE",
    "difficulty": "easy",
    "questionText": "The standard substitution used to solve a homogeneous differential equation dy/dx = f(y/x) is:",
    "questionTextTamil": "dy/dx = f(y/x) என்ற சமபடித்தான வகைக்கெழுச் சமன்பாட்டைத் தீர்க்கப் பயன்படும் பிரதியீடு:",
    "options": [
      {
        "label": "A",
        "text": "y = v * x"
      },
      {
        "label": "B",
        "text": "x = v * y^2"
      },
      {
        "label": "C",
        "text": "y = v + x"
      },
      {
        "label": "D",
        "text": "y = v / x"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "y = v * x"
      },
      {
        "label": "B",
        "text": "x = v * y^2"
      },
      {
        "label": "C",
        "text": "y = v + x"
      },
      {
        "label": "D",
        "text": "y = v / x"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Substituting y = vx transforms the equation into variable separable form in v and x.",
    "explanationTamil": "y = vx என பிரதியிடுவதன் மூலம் சமன்பாட்டை மாறிகள் பிரிக்கத்தக்க வடிவிற்கு மாற்றலாம்."
  },
  {
    "code": "MAT-224",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Growth and Decay Model",
    "difficulty": "easy",
    "questionText": "The law of natural growth/decay dy/dt = k*y has the solution:",
    "questionTextTamil": "dy/dt = k*y என்ற இயற்கை வளர்ச்சி/சிதைவு மாதிரியின் தீர்வு:",
    "options": [
      {
        "label": "A",
        "text": "y = y0 * e^(kt)"
      },
      {
        "label": "B",
        "text": "y = y0 + kt"
      },
      {
        "label": "C",
        "text": "y = y0 * k^t"
      },
      {
        "label": "D",
        "text": "y = y0 * ln(kt)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "y = y0 * e^(kt)"
      },
      {
        "label": "B",
        "text": "y = y0 + kt"
      },
      {
        "label": "C",
        "text": "y = y0 * k^t"
      },
      {
        "label": "D",
        "text": "y = y0 * ln(kt)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "dy/y = k dt => ln y = kt + c => y(t) = y0 * e^(kt).",
    "explanationTamil": "dy/y = k dt ஐத் தொகையிட y = y0 * e^(kt) என்ற அடுக்குக்குறி வளர்ச்சி தீர்வு கிடைக்கும்."
  },
  {
    "code": "MAT-225",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Newton's Law of Cooling",
    "difficulty": "medium",
    "questionText": "Newton's law of cooling is modeled by the differential equation:",
    "questionTextTamil": "நியூட்டனின் குளிர்வு விதியைக் குறிக்கும் வகைக்கெழுச் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "dT/dt = -k * (T - Ts)"
      },
      {
        "label": "B",
        "text": "dT/dt = k * (T + Ts)"
      },
      {
        "label": "C",
        "text": "dT/dt = -k * T"
      },
      {
        "label": "D",
        "text": "d^2T/dt^2 = -k * T"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "dT/dt = -k * (T - Ts)"
      },
      {
        "label": "B",
        "text": "dT/dt = k * (T + Ts)"
      },
      {
        "label": "C",
        "text": "dT/dt = -k * T"
      },
      {
        "label": "D",
        "text": "d^2T/dt^2 = -k * T"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The rate of loss of heat is proportional to the temperature difference between body and surroundings: dT/dt = -k(T - Ts).",
    "explanationTamil": "வெப்ப இழப்பு வீதம் பொருள் மற்றும் சூழலின் வெப்ப வேறுபாட்டிற்கு நேர்விகிதத்தில் இருக்கும்: dT/dt = -k(T - Ts)."
  },
  {
    "code": "MAT-226",
    "subject": "Mathematics",
    "chapter": "Differentials and Partial Derivatives",
    "topic": "Differential df",
    "difficulty": "easy",
    "questionText": "For y = f(x), the differential dy is defined as:",
    "questionTextTamil": "y = f(x) எனில் வகையீடு dy என்பது:",
    "options": [
      {
        "label": "A",
        "text": "f'(x) * dx"
      },
      {
        "label": "B",
        "text": "f'(x) / dx"
      },
      {
        "label": "C",
        "text": "f(x) * dx"
      },
      {
        "label": "D",
        "text": "dx / f'(x)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "f'(x) * dx"
      },
      {
        "label": "B",
        "text": "f'(x) / dx"
      },
      {
        "label": "C",
        "text": "f(x) * dx"
      },
      {
        "label": "D",
        "text": "dx / f'(x)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By definition, the differential dy = f'(x) dx.",
    "explanationTamil": "வரையறைப்படி வகையீடு dy = f'(x) dx ஆகும்."
  },
  {
    "code": "MAT-227",
    "subject": "Mathematics",
    "chapter": "Differentials and Partial Derivatives",
    "topic": "Relative Error",
    "difficulty": "easy",
    "questionText": "If delta_x is the error in measuring x, then the relative error is defined as:",
    "questionTextTamil": "x ஐ அளவிடுவதில் ஏற்படும் பிழை delta_x எனில் சார்புப் பிழை (relative error) என்பது:",
    "options": [
      {
        "label": "A",
        "text": "delta_x / x"
      },
      {
        "label": "B",
        "text": "delta_x * x"
      },
      {
        "label": "C",
        "text": "delta_x / (100 * x)"
      },
      {
        "label": "D",
        "text": "(delta_x / x) * 100"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "delta_x / x"
      },
      {
        "label": "B",
        "text": "delta_x * x"
      },
      {
        "label": "C",
        "text": "delta_x / (100 * x)"
      },
      {
        "label": "D",
        "text": "(delta_x / x) * 100"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Relative error is the ratio of absolute error to actual value: delta_x / x.",
    "explanationTamil": "சார்புப் பிழை என்பது தனிப் பிழைக்கும் உண்மை மதிப்புக்கும் உள்ள விகிதமாகும்: delta_x / x."
  },
  {
    "code": "MAT-228",
    "subject": "Mathematics",
    "chapter": "Differentials and Partial Derivatives",
    "topic": "Percentage Error",
    "difficulty": "easy",
    "questionText": "The percentage error is given by:",
    "questionTextTamil": "சதவீதப் பிழை என்பது:",
    "options": [
      {
        "label": "A",
        "text": "(delta_x / x) * 100%"
      },
      {
        "label": "B",
        "text": "(x / delta_x) * 100%"
      },
      {
        "label": "C",
        "text": "delta_x * 100%"
      },
      {
        "label": "D",
        "text": "(delta_x)^2 * 100%"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(delta_x / x) * 100%"
      },
      {
        "label": "B",
        "text": "(x / delta_x) * 100%"
      },
      {
        "label": "C",
        "text": "delta_x * 100%"
      },
      {
        "label": "D",
        "text": "(delta_x)^2 * 100%"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Percentage error = Relative error * 100% = (delta_x / x) * 100%.",
    "explanationTamil": "சதவீதப் பிழை = சார்புப் பிழை * 100% = (delta_x / x) * 100% ஆகும்."
  },
  {
    "code": "MAT-229",
    "subject": "Mathematics",
    "chapter": "Differentials and Partial Derivatives",
    "topic": "Linear Approximation",
    "difficulty": "medium",
    "questionText": "The linear approximation L(x) of f(x) near x = x0 is given by:",
    "questionTextTamil": "x = x0 அருகில் f(x) இன் நேரியல் தோராய மதிப்பு L(x):",
    "options": [
      {
        "label": "A",
        "text": "f(x0) + f'(x0) * (x - x0)"
      },
      {
        "label": "B",
        "text": "f(x0) - f'(x0) * (x - x0)"
      },
      {
        "label": "C",
        "text": "f'(x0) * (x - x0)"
      },
      {
        "label": "D",
        "text": "f(x0) + f''(x0) * (x - x0)^2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "f(x0) + f'(x0) * (x - x0)"
      },
      {
        "label": "B",
        "text": "f(x0) - f'(x0) * (x - x0)"
      },
      {
        "label": "C",
        "text": "f'(x0) * (x - x0)"
      },
      {
        "label": "D",
        "text": "f(x0) + f''(x0) * (x - x0)^2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "L(x) is the equation of the tangent line at x0: L(x) = f(x0) + f'(x0)(x - x0).",
    "explanationTamil": "x0 இல் தொடுகோட்டின் சமன்பாடே நேரியல் தோராயமாகும்: L(x) = f(x0) + f'(x0)(x - x0)."
  },
  {
    "code": "MAT-230",
    "subject": "Mathematics",
    "chapter": "Differentials and Partial Derivatives",
    "topic": "Clairaut's Theorem",
    "difficulty": "medium",
    "questionText": "If f(x, y) has continuous second-order partial derivatives, Clairaut's theorem states that:",
    "questionTextTamil": "f(x, y) தொடர்ச்சியான இரண்டாம் நிலை பகுதி வகைக்கெழுக்களைப் பெற்றிருந்தால் கிளாரட்டின் தேற்றம் கூறுவது:",
    "options": [
      {
        "label": "A",
        "text": "d^2f / (dx dy) = d^2f / (dy dx)"
      },
      {
        "label": "B",
        "text": "d^2f / dx^2 = d^2f / dy^2"
      },
      {
        "label": "C",
        "text": "df/dx = df/dy"
      },
      {
        "label": "D",
        "text": "d^2f / (dx dy) = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "d^2f / (dx dy) = d^2f / (dy dx)"
      },
      {
        "label": "B",
        "text": "d^2f / dx^2 = d^2f / dy^2"
      },
      {
        "label": "C",
        "text": "df/dx = df/dy"
      },
      {
        "label": "D",
        "text": "d^2f / (dx dy) = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Equality of mixed partials: f_xy = f_yx when partial derivatives are continuous.",
    "explanationTamil": "பகுதி வகைக்கெழுக்கள் தொடர்ச்சியாக இருந்தால் கலப்பு பகுதி வகைக்கெழுக்கள் சமம்: f_xy = f_yx."
  },
  {
    "code": "MAT-231",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Integral of 1/(a^2 + x^2)",
    "difficulty": "easy",
    "questionText": "The integral of 1 / (a^2 + x^2) dx is:",
    "questionTextTamil": "1 / (a^2 + x^2) dx இன் தொகையீடு:",
    "options": [
      {
        "label": "A",
        "text": "(1/a) * tan^(-1)(x/a) + C"
      },
      {
        "label": "B",
        "text": "tan^(-1)(x/a) + C"
      },
      {
        "label": "C",
        "text": "(1/a) * sin^(-1)(x/a) + C"
      },
      {
        "label": "D",
        "text": "ln(a^2 + x^2) + C"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(1/a) * tan^(-1)(x/a) + C"
      },
      {
        "label": "B",
        "text": "tan^(-1)(x/a) + C"
      },
      {
        "label": "C",
        "text": "(1/a) * sin^(-1)(x/a) + C"
      },
      {
        "label": "D",
        "text": "ln(a^2 + x^2) + C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard integral formula: integral dx/(a^2+x^2) = (1/a) tan^(-1)(x/a) + C.",
    "explanationTamil": "நிலையான தொகையீட்டு சூத்திரம்: (1/a) tan^(-1)(x/a) + C."
  },
  {
    "code": "MAT-232",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Integral of 1/sqrt(a^2 - x^2)",
    "difficulty": "easy",
    "questionText": "The integral of 1 / sqrt(a^2 - x^2) dx is:",
    "questionTextTamil": "1 / sqrt(a^2 - x^2) dx இன் தொகையீடு:",
    "options": [
      {
        "label": "A",
        "text": "sin^(-1)(x/a) + C"
      },
      {
        "label": "B",
        "text": "(1/a) * sin^(-1)(x/a) + C"
      },
      {
        "label": "C",
        "text": "cos^(-1)(x/a) + C"
      },
      {
        "label": "D",
        "text": "ln|x + sqrt(a^2 - x^2)| + C"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "sin^(-1)(x/a) + C"
      },
      {
        "label": "B",
        "text": "(1/a) * sin^(-1)(x/a) + C"
      },
      {
        "label": "C",
        "text": "cos^(-1)(x/a) + C"
      },
      {
        "label": "D",
        "text": "ln|x + sqrt(a^2 - x^2)| + C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard formula: integral dx/sqrt(a^2 - x^2) = sin^(-1)(x/a) + C.",
    "explanationTamil": "நிலையான சூத்திரம்: sin^(-1)(x/a) + C."
  },
  {
    "code": "MAT-233",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Integral of sec(x)",
    "difficulty": "easy",
    "questionText": "The integral of sec(x) dx is:",
    "questionTextTamil": "sec(x) dx இன் தொகையீடு:",
    "options": [
      {
        "label": "A",
        "text": "ln|sec(x) + tan(x)| + C"
      },
      {
        "label": "B",
        "text": "sec(x)*tan(x) + C"
      },
      {
        "label": "C",
        "text": "ln|sec(x)| + C"
      },
      {
        "label": "D",
        "text": "tan^2(x) + C"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "ln|sec(x) + tan(x)| + C"
      },
      {
        "label": "B",
        "text": "sec(x)*tan(x) + C"
      },
      {
        "label": "C",
        "text": "ln|sec(x)| + C"
      },
      {
        "label": "D",
        "text": "tan^2(x) + C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "integral sec(x) dx = ln|sec(x) + tan(x)| + C.",
    "explanationTamil": "integral sec(x) dx = ln|sec(x) + tan(x)| + C ஆகும்."
  },
  {
    "code": "MAT-234",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Integral of tan(x)",
    "difficulty": "easy",
    "questionText": "The integral of tan(x) dx is:",
    "questionTextTamil": "tan(x) dx இன் தொகையீடு:",
    "options": [
      {
        "label": "A",
        "text": "ln|sec(x)| + C (or -ln|cos(x)| + C)"
      },
      {
        "label": "B",
        "text": "sec^2(x) + C"
      },
      {
        "label": "C",
        "text": "cot(x) + C"
      },
      {
        "label": "D",
        "text": "ln|sin(x)| + C"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "ln|sec(x)| + C (அல்லது -ln|cos(x)| + C)"
      },
      {
        "label": "B",
        "text": "sec^2(x) + C"
      },
      {
        "label": "C",
        "text": "cot(x) + C"
      },
      {
        "label": "D",
        "text": "ln|sin(x)| + C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "integral tan(x) dx = ln|sec(x)| + C = -ln|cos(x)| + C.",
    "explanationTamil": "integral tan(x) dx = ln|sec(x)| + C ஆகும்."
  },
  {
    "code": "MAT-235",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Integration by Parts Formula",
    "difficulty": "easy",
    "questionText": "Integration by parts states that integral u dv equals:",
    "questionTextTamil": "பகுதி தொகையீட்டு முறைப்படி integral u dv எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "u v - integral v du"
      },
      {
        "label": "B",
        "text": "u v + integral v du"
      },
      {
        "label": "C",
        "text": "u' v - integral u v' dx"
      },
      {
        "label": "D",
        "text": "u / v - integral du/v"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "u v - integral v du"
      },
      {
        "label": "B",
        "text": "u v + integral v du"
      },
      {
        "label": "C",
        "text": "u' v - integral u v' dx"
      },
      {
        "label": "D",
        "text": "u / v - integral du/v"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By product rule of differentiation: integral u dv = uv - integral v du.",
    "explanationTamil": "பகுதி தொகையீட்டு சூத்திரம்: uv - integral v du."
  },
  {
    "code": "MAT-236",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Integral of e^(ax) sin(bx)",
    "difficulty": "medium",
    "questionText": "The integral of e^(ax) * sin(bx) dx is given by:",
    "questionTextTamil": "e^(ax) * sin(bx) dx இன் தொகையீடு:",
    "options": [
      {
        "label": "A",
        "text": "[e^(ax) / (a^2 + b^2)] * (a sin(bx) - b cos(bx)) + C"
      },
      {
        "label": "B",
        "text": "[e^(ax) / (a^2 + b^2)] * (a cos(bx) + b sin(bx)) + C"
      },
      {
        "label": "C",
        "text": "[e^(ax) / (a + b)] * sin(bx) + C"
      },
      {
        "label": "D",
        "text": "e^(ax) cos(bx) + C"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "[e^(ax) / (a^2 + b^2)] * (a sin(bx) - b cos(bx)) + C"
      },
      {
        "label": "B",
        "text": "[e^(ax) / (a^2 + b^2)] * (a cos(bx) + b sin(bx)) + C"
      },
      {
        "label": "C",
        "text": "[e^(ax) / (a + b)] * sin(bx) + C"
      },
      {
        "label": "D",
        "text": "e^(ax) cos(bx) + C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard exponential-trigonometric integral formula.",
    "explanationTamil": "நிலையான அடுக்குக்குறி-முக்கோணவியல் தொகையீட்டு சூத்திரம்."
  },
  {
    "code": "MAT-237",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Area Between Parabola and Line",
    "difficulty": "medium",
    "questionText": "The area bounded by the parabola y = x^2 and the line y = x is:",
    "questionTextTamil": "y = x^2 என்ற பரவளையம் மற்றும் y = x என்ற கோட்டிற்கு இடைப்பட்ட பரப்பளவு:",
    "options": [
      {
        "label": "A",
        "text": "1 / 6"
      },
      {
        "label": "B",
        "text": "1 / 3"
      },
      {
        "label": "C",
        "text": "1 / 2"
      },
      {
        "label": "D",
        "text": "1 / 12"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "1 / 6"
      },
      {
        "label": "B",
        "text": "1 / 3"
      },
      {
        "label": "C",
        "text": "1 / 2"
      },
      {
        "label": "D",
        "text": "1 / 12"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Integral from 0 to 1 of (x - x^2) dx = [x^2/2 - x^3/3] = 1/2 - 1/3 = 1/6.",
    "explanationTamil": "integral from 0 to 1 (x - x^2) dx = 1/2 - 1/3 = 1/6."
  },
  {
    "code": "MAT-238",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Symmetric Definite Integral",
    "difficulty": "easy",
    "questionText": "The value of integral from -pi/2 to pi/2 of x^3 * cos(x) dx is:",
    "questionTextTamil": "-pi/2 முதல் pi/2 வரை x^3 * cos(x) dx இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "2"
      },
      {
        "label": "D",
        "text": "1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "0"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "2"
      },
      {
        "label": "D",
        "text": "1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "x^3 is odd and cos(x) is even, so the integrand is odd, making the symmetric integral zero.",
    "explanationTamil": "x^3 cos(x) ஒரு ஒற்றைச் சார்பு என்பதால் சமச்சீர் தொகையீட்டின் மதிப்பு 0 ஆகும்."
  },
  {
    "code": "MAT-239",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "General Solution of dy/dx = y",
    "difficulty": "easy",
    "questionText": "The general solution of the differential equation dy/dx = y is:",
    "questionTextTamil": "dy/dx = y என்ற வகைக்கெழுச் சமன்பாட்டின் பொதுத் தீர்வு:",
    "options": [
      {
        "label": "A",
        "text": "y = C * e^x"
      },
      {
        "label": "B",
        "text": "y = x + C"
      },
      {
        "label": "C",
        "text": "y = C * x"
      },
      {
        "label": "D",
        "text": "y = e^(x + C)^2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "y = C * e^x"
      },
      {
        "label": "B",
        "text": "y = x + C"
      },
      {
        "label": "C",
        "text": "y = C * x"
      },
      {
        "label": "D",
        "text": "y = e^(x + C)^2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "dy/y = dx => ln y = x + ln C => y = Ce^x.",
    "explanationTamil": "dy/y = dx ஐத் தொகையிட y = C e^x கிடைக்கும்."
  },
  {
    "code": "MAT-240",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Linear Form in x",
    "difficulty": "medium",
    "questionText": "A first-order linear differential equation in x is of the form:",
    "questionTextTamil": "x இல் அமைந்த முதல் வரிசை நேரியல் வகைக்கெழுச் சமன்பாடு எந்த வடிவில் இருக்கும்?",
    "options": [
      {
        "label": "A",
        "text": "dx/dy + P(y)*x = Q(y)"
      },
      {
        "label": "B",
        "text": "dy/dx + P(x)*y = Q(x)"
      },
      {
        "label": "C",
        "text": "dx/dy + P(x)*y = 0"
      },
      {
        "label": "D",
        "text": "d^2x/dy^2 + x = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "dx/dy + P(y)*x = Q(y)"
      },
      {
        "label": "B",
        "text": "dy/dx + P(x)*y = Q(x)"
      },
      {
        "label": "C",
        "text": "dx/dy + P(x)*y = 0"
      },
      {
        "label": "D",
        "text": "d^2x/dy^2 + x = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "When x is the dependent variable, dx/dy + P(y)*x = Q(y) with I.F. = e^(integral P(y) dy).",
    "explanationTamil": "x சார்ந்த மாறியாக இருக்கும்போது dx/dy + P(y)*x = Q(y) வடிவில் அமையும்."
  },
  {
    "code": "MAT-241",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Particular Integral Concept",
    "difficulty": "medium",
    "questionText": "The complete solution of a non-homogeneous linear differential equation consists of:",
    "questionTextTamil": "சமபடித்தானதற்ற நேரியல் வகைக்கெழுச் சமன்பாட்டின் முழுமையான தீர்வு எவற்றைக் கொண்டிருக்கும்?",
    "options": [
      {
        "label": "A",
        "text": "Complementary Function (C.F.) + Particular Integral (P.I.)"
      },
      {
        "label": "B",
        "text": "C.F. only"
      },
      {
        "label": "C",
        "text": "P.I. only"
      },
      {
        "label": "D",
        "text": "C.F. * P.I."
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "துணைச் சார்பு (C.F.) + சிறப்புத் தொகை (P.I.)"
      },
      {
        "label": "B",
        "text": "C.F. மட்டுமே"
      },
      {
        "label": "C",
        "text": "P.I. மட்டுமே"
      },
      {
        "label": "D",
        "text": "C.F. * P.I."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Complete solution y = y_c + y_p (Complementary Function + Particular Integral).",
    "explanationTamil": "முழுத் தீர்வு y = C.F. + P.I. ஆகும்."
  },
  {
    "code": "MAT-242",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Harmonic Oscillator DE",
    "difficulty": "medium",
    "questionText": "The differential equation d^2y/dx^2 + omega^2 * y = 0 represents simple harmonic motion. Its general solution is:",
    "questionTextTamil": "தனி இசை இயக்கத்தைக் குறிக்கும் d^2y/dx^2 + omega^2 * y = 0 இன் பொதுத் தீர்வு:",
    "options": [
      {
        "label": "A",
        "text": "y = A cos(omega*x) + B sin(omega*x)"
      },
      {
        "label": "B",
        "text": "y = A e^(omega*x) + B e^(-omega*x)"
      },
      {
        "label": "C",
        "text": "y = A x + B"
      },
      {
        "label": "D",
        "text": "y = A cosh(omega*x)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "y = A cos(omega*x) + B sin(omega*x)"
      },
      {
        "label": "B",
        "text": "y = A e^(omega*x) + B e^(-omega*x)"
      },
      {
        "label": "C",
        "text": "y = A x + B"
      },
      {
        "label": "D",
        "text": "y = A cosh(omega*x)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Auxiliary equation m^2 + omega^2 = 0 gives m = +- i omega, leading to trigonometric solution.",
    "explanationTamil": "துணைச் சமன்பாடு m = +- i omega எனில் தீர்வு y = A cos(omega*x) + B sin(omega*x)."
  },
  {
    "code": "MAT-243",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Eliminating Arbitrary Constants",
    "difficulty": "easy",
    "questionText": "To eliminate two arbitrary constants from a relation, the resulting differential equation must be of order:",
    "questionTextTamil": "ஒரு சமன்பாட்டிலிருந்து இரண்டு தன்னிச்சை மாறிலிகளை நீக்கினால் கிடைக்கும் வகைக்கெழுச் சமன்பாட்டின் வரிசை:",
    "options": [
      {
        "label": "A",
        "text": "2"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "3"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "3"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The number of essential arbitrary constants equals the order of the resulting differential equation.",
    "explanationTamil": "தன்னிச்சை மாறிலிகளின் எண்ணிக்கை வகைக்கெழுச் சமன்பாட்டின் வரிசைக்கு சமமாகும் (இங்கு 2)."
  },
  {
    "code": "MAT-244",
    "subject": "Mathematics",
    "chapter": "Differential Equations",
    "topic": "Orthogonal Trajectories",
    "difficulty": "hard",
    "questionText": "To find the orthogonal trajectories of a family of curves, dy/dx is replaced by:",
    "questionTextTamil": "ஒரு குடும்ப வளைவரைகளின் செங்குத்து பாதை வளைவரைகளைக் காண dy/dx க்கு பதிலாக என்ன பிரதியிட வேண்டும்?",
    "options": [
      {
        "label": "A",
        "text": "-dx / dy"
      },
      {
        "label": "B",
        "text": "dx / dy"
      },
      {
        "label": "C",
        "text": "-dy / dx"
      },
      {
        "label": "D",
        "text": "1 / (dy/dx)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "-dx / dy"
      },
      {
        "label": "B",
        "text": "dx / dy"
      },
      {
        "label": "C",
        "text": "-dy / dx"
      },
      {
        "label": "D",
        "text": "1 / (dy/dx)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Since orthogonal curves have perpendicular tangents (m1 * m2 = -1), replace dy/dx with -1/(dy/dx) = -dx/dy.",
    "explanationTamil": "செங்குத்து வளைவரைகளின் சாய்வுகள் m1 * m2 = -1 என்பதால் dy/dx க்கு பதில் -dx/dy பிரதியிட வேண்டும்."
  },
  {
    "code": "MAT-245",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Subtangent Length",
    "difficulty": "medium",
    "questionText": "For the curve y = f(x), the length of the subtangent at any point is given by:",
    "questionTextTamil": "y = f(x) என்ற வளைவரைக்கு ஏதேனும் ஒரு புள்ளியில் துணைத் தொடுகோட்டின் நீளம்:",
    "options": [
      {
        "label": "A",
        "text": "|y / (dy/dx)|"
      },
      {
        "label": "B",
        "text": "|y * (dy/dx)|"
      },
      {
        "label": "C",
        "text": "|x / (dy/dx)|"
      },
      {
        "label": "D",
        "text": "|x * (dy/dx)|"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|y / (dy/dx)|"
      },
      {
        "label": "B",
        "text": "|y * (dy/dx)|"
      },
      {
        "label": "C",
        "text": "|x / (dy/dx)|"
      },
      {
        "label": "D",
        "text": "|x * (dy/dx)|"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Length of subtangent = |y / y'| = |y / m|.",
    "explanationTamil": "துணைத் தொடுகோட்டின் நீளம் = |y / (dy/dx)|."
  },
  {
    "code": "MAT-246",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Subnormal Length",
    "difficulty": "medium",
    "questionText": "For the curve y = f(x), the length of the subnormal at any point is given by:",
    "questionTextTamil": "y = f(x) என்ற வளைவரைக்கு ஏதேனும் ஒரு புள்ளியில் துணைச் செங்கோட்டின் நீளம்:",
    "options": [
      {
        "label": "A",
        "text": "|y * (dy/dx)|"
      },
      {
        "label": "B",
        "text": "|y / (dy/dx)|"
      },
      {
        "label": "C",
        "text": "|x * (dy/dx)|"
      },
      {
        "label": "D",
        "text": "|dy/dx|"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|y * (dy/dx)|"
      },
      {
        "label": "B",
        "text": "|y / (dy/dx)|"
      },
      {
        "label": "C",
        "text": "|x * (dy/dx)|"
      },
      {
        "label": "D",
        "text": "|dy/dx|"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Length of subnormal = |y * y'| = |y * m|.",
    "explanationTamil": "துணைச் செங்கோட்டின் நீளம் = |y * (dy/dx)|."
  },
  {
    "code": "MAT-247",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Angle Between Curves",
    "difficulty": "medium",
    "questionText": "If two curves intersect orthogonally (at right angles), the product of their slopes m1 * m2 at intersection point is:",
    "questionTextTamil": "இரு வளைவரைகள் செங்குத்தாக வெட்டிக்கொண்டால் வெட்டும் புள்ளியில் அவற்றின் சாய்வுகளின் பெருக்கற்பலன் m1 * m2:",
    "options": [
      {
        "label": "A",
        "text": "-1"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "0"
      },
      {
        "label": "D",
        "text": "infinity"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "-1"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "0"
      },
      {
        "label": "D",
        "text": "infinity"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Orthogonal intersection implies theta = 90°, so m1 * m2 = -1.",
    "explanationTamil": "செங்குத்து வெட்டுதலுக்கு m1 * m2 = -1 ஆகும்."
  },
  {
    "code": "MAT-248",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Concavity Test",
    "difficulty": "easy",
    "questionText": "A curve y = f(x) is concave upward on an interval if:",
    "questionTextTamil": "ஒரு வளைவரை y = f(x) மேல்நோக்கிய குழிவு உடையதாக இருக்க நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "f''(x) > 0"
      },
      {
        "label": "B",
        "text": "f''(x) < 0"
      },
      {
        "label": "C",
        "text": "f'(x) > 0"
      },
      {
        "label": "D",
        "text": "f'(x) < 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "f''(x) > 0"
      },
      {
        "label": "B",
        "text": "f''(x) < 0"
      },
      {
        "label": "C",
        "text": "f'(x) > 0"
      },
      {
        "label": "D",
        "text": "f'(x) < 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "f''(x) > 0 indicates that the slope is increasing, meaning the curve is concave upward.",
    "explanationTamil": "f''(x) > 0 எனில் வளைவரை மேல்நோக்கிய குழிவு உடையதாகும்."
  },
  {
    "code": "MAT-249",
    "subject": "Mathematics",
    "chapter": "Applications of Differential Calculus",
    "topic": "Asymptotes",
    "difficulty": "easy",
    "questionText": "A straight line towards which a curve approaches indefinitely as points tend to infinity is called an:",
    "questionTextTamil": "முடிவிலி தொலைவில் ஒரு வளைவரை எந்த நேர்க்கோட்டை நோக்கி எல்லையற்று நெருங்குகிறதோ அக்கோட்டின் பெயர்:",
    "options": [
      {
        "label": "A",
        "text": "Asymptote (தொலைத்தொடுகோடு)"
      },
      {
        "label": "B",
        "text": "Tangent"
      },
      {
        "label": "C",
        "text": "Normal"
      },
      {
        "label": "D",
        "text": "Directrix"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "தொலைத்தொடுகோடு (Asymptote)"
      },
      {
        "label": "B",
        "text": "தொடுகோடு"
      },
      {
        "label": "C",
        "text": "செங்கோடு"
      },
      {
        "label": "D",
        "text": "இயக்குவரை"
      }
    ],
    "correctAnswer": "A",
    "explanation": "An asymptote is a line that the curve gets arbitrarily close to as it moves towards infinity.",
    "explanationTamil": "முடிவிலியில் வளைவரை நெருங்கும் நேர்க்கோடு தொலைத்தொடுகோடாகும்."
  },
  {
    "code": "MAT-250",
    "subject": "Mathematics",
    "chapter": "Differentials and Partial Derivatives",
    "topic": "Total Differential",
    "difficulty": "medium",
    "questionText": "If z = f(x, y), the total differential dz is given by:",
    "questionTextTamil": "z = f(x, y) எனில் மொத்த வகையீடு dz என்பது:",
    "options": [
      {
        "label": "A",
        "text": "(dz/dx) dx + (dz/dy) dy"
      },
      {
        "label": "B",
        "text": "(dz/dx) dx - (dz/dy) dy"
      },
      {
        "label": "C",
        "text": "(dz/dx) dy + (dz/dy) dx"
      },
      {
        "label": "D",
        "text": "dx dy"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(dz/dx) dx + (dz/dy) dy"
      },
      {
        "label": "B",
        "text": "(dz/dx) dx - (dz/dy) dy"
      },
      {
        "label": "C",
        "text": "(dz/dx) dy + (dz/dy) dx"
      },
      {
        "label": "D",
        "text": "dx dy"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The total differential of a two-variable function is dz = (df/dx) dx + (df/dy) dy.",
    "explanationTamil": "மொத்த வகையீடு dz = (dz/dx) dx + (dz/dy) dy ஆகும்."
  },
  {
    "code": "MAT-251",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Arithmetic Progression nth Term",
    "difficulty": "easy",
    "questionText": "The nth term of an Arithmetic Progression (A.P.) with first term a and common difference d is:",
    "questionTextTamil": "முதல் உறுப்பு a மற்றும் பொது வித்தியாசம் d கொண்ட கூட்டுத் தொடரின் (A.P.) n-ஆவது உறுப்பு:",
    "options": [
      {
        "label": "A",
        "text": "a + (n - 1) * d"
      },
      {
        "label": "B",
        "text": "a + n * d"
      },
      {
        "label": "C",
        "text": "a * d^(n-1)"
      },
      {
        "label": "D",
        "text": "a + (n + 1) * d"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a + (n - 1) * d"
      },
      {
        "label": "B",
        "text": "a + n * d"
      },
      {
        "label": "C",
        "text": "a * d^(n-1)"
      },
      {
        "label": "D",
        "text": "a + (n + 1) * d"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard A.P. formula: T_n = a + (n - 1)d.",
    "explanationTamil": "A.P. இன் n-ஆவது உறுப்பு T_n = a + (n - 1)d."
  },
  {
    "code": "MAT-252",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Sum of First n Natural Numbers",
    "difficulty": "easy",
    "questionText": "The sum of the first n natural numbers 1 + 2 + 3 + ... + n is:",
    "questionTextTamil": "முதல் n இயல் எண்களின் கூடுதல் 1 + 2 + 3 + ... + n எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "n * (n + 1) / 2"
      },
      {
        "label": "B",
        "text": "n * (n - 1) / 2"
      },
      {
        "label": "C",
        "text": "(n * (n + 1) / 2)^2"
      },
      {
        "label": "D",
        "text": "n^2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "n * (n + 1) / 2"
      },
      {
        "label": "B",
        "text": "n * (n - 1) / 2"
      },
      {
        "label": "C",
        "text": "(n * (n + 1) / 2)^2"
      },
      {
        "label": "D",
        "text": "n^2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "sum_{k=1}^n k = n(n + 1)/2.",
    "explanationTamil": "முதல் n இயல் எண்களின் கூடுதல் n(n + 1)/2 ஆகும்."
  },
  {
    "code": "MAT-253",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Sum of Squares",
    "difficulty": "easy",
    "questionText": "The sum of squares of first n natural numbers 1^2 + 2^2 + ... + n^2 is:",
    "questionTextTamil": "முதல் n இயல் எண்களின் வர்க்கங்களின் கூடுதல் 1^2 + 2^2 + ... + n^2:",
    "options": [
      {
        "label": "A",
        "text": "n * (n + 1) * (2n + 1) / 6"
      },
      {
        "label": "B",
        "text": "n * (n + 1) / 2"
      },
      {
        "label": "C",
        "text": "(n * (n + 1) / 2)^2"
      },
      {
        "label": "D",
        "text": "n * (2n + 1) / 6"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "n * (n + 1) * (2n + 1) / 6"
      },
      {
        "label": "B",
        "text": "n * (n + 1) / 2"
      },
      {
        "label": "C",
        "text": "(n * (n + 1) / 2)^2"
      },
      {
        "label": "D",
        "text": "n * (2n + 1) / 6"
      }
    ],
    "correctAnswer": "A",
    "explanation": "sum k^2 = n(n + 1)(2n + 1)/6.",
    "explanationTamil": "வர்க்கங்களின் கூடுதல் n(n + 1)(2n + 1)/6 ஆகும்."
  },
  {
    "code": "MAT-254",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Sum of Cubes",
    "difficulty": "easy",
    "questionText": "The sum of cubes of first n natural numbers 1^3 + 2^3 + ... + n^3 is:",
    "questionTextTamil": "முதல் n இயல் எண்களின் கணங்களின் கூடுதல் 1^3 + 2^3 + ... + n^3:",
    "options": [
      {
        "label": "A",
        "text": "[n * (n + 1) / 2]^2"
      },
      {
        "label": "B",
        "text": "n^2 * (n + 1)^2 / 6"
      },
      {
        "label": "C",
        "text": "n * (n + 1) * (2n + 1) / 6"
      },
      {
        "label": "D",
        "text": "n^3"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "[n * (n + 1) / 2]^2"
      },
      {
        "label": "B",
        "text": "n^2 * (n + 1)^2 / 6"
      },
      {
        "label": "C",
        "text": "n * (n + 1) * (2n + 1) / 6"
      },
      {
        "label": "D",
        "text": "n^3"
      }
    ],
    "correctAnswer": "A",
    "explanation": "sum k^3 = [n(n + 1)/2]^2 = (sum k)^2.",
    "explanationTamil": "கணங்களின் கூடுதல் [n(n + 1)/2]^2 ஆகும்."
  },
  {
    "code": "MAT-255",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Geometric Progression Sum to Infinity",
    "difficulty": "easy",
    "questionText": "The sum to infinity of a geometric series a + ar + ar^2 + ... when |r| < 1 is:",
    "questionTextTamil": "|r| < 1 எனில் பெருக்குத் தொடரின் முடிவிலி வரை கூடுதல் a + ar + ar^2 + ...:",
    "options": [
      {
        "label": "A",
        "text": "a / (1 - r)"
      },
      {
        "label": "B",
        "text": "a / (1 + r)"
      },
      {
        "label": "C",
        "text": "a * (1 - r^n) / (1 - r)"
      },
      {
        "label": "D",
        "text": "a / r"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a / (1 - r)"
      },
      {
        "label": "B",
        "text": "a / (1 + r)"
      },
      {
        "label": "C",
        "text": "a * (1 - r^n) / (1 - r)"
      },
      {
        "label": "D",
        "text": "a / r"
      }
    ],
    "correctAnswer": "A",
    "explanation": "S_inf = a / (1 - r) when |r| < 1.",
    "explanationTamil": "S_inf = a / (1 - r) ஆகும்."
  },
  {
    "code": "MAT-256",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "AM GM Inequality",
    "difficulty": "medium",
    "questionText": "For any two distinct positive real numbers a and b, the relation between Arithmetic Mean (AM) and Geometric Mean (GM) is:",
    "questionTextTamil": "இரு வெவ்வேறு மிகை மெய் எண்கள் a மற்றும் b க்கு கூட்டுச் சராசரி (AM) மற்றும் பெருக்குச் சராசரி (GM) இடையேயான தொடர்பு:",
    "options": [
      {
        "label": "A",
        "text": "AM > GM"
      },
      {
        "label": "B",
        "text": "AM < GM"
      },
      {
        "label": "C",
        "text": "AM = GM"
      },
      {
        "label": "D",
        "text": "AM * GM = 1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "AM > GM"
      },
      {
        "label": "B",
        "text": "AM < GM"
      },
      {
        "label": "C",
        "text": "AM = GM"
      },
      {
        "label": "D",
        "text": "AM * GM = 1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "For distinct positive numbers, AM > GM strictly ((a + b)/2 > sqrt(ab)).",
    "explanationTamil": "வெவ்வேறு மிகை எண்களுக்கு எப்போதும் AM > GM ஆகும்."
  },
  {
    "code": "MAT-257",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Harmonic Mean",
    "difficulty": "medium",
    "questionText": "The Harmonic Mean (HM) between two positive numbers a and b is given by:",
    "questionTextTamil": "இரு மிகை எண்கள் a மற்றும் b க்கு இடையேயான இசைச் சராசரி (HM):",
    "options": [
      {
        "label": "A",
        "text": "2ab / (a + b)"
      },
      {
        "label": "B",
        "text": "(a + b) / 2"
      },
      {
        "label": "C",
        "text": "sqrt(ab)"
      },
      {
        "label": "D",
        "text": "(a + b) / (2ab)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2ab / (a + b)"
      },
      {
        "label": "B",
        "text": "(a + b) / 2"
      },
      {
        "label": "C",
        "text": "sqrt(ab)"
      },
      {
        "label": "D",
        "text": "(a + b) / (2ab)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "HM is the reciprocal of the arithmetic mean of reciprocals: HM = 2ab / (a + b).",
    "explanationTamil": "இசைச் சராசரி HM = 2ab / (a + b) ஆகும்."
  },
  {
    "code": "MAT-258",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Geometric Mean",
    "difficulty": "easy",
    "questionText": "The geometric mean of 4 and 16 is:",
    "questionTextTamil": "4 மற்றும் 16 ஆகிய எண்களின் பெருக்குச் சராசரி:",
    "options": [
      {
        "label": "A",
        "text": "8"
      },
      {
        "label": "B",
        "text": "10"
      },
      {
        "label": "C",
        "text": "12"
      },
      {
        "label": "D",
        "text": "6"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "8"
      },
      {
        "label": "B",
        "text": "10"
      },
      {
        "label": "C",
        "text": "12"
      },
      {
        "label": "D",
        "text": "6"
      }
    ],
    "correctAnswer": "A",
    "explanation": "GM = sqrt(4 * 16) = sqrt(64) = 8.",
    "explanationTamil": "GM = sqrt(4 * 16) = 8."
  },
  {
    "code": "MAT-259",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "Arithmetic Mean",
    "difficulty": "easy",
    "questionText": "The arithmetic mean of 12 and 28 is:",
    "questionTextTamil": "12 மற்றும் 28 ஆகிய எண்களின் கூட்டுச் சராசரி:",
    "options": [
      {
        "label": "A",
        "text": "20"
      },
      {
        "label": "B",
        "text": "22"
      },
      {
        "label": "C",
        "text": "18"
      },
      {
        "label": "D",
        "text": "24"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "20"
      },
      {
        "label": "B",
        "text": "22"
      },
      {
        "label": "C",
        "text": "18"
      },
      {
        "label": "D",
        "text": "24"
      }
    ],
    "correctAnswer": "A",
    "explanation": "AM = (12 + 28)/2 = 40/2 = 20.",
    "explanationTamil": "AM = (12 + 28)/2 = 20."
  },
  {
    "code": "MAT-260",
    "subject": "Mathematics",
    "chapter": "Sequences and Series",
    "topic": "AM GM HM Relation",
    "difficulty": "medium",
    "questionText": "The relation connecting AM, GM, and HM of two positive real numbers is:",
    "questionTextTamil": "இரு மிகை மெய் எண்களின் AM, GM மற்றும் HM ஆகியவற்றை இணைக்கும் தொடர்பு:",
    "options": [
      {
        "label": "A",
        "text": "GM^2 = AM * HM"
      },
      {
        "label": "B",
        "text": "AM^2 = GM * HM"
      },
      {
        "label": "C",
        "text": "HM^2 = AM * GM"
      },
      {
        "label": "D",
        "text": "AM + HM = 2*GM"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "GM^2 = AM * HM"
      },
      {
        "label": "B",
        "text": "AM^2 = GM * HM"
      },
      {
        "label": "C",
        "text": "HM^2 = AM * GM"
      },
      {
        "label": "D",
        "text": "AM + HM = 2*GM"
      }
    ],
    "correctAnswer": "A",
    "explanation": "GM is the geometric mean of AM and HM: GM^2 = AM * HM.",
    "explanationTamil": "GM^2 = AM * HM ஆகும்."
  },
  {
    "code": "MAT-261",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Fundamental Principle of Counting",
    "difficulty": "easy",
    "questionText": "If an event can occur in m ways and following it, another event can occur in n ways, the total number of ways both can occur in order is:",
    "questionTextTamil": "ஒரு செயல் m வழிகளிலும், தொடர்ந்து மற்றொரு செயல் n வழிகளிலும் நிகழுமானால், இரண்டும் தொடர்ச்சியாக நிகழும் மொத்த வழிகள்:",
    "options": [
      {
        "label": "A",
        "text": "m * n"
      },
      {
        "label": "B",
        "text": "m + n"
      },
      {
        "label": "C",
        "text": "m^n"
      },
      {
        "label": "D",
        "text": "n^m"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "m * n"
      },
      {
        "label": "B",
        "text": "m + n"
      },
      {
        "label": "C",
        "text": "m^n"
      },
      {
        "label": "D",
        "text": "n^m"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Fundamental counting principle (multiplication rule): m * n ways.",
    "explanationTamil": "எண்ணுதலின் அடிப்படைக் கொள்கைப்படி m * n வழிகள்."
  },
  {
    "code": "MAT-262",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Relation between nPr and nCr",
    "difficulty": "easy",
    "questionText": "The relationship between permutations nPr and combinations nCr is:",
    "questionTextTamil": "nPr மற்றும் nCr இடையேயான தொடர்பு:",
    "options": [
      {
        "label": "A",
        "text": "nPr = r! * nCr"
      },
      {
        "label": "B",
        "text": "nCr = r! * nPr"
      },
      {
        "label": "C",
        "text": "nPr = nCr / r!"
      },
      {
        "label": "D",
        "text": "nPr = n! * nCr"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "nPr = r! * nCr"
      },
      {
        "label": "B",
        "text": "nCr = r! * nPr"
      },
      {
        "label": "C",
        "text": "nPr = nCr / r!"
      },
      {
        "label": "D",
        "text": "nPr = n! * nCr"
      }
    ],
    "correctAnswer": "A",
    "explanation": "nPr = n! / (n - r)! = r! * [n! / (r! (n - r)!)] = r! * nCr.",
    "explanationTamil": "nPr = r! * nCr ஆகும்."
  },
  {
    "code": "MAT-263",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Circular Permutations",
    "difficulty": "easy",
    "questionText": "The number of ways of arranging n distinct persons around a circular table is:",
    "questionTextTamil": "n நபர்களை ஒரு வட்ட மேசையைச் சுற்றி அமர வைக்கும் வழிகளின் எண்ணிக்கை:",
    "options": [
      {
        "label": "A",
        "text": "(n - 1)!"
      },
      {
        "label": "B",
        "text": "n!"
      },
      {
        "label": "C",
        "text": "(n + 1)!"
      },
      {
        "label": "D",
        "text": "n! / 2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(n - 1)!"
      },
      {
        "label": "B",
        "text": "n!"
      },
      {
        "label": "C",
        "text": "(n + 1)!"
      },
      {
        "label": "D",
        "text": "n! / 2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Fixing one position to eliminate rotational symmetry gives (n - 1)! circular permutations.",
    "explanationTamil": "சுழற்சி சமச்சீரை நீக்க ஒருவரை நிலைநிறுத்த (n - 1)! வழிகள் கிடைக்கும்."
  },
  {
    "code": "MAT-264",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Necklace Arrangement",
    "difficulty": "medium",
    "questionText": "The number of circular arrangements of n distinct beads in a necklace where clockwise and anticlockwise orderings are identical is:",
    "questionTextTamil": "கடிகார சுற்று மற்றும் எதிரச்சுற்று வேறுபாடற்ற நிலையில் n மணிகளைக் கொண்டு மாலை உருவாக்கும் வழிகள்:",
    "options": [
      {
        "label": "A",
        "text": "(n - 1)! / 2"
      },
      {
        "label": "B",
        "text": "(n - 1)!"
      },
      {
        "label": "C",
        "text": "n! / 2"
      },
      {
        "label": "D",
        "text": "n!"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(n - 1)! / 2"
      },
      {
        "label": "B",
        "text": "(n - 1)!"
      },
      {
        "label": "C",
        "text": "n! / 2"
      },
      {
        "label": "D",
        "text": "n!"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Since flipping the necklace is indistinguishable, the number of ways is (n - 1)! / 2.",
    "explanationTamil": "மாலைகளைத் திருப்பிப் போட முடிவதால் வழிகளின் எண்ணிக்கை (n - 1)! / 2."
  },
  {
    "code": "MAT-265",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Complementary Combinations",
    "difficulty": "easy",
    "questionText": "For any n and r with 0 <= r <= n, nCr is equal to:",
    "questionTextTamil": "0 <= r <= n எனில் nCr எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "nC(n - r)"
      },
      {
        "label": "B",
        "text": "nC(r - 1)"
      },
      {
        "label": "C",
        "text": "(n - 1)Cr"
      },
      {
        "label": "D",
        "text": "nC(r + 1)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "nC(n - r)"
      },
      {
        "label": "B",
        "text": "nC(r - 1)"
      },
      {
        "label": "C",
        "text": "(n - 1)Cr"
      },
      {
        "label": "D",
        "text": "nC(r + 1)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Selecting r objects is equivalent to leaving behind (n - r) objects: nCr = nC(n - r).",
    "explanationTamil": "தேர்வு செய்தலின் சமச்சீர் பண்பு nCr = nC(n - r)."
  },
  {
    "code": "MAT-266",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Pascal's Rule",
    "difficulty": "easy",
    "questionText": "Pascal's identity states that nCr + nC(r - 1) equals:",
    "questionTextTamil": "பாஸ்கலின் விதிப்படி nCr + nC(r - 1) எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "(n + 1)Cr"
      },
      {
        "label": "B",
        "text": "(n + 1)C(r - 1)"
      },
      {
        "label": "C",
        "text": "nC(r + 1)"
      },
      {
        "label": "D",
        "text": "(n - 1)Cr"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(n + 1)Cr"
      },
      {
        "label": "B",
        "text": "(n + 1)C(r - 1)"
      },
      {
        "label": "C",
        "text": "nC(r + 1)"
      },
      {
        "label": "D",
        "text": "(n - 1)Cr"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Pascal's recurrence identity: nCr + nC(r - 1) = (n + 1)Cr.",
    "explanationTamil": "பாஸ்கலின் கூட்டல் விதிப்படி (n + 1)Cr ஆகும்."
  },
  {
    "code": "MAT-267",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Permutations of Non-Distinct Objects",
    "difficulty": "medium",
    "questionText": "The number of permutations of n objects where p are of one kind, q of another kind, and r of a third kind is:",
    "questionTextTamil": "n பொருட்களில் p பொருட்கள் ஒரு வகையாகவும், q பொருட்கள் இரண்டாம் வகையாகவும், r பொருட்கள் மூன்றாம் வகையாகவும் அமைந்தால் வரிசைமாற்றங்களின் எண்ணிக்கை:",
    "options": [
      {
        "label": "A",
        "text": "n! / (p! * q! * r!)"
      },
      {
        "label": "B",
        "text": "n! * p! * q! * r!"
      },
      {
        "label": "C",
        "text": "n! / (p + q + r)!"
      },
      {
        "label": "D",
        "text": "(p! * q! * r!) / n!"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "n! / (p! * q! * r!)"
      },
      {
        "label": "B",
        "text": "n! * p! * q! * r!"
      },
      {
        "label": "C",
        "text": "n! / (p + q + r)!"
      },
      {
        "label": "D",
        "text": "(p! * q! * r!) / n!"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Multinomial permutations formula: n! / (p! * q! * r!).",
    "explanationTamil": "பல்வேறு வகை பொருட்கள் உள்ளபோது வரிசைமாற்றங்கள் n! / (p! q! r!)."
  },
  {
    "code": "MAT-268",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Zero Factorial",
    "difficulty": "easy",
    "questionText": "By mathematical convention and gamma function definition, 0! is equal to:",
    "questionTextTamil": "கணித மரபுப்படி 0! இன் மதிப்பு:",
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
        "text": "1"
      },
      {
        "label": "B",
        "text": "0"
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
    "explanation": "0! = 1 by definition, satisfying n! = n * (n - 1)! for n = 1.",
    "explanationTamil": "வரையறைப்படி 0! = 1 ஆகும்."
  },
  {
    "code": "MAT-269",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Handshake Problem",
    "difficulty": "easy",
    "questionText": "In a room of 10 people, if everyone shakes hands with everyone else exactly once, the total number of handshakes is:",
    "questionTextTamil": "10 பேர் உள்ள ஒரு அறையில் ஒவ்வொருவரும் மற்றவருடன் ஒருமுறை கைக்குலுக்கினால் மொத்த கைக்குலுக்கல்களின் எண்ணிக்கை:",
    "options": [
      {
        "label": "A",
        "text": "45"
      },
      {
        "label": "B",
        "text": "90"
      },
      {
        "label": "C",
        "text": "100"
      },
      {
        "label": "D",
        "text": "50"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "45"
      },
      {
        "label": "B",
        "text": "90"
      },
      {
        "label": "C",
        "text": "100"
      },
      {
        "label": "D",
        "text": "50"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Number of pairs = 10C2 = (10 * 9) / 2 = 45.",
    "explanationTamil": "மொத்த ஜோடிகள் 10C2 = (10 * 9)/2 = 45."
  },
  {
    "code": "MAT-270",
    "subject": "Mathematics",
    "chapter": "Permutations and Combinations",
    "topic": "Diagonal of Polygon",
    "difficulty": "medium",
    "questionText": "The number of diagonals in a polygon of n sides is given by:",
    "questionTextTamil": "n பக்கங்கள் கொண்ட பலகோணத்தின் மூலைவிட்டங்களின் எண்ணிக்கை:",
    "options": [
      {
        "label": "A",
        "text": "n * (n - 3) / 2"
      },
      {
        "label": "B",
        "text": "n * (n - 1) / 2"
      },
      {
        "label": "C",
        "text": "n * (n + 1) / 2"
      },
      {
        "label": "D",
        "text": "n * (n - 2) / 2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "n * (n - 3) / 2"
      },
      {
        "label": "B",
        "text": "n * (n - 1) / 2"
      },
      {
        "label": "C",
        "text": "n * (n + 1) / 2"
      },
      {
        "label": "D",
        "text": "n * (n - 2) / 2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "nC2 - n = n(n - 1)/2 - n = n(n - 3)/2.",
    "explanationTamil": "மூலைவிட்டங்களின் எண்ணிக்கை = nC2 - n = n(n - 3)/2."
  },
  {
    "code": "MAT-271",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Total Number of Terms",
    "difficulty": "easy",
    "questionText": "The total number of terms in the binomial expansion of (x + a)^n (for positive integer n) is:",
    "questionTextTamil": "மிகை முழு எண் n க்கு (x + a)^n இன் ஈருறுப்பு விரிவில் உள்ள மொத்த உறுப்புகளின் எண்ணிக்கை:",
    "options": [
      {
        "label": "A",
        "text": "n + 1"
      },
      {
        "label": "B",
        "text": "n"
      },
      {
        "label": "C",
        "text": "n - 1"
      },
      {
        "label": "D",
        "text": "2n"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "n + 1"
      },
      {
        "label": "B",
        "text": "n"
      },
      {
        "label": "C",
        "text": "n - 1"
      },
      {
        "label": "D",
        "text": "2n"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The expansion contains terms from r = 0 to n, giving (n + 1) terms.",
    "explanationTamil": "r = 0 முதல் n வரை உறுப்புகள் அமைவதால் மொத்த உறுப்புகள் n + 1 ஆகும்."
  },
  {
    "code": "MAT-272",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "General Term",
    "difficulty": "easy",
    "questionText": "The general term T_(r+1) in the expansion of (a + b)^n is:",
    "questionTextTamil": "(a + b)^n இன் விரிவில் பொது உறுப்பு T_(r+1):",
    "options": [
      {
        "label": "A",
        "text": "nCr * a^(n - r) * b^r"
      },
      {
        "label": "B",
        "text": "nCr * a^r * b^(n - r)"
      },
      {
        "label": "C",
        "text": "nC(r+1) * a^(n - r) * b^r"
      },
      {
        "label": "D",
        "text": "nCr * (ab)^r"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "nCr * a^(n - r) * b^r"
      },
      {
        "label": "B",
        "text": "nCr * a^r * b^(n - r)"
      },
      {
        "label": "C",
        "text": "nC(r+1) * a^(n - r) * b^r"
      },
      {
        "label": "D",
        "text": "nCr * (ab)^r"
      }
    ],
    "correctAnswer": "A",
    "explanation": "General term formula: T_(r+1) = nCr * a^(n-r) * b^r.",
    "explanationTamil": "பொது உறுப்பு T_(r+1) = nCr * a^(n-r) * b^r."
  },
  {
    "code": "MAT-273",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Sum of Binomial Coefficients",
    "difficulty": "easy",
    "questionText": "The sum of all binomial coefficients nC0 + nC1 + nC2 + ... + nCn is:",
    "questionTextTamil": "ஈருறுப்புக் கெழுக்களின் கூடுதல் nC0 + nC1 + nC2 + ... + nCn எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "2^n"
      },
      {
        "label": "B",
        "text": "2^(n - 1)"
      },
      {
        "label": "C",
        "text": "n^2"
      },
      {
        "label": "D",
        "text": "2n"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2^n"
      },
      {
        "label": "B",
        "text": "2^(n - 1)"
      },
      {
        "label": "C",
        "text": "n^2"
      },
      {
        "label": "D",
        "text": "2n"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Putting x = 1 in (1 + x)^n gives 2^n = sum nCr.",
    "explanationTamil": "(1 + x)^n இல் x = 1 எனப் பிரதியிட கெழுக்களின் கூடுதல் 2^n கிடைக்கும்."
  },
  {
    "code": "MAT-274",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Sum of Odd/Even Coefficients",
    "difficulty": "medium",
    "questionText": "The sum of coefficients of odd terms nC1 + nC3 + nC5 + ... equals:",
    "questionTextTamil": "ஒற்றைப்படை உறுப்புகளின் கெழுக்களின் கூடுதல் nC1 + nC3 + nC5 + ...:",
    "options": [
      {
        "label": "A",
        "text": "2^(n - 1)"
      },
      {
        "label": "B",
        "text": "2^n"
      },
      {
        "label": "C",
        "text": "2^(n + 1)"
      },
      {
        "label": "D",
        "text": "n!"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2^(n - 1)"
      },
      {
        "label": "B",
        "text": "2^n"
      },
      {
        "label": "C",
        "text": "2^(n + 1)"
      },
      {
        "label": "D",
        "text": "n!"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The odd and even coefficient sums are equal, each being 2^n / 2 = 2^(n-1).",
    "explanationTamil": "ஒற்றைப்படை மற்றும் இரட்டைப்படை கெழுக்களின் கூடுதல் தலா 2^(n - 1) ஆகும்."
  },
  {
    "code": "MAT-275",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Middle Term Even n",
    "difficulty": "medium",
    "questionText": "In the expansion of (x + a)^n where n is an even integer, the number of middle terms is:",
    "questionTextTamil": "n இரட்டைப்படை முழு எண் எனில் (x + a)^n இன் விரிவில் உள்ள நடு உறுப்புகளின் எண்ணிக்கை:",
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
        "text": "0"
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
        "text": "0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "When n is even, total terms = n + 1 (odd), so there is exactly 1 middle term at (n/2 + 1).",
    "explanationTamil": "n இரட்டைப்படை எனில் மொத்த உறுப்புகள் ஒற்றைப்படை, எனவே ஒரேயொரு நடு உறுப்பு அமையும்."
  },
  {
    "code": "MAT-276",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Middle Terms Odd n",
    "difficulty": "medium",
    "questionText": "In the expansion of (x + a)^n where n is an odd integer, the number of middle terms is:",
    "questionTextTamil": "n ஒற்றைப்படை முழு எண் எனில் (x + a)^n இன் விரிவில் உள்ள நடு உறுப்புகளின் எண்ணிக்கை:",
    "options": [
      {
        "label": "A",
        "text": "2"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "3"
      },
      {
        "label": "D",
        "text": "n"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "3"
      },
      {
        "label": "D",
        "text": "n"
      }
    ],
    "correctAnswer": "A",
    "explanation": "When n is odd, total terms = n + 1 (even), so there are 2 middle terms at (n+1)/2 and (n+3)/2.",
    "explanationTamil": "n ஒற்றைப்படை எனில் மொத்த உறுப்புகள் இரட்டைப்படை, எனவே 2 நடு உறுப்புகள் அமையும்."
  },
  {
    "code": "MAT-277",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Term Independent of x",
    "difficulty": "medium",
    "questionText": "In the expansion of (x + 1/x)^10, the term independent of x is:",
    "questionTextTamil": "(x + 1/x)^10 இன் விரிவில் x சாராத உறுப்பு:",
    "options": [
      {
        "label": "A",
        "text": "10C5"
      },
      {
        "label": "B",
        "text": "10C4"
      },
      {
        "label": "C",
        "text": "10C6"
      },
      {
        "label": "D",
        "text": "1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "10C5"
      },
      {
        "label": "B",
        "text": "10C4"
      },
      {
        "label": "C",
        "text": "10C6"
      },
      {
        "label": "D",
        "text": "1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "T_(r+1) = 10Cr * x^(10-r) * (1/x)^r = 10Cr * x^(10 - 2r). For independent of x, 10 - 2r = 0 => r = 5. Term is 10C5.",
    "explanationTamil": "x இன் அடுக்கு 10 - 2r = 0 => r = 5, எனவே x சாராத உறுப்பு 10C5."
  },
  {
    "code": "MAT-278",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Approximation Formula",
    "difficulty": "easy",
    "questionText": "For |x| << 1, (1 + x)^n is approximately equal to:",
    "questionTextTamil": "|x| << 1 எனில் (1 + x)^n இன் தோராய மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "1 + n*x"
      },
      {
        "label": "B",
        "text": "1 - n*x"
      },
      {
        "label": "C",
        "text": "n + x"
      },
      {
        "label": "D",
        "text": "1 + x^n"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "1 + n*x"
      },
      {
        "label": "B",
        "text": "1 - n*x"
      },
      {
        "label": "C",
        "text": "n + x"
      },
      {
        "label": "D",
        "text": "1 + x^n"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Linear approximation from binomial expansion ignoring higher order terms: (1 + x)^n approx 1 + nx.",
    "explanationTamil": "உயர் அடுக்குகளை புறக்கணிக்க (1 + x)^n approx 1 + nx ஆகும்."
  },
  {
    "code": "MAT-279",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Greatest Coefficient",
    "difficulty": "medium",
    "questionText": "In the expansion of (1 + x)^2n, the greatest binomial coefficient is:",
    "questionTextTamil": "(1 + x)^2n இன் விரிவில் மிகப்பெரிய ஈருறுப்புக் கெழு:",
    "options": [
      {
        "label": "A",
        "text": "2nCn"
      },
      {
        "label": "B",
        "text": "2nC(n-1)"
      },
      {
        "label": "C",
        "text": "2nC(n+1)"
      },
      {
        "label": "D",
        "text": "2^n"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2nCn"
      },
      {
        "label": "B",
        "text": "2nC(n-1)"
      },
      {
        "label": "C",
        "text": "2nC(n+1)"
      },
      {
        "label": "D",
        "text": "2^n"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Binomial coefficients peak at the center: 2nCn is the maximum coefficient.",
    "explanationTamil": "ஈருறுப்புக் கெழுக்களின் நடு உறுப்பு 2nCn மிகப்பெரியதாகும்."
  },
  {
    "code": "MAT-280",
    "subject": "Mathematics",
    "chapter": "Binomial Theorem",
    "topic": "Infinite Binomial Series Condition",
    "difficulty": "medium",
    "questionText": "The binomial series 1 + n*x + [n(n-1)/2!] * x^2 + ... is convergent if and only if:",
    "questionTextTamil": "முடிவிலி ஈருறுப்புத் தொடர் ஒருங்கும் தொடராக அமைய தேவையானதும் போதுமானதுமான நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "|x| < 1"
      },
      {
        "label": "B",
        "text": "|x| <= 1"
      },
      {
        "label": "C",
        "text": "|x| > 1"
      },
      {
        "label": "D",
        "text": "x > 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|x| < 1"
      },
      {
        "label": "B",
        "text": "|x| <= 1"
      },
      {
        "label": "C",
        "text": "|x| > 1"
      },
      {
        "label": "D",
        "text": "x > 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The binomial series for rational/negative index converges absolutely for |x| < 1.",
    "explanationTamil": "|x| < 1 எனும்போது மட்டுமே முடிவிலி ஈருறுப்புத் தொடர் ஒருங்கும்."
  },
  {
    "code": "MAT-281",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Law of Sines",
    "difficulty": "easy",
    "questionText": "In any triangle ABC with circumradius R, the Sine rule states:",
    "questionTextTamil": "ABC முக்கோணத்தில் சுற்றுவட்ட ஆரம் R எனில் சைன் விதி கூறுவது:",
    "options": [
      {
        "label": "A",
        "text": "a / sin(A) = b / sin(B) = c / sin(C) = 2R"
      },
      {
        "label": "B",
        "text": "a / sin(A) = R"
      },
      {
        "label": "C",
        "text": "a * sin(A) = b * sin(B)"
      },
      {
        "label": "D",
        "text": "sin(A) / a = 2R"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a / sin(A) = b / sin(B) = c / sin(C) = 2R"
      },
      {
        "label": "B",
        "text": "a / sin(A) = R"
      },
      {
        "label": "C",
        "text": "a * sin(A) = b * sin(B)"
      },
      {
        "label": "D",
        "text": "sin(A) / a = 2R"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Sine rule: a/sin A = b/sin B = c/sin C = 2R.",
    "explanationTamil": "சைன் விதி: a/sin A = b/sin B = c/sin C = 2R."
  },
  {
    "code": "MAT-282",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Law of Cosines",
    "difficulty": "easy",
    "questionText": "In triangle ABC, the Cosine rule for cos(A) is:",
    "questionTextTamil": "முக்கோணம் ABC இல் cos(A) க்கான கொசைன் விதி:",
    "options": [
      {
        "label": "A",
        "text": "(b^2 + c^2 - a^2) / (2bc)"
      },
      {
        "label": "B",
        "text": "(a^2 + b^2 - c^2) / (2ab)"
      },
      {
        "label": "C",
        "text": "(b^2 + c^2 + a^2) / (2bc)"
      },
      {
        "label": "D",
        "text": "(b + c - a) / (2bc)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(b^2 + c^2 - a^2) / (2bc)"
      },
      {
        "label": "B",
        "text": "(a^2 + b^2 - c^2) / (2ab)"
      },
      {
        "label": "C",
        "text": "(b^2 + c^2 + a^2) / (2bc)"
      },
      {
        "label": "D",
        "text": "(b + c - a) / (2bc)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "cos A = (b^2 + c^2 - a^2) / (2bc).",
    "explanationTamil": "கொசைன் விதி: cos A = (b^2 + c^2 - a^2) / (2bc)."
  },
  {
    "code": "MAT-283",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Projection Formula",
    "difficulty": "medium",
    "questionText": "In any triangle ABC, the projection formula for side a is:",
    "questionTextTamil": "முக்கோணம் ABC இல் பக்கம் a க்கான வீழல் சூத்திரம்:",
    "options": [
      {
        "label": "A",
        "text": "a = b * cos(C) + c * cos(B)"
      },
      {
        "label": "B",
        "text": "a = b * sin(C) + c * sin(B)"
      },
      {
        "label": "C",
        "text": "a = b * cos(B) + c * cos(C)"
      },
      {
        "label": "D",
        "text": "a = (b + c) * cos(A)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a = b * cos(C) + c * cos(B)"
      },
      {
        "label": "B",
        "text": "a = b * sin(C) + c * sin(B)"
      },
      {
        "label": "C",
        "text": "a = b * cos(B) + c * cos(C)"
      },
      {
        "label": "D",
        "text": "a = (b + c) * cos(A)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Projection formula: a = b cos C + c cos B.",
    "explanationTamil": "வீழல் சூத்திரம்: a = b cos C + c cos B."
  },
  {
    "code": "MAT-284",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Area of Triangle using Sine",
    "difficulty": "easy",
    "questionText": "The area Delta of a triangle ABC with sides a, b and included angle C is:",
    "questionTextTamil": "பக்கங்கள் a, b மற்றும் அவற்றிற்கு இடைப்பட்ட கோணம் C கொண்ட முக்கோணத்தின் பரப்பளவு Delta:",
    "options": [
      {
        "label": "A",
        "text": "(1/2) * a * b * sin(C)"
      },
      {
        "label": "B",
        "text": "a * b * sin(C)"
      },
      {
        "label": "C",
        "text": "(1/2) * a * b * cos(C)"
      },
      {
        "label": "D",
        "text": "(1/2) * a * b"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(1/2) * a * b * sin(C)"
      },
      {
        "label": "B",
        "text": "a * b * sin(C)"
      },
      {
        "label": "C",
        "text": "(1/2) * a * b * cos(C)"
      },
      {
        "label": "D",
        "text": "(1/2) * a * b"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Area Delta = (1/2) ab sin C.",
    "explanationTamil": "முக்கோண பரப்பளவு Delta = (1/2) ab sin C."
  },
  {
    "code": "MAT-285",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Heron's Formula",
    "difficulty": "easy",
    "questionText": "Heron's formula for the area of triangle with semi-perimeter s is:",
    "questionTextTamil": "அரைச் சுற்றளவு s கொண்ட முக்கோணத்தின் பரப்பளவுக்கான ஹீரோனின் சூத்திரம்:",
    "options": [
      {
        "label": "A",
        "text": "sqrt(s * (s - a) * (s - b) * (s - c))"
      },
      {
        "label": "B",
        "text": "s * (s - a) * (s - b) * (s - c)"
      },
      {
        "label": "C",
        "text": "sqrt((s - a)(s - b)(s - c))"
      },
      {
        "label": "D",
        "text": "(s - a)(s - b)(s - c) / s"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "sqrt(s * (s - a) * (s - b) * (s - c))"
      },
      {
        "label": "B",
        "text": "s * (s - a) * (s - b) * (s - c)"
      },
      {
        "label": "C",
        "text": "sqrt((s - a)(s - b)(s - c))"
      },
      {
        "label": "D",
        "text": "(s - a)(s - b)(s - c) / s"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Heron's formula: Delta = sqrt(s(s - a)(s - b)(s - c)).",
    "explanationTamil": "ஹீரோனின் சூத்திரம்: Delta = sqrt(s(s - a)(s - b)(s - c))."
  },
  {
    "code": "MAT-286",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Inradius Formula",
    "difficulty": "medium",
    "questionText": "The inradius r of a triangle with area Delta and semi-perimeter s is:",
    "questionTextTamil": "பரப்பளவு Delta மற்றும் அரைச்சுற்றளவு s கொண்ட முக்கோணத்தின் உள்வட்ட ஆரம் r:",
    "options": [
      {
        "label": "A",
        "text": "Delta / s"
      },
      {
        "label": "B",
        "text": "s / Delta"
      },
      {
        "label": "C",
        "text": "Delta * s"
      },
      {
        "label": "D",
        "text": "2 * Delta / s"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "Delta / s"
      },
      {
        "label": "B",
        "text": "s / Delta"
      },
      {
        "label": "C",
        "text": "Delta * s"
      },
      {
        "label": "D",
        "text": "2 * Delta / s"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Inradius formula: r = Delta / s.",
    "explanationTamil": "உள்வட்ட ஆரம் r = Delta / s."
  },
  {
    "code": "MAT-287",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Circumradius Formula",
    "difficulty": "medium",
    "questionText": "The circumradius R of a triangle with sides a, b, c and area Delta is:",
    "questionTextTamil": "பக்கங்கள் a, b, c மற்றும் பரப்பு Delta கொண்ட முக்கோணத்தின் சுற்றுவட்ட ஆரம் R:",
    "options": [
      {
        "label": "A",
        "text": "abc / (4 * Delta)"
      },
      {
        "label": "B",
        "text": "abc / (2 * Delta)"
      },
      {
        "label": "C",
        "text": "4 * Delta / abc"
      },
      {
        "label": "D",
        "text": "Delta / (abc)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "abc / (4 * Delta)"
      },
      {
        "label": "B",
        "text": "abc / (2 * Delta)"
      },
      {
        "label": "C",
        "text": "4 * Delta / abc"
      },
      {
        "label": "D",
        "text": "Delta / (abc)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Circumradius formula: R = abc / (4*Delta).",
    "explanationTamil": "சுற்றுவட்ட ஆரம் R = abc / (4*Delta)."
  },
  {
    "code": "MAT-288",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Double Angle Formula for Sine",
    "difficulty": "easy",
    "questionText": "sin(2*theta) in terms of sin(theta) and cos(theta) is:",
    "questionTextTamil": "sin(2*theta) இன் முக்கோணவியல் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "2 * sin(theta) * cos(theta)"
      },
      {
        "label": "B",
        "text": "cos^2(theta) - sin^2(theta)"
      },
      {
        "label": "C",
        "text": "2 * sin^2(theta)"
      },
      {
        "label": "D",
        "text": "sin(theta) * cos(theta)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2 * sin(theta) * cos(theta)"
      },
      {
        "label": "B",
        "text": "cos^2(theta) - sin^2(theta)"
      },
      {
        "label": "C",
        "text": "2 * sin^2(theta)"
      },
      {
        "label": "D",
        "text": "sin(theta) * cos(theta)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "sin(2 theta) = 2 sin theta cos theta.",
    "explanationTamil": "sin(2 theta) = 2 sin theta cos theta."
  },
  {
    "code": "MAT-289",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Double Angle Formula for Cosine",
    "difficulty": "easy",
    "questionText": "cos(2*theta) is identically equal to:",
    "questionTextTamil": "cos(2*theta) எதற்கு முற்றொருமையாக சமம்?",
    "options": [
      {
        "label": "A",
        "text": "cos^2(theta) - sin^2(theta)"
      },
      {
        "label": "B",
        "text": "2 * cos^2(theta) + 1"
      },
      {
        "label": "C",
        "text": "sin^2(theta) - cos^2(theta)"
      },
      {
        "label": "D",
        "text": "2 * sin(theta) * cos(theta)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "cos^2(theta) - sin^2(theta)"
      },
      {
        "label": "B",
        "text": "2 * cos^2(theta) + 1"
      },
      {
        "label": "C",
        "text": "sin^2(theta) - cos^2(theta)"
      },
      {
        "label": "D",
        "text": "2 * sin(theta) * cos(theta)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "cos(2 theta) = cos^2 theta - sin^2 theta = 2 cos^2 theta - 1 = 1 - 2 sin^2 theta.",
    "explanationTamil": "cos(2 theta) = cos^2 theta - sin^2 theta."
  },
  {
    "code": "MAT-290",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "tan(2 theta)",
    "difficulty": "easy",
    "questionText": "tan(2*theta) expressed in terms of tan(theta) is:",
    "questionTextTamil": "tan(theta) இல் tan(2*theta) இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "2 * tan(theta) / (1 - tan^2(theta))"
      },
      {
        "label": "B",
        "text": "2 * tan(theta) / (1 + tan^2(theta))"
      },
      {
        "label": "C",
        "text": "(1 - tan^2(theta)) / (1 + tan^2(theta))"
      },
      {
        "label": "D",
        "text": "tan^2(theta) - 1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2 * tan(theta) / (1 - tan^2(theta))"
      },
      {
        "label": "B",
        "text": "2 * tan(theta) / (1 + tan^2(theta))"
      },
      {
        "label": "C",
        "text": "(1 - tan^2(theta)) / (1 + tan^2(theta))"
      },
      {
        "label": "D",
        "text": "tan^2(theta) - 1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "tan(2 theta) = 2 tan theta / (1 - tan^2 theta).",
    "explanationTamil": "tan(2 theta) = 2 tan theta / (1 - tan^2 theta)."
  },
  {
    "code": "MAT-291",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Product to Sum Formula",
    "difficulty": "medium",
    "questionText": "2 * sin(A) * cos(B) is equal to:",
    "questionTextTamil": "2 * sin(A) * cos(B) இன் கூடுதல் சூத்திரம்:",
    "options": [
      {
        "label": "A",
        "text": "sin(A + B) + sin(A - B)"
      },
      {
        "label": "B",
        "text": "sin(A + B) - sin(A - B)"
      },
      {
        "label": "C",
        "text": "cos(A + B) + cos(A - B)"
      },
      {
        "label": "D",
        "text": "cos(A - B) - cos(A + B)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "sin(A + B) + sin(A - B)"
      },
      {
        "label": "B",
        "text": "sin(A + B) - sin(A - B)"
      },
      {
        "label": "C",
        "text": "cos(A + B) + cos(A - B)"
      },
      {
        "label": "D",
        "text": "cos(A - B) - cos(A + B)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "2 sin A cos B = sin(A + B) + sin(A - B).",
    "explanationTamil": "2 sin A cos B = sin(A + B) + sin(A - B)."
  },
  {
    "code": "MAT-292",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Sum of Sines",
    "difficulty": "medium",
    "questionText": "sin(C) + sin(D) is equal to:",
    "questionTextTamil": "sin(C) + sin(D) இன் பெருக்கல் சூத்திரம்:",
    "options": [
      {
        "label": "A",
        "text": "2 * sin((C + D)/2) * cos((C - D)/2)"
      },
      {
        "label": "B",
        "text": "2 * cos((C + D)/2) * sin((C - D)/2)"
      },
      {
        "label": "C",
        "text": "2 * cos((C + D)/2) * cos((C - D)/2)"
      },
      {
        "label": "D",
        "text": "-2 * sin((C + D)/2) * sin((C - D)/2)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2 * sin((C + D)/2) * cos((C - D)/2)"
      },
      {
        "label": "B",
        "text": "2 * cos((C + D)/2) * sin((C - D)/2)"
      },
      {
        "label": "C",
        "text": "2 * cos((C + D)/2) * cos((C - D)/2)"
      },
      {
        "label": "D",
        "text": "-2 * sin((C + D)/2) * sin((C - D)/2)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "sin C + sin D = 2 sin((C + D)/2) cos((C - D)/2).",
    "explanationTamil": "sin C + sin D = 2 sin((C + D)/2) cos((C - D)/2)."
  },
  {
    "code": "MAT-293",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "General Solution of sin(theta) = 0",
    "difficulty": "easy",
    "questionText": "The general solution of the equation sin(theta) = 0 is:",
    "questionTextTamil": "sin(theta) = 0 என்ற முக்கோணவியல் சமன்பாட்டின் பொதுத் தீர்வு:",
    "options": [
      {
        "label": "A",
        "text": "theta = n * pi, n in Z"
      },
      {
        "label": "B",
        "text": "theta = (2n + 1) * pi / 2"
      },
      {
        "label": "C",
        "text": "theta = 2n * pi"
      },
      {
        "label": "D",
        "text": "theta = n * pi / 2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "theta = n * pi, n in Z"
      },
      {
        "label": "B",
        "text": "theta = (2n + 1) * pi / 2"
      },
      {
        "label": "C",
        "text": "theta = 2n * pi"
      },
      {
        "label": "D",
        "text": "theta = n * pi / 2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Sine is zero at all integer multiples of pi: theta = n*pi.",
    "explanationTamil": "theta = n*pi, n in Z ஆகும்."
  },
  {
    "code": "MAT-294",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "General Solution of cos(theta) = 0",
    "difficulty": "easy",
    "questionText": "The general solution of the equation cos(theta) = 0 is:",
    "questionTextTamil": "cos(theta) = 0 என்ற முக்கோணவியல் சமன்பாட்டின் பொதுத் தீர்வு:",
    "options": [
      {
        "label": "A",
        "text": "theta = (2n + 1) * pi / 2, n in Z"
      },
      {
        "label": "B",
        "text": "theta = n * pi"
      },
      {
        "label": "C",
        "text": "theta = 2n * pi"
      },
      {
        "label": "D",
        "text": "theta = (2n - 1) * pi"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "theta = (2n + 1) * pi / 2, n in Z"
      },
      {
        "label": "B",
        "text": "theta = n * pi"
      },
      {
        "label": "C",
        "text": "theta = 2n * pi"
      },
      {
        "label": "D",
        "text": "theta = (2n - 1) * pi"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Cosine is zero at odd multiples of pi/2: theta = (2n + 1) pi / 2.",
    "explanationTamil": "theta = (2n + 1) pi / 2, n in Z ஆகும்."
  },
  {
    "code": "MAT-295",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Period of Sine and Cosine",
    "difficulty": "easy",
    "questionText": "The fundamental period of the functions sin(x) and cos(x) is:",
    "questionTextTamil": "sin(x) மற்றும் cos(x) சார்புகளின் அடிப்படை காலவட்டம் (period):",
    "options": [
      {
        "label": "A",
        "text": "2 * pi"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "pi / 2"
      },
      {
        "label": "D",
        "text": "4 * pi"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2 * pi"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "pi / 2"
      },
      {
        "label": "D",
        "text": "4 * pi"
      }
    ],
    "correctAnswer": "A",
    "explanation": "sin(x + 2pi) = sin(x) and cos(x + 2pi) = cos(x), period is 2pi.",
    "explanationTamil": "அடிப்படை காலவட்டம் 2*pi ஆகும்."
  },
  {
    "code": "MAT-296",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Period of Tangent",
    "difficulty": "easy",
    "questionText": "The fundamental period of the function tan(x) is:",
    "questionTextTamil": "tan(x) சார்பின் அடிப்படை காலவட்டம்:",
    "options": [
      {
        "label": "A",
        "text": "pi"
      },
      {
        "label": "B",
        "text": "2 * pi"
      },
      {
        "label": "C",
        "text": "pi / 2"
      },
      {
        "label": "D",
        "text": "3 * pi"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "pi"
      },
      {
        "label": "B",
        "text": "2 * pi"
      },
      {
        "label": "C",
        "text": "pi / 2"
      },
      {
        "label": "D",
        "text": "3 * pi"
      }
    ],
    "correctAnswer": "A",
    "explanation": "tan(x + pi) = tan(x), period is pi.",
    "explanationTamil": "tan(x) இன் காலவட்டம் pi ஆகும்."
  },
  {
    "code": "MAT-297",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Maximum Value of a cos x + b sin x",
    "difficulty": "medium",
    "questionText": "The maximum value of the expression a * cos(x) + b * sin(x) is:",
    "questionTextTamil": "a * cos(x) + b * sin(x) இன் அதிகபட்ச (பெரும) மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "sqrt(a^2 + b^2)"
      },
      {
        "label": "B",
        "text": "a + b"
      },
      {
        "label": "C",
        "text": "a^2 + b^2"
      },
      {
        "label": "D",
        "text": "|a| + |b|"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "sqrt(a^2 + b^2)"
      },
      {
        "label": "B",
        "text": "a + b"
      },
      {
        "label": "C",
        "text": "a^2 + b^2"
      },
      {
        "label": "D",
        "text": "|a| + |b|"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Range of a cos x + b sin x is [-sqrt(a^2+b^2), sqrt(a^2+b^2)].",
    "explanationTamil": "பெரும மதிப்பு sqrt(a^2 + b^2) ஆகும்."
  },
  {
    "code": "MAT-298",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Value of sin(15°)",
    "difficulty": "medium",
    "questionText": "The exact value of sin(15°) (or sin(pi / 12)) is:",
    "questionTextTamil": "sin(15°) இன் துல்லிய மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "(sqrt(6) - sqrt(2)) / 4"
      },
      {
        "label": "B",
        "text": "(sqrt(6) + sqrt(2)) / 4"
      },
      {
        "label": "C",
        "text": "(sqrt(3) - 1) / 2"
      },
      {
        "label": "D",
        "text": "sqrt(2 - sqrt(3)) / 2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(sqrt(6) - sqrt(2)) / 4"
      },
      {
        "label": "B",
        "text": "(sqrt(6) + sqrt(2)) / 4"
      },
      {
        "label": "C",
        "text": "(sqrt(3) - 1) / 2"
      },
      {
        "label": "D",
        "text": "sqrt(2 - sqrt(3)) / 2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "sin(45° - 30°) = sin 45 cos 30 - cos 45 sin 30 = (sqrt(6) - sqrt(2))/4.",
    "explanationTamil": "sin(15°) = (sqrt(6) - sqrt(2))/4."
  },
  {
    "code": "MAT-299",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Value of cos(15°)",
    "difficulty": "medium",
    "questionText": "The exact value of cos(15°) (or cos(pi / 12)) is:",
    "questionTextTamil": "cos(15°) இன் துல்லிய மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "(sqrt(6) + sqrt(2)) / 4"
      },
      {
        "label": "B",
        "text": "(sqrt(6) - sqrt(2)) / 4"
      },
      {
        "label": "C",
        "text": "(sqrt(3) + 1) / 2"
      },
      {
        "label": "D",
        "text": "1 / sqrt(2)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(sqrt(6) + sqrt(2)) / 4"
      },
      {
        "label": "B",
        "text": "(sqrt(6) - sqrt(2)) / 4"
      },
      {
        "label": "C",
        "text": "(sqrt(3) + 1) / 2"
      },
      {
        "label": "D",
        "text": "1 / sqrt(2)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "cos(45° - 30°) = cos 45 cos 30 + sin 45 sin 30 = (sqrt(6) + sqrt(2))/4.",
    "explanationTamil": "cos(15°) = (sqrt(6) + sqrt(2))/4."
  },
  {
    "code": "MAT-300",
    "subject": "Mathematics",
    "chapter": "Trigonometry",
    "topic": "Euler's Formula",
    "difficulty": "easy",
    "questionText": "Euler's formula states that e^(i * theta) is equal to:",
    "questionTextTamil": "ஆய்லரின் சூத்திரம் கூறுவது e^(i * theta) எதற்கு சமம்?",
    "options": [
      {
        "label": "A",
        "text": "cos(theta) + i * sin(theta)"
      },
      {
        "label": "B",
        "text": "cos(theta) - i * sin(theta)"
      },
      {
        "label": "C",
        "text": "sin(theta) + i * cos(theta)"
      },
      {
        "label": "D",
        "text": "cosh(theta) + sinh(theta)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "cos(theta) + i * sin(theta)"
      },
      {
        "label": "B",
        "text": "cos(theta) - i * sin(theta)"
      },
      {
        "label": "C",
        "text": "sin(theta) + i * cos(theta)"
      },
      {
        "label": "D",
        "text": "cosh(theta) + sinh(theta)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Fundamental relation e^(i theta) = cos theta + i sin theta.",
    "explanationTamil": "e^(i theta) = cos theta + i sin theta."
  }
];
