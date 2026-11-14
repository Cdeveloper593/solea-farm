# COMPONENTS.md — SOLEA (verified inventory)

Every UI component / visual effect on this site comes ONLY from **Aceternity UI**
(ui.aceternity.com) or **React Bits** (reactbits.dev) — free tier only. Aceternity sources
were fetched from the official registry JSON for each component
(`https://ui.aceternity.com/registry/<name>.json`); React Bits sources are the TS-TW variants
from reactbits.dev (verified against the live catalogue; names/URLs below).
No shadcn/ui, Magic UI, MUI, Chakra, HeroUI, Componentry or CodePen components are used.

## Aceternity UI — `src/components/aceternity/`
| Component | Page URL | Used for |
|---|---|---|
| Text Generate Effect | https://ui.aceternity.com/components/text-generate-effect | Story/terroir statement, word-by-word blur reveal |
| Flip Words | https://ui.aceternity.com/components/flip-words | Hero rotating fruit words |
| Sticky Scroll Reveal | https://ui.aceternity.com/components/sticky-scroll-reveal | “From grove to jar” process panel (4 steps) |
| Timeline | https://ui.aceternity.com/components/timeline | Harvest seasons scroll line |
| Bento Grid | https://ui.aceternity.com/components/bento-grid | Pantry family tiles |
| Direction Aware Hover | https://ui.aceternity.com/components/direction-aware-hover | Journal / recipe cards |
| Infinite Moving Cards | https://ui.aceternity.com/components/infinite-moving-cards | Testimonials marquee |
| Hero Parallax | https://ui.aceternity.com/components/hero-parallax | Grove gallery drift band |
| 3D Card Effect | https://ui.aceternity.com/components/3d-card | Hero “this week’s pan” product card |
| Spotlight | https://ui.aceternity.com/components/spotlight | Visit-section glow |

Documented adaptations of library copies (content/theme only, no new components):
- `timeline.tsx`: root `bg-white dark:bg-neutral-950` → `bg-transparent` so it sits on our cream theme.
- `hero-parallax.tsx`: the demo `Header` block shipped with placeholder copy and an `<h1>`;
  replaced with our gallery heading (a `<p>`, so the page keeps exactly one `<h1>`).

## React Bits — `src/components/reactbits/`
| Component | Page URL | Used for |
|---|---|---|
| SplitText | https://reactbits.dev/text-animations/SplitText | Hero headlines, section titles, menu links |
| BlurText | https://reactbits.dev/text-animations/BlurText | Pantry intro, testimonials heading |
| ScrollVelocity | https://reactbits.dev/text-animations/ScrollVelocity | Tilted marquee band under the hero |
| ScrollReveal | https://reactbits.dev/text-animations/ScrollReveal | Seasons intro paragraph |
| ShinyText | https://reactbits.dev/text-animations/ShinyText | Contact email in Visit section |
| CountUp | https://reactbits.dev/text-animations/CountUp | Hero stats, preloader percentage |
| Magnet | https://reactbits.dev/animations/Magnet | Hero primary CTA |
| ClickSpark | https://reactbits.dev/animations/ClickSpark | Global click micro-interaction |
| FadeContent | https://reactbits.dev/animations/FadeContent | Product cards entrance |
| AnimatedContent | https://reactbits.dev/animations/AnimatedContent | Story cards entrance |
| TiltedCard | https://reactbits.dev/components/TiltedCard | Product imagery tilt |
| SpotlightCard | https://reactbits.dev/components/SpotlightCard | Story/terroir cards |

## Own glue only (no third-party UI components)
Header + full-screen menu overlay, preloader shell, custom cursor label (no library ships a
label cursor — closest concept is the reference’s own; implemented as ~40 lines of pointer
glue), native form controls for the visit booking (neither library ships form primitives),
product data, Lenis smooth-scroll wiring, and the R3F citrus canvas (`CitrusCanvas`).

## Deep-QA adaptations (2026-11-14)

Documented changes to the vendored library copies / their configuration, made during the
deep-QA pass (see `qa/DEEP-QA.md`). No new components or libraries were introduced.

- **tailwind.config.js** — added the `scroll` and `spotlight` keyframes + animation
  utilities the Aceternity components reference (they were missing, so the testimonial
  marquee and the Visit spotlight never animated).
- **text-generate-effect.tsx** — removed the hardcoded `text-black` colour and `text-2xl`
  size from the word spans so the caller's typography (Fraunces, leaf) applies.
- **sticky-scroll-reveal.tsx** — brand retheme: panel backgrounds slate/black/neutral →
  leaf/bark/deep-leaf; gradient chips cyan→emerald / pink→indigo → citrus→lemon /
  lemon→moss / wine→citrus; step titles set in Fraunces cream, body cream/85; fixed the
  `text-kg` typo class; tighter step margins (`my-14`), shorter end spacer (`h-24`),
  inactive-step opacity 0.3 → 0.45, panel radius `rounded-[2rem]`, padding `p-6 sm:p-10`.
- **timeline.tsx** — removed the vendor demo header block ("Changelog from my journey…");
  entry titles rethemed to Fraunces leaf; progress line gradient purple→blue →
  citrus→lemon; node dot lemon/citrus; entry top padding `md:pt-40` → `md:pt-24`; line
  height now measured with a ResizeObserver instead of once on mount.
- **bento-grid.tsx** — removed the grid's own `max-w-7xl` (it double-inset the cards
  against the page container); items now `justify-start` (was `justify-between`, which
  parked text at uneven heights); descriptions `text-xs` neutral → `text-sm` bark/80.
- **hero-parallax.tsx** — gentler motion ranges (translateY −700→500 ⇒ −320→260,
  rotateZ 20° ⇒ 10°, start opacity 0.2 ⇒ 0.55) so rows no longer bury the heading or
  leave empty green stretches; header given `z-10`; section title is now an `<h2>`
  (was `<p>`); card images `object-center` (was `object-left-top`) with
  `loading="lazy" decoding="async"`; row spacing `mb-20` → `mb-14`, section `py-24`.
- **infinite-moving-cards.tsx** — cards rethemed from near-white/zinc to cream→parch
  with leaf/15 borders and bark text; JS-cloned duplicate slides now get
  `aria-hidden="true"` and their focusables `tabindex="-1"`.
- **direction-aware-hover.tsx** — removed a `console.log` that fired on every hover; the
  image `alt` is now a real `imageAlt` prop (was hardcoded `"image"`).
- Call-site props (in `src/app/page.tsx`, no component edits): SpotlightCard used with
  `theme="light"` + parch surface override + zero baked padding; SplitText given
  `textAlign="left"` everywhere; BlurText given a 45–80ms word stagger (default 200ms
  left text blurred for ~4s); FlipWords wrapped in a fixed-min-width span so the
  sentence doesn't shift; ShinyText given lemon base + cream shine colours;
  InfiniteMovingCards centred (`mx-auto`) with `pauseOnHover`.

## Allowed non-component dependencies
React/Next.js, Tailwind CSS, motion, GSAP (+ @gsap/react, used by React Bits SplitText),
three.js via @react-three/fiber + drei (for our own Blender GLB), Lenis, Google Fonts
(Fraunces + Outfit), inline SVG favicon.
