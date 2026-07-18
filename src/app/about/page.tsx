import type { Metadata } from "next";

import { PublicPageShell } from "@/components/content/public-page-shell";

export const metadata: Metadata = { title: "About", description: "Learn how SkillForge AI turns career goals into practical, adaptive learning journeys." };

export default function AboutPage() {
  return <PublicPageShell eyebrow="About SkillForge AI" title="Career planning that keeps learning connected to outcomes" description="SkillForge AI is an agentic learning workspace for students, graduates, and self-learners who want a clear path from current skills to career readiness." sections={[
    { title: "Why we built it", paragraphs: ["Learning resources are abundant, but direction is still difficult. People lose time switching tutorials, choosing projects that do not reinforce their goals, and practicing interview topics without understanding their weak areas.", "SkillForge brings profile context, roadmaps, practical projects, progress, recommendations, and mentoring into one connected workflow."] },
    { title: "How the product thinks", paragraphs: ["The platform treats AI as a planning and reflection partner rather than a generic chat box. Recommendations are grounded in the learner's stated goal, current skills, completed milestones, saved projects, and conversation history."], bullets: ["Personalization starts with an editable learner profile", "Roadmaps are progressive and saved for continued use", "Progress changes future recommendations", "Interview practice follows completed topics"] },
    { title: "Our design principles", paragraphs: ["Every feature should explain what to do next, preserve user control, and make progress understandable. The interface supports light and dark themes, responsive navigation, keyboard access, and honest empty and error states."] },
  ]} />;
}
