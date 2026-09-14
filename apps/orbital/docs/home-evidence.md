# Orbital homepage evidence

The public Framer template and read-only project inventory were used together. Production rendering was checked on 2026-09-14. No exact visual parity claim is made.

## Route and structure

`/orbital` contains the hero, brand strip, platform cards, runtime diagram, four use-case states, benchmarks, SDK example, observability, integrations, three pricing plans, testimonials, and FAQ. CTA and footer are shared with the other content routes. All images, vectors, and fonts are local.

## Measured section heights

Widths are 1474px for desktop and 390px for phone. Heights are CSS pixels. Minor fractional differences can come from browser font layout. Totals alone do not establish visual parity.

| Section | Desktop source | Desktop local | Phone source | Phone local |
| --- | ---: | ---: | ---: | ---: |
| home-hero | 857.73 | 857.73 | 653.47 | 653.50 |
| home-brands | 215.98 | 217.00 | 399.95 | 400.00 |
| platform | 633.00 | 635.38 | 1361.78 | 1361.78 |
| runtime | 733.38 | 710.91 | 1136.70 | 1144.42 |
| use-case | 782.59 | 781.38 | 1209.38 | 1234.78 |
| benchmarks | 1172.58 | 1180.66 | 1452.53 | 1454.72 |
| observability | 886.98 | 886.97 | 475.89 | 475.89 |
| Integrations | 1064.08 | 1064.05 | 581.48 | 581.48 |
| pricing | 1112.59 | 1095.38 | 2538.92 | 2539.78 |
| testimonial | 653.00 | 672.19 | 663.78 | 663.78 |
| faq | 733.78 | 733.78 | 850.56 | 850.56 |
| orb-cta | 527.41 | 527.38 | 560.59 | 560.56 |
| orb-footer | 362.00 | 362.00 | 619.59 | 619.59 |

Full-page heights: desktop source 9735px, local 9725px; phone source 12505px, local 12541px. Runtime, use-case, pricing, and testimonial spacing retain the differences shown above.

## Browser checks

- All four use-case tabs select the corresponding content and loaded illustration. Accessible metrics are Sales 38+, Ops 9h, Support 64%, and Research 5x. ArrowRight wraps Research to Sales and moves keyboard focus.
- Testimonial next controls cycle through all four positions and wrap. Four original quotes remain accessible; duplicate rendering cards are hidden from assistive technology. Focus and pointer presence pause autoplay.
- All six FAQ answers open individually; Enter closes the active answer.
- Every page family was checked at 390px and 810px with no horizontal document overflow or failed loaded images.
- Navigation opens on phone, closes with Escape, and restores toggle focus.
- Reduced-motion rendering suppresses the header animation and leaves all reveal content visible.
- The final production homepage has no Next.js development overlay and no captured console warnings or errors.

## Evidence files

- `evidence/home-desktop-source.png` and `evidence/home-desktop-production.png`: matched 1474 x 1223 hero views.
- `evidence/home-phone-source.png` and `evidence/home-phone-production.png`: matched 390 x 844 hero views.
- `evidence/source-shared-phone.png` and `evidence/local-shared-phone.png`: shared phone sections after scrolling to reveal their content.
- `evidence/home-final-geometry.json` and `evidence/responsive-checks.json`: production geometry and page-family checks.

## Motion and remaining differences

The standalone app uses a 400ms navigation entrance, block reveals, an 1100ms counter, and a source-paced brand loop. The testimonial carousel advances automatically using the source-observed step distance; exact easing remains an implementation approximation. The source character-by-character heading/button effects are approximated by block reveals and a small button-label hover movement. Reduced-motion preference is respected.

The Framer phone testimonial variant omits Daniel Kim, and the local phone carousel now uses the same three-item set. Phone and desktop testimonial heading copy matches their respective source variants. Header logo scale, some line wrapping, and the section differences above remain. These are explicit fidelity limitations, separate from route and interaction correctness.
## Source CSS geometry

## Runtime

- Desktop `.framer-8z81il` is a flex row with `gap:64px`.
- Desktop `.framer-1fh1ti6` is the flexible copy column with `gap:64px` and `padding-bottom:100px`.
- Desktop `.framer-1du3jgp` is flexible with `max-width:629px`, a left border, and `padding:93px 100px`.
- Tablet changes the row gap to `24px`, the copy gap to `40px`, horizontal content padding to `16px`, and illustration padding to `48px`.
- Phone stacks `.framer-8z81il` with `gap:40px`; the copy column becomes full width with `padding-bottom:40px`, content padding becomes `0 12px`, and illustration padding becomes `32px`.

## Pricing

- Desktop `.framer-1fmij15` is a row with `gap:20px` and `max-width:1152px`.
- Tablet changes it to a two-column grid with two content rows.
- Phone changes it to a single column.

## Testimonials

- Desktop `.framer-h445vu-container` is `1584px × 284px`; its four cards resolve to `384px` with a `16px` gap.
- Tablet and phone `.framer-lf453i-container` is `1400px × 284px`; its cards resolve to `338px` with a `16px` gap.
- `.framer-NUrI6.framer-v7sztz` uses `20px` padding. Its Small variant uses `16px`.
- Quote preset `XOwl0v37p` uses Geist at `20px/1.5`. Card content uses a 10px radius and the light `#f7f7f7` surface.

The current React transform in `components/home-interactions.tsx` still advances by `var(--testimonial-width) + 20px`. It must advance by `+ 16px` after this CSS change. The card footer also needs the source 124px by 20px five-star row added in JSX. The phone slideshow uses a fixed 1400px rail at `left:-703px`. Tablet centers the same 1400px rail; desktop centers a 1584px rail.

## Benchmarks and pricing internals

- Benchmark container `.framer-pmva55` uses `gap:64px` and `padding-bottom:100px` on desktop. `.framer-mnvzrh` is capped at `1245px` with `gap:60px`. Its rows distribute a copy column capped at `623px` and an image capped at `515px`; tablet row gap is `24px`, and phone stacks rows at `40px`.
- Pricing cards resolve from `.framer-1fmij15` at `max-width:1152px` and `gap:20px`. The card component root uses `20px` padding, while its pricing summary has another `20px` inset.
- Testimonial author rows place the author text and `124px × 20px` star image in a horizontal, space-between footer.

## Tablet media and section spacing

- At 1280px, the source adds `80px` after platform, runtime, use cases, benchmarks, and integrations; it adds `60px` after observability, pricing, and customers.
- Platform cards remain `212px` tall in the two-column tablet grid.
- Runtime illustration content expands to the available `533px` inside the `629px` image column with `48px` padding.
- Benchmark images retain their `515px` cap at tablet widths.
- Observability media retains its `1031px` cap. Integration media fills the `1220px` container at the source aspect ratio, producing `636.61px` height.

- Tablet hero source geometry is a `274.203px` content block, a `40px` container gap, a source-aspect `320.25px` image at 1280px viewport, a `10px` pre-divider gap, and a `47px` divider.
- Tablet use-case panel content resolves near `370px`; the prior `390px` minimum contributed most of the container height excess.

- Testimonial cards keep intrinsic content height inside the 284px rail. Small cards center vertically; the desktop rail aligns cards from its start.

## Wide phone at 809px

- The fresh phone variant caps section containers at `580px`. Platform cards switch to `212px` height while the 390px cards remain `236px`.
- Runtime media fills the `516px` content box inside a 580px wrapper with 32px padding. Benchmark images remain capped at `515px`.
- Integration heading and media form a `97.594px + 32px + 290.125px` content stack; observability media is `290.125px`.

## Final desktop structure

- At 1474px, source and local benchmark internals both resolve to about `926px`; observability and integration section totals also match within a pixel.
- Framer places the observability content after a `60px` wrapper gap and the integration content after a `64px` wrapper gap. The local flat DOM transfers that space from the section's trailing padding to the heading's top margin, preserving total section height while aligning the images.
- The published hero artwork uses `object-position: 50% 100%`. Its top rule is an overlay, so the local rule uses an inset line rather than a one-pixel border that changes box geometry.
