import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/saazai/company/company.module.css";
import {
  CtaSection,
  FeatureCard,
  GradientText,
  PatternBand,
  PrimaryButton,
  SectionLabel,
  StandardSection,
} from "@/components/saazai/shared/SaazaiSections";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet the team redefining how people work with intelligent AI assistants.",
};

const foundations = [
  {
    icon: "◌",
    title: "Conversational AI",
    copy: "Your AI improves continuously with every chat, command, and action.",
  },
  {
    icon: "⌁",
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
] as const;

const people = [
  ["Annette Black", "Pianist", "Acme Co.", "0% 30%"],
  ["Devon Lane", "Designer", "Big Kahuna Burger Ltd.", "22% 38%"],
  ["Darrell Steward", "Systems Analyst", "Biffco Enterprises Ltd.", "40% 34%"],
  ["Robert Fox", "Managing Director", "Abstergo Ltd.", "62% 38%"],
  ["Cameron Williamson", "Economist", "Binford Ltd.", "76% 34%"],
  ["Arlene McCoy", "Flight Engineer", "Big Kahuna Burger Ltd.", "90% 38%"],
] as const;

export default function AboutPage() {
  return (
    <>
      <section className={styles.aboutHero}>
        <p className={styles.crumb}>Home / About us</p>
        <h1>
          Redefining how
          <br />
          <GradientText>humans work with AI.</GradientText>
        </h1>
        <p>We’re a team of creators, engineers, and thinkers building.</p>
        <PrimaryButton href="/saazai/contact">Try Free for 14 Days</PrimaryButton>
        <div aria-label="Six members of the Saazai team" className={styles.avatarRow}>
          {["AB", "DL", "DS", "RF", "CW", "AM"].map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </section>

      <section className={styles.trusted}>
        <p>Trusted by Thousands of users.</p>
        <div className={styles.trustedLogos}>
          {["Netdot", "Veltrix", "Sparkweb", "Webgear", "Digitech", "Codelink"].map(
            (brand) => (
              <span key={brand}>{brand}</span>
            ),
          )}
        </div>
      </section>

      <section className={styles.mission}>
        <div className={styles.missionTabs}>
          <span>Our mission</span>
          <span>Our vision</span>
        </div>
        <div className={styles.missionBody}>
          <div className={styles.missionCopy}>
            <h2>Our mission is to bridge the gap between humans.</h2>
            <p>
              We aim to build AI agents that understand context, adapt to
              behavior, and assist people in their daily work. Not as tools,
              but as reliable digital partners. By simplifying.
            </p>
            <strong>Every feature we create has one purpose.</strong>
          </div>
          <Image
            alt="Saazai team collaborating around a laptop"
            className={styles.missionImage}
            height={654}
            src="/saazai/assets/about-people.png"
            width={962}
          />
        </div>
      </section>

      <PatternBand />

      <StandardSection>
        <div className={styles.foundationIntro}>
          <div>
            <h2>Built on intelligent foundations</h2>
            <p>
              The core of seamless automation, human-like conversation, and
              adaptive intelligence all powered by our AI Agent.
            </p>
            <Link className={styles.foundationLink} href="/saazai/features">
              Discover our AI platform　›
            </Link>
          </div>
          <div className={styles.foundationGrid}>
            {foundations.slice(0, 2).map((feature) => (
              <FeatureCard icon={feature.icon} key={feature.title} title={feature.title}>
                {feature.copy}
              </FeatureCard>
            ))}
          </div>
        </div>
        <div className={styles.foundationGrid}>
          {foundations.slice(2).map((feature) => (
            <FeatureCard icon={feature.icon} key={feature.title} title={feature.title}>
              {feature.copy}
            </FeatureCard>
          ))}
        </div>
      </StandardSection>

      <PatternBand />

      <section className={styles.statSection}>
        <SectionLabel>Stats</SectionLabel>
        <h2>
          Built on intelligent
          <br />
          foundations that scale.
        </h2>
        <div className={styles.statBlock}>
          <h3>Smarter numbers that power real human-AI connection.</h3>
          <p>
            Our AI agents are trained to deliver human-level intelligence at
            machine speed.
          </p>
          <Link className={styles.textLink} href="/saazai/contact">
            Try Free for 14 Days　›
          </Link>
        </div>
      </section>

      <PatternBand />

      <section className={styles.teamSection}>
        <SectionLabel>Stats</SectionLabel>
        <h2>
          A growing team behind
          <br />
          every intelligent move.
        </h2>
        <div className={styles.teamList}>
          {people.map(([name, role, company, position]) => (
            <article className={styles.person} key={name}>
              <Image
                alt=""
                className={styles.personImage}
                height={86}
                src="/saazai/assets/about-team.jpg"
                style={{ objectPosition: position }}
                width={86}
              />
              <div>
                <h3>{name}</h3>
                <p>{role}</p>
                <small>{company}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <PatternBand />

      <section className={styles.overview}>
        <SectionLabel>Overview</SectionLabel>
        <h2>
          AI Agent performance
          <br />
          simple overview.
        </h2>
        <div className={styles.overviewPanel}>
          <article className={styles.overviewCard}>
            <span aria-hidden="true">◒</span>
            <h3>OmniAI Technologies</h3>
            <p>
              OmniAI helps teams automate customer support, streamline
              workflows, and make smarter, data-driven decisions using
              conversational intelligence.
            </p>
          </article>
          <article className={styles.overviewMini}>
            <h3>Agents Connected</h3>
            <p>06 active assistants.</p>
            <strong>0%</strong>
          </article>
          <article className={styles.overviewMini}>
            <strong>0X</strong>
            <h3>Team Productivity Boost</h3>
            <p>Workflow efficiency achieved using OmniAgents AI Bot.</p>
          </article>
        </div>
      </section>

      <PatternBand />

      <section className={styles.hiring}>
        <div>
          <SectionLabel>Career</SectionLabel>
          <h2>
            We are hiring on
            <br />
            various positions.
          </h2>
        </div>
        <PrimaryButton href="/saazai/career">Explore jobs</PrimaryButton>
      </section>

      <PatternBand />

      <section className={styles.testimonial}>
        <blockquote>
          “I honestly didn’t expect an AI tool to feel this personal. It
          actually remembers what I was working on and picks up right.
        </blockquote>
        <cite>
          Smith J.
          <span>CEO of StudioX.</span>
        </cite>
      </section>

      <CtaSection />
    </>
  );
}
