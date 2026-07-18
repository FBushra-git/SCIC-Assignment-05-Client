import type { Metadata } from "next";

import { PublicPageShell } from "@/components/content/public-page-shell";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return <PublicPageShell eyebrow="Legal - Updated July 18, 2026" title="Privacy policy" description="This policy explains the information SkillForge stores, why it is used, and the controls available to you." sections={[
    { title: "Information you provide", paragraphs: ["SkillForge stores account information supplied through email registration or Google authentication, profile details used for personalization, roadmap inputs, saved progress, project status, interview sessions, mentor conversations, and messages you intentionally submit."] },
    { title: "How information is used", paragraphs: ["Data is used to authenticate your account, generate and preserve personalized learning plans, calculate progress, ground AI recommendations, display your saved work, and diagnose support requests. SkillForge does not sell personal information."], bullets: ["Gemini receives the relevant learning context needed to answer an AI request", "Passwords are handled by Better Auth and stored as secure hashes", "Authentication cookies are used to maintain signed-in sessions", "Public project items show the author name and content you choose to publish"] },
    { title: "Retention and control", paragraphs: ["Learning records remain available while your account is active. You can edit profile information, remove owned project items, and delete your account from Profile. Account deletion removes the associated personalization profile; operational records may be retained when needed for security or legal obligations."] },
    { title: "Security and contact", paragraphs: ["Reasonable application and database protections are used, but no internet service can promise absolute security. Keep credentials private and report suspected account access through the recovery form. Privacy questions can be sent through Contact."] },
  ]} />;
}
