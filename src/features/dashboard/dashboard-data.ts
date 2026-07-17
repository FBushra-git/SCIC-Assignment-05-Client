export type DashboardRoadmap = {
  id: string;
  title: string;
  currentWeek: number;
  totalWeeks: number;
  nextLesson: string;
  remainingTopics: number;
  estimatedCompletion: string | null;
  progress: number;
};

export type DashboardSuggestion = {
  id: string;
  type: "learning" | "project" | "interview" | "resource";
  title: string;
  description: string;
  actionLabel: string;
  href: string;
};

export type DashboardActivity = {
  id: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
};

export type DashboardData = {
  user: {
    name: string;
    firstName: string;
    image: string | null;
    careerGoal: string;
  };
  banner: {
    quote: string;
    weeklyTargetHours: number;
    studiedHours: number;
  };
  currentRoadmap: DashboardRoadmap | null;
  progress: {
    overallCompletion: number;
    weeklyProgress: number;
    completedSkills: number;
    remainingSkills: number;
  };
  suggestions: DashboardSuggestion[];
  recentActivity: DashboardActivity[];
  analytics: {
      learningProgress: Array<{ week: string; completedLessons: number }>;
      monthlyProgress: Array<{
        month: string;
        completedLessons: number;
        studyHours: number;
      }>;
    weeklyStudyTime: Array<{ day: string; date: string; hours: number }>;
    skillsDistribution: Array<{ name: string; value: number }>;
    projectCompletion: Array<{ name: string; value: number }>;
    learningStreak: number;
  };
};
