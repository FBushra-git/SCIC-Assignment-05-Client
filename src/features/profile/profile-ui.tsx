"use client";

import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export const fieldClassName =
  "mt-2 h-12 w-full rounded-xl border border-input bg-background/80 px-4 text-sm font-semibold text-foreground shadow-sm outline-none transition placeholder:font-normal placeholder:text-muted-foreground/70 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-muted/70 disabled:text-muted-foreground dark:bg-slate-950/55";

type ProfileFieldProps = {
  children: ReactNode;
  error?: string;
  hint?: string;
  icon?: LucideIcon;
  label: string;
  htmlFor: string;
};

export function ProfileField({
  children,
  error,
  hint,
  icon: Icon,
  label,
  htmlFor,
}: ProfileFieldProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-bold" htmlFor={htmlFor}>
        {Icon ? <Icon aria-hidden="true" className="size-4 text-blue-600 dark:text-cyan-300" /> : null}
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-sm font-semibold text-destructive" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

type ProfileSectionProps = {
  children: ReactNode;
  description: string;
  icon: LucideIcon;
  id: string;
  title: string;
  action?: ReactNode;
};

export function ProfileSection({
  action,
  children,
  description,
  icon: Icon,
  id,
  title,
}: ProfileSectionProps) {
  return (
    <section
      className="glass-panel scroll-mt-24 rounded-[1.75rem] bg-white/75 p-5 shadow-xl shadow-slate-900/5 sm:p-7 dark:bg-slate-900/65"
      id={id}
    >
      <div className="flex flex-col gap-4 border-b border-border/75 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3.5">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/20">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        {action}
      </div>
      <div className="pt-6">{children}</div>
    </section>
  );
}

type ProfileAvatarProps = {
  name: string;
  photo: string;
  className?: string;
};

export function ProfileAvatar({ className, name, photo }: ProfileAvatarProps) {
  const [failedPhoto, setFailedPhoto] = useState<string | null>(null);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "SF";

  return (
    <div
      className={cn(
        "relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-[1.75rem] border-4 border-white/75 bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 text-2xl font-extrabold text-white shadow-xl shadow-blue-950/20 dark:border-slate-800/80",
        className,
      )}
    >
      {photo && failedPhoto !== photo ? (
        // User-controlled remote URLs cannot be declared in Next Image remotePatterns.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={`${name || "User"} profile`}
          className="size-full object-cover"
          onError={() => setFailedPhoto(photo)}
          src={photo}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
      <span className="absolute bottom-1.5 right-1.5 size-4 rounded-full border-2 border-white bg-emerald-400 dark:border-slate-900" />
    </div>
  );
}

export function CompletionRing({ percentage }: { percentage: number }) {
  return (
    <div
      aria-label={`${percentage}% profile complete`}
      className="grid size-24 shrink-0 place-items-center rounded-full p-2 shadow-lg shadow-cyan-950/20"
      role="img"
      style={{
        background: `conic-gradient(rgb(34 211 238) ${percentage * 3.6}deg, rgb(255 255 255 / 18%) 0deg)`,
      }}
    >
      <div className="grid size-full place-items-center rounded-full bg-slate-950/80 text-center backdrop-blur-xl">
        <div>
          <span className="block text-xl font-extrabold text-white">{percentage}%</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-100">
            Complete
          </span>
        </div>
      </div>
    </div>
  );
}

export function SaveSuccess({ message }: { message: string }) {
  return (
    <div
      aria-live="polite"
      className="flex items-start gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-800 dark:text-emerald-200"
      role="status"
    >
      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      {message}
    </div>
  );
}
