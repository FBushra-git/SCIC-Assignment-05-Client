import type { Metadata } from "next";

import { ItemFormWorkspace } from "@/features/item/item-form-workspace";

export const metadata: Metadata = { title: "Add Project Item | SkillForge AI" };

export default function AddItemPage() {
  return <ItemFormWorkspace />;
}
