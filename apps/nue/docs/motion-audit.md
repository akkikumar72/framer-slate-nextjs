# Nue motion verification

This record covers the standalone Next.js portfolio, four project pages, and custom 404. The frame samples and completed checks were captured on 2026-09-23 before the later copy and asset revision. Copy and assets have intentionally changed after the initial geometry comparison; the numerical records remain a historical baseline.

## Entrance implementation

The shared `Reveal` renders a hidden pose in server output and starts Motion springs after intersection. This prevents an entrance from advancing to its visible state before the browser paints its initial pose. Reveals run once and remain visible after scrolling back.

The following timing values were recorded during the initial implementation. Labels describe element roles, not rewritten historical copy.

| Element | Initial pose, in addition to opacity 0 | Delay | Duration | Bounce |
| --- | --- | ---: | ---: | ---: |
| Avatar | Scale 0.6 | 0 s | 0.6 s | 0 |
| Name | Y +10 px | 0.2 s | 0.4 s | 0.2 |
| Verification mark | Scale 0.5 | 0.2 s | 0.6 s | 0 |
| Role | Y +10 px | 0.4 s | 0.6 s | 0 |
| Introduction | Y +10 px | 0.6 s | 0.7 s | 0 |
| Primary CTA | Scale 0.8 | 0.8 s | 0.7 s | 0 |
| Work navigation | X -10 px | 0.9 s | 1 s | 0 |
| Selected works heading | Y +10 px | 1.1 s | 0.7 s | 0 |

The current homepage primary action reads **Explore Next.js**, and project media navigation reads **View gallery**. The timing records below preserve their numerical history without presenting old captured labels as current copy.

Project entrances use separate springs for the back arrow, title, description, gallery button, and cover. Their recorded delays are 0, 0.2, 0.3, 0.5, and 0.5 seconds. Metadata card shells stay still while labels and values reveal independently.

Scroll motion covers headings, selected projects, About copy and rotating photos, service text, testimonials, experience and tool logos/text, FAQ rows, social icons, form fields, project details, overview copy, galleries, and adjacent-project navigation. The default upward reveal is 10px over a 0.7-second spring. Images and buttons use explicit scale poses.

## Accessibility contracts

- Reduced-motion CSS exposes content on the first paint. A reactive media-query subscription stops active entrances when the preference changes, including during a delay.
- Keyboard focus immediately completes the containing reveal.
- No-JavaScript styles expose content, including both About photos.
- `/nue/404` uses the server-rendered root not-found page, preserving HTTP 404 without a blank client-only fallback.
- FAQ keyboard operation, carousel controls, form validation, and image-dialog focus handling are covered by the browser suite.

## Historical numerical evidence

- [Recorded entrance recipes](evidence/motion/reference-home-recipes.json)
- [Historical reference homepage frames](evidence/motion/reference-home-frames.json)
- [Earlier local homepage frames](evidence/motion/local-home-frames.json)
- [Historical reference project sequences](evidence/motion/reference-project-frames.json)
- [Settled geometry after the motion repair](evidence/motion/settled-geometry.json)

The reference captures remain historical observations. They are not presented as captures of the current Next.js application. Captured text, titles, and URLs were removed rather than rewritten; transform, opacity, timestamp, dimension, and sequence records remain.

The browser regression suite samples opacity and transforms with `requestAnimationFrame` before hydration. It requires hidden, multiple intermediate, and settled frames, verifies entrance ordering, and scrolls through each page with wheel input. Reduced-motion checks cover initial visibility, absence of active animations, and preference changes during entrances. No-JavaScript checks cover all six page variants.

Before the later content revision, 19/19 Nue browser checks passed, along with browser TypeScript, the production build, app typecheck, the 52-file asset audit, and route verification. The browser command was `npx playwright test tests/nue.spec.ts --grep-invert Showcase`. Those counts describe the earlier verification. After the content and asset changes, the full `tests/nue.spec.ts` suite passed **20/20**, including Showcase integration. Current Nue and Showcase checks, type checks, asset audits, production builds, and route verification also passed. The dedicated Nue smoke probe passed **1/1**, bringing the current browser total to **21 passed checks**. Browser TypeScript also passed.

The recorded in-app-browser comparison measured equal homepage heights of 6850px at 1280px wide, 6851px at 810px wide, and 6837px at 390px wide. Greenora measured 3161px at 1280px wide and 2522px at 390px wide. Section differences were limited to fractional rounding. These differ by up to one pixel from the earlier Chrome records because browser font rasterization can vary.

Identical frame timestamps across browsers and machines are not claimed. The application owns its hydration, intersection, reduced-motion, and focus lifecycle.
