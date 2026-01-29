import { Project, Milestone, FilterType, SkillCategory, Service, Testimonial, ProcessStep, FAQItem } from './types';

export const PROJECTS: Project[] = [
{
  id: '27',
  title: '1G Paint Can Filling Optimization',
  description:
    'Optimized the 1G paint can filling process by identifying machine and operator variation using DMAIC and Lean tools.',
  tech: ['DMAIC', 'Lean Manufacturing'],
  category: 'Manufacturing',
  featured: true,
  image: 'https://picsum.photos/600/400?random=27',
  link: '#',
  impact: 'Defects reduced from 15% to 0.5%.',
},
{
  id: '28',
  title: 'Semi-Automation of 1G Paint Relabeling',
  description:
    'Led semi-automation of the 1G paint can relabeling process, including supplier evaluation and cost justification.',
  tech: ['Project Management', 'Automation', 'ROI Analysis'],
  category: 'Continuous Improvement',
  featured: true,
  image: 'https://picsum.photos/600/400?random=28',
  link: '#',
  impact: 'Achieved ROI of $1M USD over 3 years.',
},
{
  id: '29',
  title: 'Tray Packing Process Optimization – Menards',
  description:
    'Eliminated bottlenecks in tray set packing by standardizing methods through Value Stream Mapping and Gemba Walks.',
  tech: ['VSM', 'Gemba Walk'],
  category: 'Manufacturing',
  featured: false,
  image: 'https://picsum.photos/600/400?random=29',
  link: '#',
  impact:
    'Reduced packing errors by 30% and improved overall efficiency by 25%.',
},
{
  id: '30',
  title: 'Material Picking Operations Improvement',
  description:
    'Implemented visual controls and standardized bin numbering (A–E levels) to improve material picking accuracy and speed.',
  tech: ['Kaizen', 'Visual Management', 'Evening Tool Box Talk'],
  category: 'Logistics',
  featured: false,
  image: 'https://picsum.photos/600/400?random=30',
  link: '#',
  impact: 'Saved $31,000 annually by reducing picking time and errors.',
},
{
  id: '31',
  title: 'Workstation Layout Optimization – PC Sorting',
  description:
    'Redesigned workstation layout using spaghetti diagrams and time study analysis to reduce operator movement and forklift dependency.',
  tech: [
    'Spaghetti Diagram',
    'Time Study',
    'X-R Chart',
    'Data-Driven Decisions',
  ],
  category: 'Manufacturing',
  featured: false,
  image: 'https://picsum.photos/600/400?random=31',
  link: '#',
  impact:
    'Reduced worker travel by 35%, improved sorting efficiency by 37%, and eliminated forklift movement by 85%.',
}

];

export const MILESTONES: Milestone[] = [
  { 
    id: 'm1', 
    year: '2025', 
    title: 'Industrial Engineer Intern @ GDB International, Nashville, IL', 
    description: 'Driving process optimization, automation, and Lean initiatives in paint filling and packing operations using DMAIC and data-driven decision making.',
    type: 'work'
  },
  { 
    id: 'm2', 
    year: '2024', 
    title: 'Engineering Intern EHS @ MacLean Fogg Component Solutions, Mundelein, IL', 
    description: 'Led Six Sigma projects to reduce bolt defects, implemented SMED, Kanban systems, and improved tool management across mechanic bar lines.',
    type: 'work'
  },
  { 
    id: 'm3', 
    year: '2019 - 2023', 
    title: 'Sr. Engineer EHS & Continuous Improvement @ Larsen & Toubro Limited, Timba, India', 
    description: 'Owned end-to-end process optimization, predictive maintenance, yield improvement, and cost reduction programs in a heavy manufacturing environment.',
    type: 'work'
  },
  { 
    id: 'm4', 
    year: '2018 - 2019', 
    title: 'Manufacturing Engineer @ Crest Foods Private Limited, Tirupati, India', 
    description: 'Improved raw material usage, conveyor system performance, and production efficiency while ensuring customer quality requirements were consistently met.',
    type: 'work'
  },
  { 
    id: 'm5', 
    year: '2017', 
    title: 'Operations Engineer @ Divis Laboratories Limited, Hyderabad, India', 
    description: 'Optimized pump reliability and energy consumption through structured analysis and VFD implementation to improve uptime and reduce costs.',
    type: 'work'
  },
  {
    id: 'e1',
    year: '2023 - 2025',
    title: 'Master of Science in Industrial Engineering',
    description: 'Southern Illinois University Edwardsville, Edwardsville, IL. Focus on Lean systems, Six Sigma, operations research, and data-driven decision making.',
    type: 'education'
  },
  {
    id: 'e2',
    year: '2013 - 2017',
    title: 'Bachelor of Technology in Mechanical Engineering',
    description: 'N.B.K.R Institute of Science & Technology. Built a strong foundation in core mechanical and manufacturing principles.',
    type: 'education'
  }
];

export const SKILLS: SkillCategory[] = [
  {
    level: 'Advanced',
    skills: [
      'Kanban',
      'JIT',
      'Kaizen',
      'Value Stream Mapping (VSM)',
      'SMED',
      'Line Balancing',
      'Time & Motion Studies',
      'Gemba Walks',
      '6S / Workplace Organization',
      'Cycle Time Optimization',
      'Yamazumi Charts',
      'PDCA'
    ],
    context:
      'Hands-on experience applying Lean methodologies on shop floors to stabilize flow, remove waste, and improve throughput in both manufacturing and logistics.'
  },
  {
    level: 'Advanced',
    skills: [
      'Six Sigma (DMAIC)',
      '8D',
      'Root Cause Analysis (RCA)',
      'CAPA',
      'PFMEA',
      'Control Plans',
      'Ishikawa / Fishbone',
      '4M Analysis',
      '5 Why',
      'Pareto Charts',
      'Pivot Analysis',
      'Design of Experiments (DOE)'
    ],
    context:
      'Comfortable using structured problem-solving frameworks and statistical tools to reduce defects, stabilize processes, and sustain improvements.'
  },
  {
    level: 'Intermediate',
    skills: [
      'Flow Charts',
      'ROI Justification',
      'Cost Reduction Projects',
      'Process Validation',
      'Project Management',
      'Minitab',
      'Power BI',
      'Python',
      'AutoCAD',
      'Microsoft Office'
    ],
    context:
      'Blend of engineering fundamentals and analytical tools used to model processes, justify investments, and present data-driven recommendations to leadership.'
  },
  {
    level: 'Advanced',
    skills: [
      'Six Sigma Green Belt',
      'NEBOSH IGC'
    ],
    context:
      'Formal training in structured improvement methodologies, safety, and risk management applied to real-world manufacturing environments.'
  }
];

export const SERVICES: Service[] = [
  {
    title: 'Lean Manufacturing & Continuous Improvement',
    description:
      'End-to-end Lean transformation and productivity improvement across shop floor, packing, and logistics operations.',
    features: [
      'Cycle time & throughput improvement',
      'Line balancing & layout optimization',
      'Waste elimination & standard work',
      'Visual management & 6S deployment'
    ],
    recommended: true
  },
  {
    title: 'Six Sigma & Quality Improvement',
    description:
      'Defect reduction and process stabilization using Six Sigma methodologies and statistical tools.',
    features: [
      'DMAIC project leadership',
      'Defect and scrap reduction',
      'Gage R&R & measurement system analysis',
      'Control charts & capability studies'
    ],
    recommended: false
  },
  {
    title: 'EHS & Risk Management',
    description:
      'Safety-focused process design and risk reduction aligned with international standards and best practices.',
    features: [
      'Hazard identification & risk assessment',
      'Incident investigation & RCA',
      'Safety culture & visual controls',
      'NEBOSH-aligned EHS practices'
    ],
    recommended: false
  },
  {
    title: 'Data-Driven Industrial Analytics',
    description:
      'Turning shop-floor data into actionable insights using statistical tools and dashboards.',
    features: [
      'Minitab-based statistical analysis',
      'Power BI performance dashboards',
      'Trend & Pareto analysis',
      'Executive-ready reporting & storytelling'
    ],
    recommended: false
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Assess & Define',
    description:
      'Start with Gemba walks, stakeholder discussions, and data collection to clearly define the problem, scope, and business impact.'
  },
  {
    number: '02',
    title: 'Analyze & Diagnose',
    description:
      'Use tools like VSM, time & motion studies, Pareto charts, and RCA to identify true bottlenecks, root causes, and improvement levers.'
  },
  {
    number: '03',
    title: 'Improve & Implement',
    description:
      'Design new layouts, standard work, automation opportunities, and Lean solutions. Pilot changes, validate with data, and scale what works.'
  },
  {
    number: '04',
    title: 'Control & Sustain',
    description:
      'Lock in gains with visual controls, control plans, SOPs, and training. Enable teams through PPL/Kaizen so improvements continue beyond the initial project.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Plant Manager',
    role: 'Plant Manager',
    company: 'GDB International',
    content:
      'Manoj quickly understood our paint filling and packing processes and turned chronic quality issues into a stable, high-yield operation. The defect reduction and automation savings were game changing.'
  },
  {
    id: 't2',
    name: 'Operations Manager',
    role: 'Operations Manager',
    company: 'MacLean Fogg Component Solutions',
    content:
      'His Six Sigma project on bolt defects delivered measurable savings and significantly reduced rework. The SMED and Kanban initiatives improved availability and flow across our lines.'
  },
  {
    id: 't3',
    name: 'Project Head – CI & EHS',
    role: 'Sr. Manager',
    company: 'Larsen & Toubro Limited',
    content:
      'Manoj consistently delivered high-impact improvements, from curing cycle reductions to predictive maintenance and cost savings. He brings structure, data, and strong execution to every project.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Are you open to relocation?',
    answer:
      'Yes. I am currently based in St. Louis, MO and open to relocation within the U.S., depending on the role and growth opportunities.'
  },
  {
    question: 'What type of roles are you targeting?',
    answer:
      'Primarily Industrial Engineer, Process Improvement Engineer, Continuous Improvement Engineer, and roles in Lean, Six Sigma, or Operations Excellence within manufacturing or logistics environments.'
  },
  {
    question: 'What kind of impact have you delivered so far?',
    answer:
      'I have led projects that reduced defects from 15% to 0.5% and 12% to 2%, cut cycle times by up to 83%, lowered costs by 15%, increased throughput, and delivered savings in the range of tens of thousands to over a million USD.'
  },
  {
    question: 'Which tools and methodologies do you use most often?',
    answer:
      'I regularly use Lean tools (VSM, SMED, Kanban, 6S, Gemba), Six Sigma (DMAIC, Minitab, Gage R&R, control charts), and analytics tools like Power BI and Python for data handling and visualization.'
  }
];

// You’ll probably want to update your FilterType enum in ./types accordingly.
// Example idea: ALL, MANUFACTURING, LOGISTICS, QUALITY, CONTINUOUS_IMPROVEMENT, MAINTENANCE
export const FILTERS = [
  FilterType.ALL,
  FilterType.MANUFACTURING,
  FilterType.LOGISTICS,
  FilterType.QUALITY,
  FilterType.CONTINUOUS_IMPROVEMENT
];
