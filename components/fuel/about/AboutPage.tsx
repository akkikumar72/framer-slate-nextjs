"use client";

import {
  FuelFooter,
  FuelHeader,
  FuelPlus,
  FuelSectionLabel,
  fuelPageClassName,
} from "@/components/fuel/FuelShell";

import { FuelRouteFaq } from "./FuelRouteFaq";
import styles from "./AboutPage.module.css";

const processSteps = [
  {
    number: "001",
    title: "Research",
    copy:
      "Exploring insights through structured analysis and clear intention. Fuel uncovers patterns and direction, creating a grounded foundation that shapes purposeful design decisions.",
    points: [
      "Market discovery & visual mapping",
      "Brand positioning review",
      "Dedicated creative, 20 hrs weekly",
    ],
  },
  {
    number: "002",
    title: "Experiment",
    copy:
      "Translating ideas into visual concepts with clarity, balance, and exploration. Fuel moves beyond predictable form, crafting variations that reveal new creative possibilities.",
    points: [
      "Concept sketches & directions",
      "Visual style development",
      "Dedicated creative, 20 hrs weekly",
    ],
  },
  {
    number: "003",
    title: "Refinement",
    copy:
      "Polishing every detail with precision and structure. Fuel refines layout, tone, and expression, delivering a cohesive system shaped for clarity and long-term impact.",
    points: [
      "Final design adjustments",
      "System-wide consistency check",
      "Dedicated creative, 20 hrs weekly",
    ],
  },
] as const;

const team = [
  {
    name: "Ariana Voss",
    role: "Creative Director",
    image: "/fuel/routes/7693916376899eb7.avif",
  },
  {
    name: "Mira Leone",
    role: "Brand Designer",
    image: "/fuel/routes/faf6c0a058e26aa9.avif",
  },
  {
    name: "Selena Hart",
    role: "UX Strategist",
    image: "/fuel/routes/11f9eabe9b0abfba.avif",
  },
  {
    name: "Nora Bennett",
    role: "Visual Designer",
    image: "/fuel/routes/73ec1a8f35d37b6a.avif",
  },
  {
    name: "Chloe Richter",
    role: "Content Lead",
    image: "/fuel/routes/d497d951fdba2df0.avif",
  },
] as const;

const awards = [
  ["2x", "Awwwards", "Bruten Website", "SOTD"],
  ["1x", "CSSD Awards", "Fuel Portfolio", "WOTD"],
  ["7×", "Behance", "Branding Showcase", "Featured"],
  ["5x", "FWA", "Digital Experience", "FOTD"],
  ["2x", "CSS Winner", "Creative Website", "SOTD"],
  ["4x", "Mindsparkle", "Modern Design", "Feature"],
  ["3x", "Dribbble", "Visual Design", "Highlighted"],
  ["8x", "Web Excellence Awards", "Brand System", "Winner"],
] as const;

const clients = [
  { name: "oslo.", style: "oslo" },
  { name: "Manila.", style: "manila" },
  { name: "▣ Basel", style: "basel" },
  { name: "◢ London", style: "london" },
  { name: "SAVANNAH", style: "savannah" },
  { name: "▦ monaco", style: "monaco" },
  { name: "◉ Amsterdam", style: "amsterdam" },
  { name: "⚑ Philadelphia", style: "philadelphia" },
] as const;

const stats = [
  {
    value: "2.06M",
    label: "Global Impressions",
    copy:
      "Fuel moves beyond simple authenticity, creating refined systems that shape digital presence.",
  },
  {
    value: "160K",
    label: "Community Reach",
    copy:
      "Elevating identity with structured clarity. Fuel crafts experiences that extend far beyond visual form.",
  },
  {
    value: "750+",
    label: "Creative Hours Logged",
    copy:
      "Through precision and intention, Fuel transforms ideas into cohesive narratives that define brands.",
  },
  {
    value: "257+",
    label: "Projects Completed",
    copy:
      "Blending modern aesthetics with functional design, Fuel delivers refined solutions that push brands.",
  },
] as const;

const articles = [
  {
    number: "001",
    title: "Velocity Becomes",
    category: "Art Direction",
    image: "/fuel/b5327417d6abd67b.avif",
    tall: true,
  },
  {
    number: "002",
    title: "Way To Clearance",
    category: "Books",
    image: "/fuel/routes/63d20c2291899c0d.avif",
    tall: false,
  },
  {
    number: "003",
    title: "All Grapples",
    category: "Automotive",
    image: "/fuel/routes/8ef5cfc420023689.avif",
    tall: true,
  },
  {
    number: "004",
    title: "Flowers Love",
    category: "Gardening",
    image: "/fuel/1865502c2f9d9de5.avif",
    tall: false,
  },
] as const;

export function AboutPage() {
  const loopedTeam = Array.from({ length: 4 }, () => team).flat();

  return (
    <main className={`${fuelPageClassName} ${styles.page}`}>
      <section className={styles.hero}>
        <img
          alt="Woman Motion Blur"
          className={styles.heroBackdrop}
          src="/fuel/routes/556fe45f3ffa9299.avif"
        />
        <FuelHeader />
        <div className={styles.heroContent}>
          <div className={styles.heroFrame}>
            <img
              alt="Woman Motion Blur"
              src="/fuel/routes/65228cc19ae706a9.avif"
            />
            <h2>
              <span className={styles.heroTitleDesktop}>We Are Here</span>
              <span className={styles.heroTitleMobile}>About</span>
            </h2>
            <FuelPlus className={styles.heroMarkOne} />
            <FuelPlus className={styles.heroMarkTwo} />
            <FuelPlus className={styles.heroMarkThree} />
            <FuelPlus className={styles.heroMarkFour} />
          </div>
          <div className={styles.heroMeta}>
            <span>(Our Studio)</span>
            <span>
              One part-time creative dedicated to
              <br />
              your continuous stream of projects.
            </span>
            <span>© 2025</span>
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <FuelSectionLabel number="01" title="Process" />
        <p className={styles.statement}>
          <span className={styles.statementLead}>Design-driven</span>
          <span>expression blends structured clarity</span>
          <span>and modern 3D visual systems with</span>
          <span>Swiss digital ideas, shaped by</span>
          <span>aesthetics &amp; Fuel®.</span>
        </p>
        <div className={styles.processImage}>
          <img alt="Men" src="/fuel/routes/3cb035ffe0584ddb.avif" />
        </div>
        <div className={styles.processList}>
          {processSteps.map((step) => (
            <article className={styles.processRow} key={step.number}>
              <span className={styles.processNumber}>{step.number}</span>
              <h3>{step.title}</h3>
              <div className={styles.processCopy}>
                <p>{step.copy}</p>
                <strong>What’s included</strong>
                <ul>
                  {step.points.map((point) => (
                    <li key={point}>
                      <span aria-hidden="true">＋</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.team}>
        <FuelSectionLabel dark number="02" title="Meet Our Team" />
        <div className={styles.teamViewport}>
          <div className={styles.teamTrack}>
            {loopedTeam.map((member, index) => (
              <article className={styles.teamCard} key={`${member.name}-${index}`}>
                <img alt="Woman Zoom Pose" src={member.image} />
                <span>{member.name}</span>
                <em>{member.role}</em>
              </article>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className={styles.teamDots}>
          {team.map((member, index) => (
            <i key={member.name} data-active={index === 0 ? "true" : undefined} />
          ))}
        </div>
      </section>

      <section className={styles.awards}>
        <FuelSectionLabel number="03" title="Awards" />
        <div className={styles.awardList}>
          {awards.map(([count, name, project, result]) => (
            <article className={styles.awardRow} key={`${name}-${project}`}>
              <span>{count}</span>
              <span>{name}</span>
              <span>{project}</span>
              <em>{result}</em>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.clients}>
        <FuelSectionLabel number="04" title="Clients" />
        <div className={styles.clientGrid}>
          {clients.map((client) => (
            <div
              className={`${styles.clientCard} ${styles[client.style]}`}
              key={client.name}
            >
              {client.name}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.stats}>
        <FuelSectionLabel number="05" title="Stats" />
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <article key={stat.label}>
              <h2>{stat.value}</h2>
              <span aria-hidden="true" className={styles.statCorner}>
                ⌝
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
              <p>{stat.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.articles}>
        <FuelSectionLabel number="06" title="Article" />
        <div className={styles.articleGrid}>
          {articles.map((article) => (
            <article
              className={`${styles.articleCard} ${
                article.tall ? styles.articleTall : ""
              }`}
              key={article.number}
            >
              <img alt={article.title} src={article.image} />
              <div>
                <span>{article.number}</span>
                <span>
                  <strong>{article.title}</strong>
                  <em>{article.category}</em>
                </span>
                <span>© 2025</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FuelRouteFaq number="07" />
      <FuelFooter />
    </main>
  );
}
