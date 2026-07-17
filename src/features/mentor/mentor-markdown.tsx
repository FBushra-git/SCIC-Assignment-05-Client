function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code className="rounded bg-slate-950/10 px-1.5 py-0.5 font-mono text-[.9em] dark:bg-white/10" key={index}>{part.slice(1, -1)}</code>;
    }
    return <span key={index}>{part}</span>;
  });
}

export function MentorMarkdown({ content }: { content: string }) {
  const blocks = content.split(/(```[\s\S]*?```)/g).filter(Boolean);

  return (
    <div className="grid gap-3 text-sm leading-7">
      {blocks.map((block, blockIndex) => {
        if (block.startsWith("```")) {
          const body = block.slice(3, -3).trim();
          const firstBreak = body.indexOf("\n");
          const language = firstBreak > -1 ? body.slice(0, firstBreak).trim() : "";
          const code = firstBreak > -1 ? body.slice(firstBreak + 1) : body;
          return (
            <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950 text-slate-100" key={blockIndex}>
              {language ? <div className="border-b border-slate-800 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-cyan-300">{language}</div> : null}
              <pre className="overflow-x-auto p-4 text-xs leading-6"><code>{code}</code></pre>
            </div>
          );
        }

        return block.split("\n").filter(Boolean).map((line, lineIndex) => {
          const key = `${blockIndex}-${lineIndex}`;
          if (line.startsWith("### ")) return <h4 className="pt-1 text-base font-bold" key={key}><InlineMarkdown text={line.slice(4)} /></h4>;
          if (line.startsWith("## ")) return <h3 className="pt-1 text-lg font-bold" key={key}><InlineMarkdown text={line.slice(3)} /></h3>;
          if (line.startsWith("# ")) return <h2 className="pt-1 text-xl font-bold" key={key}><InlineMarkdown text={line.slice(2)} /></h2>;
          if (/^[-*] /.test(line)) return <p className="pl-4 before:mr-2 before:content-['•']" key={key}><InlineMarkdown text={line.slice(2)} /></p>;
          if (/^\d+\. /.test(line)) return <p className="pl-2" key={key}><InlineMarkdown text={line} /></p>;
          return <p key={key}><InlineMarkdown text={line} /></p>;
        });
      })}
    </div>
  );
}
