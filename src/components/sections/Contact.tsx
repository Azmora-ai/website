import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { contact, EMAIL, MAILTO } from "@/lib/content"
import { TextScramble } from "@/components/ui/text-scramble"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Contact() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top 65%",
            },
            defaults: { ease: "expo.out" },
          })
          .from(".contact-line-inner", { yPercent: 110, duration: 1.1 })
          .from(".contact-body", { opacity: 0, y: 24, duration: 0.8 }, "-=0.5")
          .from(".contact-actions", { opacity: 0, y: 18, duration: 0.7 }, "-=0.45")
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="contact"
      aria-labelledby="contact-title"
      className="relative z-10 flex min-h-[80svh] items-center"
    >
      <div className="mx-auto w-full max-w-4xl px-6 py-(--spacing-section) text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
          06 / Contact
        </p>

        <h2
          id="contact-title"
          className="mt-6 overflow-hidden pb-[0.14em] -mb-[0.14em] text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.05] text-ink"
        >
          <span className="contact-line-inner block will-change-transform">
            {contact.headline}
          </span>
        </h2>

        <p className="contact-body mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {contact.body}
        </p>

        <div className="contact-actions mt-12 flex flex-col items-center">
          <a
            href={MAILTO}
            className="group inline-flex flex-col items-center gap-2 text-ink transition-colors hover:text-gold-bright"
          >
            <TextScramble text={EMAIL} className="text-lg tracking-[0.15em] sm:text-xl" />
            <span
              aria-hidden
              className="block h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
