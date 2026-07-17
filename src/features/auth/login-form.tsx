"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, LoaderCircle, LockKeyhole, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { authClient, getAuthErrorMessage } from "./auth-client";
import { AuthInput } from "./auth-input";
import { loginSchema, type LoginValues } from "./auth-schemas";
import { GoogleAuthButton } from "./google-auth-button";

const demoCredentials = {
  email: "demo@skillforge.ai",
  password: "SkillForgeDemo123!",
};

export function LoginForm() {
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
    setFocus,
    setValue,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
    mode: "onBlur",
  });

  async function login(values: LoginValues) {
    setNotice("");
    clearErrors("root");

    try {
      const result = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      if (result.error) {
        setError("root", { message: getAuthErrorMessage(result.error) });
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError("root", { message: getAuthErrorMessage(error) });
    }
  }

  function fillDemoCredentials() {
    clearErrors();
    setValue("email", demoCredentials.email, { shouldDirty: true, shouldValidate: true });
    setValue("password", demoCredentials.password, { shouldDirty: true, shouldValidate: true });
    setNotice("Demo credentials are ready. Select Sign in to continue.");
    setFocus("email");
  }

  function showAuthError(message: string) {
    setError("root", { message });
  }

  return (
    <form className="grid gap-5" noValidate onSubmit={handleSubmit(login)}>
      <GoogleAuthButton label="Continue with Google" onError={showAuthError} />

      <div className="flex items-center gap-4" role="separator">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          or use email
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <AuthInput
        autoComplete="email"
        error={errors.email?.message}
        icon={Mail}
        id="login-email"
        label="Email address"
        placeholder="you@example.com"
        type="email"
        {...register("email")}
      />
      <AuthInput
        autoComplete="current-password"
        error={errors.password?.message}
        icon={LockKeyhole}
        id="login-password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        {...register("password")}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 font-semibold text-muted-foreground">
          <input
            className="size-4 rounded border-input accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            type="checkbox"
            {...register("rememberMe")}
          />
          Remember me
        </label>
        <Link
          className="inline-flex min-h-11 items-center font-bold text-blue-700 outline-none hover:text-blue-500 focus-visible:ring-2 focus-visible:ring-ring dark:text-cyan-300"
          href="/forgot-password"
        >
          Forgot password?
        </Link>
      </div>

      {errors.root?.message ? (
        <p
          aria-live="polite"
          className="rounded-xl border border-destructive/25 bg-destructive/10 p-3 text-sm font-semibold text-destructive"
          role="alert"
        >
          {errors.root.message}
        </p>
      ) : null}

      {notice ? (
        <p
          aria-live="polite"
          className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm font-semibold text-blue-800 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200"
        >
          {notice}
        </p>
      ) : null}

      <Button
        className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-base font-bold text-white shadow-lg shadow-blue-500/20 hover:brightness-105"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <LoaderCircle aria-hidden="true" className="size-5 motion-safe:animate-spin" />
        ) : (
          <LogIn aria-hidden="true" className="size-5" />
        )}
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>

      <Button
        className="h-12 w-full rounded-xl text-base font-bold"
        onClick={fillDemoCredentials}
        type="button"
        variant="secondary"
      >
        <KeyRound aria-hidden="true" className="size-5" />
        Fill demo login
      </Button>

      <div className="rounded-2xl border border-border bg-muted/55 p-4 text-sm">
        <p className="font-bold text-foreground">Demo account</p>
        <p className="mt-2 break-all text-muted-foreground">
          {demoCredentials.email} · {demoCredentials.password}
        </p>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        New to SkillForge?{" "}
        <Link
          className="font-bold text-blue-700 outline-none hover:text-blue-500 focus-visible:ring-2 focus-visible:ring-ring dark:text-cyan-300"
          href="/register"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
