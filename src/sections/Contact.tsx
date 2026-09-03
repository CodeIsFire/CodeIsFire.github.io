import { Download } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { Section } from "@/components/Terminal"
import { profile } from "@/data/profile"

const rows = [
  { k: "email", value: profile.email, href: `mailto:${profile.email}` },
  { k: "github", value: "github.com/CodeIsFire", href: profile.links.github },
  {
    k: "linkedin",
    value: "linkedin.com/in/aadityabhardwaj9",
    href: profile.links.linkedin,
  },
  { k: "leetcode", value: "leetcode.com/u/bdAPb39sYQ", href: profile.links.leetcode },
]

export function Contact() {
  return (
    <Section id="contact" command="./contact">
      <Reveal>
        <dl className="space-y-3 font-mono text-sm">
          {rows.map((row) => (
            <div key={row.k} className="flex flex-wrap items-baseline gap-2">
              <dt className="w-20 shrink-0 text-text-dim">{row.k}</dt>
              <dd>
                <span aria-hidden className="mr-2 text-accent-dim">
                  →
                </span>
                <a
                  href={row.href}
                  target={row.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="break-all text-accent transition-opacity hover:opacity-75"
                >
                  {row.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={profile.resume}
          download
          className="mt-8 inline-flex items-center gap-2 rounded-card border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/20"
        >
          <Download className="h-4 w-4" aria-hidden />
          download resume
        </a>
      </Reveal>
    </Section>
  )
}
