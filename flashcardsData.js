export const INITIAL_FLASHCARDS = [
  // JEE FLASHCARDS
  {
    id: 'fc_jee_01',
    examId: 'jee_main',
    subject: 'Physics',
    chapter: 'Electrostatics',
    front: 'What is the Electric Field inside a uniformly charged conducting solid sphere of radius R?',
    back: 'Zero! Inside any conductor in electrostatic equilibrium, electric field E = 0. All charge resides on the outer surface.',
    difficulty: 'Medium',
    tags: ['Electrostatics', 'Gauss Law']
  },
  {
    id: 'fc_jee_02',
    examId: 'jee_main',
    subject: 'Mathematics',
    chapter: 'Calculus — Integration',
    front: 'What is ∫ (e^x)(f(x) + f\'(x)) dx ?',
    back: 'e^x · f(x) + C. Standard JEE Integration shortcut formula!',
    difficulty: 'Easy',
    tags: ['Integration', 'Calculus']
  },
  {
    id: 'fc_jee_03',
    examId: 'jee_main',
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    front: 'What is the hybridization and molecular geometry of SF4 and XeF4?',
    back: '• SF4: sp³d hybridization, See-Saw shape (1 lone pair).\n• XeF4: sp³d² hybridization, Square Planar shape (2 lone pairs).',
    difficulty: 'Hard',
    tags: ['VSEPR', 'Hybridization']
  },

  // NEET FLASHCARDS
  {
    id: 'fc_neet_01',
    examId: 'neet_ug',
    subject: 'Botany',
    chapter: 'Cell Cycle & Cell Division',
    front: 'At which phase of Meiosis does Crossing Over occur?',
    back: 'Pachytene stage of Prophase I. Mediated by the enzyme Recombinase resulting in synaptonemal complex resolution at Diplotene.',
    difficulty: 'Medium',
    tags: ['Cell Biology', 'Genetics']
  },
  {
    id: 'fc_neet_02',
    examId: 'neet_ug',
    subject: 'Zoology',
    chapter: 'Human Physiology — Circulation',
    front: 'What causes the "LUBB" and "DUPP" heart sounds?',
    back: '• LUBB (First sound): Closure of AV valves (Tricuspid & Bicuspid) at start of ventricular systole.\n• DUPP (Second sound): Closure of Semilunar valves at start of ventricular diastole.',
    difficulty: 'Easy',
    tags: ['Heart Sounds', 'Circulation']
  },

  // UPSC FLASHCARDS
  {
    id: 'fc_upsc_01',
    examId: 'upsc_cse',
    subject: 'Indian Polity',
    chapter: 'Preamble & Fundamental Duties',
    front: 'Which 3 words were added to the Preamble of the Indian Constitution by the 42nd Amendment Act, 1976?',
    back: '1. Socialist\n2. Secular\n3. Integrity',
    difficulty: 'Medium',
    tags: ['Preamble', '42nd Amendment']
  },
  {
    id: 'fc_upsc_02',
    examId: 'upsc_cse',
    subject: 'Economy',
    chapter: 'Monetary Policy & RBI',
    front: 'What happens to money supply when RBI INCREASES the Cash Reserve Ratio (CRR)?',
    back: 'Money supply DECREASES! Commercial banks must keep more cash with RBI, reducing their lending capacity and liquidity in the market.',
    difficulty: 'Hard',
    tags: ['Monetary Policy', 'RBI']
  },

  // CAT FLASHCARDS
  {
    id: 'fc_cat_01',
    examId: 'cat',
    subject: 'Quantitative Aptitude',
    chapter: 'Number System',
    front: 'What is the unit digit of 7^(2026)?',
    back: 'Cyclicity of 7 is 4 (7, 9, 3, 1). 2026 mod 4 = 2. Therefore, unit digit is 7² = 9.',
    difficulty: 'Medium',
    tags: ['Cyclicity', 'Modulus']
  },

  // GATE FLASHCARDS
  {
    id: 'fc_gate_01',
    examId: 'gate',
    subject: 'Core Branch (CS/EC)',
    chapter: 'Operating Systems',
    front: 'What are the 4 necessary conditions for Deadlock to occur in an OS?',
    back: '1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait',
    difficulty: 'Hard',
    tags: ['Deadlock', 'OS']
  }
];
