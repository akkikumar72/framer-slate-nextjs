# Replace the first Akkivo tile and case study with Folio

Work in the destination `akash-portfolio` checkout.

Use this prepared handoff package:
`portfolio/folio-case-study` inside the `framer-slate-nextjs` checkout. Resolve
its absolute path before copying files. If the repositories are siblings, this
is `../framer-slate-nextjs/portfolio/folio-case-study` from the portfolio root.

Implement the change now. This request is for the first gallery tile and its case-study dialog. Keep the portfolio's existing visual system, tile size, placement, dialog layout, intro motion, and other projects.

## Read first

1. Inspect `git status --short` and the current branch. The portfolio already contains substantial unrelated edits; preserve them.
2. Read `AGENTS.md`, `README.md`, `docs/EDITING.md`, and the relevant parts of `docs/ARCHITECTURE.md`.
3. Read this package's `README.md`, `folio.ts`, and `manifest.json`. Inspect the current `content/gallery.ts`, `content/case-studies.ts`, and `components/CaseStudy.module.css` before integrating.

## Implement

1. Copy the six `assets/folio-*.webp` files into the portfolio's `public/assets/`. Use local files, not links back to the other repository. Do not install an image library or add a runtime dependency.
2. Copy `folio.ts` to `content/folio.ts`. It exports `folio` in the existing `CaseStudyData` shape and a `folioGridTile`. Import `folio` in `content/case-studies.ts` and replace the `akkivo` case-study record with the `folio` record. Preserve the other records and the existing inferred `CaseStudyKind` type.
3. Import `folioGridTile` in `content/gallery.ts`. Replace only the existing first image entry whose `panel` is `"akkivo"` with `folioGridTile`, retaining its position. Do not add a second tile or use `wide: true`.
4. Use the supplied copy as the content source. Preserve the case-study's three-section structure: The idea, The experience, How it's built. Keep `review` and `reviewer` empty. Use the GitHub link; add a live-site link only if a real deployed URL is independently verified. Never publish localhost/127.0.0.1 links as the project's live URL.
5. Check references to `akkivo` before finalizing. This replacement does not remove Akkivo from Akash's biography, resume, or other unrelated content. Preserve the existing Akkivo images and other uncommitted work; deleting old files is unnecessary for this request. Update a test only if it specifically asserts the replaced tile or case-study name.

## Image placement

- Grid tile: `folio-thumbnail.webp`, square, 1200 x 1200.
- Dialog hero: `folio-hero.webp`, 1800 x 1000, `heroPosition: "left center"`.
- Lead image: `folio-library.webp`, the full desktop workspace.
- The idea: `folio-discovery.webp` and `folio-pages.webp` as a pair.
- The experience: `folio-mobile.webp` as a wide stacked image.
- How it's built: no image needed.

The images match the existing renderer: a 400px-tall hero, 332/319.23 paired images, and uncropped wide images. Check the hero on mobile too: the current renderer intentionally crops its sides. Do not globally change case-study styles to accommodate one image. If a Folio-specific crop adjustment is needed, use its `heroPosition` and inspect all relevant widths.

## Truth and scope

Folio is the showcase and library for independent Next.js rebuilds of existing Framer designs. The package's 19 templates and 284 content pages were counted from repository manifests on 25 September 2026. This is not a hosted automatic conversion tool, nor a claim that Akash originated every displayed template design. Do not invent client names, testimonials, adoption numbers, conversion rates, time savings, or performance improvements. Do not claim the template library syncs saved items across devices; bookmarks are browser-local. The copper background is original WebGL code, not a licensed Shaders.com preset.

## Verify and hand off

- Run `npm run typecheck` and `npm run audit:content`.
- Follow the portfolio's current AGENTS.md for any additional checks required by actual changes. Use `npm run build:preview` for a local production build. Do not rebuild under an unrelated running production server or terminate another project to free a port.
- Inspect the first tile and open the Folio dialog on desktop, at the 810px breakpoint, and at 390px. Verify image loading, square cover crop, hero crop, paired images, scrolling, close button, Escape, and focus restoration to the opening tile. Check reduced motion. Ensure the remaining project dialogs still open.
- Check `git diff --check` and report the changed files, exact checks run, and real screenshots.
- Keep changes local. This request does not authorize a commit, push, or deployment.
