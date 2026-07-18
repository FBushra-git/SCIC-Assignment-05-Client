export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  image: string;
  sections: Array<{ title: string; paragraphs: string[]; bullets?: string[] }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "build-a-roadmap-you-can-finish",
    title: "How to build a learning roadmap you can actually finish",
    description: "Turn an ambitious career goal into weekly evidence of progress without overloading your schedule.",
    category: "Learning strategy",
    readingTime: "6 min read",
    publishedAt: "2026-07-12",
    image: "/images/skillforge/dashboard-ethereal-banner-light.png",
    sections: [
      { title: "Start with the role, not a tool list", paragraphs: ["A useful roadmap begins with the work you want to perform. A frontend role, for example, requires more than memorizing React APIs: it also needs accessible interface design, browser fundamentals, testing, and the ability to explain tradeoffs.", "Write down the kinds of problems the target role solves. Technologies then become supporting choices instead of disconnected goals."] },
      { title: "Plan in small learning loops", paragraphs: ["Each week should combine a concept, deliberate practice, and a visible output. The output can be a documented component, an API endpoint, a short analysis, or a project milestone."], bullets: ["Choose one primary concept per week", "Reserve time for review and correction", "Finish with something you can demonstrate", "Adjust the next week using what you learned"] },
      { title: "Measure evidence, not time alone", paragraphs: ["Study hours describe effort, but completed milestones show capability. Track both. If the same topic remains unfinished for several weeks, reduce scope or revisit the prerequisite rather than adding more resources."] },
    ],
  },
  {
    slug: "portfolio-projects-that-show-skill",
    title: "Portfolio projects that demonstrate real engineering skill",
    description: "Choose project scope that reveals your decisions, product thinking, and technical depth to reviewers.",
    category: "Projects",
    readingTime: "7 min read",
    publishedAt: "2026-07-08",
    image: "/images/projects/developer-portfolio-photo.webp",
    sections: [
      { title: "Solve a clear user problem", paragraphs: ["A strong portfolio project makes its audience and outcome obvious. Instead of building a generic dashboard, define who uses it, what decision it supports, and which workflow must feel effortless."] },
      { title: "Make engineering decisions visible", paragraphs: ["A polished interface is valuable, but reviewers also need to understand how you handled state, data validation, failures, accessibility, and deployment."], bullets: ["Document the data model and API boundaries", "Show loading, empty, error, and success states", "Explain one meaningful tradeoff", "Include a repeatable setup and test path"] },
      { title: "Prefer depth over feature count", paragraphs: ["Three dependable workflows are more convincing than fifteen incomplete screens. Build the smallest end-to-end version, test it with another person, then improve the parts that create the most value."] },
    ],
  },
  {
    slug: "prepare-for-technical-interviews-with-context",
    title: "Prepare for technical interviews with context, not memorization",
    description: "Use your roadmap and completed projects to practice explanations that connect concepts to experience.",
    category: "Interview preparation",
    readingTime: "5 min read",
    publishedAt: "2026-07-03",
    image: "/images/projects/ai-study-companion-photo.webp",
    sections: [
      { title: "Practice retrieval before recognition", paragraphs: ["Reading an answer can feel familiar without making it easy to produce under pressure. Close the reference and explain the concept aloud, sketch the data flow, or write a small example from memory."] },
      { title: "Connect every answer to a decision", paragraphs: ["After explaining a concept, add where you used it and what changed because of that choice. Project context turns a textbook answer into evidence of applied understanding."], bullets: ["State the concept in plain language", "Give a compact technical example", "Describe a project decision", "Mention a limitation or alternative"] },
      { title: "Use weak areas to plan the next session", paragraphs: ["Record questions that required hints or produced incomplete explanations. Group them by prerequisite, then schedule short review blocks before generating another large set of questions."] },
    ],
  },
];

export function findBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
