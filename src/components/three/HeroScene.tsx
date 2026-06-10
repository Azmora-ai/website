import { Component, useEffect, useRef, useState, type ReactNode } from "react"
import { Canvas } from "@react-three/fiber"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ParticleField } from "@/components/three/ParticleField"
import { SceneFallback } from "@/components/three/SceneFallback"

gsap.registerPlugin(ScrollTrigger)

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children
  }
}

/**
 * Persistent fixed-position 3D backdrop. Bright at the hero, dims through
 * the middle of the page, and rises again at the contact section.
 */
export default function HeroScene() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4)
  }, [])

  useEffect(() => {
    const tween = gsap.fromTo(
      wrapperRef.current,
      { opacity: 0.75 },
      {
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: "max",
          scrub: true,
        },
        keyframes: [
          { opacity: 0.75, duration: 0.12 },
          { opacity: 0.25, duration: 0.28 },
          { opacity: 0.25, duration: 0.35 },
          { opacity: 0.5, duration: 0.25 },
        ],
      },
    )
    // Lazy chunk mounting changes layout assumptions — refresh pins.
    ScrollTrigger.refresh()
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div ref={wrapperRef} aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <SceneErrorBoundary>
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 8], fov: 50 }}
        >
          <ParticleField reduced={reduced} />
        </Canvas>
      </SceneErrorBoundary>
    </div>
  )
}
