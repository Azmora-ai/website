import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"
import { whoItsFor } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * ref4 ScrollPortraitWall adapted: typographic audience plates scattered
 * down the section, each scrubbing scale 0 → 1 → 0 as it passes through
 * the viewport, under a sticky mix-blend-exclusion title.
 */

// Sparse placement: [column-start (of 5), corner transform-origin]
const placements: Array<[string, string]> = [
  ["lg:col-start-1", "right bottom"],
  ["lg:col-start-3", "left bottom"],
  ["lg:col-start-2", "right bottom"],
  ["lg:col-start-3", "left bottom"],
]

export function WhoItsFor() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".who-plate").forEach((el) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            })
            .fromTo(el, { scale: 0 }, { scale: 1, ease: "power2.out", duration: 0.5 })
            .to(el, { scale: 0, ease: "power2.in", duration: 0.5 })
        })
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="who"
      aria-labelledby="who-title"
      className="relative z-10"
    >
      {/* Sticky centred title — blends against plates passing behind it */}
      <div className="pointer-events-none sticky top-1/2 z-20 -translate-y-1/2 px-6 text-center mix-blend-exclusion">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/60">
          04 / Audience
        </p>
        <h2
          id="who-title"
          className="mt-4 text-[clamp(2.5rem,7vw,5.5rem)] leading-none text-white"
        >
          {whoItsFor.title}
        </h2>
      </div>

      <div className="mx-auto -mt-[40vh] grid max-w-6xl grid-cols-1 gap-y-[30vh] px-6 pb-[35vh] pt-[55vh] lg:grid-cols-5">
        {whoItsFor.audiences.map((audience, i) => (
          <div key={audience.name} className={cn("lg:col-span-3", placements[i][0])}>
            <article
              className="who-plate rounded-xl border border-line bg-surface-raised/90 p-8 backdrop-blur-sm sm:p-10"
              style={{ transformOrigin: placements[i][1] }}
            >
              <p className="flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                <span aria-hidden>0{i + 1}</span>
                <span>{audience.qualifier}</span>
              </p>
              <h3 className="mt-4 text-3xl text-ink sm:text-4xl">{audience.name}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
                {audience.description}
              </p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
