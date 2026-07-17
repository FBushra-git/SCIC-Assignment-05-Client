import type { Metadata } from "next";

import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://skillforge-ai.vercel.app"),
  title: {
    default: "SkillForge AI | Build your career roadmap",
    template: "%s | SkillForge AI",
  },
  description:
    "An AI-powered career roadmap and learning mentor for students, graduates, and self-learners.",
  keywords: [
    "AI learning mentor",
    "career roadmap",
    "technical interview preparation",
    "project recommendations",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen overflow-x-clip bg-background font-sans text-foreground antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}