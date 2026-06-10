import { useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll-state"

/**
 * "Order within the field": a tilted, jittered particle lattice — structure
 * (governance) with organic drift (AI). Single Points draw call, custom
 * shaders, stirred by scroll velocity and pointer movement.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uVelocity;
  uniform float uSize;
  attribute float aRandom;
  attribute float aColorMix;
  varying float vColorMix;
  varying float vFade;

  void main() {
    vec3 pos = position;

    float t = uTime * 0.15;
    float drift =
      sin(pos.x * 0.45 + t + aRandom * 6.2831) * 0.18 +
      cos(pos.y * 0.35 + t * 1.3 + aRandom * 3.1415) * 0.14;
    float stir = uVelocity * 0.02 * sin(aRandom * 12.566 + t * 4.0);

    pos.z += drift + stir;
    pos.y += sin(pos.x * 0.2 + t * 0.7) * 0.08;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float dist = -mvPosition.z;
    gl_PointSize = uSize * (1.0 + aRandom * 0.6) * (8.0 / dist);

    vColorMix = aColorMix;
    vFade = smoothstep(26.0, 6.0, dist);
  }
`

const fragmentShader = /* glsl */ `
  varying float vColorMix;
  varying float vFade;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.08, d) * vFade;
    if (alpha < 0.01) discard;

    vec3 navy = vec3(0.227, 0.290, 0.478); // #3A4A7A
    vec3 gold = vec3(0.831, 0.663, 0.306); // #D4A94E
    vec3 color = mix(navy, gold, vColorMix);

    gl_FragColor = vec4(color, alpha * 0.45);
  }
`

interface ParticleFieldProps {
  /** Lower particle count for small screens / weak hardware */
  reduced?: boolean
}

export function ParticleField({ reduced = false }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const velocityRef = useRef(0)
  const pointer = useThree((s) => s.pointer)

  // Deliberately sparse — a quiet constellation, not a starfield.
  const cols = reduced ? 14 : 22
  const rows = reduced ? 8 : 12

  const { geometry, material } = useMemo(() => {
    const count = cols * rows
    const positions = new Float32Array(count * 3)
    const randoms = new Float32Array(count)
    const colorMix = new Float32Array(count)

    const width = 22
    const height = 13
    let i = 0
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const px = (x / (cols - 1) - 0.5) * width + (Math.random() - 0.5) * 1.4
        const py = (y / (rows - 1) - 0.5) * height + (Math.random() - 0.5) * 1.0
        const pz = (Math.random() - 0.5) * 0.6
        positions[i * 3] = px
        positions[i * 3 + 1] = py
        positions[i * 3 + 2] = pz
        randoms[i] = Math.random()
        // a handful of points lean gold; the rest stay deep navy
        colorMix[i] = Math.random() < 0.06 ? 0.55 + Math.random() * 0.45 : Math.random() * 0.12
        i++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1))
    geometry.setAttribute("aColorMix", new THREE.BufferAttribute(colorMix, 1))

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uVelocity: { value: 0 },
        uSize: { value: reduced ? 5.5 : 6.5 },
      },
    })

    return { geometry, material }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols, rows, reduced])

  useFrame(({ camera, clock }) => {
    material.uniforms.uTime.value = clock.getElapsedTime()

    // Lerp velocity so particles stir while scrolling and settle at rest
    velocityRef.current += (Math.abs(scrollState.velocity) - velocityRef.current) * 0.06
    material.uniforms.uVelocity.value = velocityRef.current

    // Camera: subtle dolly with page progress + pointer parallax
    const targetY = -scrollState.progress * 1.6
    const targetX = pointer.x * 0.3
    camera.position.y += (targetY + pointer.y * 0.2 - camera.position.y) * 0.04
    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.lookAt(0, camera.position.y * 0.6, -2)
  })

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      rotation={[-0.42, 0, 0]}
      position={[0, -0.5, 0]}
    />
  )
}
