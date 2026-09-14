# Alytics

Standalone Next.js implementation of the [Alytics template](https://alytics.framer.website/), integrated into the existing template showcase at `/alytics`.

```bash
npm run dev --workspace=@framer-templates/alytics
```

Open [Alytics locally](http://localhost:3015/alytics). The showcase's `/alytics` entry redirects to this independent workspace, following the repository's existing multi-app architecture.

## Pages

Seven content pages and the custom 404 are implemented:

- `/alytics`
- `/alytics/newsletter`
- `/alytics/blog`
- `/alytics/blog/streamlining-saas-operations-without-adding-overhead`
- `/alytics/blog/growing-a-saas-without-breaking-your-systems`
- `/alytics/blog/designing-saas-workflows-that-actually-scale`
- `/alytics/blog/the-real-cost-of-manual-saas-work`
- `/alytics/404`, also used for unknown routes and article slugs, with HTTP 404.

The [route manifest](docs/route-manifest.json) records evidence and validation. Discovery combined the accessible Framer project tree, published sitemap, navigation, collection links, and a guaranteed-missing-route probe. The project's Template Instructions canvas is an editor resource, not a published route.

## Implementation

- Shared header, responsive navigation, footer, buttons, typography, newsletter CTA.
- Data-driven article family with original text, local imagery, related articles, per-page metadata, and canonical URLs.
- Original locally bundled Inter fonts, illustrations, photographs, SVG logos and icons. No Framer runtime, remote visual requests, or image-generation replacements.
- React billing controls and independent FAQ disclosures; testimonial carousel, logo marquees, reveal transitions, floating artwork, and integration spiral animation.
- Keyboard controls, accessible field errors, missing-route recovery, and reduced-motion support.

Set `NEXT_PUBLIC_SITE_URL` to the deployment origin when building outside localhost. Set the showcase's `NEXT_PUBLIC_ALYTICS_URL` to the full public Alytics URL, including `/alytics`.

## Service and fidelity boundaries

The newsletter validates name and email locally, then explicitly states that no subscription was created. Connect a mailing service before using it to collect subscribers. No request or storage is performed by the form.

Template promotion badges and platform credit links have been removed at the user's request. Primary calls to action now lead to the local newsletter page; social and creator-credit links retain their external destinations. Marketing claims and the source's unusual yearly prices are preserved as template content. The article collection is maintained in `components/blog/data.ts`, without a live CMS connection.

Layout and source content are reproduced closely. Continuous animation phase is independent between the two sites. The homepage motion pass reproduces the measured spring settings, scroll thresholds, stagger, mirrored loops, pricing transitions, card hovers, and menu/carousel behavior. No exact-parity percentage is claimed. Nothing was deployed.

## Validation and evidence

```bash
npm run check --workspace=@framer-templates/alytics
npm run build --workspace=@framer-templates/alytics
npm run test:routes --workspace=@framer-templates/alytics
npx playwright test tests/alytics.spec.ts tests/alytics-motion.spec.ts
```

The production browser suite covers every content page at 1474, 810, and 390 pixels wide, checks loaded images and horizontal overflow, verifies all missing-route cases, and exercises pricing, FAQs, mobile menu, testimonial controls, and the newsletter form. Normal-motion checks additionally cover both envelopes at all three widths, once-only blog entrances, hover reversal, dashboard scroll tilt, rolling labels, FAQ transitions, reduced motion, and manual carousel dragging. It saves full-page production captures under `output/playwright/alytics/`.

Read [capabilities and acceptance](docs/acceptance.md), [section evidence](docs/sections-evidence.md), [blog evidence](docs/blog-evidence.md), and [utility evidence](docs/utility-evidence.md). Reference captures and measurements are retained under `.codex-evidence/alytics/`. `final-hero-desktop.png` and `final-hero-phone.png` are paired source/local hero captures; earlier intermediate captures are superseded.

The follow-up audit is recorded in [homepage motion](docs/home-motion-evidence.md), [section motion](docs/sections-motion-evidence.md), [blog motion](docs/blog-motion-evidence.md), and [newsletter motion](docs/newsletter-motion-evidence.md).
