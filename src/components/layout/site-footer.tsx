import { ExternalLink, LifeBuoy, Mail, MapPin } from "lucide-react";
import Link from "next/link";

import { Brand } from "@/components/layout/brand";

const footerGroups = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { label: "GitHub profile", href: "https://github.com/FBushra-git" },
  { label: "Client repository", href: "https://github.com/FBushra-git/SCIC-Assignment-05-Client" },
  { label: "Server repository", href: "https://github.com/FBushra-git/SCIC-Assignment-05-Server" },
];

export function SiteFooter() {
  return (
    <footer className="footer-surface relative overflow-hidden border-t border-border/60">
      <div className="absolute inset-0 bg-background/85 dark:bg-slate-950/80" />
      <div className="section-shell relative py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.35fr_0.65fr_0.65fr_0.8fr_1.2fr]">
          <div>
            <Brand />
            <p className="mt-5 max-w-sm leading-7 text-muted-foreground">
              An intelligent career-planning platform that turns ambitious goals into
              practical roadmaps, meaningful projects, and measurable progress.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                return (
                  <a
                    aria-label={`Visit SkillForge AI on ${social.label}`}
                    className="grid size-11 place-items-center rounded-xl border border-border bg-background/80 text-muted-foreground transition-colors hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:border-cyan-700 dark:hover:text-cyan-300"
                    href={social.href}
                    key={social.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExternalLink aria-hidden="true" className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
                {group.title}
              </h2>
              <ul className="mt-5 grid gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:text-cyan-300"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">Contact</h2>
            <ul className="mt-5 grid gap-4 text-sm text-muted-foreground">
              <li>
                <Link className="flex items-start gap-3 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:text-cyan-300" href="/contact">
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  Contact form
                </Link>
              </li>
              <li>
                <Link className="flex items-start gap-3 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:text-cyan-300" href="/help">
                  <LifeBuoy aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  Help center
                </Link>
              </li>
              <li className="flex items-start gap-3 leading-6">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SkillForge AI. All rights reserved.</p>
          <p>Built to make every learning hour count.</p>
        </div>
      </div>
    </footer>
  );
}
