export type ProjectDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type ProjectStatus = "planned" | "in_progress" | "completed";

export type Project = {
  slug: string;
  thumbnail: string;
  name: string;
  difficulty: ProjectDifficulty;
  technologies: string[];
  estimatedTime: string;
  shortDescription: string;
  description: string;
  skillsLearned: string[];
  objectives: string[];
  features: string[];
  learningOutcomes: string[];
  relatedSlugs?: string[];
  userStatus: ProjectStatus | null;
};

export type ProjectDetails = Project & {
  related: Array<Omit<Project, "userStatus">>;
};
