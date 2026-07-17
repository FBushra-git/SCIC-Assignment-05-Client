"use client";

import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: LucideIcon;
  error?: string;
};

export function AuthInput({ className, error, icon: Icon, id, label, type, ...props }: AuthInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const errorId = `${id}-error`;

  return (
    <div>
      <label className="text-sm font-bold text-foreground" htmlFor={id}>
        {label}
      </label>
      <div className="relative mt-2">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        />
        <input
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 w-full rounded-xl border border-input bg-background/85 pl-11 pr-4 text-base text-foreground shadow-sm outline-none transition duration-200 placeholder:text-muted-foreground/75 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/10 dark:bg-slate-950/60",
            isPassword && "pr-12",
            className,
          )}
          id={id}
          type={isPassword && passwordVisible ? "text" : type}
          {...props}
        />
        {isPassword ? (
          <button
            aria-label={passwordVisible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            className="absolute right-1.5 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setPasswordVisible((visible) => !visible)}
            type="button"
          >
            {passwordVisible ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
          </button>
        ) : null}
      </div>
      {error ? (
        <p className="mt-2 text-sm font-medium text-destructive" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
