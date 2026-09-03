import { Reveal, RevealItem } from "@/components/Reveal"
import { GroupLabel, Section, TagRow } from "@/components/Terminal"
import { skillGroups } from "@/data/skills"

export function Skills() {
  return (
    <Section id="skills" command="cat skills.json">
      <Reveal group className="space-y-1">
        {skillGroups.map((group) => (
          <RevealItem key={group.label}>
            <GroupLabel>{group.label}</GroupLabel>
            <TagRow items={group.items} />
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  )
}
