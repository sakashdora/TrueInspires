export const projects = [
  {
    id: 'argus-ai',
    title: 'ARGUS AI',
    subtitle: 'Edge-First Industrial Safety & Hazard Intelligence System',
    description: 'An industrial computer vision platform engineered for factory safety. Delivers real-time PPE compliance monitoring (Hardhat, Hi-Vis Vest, Gloves, Boots) and active hazard triage (Fire, Smoke, Restricted Zones) with low alert latency, GPIO siren relays, and offline LAN resilience.',
    category: 'Edge AI & Vision',
    badgeColor: 'badge-amber',
    accentColor: '#F59E0B',
    collaboration: 'Built by the To Inspire team',
    github: 'https://github.com/sakashdora/PPE-PROJECT.git',
    live: 'https://github.com/sakashdora/PPE-PROJECT',
    tags: ['YOLOv11s ONNX', 'OpenVINO', 'NestJS WS', 'Next.js 15', 'Prisma ORM']
  },
  {
    id: 'riskrule',
    title: 'RiskRule',
    subtitle: 'Institutional Trading Journal & Systematic Risk Management Terminal',
    description: 'A quantitative trading journal and systematic risk management terminal developed in collaboration with AssetMagnets. Provides automated multi-broker trade synchronization (Dhan, AngelOne), FIFO lot accounting, risk telemetry, and rule-based trade discipline analytics.',
    category: 'FinTech & Analytics',
    badgeColor: 'badge-purple',
    accentColor: '#8B5CF6',
    collaboration: 'In collaboration with AssetMagnets',
    github: 'https://github.com/Pritam-Pattanaik/riskrule.git',
    live: 'https://riskrule.in/',
    tags: ['React', 'TypeScript', 'Zustand', 'Recharts', 'PostgreSQL', 'Risk Telemetry']
  },
  {
    id: 'tejas-2026',
    title: 'TEJAS 2026 — The Fresh Bloom',
    subtitle: 'Coordinated Digital Invitation Experiences for Student & Faculty Convocations',
    description: 'Coordinated digital invitation systems engineered for Srusti Academy’s annual freshers’ celebration. Features two tailored audience flows: a dynamic student induction platform and an editorial, ceremony-focused faculty invitation with personalized mentor greeting dialogues and event agenda.',
    category: 'Digital Experiences',
    badgeColor: 'badge-pink',
    accentColor: '#EC4899',
    collaboration: 'Built by the To Inspire team',
    isDualDestination: true,
    destinations: [
      {
        label: 'Student Invitation',
        url: 'https://freshers-party-beige.vercel.app/',
        audience: 'Students & Juniors'
      },
      {
        label: 'Faculty Invitation',
        url: 'https://teacherinvitation.vercel.app/',
        audience: 'Faculty & Mentors'
      }
    ],
    tags: ['Interactive Audio', 'Editorial Motion', 'Tailored Dialogues', 'Responsive Design']
  },
  {
    id: 'doseloop',
    title: 'DoseLoop',
    subtitle: 'Calm Medication Companion & Adherence State Machine',
    description: 'A privacy-first healthcare companion built to reduce alert fatigue for complex prescriptions. Driven by a deterministic 4-state dose engine (planned, taken, skipped, missed) with caregiver circle sharing and scheduled reminders.',
    category: 'Digital Health',
    badgeColor: 'badge-emerald',
    accentColor: '#10B981',
    collaboration: 'Built by the To Inspire team',
    github: 'https://github.com/im-chandanmahapatra/DOSELOOP.git',
    live: 'https://doseloop.vercel.app/',
    tags: ['React', 'TypeScript', 'TanStack Router', 'TanStack Query', 'Supabase']
  },
  {
    id: 'crossfire',
    title: 'CrossFire 2026',
    subtitle: 'State-Level Campus Talent Hunt Operations Platform',
    description: 'The operations platform for Srusti Academy of Graduate Studies (SAGS), Bhubaneswar. Coordinates participant intake across six competitive tracks, real-time cryptographic QR door check-in, live judge score evaluation matrices, and dynamic calculated leaderboards.',
    category: 'Digital Experiences',
    badgeColor: 'badge-cyan',
    accentColor: '#06B6D4',
    collaboration: 'Built by the To Inspire team',
    github: 'https://github.com/sakashdora/CrossFire.git',
    live: 'https://cross-fire-three.vercel.app/',
    tags: ['React 18', 'TypeScript', 'Supabase Auth & DB', 'Crypto QR', 'Vite 6']
  },
  {
    id: 'social-media-project',
    title: 'Social Media Project',
    subtitle: 'Status: Coming Soon',
    description: 'A privacy-conscious social networking and creator platform currently under active development by the To Inspire engineering team. Interface architecture, media rendering pipelines, and distributed data systems are being refined prior to public release.',
    category: 'Digital Experiences',
    badgeColor: 'badge-indigo',
    accentColor: '#6366F1',
    collaboration: 'Built by the To Inspire team',
    isUpcoming: true,
    tags: ['In Active Development', 'TypeScript', 'Distributed State', 'Coming Soon']
  }
];

export const projectCategories = [
  'All Work',
  'Edge AI & Vision',
  'FinTech & Analytics',
  'Digital Health',
  'Digital Experiences'
];
