import type { Metadata } from "next";

import { PublicPageShell } from "@/components/content/public-page-shell";

export const metadata: Metadata = { title: "Help Center" };

export default function HelpPage() {
  return <PublicPageShell eyebrow="Help center" title="Clear answers for every part of your learning workspace" description="Use these practical checks to resolve common setup, roadmap, progress, and AI mentor questions." sections={[
    { title: "Account and profile", paragraphs: ["If personalization looks incomplete, open Profile and confirm your career goal, experience, skills, weekly hours, language, and learning style. AI recommendations use this information as their baseline."], bullets: ["Use Demo Login for a ready demonstration identity", "Google sign-in requires the configured OAuth callback", "Never share passwords in a support request", "Use account recovery when normal sign-in fails"] },
    { title: "Roadmaps and progress", paragraphs: ["Generate a roadmap after completing your profile. Open My Roadmaps to resume a saved plan, expand weekly steps, and mark lessons complete. Every completion updates the progress indicators and recommendation context."], bullets: ["Only one roadmap needs to be active", "Completed steps remain stored in MongoDB", "Regenerate when your career goal changes materially", "Use Explore for public roadmap previews"] },
    { title: "AI mentor and interview practice", paragraphs: ["The mentor and question generator require a working Gemini API key on the server. If a response fails, confirm the server is running, the model is available, and the key still has quota. Your previous mentor messages are stored so later answers can use context."] },
    { title: "Still need help?", paragraphs: ["Submit a Product support request from the Contact page. Include the page, the action you attempted, and the visible error message, but do not include secrets or passwords."] },
  ]} />;
}
