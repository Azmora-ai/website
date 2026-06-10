import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { scrollState } from "@/lib/scroll-state"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

type ScrollToTarget = string | number | HTMLElement

interface SmoothScrollContextValue {
  scrollTo: (target: ScrollToTarget) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: (target) => {
    if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView()
    }
  },
})

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({ lerp: 0.1 })
    lenisRef.current = lenis

    lenis.on("scroll", (e: Lenis) => {
      scrollState.progress = e.limit > 0 ? e.scroll / e.limit : 0
      scrollState.velocity = e.velocity
      ScrollTrigger.update()
    })

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Pin positions depend on final font metrics.
    document.fonts.ready.then(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
      scrollState.velocity = 0
    }
  }, [reducedMotion])

  const scrollTo = (target: ScrollToTarget) => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.4 })
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView()
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView()
    }
  }

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
