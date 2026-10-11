import ReactMarkdown from "react-markdown";

export default function DevlogContent({ content }: { content: string }) {
  return (
    <div className="font-serif text-lg leading-[1.85] text-foreground sm:text-xl">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h2 className="mb-4 mt-12 font-sans text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="mb-4 mt-10 font-sans text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-3 mt-8 font-sans text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-7">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-7 list-disc space-y-2 pl-7">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-7 list-decimal space-y-2 pl-7">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-2 border-primary pl-6 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          pre: ({ children }) => (
            <pre className="my-8 overflow-x-auto rounded-md border border-border bg-card p-5 font-mono text-sm leading-relaxed">
              {children}
            </pre>
          ),
          code: ({ children }) => (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.82em]">
              {children}
            </code>
          ),
          hr: () => <hr className="my-10 border-border" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
