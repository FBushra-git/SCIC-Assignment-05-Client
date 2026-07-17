import { BrainCircuit, CheckCircle2, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

const trustPoints = [
  "Private roadmaps and progress history",
  "Secure database-backed sessions",
  "Context that stays connected to your goals",
];

export function AuthShell({ children, description, eyebrow, title }: AuthShellProps) {
  return (
    <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="absolute -left-24 top-24 size-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -right-28 bottom-10 size-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="section-shell relative">
        <div className="glass-panel mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] lg:min-h-[720px] lg:grid-cols-[0.92fr_1.08fr]">
          <aside className="auth-banner relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/40 to-slate-950/85" />
            <div className="relative">
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-bold text-cyan-100 backdrop-blur-xl">
                <Sparkles aria-hidden="true" className="size-4" />
                Your secure learning workspace
              </span>
              <h2 className="mt-7 max-w-md text-4xl font-bold leading-tight xl:text-5xl">
                Your career plan should remember where you are going.
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-slate-200">
                Sign in once to keep every roadmap, project, mentor conversation, and milestone
                connected across your learning journey.
              </p>
            </div>

            <div className="relative">
              <div className="grid gap-3">
                {trustPoints.map((point) => (
                  <div
                    className="flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/35 p-3.5 text-sm font-semibold text-slate-100 backdrop-blur-xl"
                    key={point}
                  >
                    <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-emerald-300" />
                    {point}
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { icon: ShieldCheck, label: "Protected" },
                  { icon: BrainCircuit, label: "Personal" },
                  { icon: LockKeyhole, label: "Private" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="rounded-2xl bg-white/10 p-3 text-center backdrop-blur-xl" key={item.label}>
                      <Icon aria-hidden="true" className="mx-auto size-5 text-cyan-200" />
                      <span className="mt-2 block text-xs font-bold text-slate-100">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="flex items-center bg-background/88 p-6 sm:p-10 lg:p-12 dark:bg-slate-950/82">
            <div className="mx-auto w-full max-w-lg">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-300">
                {eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
              <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
              <div className="mt-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
