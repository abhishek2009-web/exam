export const MOCK_TESTS = [
  {
    id: 'test_jee_01',
    examId: 'jee_main',
    title: 'JEE Main 2026 Full Mock Test — Physics & Chem Focus',
    timeLimitMinutes: 15,
    markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
    questions: [
      {
        id: 'q_jee_1',
        subject: 'Physics',
        question: 'An electron is accelerated through a potential difference of 100 V. What is its de-Broglie wavelength (approx)?',
        options: [
          'A) 1.227 Å',
          'B) 12.27 Å',
          'C) 0.1227 Å',
          'D) 122.7 Å'
        ],
        correctIndex: 0,
        explanation: 'Formula λ = 12.27 / √V Å. For V = 100V, √V = 10. Thus λ = 12.27 / 10 = 1.227 Å.'
      },
      {
        id: 'q_jee_2',
        subject: 'Chemistry',
        question: 'Which of the following compounds undergoes SN1 reaction at the FASTEST rate?',
        options: [
          'A) CH3-Cl',
          'B) (CH3)2CH-Cl',
          'C) (CH3)3C-Cl',
          'D) CH3-CH2-Cl'
        ],
        correctIndex: 2,
        explanation: '(CH3)3C-Cl (tert-butyl chloride) forms a 3° carbocation which is stabilized by hyperconjugation and +I effect, making SN1 fastest.'
      },
      {
        id: 'q_jee_3',
        subject: 'Mathematics',
        question: 'Evaluate lim (x→0) (sin x - x) / x³',
        options: [
          'A) -1/6',
          'B) 1/6',
          'C) 0',
          'D) -1/3'
        ],
        correctIndex: 0,
        explanation: 'Using Taylor expansion: sin x = x - x³/6 + x⁵/120... Thus (sin x - x)/x³ = -1/6 + x²/120... As x→0, result is -1/6.'
      }
    ]
  },
  {
    id: 'test_neet_01',
    examId: 'neet_ug',
    title: 'NEET UG Biology & Physics Challenge',
    timeLimitMinutes: 15,
    markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
    questions: [
      {
        id: 'q_neet_1',
        subject: 'Botany',
        question: 'The enzyme responsible for primary carbon fixation in C4 plants is:',
        options: [
          'A) RuBisCO',
          'B) PEP Carboxylase',
          'C) Carbonic Anhydrase',
          'D) Pyruvate Dehydrogenase'
        ],
        correctIndex: 1,
        explanation: 'In C4 plants (e.g. Maize, Sugarcane), initial CO2 fixation occurs in mesophyll cells catalyzed by PEP Carboxylase (PEPcase) forming Oxaloacetic acid (4C).'
      },
      {
        id: 'q_neet_2',
        subject: 'Zoology',
        question: 'Which hormone is secreted by the Corpus Luteum to maintain the endometrium for pregnancy?',
        options: [
          'A) Estrogen',
          'B) Progesterone',
          'C) LH',
          'D) FSH'
        ],
        correctIndex: 1,
        explanation: 'Corpus Luteum secretes high amounts of Progesterone which is essential for maintenance of the endometrial lining of the uterus.'
      }
    ]
  },
  {
    id: 'test_upsc_01',
    examId: 'upsc_cse',
    title: 'UPSC CSE GS Paper-1 Mini Mock',
    timeLimitMinutes: 10,
    markingScheme: { correct: 2, incorrect: -0.66, unattempted: 0 },
    questions: [
      {
        id: 'q_upsc_1',
        subject: 'Indian Polity',
        question: 'Which of the following Writs can be issued against private individuals as well as public authorities?',
        options: [
          'A) Mandamus',
          'B) Habeas Corpus',
          'C) Certiorari',
          'D) Quo-Warranto'
        ],
        correctIndex: 1,
        explanation: 'Habeas Corpus is the only writ that can be issued against both public entities and private individuals to remedy illegal detention.'
      },
      {
        id: 'q_upsc_2',
        subject: 'Economy',
        question: 'If the Reserve Bank of India (RBI) decides to adopt an expansionary monetary policy, which of the following will it NOT do?',
        options: [
          'A) Cut Statutory Liquidity Ratio (SLR)',
          'B) Increase Cash Reserve Ratio (CRR)',
          'C) Decrease Repo Rate',
          'D) Buy government securities in open market'
        ],
        correctIndex: 1,
        explanation: 'Increasing CRR withdraws money from banks and contracts credit. For expansionary policy, RBI DECREASES CRR.'
      }
    ]
  },
  {
    id: 'test_cat_01',
    examId: 'cat',
    title: 'CAT QA & DILR Speed Drill',
    timeLimitMinutes: 10,
    markingScheme: { correct: 3, incorrect: -1, unattempted: 0 },
    questions: [
      {
        id: 'q_cat_1',
        subject: 'Quantitative Aptitude',
        question: 'Two runners A and B start simultaneously on a circular track of 600m with speeds 15 m/s and 10 m/s in OPPOSITE directions. When will they meet for the first time?',
        options: [
          'A) 24 seconds',
          'B) 60 seconds',
          'C) 120 seconds',
          'D) 40 seconds'
        ],
        correctIndex: 0,
        explanation: 'Relative speed in opposite directions = 15 + 10 = 25 m/s. Time to meet = 600 / 25 = 24 seconds.'
      }
    ]
  }
];
