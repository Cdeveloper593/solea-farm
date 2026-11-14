'use client'
import { useEffect, useState } from 'react'
import CountUp from '../reactbits/CountUp/CountUp'

export default function Preloader() {
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t1 = setTimeout(() => setDone(true), reduced ? 150 : 1500)
    const t2 = setTimeout(() => setGone(true), reduced ? 400 : 1830)
    document.body.style.overflow = 'hidden'
    const t3 = setTimeout(() => { document.body.style.overflow = '' }, reduced ? 400 : 1830)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); document.body.style.overflow = '' }
  }, [])
  if (gone) return null
  return (
    <div aria-hidden className={`fixed inset-0 z-[100] grid place-items-center bg-leaf text-cream transition-all duration-300 ${done ? 'opacity-0 pointer-events-none' : ''}`}>
      <div className="text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/citrus-poster.png" alt="" width={180} height={131} className="mx-auto w-44 h-auto animate-[sway_2.2s_ease-in-out_infinite]" />
        <p className="font-display text-3xl mt-4 tracking-wide">SOLEA</p>
        <p className="text-cream/70 text-sm mt-1 tabular-nums"><CountUp to={100} duration={1.3} suffix="%" /></p>
      </div>
    </div>
  )
}
