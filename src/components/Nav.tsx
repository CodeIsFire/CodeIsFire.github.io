import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { id: "intro", label: "intro" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "stats", label: "stats" },
  { id: "extra", label: "extra" },
  { id: "contact", label: "contact" },
]

export function Nav() {
  const [active, setActive] = useState("intro")
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === "/"

  useEffect(() => {
    if (!onHome) return

    // Active section is whichever one owns the reading line a quarter of the
    // way down the viewport. Computing it from scroll position (rather than
    // relying on IntersectionObserver callbacks alone) keeps the highlight
    // correct after an instant jump to an anchor, where no gradual
    // intersection change occurs.
    const update = () => {
      setScrolled(window.scrollY > 8)

      const line = window.innerHeight * 0.25
      let current = items[0].id
      for (const { id } of items) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }

      // At the very bottom the last section may never cross the line.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) current = items[items.length - 1].id

      setActive(current)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [onHome])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || !onHome
          ? "border-line bg-shell/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-4xl items-center gap-4 px-5 py-3 sm:px-8"
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 font-mono text-sm text-text-hi"
        >
          <Terminal className="h-4 w-4 text-accent" aria-hidden />
          <span className="sr-only">Home — </span>
          <span aria-hidden>~</span>
        </Link>

        {onHome ? (
          <ul className="flex flex-1 items-center gap-1 overflow-x-auto font-mono text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "rounded px-2 py-1 whitespace-nowrap transition-colors",
                    active === id
                      ? "text-accent"
                      : "text-text-dim hover:text-text",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <Link
            to="/"
            className="flex-1 font-mono text-xs text-text-dim transition-colors hover:text-accent"
          >
            cd ..
          </Link>
        )}
      </nav>
    </header>
  )
}
