import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
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
        <AppProviders>
          <a
            className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            href="#main-content"
          >
            Skip to main content
          </a>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex flex-1 flex-col" id="main-content" tabIndex={-1}>
              {children}
            </main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}