import type { Metadata } from "next";
import { Counter, FAQ, SectionLabel } from "@/components/shared";
import { asset, pageMetadata } from "@/lib/site";
import { Leadership } from "./leadership";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata(
  "About",
  "/about",
  "Learn how Orbital became the production runtime for teams building, connecting, deploying, and monitoring AI agents.",
);

const metrics = [
  [2, "M+", "Agents in production"],
  [14, "", "Countries, remote-first"],
  [48, "M", "Series B funding"],
  [100, "%", "Platform uptime"],
] as const;

const principles = [
  ["Build", "Compose agents visually or in code with built-in tools, memory, planning, and guardrails.", "/orbital/assets/platform-0.svg"],
  ["Connect", "Plug into 200+ systems, any MCP server, and your own APIs. Live data with no brittle integration code.", "/orbital/assets/platform-1.svg"],
  ["Deploy", "Ship to managed runtime or your own VPC. Zero-downtime rollouts, versioning, and instant rollback", "/orbital/assets/platform-2.svg"],
  ["Monitor", "Trace every step, token, and dollar in real time. Evals, alerts, and outcome metrics out of the box.", "/orbital/assets/platform-3.svg"],
  ["Monitor", "Trace every step, token, and dollar in real time. Evals, alerts, and outcome metrics out of the box.", "/orbital/assets/platform-3.svg"],
  ["Monitor", "Trace every step, token, and dollar in real time. Evals, alerts, and outcome metrics out of the box.", "/orbital/assets/platform-3.svg"],
] as const;

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.hero} orb-container`}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroCopy}>
              <h1>We’re building the runtime<br />for the agent era.</h1>
              <p>Software is learning to act. Orbital gives teams the infrastructure to build, connect, and deploy AI agents that do real work safely, reliably, and at scale.</p>
            </div>
            <div className={styles.metrics}>
              {metrics.map(([value, suffix, label]) => (
                <div className={styles.metric} key={label}>
                  <strong><Counter value={value} suffix={suffix} /></strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <img className={styles.heroArt} src={asset("Y2rwQGttKSmnA8tL9VzFsq2TnUQ")} alt="" />
        </div>
      </section>

      <section className={`${styles.section} ${styles.story} orb-container`}>
        <SectionLabel number="01" label="Our story" />
        <div className={styles.storyGrid}>
          <h2>From a weekend prototype to production infrastructure.</h2>
          <div className={styles.storyCopy}>
            <p>In 2023 our founders were shipping LLM features at a fintech and kept hitting the same wall: prototypes were easy, but production was a swamp of glue code, brittle integrations, and no way to know if an agent actually worked.</p>
            <p>They built the first version of Orbital to solve their own problem a runtime where the thing you prototyped was the thing you shipped. Within months, teams at other companies were asking to use it.</p>
            <p>Today Orbital is the production layer for thousands of teams, from two-person startups to public enterprises, running millions of agents that resolve tickets, close deals, and keep systems healthy every day.</p>
          </div>
        </div>
        <div className={styles.storyImageWrap}>
          <img className={styles.storyImage} src={asset("S3xwf6oVLc6YErZZABDnM88Xs")} alt="The Orbital team collaborating in an office" />
        </div>
      </section>

      <section className={`${styles.section} ${styles.platform} orb-container`}>
        <SectionLabel number="02" label="Principles" />
        <div className={styles.sectionHeading}>
          <h2>What we believe.</h2>
          <p>A few convictions that shape every decision and line of code.</p>
        </div>
        <div className={styles.principles}>
          {principles.map(([title, copy, icon], index) => (
            <article className={styles.principle} key={`${title}-${index}`}>
              <div className={styles.principleIcon}><img src={icon} alt="" /></div>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.team} orb-container`}>
        <SectionLabel number="03" label="Leadership" />
        <div className={styles.sectionHeading}>
          <h2>Teams ship faster on Orbital.</h2>
        </div>
        <Leadership />
      </section>

      <FAQ number="04" />
    </main>
  );
}
