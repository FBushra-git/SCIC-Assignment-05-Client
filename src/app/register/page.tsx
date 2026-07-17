import type { Metadata } from "next";

import { AuthShell } from "@/features/auth/auth-shell";
import { RegisterForm } from "@/features/auth/register-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your SkillForge AI account and begin a personalized career roadmap.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      description="Create one secure account for your personalized roadmaps, projects, progress, and AI mentor context."
      eyebrow="Start your journey"
      title="Create your SkillForge account"
    >
      <RegisterForm />
    </AuthShell>
  );
}
