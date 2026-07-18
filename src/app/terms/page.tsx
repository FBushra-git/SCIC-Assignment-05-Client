import type { Metadata } from "next";

import { PublicPageShell } from "@/components/content/public-page-shell";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return <PublicPageShell eyebrow="Legal - Updated July 18, 2026" title="Terms and conditions" description="These terms define responsible use of SkillForge AI and the limits of AI-assisted career guidance." sections={[
    { title: "Using the service", paragraphs: ["You may use SkillForge for lawful personal learning and portfolio planning. You are responsible for accurate account information, protecting access credentials, and activity performed through your account."], bullets: ["Do not attempt to bypass authorization or access another learner's data", "Do not submit malicious code or abusive automated traffic", "Do not publish content you lack permission to share", "Do not represent AI output as guaranteed professional advice"] },
    { title: "AI-generated guidance", paragraphs: ["Roadmaps, explanations, recommendations, and interview questions may contain errors or omit context. Review important technical information against primary documentation and adapt the guidance to your circumstances. SkillForge does not guarantee employment, certification, or a specific learning outcome."] },
    { title: "Your content", paragraphs: ["You retain responsibility for profile data, project briefs, prompts, and other content you submit. You grant the service permission to process that content only as needed to provide the requested features. Public project items are visible to visitors until you edit or delete them."] },
    { title: "Availability and changes", paragraphs: ["Features may change as the platform improves or as third-party services such as Gemini, Google OAuth, hosting, and databases update their systems. Material policy changes will be reflected by a revised date on this page."] },
  ]} />;
}
