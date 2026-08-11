export const INITIAL_USER = {
  id: 'usr-student-01',
  name: 'Ahmed Khan',
  email: 'ahmed.student@uet.edu.pk',
  cnic: '35202-1234567-1',
  phone: '+92 300 1234567',
  role: 'student', // student, teacher, mentor, company, admin
  university: 'University of Engineering & Technology (UET) Lahore',
  department: 'Computer Science',
  year: '3rd Year',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  skills: ['React', 'JavaScript', 'Python', 'Machine Learning', 'Data Structures'],
  bio: 'Passionate CS student aspiring to become an AI Engineer & Full Stack Web Developer. Active member of Inquisitors Society.',
  github: 'https://github.com/ahmed-uet',
  linkedin: 'https://linkedin.com/in/ahmed-uet',
  gpa: '3.82',
  isVerified: true
};

export const COURSES_DATA = [
  {
    id: 'crs-001',
    title: 'Full-Stack Web Development Mastery (React, Node.js & WebGL)',
    category: 'Technology',
    level: 'Intermediate',
    instructor: 'Dr. Hassan Raza',
    rating: 4.9,
    studentsCount: 342,
    durationHours: 36,
    price: 0, // Free
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    description: 'Learn modern Web Development from basic HTML/CSS to advanced React, Node.js REST APIs, database design, and Three.js 3D web graphics.',
    learningObjectives: [
      'Build responsive Single Page Applications with React',
      'Design RESTful APIs using Node.js & Express',
      'Integrate 3D WebGL scenes using Three.js',
      'Deploy full-stack applications with Docker'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Foundations of Modern Frontend',
        lessons: [
          { id: 'les-101', title: 'HTML5 & CSS3 Glassmorphism Architecture', type: 'video', duration: 45, isCompleted: true },
          { id: 'les-102', title: 'Modern JavaScript (ES6+ & Async/Await)', type: 'video', duration: 50, isCompleted: true },
          { id: 'les-103', title: 'Quiz: JavaScript Fundamentals', type: 'quiz', duration: 20, isCompleted: true, score: 90 }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: React & State Management',
        lessons: [
          { id: 'les-201', title: 'React Hooks & Context API Mastery', type: 'video', duration: 60, isCompleted: false },
          { id: 'les-202', title: 'Building Reusable Component Libraries', type: 'text', duration: 30, isCompleted: false },
          { id: 'les-203', title: 'Assignment 1: Responsive Portfolio App', type: 'assignment', duration: 120, isCompleted: false }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: 3D Graphics with Three.js',
        lessons: [
          { id: 'les-301', title: 'Three.js Geometries, Materials & Lighting', type: 'video', duration: 75, isCompleted: false },
          { id: 'les-302', title: 'Creating Interactive 3D Canvas Scenes', type: 'coding_lab', duration: 90, isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 'crs-002',
    title: 'Artificial Intelligence & Machine Learning Pipeline',
    category: 'Technology',
    level: 'Advanced',
    instructor: 'Prof. Ayesha Siddiqui',
    rating: 4.8,
    studentsCount: 289,
    durationHours: 42,
    price: 0,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
    description: 'Comprehensive guide to supervised learning, deep learning, PyTorch, model optimization, and NLP application deployment.',
    learningObjectives: [
      'Master Scikit-Learn, TensorFlow, and PyTorch',
      'Train Convolutional Neural Networks (CNN) for Computer Vision',
      'Build Large Language Model (LLM) agents',
      'Deploy AI models as microservices'
    ],
    modules: [
      {
        id: 'mod-201',
        title: 'Module 1: Data Preprocessing & Exploratory Analysis',
        lessons: [
          { id: 'les-210', title: 'Pandas & NumPy Data Pipelines', type: 'video', duration: 55, isCompleted: true },
          { id: 'les-211', title: 'Feature Engineering & Normalization', type: 'video', duration: 40, isCompleted: true }
        ]
      }
    ]
  },
  {
    id: 'crs-003',
    title: 'CSS & Civil Services Examination Preparation Masterclass',
    category: 'Leadership & Exam Prep',
    level: 'Beginner',
    instructor: 'Sir Burhan & Guest Officers',
    rating: 4.95,
    studentsCount: 512,
    durationHours: 50,
    price: 0,
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    description: 'Official Inquisitors Society CSS preparation program covering English Essay, Current Affairs, Pakistan Affairs, and Interview Prep.',
    learningObjectives: [
      'Master English Precis & Essay writing technique',
      'Analyze global geopolitics and current national issues',
      'Prepare for mock interviews with retired senior civil servants'
    ],
    modules: [
      {
        id: 'mod-301',
        title: 'Module 1: English Essay & Precis Analysis',
        lessons: [
          { id: 'les-301a', title: 'Structuring High-Scoring Essays', type: 'video', duration: 60, isCompleted: true }
        ]
      }
    ]
  }
];

export const INTERNSHIPS_DATA = [
  {
    id: 'int-001',
    company: 'TechCorp Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=150&q=80',
    title: 'Frontend React & 3D Web Engineer Intern',
    location: 'Lahore / Hybrid',
    duration: '3 Months',
    stipend: 'PKR 45,000 / Month',
    type: 'Paid',
    positions: 4,
    deadline: '2026-08-30',
    skills: ['React', 'Three.js', 'Tailwind CSS', 'Git'],
    description: 'Join TechCorp to build next-generation web dashboards with interactive 3D visualizations and real-time telemetry.',
    requirements: 'Currently enrolled 3rd or 4th year CS/SE student with strong JavaScript fundamentals.'
  },
  {
    id: 'int-002',
    company: 'InnovateAI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80',
    title: 'Machine Learning & NLP Intern',
    location: 'Remote',
    duration: '2 Months',
    stipend: 'PKR 50,000 / Month',
    type: 'Paid',
    positions: 2,
    deadline: '2026-09-15',
    skills: ['Python', 'PyTorch', 'Transformers', 'FastAPI'],
    description: 'Research and deploy fine-tuned transformer models for conversational AI agents.',
    requirements: 'Demonstrated projects in NLP or PyTorch. Good understanding of linear algebra.'
  },
  {
    id: 'int-003',
    company: 'Systems Limited',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=150&q=80',
    title: 'Cloud DevOps & Infrastructure Intern',
    location: 'Lahore Onsite',
    duration: '6 Months',
    stipend: 'PKR 40,000 / Month',
    type: 'Paid',
    positions: 5,
    deadline: '2026-08-25',
    skills: ['Docker', 'Kubernetes', 'Linux', 'AWS'],
    description: 'Work with cloud architecture teams to containerize enterprise services and set up CI/CD pipelines.',
    requirements: 'Understanding of Linux CLI, basic networking concepts, and Docker containers.'
  }
];

export const MY_APPLICATIONS_DATA = [
  {
    id: 'app-101',
    internshipId: 'int-001',
    company: 'TechCorp Solutions',
    title: 'Frontend React & 3D Web Engineer Intern',
    appliedDate: '2026-08-01',
    status: 'Shortlisted', // Applied, Under Review, Shortlisted, Selected, Rejected
    mentor: 'Fatima Noor (Senior Web Lead)',
    mentorFeedback: 'Strong React background and impressive Three.js portfolio. Recommended for final technical round.',
    score: 92
  }
];

export const EVENTS_DATA = [
  {
    id: 'evt-001',
    title: 'Inquisitors National Hackathon 2026',
    category: 'Hackathon',
    type: 'Competition',
    date: '2026-09-10',
    time: '09:00 AM - 06:00 PM',
    venue: 'Auditorium Complex, UET Lahore',
    capacity: 300,
    registeredCount: 218,
    isFree: true,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    description: '36-hour flagship hackathon bringing together top engineering talent to solve real-world problems in AI, Web3, and Renewable Energy.',
    speakers: [
      { name: 'Dr. Usman Ali', role: 'Dean of CS, UET' },
      { name: 'Mr. Bilal CEO', role: 'Founder, TechCorp' }
    ]
  },
  {
    id: 'evt-002',
    title: 'IELTS & Higher Education Abroad Seminar',
    category: 'IELTS Session',
    type: 'Seminar',
    date: '2026-08-20',
    time: '02:00 PM - 05:00 PM',
    venue: 'Seminar Hall, Computer Science Dept.',
    capacity: 150,
    registeredCount: 142,
    isFree: true,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    description: 'Comprehensive roadmap for GRE/IELTS preparation, securing full scholarships in USA, UK, and European universities.',
    speakers: [
      { name: 'Ms. Ilsa Javed', role: 'Fulbright Scholar' }
    ]
  },
  {
    id: 'evt-003',
    title: 'Industrial Study Tour: National Aerospace Complex',
    category: 'Industrial Tour',
    type: 'Tour',
    date: '2026-09-02',
    time: '08:00 AM - 04:00 PM',
    venue: 'Departure from Main Gate UET',
    capacity: 50,
    registeredCount: 48,
    isFree: false,
    price: 1500,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    description: 'Exclusive industrial visit for Inquisitors Society members to explore advanced robotics and automated avionics manufacturing.',
    speakers: [
      { name: 'Engr. Tayyab', role: 'Senior Automation Specialist' }
    ]
  }
];

export const FORUM_THREADS = [
  {
    id: 'thr-001',
    title: 'Best approach for optimizing Three.js 3D WebGL scenes for low-end laptops?',
    author: 'Ahmed Khan',
    authorRole: 'Student',
    category: 'Technical',
    views: 184,
    repliesCount: 4,
    createdAt: '2 hours ago',
    isPinned: true,
    content: 'Hi everyone! I am implementing a 3D campus navigator using Three.js. What are the best practices for texture compression and level of detail (LOD) to maintain 60 FPS on mobile/budget laptops?',
    comments: [
      {
        id: 'c-1',
        author: 'Tayyeba Qamar',
        authorRole: 'Mentor',
        text: 'Great question! Make sure to use DRACO compression for .gltf models, lower shadow map resolution, and implement frustum culling so objects outside camera view are not rendered.',
        likes: 12,
        isBestAnswer: true,
        time: '1 hour ago'
      },
      {
        id: 'c-2',
        author: 'Ubaidullah Shahid',
        authorRole: 'Student',
        text: 'Also recommend instanced rendering if you have repetitive objects like trees or buildings in the campus scene!',
        likes: 5,
        isBestAnswer: false,
        time: '45 mins ago'
      }
    ]
  },
  {
    id: 'thr-002',
    title: 'CSS Exam 2027 Strategy Discussion - Group Study & Resource Sharing',
    author: 'Ilsa Javed',
    authorRole: 'Student',
    category: 'Leadership',
    views: 310,
    repliesCount: 8,
    createdAt: '1 day ago',
    isPinned: false,
    content: 'Starting a weekly discussion group for students planning to appear in CSS 2027. We will cover Current Affairs analysis every Saturday.',
    comments: []
  }
];

export const JOB_POSTINGS = [
  {
    id: 'job-001',
    title: 'Junior Machine Learning Engineer',
    company: 'InnovateAI',
    location: 'Lahore, Pakistan',
    type: 'Full-time',
    salary: 'PKR 120,000 - 160,000 / Month',
    experience: '0-1 Years / Fresh Graduates',
    postedDate: '3 days ago'
  },
  {
    id: 'job-002',
    title: 'Associate Full Stack Developer (React / Node)',
    company: 'TechCorp Solutions',
    location: 'Hybrid (Lahore)',
    type: 'Full-time',
    salary: 'PKR 140,000 / Month',
    experience: 'Fresh Graduates',
    postedDate: 'Yesterday'
  }
];

export const SYSTEM_ANALYTICS = {
  totalUsers: 12480,
  activeStudents: 9320,
  registeredTeachers: 145,
  verifiedCompanies: 88,
  activeCourses: 34,
  certificatesIssued: 4210,
  internshipsPlaced: 312,
  upcomingEvents: 6,
  serverUptime: '99.98%',
  apiResponseTimeMs: 42
};
