import { JobPost, JobStatus, User, UserRole, Application, ApplicationStatus } from '../types';

export const MOCK_USER_PROFESSOR: User = {
  id: 'u1',
  name: 'Prof. Alan Turing',
  role: UserRole.PROFESSOR,
  school: 'SDS',
  position: 'Distinguished Professor',
  email: 'alanturing@cuhk.edu.cn',
  bio: 'Focusing on AI, Logic, and Computability at School of Data Science.',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alan',
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
  bio: 'Junior student passionate about NLP.',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
  preferences: { showMyApplications: true }
};

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
    description: `
**Project Overview**
We are looking for a motivated RA to work on aligning Large Language Models (LLMs) with human values.

**Responsibilities**
* Implement RLHF pipelines.
* Evaluate model outputs for safety and helpfulness.
* Collaborate with PhD students.
    `,
    requirements: 'Strong background in Deep Learning. Experience with HuggingFace is a plus.',
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
    professorName: 'Prof. Fei-Fei Li (Mock)',
    school: 'SSE',
    labName: 'Vision Lab',
    status: JobStatus.COMPETITIVE,
    topicTags: ['CV', 'Robotics', '3D Vision'],
    skillTags: ['C++', 'CUDA', 'OpenCV'],
    description: 'Developing real-time object detection algorithms for autonomous vehicles in adverse weather conditions.',
    requirements: 'Proficiency in C++ and CUDA. Coursework in Computer Vision.',
    subsidy: 'Negotiable',
    headcount: 1,
    viewCount: 3400,
    postedDate: '2023-10-20',
    deadline: '2023-11-01'
  },
  {
    id: '3',
    title: 'Market Dynamics Simulation',
    professorId: 'u4',
    professorName: 'Prof. John Nash (Mock)',
    school: 'SME',
    labName: 'Econ-CS Group',
    status: JobStatus.CLOSED,
    topicTags: ['RL', 'Finance', 'Game Theory'],
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
    skillTags: ['Python', 'TensorFlow', 'Biology'],
    description: 'Using Graph Neural Networks to predict protein structures.',
    requirements: 'Basic understanding of molecular biology.',
    subsidy: '2500 RMB/month',
    headcount: 3,
    viewCount: 560,
    postedDate: '2023-10-28',
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'a1',
    postId: '1',
    studentId: 'u2',
    studentName: 'Jane Student',
    studentSchoolId: '119010001',
    resumeLink: 'https://onedrive.live.com/view/resume_jane',
    statement: 'I have 2 years of experience with PyTorch and have read the InstructorGPT paper...',
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
    statement: 'I took Computer Vision course last semester and got A.',
    status: ApplicationStatus.REJECTED,
    rejectionReason: 'Position requires C++ expertise, your profile highlights Python.',
    appliedDate: '2023-10-22'
  }
];

export const AVAILABLE_TOPICS = ['NLP', 'CV', 'RL', 'Robotics', 'Bioinformatics', 'Finance', 'Optimization', 'Game Theory', 'HCI'];
export const AVAILABLE_SKILLS = ['Python', 'C++', 'Java', 'PyTorch', 'TensorFlow', 'React', 'SQL', 'AWS', 'CUDA', 'Matlab'];
