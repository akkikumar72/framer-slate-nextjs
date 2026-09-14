# Alytics blog family

## Scope and source

The published sitemap and project page tree identify `/blog` and four article slugs. All five are implemented under `/alytics/blog` using one article template and four content records in `components/blog/data.ts`.

- `streamlining-saas-operations-without-adding-overhead`, Operations, 5 min read, five sections.
- `growing-a-saas-without-breaking-your-systems`, Growth, 3 min read, five sections.
- `designing-saas-workflows-that-actually-scale`, Workflows, 7 min read, five sections.
- `the-real-cost-of-manual-saas-work`, Automation, 2 min read, four sections.

All titles, descriptions, body copy, reading times, categories, image alt text and original metadata were extracted from downloaded published HTML. No author or publication date is exposed by the source, so none is invented. All original article images and the social image are local. Related collections exclude the current article and keep source collection order.

## Captured reference evidence

`.codex-evidence/alytics/reference/blog-{desktop,tablet,phone}.png` and `article-{desktop,tablet,phone}.png` capture the full blog index and representative Operations article. Browser viewport dimensions were set per tab through CDP and confirmed against `innerWidth/innerHeight`.

| Probe | 1474 × 1223 | 810 × 1080 | 390 × 844 |
| --- | --- | --- | --- |
| Blog page height | 1720 | 2059 | 2953 |
| Blog top badge y | 160 | 140 | 120 |
| Blog H1 size / line height | 64 / 76.8 | 56 / 67.2 | 44 / 52.8 |
| Blog featured top y | 474.61 | 427.42 | 423.41 |
| Blog collection width | 1104 | 746 | 358 |
| Blog card columns | 3 | 2 | 1 |
| Featured card height | 400 | 400 | 381.81 |
| Article page height | 3005 | 3239 | 4284 |
| Article content width | 760 | 746 | 358 |
| Article top toolbar y | 160 | 140 | 120 |
| Article image top y | 521.02 | 473.83 | 492.22 |
| Article image height | 450 | 450 | 350 |
| Article intro top y | 1027.02 | 971.83 | 882.22 |
| Related heading y | 2070.33 | 1939.13 | 2087.19 |

The featured index article switches to the normal vertical card below 810px. Cards have a 225px cover image and 2-line truncated summary. Badges overlay the upper right corner for regular cards. The desktop featured article keeps its badge in the content column, shows its reading time at the bottom, and clips its description to two lines. Reading time disappears with the mobile featured-card variant.

## Shared contracts

`components/blog/index.tsx` exports `BlogCard`, `BlogCards({ excludeSlug?, limit?, className? })`, `FeaturedArticle`, `BlogPreview`, `CategoryBadge`, `RelatedArticles`, `articles` and `blogDescription`.

`BlogPreview` has no section or heading wrapper. It renders the first featured article, the remaining three articles, and a centered View all button for composition into the homepage. Header, footer, promotional badges, shared Button, local fonts and global container are owned by the parent integration.

All links use `/alytics` paths. The back control is a deterministic link to the blog index. The four valid articles are generated statically and unknown slugs invoke `notFound()`.

## Verification and limits

Source content records and all four local article-image paths have been checked. Final browser comparisons and build checks are recorded below when the integrated server is available. Source hover was exercised on both the featured and regular cards. The image wrapper settles at scale(1.08), and the card shadow stays unchanged. Local cards reproduce the 1.08 zoom, clipping and unchanged shadow with reduced-motion support. Exact source hover timing has not been measured; no exact motion timing parity is claimed.

### Integrated browser verification

- `/alytics/blog` and every one of the four article paths were opened in the local browser.
- Every article displays the correct title and 5/5/5/4 body sections, its canonical URL, four fully loaded local images, and three related links excluding itself.
- The Back link returned to `/alytics/blog`. `/alytics/blog/__missing-article-audit__` rendered the shared custom 404.
- No horizontal overflow was found at 390px.
- Desktop index total height is 1720px, matching the 1720px reference. Featured/card geometry differs by less than 0.2px from the reference after correcting the badge-to-title gap to 16px.
- Representative article desktop height is 3004px versus 3005px reference. Article image and body/related landmarks differ by less than 0.7px across all three viewports, attributable to fractional line-height rounding.
- Tablet index/article total heights had approximately 4px of shared-footer difference. Phone content matches within 0.7px; the shared footer was 61.9px taller than the reference and was reported to the parent integration for correction. The reference mobile footer is 858.719px high with padding `48px 16px 20px` and an inner content width of 348px at the 390px viewport.
- The observed Next.js smooth-scroll warning was reported to the parent: root `<html>` should have `data-scroll-behavior="smooth"`.
- Workspace TypeScript checking passed. Asset audit reported interpolated `stem` paths in a shared image helper; all blog-family assets were separately verified in the rendered browser. The parent owns the final shared-helper audit, production build and production-preview recheck.

Paired same-viewport screenshots are in `.codex-evidence/alytics/reference/`:

| Family | Reference | Local |
| --- | --- | --- |
| Index, desktop | `blog-desktop.png` | `blog-local-desktop.png` |
| Index, tablet | `blog-tablet.png` | `blog-local-tablet.png` |
| Index, phone | `blog-phone.png` | `blog-local-phone.png` |
| Article, desktop | `article-desktop.png` | `article-local-desktop.png` |
| Article, tablet | `article-tablet.png` | `article-local-tablet.png` |
| Article, phone | `article-phone.png` | `article-local-phone.png` |

The phone captures predate the final shared-footer correction; final verification should refresh them after integration. This is a measured geometry result, not a blanket assertion of exact pixel or motion parity.
