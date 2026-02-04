

export const ACADEMIC_BACKGROUNDS: string[] = [
  'Below 8th Standard',
  '8th Pass',
  '10th Pass',
  '12th Pass / Intermediate',
  'ITI Certificate',
  'Polytechnic Diploma',
  'Vocational Training Certificate',
  'Undergraduate (Pursuing)',
  'Graduate Degree (e.g., B.A, B.Sc, B.Com, BCA, B.Tech, B.E, MBBS)',
  'Postgraduate Degree (e.g., M.A, M.Sc, MBA, MCA, M.Tech, MD, MS)',
  'Doctorate (PhD)'
];

export const LEARNING_PACE_OPTIONS: string[] = [
  'Full-time',
  'Part-time',
  'Weekend only',
  'Self-paced (Online)',
  'Flexible (Hybrid)'
];

export const COMMON_SKILLS: string[] = [
  // Technical Skills
  'Programming (Java, Python, C, etc.)',
  'Web Development (HTML, CSS, PHP, JS)',
  'Data Science / AI / ML',
  'Database Management (SQL, MongoDB)',
  'Cloud Computing (AWS, IBM Watson, Azure)',
  'Automation (UiPath, RPA)',
  'Cybersecurity',
  'Mobile Development',
  'UI/UX Design',
  'Graphic Design',
  'Video Editing',

  // Analytical Skills
  'Problem-Solving',
  'Data Analysis',
  'Critical Thinking',
  'Research & Development',

  // Business & Management Skills
  'Project Management',
  'Team Collaboration',
  'Leadership / Coordination',
  'Entrepreneurship / Business Planning',
  'Marketing & Strategy',
  'Digital Marketing',
  'Sales',
  'Accounting',
  'Customer Service',

  // Creative Skills
  'Innovation & Idea Generation',
  'Content Writing / Presentation',
  'Design Thinking',
  'Public Speaking',

  // Soft Skills
  'Communication Skills',
  'Time Management',
  'Adaptability',
  'Decision Making',
  'Networking',
  'Spoken English',

  // Tools & Platforms
  'IBM Watson',
  'UiPath (RPA)',
  'Git/GitHub',
  'MS Office / Google Workspace',

  // Vocational & Other Skills
  'Data Entry',
  'Electrical Wiring',
  'Plumbing',
  'Welding',
  'Carpentry',
  'Automotive Repair',
  'Cooking & Baking',
  'Healthcare Assistance',
  'Mechanical Drawing',
];

export const CAREER_ASPIRATIONS: string[] = [
    'Technologist / Engineer',
    'Data Analyst / AI Specialist',
    'Doctor / Medical Professional',
    'Government / Public Sector',
    'Researcher / Scientist',
    'Innovator / Problem Solver',
    'Entrepreneur / Startup Founder',
    'Business Leader / Manager',
    'Social Entrepreneur / Change Maker',
    'Educator / Mentor',
    'Creative Designer / Innovator',
    'Global Professional / International Career',
    'Full Stack Developer',
    'Cloud Computing Engineer',
    'Cybersecurity Analyst',
    'Digital Marketing Manager',
    'Logistics and Supply Chain Manager',
    'Solar Panel Technician',
    'EV Charging Station Technician',
    'Organic Farming Specialist',
    'Drone Operator',
    '3D Printing Technician',
    'AR/VR Developer',
    'Robotics Engineer',
    'Certified Nursing Assistant (CNA)',
    'Medical Lab Technician',
];

export const COMPETITIVE_EXAMS: { key: string; name: string; field: string[] }[] = [
  { key: 'GATE', name: 'GATE (Graduate Aptitude Test in Engineering)', field: ['Engineering', 'Technology', 'B.Tech / B.E.'] },
  { key: 'NEET_PG', name: 'NEET-PG (National Eligibility cum Entrance Test for Post-Graduation)', field: ['Medical', 'MBBS', 'MD/MS'] },
  { key: 'UPSC_CSE', name: 'UPSC Civil Services Exam', field: ['Government', 'Public Service'] },
  { key: 'CAT', name: 'CAT (Common Admission Test)', field: ['Management', 'MBA'] },
  { key: 'SSC_CGL', name: 'SSC CGL (Staff Selection Commission - Combined Graduate Level)', field: ['Government', 'Graduate'] },
  { key: 'IBPS_PO', name: 'IBPS PO (Institute of Banking Personnel Selection - Probationary Officer)', field: ['Banking', 'Finance'] },
  { key: 'UGC_NET', name: 'UGC NET (University Grants Commission - National Eligibility Test)', field: ['Academia', 'Research', 'Postgraduate'] },
  { key: 'JEE', name: 'JEE Main & Advanced', field: ['Engineering', '12th Pass / Intermediate'] },
];