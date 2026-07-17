export type Recommendation = {
  id: string;
  userId: string;
  summary: string;
  model: string;
  createdAt: string;
  items: Array<{
    id: string;
    type: "learning" | "project" | "interview" | "resource";
    title: string;
    reason: string;
    priority: "high" | "medium" | "low";
    resources: Array<{
      title: string;
      url: string;
      type:
        | "Official Documentation"
        | "Video"
        | "Practice"
        | "Article"
        | "GitHub Repository";
    }>;
  }>;
};
