# Framer templates Turborepo

Nine standalone Next.js template applications and a lightweight showcase live
in one npm-workspaces Turborepo. Each template owns its routes, components,
assets, metadata, validation contract, and deployment boundary.

![Template workspace showcase](output/playwright/landing-pages/showcase.png)

## Workspace map

| Application | Workspace | Port | Standalone routes |
| --- | --- | ---: | --- |
| Showcase | `@framer-templates/showcase` | 3000 | Catalog |
| Slate | `@framer-templates/slate` | 3001 | Home |
| Grovia | `@framer-templates/grovia` | 3002 | Home |
| Fuel | `@framer-templates/fuel` | 3003 | Home, about, contact, work, portfolio, blog |
| Agenio | `@framer-templates/agenio` | 3004 | Home, about, services, contact, projects, blog |
| Jayden | `@framer-templates/jayden` | 3005 | Home, work, services, about, contact |
| Saazai | `@framer-templates/saazai` | 3006 | Home, product, company, legal, blog |
| Palmer | `@framer-templates/palmer` | 3007 | Home, work, gallery, contact, articles |
| Trillo | `@framer-templates/trillo` | 3008 | Home |
| Payble | `@framer-templates/payble` | 3009 | Home, product, company, blog, legal |

Every template now serves from `/` when run independently. For example,
Fuel's about page is `/about`, Agenio's project details are
`/projects/:slug`, and Saazai's articles are `/blog/:slug`. Existing
family-prefixed asset paths remain intact.

## Requirements

- Node.js `22.22.3`
- npm `10.9.8`

The repository includes an `.nvmrc`, so `nvm use` selects the expected Node
version.

## Install and run

Install all workspaces once from the repository root:

```bash
npm ci
```

Run the showcase:

```bash
npm run dev
```

Run every application on its assigned port:

```bash
npm run dev:all
```

Run one template:

```bash
npm run dev --workspace=@framer-templates/fuel
```

Filter Turbo tasks to one application:

```bash
npx turbo run build check --filter=@framer-templates/fuel
```

## Validation

Each application exposes the same interface:

- `dev` and `start`
- `build`
- `typecheck`
- `audit:assets`
- `check`
- `test:routes`

Run the complete acceptance sequence:

```bash
npm run verify
```

`verify` runs checks, builds, and route contracts sequentially so generated
Next.js types are never read while a build is replacing them. Route contracts
live in each application's `template.config.json`. They cover every valid
static and generated route, invalid dynamic slugs, branded 404 pages, titles,
canonical paths, and visible markers.

## Environment

Each template accepts `NEXT_PUBLIC_SITE_URL` for canonical metadata:

```bash
NEXT_PUBLIC_SITE_URL=https://fuel.example.com \
  npm run build --workspace=@framer-templates/fuel
```

The showcase accepts one public URL per template so its cards can point to
independent deployments:

```bash
cp apps/showcase/.env.example apps/showcase/.env.local
```

Set `NEXT_PUBLIC_SLATE_URL`, `NEXT_PUBLIC_GROVIA_URL`, and the remaining
template URL variables in that file. Localhost defaults match the ports in the
workspace map.

## Repository structure

```text
apps/
  showcase/
  slate/
  grovia/
  fuel/
  agenio/
  jayden/
  saazai/
  palmer/
  trillo/
  payble/
packages/
  template-validation/
  typescript-config/
```

`packages/template-validation` owns the generic asset and route checks.
Template-specific asset audits remain app-local where the original design
needed additional rules. `packages/typescript-config` supplies the strict
shared Next.js compiler configuration while every app retains its local `@/*`
alias.
