"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type IconName =
  | "camera"
  | "sparkle"
  | "text"
  | "folder"
  | "cloud"
  | "search"
  | "link"
  | "bookmark"
  | "upload"
  | "check"
  | "star"
  | "left"
  | "right"
  | "menu"
  | "close";

const iconPaths: Record<IconName, string> = {
  camera:
    "M208 56h-27.72l-13.63-20.44A8 8 0 0 0 160 32H96a8 8 0 0 0-6.65 3.56L75.71 56H48a24 24 0 0 0-24 24v112a24 24 0 0 0 24 24h160a24 24 0 0 0 24-24V80a24 24 0 0 0-24-24m-44 76a36 36 0 1 1-36-36a36 36 0 0 1 36 36",
  sparkle:
    "M208 144a15.78 15.78 0 0 1-10.42 14.94L146 178l-19 51.62a15.92 15.92 0 0 1-29.88 0L78 178l-51.62-19a15.92 15.92 0 0 1 0-29.88L78 110l19-51.62a15.92 15.92 0 0 1 29.88 0L146 110l51.62 19A15.78 15.78 0 0 1 208 144m-56-96h16v16a8 8 0 0 0 16 0V48h16a8 8 0 0 0 0-16h-16V16a8 8 0 0 0-16 0v16h-16a8 8 0 0 0 0 16m88 32h-8v-8a8 8 0 0 0-16 0v8h-8a8 8 0 0 0 0 16h8v8a8 8 0 0 0 16 0v-8h8a8 8 0 0 0 0-16",
  text: "M200 156c0 6.5-7.33 12-16 12s-16-5.5-16-12s7.33-12 16-12s16 5.5 16 12m32-100v144a16 16 0 0 1-16 16H40a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h176a16 16 0 0 1 16 16m-88.63 116.88l-44-104a8 8 0 0 0-14.74 0l-44 104a8 8 0 0 0 14.74 6.24L66.84 152h50.32l11.47 27.12a8 8 0 0 0 14.74-6.24M216 124c0-15.44-14.36-28-32-28a34.86 34.86 0 0 0-20.78 6.68a8 8 0 0 0 9.56 12.83A18.84 18.84 0 0 1 184 112c8.56 0 15.8 5.36 16 11.76v8a35.24 35.24 0 0 0-16-3.76c-17.64 0-32 12.56-32 28s14.36 28 32 28a35.1 35.1 0 0 0 16.93-4.26A8 8 0 0 0 216 176ZM73.61 136h36.78L92 92.53Z",
  folder:
    "M216 72h-84.69L104 44.69A15.88 15.88 0 0 0 92.69 40H40a16 16 0 0 0-16 16v144.62A15.41 15.41 0 0 0 39.39 216h177.5A15.13 15.13 0 0 0 232 200.89V88a16 16 0 0 0-16-16M40 56h52.69l16 16H40Z",
  cloud:
    "M160.06 40a88.1 88.1 0 0 0-78.77 48.67A87.5 87.5 0 0 0 72 127.73a8.18 8.18 0 0 1-7.43 8.27a8 8 0 0 1-8.57-8a103.7 103.7 0 0 1 5.34-32.92a4 4 0 0 0-4.75-5.18A64.09 64.09 0 0 0 8 152c0 35.19 29.75 64 65 64h87a88.09 88.09 0 0 0 87.93-91.48C246.11 77.54 207.07 40 160.06 40",
  search:
    "M168 112a56 56 0 1 1-56-56a56 56 0 0 1 56 56m61.66 117.66a8 8 0 0 1-11.32 0l-50.06-50.07a88 88 0 1 1 11.32-11.31l50.06 50.06a8 8 0 0 1 0 11.32M112 184a72 72 0 1 0-72-72a72.08 72.08 0 0 0 72 72",
  link: "M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-63.44 141.66l-21.45 21.45a44 44 0 0 1-62.22-62.22l21.45-21.46a8 8 0 0 1 11.32 11.31L72.2 144.2a28 28 0 0 0 39.6 39.6l21.45-21.46a8 8 0 0 1 11.31 11.32m-34.9-16a8 8 0 0 1-11.32-11.32l48-48a8 8 0 0 1 11.32 11.32Zm85.45-34.55l-21.45 21.45a8 8 0 0 1-11.32-11.31l21.46-21.45a28 28 0 0 0-39.6-39.6l-21.46 21.46a8 8 0 0 1-11.31-11.32l21.46-21.45a44 44 0 0 1 62.22 62.22",
  bookmark:
    "M184 32H72a16 16 0 0 0-16 16v176a8 8 0 0 0 12.24 6.78L128 193.43l59.77 37.35A8 8 0 0 0 200 224V48a16 16 0 0 0-16-16",
  upload:
    "M224 144v64a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v56h160v-56a8 8 0 0 1 16 0M88 80h32v64a8 8 0 0 0 16 0V80h32a8 8 0 0 0 5.66-13.66l-40-40a8 8 0 0 0-11.32 0l-40 40A8 8 0 0 0 88 80",
  check:
    "M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32",
  star: "m234.29 114.85-45 38.83L203 211.75a16.4 16.4 0 0 1-24.5 17.82L128 198.49l-50.53 31.08A16.4 16.4 0 0 1 53 211.75l13.76-58.07-45-38.83A16.46 16.46 0 0 1 31.08 86l59-4.76 22.76-55.08a16.36 16.36 0 0 1 30.27 0l22.75 55.08 59 4.76a16.46 16.46 0 0 1 9.37 28.86Z",
  left: "M165.66 202.34a8 8 0 0 1-11.32 11.32l-80-80a8 8 0 0 1 0-11.32l80-80a8 8 0 0 1 11.32 11.32L91.31 128Z",
  right:
    "m181.66 133.66-80 80a8 8 0 0 1-11.32-11.32L164.69 128 90.34 53.66a8 8 0 0 1 11.32-11.32l80 80a8 8 0 0 1 0 11.32",
  menu: "M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8M40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16m176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16",
  close:
    "M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z",
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
      height={size}
      viewBox="0 0 256 256"
      width={size}
    >
      <path d={iconPaths[name]} fill="currentColor" />
    </svg>
  );
}

const featureCards = [
  {
    icon: "camera" as const,
    title: "Quick Capture",
    description:
      "Jot down ideas instantly from your lock screen widget. No loading, no friction — just write.",
  },
  {
    icon: "sparkle" as const,
    title: "AI Across All Notes",
    description:
      'Ask questions that reference your actual notes — not the internet. "What did I decide in last week’s meeting?"',
  },
  {
    icon: "text" as const,
    title: "Rich Text Editor",
    description:
      "Bold, highlight, checklists, tables, and inline images. A full editor that stays out of your way.",
  },
];

const visualFeatures = [
  {
    icon: "folder" as const,
    title: "Folders & Smart Tags",
    description:
      "Keep everything sorted with nested folders and colour-coded tags. Find anything.",
    image: "/assets/folders.png",
  },
  {
    icon: "cloud" as const,
    title: "iCloud Everywhere",
    description:
      "Your notes sync instantly across devices. Always there, always in sync, always offline-ready.",
    image: "/assets/sync.png",
  },
  {
    icon: "search" as const,
    title: "Search Everything",
    description:
      "Search by keyword, tag, folder, or date. Natural language search that understands what you mean.",
    image: "/assets/search.png",
  },
];

const tabItems = [
  {
    label: "Select your model",
    title: "Pick Your Model",
    description: "Choose the AI that fits the task.",
    detail:
      "Switch between your favorite models directly inside Slate for writing, research, brainstorming, or summarization.",
    metric: "4+ Models",
    metricDetail: "Available in a single workspace",
    image: "/assets/model.png",
  },
  {
    label: "Capture Content",
    title: "Capture From Anywhere",
    description: "Type, upload, or ask Siri.",
    detail:
      "Capture thoughts the moment they appear, then keep every idea organized in the same intelligent workspace.",
    metric: "3 Ways to Capture",
    metricDetail: "Keyboard, files, and Siri",
    image: "/assets/tab-capture.png",
  },
  {
    label: "Get Intelligent Answers",
    title: "Get Intelligent Answers",
    description: "Turn information into insights.",
    detail:
      "Ask questions across notes and documents, then save useful answers directly back into your knowledge base.",
    metric: "5× Faster Retrieval",
    metricDetail: "Compared to manual searching",
    image: "/assets/tab-answer.png",
  },
];

const processes = [
  {
    icon: "sparkle" as const,
    title: "Ask",
    description:
      "Ask anything and get answers grounded in your notes, files, and personal knowledge.",
  },
  {
    icon: "link" as const,
    title: "Link",
    description:
      "Create a connected knowledge system where every note adds valuable context.",
  },
  {
    icon: "bookmark" as const,
    title: "Save",
    description:
      "Capture insights the moment they appear and keep them organized automatically.",
  },
  {
    icon: "upload" as const,
    title: "Upload",
    description:
      "Import documents, images, and PDFs to make your workspace smarter.",
  },
];

const steps = [
  {
    index: "01",
    title: "Download and sign in",
    description:
      "Install Slate from the Mac App Store. Sign in with your Apple ID and all your existing iCloud notes sync automatically.",
    image: "/assets/step-install.png",
  },
  {
    index: "02",
    title: "Write Your Notes",
    description:
      "Use Quick Capture for instant ideas, or the rich editor for longer writing. Organise into folders and tag as you go.",
    image: "/assets/step-write.png",
  },
  {
    index: "03",
    title: "Ask the AI Anything",
    description:
      "Open the AI panel and ask across all your notes. Summarise, plan, connect — save the answer as a new note in one tap.",
    image: "/assets/step-ask.png",
  },
];

const plans = [
  {
    name: "Free Plan",
    price: "$0",
    description:
      "For individuals who want smarter personal notes without a subscription.",
    features: [
      "Up to 50 notes",
      "Basic folder structure",
      "iCloud sync across devices",
      "Lock screen & home screen widget",
      "Rich text editor",
      "10 AI queries per month",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Pro Plan",
    price: "$4.99",
    description:
      "For power users who live inside their notes every day and want full AI.",
    features: [
      "Unlimited notes",
      "Unlimited AI queries",
      "Cross-note AI reasoning",
      "PDF & image AI analysis",
      "Note linking & backlinks",
      "Priority support (24h SLA)",
    ],
    cta: "Join Pro",
    popular: true,
  },
];

const comparisons = [
  ["Notes", "Up to 50", "Unlimited"],
  ["AI queries", "10/month", "Unlimited"],
  ["Cross-note AI", "—", true],
  ["PDF & image", "—", true],
  ["Note linking & backlinks", "—", true],
  ["Future updates", "Limited", "While subscribed"],
] as const;

const reviews = [
  {
    name: "Sara Jones",
    role: "Creative Director",
    photo: "/assets/review-sara.jpeg",
    quote:
      "The morning routine streak tracker in my notes has kept me consistent for 14 days. The AI spotted that I perform better on days I journal before meditating — from my own words.",
  },
  {
    name: "Nick",
    role: "Author & Researcher",
    photo: "/assets/review-nick.jpeg",
    quote:
      "Replaced Notion, Obsidian, and my ChatGPT habit in a single week. The AI reads my notes, not the internet — that changes everything.",
  },
  {
    name: "James Park",
    role: "Student",
    photo: "/assets/review-james.jpeg",
    quote:
      "As a medical student, I take hundreds of notes a week. Slate’s cross-note AI has replaced my physical flashcard system.",
  },
  {
    name: "Marcus Taylor",
    role: "Freelance Consultant",
    photo: "/assets/review-marcus.jpeg",
    quote:
      "I’ve used every notes app since Evernote in 2010. Slate is the first one where AI actually adds value rather than getting in the way.",
  },
];

const faqs = [
  {
    question: "Does Slate work on iPhone and iPad too?",
    answer:
      "Yes. Slate works on iPhone, iPad, Mac, Apple Watch, and widgets, with real-time iCloud sync and device-optimized experiences.",
  },
  {
    question: "Can i import my existing notes from other apps?",
    answer:
      "Yes. Apple Notes sync automatically through iCloud. Import from Notion, Obsidian, Bear, Markdown, HTML, and text files in a few clicks.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Absolutely. Write, edit, and search offline. Notes sync automatically when you’re back online. Only cloud AI features require internet.",
  },
  {
    question: "What does a 14 day free trial of pro include?",
    answer:
      "Everything. Enjoy unlimited notes, AI features, PDF analysis, and note linking for 14 days. No credit card required.",
  },
  {
    question: "Can i export my notes if i decide to leave ?",
    answer:
      "Always. Export notes as Markdown, PDF, HTML, or text with no limits, restrictions, or lock-in. Your data stays yours.",
  },
];

function Logo() {
  return (
    <a aria-label="Slate home" className="logo" href="#top">
      <Image
        alt=""
        height={22}
        priority
        src="/assets/brand-logo.png"
        width={26}
      />
      <span>Slate</span>
    </a>
  );
}

function PrimaryButton({
  children,
  href,
  small = false,
}: {
  children: React.ReactNode;
  href: string;
  small?: boolean;
}) {
  return (
    <a className={`primary-button${small ? " primary-button--small" : ""}`} href={href}>
      {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className={`site-header${open ? " site-header--open" : ""}`}>
      <div className="header-inner">
        <Logo />
        <nav aria-label="Primary navigation" className="desktop-nav">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">Faq</a>
          <a href="#setup">Setup</a>
        </nav>
        <div className="header-cta">
          <PrimaryButton href="#pricing" small>
            Get Started
          </PrimaryButton>
        </div>
        <button
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="menu-button"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
        </button>
      </div>
      <nav aria-label="Mobile navigation" className="mobile-nav">
        <a href="#features" onClick={() => setOpen(false)}>
          Features
        </a>
        <a href="#pricing" onClick={() => setOpen(false)}>
          Pricing
        </a>
        <a href="#faq" onClick={() => setOpen(false)}>
          Faq
        </a>
        <a href="#setup" onClick={() => setOpen(false)}>
          Setup
        </a>
        <PrimaryButton href="#pricing" small>
          Get Started
        </PrimaryButton>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-background" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="announcement hero-announcement">
            <span>New</span>
            Built in Apple Intelligence
          </div>
          <h1>
            Notes that
            <br />
            think with you
          </h1>
          <p>
            Write naturally. Ask anything. Slate turns your scattered thoughts
            into a personal knowledge base that actually works.
          </p>
          <PrimaryButton href="#features">Start your free trial</PrimaryButton>
        </div>
        <div className="hero-product">
          <Image
            alt="Slate notes workspace"
            fill
            priority
            sizes="(max-width: 809px) 92vw, 800px"
            src="/assets/app-board.png"
          />
        </div>
      </div>
    </section>
  );
}

function IntroStatement() {
  return (
    <section className="intro-statement">
      <div className="motion-text" data-reveal>
        <p>
          Information is everywhere. Notes, files,
          <br />
          conversations live across different tools.
        </p>
        <strong>
          Slate brings everything together into
          <br />
          one intelligent workspace.
        </strong>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="section" id="features">
      <div className="section-heading">
        <h2>
          Smart features for
          <br />
          everyday notes
        </h2>
        <p>
          Everything you need to capture, organise, and access your ideas —
          beautifully simple.
        </p>
      </div>

      <div className="small-feature-grid">
        {featureCards.map((item, index) => (
          <article
            className="small-feature-card motion-card"
            data-reveal
            key={item.title}
            style={
              { "--reveal-delay": `${100 + index * 40}ms` } as React.CSSProperties
            }
          >
            <div className="small-feature-header">
              <Icon className="blue-icon" name={item.icon} size={26} />
              <h3>{item.title}</h3>
            </div>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <div className="visual-feature-grid">
        {visualFeatures.map((item, index) => (
          <article
            className="visual-feature motion-card"
            data-reveal
            key={item.title}
            style={
              { "--reveal-delay": `${100 + index * 40}ms` } as React.CSSProperties
            }
          >
            <div className="visual-feature-image">
              <Image
                alt={`${item.title} in Slate`}
                fill
                sizes="(max-width: 809px) 100vw, 33vw"
                src={item.image}
              />
            </div>
            <h3>
              <Icon className="blue-icon" name={item.icon} size={22} />
              {item.title}
            </h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureTabs() {
  const [active, setActive] = useState(0);
  const item = tabItems[active];

  return (
    <section className="section feature-tabs-section">
      <div className="section-heading">
        <h2>From idea to action in seconds.</h2>
        <p>
          Choose how you want to work. Slate adapts to your workflow, not the
          other way around.
        </p>
      </div>

      <div aria-label="Feature examples" className="tab-list" role="tablist">
        {tabItems.map((tab, index) => (
          <button
            aria-selected={active === index}
            className={active === index ? "is-active" : ""}
            key={tab.label}
            onClick={() => setActive(index)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <article className="feature-panel motion-card" data-reveal>
        <div className="feature-panel-copy panel-switch-in" key={`copy-${item.label}`}>
          <Icon className="blue-icon feature-panel-icon" name="sparkle" size={30} />
          <h3>{item.title}</h3>
          <p className="feature-panel-lede">{item.description}</p>
          <p>{item.detail}</p>
          <div className="feature-panel-metric">
            <strong>{item.metric}</strong>
            <span>{item.metricDetail}</span>
          </div>
        </div>
        <div className="feature-panel-image" key={item.image}>
          <Image
            alt={`${item.title} feature`}
            fill
            sizes="(max-width: 809px) 90vw, 50vw"
            src={item.image}
          />
        </div>
      </article>
    </section>
  );
}

function Knowledge() {
  return (
    <section className="section knowledge">
      <div className="section-heading">
        <h2>
          AI that reads
          <br />
          your notes
        </h2>
        <p>
          Not a generic chatbot. Slate’s AI reads across every note you’ve
          written and connects the dots for you.
        </p>
      </div>
      <div className="knowledge-image motion-card" data-reveal>
        <Image
          alt="Slate notes with an AI answer panel"
          fill
          sizes="(max-width: 809px) 100vw, 800px"
          src="/assets/model.png"
        />
      </div>
      <div className="process-grid">
        {processes.map((process) => (
          <article className="process-card" key={process.title}>
            <h3>
              <Icon className="blue-icon" name={process.icon} size={22} />
              {process.title}
            </h3>
            <p>{process.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Setup() {
  return (
    <section className="section setup" id="setup">
      <div className="section-heading">
        <h2>
          Up and running
          <br />
          in three steps
        </h2>
        <p>From install to first AI-powered note in under two minutes.</p>
      </div>
      <div className="steps">
        {steps.map((step) => (
          <article className="step" key={step.index}>
            <div className="step-index">
              <span />
              Step {step.index}
            </div>
            <div className="step-image">
              <Image
                alt={step.title}
                fill
                sizes="(max-width: 809px) 100vw, 320px"
                src={step.image}
              />
            </div>
            <div className="step-copy">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <a href="#features">Know more</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="section-heading">
        <h2>
          Honest pricing,
          <br />
          no dark patterns
        </h2>
        <p>
          No hidden limits, no sudden paywalls mid-sentence. Start free, upgrade
          when it clicks.
        </p>
      </div>

      <div className="plans motion-card" data-reveal>
        {plans.map((plan) => (
          <article className="plan-card" key={plan.name}>
            <div className="plan-topline">
              <h3>
                <Icon className="blue-icon" name={plan.popular ? "sparkle" : "search"} size={20} />
                {plan.name}
              </h3>
              {plan.popular ? <span className="popular-label">Most Popular</span> : null}
            </div>
            <div className="plan-price">
              <strong>{plan.price}</strong>
              <span>/ per month</span>
            </div>
            <div className="plan-description">
              <p>{plan.description}</p>
              <span className="billing-toggle">
                <i />
                Billed yearly
              </span>
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Icon className="blue-icon" name="check" size={15} />
                  {feature}
                </li>
              ))}
            </ul>
            <a className="plan-button" href="#setup">
              {plan.cta}
            </a>
          </article>
        ))}
      </div>

      <div className="comparison-table motion-card" data-reveal>
        <div className="comparison-row comparison-head">
          <strong>Feature Comparison</strong>
          <strong>Free</strong>
          <strong>Pro</strong>
        </div>
        {comparisons.map(([feature, free, pro]) => (
          <div className="comparison-row" key={feature}>
            <strong>{feature}</strong>
            <span>{free}</span>
            <span>
              {pro === true ? (
                <Icon className="blue-icon" name="check" size={19} />
              ) : (
                pro
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const [active, setActive] = useState(0);
  const review = reviews[active];

  const move = (direction: number) => {
    setActive((current) => (current + direction + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => move(1), 3000);
    return () => window.clearTimeout(timeout);
  }, [active]);

  return (
    <section className="section reviews">
      <div className="section-heading">
        <h2>What people actually say</h2>
        <p>
          From students to founders, solo writers to startup teams — slate fits
          the way real people think.
        </p>
      </div>
      <div className="review-slider motion-review" data-reveal>
        <article aria-live="polite" className="review-card" key={review.name}>
          <div className="review-person">
            <Image alt="" height={54} src={review.photo} width={54} />
            <div>
              <strong>{review.name}</strong>
              <span>{review.role}</span>
            </div>
          </div>
          <div aria-label="5 out of 5 stars" className="stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <Icon key={index} name="star" size={22} />
            ))}
          </div>
          <blockquote>“{review.quote}”</blockquote>
        </article>
        <div className="review-controls">
          <button aria-label="Previous review" onClick={() => move(-1)} type="button">
            <Icon name="left" size={18} />
          </button>
          <button aria-label="Next review" onClick={() => move(1)} type="button">
            <Icon name="right" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section faq" id="faq">
      <div className="faq-intro">
        <h2>Frequently aksed questions</h2>
        <p>
          Still have questions? Reach out to us at{" "}
          <a href="mailto:helloslateai.com">@helloslateai.com</a>
        </p>
      </div>
      <div className="faq-list motion-faq" data-reveal>
        {faqs.map((faq, index) => {
          const expanded = open === index;
          return (
            <article className={`faq-item${expanded ? " is-open" : ""}`} key={faq.question}>
              <button
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : index)}
                type="button"
              >
                <span>{faq.question}</span>
                <span aria-hidden="true">{expanded ? "−" : "+"}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <picture aria-hidden="true">
        <source media="(max-width: 809px)" srcSet="/assets/cta-phone.png" />
        <source media="(max-width: 1199px)" srcSet="/assets/cta-tablet.png" />
        <img alt="" src="/assets/cta-wide.png" />
      </picture>
      <div className="final-cta-copy">
        <h2>
          Your second brain,
          <br />
          already written
        </h2>
        <p>
          Everything you know, connected. Every idea you’ve had, searchable. One
          prompt away from anything you need.
        </p>
        <PrimaryButton href="#setup" small>
          Download App
        </PrimaryButton>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <Logo />
        <p>The smartest notes app.</p>
      </div>
      <div className="footer-links">
        <div>
          <strong>Sections</strong>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">Faq</a>
          <a href="/404">404</a>
        </div>
        <div>
          <strong>Socials</strong>
          <a href="https://x.com/mriduljoshi_">X</a>
          <a href="https://www.linkedin.com">Linkedin</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export function SlateHomepage() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <IntroStatement />
        <Features />
        <FeatureTabs />
        <Knowledge />
        <Setup />
        <Pricing />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
