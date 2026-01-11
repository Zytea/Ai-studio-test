import { JobPost, JobStatus, User, UserRole, Application, ApplicationStatus } from '../types';

// --- USERS 扩充 ---
export const MOCK_USER_PROFESSOR: User = {
  id: 'u1',
  name: 'Prof. Alan Turing',
  role: UserRole.PROFESSOR,
  school: 'SDS',
  position: 'Distinguished Professor',
  email: 'alanturing@cuhk.edu.cn',
  bio: 'Focusing on AI, Logic, and Computability at School of Data Science.',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alan',
  savedPostIds: ['2'],
  preferences: { showMyApplications: false }
};

// 新增教授：SSE 学院
export const MOCK_USER_PROFESSOR_2: User = {
  id: 'u3',
  name: 'Prof. Ada Lovelace',
  role: UserRole.PROFESSOR,
  school: 'SSE',
  position: 'Associate Professor',
  email: 'ada@cuhk.edu.cn',
  bio: 'Researching Hardware-Software Co-design and Early Computing History.',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ada',
  savedPostIds: [],
  preferences: { showMyApplications: false }
};

export const MOCK_USER_STUDENT: User = {
  id: 'u2',
  name: 'Jane Student',
  role: UserRole.STUDENT,
  school: 'SSE',
  studentId: '119010001',
  position: 'Junior (Year 3)',
  email: '119010001@link.cuhk.edu.cn',
  bio: 'Junior student passionate about NLP and System design.',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
  savedPostIds: ['1', '3', '5'],
  preferences: { showMyApplications: true }
};

// 新增学生：SDS 学院
export const MOCK_USER_STUDENT_2: User = {
  id: 'u5',
  name: 'Bob Smith',
  role: UserRole.STUDENT,
  school: 'SDS',
  studentId: '120010002',
  position: 'Sophomore (Year 2)',
  email: '120010002@link.cuhk.edu.cn',
  bio: 'Interested in Data Mining and Statistics.',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
  savedPostIds: ['4'],
  preferences: { showMyApplications: true }
};

// --- POSTS 扩充 (增加到 8 个) ---
export const MOCK_POSTS: JobPost[] = [
  {
    id: '1',
    title: 'Large Language Model Alignment',
    professorId: 'u1',
    professorName: 'Prof. Alan Turing',
    school: 'SDS',
    labName: 'AI Safety Lab',
    status: JobStatus.OPEN,
    topicTags: ['NLP', 'LLM', 'RLHF'],
    skillTags: ['Python', 'PyTorch', 'Transformers'],
    description: `**Project Overview**\nWe are looking for a motivated RA to work on aligning LLMs.`,
    requirements: 'Strong background in Deep Learning.',
    subsidy: '3000 RMB/month',
    headcount: 2,
    viewCount: 1250,
    postedDate: '2023-10-25',
    deadline: '2023-11-30'
  },
  {
    id: '2',
    title: 'Computer Vision for Autonomous Driving',
    professorId: 'u3',
    professorName: 'Prof. Ada Lovelace',
    school: 'SSE',
    labName: 'Vision Lab',
    status: JobStatus.COMPETITIVE,
    topicTags: ['CV', 'Robotics'],
    skillTags: ['C++', 'CUDA', 'OpenCV'],
    description: 'Developing real-time object detection algorithms.',
    requirements: 'Proficiency in C++.',
    subsidy: 'Negotiable',
    headcount: 1,
    viewCount: 3400,
    postedDate: '2023-10-20',
    deadline: '2023-12-01'
  },
  {
    id: '3',
    title: 'Market Dynamics Simulation',
    professorId: 'u4', // Mock external
    professorName: 'Prof. John Nash',
    school: 'SME',
    labName: 'Econ-CS Group',
    status: JobStatus.CLOSED,
    topicTags: ['RL', 'Finance'],
    skillTags: ['Python', 'Stochastic Calculus'],
    description: 'Applying Multi-Agent RL to simulate market dynamics.',
    requirements: 'Strong math background.',
    subsidy: '2000 RMB/month',
    headcount: 1,
    viewCount: 890,
    postedDate: '2023-09-15',
  },
  {
    id: '4',
    title: 'Protein Folding Prediction',
    professorId: 'u1',
    professorName: 'Prof. Alan Turing',
    school: 'SDS',
    labName: 'AI Safety Lab',
    status: JobStatus.OPEN,
    topicTags: ['Bioinformatics', 'Deep Learning'],
    skillTags: ['Python', 'TensorFlow'],
    description: 'Using Graph Neural Networks to predict protein structures.',
    requirements: 'Basic understanding of molecular biology.',
    subsidy: '2500 RMB/month',
    headcount: 3,
    viewCount: 560,
    postedDate: '2023-10-28',
  },
  // 新增 4 个职位
  {
    id: '5',
    title: 'Privacy-Preserving Machine Learning',
    professorId: 'u1',
    professorName: 'Prof. Alan Turing',
    school: 'SDS',
    labName: 'Trustworthy AI Group',
    status: JobStatus.OPEN,
    topicTags: ['Optimization', 'Security'],
    skillTags: ['Python', 'Differential Privacy'],
    description: 'Exploring federated learning and differential privacy in healthcare data.',
    requirements: 'Solid understanding of probability and statistics.',
    subsidy: '3500 RMB/month',
    headcount: 2,
    viewCount: 420,
    postedDate: '2023-11-05',
    deadline: '2023-12-15'
  },
  {
    id: '6',
    title: 'Blockchain Consensus Optimization',
    professorId: 'u3',
    professorName: 'Prof. Ada Lovelace',
    school: 'SSE',
    labName: 'Systems Research Lab',
    status: JobStatus.OPEN,
    topicTags: ['Optimization', 'Game Theory'],
    skillTags: ['Go', 'Rust', 'Docker'],
    description: 'Investigating high-throughput consensus protocols for decentralized networks.',
    requirements: 'Knowledge of distributed systems is essential.',
    subsidy: '4000 RMB/month',
    headcount: 1,
    viewCount: 780,
    postedDate: '2023-11-02',
    deadline: '2023-11-25'
  },
  {
    id: '7',
    title: 'Human-Robot Interaction in Healthcare',
    professorId: 'u6', 
    professorName: 'Prof. Margaret Hamilton',
    school: 'SSE',
    labName: 'HCI & Robotics Lab',
    status: JobStatus.OPEN,
    topicTags: ['HCI', 'Robotics'],
    skillTags: ['React', 'Python', 'ROS'],
    description: 'Designing intuitive interfaces for elderly care robots.',
    requirements: 'Experience with UI/UX design or ROS.',
    subsidy: '2800 RMB/month',
    headcount: 2,
    viewCount: 310,
    postedDate: '2023-11-08',
  },
  {
    id: '8',
    title: 'Quantitative Trading Strategy Backtesting',
    professorId: 'u4',
    professorName: 'Prof. John Nash',
    school: 'SME',
    labName: 'Econ-CS Group',
    status: JobStatus.COMPETITIVE,
    topicTags: ['Finance', 'Optimization'],
    skillTags: ['SQL', 'Python', 'Pandas'],
    description: 'Analyzing historical market data to validate arbitrage strategies.',
    requirements: 'Excellent Pandas/SQL skills.',
    subsidy: '5000 RMB/month',
    headcount: 1,
    viewCount: 1500,
    postedDate: '2023-11-01',
    deadline: '2023-11-15'
  }
];

// --- APPLICATIONS 扩充 (增加到 5 个) ---
export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'a1',
    postId: '1',
    studentId: 'u2',
    studentName: 'Jane Student',
    studentSchoolId: '119010001',
    resumeLink: 'https://onedrive.live.com/view/resume_jane',
    statement: 'I have 2 years of experience with PyTorch.',
    status: ApplicationStatus.VIEWED,
    appliedDate: '2023-10-26'
  },
  {
    id: 'a2',
    postId: '2',
    studentId: 'u2',
    studentName: 'Jane Student',
    studentSchoolId: '119010001',
    resumeLink: 'https://onedrive.live.com/view/resume_jane',
    statement: 'I took Computer Vision course last semester.',
    status: ApplicationStatus.REJECTED,
    rejectionReason: 'Position requires C++ expertise.',
    appliedDate: '2023-10-22'
  },
  // 新增申请
  {
    id: 'a3',
    postId: '4',
    studentId: 'u5',
    studentName: 'Bob Smith',
    studentSchoolId: '120010002',
    resumeLink: 'https://dropbox.com/s/bob_cv.pdf',
    statement: 'I am a Biology minor and very interested in GNNs.',
    status: ApplicationStatus.PENDING,
    appliedDate: '2023-11-01'
  },
  {
    id: 'a4',
    postId: '5',
    studentId: 'u2',
    studentName: 'Jane Student',
    studentSchoolId: '119010001',
    resumeLink: 'https://onedrive.live.com/view/resume_jane',
    statement: 'I am interested in Privacy-Preserving ML and have a solid math background.',
    status: ApplicationStatus.ACCEPTED,
    appliedDate: '2023-11-07'
  },
  {
    id: 'a5',
    postId: '6',
    studentId: 'u5',
    studentName: 'Bob Smith',
    studentSchoolId: '120010002',
    resumeLink: 'https://dropbox.com/s/bob_cv.pdf',
    statement: 'Experienced with Docker and backend systems.',
    status: ApplicationStatus.VIEWED,
    appliedDate: '2023-11-04'
  }
];

// --- 标签扩充 ---
export const AVAILABLE_TOPICS = [
  'NLP', 'CV', 'RL', 'Robotics', 'Bioinformatics', 
  'Finance', 'Optimization', 'Game Theory', 'HCI', 
  'Security', 'Distributed Systems', 'Statistics'
];

export const AVAILABLE_SKILLS = [
  'Python', 'C++', 'Java', 'PyTorch', 'TensorFlow', 
  'React', 'SQL', 'AWS', 'CUDA', 'Matlab', 
  'Rust', 'Go', 'Docker', 'Pandas', 'ROS'
];