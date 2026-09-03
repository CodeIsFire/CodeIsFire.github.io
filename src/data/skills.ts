export type SkillGroup = { label: string; items: string[] }

/** Mirrors the SKILLS block of the resume, group for group. */
export const skillGroups: SkillGroup[] = [
  {
    label: "languages",
    items: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL"],
  },
  {
    label: "cs fundamentals",
    items: ["Data Structures & Algorithms", "Object-Oriented Design"],
  },
  {
    label: "technical",
    items: [
      "Data Science",
      "Machine Learning",
      "AI",
      "Predictive Analytics",
      "Prompt Engineering",
      "LLM Fine-tuning",
      "Tableau",
    ],
  },
  {
    label: "web & frameworks",
    items: ["React", "FastAPI"],
  },
  {
    label: "data & analytics",
    items: [
      "Pandas",
      "NumPy",
      "PostgreSQL",
      "Data Analysis",
      "Statistics",
      "Jupyter Notebook",
    ],
  },
  {
    label: "tools & platforms",
    items: ["Git", "Linux", "VS Code", "Cloud Computing", "Agile", "SDLC"],
  },
  {
    label: "soft skills",
    items: [
      "Communication",
      "Cross-Functional Collaboration",
      "Change Management",
      "Critical Thinking",
    ],
  },
]
