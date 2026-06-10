import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { navLinks } from "@/lib/content"
import { TextScramble } from "@/components/ui/text-scramble"
import { useSmoothScroll } from "@/components/providers/SmoothScroll"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      aria-label="Main"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-line/60 bg-bg/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            scrollTo("#hero")
          }}
          className="font-display text-xl tracking-tight text-ink"
        >
          Azmora<span className="text-gold">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(link.href)
              }}
              className="text-ink-muted transition-colors hover:text-ink"
            >
              <TextScramble
                text={link.label.toUpperCase()}
                className="text-[11px] tracking-[0.2em]"
              />
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
