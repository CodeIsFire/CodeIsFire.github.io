#!/usr/bin/env node
/**
 * Build-time stats fetch.
 *
 * Runs in Node (not the browser) so there is no CORS problem and no
 * per-visitor GitHub rate limiting. Writes src/data/stats.json, which is
 * committed — if an API is down or rate-limited, the previous values are
 * kept and the build still succeeds. Never throws.
 *
 *   node scripts/fetch-stats.mjs
 *
 * GITHUB_TOKEN is optional; it only raises the rate limit.
 */
import { readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const OUT = path.join(ROOT, "src/data/stats.json")

const GH_USER = "CodeIsFire"
const LC_USER = "bdAPb39sYQ"

/** Languages we never want to show as "work" in the language split. */
const LANG_DENYLIST = new Set(["Makefile", "Dockerfile", "Shell", "Batchfile"])

const ghHeaders = {
  Accept: "application/vnd.github+json",
  "User-Agent": `${GH_USER}-portfolio-build`,
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
}

async function loadPrevious() {
  try {
    return JSON.parse(await readFile(OUT, "utf8"))
  } catch {
    return null
  }
}

async function getJSON(url, init) {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`)
  return res.json()
}

async function fetchGitHub() {
  const repos = await getJSON(
    `https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`,
    { headers: ghHeaders },
  )
  const own = repos.filter((r) => !r.fork)

  // Language bytes, summed across every non-fork repo.
  const bytes = {}
  for (const repo of own) {
    try {
      const langs = await getJSON(repo.languages_url, { headers: ghHeaders })
      for (const [lang, n] of Object.entries(langs)) {
        if (LANG_DENYLIST.has(lang)) continue
        bytes[lang] = (bytes[lang] ?? 0) + n
      }
    } catch {
      // One unreadable repo should not sink the whole language split.
    }
  }

  const total = Object.values(bytes).reduce((a, b) => a + b, 0) || 1
  const languages = Object.entries(bytes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, n]) => ({
      name,
      bytes: n,
      percent: Number(((n / total) * 100).toFixed(1)),
    }))

  return {
    repos: own.length,
    stars: own.reduce((a, r) => a + r.stargazers_count, 0),
    languages,
    topRepos: own
      .filter((r) => r.description)
      .slice(0, 5)
      .map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        url: r.html_url,
      })),
  }
}

async function fetchLeetCode() {
  const query = `
    query userStats($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal { acSubmissionNum { difficulty count } }
      }
    }`
  const data = await getJSON("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
      "User-Agent": "Mozilla/5.0",
    },
    body: JSON.stringify({ query, variables: { username: LC_USER } }),
  })

  const nums = data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum
  if (!Array.isArray(nums)) throw new Error("unexpected LeetCode shape")

  const pick = (d) => nums.find((n) => n.difficulty === d)?.count ?? 0
  return {
    total: pick("All"),
    easy: pick("Easy"),
    medium: pick("Medium"),
    hard: pick("Hard"),
  }
}

async function main() {
  const previous = await loadPrevious()
  const next = {
    generatedAt: new Date().toISOString(),
    github: previous?.github ?? null,
    leetcode: previous?.leetcode ?? null,
  }

  for (const [key, fn] of [
    ["github", fetchGitHub],
    ["leetcode", fetchLeetCode],
  ]) {
    try {
      next[key] = await fn()
      console.log(`✓ ${key}`)
    } catch (err) {
      console.warn(`✗ ${key} — keeping previous value (${err.message})`)
      if (!next[key]) console.warn(`  no previous ${key} data to fall back on`)
    }
  }

  await writeFile(OUT, JSON.stringify(next, null, 2) + "\n")
  console.log(`wrote ${path.relative(ROOT, OUT)}`)
}

main()
