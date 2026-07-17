import type { Metadata } from "next";

import { InterviewWorkspace } from "@/features/interview/interview-workspace";

export const metadata: Metadata = {
  title: "Interview preparation",
  description: "Generate and track personalized AI interview practice.",
};

export default function InterviewPage() {
  return <div className="dashboard-surface min-h-[calc(100svh-4rem)]"><InterviewWorkspace /></div>;
}
