import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { beyond } from "@/lib/content"
import { SectionHeading } from "@/components/ui/section-heading"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Roadmap teaser: a gold line draws across (down, on mobile) as you scroll,
 * lighting up the three phase nodes as it reaches them.
 */
export function BeyondConsulting() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".beyond-roadmap",
            start: "top 80%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        })

        tl.fromTo(
          ".beyond-track",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", duration: 1 },
        )
        tl.from(
          ".beyond-node",
          { opacity: 0, scale: 0.6, stagger: 0.3, duration: 0.3, ease: "back.out(2)" },
          0.05,
        )
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="beyond"
      aria-labelledby="beyond-title"
      className="relative z-10 py-(--spacing-section)"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="05" eyebrow="Where we're headed" title={beyond.title} id="beyond-title" />

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {beyond.body}
        </p>

        <div className="beyond-roadmap relative mt-20">
          {/* Track line (desktop horizontal) */}
          <div aria-hidden className="absolute left-0 right-0 top-[5px] hidden h-px bg-line md:block" />
          <div
            aria-hidden
            className="beyond-track absolute left-0 right-0 top-[5px] hidden h-px origin-left bg-gold md:block"
          />

          <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
            {beyond.roadmap.map((step) => (
              <li key={step.phase} className="beyond-node relative">
                <span
                  aria-hidden
                  className="block h-[11px] w-[11px] rounded-full border border-gold bg-bg-deep shadow-[0_0_12px_rgba(212,169,78,0.5)]"
                />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                  {step.phase}
                </p>
                <h3 className="mt-2 text-xl text-ink sm:text-2xl">{step.name}</h3>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-20 max-w-2xl font-display text-xl leading-relaxed text-ink sm:text-2xl">
          {beyond.closing}
        </p>
      </div>
    </section>
  )
}
