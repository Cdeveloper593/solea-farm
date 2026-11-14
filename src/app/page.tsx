import CitrusHero from '@/components/site/CitrusHero'
import { PRODUCTS, TESTIMONIALS, JOURNAL } from '@/lib/data'
import VisitForm from '@/components/site/VisitForm'

import SplitText from '@/components/reactbits/SplitText/SplitText'
import BlurText from '@/components/reactbits/BlurText/BlurText'
import ScrollVelocity from '@/components/reactbits/ScrollVelocity/ScrollVelocity'
import ScrollReveal from '@/components/reactbits/ScrollReveal/ScrollReveal'
import ShinyText from '@/components/reactbits/ShinyText/ShinyText'
import CountUp from '@/components/reactbits/CountUp/CountUp'
import Magnet from '@/components/reactbits/Magnet/Magnet'
import FadeContent from '@/components/reactbits/FadeContent/FadeContent'
import AnimatedContent from '@/components/reactbits/AnimatedContent/AnimatedContent'
import TiltedCard from '@/components/reactbits/TiltedCard/TiltedCard'
import SpotlightCard from '@/components/reactbits/SpotlightCard/SpotlightCard'

import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect'
import { FlipWords } from '@/components/aceternity/flip-words'
import { StickyScroll } from '@/components/aceternity/sticky-scroll-reveal'
import { Timeline } from '@/components/aceternity/timeline'
import { BentoGrid, BentoGridItem } from '@/components/aceternity/bento-grid'
import { DirectionAwareHover } from '@/components/aceternity/direction-aware-hover'
import { InfiniteMovingCards } from '@/components/aceternity/infinite-moving-cards'
import { HeroParallax } from '@/components/aceternity/hero-parallax'
import { CardContainer, CardBody, CardItem } from '@/components/aceternity/3d-card'
import { Spotlight } from '@/components/aceternity/spotlight'

import Image from 'next/image'
const CitrusCanvas = CitrusHero

const PROCESS = [
  { title: 'Picked at dawn', description: 'Tarocco, Femminello and late mandarins are picked by hand before the sun warms the grove — cold fruit keeps its perfume, and perfume is the whole point.', content: <Image src="/images/oranges-pile.jpg" alt="A crate piled high with just-picked Tarocco oranges" fill className="object-cover" sizes="320px" /> },
  { title: 'Washed, cut, never peeled thin', description: 'Fruit is washed in spring water and cut thick. For marmalade the peel is the flavour, so we keep it generous and cook it until it turns to amber glass.', content: <Image src="/images/lemons-cut.jpg" alt="Lemons whole and thickly sliced" fill className="object-cover" sizes="320px" /> },
  { title: 'Copper pans, small fires', description: 'Never more than twelve kilos a pan. Sugar goes in late, lemon juice earlier than you’d think, and the spoon — not a timer — decides when it is done.', content: <Image src="/images/spices.jpg" alt="Spoons of spices and herbs laid out for the pans" fill className="object-cover" sizes="320px" /> },
  { title: 'Sealed while it sings', description: 'Jars are filled boiling, sealed, and rested a week in the cool room. If a lid doesn’t sing when it cools, that jar never leaves the farm.', content: <Image src="/images/honey-jar.jpg" alt="A jar of golden honey being drizzled" fill className="object-cover" sizes="320px" /> },
]

const SEASONS = [
  { title: 'Winter — Tarocco', content: <div><p className="text-bark/85 leading-relaxed">December to March is blood-orange season. The grove smells of iron and honey; the first marmalade pans of the year are Tarocco, and the farm shop smells like Christmas until spring.</p><Image src="/images/oranges-pile.jpg" alt="A crate piled high with harvested oranges" width={900} height={560} className="mt-5 w-full rounded-2xl object-cover aspect-[16/10]" /></div> },
  { title: 'Spring — Zagara', content: <div><p className="text-bark/85 leading-relaxed">April and May, the blossom — zagara — opens and the bees move in. We pick nothing but petals for syrup, walk visitors at dusk, and let the trees set the fruit that becomes next winter&apos;s jars.</p><Image src="/images/lemons.jpg" alt="Ripe lemons ready in the grove" width={900} height={560} className="mt-5 w-full rounded-2xl object-cover aspect-[16/10]" /></div> },
  { title: 'Summer — Leaves & Tomatoes', content: <div><p className="text-bark/85 leading-relaxed">The savoury season. Basil and citrus leaf become pesto, tomatoes dry slowly on cane mats, and the kitchen garden does more work than the orchard. Pesto is made weekly, never stocked deep.</p><Image src="/images/tomato.jpg" alt="A sun-ripened tomato on stone" width={900} height={560} className="mt-5 w-full rounded-2xl object-cover aspect-[16/10]" /></div> },
  { title: 'Autumn — Olives & First Oil', content: <div><p className="text-bark/85 leading-relaxed">October brings Nocellara olives, co-pressed with whole bitter oranges in the first cold run. The new oil is green, peppery and gone by February — regulars reserve bottles in September.</p><Image src="/images/oil.jpg" alt="A bottle of new olive oil with fresh olives" width={900} height={560} className="mt-5 w-full rounded-2xl object-cover aspect-[16/10]" /></div> },
]

const GALLERY = ['orange', 'lemons', 'mandarin', 'berries', 'oranges-pile', 'oil', 'harvest', 'lemons-cut', 'tomato', 'basil', 'honey-jar', 'spices', 'smoothie'].map((n, i) => ({
  title: ['Tarocco on the branch', 'Femminello harvest', 'The last mandarin', 'Hedgerow berries', 'Crate No. 12', 'First press', 'Dawn picking', 'Thick-cut', 'Savoury season', 'Pesto basil', 'Zagara honey', 'Pan spices', 'Second life'][i],
  link: '#pantry',
  thumbnail: `/images/${n}.jpg`,
}))

export default function Home() {
  return (
    <main id="top" className="overflow-x-clip">
      {/* ═══════════ HERO ═══════════ */}
      <section aria-label="Solea — Sicilian citrus farm" className="relative mx-auto max-w-[1440px] px-5 sm:px-10 pt-24 sm:pt-32 pb-10">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 items-start">
          <div>
            <p className="eyebrow mb-6">Fattoria degli Agrumi — Est. 1962 · Sicily</p>
            <h1 className="sr-only">Solea — Sicilian citrus farm making marmalades, pestos and grove oils</h1>
            <SplitText textAlign="left" text="Sunshine," tag="span" className="block font-display font-medium text-[17vw] sm:text-7xl lg:text-8xl leading-[0.95] text-leaf pb-[0.16em] -mb-[0.16em]" />
            <SplitText textAlign="left" text="sealed in a jar." tag="span" className="block font-display font-medium italic text-[17vw] sm:text-7xl lg:text-8xl leading-[0.95] text-citrus pb-[0.16em] -mb-[0.16em]" />
            <div className="mt-7 max-w-xl text-lg text-bark/85 leading-relaxed">
              Small-batch preserves from our own grove — <span className="inline-block min-w-[184px] align-baseline"><FlipWords words={['blood oranges', 'Femminello lemons', 'late mandarins', 'bitter bergamots']} className="font-semibold text-leaf" duration={2600} /></span> picked at dawn and panned the same morning, a few steps from the trees.
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Magnet padding={50} magnetStrength={3}><a href="#pantry" className="btn-primary">Shop the pantry</a></Magnet>
              <a href="#visit" className="btn-ghost">Visit the grove</a>
            </div>
            <dl className="mt-12 grid grid-cols-3 max-w-lg gap-6">
              <div><dd className="font-display text-3xl sm:text-4xl text-leaf"><CountUp to={2400} suffix="+" /></dd><dt className="mt-1 text-[10px] uppercase tracking-widest text-bark/70">Citrus trees</dt></div>
              <div><dd className="font-display text-3xl sm:text-4xl text-leaf"><CountUp to={14} /></dd><dt className="mt-1 text-[10px] uppercase tracking-widest text-bark/70">Hectares of grove</dt></div>
              <div><dd className="font-display text-3xl sm:text-4xl text-leaf"><CountUp to={62} suffix=" yrs" /></dd><dt className="mt-1 text-[10px] uppercase tracking-widest text-bark/70">One family</dt></div>
            </dl>
          </div>
          <div className="relative">
            <div data-cursor="Turn me" className="relative h-[320px] sm:h-[400px] lg:h-[460px]">
              <CitrusCanvas />
            </div>
            <p className="text-center text-[11px] uppercase tracking-mega text-bark/60 mt-1">Our branch — modelled in 3D on the farm</p>
            <div className="mx-auto mt-6 max-w-sm">
              <CardContainer className="inter-var">
                <CardBody className="relative h-auto w-full rounded-3xl border border-leaf/15 bg-parch p-5 shadow-xl">
                  <CardItem translateZ={40} className="w-full">
                    <Image src="/images/orange.jpg" alt="Tarocco oranges on the branch" width={800} height={1000} className="h-44 w-full rounded-2xl object-cover" />
                  </CardItem>
                  <CardItem translateZ={60} className="mt-4 flex w-full items-start justify-between gap-3">
                    <span>
                      <span className="block font-display text-xl text-leaf">Tarocco Marmalade</span>
                      <span className="block text-sm text-bark/75">This week&apos;s pan — No. 214</span>
                    </span>
                    <span className="font-display text-2xl text-citrus">€12</span>
                  </CardItem>
                  <CardItem translateZ={50} className="mt-4 w-full">
                    <a href="#pantry" className="btn-primary w-full">Meet the jars ↓</a>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="bg-leaf py-4 -rotate-1 scale-[1.02] my-6" aria-hidden>
        <ScrollVelocity texts={['HAND-PICKED — SMALL BATCH — COPPER PANS — NO SHORTCUTS — ']} velocity={45} className="font-display uppercase text-2xl text-cream/85" />
      </div>

      {/* ═══════════ STORY ═══════════ */}
      <section id="story" aria-label="Our story" className="scroll-mt-24 mx-auto max-w-[1440px] px-5 sm:px-10 py-20 sm:py-28">
        <p className="eyebrow mb-5">Terroir</p>
        <TextGenerateEffect words="Fourteen hectares of volcanic soil between Etna and the Ionian Sea. The mountain gives the fruit its minerals; the sea gives it its perfume. We just try not to get in the way." className="max-w-4xl font-display text-3xl sm:text-5xl leading-tight text-leaf" duration={0.7} />
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {[
            { t: 'Volcanic soil', d: 'Etna’s ash makes the ground dark, warm and mineral. Roots run deep; the fruit tastes of the mountain whether we plan it or not.', img: '/images/harvest.jpg', alt: 'Hands holding a bowl of the morning harvest' },
            { t: 'Picked, not shipped', d: 'Nothing in a Solea jar has been on a truck before it met the pan. If it didn’t grow within sight of the kitchen, it doesn’t go in.', img: '/images/lemons-cut.jpg', alt: 'Lemons cut thick for the marmalade pan' },
            { t: 'Recipes from Nonna Lia', d: 'Our founder’s notebooks sit in the kitchen, sugar-stained and corrected in three hands. We follow them — and argue with them — daily.', img: '/images/spices.jpg', alt: 'Spices and herbs measured for the preserves' },
          ].map((c) => (
            <AnimatedContent key={c.t} distance={36}>
              <SpotlightCard theme="light" spotlightColor="rgba(240,162,2,0.28)" style={{ padding: 0, '--spotlight-card-surface': '#F4E7CB' } as React.CSSProperties} className="h-full rounded-3xl border border-leaf/15 overflow-hidden">
                <Image src={c.img} alt={c.alt} width={800} height={560} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-display text-2xl text-leaf">{c.t}</h3>
                  <p className="mt-2 text-bark/85 leading-relaxed">{c.d}</p>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section id="process" aria-label="From grove to jar" className="scroll-mt-24 mx-auto max-w-[1440px] px-5 sm:px-10 pb-20 sm:pb-28">
        <p className="eyebrow mb-4">Production</p>
        <SplitText textAlign="left" text="From grove to jar in one morning" tag="h2" className="font-display font-medium text-4xl sm:text-6xl text-leaf mb-8" />
        <div data-lenis-prevent className="rounded-[2rem] overflow-hidden shadow-2xl">
          <StickyScroll content={PROCESS} contentClassName="rounded-2xl" />
        </div>
        <p className="mt-4 text-sm text-bark/70">Scroll inside the panel — four steps, never more than six hours from branch to sealed jar.</p>
      </section>

      {/* ═══════════ PANTRY ═══════════ */}
      <section id="pantry" aria-label="The pantry — our products" className="scroll-mt-24 bg-parch/60 py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
          <p className="eyebrow mb-4">The Pantry</p>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <SplitText textAlign="left" text="Jars we’re proud of" tag="h2" className="font-display font-medium text-4xl sm:text-6xl text-leaf" />
            <BlurText delay={45} text="Eight preserves, made in the grove kitchen. Prices include the jar, the story, and postage anywhere in Europe over €40." className="max-w-md text-bark/85" />
          </div>

          <BentoGrid className="md:grid-cols-3 mb-12">
            <BentoGridItem className="md:col-span-2 bg-cream border-leaf/15" title={<span className="font-display text-2xl text-leaf">Marmalades — the heart of the farm</span>} description="Four citrus marmalades and jams, from bitter Tarocco to March’s late mandarin. Thick-cut, copper-panned, barely sweetened." header={<Image src="/images/oranges-pile.jpg" alt="A crate of harvested oranges" width={1000} height={420} className="h-40 w-full rounded-xl object-cover" />} />
            <BentoGridItem className="bg-cream border-leaf/15" title={<span className="font-display text-2xl text-leaf">Savoury jars</span>} description="Citrus-leaf pesto and sun-tomato spread — the grove’s summer, for bruschetta season." header={<Image src="/images/basil.jpg" alt="Fresh basil for the pesto" width={700} height={420} className="h-40 w-full rounded-xl object-cover" />} />
            <BentoGridItem className="bg-cream border-leaf/15" title={<span className="font-display text-2xl text-leaf">Oil & honey</span>} description="Co-pressed grove oil and zagara-blossom honey from hives inside the lemon rows." header={<Image src="/images/oil.jpg" alt="A bottle of Solea grove oil" width={700} height={420} className="h-40 w-full rounded-xl object-cover" />} />
            <BentoGridItem className="md:col-span-2 bg-cream border-leaf/15" title={<span className="font-display text-2xl text-leaf">This week’s pan</span>} description="Pan No. 214 — Tarocco & fennel pollen. 312 jars. When it’s gone, the next fruit decides what we make." header={<Image src="/images/lemons.jpg" alt="Lemons gathered for this week’s pan" width={1000} height={420} className="h-40 w-full rounded-xl object-cover" />} />
          </BentoGrid>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" role="list">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <FadeContent blur duration={700}>
                  <article className="group flex h-full flex-col rounded-3xl border border-leaf/15 bg-cream overflow-hidden shadow-sm hover:shadow-xl transition-shadow" data-cursor="Taste">
                    <div className="relative">
                      <TiltedCard imageSrc={p.image} altText={p.alt} captionText={p.name} containerHeight="230px" containerWidth="100%" imageHeight="230px" imageWidth="100%" rotateAmplitude={7} scaleOnHover={1.05} showTooltip={false} radius={24} />
                      {p.badge && <span className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow" style={{ background: p.hue }}>{p.badge}</span>}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: p.hue }}>{p.family}</p>
                      <h3 className="font-display text-xl leading-snug text-leaf mt-1.5">{p.name}</h3>
                      <p className="text-sm text-bark/80 mt-2 leading-relaxed">{p.notes}</p>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <p className="font-display text-2xl text-leaf">€{p.price} <span className="font-sans text-xs text-bark/60">/ {p.size}</span></p>
                        <a href="#visit" aria-label={`Order ${p.name} — visit or write to us`} className="rounded-full bg-leaf px-4 py-2.5 min-h-[44px] inline-flex items-center text-xs font-bold uppercase tracking-[0.12em] text-cream hover:bg-citrus transition-colors">Add</a>
                      </div>
                    </div>
                  </article>
                </FadeContent>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════ GALLERY PARALLAX ═══════════ */}
      <section aria-label="Grove gallery" className="bg-leaf">
        <HeroParallax products={GALLERY} />
      </section>

      {/* ═══════════ SEASONS ═══════════ */}
      <section id="seasons" aria-label="Harvest seasons" className="scroll-mt-24 mx-auto max-w-[1440px] px-5 sm:px-10 py-20 sm:py-28">
        <p className="eyebrow mb-4">The Year</p>
        <SplitText textAlign="left" text="Four seasons, four kitchens" tag="h2" className="font-display font-medium text-4xl sm:text-6xl text-leaf" />
        <ScrollReveal containerClassName="mt-5 max-w-2xl" textClassName="text-lg text-bark/85 leading-relaxed">The grove sets the menu. Follow the line down through our year — every season changes what the copper pans are doing.</ScrollReveal>
        <Timeline data={SEASONS} />
      </section>

      {/* ═══════════ JOURNAL ═══════════ */}
      <section id="journal" aria-label="Journal and recipes" className="scroll-mt-24 mx-auto max-w-[1440px] px-5 sm:px-10 pb-20 sm:pb-28">
        <p className="eyebrow mb-4">Journal</p>
        <SplitText textAlign="left" text="From the farm notebook" tag="h2" className="font-display font-medium text-4xl sm:text-6xl text-leaf mb-10" />
        <div className="grid md:grid-cols-3 gap-6">
          {JOURNAL.map((j) => (
            <article key={j.title} className="flex flex-col gap-4">
              <div data-cursor="Read">
                <DirectionAwareHover imageUrl={j.image} imageAlt={j.alt} className="w-full rounded-3xl">
                  <p className="font-display text-xl">{j.title}</p>
                  <p className="text-sm opacity-85">{j.meta}</p>
                </DirectionAwareHover>
              </div>
              <h3 className="font-display text-2xl text-leaf">{j.title}</h3>
              <p className="text-bark/85 leading-relaxed">{j.text}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-citrus font-semibold">{j.meta}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════ VOICES ═══════════ */}
      <section aria-label="What chefs and shops say" className="bg-parch/60 py-20 overflow-hidden">
        <p className="eyebrow text-center mb-4">Voices</p>
        <h2 className="sr-only">Testimonials</h2>
        <BlurText delay={80} text="Kitchens that cook with us" className="text-center font-display font-medium text-4xl sm:text-5xl text-leaf mb-10 justify-center" />
        <InfiniteMovingCards items={TESTIMONIALS} direction="left" speed="slow" pauseOnHover className="mx-auto [--bg:#F4E7CB]" />
      </section>

      {/* ═══════════ VISIT ═══════════ */}
      <section id="visit" aria-label="Visit the farm" className="scroll-mt-24 relative bg-leaf overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60" fill="#F0A202" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-10 py-20 sm:py-28 grid lg:grid-cols-2 gap-14">
          <div>
            <p className="eyebrow !text-lemon mb-4">Experience</p>
            <SplitText textAlign="left" text="Walk the grove. Taste the pan." tag="h2" className="font-display font-medium text-4xl sm:text-6xl text-cream" />
            <p className="mt-6 text-cream/85 leading-relaxed max-w-lg">Grove walks run Friday to Sunday, 9:00–13:00, from blossom in April to the last mandarin in March. Ninety minutes among the trees, a tasting in the kitchen, and a jar to take home — €18 a person, children under ten free.</p>
            <ul className="mt-8 space-y-3 text-cream/90">
              {['Contrada Solea 12, 95024 Catania — 25 min from the airport', 'Tastings in English, Italian and Sicilian (in that order of fluency)', 'The farm shop is open daily 8:00–18:00'].map((li) => (
                <li key={li} className="flex gap-3"><span aria-hidden className="text-lemon">✳</span>{li}</li>
              ))}
            </ul>
            <p className="mt-10 font-display text-2xl text-cream">Prefer to write? <ShinyText text="ciao@solea.farm" color="#F0A202" shineColor="#FBF2DF" className="text-lemon" speed={3} /></p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-cream mb-6">Reserve a visit</h3>
            <VisitForm />
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-bark text-cream">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-10 py-16">
          <div className="flex flex-wrap justify-between gap-10">
            <div>
              <p className="font-display text-5xl sm:text-7xl font-medium">SOLEA<span className="text-citrus">.</span></p>
              <p className="mt-3 max-w-xs text-cream/70">Fattoria degli Agrumi — marmalades, pestos and grove oils from fourteen hectares of Sicilian sun.</p>
            </div>
            <nav aria-label="Footer" className="grid auto-rows-min self-start grid-cols-2 gap-x-16 gap-y-1 text-cream/85">
              {[['#story', 'Our Story'], ['#process', 'Grove to Jar'], ['#pantry', 'The Pantry'], ['#seasons', 'Seasons'], ['#journal', 'Journal'], ['#visit', 'Visit Us']].map(([h, l]) => (
                <a key={h} href={h} className="hover:text-lemon min-h-[44px] inline-flex items-center">{l}</a>
              ))}
            </nav>
            <div className="text-cream/70 text-sm space-y-2">
              <p>Contrada Solea 12<br />95024 Catania, Sicily</p>
              <p>ciao@solea.farm<br />+39 095 000 0000</p>
            </div>
          </div>
          <div className="mt-14 border-t border-cream/15 pt-6 flex flex-wrap justify-between gap-4 text-xs text-cream/55">
            <p>© {new Date().getFullYear()} Solea Soc. Agricola — an original, fictional farm created as a design study.</p>
            <p>Components: Aceternity UI + React Bits only. Citrus branch modelled in Blender.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
