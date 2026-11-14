'use client'
import { Component, Suspense, useEffect, useRef, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei'
import type { Group } from 'three'
import { useReducedMotion } from '@/lib/hooks'

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? this.props.fallback : this.props.children }
}

function Branch() {
  const ref = useRef<Group>(null)
  const { scene } = useGLTF('/models/citrus-branch.glb')
  const { size, camera } = useThree()
  // The model's framing was tuned for a ~600px-wide canvas. Scale it down on
  // narrow canvases so the branch tips are never clipped at <=1024px widths.
  const fit = Math.min(1.05, Math.max(0.6, (size.width / 600) * 1.05))
  useEffect(() => {
    camera.position.z = size.width < 480 ? 5.6 : 4.4
    camera.updateProjectionMatrix()
  }, [camera, size.width])
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const scroll = Math.min(window.scrollY / 900, 1)
    ref.current.rotation.y = Math.sin(t * 0.25) * 0.25 + state.pointer.x * 0.45 + scroll * 1.1
    ref.current.rotation.x = state.pointer.y * -0.18 + scroll * 0.25
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
  const poster = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/citrus-poster.png" alt="A stylised 3D citrus branch with two oranges, a lemon, green leaves and a white blossom" width={1100} height={800} className="h-full w-full object-contain" />
  )
  if (reduced) return poster
  return (
    <div role="img" aria-label="Interactive 3D citrus branch — move your pointer to turn it" className="h-full w-full">
      <Boundary fallback={poster}>
        <Suspense fallback={poster}>
          <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.15, 4.4], fov: 42 }} gl={{ antialias: true, alpha: true }}>
            <ambientLight intensity={1.1} />
            <directionalLight position={[4, 5, 5]} intensity={2.2} />
            <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#ffe3b3" />
            <Branch />
          </Canvas>
        </Suspense>
      </Boundary>
    </div>
  )
}
useGLTF.preload('/models/citrus-branch.glb')
