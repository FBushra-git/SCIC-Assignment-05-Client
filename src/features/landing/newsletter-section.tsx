"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useNewsletterSubscription } from "@/features/platform/use-platform";

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address, such as name@example.com."),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export function NewsletterSection() {
  const subscription = useNewsletterSubscription();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterForm>({ resolver: zodResolver(newsletterSchema) });

  async function subscribe({ email }: NewsletterForm) {
    await subscription.mutateAsync(email);
    reset();
  }

  return (
    <section className="py-20 sm:py-24 lg:py-28" id="newsletter">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 px-6 py-12 text-white shadow-2xl shadow-blue-500/20 sm:px-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:px-14 lg:py-16">
          <div className="absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 right-0 size-64 rounded-full bg-cyan-200/20 blur-3xl" />

          <div className="relative">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
              <Mail aria-hidden="true" className="size-6" />
            </span>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-cyan-100">
              Keep learning forward
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Get practical career guidance in your inbox
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-blue-50">
              Receive new roadmap releases, project ideas, interview practice tips, and
              thoughtful learning strategies. No noise—only useful updates.
            </p>
          </div>

          <form
            className="relative mt-9 rounded-2xl border border-white/20 bg-slate-950/20 p-5 backdrop-blur-xl sm:p-6 lg:mt-0"
            noValidate
            onSubmit={handleSubmit(subscribe)}
          >
            <label className="text-sm font-bold" htmlFor="newsletter-email">
              Email address
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                aria-describedby={errors.email ? "newsletter-error" : "newsletter-help"}
                aria-invalid={Boolean(errors.email)}
                autoComplete="email"
                className="h-12 min-w-0 flex-1 rounded-xl border border-white/25 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-cyan-200 focus:ring-4 focus:ring-cyan-200/30 aria-invalid:border-red-300 aria-invalid:ring-red-300/20"
                id="newsletter-email"
                placeholder="you@example.com"
                type="email"
                {...register("email")}
              />
              <Button
                className="h-12 rounded-xl bg-slate-950 px-5 text-base font-bold text-white hover:bg-slate-900"
                disabled={subscription.isPending}
                type="submit"
              >
                {subscription.isPending ? <>Saving <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /></> : <>Subscribe <Send aria-hidden="true" className="size-4" /></>}
              </Button>
            </div>

            {errors.email ? (
              <p className="mt-2 text-sm font-semibold text-red-100" id="newsletter-error" role="alert">
                {errors.email.message}
              </p>
            ) : (
              <p className="mt-2 text-sm text-blue-100" id="newsletter-help">
                You can unsubscribe at any time.
              </p>
            )}

            {subscription.isSuccess ? (
              <p
                aria-live="polite"
                className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-950/35 p-3 text-sm font-medium text-emerald-50 ring-1 ring-emerald-200/20"
              >
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                You are subscribed. SkillForge updates will be sent to your email.
              </p>
            ) : null}
            {subscription.isError ? <p className="mt-4 rounded-xl bg-red-950/35 p-3 text-sm font-semibold text-red-100 ring-1 ring-red-200/20" role="alert">{subscription.error.message}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
