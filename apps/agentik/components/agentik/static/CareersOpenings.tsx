"use client";

import { useState } from "react";
import {
  RollingLink,
  SectionEyebrow,
} from "@/components/agentik/shared/AgentikShell";
import styles from "./AgentikStaticPages.module.css";

const JOBS = [
  {
    team: "Engineering",
    location: "Remote",
    date: "May 2026",
    title: "AI Solutions Engineer",
    description: "Build and deploy custom AI systems for clients. You'll work closely with each business to understand their needs and deliver solutions that actually make a difference.",
  },
  {
    team: "Engineering",
    location: "London",
    date: "May 2026",
    title: "Voice Agent Specialist",
    description: "Design, train, and manage voice agents that handle client calls, join meetings, and automate follow-ups. You'll own the voice product from build to delivery.",
  },
  {
    team: "Design",
    location: "Remote",
    date: "Apr 2026",
    title: "UI/UX Designer",
    description: "Shape how our clients experience AI. You'll design dashboards, agent interfaces, and client-facing tools that make complex technology feel simple and intuitive.",
  },
  {
    team: "Consulting",
    location: "Remote",
    date: "Apr 2026",
    title: "AI Strategy Consultant",
    description: "Run audits, identify opportunities, and build AI roadmaps that help businesses save time and money. You're the first person clients meet and trust.",
  },
  {
    team: "Operations",
    location: "Dubai",
    date: "Mar 2026",
    title: "Client Success Manager",
    description: "Own the client relationship from onboarding to results. You'll track performance, solve problems, and make sure every project hits its targets.",
  },
  {
    team: "Marketing",
    location: "London",
    date: "Mar 2026",
    title: "Content & Marketing Lead",
    description: "Plan and create content that grows our audience and drives inbound leads. Blog posts, case studies, social media, email; you own the whole funnel.",
  },
] as const;

function JobArrow() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <path d="m8.2 5.4 4.6 4.6-4.6 4.6M12.6 10h-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  );
}

export function CareersOpenings() {
  const [expanded, setExpanded] = useState(false);
  const visibleJobs = expanded ? JOBS : JOBS.slice(0, 4);

  return (
    <section className={styles.openingsSection}>
      <div className={`${styles.rail} ${styles.openingsRail}`}>
        <div className={styles.openingsHeader}>
          <div className={styles.openingsHeading}>
            <SectionEyebrow className={styles.accentEyebrow}>We&apos;re hiring</SectionEyebrow>
            <h2>View below our current open vacancies</h2>
            <p>Take a look at the positions we&apos;re currently hiring for. If there&apos;s a role you don&apos;t see but believe your skillset can bring value, then send us your CV.</p>
          </div>
          <div className={styles.openingsAction}>
            <RollingLink href="mailto:ramish@ramish.design" trailingIcon={<JobArrow />}>
              Send us your CV
            </RollingLink>
          </div>
        </div>
        <div aria-live="polite" className={styles.jobList}>
          {visibleJobs.map((job) => (
            <div className={styles.jobReveal} key={job.title}>
              <article className={styles.jobCard}>
                <div className={styles.jobCopy}>
                  <p className={styles.jobMeta}>
                    <span>{job.team}</span><i>•</i><span>{job.location}</span><i>•</i><span>{job.date}</span>
                  </p>
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                </div>
                <RollingLink className={styles.applyButton} href="https://www.linkedin.com" trailingIcon={<JobArrow />} variant="secondary">
                  Apply now
                </RollingLink>
              </article>
            </div>
          ))}
        </div>
        {!expanded ? (
          <button className={styles.loadMore} onClick={() => setExpanded(true)} type="button">
            Load More
          </button>
        ) : null}
      </div>
    </section>
  );
}
