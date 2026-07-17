import type { Metadata } from "next";

import { MentorWorkspace } from "@/features/mentor/mentor-workspace";

export const metadata: Metadata = {
  title: "AI Mentor",
  description: "Get contextual learning guidance from your SkillForge AI mentor.",
};

export default function MentorPage() {
  return <main className="dashboard-surface min-h-[calc(100svh-4rem)]"><MentorWorkspace /></main>;
}
