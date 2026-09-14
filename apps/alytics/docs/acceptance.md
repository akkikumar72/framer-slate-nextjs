# Alytics capabilities and acceptance

Reference inspected on 2026-09-14: [published template](https://alytics.framer.website/) and the user-provided Alytics-copy Framer project. Implementation targets Next.js 16, React 19, and TypeScript in `apps/alytics`.

## Capability profile

| Area | Detected capabilities | Implementation and probes |
| --- | --- | --- |
| Shared shell | Fixed navigation, mobile menu, internal section links, footer | Shared shell; keyboard Escape, route changes, all footer destinations, mobile stacking |
| Hero | Floating logos, original dashboard artwork, timed trust-logo marquee | Independent source-timed rotation/float loops, load springs, scroll-linked dashboard tilt, draggable logo ticker |
| Features and benefits | Responsive card grids, original illustrations, intersection reveals | Shared cards and reveal primitive; all breakpoints and image decoding checked |
| How it works | Three illustrated steps, centered tablet third card | Responsive grid, local source renditions; section and card geometry checked |
| Integrations | 36 desktop/tablet and 45 phone logos on a masked spiral, independent elapsed-time driver | Original 9 SVGs repeated, source-sized spiral, Motion frame driver, ResizeObserver; full normal/reduced-motion probes |
| Testimonials | Desktop marquee and phone carousel with previous/next | Draggable 50px/s ticker and manual phone carousel; five-slide order, wrapping, controls and reduced motion checked |
| Pricing | Monthly/yearly state, three plans, highlighted middle plan | Sliding billing highlight and measured-width price springs; all six prices and accessible pressed states checked |
| Comparison | Two panels and responsive stacking | Shared source copy and original logo; geometry and overflow checked |
| FAQs | Five independently expandable answers, first open by default | Spring height and rotating icon strokes; independent accessible buttons and keyboard checks |
| Blog | Index, featured card, four articles, related content | One data model and article layout; all instances, metadata, image decoding, back links and unknown slugs checked |
| Newsletter | Dedicated form page and envelope motion | Homepage envelope loops/entrances verified at all widths; separate form retains truthful local validation |
| 404 | Branded missing-page experience with recovery CTA | Actual HTTP 404 for explicit utility route, unknown path and unknown article |

No canvas, video, audio, commerce flow, login, localization, or authenticated product interface was discovered. Dashboard illustrations are source raster artwork, not interactive SaaS screens. Primary calls to action lead to the local newsletter page. Floating template promotions and platform credit links were removed at the user's request.

## Geometry and visual evidence

Reference viewport samples: 1474 × 1223 desktop, 810 × 1080 tablet, 390 × 844 phone. Browser route tests use 1474 × 1080, 810 × 1080 and 390 × 844. Breakpoint changes occur at 1200 and 810 pixels.

Desktop main section heights in the final integrated render differ by less than 0.2 px from sampled source values. Its total page height is approximately 11,239 px against approximately 11,241 px for the reference. This is a geometry result, not proof of identical pixels or timing. Early mobile mismatches in the hero tag, dashboard ratio, pricing gaps, comparison typography, FAQs, blog CTA and newsletter panel were corrected from source measurements.

The landing-section evidence records paired Features and Integrations captures. Blog evidence records index/article captures at all three widths. Utility evidence records newsletter and 404 captures. Source and local hero captures use an identical 720-pixel-high clip because the in-app browser's taller screenshot capture produced repeated rendering tiles; complete local production captures come from the repository's Playwright test suite.

## Remaining deltas and boundaries

- Newsletter delivery and CMS editing are not connected. Article content is local data and the form reports validation without creating a subscription.
- Continuous motion clocks are independent. Orbit structure and rate were measured; arbitrary screenshots may show different phases.
- The follow-up motion audit replaces the initial approximations with measured source settings. Independent browser clocks and rendering still prevent a frame-for-frame identity claim.
- The footer retains the creator credit. Platform branding and remix links are absent from the application interface.
- No deployment, purchase, subscription, or mutation to the original Framer project was performed.

## Checks

The command outcomes and final route disposition are recorded after the last production build. The independent Alytics suite, route contract, asset audit, and strict TypeScript checks are the acceptance gates for this addition. Shared catalog validation also depends on concurrent changes to other template workspaces.

Final checks on 2026-09-14:

| Gate | Outcome |
| --- | --- |
| Alytics TypeScript and asset checks | Passed; 114 bundled files |
| Browser test TypeScript | Passed |
| Alytics production build | Passed; all discovered content prerendered |
| Alytics HTTP route contract | Passed; 7 valid pages, 1 root redirect, 3 missing-route probes |
| Production Playwright suite | 12 checks passed across the full run and final targeted carousel regression run; all routes at three widths, interactions, normal/reduced motion, and showcase routing |
| Showcase production build | Passed |
| Showcase asset audit | Passed; 16 references and 17 bundled files |
| Whitespace diff check | Passed |

Production hero and pricing were additionally inspected in the in-app browser at the same desktop viewport as the reference, without development overlays. Paired `final-pricing-desktop.png` files sit beside the final hero pairs. The independent review's mobile tab order and current-page menu-close findings were corrected and tested. The missing-article metadata race was corrected with `notFound()` during metadata resolution.

## Follow-up motion audit

See [homepage motion](home-motion-evidence.md), [section motion](sections-motion-evidence.md), [blog motion](blog-motion-evidence.md), and [newsletter motion](newsletter-motion-evidence.md). Every homepage section and the shared header/footer was inspected. Source/local traces cover initial, intermediate, settled, hover/reverse and offscreen behavior where applicable. The production browser tests run normal and reduced motion separately.

Review corrections include measured price-width animation without stretched digits, keyboard navigation of continuous tickers, both-envelope regression coverage, and safe resize-observer cleanup during route changes. A Motion keyboard blur cancellation affecting the next carousel swipe is handled before a new pan session begins.
