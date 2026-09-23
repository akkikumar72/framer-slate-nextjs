# GridFolio

A responsive Next.js portfolio integrated into the workspace Showcase.

- Preview: http://localhost:3017/gridfolio
- Showcase route: http://localhost:3000/GridFolio
- `/GridFolio` redirects to the canonical `/gridfolio` route.
- Includes Home, a custom 404, About, Resume, Contact, ChatAI, and Startup AI.

## Run and validate

```sh
npm run dev --workspace=@nextjs-templates/gridfolio
npm run check --workspace=@nextjs-templates/gridfolio
npm run build --workspace=@nextjs-templates/gridfolio
npm run test:routes --workspace=@nextjs-templates/gridfolio
npm run start --workspace=@nextjs-templates/gridfolio
npx playwright test tests/gridfolio.spec.ts
```

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to this app’s public origin before building so canonical and social metadata use the deployed URL. Set `NEXT_PUBLIC_GRIDFOLIO_URL` in Showcase to the full portfolio URL, including `/gridfolio`. Local development defaults to port 3017.

## Implementation

The portfolio uses React, CSS Modules, native dialogs, and local images and fonts. Profile panels share the dialog shell; both case studies use a shared component and typed content data. Shared repository validation tools and TypeScript settings are referenced by relative path.

## Limitations

Contact validates locally and displays “Preview only. No message has been sent.” Configure a delivery backend for real enquiries. Resume download and project View controls have no configured destinations.

See the [route manifest](docs/route-manifest.json), [asset inventory](docs/asset-inventory.json), and [verification report](docs/acceptance.md).
