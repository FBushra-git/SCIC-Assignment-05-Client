import type { Metadata } from "next";
import Link from "next/link";

import { PublicPageShell } from "@/components/content/public-page-shell";
import { ContactRequestForm } from "@/features/platform/contact-request-form";

export const metadata: Metadata = { title: "Account Recovery" };

export default function ForgotPasswordPage() {
  return (
    <PublicPageShell eyebrow="Account recovery" title="Request help regaining account access" description="Submit the email associated with your account and describe the sign-in problem. Never include your current or previous password.">
      <div className="section-shell py-12 sm:py-16"><div className="mx-auto max-w-3xl"><div className="mb-5 rounded-2xl border border-amber-400/25 bg-amber-500/10 p-4 text-sm leading-6 text-amber-900 dark:text-amber-100">Automated reset email delivery is not enabled in this deployment. This secure request creates an account-recovery ticket for manual verification. If you remember your password, return to <Link className="font-bold underline" href="/login">sign in</Link>.</div><ContactRequestForm accountRecovery /></div></div>
    </PublicPageShell>
  );
}
