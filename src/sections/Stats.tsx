import { Bar } from "@/components/charts/bar"
import { BarChart } from "@/components/charts/bar-chart"
import { BarXAxis } from "@/components/charts/bar-x-axis"
import { Grid } from "@/components/charts/grid"
import { ChartTooltip } from "@/components/charts/tooltip"
import { Reveal, RevealItem } from "@/components/Reveal"
import { GroupLabel, Section } from "@/components/Terminal"
import stats from "@/data/stats.json"

function Panel({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-card border border-line bg-panel p-4">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="font-mono text-sm text-text-hi">{title}</h3>
        {hint && (
          <span className="font-mono text-[0.7rem] text-text-dim">{hint}</span>
        )}
      </div>
      {children}
    </div>
  )
}

export function Stats() {
  const { github, leetcode, generatedAt } = stats

  // Nothing to draw if the fetch has never succeeded — render nothing rather
  // than an empty chart frame.
  if (!github && !leetcode) return null

  // The categorical axis gives each label one band; "Jupyter Notebook" is wide
  // enough to collide with its neighbour, so long names are abbreviated.
  const SHORT_NAME: Record<string, string> = {
    "Jupyter Notebook": "Jupyter",
    JavaScript: "JS",
    TypeScript: "TS",
  }

  const languageData =
    github?.languages.map((l) => ({
      name: SHORT_NAME[l.name] ?? l.name,
      percent: l.percent,
    })) ?? []

  const leetcodeData = leetcode
    ? [
        { name: "Easy", solved: leetcode.easy },
        { name: "Medium", solved: leetcode.medium },
        { name: "Hard", solved: leetcode.hard },
      ]
    : []

  const updated = generatedAt
    ? new Date(generatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null

  return (
    <Section id="stats" command="git log --stat">
      <Reveal group className="space-y-4">
        {github && (
          <RevealItem>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "public repos", value: github.repos },
                { label: "stars earned", value: github.stars },
                { label: "problems solved", value: leetcode?.total ?? 0 },
                { label: "languages used", value: github.languages.length },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-card border border-line bg-panel p-4"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-mono text-2xl text-accent tabular-nums">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-xs text-text-dim">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </RevealItem>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          {languageData.length > 0 && (
            <RevealItem>
              <Panel title="language split" hint="% of bytes written">
                <BarChart
                  data={languageData}
                  xDataKey="name"
                  aspectRatio="16 / 10"
                  margin={{ top: 16, right: 8, bottom: 28, left: 34 }}
                >
                  <Grid horizontal numTicksRows={4} />
                  <Bar dataKey="percent" fill="var(--chart-1)" />
                  <BarXAxis />
                  <ChartTooltip />
                </BarChart>
              </Panel>
            </RevealItem>
          )}

          {leetcodeData.length > 0 && (
            <RevealItem>
              <Panel
                title="leetcode"
                hint={`${leetcode?.total ?? 0} solved`}
              >
                <BarChart
                  data={leetcodeData}
                  xDataKey="name"
                  aspectRatio="16 / 10"
                  margin={{ top: 16, right: 8, bottom: 28, left: 34 }}
                >
                  <Grid horizontal numTicksRows={4} />
                  <Bar dataKey="solved" fill="var(--chart-2)" />
                  <BarXAxis />
                  <ChartTooltip />
                </BarChart>
              </Panel>
            </RevealItem>
          )}
        </div>

        {updated && (
          <RevealItem>
            <GroupLabel>fetched from the GitHub and LeetCode APIs at build time · last refreshed {updated}</GroupLabel>
          </RevealItem>
        )}
      </Reveal>
    </Section>
  )
}
