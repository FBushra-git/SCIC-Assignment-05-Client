import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PublicPageShell } from "@/components/content/public-page-shell";
import { blogPosts } from "@/content/blog-posts";

export const metadata: Metadata = { title: "Blog", description: "Practical learning, portfolio, and interview strategies from SkillForge AI." };

export default function BlogPage() {
  return (
    <PublicPageShell eyebrow="SkillForge journal" title="Practical strategies for building career momentum" description="Focused guidance on roadmaps, project evidence, learning consistency, and technical interview preparation.">
      <div className="section-shell py-12 sm:py-16"><div className="grid gap-6 lg:grid-cols-3">{blogPosts.map((post) => <article className="glass-panel group overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/70" key={post.slug}><div className="relative h-52 overflow-hidden"><Image alt={`${post.title} article cover`} className="object-cover transition duration-500 group-hover:scale-105" fill sizes="(min-width: 1024px) 33vw, 100vw" src={post.image} /></div><div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-300">{post.category}</p><h2 className="mt-3 text-xl font-bold leading-7">{post.title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{post.description}</p><div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground"><span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" /> {new Date(post.publishedAt).toLocaleDateString(undefined, { dateStyle: "medium" })}</span><span className="flex items-center gap-1.5"><Clock3 className="size-3.5" /> {post.readingTime}</span></div><Link className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-blue-700 dark:text-cyan-300" href={`/blog/${post.slug}`}>Read article <ArrowRight className="size-4 transition group-hover:translate-x-1" /></Link></div></article>)}</div></div>
    </PublicPageShell>
  );
}
