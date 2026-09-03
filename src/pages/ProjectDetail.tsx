import { Link, Navigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Github } from "@/components/BrandIcons"
import { Reveal } from "@/components/Reveal"
import { AsciiBlock, TagRow } from "@/components/Terminal"
import { projectBySlug } from "@/data/projects"
import { useDocumentTitle } from "@/lib/useDocumentTitle"

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? projectBySlug(slug) : undefined

  useDocumentTitle(project?.name)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Secondary projects have no case study, so treat them as unknown routes.
  if (!project || !project.sections) return <Navigate to="/404" replace />

  return (
    <article className="py-12 sm:py-16">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-text-dim transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        back to projects
      </Link>

      <header className="mt-8">
        <p className="font-mono text-sm text-text-dim">
          <span aria-hidden className="text-accent">
            ${" "}
          </span>
          cat projects/{project.slug}.md
        </p>
        <h1 className="mt-4 font-mono text-3xl font-bold tracking-tight text-text-hi sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-2 font-mono text-sm text-text-dim">
          {project.subtitle} · {project.year}
        </p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent transition-opacity hover:opacity-75"
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
              className="inline-flex items-center gap-1.5 text-accent transition-opacity hover:opacity-75"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              live demo
            </a>
          )}
        </div>

        <div className="mt-6">
          <TagRow items={project.tags} />
        </div>
      </header>

      {project.cover && (
        <Reveal className="mt-10">
          <img
            src={project.cover}
            alt={`${project.name} — architecture overview`}
            width={600}
            height={340}
            loading="lazy"
            decoding="async"
            className="w-full rounded-card border border-line"
          />
        </Reveal>
      )}

      {project.metrics && (
        <Reveal className="mt-10">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-card border border-line bg-panel p-4"
              >
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block font-mono text-2xl text-accent tabular-nums">
                    {m.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-text-dim">
                    {m.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      {project.architecture && (
        <Reveal className="mt-10">
          <h2 className="mb-3 font-mono text-lg text-text-hi">
            <span aria-hidden className="mr-2 text-accent">
              #
            </span>
            architecture
          </h2>
          <AsciiBlock>{project.architecture}</AsciiBlock>
        </Reveal>
      )}

      <div className="mt-10 space-y-10">
        {project.sections.map((section) => (
          <Reveal key={section.heading} as="section">
            <h2 className="mb-3 font-mono text-lg text-text-hi">
              <span aria-hidden className="mr-2 text-accent">
                #
              </span>
              {section.heading}
            </h2>
            <div className="max-w-2xl space-y-4">
              {section.body.map((p, i) => (
                <p key={i} className="leading-relaxed text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 border-t border-line pt-8">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 font-mono text-sm text-accent transition-opacity hover:opacity-75"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          back to projects
        </Link>
      </div>
    </article>
  )
}
