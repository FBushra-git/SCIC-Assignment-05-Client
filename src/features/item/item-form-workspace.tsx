"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  ImageIcon,
  Layers3,
  LoaderCircle,
  Save,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";

import type { ItemInput, ItemPriority } from "./item-data";
import { ItemCover } from "./item-card";
import { useCreateItem, useOwnedItem, useUpdateItem } from "./use-items";

const formSchema = z.object({
  title: z.string().trim().min(3, "Enter a title of at least 3 characters.").max(100),
  shortDescription: z.string().trim().min(20, "Write at least 20 characters.").max(180),
  description: z.string().trim().min(80, "Write at least 80 characters.").max(5000),
  priority: z.enum(["Beginner", "Intermediate", "Advanced"]),
  targetDate: z.string(),
  imageUrl: z
    .string()
    .trim()
    .refine((value) => !value || (z.url().safeParse(value).success && value.startsWith("https://")), {
      message: "Use a valid HTTPS image URL.",
    }),
  technologies: z
    .string()
    .trim()
    .min(1, "Add at least one technology.")
    .refine(
      (value) => value.split(",").map((item) => item.trim()).filter(Boolean).length <= 8,
      "Use no more than 8 technologies.",
    ),
});

type ItemFormValues = z.infer<typeof formSchema>;

const fieldClass =
  "h-12 w-full rounded-xl border border-border bg-background/80 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

const defaultValues: ItemFormValues = {
  title: "",
  shortDescription: "",
  description: "",
  priority: "Beginner",
  targetDate: "",
  imageUrl: "",
  technologies: "",
};

export function ItemFormWorkspace({ itemId = null }: { itemId?: string | null }) {
  const router = useRouter();
  const session = authClient.useSession();
  const ownedItem = useOwnedItem(itemId, Boolean(session.data?.user));
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (!session.isPending && !session.data?.user) router.replace("/login");
  }, [router, session.data?.user, session.isPending]);

  useEffect(() => {
    if (!ownedItem.data) return;
    reset({
      title: ownedItem.data.title,
      shortDescription: ownedItem.data.shortDescription,
      description: ownedItem.data.description,
      priority: ownedItem.data.priority,
      targetDate: ownedItem.data.targetDate ?? "",
      imageUrl: ownedItem.data.imageUrl ?? "",
      technologies: ownedItem.data.technologies.join(", "),
    });
  }, [ownedItem.data, reset]);

  const imageUrl = useWatch({ control, name: "imageUrl" });
  const title = useWatch({ control, name: "title" }) || "Your project";
  const pending = createMutation.isPending || updateMutation.isPending;
  const mutationError = createMutation.error ?? updateMutation.error;

  async function save(values: ItemFormValues) {
    const payload: ItemInput = {
      title: values.title.trim(),
      shortDescription: values.shortDescription.trim(),
      description: values.description.trim(),
      priority: values.priority as ItemPriority,
      targetDate: values.targetDate || null,
      imageUrl: values.imageUrl || null,
      technologies: [...new Set(values.technologies.split(",").map((item) => item.trim()).filter(Boolean))],
    };

    if (itemId) await updateMutation.mutateAsync({ id: itemId, ...payload });
    else await createMutation.mutateAsync(payload);
    router.push("/items/manage");
  }

  if (session.isPending || !session.data?.user || (itemId && ownedItem.isPending)) {
    return <div className="section-shell h-[75svh] animate-pulse py-10"><div className="h-full rounded-2xl bg-muted" /></div>;
  }

  if (itemId && (ownedItem.isError || !ownedItem.data)) {
    return <div className="section-shell py-16 text-center"><AlertCircle className="mx-auto size-10 text-destructive" /><h1 className="mt-4 text-2xl font-bold">Item unavailable</h1><p className="mt-2 text-muted-foreground">{ownedItem.error?.message ?? "This item could not be found."}</p></div>;
  }

  return (
    <div className="section-shell py-8 sm:py-12">
      <Link className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-700 dark:text-cyan-300" href="/items/manage"><ArrowLeft className="size-4" /> Back to manage items</Link>
      <header className="relative isolate mt-3 overflow-hidden rounded-2xl bg-slate-950 px-6 py-10 text-white sm:px-10">
        <div className="absolute inset-0 -z-20 bg-[url('/images/projects/team-task-platform-photo.webp')] bg-cover bg-center opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-blue-950/95 to-cyan-950/75" />
        <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200"><Sparkles className="size-4" /> Owned portfolio content</span>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">{itemId ? "Edit your project brief" : "Add a portfolio project"}</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-200">Create a complete, public project brief that other learners can discover while you retain full update and delete control.</p>
      </header>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <form className="glass-panel rounded-2xl bg-white/80 p-6 sm:p-8 dark:bg-slate-900/70" noValidate onSubmit={handleSubmit(save)}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold sm:col-span-2">Title<input className={fieldClass} placeholder="Accessible Developer Portfolio" {...register("title")} />{errors.title ? <span className="text-xs text-destructive">{errors.title.message}</span> : null}</label>
            <label className="grid gap-2 text-sm font-bold sm:col-span-2">Short description<textarea className="min-h-24 w-full resize-y rounded-xl border border-border bg-background/80 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" placeholder="Summarize the project outcome and who it helps." {...register("shortDescription")} />{errors.shortDescription ? <span className="text-xs text-destructive">{errors.shortDescription.message}</span> : null}</label>
            <label className="grid gap-2 text-sm font-bold sm:col-span-2">Full description<textarea className="min-h-48 w-full resize-y rounded-xl border border-border bg-background/80 p-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" placeholder="Explain the problem, core workflows, technical decisions, and expected result." {...register("description")} />{errors.description ? <span className="text-xs text-destructive">{errors.description.message}</span> : null}</label>
            <label className="grid gap-2 text-sm font-bold"><Layers3 className="size-4 text-blue-600" /> Difficulty<select className={fieldClass} {...register("priority")}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
            <label className="grid gap-2 text-sm font-bold"><CalendarDays className="size-4 text-blue-600" /> Target date<input className={fieldClass} min={new Date().toISOString().slice(0, 10)} type="date" {...register("targetDate")} /></label>
            <label className="grid gap-2 text-sm font-bold sm:col-span-2">Technologies<input className={fieldClass} placeholder="Next.js, TypeScript, MongoDB" {...register("technologies")} /><span className="text-xs font-normal text-muted-foreground">Separate up to eight technologies with commas.</span>{errors.technologies ? <span className="text-xs text-destructive">{errors.technologies.message}</span> : null}</label>
            <label className="grid gap-2 text-sm font-bold sm:col-span-2"><ImageIcon className="size-4 text-blue-600" /> Optional image URL<input className={fieldClass} placeholder="https://images.example.com/project-cover.jpg" {...register("imageUrl")} /><span className="text-xs font-normal text-muted-foreground">Use an HTTPS image. A real SkillForge project image appears when left blank.</span>{errors.imageUrl ? <span className="text-xs text-destructive">{errors.imageUrl.message}</span> : null}</label>
          </div>
          {mutationError ? <p className="mt-5 rounded-xl border border-destructive/25 bg-destructive/10 p-3 text-sm font-semibold text-destructive">{mutationError.message}</p> : null}
          <Button className="mt-7 h-12 rounded-xl px-6" disabled={pending} type="submit">{pending ? <><LoaderCircle className="animate-spin" /> Saving item…</> : <><Save /> {itemId ? "Save changes" : "Add item"}</>}</Button>
        </form>

        <aside className="glass-panel overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/70">
          <ItemCover className="h-48" imageUrl={imageUrl || null} title={title} />
          <div className="p-5"><p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-300">Live preview</p><h2 className="mt-2 text-xl font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Your image and title update as you complete the form.</p></div>
        </aside>
      </div>
    </div>
  );
}
