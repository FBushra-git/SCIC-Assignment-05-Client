import type { Metadata } from "next";

import { AuthShell } from "@/features/auth/auth-shell";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to continue your SkillForge AI learning journey.",
};

export default function LoginPage() {
  return (
    <AuthShell
      description="Continue your roadmap, projects, progress tracking, and AI mentor conversations."
      eyebrow="Welcome back"
      title="Sign in to your learning workspace"
    >
      <LoginForm />
    </AuthShell>
  );
}
