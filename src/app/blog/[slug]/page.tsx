import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { blogPosts, findBlogPost } from "@/content/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = findBlogPost((await params).slug);
  return post ? { title: post.title, description: post.description } : { title: "Article not found" };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = findBlogPost((await params).slug);
  if (!post) notFound();

  return <><article><header className="section-shell py-10 sm:py-14"><Link className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-700 dark:text-cyan-300" href="/blog"><ArrowLeft className="size-4" /> All articles</Link><p className="mt-5 text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-300">{post.category}</p><h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">{post.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{post.description}</p><div className="mt-5 flex gap-5 text-sm font-semibold text-muted-foreground"><span className="flex items-center gap-2"><CalendarDays className="size-4" /> {new Date(post.publishedAt).toLocaleDateString(undefined, { dateStyle: "long" })}</span><span className="flex items-center gap-2"><Clock3 className="size-4" /> {post.readingTime}</span></div></header><div className="section-shell"><div className="relative h-72 overflow-hidden rounded-2xl sm:h-[28rem]"><Image alt={`${post.title} article cover`} className="object-cover" fill priority sizes="100vw" src={post.image} /></div></div><div className="section-shell py-12 sm:py-16"><div className="mx-auto grid max-w-3xl gap-10">{post.sections.map((section) => <section key={section.title}><h2 className="text-2xl font-bold">{section.title}</h2><div className="mt-4 grid gap-4 text-base leading-8 text-muted-foreground">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{section.bullets ? <ul className="mt-5 grid gap-3 rounded-2xl bg-muted/60 p-5">{section.bullets.map((bullet) => <li className="flex gap-3 text-sm leading-6" key={bullet}><span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600" />{bullet}</li>)}</ul> : null}</section>)}</div></div></article><SiteFooter /></>;
}
