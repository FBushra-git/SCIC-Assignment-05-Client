"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { authClient, getAuthErrorMessage } from "./auth-client";

type GoogleAuthButtonProps = {
  label: string;
  onError: (message: string) => void;
};

function GoogleMark() {
  return (
    <span
      aria-hidden="true"
      className="grid size-5 place-items-center rounded-full bg-[conic-gradient(#4285f4_0_25%,#34a853_0_50%,#fbbc05_0_75%,#ea4335_0)] font-heading text-xs font-black text-white"
    >
      G
    </span>
  );
}

export function GoogleAuthButton({ label, onError }: GoogleAuthButtonProps) {
  const [pending, setPending] = useState(false);

  async function continueWithGoogle() {
    setPending(true);
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
      });

      if (result.error) onError(getAuthErrorMessage(result.error));
    } catch (error) {
      onError(getAuthErrorMessage(error));
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      className="h-12 w-full rounded-xl border-input bg-background/80 text-base font-bold shadow-sm hover:bg-muted dark:bg-slate-950/60"
      disabled={pending}
      onClick={continueWithGoogle}
      type="button"
      variant="outline"
    >
      {pending ? <LoaderCircle aria-hidden="true" className="size-5 motion-safe:animate-spin" /> : <GoogleMark />}
      {pending ? "Connecting…" : label}
    </Button>
  );
}
