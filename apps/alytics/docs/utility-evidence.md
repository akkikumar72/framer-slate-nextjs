# Alytics utility pages

## Scope and source

- `/alytics/newsletter` reproduces `https://alytics.framer.website/newsletter`.
- The shared `NotFoundContent` component reproduces `https://alytics.framer.website/404`.
- `https://alytics.framer.website/__alytics_missing_probe_92818` was opened and confirmed to render the same custom 404 content and shared shell.
- Source HTML is retained under `.codex-evidence/alytics/reference/`. Newsletter and 404 desktop, tablet and phone screenshots are saved there as `{newsletter,404}-{desktop,tablet,phone}.png`.

## Capability profile

| Section | Capabilities | Risk | Evidence |
| --- | --- | --- | --- |
| Newsletter introduction | Centered type, badge, responsive wrapping | Medium | Rendered desktop, tablet and phone geometry |
| Newsletter form | Required name/email, field focus, validation, submission | High | Required input attributes, rendered form and labels; original valid submission deliberately not invoked |
| Envelope | Original transparent artwork, timed floating/rotation, hidden on phone | Medium | Position changed with elapsed time and no scrolling; phone variant removes it |
| 404 | Viewport-height centered content, responsive type, home navigation | Low | `/404` and guaranteed missing URL agree |
| Shared header/footer/badges | Fixed navigation, responsive menu/footer, fixed external badges | High | Owned and integrated by the main agent; geometry sent back for shared-shell correction |

## Measured reference geometry

All dimensions are CSS pixels after fonts and page content have rendered. The header is fixed and does not precede the main section in document flow.

| Landmark | 1474 × 1223 desktop | 810 × 1080 tablet | 390 × 844 phone |
| --- | --- | --- | --- |
| Newsletter section padding | 160px 0 100px | 140px 0 80px | 120px 0 60px |
| Newsletter section height | 858 | 790.8125 | 779.1953 |
| Inner content width | 1104 | 746 | 358 |
| Badge top / height | 160 / 34.2031 | 140 / 34.2031 | 120 / 34.2031 |
| Newsletter heading top / height | 210.2031 / 153.5938 | 190.2031 / 134.4063 | 164.2031 / 158.3906 |
| Heading font / line height | 64 / 76.8 | 56 / 67.2 | 44 / 52.8 |
| Description max width | 320 | 320 | 270 |
| Intro-to-form gap | 56 | 48 | 40 |
| Form x / y / width / height | 487 / 474.5938 / 500 / 283.4063 | 155 / 427.4063 / 500 / 283.4063 | 16 / 435.7891 / 358 / 283.4063 |
| Input outer height | 54.3984 | 54.3984 | 54.3984 |
| Footer height | 326.3906 | 322.3906 | 858.5859 |
| Newsletter page height | 1223 | 1113 | 1638 |
| 404 section height | 1223 | 1080 | 844 |
| 404 heading top | 546.6016 | 479.8984 | 369.1016 |
| 404 content group height | 189.7969 | 180.2031 | 165.7969 |
| 404 page height | 1549 | 1402 | 1703 |

At tall desktop heights, the newsletter's flex main grows to keep its footer against the viewport bottom. The 404 hero itself always occupies at least one viewport height, followed by the footer.

## Styling and assets

- Inter: heading weight 500, letter spacing -0.05em; body weight 500, 16px/22.4px, letter spacing -0.04em.
- Badge: background `#e1eaf8`, inset 1px outline `#126dfb`, padding 8px 12px, radius 12px, 14px/18.2px text.
- Form: 500px max width, padding 20px, gap 20px, white background, 20px corners, `0 1px 20px #00000008` shadow.
- Inputs: `#fcfcfc`, inset 1.5px `#e4e4e4` outline, 12px corners, 16px padding. Labels have a 10px label-to-input gap.
- Envelope: `/alytics/OXyYHX9MW2fCN7IDYfVvNCAqUX0.png`, original publicly served image, approximately 84px wide before rotation.

## Functional replacement and intentional limitations

The newsletter form validates required name and email locally. Empty or malformed fields receive visible text, `aria-invalid`, associated error descriptions, and focus on the first invalid field. Successful local validation announces: “Preview complete. Your details were validated locally. No subscription was created.” Editing a field clears its error and the previous result.

No form data is stored or transmitted. A real subscription requires a separately configured mailing-list provider endpoint and deployment configuration. The original provider's successful submission was not tested because that would create an external subscription. The local confirmation is an explicit functional deviation.

The floating envelope uses two independent layers: a seven-second rotation cycle from 1 to 16 degrees, and a five-second vertical cycle from 0 to 15px. These periods and extrema were measured from 101 reference transform samples over 10.1 seconds; samples are saved in `newsletter-envelope-motion.json`. The outer frame also preserves the source's half-height translation and desktop/tablet anchor offsets. CSS ease-in-out approximates Framer's easing, so exact intermediate-frame parity remains unclaimed. Reduced motion disables both cycles.

## Verification status

Reference screenshots and three-viewport measurements are complete. The parent agent owns route wrappers, shared shell, HTTP status contracts and production build verification.

### Development preview checks

`npm run typecheck --workspace=@framer-templates/alytics` passed. The real Chrome preview was inspected at the three target viewports, with separate reference and local tabs.

| Owned landmark | Desktop local | Tablet local | Phone local | Largest reference delta |
| --- | --- | --- | --- | --- |
| Newsletter section height | 857.9766 | 790.7734 | 779.1719 | 0.0391px |
| Newsletter heading y | 210.1953 | 190.1953 | 164.1953 | 0.0078px |
| Newsletter form y | 474.5859 | 427.3828 | 435.7813 | 0.0234px |
| Newsletter form height | 283.3906 | 283.3906 | 283.3906 | 0.0157px |
| 404 section height | 1223 | 1080 | 844 | 0px |
| 404 heading y | 546.6016 | 479.8984 | 369.1016 | 0px |

Newsletter heading and description use the source's balanced wrapping; the 404 description preserves the source's ordinary wrapping. Both source and local use the original Inter feature settings supplied by the shared styles. Measurements do not imply pixel-perfect motion or shared-shell parity.

The development footer initially measured approximately 62.5px too tall on phone. Exact child-block differences were sent to the main agent for shared correction: 20px group gaps, 18px/25.2px column headings with 12px bottom spacing, 16px/22.4px footer credits with a 10px gap, and removal of the brand-link inline baseline gap. Shared-shell final measurements belong to the integration audit.

Observed functional checks:

1. Empty Submit shows both required errors and focuses Name.
2. A valid name and invalid email leave only the email error and focus Email.
3. A valid email submitted with Enter displays the explicit local-preview status. The network event trace contained only local development/HMR GET requests, with no POST or external transmission.
4. Editing a field clears its error and any previous success status. Field names remain exactly Name and Email when errors are displayed.
5. A guaranteed-missing local path renders 404, and the recovery link navigates to `/alytics`.
6. Emulated `prefers-reduced-motion: reduce` changes both envelope animation names to `none`; the temporary media override was then cleared.

Local development screenshots are saved under `.codex-evidence/alytics/local/` as `newsletter-{desktop,tablet,phone}-dev.png`, `newsletter-validation-dev.png`, and `404-desktop-dev.png`. Some include Next.js development tooling. Final production screenshots and HTTP metadata/status checks must be taken after the parent completes the shared integration build.
