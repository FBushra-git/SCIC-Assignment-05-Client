import type { Metadata } from "next";

import { ResourcesWorkspace } from "@/features/explore/resources-workspace";

export const metadata: Metadata = {
  title: "Learning resources",
  description: "Browse carefully selected career learning resources.",
};

export default function ResourcesPage() {
  return <div className="dashboard-surface min-h-[calc(100svh-4rem)]"><ResourcesWorkspace /></div>;
}
