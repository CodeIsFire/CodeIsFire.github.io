export type Link = { label: string; href: string }

export type Entry = {
  title: string
  org?: string
  meta: string
  bullets: string[]
  links?: Link[]
}

export const experience: Entry[] = [
  {
    title: "Open Source Contributor",
    org: "Google Summer of Code 2025 · GNU Radio",
    meta: "Remote · Jun 2025 – Oct 2025",
    bullets: [
      "Researched automated 5G NR cell-detection pipelines in Python and GNU Radio, validating synchronization strategies against 3GPP specifications.",
      "Designed and evaluated PSS/SSS detection and timing-alignment algorithms, analysing detection accuracy and robustness across varying SNR and channel conditions.",
      "Built experimental DSP and data-analysis pipelines in Python, cutting manual signal-analysis effort by 70% while improving repeatability and evaluation rigour.",
      "Worked inside a full Agile open-source SDLC, collaborating with mentors through milestone-driven development.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/CodeIsFire/GNU-RADIO" }],
  },
]

export const extraCurricular: Entry[] = [
  {
    title: "McKinsey Forward Program",
    meta: "McKinsey & Company",
    bullets: [
      "Selected for McKinsey's global learning program covering structured problem solving, data-driven decision making, communication and adaptability through hands-on modules and real-world case exercises.",
    ],
  },
  {
    title: "Google Cloud — Generative AI Explorer (Vertex AI)",
    meta: "Google Cloud Skills Boost",
    bullets: [
      "Completed the Skills Boost badge on generative AI fundamentals and applied use of Vertex AI.",
    ],
  },
  {
    title: "Runner-Up — Altrusity Hackathon",
    meta: "Hackathon",
    bullets: [
      "Built and presented a working solution in a competitive, time-bound environment — rapid prototyping and analytical problem solving under pressure.",
    ],
  },
]

export const leadership: Entry[] = [
  {
    title: "Deputy Secretary General",
    org: "Birla Public School Model United Nations",
    meta: "2022",
    bullets: [
      "Led the organisation and execution of a large-scale interschool conference — coordinating committees, delegates, scheduling, communication and operations.",
    ],
  },
]
