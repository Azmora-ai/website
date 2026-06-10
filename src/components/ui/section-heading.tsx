import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  /** Section number rendered in the eyebrow, e.g. "02" */
  index: string
  eyebrow: string
  title: ReactNode
  id?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  id,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <header className={cn(align === "center" && "text-center", className)}>
      <p
        className={cn(
          "font-mono text-xs uppercase tracking-[0.3em] text-gold",
          align === "center" ? "justify-center" : "",
          "flex items-baseline gap-3",
          align === "center" && "justify-center",
        )}
      >
        <span aria-hidden className="text-gold-dim">
          {index} /
        </span>
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-5 text-[clamp(2rem,5vw,3.75rem)] leading-[1.08] text-ink"
      >
        {title}
      </h2>
    </header>
  )
}
