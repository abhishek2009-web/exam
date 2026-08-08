export const EXAM_CATEGORIES = [
  {
    id: 'engineering',
    name: 'Engineering & Tech',
    icon: 'Cpu',
    color: '#00f2fe',
    bgGradient: 'from-cyan-500/20 to-blue-600/20',
    borderColor: 'rgba(0, 242, 254, 0.3)',
    exams: [
      {
        id: 'jee_main',
        name: 'JEE Main 2026',
        fullName: 'Joint Entrance Examination (Main)',
        markingScheme: '+4 for Correct, -1 for Incorrect',
        durationMinutes: 180,
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        badge: 'Engineering',
        theme: 'cyan',
        targetLabel: 'Target Percentile: 99.8+',
        accentColor: '#00f2fe'
      },
      {
        id: 'jee_adv',
        name: 'JEE Advanced',
        fullName: 'Joint Entrance Examination (Advanced)',
        markingScheme: 'Partial / Negative Marking (+4/-2 or +3/-1)',
        durationMinutes: 180,
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        badge: 'IIT Entrance',
        theme: 'purple',
        targetLabel: 'Target Rank: Top 1000',
        accentColor: '#a855f7'
      },
      {
        id: 'gate',
        name: 'GATE 2026',
        fullName: 'Graduate Aptitude Test in Engineering',
        markingScheme: '+1 / +2 Marks (-0.33 / -0.66 for MCQs)',
        durationMinutes: 180,
        subjects: ['General Aptitude', 'Engineering Mathematics', 'Core Branch (CS/EC/ME)'],
        badge: 'M.Tech / PSUs',
        theme: 'emerald',
        targetLabel: 'Target GATE Score: 850+',
        accentColor: '#10b981'
      },
      {
        id: 'bitsat',
        name: 'BITSAT',
        fullName: 'Birla Institute of Technology & Science Admission Test',
        markingScheme: '+3 for Correct, -1 for Incorrect',
        durationMinutes: 180,
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'English & LR'],
        badge: 'BIT Entrance',
        theme: 'amber',
        targetLabel: 'Target Score: 340+/390',
        accentColor: '#f59e0b'
      }
    ]
  },
  {
    id: 'medical',
    name: 'Medical & Healthcare',
    icon: 'Stethoscope',
    color: '#10b981',
    bgGradient: 'from-emerald-500/20 to-teal-600/20',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    exams: [
      {
        id: 'neet_ug',
        name: 'NEET UG 2026',
        fullName: 'National Eligibility cum Entrance Test (UG)',
        markingScheme: '+4 for Correct, -1 for Incorrect',
        durationMinutes: 200,
        subjects: ['Botany', 'Zoology', 'Chemistry', 'Physics'],
        badge: 'MBBS / BDS',
        theme: 'emerald',
        targetLabel: 'Target Score: 680+/720',
        accentColor: '#10b981'
      },
      {
        id: 'neet_pg',
        name: 'NEET PG / INI-CET',
        fullName: 'Post Graduate Medical Entrance Test',
        markingScheme: '+4 for Correct, -1 for Incorrect',
        durationMinutes: 210,
        subjects: ['Clinical Subjects', 'Pre-Clinical', 'Para-Clinical'],
        badge: 'MD / MS Specialist',
        theme: 'teal',
        targetLabel: 'Target Rank: AIR < 500',
        accentColor: '#14b8a6'
      }
    ]
  },
  {
    id: 'civil_services',
    name: 'Civil Services & Defence',
    icon: 'Landmark',
    color: '#fbbf24',
    bgGradient: 'from-amber-500/20 to-orange-600/20',
    borderColor: 'rgba(251, 191, 36, 0.3)',
    exams: [
      {
        id: 'upsc_cse',
        name: 'UPSC CSE (IAS/IPS)',
        fullName: 'Union Public Service Commission Civil Services Exam',
        markingScheme: '+2 for Correct (GS-1), -0.66 for Incorrect',
        durationMinutes: 120,
        subjects: ['Indian Polity', 'Modern History', 'Economy', 'Geography', 'Environment & Science', 'CSAT'],
        badge: 'IAS / IPS / IFS',
        theme: 'amber',
        targetLabel: 'Target GS-1 Cutoff: 110+',
        accentColor: '#fbbf24'
      },
      {
        id: 'nda',
        name: 'NDA & NA',
        fullName: 'National Defence Academy & Naval Academy Exam',
        markingScheme: '+2.5 (Maths) / +4 (GAT), Negative applicable',
        durationMinutes: 150,
        subjects: ['Mathematics', 'English', 'General Knowledge'],
        badge: 'Armed Forces Officer',
        theme: 'orange',
        targetLabel: 'Target Written: 450+/900',
        accentColor: '#f97316'
      },
      {
        id: 'cds',
        name: 'CDS Exam',
        fullName: 'Combined Defence Services Examination',
        markingScheme: '+1 for Correct, -0.33 for Incorrect',
        durationMinutes: 120,
        subjects: ['English', 'General Knowledge', 'Elementary Mathematics'],
        badge: 'Defence Wings',
        theme: 'red',
        targetLabel: 'Target Score: 140+/300',
        accentColor: '#ef4444'
      }
    ]
  },
  {
    id: 'management',
    name: 'Management & Business',
    icon: 'TrendingUp',
    color: '#e100ff',
    bgGradient: 'from-fuchsia-500/20 to-purple-600/20',
    borderColor: 'rgba(225, 0, 255, 0.3)',
    exams: [
      {
        id: 'cat',
        name: 'CAT 2026',
        fullName: 'Common Admission Test (IIMs)',
        markingScheme: '+3 for Correct, -1 for Incorrect (MCQs)',
        durationMinutes: 120,
        subjects: ['VARC (Verbal)', 'DILR (Data & Logic)', 'QA (Quantitative)'],
        badge: 'IIM MBA Entrance',
        theme: 'purple',
        targetLabel: 'Target Percentile: 99.5+ %ile',
        accentColor: '#e100ff'
      },
      {
        id: 'xat',
        name: 'XAT / NMAT',
        fullName: 'Xavier Aptitude Test & NMAT',
        markingScheme: '+1 for Correct, -0.25 for Incorrect',
        durationMinutes: 175,
        subjects: ['Decision Making', 'Verbal Ability', 'Quant & DI', 'General Knowledge'],
        badge: 'XLRI Entrance',
        theme: 'pink',
        targetLabel: 'Target Percentile: 98.5+',
        accentColor: '#ec4899'
      }
    ]
  },
  {
    id: 'law',
    name: 'Law & Humanities',
    icon: 'Scale',
    color: '#3b82f6',
    bgGradient: 'from-blue-500/20 to-indigo-600/20',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    exams: [
      {
        id: 'clat',
        name: 'CLAT 2026',
        fullName: 'Common Law Admission Test (NLUs)',
        markingScheme: '+1 for Correct, -0.25 for Incorrect',
        durationMinutes: 120,
        subjects: ['Legal Reasoning', 'Logical Reasoning', 'English', 'Current Affairs', 'Quantitative Techniques'],
        badge: 'NLU Admissions',
        theme: 'blue',
        targetLabel: 'Target Rank: Top 100 NLU',
        accentColor: '#3b82f6'
      }
    ]
  },
  {
    id: 'banking_gov',
    name: 'Government & Banking',
    icon: 'Building2',
    color: '#06b6d4',
    bgGradient: 'from-cyan-600/20 to-blue-700/20',
    borderColor: 'rgba(6, 182, 212, 0.3)',
    exams: [
      {
        id: 'ssc_cgl',
        name: 'SSC CGL 2026',
        fullName: 'Staff Selection Commission Combined Graduate Level',
        markingScheme: '+2 for Correct, -0.50 for Incorrect (Tier 1)',
        durationMinutes: 60,
        subjects: ['Reasoning', 'General Awareness', 'Quantitative Aptitude', 'English Comprehension'],
        badge: 'Central Gov Inspector',
        theme: 'cyan',
        targetLabel: 'Target Score: 160+/200',
        accentColor: '#06b6d4'
      },
      {
        id: 'ibps_po',
        name: 'IBPS / SBI PO',
        fullName: 'Probationary Officer Bank Entrance',
        markingScheme: '+1 for Correct, -0.25 for Incorrect',
        durationMinutes: 60,
        subjects: ['English Language', 'Quantitative Aptitude', 'Reasoning Ability'],
        badge: 'Bank Officer',
        theme: 'teal',
        targetLabel: 'Target Cutoff: +15 over cutoff',
        accentColor: '#14b8a6'
      }
    ]
  },
  {
    id: 'global',
    name: 'Global & Overseas',
    icon: 'Globe',
    color: '#8b5cf6',
    bgGradient: 'from-violet-500/20 to-purple-700/20',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    exams: [
      {
        id: 'gre',
        name: 'GRE General Test',
        fullName: 'Graduate Record Examination (US/Global)',
        markingScheme: 'Adaptive Scoring (130-170 scale per section)',
        durationMinutes: 115,
        subjects: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing (AWA)'],
        badge: 'Global MS / PhD',
        theme: 'purple',
        targetLabel: 'Target GRE Score: 330+',
        accentColor: '#8b5cf6'
      }
    ]
  }
];

export const getExamById = (examId) => {
  for (const cat of EXAM_CATEGORIES) {
    const found = cat.exams.find(e => e.id === examId);
    if (found) return { ...found, categoryId: cat.id, categoryName: cat.name };
  }
  return EXAM_CATEGORIES[0].exams[0];
};
