# CodeIsFire.github.io

Personal portfolio for Aaditya Bhardwaj — <https://codeisfire.github.io>

Vite + React + TypeScript + Tailwind v4, deployed to GitHub Pages by GitHub
Actions. The visual language is a dark terminal theme: GitHub-green accent on
near-black, JetBrains Mono for anything structural, and `$` / `//` / `>` marks
carried over from the previous build.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + bundle to dist/
npm run preview    # serve the built output
npm run lint       # tsc --noEmit
```

## Where the content lives

All copy is data, not JSX. To change what the site says, edit these and
nothing else:

| File | Holds |
| --- | --- |
| `src/data/profile.ts` | Name, tagline, education, contact links, resume path |
| `src/data/skills.ts` | Skill groups, mirroring the resume's SKILLS block |
| `src/data/experience.ts` | Experience, extra-curriculars, leadership |
| `src/data/projects.ts` | Every project, including the case-study bodies |
| `src/data/stats.json` | Generated — see below |

A project gets a case-study page at `/projects/<slug>` as soon as it has both
`featured: true` and a `sections` array. Without `sections` it renders as a
card only.

The resume PDF is served from `public/Aaditya-Bhardwaj-Resume.pdf`; replace
that file to publish a new version.

## Stats

`scripts/fetch-stats.mjs` pulls GitHub and LeetCode figures and writes
`src/data/stats.json`, which is **committed**. It runs in Node rather than the
browser, so there is no CORS problem and visitors are never rate-limited. If
an API fails the previous values are kept and the build still succeeds.

```bash
npm run fetch-stats            # optionally with GITHUB_TOKEN set
```

`.github/workflows/refresh-stats.yml` re-runs it weekly and commits any change.

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/`.

**One-time setup:** in **Settings → Pages → Source**, select **GitHub Actions**.
Until that is switched from "Deploy from a branch", the workflow will build but
never publish.

The workflow copies `dist/index.html` to `dist/404.html`. GitHub Pages has no
SPA rewrite rule, so that copy is what lets a deep link such as
`/projects/reconcile-recover` boot the router instead of 404ing.

## Notes for future edits

- **Never add a theme colour named `base`.** Tailwind v4 turns every
  `--color-*` token into a `text-*` utility, so `--color-base` would override
  the built-in `text-base` font-size and paint body copy in the background
  colour. The token is called `--color-shell` for this reason.
- Components pulled from the Kokonut UI, React Bits and Bklit registries live
  under `src/components/`. They are ours to edit — restyle them to the terminal
  palette rather than treating them as a dependency.
- The Bklit chart registry ships light-mode tokens behind a `.dark` class this
  site never sets, and emitted `var(----chart-1)` with four dashes. Both are
  corrected at the bottom of `src/styles/index.css`.
