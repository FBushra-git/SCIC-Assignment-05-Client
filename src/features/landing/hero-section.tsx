"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const benefits = ["Adaptive weekly plans", "Portfolio-ready projects", "Interview practice"];

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const hidden = reduceMotion ? {} : { opacity: 0, y: 24 };

  return (
    <section className="hero-surface relative isolate -mt-16 overflow-hidden pt-16" id="home">
      <div aria-hidden="true" className="ambient-float absolute -left-28 top-28 size-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div aria-hidden="true" className="ambient-float ambient-float-delayed absolute -right-24 bottom-12 size-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="section-shell relative flex min-h-[72svh] items-center py-12 sm:py-16 lg:py-20">
        <div className="glass-panel grid w-full items-center gap-10 overflow-hidden rounded-2xl p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-12 xl:gap-16">
          <motion.div animate="show" className="relative z-10" initial="hidden" variants={{ hidden: {}, show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } } }}>
            <motion.div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-4 text-sm font-semibold text-blue-700 shadow-sm dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200" variants={{ hidden, show: { opacity: 1, y: 0 } }}>
              <Sparkles aria-hidden="true" className="size-4" /> Agentic AI for focused career growth
            </motion.div>
            <motion.h1 className="mt-7 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl" variants={{ hidden, show: { opacity: 1, y: 0 } }}>
              Learn Smarter with Your Personal <span className="gradient-text">AI Career Mentor</span>
            </motion.h1>
            <motion.p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg dark:text-slate-200" variants={{ hidden, show: { opacity: 1, y: 0 } }}>
              SkillForge AI creates personalized learning roadmaps, recommends portfolio projects, tracks your progress, and prepares you for technical interviews using intelligent AI guidance.
            </motion.p>
            <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" variants={{ hidden, show: { opacity: 1, y: 0 } }}>
              <Link className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-6 text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:brightness-105")} href="/register">Get Started <ArrowRight className="size-4" /></Link>
              <Link className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 rounded-xl border-slate-300/80 bg-white/70 px-6 text-base font-bold backdrop-blur-sm dark:border-white/20 dark:bg-slate-950/50")} href="/roadmaps">Explore Roadmaps</Link>
            </motion.div>
            <motion.div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-700 dark:text-slate-200" variants={{ hidden, show: { opacity: 1, y: 0 } }}>
              {benefits.map((benefit) => <span className="inline-flex items-center gap-2" key={benefit}><CheckCircle2 className="size-4 text-emerald-500" />{benefit}</span>)}
            </motion.div>
          </motion.div>

          <motion.div animate={{ opacity: 1, scale: 1, x: 0 }} className="relative mx-auto w-full max-w-xl lg:max-w-none" initial={reduceMotion ? false : { opacity: 0, scale: 0.92, x: 44 }} transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.2 }}>
            <motion.div animate={reduceMotion ? undefined : { y: [0, -10, 0] }} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/45 bg-slate-950/20 shadow-2xl shadow-blue-950/25 sm:aspect-[5/4] lg:aspect-[4/5] dark:border-white/10" transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}>
              <Image alt="Ethereal AI learning companion guiding a personalized career journey" className="object-cover object-center" fill priority sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 44vw, (min-width: 640px) 36rem, 100vw" src="/images/skillforge/auth-ethereal-learning.png" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/58 via-slate-950/0 to-cyan-200/0" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-slate-950/[0.68] p-4 text-white shadow-lg backdrop-blur-xl sm:inset-x-6 sm:bottom-6">
                <div className="flex items-center justify-between gap-4"><span><span className="block text-xs text-cyan-200">Personalized guidance</span><span className="mt-1 block font-heading text-lg font-bold">Your roadmap adapts as you grow</span></span><Sparkles className="size-6 text-cyan-300" /></div>
              </div>
            </motion.div>
            <motion.div animate={reduceMotion ? undefined : { y: [0, -9, 0] }} className="absolute -right-4 top-6 hidden items-center gap-3 rounded-2xl border border-white/45 bg-white/[0.82] p-3 shadow-xl backdrop-blur-xl sm:flex dark:border-white/10 dark:bg-slate-900/[0.82]" transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}>
              <span className="grid size-10 place-items-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300"><CheckCircle2 className="size-5" /></span>
              <span><span className="block text-xs text-muted-foreground">One connected workspace</span><span className="font-heading text-sm font-bold">Plan, build, practice</span></span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
