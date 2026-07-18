import type { Metadata } from "next";

import { ItemsManageWorkspace } from "@/features/item/items-manage-workspace";

export const metadata: Metadata = { title: "Manage Project Items | SkillForge AI" };

export default function ManageItemsPage() {
  return <ItemsManageWorkspace />;
}
