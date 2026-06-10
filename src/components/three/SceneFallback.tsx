/**
 * Static backdrop used when WebGL is unavailable, reduced motion is on,
 * or while the 3D chunk loads. Visually congruent with the particle field.
 */
export function SceneFallback() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 35%, #11182e 0%, #0a0e1a 70%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(212, 169, 78, 0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 40%, black 30%, transparent 75%)",
        }}
      />
    </div>
  )
}
