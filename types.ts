export interface LearnerProfile {
  academicBackground: string;
  priorSkills: string[];
  preferredLocation: string;
  learningPace: string;
  careerAspiration: string;
  preferredLanguage: string;
}

export interface PathwayStep {
  stage: 'Foundational Courses' | 'Core Skills' | 'Specialization' | 'Certifications' | 'On-the-Job Training';
  title: string;
  description: string;
  duration: string;
  nsqfLevel: string;
  provider?: string;
  suggestedVideo?: string;
}

export interface MarketInsights {
  jobDemand: string;
  salaryRange: string;
  topHiringCompanies: string[];
  keySkillsInDemand: string[];
}

export interface JobStrategy {
  skillsToHighlight: string[];
  interviewPrep: string[];
  networkingTips: string[];
}

export interface RecommendedCompany {
  name: string;
  rationale: string;
  jobStrategy: JobStrategy;
}

export interface CompanyAnalysis {
    name: string;
    sector: string;
}

export interface CareerGuidance {
  companyAnalyses: CompanyAnalysis[];
  recommendedCompany: RecommendedCompany;
}

export interface TrainingPathway {
  id: string; // Unique identifier for the pathway
  createdAt: string; // ISO date string
  pathwayTitle: string;
  summary: string;
  steps: PathwayStep[];
  marketInsights: MarketInsights;
  careerGuidance?: CareerGuidance;
}

export interface User {
  name: string;
  email: string;
}

// Represents the user data as stored in our mock "backend"
export interface StoredUser extends User {
  password?: string; // Storing passwords in localStorage is insecure; for demo purposes only.
  savedPathways: TrainingPathway[];
}


export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

// New types for Exam Preparation Hub
export interface PracticeQuestion {
  question: string;
  answer: string;
  priority?: boolean;
}

export interface StudyMaterials {
  books: string[];
  onlineCourses: string[];
}

export interface StudyStep {
  topic: string;
  details: string;
  duration: string;
  priority?: boolean;
}

export interface ExamPlan {
  examName: string;
  studyPlan: StudyStep[];
  studyMaterials: StudyMaterials;
  practiceQuestions: PracticeQuestion[];
}