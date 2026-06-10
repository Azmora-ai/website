import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { whatWeDo } from "@/lib/content"
import { SectionHeading } from "@/components/ui/section-heading"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

/**
 * ref6 ContainerScroll adapted: the heading drifts up while a perspective
 * panel holding the three service cards rotates flat as it scrolls into view.
 * Motion-only, unpinned.
 */
export function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [0.92, 1])
  const headerY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [40, 0])

  const cardVariants = {
    hidden: reducedMotion ? {} : { opacity: 0, y: 32 },
    visible: (i: number) =>
      reducedMotion
        ? {}
        : {
            opacity: 1,
            y: 0,
            transition: { delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
          },
  }

  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-title"
      className="relative z-10 py-(--spacing-section)"
    >
      <div ref={containerRef} className="mx-auto max-w-6xl px-6">
        <motion.div style={{ y: headerY }}>
          <SectionHeading
            index="02"
            eyebrow="What we do"
            title={whatWeDo.title}
            id="what-we-do-title"
            align="center"
          />
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-ink-muted sm:text-lg">
            {whatWeDo.intro}
          </p>
        </motion.div>

        <div style={{ perspective: "1200px" }} className="mt-16">
          <motion.div
            style={{ rotateX, scale, transformStyle: "preserve-3d" }}
            className="rounded-2xl border border-line bg-surface/60 p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-5"
          >
            <div className="grid gap-3 rounded-xl bg-bg-deep/60 p-3 sm:gap-5 sm:p-5 lg:grid-cols-3">
              {whatWeDo.services.map((service, i) => (
                <motion.article
                  key={service.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={cardVariants}
                  className="group relative flex flex-col rounded-lg border border-line bg-surface p-7 transition-colors duration-300 hover:border-gold-dim/60"
                >
                  <div aria-hidden className="mb-6 h-px w-12 bg-gold transition-all duration-500 group-hover:w-20" />
                  <p aria-hidden className="mb-3 font-mono text-[11px] tracking-[0.25em] text-gold-dim">
                    0{i + 1}
                  </p>
                  <h3 className="text-xl text-ink sm:text-2xl">{service.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                    {service.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-14 max-w-xl text-center font-display text-lg text-ink-muted italic sm:text-xl"
        >
          {whatWeDo.closing}
        </motion.p>
      </div>
    </section>
  )
}
