import { lazy, Suspense } from "react"
import { SmoothScroll } from "@/components/providers/SmoothScroll"
import { Nav } from "@/components/layout/Nav"
import { ScrollProgress } from "@/components/layout/ScrollProgress"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { ProblemStrip } from "@/components/sections/ProblemStrip"
import { WhatWeDo } from "@/components/sections/WhatWeDo"
import { WhyAzmora } from "@/components/sections/WhyAzmora"
import { WhoItsFor } from "@/components/sections/WhoItsFor"
import { BeyondConsulting } from "@/components/sections/BeyondConsulting"
import { Contact } from "@/components/sections/Contact"
import { SceneFallback } from "@/components/three/SceneFallback"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useWebGLSupport } from "@/hooks/use-webgl-support"

const HeroScene = lazy(() => import("@/components/three/HeroScene"))

function Backdrop() {
  const reducedMotion = useReducedMotion()
  const webgl = useWebGLSupport()

  if (reducedMotion || !webgl) return <SceneFallback />
  return (
    <Suspense fallback={<SceneFallback />}>
      <HeroScene />
    </Suspense>
  )
}

export default function App() {
  return (
    <SmoothScroll>
      <Backdrop />
      <Nav />
      <ScrollProgress />
      <main>
        <Hero />
        <ProblemStrip />
        <WhatWeDo />
        <WhyAzmora />
        <WhoItsFor />
        <BeyondConsulting />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
