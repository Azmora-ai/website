import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·"

/**
 * Monospace decode-on-hover effect, adapted from ui-reference-components/ref5.
 * No-op under prefers-reduced-motion.
 */
interface TextScrambleProps {
  text: string
  className?: string
  as?: "span" | "div"
}

export function TextScramble({ text, className, as: Tag = "span" }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const frameRef = useRef(0)
  const reducedMotion = useReducedMotion()

  const scramble = useCallback(() => {
    if (reducedMotion) return
    frameRef.current = 0
    const duration = Math.max(text.length * 2, 10)

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      frameRef.current++
      const progress = frameRef.current / duration
      const revealedLength = Math.floor(progress * text.length)

      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < revealedLength) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(""),
      )

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(text)
      }
    }, 28)
  }, [text, reducedMotion])

  useEffect(() => {
    setDisplayText(text)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text])

  return (
    <Tag
      className={cn("font-mono whitespace-pre", className)}
      onMouseEnter={scramble}
      aria-label={text}
    >
      {displayText}
    </Tag>
  )
}
