import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * The site's terminal vocabulary, carried over from the previous build:
 *   $   command prompt on section headings
 *   //  comment prefix on group labels
 *   >   caret on list bullets
 * These three marks are the identity; keep them consistent everywhere.
 */

export function Section({
  id,
  command,
  children,
  className,
}: {
  id: string
  command: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-16 sm:py-20 lg:py-24", className)}
    >
      <h2 className="mb-8 flex items-baseline gap-2 font-mono text-xl font-bold tracking-tight sm:text-2xl">
        <span aria-hidden className="text-accent select-none">
          $
        </span>
        <span className="text-text-hi">{command}</span>
      </h2>
      {children}
    </section>
  )
}

export function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mt-6 mb-2 block font-mono text-[0.8rem] text-text-dim first:mt-0">
      <span aria-hidden className="text-accent-dim select-none">
        {"// "}
      </span>
      {children}
    </span>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-line bg-panel px-2 py-1 font-mono text-xs text-accent">
      {children}
    </span>
  )
}

export function TagRow({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  )
}

/** Bulleted list using the `>` caret rather than a disc. */
export function CaretList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="relative pl-5 leading-relaxed text-pretty">
          <span
            aria-hidden
            className="absolute left-0 top-0 font-mono text-accent select-none"
          >
            &gt;
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Timeline entry with the accent dot on a vertical rule. */
export function TimelineEntry({
  title,
  org,
  meta,
  children,
}: {
  title: string
  org?: string
  meta?: string
  children?: ReactNode
}) {
  return (
    <div className="relative border-l-2 border-line pl-5 pb-8 last:pb-0">
      <span
        aria-hidden
        className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-accent"
      />
      <h3 className="font-mono text-base text-text-hi">{title}</h3>
      {org && <p className="mt-0.5 text-sm text-text">{org}</p>}
      {meta && (
        <span className="mt-1 mb-3 block font-mono text-xs text-text-dim">
          {meta}
        </span>
      )}
      {children}
    </div>
  )
}

/** Preformatted ASCII diagram that scrolls horizontally rather than wrapping. */
export function AsciiBlock({ children }: { children: string }) {
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-panel">
      <pre className="min-w-max p-4 font-mono text-[0.7rem] leading-relaxed text-text-dim sm:text-xs">
        {children}
      </pre>
    </div>
  )
}
