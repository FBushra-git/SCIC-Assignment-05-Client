import type { Metadata } from "next";

import { ProfileWorkspace } from "@/features/profile/profile-workspace";

export const metadata: Metadata = {
  title: "Your profile",
  description: "Manage the learning profile that powers SkillForge AI personalization.",
};

export default function ProfilePage() {
  return (
    <div className="profile-surface min-h-[calc(100svh-4rem)]">
      <ProfileWorkspace />
    </div>
  );
}
