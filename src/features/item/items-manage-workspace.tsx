"use client";

import {
  AlertTriangle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  LoaderCircle,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";
import { cn } from "@/lib/utils";

import { ItemCover } from "./item-card";
import type { Item, ItemFilters } from "./item-data";
import { useDeleteItem, useOwnedItems } from "./use-items";

const inputClass =
  "h-11 rounded-xl border border-border bg-background/80 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

function OwnedItemCard({ item }: { item: Item }) {
  const deleteMutation = useDeleteItem();
  const [confirming, setConfirming] = useState(false);

  async function removeItem() {
    await deleteMutation.mutateAsync(item.id);
    setConfirming(false);
  }

  return (
    <article className="glass-panel overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/70">
      <div className="relative h-44 overflow-hidden bg-slate-950">
        <ItemCover className="absolute inset-0" imageUrl={item.imageUrl} title={item.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-slate-950/45 px-3 py-1 text-xs font-bold text-white backdrop-blur">{item.priority}</span>
      </div>
      <div className="p-5">
        <h2 className="line-clamp-1 text-lg font-bold">{item.title}</h2>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-muted-foreground">{item.shortDescription}</p>
        <p className="mt-3 text-xs font-semibold text-muted-foreground">Updated {new Date(item.updatedAt).toLocaleDateString()}</p>

        {confirming ? (
          <div className="mt-5 rounded-xl border border-destructive/25 bg-destructive/10 p-3">
            <p className="flex gap-2 text-sm font-bold text-destructive"><AlertTriangle className="mt-0.5 size-4 shrink-0" /> Permanently delete this item?</p>
            <div className="mt-3 flex gap-2">
              <Button className="h-10 rounded-lg" disabled={deleteMutation.isPending} onClick={removeItem} size="sm" variant="destructive">
                {deleteMutation.isPending ? <LoaderCircle className="animate-spin" /> : <Trash2 />} Delete
              </Button>
              <Button className="h-10 rounded-lg" disabled={deleteMutation.isPending} onClick={() => setConfirming(false)} size="sm" variant="outline">Cancel</Button>
            </div>
            {deleteMutation.isError ? <p className="mt-2 text-xs font-semibold text-destructive">{deleteMutation.error.message}</p> : null}
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Link className={cn(buttonVariants({ size: "sm", variant: "outline" }), "h-10 rounded-lg px-2")} href={`/items/${item.id}`}><Eye /> View</Link>
            <Link className={cn(buttonVariants({ size: "sm", variant: "outline" }), "h-10 rounded-lg px-2")} href={`/items/${item.id}/edit`}><Pencil /> Edit</Link>
            <Button className="h-10 rounded-lg px-2" onClick={() => setConfirming(true)} size="sm" variant="outline"><Trash2 /> Delete</Button>
          </div>
        )}
      </div>
    </article>
  );
}

export function ItemsManageWorkspace() {
  const router = useRouter();
  const session = authClient.useSession();
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState<ItemFilters["sort"]>("newest");
  const [page, setPage] = useState(1);
  const query = useOwnedItems({ search, priority, technology: "", sort, page }, Boolean(session.data?.user));

  useEffect(() => {
    if (!session.isPending && !session.data?.user) router.replace("/login");
  }, [router, session.data?.user, session.isPending]);

  if (session.isPending || !session.data?.user) {
    return <div className="section-shell h-[75svh] animate-pulse py-10"><div className="h-full rounded-2xl bg-muted" /></div>;
  }

  return (
    <div className="section-shell py-8 sm:py-12">
      <Link className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-700 dark:text-cyan-300" href="/items"><ArrowLeft className="size-4" /> Browse community items</Link>
      <header className="relative isolate mt-3 overflow-hidden rounded-2xl bg-slate-950 px-6 py-10 text-white sm:px-10">
        <div className="absolute inset-0 -z-20 bg-[url('/images/projects/developer-portfolio-photo.webp')] bg-cover bg-center opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-blue-950/95 to-cyan-950/75" />
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p className="text-sm font-bold text-cyan-200">Private management workspace</p><h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">Manage your items</h1><p className="mt-3 max-w-2xl leading-7 text-slate-200">Review every project brief you own, update its details, or remove it from the public library.</p></div>
          <Link className={cn(buttonVariants({ size: "lg" }), "h-12 shrink-0 rounded-xl bg-white text-slate-950 hover:bg-cyan-50")} href="/items/add"><Plus /> Add item</Link>
        </div>
      </header>

      <section className="mt-6 rounded-2xl border border-border bg-card/75 p-4 shadow-sm backdrop-blur sm:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_13rem_13rem]">
          <label className="relative"><Search className="absolute left-3 top-3.5 size-4 text-muted-foreground" /><span className="sr-only">Search your items</span><input className={cn(inputClass, "w-full pl-9")} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search your project briefs" value={search} /></label>
          <label><span className="sr-only">Filter by difficulty</span><select className={cn(inputClass, "w-full")} onChange={(event) => { setPriority(event.target.value); setPage(1); }} value={priority}><option value="">All difficulties</option><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option></select></label>
          <label><span className="sr-only">Sort items</span><select className={cn(inputClass, "w-full")} onChange={(event) => { setSort(event.target.value as ItemFilters["sort"]); setPage(1); }} value={sort}><option value="newest">Recently updated</option><option value="oldest">Oldest first</option><option value="alphabetical">Alphabetical</option><option value="deadline">Nearest deadline</option></select></label>
        </div>
      </section>

      {query.isPending ? <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <div className="h-[28rem] animate-pulse rounded-2xl bg-muted" key={index} />)}</div> : null}
      {query.isError ? <div className="mt-8 rounded-2xl border border-destructive/25 bg-destructive/10 p-5 text-sm font-semibold text-destructive">{query.error.message}</div> : null}
      {query.data && query.data.items.length ? (
        <>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{query.data.items.map((item) => <OwnedItemCard item={item} key={item.id} />)}</div>
          <div className="mt-8 flex items-center justify-between rounded-2xl border border-border bg-card/70 p-3">
            <Button disabled={!query.data.pagination.hasPreviousPage} onClick={() => setPage((value) => value - 1)} variant="outline"><ChevronLeft /> Previous</Button>
            <span className="text-sm font-semibold text-muted-foreground">Page {query.data.pagination.page} of {query.data.pagination.totalPages}</span>
            <Button disabled={!query.data.pagination.hasNextPage} onClick={() => setPage((value) => value + 1)} variant="outline">Next <ChevronRight /></Button>
          </div>
        </>
      ) : null}
      {query.data && !query.data.items.length ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
          <Plus className="mx-auto size-10 text-blue-600 dark:text-cyan-300" /><h2 className="mt-4 text-2xl font-bold">No owned items found</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{search || priority ? "Adjust the filters to find another project brief." : "Add your first complete project brief and it will appear here."}</p>
          {!search && !priority ? <Link className={cn(buttonVariants({ size: "lg" }), "mt-6 rounded-xl")} href="/items/add"><Plus /> Add your first item</Link> : null}
        </div>
      ) : null}
    </div>
  );
}
