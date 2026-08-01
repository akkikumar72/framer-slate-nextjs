import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "./PaybleInteractive";

export function PageHero({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <section className="payble-page-hero">
      <div className="payble-container">
        <span className="payble-kicker">{kicker}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="payble-section-heading">
      <span className="payble-kicker">{kicker}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function DownloadApp() {
  return (
    <section className="payble-download" aria-labelledby="payble-download-title">
      <div className="payble-container payble-download__card">
        <div className="payble-download__copy">
          <span className="payble-kicker payble-kicker--dark">
            Payble in your pocket
          </span>
          <h2 id="payble-download-title">Download Mobile App</h2>
          <p>
            Manage your finances with the Payble mobile app. Download it today
            for easy expense tracking and customized alerts.
          </p>
          <div className="payble-download__stores">
            <a href="#payble-newsletter">
              <span aria-hidden="true">●</span>
              <span>
                <small>Download on the</small>
                <strong>App Store</strong>
              </span>
            </a>
            <a href="#payble-newsletter">
              <span aria-hidden="true">▶</span>
              <span>
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </span>
            </a>
          </div>
        </div>
        <div className="payble-download__phone">
          <div className="payble-download__glow" />
          <Image
            src="/payble/ui/mobile-app.avif"
            alt="Payble mobile app dashboard"
            width={473}
            height={932}
            sizes="(max-width: 810px) 68vw, 372px"
          />
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section
      className="payble-newsletter"
      id="payble-newsletter"
      aria-labelledby="payble-newsletter-title"
    >
      <div className="payble-container payble-newsletter__inner">
        <div>
          <span className="payble-kicker">Stay money-smart</span>
          <h2 id="payble-newsletter-title">Subscribe to Newsletter</h2>
          <p>
            Subscribe today to receive personalized financial tips, news, and
            updates delivered directly to your email.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}

const blogTeasers = [
  {
    slug: "stay-in-control-how-ai-insights-can-prevent-overspending",
    image: "/payble/blog/overspending.avif",
    title: "Stay in Control: How AI Insights Can Prevent Overspending",
    category: "AI Insights",
  },
  {
    slug: "how-to-manage-irregular-income-with-ai-powered-financial-tools",
    image: "/payble/blog/irregular-income.avif",
    title: "How to Manage Irregular Income with AI-Powered Financial Tools",
    category: "Money Management",
  },
  {
    slug: "how-ai-can-help-you-create-custom-budgets-tailored-to-your-needs",
    image: "/payble/blog/custom-budgets.avif",
    title: "How AI Can Help You Create Custom Budgets Tailored to Your Needs",
    category: "Budgeting",
  },
];

export function BlogTeasers() {
  return (
    <section className="payble-section payble-blog-teasers">
      <div className="payble-container">
        <div className="payble-section-heading payble-section-heading--row">
          <div>
            <span className="payble-kicker">Blog Articles</span>
            <h2>Your Guide to Smarter Money Management</h2>
            <p>
              Unlock expert advice on budgeting, saving, and achieving
              financial goals effortlessly.
            </p>
          </div>
          <Link className="payble-text-link" href="/blog">
            View all articles <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="payble-blog-grid payble-blog-grid--three">
          {blogTeasers.map((article) => (
            <article className="payble-blog-card" key={article.slug}>
              <Link href={`/blog/${article.slug}`}>
                <span className="payble-blog-card__image">
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    sizes="(max-width: 810px) 100vw, 33vw"
                  />
                </span>
                <span className="payble-blog-card__meta">
                  <span>{article.category}</span>
                  <span>6 min read</span>
                </span>
                <h3>{article.title}</h3>
                <span className="payble-text-link">
                  Read Article <span aria-hidden="true">↗</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
