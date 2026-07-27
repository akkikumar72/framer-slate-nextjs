import type { Metadata } from "next";
import Link from "next/link";
import {
  CtaSection,
  GradientText,
  PageHero,
} from "@/components/saazai/shared/SaazaiSections";
import styles from "@/components/saazai/product/ProductPages.module.css";

export const metadata: Metadata = {
  title: "Features | Saazai",
  description:
    "Explore Saazai's intelligent automation, AI collaboration, insights, and integrations.",
};

const showcaseFeatures = [
  {
    title: "Smart chats that understand you.",
    copy: "Chat with an AI that thinks beyond words. It reads context and understands meaning.",
    visual: "chat",
  },
  {
    title: "Dynamic logic system",
    copy: "From numbers to actions, your AI knows what to do next. It calculates and organizes.",
    visual: "logic",
  },
  {
    title: "Autonomous operations.",
    copy: "Your AI observes, learns, and optimizes in the background. It scans systems.",
    visual: "orbit",
  },
];

const foundations = [
  {
    icon: "◯",
    title: "Conversational AI",
    copy: "Your AI improves continuously with every chat, command, and action.",
  },
  {
    icon: "⬡",
    title: "Automation engine",
    copy: "Automate your daily workflows and repetitive tasks. Let your AI Agent handle actions.",
  },
  {
    icon: "▦",
    title: "Smart insights",
    copy: "See patterns before they happen. Your AI learns from data and gives actionable insights.",
  },
  {
    icon: "⌁",
    title: "Integrations",
    copy: "Connect your favorite tools in one place. From Slack to Notion, your AI Agent.",
  },
  {
    icon: "▤",
    title: "Adaptive learning",
    copy: "It evolves with you. Every chat, action, and command makes your AI more accurate.",
  },
];

const advanced = [
  {
    title: "Automated background checks",
    copy: "Your agent converts actions into scalable and reusable UI patterns.",
  },
  {
    title: "Simple command processing",
    copy: "Your agent transforms every action into scalable UI design patterns.",
  },
  {
    title: "Build and document",
    copy: "MarketAI is revolutionizing the way businesses approach market analysis.",
  },
  {
    title: "Adaptive UI",
    copy: "The design adjusts dynamically based on user interactions and real-time AI recommendations.",
  },
  {
    title: "End-to-end encryption",
    copy: "Security is our priority. All chatbot conversations remain private.",
  },
];

export default function FeaturesPage() {
  return (
    <div className={styles.productPage}>
      <PageHero
        breadcrumb="Home / Feature"
        description="Empowering your workflows"
      >
        Smarter features.
        <br />
        <GradientText>faster results.</GradientText>
      </PageHero>

      <section className={styles.brandBand}>
        <p>Trusted by Thousands of users.</p>
        <div className={styles.brandLogos}>
          {["Netdot", "Veltrix", "Sparkweb", "Webgear", "Digitech"].map(
            (brand, index) => (
              <span key={brand}>
                <i>{["N", "V", "S", "W", "D"][index]}</i>
                {brand}
              </span>
            )
          )}
        </div>
      </section>

      <section className={styles.featureSection}>
        <p className={styles.eyebrow}>✣ &nbsp; Features</p>
        <h2 className={styles.sectionHeading}>
          Powerful tools made
          <br />
          simple with AI.
        </h2>
        <div className={styles.featureShowcaseGrid}>
          {showcaseFeatures.map((feature) => (
            <article className={styles.showcaseCard} key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              {feature.visual === "orbit" ? (
                <div aria-hidden="true" className={styles.orbitalUi} />
              ) : (
                <div aria-hidden="true" className={styles.miniUi} />
              )}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.featureSection}>
        <p className={styles.eyebrow}>✣ &nbsp; Features</p>
        <h2 className={styles.sectionHeading}>
          Powerful features.
          <br />
          seamless experience.
        </h2>
        <div className={styles.simpleFeatureGrid}>
          {[
            "Human-Like Reasoning",
            "Context-Aware Intelligence",
            "Multi-Agent Collaboration",
          ].map((title, index) => (
            <article className={styles.simpleFeatureCard} key={title}>
              <h3>{title}</h3>
              <p>
                Different AI agents for writing, data, design, and logic. All
                working together seamlessly.
              </p>
              <div
                aria-hidden="true"
                className={
                  index === 2 ? styles.orbitalUi : styles.miniUi
                }
              />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.foundations}>
        <div className={styles.foundationIntro}>
          <h2>Built on intelligent foundations</h2>
          <p>
            The core of seamless automation, human-like conversation, and
            adaptive intelligence, all powered by our AI Agent.
          </p>
          <Link href="/saazai/integration">Discover our AI platform&nbsp; →</Link>
        </div>
        {foundations.map((feature) => (
          <article className={styles.foundationCard} key={feature.title}>
            <span aria-hidden="true" className={styles.iconTile}>
              {feature.icon}
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
          </article>
        ))}
      </section>

      <section className={styles.advancedSection}>
        <p className={styles.eyebrow}>✣ &nbsp; Features</p>
        <h2 className={styles.sectionHeading}>
          Advanced Capabilities.
          <br />
          Effortless Experience.
        </h2>
        <div className={styles.advancedGrid}>
          {advanced.map((feature) => (
            <article className={styles.advancedCard} key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              <div aria-hidden="true" className={styles.advancedViz}>
                <span />
                <span />
                <span />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closingFeatureGrid}>
        {[
          {
            title: "Human-Like Reasoning",
            copy: "Different AI agents for writing, data, design, and logic, working in concert.",
            tags: ["Writing", "Metrics", "Design", "Signals", "Logic"],
          },
          {
            title: "Context-Aware Memory",
            copy: "Your AI remembers past chats, projects, and preferences so conversations stay useful.",
            tags: ["Projects", "Memory", "Context"],
          },
          {
            title: "Multi-Agent Collaboration",
            copy: "Understands context, emotion, and nuance. It thinks before it replies.",
            tags: ["OpenAI", "Claude", "Gemini", "Teams"],
          },
        ].map((feature) => (
          <article className={styles.closingCard} key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
            <div className={styles.tagCloud}>
              {feature.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
      <CtaSection />
    </div>
  );
}
