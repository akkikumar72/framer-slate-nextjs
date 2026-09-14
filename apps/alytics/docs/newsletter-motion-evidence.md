# Homepage newsletter CTA motion

Source: https://alytics.framer.website/, inspected in an independent Chrome tab at 1474 × 1223, 810 × 1080, and 390 × 844. This section is distinct from the dedicated newsletter form page.

## Geometry and assets

The two blue curves are static raster image layers, not moving SVG paths. Both use the original local `OmGZB6Q2bVw2OL3RXRH55t39LWg.png`, rendered at 442 × 305.75. The left layer is rotated 180 degrees. The envelopes are independent layers above the curves, using original local `OXyYHX9MW2fCN7IDYfVvNCAqUX0.png` with the source's 1.46414 aspect ratio.

| Property | Desktop | Tablet | Phone |
| --- | --- | --- | --- |
| Section padding, top/bottom | 100 | 80 | 60 |
| Container outer maximum width | 1200 | 1200 | 1200 |
| Container horizontal padding | 48 | 32 | 16 |
| Panel size at tested width | 1104 × 370 | 746 × 330 | 358 × 330 |
| Panel padding / radius | 40 / 20 | 30 / 20 | 16 / 24 |
| Left curve left / top | -140 / -23 | -180 / -73 | -250 / -83 |
| Right curve right / bottom | -140 / -23 | -180 / -73 | -250 / -73 |
| Envelope width / height | 148 / 101.078 | 108 / 73.758 | 70 / 47.805 |
| Left envelope left / top | 70 / 48% | 40 / 51% | 18 / 85% |
| Right envelope right / top | 60 / 144 | 40 / 144 | 18 / 254 |
| Heading width / font size | 450 / 48 | 450 / 38 | 326 / 28 |
| Description width | 340 | 340 | 326 |
| Content height | 228.203 | 204.203 | 180.203 |

All values are CSS pixels unless shown otherwise. The left envelope additionally translates upward by 50% of its own height. Breakpoints are 810 and 1200. Heading/description use normal wrapping, with line heights 120% / 140%; the enclosing content has a 20-pixel gap, with a 10-pixel gap between heading and description. Panel fill is white and its shadow is `0 1px 20px #00000008`.

## Motion model

Public delivered source was inspected as data only after observing the live section. No Framer page runtime is shipped. The relevant home module is `voLG6CCBcu14S8vdvTfAj93cblkgWHvUbEm0oxmc8M4.B2ilo_fC.mjs`, downloaded into the reference evidence directory.

- Rotation loop: 3.5 seconds per mirrored leg, easing `[0.44, 0, 0.56, 1]`, no repeat delay. The source loop is additive to static rotation. Left: base -19° plus a 0→16° loop, giving **-19°→-3°**. Right: base 9° plus a 0→-15° loop, giving **9°→-6°**. Live matrix samples confirm these total angles.
- Independent vertical loop: 0→-15 pixels, 2.5 seconds per mirrored leg, same easing and no repeat delay. Translation is inside the rotated wrapper, so its screen-space path tilts with the envelope.
- Loops start when their envelope enters the viewport, independently of entrance opacity. Source offscreen sampling showed that each current leg finishes, the transform resets to its base, and the layer stays still until re-entry. The reusable `useMirroredLoop` hook reproduces this behavior. It does not freeze a partially completed leg.
- Every reveal runs once with a 50% visibility threshold and spring `{ stiffness: 500, damping: 60, mass: 1 }`. Panel enters from y=60 with 0.2-second delay. Heading enters from y=60 with 0.1-second delay. Description enters from y=80 with 0.2-second delay. Button enters from y=60 with 0.3-second delay. Left/right envelopes enter from y=40 with respective 0.4/0.5-second delays. All fade from zero to full opacity.
- Reduced motion keeps all content visible, removes the entrance displacement, and holds both envelopes at their original base angle with no vertical movement. Changing the preference live is supported by `motion-preference.ts`, a native media-query subscription via `useSyncExternalStore`. The installed Motion hook reads its initial preference only, so this subscription is required for changes without a reload. The shared button provides the verified rolling-text hover treatment.

## Verification evidence

Reference evidence lives in `.codex-evidence/alytics/reference/`:

- `newsletter-cta-section.html` and `home-component.B2ilo_fC.mjs`: delivered section markup and configuration source.
- `newsletter-cta-{desktop,tablet,phone}-entrance.json`: independent reload/scroll observations, including initial opacity zero, in-flight spring transforms, and settled transforms. Browser hydration and scrolling have their own timing; comparison uses element animation configuration and values rather than treating navigation start as animation start.
- `newsletter-cta-{desktop,tablet,phone}-motion.json`: more than 7.5 seconds of independent matrix samples per viewport, covering at least one full seven-second rotation cycle and a five-second float cycle.
- `newsletter-cta-offscreen.json`: source behavior after scrolling away. Rotation and translation finish independently before resetting to base.
- `newsletter-cta-desktop-settled.png`, `newsletter-cta-tablet-settled.png`, and `newsletter-cta-phone-in-flight.png`: rendered source geometry with active decorative loops. “Settled” refers to entrance transitions; envelope loops continue while visible.

Local evidence uses the corresponding `newsletter-cta-*` filenames in `.codex-evidence/alytics/local/`. Source and local desktop/tablet/phone panel size, curve geometry, copy width, font sizes, content height, and envelope base positions were measured in the live DOM. After switching line-height values to source percentage syntax, local copy geometry matches to browser layout precision.

Sampled angle and translation extrema vary slightly because independent traces are not phase-aligned. Desktop source spans -19°→-3° and 9°→-6°; local spans -18.999°→-3.015° and 8.999°→-5.986°. Source float samples span -14.971→-0.012 pixels; local spans -14.966→-0.030 pixels. Tablet ranges likewise agree within the sampling interval. The same exact endpoints, easing, and durations are configured on every breakpoint.

Local phone traces also cover a full cycle. `newsletter-cta-reduced-motion.json` confirms unchanged transforms and full content opacity across 1.25 seconds after enabling reduced motion live. Disabling the preference resumes the loops. `newsletter-cta-offscreen.json` confirms each active leg finishes and both envelopes return to their base rotation with zero translation, remaining unchanged in subsequent samples. `newsletter-cta-phone-reduced.png` shows the static phone composition.

The Subscribe Now link was clicked in the local tablet preview and navigated to `/alytics/newsletter`, where the expected heading and name/email fields were present. `npm run typecheck --workspace @framer-templates/alytics` passed after the final hook and media-preference changes. Final application build and route checks are owned by the coordinating task.

## Integration

`components/shared.tsx` re-exports `NewsletterCTA` from `./NewsletterCTA`; the former approximate CTA is removed. This component imports `Button` directly from `./motion-primitives`, avoiding a shared-module cycle. `useMirroredLoop({ from, to, duration, visible })` is also exported for other source sections that use the same mirrored tween and offscreen behavior.

The Subscribe Now link navigates to `/alytics/newsletter`. It does not submit or subscribe anyone. The dedicated newsletter form continues to provide truthful local validation and preview confirmation, as documented in `utility-evidence.md`.
