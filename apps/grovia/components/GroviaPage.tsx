"use client";

import {
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./GroviaPage.module.css";

type IconName =
  | "arrow"
  | "menu"
  | "close"
  | "monitor"
  | "chart"
  | "layers"
  | "users"
  | "check"
  | "sparkle"
  | "leaf"
  | "rocket";

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-7-7 7 7-7 7" />,
  menu: <path d="M4 5h16M4 12h16M4 19h16" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  monitor: (
    <>
      <rect height="14" rx="2" width="20" x="2" y="3" />
      <path d="M8 21h8m-4-4v4" />
    </>
  ),
  chart: <path d="M4 20V10m5 10V4m5 16v-7m5 7V7" />,
  layers: (
    <path d="m12 2 9 5-9 5-9-5 9-5Zm9 10-9 5-9-5m18 5-9 5-9-5" />
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  check: <path d="m20 6-11 11-5-5" />,
  sparkle: <path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Zm7 13 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />,
  leaf: <path d="M20.8 3.2C13.5 3 7.3 5.8 5.1 11.3c-1.2 3-.1 5.9 2.6 7.2 2.6 1.3 5.5.4 7-2 3-4.8 3.7-9.3 6.1-13.3ZM4 21c2.7-5.7 6.5-9.2 12-12" />,
  rocket: <path d="M14 4c2.5-2.3 5.3-2 6-2 .1.8.3 3.5-2 6l-5.5 5.5-4-4L14 4Zm-7 7-3 1-2 3 5 1m6 1 1 5 3-2 1-3M8 16l-2 4 4-2" />,
};

function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
      width={size}
    >
      {iconPaths[name]}
    </svg>
  );
}

function ArrowBubble({ dark = false }: { dark?: boolean }) {
  return (
    <span className={dark ? styles.arrowBubbleDark : styles.arrowBubble}>
      <Icon name="arrow" size={16} />
    </span>
  );
}

function Brand() {
  return (
    <a aria-label="Grovia home" className={styles.brand} href="#grovia-top">
      <img alt="Grovia" src="/grovia/grovia-logo.avif" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [open]);

  return (
    <nav
      aria-label="Grovia navigation"
      className={`${styles.siteNav} ${open ? styles.siteNavOpen : ""}`}
    >
      <div className={styles.navBar}>
        <Brand />
        <div className={styles.desktopLinks}>
          <a href="#about">About</a>
          <a href="#feature">Features</a>
          <a href="#pricing">Pricing</a>
        </div>
        <a className={styles.navContact} href="#contact">
          <span>Contact us</span>
          <ArrowBubble />
        </a>
        <button
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={styles.menuButton}
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span>Menu</span>
          <span className={styles.menuIcon}>
            <Icon name={open ? "close" : "menu"} size={17} />
          </span>
        </button>
      </div>
      <div className={styles.mobileLinks}>
        <a href="#about" onClick={() => setOpen(false)}>
          About
        </a>
        <a href="#feature" onClick={() => setOpen(false)}>
          Features
        </a>
        <a href="#pricing" onClick={() => setOpen(false)}>
          Pricing
        </a>
        <a href="#contact" onClick={() => setOpen(false)}>
          Contact us
        </a>
      </div>
    </nav>
  );
}

function PrimaryLink({
  children,
  href,
  pale = false,
}: {
  children: ReactNode;
  href: string;
  pale?: boolean;
}) {
  return (
    <a
      className={`${styles.primaryLink} ${pale ? styles.primaryLinkPale : ""}`}
      href={href}
    >
      <span>{children}</span>
      <ArrowBubble dark={pale} />
    </a>
  );
}

function Rating({ light = false }: { light?: boolean }) {
  const faces = [
    "/grovia/testimonial-talia.avif",
    "/grovia/testimonial-samuel.avif",
    "/grovia/testimonial-jordan.avif",
    "/grovia/testimonial-talia.avif",
  ];

  return (
    <div className={`${styles.rating} ${light ? styles.ratingLight : ""}`}>
      <div className={styles.ratingFaces}>
        {faces.map((face, index) => (
          <img alt="" key={`${face}-${index}`} src={face} />
        ))}
      </div>
      <div>
        <p>4.9 / 5 Rated</p>
        <span>Over 9.2k Customers</span>
      </div>
    </div>
  );
}

function HeroDashboard() {
  const barHeights = [52, 70, 65, 74, 58, 49, 54];

  return (
    <div className={styles.heroDashboard} aria-label="Customer dashboard preview">
      <div className={styles.customerWidget}>
        <img alt="Customers list UI" src="/grovia/customers-ui.avif" />
      </div>
      <div className={styles.chartWidget}>
        <div className={styles.chartHeader}>
          <div>
            <span>Daily Average</span>
            <strong>2h 20m</strong>
          </div>
          <small>
            <b>+30m</b> this week
          </small>
        </div>
        <div className={styles.bars}>
          {barHeights.map((height, index) => (
            <div className={styles.barItem} key={`${height}-${index}`}>
              <div className={styles.bar} style={{ height }}>
                <i />
                <i />
                <i />
              </div>
              <span>{"MTWTFSS"[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoRail() {
  return (
    <div aria-label="Customer logos" className={styles.logoRail}>
      <span>⟫ Pluto Inc</span>
      <span>✚ VitaHealth</span>
      <span>◇ BoxMedia</span>
      <span>⬟ NovaTech</span>
      <span>⟫ Pluto Inc</span>
      <span>✚ VitaHealth</span>
    </div>
  );
}

function Hero() {
  return (
    <header className={styles.hero} id="grovia-top">
      <div className={styles.heroTexture} />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <h1>
            <span>Strategy and growth for</span>
            <span>modern teams</span>
          </h1>
          <p>
            Grovia partners with startups to streamline operations, elevate team
            performance, and build a foundation for lasting success.
          </p>
          <div className={styles.heroButtons}>
            <PrimaryLink href="#pricing">Get started</PrimaryLink>
            <a className={styles.outlineLink} href="#contact">
              Contact us
            </a>
          </div>
        </div>
        <HeroDashboard />
      </div>
      <LogoRail />
    </header>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${styles.reveal} ${visible ? styles.revealVisible : ""} ${className}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const steps = [
  {
    number: "01",
    title: "Easy setup",
    description:
      "Create your workspace and invite your team. Get everything ready in minutes.",
    image: "/grovia/setup-ui.avif",
  },
  {
    number: "02",
    title: "Collaborate",
    description:
      "Assign tasks and keep communication clear. Everyone stays aligned.",
    image: "/grovia/abstract-motion.avif",
  },
  {
    number: "03",
    title: "Track growth",
    description:
      "Use dashboards to monitor progress, trends, and what matters most.",
    image: "/grovia/customers-ui.avif",
  },
];

function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.processSection} id="about">
      <Reveal className={styles.processDashboard}>
        <img alt="Dashboard UI" src="/grovia/dashboard-ui.avif" />
      </Reveal>
      <div className={styles.processFade} />
      <div className={styles.stepGrid}>
        {steps.map((step, index) => (
          <button
            className={`${styles.stepCard} ${active === index ? styles.stepCardActive : ""}`}
            key={step.number}
            onClick={() => setActive(index)}
            onFocus={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
            type="button"
          >
            <span className={styles.stepNumber}>{step.number}</span>
            <div className={styles.stepCopy}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <div className={styles.stepMedia}>
              <img alt="" src={step.image} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

const features = [
  {
    label: "Client portal",
    icon: "monitor" as const,
    eyebrow: "Client portal",
    title: "Centralized access for teams and clients",
    description:
      "Securely share progress, files, feedback, and timelines with stakeholders. Keep everyone on the same page without switching platforms.",
    image: "/grovia/customers-ui.avif",
  },
  {
    label: "KPI tracking",
    icon: "chart" as const,
    eyebrow: "KPI tracking",
    title: "Measure what matters most",
    description:
      "Monitor your team's goals and key business metrics in real time. Custom dashboards make insights easy to access and act on.",
    image: "/grovia/dashboard-ui.avif",
  },
  {
    label: "Workflow automation",
    icon: "layers" as const,
    eyebrow: "Workflow automation",
    title: "Automate repetitive tasks",
    description:
      "Save time with built-in automations that handle reminders, approvals, and task assignments — so your team can focus on high-impact work.",
    image: "/grovia/abstract-motion.avif",
  },
  {
    label: "Team management",
    icon: "users" as const,
    eyebrow: "Team management",
    title: "Built for growing teams",
    description:
      "Easily onboard new members, assign roles, and manage access. Keep your organization structured and scalable from day one.",
    image: "/grovia/setup-ui.avif",
  },
];

function FeatureSection() {
  const [active, setActive] = useState(0);
  const feature = features[active];

  return (
    <section className={styles.featureSection} id="feature">
      <Reveal className={styles.sectionHeading}>
        <h2>Built for high performance</h2>
        <p>
          Grovia gives your team everything it needs to stay aligned, track
          performance, and scale with confidence — all in one place.
        </p>
      </Reveal>
      <Reveal className={styles.featureShell}>
        <div aria-label="Grovia features" className={styles.featureTabs} role="tablist">
          {features.map((item, index) => (
            <button
              aria-selected={active === index}
              className={active === index ? styles.featureTabActive : ""}
              key={item.label}
              onClick={() => setActive(index)}
              role="tab"
              type="button"
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.featurePanel} role="tabpanel">
          <div className={styles.featureVisual}>
            <div className={styles.featureAura} />
            <img alt={`${feature.label} interface`} src={feature.image} />
          </div>
          <div className={styles.featureCopy}>
            <span>{feature.eyebrow}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const integrationLogos = Array.from(
  { length: 9 },
  (_, index) => `/grovia/integration-${index + 1}.avif`,
);

function IntegrationSection() {
  return (
    <section className={styles.integrationSection}>
      <div className={styles.integrationInner}>
        <Reveal className={styles.integrationInfo}>
          <h2>Powerful integrations</h2>
          <p>
            Seamlessly integrate with your favorite tools to streamline
            workflows and keep everything in sync.
          </p>
          <PrimaryLink href="#pricing">Get started</PrimaryLink>
          <div className={styles.plusDivider}>
            <span>＋</span>
            <span>＋</span>
            <span>＋</span>
            <span>＋</span>
          </div>
          <ol className={styles.integrationSteps}>
            <li>
              <span>01</span>
              Explore 50+ supported integrations
            </li>
            <li>
              <span>02</span>
              Securely link your account
            </li>
            <li>
              <span>03</span>
              Sync and streamline your workflow
            </li>
          </ol>
        </Reveal>
        <Reveal className={styles.integrationGrid} delay={120}>
          {integrationLogos.slice(0, 8).map((logo, index) => (
            <div key={logo}>
              <img alt={`Integration ${index + 1}`} src={logo} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const pricingPlans = [
  {
    name: "Starter",
    note: "For early-stage teams",
    price: "$24",
    icon: "sparkle" as const,
    description:
      "Ideal for early-stage teams who need actionable insights to move forward.",
    features: [
      "Access to core features",
      "Basic performance reporting",
      "Email support",
      "Strategy onboarding guide",
      "Monthly check-in summary",
    ],
  },
  {
    name: "Growth",
    note: "Most popular",
    price: "$69",
    icon: "leaf" as const,
    description:
      "Designed for growing teams that need powerful tools and expert guidance.",
    features: [
      "Access to core features",
      "Advanced analytics dashboard",
      "Priority email support",
      "Quarterly strategy sessions",
      "Team access (up to 5 users)",
    ],
  },
  {
    name: "Scale",
    note: "For fast-scaling startups",
    price: "$129",
    icon: "rocket" as const,
    description:
      "Built for fast-scaling startups that require deep insights and partnership.",
    features: [
      "Access to all features",
      "Dedicated success manager",
      "Custom KPI tracking",
      "Monthly performance reviews",
      "Team access (unlimited users)",
    ],
  },
];

function PricingSection() {
  const [active, setActive] = useState(0);
  const plan = pricingPlans[active];

  return (
    <section className={styles.pricingSection} id="pricing">
      <div className={styles.pricingBackdrop} />
      <div className={styles.pricingInner}>
        <div className={styles.pricingLeft}>
          <div className={styles.pricingHeading}>
            <h2>Flexible pricing</h2>
            <p>Simple, transparent pricing with no hidden fees.</p>
          </div>
          <div className={styles.planTabs}>
            {pricingPlans.map((item, index) => (
              <button
                aria-pressed={active === index}
                className={active === index ? styles.planTabActive : ""}
                key={item.name}
                onClick={() => setActive(index)}
                type="button"
              >
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.note}</small>
                </span>
                <ArrowBubble />
              </button>
            ))}
          </div>
          <Rating light />
        </div>
        <div className={styles.priceCard}>
          <div className={styles.planName}>
            <span>
              <Icon name={plan.icon} size={21} />
            </span>
            <h3>{plan.name}</h3>
          </div>
          <div className={styles.priceLine}>
            <strong>{plan.price}</strong>
            <span>/ mo</span>
          </div>
          <p>{plan.description}</p>
          <PrimaryLink href="https://lunisdesign.com" pale>
            Schedule a demo
          </PrimaryLink>
          <ul>
            {plan.features.map((feature) => (
              <li key={feature}>
                <Icon name="check" size={18} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const caseStudies = [
  {
    name: "Pluto",
    year: "2025",
    image: "/grovia/case-pluto.avif",
    logo: "⟫ Pluto Inc",
    description:
      "Helped Pluto scale their product team and streamline onboarding as they expanded into new markets.",
    href: "#contact",
  },
  {
    name: "VitaHealth",
    year: "2024",
    image: "/grovia/case-vitahealth.avif",
    logo: "✚ VitaHealth",
    description:
      "Partnered with VitaHealth to set up their first operations team from the ground up.",
    href: "#contact",
  },
  {
    name: "BoxMedia",
    year: "2025",
    image: "/grovia/case-boxmedia.avif",
    logo: "◇ BoxMedia",
    description:
      "Supported BoxMedia, a creative agency, in building their client success team and internal delivery process.",
    href: "#contact",
  },
  {
    name: "NovaTech",
    year: "2023",
    image: "/grovia/case-novatech.avif",
    logo: "⬟ NovaTech",
    description:
      "Helped NovaTech optimize cross-functional collaboration between marketing, product, and sales teams.",
    href: "#contact",
  },
];

const testimonials = [
  {
    quote:
      "Grovia helped us streamline our operations and scale faster than we imagined. Their mix of strategy and execution is unmatched.",
    name: "Talia Smith",
    role: "Head of Product at Forma",
    image: "/grovia/testimonial-talia.avif",
  },
  {
    quote:
      "Working with Grovia felt like having an extension of our team. They understood our challenges and delivered real, measurable results.",
    name: "Jordan Johnson",
    role: "COO at Metricon",
    image: "/grovia/testimonial-jordan.avif",
  },
  {
    quote:
      "From the first meeting, Grovia brought clarity and momentum to our hiring strategy. We’ve seen a major improvement in team performance.",
    name: "Samuel Torres",
    role: "Founder at Bloomtech",
    image: "/grovia/testimonial-samuel.avif",
  },
];

function CaseAndTestimonials() {
  return (
    <section className={styles.caseSection} id="case-studies">
      <Reveal className={styles.caseHeading}>
        <h2>Success stories</h2>
        <p>
          Grovia has partnered with growing businesses to build foundations for
          sustainable success. Explore real stories of transformation.
        </p>
      </Reveal>
      <div className={styles.caseGrid}>
        {caseStudies.map((item, index) => (
          <Reveal delay={(index % 2) * 90} key={item.name}>
            <a className={styles.caseCard} href={item.href}>
              <div className={styles.caseImage}>
                <img alt={`${item.name} case study`} src={item.image} />
                <strong>{item.logo}</strong>
                <span>{item.year}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </a>
          </Reveal>
        ))}
      </div>
      <a className={styles.readMore} href="#contact">
        Read more
      </a>
      <div className={styles.testimonialViewport}>
        <div className={styles.testimonialTrack}>
          {[...testimonials, ...testimonials].map((item, index) => (
            <article className={styles.testimonialCard} key={`${item.name}-${index}`}>
              <span className={styles.quoteMark}>”</span>
              <blockquote>{item.quote}</blockquote>
              <div className={styles.testimonialPerson}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
                <img alt="" src={item.image} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "What types of companies do you work with?",
    answer:
      "We partner with startups, small businesses, and growing teams across industries. Whether you're in tech, retail, or services, our solutions adapt to your needs.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most clients begin noticing improvements within the first few weeks. For deeper operational changes, we typically see lasting impact within 2 to 3 months.",
  },
  {
    question: "Can Grovia integrate with our existing tools?",
    answer:
      "Yes. Grovia is built to work with a wide range of platforms including Slack, Notion, Google Workspace, and more.",
  },
  {
    question: "Do you offer one-time consultations or ongoing support?",
    answer:
      "Both. You can engage us for one-time strategy sessions or ongoing advisory support depending on your goals and team needs.",
  },
  {
    question: "What does onboarding look like?",
    answer:
      "Our onboarding process is simple and collaborative. We start with a kickoff session, align on goals, and provide a tailored roadmap to guide the next steps.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={styles.faqSection}>
      <Reveal className={styles.faqIntro}>
        <h2>Your questions, answered</h2>
        <p>
          Get quick answers to the most common questions about our platform and
          services.
        </p>
        <a className={styles.outlineLink} href="#contact">
          Contact us
        </a>
      </Reveal>
      <div className={styles.faqList}>
        {faqs.map((item, index) => {
          const isOpen = open === index;
          return (
            <div
              className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
              key={item.question}
            >
              <button
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
                type="button"
              >
                <span>{item.question}</span>
                <Icon name={isOpen ? "close" : "arrow"} size={18} />
              </button>
              <div className={styles.faqAnswer}>
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection() {
  const [status, setStatus] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Preview only. No message was sent.");
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.contactBackdrop} />
      <div className={styles.contactInner}>
        <div className={styles.contactInfo}>
          <div>
            <h2>Start your journey</h2>
            <p>Let’s start building something great together.</p>
          </div>
          <div className={styles.contactDetails}>
            <a href="tel:+12068371232">206-837-1232</a>
            <a href="mailto:hello@grovia.io">hello@grovia.io</a>
            <Rating light />
          </div>
        </div>
        <form
          className={styles.contactForm}
          onInput={() => setStatus("")}
          onSubmit={onSubmit}
        >
          <label>
            <span>Name</span>
            <input aria-label="Name" placeholder="Jane Smith" />
          </label>
          <label>
            <span>Email</span>
            <input
              aria-label="Email"
              inputMode="email"
              placeholder="jane@grovia.io"
              type="email"
            />
          </label>
          <label>
            <span>Message</span>
            <textarea aria-label="Message" placeholder="Enter your message" />
          </label>
          <button className={styles.submitButton} type="submit">
            <span>Submit</span>
            <ArrowBubble dark />
          </button>
          <p className={styles.formStatus} role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const [status, setStatus] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Preview only. No subscription was created.");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <h2>Sign up for our newsletter</h2>
        <form onInput={() => setStatus("")} onSubmit={onSubmit}>
          <input aria-label="Newsletter email" placeholder="name@email.com" type="email" />
          <button type="submit">Subscribe</button>
        </form>
        <p className={styles.newsletterStatus} role="status">
          {status}
        </p>
      </div>
      <div className={styles.footerPages}>
        <h3>↳ Pages</h3>
        <nav aria-label="Grovia footer pages">
          <a href="#grovia-top">Home</a>
          <a href="#about">About</a>
          <a href="#pricing">Pricing</a>
          <a href="#case-studies">Case Studies</a>
        </nav>
      </div>
      <div className={styles.socials}>
        <a aria-label="X" href="https://x.com">
          X
        </a>
        <a aria-label="Instagram" href="https://instagram.com">
          ◎
        </a>
        <a aria-label="LinkedIn" href="https://linkedin.com">
          in
        </a>
      </div>
      <a className={styles.footerEmail} href="mailto:hello@grovia.io">
        hello@grovia.io
      </a>
      <p className={styles.copyright}>Designed by Lunis. All rights reserved.</p>
    </footer>
  );
}

export function GroviaPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <ProcessSection />
        <FeatureSection />
        <IntegrationSection />
        <PricingSection />
        <CaseAndTestimonials />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
