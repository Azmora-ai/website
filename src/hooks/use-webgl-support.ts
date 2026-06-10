let cached: boolean | null = null

function probe(): boolean {
  if (cached !== null) return cached
  try {
    const canvas = document.createElement("canvas")
    cached = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"))
  } catch {
    cached = false
  }
  return cached
}

export function useWebGLSupport(): boolean {
  return probe()
}
