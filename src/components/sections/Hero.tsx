import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { hero } from "@/lib/content"
import { useSmoothScroll } from "@/components/providers/SmoothScroll"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Load-time reveal
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-line-inner", {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.14,
            delay: 0.2,
          })
          .from(".hero-sub", { opacity: 0, y: 24, duration: 0.9 }, "-=0.55")
          .from(".hero-ctas", { opacity: 0, y: 18, duration: 0.7 }, "-=0.5")
          .from(".hero-rule", { scaleX: 0, duration: 1.1, ease: "power3.inOut" }, "-=0.9")

        // Scroll-out parallax: headline drifts up slower than the page
        gsap.to(".hero-content", {
          y: -80,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="hero"
      aria-labelledby="hero-title"
      className="relative z-10 flex min-h-svh items-center"
    >
      <div className="hero-content mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.35em] text-gold">
          {hero.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.04] text-ink"
        >
          {hero.headline.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <span className="hero-line-inner block will-change-transform">
                {i === 1 ? (
                  <>
                    Compliant <em className="text-gold not-italic">by design.</em>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <div
          aria-hidden
          className="hero-rule mt-10 h-px w-full origin-left bg-gradient-to-r from-gold-dim via-line to-transparent"
        />

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <p className="hero-sub max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="hero-ctas flex flex-wrap items-center gap-6 md:justify-end">
            <a
              href="#what-we-do"
              onClick={(e) => {
                e.preventDefault()
                scrollTo("#what-we-do")
              }}
              className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-gold-bright"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
