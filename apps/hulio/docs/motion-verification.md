# Hero and navigation motion verification

Verified on 14 September 2026 against https://hulio.framer.website/ using the local production build at http://127.0.0.1:3013/hulio. This follow-up covers the homepage hero copy and shared navigation requested by the user.

## Recovered source settings

The public home-page module, navigation module and Framer runtime were inspected alongside live rendered styles. Source copies are in `/tmp/hulio-source/home-motion.mjs`, `script_main.Dsv-gRI6.mjs`, and `framer.DWXe6_hd.mjs`.

| Element | Initial state | Final state | Timing |
| --- | --- | --- | --- |
| Heading words | Opacity 0.001, Y 10px, blur 10px | Opacity 1, Y 0, blur 0 | Spring duration 0.8s, bounce 0; initial delay 0.3s, word stagger 0.1s |
| Paragraph | Opacity 0, Y 30px | Opacity 1, Y 0 | Spring duration 1s, bounce 0, no delay |
| Hero button | Opacity 0, Y 30px | Opacity 1, Y 0 | Spring duration 1s, bounce 0, delay 0.2s |
| Desktop navigation | Two 20px text layers, clipped to one line | Both layers move up 20px | Spring stiffness 500, damping 60, mass 1, no delay; reversed on exit |

Hero entrances trigger once per mount on entering the viewport, with intersection amount 0. Scroll-away/return does not replay them. Desktop hover retains black text. Tablet and phone navigation have a single visible layer and use the source gray hover color `#4a4f54` instead of rolling text.

## Browser evidence

At 1280x720, read-only DOM samples were taken continuously for 2.4 seconds after a fresh reload. First opacity above 0.01:

| Word | Source elapsed | Local elapsed |
| --- | --- | --- |
| Award | 369ms | 326ms |
| Winning | 471ms | 428ms |
| Creative | 569ms | 530ms |
| Digital | 675ms | 630ms |
| Agency | 774ms | 730ms |

Both show approximately 100ms between words. The roughly 43ms absolute offset reflects different hydration/intersection scheduling in these reload samples. The first word reached opacity 0.999 at 1151ms source / 1104ms local, about 780ms after the measured onset in each. All five words ended at opacity 1, blur 0 and no transform. The paragraph and button also ended fully visible with no transform.

The local navigation was sampled through hover entry and exit. Text-layer Y positions changed from 36/56px to 16/36px, matching the source. The transition reversed to 36/56px on exit. Text remained black. Keyboard focus also rolls the label; the second layer is hidden from accessibility APIs, leaving one accessible link name.

At 390x844 and 810x1080, the hero wraps correctly with no horizontal overflow. Duplicate navigation layers are hidden and transforms are disabled. The phone menu opens, focuses Home, and Escape closes it and returns focus to the menu button. Scrolling away and back leaves the hero settled. Reduced-motion handling was code-reviewed: Motion's preference hook uses immediate hero transitions, and CSS forces visible, unblurred copy and stationary navigation. This follow-up did not repeat browser media emulation.

Evidence in the ignored `.codex-evidence/hulio/motion/` directory:

- `reference-hero-sequence.json`, `local-hero-sequence.json`: initial, in-flight and settled style samples.
- `local-nav-sequence.json`: hover entry and exit samples.
- `reference-hero-{initial,middle,settled}.png`, `local-hero-{initial,middle,settled}.png`: visible phases at the same viewport.
- `hero-capture-metadata.json`: capture windows and corresponding word styles. Screenshot capture takes time, so these are phase comparisons rather than exact synchronized frames.
- `local-phone.png`, `local-tablet.png`: responsive settled views.

## Validation

- Production build passed with all static routes generated.
- TypeScript and local asset audit passed: 125 asset references and 126 bundled files.
- HTTP route contracts passed: 23 valid routes, three redirects, four invalid routes.
- `git diff --check` passed.

The floating Made in Framer badge remains removed as requested. Other page content and existing template promotions are retained.
