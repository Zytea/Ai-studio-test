import { JobPost, JobStatus, User, UserRole } from '../types';

export const MOCK_USER_PROFESSOR: User = {
  id: 'u1',
  name: 'Dr. Alan Turing',
  role: UserRole.PROFESSOR,
  department: 'Computer Science',
  bio: 'Focusing on AI, Logic, and Computability.',
  avatarUrl: 'https://picsum.photos/200/200?random=1',
};

export const MOCK_USER_STUDENT: User = {
  id: 'u2',
  name: 'Jane Doe',
  role: UserRole.STUDENT,
  department: 'Data Science',
  bio: 'Passionate about NLP and Deep Learning.',
  avatarUrl: 'https://picsum.photos/200/200?random=2',
};

export const MOCK_POSTS: JobPost[] = [
  {
    id: '1',
    title: 'Large Language Model Alignment Research',
    professorId: 'u1',
    professorName: 'Dr. Alan Turing',
    labName: 'AI Safety Lab',
    status: JobStatus.OPEN,
    topicTags: ['NLP', 'LLM', 'RLHF'],
    skillTags: ['Python', 'PyTorch', 'HuggingFace'],
    description: `
We are looking for a motivated RA to work on aligning Large Language Models (LLMs) with human values.

### Responsibilities
* Implement RLHF pipelines.
* Evaluate model outputs for safety and helpfulness.
* Collaborate with PhD students.

### Benefits
* Co-authorship in top-tier conferences.
* Weekly stipend.
    `,
    prerequisites: 'Strong background in Deep Learning. Experience with Transformers is a plus.',
    postedDate: '2023-10-25',
    deadline: '2023-11-15'
  },
  {
    id: '2',
    title: 'Computer Vision for Autonomous Driving',
    professorId: 'u3',
    professorName: 'Dr. Fei-Fei Li (Mock)',
    labName: 'Vision Lab',
    status: JobStatus.COMPETITIVE,
    topicTags: ['CV', 'Robotics', '3D Vision'],
    skillTags: ['C++', 'CUDA', 'OpenCV'],
    description: 'Developing real-time object detection algorithms for autonomous vehicles in adverse weather conditions.',
    prerequisites: 'Proficiency in C++ and CUDA. Coursework in Computer Vision.',
    postedDate: '2023-10-20',
    deadline: '2023-11-01'
  },
  {
    id: '3',
    title: 'Reinforcement Learning in Finance',
    professorId: 'u4',
    professorName: 'Dr. John Nash (Mock)',
    labName: 'Econ-CS Group',
    status: JobStatus.CLOSED,
    topicTags: ['RL', 'Finance', 'Game Theory'],
    skillTags: ['Python', 'Pandas', 'Stochastic Calculus'],
    description: 'Applying Multi-Agent RL to simulate market dynamics.',
    prerequisites: 'Strong math background.',
    postedDate: '2023-09-15',
  },
  {
    id: '4',
    title: 'Bioinformatics: Protein Folding Prediction',
    professorId: 'u1',
    professorName: 'Dr. Alan Turing',
    labName: 'AI Safety Lab',
    status: JobStatus.OPEN,
    topicTags: ['Bioinformatics', 'Deep Learning'],
    skillTags: ['Python', 'TensorFlow', 'Biology'],
    description: 'Using Graph Neural Networks to predict protein structures.',
    prerequisites: 'Basic understanding of molecular biology.',
    postedDate: '2023-10-28',
  }
];

export const AVAILABLE_TOPICS = ['NLP', 'CV', 'RL', 'Robotics', 'Bioinformatics', 'HCI', 'Security', 'Systems'];
export const AVAILABLE_SKILLS = ['Python', 'C++', 'Java', 'PyTorch', 'TensorFlow', 'React', 'SQL', 'AWS'];
