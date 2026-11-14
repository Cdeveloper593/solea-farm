# SOLEA — Fattoria degli Agrumi

An original, Awwwards-bar website for a fictional Sicilian citrus farm (marmalades, pestos,
grove oils), built in **Reference Mode** from https://www.agrumeafarm.it/en — the reference
informed the site type, structure, art direction and motion language only; brand, copy,
imagery and code are original. Analysis: `reference/ANALYSIS.md`. Component plan (written
before the build): `COMPONENT-PLAN.md`. Verified component inventory: `COMPONENTS.md`.

## Run
```bash
npm install
npm run build
npm run start   # production server on port 4200
npm run dev     # dev server on port 4200
```

## Highlights
- Next.js 15 (App Router) + TypeScript + Tailwind; single-page experience: preloader →
  hero with interactive **Blender-modelled 3D citrus branch** (react-three-fiber, lazy,
  pointer + scroll linked, poster/reduced-motion/no-WebGL fallbacks) → marquee → terroir →
  sticky process → pantry (8 products) → parallax gallery → seasons timeline → journal →
  testimonials → visit booking (mock adapter in `src/lib/contact.ts`) → footer.
- UI components ONLY from ui.aceternity.com + reactbits.dev (see COMPONENTS.md).
- 3D: `blender/build_citrus.py` → `public/models/citrus-branch.glb` (274 KB) +
  `public/images/citrus-poster.png` + `blender/citrus-branch.blend`.
- All imagery is local (`public/images/`, Unsplash-sourced) — zero remote image deps.
- Reference captures/analysis in `reference/`; QA screenshots + report in `qa/`.
