import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"
import { fadeUp, inView, stagger } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Props = {
  children: ReactNode
  className?: string
  /** Stagger direct children instead of animating as one block. */
  group?: boolean
  delay?: number
  as?: "div" | "section" | "ul" | "li" | "article"
}

/**
 * Scroll-triggered reveal. When the user prefers reduced motion the element
 * renders in its final state immediately — no fade, no offset, no delay.
 */
export function Reveal({
  children,
  className,
  group = false,
  delay = 0,
  as = "div",
}: Props) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={group ? stagger(0.06, delay) : { ...fadeUp }}
      transition={group ? undefined : { delay }}
    >
      {children}
    </Tag>
  )
}

/** A single staggered child. Only meaningful inside <Reveal group>. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode
  className?: string
  as?: "div" | "li" | "article"
}) {
  const reduced = useReducedMotion()
  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }
  const Tag = motion[as]
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  )
}
