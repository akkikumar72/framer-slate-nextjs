# B2bizz route manifest

Source: `https://b2bizz-wbs.framer.website/sitemap.xml`, corroborated with published navigation, internal links, collection cards, canonical URLs, and a guaranteed-missing path on 2026-10-19.

Target viewports: 1291×918 desktop, 810×1080 tablet, and 390×844 phone. The live site changes variants at 1200px and 810px.

| Local path | Reference | Family | Kind | Risk | Confidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/b2bizz` | `/` | home | static | high | high | main | implemented |
| `/b2bizz/home-2` | `/home-2` | alternate home | static | high | high | main | implemented |
| `/b2bizz/about` | `/about` | marketing | static | medium | high | main | implemented |
| `/b2bizz/contact` | `/contact` | contact | static/form | high | high | main | implemented |
| `/b2bizz/service` | `/service` | services | index | high | high | services agent | implemented |
| `/b2bizz/service/[slug]` | `/service/[slug]` | services | CMS-like, 5 slugs | high | high | services agent | implemented |
| `/b2bizz/case-study` | `/case-study` | case studies | index | high | high | case-study agent | implemented |
| `/b2bizz/case-study/[slug]` | `/case-study/[slug]` | case studies | CMS-like, 7 slugs | high | high | case-study agent | implemented |
| `/b2bizz/blog` | `/blog` | editorial | index | medium | high | blog agent | implemented |
| `/b2bizz/blog/[slug]` | `/blog/[slug]` | editorial | CMS-like, 7 slugs | medium | high | blog agent | implemented |
| `/b2bizz/changelog` | `/changelog` | utility | static | low | high | main | implemented |
| `/b2bizz/legal-pages/privacy-policy` | `/legal-pages/privacy-policy` | utility | static | low | high | main | implemented |
| `/b2bizz/404` and missing paths | `/404` | not found | HTTP 404 | medium | high | main | implemented |

## Evidence notes

- The sitemap contains 29 URLs: 28 content routes plus `/404`.
- Service detail slugs: `b2b-website-design-development`, `custom-saas-solutions`, `crm-erp-integrations`, `enterprise-digital-strategy`, `data-driven-marketing`.
- Case-study detail slugs: `lead-generation-boost-for-a-b2b-logistics-company`, `scalable-saas-platform-for-a-fintech-startup`, `enterprise-resource-integration-for-a-manufacturing-firm`, `strategic-digital-shift-for-a-b2b-consulting-agency`, `saas-product-launch`, `digital-transformation-for-retail`, `website-redesign-for-a-non-profit`.
- Blog slugs: `how-to-scale-your-b2b-sales-funnel-in-2026`, `the-power-of-market-research-in-b2b-strategy`, `choosing-the-right-crm-for-your-b2b-sales-team`, `how-to-use-analytics-to-make-smarter-decisions`, `10-must-have-features-in-a-saas-platform`, `best-practices-for-keeping-your-data-secure`, `smart-automation-in-modern-manufacturing`.
- The live home contains a malformed placeholder link to `/case-study/:siEI_kNmH`; it is a publishing defect, not a content route, and is intentionally replaced with valid detail links.
- The Framer remix/project tree redirects to login and exposes no additional unauthenticated page evidence. No authentication or remix was attempted.
