/**
 * Mutable scroll state written by the Lenis scroll handler and read inside
 * R3F's useFrame. Deliberately not React state — the 3D scene samples it
 * per-frame without triggering re-renders.
 */
export const scrollState = {
  /** Page scroll progress 0..1 */
  progress: 0,
  /** Lenis velocity (px/frame, signed) */
  velocity: 0,
}
