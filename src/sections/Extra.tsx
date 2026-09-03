import { Reveal } from "@/components/Reveal"
import { CaretList, GroupLabel, Section, TimelineEntry } from "@/components/Terminal"
import { extraCurricular, leadership } from "@/data/experience"

export function Extra() {
  return (
    <Section id="extra" command="./extra --all">
      <Reveal>
        <GroupLabel>programs &amp; credentials</GroupLabel>
        <div className="mt-3">
          {extraCurricular.map((entry) => (
            <TimelineEntry key={entry.title} title={entry.title} meta={entry.meta}>
              <CaretList items={entry.bullets} />
            </TimelineEntry>
          ))}
        </div>

        <GroupLabel>leadership</GroupLabel>
        <div className="mt-3">
          {leadership.map((entry) => (
            <TimelineEntry
              key={entry.title}
              title={entry.title}
              org={entry.org}
              meta={entry.meta}
            >
              <CaretList items={entry.bullets} />
            </TimelineEntry>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
