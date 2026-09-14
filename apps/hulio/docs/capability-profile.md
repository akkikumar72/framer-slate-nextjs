# Hulio capability profile

Reference: https://hulio.framer.website/. Project editor redirected to Framer login, so private/unpublished page-tree coverage is unavailable. Public sitemap, robots, every listed HTML page, rendered navigation/footer, and missing-path response establish 24 routes. All are in scope. Local route prefix: /hulio. Independent Next.js workspace, port 3013. No deployment requested.

## Shared system

Satoshi display/body typography, black/white surfaces, electric blue accents and acid green ticker. Desktop content max width 1150px within a 1200px frame. Header is 92px tall at a 1474px viewport; logo 144x28. Desktop hero 70px/1.05 bold; secondary headings 48px/1.1. Header links, outline pill CTA, mobile disclosure navigation, rolling link hover, black footer with giant outlined wordmark and social links. Public images and fonts downloaded locally; original source mapping retained.

## Families and selected probes

| Family | Regions/capabilities | Risk | Probes |
| --- | --- | --- | --- |
| Home | Split image hero with cutout photograph, rotating decorative lettering, green ticker, black intro band, about/counter, video poster outbound YouTube link, client logos, load-more projects, service hover previews, team cards, testimonial slider, article cards, diagonal moving CTA, footer | High | section geometry, media crops, counter intersection, ticker time samples, slider manual/wrap, load more, hover, responsive layout |
| About | Centered title, three-image story, video, counters, six-member team, scattered-image CTA | High | geometry, responsive order, counters, CTA image layers |
| Team | Centered title, six-member grid, social hover links, CTA | Medium | card geometry, keyboard/social links, responsive grid |
| Project index/detail | Six project cards, load more, project hero, metadata, editorial project body/gallery, related projects | Medium | all slugs/assets/copy, card state, responsive geometry |
| Blog index/detail | Nine articles, pagination/load more, card metadata, editorial detail body, related posts | Medium | all slugs/assets/copy, pagination, responsive typography |
| Pricing | Three pricing plans with feature lists and contact CTAs | Medium | each CTA, responsive cards |
| Contact | Contact info, form controls, FAQ disclosures | High | form validation and truthful local status, all FAQ states, keyboard |
| Privacy | Full legal body | Low | copy and typography |
| 404 | Branded error artwork and home link, shared shell | Medium | explicit /404 and guaranteed missing paths return HTTP 404 |

## Classified behavior and limitations

Responsive boundaries are 810px and 1200px. FAQ permits one open answer and allows all closed. Collections expose four/six initial items and append the remaining items. Testimonials have four reachable states; the local five-second interval and transitions approximate the source timing. Native IntersectionObserver reveals/counters replace most Framer effects. The homepage hero and desktop navigation use recovered source spring settings through Motion for React, documented in motion-verification.md. Continuous ticker/seal/CTA motion and the hero/navigation have reduced-motion fallbacks. Other source spring parameters were not recovered. The contact form has no recovered delivery integration; local validation explicitly reports that the message was not sent. See README.md for final evidence and remaining visual deltas.

## Intentional adaptations

Namespace all internal routes under /hulio. Preserve public template content and links. Implement data-driven collections as local TypeScript content. Preserve template attribution/badges as outbound links without loading the Framer runtime. Use native reduced-motion fallbacks.
