'use client'
import { useEffect, useRef } from 'react'

/** Custom cursor label — follows the pointer, shows the data-cursor label of
 *  the hovered zone (e.g. "Taste", "Drag"). Hidden for touch / reduced motion. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.display = 'none'; return }
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null
      el.textContent = t?.dataset.cursor || ''
      el.style.opacity = t ? '1' : '0'
    }
    const loop = () => {
      x += (tx - x) * 0.16; y += (ty - y) * 0.16
      el.style.left = x + 'px'; el.style.top = y + 'px'
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over) }
  }, [])
  return <div ref={ref} aria-hidden className="pointer-events-none fixed z-[95] translate-x-3 translate-y-4 rounded-full bg-leaf px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-cream opacity-0 transition-opacity duration-200 shadow-lg" />
}
