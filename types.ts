export enum UserRole {
  GUEST = 'GUEST',
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR',
}

export enum JobStatus {
  OPEN = 'OPEN',
  COMPETITIVE = 'COMPETITIVE',
  CLOSED = 'CLOSED',
  ENDED = 'ENDED',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department?: string;
  bio?: string;
  avatarUrl: string;
}

export interface JobPost {
  id: string;
  title: string;
  professorId: string;
  professorName: string;
  labName: string;
  status: JobStatus;
  topicTags: string[];
  skillTags: string[];
  description: string; // Markdown supported
  prerequisites: string;
  postedDate: string;
  deadline?: string;
}

export interface FilterState {
  status: JobStatus[];
  topics: string[];
  skills: string[];
  query: string;
}