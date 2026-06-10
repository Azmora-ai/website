# Azmora — Website

Single-page scrollytelling marketing site for Azmora, a GCC-focused AI strategy,
product, and compliance consultancy.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** (CSS-first config in `src/index.css` `@theme`)
- **GSAP + ScrollTrigger** — pinned/scrubbed scroll sections
- **Motion** (`motion/react`) — in-view reveals, perspective panel
- **React Three Fiber + three** — minimal particle backdrop (lazy-loaded)
- **Lenis** — smooth scrolling

## Develop

```bash
npm install
npm run dev      # dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Where things live

- `src/lib/content.ts` — **all site copy**; edit text here, not in components
- `src/index.css` — design tokens (colors, fonts, spacing)
- `src/components/sections/` — the seven scroll sections
- `src/components/three/` — 3D backdrop + static fallback (no-WebGL / reduced motion)
- `refrences/`, `ui-reference-components/` — original briefs and UI references (not part of the build)

Accessibility: all animations are gated behind `prefers-reduced-motion`; content
is fully readable with JS animations off.
