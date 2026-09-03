export type Metric = { value: string; label: string }

export type CaseSection = { heading: string; body: string[] }

export type Project = {
  slug: string
  name: string
  subtitle: string
  year: string
  summary: string
  tags: string[]
  cover?: string
  repo?: string
  demo?: string
  /** Featured projects get a card on the home page and a case-study page. */
  featured: boolean
  metrics?: Metric[]
  /** Rendered as the ASCII architecture block on the case-study page. */
  architecture?: string
  sections?: CaseSection[]
}

export const projects: Project[] = [
  {
    slug: "reconcile-recover",
    name: "Reconcile → Recover",
    subtitle: "Payments reconciliation and automated recovery over RazorpayX",
    year: "2026",
    featured: true,
    repo: "https://github.com/CodeIsFire/RazorPay",
    demo: "https://razor-pay-lemon-gamma.vercel.app",
    cover: "/images/reconcile-recover.svg",
    summary:
      "Reconciles a ledger against RazorpayX transactions and a bank statement, classifies every mismatch by cause, and runs a bounded recovery agent over the real Payouts API — where a payout is only ever considered successful once a signed webhook says so.",
    tags: [
      "Python",
      "FastAPI",
      "SQLite",
      "httpx",
      "React",
      "Tailwind v4",
      "RazorpayX API",
      "Webhooks",
    ],
    metrics: [
      { value: "109", label: "tests, pytest" },
      { value: "8", label: "mismatch causes classified" },
      { value: "9", label: "live payouts dispatched, 0 errors" },
      { value: "4", label: "terminal-safe exception states" },
    ],
    architecture: `transactions  (ledger │ gateway │ bank_statement)
      │
      ▼
 reconcile.py   exact ──► fuzzy ──► split (1 ledger → N gateway)
                                └─► batch (N ledger → 1 gateway)
      │
      ▼
 classify.py    unmatched rows ──► one of 8 causes
      │
      ▼
 router.py      cause ──► action, dispatched at most once per cause
      │
      ▼
 webhook        the ONLY place an action reaches a terminal state
                (HMAC-verified: payout.processed / payout.reversed)`,
    sections: [
      {
        heading: "The problem",
        body: [
          "When a ledger disagrees with a payment gateway, the hard part is not spotting the difference — it is saying *why* the difference exists, and then doing something about it without making things worse.",
          "A naive recovery loop is genuinely dangerous: it pays people twice. That single failure mode drove most of the design.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "Reconciliation runs as a match ladder rather than a single join: exact, then fuzzy, then split (one ledger row against many gateway rows), then batch (many ledger rows against one gateway row). Each pass reconciles the ledger against one source at a time, so a bank-statement pass and a gateway pass never contaminate each other's conclusions.",
          "Whatever fails to match is classified into exactly one of eight causes — failed_payment, fee_mismatch, timing_lag, duplicate, unexplained, refund_unmatched, chargeback, partial_payment — and each cause maps to exactly one action.",
          "Only failed_payment is ever retried, and it is bounded by a maximum retry count, a maximum exception age, and a terminal abandoned state.",
        ],
      },
      {
        heading: "The bug worth keeping",
        body: [
          "Dispatching a payout leaves its exception open on purpose — dispatch is not success. But open is exactly what the router selects for. So re-running the route stage paid every payee a second time: an in-flight attempt was indistinguishable from a failed one.",
          "The fix was to require the previous attempt to be *confirmed failed* before retrying, skipping anything still queued or processing and logging why. Only a webhook-confirmed reversal reopens an exception for a genuine retry.",
          "A second one of the same shape: partial payments graduate when they stop appearing in a reconciliation pass — but split/batch matching is gateway-side, so a bank-statement pass emits none at all. Unscoped, reconciling a bank statement silently marked every gateway-side partial payment resolved. Anything that infers meaning from a row's *absence* now has to filter on which source it came from. Both are regression-tested.",
        ],
      },
      {
        heading: "Correctness machinery",
        body: [
          "Idempotency runs on business keys rather than autoincrement ids, so re-running the pipeline and replaying webhooks are both safe. The RazorpayX idempotency header hashes the request body alongside the internal key — the gateway remembers keys longer than a development database lives, so without the body in the hash a rebuilt DB gets rejected outright.",
          "An executor pattern keeps the router network-free and therefore testable; only the live executor touches httpx, and a mock swaps in whenever credentials are absent.",
          "The audit log is the single source of truth for why something did or did not happen. Every stage writes to it and the dashboard reads it unfiltered.",
        ],
      },
      {
        heading: "Results",
        body: [
          "Verified live against RazorpayX test mode: the route stage dispatched 9 real payouts — 6 to bank accounts over NEFT/IMPS and 3 to VPAs over UPI — with 0 errors. Fixture IFSC codes are real and verified, because RazorpayX rejects well-formed but invented ones at fund-account creation.",
          "109 pytest tests cover the matcher, the classifier, the bounded router, webhook verification and the two absence-inference bugs above.",
        ],
      },
      {
        heading: "What I would do differently",
        body: [
          "Webhook delivery currently depends on an ephemeral tunnel whose URL changes on restart and has to be re-saved by hand through an OTP-gated dashboard. That is the weakest link in the demo story and deserves a stable endpoint.",
          "Payouts created against RazorpayX outlive the local SQLite file, so reloading fixtures orphans them — 76 accumulated at the account against 9 tracked. The system reports these honestly as unmatched rather than inventing reconciliation state for them, which is the right call, but the drift is a design smell worth closing.",
        ],
      },
    ],
  },
  {
    slug: "rag-eval-pipeline",
    name: "RAG Evaluation Pipeline",
    subtitle: "Automated evaluation for a K–12 curriculum search API",
    year: "2026",
    featured: true,
    cover: "/images/rag-eval-pipeline.svg",
    summary:
      "An evaluation harness for a curriculum search API spanning 1,041 chapters across 26 subjects, which generates and quality-filters its own eval set from source textbooks — then used it to find a subject-wide indexing defect and to kill a pipeline stage that was not earning its place.",
    tags: [
      "Python",
      "RAG",
      "LLM-as-Judge",
      "Prompt Engineering",
      "Data Pipelines",
    ],
    metrics: [
      { value: "1,041", label: "chapters covered" },
      { value: "26", label: "subjects" },
      { value: "228", label: "matched runs compared" },
      { value: "20", label: "chapters scoring 1.0/5" },
    ],
    architecture: `source textbooks  (1,041 chapters │ 26 subjects)
      │
      ▼
 generate      model A drafts candidate Q/A from chapter text
      │
      ▼
 critique      model B scores and filters the draft
      │         └─► rejected items never enter the eval set
      ▼
 eval set      self-generated, quality-filtered
      │
      ▼
 judge         correctness │ faithfulness │ retrieval quality
      │
      ▼
 compare       matched runs, reranking ON vs OFF`,
    sections: [
      {
        heading: "The problem",
        body: [
          "A retrieval system over 1,041 chapters cannot be evaluated by hand, and buying or hand-writing an eval set at that scale is its own project. Without one, every claim about retrieval quality is a vibe.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "The pipeline builds its own eval set from the source textbooks using a two-model generate-and-critique loop: one model drafts candidate questions and answers from chapter text, a second scores and filters them, and anything that fails the critique never reaches the eval set.",
          "Scoring uses LLM-as-judge across three separate axes — correctness, faithfulness and retrieval quality — so a confident-but-unsupported answer is distinguishable from a correct one.",
        ],
      },
      {
        heading: "Results",
        body: [
          "The first finding was a subject-wide indexing defect: 20 chapters scored 1.0 out of 5, which is the signature of content that was never indexed rather than content that was retrieved badly. That is a class of bug spot-checking does not find, because the failure is uniform.",
          "The second was negative, and more useful. Comparing 228 matched runs with reranking on and off produced 4.60 against 4.59 — a difference well inside the noise. The reranking stage was carrying latency and cost without buying measurable quality.",
        ],
      },
      {
        heading: "Why the negative result matters",
        body: [
          "Most evaluation work is built to confirm that a pipeline is good. The value here was the opposite: having a harness trustworthy enough to justify *removing* a component. A matched-run comparison is what makes that argument, and it is why the eval set had to be quality-filtered rather than merely generated.",
        ],
      },
    ],
  },
  {
    slug: "catto",
    name: "Catto",
    subtitle: "AI-powered browser extension",
    year: "2025",
    featured: true,
    repo: "https://github.com/CodeIsFire/Catto-web-extension",
    cover: "/images/catto.svg",
    summary:
      "A Chrome/Edge extension that embeds an AI assistant into any page, reading live content and DOM structure so it can answer questions about what you are looking at and edit the page in natural language.",
    tags: [
      "JavaScript",
      "Chrome Extension APIs",
      "LLM Integration",
      "DOM Manipulation",
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Assistants that live in a separate tab lose the one thing that matters most on the web: the page you are actually on. Copying content across to ask a question about it is friction, and it strips the structure that makes the content meaningful.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "A content script reads both the visible text and the DOM structure of the active page, so the assistant has hierarchy and not just a wall of characters. A floating chat widget injects over any site without taking it over.",
          "Beyond answering questions, the extension accepts natural-language edit instructions and applies them to the live DOM.",
        ],
      },
      {
        heading: "What it taught me",
        body: [
          "Extension work is mostly boundary work — content script, background worker and page context each see a different slice of the world, and getting structure across those boundaries intact is most of the job.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------
     Secondary work — listed on the home page, no case-study page.
     ------------------------------------------------------------------ */
  {
    slug: "talk-to-my-finance",
    name: "Talk to My Finance",
    subtitle: "AI finance voice assistant",
    year: "2026",
    featured: false,
    repo: "https://github.com/CodeIsFire/Talktomyfinance",
    summary:
      "A hands-free finance assistant answering spending and subscription questions: research, finance and editor agents behind a Groq-hosted LLM with a retrieval-grounded answer layer, a Plaid sandbox account-linking flow, and a voice input/output loop over a React chat UI.",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "RAG",
      "Multi-Agent",
      "Plaid API",
    ],
  },
  {
    slug: "tatastha",
    name: "Tatastha",
    subtitle: "News comparison and bias analysis",
    year: "2025",
    featured: false,
    summary:
      "An NLP platform for analysing political bias and comparative reporting across media sources, processing 1,000+ articles to surface ideological skew and bias-scoring patterns.",
    tags: ["Python", "FastAPI", "React", "PostgreSQL", "NLP"],
  },
  {
    slug: "user-behaviour-ml",
    name: "User Behaviour Dataset",
    subtitle: "Random forest classification study",
    year: "2026",
    featured: false,
    repo: "https://github.com/CodeIsFire/USER-BEHAVIOUR-DATASET-ML",
    summary:
      "Applied a random forest classifier to a user-behaviour dataset and explored a range of data visualisation approaches over the results.",
    tags: ["Python", "scikit-learn", "Jupyter"],
  },
  {
    slug: "sentiment-analysis",
    name: "Sentiment Analysis",
    subtitle: "YouTube comment sentiment",
    year: "2026",
    featured: false,
    repo: "https://github.com/CodeIsFire/SENTIMENT-ANALYSIS",
    summary:
      "Data cleaning over a YouTube comments dataset with sentiment scored using TextBlob.",
    tags: ["Python", "TextBlob", "Pandas"],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
export const caseStudies = projects.filter((p) => p.featured && p.sections)

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
