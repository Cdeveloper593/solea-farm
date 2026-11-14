# QA Summary — SOLEA (production build, port 4200)

Playwright (headless Chrome) against `http://localhost:4200/`, one viewport per run
(the VM OOM-killed a combined run once; the server was restarted and runs detached).

| Viewport | h1 | main | WebGL canvas | H-overflow | Console/page errors |
|---|---|---|---|---|---|
| 1440×900 | 1 | 1 | 1 | none | 1 hydration error — **fixed** (see below), re-verified clean at 1024/390/360 |
| 1024×768 | 1 | 1 | 1 | none | none |
| 390×844 | 1 | 1 | 1 | none | none |
| 360×740 | 1 | 1 | 1 | none | none |

Fixes during QA:
1. Aceternity HeroParallax shipped a demo `<h1>` (“The Ultimate development studio”) →
   replaced with our gallery heading as a `<p>`; page now has exactly one `<h1>`/`<main>`.
2. React hydration error #418: Aceternity FlipWords renders a `<div>` and was nested in a
   `<p>` → hero intro is now a `<div>`; zero errors afterwards.
3. Header wordmark was dark-on-dark when the menu overlay was open → turns cream when open.
4. `cn()`/hooks split (`src/lib/utils.ts` pure, `src/lib/hooks.ts` client) so Aceternity's
   server-rendered Bento Grid can call `cn()` during prerender.

Interactions verified: menu open/close + Escape, anchor smooth-scroll (Lenis),
visit-booking form end-to-end (confirmation + reference `SOLEA-2387`, no errors) —
screenshot `04-visit-booked.png`. Screenshots: hero + menu per viewport, 8 scroll frames
at 1440×900 in this folder.

Imagery: all product/section images load from local `/images/*` (Next/Image); the only
"not loaded" entries in raw audit JSON are below-the-fold lazy images before scrolling.
Reduced motion: preloader shortens, Lenis/WebGL disable, global CSS clamps animations;
WebGL fallback chain = poster image → error-boundary poster.
