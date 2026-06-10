import { useEffect, useState } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import { cn } from "@/lib/utils"
import { sectionIds } from "@/lib/content"
import { useSmoothScroll } from "@/components/providers/SmoothScroll"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

const labels: Record<(typeof sectionIds)[number], string> = {
  hero: "Top",
  problem: "The problem",
  "what-we-do": "What we do",
  why: "Why Azmora",
  who: "Who it's for",
  beyond: "Beyond consulting",
  contact: "Contact",
}

export function ScrollProgress() {
  const [active, setActive] = useState<string>("hero")
  const { scrollTo } = useSmoothScroll()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const triggers = sectionIds.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActive(id)
        },
      }),
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  if (reducedMotion) return null

  return (
    <div
      aria-hidden
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {sectionIds.map((id) => (
        <button
          key={id}
          type="button"
          tabIndex={-1}
          title={labels[id]}
          onClick={() => scrollTo(`#${id}`)}
          className="group flex h-4 w-4 cursor-pointer items-center justify-center"
        >
          <span
            className={cn(
              "block rounded-full transition-all duration-300",
              active === id
                ? "h-2 w-2 bg-gold"
                : "h-1.5 w-1.5 bg-ink-faint group-hover:bg-ink-muted",
            )}
          />
        </button>
      ))}
    </div>
  )
}
