import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { problem } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Pinned scrollytelling strip: the headline scrubs in word by word,
 * the 84% counter counts up in gold, then the regulator chips
 * scale in with stagger (ref4's scrub treatment applied to chips).
 */
export function ProblemStrip() {
  const root = useRef<HTMLElement>(null)

  // Render the headline as word spans; "84%" gets the counter treatment.
  const words = problem.headline.split(" ")

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.5,
          },
        })

        tl.fromTo(
          ".problem-word",
          { color: "rgba(242, 238, 227, 0.15)" },
          {
            color: "var(--color-ink)",
            stagger: 0.06,
            ease: "none",
            duration: 1.4,
          },
        )

        const counter = { value: 0 }
        tl.to(
          counter,
          {
            value: problem.stat,
            duration: 1.2,
            ease: "none",
            onUpdate: () => {
              const el = root.current?.querySelector(".problem-stat")
              if (el) el.textContent = `${Math.round(counter.value)}%`
            },
          },
          0.2,
        )

        tl.from(
          ".problem-body",
          { opacity: 0, y: 24, duration: 0.5, ease: "power2.out" },
          1.5,
        )

        tl.from(
          ".problem-chip",
          {
            scale: 0,
            opacity: 0,
            stagger: 0.12,
            duration: 0.5,
            ease: "back.out(1.6)",
          },
          1.7,
        )
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="problem"
      aria-labelledby="problem-title"
      className="relative z-10 flex min-h-svh flex-col justify-center bg-bg-deep/60"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-24 text-center">
        <h2
          id="problem-title"
          className="text-[clamp(1.9rem,4.5vw,3.5rem)] leading-[1.15]"
        >
          {words.map((word, i) =>
            word === "84%." ? (
              <span key={i}>
                <span className="problem-stat font-mono text-gold">84%</span>
                <span className="problem-word text-ink">.</span>{" "}
              </span>
            ) : (
              <span key={i} className="problem-word text-ink">
                {word}{" "}
              </span>
            ),
          )}
        </h2>

        <p className="problem-body mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {problem.body}
        </p>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4" aria-label="GCC AI regulations">
          {problem.regulators.map((name) => (
            <li
              key={name}
              className="problem-chip rounded-full border border-gold-dim/50 bg-surface px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-gold-bright"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
