import type { Metadata } from "next";

import { ItemsExploreWorkspace } from "@/features/item/items-explore-workspace";

export const metadata: Metadata = {
  title: "Explore Project Items | SkillForge AI",
  description: "Browse learner-owned portfolio project briefs with practical technology stacks and goals.",
};

export default function ItemsPage() {
  return <ItemsExploreWorkspace />;
}
