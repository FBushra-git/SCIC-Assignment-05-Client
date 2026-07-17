"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  Link2,
  LoaderCircle,
  LockKeyhole,
  Moon,
  ShieldCheck,
  Sun,
  Trash2,
  Unlink,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  changePasswordSchema,
  deleteAccountSchema,
  type ChangePasswordValues,
  type DeleteAccountValues,
} from "./account-security-schema";
import { fieldClassName, ProfileField, ProfileSection } from "./profile-ui";
import {
  useChangePassword,
  useConnectedAccounts,
  useDeleteAccount,
  useGoogleAccount,
} from "./use-account-security";

function mutationMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function AccountSecurity() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const accountsQuery = useConnectedAccounts();
  const passwordMutation = useChangePassword();
  const googleAccount = useGoogleAccount();
  const deleteMutation = useDeleteAccount();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const accounts = accountsQuery.data ?? [];
  const hasCredential = accounts.some((account) => account.providerId === "credential");
  const hasGoogle = accounts.some((account) => account.providerId === "google");
  const canDisconnectGoogle = hasGoogle && accounts.length > 1;

  const passwordForm = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });
  const deleteForm = useForm<DeleteAccountValues>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { confirmation: "", password: "" },
  });

  async function changePassword(values: ChangePasswordValues) {
    setNotice(null);
    passwordMutation.reset();

    try {
      await passwordMutation.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      passwordForm.reset();
      setPasswordOpen(false);
      setNotice("Password updated and other sessions were signed out.");
    } catch {
      // The mutation error is rendered inside the password panel.
    }
  }

  async function disconnectGoogle() {
    setNotice(null);
    try {
      await googleAccount.disconnect.mutateAsync();
      setNotice("Google was disconnected from your account.");
    } catch {
      // Error state is rendered in the Google account row.
    }
  }

  async function deleteAccount(values: DeleteAccountValues) {
    setNotice(null);
    deleteMutation.reset();

    if (hasCredential && !values.password) {
      deleteForm.setError("password", {
        message: "Enter your password to delete this account.",
      });
      return;
    }

    try {
      await deleteMutation.mutateAsync(values.password);
      router.replace("/");
      router.refresh();
    } catch {
      // The mutation error is rendered inside the guarded danger panel.
    }
  }

  return (
    <ProfileSection
      action={
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
          <ShieldCheck aria-hidden="true" className="size-3.5" />
          Protected
        </span>
      }
      description="Control sign-in methods, password security, appearance, and account ownership."
      icon={ShieldCheck}
      id="security"
      title="Account & security"
    >
      {notice ? (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 aria-hidden="true" className="size-4" />
          {notice}
        </div>
      ) : null}

      <div className="divide-y divide-border/75 overflow-hidden rounded-2xl border border-border/75 bg-background/60 dark:bg-slate-950/25">
        <div className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-700 dark:text-cyan-300">
                <KeyRound aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-bold">Password</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {accountsQuery.isPending
                    ? "Checking your sign-in methods…"
                    : hasCredential
                      ? "Use a strong, unique password for this account."
                      : "This profile currently uses social sign-in."}
                </p>
              </div>
            </div>
            <Button
              className="h-10 rounded-xl"
              disabled={!hasCredential || accountsQuery.isPending}
              onClick={() => {
                setPasswordOpen((open) => !open);
                setNotice(null);
              }}
              type="button"
              variant="outline"
            >
              {passwordOpen ? <X aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
              {passwordOpen ? "Close" : "Change password"}
            </Button>
          </div>

          {passwordOpen ? (
            <form
              className="mt-5 grid gap-4 rounded-2xl border border-border/75 bg-muted/30 p-4 md:grid-cols-3"
              noValidate
              onSubmit={passwordForm.handleSubmit(changePassword)}
            >
              <ProfileField
                error={passwordForm.formState.errors.currentPassword?.message}
                htmlFor="current-password"
                label="Current password"
              >
                <input
                  autoComplete="current-password"
                  className={fieldClassName}
                  id="current-password"
                  type="password"
                  {...passwordForm.register("currentPassword")}
                />
              </ProfileField>
              <ProfileField
                error={passwordForm.formState.errors.newPassword?.message}
                htmlFor="new-password"
                label="New password"
              >
                <input
                  autoComplete="new-password"
                  className={fieldClassName}
                  id="new-password"
                  type="password"
                  {...passwordForm.register("newPassword")}
                />
              </ProfileField>
              <ProfileField
                error={passwordForm.formState.errors.confirmPassword?.message}
                htmlFor="confirm-new-password"
                label="Confirm password"
              >
                <input
                  autoComplete="new-password"
                  className={fieldClassName}
                  id="confirm-new-password"
                  type="password"
                  {...passwordForm.register("confirmPassword")}
                />
              </ProfileField>

              {passwordMutation.isError ? (
                <p className="rounded-xl bg-destructive/10 p-3 text-sm font-semibold text-destructive md:col-span-3" role="alert">
                  {mutationMessage(passwordMutation.error, "Password could not be changed.")}
                </p>
              ) : null}

              <div className="md:col-span-3 md:justify-self-end">
                <Button
                  className="h-10 rounded-xl bg-blue-600 px-4 text-white hover:bg-blue-500"
                  disabled={passwordMutation.isPending}
                  type="submit"
                >
                  {passwordMutation.isPending ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : <KeyRound aria-hidden="true" />}
                  {passwordMutation.isPending ? "Updating…" : "Update password"}
                </Button>
              </div>
            </form>
          ) : null}
        </div>

        <div className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white text-lg font-extrabold text-blue-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
                G
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">Google account</p>
                  {hasGoogle ? <span className="size-2 rounded-full bg-emerald-400" /> : null}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {accountsQuery.isPending
                    ? "Checking connection…"
                    : hasGoogle
                      ? "Connected as a secure sign-in method."
                      : "Connect Google for faster sign-in."}
                </p>
              </div>
            </div>

            {hasGoogle ? (
              <Button
                className="h-10 rounded-xl"
                disabled={!canDisconnectGoogle || googleAccount.disconnect.isPending}
                onClick={() => void disconnectGoogle()}
                type="button"
                variant="outline"
              >
                {googleAccount.disconnect.isPending ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : <Unlink aria-hidden="true" />}
                Disconnect
              </Button>
            ) : (
              <Button
                className="h-10 rounded-xl"
                disabled={accountsQuery.isPending || googleAccount.connect.isPending}
                onClick={() => googleAccount.connect.mutate()}
                type="button"
                variant="outline"
              >
                {googleAccount.connect.isPending ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : <Link2 aria-hidden="true" />}
                Connect Google
              </Button>
            )}
          </div>
          {hasGoogle && !canDisconnectGoogle ? (
            <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">
              Add another sign-in method before disconnecting your only account.
            </p>
          ) : null}
          {googleAccount.connect.isError || googleAccount.disconnect.isError ? (
            <p className="mt-3 text-sm font-semibold text-destructive" role="alert">
              {mutationMessage(
                googleAccount.connect.error ?? googleAccount.disconnect.error,
                "Google account could not be updated.",
              )}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
              {resolvedTheme === "dark" ? <Moon aria-hidden="true" className="size-5" /> : <Sun aria-hidden="true" className="size-5" />}
            </span>
            <div>
              <p className="text-sm font-bold">Theme</p>
              <p className="mt-1 text-xs text-muted-foreground">Choose the workspace appearance you prefer.</p>
            </div>
          </div>
          <div className="flex rounded-xl border border-border bg-muted/50 p-1" suppressHydrationWarning>
            {(["dark", "light"] as const).map((theme) => (
              <button
                aria-pressed={resolvedTheme === theme}
                className={cn(
                  "min-h-9 rounded-lg px-4 text-xs font-bold capitalize outline-none transition focus-visible:ring-2 focus-visible:ring-ring",
                  resolvedTheme === theme
                    ? "bg-blue-600 text-white shadow-sm dark:bg-cyan-400 dark:text-slate-950"
                    : "text-muted-foreground hover:text-foreground",
                )}
                key={theme}
                onClick={() => setTheme(theme)}
                type="button"
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-destructive/10 text-destructive">
                <Trash2 aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-destructive">Delete account</p>
                <p className="mt-1 text-xs text-muted-foreground">Permanently remove your account and profile data.</p>
              </div>
            </div>
            <Button
              className="h-10 rounded-xl"
              disabled={accountsQuery.isPending || accountsQuery.isError}
              onClick={() => {
                setDeleteOpen((open) => !open);
                setNotice(null);
              }}
              type="button"
              variant="destructive"
            >
              {deleteOpen ? <X aria-hidden="true" /> : <Trash2 aria-hidden="true" />}
              {deleteOpen ? "Cancel" : "Delete account"}
            </Button>
          </div>

          {deleteOpen ? (
            <form
              className="mt-5 rounded-2xl border border-destructive/25 bg-destructive/5 p-4"
              noValidate
              onSubmit={deleteForm.handleSubmit(deleteAccount)}
            >
              <div className="flex items-start gap-3 text-sm leading-6 text-destructive">
                <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <p><strong>This cannot be undone.</strong> Your authentication, profile, sessions, and connected learning identity will be deleted.</p>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <ProfileField error={deleteForm.formState.errors.confirmation?.message} htmlFor="delete-confirmation" label="Type DELETE to confirm">
                  <input className={fieldClassName} id="delete-confirmation" placeholder="DELETE" {...deleteForm.register("confirmation")} />
                </ProfileField>
                {hasCredential ? (
                  <ProfileField error={deleteForm.formState.errors.password?.message} htmlFor="delete-password" label="Current password">
                    <input autoComplete="current-password" className={fieldClassName} id="delete-password" type="password" {...deleteForm.register("password")} />
                  </ProfileField>
                ) : null}
              </div>
              {deleteMutation.isError ? (
                <p className="mt-3 text-sm font-semibold text-destructive" role="alert">
                  {mutationMessage(deleteMutation.error, "Account could not be deleted.")}
                </p>
              ) : null}
              <Button className="mt-4 h-10 rounded-xl" disabled={deleteMutation.isPending} type="submit" variant="destructive">
                {deleteMutation.isPending ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : <Trash2 aria-hidden="true" />}
                {deleteMutation.isPending ? "Deleting…" : "Permanently delete account"}
              </Button>
            </form>
          ) : null}
        </div>
      </div>
    </ProfileSection>
  );
}
