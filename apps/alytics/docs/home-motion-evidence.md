# Homepage motion fidelity pass

Reference: [Alytics](https://alytics.framer.website/), inspected 2026-09-14. The published DOM, computed transforms, gestures, and public component configuration were used as evidence. Downloaded source modules remain in ignored `.codex-evidence/alytics/motion/source/`; they are not executed or shipped in this app. Motion for React drives the replacement components.

## Hero and shared controls

| Element | Source behavior | Implementation |
| --- | --- | --- |
| Trust tag, headline, description, actions | Load from y40/60/80/60, delays 0.1/0.2/0.3/0.4 seconds | Separate load reveals; spring stiffness 500, damping 60, mass 1 |
| Four floating marks | Static rotations -8/-8/8/8 degrees, additive rotation loops +18/-10/-18/+14 | Independent rotation and vertical layers; mirror legs 3.5/3/4/3.5 seconds |
| Mark vertical loops | 0 to -15/+25/-22/+25px, mirror legs 2.5/2/3/2.5 seconds | Same `[.44,0,.56,1]` cubic easing; finish current leg on exit then restore base |
| Dashboard entrance | y150, opacity0, delay 0.6, spring 500/80/2 | Load animation combined with scroll tilt |
| Dashboard scroll tilt | Perspective 1200; rotateX 30 to 0 as its top then bottom cross viewport bottom; spring 1000/100/1 | `useScroll` offsets `start end` and `end end`; `useSpring` |
| Buttons | Blue background and shadow spring 500/40/1; letters roll up 21px, repeated as text shadow | Individual letter springs duration 0.4, bounce 0, stagger 40%; pointer and keyboard focus |

At a 1474×720 viewport, the settled reference dashboard angle was 23.8333° at scrollY0 and 11.0833° at scrollY306, returning to 0° below the image. The local 1474×720 result at scrollY0 was 23.8333°. The hero heading bounds matched exactly: x387,y218,width700,height153.59375. Continuous floating phases intentionally start with each local page load.

Desktop mark anchors within the 1104px content area are left12/top30, left12/top250, right12/top30, right32/top250. Tablet source marks are 65px and use full-page anchors 28/40px left and 32/40px right; local content-relative offsets account for the 32px container padding. Marks are hidden below 810px.

## Other homepage sections

- Headings reveal independently: badge y40/delay 0.1, heading y60/delay 0.2, description y60/delay 0.3. Half of the transformed wrapper must intersect before triggering. Each entrance runs once.
- Pricing content, comparison panel, and FAQ group enter from y60 with delay 0.4 as soon as their transformed wrapper intersects. They use spring 500/60/1.
- Monthly/yearly prices move by 50px while their opacity changes, with spring 500/60/1. Both text layers remain mounted; only the selected price is exposed to accessibility APIs.
- FAQ answers animate their height with spring 500/60/1. The two 2×14px vertical strokes rotate from 0/90° to 270/270°, becoming a minus. Questions remain independently expandable, with the first initially open.
- Trust and desktop testimonial tickers move right at 50px/second, with 64px and 20px gaps respectively. Hover retains the speed. Both accept horizontal dragging.
- The phone testimonial carousel is manual, with five slides ordered Carter, Elena, James, Marcus, Sarah. It loops with spring 200/40/1, uses 320px cards and 20px gaps, and places 40px arrow buttons 50px below the cards. Swipes advance above 200px/s or half a card width. A short slow drag stays at its release position, matching the source.

See [section motion](sections-motion-evidence.md), [blog motion](blog-motion-evidence.md), and [newsletter motion](newsletter-motion-evidence.md) for the remaining section-specific values and source/local probes.

## Accessibility and limits

The live reduced-motion preference stops decorative loops and removes spatial entrances/hover effects. Content, billing, links, FAQs, and carousel controls remain available. The preference can change without reloading.

Matching observed configuration and sampled states does not establish identical frames across independent animation clocks, browser scheduling, or rendering engines. Newsletter delivery remains a local preview, as documented in the main README.

The final production build, TypeScript/asset audits, route contract, and twelve browser checks passed. The carousel regression specifically covers Enter activation followed by a pointer swipe. Motion 13 emits a synthetic pointer cancellation when the previously activated button blurs; the viewport clears that focus before creating a new pan session. This preserves the expected gesture without changing its timing.
