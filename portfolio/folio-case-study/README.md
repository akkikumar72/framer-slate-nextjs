# Folio portfolio handoff

Prepared 25 September 2026 for the `akash-portfolio` repository.

This package replaces the portfolio's **first Akkivo gallery tile and its case-study dialog**. It follows the actual Akkivo content structure and image slots inspected at `http://localhost:3000/`. The portfolio repository has not been edited by this task.

## Use it

1. Give the portfolio agent `PROMPT.md` and this folder's path.
2. The agent copies six WebP images into `public/assets/`, adds `content/folio.ts`, and replaces the first Akkivo tile and case-study record.
3. Review the resulting tile and dialog before publishing.

`folio.ts` is ready to copy into the portfolio's `content/` directory. Its relative type import resolves there. `case-study.json` and `gallery-tile.json` contain the same content in a framework-neutral form. `CASE-STUDY.md` is the readable copy. No new image or UI dependency is needed.

## Asset library

| Asset | Placement | Size | Treatment |
| --- | --- | --- | --- |
| `assets/folio-thumbnail.webp` | First square grid tile | 1200 x 1200 | Cover artwork with a real desktop screenshot |
| `assets/folio-hero.webp` | Case-study hero | 1800 x 1000 | Wide desktop/mobile composition |
| `assets/folio-library.webp` | Lead screenshot | 1440 x 1100 | Full desktop capture |
| `assets/folio-discovery.webp` | The idea, left image | 1000 x 964 | SaaS category filtering |
| `assets/folio-pages.webp` | The idea, right image | 1000 x 964 | Expanded page directory |
| `assets/folio-mobile.webp` | The experience | 1440 x 1100 | Mobile library and navigation composition |

See `index.html` for a visual contact sheet and `manifest.json` for filenames, alt text, dimensions, file sizes, checksums, and source provenance. All images are local. The artwork uses actual UI captures, with presentation framing only. It does not invent interface states.

`raw/` contains five unaltered application captures and three rendered presentation PNGs. `source/boards.html` contains the editable cover/mobile layouts. The bundled Geist font is accompanied by its OFL license. To preview the library locally, from the Framer-to-Next.js repository run:

```sh
node portfolio/folio-case-study/source/serve.mjs
```

Then open `http://127.0.0.1:4317/`. The artwork routes are `source/boards.html?view=thumbnail`, `?view=hero`, and `?view=mobile`. Browser screenshots were exported at the exact canvas sizes above and encoded as WebP with the repository's existing Sharp installation.

## Content evidence

- Current application and capture source: `http://127.0.0.1:3200/` (local preview, not a publication link).
- Repository: `https://github.com/akkikumar72/framer-slate-nextjs`.
- Catalog facts: `apps/showcase/lib/templates.ts` and the 19 template route manifests. Recounted during this task: 19 templates, 284 content pages.
- Interactions: `apps/showcase/components/template-library.tsx`; real-browser captures of category filtering, page expansion, and the mobile drawer.
- Shader behavior: `apps/showcase/components/shader-backdrop.tsx` and `apps/showcase/app/globals.css`.
- Architecture and validation: root `README.md`, `package.json`, and `apps/showcase/docs/ui-audit.md`.

The original Framer designs remain the visual references for the rebuilt templates. This portfolio story presents the Next.js implementation and shared library, not original authorship of every template design. No public deployment, business result, client, testimonial, or automated conversion capability is asserted.

## Integration boundaries

Keep the first tile's existing position and square size. Keep the shared portfolio modal and its three-section pattern. Other Akkivo references in the biography/resume and its old assets remain untouched. The portfolio has many unrelated working-tree changes, which the implementation prompt explicitly preserves. Public content includes only the verified GitHub URL; it does not include development ports.

## Handoff validation

The six finished WebP files total 631.3 KiB. Their dimensions, checksums, and all image references were checked. `folio.ts` passes strict TypeScript checking against the portfolio's current `CaseStudyData` schema. Both source scripts pass Node syntax checks, and `git diff --check` passes. The standalone case-study preview was visually inspected at desktop width and 390px, including the mobile hero crop and complete stacked layout. All preview images loaded, and the 390px layout had no horizontal overflow. Integration checks for the actual portfolio remain part of `PROMPT.md`, since this handoff does not change that repository.
