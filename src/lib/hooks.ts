'use client'
import { useEffect, useState } from 'react'

/**
 * True when the visitor prefers reduced motion — heavy/WebGL animation is skipped.
 * A real hook: starts false (matching the server render, so no hydration
 * mismatch for reduced-motion visitors), then syncs from matchMedia on mount
 * and follows changes.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}
