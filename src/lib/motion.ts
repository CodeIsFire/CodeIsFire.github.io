import type { Transition, Variants } from "motion/react"

/** Slightly under-damped spring — carries a little energy without bouncing. */
export const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
}

export const ease: Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: ease },
}

export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Viewport config used by every scroll reveal, so timing stays consistent. */
export const inView = { once: true, margin: "-80px 0px -80px 0px" } as const
