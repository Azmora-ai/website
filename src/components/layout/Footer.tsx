import { EMAIL, MAILTO, footer } from "@/lib/content"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 font-mono text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink-muted">{footer.line1}</p>
        <p className="tracking-[0.2em] uppercase">{footer.line2}</p>
        <a href={MAILTO} className="text-gold-dim transition-colors hover:text-gold">
          {EMAIL}
        </a>
      </div>
    </footer>
  )
}
