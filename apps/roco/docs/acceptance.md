# Roco Next.js portfolio

Updated 23 September 2026. Local implementation, not deployed.

- Preview: http://localhost:3019/roco
- Gallery: http://localhost:3000
- Workspace: `@nextjs-templates/roco`
- Routes: 55 content pages, including 47 project details, plus a custom 404.

The portfolio uses Next.js branding throughout its components, toolkit, descriptions, metadata, project URLs, asset names, and local documentation. Promotional floating badges are removed. Project actions lead to the local collection and the Next.js website. Toolkit links point to their respective products, and the email contact uses a mail link.

Project and legal pages are data-driven. The responsive sidebar, mobile menu, local fonts/images, intersection reveals, testimonial ticker, and reduced-motion support remain available. See [route-manifest.json](route-manifest.json) and [asset-inventory.json](asset-inventory.json) for the complete inventory.

## Validation

Full repository verification passed, including TypeScript, production builds, local asset checks, HTTP routes, and 47 Chromium tests. The added Roco gallery regression also passed separately; CI now runs all 48 browser tests together. A scan of all 55 production HTML responses also passed with no previous platform branding. Browser coverage includes all 55 pages at desktop, tablet, and phone widths, project navigation, mobile menus, missing routes, and contact validation.

```sh
npm run verify
npm run typecheck:browser
npx playwright test tests/roco.spec.ts --grep 'Showcase exposes Roco'
```

Current UI captures are saved in `docs/evidence/`; the gallery uses the real 1440 × 1000 desktop capture at `apps/showcase/public/templates/roco-gallery.png`. [Gallery review](evidence/gallery-review.png) highlights the first-position card and its route count. The card opens `/roco`; gallery redirects preserve project detail paths.

## Contact and deployment

Set `ROCO_CONTACT_ENDPOINT` to a server-side provider accepting JSON `{ name, email, message }` to enable contact delivery. Without configuration the API returns 503 and the form shows an explicit unavailable message. No external test message is sent.

Set `NEXT_PUBLIC_SITE_URL` before the production build for canonical metadata. Set `NEXT_PUBLIC_ROCO_URL` in Showcase to the deployed gallery destination. Start locally with `npm run dev --workspace=@nextjs-templates/roco` or use `npm run start --workspace=@nextjs-templates/roco` after building.
