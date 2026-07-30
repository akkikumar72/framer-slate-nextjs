"use client";

import Link from "next/link";
import { useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import motionStyles from "./JaydenMotion.module.css";
import { jaydenAssets, jaydenProjects, type JaydenProject } from "./assets";
import styles from "./JaydenSections.module.css";

function motionDelay(index: number, step = 80) {
  return { "--jayden-delay": `${index * step}ms` } as CSSProperties;
}

export function GridSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={`${styles.gridSection} ${className ?? ""}`} id={id}>
      <div className={styles.gridInner}>{children}</div>
    </section>
  );
}

export function DotsDivider() {
  return (
    <div className={styles.dotsDivider} aria-hidden="true">
      <i />
      <i />
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className={styles.sectionLabel}>
      <i />
      <span>{children}</span>
    </div>
  );
}

export function ArrowLink({
  children,
  href,
  light = false,
}: {
  children: ReactNode;
  href: string;
  light?: boolean;
}) {
  return (
    <Link className={`${styles.arrowLink} ${light ? styles.arrowLinkLight : ""}`} href={href}>
      <span>{children}</span>
      <b aria-hidden="true">↗</b>
    </Link>
  );
}

export function RouteMasthead({
  cta = "Get Started",
  ctaHref = "/contact",
  eyebrow,
  lead,
  title,
}: {
  cta?: string;
  ctaHref?: string;
  eyebrow: string;
  lead: string;
  title: string[];
}) {
  return (
    <GridSection className={styles.masthead}>
      <div className={styles.mastheadBody}>
        <SectionLabel>{eyebrow}</SectionLabel>
        <p className={styles.mastheadLead}>{lead}</p>
        <div className={styles.mastheadDisplay} aria-label={title.join(" ")}>
          {title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <ArrowLink href={ctaHref} light>
          {cta}
        </ArrowLink>
      </div>
      <DotsDivider />
    </GridSection>
  );
}

export function WorkCards({
  className,
  projects = jaydenProjects,
  title = "Selected work",
}: {
  className?: string;
  projects?: JaydenProject[];
  title?: string;
}) {
  return (
    <GridSection className={`${styles.workSection} ${className ?? ""}`}>
      <div
        className={`${styles.sectionHeading} ${motionStyles.reveal} ${motionStyles.fromLeft}`}
        data-jayden-reveal
      >
        <h2>{title}</h2>
        <span>SHOWCASE OF JAYDEN&apos;S,</span>
      </div>
      <div className={styles.workCards}>
        {projects.map((project, index) => (
          <Link
            className={`${styles.workCard} ${motionStyles.reveal}`}
            data-jayden-reveal
            href={`/work/${project.slug}`}
            key={project.slug}
            style={motionDelay(index)}
          >
            <div className={styles.workMedia}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" aria-hidden="true" src={project.cardImage} />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className={styles.workMeta}>
              <div>
                <small>{project.category}</small>
                <h3>{project.title}</h3>
              </div>
              <time>{project.date}</time>
              <b aria-hidden="true">↗</b>
            </div>
          </Link>
        ))}
      </div>
      <DotsDivider />
    </GridSection>
  );
}

const processSteps = [
  {
    step: "Step 1",
    title: "Review The Brief",
    description: "Understand project goals and client expectations.",
    image: jaydenAssets.processOne,
  },
  {
    step: "Step 2",
    title: "Sketch The WireFrame",
    description: "Lay out structure to guide interface creation",
    image: jaydenAssets.processTwo,
  },
  {
    step: "Step 3",
    title: "Design Progress",
    description: "Refine the layout, colors, fonts, and spacing now",
    image: jaydenAssets.processThree,
  },
  {
    step: "Step 4",
    title: "Product Examination",
    description: "Check user flow and test each feature for flaws",
    image: jaydenAssets.processFour,
  },
];

export function WorkProcess() {
  return (
    <GridSection className={styles.processSection}>
      <div
        className={`${styles.sectionHeading} ${motionStyles.reveal} ${motionStyles.fromLeft}`}
        data-jayden-reveal
      >
        <h2>Work Process</h2>
      </div>
      <div className={styles.processList}>
        {processSteps.map((item, index) => (
          <article
            className={`${styles.processRow} ${motionStyles.reveal} ${motionStyles.fromLeft}`}
            data-jayden-reveal
            key={item.step}
            style={motionDelay(index)}
          >
            <div>
              <small>{item.step}</small>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className={styles.processIcon}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" aria-hidden="true" src={item.image} />
            </div>
          </article>
        ))}
      </div>
      <DotsDivider />
    </GridSection>
  );
}

export function Awards() {
  return (
    <GridSection className={styles.awardsSection}>
      <div
        className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
        data-jayden-reveal
      >
        <SectionLabel>Awards</SectionLabel>
      </div>
      <p
        className={`${styles.awardsLead} ${styles.awardsLeadIntro} ${motionStyles.reveal}`}
        data-jayden-reveal
      >
        My awards represent our ongoing
      </p>
      <p
        className={`${styles.awardsLead} ${styles.awardsLeadRest} ${motionStyles.reveal}`}
        data-jayden-reveal
        style={motionDelay(1)}
      >
        pursuit of quality and innovation. Each award reflects our team&apos;s expertise
      </p>
      <div className={styles.awardsList}>
        {[
          { image: jaydenAssets.awardUp, label: "SOTD E-commerce" },
          { image: jaydenAssets.awardBehance, label: "Site of the Days" },
          { image: jaydenAssets.awardClutch, label: "Clutch the spotlight" },
        ].map((award, index) => (
          <article
            className={`${motionStyles.reveal} ${motionStyles.scaleIn}`}
            data-jayden-reveal
            key={award.label}
            style={motionDelay(index)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden="true" src={award.image} />
            <span>{award.label}</span>
          </article>
        ))}
      </div>
      <DotsDivider />
    </GridSection>
  );
}

const standardFeatures = [
  "Need your wireframe",
  "Design with Figma, Framer",
  "Implement with Webflow, React, WordPress, Laravel/PHP",
  "Remote/Online",
  "Work in business days, no weekend.",
  "Support 6 months",
];

const premiumFeatures = [
  "Strategy, wireframe, and visual direction",
  "Design with Figma and Framer",
  "Production-ready responsive implementation",
  "Remote/Online",
  "Priority business-day delivery",
  "Support 12 months",
];

export function PricingSection({
  initialPlan = "premium",
}: {
  initialPlan?: "premium" | "standard";
}) {
  const [plan, setPlan] = useState<"premium" | "standard">(initialPlan);
  const premium = plan === "premium";
  const features = premium ? premiumFeatures : standardFeatures;

  return (
    <GridSection className={styles.pricingSection} id="pricing">
      <div
        className={`${styles.sectionHeading} ${motionStyles.reveal} ${motionStyles.fromLeft}`}
        data-jayden-reveal
      >
        <h2>My Pricing</h2>
      </div>
      <div
        className={`${styles.planToggle} ${motionStyles.reveal}`}
        aria-label="Pricing plans"
        data-jayden-reveal
        role="tablist"
        style={motionDelay(1)}
      >
        <button
          aria-selected={!premium}
          className={!premium ? styles.planActive : undefined}
          onClick={() => setPlan("standard")}
          role="tab"
          type="button"
        >
          Standard
        </button>
        <button
          aria-selected={premium}
          className={premium ? styles.planActive : undefined}
          onClick={() => setPlan("premium")}
          role="tab"
          type="button"
        >
          Premium
        </button>
      </div>
      <div
        className={`${styles.pricingCard} ${motionStyles.reveal} ${motionStyles.scaleIn}`}
        data-jayden-reveal
        style={motionDelay(2)}
      >
        <div className={styles.priceTop}>
          <div>
            <span>{premium ? "Premium Plan" : "Standard Plan"}</span>
            <p>Have design ready to build? Or small budget?</p>
          </div>
          <div className={styles.price}>
            <strong>${premium ? "99" : "49"}</strong>
            <span>/ hour</span>
          </div>
        </div>
        <ul>
          {features.map((feature, index) => (
            <li
              className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
              data-jayden-reveal
              key={feature}
              style={motionDelay(index, 55)}
            >
              <span aria-hidden="true">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <ArrowLink href="/contact" light>
          Start a Project
        </ArrowLink>
      </div>
      <p
        className={`${styles.customQuote} ${motionStyles.reveal}`}
        data-jayden-reveal
      >
        Custom Quote
      </p>
      <DotsDivider />
    </GridSection>
  );
}

const faqs = [
  {
    question: "What’s the Jayden’s progress like?",
    answer:
      "I specialize in UX/UI design, web development, and branding for individuals and businesses.",
  },
  {
    question: "Design delivery time estimate?",
    answer:
      "Most focused projects take four to six weeks, with progress shared at clear review milestones.",
  },
  {
    question: "What Service do You offer?",
    answer:
      "Brand design, UI/UX design, Webflow development, and Framer development.",
  },
  {
    question: "What if I don’t like design?",
    answer:
      "We review direction early and refine together, so every major decision is aligned before handoff.",
  },
  {
    question: "Are there any Refund?",
    answer:
      "Refund terms depend on the completed project stage and are agreed before the work begins.",
  },
];

export function FaqSection({ className }: { className?: string } = {}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <GridSection className={`${styles.faqSection} ${className ?? ""}`} id="faq">
      <div
        className={`${styles.sectionHeading} ${motionStyles.reveal} ${motionStyles.fromLeft}`}
        data-jayden-reveal
      >
        <h2>FAQs</h2>
      </div>
      <div className={styles.faqList}>
        {faqs.map((item, index) => {
          const open = index === openIndex;
          return (
            <article
              className={`${open ? styles.faqOpen : ""} ${motionStyles.reveal} ${motionStyles.fromLeft}`}
              data-jayden-reveal
              key={item.question}
              style={motionDelay(index)}
            >
              <button
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? -1 : index)}
                type="button"
              >
                <span>{item.question}</span>
                <b aria-hidden="true">{open ? "−" : "+"}</b>
              </button>
              <p>{item.answer}</p>
            </article>
          );
        })}
      </div>
      <p className={`${styles.askMore} ${motionStyles.reveal}`} data-jayden-reveal>
        Do you have any other questions? <Link href="/contact">Ask me directly</Link>
      </p>
      <DotsDivider />
    </GridSection>
  );
}

const budgets = [
  "< $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $20,000",
  "> $20,000",
];

export function ContactFormSection() {
  const [budget, setBudget] = useState(budgets[1]);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <GridSection className={styles.contactSection} id="contact">
      <div
        className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
        data-jayden-reveal
      >
        <SectionLabel>Contact Form</SectionLabel>
      </div>
      <div
        className={`${styles.sectionHeading} ${motionStyles.reveal} ${motionStyles.fromLeft}`}
        data-jayden-reveal
        style={motionDelay(1)}
      >
        <h2>Contact For Work</h2>
      </div>
      <form
        className={`${styles.contactForm} ${motionStyles.reveal} ${motionStyles.scaleIn}`}
        data-jayden-reveal
        onSubmit={onSubmit}
        style={motionDelay(2)}
      >
        <label
          className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
          data-jayden-reveal
        >
          <span>Your E-mail</span>
          <input name="email" placeholder="Enter the Email" required type="email" />
        </label>
        <label
          className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
          data-jayden-reveal
          style={motionDelay(1)}
        >
          <span>Your Phone</span>
          <input name="phone" placeholder="Enter Your Phone no" type="tel" />
        </label>
        <label
          className={`${styles.messageField} ${motionStyles.reveal} ${motionStyles.fromLeft}`}
          data-jayden-reveal
          style={motionDelay(2)}
        >
          <span>Message</span>
          <textarea name="message" required rows={5} />
        </label>
        <fieldset
          className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
          data-jayden-reveal
          style={motionDelay(3)}
        >
          <legend>Select your Budget</legend>
          <div className={styles.budgetOptions}>
            {budgets.map((item) => (
              <button
                aria-pressed={budget === item}
                className={budget === item ? styles.budgetSelected : undefined}
                key={item}
                onClick={() => setBudget(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>
        <button className={styles.submitButton} type="submit">
          <span>{submitted ? "Request noted" : "Send Request"}</span>
          <b aria-hidden="true">{submitted ? "✓" : "↗"}</b>
        </button>
        {submitted ? (
          <p className={styles.formStatus} role="status">
            This local preview reproduces the form state without sending your information.
          </p>
        ) : null}
      </form>
      <DotsDivider />
    </GridSection>
  );
}
