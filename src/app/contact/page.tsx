import type { Metadata } from "next";

import { PublicPageShell } from "@/components/content/public-page-shell";
import { ContactRequestForm } from "@/features/platform/contact-request-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PublicPageShell eyebrow="Contact" title="Tell us what you need help with" description="Product questions, support requests, and account recovery messages are validated and stored securely for follow-up.">
      <div className="section-shell py-12 sm:py-16"><div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-[0.65fr_1.35fr]"><aside className="rounded-2xl bg-slate-950 p-6 text-white"><h2 className="text-xl font-bold">Before you send</h2><ul className="mt-5 grid gap-4 text-sm leading-6 text-slate-300"><li>Include the page and action that caused a problem.</li><li>Copy the visible error message when possible.</li><li>Never include passwords, API keys, or database credentials.</li><li>Use Account recovery for sign-in problems.</li></ul></aside><ContactRequestForm /></div></div>
    </PublicPageShell>
  );
}
