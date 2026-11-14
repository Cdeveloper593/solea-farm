'use client'
import dynamic from 'next/dynamic'

const CitrusCanvas = dynamic(() => import('./CitrusCanvas'), { ssr: false, loading: () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/images/citrus-poster.png" alt="A stylised 3D citrus branch with oranges, a lemon and leaves" width={1100} height={800} className="h-full w-full object-contain" />
) })

export default function CitrusHero() { return <CitrusCanvas /> }
