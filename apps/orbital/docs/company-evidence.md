# Orbital company-page evidence

Reference pages inspected on 2026-09-14 at the shared desktop viewport:

- `https://orbital-gr8r.framer.website/about`
- `https://orbital-gr8r.framer.website/contact`
- `https://orbital-gr8r.framer.website/legal/privacy-policy`
- `https://orbital-gr8r.framer.website/legal/terms-conditions`

Local evidence sources: `/tmp/orbital-reference/about.html`, `about.json`, `contact.html`, `contact.json`, `legal--privacy-policy.html`, `legal--privacy-policy.json`, `legal--terms-conditions.html`, `legal--terms-conditions.json`, and `faq.json`.

## Observed contracts

- About: bordered hero, four metrics, story split layout with a centered 2:1 team image, six principle cells with the four published SVG icon treatments, four-person leadership carousel, and FAQ numbered `04`.
- The source contains three identical `Monitor` principles. They are preserved as published.
- Contact: FAQ numbered `08`; centered 808px form; paired name and company rows; required native inputs; source select values `Select…`, `Amsterdam`, and `Barcelona`.
- The local contact form intentionally performs no network request. It reports that the preview is not connected and the message was not sent.
- Legal: centered 800px reading column, published headings and paragraphs, `Last Updated: August 21, 2026`, and `tanjimislam27@gmail.com` preserved verbatim.
- Shared header, CTA, footer, divider treatment, and FAQ behavior are supplied by the parent-owned Orbital layout and shared components.

## Responsive implementation

- Desktop uses the published multi-column compositions.
- Below 810px, story, principle, and contact form grids stack; leadership becomes a horizontal track; legal copy retains readable line lengths.
- Heading sizes follow the supplied Orbital contract: 48px desktop H1, 36px tablet, 32px phone; section headings 36px desktop, 30px tablet, 28px phone.

## Confirmed local UI checks

- Contact empty-submit validation found six invalid required controls: first name, last name, email, company, location, and message. Native validation moved focus to the first-name field, and no submission status was displayed.
- Contact valid-submit validation used `Ada`, `Lovelace`, `ada@example.com`, `Analytical Engines`, `Amsterdam`, and a message. It produced zero invalid controls and displayed the exact local status: `This preview form is not connected, so your message was not sent.`
- The valid-submit check did not send the form to the reference site or make a delivery request.
- Type checking, the Orbital asset audit, and `git diff --check` passed after implementation. The final changes following type checking were CSS-only refinements.

## Desktop geometry evidence

The About reference was measured at a 2839 × 1254 viewport. Its document height was 4716px. The main vertical regions were hero 494px at y=0 (including header context), story 1066px at y=494, platform 778px at y=1560, team 756px at y=2337, and FAQ 734px at y=3093. The source story image measured 984 × 513px, a principle card measured 432 × 212px, and a leadership portrait measured 300 × 300px.

The refined local About document measured 4696px tall. Its main regions were hero 418px at y=76, story 1029px at y=541, principles 735px at y=1617, leadership 695px at y=2399, and FAQ 738px at y=3094. The local story content and reference story content both began at y=541, and the local FAQ boundary was within 1px of the reference before the last small card refinements.

The Contact reference form measured 808px wide and began at y=402, with a 525px height. The reference used a 65px gap after the intro, a 60px gap after the form content, and 100px bottom padding.

## Screenshots and remaining verification

- [About source desktop](./evidence/about-source-desktop.png)
- [About local desktop, pre-refinement](./evidence/about-local-desktop-pre-refinement.png). This capture predates the final geometry refinements and must not be treated as the final visual state.
- Phone carousel keyboard and control behavior remains unverified.
- Horizontal overflow on About and both legal pages at 390px and 810px remains unverified.

## Final parent verification

At 390px, the leadership Next control scrolled the track to the next member. Pressing Enter on Previous returned it to scrollLeft 0 and correctly disabled Previous. About, Contact, Privacy Policy, and Terms & Conditions had no horizontal overflow or failed loaded images at 390px and 810px. The carousel respects reduced motion when programmatically scrolling.

## Fidelity audit v2

The saved Framer CSS and fresh route captures were audited again at the shared breakpoints. Values below come from freshly navigated route captures in `/tmp/orbital-audit-v2`, not from resized stale Framer variants.

- About source hero: 1360px desktop frame, 823px text column, 70px top inset, 26px text-to-metrics gap, 64px metric gap, 714px paragraph maximum, and the published line artwork at 320px desktop, 148px tablet, and 62px phone. The localized artwork is now present.
- About source phone: 76px page offset, 530.39px hero frame, 218px equal-row metrics grid with 32px counters, and 47px dotted separators. The principles use non-layout-consuming inset borders so six 236px cards plus five 16px gaps produce the measured 1496px grid.
- About source desktop story columns are capped at 512px and 605px. The desktop leadership track is 1248px wide with four 300px cards and 16px gaps.
- Contact source desktop measured 1027.39px for the route frame; the pre-final local capture measured 1026.59px. Source form top was 402.19px versus 401.59px locally, and source intro top was 176.59px versus 178px locally.
- Contact source phone uses centered 326px intro and form columns, 16px gaps between stacked name/company fields, and no empty status row. The local status is hidden while empty and appears only with the truthful non-delivery message after valid submission.
- Legal source uses a 1360px inset-border frame with 160px/100px desktop, 130px/80px tablet, and 120px/60px phone padding. Its inner column is 800px desktop and the available 326px phone width, with 20px/30px body copy, 30px/36px section headings, 40px paragraph-to-heading spacing, and 20px heading-to-paragraph spacing at every breakpoint.
- The pre-fix 390px legal capture exposed a 580px fixed content column at x=-95 and `scrollWidth: 485`. The corrected content uses `width: 100%; max-width: 800px`, which resolves to the source 326px phone column instead of overflowing.
- At 1280px, the source About story image uses a 984px wrapper with 20px horizontal padding, producing a 944 × 492.59px visible image. The local implementation now uses the same wrapper instead of a fixed 984 × 513px tablet image.
- At 1280px, source story columns remain capped at 512px and 605px and are centered with a 20px gap. Source principle cards measure 590 × 212px in two columns. Source leadership cards remain 300px wide with 16px gaps inside a 410px overflow track. These structures are now preserved rather than shrinking cards to fit four columns.
- At 1280px, the Contact source H1 uses the full 570px intro width and one line. Removing the local intro's 20px internal padding and using the source 12px heading gap removes the extra line and approximately 33px of route height.
- The 1280px source and local legal captures both measured 3418px after the responsive legal correction.
- The source About H1 contains an explicit `<br>` after “runtime” at every responsive variant. The local heading now preserves that published break, producing the source's two 35.2px tablet lines without width or height compensation.
