# Orbital

Standalone Next.js 16 / React 19 reconstruction of the [Orbital template](https://orbital-gr8r.framer.website/) under `/orbital`.

```sh
npm run dev --workspace=@framer-templates/orbital
```

Open [localhost:3014/orbital](http://localhost:3014/orbital). The showcase also exposes `/orbital` and redirects to this workspace. Configure `NEXT_PUBLIC_ORBITAL_URL` in the showcase when hosting the apps separately. Set `NEXT_PUBLIC_SITE_URL` in Orbital to its deployed origin for canonical URLs. No deployment was performed.

## Pages and ownership

All 16 published pages are covered: homepage, About, Contact, blog index, nine articles, two legal pages, and the custom 404. The official Framer project inventory corroborates the sitemap. Its additional blank CMS child has neither a slug nor a published page and is not a route.

- [Route manifest](docs/route-manifest.json)
- [Project/CMS discovery](docs/project-discovery.md)
- [Capability profile](docs/capability-profile.json)
- [Homepage evidence](docs/home-evidence.md)
- [Blog evidence](docs/blog-evidence.md)
- [Company-page evidence](docs/company-evidence.md)
- [Acceptance and limitations](docs/validation.md)
- [Responsive browser audit](docs/responsive-audit.json)

Shared navigation, mobile menu, CTA, footer, buttons, FAQ, reveal, and counter components live in `components/shared.tsx`. Blog metadata and rich text use a typed data family in `lib/blog.ts`. Fonts, original image panels, vectors, logos, and decorations are local; the app does not load the Framer runtime. Asset origins are recorded in `docs/asset-map.json`.

## Checks

```sh
npm run check --workspace=@framer-templates/orbital
npm run build --workspace=@framer-templates/orbital
npm run test:routes --workspace=@framer-templates/orbital
```

The route validator checks 15 content pages and four real 404 responses, including an unknown article and legal path. The repository browser smoke contract exercises a use-case tab and an FAQ disclosure. Interactions also support keyboard navigation and reduced motion.

## Template content and service boundary

The source repeats the same article body for all nine articles and repeats the Monitor principle three times. Its placeholder contact topic choices are Amsterdam and Barcelona. These are preserved. The footer's source icon artwork does not correspond to its social destinations; original icons and destination choices are retained, with accessible labels naming the destination.

The contact form validates fields locally. Submitting valid data explicitly reports that the preview is not connected and that no message was sent. It does not post to Framer or a fabricated backend. Connect an application-owned delivery endpoint before using the form publicly.

Use-case counters reset to the values authored in the Framer project (38+, 9h, 64%, 5x). This corrects a source client state issue where tab changes can retain the preceding metric. Page-specific titles and local canonical metadata are supplied for each route.

The supplied template copy includes product, pricing, performance, and legal claims. They are reproduced as template content and are not independently verified business claims. The visible Framer badge is removed at the user's request. This reconstruction adds no new licensing rights to the original template assets.
