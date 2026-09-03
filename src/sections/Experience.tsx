import { ExternalLink } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { CaretList, Section, TimelineEntry } from "@/components/Terminal"
import { experience } from "@/data/experience"

export function Experience() {
  return (
    <Section id="experience" command="./experience.sh">
      <Reveal>
        {experience.map((entry) => (
          <TimelineEntry
            key={entry.title}
            title={entry.title}
            org={entry.org}
            meta={entry.meta}
          >
            <CaretList items={entry.bullets} />
            {entry.links && (
              <div className="mt-3 flex flex-wrap gap-4">
                {entry.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-opacity hover:opacity-75"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </TimelineEntry>
        ))}
      </Reveal>
    </Section>
  )
}
