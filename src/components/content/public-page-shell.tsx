import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PublicContentSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export function PublicPageShell({
  eyebrow,
  title,
  description,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections?: PublicContentSection[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-20 bg-[url('/images/skillforge/features-ethereal-waves-light.png')] bg-cover bg-center opacity-75 dark:bg-[url('/images/skillforge/features-ethereal-waves.png')]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/72 via-blue-950/58 to-cyan-950/38" />
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">{description}</p>
        </div>
      </section>

      {children ?? (
        <div className="section-shell py-12 sm:py-16">
          <div className="mx-auto grid max-w-4xl gap-6">
            {sections?.map((section) => (
              <section className="glass-panel rounded-2xl bg-white/80 p-6 sm:p-8 dark:bg-slate-900/70" key={section.title}>
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <div className="mt-4 grid gap-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {section.bullets?.length ? <ul className="mt-5 grid gap-3 sm:grid-cols-2">{section.bullets.map((bullet) => <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={bullet}><ArrowRight className="mt-1 size-4 shrink-0 text-blue-600 dark:text-cyan-300" /> {bullet}</li>)}</ul> : null}
              </section>
            ))}
            <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-500 p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div><h2 className="text-xl font-bold">Ready to build a focused learning plan?</h2><p className="mt-2 text-sm text-blue-50">Create your profile and turn your career goal into actionable milestones.</p></div>
              <Link className={cn(buttonVariants({ size: "lg" }), "mt-5 shrink-0 rounded-xl bg-white text-slate-950 hover:bg-cyan-50 sm:mt-0")} href="/register">Get started <ArrowRight /></Link>
            </div>
          </div>
        </div>
      )}
      <SiteFooter />
    </>
  );
}
