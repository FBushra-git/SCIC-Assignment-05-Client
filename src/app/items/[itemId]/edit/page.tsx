import type { Metadata } from "next";

import { ItemFormWorkspace } from "@/features/item/item-form-workspace";

export const metadata: Metadata = { title: "Edit Project Item | SkillForge AI" };

export default async function EditItemPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  return <ItemFormWorkspace itemId={itemId} />;
}
