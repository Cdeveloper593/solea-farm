'use client'
import { useEffect, useState } from 'react'
import SplitText from '../reactbits/SplitText/SplitText'

const LINKS = [
  { href: '#story', label: 'Our Story' },
  { href: '#process', label: 'From Grove to Jar' },
  { href: '#pantry', label: 'The Pantry' },
  { href: '#seasons', label: 'Seasons' },
  { href: '#journal', label: 'Journal' },
  { href: '#visit', label: 'Visit Us' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open ])
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-300 ${scrolled && !open ? 'bg-cream/90 backdrop-blur-md shadow-[0_1px_0_rgba(34,64,42,0.12)]' : ''}`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-10 py-4">
          <a href="#top" className={`font-display text-2xl font-semibold tracking-wide ${open ? 'text-cream' : 'text-leaf'}`} aria-label="Solea — back to top">
            SOLEA<span className="text-citrus">.</span>
          </a>
          <p className={`hidden md:block text-[11px] uppercase tracking-mega ${open ? 'text-cream/60' : 'text-bark/70'}`}>Fattoria degli Agrumi · Sicily</p>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-menu"
            className={`group flex items-center gap-3 rounded-full border ${open ? 'border-cream/50' : 'border-leaf/30'} bg-cream/70 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-leaf min-h-[44px] hover:bg-leaf hover:text-cream transition-colors`}>
            {open ? 'Close' : 'Menu'}
            <span aria-hidden className="relative block h-3 w-5">
              <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${open ? 'top-1/2 -rotate-45' : 'top-[10px]'}`} />
            </span>
          </button>
        </div>
      </header>
      {open && (
        <nav id="site-menu" aria-label="Main" className="fixed inset-0 z-[75] bg-leaf text-cream overflow-y-auto">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-10 pt-32 pb-16 grid lg:grid-cols-[1.4fr_1fr] gap-12">
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="group flex items-baseline gap-4 py-1 w-fit">
                    <span className="text-lemon font-sans text-sm">0{i + 1}</span>
                    <SplitText textAlign="left" text={l.label} tag="span" duration={0.8} delay={25} className="font-display text-4xl sm:text-6xl font-medium group-hover:text-lemon transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="text-cream/80 space-y-6 lg:pt-4">
              <p className="max-w-xs leading-relaxed">A family citrus farm on Sicily&apos;s Ionian coast. Marmalades, pestos and grove oils, made in copper pans a few steps from the trees.</p>
              <p className="text-sm uppercase tracking-[0.2em] text-lemon">Contrada Solea 12 · Catania, Sicily</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/mandarin.jpg" alt="A mandarin with its leaf" width={520} height={650} className="rounded-2xl w-full max-w-sm aspect-[4/5] object-cover" />
            </div>
          </div>
        </nav>
      )}
    </>
  )
}
