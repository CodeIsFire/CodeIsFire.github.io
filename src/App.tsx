import { lazy, Suspense, useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Footer } from "@/components/Footer"
import { Nav } from "@/components/Nav"
import Home from "@/pages/Home"
import NotFound from "@/pages/NotFound"
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"))

/**
 * Restores in-page anchors after a client-side navigation. Landing on
 * "/#projects" from a case-study page mounts Home first, so the target
 * element does not exist until after this render.
 */
function useHashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    // rAF lets the freshly mounted route paint before we measure it.
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto" })
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])
}

export default function App() {
  useHashScroll()

  return (
    <div className="min-h-svh bg-terminal-glow">
      <div className="bg-grid">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-panel focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-accent"
        >
          skip to content
        </a>

        <Nav />

        <main id="main" className="mx-auto max-w-4xl px-5 sm:px-8">
          <Suspense fallback={<div className="min-h-[70svh]" />}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </div>
  )
}
