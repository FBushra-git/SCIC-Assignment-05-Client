"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Circle,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { authClient, getAuthErrorMessage } from "./auth-client";
import { AuthInput } from "./auth-input";
import { passwordRules, registerSchema, type RegisterValues } from "./auth-schemas";
import { GoogleAuthButton } from "./google-auth-button";

export function RegisterForm() {
  const router = useRouter();
  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const password = useWatch({ control, name: "password" }) ?? "";
  const completedRules = passwordRules.filter((rule) => rule.test(password)).length;

  async function createAccount(values: RegisterValues) {
    clearErrors("root");

    try {
      const result = await authClient.signUp.email({
        name: values.fullName,
        email: values.email,
        password: values.password,
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

  function showAuthError(message: string) {
    setError("root", { message });
  }

  return (
    <form className="grid gap-5" noValidate onSubmit={handleSubmit(createAccount)}>
      <GoogleAuthButton label="Sign up with Google" onError={showAuthError} />

      <div className="flex items-center gap-4" role="separator">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          or use email
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <AuthInput
        autoComplete="name"
        error={errors.fullName?.message}
        icon={UserRound}
        id="register-name"
        label="Full name"
        placeholder="Your full name"
        type="text"
        {...register("fullName")}
      />
      <AuthInput
        autoComplete="email"
        error={errors.email?.message}
        icon={Mail}
        id="register-email"
        label="Email address"
        placeholder="you@example.com"
        type="email"
        {...register("email")}
      />
      <AuthInput
        autoComplete="new-password"
        error={errors.password?.message}
        icon={LockKeyhole}
        id="register-password"
        label="Password"
        placeholder="Create a strong password"
        type="password"
        {...register("password")}
      />

      <div aria-live="polite" className="rounded-2xl border border-border bg-muted/45 p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold">Password strength</p>
          <p className="text-xs font-bold text-muted-foreground">{completedRules}/4 checks</p>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2" aria-hidden="true">
          {passwordRules.map((rule, index) => (
            <span
              className={cn(
                "h-1.5 rounded-full bg-border transition-colors",
                index < completedRules &&
                  (completedRules < 3
                    ? "bg-amber-400"
                    : completedRules === 3
                      ? "bg-sky-500"
                      : "bg-emerald-500"),
              )}
              key={rule.label}
            />
          ))}
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {passwordRules.map((rule) => {
            const complete = rule.test(password);
            return (
              <li
                className={cn(
                  "flex items-center gap-2 text-xs font-semibold text-muted-foreground",
                  complete && "text-emerald-700 dark:text-emerald-300",
                )}
                key={rule.label}
              >
                {complete ? (
                  <Check aria-hidden="true" className="size-3.5" />
                ) : (
                  <Circle aria-hidden="true" className="size-3.5" />
                )}
                {rule.label}
              </li>
            );
          })}
        </ul>
      </div>

      <AuthInput
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        icon={LockKeyhole}
        id="register-confirm-password"
        label="Confirm password"
        placeholder="Enter the same password again"
        type="password"
        {...register("confirmPassword")}
      />

      {errors.root?.message ? (
        <p
          aria-live="polite"
          className="rounded-xl border border-destructive/25 bg-destructive/10 p-3 text-sm font-semibold text-destructive"
          role="alert"
        >
          {errors.root.message}
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
          <UserRoundPlus aria-hidden="true" className="size-5" />
        )}
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-center text-xs leading-6 text-muted-foreground">
        By creating an account, you agree to the SkillForge AI{" "}
        <Link className="font-bold text-foreground hover:text-blue-600" href="/terms">
          Terms
        </Link>{" "}
        and{" "}
        <Link className="font-bold text-foreground hover:text-blue-600" href="/privacy">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          className="font-bold text-blue-700 outline-none hover:text-blue-500 focus-visible:ring-2 focus-visible:ring-ring dark:text-cyan-300"
          href="/login"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
