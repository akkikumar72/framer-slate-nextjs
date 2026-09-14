# Alytics feature, benefit, workflow, and integration sections

Reference: https://alytics.framer.website/ . Inspected live in a dedicated Chrome tab on 2026-09-14 with per-tab viewports 1474 × 1223, 810 × 1080, and 390 × 844. Desktop full-page source evidence also lives in `.codex-evidence/alytics/reference/home-desktop.png` and `home-desktop.json`.

## Scope and ownership

- `Features`, `Benefits`, `HowItWorks`, and `Integrations` exported from `components/landing-sections/index.tsx`.
- Shared heading, reveal, and button primitives come from `components/shared.tsx`.
- Original artwork remains local under `/alytics/` and is tracked by `docs/asset-map.json`.
- All section copy matches the published source, including its tablet-only shortened AI Growth Insights description and existing punctuation.

## Measured section contracts

| Section | Desktop section height | Tablet section height | Phone section height | Layout |
| --- | ---: | ---: | ---: | --- |
| Features | 1347.89 px | 1068.95 px | 1676.41 px | 2 × 2 cards; single column below 810 px |
| Benefits | 909.83 px | 923.39 px | 1666.60 px | 3 × 2 cards through tablet; single column on phone |
| How it works | 867.31 px | 1228.68 px | 1534.51 px | 3 cards across; tablet 2 cards plus centered third; single column on phone |
| Integrations | 750 px | 710 px | 670 px | Constant 550 px artwork panel |

These are settled reference measurements, not a local parity claim. Fractional rendering differences of approximately 0.1 px appeared between captures.

- Desktop sections use 100 px vertical padding and 56 px between the heading group and cards. Tablet uses 80 px vertical padding and a 48 px heading-to-card gap; phone uses 60 px vertical padding and a 40 px heading-to-card gap.
- Desktop content width is 1104 px. At 810 px it is 746 px, and at 390 px it is 358 px. Repeated card gap is 20 px.
- Desktop feature card: 542 × 423.84 px; padding 16 px 16 px 24 px; 20 px artwork-to-content gap; content horizontal inset 8 px, title-to-description gap 8 px. Artwork aspect ratio 1.80695, as corroborated by the public CSS.
- Workflow artwork aspect ratio is 1.31429. Desktop workflow cards measure 354.67 × 387.09 px. Tablet cards measure 363 × 391.04 px. Phone cards measure 358 × 379.97 px.
- Phone artwork cards use 10 px 10 px 24 px padding, 16 px artwork-to-content gap, and a 4 px title-to-description gap. Feature heights are 309.85 px except AI Growth Insights, which is 332.25 px because its description wraps to three lines.
- Benefits cards use 20 px 20 px 24 px padding, a 40 × 40 px icon tile, 40 px icon-to-copy gap, and 8 px title-to-description gap. Desktop cards are 354.67 × 204.8 px. Phone cards are 358 × 202 px.
- Surface: white, 20 px card radius, `0 1px 20px rgba(0,0,0,.03)` shadow. Benefits icon tiles use #e1eaf8 with blue #126dfb icons and the measured three-layer blue shadow.
- Card heading font: Inter 500, desktop artwork 24/28.8 px, tablet artwork 22/26.4 px, phone artwork 20/24 px. Benefits headings are 20/28 px desktop/tablet, 18/25.2 px phone. Body copy is 16/22.4 px with -0.64 px tracking.

## Original assets

| Use | Local original basename |
| --- | --- |
| Unified Metrics | `BRSjH0Nr0mYv6ao9UQgjwj3sf8.png` |
| AI Growth Insights | `IrgbGxlBw9j0VnFsoN84bF7Qw.png` |
| Product Usage Tracking | `BlxvFtjF6HHOuUm3WqI7WQNctcI.png` |
| Feature Impact Analysis | `OtckK1J9Su0WnwNjL4XShdCwGyU.png` |
| Connect your product | `re0e4xU4NeTiWazszrTlTzNM.png` |
| Analyze User Behavior | `4C5ZcoR1Cxc0a6xgOHF6YKNpE2c.png` |
| Optimize & Grow | `TBHutRBrfMXOrSyiORiY7ifBQ.png` |

Six benefit SVG paths were extracted from the rendered public SVG icons. Dashboard layering and blur are already included in the supplied original PNGs, so no extra mockup artwork or generated substitute is used. The original PNGs are archived locally, while rendered cards use the source's 512 px and 1024 px renditions, stored with `-512.png` and `-1024.png` suffixes. This matches the source's responsive image color treatment and sharpness.

## Motion and states

- Cards and headings enter from below on viewport intersection. The live source exposes a 60 px initial translation and staggered progression between cards; it settles to no transform. The implementation consumes the site's shared `Reveal` component, whose global timing is owned by the main implementation.
- Integration artwork uses 36 logos, composed from 9 original SVG assets repeated four times. Each moves on the same measured CSS `offset-path` spiral, evenly separated by 2.7778% path distance. Tangential rotation uses `offset-rotate: auto`.
- Two timestamped samples of the reference progressed from 56.9045% to 77.5736% in 20.915 seconds, supporting a 100-second linear cycle. The reference fades each logo in over the first 10% and out over the last 10% of the path.
- The artwork uses a radial mask: `radial-gradient(43% 54% at 46.5% 45.2%, transparent 10.1967%, rgba(0,0,0,.84) 70%, transparent 100%)`.
- Desktop path field is 140% of the panel width, 1545.59 × 1712.2 px at the inspected viewport, centered in the panel. Tablet width is 150%, yielding 1119 × 1512 px. Phone path field is 220% wide, 787.59 × 1181.59 px. Field height is always 140vh. Its measured path remains circular within the taller field. Phone logo tiles scale to 60%, corroborated by the source's inner transform.
- `IntegrationOrbit` scales those path coordinates with a `ResizeObserver`. It uses CSS animation instead of the Framer runtime. Reduced-motion users receive a static spread of logos along the same path.
- The only interactive control inside these sections is the integration CTA, which retains the reference template remix destination. Decorative logos have empty alternative text and cannot intercept pointer events.

## Verification ledger

- Passed `npm run typecheck --workspace=@framer-templates/alytics` after implementation.
- Passed `npm run audit:assets --workspace=@framer-templates/alytics`: 31 references, 114 bundled files.
- Reference desktop, tablet, and phone DOM geometry was sampled. Initial, in-flight, and settled source reveal states were observed; continuous spiral movement was sampled at different times and viewports.
- Local section geometry checked after main-page integration at all three viewports. All four section heights match the sampled reference within 0.1 px. The card dimensions also match within 0.1 px. Desktop feature anchor alignment in final screenshots differs by 0.41 px.
- Final local heights, ordered Features / Benefits / How It Works / Integrations: desktop 1347.859 / 909.781 / 867.281 / 750 px; tablet 1068.938 / 923.375 / 1228.664 / 710 px; phone 1676.391 / 1666.539 / 1534.492 / 670 px.
- Matched viewport screenshots: `.codex-evidence/alytics/features-desktop-local.png`, `features-phone-local.png`, `integrations-tablet-local.png`, `integrations-phone-local.png`; corresponding source screenshots are in `.codex-evidence/alytics/reference/` with the `-local` suffix omitted. Earlier tablet feature captures predate the final 12 px spacing correction.
- Local responsive feature images were confirmed decoded. The two extra scout browser tabs were closed after clearing viewport overrides; main-agent reference and production tabs are separate.
- No exact-fidelity percentage is asserted. Source and local integration phase differ because their page clocks are independent.

## Known fidelity boundaries

- Shared heading/reveal behavior and overall page placement depend on the integrated shell. The source's card entrance uses staggered 60 px reveals; any difference in the shared `Reveal` implementation remains a shared motion delta.
- Continuous motion starts with the local page rather than synchronizing to an unrelated remote page clock. Comparisons must align path phase or compare structural geometry independently.
