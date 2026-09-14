# Orbital validation

Validated on 2026-09-14. Implementation is local, with no deployment or edits to the original Framer project.

## Confirmed checks

| Check | Result |
| --- | --- |
| Official project tree and public sitemap | 16 published paths reconciled |
| TypeScript | Pass |
| Local asset audit | Pass, 88 references and 90 bundled files |
| Production build | Pass for Orbital and showcase; nine articles statically generated |
| Production route contract | Pass, 15 valid pages and four invalid paths |
| Internal links across all content pages | Pass, 16 internal targets |
| Rendered local image references | 242 references, no Framer-hosted visual URLs |
| Missing path | Branded 404, visible title and return link, HTTP 404 |
| FAQ disclosures | All six answers open individually; Enter closes the active answer |
| Reduced motion | Header animation suppressed and all reveal content visible |
| Mobile navigation | Opens, closes with Escape, restores toggle focus |
| Page-family responsive checks | All 16 pages at 390, 809, 810, 1280, 1474, 1920, and 3423px; no horizontal overflow or failed loaded images |
| Use cases | Four content/image/metric states; keyboard wrap and focus passed |
| Testimonials | Four desktop / three tablet and phone slides; autoplay, controls, and hidden clones |
| About leadership carousel | Phone Next scrolls; keyboard Previous returns to the start and disables correctly |
| Showcase integration | Orbital card opens the production app; app and catalog checks pass |
| Mobile 404 overflow | 390px document width at 390px viewport |
| Runtime console in final production preview | No warnings or errors |
| Pro price switch | Source $49 / $69 states, keyboard-accessible switch |
| Framer badge | Removed at the user's request |
| Shared phone geometry, 390px viewport | FAQ 850.56px, CTA 560.56px, footer 619.59px; source 850.56px, 560.59px, 619.59px |
| Shared desktop geometry, 1474px viewport | FAQ 733.78px, CTA 527.38px, footer 362px; source 733.78px, 527.41px, 362px |

## Evidence and interpretation

Full geometry comparisons are recorded by page family in `home-evidence.md`, `blog-evidence.md`, and `company-evidence.md`. Matched screenshots are in `evidence/`. Source load-animation keyframes are preserved as inspection evidence in `source-load-motion.json`; application code implements its own motion.

No numerical fidelity score or exact parity claim is made. Pixel rasterization and the remaining motion/geometry differences listed in the family evidence remain separate from route and behavior correctness. The contact form is deliberately a local preview, with no configured delivery service.

The shared checkout has simultaneous work in other template workspaces. Orbital checks are focused on this app and its showcase integration; unrelated work is preserved.

The repository browser smoke contract includes Orbital and passes TypeScript validation. Browser interactions reported here were executed through the supported Computer Use browser API; the full repository Playwright CLI suite was not run.

## Responsive fidelity follow-up

The published source was inspected section by section at matched viewport widths, with fresh page loads at its 810px and 1440px breakpoints. The wide desktop check includes the user's 3423px screenshot size. The logo ticker now extends across the entire viewport while its heading and surrounding frame retain the centered 1360px container. Tablet and phone layouts use the source's three-column and two-column logo grids.

Refinements cover hero artwork and wrapping, platform cards, runtime columns, use-case tabs, benchmark panels, observability, integrations, pricing, testimonial rails, FAQ, CTA, navigation, and footer. About, Contact, the blog family, legal pages, and the custom 404 also received source-based typography, content-width, image, and spacing adjustments. The Made in Framer badge is removed.

The production browser matrix is recorded in `responsive-audit.json` (112 page/viewport samples). Source and local homepage heights match at 1280px and the measured desktop widths; the 390px result differs by approximately 6px over the full page. These measurements support the layout review but are not a pixel-perfect or exact animation parity claim. The wide phone and narrow tablet variants retain small geometry differences.
