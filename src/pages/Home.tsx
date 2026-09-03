import { lazy, Suspense } from "react"
import { Contact } from "@/sections/Contact"
import { Experience } from "@/sections/Experience"
import { Extra } from "@/sections/Extra"
import { Hero } from "@/sections/Hero"
import { Intro } from "@/sections/Intro"
import { Projects } from "@/sections/Projects"
import { Skills } from "@/sections/Skills"

// The stats charts pull in visx and d3-array — roughly half the bundle — and
// sit well below the fold, so they load on their own chunk.
const Stats = lazy(() =>
  import("@/sections/Stats").then((m) => ({ default: m.Stats })),
)

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Skills />
      <Experience />
      <Projects />
      <Suspense
        fallback={
          <div
            aria-hidden
            className="h-[420px] scroll-mt-24 py-16 sm:py-20 lg:py-24"
            id="stats"
          />
        }
      >
        <Stats />
      </Suspense>
      <Extra />
      <Contact />
    </>
  )
}
