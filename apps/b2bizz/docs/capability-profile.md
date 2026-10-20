# B2bizz capability profile

## Global

- Shared responsive header, pages dropdown, mobile overlay menu, CTA, footer, newsletter form, and social links without template attribution badges.
- Rendered Arial typography; near-black canvas; warm lime text, buttons, and line work; large rounded media frames.
- Breakpoint variants: desktop at 1200px+, tablet from 810px, phone below 810px.
- Public images, SVG, MP4 video, repeated CMS-like collections, and route metadata.

## Detected feature families

| Capability | Routes/sections | Risk | Confidence | Selected probes |
| --- | --- | --- | --- | --- |
| Flow and layered media | all routes | medium | high | geometry, crop, typography |
| Mobile menu and pages menu | all routes | high | high | state enumeration, keyboard, responsive |
| Timed/repeating ticker | home, home-2 | medium | high | initial/cycle/reduced-motion |
| Video cover | home, home-2, about, one service | high | high | autoplay, muted, loop, poster/aspect |
| Industry and case-study sliders | home, home-2 | high | high | previous/next, wraparound, responsive |
| Interactive method selector | home | medium | high | three pressed states, matching graph column and card, keyboard |
| Pricing state | home-2 | high | medium | active state, copy and amount |
| FAQ accordion | service, contact | high | high | every disclosure, keyboard |
| Contact/newsletter forms | contact/shared footer | high | high | required fields, local success state, no external submission |
| CMS-like detail families | service, case study, blog | high | high | representative full checks, every slug target check |
| Custom 404 | missing paths | medium | high | HTTP status, canonical, shared shell |

## Explicit limitations

- The Framer form backend is not copied. Forms use local validated success states and do not transmit data.
- Framer's generated runtime and proprietary component code are not shipped.
- The broken placeholder case-study URL in the reference is corrected to evidence-backed published routes.
