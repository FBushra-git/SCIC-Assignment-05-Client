import type { Metadata } from "next";

import { ItemDetailsWorkspace } from "@/features/item/item-details-workspace";

export const metadata: Metadata = { title: "Project Item Details | SkillForge AI" };

export default async function ItemDetailsPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  return <ItemDetailsWorkspace itemId={itemId} />;
}
