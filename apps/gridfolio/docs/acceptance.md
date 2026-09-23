# GridFolio verification

## Scope

Home, custom 404, all five portfolio overlays, mobile navigation, 18 grid tiles, and local assets are implemented.

| Route | Behavior |
| --- | --- |
| `/gridfolio` | Portfolio homepage, HTTP 200 |
| `/GridFolio` | Redirects to `/gridfolio` |
| `/` on port 3017 | Redirects to `/gridfolio` |
| `/gridfolio/404` and unknown paths | Custom not-found page, HTTP 404 |

About, Resume, Contact, ChatAI, and Startup AI use responsive native dialogs with keyboard dismissal, focus return, and scroll locking. Both case studies contain the full project narrative and review.

## Layout checks

| Viewport | Page height | Horizontal overflow |
| --- | ---: | --- |
| 1440 × 900 | 2872 px | None |
| 810 × 1080 | 3617 px | None |
| 390 × 844 | 6884 px | None |

The local asset inventory contains 42 files. Full repository verification passed on the isolated GridFolio branch: type checking, asset audits, production builds, route contracts, and all 44 browser tests, including six dedicated GridFolio tests.

## Branding update

Home and the 404 have no framework badge. Component names, CSS classes, workspace identity, app configuration, and current documentation use neutral or Next.js naming. See the [current preview capture](evidence/preview-nextjs.png).

Post-update validation passed: GridFolio type checking, asset audit, production build, route contracts, and browser hydration/interaction/404 smoke test. The Showcase type check also passed. The live Home and 404 HTML contain no previous platform branding; a case-insensitive scan of the GridFolio source and current documentation returned no matches.

## Service limitations

Contact validates locally without sending data. Resume download and project View controls have no configured destination. Dialog motion uses CSS transitions and supports reduced motion. The mobile 404 illustration scales to fit the viewport. Nothing was deployed.

## Gallery integration

The Showcase card and README catalog use a real 1440 × 900 screenshot of the current homepage. The card opens `/gridfolio` on port 3017 by default, with `NEXT_PUBLIC_GRIDFOLIO_URL` available for deployments. Both `/gridfolio` and `/GridFolio` also redirect from Showcase. See the [rendered gallery](evidence/gallery.png). The card thumbnail, destination, and redirects pass browser coverage.
