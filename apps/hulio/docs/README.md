# Hulio implementation and verification

Hulio is available at [localhost:3013/hulio](http://localhost:3013/hulio). The showcase catalog includes a Hulio card and forwards `/hulio` to this independent workspace. `/Hulio` and `/Hulio/about` redirect to their lowercase canonical paths. Nothing was deployed.

## Route coverage

The published sitemap exposes **24 routes: 23 content pages and one custom 404**. All are implemented in [route-manifest.json](route-manifest.json). The Framer project editor redirected to login, so unpublished/private project pages were not discoverable.

| Family | Content routes |
| --- | --- |
| Home | `/hulio` |
| Inner pages | `/hulio/about`, `/hulio/team`, `/hulio/pricing`, `/hulio/contact`, `/hulio/privacy-policy` |
| Project collection | `/hulio/project` plus all six `/hulio/project-details/[slug]` entries |
| Article collection | `/hulio/blog` plus all nine `/hulio/blog-details/[slug]` entries |
| Not found | `/hulio/404`, missing pages and invalid collection slugs return HTTP 404 |

Navigation, article relationships, project relationships, footer links and template attribution use the observed public destinations. All internal content URLs are namespaced under `/hulio`.

## Implementation

- `app/hulio` contains the route family. Collection details use `generateStaticParams` and shared templates with distinct local rich content.
- `components/shared.tsx`, `shell.tsx`, and `motion.tsx` provide the header, footer, buttons, typography primitives, team cards, video poster, CTA, reveals and counters.
- `components/collections` owns collection cards, editorial bodies, sharing links and pagination. `components/inner` owns the contact form, FAQ and inner-page styles.
- Original public artwork and local fonts are bundled in `public/hulio`. [asset-inventory.json](asset-inventory.json) preserves source attribution. The runtime does not need Framer-hosted images, fonts or the Framer runtime.
- The existing npm workspace, validation scripts, showcase catalog and browser smoke-test dispatch include Hulio. Other template work in the checkout was preserved.

## Validation results

Final checks on 14 September 2026:

| Check | Result |
| --- | --- |
| Hulio TypeScript and asset audit | Passed: 125 source references, 126 bundled files |
| Hulio production build | Passed: all static collection entries generated |
| Hulio HTTP route contracts | Passed: 23 valid pages, 3 redirects, 4 invalid paths |
| Browser test TypeScript | Passed |
| Showcase TypeScript, asset audit and production build | Passed |
| All 24 published paths in desktop and phone browsers | Heading present, no horizontal overflow, no broken loaded images |
| Rendered internal links and images | Passed: 19 initial link targets and 100 unique image sources; pagination exposes additional valid detail routes |
| Console | No warnings/errors in the complete desktop route pass |
| Changed tracked files | `git diff --check` passed |

Browser validation used the production server and CUA. The repository Playwright test was extended for Hulio and typechecked; the Playwright CLI suite was not run. Browser interactions were exercised directly in the production UI.

### Behavior exercised

- Project Load More changes four cards to six; article Load More changes six to nine. Each control disappears when exhausted.
- All four testimonial positions, wraparound and previous navigation work. Phone dots have 32px hit targets. Autoplay pauses on hover/focus.
- Mobile menu opens, focuses its first link, closes on selection and restores toggle focus on Escape.
- All five FAQ states and keyboard activation work; opening one closes the previous answer and all answers can be collapsed.
- Required fields, malformed email, all five discovery options and valid local form submission were exercised. The status explicitly says the message has **not been sent**.
- Scrolling triggers reveals and counters. Reduced-motion emulation showed final counter values, zero hidden reveals and effectively disabled continuous animation; the emulation was reset afterward.
- The homepage hero uses the recovered word-by-word blur/rise spring, paragraph entrance and delayed button entrance. Desktop navigation rolls duplicated labels through a 20px clip with the recovered hover spring. [motion-verification.md](motion-verification.md) records the source settings and browser timing checks.
- Video is the observed outbound YouTube link. Social and template-attribution links remain outbound links.

## Visual evidence

Compared at **1440×900 / 1280×720 desktop**, **810×1080 tablet**, and **390×844 phone**. Evidence is saved locally in the ignored `.codex-evidence/hulio` directory. [evidence-index.md](evidence-index.md) links the captures and comparisons.

At 1440px, the measured homepage content sections through the moving CTA begin within 0.6px of the source. Whole-page height was **9734px reference / 9722px local** in the saved comparison, primarily from the footer. The saved phone homepage measured **13305px reference / 13357px local**. These are measured snapshots, not a fidelity percentage. The final small team-statistic and service-button corrections postdate the desktop full-page capture.

Representative collection heading, image, and article-body geometry matched within 0.032px at desktop; several tablet/phone rectangles matched exactly. Inner-page measurements and remaining differences are recorded in [collections-verification.md](collections-verification.md) and [inner-verification.md](inner-verification.md).

### Differences and limits

- The floating “Made in Framer” badge was removed at the user’s request. Earlier visual captures still show it.

- Exact parity is **not claimed**. Footer height, some phone spacing, icon color/cutout curves, input inset, native select rendering and policy list indentation still differ slightly. The scattered-image CTA and decorative hero lettering use maintainable approximations.
- The homepage hero and navigation use the recovered Framer spring settings through Motion for React. Other reveals, hover transitions, marquee speeds, counters and carousel timing reproduce observed behavior with CSS and React; their exact source spring settings were not recovered. Browser hydration and frame scheduling can shift entrance start times. Some older reference screenshots caught entrance phases, so those pairs support geometry/content inspection rather than a settled pixel-diff claim.
- The phone About source accidentally shows the pricing headline. The rebuild intentionally keeps the correct About headline at all widths.
- The contact form needs a delivery integration. It validates locally and does not send messages. No CMS editing interface or backend service was requested.
- Public template copy, including generic social destinations and policy wording, is retained. Private Framer project-tree coverage remains unavailable behind login.

## Run and verify

```sh
npm run dev --workspace=@framer-templates/hulio
npm run check --workspace=@framer-templates/hulio
npm run build --workspace=@framer-templates/hulio
npm run test:routes --workspace=@framer-templates/hulio
npm run start --workspace=@framer-templates/hulio
```

Use `NEXT_PUBLIC_HULIO_URL` to change the showcase destination, and `NEXT_PUBLIC_SITE_URL` when building Hulio for a different canonical origin. The local production preview runs on port 3013.

Final production spot checks confirmed the tablet related-article cards at315 /315 /660px, the third card spanning both columns,32px mobile carousel controls, and the showcase redirect to the live Hulio page. The settled home team statistic was corrected to the source value250+.
