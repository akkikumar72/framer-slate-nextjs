# Alytics section motion evidence

Audited 2026-09-14 against https://alytics.framer.website/ with a separate Chrome tab. Owned sections: Features, Benefits, How It Works, Integrations. All animation code is route-local React/Motion; no Framer runtime is shipped.

## Entrance configuration

Public source: `voLG6CCBcu14S8vdvTfAj93cblkgWHvUbEm0oxmc8M4.B2ilo_fC.mjs`, retained by the main task under `.codex-evidence/alytics/motion/source/`. The source's `Bi` separator component and page component corroborate the observed DOM transforms.

Every reveal below uses opacity **0 → 1**, one-time viewport entry at **50%**, and the physical spring **stiffness 500, damping 60, mass 1**. These parameters are identical at the 1474 × 1223, 810 × 1080, and 390 × 844 viewports.

| Target | Initial y | Delay |
| --- | ---: | ---: |
| Shared badge | 40px | 0.1s |
| Shared heading | 60px | 0.2s |
| Shared description | 60px | 0.3s |
| Features, source order | 80px | 0.2, 0.4, 0.2, 0.4s |
| Benefits top row | 60px | 0.1, 0.2, 0.3s |
| Benefits bottom row wrapper | 60px | 0.1s |
| Benefits bottom row children | 60px | 0.1, 0.2, 0.3s |
| How It Works | 60px | 0.2, 0.4, 0.6s |
| Integrations entire panel | 60px | 0.2s |

The Benefits bottom row has **nested** motion. Its children begin at 120px total translation when both row and child are hidden. The wrapper continues to exist on phones, where its three cards form a vertical stack. The Integrations heading, description, badge, and button do not have separate entrance effects.

Changes from the first implementation: removed whole-heading 40px ease reveals, applied individual source heading motion through shared `SectionHeading`, replaced uniform card reveals with the source distances/delays, added the nested Benefits row, and disabled individual heading animation inside Integrations.

## Continuous integrations orbit

- Exact source spiral artwork in its original **554 × 504** viewBox, scaled uniformly and centered inside the measured field. The source reads integer `offsetWidth`/`offsetHeight`. Using fractional ResizeObserver dimensions introduced a maximum 0.405px coordinate error; using the same integer measurement removes it.
- Final computed CSS path strings match the source exactly at desktop and phone. Tablet already matched exactly before the rounding correction.
- **36 items** on desktop/tablet: nine logos repeated four times. **45 on phones**: nine repeated five times. Source DOM order groups each logo's repetitions, which is preserved for stacking ties.
- Phase = `(progress + itemIndex × 100 / itemCount) modulo 100`. Same-logo separation is 25% desktop/tablet and 20% phone.
- Source nominal speed 1 has a 0.005 additional factor from its disabled-scroll branch, yielding **1.005 percentage points per animation second**, or a **99.5024876-second** nominal lap. The implementation uses native Motion animation frames, including the source's initial reverse frame before forward movement. Wall-clock movement can slow when browser frames are suspended or heavily delayed, as on the reference.
- Tangent rotation is CSS `offset-rotate: auto`. Opacity interpolates **0 → 1 → 1 → 0** at **0%, 10%, 90%, 100%**. Rolling z-index is **floor(1 + phase / 10)**.
- Logo dimensions are 66 × 66 with a 40 × 40 SVG, centered relative to a 56 × 66 path item. Phone scale is 0.6 around the source 28px/33px origin.
- Source hover scale and hover speed factors are both **1**. Dragging is disabled. No hover movement was added.
- Reduced motion stops frame advancement and shows the settled content. The 2.5-second local reduced-motion recording keeps the orbit at a constant offset distance and confirms fully visible text/cards after hydration.

## Browser verification and artifacts

Raw records are under `.codex-evidence/alytics/motion/`:

- `sections-{features,benefits,how,integrations}-{desktop,tablet,phone}-{reference,local}.json`: 2.5-second requestAnimationFrame samples of computed opacity, transform, position, path phase, and stacking. Records include hidden, intermediate, and settled reveal states for every assigned section at all three viewport classes. Some individually sampled offscreen cards correctly remain hidden until their own viewport threshold is reached.
- `sections-card-hover-reference.json`: pointer over and away from Unified Metrics, Real-Time Tracking, and Connect Your Product. Computed transform remains `none`, opacity 1, white background, and the same 1px/20px shadow. No hover variant is configured in their source components.
- `sections-orbit-geometry.json`: item count/phase/opacity/z-index comparison before integer path correction.
- `sections-orbit-path-final.json`: exact desktop and phone path equality after correction.
- `sections-reduced-motion-local.json`: stationary orbit and visible content under emulated reduced motion.
- `sections-spring-fit.json`: diagnostic fit to the analytically equivalent overdamped spring `1 - 1.25 exp(-10t) + 0.25 exp(-50t)`. Local median opacity RMSE is 0.00026–0.00104 across viewports. Source sampling has more frame jitter, so absolute wall-clock frame identity is not claimed.

The source desktop samples typically take about 700–740ms between first nonzero opacity and settled opacity. This is a physical spring with property-dependent settling, not a fixed-duration CSS transition. Independent source/local page loads have different orbit start times; the verified equality is path geometry, relative phase spacing, speed rule, fading, and stacking, not an absolute synchronized screenshot phase.

Validation: Alytics TypeScript check and asset audit pass. No shared files were edited by the section worker. Global/shared motion is owned by the parent task.

## Header follow-up

The parent task extended ownership to `components/Header.tsx` and `components/Header.module.css` after a read-only homepage review found the original menu lacked the source motion. Header configuration comes from `script_main.BwiI-uby.mjs`, components `X` (Navbar) and `q` (Link). The footer has no entrance reveal in that source.

- The header has no load entrance. Desktop height is 68px; tablet and phone closed height is 58px. Opening uses the same 500/60/1 physical spring to reach the full viewport height. The two 18 × 2 hamburger strokes move from y ±3.75px to the center and rotate to ±45 degrees.
- Phone source/local geometry matches: logo x16 / y14, height 30; nav x16 / y72, 358 × 290; six 40px link rows with 10px gaps; full-width CTA x16 / y390, 358 × 38.203125. Open height is 844 at the 390 × 844 viewport.
- Tablet source/local geometry matches: closed height 58, open height 1080; nav x31 / y72, 748 × 290 at 810 × 1080.
- Desktop source/local nav heights are 40px and y14. Final widths are 515.609375 source and 515.640625 local, a 0.03125px text-rounding difference; x positions differ 0.015625px. Both header heights are 68px.
- Desktop navigation links spring from no shadow to a 2px `#ebebeb` outline with radius 8. Compact-menu links use opacity 0.5 → 1 on hover and focus with the same spring. Source font weight is 500; sizes are 16px desktop, 20px tablet, 18px phone.
- Keyboard verification: opening leaves focus on the menu button; the next Tab reaches Features. Escape closes the menu and returns focus to Open menu. Clicking Features while already on that page closes the menu. Route changes also close it.
- `header-phone-{reference,local}.json` records the expanding height and hamburger transforms. `header-{desktop,tablet}-geometry.json` records final comparisons.

The orbit now uses the parent's live reduced-motion subscription. `sections-reduced-toggle-{on,off}-local.json` verifies a live preference change: the last second of the reduced sample has exactly 0 path movement and opacity 1; movement resumes when the preference is cleared. No reload is needed. Final phone Features frames were recorded with the tab in the foreground and include all three heading elements and the first card at opacity 0, intermediate opacity, then opacity 1. Background-tab frame throttling can otherwise stretch physical animation time during simultaneous browser audits.

Bounded read-only review of the remaining homepage confirmed the configured FAQ rotation/height spring and ±50px pricing number movement. Two further deltas were reported to the parent for its ownership: the moving billing highlight and footer link hover colors. The parent handles those files and final production tests.
