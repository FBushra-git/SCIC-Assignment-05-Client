"use client";

import {
  Bookmark,
  CheckCircle2,
  ChevronDown,
  Code2,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { InterviewQuestion } from "./interview-data";
import { useSaveInterviewQuestion } from "./use-interview";

const typeTone: Record<InterviewQuestion["type"], string> = {
  Technical: "bg-blue-500/10 text-blue-700 dark:text-cyan-300",
  Concept: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  Coding: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  HR: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

export function InterviewQuestionCard({
  question,
  sessionId,
}: {
  question: InterviewQuestion;
  sessionId: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const update = useSaveInterviewQuestion(sessionId);

  return (
    <article className={cn("overflow-hidden rounded-2xl border bg-background/75 transition", question.completed ? "border-emerald-400/50" : "border-border/70")}>
      <div className="flex items-start gap-3 p-4 sm:p-5">
        <button aria-expanded={expanded} className="min-w-0 flex-1 text-left" onClick={() => setExpanded((value) => !value)} type="button">
          <div className="flex flex-wrap items-center gap-2"><span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", typeTone[question.type])}>{question.type}</span><span className="text-[11px] font-bold text-muted-foreground">{question.difficulty} · {question.technology}</span>{question.completed ? <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-300"><CheckCircle2 className="size-3.5" /> Completed</span> : null}</div>
          <h3 className="mt-3 font-bold leading-6">{question.question}</h3>
        </button>
        <div className="flex shrink-0 gap-1">
          <Button aria-label={question.bookmarked ? "Remove bookmark" : "Bookmark question"} disabled={update.isPending} onClick={() => update.mutate({ sessionId, questionId: question.id, bookmarked: !question.bookmarked })} size="icon" variant="ghost"><Bookmark className={cn(question.bookmarked && "fill-amber-400 text-amber-500")} /></Button>
          <Button aria-label={expanded ? "Hide explanation" : "Show explanation"} onClick={() => setExpanded((value) => !value)} size="icon" variant="ghost"><ChevronDown className={cn("transition", expanded && "rotate-180")} /></Button>
        </div>
      </div>

      {expanded ? (
        <div className="border-t border-border/70 p-4 sm:p-5">
          <div className="rounded-2xl bg-blue-50/70 p-4 dark:bg-blue-950/20"><h4 className="flex items-center gap-2 text-sm font-bold"><Lightbulb className="size-4 text-blue-600 dark:text-cyan-300" /> Concept explanation</h4><p className="mt-2 text-sm leading-7 text-muted-foreground">{question.explanation}</p></div>
          {question.codingPrompt ? <div className="mt-4 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 text-slate-100"><div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2 text-xs font-bold text-cyan-300"><Code2 className="size-4" /> Coding task</div><pre className="whitespace-pre-wrap p-4 text-xs leading-6">{question.codingPrompt}</pre></div> : null}
          <div className="mt-4"><h4 className="text-sm font-bold">Strong answer outline</h4><ul className="mt-2 grid gap-2">{question.answerOutline.map((point) => <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={point}><CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-500" />{point}</li>)}</ul></div>
          <div className="mt-5 flex justify-end"><Button className="rounded-xl" disabled={update.isPending} onClick={() => update.mutate({ sessionId, questionId: question.id, completed: !question.completed })} variant={question.completed ? "outline" : "default"}><CheckCircle2 /> {question.completed ? "Mark for review" : "Mark completed"}</Button></div>
          {update.isError ? <p className="mt-2 text-right text-xs font-semibold text-destructive">{update.error.message}</p> : null}
        </div>
      ) : null}
    </article>
  );
}
