// scripts/question_bank/mathematics_part5.mjs
// Questions MAT-301 to MAT-400: Probability Distributions, Discrete Math, Sets/Relations, Functions, Statistics, 3D Geometry (100 Questions)

export const mathematicsPart5 = [
  {
    "code": "MAT-301",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Total Probability",
    "difficulty": "easy",
    "questionText": "For a discrete random variable X with probability mass function P(X = xi) = pi, the sum of all probabilities sum pi is equal to:",
    "questionTextTamil": "ஒரு தனித்த சமவாய்ப்பு மாறி X இன் நிகழ்தகவு நிறை சார்புக்கு அனைத்து நிகழ்தகவுகளின் கூடுதல் sum pi எதற்கு சமம்?",
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
        "text": "Depends on n"
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
        "text": "முடிவிலி"
      },
      {
        "label": "D",
        "text": "n ஐ சார்ந்தது"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The total probability of all elementary events in a sample space must sum to 1.",
    "explanationTamil": "கூறுவெளியில் உள்ள அனைத்து கூறுகளின் நிகழ்தகவுகளின் கூடுதல் எப்போதும் 1 ஆகும்."
  },
  {
    "code": "MAT-302",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Expectation E(X)",
    "difficulty": "easy",
    "questionText": "The mathematical expectation (mean) E(X) of a discrete random variable X is defined as:",
    "questionTextTamil": "தனித்த சமவாய்ப்பு மாறி X இன் கணித எதிர்பார்ப்பு (சராசரி) E(X) என்பது:",
    "options": [
      {
        "label": "A",
        "text": "sum (xi * pi)"
      },
      {
        "label": "B",
        "text": "sum (xi^2 * pi)"
      },
      {
        "label": "C",
        "text": "sum pi"
      },
      {
        "label": "D",
        "text": "sum xi"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "sum (xi * pi)"
      },
      {
        "label": "B",
        "text": "sum (xi^2 * pi)"
      },
      {
        "label": "C",
        "text": "sum pi"
      },
      {
        "label": "D",
        "text": "sum xi"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Expected value is the probability-weighted sum of outcomes: E(X) = sum xi * pi.",
    "explanationTamil": "கணித எதிர்பார்ப்பு என்பது விளைவுகளின் நிகழ்தகவு எடையிடப்பட்ட கூடுதல் E(X) = sum xi * pi."
  },
  {
    "code": "MAT-303",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Variance Formula",
    "difficulty": "easy",
    "questionText": "The variance Var(X) of a random variable X is given by:",
    "questionTextTamil": "சமவாய்ப்பு மாறி X இன் மாறுபாட்டளவு Var(X):",
    "options": [
      {
        "label": "A",
        "text": "E(X^2) - [E(X)]^2"
      },
      {
        "label": "B",
        "text": "E(X^2) + [E(X)]^2"
      },
      {
        "label": "C",
        "text": "[E(X)]^2 - E(X^2)"
      },
      {
        "label": "D",
        "text": "E(X) - E(X^2)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "E(X^2) - [E(X)]^2"
      },
      {
        "label": "B",
        "text": "E(X^2) + [E(X)]^2"
      },
      {
        "label": "C",
        "text": "[E(X)]^2 - E(X^2)"
      },
      {
        "label": "D",
        "text": "E(X) - E(X^2)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard variance definition: Var(X) = E(X^2) - [E(X)]^2.",
    "explanationTamil": "மாறுபாட்டளவு Var(X) = E(X^2) - [E(X)]^2."
  },
  {
    "code": "MAT-304",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Variance Property",
    "difficulty": "medium",
    "questionText": "For any constants a and b, Var(aX + b) is equal to:",
    "questionTextTamil": "மாறிலிகள் a மற்றும் b க்கு Var(aX + b) இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "a^2 * Var(X)"
      },
      {
        "label": "B",
        "text": "a * Var(X) + b"
      },
      {
        "label": "C",
        "text": "a^2 * Var(X) + b"
      },
      {
        "label": "D",
        "text": "a * Var(X)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a^2 * Var(X)"
      },
      {
        "label": "B",
        "text": "a * Var(X) + b"
      },
      {
        "label": "C",
        "text": "a^2 * Var(X) + b"
      },
      {
        "label": "D",
        "text": "a * Var(X)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Adding a constant does not change variance, and scaling multiplies variance by a^2: Var(aX + b) = a^2 Var(X).",
    "explanationTamil": "மாறிலியைக் கூட்டுவது மாறுபாட்டளவை மாற்றாது, a ஆல் பெருக்கினால் a^2 Var(X) ஆகும்."
  },
  {
    "code": "MAT-305",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Binomial Distribution Mean and Variance",
    "difficulty": "easy",
    "questionText": "For a binomial distribution B(n, p), the mean and variance are respectively:",
    "questionTextTamil": "ஈருறுப்புப் பரவல் B(n, p) இன் சராசரி மற்றும் மாறுபாட்டளவு முறையே:",
    "options": [
      {
        "label": "A",
        "text": "np and npq"
      },
      {
        "label": "B",
        "text": "np and np"
      },
      {
        "label": "C",
        "text": "n and npq"
      },
      {
        "label": "D",
        "text": "np and sqrt(npq)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "np மற்றும் npq"
      },
      {
        "label": "B",
        "text": "np மற்றும் np"
      },
      {
        "label": "C",
        "text": "n மற்றும் npq"
      },
      {
        "label": "D",
        "text": "np மற்றும் sqrt(npq)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "For binomial distribution, Mean = np, Variance = np(1 - p) = npq.",
    "explanationTamil": "ஈருறுப்புப் பரவலில் சராசரி = np, மாறுபாட்டளவு = npq."
  },
  {
    "code": "MAT-306",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Binomial Mean vs Variance",
    "difficulty": "medium",
    "questionText": "In any binomial distribution, the relation between mean and variance is:",
    "questionTextTamil": "எந்தவொரு ஈருறுப்புப் பரவலிலும் சராசரி மற்றும் மாறுபாட்டளவு இடையேயான தொடர்பு:",
    "options": [
      {
        "label": "A",
        "text": "Mean > Variance"
      },
      {
        "label": "B",
        "text": "Mean < Variance"
      },
      {
        "label": "C",
        "text": "Mean = Variance"
      },
      {
        "label": "D",
        "text": "Mean * Variance = 1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "சராசரி > மாறுபாட்டளவு"
      },
      {
        "label": "B",
        "text": "சராசரி < மாறுபாட்டளவு"
      },
      {
        "label": "C",
        "text": "சராசரி = மாறுபாட்டளவு"
      },
      {
        "label": "D",
        "text": "சராசரி * மாறுபாட்டளவு = 1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Since q = 1 - p < 1, Variance = npq = Mean * q < Mean.",
    "explanationTamil": "q < 1 என்பதால் மாறுபாட்டளவு = npq < np (சராசரி). எனவே சராசரி > மாறுபாட்டளவு."
  },
  {
    "code": "MAT-307",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Poisson Distribution Property",
    "difficulty": "easy",
    "questionText": "In a Poisson distribution with parameter lambda, which of the following is true?",
    "questionTextTamil": "லாம்ப்டா (lambda) அளபுரு கொண்ட பாய்சான் பரவலில் பின்வருவனவற்றில் எது உண்மை?",
    "options": [
      {
        "label": "A",
        "text": "Mean = Variance = lambda"
      },
      {
        "label": "B",
        "text": "Mean > Variance"
      },
      {
        "label": "C",
        "text": "Mean < Variance"
      },
      {
        "label": "D",
        "text": "Variance = lambda^2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "சராசரி = மாறுபாட்டளவு = lambda"
      },
      {
        "label": "B",
        "text": "சராசரி > மாறுபாட்டளவு"
      },
      {
        "label": "C",
        "text": "சராசரி < மாறுபாட்டளவு"
      },
      {
        "label": "D",
        "text": "மாறுபாட்டளவு = lambda^2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A unique property of Poisson distribution is that its mean equals its variance: Mean = Var = lambda.",
    "explanationTamil": "பாய்சான் பரவலின் தனித்துவமான பண்பு அதன் சராசரி மற்றும் மாறுபாட்டளவு இரண்டும் lambda ஆகும்."
  },
  {
    "code": "MAT-308",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Poisson PMF",
    "difficulty": "medium",
    "questionText": "The probability mass function of a Poisson distribution with parameter lambda is P(X = x) =",
    "questionTextTamil": "பாய்சான் பரவலின் நிகழ்தகவு நிறை சார்பு P(X = x) =",
    "options": [
      {
        "label": "A",
        "text": "[e^(-lambda) * lambda^x] / x!"
      },
      {
        "label": "B",
        "text": "[e^(lambda) * lambda^x] / x!"
      },
      {
        "label": "C",
        "text": "lambda^x / x!"
      },
      {
        "label": "D",
        "text": "[e^(-lambda) * x^lambda] / x!"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "[e^(-lambda) * lambda^x] / x!"
      },
      {
        "label": "B",
        "text": "[e^(lambda) * lambda^x] / x!"
      },
      {
        "label": "C",
        "text": "lambda^x / x!"
      },
      {
        "label": "D",
        "text": "[e^(-lambda) * x^lambda] / x!"
      }
    ],
    "correctAnswer": "A",
    "explanation": "P(X = x) = (e^(-lambda) * lambda^x) / x! for x = 0, 1, 2, ...",
    "explanationTamil": "பாய்சான் நிகழ்தகவு சார்பு: (e^(-lambda) * lambda^x) / x!."
  },
  {
    "code": "MAT-309",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Continuous Probability Density Function",
    "difficulty": "easy",
    "questionText": "If f(x) is the probability density function (p.d.f.) of a continuous random variable X, then integral from -infinity to infinity of f(x) dx is:",
    "questionTextTamil": "தொடர் சமவாய்ப்பு மாறி X இன் நிகழ்தகவு அடர்த்தி சார்பு f(x) எனில் -முடிவிலி முதல் +முடிவிலி வரை f(x) dx இன் மதிப்பு:",
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
        "text": "0.5"
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
        "text": "முடிவிலி"
      },
      {
        "label": "D",
        "text": "0.5"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The total area under the probability density curve is always 1.",
    "explanationTamil": "நிகழ்தகவு அடர்த்தி வளைவரையின் கீழ் உள்ள மொத்த பரப்பு 1 ஆகும்."
  },
  {
    "code": "MAT-310",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Normal Distribution Curve",
    "difficulty": "easy",
    "questionText": "The normal distribution curve is symmetric about the vertical line:",
    "questionTextTamil": "இயல்நிலைப் பரவல் வளைவரை எந்த செங்குத்துக் கோட்டைப் பொறுத்து சமச்சீரானது?",
    "options": [
      {
        "label": "A",
        "text": "x = mu (mean)"
      },
      {
        "label": "B",
        "text": "x = sigma (standard deviation)"
      },
      {
        "label": "C",
        "text": "x = 0 always"
      },
      {
        "label": "D",
        "text": "x = mu + sigma"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x = mu (சராசரி)"
      },
      {
        "label": "B",
        "text": "x = sigma (திட்டவிலக்கம்)"
      },
      {
        "label": "C",
        "text": "x = 0 எப்போதும்"
      },
      {
        "label": "D",
        "text": "x = mu + sigma"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The bell-shaped normal curve is symmetrical about the mean x = mu, where mean = median = mode.",
    "explanationTamil": "மணி வடிவ இயல்நிலை வளைவரை சராசரி x = mu வைப் பொறுத்து சமச்சீரானது."
  },
  {
    "code": "MAT-311",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Standard Normal Variable",
    "difficulty": "easy",
    "questionText": "The standard normal variable Z is related to a normal variable X with mean mu and standard deviation sigma by:",
    "questionTextTamil": "சராசரி mu மற்றும் திட்டவிலக்கம் sigma உடைய இயல்நிலை மாறி X இன் திட்ட இயல்நிலை மாறி Z என்பது:",
    "options": [
      {
        "label": "A",
        "text": "Z = (X - mu) / sigma"
      },
      {
        "label": "B",
        "text": "Z = (X + mu) / sigma"
      },
      {
        "label": "C",
        "text": "Z = (X - sigma) / mu"
      },
      {
        "label": "D",
        "text": "Z = sigma * (X - mu)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "Z = (X - mu) / sigma"
      },
      {
        "label": "B",
        "text": "Z = (X + mu) / sigma"
      },
      {
        "label": "C",
        "text": "Z = (X - sigma) / mu"
      },
      {
        "label": "D",
        "text": "Z = sigma * (X - mu)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard normal transformation: Z = (X - mu) / sigma, with mean 0 and variance 1.",
    "explanationTamil": "திட்ட இயல்நிலை மாற்றம் Z = (X - mu) / sigma ஆகும்."
  },
  {
    "code": "MAT-312",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Total Area Under Normal Curve",
    "difficulty": "easy",
    "questionText": "The total area enclosed by the standard normal curve and the horizontal axis is:",
    "questionTextTamil": "திட்ட இயல்நிலை வளைவரை மற்றும் கிடைமட்ட அச்சால் அடைபடும் மொத்த பரப்பளவு:",
    "options": [
      {
        "label": "A",
        "text": "1"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "sqrt(2*pi)"
      },
      {
        "label": "D",
        "text": "0.5"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "1"
      },
      {
        "label": "B",
        "text": "pi"
      },
      {
        "label": "C",
        "text": "sqrt(2*pi)"
      },
      {
        "label": "D",
        "text": "0.5"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The total area under the entire normal curve equals the total probability 1.",
    "explanationTamil": "இயல்நிலை வளைவரையின் கீழ் உள்ள மொத்த நிகழ்தகவு பரப்பு 1 ஆகும்."
  },
  {
    "code": "MAT-313",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Inflection Points of Normal Curve",
    "difficulty": "medium",
    "questionText": "The points of inflection of the normal distribution curve N(mu, sigma^2) occur at:",
    "questionTextTamil": "இயல்நிலை வளைவரையின் வளைவு மாற்றுப் புள்ளிகள் எங்கு அமைகின்றன?",
    "options": [
      {
        "label": "A",
        "text": "x = mu +- sigma"
      },
      {
        "label": "B",
        "text": "x = mu +- 2*sigma"
      },
      {
        "label": "C",
        "text": "x = mu +- 3*sigma"
      },
      {
        "label": "D",
        "text": "x = mu"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x = mu +- sigma"
      },
      {
        "label": "B",
        "text": "x = mu +- 2*sigma"
      },
      {
        "label": "C",
        "text": "x = mu +- 3*sigma"
      },
      {
        "label": "D",
        "text": "x = mu"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The second derivative vanishes at one standard deviation on either side: x = mu +- sigma.",
    "explanationTamil": "சராசரியிலிருந்து ஒரு திட்டவிலக்க தூரத்தில் x = mu +- sigma இல் வளைவு மாற்றுப் புள்ளிகள் அமைகின்றன."
  },
  {
    "code": "MAT-314",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Empirical Rule 68-95-99.7",
    "difficulty": "medium",
    "questionText": "In a normal distribution, the percentage of data lying within mu +- sigma is approximately:",
    "questionTextTamil": "ஒரு இயல்நிலைப் பரவலில் mu +- sigma எல்லைக்குள் அமையும் தரவுகளின் தோராய சதவீதம்:",
    "options": [
      {
        "label": "A",
        "text": "68.27%"
      },
      {
        "label": "B",
        "text": "95.45%"
      },
      {
        "label": "C",
        "text": "99.73%"
      },
      {
        "label": "D",
        "text": "50.00%"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "68.27%"
      },
      {
        "label": "B",
        "text": "95.45%"
      },
      {
        "label": "C",
        "text": "99.73%"
      },
      {
        "label": "D",
        "text": "50.00%"
      }
    ],
    "correctAnswer": "A",
    "explanation": "According to the empirical rule, approximately 68.27% of observations fall within 1 standard deviation.",
    "explanationTamil": "68-95-99.7 விதியின்படி சுமார் 68.27% தரவுகள் ஒரு திட்டவிலக்க இடைவெளியில் அமைகின்றன."
  },
  {
    "code": "MAT-315",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Cumulative Distribution Function",
    "difficulty": "easy",
    "questionText": "The cumulative distribution function F(x) = P(X <= x) satisfies lim (x -> infinity) F(x) =",
    "questionTextTamil": "குவிவு பரவல் சார்பு F(x) = P(X <= x) நிறைவு செய்யும் எல்லை lim (x -> infinity) F(x) =",
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
        "text": "முடிவிலி"
      },
      {
        "label": "D",
        "text": "-1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "As x -> infinity, cumulative probability approaches total probability 1.",
    "explanationTamil": "x முடிவிலியை நோக்கி செல்லும்போது குவிவு நிகழ்தகவு 1 ஐ அடைகிறது."
  },
  {
    "code": "MAT-316",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "CDF at Minus Infinity",
    "difficulty": "easy",
    "questionText": "The cumulative distribution function satisfies lim (x -> -infinity) F(x) =",
    "questionTextTamil": "குவிவு பரவல் சார்பு நிறைவு செய்யும் எல்லை lim (x -> -infinity) F(x) =",
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
        "text": "-infinity"
      },
      {
        "label": "D",
        "text": "0.5"
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
        "text": "-முடிவிலி"
      },
      {
        "label": "D",
        "text": "0.5"
      }
    ],
    "correctAnswer": "A",
    "explanation": "As x -> -infinity, no probability has accumulated, so F(-inf) = 0.",
    "explanationTamil": "x -> -முடிவிலி எனும்போது குவிவு நிகழ்தகவு 0 ஆகும்."
  },
  {
    "code": "MAT-317",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Bayes' Theorem",
    "difficulty": "medium",
    "questionText": "Bayes' theorem calculates:",
    "questionTextTamil": "பேயிஸின் தேற்றம் எதனைக் கணக்கிடப் பயன்படுகிறது?",
    "options": [
      {
        "label": "A",
        "text": "Posterior probability P(Ai | B)"
      },
      {
        "label": "B",
        "text": "Prior probability P(Ai) only"
      },
      {
        "label": "C",
        "text": "Marginal probability P(B) only"
      },
      {
        "label": "D",
        "text": "Independent probability"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "பின்னிகழ் நிகழ்தகவு P(Ai | B)"
      },
      {
        "label": "B",
        "text": "முன்னிகழ் நிகழ்தகவு மட்டுமே"
      },
      {
        "label": "C",
        "text": "விளிம்புநிலை நிகழ்தகவு மட்டுமே"
      },
      {
        "label": "D",
        "text": "சார்பற்ற நிகழ்தகவு"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Bayes' theorem updates prior probabilities using observed evidence to find posterior probabilities.",
    "explanationTamil": "சான்றுகளின் அடிப்படையில் முன்னிகழ் நிகழ்தகவை மாற்றி பின்னிகழ் நிகழ்தகவு காண பேயிஸ் தேற்றம் பயன்படுகிறது."
  },
  {
    "code": "MAT-318",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Independent Events",
    "difficulty": "easy",
    "questionText": "Two events A and B are statistically independent if and only if:",
    "questionTextTamil": "இரு நிகழ்ச்சிகள் A மற்றும் B சார்பற்றவை எனில் நிறைவு செய்யும் நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "P(A cap B) = P(A) * P(B)"
      },
      {
        "label": "B",
        "text": "P(A cup B) = P(A) + P(B)"
      },
      {
        "label": "C",
        "text": "P(A | B) = 0"
      },
      {
        "label": "D",
        "text": "P(A cap B) = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "P(A cap B) = P(A) * P(B)"
      },
      {
        "label": "B",
        "text": "P(A cup B) = P(A) + P(B)"
      },
      {
        "label": "C",
        "text": "P(A | B) = 0"
      },
      {
        "label": "D",
        "text": "P(A cap B) = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Independence definition: P(A cap B) = P(A) * P(B).",
    "explanationTamil": "சார்பற்ற நிகழ்ச்சிகளுக்கு P(A cap B) = P(A) * P(B) ஆகும்."
  },
  {
    "code": "MAT-319",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Mutually Exclusive Events",
    "difficulty": "easy",
    "questionText": "If two events A and B are mutually exclusive, then P(A cap B) is:",
    "questionTextTamil": "A மற்றும் B ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகள் எனில் P(A cap B) இன் மதிப்பு:",
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
        "text": "P(A) * P(B)"
      },
      {
        "label": "D",
        "text": "P(A) + P(B)"
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
        "text": "P(A) * P(B)"
      },
      {
        "label": "D",
        "text": "P(A) + P(B)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Mutually exclusive events cannot occur simultaneously, so A cap B is empty and P(A cap B) = 0.",
    "explanationTamil": "ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகள் ஒரே நேரத்தில் நிகழ முடியாது என்பதால் P(A cap B) = 0."
  },
  {
    "code": "MAT-320",
    "subject": "Mathematics",
    "chapter": "Probability Distributions",
    "topic": "Conditional Probability",
    "difficulty": "easy",
    "questionText": "The conditional probability P(A | B) when P(B) > 0 is defined as:",
    "questionTextTamil": "P(B) > 0 எனில் நிபந்தனை நிகழ்தகவு P(A | B) என்பது:",
    "options": [
      {
        "label": "A",
        "text": "P(A cap B) / P(B)"
      },
      {
        "label": "B",
        "text": "P(A cup B) / P(B)"
      },
      {
        "label": "C",
        "text": "P(B) / P(A)"
      },
      {
        "label": "D",
        "text": "P(A) * P(B)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "P(A cap B) / P(B)"
      },
      {
        "label": "B",
        "text": "P(A cup B) / P(B)"
      },
      {
        "label": "C",
        "text": "P(B) / P(A)"
      },
      {
        "label": "D",
        "text": "P(A) * P(B)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard definition: P(A | B) = P(A cap B) / P(B).",
    "explanationTamil": "நிபந்தனை நிகழ்தகவு சூத்திரம் P(A | B) = P(A cap B) / P(B)."
  },
  {
    "code": "MAT-321",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Tautology",
    "difficulty": "easy",
    "questionText": "A compound proposition that is always true regardless of the truth values of its components is called a:",
    "questionTextTamil": "அதன் கூறுகளின் மெய்மை மதிப்புகளைப் பொருட்படுத்தாமல் எப்போதும் மெய்யாகவே இருக்கும் ஒரு கூட்டு கூற்று:",
    "options": [
      {
        "label": "A",
        "text": "Tautology (மெய்மம்)"
      },
      {
        "label": "B",
        "text": "Contradiction (முரண்பாடு)"
      },
      {
        "label": "C",
        "text": "Contingency (தற்செயல்)"
      },
      {
        "label": "D",
        "text": "Negation"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "மெய்மம் (Tautology)"
      },
      {
        "label": "B",
        "text": "முரண்பாடு (Contradiction)"
      },
      {
        "label": "C",
        "text": "தற்செயல் (Contingency)"
      },
      {
        "label": "D",
        "text": "மறுப்பு"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A statement that is identically true under all assignments is a tautology.",
    "explanationTamil": "அனைத்து நிலைகளிலும் எப்போதும் மெய்யாக இருக்கும் கூற்று மெய்மம் (tautology) எனப்படும்."
  },
  {
    "code": "MAT-322",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Contradiction",
    "difficulty": "easy",
    "questionText": "A compound proposition that is always false under all truth assignments is called a:",
    "questionTextTamil": "அனைத்து நிலைகளிலும் எப்போதும் பொய்யாகவே இருக்கும் ஒரு கூட்டு கூற்று:",
    "options": [
      {
        "label": "A",
        "text": "Contradiction (முரண்பாடு)"
      },
      {
        "label": "B",
        "text": "Tautology"
      },
      {
        "label": "C",
        "text": "Equivalence"
      },
      {
        "label": "D",
        "text": "Conjunction"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "முரண்பாடு (Contradiction)"
      },
      {
        "label": "B",
        "text": "மெய்மம்"
      },
      {
        "label": "C",
        "text": "சமமான கூற்று"
      },
      {
        "label": "D",
        "text": "இணைப்பு"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A proposition that evaluates to false in every row of its truth table is a contradiction.",
    "explanationTamil": "அனைத்து நிலைகளிலும் பொய்யாகும் கூற்று முரண்பாடு (contradiction) எனப்படும்."
  },
  {
    "code": "MAT-323",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "De Morgan's Laws for Logic",
    "difficulty": "medium",
    "questionText": "De Morgan's law for logic states that ~(p land q) is logically equivalent to:",
    "questionTextTamil": "கணித தர்க்கத்தில் டி மார்கனின் விதிப்படி ~(p land q) எதற்கு சமமானது?",
    "options": [
      {
        "label": "A",
        "text": "~p lor ~q"
      },
      {
        "label": "B",
        "text": "~p land ~q"
      },
      {
        "label": "C",
        "text": "p lor q"
      },
      {
        "label": "D",
        "text": "~(p lor q)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "~p lor ~q"
      },
      {
        "label": "B",
        "text": "~p land ~q"
      },
      {
        "label": "C",
        "text": "p lor q"
      },
      {
        "label": "D",
        "text": "~(p lor q)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The negation of conjunction is the disjunction of negations: ~(p land q) equiv (~p lor ~q).",
    "explanationTamil": "இணைப்பின் மறுப்பு மறுப்புகளின் பிரிப்பாகும்: ~(p land q) equiv (~p lor ~q)."
  },
  {
    "code": "MAT-324",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Conditional Statement Truth",
    "difficulty": "medium",
    "questionText": "The conditional statement p -> q is false only when:",
    "questionTextTamil": "நிபந்தனைக் கூற்று p -> q எந்த ஒரு நிலையில் மட்டுமே பொய்யாகும்?",
    "options": [
      {
        "label": "A",
        "text": "p is True and q is False"
      },
      {
        "label": "B",
        "text": "p is False and q is True"
      },
      {
        "label": "C",
        "text": "Both p and q are False"
      },
      {
        "label": "D",
        "text": "Both p and q are True"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "p மெய் மற்றும் q பொய்"
      },
      {
        "label": "B",
        "text": "p பொய் மற்றும் q மெய்"
      },
      {
        "label": "C",
        "text": "p மற்றும் q இரண்டும் பொய்"
      },
      {
        "label": "D",
        "text": "p மற்றும் q இரண்டும் மெய்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A conditional implication p -> q is false solely when the premise p is true and conclusion q is false.",
    "explanationTamil": "முன்னிலை p மெய்யாகவும் முடிவு q பொய்யாகவும் இருக்கும் போது மட்டுமே p -> q பொய்யாகும்."
  },
  {
    "code": "MAT-325",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Contrapositive",
    "difficulty": "medium",
    "questionText": "The contrapositive of the conditional statement p -> q is:",
    "questionTextTamil": "p -> q என்ற நிபந்தனைக் கூற்றின் எதிர்மாறுக் கூற்று (contrapositive):",
    "options": [
      {
        "label": "A",
        "text": "~q -> ~p"
      },
      {
        "label": "B",
        "text": "q -> p"
      },
      {
        "label": "C",
        "text": "~p -> ~q"
      },
      {
        "label": "D",
        "text": "p land ~q"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "~q -> ~p"
      },
      {
        "label": "B",
        "text": "q -> p"
      },
      {
        "label": "C",
        "text": "~p -> ~q"
      },
      {
        "label": "D",
        "text": "p land ~q"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A conditional statement p -> q is logically equivalent to its contrapositive ~q -> ~p.",
    "explanationTamil": "p -> q இன் எதிர்மாறுக் கூற்று ~q -> ~p ஆகும்."
  },
  {
    "code": "MAT-326",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Converse",
    "difficulty": "easy",
    "questionText": "The converse of the conditional statement p -> q is:",
    "questionTextTamil": "p -> q என்ற கூற்றின் மறுதலைக் கூற்று (converse):",
    "options": [
      {
        "label": "A",
        "text": "q -> p"
      },
      {
        "label": "B",
        "text": "~q -> ~p"
      },
      {
        "label": "C",
        "text": "~p -> ~q"
      },
      {
        "label": "D",
        "text": "p <-> q"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "q -> p"
      },
      {
        "label": "B",
        "text": "~q -> ~p"
      },
      {
        "label": "C",
        "text": "~p -> ~q"
      },
      {
        "label": "D",
        "text": "p <-> q"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The converse of p -> q is formed by swapping hypothesis and conclusion: q -> p.",
    "explanationTamil": "p -> q இன் மறுதலைக் கூற்று q -> p ஆகும்."
  },
  {
    "code": "MAT-327",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Inverse Statement",
    "difficulty": "easy",
    "questionText": "The inverse of the conditional statement p -> q is:",
    "questionTextTamil": "p -> q என்ற கூற்றின் நேர்மாறுக் கூற்று (inverse):",
    "options": [
      {
        "label": "A",
        "text": "~p -> ~q"
      },
      {
        "label": "B",
        "text": "~q -> ~p"
      },
      {
        "label": "C",
        "text": "q -> p"
      },
      {
        "label": "D",
        "text": "~p lor q"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "~p -> ~q"
      },
      {
        "label": "B",
        "text": "~q -> ~p"
      },
      {
        "label": "C",
        "text": "q -> p"
      },
      {
        "label": "D",
        "text": "~p lor q"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The inverse negates both premise and conclusion: ~p -> ~q.",
    "explanationTamil": "p -> q இன் நேர்மாறுக் கூற்று ~p -> ~q ஆகும்."
  },
  {
    "code": "MAT-328",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Biconditional",
    "difficulty": "easy",
    "questionText": "The biconditional statement p <-> q is true when:",
    "questionTextTamil": "இருவழி நிபந்தனைக் கூற்று p <-> q எப்போது மெய்யாகும்?",
    "options": [
      {
        "label": "A",
        "text": "Both p and q have the same truth value"
      },
      {
        "label": "B",
        "text": "p is true and q is false"
      },
      {
        "label": "C",
        "text": "p is false and q is true"
      },
      {
        "label": "D",
        "text": "Never"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "p மற்றும் q இரண்டும் ஒரே மெய்மை மதிப்பைப் பெற்றிருக்கும் போது"
      },
      {
        "label": "B",
        "text": "p மெய் மற்றும் q பொய்"
      },
      {
        "label": "C",
        "text": "p பொய் மற்றும் q மெய்"
      },
      {
        "label": "D",
        "text": "ஒருபோதும் இல்லை"
      }
    ],
    "correctAnswer": "A",
    "explanation": "p <-> q is true if and only if both statements are either simultaneously true or simultaneously false.",
    "explanationTamil": "p மற்றும் q இரண்டும் ஒரே மெய்மை மதிப்பை (T,T அல்லது F,F) கொண்டிருக்கும் போது மட்டுமே p <-> q மெய்யாகும்."
  },
  {
    "code": "MAT-329",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Binary Operation Closure",
    "difficulty": "easy",
    "questionText": "A binary operation * on a non-empty set S is closed if for all a, b in S:",
    "questionTextTamil": "வெற்றிடமற்ற கணம் S இல் ஓர் ஈருறுப்புச் செயலி * அடைவுப் பண்பைப் பெற நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "a * b in S"
      },
      {
        "label": "B",
        "text": "a * b = b * a"
      },
      {
        "label": "C",
        "text": "(a * b) * c = a * (b * c)"
      },
      {
        "label": "D",
        "text": "a * e = a"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a * b in S"
      },
      {
        "label": "B",
        "text": "a * b = b * a"
      },
      {
        "label": "C",
        "text": "(a * b) * c = a * (b * c)"
      },
      {
        "label": "D",
        "text": "a * e = a"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Closure means the result of the operation always remains within the set S: a * b in S.",
    "explanationTamil": "அடைவுப் பண்பு என்பது a, b in S எனில் a * b in S என்பதாகும்."
  },
  {
    "code": "MAT-330",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Associative Property",
    "difficulty": "easy",
    "questionText": "The operation * on S is associative if for all a, b, c in S:",
    "questionTextTamil": "S இல் செயலி * சேர்ப்புப் பண்பைப் பெற்றிருக்க நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "(a * b) * c = a * (b * c)"
      },
      {
        "label": "B",
        "text": "a * b = b * a"
      },
      {
        "label": "C",
        "text": "a * (b + c) = a * b + a * c"
      },
      {
        "label": "D",
        "text": "a * e = a"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(a * b) * c = a * (b * c)"
      },
      {
        "label": "B",
        "text": "a * b = b * a"
      },
      {
        "label": "C",
        "text": "a * (b + c) = a * b + a * c"
      },
      {
        "label": "D",
        "text": "a * e = a"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Associativity means grouping does not affect the outcome: (a * b) * c = a * (b * c).",
    "explanationTamil": "சேர்ப்புப் பண்பு: (a * b) * c = a * (b * c)."
  },
  {
    "code": "MAT-331",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Identity Element",
    "difficulty": "easy",
    "questionText": "An element e in (S, *) is called the identity element if for every a in S:",
    "questionTextTamil": "கணம் S இல் ஓர் உறுப்பு e சமனி உறுப்பு என அழைக்கப்பட நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "a * e = e * a = a"
      },
      {
        "label": "B",
        "text": "a * e = 0"
      },
      {
        "label": "C",
        "text": "a * e = 1"
      },
      {
        "label": "D",
        "text": "a * e = e"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a * e = e * a = a"
      },
      {
        "label": "B",
        "text": "a * e = 0"
      },
      {
        "label": "C",
        "text": "a * e = 1"
      },
      {
        "label": "D",
        "text": "a * e = e"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The identity element leaves any element unchanged under the operation: a * e = e * a = a.",
    "explanationTamil": "சமனி உறுப்பு எந்த உறுப்பையும் மாற்றாது: a * e = e * a = a."
  },
  {
    "code": "MAT-332",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Inverse Element",
    "difficulty": "easy",
    "questionText": "If e is the identity element, the inverse a^(-1) of an element a satisfies:",
    "questionTextTamil": "e என்பது சமனி உறுப்பு எனில், உறுப்பு a இன் நேர்மாறு a^(-1) நிறைவு செய்யும் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "a * a^(-1) = a^(-1) * a = e"
      },
      {
        "label": "B",
        "text": "a * a^(-1) = 0"
      },
      {
        "label": "C",
        "text": "a * a^(-1) = a"
      },
      {
        "label": "D",
        "text": "a + a^(-1) = e"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a * a^(-1) = a^(-1) * a = e"
      },
      {
        "label": "B",
        "text": "a * a^(-1) = 0"
      },
      {
        "label": "C",
        "text": "a * a^(-1) = a"
      },
      {
        "label": "D",
        "text": "a + a^(-1) = e"
      }
    ],
    "correctAnswer": "A",
    "explanation": "An element composed with its inverse produces the identity element: a * a^(-1) = e.",
    "explanationTamil": "ஒரு உறுப்பும் அதன் நேர்மாறும் இணைந்து சமனி உறுப்பைத் தரும்: a * a^(-1) = e."
  },
  {
    "code": "MAT-333",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Commutative Property",
    "difficulty": "easy",
    "questionText": "The binary operation * is commutative on S if for all a, b in S:",
    "questionTextTamil": "S இல் ஓர் ஈருறுப்புச் செயலி பரிமாற்றுப் பண்பைப் பெற நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "a * b = b * a"
      },
      {
        "label": "B",
        "text": "(a * b) * c = a * (b * c)"
      },
      {
        "label": "C",
        "text": "a * b in S"
      },
      {
        "label": "D",
        "text": "a * b = e"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a * b = b * a"
      },
      {
        "label": "B",
        "text": "(a * b) * c = a * (b * c)"
      },
      {
        "label": "C",
        "text": "a * b in S"
      },
      {
        "label": "D",
        "text": "a * b = e"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Commutativity means order of operands does not matter: a * b = b * a.",
    "explanationTamil": "பரிமாற்றுப் பண்பு: a * b = b * a."
  },
  {
    "code": "MAT-334",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Group Definition",
    "difficulty": "medium",
    "questionText": "A mathematical system (G, *) is called a group if it satisfies:",
    "questionTextTamil": "ஒரு கணித அமைப்பு (G, *) ஒரு குலம் (group) என அழைக்கப்பட நிறைவு செய்ய வேண்டிய பண்புகள்:",
    "options": [
      {
        "label": "A",
        "text": "Closure, Associativity, Identity, and Inverse"
      },
      {
        "label": "B",
        "text": "Closure and Commutativity only"
      },
      {
        "label": "C",
        "text": "Closure and Associativity only"
      },
      {
        "label": "D",
        "text": "Identity and Commutativity only"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "அடைவு, சேர்ப்பு, சமனி மற்றும் நேர்மாறுப் பண்புகள்"
      },
      {
        "label": "B",
        "text": "அடைவு மற்றும் பரிமாற்றுப் பண்புகள் மட்டுமே"
      },
      {
        "label": "C",
        "text": "அடைவு மற்றும் சேர்ப்புப் பண்புகள் மட்டுமே"
      },
      {
        "label": "D",
        "text": "சமனி மற்றும் பரிமாற்றுப் பண்புகள் மட்டுமே"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A group satisfies four core axioms: closure, associativity, existence of identity, and existence of inverses.",
    "explanationTamil": "குலம் என்பது அடைவு, சேர்ப்பு, சமனி மற்றும் நேர்மாறு ஆகிய நான்கு விதிகளை நிறைவு செய்யும் அமைப்பாகும்."
  },
  {
    "code": "MAT-335",
    "subject": "Mathematics",
    "chapter": "Discrete Mathematics",
    "topic": "Abelian Group",
    "difficulty": "easy",
    "questionText": "A group (G, *) is called an Abelian (commutative) group if it additionally satisfies:",
    "questionTextTamil": "ஒரு குலம் (G, *) எபிலியன் குலம் என அழைக்கப்பட கூடுதலாக நிறைவு செய்ய வேண்டிய பண்பு:",
    "options": [
      {
        "label": "A",
        "text": "Commutative law (a * b = b * a)"
      },
      {
        "label": "B",
        "text": "Distributive law"
      },
      {
        "label": "C",
        "text": "Absorption law"
      },
      {
        "label": "D",
        "text": "Idempotence"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "பரிமாற்றுப் பண்பு (a * b = b * a)"
      },
      {
        "label": "B",
        "text": "பங்கீட்டுப் பண்பு"
      },
      {
        "label": "C",
        "text": "உறிஞ்சுதல் பண்பு"
      },
      {
        "label": "D",
        "text": "தன்னடுக்கு"
      }
    ],
    "correctAnswer": "A",
    "explanation": "An abelian group is a group whose binary operation is commutative: a * b = b * a.",
    "explanationTamil": "பரிமாற்றுப் பண்பை நிறைவு செய்யும் குலம் எபிலியன் குலமாகும்."
  },
  {
    "code": "MAT-336",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Equivalence Relation",
    "difficulty": "easy",
    "questionText": "A relation R on a set A is called an equivalence relation if it is:",
    "questionTextTamil": "கணம் A இல் உள்ள ஒரு தொடர்பு R சமானத் தொடர்பு என அழைக்கப்பட அது எவ்வாறாக இருக்க வேண்டும்?",
    "options": [
      {
        "label": "A",
        "text": "Reflexive, Symmetric, and Transitive"
      },
      {
        "label": "B",
        "text": "Reflexive and Symmetric only"
      },
      {
        "label": "C",
        "text": "Symmetric and Transitive only"
      },
      {
        "label": "D",
        "text": "Reflexive and Anti-symmetric"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "தற்சுட்டு, சமச்சீர் மற்றும் கடப்புத் தொடர்பு"
      },
      {
        "label": "B",
        "text": "தற்சுட்டு மற்றும் சமச்சீர் மட்டுமே"
      },
      {
        "label": "C",
        "text": "சமச்சீர் மற்றும் கடப்பு மட்டுமே"
      },
      {
        "label": "D",
        "text": "தற்சுட்டு மற்றும் எதிர்-சமச்சீர்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "An equivalence relation satisfies reflexivity (aRa), symmetry (aRb => bRa), and transitivity (aRb and bRc => aRc).",
    "explanationTamil": "சமானத் தொடர்பு என்பது தற்சுட்டு, சமச்சீர் மற்றும் கடப்பு ஆகிய மூன்று பண்புகளையும் பெற்ற தொடர்பாகும்."
  },
  {
    "code": "MAT-337",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Reflexive Relation",
    "difficulty": "easy",
    "questionText": "A relation R on set A is reflexive if for every element a in A:",
    "questionTextTamil": "கணம் A இல் தொடர்பு R தற்சுட்டுத் தொடர்பு எனில் ஒவ்வொரு a in A க்கும்:",
    "options": [
      {
        "label": "A",
        "text": "(a, a) in R"
      },
      {
        "label": "B",
        "text": "(a, b) in R => (b, a) in R"
      },
      {
        "label": "C",
        "text": "(a, b) in R and (b, c) in R => (a, c) in R"
      },
      {
        "label": "D",
        "text": "(a, a) not in R"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(a, a) in R"
      },
      {
        "label": "B",
        "text": "(a, b) in R => (b, a) in R"
      },
      {
        "label": "C",
        "text": "(a, b) in R மற்றும் (b, c) in R => (a, c) in R"
      },
      {
        "label": "D",
        "text": "(a, a) not in R"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Reflexivity requires that every element is related to itself: (a, a) in R.",
    "explanationTamil": "தற்சுட்டுத் தொடர்பு என்பது ஒவ்வொரு உறுப்பும் தனக்குத்தானே தொடர்பு பெற்றிருப்பதாகும்: (a, a) in R."
  },
  {
    "code": "MAT-338",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Symmetric Relation",
    "difficulty": "easy",
    "questionText": "A relation R on set A is symmetric if:",
    "questionTextTamil": "கணம் A இல் தொடர்பு R சமச்சீர் தொடர்பு எனில்:",
    "options": [
      {
        "label": "A",
        "text": "(a, b) in R implies (b, a) in R"
      },
      {
        "label": "B",
        "text": "(a, a) in R for all a"
      },
      {
        "label": "C",
        "text": "(a, b) in R and (b, a) in R implies a = b"
      },
      {
        "label": "D",
        "text": "(a, b) in R implies (a, c) in R"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(a, b) in R எனில் (b, a) in R"
      },
      {
        "label": "B",
        "text": "அனைத்து a க்கும் (a, a) in R"
      },
      {
        "label": "C",
        "text": "(a, b) in R மற்றும் (b, a) in R எனில் a = b"
      },
      {
        "label": "D",
        "text": "(a, b) in R எனில் (a, c) in R"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Symmetry means if a is related to b, then b is related to a.",
    "explanationTamil": "சமச்சீர் தொடர்பு: (a, b) in R எனில் (b, a) in R ஆகும்."
  },
  {
    "code": "MAT-339",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Transitive Relation",
    "difficulty": "easy",
    "questionText": "A relation R on set A is transitive if:",
    "questionTextTamil": "கணம் A இல் தொடர்பு R கடப்புத் தொடர்பு எனில்:",
    "options": [
      {
        "label": "A",
        "text": "(a, b) in R and (b, c) in R implies (a, c) in R"
      },
      {
        "label": "B",
        "text": "(a, a) in R"
      },
      {
        "label": "C",
        "text": "(a, b) in R implies (b, a) in R"
      },
      {
        "label": "D",
        "text": "(a, b) in R implies a = b"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(a, b) in R மற்றும் (b, c) in R எனில் (a, c) in R"
      },
      {
        "label": "B",
        "text": "(a, a) in R"
      },
      {
        "label": "C",
        "text": "(a, b) in R எனில் (b, a) in R"
      },
      {
        "label": "D",
        "text": "(a, b) in R எனில் a = b"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Transitivity means relation passes through intermediates: (a, b) and (b, c) in R => (a, c) in R.",
    "explanationTamil": "கடப்புத் தொடர்பு: (a, b) in R மற்றும் (b, c) in R எனில் (a, c) in R."
  },
  {
    "code": "MAT-340",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "One-to-One Function (Injective)",
    "difficulty": "easy",
    "questionText": "A function f: A -> B is one-to-one (injective) if:",
    "questionTextTamil": "f: A -> B என்ற சார்பு ஒன்றுக்கொன்றான சார்பு (injective) எனில்:",
    "options": [
      {
        "label": "A",
        "text": "f(x1) = f(x2) implies x1 = x2"
      },
      {
        "label": "B",
        "text": "f(A) = B"
      },
      {
        "label": "C",
        "text": "f(x1) != f(x2) implies x1 = x2"
      },
      {
        "label": "D",
        "text": "For every y in B there is an x in A"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "f(x1) = f(x2) எனில் x1 = x2"
      },
      {
        "label": "B",
        "text": "f(A) = B"
      },
      {
        "label": "C",
        "text": "f(x1) != f(x2) எனில் x1 = x2"
      },
      {
        "label": "D",
        "text": "ஒவ்வொரு y in B க்கும் x in A உள்ளது"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A function is injective if distinct domain elements map to distinct codomain elements: f(x1) = f(x2) => x1 = x2.",
    "explanationTamil": "ஒன்றுக்கொன்றான சார்பு: f(x1) = f(x2) எனில் x1 = x2."
  },
  {
    "code": "MAT-341",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Onto Function (Surjective)",
    "difficulty": "easy",
    "questionText": "A function f: A -> B is onto (surjective) if:",
    "questionTextTamil": "f: A -> B என்ற சார்பு மேற்கோர்த்தல் சார்பு (surjective) எனில்:",
    "options": [
      {
        "label": "A",
        "text": "Range of f equals Codomain B (f(A) = B)"
      },
      {
        "label": "B",
        "text": "f is one-to-one"
      },
      {
        "label": "C",
        "text": "Domain equals Range"
      },
      {
        "label": "D",
        "text": "f(x) = x for all x"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "f இன் வீச்சகம் = துணைச் சார்பகம் B (f(A) = B)"
      },
      {
        "label": "B",
        "text": "f ஒன்றுக்கொன்றான சார்பு"
      },
      {
        "label": "C",
        "text": "சார்பகம் = வீச்சகம்"
      },
      {
        "label": "D",
        "text": "அனைத்து x க்கும் f(x) = x"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Surjective means every element in codomain has at least one pre-image in the domain: Range = Codomain.",
    "explanationTamil": "மேற்கோர்த்தல் சார்பு: வீச்சகம் = துணைச் சார்பகம் B."
  },
  {
    "code": "MAT-342",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Bijective Function",
    "difficulty": "easy",
    "questionText": "A function f: A -> B is called bijective (or one-to-one correspondence) if it is:",
    "questionTextTamil": "f: A -> B என்ற சார்பு இருபுறச் சார்பு (bijective) என அழைக்கப்பட அது:",
    "options": [
      {
        "label": "A",
        "text": "Both one-to-one and onto"
      },
      {
        "label": "B",
        "text": "One-to-one only"
      },
      {
        "label": "C",
        "text": "Onto only"
      },
      {
        "label": "D",
        "text": "Constant"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "ஒன்றுக்கொன்றான மற்றும் மேற்கோர்த்தல் சார்பு இரண்டும்"
      },
      {
        "label": "B",
        "text": "ஒன்றுக்கொன்றான சார்பு மட்டுமே"
      },
      {
        "label": "C",
        "text": "மேற்கோர்த்தல் சார்பு மட்டுமே"
      },
      {
        "label": "D",
        "text": "மாறிலி சார்பு"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A bijection is both injective (one-to-one) and surjective (onto), which guarantees an inverse function exists.",
    "explanationTamil": "இருபுறச் சார்பு என்பது ஒன்றுக்கொன்றான மற்றும் மேற்கோர்த்தல் ஆகிய இரண்டையும் நிறைவு செய்யும் சார்பாகும்."
  },
  {
    "code": "MAT-343",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Inverse Function Condition",
    "difficulty": "easy",
    "questionText": "An inverse function f^(-1) exists if and only if f is:",
    "questionTextTamil": "ஒரு சார்பு f க்கு நேர்மாறுச் சார்பு f^(-1) நிலவ தேவையானதும் போதுமானதுமான நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "Bijective (one-to-one and onto)"
      },
      {
        "label": "B",
        "text": "Injective only"
      },
      {
        "label": "C",
        "text": "Surjective only"
      },
      {
        "label": "D",
        "text": "Continuous"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "இருபுறச் சார்பு (ஒன்றுக்கொன்று மற்றும் மேற்கோர்த்தல்)"
      },
      {
        "label": "B",
        "text": "ஒன்றுக்கொன்றான சார்பு மட்டுமே"
      },
      {
        "label": "C",
        "text": "மேற்கோர்த்தல் சார்பு மட்டுமே"
      },
      {
        "label": "D",
        "text": "தொடர்ச்சியானது"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A function has a two-sided inverse if and only if it is a bijection.",
    "explanationTamil": "ஒரு சார்பு இருபுறச் சார்பாக இருக்கும் போது மட்டுமே அதற்கு நேர்மாறுச் சார்பு இருக்கும்."
  },
  {
    "code": "MAT-344",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Composite Function",
    "difficulty": "easy",
    "questionText": "If f: A -> B and g: B -> C, then the composite function (g o f)(x) is defined as:",
    "questionTextTamil": "f: A -> B மற்றும் g: B -> C எனில் சேர்ப்புச் சார்பு (g o f)(x) என்பது:",
    "options": [
      {
        "label": "A",
        "text": "g(f(x))"
      },
      {
        "label": "B",
        "text": "f(g(x))"
      },
      {
        "label": "C",
        "text": "f(x) * g(x)"
      },
      {
        "label": "D",
        "text": "g(x) / f(x)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "g(f(x))"
      },
      {
        "label": "B",
        "text": "f(g(x))"
      },
      {
        "label": "C",
        "text": "f(x) * g(x)"
      },
      {
        "label": "D",
        "text": "g(x) / f(x)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "By definition of function composition, (g o f)(x) = g(f(x)).",
    "explanationTamil": "சார்புகளின் சேர்ப்பு வரையறைப்படி (g o f)(x) = g(f(x)) ஆகும்."
  },
  {
    "code": "MAT-345",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Identity Function",
    "difficulty": "easy",
    "questionText": "The function I_A: A -> A defined by I_A(x) = x for all x in A is called the:",
    "questionTextTamil": "அனைத்து x in A க்கும் I_A(x) = x என வரையறுக்கப்படும் I_A: A -> A என்ற சார்பின் பெயர்:",
    "options": [
      {
        "label": "A",
        "text": "Identity function"
      },
      {
        "label": "B",
        "text": "Constant function"
      },
      {
        "label": "C",
        "text": "Zero function"
      },
      {
        "label": "D",
        "text": "Reciprocal function"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "சமனிச் சார்பு (Identity function)"
      },
      {
        "label": "B",
        "text": "மாறிலிச் சார்பு"
      },
      {
        "label": "C",
        "text": "பூஜ்ஜியச் சார்பு"
      },
      {
        "label": "D",
        "text": "தலைகீழ் சார்பு"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The identity function maps every element of a set to itself.",
    "explanationTamil": "ஒவ்வொரு உறுப்பையும் தனக்கே தொடர்புபடுத்தும் சார்பு சமனிச் சார்பாகும்."
  },
  {
    "code": "MAT-346",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Power Set Cardinality",
    "difficulty": "easy",
    "questionText": "If a finite set A has n elements, the number of elements in its power set P(A) is:",
    "questionTextTamil": "முடிவுறு கணம் A இல் n உறுப்புகள் இருப்பின் அதன் அடுக்குக் கணம் P(A) இல் உள்ள உறுப்புகளின் எண்ணிக்கை:",
    "options": [
      {
        "label": "A",
        "text": "2^n"
      },
      {
        "label": "B",
        "text": "n^2"
      },
      {
        "label": "C",
        "text": "2n"
      },
      {
        "label": "D",
        "text": "n!"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2^n"
      },
      {
        "label": "B",
        "text": "n^2"
      },
      {
        "label": "C",
        "text": "2n"
      },
      {
        "label": "D",
        "text": "n!"
      }
    ],
    "correctAnswer": "A",
    "explanation": "A set with n elements has 2^n subsets, so |P(A)| = 2^n.",
    "explanationTamil": "n உறுப்புகள் கொண்ட கணத்தின் அனைத்து உட்கணங்களின் எண்ணிக்கை 2^n ஆகும்."
  },
  {
    "code": "MAT-347",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Number of Relations",
    "difficulty": "easy",
    "questionText": "If set A has m elements and set B has n elements, the total number of relations from A to B is:",
    "questionTextTamil": "கணம் A இல் m உறுப்புகளும் கணம் B இல் n உறுப்புகளும் இருப்பின் A இலிருந்து B க்கான மொத்த தொடர்புகளின் எண்ணிக்கை:",
    "options": [
      {
        "label": "A",
        "text": "2^(m * n)"
      },
      {
        "label": "B",
        "text": "m * n"
      },
      {
        "label": "C",
        "text": "2^(m + n)"
      },
      {
        "label": "D",
        "text": "m^n"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "2^(m * n)"
      },
      {
        "label": "B",
        "text": "m * n"
      },
      {
        "label": "C",
        "text": "2^(m + n)"
      },
      {
        "label": "D",
        "text": "m^n"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Cartesian product A x B has m*n elements, so the number of subsets (relations) is 2^(m*n).",
    "explanationTamil": "A x B இன் உட்கணங்களின் எண்ணிக்கை 2^(m * n) ஆகும்."
  },
  {
    "code": "MAT-348",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Number of Functions",
    "difficulty": "easy",
    "questionText": "The total number of functions from a finite set A with m elements to a finite set B with n elements is:",
    "questionTextTamil": "m உறுப்புகள் கொண்ட கணம் A இலிருந்து n உறுப்புகள் கொண்ட கணம் B க்கான மொத்த சார்புகளின் எண்ணிக்கை:",
    "options": [
      {
        "label": "A",
        "text": "n^m"
      },
      {
        "label": "B",
        "text": "m^n"
      },
      {
        "label": "C",
        "text": "m * n"
      },
      {
        "label": "D",
        "text": "2^(m * n)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "n^m"
      },
      {
        "label": "B",
        "text": "m^n"
      },
      {
        "label": "C",
        "text": "m * n"
      },
      {
        "label": "D",
        "text": "2^(m * n)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Each of the m elements in A can be assigned any of the n elements in B, giving n * n * ... = n^m functions.",
    "explanationTamil": "A இல் உள்ள m உறுப்புகளுக்கு B இல் தலா n வாய்ப்புகள் உள்ளதால் n^m சார்புகள் அமையும்."
  },
  {
    "code": "MAT-349",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Even and Odd Functions",
    "difficulty": "easy",
    "questionText": "A function f(x) is said to be odd if for all x in its domain:",
    "questionTextTamil": "ஒரு சார்பு f(x) ஒற்றைச் சார்பு என அழைக்கப்பட நிறைவு செய்ய வேண்டிய நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "f(-x) = -f(x)"
      },
      {
        "label": "B",
        "text": "f(-x) = f(x)"
      },
      {
        "label": "C",
        "text": "f(x) = -f(x)"
      },
      {
        "label": "D",
        "text": "f(1/x) = f(x)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "f(-x) = -f(x)"
      },
      {
        "label": "B",
        "text": "f(-x) = f(x)"
      },
      {
        "label": "C",
        "text": "f(x) = -f(x)"
      },
      {
        "label": "D",
        "text": "f(1/x) = f(x)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "An odd function satisfies f(-x) = -f(x) and is symmetric with respect to the origin.",
    "explanationTamil": "ஒற்றைச் சார்பு f(-x) = -f(x) என்ற நிபந்தனையை நிறைவு செய்து ஆதிப்புள்ளியைப் பொறுத்து சமச்சீரானது."
  },
  {
    "code": "MAT-350",
    "subject": "Mathematics",
    "chapter": "Sets Relations and Functions",
    "topic": "Even Function Definition",
    "difficulty": "easy",
    "questionText": "A function f(x) is said to be even if for all x in its domain:",
    "questionTextTamil": "ஒரு சார்பு f(x) இரட்டைச் சார்பு என அழைக்கப்பட நிறைவு செய்ய வேண்டிய நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "f(-x) = f(x)"
      },
      {
        "label": "B",
        "text": "f(-x) = -f(x)"
      },
      {
        "label": "C",
        "text": "f(x^2) = f(x)"
      },
      {
        "label": "D",
        "text": "f'(x) = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "f(-x) = f(x)"
      },
      {
        "label": "B",
        "text": "f(-x) = -f(x)"
      },
      {
        "label": "C",
        "text": "f(x^2) = f(x)"
      },
      {
        "label": "D",
        "text": "f'(x) = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "An even function satisfies f(-x) = f(x) and is symmetric about the y-axis.",
    "explanationTamil": "இரட்டைச் சார்பு f(-x) = f(x) என்ற நிபந்தனையை நிறைவு செய்து y-அச்சைச் சுற்றி சமச்சீரானது."
  },
  {
    "code": "MAT-351",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Standard Deviation Definition",
    "difficulty": "easy",
    "questionText": "Standard deviation sigma is defined as the:",
    "questionTextTamil": "திட்டவிலக்கம் sigma என்பது:",
    "options": [
      {
        "label": "A",
        "text": "Positive square root of variance"
      },
      {
        "label": "B",
        "text": "Square of variance"
      },
      {
        "label": "C",
        "text": "Mean of deviations"
      },
      {
        "label": "D",
        "text": "Variance divided by n"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "மாறுபாட்டளவின் மிகை வர்க்க மூலம்"
      },
      {
        "label": "B",
        "text": "மாறுபாட்டளவின் வர்க்கம்"
      },
      {
        "label": "C",
        "text": "விலக்கங்களின் சராசரி"
      },
      {
        "label": "D",
        "text": "மாறுபாட்டளவை n ஆல் வகுத்தல்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard deviation sigma = sqrt(Var(X)).",
    "explanationTamil": "திட்டவிலக்கம் என்பது மாறுபாட்டளவின் மிகை வர்க்க மூலமாகும்: sigma = sqrt(Var(X))."
  },
  {
    "code": "MAT-352",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Coefficient of Variation",
    "difficulty": "medium",
    "questionText": "The Coefficient of Variation (C.V.) used to compare the consistency of two distributions is:",
    "questionTextTamil": "இரு பரவல்களின் நிலைத்தன்மையை ஒப்பிடப் பயன்படும் மாறுபாட்டுக் கெழு (C.V.):",
    "options": [
      {
        "label": "A",
        "text": "(sigma / bar(x)) * 100"
      },
      {
        "label": "B",
        "text": "(bar(x) / sigma) * 100"
      },
      {
        "label": "C",
        "text": "sigma * bar(x)"
      },
      {
        "label": "D",
        "text": "(sigma^2 / bar(x)) * 100"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(sigma / bar(x)) * 100"
      },
      {
        "label": "B",
        "text": "(bar(x) / sigma) * 100"
      },
      {
        "label": "C",
        "text": "sigma * bar(x)"
      },
      {
        "label": "D",
        "text": "(sigma^2 / bar(x)) * 100"
      }
    ],
    "correctAnswer": "A",
    "explanation": "C.V. = (Standard Deviation / Mean) * 100% = (sigma / bar(x)) * 100.",
    "explanationTamil": "மாறுபாட்டுக் கெழு C.V. = (திட்டவிலக்கம் / சராசரி) * 100."
  },
  {
    "code": "MAT-353",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Consistency Rule",
    "difficulty": "easy",
    "questionText": "Between two series A and B, the series having smaller Coefficient of Variation (C.V.) is said to be:",
    "questionTextTamil": "A மற்றும் B ஆகிய இரு தொடர்களில் குறைந்த மாறுபாட்டுக் கெழுவைக் (C.V.) கொண்ட தொடர் எத்தகையது?",
    "options": [
      {
        "label": "A",
        "text": "More consistent (or stable)"
      },
      {
        "label": "B",
        "text": "Less consistent"
      },
      {
        "label": "C",
        "text": "Having higher mean"
      },
      {
        "label": "D",
        "text": "Having higher spread"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "அதிக நிலைத்தன்மை (consistency) உடையது"
      },
      {
        "label": "B",
        "text": "குறைந்த நிலைத்தன்மை உடையது"
      },
      {
        "label": "C",
        "text": "அதிக சராசரி கொண்டது"
      },
      {
        "label": "D",
        "text": "அதிக பரவல் கொண்டது"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Smaller C.V. implies less relative variability, meaning greater consistency.",
    "explanationTamil": "குறைந்த C.V. மதிப்பு அதிக நிலைத்தன்மை அல்லது சீரான தன்மையைக் குறிக்கிறது."
  },
  {
    "code": "MAT-354",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Effect of Constant on SD",
    "difficulty": "medium",
    "questionText": "If every observation in a dataset is increased by a constant k, the new standard deviation:",
    "questionTextTamil": "ஒரு தரவுத் தொகுப்பின் ஒவ்வொரு உறுப்புடனும் ஒரு மாறிலி k கூட்டப்பட்டால் புதிய திட்டவிலக்கம்:",
    "options": [
      {
        "label": "A",
        "text": "Remains unchanged"
      },
      {
        "label": "B",
        "text": "Increases by k"
      },
      {
        "label": "C",
        "text": "Multiplies by k"
      },
      {
        "label": "D",
        "text": "Decreases by k"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "மாறாமல் அப்படியே இருக்கும்"
      },
      {
        "label": "B",
        "text": "k அளவு அதிகரிக்கும்"
      },
      {
        "label": "C",
        "text": "k ஆல் பெருக்கப்படும்"
      },
      {
        "label": "D",
        "text": "k அளவு குறையும்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Adding a constant shifts the mean by k but leaves all differences (x_i - mean) unchanged, so SD is unchanged.",
    "explanationTamil": "மாறிலியைக் கூட்டுவது பரவலை மாற்றாது என்பதால் திட்டவிலக்கம் மாறாது."
  },
  {
    "code": "MAT-355",
    "subject": "Mathematics",
    "chapter": "Statistics",
    "topic": "Effect of Scaling on SD",
    "difficulty": "medium",
    "questionText": "If every observation in a dataset is multiplied by a positive constant c, the new standard deviation becomes:",
    "questionTextTamil": "ஒரு தரவின் ஒவ்வொரு உறுப்பும் ஒரு மிகை மாறிலி c ஆல் பெருக்கப்பட்டால் புதிய திட்டவிலக்கம்:",
    "options": [
      {
        "label": "A",
        "text": "c * sigma"
      },
      {
        "label": "B",
        "text": "sigma"
      },
      {
        "label": "C",
        "text": "c^2 * sigma"
      },
      {
        "label": "D",
        "text": "sigma + c"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "c * sigma"
      },
      {
        "label": "B",
        "text": "sigma"
      },
      {
        "label": "C",
        "text": "c^2 * sigma"
      },
      {
        "label": "D",
        "text": "sigma + c"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Scaling every observation by c multiplies the standard deviation by c (and variance by c^2).",
    "explanationTamil": "ஒவ்வொரு உறுப்பையும் c ஆல் பெருக்கினால் திட்டவிலக்கம் c * sigma என மாறும்."
  },
  {
    "code": "MAT-356",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Standard Limit sin x / x",
    "difficulty": "easy",
    "questionText": "The value of lim (x -> 0) [sin(x) / x] (where x is in radians) is:",
    "questionTextTamil": "x ஆரையன்களில் இருக்கும்போது lim (x -> 0) [sin(x) / x] இன் மதிப்பு:",
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
        "text": "pi"
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
        "text": "முடிவிலி"
      },
      {
        "label": "D",
        "text": "pi"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Fundamental trigonometric limit: lim_{x->0} sin x / x = 1.",
    "explanationTamil": "அடிப்படை முக்கோணவியல் எல்லை: lim (x -> 0) sin(x)/x = 1."
  },
  {
    "code": "MAT-357",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Standard Limit tan x / x",
    "difficulty": "easy",
    "questionText": "The value of lim (x -> 0) [tan(x) / x] is:",
    "questionTextTamil": "lim (x -> 0) [tan(x) / x] இன் மதிப்பு:",
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
        "text": "முடிவிலி"
      },
      {
        "label": "D",
        "text": "-1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "lim (tan x / x) = lim (sin x / x) * (1 / cos x) = 1 * 1 = 1.",
    "explanationTamil": "lim (x -> 0) tan(x)/x = 1 ஆகும்."
  },
  {
    "code": "MAT-358",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Standard Limit e^x - 1 / x",
    "difficulty": "easy",
    "questionText": "The value of lim (x -> 0) [(e^x - 1) / x] is:",
    "questionTextTamil": "lim (x -> 0) [(e^x - 1) / x] இன் மதிப்பு:",
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
        "text": "e"
      },
      {
        "label": "D",
        "text": "ln(x)"
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
        "text": "e"
      },
      {
        "label": "D",
        "text": "ln(x)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard exponential limit: lim_{x->0} (e^x - 1)/x = 1.",
    "explanationTamil": "அடுக்குக்குறி எல்லை: lim (x -> 0) (e^x - 1)/x = 1."
  },
  {
    "code": "MAT-359",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Euler's Number e Limit",
    "difficulty": "easy",
    "questionText": "The value of lim (n -> infinity) (1 + 1/n)^n is:",
    "questionTextTamil": "lim (n -> infinity) (1 + 1/n)^n இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "e"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "infinity"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "e"
      },
      {
        "label": "B",
        "text": "1"
      },
      {
        "label": "C",
        "text": "முடிவிலி"
      },
      {
        "label": "D",
        "text": "0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Euler's constant e approx 2.71828 is defined as lim_{n->inf} (1 + 1/n)^n.",
    "explanationTamil": "ஆய்லர் மாறிலி e இன் வரையறை lim (n -> infinity) (1 + 1/n)^n = e."
  },
  {
    "code": "MAT-360",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Algebraic Limit Formula",
    "difficulty": "medium",
    "questionText": "The value of lim (x -> a) [(x^n - a^n) / (x - a)] is:",
    "questionTextTamil": "lim (x -> a) [(x^n - a^n) / (x - a)] இன் மதிப்பு:",
    "options": [
      {
        "label": "A",
        "text": "n * a^(n - 1)"
      },
      {
        "label": "B",
        "text": "a^n"
      },
      {
        "label": "C",
        "text": "n * a^n"
      },
      {
        "label": "D",
        "text": "a^(n - 1)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "n * a^(n - 1)"
      },
      {
        "label": "B",
        "text": "a^n"
      },
      {
        "label": "C",
        "text": "n * a^n"
      },
      {
        "label": "D",
        "text": "a^(n - 1)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard algebraic limit: lim_{x->a} (x^n - a^n)/(x - a) = n * a^(n-1).",
    "explanationTamil": "இயற்கணித எல்லை சூத்திரம்: n * a^(n - 1)."
  },
  {
    "code": "MAT-361",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Continuity at a Point",
    "difficulty": "easy",
    "questionText": "A function f(x) is continuous at x = a if and only if:",
    "questionTextTamil": "f(x) என்ற சார்பு x = a இல் தொடர்ச்சியானது எனில் நிறைவு செய்ய வேண்டிய நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "lim (x -> a) f(x) = f(a)"
      },
      {
        "label": "B",
        "text": "f(a) is defined only"
      },
      {
        "label": "C",
        "text": "lim (x -> a) f(x) exists only"
      },
      {
        "label": "D",
        "text": "f'(a) exists"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "lim (x -> a) f(x) = f(a)"
      },
      {
        "label": "B",
        "text": "f(a) வரையறுக்கப்பட்டால் மட்டும்"
      },
      {
        "label": "C",
        "text": "எல்லை இருந்தால் மட்டும்"
      },
      {
        "label": "D",
        "text": "f'(a) இருந்தால் மட்டும்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Continuity requires that the limit exists and equals the function value at that point.",
    "explanationTamil": "தொடர்ச்சித்தன்மை: எல்லை மதிப்பும் சார்பின் மதிப்பும் சமமாக இருக்க வேண்டும் lim f(x) = f(a)."
  },
  {
    "code": "MAT-362",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Differentiability implies Continuity",
    "difficulty": "easy",
    "questionText": "Which of the following statements is always true for any function f(x)?",
    "questionTextTamil": "எந்தவொரு சார்பு f(x) க்கும் பின்வரும் கூற்றுகளில் எது எப்போதும் மெய்யானது?",
    "options": [
      {
        "label": "A",
        "text": "If f is differentiable at x = a, then f is continuous at x = a"
      },
      {
        "label": "B",
        "text": "If f is continuous at x = a, then f is differentiable at x = a"
      },
      {
        "label": "C",
        "text": "Continuity and differentiability are equivalent"
      },
      {
        "label": "D",
        "text": "Differentiability has no relation to continuity"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "f வகையிடத்தக்கது எனில் அது அப்புள்ளியில் தொடர்ச்சியானது"
      },
      {
        "label": "B",
        "text": "f தொடர்ச்சியானது எனில் அது வகையிடத்தக்கது"
      },
      {
        "label": "C",
        "text": "தொடர்ச்சியும் வகையிடுதலும் சமமானவை"
      },
      {
        "label": "D",
        "text": "எந்த தொடர்பும் இல்லை"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Differentiability strictly implies continuity, but the converse is not always true (e.g., |x| at 0).",
    "explanationTamil": "வகையிடத்தக்க அனைத்து சார்புகளும் தொடர்ச்சியானவை, ஆனால் அதன் மறுதலை எப்போதும் உண்மையல்ல."
  },
  {
    "code": "MAT-363",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Derivative of sin x",
    "difficulty": "easy",
    "questionText": "The derivative of sin(x) with respect to x is:",
    "questionTextTamil": "x ஐப் பொறுத்து sin(x) இன் வகைக்கெழு:",
    "options": [
      {
        "label": "A",
        "text": "cos(x)"
      },
      {
        "label": "B",
        "text": "-cos(x)"
      },
      {
        "label": "C",
        "text": "sec^2(x)"
      },
      {
        "label": "D",
        "text": "-sin(x)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "cos(x)"
      },
      {
        "label": "B",
        "text": "-cos(x)"
      },
      {
        "label": "C",
        "text": "sec^2(x)"
      },
      {
        "label": "D",
        "text": "-sin(x)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "d/dx [sin(x)] = cos(x).",
    "explanationTamil": "d/dx [sin(x)] = cos(x)."
  },
  {
    "code": "MAT-364",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Derivative of cos x",
    "difficulty": "easy",
    "questionText": "The derivative of cos(x) with respect to x is:",
    "questionTextTamil": "x ஐப் பொறுத்து cos(x) இன் வகைக்கெழு:",
    "options": [
      {
        "label": "A",
        "text": "-sin(x)"
      },
      {
        "label": "B",
        "text": "sin(x)"
      },
      {
        "label": "C",
        "text": "-sec^2(x)"
      },
      {
        "label": "D",
        "text": "tan(x)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "-sin(x)"
      },
      {
        "label": "B",
        "text": "sin(x)"
      },
      {
        "label": "C",
        "text": "-sec^2(x)"
      },
      {
        "label": "D",
        "text": "tan(x)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "d/dx [cos(x)] = -sin(x).",
    "explanationTamil": "d/dx [cos(x)] = -sin(x)."
  },
  {
    "code": "MAT-365",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Derivative of tan x",
    "difficulty": "easy",
    "questionText": "The derivative of tan(x) with respect to x is:",
    "questionTextTamil": "x ஐப் பொறுத்து tan(x) இன் வகைக்கெழு:",
    "options": [
      {
        "label": "A",
        "text": "sec^2(x)"
      },
      {
        "label": "B",
        "text": "cot(x)"
      },
      {
        "label": "C",
        "text": "-sec^2(x)"
      },
      {
        "label": "D",
        "text": "sec(x)*tan(x)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "sec^2(x)"
      },
      {
        "label": "B",
        "text": "cot(x)"
      },
      {
        "label": "C",
        "text": "-sec^2(x)"
      },
      {
        "label": "D",
        "text": "sec(x)*tan(x)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "d/dx [tan(x)] = sec^2(x).",
    "explanationTamil": "d/dx [tan(x)] = sec^2(x)."
  },
  {
    "code": "MAT-366",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Slope-Intercept Form",
    "difficulty": "easy",
    "questionText": "The slope-intercept form of a straight line with slope m and y-intercept c is:",
    "questionTextTamil": "சாய்வு m மற்றும் y-வெட்டுத்துண்டு c கொண்ட நேர்க்கோட்டின் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "y = mx + c"
      },
      {
        "label": "B",
        "text": "x = my + c"
      },
      {
        "label": "C",
        "text": "y - y1 = m(x - x1)"
      },
      {
        "label": "D",
        "text": "x/a + y/b = 1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "y = mx + c"
      },
      {
        "label": "B",
        "text": "x = my + c"
      },
      {
        "label": "C",
        "text": "y - y1 = m(x - x1)"
      },
      {
        "label": "D",
        "text": "x/a + y/b = 1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard slope-intercept form: y = mx + c.",
    "explanationTamil": "சாய்வு-வெட்டுத்துண்டு வடிவம்: y = mx + c."
  },
  {
    "code": "MAT-367",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Intercept Form",
    "difficulty": "easy",
    "questionText": "The equation of a line having x-intercept a and y-intercept b is:",
    "questionTextTamil": "x-வெட்டுத்துண்டு a மற்றும் y-வெட்டுத்துண்டு b கொண்ட நேர்க்கோட்டின் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "x/a + y/b = 1"
      },
      {
        "label": "B",
        "text": "x/a - y/b = 1"
      },
      {
        "label": "C",
        "text": "ax + by = 1"
      },
      {
        "label": "D",
        "text": "x/b + y/a = 1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x/a + y/b = 1"
      },
      {
        "label": "B",
        "text": "x/a - y/b = 1"
      },
      {
        "label": "C",
        "text": "ax + by = 1"
      },
      {
        "label": "D",
        "text": "x/b + y/a = 1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard intercept form: x/a + y/b = 1.",
    "explanationTamil": "வெட்டுத்துண்டு வடிவம்: x/a + y/b = 1."
  },
  {
    "code": "MAT-368",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Distance from Point to Line",
    "difficulty": "easy",
    "questionText": "The perpendicular distance from a point (x1, y1) to the line Ax + By + C = 0 is:",
    "questionTextTamil": "(x1, y1) என்ற புள்ளியிலிருந்து Ax + By + C = 0 என்ற கோட்டிற்கு உள்ள செங்குத்து தொலைவு:",
    "options": [
      {
        "label": "A",
        "text": "|Ax1 + By1 + C| / sqrt(A^2 + B^2)"
      },
      {
        "label": "B",
        "text": "|Ax1 + By1 + C| / (A^2 + B^2)"
      },
      {
        "label": "C",
        "text": "|Ax1 + By1| / sqrt(A^2 + B^2)"
      },
      {
        "label": "D",
        "text": "Ax1 + By1 + C"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|Ax1 + By1 + C| / sqrt(A^2 + B^2)"
      },
      {
        "label": "B",
        "text": "|Ax1 + By1 + C| / (A^2 + B^2)"
      },
      {
        "label": "C",
        "text": "|Ax1 + By1| / sqrt(A^2 + B^2)"
      },
      {
        "label": "D",
        "text": "Ax1 + By1 + C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Distance formula: d = |Ax1 + By1 + C| / sqrt(A^2 + B^2).",
    "explanationTamil": "செங்குத்து தூர சூத்திரம்: d = |Ax1 + By1 + C| / sqrt(A^2 + B^2)."
  },
  {
    "code": "MAT-369",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Distance Between Parallel Lines",
    "difficulty": "medium",
    "questionText": "The distance between two parallel lines Ax + By + C1 = 0 and Ax + By + C2 = 0 is:",
    "questionTextTamil": "Ax + By + C1 = 0 மற்றும் Ax + By + C2 = 0 என்ற இரு இணை கோடுகளுக்கு இடைப்பட்ட தொலைவு:",
    "options": [
      {
        "label": "A",
        "text": "|C1 - C2| / sqrt(A^2 + B^2)"
      },
      {
        "label": "B",
        "text": "|C1 + C2| / sqrt(A^2 + B^2)"
      },
      {
        "label": "C",
        "text": "|C1 - C2| / (A^2 + B^2)"
      },
      {
        "label": "D",
        "text": "C1 - C2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|C1 - C2| / sqrt(A^2 + B^2)"
      },
      {
        "label": "B",
        "text": "|C1 + C2| / sqrt(A^2 + B^2)"
      },
      {
        "label": "C",
        "text": "|C1 - C2| / (A^2 + B^2)"
      },
      {
        "label": "D",
        "text": "C1 - C2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Distance between parallel lines: d = |C1 - C2| / sqrt(A^2 + B^2).",
    "explanationTamil": "இணை கோடுகளுக்கு இடைப்பட்ட தூரம்: d = |C1 - C2| / sqrt(A^2 + B^2)."
  },
  {
    "code": "MAT-370",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Angle Between Two Lines",
    "difficulty": "medium",
    "questionText": "The acute angle theta between two lines with slopes m1 and m2 is given by tan(theta) =",
    "questionTextTamil": "சாய்வுகள் m1 மற்றும் m2 கொண்ட இரு கோடுகளுக்கு இடைப்பட்ட குறுங்கோணம் theta எனில் tan(theta) =",
    "options": [
      {
        "label": "A",
        "text": "|(m1 - m2) / (1 + m1 * m2)|"
      },
      {
        "label": "B",
        "text": "|(m1 + m2) / (1 - m1 * m2)|"
      },
      {
        "label": "C",
        "text": "|m1 - m2|"
      },
      {
        "label": "D",
        "text": "1 + m1 * m2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|(m1 - m2) / (1 + m1 * m2)|"
      },
      {
        "label": "B",
        "text": "|(m1 + m2) / (1 - m1 * m2)|"
      },
      {
        "label": "C",
        "text": "|m1 - m2|"
      },
      {
        "label": "D",
        "text": "1 + m1 * m2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard angle formula: tan theta = |(m1 - m2) / (1 + m1 * m2)|.",
    "explanationTamil": "இரு கோடுகளுக்கு இடைப்பட்ட கோண சூத்திரம்: tan theta = |(m1 - m2) / (1 + m1 * m2)|."
  },
  {
    "code": "MAT-371",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Direction Cosines Relation",
    "difficulty": "easy",
    "questionText": "If l, m, n are the direction cosines of a directed line in space, then:",
    "questionTextTamil": "l, m, n ஆகியவை ஒரு நேர்க்கோட்டின் திசைக் கொசைன்கள் எனில்:",
    "options": [
      {
        "label": "A",
        "text": "l^2 + m^2 + n^2 = 1"
      },
      {
        "label": "B",
        "text": "l + m + n = 1"
      },
      {
        "label": "C",
        "text": "l^2 + m^2 = n^2"
      },
      {
        "label": "D",
        "text": "l * m * n = 1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "l^2 + m^2 + n^2 = 1"
      },
      {
        "label": "B",
        "text": "l + m + n = 1"
      },
      {
        "label": "C",
        "text": "l^2 + m^2 = n^2"
      },
      {
        "label": "D",
        "text": "l * m * n = 1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Fundamental direction cosine identity: cos^2 alpha + cos^2 beta + cos^2 gamma = l^2 + m^2 + n^2 = 1.",
    "explanationTamil": "திசைக் கொசைன்களின் அடிப்படைத் தொடர்பு: l^2 + m^2 + n^2 = 1."
  },
  {
    "code": "MAT-372",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Angle between Lines 3D",
    "difficulty": "medium",
    "questionText": "Two lines with direction cosines (l1, m1, n1) and (l2, m2, n2) are perpendicular if:",
    "questionTextTamil": "(l1, m1, n1) மற்றும் (l2, m2, n2) ஆகிய திசைக் கொசைன்களைக் கொண்ட இரு கோடுகள் செங்குத்தாக அமைய நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "l1*l2 + m1*m2 + n1*n2 = 0"
      },
      {
        "label": "B",
        "text": "l1/l2 = m1/m2 = n1/n2"
      },
      {
        "label": "C",
        "text": "l1*l2 = m1*m2 = n1*n2"
      },
      {
        "label": "D",
        "text": "l1 + m1 + n1 = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "l1*l2 + m1*m2 + n1*n2 = 0"
      },
      {
        "label": "B",
        "text": "l1/l2 = m1/m2 = n1/n2"
      },
      {
        "label": "C",
        "text": "l1*l2 = m1*m2 = n1*n2"
      },
      {
        "label": "D",
        "text": "l1 + m1 + n1 = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Perpendicularity in 3D: cos 90° = 0 => l1 l2 + m1 m2 + n1 n2 = 0.",
    "explanationTamil": "முப்பரிமாணத்தில் செங்குத்து நிபந்தனை: l1 l2 + m1 m2 + n1 n2 = 0."
  },
  {
    "code": "MAT-373",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Parallel Lines 3D",
    "difficulty": "easy",
    "questionText": "Two lines with direction ratios (a1, b1, c1) and (a2, b2, c2) are parallel if:",
    "questionTextTamil": "திசை விகிதங்கள் (a1, b1, c1) மற்றும் (a2, b2, c2) கொண்ட இரு கோடுகள் இணையாக இருக்க நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "a1/a2 = b1/b2 = c1/c2"
      },
      {
        "label": "B",
        "text": "a1*a2 + b1*b2 + c1*c2 = 0"
      },
      {
        "label": "C",
        "text": "a1 = a2 and b1 = b2"
      },
      {
        "label": "D",
        "text": "a1 + b1 + c1 = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a1/a2 = b1/b2 = c1/c2"
      },
      {
        "label": "B",
        "text": "a1*a2 + b1*b2 + c1*c2 = 0"
      },
      {
        "label": "C",
        "text": "a1 = a2 மற்றும் b1 = b2"
      },
      {
        "label": "D",
        "text": "a1 + b1 + c1 = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Parallel lines have proportional direction ratios: a1/a2 = b1/b2 = c1/c2.",
    "explanationTamil": "இணைக் கோடுகளின் திசை விகிதங்கள் விகிதசமத்தில் இருக்கும்: a1/a2 = b1/b2 = c1/c2."
  },
  {
    "code": "MAT-374",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Equation of Plane Normal Form",
    "difficulty": "medium",
    "questionText": "The vector equation of a plane at perpendicular distance p from origin with unit normal n_hat is:",
    "questionTextTamil": "ஆதியிலிருந்து செங்குத்து தொலைவு p மற்றும் அலகு செங்குத்து வெக்டர் n_hat கொண்ட தளத்தின் வெக்டர் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "r . n_hat = p"
      },
      {
        "label": "B",
        "text": "r x n_hat = p"
      },
      {
        "label": "C",
        "text": "r . n_hat = 0"
      },
      {
        "label": "D",
        "text": "r + n_hat = p"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "r . n_hat = p"
      },
      {
        "label": "B",
        "text": "r x n_hat = p"
      },
      {
        "label": "C",
        "text": "r . n_hat = 0"
      },
      {
        "label": "D",
        "text": "r + n_hat = p"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Normal form of plane: r . n_hat = p where p is distance from origin.",
    "explanationTamil": "தளத்தின் செங்குத்து வடிவம்: r . n_hat = p."
  },
  {
    "code": "MAT-375",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Distance of Point from Plane",
    "difficulty": "medium",
    "questionText": "The perpendicular distance of point (x1, y1, z1) from plane Ax + By + Cz + D = 0 is:",
    "questionTextTamil": "(x1, y1, z1) என்ற புள்ளியிலிருந்து Ax + By + Cz + D = 0 என்ற தளத்திற்கு உள்ள செங்குத்து தொலைவு:",
    "options": [
      {
        "label": "A",
        "text": "|Ax1 + By1 + Cz1 + D| / sqrt(A^2 + B^2 + C^2)"
      },
      {
        "label": "B",
        "text": "|Ax1 + By1 + Cz1 + D| / (A^2 + B^2 + C^2)"
      },
      {
        "label": "C",
        "text": "|Ax1 + By1 + Cz1|"
      },
      {
        "label": "D",
        "text": "Ax1 + By1 + Cz1 + D"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "|Ax1 + By1 + Cz1 + D| / sqrt(A^2 + B^2 + C^2)"
      },
      {
        "label": "B",
        "text": "|Ax1 + By1 + Cz1 + D| / (A^2 + B^2 + C^2)"
      },
      {
        "label": "C",
        "text": "|Ax1 + By1 + Cz1|"
      },
      {
        "label": "D",
        "text": "Ax1 + By1 + Cz1 + D"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard distance formula in 3D: d = |Ax1 + By1 + Cz1 + D| / sqrt(A^2 + B^2 + C^2).",
    "explanationTamil": "தளத்திலிருந்து புள்ளிக்கு உள்ள செங்குத்து தூரம்: |Ax1 + By1 + Cz1 + D| / sqrt(A^2 + B^2 + C^2)."
  },
  {
    "code": "MAT-376",
    "subject": "Mathematics",
    "chapter": "Linear Inequalities",
    "topic": "Multiplication by Negative Number",
    "difficulty": "easy",
    "questionText": "If a < b and c < 0, then multiplying both sides by c gives:",
    "questionTextTamil": "a < b மற்றும் c < 0 எனில் இருபுறமும் c ஆல் பெருக்கும்போது:",
    "options": [
      {
        "label": "A",
        "text": "a * c > b * c"
      },
      {
        "label": "B",
        "text": "a * c < b * c"
      },
      {
        "label": "C",
        "text": "a * c = b * c"
      },
      {
        "label": "D",
        "text": "a / c < b / c"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "a * c > b * c"
      },
      {
        "label": "B",
        "text": "a * c < b * c"
      },
      {
        "label": "C",
        "text": "a * c = b * c"
      },
      {
        "label": "D",
        "text": "a / c < b / c"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Multiplying or dividing an inequality by a negative number reverses the direction of inequality.",
    "explanationTamil": "குறை எண்ணால் பெருக்கும்போது சமனிலிக் குறி தலைகீழாக மாறும்: ac > bc."
  },
  {
    "code": "MAT-377",
    "subject": "Mathematics",
    "chapter": "Linear Inequalities",
    "topic": "Modulus Inequality",
    "difficulty": "easy",
    "questionText": "For a > 0, the inequality |x| < a is equivalent to:",
    "questionTextTamil": "a > 0 எனில் |x| < a என்ற சமனிலி எதற்கு சமமானது?",
    "options": [
      {
        "label": "A",
        "text": "-a < x < a"
      },
      {
        "label": "B",
        "text": "x > a or x < -a"
      },
      {
        "label": "C",
        "text": "x < a"
      },
      {
        "label": "D",
        "text": "x > -a"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "-a < x < a"
      },
      {
        "label": "B",
        "text": "x > a அல்லது x < -a"
      },
      {
        "label": "C",
        "text": "x < a"
      },
      {
        "label": "D",
        "text": "x > -a"
      }
    ],
    "correctAnswer": "A",
    "explanation": "|x| < a means the distance of x from 0 is less than a, i.e., -a < x < a.",
    "explanationTamil": "|x| < a என்பது -a < x < a என்பதற்கு சமமானது."
  },
  {
    "code": "MAT-378",
    "subject": "Mathematics",
    "chapter": "Linear Inequalities",
    "topic": "Modulus Greater Than",
    "difficulty": "easy",
    "questionText": "For a > 0, the inequality |x| > a is equivalent to:",
    "questionTextTamil": "a > 0 எனில் |x| > a என்ற சமனிலி எதற்கு சமமானது?",
    "options": [
      {
        "label": "A",
        "text": "x > a or x < -a"
      },
      {
        "label": "B",
        "text": "-a < x < a"
      },
      {
        "label": "C",
        "text": "x > a and x < -a"
      },
      {
        "label": "D",
        "text": "x = +- a"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x > a அல்லது x < -a"
      },
      {
        "label": "B",
        "text": "-a < x < a"
      },
      {
        "label": "C",
        "text": "x > a மற்றும் x < -a"
      },
      {
        "label": "D",
        "text": "x = +- a"
      }
    ],
    "correctAnswer": "A",
    "explanation": "|x| > a implies x lies outside the interval [-a, a], so x < -a or x > a.",
    "explanationTamil": "|x| > a என்பது x < -a அல்லது x > a என்பதைக் குறிக்கும்."
  },
  {
    "code": "MAT-379",
    "subject": "Mathematics",
    "chapter": "Mathematical Induction",
    "topic": "Principle of Mathematical Induction",
    "difficulty": "easy",
    "questionText": "The Principle of Mathematical Induction is used to prove statements for all:",
    "questionTextTamil": "கணிதத் தொகுத்தறிதல் முறை எந்த எண்களுக்கு கூற்றுகளை நிறுவப் பயன்படுகிறது?",
    "options": [
      {
        "label": "A",
        "text": "Natural numbers (n in N)"
      },
      {
        "label": "B",
        "text": "Real numbers (x in R)"
      },
      {
        "label": "C",
        "text": "Complex numbers"
      },
      {
        "label": "D",
        "text": "Rational numbers only"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "இயல் எண்கள் (n in N)"
      },
      {
        "label": "B",
        "text": "மெய் எண்கள் (x in R)"
      },
      {
        "label": "C",
        "text": "கலப்பெண்கள்"
      },
      {
        "label": "D",
        "text": "விகிதமுறு எண்கள் மட்டுமே"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Mathematical induction is a foundational proof technique applied over the well-ordered set of natural numbers N.",
    "explanationTamil": "கணிதத் தொகுத்தறிதல் முறை அனைத்து இயல் எண்களுக்கும் (n in N) கூற்றுகளை நிறுவப் பயன்படுகிறது."
  },
  {
    "code": "MAT-380",
    "subject": "Mathematics",
    "chapter": "Mathematical Induction",
    "topic": "Base Step",
    "difficulty": "easy",
    "questionText": "In proving P(n) by mathematical induction, the initial verification step is verifying:",
    "questionTextTamil": "கணிதத் தொகுத்தறிதலில் தொடக்கப் படியானது எதனை சரிபார்ப்பதை உள்ளடக்கியது?",
    "options": [
      {
        "label": "A",
        "text": "P(1) is true"
      },
      {
        "label": "B",
        "text": "P(k) is true"
      },
      {
        "label": "C",
        "text": "P(k + 1) is true"
      },
      {
        "label": "D",
        "text": "P(infinity) is true"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "P(1) மெய் என சரிபார்த்தல்"
      },
      {
        "label": "B",
        "text": "P(k) மெய் என சரிபார்த்தல்"
      },
      {
        "label": "C",
        "text": "P(k + 1) மெய் என சரிபார்த்தல்"
      },
      {
        "label": "D",
        "text": "P(முடிவிலி) மெய் என சரிபார்த்தல்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The base step verifies the truth of the statement for the smallest natural number, typically n = 1.",
    "explanationTamil": "அடிப்படைப் படி என்பது n = 1 இல் P(1) மெய் என நிறுவுவதாகும்."
  },
  {
    "code": "MAT-381",
    "subject": "Mathematics",
    "chapter": "Mathematical Induction",
    "topic": "Inductive Step",
    "difficulty": "easy",
    "questionText": "The inductive step assumes P(k) is true and uses it to prove that:",
    "questionTextTamil": "தொகுத்தறிதல் படியில் P(k) மெய் என ஏற்றுக்கொண்டு எதனை நிறுவ வேண்டும்?",
    "options": [
      {
        "label": "A",
        "text": "P(k + 1) is true"
      },
      {
        "label": "B",
        "text": "P(k - 1) is true"
      },
      {
        "label": "C",
        "text": "P(2k) is true"
      },
      {
        "label": "D",
        "text": "P(1) is false"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "P(k + 1) மெய் என நிறுவுதல்"
      },
      {
        "label": "B",
        "text": "P(k - 1) மெய் என நிறுவுதல்"
      },
      {
        "label": "C",
        "text": "P(2k) மெய் என நிறுவுதல்"
      },
      {
        "label": "D",
        "text": "P(1) பொய் என நிறுவுதல்"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The inductive hypothesis P(k) is used to deduce that P(k + 1) must also be true.",
    "explanationTamil": "P(k) மெய் என்ற எடுகோளைப் பயன்படுத்தி P(k + 1) மெய் என நிரூபிக்க வேண்டும்."
  },
  {
    "code": "MAT-382",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Collinearity of Three Points",
    "difficulty": "easy",
    "questionText": "Three points A, B, and C are collinear if and only if:",
    "questionTextTamil": "A, B, மற்றும் C ஆகிய மூன்று புள்ளிகள் ஒரே நேர்க்கோட்டமைய புள்ளிகளாக இருக்க நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "Slope of AB = Slope of BC (or Area of triangle ABC = 0)"
      },
      {
        "label": "B",
        "text": "AB + BC < AC"
      },
      {
        "label": "C",
        "text": "Slope of AB * Slope of BC = -1"
      },
      {
        "label": "D",
        "text": "Area of ABC = 1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "AB இன் சாய்வு = BC இன் சாய்வு (அல்லது முக்கோண பரப்பு = 0)"
      },
      {
        "label": "B",
        "text": "AB + BC < AC"
      },
      {
        "label": "C",
        "text": "AB சாய்வு * BC சாய்வு = -1"
      },
      {
        "label": "D",
        "text": "முக்கோண பரப்பு = 1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Collinear points share the same line, hence slope of AB = slope of BC and triangle area is 0.",
    "explanationTamil": "ஒரே கோட்டமை புள்ளிகள் சம சாய்வு பெற்றிருக்கும் மற்றும் முக்கோண பரப்பு பூஜ்ஜியமாகும்."
  },
  {
    "code": "MAT-383",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Centroid Formula",
    "difficulty": "easy",
    "questionText": "The coordinates of the centroid of a triangle with vertices (x1, y1), (x2, y2), (x3, y3) are:",
    "questionTextTamil": "(x1, y1), (x2, y2), (x3, y3) ஆகிய முனைகளைக் கொண்ட முக்கோணத்தின் நடுக்கோட்டு மையம் (centroid):",
    "options": [
      {
        "label": "A",
        "text": "((x1 + x2 + x3)/3, (y1 + y2 + y3)/3)"
      },
      {
        "label": "B",
        "text": "((x1 + x2)/2, (y1 + y2)/2)"
      },
      {
        "label": "C",
        "text": "((x1 + x2 + x3)/2, (y1 + y2 + y3)/2)"
      },
      {
        "label": "D",
        "text": "(x1*x2*x3, y1*y2*y3)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "((x1 + x2 + x3)/3, (y1 + y2 + y3)/3)"
      },
      {
        "label": "B",
        "text": "((x1 + x2)/2, (y1 + y2)/2)"
      },
      {
        "label": "C",
        "text": "((x1 + x2 + x3)/2, (y1 + y2 + y3)/2)"
      },
      {
        "label": "D",
        "text": "(x1*x2*x3, y1*y2*y3)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Centroid is the arithmetic mean of vertex coordinates: ((x1+x2+x3)/3, (y1+y2+y3)/3).",
    "explanationTamil": "நடுக்கோட்டு மையம் G = ((x1 + x2 + x3)/3, (y1 + y2 + y3)/3)."
  },
  {
    "code": "MAT-384",
    "subject": "Mathematics",
    "chapter": "Straight Lines",
    "topic": "Concurrent Lines",
    "difficulty": "medium",
    "questionText": "Three lines a1 x + b1 y + c1 = 0, a2 x + b2 y + c2 = 0, and a3 x + b3 y + c3 = 0 are concurrent if:",
    "questionTextTamil": "மூன்று நேர்க்கோடுகள் ஒரே புள்ளி வழிச் செல்லும் கோடுகளாக (concurrent) அமைய நிபந்தனை:",
    "options": [
      {
        "label": "A",
        "text": "The 3x3 determinant of their coefficients is 0"
      },
      {
        "label": "B",
        "text": "Their slopes are equal"
      },
      {
        "label": "C",
        "text": "c1 = c2 = c3"
      },
      {
        "label": "D",
        "text": "a1 + a2 + a3 = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "கெழுக்களின் 3x3 அணிக்கோவை மதிப்பு 0"
      },
      {
        "label": "B",
        "text": "அவற்றின் சாய்வுகள் சமம்"
      },
      {
        "label": "C",
        "text": "c1 = c2 = c3"
      },
      {
        "label": "D",
        "text": "a1 + a2 + a3 = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Lines intersect at a common point if and only if the determinant of coefficient matrix vanishes.",
    "explanationTamil": "மூன்று கோடுகள் ஒரே புள்ளியில் வெட்டிக்கொள்ள கெழுக்களின் அணிக்கோவை சுழியாக வேண்டும்."
  },
  {
    "code": "MAT-385",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Distance Between Two Points 3D",
    "difficulty": "easy",
    "questionText": "The distance between points P(x1, y1, z1) and Q(x2, y2, z2) in 3D space is:",
    "questionTextTamil": "முப்பரிமாணத்தில் P(x1, y1, z1) மற்றும் Q(x2, y2, z2) புள்ளிகளுக்கு இடைப்பட்ட தொலைவு:",
    "options": [
      {
        "label": "A",
        "text": "sqrt((x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2)"
      },
      {
        "label": "B",
        "text": "(x2 - x1) + (y2 - y1) + (z2 - z1)"
      },
      {
        "label": "C",
        "text": "sqrt((x2 + x1)^2 + (y2 + y1)^2)"
      },
      {
        "label": "D",
        "text": "(x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "sqrt((x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2)"
      },
      {
        "label": "B",
        "text": "(x2 - x1) + (y2 - y1) + (z2 - z1)"
      },
      {
        "label": "C",
        "text": "sqrt((x2 + x1)^2 + (y2 + y1)^2)"
      },
      {
        "label": "D",
        "text": "(x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Euclidean distance in 3D: d = sqrt((Delta x)^2 + (Delta y)^2 + (Delta z)^2).",
    "explanationTamil": "முப்பரிமாண தூர சூத்திரம்: sqrt((x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2)."
  },
  {
    "code": "MAT-386",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Section Formula 3D",
    "difficulty": "easy",
    "questionText": "The point dividing the line joining (x1, y1, z1) and (x2, y2, z2) internally in ratio m:n is:",
    "questionTextTamil": "(x1, y1, z1) மற்றும் (x2, y2, z2) புள்ளிகளை இணைக்கும் கோட்டை m:n என்ற விகிதத்தில் உட்புறமாகப் பிரிக்கும் புள்ளி:",
    "options": [
      {
        "label": "A",
        "text": "((m*x2 + n*x1)/(m+n), (m*y2 + n*y1)/(m+n), (m*z2 + n*z1)/(m+n))"
      },
      {
        "label": "B",
        "text": "((x1 + x2)/2, (y1 + y2)/2, (z1 + z2)/2)"
      },
      {
        "label": "C",
        "text": "((m*x1 + n*x2)/(m+n), (m*y1 + n*y2)/(m+n), (m*z1 + n*z2)/(m+n))"
      },
      {
        "label": "D",
        "text": "((m*x2 - n*x1)/(m-n), ... )"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "((m*x2 + n*x1)/(m+n), (m*y2 + n*y1)/(m+n), (m*z2 + n*z1)/(m+n))"
      },
      {
        "label": "B",
        "text": "((x1 + x2)/2, (y1 + y2)/2, (z1 + z2)/2)"
      },
      {
        "label": "C",
        "text": "((m*x1 + n*x2)/(m+n), (m*y1 + n*y2)/(m+n), (m*z1 + n*z2)/(m+n))"
      },
      {
        "label": "D",
        "text": "((m*x2 - n*x1)/(m-n), ... )"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Internal division section formula in 3D.",
    "explanationTamil": "உட்புறப் பிரிவு சூத்திரம்: ((m x2 + n x1)/(m + n), ...)."
  },
  {
    "code": "MAT-387",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Midpoint Formula 3D",
    "difficulty": "easy",
    "questionText": "The midpoint of the line segment joining (2, 4, 6) and (4, 6, 8) is:",
    "questionTextTamil": "(2, 4, 6) மற்றும் (4, 6, 8) புள்ளிகளை இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி:",
    "options": [
      {
        "label": "A",
        "text": "(3, 5, 7)"
      },
      {
        "label": "B",
        "text": "(6, 10, 14)"
      },
      {
        "label": "C",
        "text": "(1, 1, 1)"
      },
      {
        "label": "D",
        "text": "(2, 2, 2)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(3, 5, 7)"
      },
      {
        "label": "B",
        "text": "(6, 10, 14)"
      },
      {
        "label": "C",
        "text": "(1, 1, 1)"
      },
      {
        "label": "D",
        "text": "(2, 2, 2)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Midpoint = ((2+4)/2, (4+6)/2, (6+8)/2) = (3, 5, 7).",
    "explanationTamil": "நடுப்புள்ளி = ((2+4)/2, (4+6)/2, (6+8)/2) = (3, 5, 7)."
  },
  {
    "code": "MAT-388",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Sphere Equation in 3D",
    "difficulty": "easy",
    "questionText": "The equation of a sphere with center at the origin and radius r is:",
    "questionTextTamil": "ஆதியை மையமாகவும் r ஐ ஆரமாகவும் கொண்ட கோளத்தின் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "x^2 + y^2 + z^2 = r^2"
      },
      {
        "label": "B",
        "text": "x^2 + y^2 = r^2"
      },
      {
        "label": "C",
        "text": "x + y + z = r"
      },
      {
        "label": "D",
        "text": "x^2 + y^2 + z^2 = 2r"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x^2 + y^2 + z^2 = r^2"
      },
      {
        "label": "B",
        "text": "x^2 + y^2 = r^2"
      },
      {
        "label": "C",
        "text": "x + y + z = r"
      },
      {
        "label": "D",
        "text": "x^2 + y^2 + z^2 = 2r"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard sphere centered at origin: x^2 + y^2 + z^2 = r^2.",
    "explanationTamil": "ஆதியை மையமாகக் கொண்ட கோளத்தின் சமன்பாடு: x^2 + y^2 + z^2 = r^2."
  },
  {
    "code": "MAT-389",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Intercept Form of Plane",
    "difficulty": "easy",
    "questionText": "The equation of a plane with intercepts a, b, c on the x, y, and z axes respectively is:",
    "questionTextTamil": "x, y, z அச்சுகளில் முறையே a, b, c ஆகிய வெட்டுத்துண்டுகளைக் கொண்ட தளத்தின் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "x/a + y/b + z/c = 1"
      },
      {
        "label": "B",
        "text": "ax + by + cz = 1"
      },
      {
        "label": "C",
        "text": "x/a - y/b + z/c = 1"
      },
      {
        "label": "D",
        "text": "x + y + z = a + b + c"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x/a + y/b + z/c = 1"
      },
      {
        "label": "B",
        "text": "ax + by + cz = 1"
      },
      {
        "label": "C",
        "text": "x/a - y/b + z/c = 1"
      },
      {
        "label": "D",
        "text": "x + y + z = a + b + c"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Standard intercept form of a plane: x/a + y/b + z/c = 1.",
    "explanationTamil": "தளத்தின் வெட்டுத்துண்டு வடிவம்: x/a + y/b + z/c = 1."
  },
  {
    "code": "MAT-390",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Direction Cosines of x-axis",
    "difficulty": "easy",
    "questionText": "The direction cosines of the x-axis are:",
    "questionTextTamil": "x-அச்சின் திசைக் கொசைன்கள் யாவை?",
    "options": [
      {
        "label": "A",
        "text": "(1, 0, 0)"
      },
      {
        "label": "B",
        "text": "(0, 1, 0)"
      },
      {
        "label": "C",
        "text": "(0, 0, 1)"
      },
      {
        "label": "D",
        "text": "(1, 1, 1)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(1, 0, 0)"
      },
      {
        "label": "B",
        "text": "(0, 1, 0)"
      },
      {
        "label": "C",
        "text": "(0, 0, 1)"
      },
      {
        "label": "D",
        "text": "(1, 1, 1)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The x-axis makes angles 0°, 90°, 90° with axes, so direction cosines are (cos 0, cos 90, cos 90) = (1, 0, 0).",
    "explanationTamil": "x-அச்சு ஏற்படுத்தும் கோணங்கள் 0°, 90°, 90° என்பதால் திசைக் கொசைன்கள் (1, 0, 0)."
  },
  {
    "code": "MAT-391",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Direction Cosines of y-axis",
    "difficulty": "easy",
    "questionText": "The direction cosines of the y-axis are:",
    "questionTextTamil": "y-அச்சின் திசைக் கொசைன்கள் யாவை?",
    "options": [
      {
        "label": "A",
        "text": "(0, 1, 0)"
      },
      {
        "label": "B",
        "text": "(1, 0, 0)"
      },
      {
        "label": "C",
        "text": "(0, 0, 1)"
      },
      {
        "label": "D",
        "text": "(0, 1, 1)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(0, 1, 0)"
      },
      {
        "label": "B",
        "text": "(1, 0, 0)"
      },
      {
        "label": "C",
        "text": "(0, 0, 1)"
      },
      {
        "label": "D",
        "text": "(0, 1, 1)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The y-axis direction cosines are (0, 1, 0).",
    "explanationTamil": "y-அச்சின் திசைக் கொசைன்கள் (0, 1, 0) ஆகும்."
  },
  {
    "code": "MAT-392",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Direction Cosines of z-axis",
    "difficulty": "easy",
    "questionText": "The direction cosines of the z-axis are:",
    "questionTextTamil": "z-அச்சின் திசைக் கொசைன்கள் யாவை?",
    "options": [
      {
        "label": "A",
        "text": "(0, 0, 1)"
      },
      {
        "label": "B",
        "text": "(0, 1, 0)"
      },
      {
        "label": "C",
        "text": "(1, 0, 0)"
      },
      {
        "label": "D",
        "text": "(1, 1, 0)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "(0, 0, 1)"
      },
      {
        "label": "B",
        "text": "(0, 1, 0)"
      },
      {
        "label": "C",
        "text": "(1, 0, 0)"
      },
      {
        "label": "D",
        "text": "(1, 1, 0)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The z-axis direction cosines are (0, 0, 1).",
    "explanationTamil": "z-அச்சின் திசைக் கொசைன்கள் (0, 0, 1) ஆகும்."
  },
  {
    "code": "MAT-393",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Equation of xy-plane",
    "difficulty": "easy",
    "questionText": "The equation of the xy-plane in 3D Cartesian coordinates is:",
    "questionTextTamil": "முப்பரிமாண கார்ட்டீசியன் ஆய அமைப்பில் xy-தளத்தின் சமன்பாடு:",
    "options": [
      {
        "label": "A",
        "text": "z = 0"
      },
      {
        "label": "B",
        "text": "x = 0"
      },
      {
        "label": "C",
        "text": "y = 0"
      },
      {
        "label": "D",
        "text": "x + y = 0"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "z = 0"
      },
      {
        "label": "B",
        "text": "x = 0"
      },
      {
        "label": "C",
        "text": "y = 0"
      },
      {
        "label": "D",
        "text": "x + y = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "In the xy-plane, the z-coordinate of every point is zero: z = 0.",
    "explanationTamil": "xy-தளத்தில் உள்ள அனைத்து புள்ளிகளின் z-ஆயத்தொலைவு பூஜ்ஜியமாகும்: z = 0."
  },
  {
    "code": "MAT-394",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Equation of yz-plane",
    "difficulty": "easy",
    "questionText": "The equation of the yz-plane is:",
    "questionTextTamil": "yz-தளத்தின் சமன்பாடு யாது?",
    "options": [
      {
        "label": "A",
        "text": "x = 0"
      },
      {
        "label": "B",
        "text": "y = 0"
      },
      {
        "label": "C",
        "text": "z = 0"
      },
      {
        "label": "D",
        "text": "y = z"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "x = 0"
      },
      {
        "label": "B",
        "text": "y = 0"
      },
      {
        "label": "C",
        "text": "z = 0"
      },
      {
        "label": "D",
        "text": "y = z"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Every point in the yz-plane has an x-coordinate of 0: x = 0.",
    "explanationTamil": "yz-தளத்தில் x-ஆயத்தொலைவு பூஜ்ஜியமாகும்: x = 0."
  },
  {
    "code": "MAT-395",
    "subject": "Mathematics",
    "chapter": "Three Dimensional Geometry",
    "topic": "Equation of zx-plane",
    "difficulty": "easy",
    "questionText": "The equation of the zx-plane is:",
    "questionTextTamil": "zx-தளத்தின் சமன்பாடு யாது?",
    "options": [
      {
        "label": "A",
        "text": "y = 0"
      },
      {
        "label": "B",
        "text": "x = 0"
      },
      {
        "label": "C",
        "text": "z = 0"
      },
      {
        "label": "D",
        "text": "x + z = 1"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "y = 0"
      },
      {
        "label": "B",
        "text": "x = 0"
      },
      {
        "label": "C",
        "text": "z = 0"
      },
      {
        "label": "D",
        "text": "x + z = 1"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Every point in the zx-plane has y = 0.",
    "explanationTamil": "zx-தளத்தில் y-ஆயத்தொலைவு பூஜ்ஜியமாகும்: y = 0."
  },
  {
    "code": "MAT-396",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Derivative of e^x",
    "difficulty": "easy",
    "questionText": "The derivative of e^x with respect to x is:",
    "questionTextTamil": "x ஐப் பொறுத்து e^x இன் வகைக்கெழு:",
    "options": [
      {
        "label": "A",
        "text": "e^x"
      },
      {
        "label": "B",
        "text": "x * e^(x - 1)"
      },
      {
        "label": "C",
        "text": "e^(x + 1)"
      },
      {
        "label": "D",
        "text": "ln(x)"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "e^x"
      },
      {
        "label": "B",
        "text": "x * e^(x - 1)"
      },
      {
        "label": "C",
        "text": "e^(x + 1)"
      },
      {
        "label": "D",
        "text": "ln(x)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "The natural exponential function is its own derivative: d/dx(e^x) = e^x.",
    "explanationTamil": "அடுக்குக்குறி சார்பின் வகைக்கெழு அதுவேயாகும்: d/dx(e^x) = e^x."
  },
  {
    "code": "MAT-397",
    "subject": "Mathematics",
    "chapter": "Limits and Continuity",
    "topic": "Derivative of ln x",
    "difficulty": "easy",
    "questionText": "The derivative of ln(x) for x > 0 is:",
    "questionTextTamil": "x > 0 எனில் ln(x) இன் வகைக்கெழு:",
    "options": [
      {
        "label": "A",
        "text": "1 / x"
      },
      {
        "label": "B",
        "text": "e^x"
      },
      {
        "label": "C",
        "text": "1 / x^2"
      },
      {
        "label": "D",
        "text": "-1 / x"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "1 / x"
      },
      {
        "label": "B",
        "text": "e^x"
      },
      {
        "label": "C",
        "text": "1 / x^2"
      },
      {
        "label": "D",
        "text": "-1 / x"
      }
    ],
    "correctAnswer": "A",
    "explanation": "d/dx [ln(x)] = 1/x for x > 0.",
    "explanationTamil": "d/dx [ln(x)] = 1/x ஆகும்."
  },
  {
    "code": "MAT-398",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Integral of 1/x",
    "difficulty": "easy",
    "questionText": "The indefinite integral of (1/x) dx for x != 0 is:",
    "questionTextTamil": "x != 0 எனில் (1/x) dx இன் தொகையீடு:",
    "options": [
      {
        "label": "A",
        "text": "ln|x| + C"
      },
      {
        "label": "B",
        "text": "-1 / x^2 + C"
      },
      {
        "label": "C",
        "text": "e^x + C"
      },
      {
        "label": "D",
        "text": "x^0 + C"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "ln|x| + C"
      },
      {
        "label": "B",
        "text": "-1 / x^2 + C"
      },
      {
        "label": "C",
        "text": "e^x + C"
      },
      {
        "label": "D",
        "text": "x^0 + C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "integral (1/x) dx = ln|x| + C.",
    "explanationTamil": "integral (1/x) dx = ln|x| + C ஆகும்."
  },
  {
    "code": "MAT-399",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Integral of e^x",
    "difficulty": "easy",
    "questionText": "The indefinite integral of e^x dx is:",
    "questionTextTamil": "e^x dx இன் தொகையீடு:",
    "options": [
      {
        "label": "A",
        "text": "e^x + C"
      },
      {
        "label": "B",
        "text": "e^(x + 1) / (x + 1) + C"
      },
      {
        "label": "C",
        "text": "x * e^x + C"
      },
      {
        "label": "D",
        "text": "ln|e^x| + C"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "e^x + C"
      },
      {
        "label": "B",
        "text": "e^(x + 1) / (x + 1) + C"
      },
      {
        "label": "C",
        "text": "x * e^x + C"
      },
      {
        "label": "D",
        "text": "ln|e^x| + C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "integral e^x dx = e^x + C.",
    "explanationTamil": "integral e^x dx = e^x + C ஆகும்."
  },
  {
    "code": "MAT-400",
    "subject": "Mathematics",
    "chapter": "Integral Calculus",
    "topic": "Integral of cos x",
    "difficulty": "easy",
    "questionText": "The indefinite integral of cos(x) dx is:",
    "questionTextTamil": "cos(x) dx இன் தொகையீடு:",
    "options": [
      {
        "label": "A",
        "text": "sin(x) + C"
      },
      {
        "label": "B",
        "text": "-sin(x) + C"
      },
      {
        "label": "C",
        "text": "tan(x) + C"
      },
      {
        "label": "D",
        "text": "sec(x) + C"
      }
    ],
    "optionsTamil": [
      {
        "label": "A",
        "text": "sin(x) + C"
      },
      {
        "label": "B",
        "text": "-sin(x) + C"
      },
      {
        "label": "C",
        "text": "tan(x) + C"
      },
      {
        "label": "D",
        "text": "sec(x) + C"
      }
    ],
    "correctAnswer": "A",
    "explanation": "integral cos(x) dx = sin(x) + C.",
    "explanationTamil": "integral cos(x) dx = sin(x) + C ஆகும்."
  }
];
