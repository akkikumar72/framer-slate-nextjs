import Link from "next/link";
import {
  DownloadApp,
  Newsletter,
  PageHero,
  SectionHeading,
} from "../PaybleShared";
import {
  ContactForm,
  FAQ,
  PricingPlans,
} from "../PaybleInteractive";
import type { LegalDocument } from "./legal-data";

const comparisonRows = [
  ["Expense Tracking", "✓", "✓", "✓"],
  ["Account Sync", "Single", "Unlimited", "Unlimited"],
  ["Budgets", "Basic", "Advanced", "Unlimited"],
  ["Saving Goals", "1", "5", "Unlimited"],
  ["Email Support", "Default", "Priority", "24/7"],
  ["AI Insights", "—", "✓", "✓"],
  ["Real Time Alerts", "—", "✓", "✓"],
  ["Reports", "—", "Monthly", "Custom"],
  ["Expense Breakdown", "—", "—", "✓"],
  ["Data Export", "—", "—", "✓"],
];

export function PricingPage() {
  return (
    <>
      <PageHero
        kicker="Pricing Plans"
        title="Flexible Pricing Plans"
        description="Get access to powerful financial tools with pricing that adapts to your lifestyle, making it easy to stay in control of your money without breaking the bank."
      />
      <PricingPlans compact />
      <section
        className="payble-utility-comparison"
        aria-labelledby="payble-comparison-title"
      >
        <div className="payble-container">
          <SectionHeading
            kicker="Comparisons"
            title="Compare Pricing plans"
            description="Compare our plans to see which option provides the best value and functionality for your goals."
          />
          <div className="payble-utility-comparison__scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">Basic</th>
                  <th scope="col">Plus</th>
                  <th scope="col">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([feature, basic, plus, premium]) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    <td>{basic}</td>
                    <td>{plus}</td>
                    <td>{premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <FAQ />
      <DownloadApp />
      <Newsletter />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Reach Out, We’re Here to Assist"
        description="No matter your inquiry, our support team is here to help. Drop us a message and we’ll respond as soon as possible."
      />
      <section
        className="payble-utility-contact"
        aria-labelledby="payble-contact-form-title"
      >
        <div className="payble-container payble-utility-contact__grid">
          <aside className="payble-utility-contact__details">
            <div>
              <span>Contact us</span>
              <p>
                42 Market Avenue
                <br />
                Westminster
                <br />
                London W1B 4DE
                <br />
                United Kingdom
              </p>
            </div>
            <div>
              <span>Let&apos;s connect</span>
              <a href="mailto:email@payble.com">email@payble.com</a>
              <a href="tel:+44111333555">+44 111 333 555</a>
            </div>
            <div>
              <span>Follow us</span>
              <div className="payble-utility-contact__socials">
                <a href="#payble-newsletter" aria-label="Instagram">
                  ig
                </a>
                <a href="#payble-newsletter" aria-label="LinkedIn">
                  in
                </a>
                <a href="#payble-newsletter" aria-label="X">
                  x
                </a>
              </div>
            </div>
          </aside>
          <div className="payble-utility-contact__form">
            <span className="payble-kicker">Send us a message</span>
            <h2 id="payble-contact-form-title">How can we help?</h2>
            <ContactForm />
          </div>
        </div>
      </section>
      <FAQ />
      <DownloadApp />
      <Newsletter />
    </>
  );
}

export function LegalPage({ document }: { document: LegalDocument }) {
  const renderedBlocks: React.ReactNode[] = [];
  let sectionIndex = 0;

  for (let index = 0; index < document.blocks.length; index += 1) {
    const block = document.blocks[index];

    if (block.tag === "LI") {
      const items = [block.text];
      while (
        index + 1 < document.blocks.length &&
        document.blocks[index + 1].tag === "LI"
      ) {
        index += 1;
        items.push(document.blocks[index].text);
      }
      renderedBlocks.push(
        <ul
          className={sectionIndex === 1 ? "is-first-section" : undefined}
          key={`list-${index}`}
        >
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (block.tag === "H3") {
      sectionIndex += 1;
      renderedBlocks.push(<h3 key={`${block.text}-${index}`}>{block.text}</h3>);
      continue;
    }

    renderedBlocks.push(
      <p key={`${block.text}-${index}`}>
        {block.text.split("\n").map((line, lineIndex) => (
          <span key={`${line}-${lineIndex}`}>
            {line}
            {lineIndex < block.text.split("\n").length - 1 && <br />}
          </span>
        ))}
      </p>,
    );
  }

  return (
    <>
      <article className="payble-utility-legal">
        <div className="payble-container">
          <header>
            <h1>{document.title}</h1>
          </header>
          <div className="payble-utility-legal__body">{renderedBlocks}</div>
        </div>
      </article>
      <DownloadApp />
      <Newsletter />
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <section className="payble-utility-not-found">
        <div className="payble-container">
          <h1 className="payble-utility-not-found__number">404</h1>
          <p>OOPS! Looks like this page wasn&apos;t found!</p>
          <Link className="payble-button" href="/">
            Back Home
          </Link>
        </div>
      </section>
      <DownloadApp />
      <Newsletter />
    </>
  );
}
