import type { Metadata } from "next";

import { PublicPageShell } from "@/components/content/public-page-shell";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return <PublicPageShell eyebrow="Careers" title="Help make career growth more intentional" description="SkillForge is built around thoughtful product engineering, useful AI, and respect for the learner's time." sections={[
    { title: "Current opportunities", paragraphs: ["There are no open roles at this time. This page will be updated when a position has a defined scope, hiring process, and responsible contact path. We do not collect speculative applications."] },
    { title: "What we value", paragraphs: ["Future collaborators should care about clear writing, dependable software, accessible interfaces, and AI experiences that remain transparent and user-controlled."], bullets: ["Evidence-driven product decisions", "Clean, testable implementation", "Inclusive and responsive design", "Responsible use of learner data"] },
    { title: "Follow the project", paragraphs: ["You can review the active client and server repositories from the footer. Product questions and collaboration inquiries can be submitted through the Contact page."] },
  ]} />;
}
