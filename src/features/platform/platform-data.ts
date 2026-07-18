export type PlatformStats = {
  registeredLearners: number;
  aiRoadmapsGenerated: number;
  projectsCompleted: number;
  interviewQuestionsGenerated: number;
  successRate: number;
  learningHours: number;
  activity: Array<{ month: string; learners: number; roadmaps: number }>;
};

export type ContactRequestInput = {
  name: string;
  email: string;
  kind: "general" | "support" | "account_recovery";
  subject: string;
  message: string;
};

export type ContactReceipt = { id: string; createdAt: string };
