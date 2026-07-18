"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import type { ContactRequestInput } from "./platform-data";
import { useContactRequest } from "./use-platform";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  kind: z.enum(["general", "support", "account_recovery"]),
  subject: z.string().trim().min(4, "Add a short subject.").max(120),
  message: z.string().trim().min(20, "Please include at least 20 characters.").max(3000),
});

const fieldClass = "h-12 w-full rounded-xl border border-border bg-background/80 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export function ContactRequestForm({ accountRecovery = false }: { accountRecovery?: boolean }) {
  const request = useContactRequest();
  const defaultKind = accountRecovery ? "account_recovery" : "general";
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactRequestInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", kind: defaultKind, subject: accountRecovery ? "Account access support" : "", message: "" },
    mode: "onBlur",
  });

  async function submit(values: ContactRequestInput) {
    request.reset();
    await request.mutateAsync(values);
    reset({ name: "", email: "", kind: defaultKind, subject: accountRecovery ? "Account access support" : "", message: "" });
  }

  if (request.isSuccess) {
    return <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-7 text-center"><CheckCircle2 className="mx-auto size-11 text-emerald-500" /><h2 className="mt-4 text-2xl font-bold">Request received</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Your message is safely stored for review. You can send another request if more information is needed.</p><Button className="mt-5 rounded-xl" onClick={() => request.reset()} variant="outline">Send another request</Button></div>;
  }

  return (
    <form className="glass-panel rounded-2xl bg-white/85 p-6 sm:p-8 dark:bg-slate-900/75" noValidate onSubmit={handleSubmit(submit)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Full name<input autoComplete="name" className={fieldClass} placeholder="Your name" {...register("name")} />{errors.name ? <span className="text-xs text-destructive">{errors.name.message}</span> : null}</label>
        <label className="grid gap-2 text-sm font-bold">Email address<input autoComplete="email" className={fieldClass} placeholder="you@example.com" type="email" {...register("email")} />{errors.email ? <span className="text-xs text-destructive">{errors.email.message}</span> : null}</label>
        {!accountRecovery ? <label className="grid gap-2 text-sm font-bold">Request type<select className={fieldClass} {...register("kind")}><option value="general">General question</option><option value="support">Product support</option><option value="account_recovery">Account recovery</option></select></label> : <input type="hidden" value="account_recovery" {...register("kind")} />}
        <label className="grid gap-2 text-sm font-bold">Subject<input className={fieldClass} placeholder="How can we help?" {...register("subject")} />{errors.subject ? <span className="text-xs text-destructive">{errors.subject.message}</span> : null}</label>
        <label className="grid gap-2 text-sm font-bold sm:col-span-2">Message<textarea className="min-h-40 w-full resize-y rounded-xl border border-border bg-background/80 p-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" placeholder={accountRecovery ? "Describe the account you are trying to access and what happened. Never include your password." : "Include enough detail for us to understand your question."} {...register("message")} />{errors.message ? <span className="text-xs text-destructive">{errors.message.message}</span> : null}</label>
      </div>
      {request.isError ? <p className="mt-5 rounded-xl border border-destructive/25 bg-destructive/10 p-3 text-sm font-semibold text-destructive" role="alert">{request.error.message}</p> : null}
      <Button className="mt-6 h-12 rounded-xl px-6" disabled={request.isPending} type="submit">{request.isPending ? <><LoaderCircle className="animate-spin" /> Sending...</> : <><Send /> Submit request</>}</Button>
    </form>
  );
}
