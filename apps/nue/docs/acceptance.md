# Nue implementation and verification record

Nue is a standalone Next.js portfolio using React, CSS, and Motion. Local preview: [localhost:3016/nue](http://localhost:3016/nue). No deployment is recorded here.

**Evidence status:** Copy and assets intentionally changed after the initial geometry comparison. Historical measurements remain a layout and motion baseline. The current content and asset revision passed the builds, route checks, and browser suite recorded below on 2026-09-23; the historical captures do not establish current visual parity.

## Routes and shared implementation

| Route | Implementation |
| --- | --- |
| `/nue` | Portfolio with nine sections |
| `/nue/projects/greenora` | Project detail page and next-project navigation |
| `/nue/projects/clarity-path` | Project detail page and adjacent-project navigation |
| `/nue/projects/paul-interior` | Project detail page and adjacent-project navigation |
| `/nue/projects/umbrella` | Project detail page and previous-project navigation |
| `/nue/404` and unknown paths | Custom not-found content, HTTP 404, home navigation |

The homepage primary action is **Explore Next.js**. Project pages use **View gallery** for in-page media navigation. The four project pages use one route template and one typed data collection. Fonts, media frames, sections, buttons, navigation, footer, reveals, and layout are shared. The [route manifest](route-manifest.json) records implementation paths. The [asset inventory](asset-inventory.json) records local files, hashes, byte sizes, and available image dimensions. Current assets include `nextjs.svg` and the 1200 × 630 local homepage capture `nue-social.png`.

## Historical geometry baseline

Measurements use matching Chrome CSS viewports after fonts and layout settle, with FAQ answers closed. Values are document heights in CSS pixels. These observations predate the intentional copy and asset changes.

| Page | Viewport | Historical reference | Earlier local implementation | Delta |
| --- | --- | ---: | ---: | ---: |
| Portfolio | 1280 × 720 | 6850 | 6850 | 0 |
| Portfolio | 810 × 1080 | 6852 | 6852 | 0 |
| Portfolio | 390 × 844 | 6838 | 6837 | -1 |
| Greenora | 1280 × 720 | 3161 | 3161 | 0 |
| Greenora | 390 × 844 | 2523 | 2523 | 0 |
| Custom 404 | 1280 × 720 | 748 | 748 | 0 |
| Custom 404 | 390 × 844 | 848 | 848 | 0 |

Recorded section widths were 580px on desktop/tablet and 370px on phone. Section boundaries and heights differed by less than 0.1px. The one-pixel phone document-height difference was attributed to fractional layout rounding. [Raw geometry observations](evidence/geometry.json) retain numerical measurements; obsolete captured copy has been removed. These records do not establish pixel-perfect animation parity.

## Interaction contracts

| Capability | Behavior |
| --- | --- |
| Floating dock | Fixed navigation to four anchors, active section, hover response, keyboard focus |
| Reveals | Server-rendered initial poses, intersection-triggered springs, independent text and image entrances, once-only playback, immediate reduced-motion and focus handling |
| Cards and CTAs | Tilted photo layers and pinned cards, project-image hover zoom, rolling button labels, visible focus states |
| Testimonials | Three slides, bounded previous/next controls, native snap scrolling, keyboard arrows, no autoplay, inert hidden slides and announced changes |
| FAQ | Four independent disclosures, initially closed, keyboard operation, 500ms height spring with 0.18 bounce, rotating plus icon, immediate reduced-motion state changes |
| Project media | Reserved intrinsic image ratios, modal preview, Escape/backdrop/image dismissal, restored focus and body scrolling |
| Contact | Required bounded fields, email and whitespace validation, encoded email draft, editing clears the previous draft, no automatic email sending; controls stay disabled until hydration and a direct email link is available without JavaScript |

## Retained evidence

- [Earlier geometry comparison](evidence/geometry.json)
- [Motion verification and timing records](motion-audit.md)
- [Settled geometry after the motion repair](evidence/motion/settled-geometry.json)

Historical screenshots were removed because they contain obsolete branding and content. Numerical layout and animation records remain. Captured text, titles, and URLs have been removed from those historical records rather than rewritten as if they belonged to the current application.

## Current verification

Verified after the copy and asset revision on 2026-09-23:

- Nue: checks, typecheck, asset audit, production build, and route verification passed.
- Showcase: checks, typecheck, asset audit, production build, and route verification passed.
- `tests/nue.spec.ts`: **20/20 passed**, including Showcase integration.
- Dedicated Nue smoke probe in `tests/template-smoke.spec.ts`: **1/1 passed**. Browser TypeScript also passed.

Together, the full suite and dedicated smoke probe passed **21 browser checks**.

Repository-wide publishing checks on 2026-09-23 passed `npm run verify`, covering workspace checks, production builds, route contracts, and browser interactions. Final contact and no-JavaScript regressions passed after the fallback test was consolidated. The production Showcase was also inspected in Chrome with Nue first in the gallery and its real preview loaded.

## Verification commands

Run from the repository root:

```sh
npm run check --workspace=@nextjs-templates/nue
npm run build --workspace=@nextjs-templates/nue
npm run test:routes --workspace=@nextjs-templates/nue
npm run check --prefix apps/showcase
npm run build --prefix apps/showcase
npm run test:routes --prefix apps/showcase
npx playwright test tests/nue.spec.ts
npx playwright test tests/template-smoke.spec.ts --grep Nue
```

Before the content revision, the expanded motion suite passed 19/19 Nue browser checks. Earlier verification also passed production builds, type checks, a 52-file asset audit, five valid route probes, one redirect, and three missing-route probes. These counts are historical, not current validation results.

The browser suite covers 1280 × 720, 810 × 1080, and 390 × 844 viewports; routes and metadata; local image loading; overflow and runtime errors; project navigation; carousel and FAQ states; form validation; modal focus and scroll restoration; hidden, intermediate, and settled animation frames; live reduced-motion changes; and no-JavaScript readability. Contact checks do not send email.

A historical carousel input probe recorded slide two at `scrollLeft: 540` after a desktop drag attempt, and slide three at `scrollLeft: 1080` after horizontal wheel movement of 540px. The carousel uses native scrolling and does not add custom mouse-drag handling.

## Limits

- Contact opens an email draft. Actual inbox delivery requires a configured service.
- Copy and assets intentionally differ from the initial comparison. Current browser checks passed; the historical screenshots were removed and are not presented as captures of this revision.
- Hydration, font rasterization, antialiasing, and transition sampling can vary across browsers and machines. No numerical visual-fidelity percentage is claimed.

## Floating navigation finish

The navigation matches the measured reference: 5px backdrop blur, 50% black background, 13px corners, and three shadow layers. The standard backdrop-filter declaration follows the prefixed declaration so production CSS retains both. Verified the production computed styles at desktop and phone widths and inspected readability over body text. [Rendered text-backdrop check](evidence/dock/text-backdrop.png).
