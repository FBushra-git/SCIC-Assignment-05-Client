"use client";

import {
  Bot,
  BrainCircuit,
  History,
  MessageSquarePlus,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";
import { cn } from "@/lib/utils";

import { MentorMarkdown } from "./mentor-markdown";
import {
  useMentorConversation,
  useMentorConversations,
  useSendMentorMessage,
} from "./use-mentor";

const suggestions = [
  "What should I learn next?",
  "Recommend a React project.",
  "Explain React Query.",
  "Help me prepare for interviews.",
  "How can I improve my portfolio?",
];

export function MentorWorkspace() {
  const router = useRouter();
  const session = authClient.useSession();
  const conversations = useMentorConversations(Boolean(session.data?.user));
  const [selectedId, setSelectedId] = useState<string | null | undefined>(undefined);
  const activeConversationId =
    selectedId === undefined ? conversations.data?.[0]?.id ?? null : selectedId;
  const conversation = useMentorConversation(
    activeConversationId,
    Boolean(session.data?.user),
  );
  const sendMessage = useSendMentorMessage();
  const [message, setMessage] = useState("");
  const [pendingText, setPendingText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session.isPending && !session.data?.user) router.replace("/login");
  }, [router, session.data?.user, session.isPending]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.data?.messages.length, pendingText]);

  async function submit(question: string) {
    const trimmed = question.trim();
    if (!trimmed || sendMessage.isPending) return;
    setMessage("");
    setPendingText(trimmed);
    try {
      const result = await sendMessage.mutateAsync({
        message: trimmed,
        conversationId: activeConversationId,
      });
      setSelectedId(result.id);
    } finally {
      setPendingText("");
    }
  }

  if (session.isPending || !session.data?.user) {
    return <div className="section-shell h-[80svh] animate-pulse py-8"><div className="h-full rounded-[2rem] bg-muted" /></div>;
  }

  const messages = conversation.data?.messages ?? [];

  return (
    <div className="section-shell py-6 sm:py-8">
      <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><span className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-cyan-300"><BrainCircuit className="size-4" /> Context-aware learning guidance</span><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">AI Mentor</h1><p className="mt-2 text-sm text-muted-foreground">Grounded in your profile, roadmap, milestones, activity, and conversation.</p></div>
        <Button className="h-11 rounded-xl px-4" onClick={() => setSelectedId(null)} variant="outline"><MessageSquarePlus /> New conversation</Button>
      </header>

      <div className="glass-panel grid min-h-[42rem] overflow-hidden rounded-[2rem] bg-white/80 shadow-2xl shadow-blue-950/10 lg:h-[calc(100svh-11.5rem)] lg:grid-cols-[18rem_minmax(0,1fr)] dark:bg-slate-900/70">
        <aside className="border-b border-border/70 bg-slate-50/75 p-4 lg:overflow-y-auto lg:border-b-0 lg:border-r dark:bg-slate-950/35">
          <div className="flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground"><History className="size-4" /> Conversation history</div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible">
            {conversations.data?.map((item) => (
              <button className={cn("min-w-56 rounded-xl border p-3 text-left transition lg:min-w-0", activeConversationId === item.id ? "border-blue-400 bg-blue-50 text-blue-950 dark:bg-blue-950/30 dark:text-cyan-100" : "border-transparent hover:border-border hover:bg-background/70")} key={item.id} onClick={() => setSelectedId(item.id)} type="button">
                <span className="line-clamp-1 text-sm font-bold">{item.title}</span>
                <span className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{item.preview}</span>
              </button>
            ))}
            {!conversations.data?.length ? <p className="px-2 text-xs leading-5 text-muted-foreground">Your mentor conversations will appear here.</p> : null}
          </div>
        </aside>

        <section className="relative flex min-h-0 flex-col bg-[url('/images/skillforge/chat-subtle-neural-grid-light.png')] bg-cover bg-center dark:bg-[url('/images/skillforge/chat-subtle-neural-grid.png')]">
          <div className="absolute inset-0 bg-white/88 dark:bg-slate-950/84" />
          <div className="relative flex-1 overflow-y-auto p-4 sm:p-6">
            {!messages.length && !pendingText ? (
              <div className="mx-auto grid min-h-full max-w-2xl place-content-center py-10 text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-xl shadow-blue-500/20"><Bot className="size-8" /></span>
                <h2 className="mt-5 text-2xl font-bold">What are we working through?</h2>
                <p className="mt-2 leading-7 text-muted-foreground">Ask for your next learning step, a project, a concept explanation, interview coaching, or portfolio feedback.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">{suggestions.map((suggestion) => <button className="rounded-xl border border-border bg-background/75 px-3 py-2 text-xs font-bold transition hover:border-blue-400 hover:text-blue-700 dark:hover:text-cyan-300" key={suggestion} onClick={() => void submit(suggestion)} type="button">{suggestion}</button>)}</div>
              </div>
            ) : (
              <div className="mx-auto grid max-w-3xl gap-5">
                {messages.map((item) => (
                  <div className={cn("flex gap-3", item.role === "user" && "flex-row-reverse")} key={item.id}>
                    <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", item.role === "assistant" ? "bg-gradient-to-br from-blue-600 to-cyan-400 text-white" : "bg-muted text-muted-foreground")}>{item.role === "assistant" ? <Bot className="size-4" /> : <UserRound className="size-4" />}</span>
                    <div className={cn("max-w-[85%] rounded-2xl border p-4 shadow-sm", item.role === "assistant" ? "border-border bg-background/90" : "border-blue-500/20 bg-blue-600 text-white")}><MentorMarkdown content={item.content} /></div>
                  </div>
                ))}
                {pendingText ? <>
                  <div className="flex flex-row-reverse gap-3"><span className="grid size-9 place-items-center rounded-xl bg-muted"><UserRound className="size-4" /></span><div className="max-w-[85%] rounded-2xl bg-blue-600 p-4 text-sm text-white">{pendingText}</div></div>
                  <div className="flex gap-3"><span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white"><Bot className="size-4" /></span><div className="flex items-center gap-2 rounded-2xl border border-border bg-background/90 px-4 py-3 text-sm text-muted-foreground"><Sparkles className="size-4 animate-pulse text-blue-600 dark:text-cyan-300" /> Mentor is thinking<span className="animate-pulse">…</span></div></div>
                </> : null}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          <form className="relative border-t border-border/70 bg-background/85 p-4 backdrop-blur sm:p-5" onSubmit={(event) => { event.preventDefault(); void submit(message); }}>
            {sendMessage.isError ? <p className="mx-auto mb-2 max-w-3xl text-xs font-semibold text-destructive">{sendMessage.error.message}</p> : null}
            <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border bg-background p-2 shadow-lg focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
              <textarea aria-label="Message your AI mentor" className="max-h-36 min-h-11 flex-1 resize-none bg-transparent px-2 py-2.5 text-sm outline-none" disabled={sendMessage.isPending} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void submit(message); } }} placeholder="Ask your mentor…" rows={1} value={message} />
              <Button className="size-11 rounded-xl" disabled={!message.trim() || sendMessage.isPending} size="icon-lg" type="submit"><Send /></Button>
            </div>
            <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">Gemini can make mistakes. Verify important technical details against official documentation.</p>
          </form>
        </section>
      </div>
    </div>
  );
}
