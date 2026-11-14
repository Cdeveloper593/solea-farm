# SOLEA — Deep QA pass (2026-11-14)

Method: Playwright (Chrome headless shell) against a byte-exact local mirror of the
**Vercel deployment** (https://solea-farm-peach.vercel.app/ — all HTML/JS/CSS/fonts/images
downloaded and served locally, because this VM's browser cannot reach external HTTPS;
Vercel HTML ≡ local build HTML, 166,148 B both, identical chunk hashes except build-meta
chunks). Viewports 1440×900, 1024×768, 390×844 (+360 spot checks). Every screenshot was
read visually. Motion verified in motion (FlipWords frame/geometry sampling, canvas A/B
pointer test, menu/Escape, sticky-scroll wheel test, form invalid/valid submit).
Before screenshots: `qa/deep-before/`. Contrast ratios computed numerically (WCAG).

## CRITICAL

1. **Seasons — vendor demo text rendered on the page.** The Aceternity Timeline copy
   still contains its demo header: a visible "Changelog from my journey" heading +
   "I've been working on Aceternity for the past 2 years…" paragraph between the section
   intro and the first season, plus ~160px of dead space around it. All viewports.
   (`d1440-08-seasons.png`, `m390-08-seasons.png`)
2. **Story/Terroir cards render near-black with illegible text.** SpotlightCard defaults
   to its dark theme (surface #111); the page passes no theme, so the three cards are
   black slabs on the cream page, headings in dark green (1.65:1) and body in dark brown
   (2.21:1) — effectively unreadable. All viewports. (`d1440-02-story.png`, `m390-02-story.png`)
3. **Two animations are dead code — keyframes never defined.** `tailwind.config.js` has
   no `scroll` or `spotlight` keyframes/animation entries, and the built CSS contains
   neither rule. Consequences: (a) the Voices testimonial carousel **never moves** — it
   sits as a static, asymmetrically clipped row of cards; (b) the Visit form's Spotlight
   hover glow stays at opacity 0 forever. (`d1440-11-voices.png`)
4. **Hero — large dead zone + canvas clipping.** At 1440/1024 the headline starts ~45%
   down the viewport (excess top padding + centre-aligned grid against the tall right
   column); the fold cuts through the 3D card. At ≤1024 the 3D branch is clipped on
   both sides (fixed camera/scale regardless of canvas width).
   (`d1440-01-hero.png`, `t1024-01-hero.png`, `qa/01-hero-1024x768.png`)

## MAJOR

5. **Story statement renders in the wrong typeface size/colour.** TextGenerateEffect
   hardcodes `text-2xl` + `text-black` inside its spans, overriding the page's Fraunces
   `text-3xl/5xl` leaf-green styling — the statement renders as heavy 24px black type,
   a full hierarchy level too small. (`d1440-02-story.png`)
6. **SplitText centre-aligns wrapped lines + clips descenders.** The component defaults
   `textAlign:'center'` and the page never overrides it: wrapped headings centre their
   lines while eyebrows/body stay left-aligned (mobile process/seasons titles, the Visit
   heading, the mobile hero's indented second line and centred orphan "jar."). Its
   overflow-hidden rise wrapper also clips italic descenders at `leading-[0.95]` — the
   "j" in "jar." is visibly cut. All viewports. (`m390-01-hero.png`, `d1440-12-visit.png`)
7. **Grove gallery (HeroParallax) is chaotic and heavy.** Rotated photo rows overlap the
   section heading; the section opens at opacity 0.2 with a dim green cast; mid-scroll
   there are viewport-sized stretches of empty green; all 13 photos are raw eager-loaded
   `<img>` (no lazy/decoding); `object-left-top` crops subjects oddly; on mobile a single
   rotated card fills the screen over the text. The section title is a `<p>`, not a
   heading. (`d1440-06-gallery-top.png`, `d1440-07-gallery-mid.png`, `m390-06-gallery-top.png`)
8. **Process panel is off-palette and hard to read.** StickyScroll cycles slate-900 →
   black → neutral-900 backgrounds with cyan→emerald / pink→indigo gradient chips on a
   cream site (wheel test confirmed the panel turns pure black). Step 1 "Picked at dawn"
   (citrus copy) is illustrated with a bowl of **cherry tomatoes**. Incoming steps sit at
   opacity 0.2 mid-scroll — grey on black, unreadable. `my-20` step margins + an `h-40`
   spacer create large dead areas; on mobile the panel has ~128px of empty space before
   step 1 and shows no image at all. (`d1440-03-process.png`, `interact-process-scrolled.png`, `m390-03-process.png`)
9. **Product cards: misaligned price rows + failing contrast.** Cards in a row have
   their price/Add rows at different heights (card content isn't a flex column). The
   product `hue` values fail WCAG as family-label text on cream and as white-text badge
   backgrounds: #F0A202 1.91:1 / 2.13:1, #D9930D 2.32 / 2.58, #E8841B 2.44 / 2.71,
   #E85D1F 3.14 / 3.49, #8A7A1E 3.86 / 4.30 (all < 4.5:1). (`qa/02-scroll-02.png`)
10. **Pantry intro text stays blurred for ~4 seconds.** BlurText defaults to a 200ms
    per-word stagger; the 21-word intro doesn't finish until ~4s after it scrolls in —
    screenshots at +1.5s show whole phrases still blurred, which reads as broken text.
    (`d1440-04-pantry.png`, `m390-04-pantry.png`)
11. **Bento grid is inset from the rest of the layout.** BentoGrid carries its own
    `max-w-7xl`, so inside the page container the cards start/end 40px inside the
    alignment of the headings and product grid. Descriptions render at ~12px in neutral
    grey; `justify-between` parks text blocks at uneven heights.
    (`d1440-04-pantry.png`)
12. **Visit form contrast + behaviour.** Submit button: cream on citrus = 3.14:1, and on
    hover cream on lemon = 1.91:1. The contact email (ShinyText) renders washed-out grey
    (#b5b5b5 base) instead of lemon on the green panel. The native date input has no
    `color-scheme: dark`, no `min` date, and the success panel never receives focus.
    (`d1440-12-visit.png`)

## MODERATE

13. **FlipWords shifts the sentence.** Measured settled widths cycle 151→170→181px, so
    the words after the flip word jump horizontally every 3s (and re-wrap on mobile);
    mid-flip the exiting word scales to 2× (bounding box 302px) and blurs across its
    neighbours. Paragraph box itself is stable (576×88 in all samples) — the motion,
    not the layout, is the glitch. (`motion-flip-*.png`, geometry samples)
14. **Testimonials (beyond #3):** near-white #fafafa cards clash with the parch
    background; the scroller isn't centred (starts at x=0, cards clip asymmetrically);
    JS-cloned duplicate slides are exposed to assistive tech (no `aria-hidden`); no
    pause-on-hover.
15. **Journal:** DirectionAwareHover calls `console.log("direction", …)` on **every**
    hover (console spam); its `<img>` alt is hardcoded `"image"` while the journal data
    carries proper unused `alt` fields. The oranges-pile photo is repeated in the bento,
    the Seasons timeline and a journal card in adjacent sections.
16. **Timeline details:** entry titles are grey neutral-500 sans (4.26:1, off-brand);
    the progress line gradient is purple→blue; entries carry `md:pt-40` dead space; the
    line height is measured once on mount (no ResizeObserver) so it can go stale.
17. **Poster/preloader image is mis-framed at the source.** `citrus-poster.png` itself
    crops the lemon at the right edge and the branch/blossom at the left — so the
    preloader and the canvas fallback both show a cut-off branch, and the half-in-frame
    blossom reads as a small white artefact beside the orange (also visible in the 3D
    canvas). (`d1440-00-preloader.png`, `motion-canvas-b.png`, the PNG itself)
18. **Custom cursor label contrast:** white text on citrus = 3.49:1. Cursor.tsx also
    contains a dead no-op line (`el.style.transform += ''`).
19. **Footer:** the nav grid stretches to the tallest column, leaving ~55px gaps between
    its three rows; footer links are 32px tall (< 44px target).
20. **Anchor landings hide section eyebrows under the fixed header** — sections have no
    scroll margin (visible in the journal/process captures: eyebrow half-clipped by the
    header bar).
21. **Lenis is not wired to ScrollTrigger** (no `lenis.on('scroll', ScrollTrigger.update)`,
    no GSAP ticker sync) — GSAP scroll-triggered reveals (SplitText/ScrollReveal) can
    fire late/desynced under smooth scroll; captures show reveal states lagging scrolls.

## MINOR / CODE AUDIT

22. TiltedCard's default 15px radius vs the product article's 24px radius — image
    corners overhang the card radius while tilting.
23. Reduced motion: BlurText has no reduced-motion path; SplitText instances don't
    receive the page's `reducedMotion` value; scroll-linked framer animations
    (HeroParallax/StickyScroll/Timeline) ignore it (the marquee/carousel are covered by
    the existing CSS media query once #3 lands).
24. Image weight: berries.jpg 554KB, honey-jar.jpg 480KB, spices.jpg 387KB,
    oranges-pile.jpg 336KB, lemons.jpg 305KB; gallery eager-loading fixed under #7.
25. Story card images sit as sharp-cornered rectangles inside the rounded cards
    (component's baked-in `p-8` padding + full-bleed image mismatch) — with #2.
26. Menu verified good on desktop (wordmark stays cream, Escape closes, focus states
    work); its SplitText links share the #6 descender-clip risk on "The Pantry".
27. Verified OK: exactly one `<h1>`/`<main>`; form validation blocks invalid email and
    the valid path returns reference SOLEA-2387; canvas responds to pointer movement
    (A/B frames differ); counters settle correctly; no console errors/pageerrors/failed
    requests on the mirrored deployment; SEO meta complete; fonts self-hosted.

## Resolutions (fix pass, same day)

After screenshots: `qa/deep-fixed/` (same sweep against the fixed local build) plus
`verify-*.png` interaction captures. Build passes; First Load JS unchanged at 262 kB.

1. **Fixed** — demo header block removed from the Timeline library copy. Seasons now
   opens straight into "Winter — Tarocco". (`deep-fixed/d1440-08-seasons.png`)
2. **Fixed** — SpotlightCard now used with `theme="light"`, a parch surface override
   (`--spotlight-card-surface:#F4E7CB`) and zero baked padding; images run full-bleed
   with the card radius, text is leaf/bark on parch. (`deep-fixed/d1440-02-story.png`)
3. **Fixed** — `scroll` + `spotlight` keyframes/animations added to tailwind.config.js.
   Verified in motion: the marquee's computed transform changes between samples 2.5s
   apart, and the Visit spotlight glow now renders. (`verify-voices-a/b.png`,
   `deep-fixed/d1440-12-visit.png`)
4. **Fixed** — hero top padding cut (pt-32/40 → pt-24/32), grid top-aligned, canvas
   heights 340/440/520 → 320/400/460; CitrusCanvas now scales the model to the canvas
   width (`useThree` size) and pulls the camera back on narrow canvases — the branch
   is fully framed at 1440, 1024 and mobile. (`deep-fixed/d1440-01-hero.png`,
   `deep-fixed/t1024-01-hero.png`)
5. **Fixed** — hardcoded `text-black`/`text-2xl` (and the dark-mode colour) removed
   from TextGenerateEffect's spans; the statement renders in Fraunces leaf at the
   intended 30/48px. (`deep-fixed/d1440-02-story.png`)
6. **Fixed** — `textAlign="left"` passed to every SplitText (page + menu); hero spans
   get descender-safe padding (`pb-[0.16em] -mb-[0.16em]`). Wrapped headings are
   left-aligned everywhere and the "jar." descender is fully visible.
   (`deep-fixed/m390-01-hero.png`, `verify-m360-hero.png`, `verify-m360-menu.png`)
7. **Improved** — parallax ranges gentled (translateY −700→500 ⇒ −320→260, rotateZ
   20° ⇒ 10°, start opacity 0.2 ⇒ 0.55), header given z-10 so text always sits above
   the rows, title is now an `<h2>`, images lazy + `object-center`, tighter spacing.
   The mid-scroll green band is much reduced; a short empty stretch remains inherent
   to the component's 300vh scroll travel. (`deep-fixed/d1440-06/07`)
8. **Fixed** — StickyScroll rethemed to the brand palette (leaf/bark/deep-leaf panels,
   citrus/lemon/moss/wine gradient chips, Fraunces cream titles, cream/85 body),
   `text-kg` typo fixed, step margins tightened, inactive opacity 0.3 → 0.45. Step 1
   now shows the orange crate, not tomatoes. (`deep-fixed/d1440-03-process.png`)
9. **Fixed** — product cards are flex columns with the price/Add row pinned by
   `mt-auto` (rows align exactly across all four columns); hues darkened until every
   family label and badge passes 4.5:1 (worst case now #8F6200 at 5.12:1 text /
   5.70:1 white-on). (`deep-fixed/verify-products.png`)
10. **Fixed** — BlurText stagger set to 45ms (pantry) / 80ms (voices) at the call
    sites; the intro is fully sharp within ~1s of scrolling in.
    (`deep-fixed/d1440-04-pantry.png`)
11. **Fixed** — BentoGrid's nested `max-w-7xl` removed (cards now align with the page
    container), items `justify-start`, descriptions `text-sm` bark/80.
12. **Fixed** — submit button is now lemon with ink text (8.06:1; hover cream/leaf
    10.28:1) — an intermediate leaf-on-leaf version was caught in this pass's own
    screenshots and corrected; ShinyText takes lemon/cream colours; `.field` gets
    `color-scheme: dark` (date icon renders light); date input has `min` = today; the
    success panel receives focus (verified: `document.activeElement` is the status
    panel after submit). (`deep-fixed/verify-visit-form.png`)
13. **Fixed** — FlipWords wrapped in a fixed 184px min-width slot; the following
    word's x-position range over a full flip cycle is now **0px** (16 samples).
    The stock 2× blur exit remains as designed but no longer shifts layout.
14. **Fixed** — testimonials rethemed cream→parch with leaf/15 borders and bark text,
    scroller centred (`mx-auto`), `pauseOnHover` on, clones `aria-hidden` with
    focusables removed from tab order.
15. **Fixed** — `console.log` removed (full interaction run now produces zero console
    messages); `imageAlt` prop added and wired to the journal data; journal card 2 now
    uses the branch photo (orange.jpg) instead of repeating the crate shot.
16. **Fixed** — timeline titles Fraunces leaf, progress gradient citrus→lemon, lemon
    node dots, `md:pt-24`, ResizeObserver height measurement.
17. **Fixed locally, upload pending** — `blender/build_citrus.py` updated (render
    camera pulled back so the whole branch fits; blossom enlarged and turned face-on
    so it reads as a flower) and the assets re-rendered: `citrus-poster.png`,
    `citrus-branch.glb`, `citrus-branch.blend`. These are binaries: the connector
    cannot push them, so they are **pending upload via the GitHub web UI** (parent
    agent route). Until then Vercel keeps serving the previous (cropped) poster/GLB;
    the local server already serves the new ones.
18. **Fixed** — cursor label is now leaf with cream text (10.28:1); dead line removed.
    The open menu button also gets a cream/50 border so its pill stays visible on the
    green overlay.
19. **Fixed** — footer nav `auto-rows-min self-start` (rows now sit at natural ~44px
    spacing) and links are `min-h-[44px]`. (`deep-fixed/d1440-13-footer.png`)
20. **Fixed** — anchored sections carry `scroll-mt-24`; Lenis anchor offset is −88.
21. **Fixed** — SmoothScroll now drives Lenis through the GSAP ticker and calls
    `ScrollTrigger.update` on lenis scroll events (the documented integration), so
    reveals fire on the true scroll position.
22. **Fixed** — TiltedCard gets `radius={24}` to match the product article.
23. **Partial / documented gap** — reduced-motion: the marquee/carousel honour the
    existing CSS media query and Lenis/CountUp/canvas-poster paths already respect
    it; SplitText instances can't receive the hook value because the page is a server
    component, and the scroll-linked framer animations (parallax/sticky/timeline)
    still run. Accepted for this pass.
24. **Partial** — gallery images are lazy-loaded now (the main weight win). The large
    JPGs were not recompressed: re-encoding them produces binaries that cannot be
    pushed through the connector, and the gain did not justify six more manual
    uploads. Documented as a known gap.
25. **Fixed** — with #2 (full-bleed images, card-radius corners).
26. **Verified** — menu at 360 and 1440: wordmark cream (pixel-checked), links
    left-aligned with intact descenders, Escape closes.
27. **Verified** — first keyboard Tab lands on the skip link; form invalid/valid
    flows re-verified post-fix; canvas pointer response re-verified by differing
    frames; zero console errors/logs across the full interaction run.

### Publishing

_(filled in after the GitHub push + Vercel verification)_


## Second round (parent live-check items A–I + user-reported bento item)

### R2-A (Major) Grove gallery still collided with photos / empty green stretches
Confirmed in `qa/deep-vercel/` captures: the subtitle sat on the mandarin tile at
section entry, and a ~230px empty green band preceded the heading. Fixed: parallax
ranges narrowed again (translateY [−320,260] → [−140,200], rotateZ 10° → 7°), section
300vh → 260vh with py-24 → py-16, header padding and row gaps reduced. Re-captured
(`qa/deep-fixed2/fixed2-gallery-*`, `fixed2-parallax-*`): subtitle fully clear of tiles
at entry; mid-scroll rows are dense and bright. Accepted trade-off: at the exact entry
frame there is green space between the subtitle and the first row, so the text never
sits on a tile.

### R2-B (Moderate) Empty bands between sections
Section rhythm tightened across the page (hero pb-8; story/seasons/pantry
py-16/sm:py-24; process/journal pb-16/sm:pb-24; voices py-16; visit py-16/sm:py-24).
Verified in the fixed2 section captures.

### R2-C (Moderate) Heading entrances looked glitched mid-animation
Root cause: SplitText defaults (duration 1.25s, 50ms/char stagger) keep ~2s of blurred,
overlapping letters per heading. All SplitText call sites now pass explicit calmer
props — section headings `splitType="words" duration={0.85} delay={60}`, hero spans
duration 0.9 / delay 30, menu links 0.8 / 25 — so entrances complete in ~1s and read as
a gentle rise, never a scramble.

### R2-D (Minor) Cursor "TASTE" pill covered product titles
Pill anchor moved from centred-above the pointer to trailing below-right, and shrunk
(px-3 py-1, 10px type). Verified in `qa/deep-fixed2/verify-cursor.png`: title fully
readable with the pill clear of the text.

### R2-E (Minor) Olio Solea price crowded/clipped against the ADD button
Price row restructured: the pack size moved to its own line under the price and the row
is `items-end`. Measured on the Olio card: 154px clear between price block and ADD
(`qa/deep-fixed2/fixed2-products.png`).

### R2-F (Minor) Preloader ghost ("SOLEA 100%") lingering over the hero
Exit fade shortened 500ms → 300ms and the unmount/body-overflow timers tightened
(2050ms → 1830ms); the ghost window shrinks from ~550ms to ~320ms. A very brief fade
remains by design.

### R2-G (Major) Photo mismatches — one real, one a real functional bug
Story card 1 "Volcanic soil" genuinely showed the tomato-bowl photo: image changed to
`tomato.jpg` ("A ripe tomato resting on dark volcanic stone"). Process step 4 was NOT
a mapping error — it exposed a real bug: the StickyScroll's stock `useScroll`
container progress never approached 1 while the panel was on screen, so **the last
step could never activate** and the panel stayed on step 3's spices photo (reproduced
at max panel scroll: step 3 opacity 1, spices.jpg). Fixed by computing the active step
from the panel's own scroll ratio. Proof in `qa/deep-fixed2/verify-process-step4.png`:
"Sealed while it sings" active with the honey-jar image.

### R2-H (Minor) Voices edge cards faded/sliced
Accepted in part: a marquee must slice cards at the viewport edge, but the 20% mask
stops faded edge cards to near-invisible. Mask narrowed to 8%/92% (documented
adaptation); the right-edge card is now fully readable
(`qa/deep-fixed2/fixed2-voices.png`). The left edge still fades over ~100px, which
reads as intentional depth.

### R2-I (Note) 3D branch leaf spike / flat leaves
Aesthetic note only; no model change beyond round 1's camera/blossom re-render
(binaries pending upload, see Publishing).

### R2-J (Critical, user-reported with screenshot) Bento cards near-black in dark mode
The user's screenshot (`~/workspace/user/media_library/image/image-10.png`) showed the
four Pantry bento cards as black slabs with teal/mauve titles, the basil photo reading
as a floating white inset, and the "Oil & honey" description clipped at the card's
bottom. Root cause: the vendored BentoGrid carries stock `dark:` variants
(`dark:bg-black`) that my light-mode headless captures could never trigger; reproduced
by emulating `prefers-color-scheme: dark` (card bg measured rgb(0,0,0)).
Fixes: all `dark:` variants purged from bento-grid, infinite-moving-cards, timeline,
flip-words and direction-aware-hover (the flip word would also have flipped near-white
on cream); bento base surface `bg-cream border-leaf/15`; fixed `md:auto-rows-[18rem]`
removed so rows size to content (the clip's cause); "Oil & honey" → "Oil and honey"
(Fraunces' ampersand reads as an epsilon-like glyph at display size); basil header
given a tighter 1.45× crop inside an overflow-hidden frame so the plant fills its band;
`globals.css` declares `color-scheme: light`. Verified with dark-scheme emulation at
1512px and 390px (`qa/deep-fixed2/bento-dark.png`, `bento-mobile-dark.png`): all four
cards cream rgb(251,242,223) in BOTH schemes, unified leaf titles, full-bleed images,
every description ending 17px inside its card.

### Round-2 publishing
- `ab096eaeaaede9eddfc220dcb82a76a4198ccc73` — round-2 fixes A–H (8 files); Vercel
  page chunk → `ec9cb4f3fde352a1`; deployment visually spot-checked from a fresh mirror
  (`qa/deep-vercel2/`, 43 files; form + sticky step 4 re-verified on the deployment).
- Bento/dark-mode fix pushed as its own commit after this section was written; SHA and
  the Vercel chunk recorded in the pass's final report.
