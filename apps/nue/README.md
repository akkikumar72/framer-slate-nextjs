# Nue

A standalone Next.js portfolio with five content pages, a custom 404, local assets, and responsive spring animations. Original portfolio design by Aathif Thajudeen.

## Preview

```sh
npm run dev --workspace=@nextjs-templates/nue
```

Open [Nue](http://localhost:3016/nue). The Showcase redirects `/nue` and nested paths to this app. Set `NEXT_PUBLIC_NUE_URL` in the Showcase environment when hosting elsewhere and `NEXT_PUBLIC_SITE_URL` in Nue for canonical metadata.

## Pages

- [Portfolio](http://localhost:3016/nue)
- [Greenora](http://localhost:3016/nue/projects/greenora)
- [Clarity Path](http://localhost:3016/nue/projects/clarity-path)
- [Paul Interior](http://localhost:3016/nue/projects/paul-interior)
- [Umbrella](http://localhost:3016/nue/projects/umbrella)

Unknown paths, including `/nue/404`, render the custom not-found page with HTTP 404.

## Structure and behavior

- `app/nue/page.tsx` composes the portfolio sections.
- `app/nue/projects/[slug]` renders projects from `lib/projects.ts`. Project preview buttons open the local gallery.
- `components/ui.tsx`, `reveal.tsx`, and `shell.tsx` share sections, media, buttons, reveals, and the floating navigation.
- `components/home-sections.tsx` and `home-interactions.tsx` contain repeated sections, the three-slide carousel, and FAQ disclosures.
- `public/nue/assets` contains locally served images, icons, social preview, and fonts.

Spring entrances stagger the hero and project headers, then reveal content on scroll. Reduced motion exposes content immediately and stops active entrances. Keyboard focus also completes reveals. No-JavaScript styles keep pages readable.

The skills, descriptions, and metadata use Next.js wording. **Explore Next.js** links to the official documentation. Shared validation and TypeScript configuration are referenced by workspace-relative paths.

## Contact

The form validates name, email, and message fields, then prepares an email draft addressed to `nue@gmail.com`. The user selects **Open email draft** and sends from their email application. Configure a delivery service before using the template as a production contact inbox.

## Validation

```sh
npm run check --workspace=@nextjs-templates/nue
npm run build --workspace=@nextjs-templates/nue
npm run test:routes --workspace=@nextjs-templates/nue
npx playwright test tests/nue.spec.ts
```

See the [route manifest](docs/route-manifest.json), [asset inventory](docs/asset-inventory.json), [capability profile](docs/capability-profile.json), and [acceptance record](docs/acceptance.md).
