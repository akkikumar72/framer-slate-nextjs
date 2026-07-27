import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  CtaSection,
  GradientText,
  PatternBand,
  PrimaryButton,
  SectionLabel,
} from "@/components/saazai/shared/SaazaiSections";
import { HeroAnimation } from "./HeroAnimation";
import { LandingMotion } from "./LandingMotion";
import { TestimonialCarousel } from "./TestimonialCarousel";
import styles from "./HomePage.module.css";

const logos = [
  ["de86804fa452348a.svg", "Netdot"],
  ["cebe8a610eb3a544.svg", "Veltrix"],
  ["0a40af827e6d660f.svg", "Sparkweb"],
  ["131f28858dcc928a.svg", "Webgear"],
  ["df412a5618f6229c.svg", "Digitech"],
  ["94a69fcee5639377.svg", "Codeblink"],
];

const foundations = [
  ["Conversational AI", "Your AI improves continuously with every chat, command, and action."],
  ["Automation engine", "Every interaction helps your AI become smarter and more accurate."],
  ["Smart insights", "Your AI evolves over time through every user interaction it receives."],
  ["Integrations", "Connect your favorite tools in one place. From Slack to Notion your AI Agent."],
  ["Adaptive learning", "It evolves with you, every chat, action, and command makes your AI smarter."],
];

const capabilities = [
  ["Automated background checks", "Your agent converts actions into scalable and reusable UI patterns."],
  ["Simple command processing", "Your agent transforms every action into scalable UI design patterns."],
  ["Build and document", "MarketAI is revolutionizing the way businesses approach market analysis."],
  ["Adaptive UI", "The design adjusts dynamically based on user interactions and real-time AI-driven recommendations."],
  ["End-to-end encryption", "Security is our priority. With end-to-end encryption, all chatbot conversations remain private."],
];

export function HomePage() {
  return (
    <>
      <LandingMotion />
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.releasePill}>
            <span aria-hidden="true" className={styles.releaseSparkles}>
              <i />
              <i />
              <i />
            </span>
            Omni.Agent V2.0 coming soon
          </p>
          <h1>
            Be 10X more efficient
            <br />
            <GradientText>without micromanaging</GradientText>
          </h1>
          <p className={styles.heroDescription}>
            When no tool fits the need, that’s when our AI agent shines.
          </p>
          <div className={styles.heroActions}>
            <PrimaryButton href="/saazai/pricing">Try Free for 14 Days</PrimaryButton>
            <Link className={styles.secondaryButton} href="/saazai/contact">
              Book a Demo
            </Link>
          </div>
          <div className={styles.heroChecks}>
            <span>✓ Collaborate with your team</span>
            <span>✓ Organize projects at a glance</span>
            <span>✓ Manage everything easily</span>
          </div>
        </div>
        <HeroAnimation />
      </section>

      <section className={`${styles.logoStrip} ${styles.reveal}`} data-sz-reveal>
        <p>Trusted by Thousands of users</p>
        <div>
          {logos.map(([file, name]) => (
            <Image
              alt={name}
              height={34}
              key={file}
              src={`/saazai/assets/${file}`}
              width={155}
            />
          ))}
        </div>
      </section>

      <section className={styles.introCards}>
        <article className={`${styles.introCard} ${styles.reveal}`} data-sz-reveal>
          <div>
            <h2>Human-Like Reasoning</h2>
            <p>Different AI agents for writing, data, design, and logic, working together.</p>
          </div>
          <div className={styles.reasoningTags}>
            <div className={styles.reasoningCore}>✣</div>
            {["Writing", "Design", "Logic", "Data", "Insights", "Clarity"].map((tag, index) => (
              <span
                key={tag}
                style={{ "--tag-angle": `${index * 60}deg` } as CSSProperties}
              >
                <b>{tag}</b>
              </span>
            ))}
          </div>
        </article>
        <article
          className={`${styles.introCard} ${styles.reveal}`}
          data-sz-reveal
          style={motionStyle(100)}
        >
          <div>
            <h2>Context Memory</h2>
            <p>Your AI remembers past chats, projects, and preferences so conversations stay useful.</p>
          </div>
          <Image
            alt="AI prompt builder with context memory"
            height={360}
            src="/saazai/assets/91ce62d914b728b1.avif"
            width={490}
          />
        </article>
        <article
          className={`${styles.introCard} ${styles.reveal}`}
          data-sz-reveal
          style={motionStyle(200)}
        >
          <div>
            <h2>Multi-Agent Collaboration</h2>
            <p>Understands context, emotion, and nuance, then routes work to the right specialist.</p>
          </div>
          <div className={styles.agentMap}>
            {["Write", "Research", "Analyze", "Design", "Plan", "Review", "Code", "Ship"].map(
              (agent, index) => (
                <span
                  key={agent}
                  style={{ "--agent-index": index } as CSSProperties}
                >
                  {agent}
                </span>
              ),
            )}
          </div>
        </article>
      </section>

      <PatternBand />

      <section className={styles.foundation}>
        <div className={`${styles.foundationLead} ${styles.reveal}`} data-sz-reveal>
          <h2>Built on intelligent foundations</h2>
          <p>
            The core of seamless automation, human-like conversation, and adaptive intelligence,
            all powered by our AI Agent.
          </p>
          <Link href="/saazai/features">Discover our AI platform →</Link>
        </div>
        {foundations.map(([title, copy], index) => (
          <article
            className={styles.reveal}
            data-sz-reveal
            key={title}
            style={motionStyle((index % 2) * 110)}
          >
            <span className={styles.foundationIcon}>
              <FoundationIcon index={index} />
            </span>
            <div className={styles.foundationCopy}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </section>

      <PatternBand />

      <section className={styles.experience}>
        <div className={styles.reveal} data-sz-reveal>
          <SectionLabel>Features</SectionLabel>
          <h2>Powerful features<br />seamless experience.</h2>
        </div>
        <div className={styles.experienceGrid}>
          <article className={styles.reveal} data-sz-reveal>
            <div className={`${styles.experienceVisual} ${styles.reasoningVisual}`} aria-hidden="true">
              <Image
                alt=""
                className={styles.reasoningPanel}
                height={761}
                src="/saazai/assets/ed18c12a79940562.avif"
                unoptimized
                width={1379}
              />
              <Image
                alt=""
                className={styles.reasoningPrompt}
                height={190}
                src="/saazai/assets/e925dbd0f5f6626f.avif"
                unoptimized
                width={1440}
              />
            </div>
            <div className={styles.experienceCopy}>
              <h3>Human-Like Reasoning</h3>
              <p>Different AI agents for writing, data, design, and logic, all working together seamlessly.</p>
            </div>
          </article>
          <article className={styles.reveal} data-sz-reveal style={motionStyle(100)}>
            <div className={styles.experienceCopy}>
              <h3>Generative UI system</h3>
              <p>Every interaction trains your AI to deliver more accurate results.</p>
            </div>
            <div className={`${styles.experienceVisual} ${styles.generativeVisual}`} aria-hidden="true">
              <Image
                alt=""
                className={styles.generativeAccount}
                height={272}
                src="/saazai/assets/ffa4bd213a6fa4fb.avif"
                unoptimized
                width={1099}
              />
              <Image
                alt=""
                className={styles.generativePayout}
                height={893}
                src="/saazai/assets/2f535c76617bcc43.avif"
                unoptimized
                width={1132}
              />
            </div>
          </article>
          <article className={styles.reveal} data-sz-reveal style={motionStyle(180)}>
            <div className={styles.experienceCopy}>
              <h3>Smart workplaces that self-manage</h3>
              <p>Set it once, and let AI handle repetitive tasks, schedule updates, and sync across.</p>
            </div>
            <div className={`${styles.experienceVisual} ${styles.workplaceVisual}`} aria-hidden="true">
              <Image
                alt=""
                className={styles.workplacePanel}
                height={930}
                src="/saazai/assets/24b1fd9e2fe56e8b.avif"
                unoptimized
                width={1516}
              />
              <Image
                alt=""
                className={styles.workplaceTag}
                height={62}
                src="/saazai/assets/3eba81aa36017db2.svg"
                unoptimized
                width={131}
              />
            </div>
          </article>
        </div>
      </section>

      <PatternBand />
      <div className={styles.reveal} data-sz-reveal>
        <TestimonialCarousel />
      </div>
      <PatternBand />

      <section className={styles.capabilities}>
        <div className={styles.reveal} data-sz-reveal>
          <SectionLabel>Features</SectionLabel>
          <h2>Advanced Capabilities.<br />Effortless Experience.</h2>
        </div>
        <div className={styles.capabilityGrid}>
          {capabilities.map(([title, copy], index) => (
            <article
              className={`${styles.reveal} ${index > 2 ? styles.capabilityWide : ""}`}
              data-sz-reveal
              key={title}
              style={motionStyle((index % 3) * 90)}
            >
              <div className={styles.capabilityCopy}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <CapabilityVisual index={index} />
            </article>
          ))}
        </div>
      </section>

      <PatternBand />

      <section className={styles.pricing}>
        <div className={`${styles.pricingHead} ${styles.reveal}`} data-sz-reveal>
          <div>
            <SectionLabel>Pricing</SectionLabel>
            <h2>Smarter plans for<br />smarter workflows</h2>
          </div>
          <Link href="/saazai/pricing">Compare all plans →</Link>
        </div>
        <div className={styles.pricingGrid}>
          <div className={styles.reveal} data-sz-reveal>
            <PlanCard
              features={[
                "Access to 1 AI Agent",
                "Up to 10,000 conversations",
                "Context-aware chat memory",
                "Smart task automation",
                "Email & file summarization",
                "24/7 support",
              ]}
              name="Growing"
              price="$49"
            />
          </div>
          <div className={styles.reveal} data-sz-reveal style={motionStyle(120)}>
            <PlanCard
              features={[
                "Up to 5 custom AI Agents",
                "50,000 conversations/month",
                "Dedicated manager",
                "API + custom tools",
                "Private deployment",
                "Multi-user collaboration",
              ]}
              name="Enterprise"
              price="$39"
            />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

function CapabilityVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div aria-hidden="true" className={`${styles.capabilityVisual} ${styles.scanVisual}`}>
        <i><b>✓</b><span /><span /></i>
        <i><b>✓</b><span /><span /></i>
        <i><b>✓</b><span /><span /></i>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div aria-hidden="true" className={`${styles.capabilityVisual} ${styles.commandVisual}`}>
        <span><i>⌘</i> Command</span><b>K</b>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div aria-hidden="true" className={`${styles.capabilityVisual} ${styles.documentVisual}`}>
        <i>▤ <span>Ownership Contract</span></i>
        <i>▤ <span>Equity Agreement</span></i>
        <i>▤ <span>Shareholder Agreement</span></i>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div aria-hidden="true" className={`${styles.capabilityVisual} ${styles.adaptiveVisual}`}>
        <Image
          alt=""
          height={904}
          src="/saazai/assets/d6e7fadcb7a25c42.avif"
          unoptimized
          width={1650}
        />
        <span className={styles.adaptiveCursor}>
          Alina neor
          <Image
            alt=""
            height={512}
            src="/saazai/assets/2f5eb65e309d47db.avif"
            unoptimized
            width={512}
          />
        </span>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={`${styles.capabilityVisual} ${styles.securityVisual}`}>
      <Image
        alt=""
        className={styles.securityCode}
        height={177}
        src="/saazai/assets/7bb2c238b694e214.svg"
        unoptimized
        width={541}
      />
      <span className={styles.securityShield}><i>✓</i></span>
    </div>
  );
}

function FoundationIcon({ index }: { index: number }) {
  const common = {
    "aria-hidden": true,
    fill: "none",
    height: 32,
    viewBox: "0 0 32 32",
    width: 32,
  };

  if (index === 0) {
    return (
      <svg {...common}>
        <path d="M7 8.5h7.8a6 6 0 0 1 6 6V17a6 6 0 0 1-6 6H11l-4 3v-3.9A6 6 0 0 1 4 17v-2.5a6 6 0 0 1 3-5.2Z" />
        <path d="M18.5 12H21a7 7 0 0 1 7 7v6l-3.5-2H21a7 7 0 0 1-6.4-4.2" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg {...common}>
        <path d="M9 9h14l4 4v8l-4 4H9l-4-4v-8l4-4Z" />
        <path d="M13 5h6M13 27h6M2 14v4M30 14v4" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg {...common}>
        <path d="M6 6v20h20" />
        <circle cx="11" cy="20" r="1.5" />
        <circle cx="16" cy="17" r="1.5" />
        <circle cx="21" cy="12" r="1.5" />
        <circle cx="25" cy="8" r="1.5" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg {...common}>
        <path d="M5 21 18 8l8 8-13 13H5v-8Z" />
        <path d="m14 12 8 8M8 21l4 4M20 6l6 6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect height="20" rx="2" width="16" x="6" y="6" />
      <path d="M10 10h8M10 14h8M10 18h5M10 22h7M24 10h2v16H10v-2" />
    </svg>
  );
}

function motionStyle(delay: number) {
  return { "--sz-delay": `${delay}ms` } as CSSProperties;
}

function PlanCard({
  features,
  name,
  price,
}: {
  features: string[];
  name: string;
  price: string;
}) {
  return (
    <article className={styles.planCard}>
      <p className={styles.planName}>◈ <span>{name}</span></p>
      <p>Perfect for growing teams that need to start fast.</p>
      <div className={styles.planPrice}>
        <strong>{price}</strong><span>/month</span>
      </div>
      <ul>
        {features.map((feature) => <li key={feature}>✣ {feature}</li>)}
      </ul>
      <Link href="/saazai/contact">Get Started</Link>
    </article>
  );
}
