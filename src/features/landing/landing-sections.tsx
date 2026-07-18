import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  careerPaths,
  frequentlyAskedQuestions,
  journeySteps,
  learningFeatures,
} from "./landing-content";

export function HeroSection() {
  return (
    <section className="hero-surface relative isolate overflow-hidden" id="home">
      <div className="ambient-float absolute -left-28 top-24 size-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="ambient-float ambient-float-delayed absolute -right-24 bottom-12 size-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="section-shell relative flex min-h-[65svh] items-center py-12 sm:py-16 lg:py-20">
        <div className="glass-panel grid w-full items-center gap-10 overflow-hidden rounded-2xl p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-12 xl:gap-16">
          <div className="relative z-10">
            <div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-4 text-sm font-semibold text-blue-700 shadow-sm dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
              <Sparkles aria-hidden="true" className="size-4" />
              Agentic AI for focused career growth
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              Learn Smarter with Your Personal{" "}
              <span className="gradient-text">AI Career Mentor</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg dark:text-slate-200">
              SkillForge AI creates personalized learning roadmaps, recommends portfolio
              projects, tracks your progress, and prepares you for technical interviews
              using intelligent AI guidance.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-6 text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:brightness-105",
                )}
                href="/register"
              >
                Get Started
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-12 rounded-xl border-slate-300/80 bg-white/70 px-6 text-base font-bold backdrop-blur-sm dark:border-white/20 dark:bg-slate-950/50",
                )}
                href="/roadmaps"
              >
                Explore Roadmaps
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              {["Adaptive weekly plans", "Portfolio-ready projects", "Interview practice"].map(
                (benefit) => (
                  <span className="inline-flex items-center gap-2" key={benefit}>
                    <CheckCircle2 aria-hidden="true" className="size-4 text-emerald-500" />
                    {benefit}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              aria-label="Ethereal AI neural network shaping a personalized learning journey"
              className="hero-visual relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/40 shadow-2xl shadow-blue-950/20 sm:aspect-[5/4] lg:aspect-[4/5] dark:border-white/10"
              role="img"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent" />

              <div className="absolute inset-x-4 bottom-4 grid gap-3 sm:inset-x-6 sm:bottom-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/20 bg-slate-950/65 p-4 text-white shadow-lg backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-200">Adaptive roadmap</span>
                    <CheckCircle2 className="size-5 text-cyan-300" />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-300">Built around your goal, skills, and weekly schedule.</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-slate-950/65 p-4 text-white shadow-lg backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-emerald-400/20 text-emerald-300">
                      <Sparkles aria-hidden="true" className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-slate-300">Next best action</span>
                      <span className="font-heading text-lg font-bold">Context-aware</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ambient-float absolute -right-4 top-6 hidden items-center gap-3 rounded-2xl border border-white/40 bg-white/80 p-3 shadow-xl backdrop-blur-xl sm:flex dark:border-white/10 dark:bg-slate-900/80">
              <span className="grid size-10 place-items-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300">
                <CheckCircle2 aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground">One connected workspace</span>
                <span className="font-heading text-sm font-bold">Plan, build, practice</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section className="features-surface relative overflow-hidden py-20 sm:py-24 lg:py-32" id="features">
      <div className="section-shell relative">
        <SectionHeading
          description="SkillForge connects planning, practice, progress, and mentorship so your learning journey keeps moving toward a real career outcome."
          eyebrow="Why SkillForge"
          title="Guidance that adapts as you grow"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {learningFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                className="group rounded-2xl border border-border/80 bg-card/90 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:bg-card/75 dark:hover:border-cyan-400/40"
                key={feature.title}
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-card-foreground">{feature.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CareerPathsSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" id="career-paths">
      <div className="section-shell">
        <SectionHeading
          description="Choose a destination, then let SkillForge turn it into a practical sequence of skills, projects, and interview preparation."
          eyebrow="Popular career paths"
          title="Build toward the role you want"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {careerPaths.map((career) => {
            const Icon = career.icon;

            return (
              <article
                className="group flex min-h-72 flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:border-cyan-400/40"
                key={career.slug}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue-100 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-400/10 dark:text-blue-300 dark:group-hover:bg-cyan-400 dark:group-hover:text-slate-950">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                    <Clock3 aria-hidden="true" className="size-3.5" />
                    {career.duration}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold">{career.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-muted-foreground">{career.description}</p>

                <Link
                  aria-label={`Explore the ${career.title} roadmap`}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-xl font-bold text-blue-700 outline-none transition-colors hover:text-blue-500 focus-visible:ring-2 focus-visible:ring-ring dark:text-cyan-300"
                  href={`/roadmaps?career=${career.slug}`}
                >
                  Explore Roadmap
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="bg-muted/55 py-20 sm:py-24 lg:py-32" id="how-it-works">
      <div className="section-shell">
        <SectionHeading
          description="A guided loop keeps your plan useful: learn, build, measure what changed, and receive the next recommendation."
          eyebrow="How it works"
          title="From career goal to interview confidence"
        />

        <ol className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-7 lg:gap-3">
          <div
            aria-hidden="true"
            className="absolute left-[7%] right-[7%] top-8 hidden h-px bg-gradient-to-r from-blue-300 via-cyan-400 to-emerald-300 lg:block dark:from-blue-700 dark:via-cyan-700 dark:to-emerald-700"
          />
          {journeySteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <li
                className="relative grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm lg:block lg:border-0 lg:bg-transparent lg:p-0 lg:text-center lg:shadow-none"
                key={step.title}
              >
                <span className="relative z-10 grid size-16 shrink-0 place-items-center rounded-2xl border-4 border-background bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/20 lg:mx-auto">
                  <Icon aria-hidden="true" className="size-6" />
                  <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-background text-[0.7rem] font-bold text-blue-700 ring-1 ring-border dark:text-cyan-300">
                    {index + 1}
                  </span>
                </span>
                <div className="lg:mt-5">
                  <h3 className="text-base font-bold leading-6">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="bg-muted/55 py-20 sm:py-24 lg:py-32" id="faq">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          align="left"
          description="Everything you need to know before starting your first personalized career roadmap."
          eyebrow="Frequently asked questions"
          title="Questions, answered clearly"
        />

        <div className="grid gap-3">
          {frequentlyAskedQuestions.map((item, index) => (
            <details
              className="group rounded-2xl border border-border bg-background shadow-sm open:border-blue-200 open:shadow-md dark:open:border-cyan-800"
              key={item.question}
              open={index === 0}
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 rounded-2xl px-5 py-4 font-heading font-bold outline-none transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="px-5 pb-5 leading-7 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
