import Image from "next/image";

const templates = [
  {
    name: "Slate",
    slug: "slate",
    packageName: "@framer-templates/slate",
    port: 3001,
    routes: 1,
    image: "/templates/slate.png",
    url: process.env.NEXT_PUBLIC_SLATE_URL ?? "http://localhost:3001",
  },
  {
    name: "Grovia",
    slug: "grovia",
    packageName: "@framer-templates/grovia",
    port: 3002,
    routes: 1,
    image: "/templates/grovia.png",
    url: process.env.NEXT_PUBLIC_GROVIA_URL ?? "http://localhost:3002",
  },
  {
    name: "Fuel",
    slug: "fuel",
    packageName: "@framer-templates/fuel",
    port: 3003,
    routes: 14,
    image: "/templates/fuel.png",
    url: process.env.NEXT_PUBLIC_FUEL_URL ?? "http://localhost:3003",
  },
  {
    name: "Agenio",
    slug: "agenio",
    packageName: "@framer-templates/agenio",
    port: 3004,
    routes: 9,
    image: "/templates/agenio.png",
    url: process.env.NEXT_PUBLIC_AGENIO_URL ?? "http://localhost:3004",
  },
  {
    name: "Jayden",
    slug: "jayden",
    packageName: "@framer-templates/jayden",
    port: 3005,
    routes: 8,
    image: "/templates/jayden.png",
    url: process.env.NEXT_PUBLIC_JAYDEN_URL ?? "http://localhost:3005",
  },
  {
    name: "Saazai",
    slug: "saazai",
    packageName: "@framer-templates/saazai",
    port: 3006,
    routes: 19,
    image: "/templates/saazai.png",
    url: process.env.NEXT_PUBLIC_SAAZAI_URL ?? "http://localhost:3006",
  },
  {
    name: "Palmer",
    slug: "palmer",
    packageName: "@framer-templates/palmer",
    port: 3007,
    routes: 13,
    image: "/templates/palmer.png",
    url: process.env.NEXT_PUBLIC_PALMER_URL ?? "http://localhost:3007",
  },
  {
    name: "Trillo",
    slug: "trillo",
    packageName: "@framer-templates/trillo",
    port: 3008,
    routes: 1,
    image: "/templates/trillo.png",
    url: process.env.NEXT_PUBLIC_TRILLO_URL ?? "http://localhost:3008",
  },
  {
    name: "Payble",
    slug: "payble",
    packageName: "@framer-templates/payble",
    port: 3009,
    routes: 21,
    image: "/templates/payble.png",
    url: process.env.NEXT_PUBLIC_PAYBLE_URL ?? "http://localhost:3009",
  },
  {
    name: "Pilar",
    slug: "pilar",
    packageName: "@framer-templates/pilar",
    port: 3010,
    routes: 4,
    image: "/templates/pilar.webp",
    url: process.env.NEXT_PUBLIC_PILAR_URL ?? "http://localhost:3010",
  },
] as const;

export default function ShowcasePage() {
  const totalRoutes = templates.reduce(
    (total, template) => total + template.routes,
    0,
  );

  return (
    <main>
      <header className="masthead">
        <a className="wordmark" href="#catalog" aria-label="Template catalog">
          FT
        </a>
        <p>Next.js 16 · npm workspaces · Turbo</p>
        <a className="jump-link" href="#catalog">
          Browse all <span aria-hidden="true">↓</span>
        </a>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Framer template archive / 2026</p>
        <h1 id="page-title">
          Ten templates.
          <br />
          One focused workspace.
        </h1>
        <div className="hero-notes">
          <p>
            Each design is an independent Next.js app with its own routes,
            assets, validation, and deployment boundary.
          </p>
          <dl>
            <div>
              <dt>Apps</dt>
              <dd>{templates.length}</dd>
            </div>
            <div>
              <dt>Routes</dt>
              <dd>{totalRoutes}</dd>
            </div>
            <div>
              <dt>Ports</dt>
              <dd>3001–10</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="catalog" id="catalog" aria-label="Template catalog">
        {templates.map((template, index) => (
          <article className="template-card" key={template.slug}>
            <a
              className="preview"
              href={template.url}
              aria-label={`Open ${template.name}`}
            >
              <Image
                src={template.image}
                alt={`${template.name} template home page`}
                fill
                priority={index < 2}
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <span className="open-mark" aria-hidden="true">
                ↗
              </span>
            </a>
            <div className="card-copy">
              <div>
                <p className="index">{String(index + 1).padStart(2, "0")}</p>
                <h2>{template.name}</h2>
              </div>
              <dl>
                <div>
                  <dt>Package</dt>
                  <dd>{template.packageName}</dd>
                </div>
                <div>
                  <dt>Routes</dt>
                  <dd>{template.routes}</dd>
                </div>
                <div>
                  <dt>Local</dt>
                  <dd>:{template.port}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </section>

      <footer>
        <p>Independent applications. Shared validation. No shared UI.</p>
        <a href="#page-title">Back to top ↑</a>
      </footer>
    </main>
  );
}
