# B2bizz acceptance record

Verified against the published Framer reference on 2026-10-20.

## Coverage

- 28 valid local routes and five invalid-route probes pass the shared route verifier.
- Desktop, tablet, and phone variants are implemented at the measured 1200px and 810px breakpoints.
- Service, case-study, and blog index/detail families use local typed content and generated static routes.
- Shared navigation, menus, accordions, pricing switches, sliders, pagination, local forms, newsletter feedback, video, interactive method steps, and custom 404 behavior are functional.
- 195 bundled files support the localized visual and media implementation under `public/b2bizz/assets`.
- Framer promotional badges are omitted from the rebuilt footer and page overlays.

## Verification

- `npm run check --workspace=@nextjs-templates/b2bizz`
- `npm run build --workspace=@nextjs-templates/b2bizz`
- `npm run test:routes --workspace=@nextjs-templates/b2bizz`
- `npx playwright test tests/template-smoke.spec.ts --grep B2bizz`
- `npm run typecheck:browser`
- Representative reference/local comparisons at 1291×918, 810×1080, and 390×844.

## Intentional differences

- Forms provide validated local success states and transmit no data because no approved backend was supplied.
- Framer's proprietary runtime is not copied. Reveal easing and autoplay timing are maintainable CSS and browser-native equivalents.
- The malformed published placeholder link `/case-study/:siEI_kNmH` is replaced by valid published case-study routes.
- The authenticated Framer project tree was not accessed. The published sitemap, route output, assets, metadata, and rendered behavior are the evidence source.
