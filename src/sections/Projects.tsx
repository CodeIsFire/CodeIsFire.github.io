import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Github } from "@/components/BrandIcons"
import { Reveal, RevealItem } from "@/components/Reveal"
import { GroupLabel, Section, TagRow } from "@/components/Terminal"
import { featuredProjects, otherProjects, type Project } from "@/data/projects"
import { spring } from "@/lib/motion"

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion()
  const hasCase = Boolean(project.sections)

  const body = (
    <>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-accent-dim tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-mono text-lg text-text-hi">{project.name}</h3>
      </div>
      <p className="mt-1 pl-8 font-mono text-xs text-text-dim">
        {project.subtitle} · {project.year}
      </p>
      <p className="mt-3 pl-8 text-sm leading-relaxed text-text text-pretty">
        {project.summary}
      </p>

      {project.metrics && (
        <dl className="mt-5 grid grid-cols-2 gap-3 pl-8 sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-mono text-xl text-accent tabular-nums">
                  {m.value}
                </span>
                <span className="mt-0.5 block text-[0.7rem] leading-snug text-text-dim">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-5 pl-8">
        <TagRow items={project.tags} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 pl-8 font-mono text-xs">
        {hasCase && (
          <span className="inline-flex items-center gap-1.5 text-accent">
            read case study
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-text-dim transition-colors hover:text-accent"
          >
            <Github className="h-3.5 w-3.5" aria-hidden />
            source
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-text-dim transition-colors hover:text-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            live
          </a>
        )}
      </div>
    </>
  )

  const shell =
    "block rounded-card border border-line bg-panel p-5 transition-colors hover:border-accent/40 sm:p-6"

  return (
    <RevealItem as="article">
      <motion.div
        whileHover={reduced ? undefined : { y: -3 }}
        transition={spring}
      >
        {hasCase ? (
          <Link to={`/projects/${project.slug}`} className={shell}>
            {body}
          </Link>
        ) : (
          <div className={shell}>{body}</div>
        )}
      </motion.div>
    </RevealItem>
  )
}

export function Projects() {
  return (
    <Section id="projects" command="ls projects/">
      <Reveal group className="space-y-4">
        {featuredProjects.map((p, i) => (
          <FeaturedCard key={p.slug} project={p} index={i} />
        ))}
      </Reveal>

      <GroupLabel>other work</GroupLabel>
      <Reveal group className="mt-3 grid gap-3 sm:grid-cols-2">
        {otherProjects.map((p) => (
          <RevealItem key={p.slug} as="article">
            <div className="h-full rounded-card border border-line bg-panel/60 p-4 transition-colors hover:border-line/80">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-mono text-sm text-text-hi">{p.name}</h3>
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name} source`}
                    className="shrink-0 text-text-dim transition-colors hover:text-accent"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-text-dim text-pretty">
                {p.summary}
              </p>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  )
}
