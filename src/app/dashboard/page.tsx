import type { Metadata } from "next";

import { DashboardWorkspace } from "@/features/dashboard/dashboard-workspace";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Monitor learning progress and continue your SkillForge AI career journey.",
};

export default function DashboardPage() {
  return (
    <div className="dashboard-surface min-h-[calc(100svh-4rem)]">
      <DashboardWorkspace />
    </div>
  );
}
