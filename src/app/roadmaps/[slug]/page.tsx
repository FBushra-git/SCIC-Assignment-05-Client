import type { Metadata } from "next";

import { PublicRoadmapDetails } from "@/features/explore/public-roadmap-details";

export const metadata: Metadata = { title: "Public roadmap" };

export default async function PublicRoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div className="dashboard-surface min-h-[calc(100svh-4rem)]"><PublicRoadmapDetails slug={slug} /></div>;
}
