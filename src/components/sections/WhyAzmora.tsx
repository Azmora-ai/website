import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { motion } from "motion/react"
import { whyAzmora } from "@/lib/content"
import { SectionHeading } from "@/components/ui/section-heading"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Sticky left column; value blocks rise in on the right while a gold
 * progress line fills alongside them, scrubbed to section scroll.
 */
export function WhyAzmora() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".why-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".why-values",
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="why"
      aria-labelledby="why-title"
      className="relative z-10 border-y border-line/50 bg-bg-deep/40 py-(--spacing-section)"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="03"
            eyebrow="Why Azmora"
            title={whyAzmora.title}
            id="why-title"
          />
          <p className="mt-8 max-w-md text-base leading-relaxed text-ink-muted">
            {whyAzmora.body}
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink">
            {whyAzmora.lead}
          </p>
        </div>

        <div className="why-values relative pl-8">
          <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-line" />
          <div
            aria-hidden
            className="why-line absolute left-0 top-0 h-full w-px origin-top bg-gold"
          />

          <ul className="flex flex-col gap-14">
            {whyAzmora.values.map((value, i) => (
              <motion.li
                key={value.name}
                initial={reducedMotion ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p aria-hidden className="font-mono text-[11px] tracking-[0.25em] text-gold-dim">
                  0{i + 1}
                </p>
                <h3 className="mt-2 text-2xl text-gold-bright sm:text-3xl">
                  {value.name}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
                  {value.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
