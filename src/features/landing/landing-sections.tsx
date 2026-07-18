import {
  ArrowRight,
  ChevronDown,
  Clock3,
} from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";

import {
  careerPaths,
  frequentlyAskedQuestions,
  journeySteps,
  learningFeatures,
} from "./landing-content";

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
