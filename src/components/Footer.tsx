import { profile } from "@/data/profile"

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-5 py-8 font-mono text-xs text-text-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>
          <span aria-hidden className="text-accent-dim">
            {"// "}
          </span>
          built with React, Tailwind and Motion
        </p>
      </div>
    </footer>
  )
}
