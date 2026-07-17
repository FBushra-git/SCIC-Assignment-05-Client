import type { CareerGoal, ExperienceLevel } from "@/features/profile/profile-data";

export type RoadmapResource = {
  title: string;
  type:
    | "Official Documentation"
    | "Video"
    | "Course"
    | "Article"
    | "Practice"
    | "GitHub Repository";
  url: string;
};

export type RoadmapStep = {
  id: string;
  weekNumber: number;
  topicName: string;
  objectives: string[];
  estimatedHours: number;
  resources: RoadmapResource[];
  practiceSuggestions: string[];
  suggestedProject: {
    title: string;
    description: string;
    deliverables: string[];
  };
  interviewCheckpoint: string;
  completed: boolean;
  completedAt: string | null;
};

export type Roadmap = {
  id: string;
  title: string;
  summary: string;
  careerGoal: CareerGoal;
  experienceLevel: ExperienceLevel;
  existingSkills: string[];
  weeklyStudyHours: number;
  targetCompletionDate: string | null;
  status: "active" | "completed" | "draft";
  currentWeek: number;
  totalWeeks: number;
  nextLesson: string;
  totalTopics: number;
  completedTopics: number;
  progress: number;
  estimatedCompletion: string;
  estimatedDurationWeeks: number;
  phases: Array<{
    title: string;
    description: string;
    startWeek: number;
    endWeek: number;
  }>;
  steps: RoadmapStep[];
  model: string;
  createdAt: string;
  updatedAt: string;
};

export type GenerateRoadmapInput = {
  careerGoal: CareerGoal;
  experienceLevel: ExperienceLevel;
  existingSkills: string[];
  weeklyStudyHours: number;
  targetCompletionDate?: string | null;
};
