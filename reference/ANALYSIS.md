# Reference Analysis — agrumeafarm.it/en (REFERENCE MODE)

> Method note (honest): the reference site's HTML/CSS/JS and Nuxt payload were fetched and
> analysed directly (curl). Headless-Chrome screenshots of the *reference* were attempted with
> Playwright at 1440×900 / 1024×768 / 390×844, but this VM's egress proxy refuses Chrome's
> CONNECT tunnel to that host (`ERR_TUNNEL_CONNECTION_FAILED`) while curl succeeds — so the
> scroll/section frames in this folder could not be captured as valid images and were removed
> rather than kept as browser error pages. All structural/technical findings below come from
> the site's own served code (CSS custom properties, class names, payload), which is precise.
> Video capture was likewise not possible. Our own site's screenshots (same viewports) are in `/qa/`.

## Site type & feeling
- Sicilian citrus farm selling artisanal preserves: marmalades/jams, pestos, spreads, oils.
  Nav (from payload/markup): Home, Pantry, Production, Experience, About, Contacts, Shop.
- Feeling: sun-drenched, editorial, playful-luxury. Warm cream canvas, huge serif display
  type, fruit imagery, a product *jar* as hero protagonist, physics-feeling page transitions.

## Structure (section-by-section, from markup/classes)
1. **Preloader** — `fruit-loader`: a fruit mark sweeps/pours with a percentage counter (0%).
2. **Header** — fixed, logo left (~135–152px), IT/EN switch, "menu / close" split-character
   rolling label; full-screen nav overlay (`fp-nav`) with rolling-character links, markers,
   primary + secondary columns.
3. **Hero** — visually-hidden h1 for SEO; giant serif headline; a **jar slider**
   (`jar-slider`) whose jar peeks from the bottom of the viewport (`--ph-jar-peek:.3`,
   jar ≈24vw wide, scale-from 1.25 entrance), flavour badges around it; "Scroll to discover".
4. **Custom cursor** — `cursor-label`: a pill + diamond with a text label that changes over
   interactive zones (e.g. drag/view).
5. **Editorial/story sections** — oversized serif statements, image + text on a 12-col grid.
6. **Pantry/products** — colourful product families (each flavour has its own saturated hue:
   oranges, plums, berries, peppers…), cards/jars with badges.
7. **Production/process, Experience (visits), About, Contacts, Shop teaser, footer.**

## Visual language (exact tokens from its CSS)
- Colours: cream paper `#fdf3eb`, orange `#e94e1b`, amber `#f39200`, yellow `#ffcc00`,
  deep wine border `#762530`; per-flavour accents (#266845 green, #56275f plum, #a31814 red…).
- Type: serif display "ivymode" (Typekit) — `--text-display: clamp(4rem, 2.9rem+11vw, …)`,
  hero `clamp(4.1rem, 2.65rem+5.95vw, …)`; sans "ivystyle-sans" (Avenir-like); base 16px,
  small .875rem, medium clamp(1.125–1.25rem).
- Layout: 12-column grid, gap-x clamp(12px,1.45vw,30px), container padding clamp(30px,2vw,40px),
  generous section spacing (6.25rem → 2×), radius 15px.

## Motion language
- **Lenis** smooth scroll (4 references in markup).
- Page transitions are a signature: `--page-transition-duration:1.8s`, cover .9s, lift 975ms,
  jar exit .42s / fade .35s — the hero jar animates *between* pages.
- Easings: premium `cubic-bezier(.645,.045,.355,1)`, soft `cubic-bezier(.22,1,.36,1)`,
  out-expo variants. Long, damped, physical.
- Canvas present (22 `canvas` mentions in JS) — WebGL/GLSL flavour-distortion effects on
  imagery are likely; hero jar is a photographed product shot, not a 3D model.
- Rolling/split-character nav labels, magnetic-feeling cursor label, scroll-triggered reveals.

## 3D / WebGL assessment
No evidence of a three.js scene or .glb assets; richness comes from photography, canvas
shader transitions and the jar motif. For our build we *add* real 3D (per brief): a Blender-
modelled citrus branch rendered with react-three-fiber, scroll/pointer-linked — an addition,
documented as such, not a copy.

## Mapping → allowed components (Aceternity / React Bits only)
| Reference element | Our component | Source |
|---|---|---|
| Fruit preloader + % | Own glue around React Bits **CountUp** + citrus poster | reactbits.dev |
| Rolling-char nav / menu overlay | Own layout + React Bits **SplitText** menu links | reactbits.dev |
| Hero giant serif + staggered reveal | React Bits **SplitText** + **BlurText**, Aceternity **Flip Words** | both |
| Jar protagonist | Our Blender **citrus branch GLB** (R3F) + Aceternity **3D Card** tilt on the product card | aceternity |
| Word-by-word statement | Aceternity **Text Generate Effect** | aceternity |
| Process scroll sequence | Aceternity **Sticky Scroll Reveal** | aceternity |
| Seasons timeline | Aceternity **Timeline** | aceternity |
| Grove gallery drift | Aceternity **Hero Parallax** (adapted strip) / **Parallax Scroll** | aceternity |
| Product cards | Aceternity **Direction Aware Hover** + React Bits **TiltedCard / GlareHover** | both |
| Pantry bento | Aceternity **Bento Grid** | aceternity |
| Testimonials marquee | Aceternity **Infinite Moving Cards** | aceternity |
| Marquee band | React Bits **ScrollVelocity** | reactbits.dev |
| Stats | React Bits **CountUp** | reactbits.dev |
| Magnetic CTAs / spark | React Bits **Magnet**, **ClickSpark** | reactbits.dev |
| Cursor label | Own glue (label pill) — no library ships it; documented substitution | — |
| Reveals | React Bits **ScrollReveal**, **FadeContent**, **AnimatedContent** | reactbits.dev |
| Spotlit cards | React Bits **SpotlightCard** | reactbits.dev |

Full verified list with exact page URLs: `COMPONENTS.md`. Plan written before build:
`COMPONENT-PLAN.md`.
