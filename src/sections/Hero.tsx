import { motion, useReducedMotion } from "motion/react"
import { ArrowDown, Download, Mail } from "lucide-react"
import { Github, Linkedin } from "@/components/BrandIcons"
import DecryptedText from "@/components/reactbits/DecryptedText"
import { profile } from "@/data/profile"
import { ease } from "@/lib/motion"

const socials = [
  { href: profile.links.github, label: "GitHub", Icon: Github },
  { href: profile.links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
]

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="flex min-h-[88svh] flex-col justify-center py-20">
      <motion.p
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={ease}
        className="mb-4 font-mono text-sm text-text-dim"
      >
        <span aria-hidden className="text-accent">
          ${" "}
        </span>
        whoami
      </motion.p>

      <h1 className="font-mono text-4xl font-bold tracking-tight text-text-hi sm:text-5xl lg:text-6xl">
        {reduced ? (
          profile.name
        ) : (
          <DecryptedText
            text={profile.name}
            animateOn="view"
            revealDirection="start"
            speed={38}
            maxIterations={12}
            useOriginalCharsOnly
            parentClassName="inline-block"
            className="text-text-hi"
            encryptedClassName="text-accent-dim"
          />
        )}
      </h1>

      <motion.p
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...ease, delay: 0.15 }}
        className="mt-5 max-w-xl text-base leading-relaxed text-text text-pretty sm:text-lg"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...ease, delay: 0.25 }}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <a
          href={profile.resume}
          download
          className="inline-flex items-center gap-2 rounded-card border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/20"
        >
          <Download className="h-4 w-4" aria-hidden />
          resume.pdf
        </a>

        <div className="flex items-center gap-1">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-card p-2 text-text-dim transition-colors hover:text-accent"
            >
              <Icon className="h-5 w-5" aria-hidden />
            </a>
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#intro"
        aria-label="Scroll to introduction"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...ease, delay: 0.6 }}
        className="mt-16 inline-flex w-fit items-center gap-2 font-mono text-xs text-text-dim transition-colors hover:text-accent"
      >
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden />
        scroll
      </motion.a>
    </section>
  )
}
