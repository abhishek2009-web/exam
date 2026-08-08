export const INITIAL_NOTES = [
  // JEE MAIN & ADVANCED NOTES
  {
    id: 'note_jee_01',
    examId: 'jee_main',
    subject: 'Physics',
    chapter: 'Modern Physics & Photoelectric Effect',
    title: 'Photoelectric Effect & Einstein Equation',
    readTime: '6 min read',
    highYieldTag: 'JEE Top 5% Weightage',
    summary: 'Einstein photoelectric equation: E = hν = W₀ + K_max. Maximum kinetic energy depends only on frequency, not intensity.',
    content: `
# Einstein Photoelectric Equation & Key Results

### 1. Fundamental Equations
The incident photon energy is converted into work function ($W_0$) and kinetic energy of emitted photoelectrons:

$$E = h\\nu = h\\frac{c}{\\lambda} = W_0 + K_{\\text{max}}$$

where:
- **Work Function ($W_0$)**: Minimum energy needed to eject an electron ($W_0 = h\\nu_0 = \\frac{hc}{\\lambda_0}$).
- **Stopping Potential ($V_0$)**: $K_{\\text{max}} = e V_0$.

### 2. High-Yield Key Rules
1. **Intensity Effect**: Saturation photocurrent is directly proportional to incident light intensity.
2. **Frequency Effect**: Stopping potential ($V_0$) increases linearly with light frequency $\\nu$.
3. **Threshold Frequency ($\\nu_0$)**: If $\\nu < \\nu_0$, NO photoemission occurs, regardless of intensity.
4. **Time Lag**: Photoelectric emission is an instantaneous process (< $10^{-9}$ seconds).

### 💡 High-Yield Formula Cheat Sheet
- **de-Broglie wavelength of electron accelerated through $V$ volts**:
  $$\\lambda = \\frac{12.27}{\\sqrt{V}} \\text{ Å}$$
- **Photon flux ($N$)**:
  $$N = \\frac{P}{h\\nu} = \\frac{P \\lambda}{hc}$$
    `,
    formulas: [
      'E = hν = W₀ + K_max',
      'K_max = e V₀',
      'λ_deBroglie = h / p = 12.27 / √V Å'
    ],
    keyPoints: [
      'Saturation current is proportional to light intensity.',
      'Stopping potential depends strictly on frequency, NOT intensity.',
      'No emission if frequency is below threshold frequency (ν₀).'
    ]
  },
  {
    id: 'note_jee_02',
    examId: 'jee_main',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry — Reaction Mechanisms',
    title: 'SN1 vs SN2 Substitution Mechanisms',
    readTime: '8 min read',
    highYieldTag: 'Guaranteed 2 Questions in JEE',
    summary: 'SN1 is two-step with carbocation intermediate & racemization; SN2 is single-step transition state with Walden inversion.',
    content: `
# SN1 vs SN2 Nucleophilic Substitution

### 1. Reaction Comparison Table

| Property | SN1 Mechanism | SN2 Mechanism |
| :--- | :--- | :--- |
| **Kinetics** | Unimolecular Rate = $k[R-X]$ | Bimolecular Rate = $k[R-X][Nu^-]$ |
| **Steps** | 2 Steps via Carbocation | 1 Step via Transition State |
| **Substrate Order** | $3^\circ > 2^\circ > 1^\circ$ (Carbocation stability) | $1^\circ > 2^\circ > 3^\circ$ (Steric hindrance) |
| **Stereochemistry** | Racemization (Front + Back attack) | 100% Inversion of Configuration |
| **Solvent** | Polar Protic ($H_2O, EtOH, MeOH$) | Polar Aprotic ($DMSO, DMF, Acetone$) |
| **Nucleophile** | Weak nucleophile ($H_2O, ROH$) | Strong nucleophile ($CN^-, I^-, OH^-$) |

### 2. Carbocation Rearrangement in SN1
Always check for **1,2-Hydride shift** or **1,2-Methyl shift** to form a more stable carbocation ($3^\circ > 2^\circ > 1^\circ$).

### 💡 Golden Rule for JEE
Solvent matters! Polar Aprotic solvents (like DMSO, acetone) dramatically accelerate SN2 by leaving nucleophiles un-solvated and reactive.
    `,
    formulas: [
      'SN1 Rate = k[R-X] (Independent of nucleophile conc.)',
      'SN2 Rate = k[R-X][Nu⁻] (Bimolecular)',
      'Carbocation Stability: 3° > 2° > 1° > Methyl'
    ],
    keyPoints: [
      'SN1 forms carbocation intermediate; can undergo 1,2-shifts.',
      'SN2 shows complete Walden Inversion of configuration.',
      'Polar protic solvents favor SN1; Polar aprotic favor SN2.'
    ]
  },

  // NEET UG NOTES
  {
    id: 'note_neet_01',
    examId: 'neet_ug',
    subject: 'Botany',
    chapter: 'Genetics & Molecular Basis of Inheritance',
    title: 'DNA Replication & Enzymatic Machinery',
    readTime: '7 min read',
    highYieldTag: 'NEET Core Syllabus',
    summary: 'Semi-conservative replication by DNA Polymerase III in 5\' to 3\' direction. Okazaki fragments joined by DNA Ligase.',
    content: `
# DNA Replication Machinery & Enzymes

### 1. Key Enzymes and Their Roles
- **DNA Helicase**: Unwinds double helix by breaking hydrogen bonds.
- **Single-Stranded Binding Proteins (SSBs)**: Prevents re-annealing of single strands.
- **Topoisomerase (DNA Gyrase)**: Relieves supercoiling strain ahead of replication fork.
- **RNA Primase**: Synthesizes short RNA primer (10-12 nucleotides) to initiate synthesis.
- **DNA Polymerase III**: Main enzyme that elongates strand in **$5' \\rightarrow 3'$ direction**.
- **DNA Polymerase I**: Removes RNA primers and fills gaps with DNA nucleotides (Exonuclease activity).
- **DNA Ligase**: Seals nicks in phosphodiester backbone of Okazaki fragments on lagging strand.

### 2. Leading vs Lagging Strand
- **Leading Strand**: Continuous synthesis toward replication fork ($5' \\rightarrow 3'$).
- **Lagging Strand**: Discontinuous synthesis away from replication fork forming **Okazaki fragments**.

### 💡 High-Yield NEET Trick
DNA Polymerase can ONLY add nucleotides to the free **3'-OH group** of a growing chain. That's why replication ALWAYS proceeds $5' \\rightarrow 3'$.
    `,
    formulas: [
      'Replication direction: 5\' → 3\' ALWAYS',
      'Proofreading exonuclease direction: 3\' → 5\'',
      'Meselson & Stahl experiment: 15N & 14N CsCl density gradient centrifugation'
    ],
    keyPoints: [
      'Replication is Semi-Conservative and Semi-Discontinuous.',
      'DNA Polymerase III adds nucleotides only to 3\'-OH end.',
      'DNA Ligase forms phosphodiester bonds to join Okazaki fragments.'
    ]
  },

  // UPSC CSE NOTES
  {
    id: 'note_upsc_01',
    examId: 'upsc_cse',
    subject: 'Indian Polity',
    chapter: 'Fundamental Rights & Constitutional Remedies',
    title: 'Article 32 — Writs of High Court & Supreme Court',
    readTime: '10 min read',
    highYieldTag: 'UPSC High Frequency Topic',
    summary: 'Dr. B.R. Ambedkar called Article 32 the "Heart and Soul of the Constitution". SC under Art 32 & HC under Art 226 issue 5 types of writs.',
    content: `
# Article 32 & 226: Writs Architecture in Indian Constitution

### 1. Types of Writs (Latin Terms & Meaning)

1. **Habeas Corpus ("To have the body of")**:
   - Issued to produce a detained person before court.
   - Guard against illegal detention by BOTH private individuals and public authorities.

2. **Mandamus ("We Command")**:
   - Issued to a public official commanding them to perform their statutory duty.
   - CANNOT be issued against President/Governors or private individuals.

3. **Prohibition ("To forbid")**:
   - Issued by a higher court to a lower court to stop it from exceeding its jurisdiction.
   - Available ONLY against judicial and quasi-judicial bodies.

4. **Certiorari ("To be certified")**:
   - Issued to quash an order already passed by a lower court/tribunal.
   - Available against judicial, quasi-judicial, and administrative authorities.

5. **Quo-Warranto ("By what authority?")**:
   - Issued to prevent illegal usurpation of a public office.
   - Can be sought by ANY interested person, not necessarily the aggrieved party.

### 2. Comparison: Article 32 (SC) vs Article 226 (HC)
- **Article 32** is a Fundamental Right itself; Supreme Court CANNOT refuse to exercise writ jurisdiction.
- **Article 226** is a constitutional right; High Court writ jurisdiction is wider (covers Fundamental Rights + Ordinary Legal Rights).
    `,
    formulas: [
      'SC Writ Power: Article 32 (Narrower scope, mandatory FR protection)',
      'HC Writ Power: Article 226 (Broader scope, discretionary power)',
      'Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto'
    ],
    keyPoints: [
      'Habeas Corpus can be issued against both public and private entities.',
      'Mandamus cannot be issued against the President or State Governors.',
      'Quo-Warranto can be filed by any member of the public (locus standi relaxed).'
    ]
  },

  // CAT MANAGEMENT NOTES
  {
    id: 'note_cat_01',
    examId: 'cat',
    subject: 'Quantitative Aptitude',
    chapter: 'Arithmetic — Time, Speed & Distance',
    title: 'Relative Speed & Circular Races',
    readTime: '6 min read',
    highYieldTag: 'CAT QA Core Pattern',
    summary: 'Relative speed in same direction = |S1 - S2|; opposite direction = S1 + S2. Circular track meeting times formula.',
    content: `
# Time, Speed & Distance — Advanced CAT Concepts

### 1. Relative Speed Fundamentals
- **Same Direction**: $S_{\\text{rel}} = |S_1 - S_2|$
- **Opposite Direction**: $S_{\\text{rel}} = S_1 + S_2$

### 2. Circular Track Races
For two runners A and B on a circular track of circumference $L$ with speeds $S_A$ and $S_B$:

1. **Time to meet for the FIRST time anywhere**:
   $$T = \\frac{L}{S_{\\text{rel}}}$$
   - Same direction: $T = \\frac{L}{|S_A - S_B|}$
   - Opposite direction: $T = \\frac{L}{S_A + S_B}$

2. **Time to meet for the FIRST time at the STARTING POINT**:
   $$T_{\\text{start}} = \\text{LCM}\\left(\\frac{L}{S_A}, \\frac{L}{S_B}\\right)$$

3. **Number of distinct meeting points on track**:
   - Same direction: $|a - b|$ where $S_A : S_B = a : b$ in simplest integer ratio.
   - Opposite direction: $a + b$ points.
    `,
    formulas: [
      'First meeting anywhere: T = L / S_rel',
      'First meeting at start line: LCM(L/Sa, L/Sb)',
      'Distinct points (Same direction): |a - b| (Simplest speed ratio a:b)'
    ],
    keyPoints: [
      'Always reduce speeds to simplest integer ratio a:b before calculating distinct meeting points.',
      'Average speed for equal distances = 2·S1·S2 / (S1 + S2).'
    ]
  },

  // GATE NOTES
  {
    id: 'note_gate_01',
    examId: 'gate',
    subject: 'Core Branch (CS/EC)',
    chapter: 'Algorithms & Dynamic Programming',
    title: 'Time Complexity Analysis & Recurrences',
    readTime: '7 min read',
    highYieldTag: 'GATE CS Priority Topic',
    summary: 'Master Theorem analysis for divide and conquer recurrences: T(n) = aT(n/b) + f(n).',
    content: `
# Master Theorem & Recurrence Relations

### Master Theorem Formula
For recurrences of the form:

$$T(n) = a T\\left(\\frac{n}{b}\\right) + f(n) \\quad (a \\ge 1, b > 1)$$

Compare $f(n)$ with $n^{\\log_b a}$:

1. **Case 1**: If $f(n) = O(n^{\\log_b a - \\epsilon})$, then $T(n) = \\Theta(n^{\\log_b a})$.
2. **Case 2**: If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$, then $T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$.
3. **Case 3**: If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ and regularity condition holds, then $T(n) = \\Theta(f(n))$.

### Benchmark Time Complexities
- **Merge Sort**: $T(n) = 2T(n/2) + O(n) \\rightarrow O(n \\log n)$
- **Binary Search**: $T(n) = T(n/2) + O(1) \\rightarrow O(\\log n)$
- **Strassen Matrix Multiplication**: $T(n) = 7T(n/2) + O(n^2) \\rightarrow O(n^{\\log_2 7}) \\approx O(n^{2.81})$
    `,
    formulas: [
      'T(n) = a T(n/b) + Θ(n^d)',
      'If d < log_b(a) => T(n) = Θ(n^(log_b a))',
      'If d = log_b(a) => T(n) = Θ(n^d log n)'
    ],
    keyPoints: [
      'Master theorem cannot be applied if a is not constant or b < 1.',
      'Use Substitution method or Recursion Tree if Master theorem fails.'
    ]
  }
];
