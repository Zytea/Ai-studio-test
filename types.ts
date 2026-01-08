export enum UserRole {
  GUEST = 'GUEST',
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR', // Researcher
}

export type School = 'SDS' | 'SSE' | 'SME' | 'LHS' | 'HSS' | 'MED' | 'AI';

export enum JobStatus {
  OPEN = 'OPEN',
  COMPETITIVE = 'COMPETITIVE',
  CLOSED = 'CLOSED',
}

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  VIEWED = 'VIEWED',
  INTERVIEW = 'INTERVIEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  school?: School;
  studentId?: string; // or Staff ID
  position?: string; // Grade (e.g. Junior) or Title (e.g. Associate Prof)
  email: string;
  bio?: string;
  avatarUrl: string;
  preferences?: {
    showMyApplications?: boolean;
  };
}

export interface JobPost {
  id: string;
  title: string;
  professorId: string;
  professorName: string;
  school: School; // Department
  labName?: string; // Optional specific lab name
  status: JobStatus;
  topicTags: string[];
  skillTags: string[];
  description: string; // Markdown supported
  requirements: string; // Prerequisites
  subsidy: string;
  headcount: number;
  viewCount: number; // For "Most Popular" sort
  postedDate: string;
  deadline?: string;
}

export interface Application {
  id: string;
  postId: string;
  studentId: string;
  studentName: string;
  studentSchoolId: string;
  resumeLink: string;
  statement: string;
  status: ApplicationStatus;
  rejectionReason?: string;
  appliedDate: string;
}

export type SortOption = 'RELEVANT' | 'NEWEST' | 'POPULAR';

export interface FilterState {
  status: JobStatus[];
  schools: School[];
  topics: string[];
  skills: string[];
  query: string;
  sortBy: SortOption;
}