export type InterviewDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type InterviewQuestionType = "Technical" | "Concept" | "Coding" | "HR";

export type InterviewQuestion = {
  id: string;
  type: InterviewQuestionType;
  question: string;
  explanation: string;
  answerOutline: string[];
  codingPrompt: string;
  difficulty: InterviewDifficulty;
  technology: string;
  bookmarked: boolean;
  completed: boolean;
  completedAt: string | null;
};

export type InterviewSession = {
  id: string;
  userId: string;
  title: string;
  overview: string;
  careerGoal: string;
  technology: string;
  difficulty: InterviewDifficulty;
  weakAreas: string[];
  revisionTips: string[];
  questions: InterviewQuestion[];
  model: string;
  createdAt: string;
  updatedAt: string;
};

export type InterviewSessionSummary = {
  id: string;
  title: string;
  careerGoal: string;
  technology: string;
  difficulty: InterviewDifficulty;
  questionCount: number;
  completedCount: number;
  progress: number;
  createdAt: string;
};

export type InterviewDashboard = {
  stats: {
    totalSessions: number;
    totalQuestions: number;
    completedPractice: number;
    bookmarkedQuestions: number;
    completionRate: number;
  };
  recommendedQuestions: Array<{
    id: string;
    sessionId: string;
    type: InterviewQuestionType;
    question: string;
    difficulty: InterviewDifficulty;
    technology: string;
    bookmarked: boolean;
  }>;
  weakAreas: string[];
  aiSuggestions: string[];
  sessions: InterviewSessionSummary[];
  latestSession: InterviewSession | null;
};

export type GenerateInterviewInput = {
  careerGoal: string;
  technology: string;
  difficulty: InterviewDifficulty;
};
