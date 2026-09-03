import { Reveal } from "@/components/Reveal"
import { Section } from "@/components/Terminal"
import { profile } from "@/data/profile"

export function Intro() {
  const { education } = profile

  return (
    <Section id="intro" command="cat about.md">
      <Reveal className="space-y-5">
        <p className="max-w-2xl text-base leading-relaxed text-pretty">
          {profile.blurb}
        </p>
        <blockquote className="border-l-2 border-accent pl-4 font-mono text-sm text-text-dim">
          {education.degree} · {education.school} · {education.grade} ·{" "}
          {education.graduation}
        </blockquote>
      </Reveal>
    </Section>
  )
}
