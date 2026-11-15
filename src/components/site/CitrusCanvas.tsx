'use client'
import { Component, Suspense, useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei'
import type { Group } from 'three'
import { useReducedMotion } from '@/lib/hooks'

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? this.props.fallback : this.props.children }
}

// Shared drag state between the DOM wrapper (pointer handlers) and the model
// inside the canvas. `target` accumulates without bounds, so the branch can be
// spun past ±180°/±360° indefinitely; `current` damps toward it for a smooth,
// weighty feel; `velocity` carries the gesture into a short inertia glide.
type SpinState = { target: number; current: number; velocity: number; dragging: boolean; lastX: number; lastT: number }

function Branch({ spin }: { spin: React.RefObject<SpinState> }) {
  const ref = useRef<Group>(null)
  const { scene } = useGLTF('/models/valencia-orange.glb')
  const { size, camera } = useThree()
  // The model's framing was tuned for a ~600px-wide canvas. Scale it down on
  // narrow canvases so the branch tips are never clipped at <=1024px widths.
  const fit = Math.min(1.05, Math.max(0.6, (size.width / 600) * 1.05))
  useEffect(() => {
    camera.position.z = size.width < 480 ? 5.6 : 4.4
    camera.updateProjectionMatrix()
  }, [camera, size.width])
  useFrame((state, delta) => {
    if (!ref.current) return
    const s = spin.current
    if (!s) return
    const t = state.clock.elapsedTime
    const scroll = Math.min(window.scrollY / 900, 1)
    // Inertia: after release, keep feeding the target from the flick velocity.
    if (!s.dragging && Math.abs(s.velocity) > 0.02) {
      s.target += s.velocity * delta
      s.velocity *= Math.exp(-2.4 * delta)
    } else if (!s.dragging) {
      s.velocity = 0
    }
    // Damped follow (frame-rate independent).
    s.current += (s.target - s.current) * (1 - Math.exp(-12 * delta))
    const idleSway = s.dragging ? 0 : Math.sin(t * 0.25) * 0.12
    ref.current.rotation.y = s.current + idleSway + scroll * 1.1
    // Vertical tilt stays a gentle pointer parallax; it never touches azimuth.
    ref.current.rotation.x = (s.dragging ? 0 : state.pointer.y * -0.15) + scroll * 0.25
    ref.current.position.y = Math.sin(t * 0.8) * 0.05 - scroll * 0.15
  })
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={ref} scale={fit}>
        <primitive object={scene} />
      </group>
    </Float>
  )
}

export default function CitrusCanvas() {
  const reduced = useReducedMotion()
  const spin = useRef<SpinState>({ target: 0, current: 0, velocity: 0, dragging: false, lastX: 0, lastT: 0 })
  const poster = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/citrus-poster.png" alt="A photorealistic 3D Valencia orange with a green stem and a small leaf" width={1100} height={800} className="h-full w-full object-contain" />
  )
  if (reduced) return poster

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    spin.current.dragging = true
    spin.current.lastX = e.clientX
    spin.current.lastT = performance.now()
    spin.current.velocity = 0
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = spin.current
    if (!s.dragging) return
    const now = performance.now()
    const dxRad = (e.clientX - s.lastX) * 0.008
    const dt = Math.max((now - s.lastT) / 1000, 0.008)
    s.target += dxRad
    s.velocity = Math.max(-14, Math.min(14, 0.65 * s.velocity + 0.35 * (dxRad / dt)))
    s.lastX = e.clientX
    s.lastT = now
  }
  const endDrag = () => { spin.current.dragging = false }

  return (
    <div
      role="img"
      aria-label="Interactive 3D Valencia orange — drag to spin it all the way around"
      className="h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <Boundary fallback={poster}>
        <Suspense fallback={poster}>
          <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0.15, 4.4], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            onCreated={(state) => { state.gl.domElement.style.touchAction = 'pan-y' }}
          >
            <ambientLight intensity={1.1} />
            <directionalLight position={[4, 5, 5]} intensity={2.2} />
            <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#ffe3b3" />
            <Branch spin={spin} />
          </Canvas>
        </Suspense>
      </Boundary>
    </div>
  )
}
useGLTF.preload('/models/valencia-orange.glb')
