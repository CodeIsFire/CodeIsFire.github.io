import { Link } from "react-router-dom"
import { useDocumentTitle } from "@/lib/useDocumentTitle"

export default function NotFound() {
  useDocumentTitle("404")

  return (
    <section className="flex min-h-[70svh] flex-col justify-center py-20">
      <p className="font-mono text-sm text-text-dim">
        <span aria-hidden className="text-accent">
          ${" "}
        </span>
        cat {typeof window !== "undefined" ? window.location.pathname : ""}
      </p>
      <h1 className="mt-4 font-mono text-3xl font-bold text-text-hi sm:text-4xl">
        404 — no such file or directory
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-text-dim">
        That path does not exist on this site.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-card border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/20"
      >
        cd ~
      </Link>
    </section>
  )
}
