import type { Metadata } from 'next'
import { Fraunces, Outfit } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/site/SmoothScroll'
import Preloader from '@/components/site/Preloader'
import Cursor from '@/components/site/Cursor'
import Header from '@/components/site/Header'
import ClickSpark from '@/components/reactbits/ClickSpark/ClickSpark'

const display = Fraunces({ subsets: ['latin'], variable: '--font-display', axes: ['opsz', 'SOFT', 'WONK'], display: 'swap' })
const body = Outfit({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://solea.farm'),
  title: 'SOLEA — Sicilian Citrus Farm | Marmalades, Pestos & Grove Oils',
  description: 'A family citrus farm on Sicily’s Ionian coast. Small-batch marmalades, citrus-leaf pesto and co-pressed grove oil, made steps from the trees.',
  openGraph: { title: 'SOLEA — Fattoria degli Agrumi', description: 'Sunshine, sealed in a jar. Sicilian marmalades, pestos and oils from our grove to your table.', images: ['/images/orange.jpg'] },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#pantry" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-leaf focus:text-cream focus:px-4 focus:py-2 focus:rounded-full">Skip to the pantry</a>
        <Preloader />
        <Cursor />
        <SmoothScroll />
        <Header />
        <ClickSpark sparkColor="#E85D1F" sparkCount={8} sparkRadius={18} duration={450}>
          {children}
        </ClickSpark>
      </body>
    </html>
  )
}
