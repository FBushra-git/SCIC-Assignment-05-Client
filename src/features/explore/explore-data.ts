export type LearningResource = {
  id: string;
  thumbnail: string;
  title: string;
  source: string;
  type:
    | "Official Documentation"
    | "YouTube Tutorial"
    | "Article"
    | "Online Course"
    | "Coding Challenge"
    | "Practice Platform";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  url: string;
  technologies: string[];
  description: string;
};

export type PublicRoadmapSummary = {
  slug: string;
  careerTitle: string;
  category:
    | "Web Development"
    | "Mobile"
    | "Design"
    | "Data & AI"
    | "Security"
    | "Cloud & DevOps"
    | "Quality";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  durationWeeks: number;
  topicCount: number;
  popularity: number;
  createdAt: string;
  coverImage: string;
  technologies: string[];
  description: string;
  author: "SkillForge AI";
};

export type PublicRoadmapDetails = PublicRoadmapSummary & {
  keywords: string[];
  learningOutcomes: string[];
  steps: Array<{
    order: number;
    title: string;
    summary: string;
    estimatedHours: number;
    objectives: string[];
    resources: LearningResource[];
  }>;
  related: PublicRoadmapSummary[];
};

export type Pagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type ExploreFilters = {
  search: string;
  career: string;
  category: string;
  difficulty: string;
  duration: string;
  technology: string;
  popularity: string;
  sort: "newest" | "popular" | "shortest" | "longest" | "alphabetical";
  page: number;
};

export type PublicRoadmapResult = {
  items: PublicRoadmapSummary[];
  pagination: Pagination;
  facets: {
    categories: string[];
    difficulties: string[];
    technologies: string[];
  };
};

export type ResourceFilters = {
  search: string;
  type: string;
  difficulty: string;
  technology: string;
  page: number;
};

export type ResourceResult = {
  items: LearningResource[];
  pagination: Pagination;
  facets: {
    types: string[];
    difficulties: string[];
    technologies: string[];
  };
};
