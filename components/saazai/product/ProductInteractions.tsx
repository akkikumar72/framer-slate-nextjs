"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ProductPages.module.css";

export type FaqItem = {
  answer: string;
  question: string;
};

export const commonFaqs: FaqItem[] = [
  {
    question: "How does Omni improve dispatching?",
    answer:
      "Omni speeds up dispatching with automation, smart routing, and real-time tracking.",
  },
  {
    question: "Is Omni suitable for small fleets?",
    answer:
      "Yes. Start with a focused workflow and expand agents, automations, and team access as you grow.",
  },
  {
    question: "How often is AI Agent data updated?",
    answer:
      "Connected data updates continuously, while workspace knowledge can be refreshed whenever your source changes.",
  },
  {
    question: "Is there mobile access for drivers?",
    answer:
      "Yes. Responsive workspaces keep drivers, dispatchers, and operators connected from any modern device.",
  },
  {
    question: "Are pricing plans flexible or fixed?",
    answer:
      "Plans can scale with your team. Contact us for custom usage, deployment, or security requirements.",
  },
];

export function FaqList({ items = commonFaqs }: { items?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={styles.faqList}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article className={styles.faqItem} key={item.question}>
            <button
              aria-expanded={isOpen}
              className={styles.faqButton}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
            >
              <span>{item.question}</span>
              <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
            </button>
            <div
              className={`${styles.faqAnswer} ${
                isOpen ? styles.faqAnswerOpen : ""
              }`}
            >
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

const planFeatures = {
  growing: [
    "Access to 1 AI Agent",
    "Up to 10,000 conversations",
    "Context-aware chat memory",
    "Smart task automation",
    "Email & file summarization",
    "24/7 support",
    "Standard support",
  ],
  enterprise: [
    "Up to 5 custom AI Agents",
    "50,000 conversations/month",
    "Dedicated manager",
    "API + custom tools",
    "Private deployment",
    "Multi-user collaboration",
    "API & app integrations",
  ],
};

const comparisonRows = [
  ["Analytics", "✓", "✓", "✓"],
  ["Public API", "✓", "✓", "✓"],
  ["Live data view", "30 days", "Unlimited", "Unlimited"],
  ["Cloud apps", "—", "✓", "✓"],
  ["Workspace seats", "10", "50", "Unlimited"],
];

export function PricingContent() {
  const [yearly, setYearly] = useState(false);

  const growingPrice = yearly ? 39 : 49;
  const enterprisePrice = yearly ? 65 : 79;

  return (
    <>
      <section className={styles.pricingSection}>
        <div className={styles.billingRow}>
          <span className={!yearly ? styles.billingActive : ""}>MM</span>
          <button
            aria-label="Toggle yearly billing"
            aria-pressed={yearly}
            className={styles.billingToggle}
            onClick={() => setYearly((current) => !current)}
            type="button"
          >
            <i className={yearly ? styles.billingKnobYearly : ""} />
          </button>
          <span className={yearly ? styles.billingActive : ""}>YY</span>
        </div>

        <div className={styles.planGrid}>
          <PlanCard
            description="Perfect for growing teams that need to start fast"
            features={planFeatures.growing}
            icon="◫"
            price={growingPrice}
            title="Growing"
            yearly={yearly}
          />
          <PlanCard
            description="Perfect for growing teams that need room to scale"
            features={planFeatures.enterprise}
            icon="◇"
            price={enterprisePrice}
            title="Enterprise"
            yearly={yearly}
          />
        </div>
      </section>

      <section className={styles.comparisonSection}>
        <p className={styles.eyebrow}>✣ &nbsp; Decide which one you need</p>
        <h2>Compare between plans</h2>
        <div className={styles.comparisonScroller}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Plans</th>
                <th>Free</th>
                <th>
                  Growing <small>${growingPrice}/mo</small>
                </th>
                <th>
                  Enterprise <small>${enterprisePrice}/mo</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={cell}>{cell}</th>
                    ) : (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    )
                  )}
                </tr>
              ))}
              <tr className={styles.tableDivider}>
                <th colSpan={4}>Usage Limit</th>
              </tr>
              {comparisonRows.map((row) => (
                <tr key={`usage-${row[0]}`}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={cell}>{cell}</th>
                    ) : (
                      <td key={`usage-${row[0]}-${index}`}>{cell}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function PlanCard({
  description,
  features,
  icon,
  price,
  title,
  yearly,
}: {
  description: string;
  features: string[];
  icon: string;
  price: number;
  title: string;
  yearly: boolean;
}) {
  return (
    <article className={styles.planCard}>
      <div className={styles.planHeader}>
        <span aria-hidden="true">{icon}</span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.planPrice}>
        <strong>${price}</strong>
        <span>/month</span>
        {yearly && <small>billed yearly</small>}
      </div>
      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <span aria-hidden="true">✿</span> {feature}
          </li>
        ))}
      </ul>
      <Link className={styles.outlineButton} href="/saazai/contact">
        Get Started
      </Link>
    </article>
  );
}

type JobGroup = "Designer" | "Developer" | "Marketing";

const jobs: Record<JobGroup, string[]> = {
  Designer: [
    "User Experience Designer",
    "Digital Product Designer",
    "Interaction Designer",
    "Product Designer",
    "UX Designers",
    "UI Designer",
  ],
  Developer: [
    "Web Developer",
    "Software Engineer",
    "Mobile App Developer",
    "Full-Stack Developer",
    "Backend Developer",
    "Frontend Developer",
  ],
  Marketing: [
    "Brand Marketing Specialist",
    "Performance Marketer",
    "Social Media Manager",
    "SEO Specialist",
    "Content Marketer",
    "Digital Marketing",
  ],
};

const tabIcons: Record<JobGroup, string> = {
  Designer: "✿",
  Developer: "⌘",
  Marketing: "⚑",
};

export function CareerBoard() {
  const [activeTab, setActiveTab] = useState<JobGroup>("Designer");
  const groups: JobGroup[] = ["Designer", "Developer", "Marketing"];

  return (
    <div className={styles.careerBoard}>
      <div aria-label="Job departments" className={styles.careerTabs} role="tablist">
        {groups.map((group) => (
          <button
            aria-selected={activeTab === group}
            className={activeTab === group ? styles.careerTabActive : ""}
            key={group}
            onClick={() => setActiveTab(group)}
            role="tab"
            type="button"
          >
            <span aria-hidden="true">{tabIcons[group]}</span>
            {group}
          </button>
        ))}
      </div>
      <div
        aria-label={`${activeTab} positions`}
        className={styles.jobsGrid}
        role="tabpanel"
      >
        {jobs[activeTab].map((job) => (
          <article className={styles.jobCard} key={job}>
            <div>
              <h3>{job}</h3>
              <p>Remote&nbsp; · &nbsp;{activeTab}&nbsp; · &nbsp;Full-Time</p>
            </div>
            <Link href={`/saazai/contact?role=${encodeURIComponent(job)}`}>
              Apply now <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
