"use client";

import Link from "next/link";
import { type CSSProperties, type ReactNode, useState } from "react";
import { faqs, features, integrations, testimonials } from "./data";
import {
  PliarFooter,
  PliarHeader,
  SectionEyebrow,
} from "./PliarShell";
import styles from "./PliarHome.module.css";

function ArrowButton({
  children,
  href,
  primary = false,
}: {
  children: ReactNode;
  href: string;
  primary?: boolean;
}) {
  return (
    <Link
      className={`${styles.actionButton} ${primary ? styles.actionPrimary : styles.actionSecondary}`}
      href={href}
    >
      {children}
    </Link>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    bolt: <path d="m13 2-7 10h5l-1 8 7-11h-5l1-7Z" />,
    link: <path d="m9 15-1.5 1.5a3.5 3.5 0 0 1-5-5L6 8m9 1 1.5-1.5a3.5 3.5 0 0 0-5-5L8 6m-2 6 6-6" />,
    brain: <path d="M8 4a3 3 0 0 0-5 2.2A3.4 3.4 0 0 0 4 12v1a3 3 0 0 0 4 2.8M12 4a3 3 0 0 1 5 2.2A3.4 3.4 0 0 1 16 12v1a3 3 0 0 1-4 2.8M8 3v14m4-14v14M5 8h3m4 0h3m-7 5h4" />,
    pulse: <path d="M3 12h3l2-6 4 12 2-6h3" />,
    shield: <path d="M10 2 4 5v5c0 4 2.6 6.7 6 8 3.4-1.3 6-4 6-8V5l-6-3Zm-2 8 1.5 1.5L13 8" />,
    code: <path d="m7 5-5 5 5 5m6-10 5 5-5 5m-2-12L9 17" />,
    down: <path d="M10 3v12m-4-4 4 4 4-4M4 18h12" />,
    trend: <><path d="M3 15 8 10l3 3 6-7" /><path d="M13 6h4v4" /></>,
    clock: <><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /><path d="M10 6v4l3 2" /></>,
  };

  return (
    <svg aria-hidden="true" className={styles.lineIcon} viewBox="0 0 20 20">
      {paths[name]}
    </svg>
  );
}

function LandscapeCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.landscapeCard} ${className}`}>
      <img
        alt=""
        aria-hidden="true"
        data-pliar-landscape
        src="/pilar/assets/landscape-v3.webp"
      />
      {children}
    </div>
  );
}

const customerLogoMarks = [
  {
    height: 29,
    paths: [
      "M 14.391 7.195 C 14.391 11.169 11.169 14.391 7.195 14.391 L 0 14.391 L 0 7.195 C 0 3.222 3.222 0 7.195 0 C 11.169 0 14.391 3.222 14.391 7.195 Z M 14.391 21.586 C 14.391 17.612 17.612 14.391 21.586 14.391 L 28.781 14.391 L 28.781 21.586 C 28.781 25.56 25.56 28.781 21.586 28.781 C 17.612 28.781 14.391 25.56 14.391 21.586 Z M 0 21.586 C 0 25.56 3.222 28.781 7.195 28.781 L 14.391 28.781 L 14.391 21.586 C 14.391 17.612 11.169 14.391 7.195 14.391 C 3.222 14.391 0 17.612 0 21.586 Z M 28.781 7.195 C 28.781 3.222 25.56 0 21.586 0 L 14.391 0 L 14.391 7.195 C 14.391 11.169 17.612 14.391 21.586 14.391 C 25.56 14.391 28.781 11.169 28.781 7.195 Z",
    ],
    viewBox: "0 0 28.781 28.781",
    width: 29,
  },
  {
    height: 26,
    paths: [
      "M 12.792 0 C 6.081 0 0.64 5.441 0.64 12.152 L 0.64 12.902 L 2.558 14.82 L 2.558 12.152 C 2.558 6.5 7.14 1.919 12.792 1.919 C 18.444 1.919 23.025 6.5 23.025 12.152 L 23.025 14.82 L 24.944 12.902 L 24.944 12.152 C 24.944 5.441 19.503 0 12.792 0 Z M 12.792 6.396 C 9.613 6.396 7.035 8.973 7.035 12.152 L 7.035 19.859 C 7.035 20.105 6.887 20.326 6.661 20.42 C 6.434 20.514 6.173 20.462 5.999 20.289 L 0 14.29 L 0 17.003 L 4.642 21.645 C 5.364 22.368 6.451 22.584 7.395 22.193 C 8.339 21.802 8.955 20.881 8.954 19.859 L 8.954 12.152 C 8.954 10.033 10.672 8.315 12.792 8.315 C 14.911 8.315 16.629 10.033 16.629 12.152 L 16.629 19.859 C 16.629 20.881 17.245 21.801 18.189 22.192 C 19.132 22.583 20.219 22.368 20.941 21.645 L 22.198 20.389 L 24.117 18.47 L 25.583 17.003 L 25.583 14.29 L 24.227 15.646 L 22.76 17.113 L 20.841 19.032 L 19.585 20.289 C 19.411 20.462 19.15 20.514 18.923 20.42 C 18.696 20.326 18.548 20.105 18.548 19.859 L 18.548 12.152 C 18.548 8.973 15.971 6.396 12.792 6.396 Z M 12.792 9.594 C 11.379 9.594 10.233 10.739 10.233 12.152 L 10.233 19.859 C 10.233 21.398 9.306 22.786 7.884 23.375 C 6.462 23.964 4.826 23.639 3.737 22.55 L 0 18.813 L 0 21.526 L 2.381 23.907 C 4.018 25.544 6.48 26.034 8.619 25.147 C 10.758 24.261 12.152 22.174 12.152 19.858 L 12.152 12.152 C 12.152 11.799 12.438 11.513 12.792 11.513 C 13.145 11.513 13.431 11.799 13.431 12.152 L 13.431 19.859 C 13.431 22.174 14.826 24.261 16.965 25.147 C 19.104 26.033 21.566 25.544 23.203 23.907 L 25.583 21.526 L 25.583 18.813 L 21.846 22.55 C 20.758 23.639 19.121 23.964 17.699 23.375 C 16.277 22.786 15.35 21.398 15.35 19.859 L 15.35 12.152 C 15.35 10.739 14.205 9.594 12.792 9.594 Z M 12.792 3.198 C 7.846 3.198 3.838 7.207 3.838 12.152 L 3.838 16.1 L 5.756 18.018 L 5.756 12.152 C 5.756 8.267 8.906 5.117 12.792 5.117 C 16.677 5.117 19.827 8.267 19.827 12.152 L 19.827 18.018 L 21.746 16.1 L 21.746 12.152 C 21.746 7.207 17.737 3.198 12.792 3.198 Z",
    ],
    viewBox: "0 0 25.583 25.583",
    width: 26,
  },
  {
    height: 26,
    paths: [
      "M 14.923 0 C 15.17 0 15.416 0.006 15.66 0.018 C 15.665 0.018 15.669 0.014 15.669 0.01 C 15.669 0.004 15.673 0.001 15.678 0.001 L 29.32 0.001 C 29.611 0.001 29.848 0.239 29.848 0.533 C 29.848 0.673 29.792 0.809 29.693 0.909 L 26.116 4.515 L 33.734 4.515 C 34.244 4.515 34.71 4.816 34.887 5.295 C 35.504 6.973 35.819 8.746 35.817 10.534 C 35.817 18.845 29.135 25.583 20.893 25.583 C 20.646 25.583 20.401 25.577 20.157 25.564 C 20.155 25.564 20.152 25.565 20.15 25.567 C 20.148 25.569 20.147 25.571 20.148 25.574 C 20.148 25.579 20.144 25.583 20.139 25.583 L 6.497 25.583 C 6.204 25.581 5.968 25.343 5.969 25.051 C 5.969 24.91 6.025 24.774 6.124 24.675 L 9.699 21.069 L 2.082 21.069 C 1.572 21.069 1.106 20.768 0.931 20.289 C 0.313 18.611 -0.002 16.837 0 15.049 C 0 6.737 6.682 0 14.923 0 Z M 20.031 10.653 C 18.799 9.199 16.968 8.277 14.923 8.277 C 11.214 8.277 8.208 11.308 8.208 15.049 C 8.208 15.841 8.344 16.6 8.592 17.307 L 13.431 17.307 L 15.786 14.93 C 17.018 16.384 18.849 17.307 20.893 17.307 C 24.602 17.307 27.609 14.275 27.609 10.535 C 27.609 9.766 27.48 9.002 27.225 8.277 L 22.386 8.277 Z",
    ],
    viewBox: "0 0 35.817 25.583",
    width: 36,
  },
  {
    height: 26,
    paths: [
      "M 16.345 7.474 C 15.293 6.771 14.057 6.396 12.792 6.396 L 12.792 0 C 19.856 0 25.583 5.727 25.583 12.792 C 25.583 19.856 19.856 25.583 12.792 25.583 C 5.727 25.583 0 19.856 0 12.792 L 6.396 12.792 C 6.396 15.843 8.551 18.469 11.544 19.064 C 14.537 19.66 17.533 18.058 18.701 15.239 C 19.868 12.42 18.882 9.169 16.345 7.474 Z",
      "M 6.396 0 C 6.396 3.532 3.532 6.396 0 6.396 L 0 12.792 C 7.065 12.792 12.792 7.065 12.792 0 Z",
    ],
    viewBox: "0 0 25.583 25.583",
    width: 26,
  },
  {
    height: 19,
    paths: [
      "M 11.842 0 C 9.894 0 8.025 0.774 6.647 2.152 L 2.152 6.648 C 0.774 8.025 0 9.893 0 11.841 C 0 15.899 3.289 19.188 7.346 19.188 C 9.294 19.188 11.163 18.414 12.54 17.036 L 15.65 13.926 L 24.711 4.865 C 25.573 4.002 26.823 3.649 28.009 3.933 C 29.196 4.217 30.15 5.098 30.528 6.258 L 33.388 3.398 C 32.039 1.28 29.702 -0.001 27.192 0 C 25.244 0 23.375 0.774 21.997 2.152 L 9.827 14.323 C 8.456 15.693 6.235 15.693 4.865 14.323 C 3.495 12.952 3.495 10.731 4.865 9.361 L 9.361 4.865 C 10.224 4.002 11.473 3.649 12.659 3.933 C 13.846 4.217 14.8 5.097 15.178 6.258 L 18.038 3.399 C 16.689 1.281 14.352 -0.001 11.842 0 Z",
      "M 25.177 14.322 C 24.315 15.185 23.066 15.539 21.879 15.255 C 20.692 14.971 19.739 14.091 19.36 12.93 L 16.501 15.789 C 17.849 17.907 20.186 19.189 22.696 19.188 C 24.644 19.188 26.513 18.414 27.89 17.036 L 40.062 4.865 C 41.432 3.495 43.653 3.495 45.023 4.865 C 46.393 6.235 46.393 8.457 45.023 9.827 L 40.527 14.323 C 39.664 15.186 38.415 15.538 37.229 15.254 C 36.042 14.97 35.088 14.09 34.71 12.93 L 31.851 15.789 C 33.199 17.907 35.536 19.189 38.046 19.188 C 39.995 19.188 41.863 18.414 43.24 17.036 L 47.737 12.54 C 49.114 11.162 49.887 9.295 49.888 7.347 C 49.888 3.288 46.6 0 42.542 0 C 40.594 0 38.726 0.774 37.348 2.152 L 25.177 14.323 Z",
    ],
    viewBox: "0 0 49.888 19.188",
    width: 50,
  },
  {
    height: 26,
    paths: [
      "M 9.344 1.557 L 9.344 0 L 12.903 0 L 12.903 1.557 L 18.909 1.557 L 18.909 0 L 22.469 0 L 22.469 14.348 C 22.469 20.553 17.439 25.583 11.234 25.583 C 5.03 25.583 0 20.553 0 14.348 L 0 0 L 3.559 0 L 3.559 1.557 Z M 7.128 16.453 C 6.145 15.47 4.911 14.777 3.56 14.45 C 3.606 17.992 6.05 20.955 9.344 21.789 C 9.341 19.787 8.544 17.868 7.128 16.453 Z M 9.645 13.936 C 10.201 14.492 10.696 15.105 11.123 15.766 C 11.979 14.441 13.107 13.313 14.432 12.458 C 13.107 11.602 11.979 10.475 11.123 9.15 C 10.267 10.475 9.14 11.602 7.815 12.458 C 8.476 12.884 9.089 13.38 9.645 13.936 Z M 12.903 21.802 L 12.903 21.842 C 16.323 21.083 18.886 18.043 18.909 14.4 C 15.409 15.136 12.903 18.224 12.903 21.802 Z M 3.559 5.117 L 3.559 10.466 C 4.91 10.139 6.145 9.446 7.128 8.463 C 8.056 7.535 8.727 6.382 9.074 5.117 Z M 18.909 10.516 L 18.909 5.117 L 13.172 5.117 C 13.791 7.369 15.415 9.209 17.573 10.102 C 18.005 10.281 18.453 10.42 18.909 10.516 Z",
    ],
    viewBox: "0 0 22.469 25.583",
    width: 23,
  },
] as const;

function CustomerLogoMark({ index }: { index: number }) {
  const mark = customerLogoMarks[index % customerLogoMarks.length];
  return (
    <svg
      aria-hidden="true"
      height={mark.height}
      viewBox={mark.viewBox}
      width={mark.width}
    >
      {mark.paths.map((path) => <path d={path} key={path} />)}
    </svg>
  );
}

function WorkflowMockup() {
  const rows = [
    ["ϟ", "Route to agent", "12:02"],
    ["↗", "Draft reply & send", "12:03"],
    ["✉", "New email received", "12:01"],
    ["◎", "AI classifies intent", "12:02"],
  ];

  return (
    <div className={styles.workflowMockup}>
      <div className={styles.timelineRows}>
        {rows.map(([icon, label, time], index) => (
          <div
            className={styles.timelineRow}
            key={label}
            style={{ "--row-delay": `${index * 1.5}s` } as CSSProperties}
          >
            <span aria-hidden="true">{icon}</span>
            <b>{label}</b>
            <small>{time}</small>
          </div>
        ))}
      </div>
      <div className={styles.askBox}>
        <span>Ask anything</span>
        <span aria-hidden="true">◎</span>
        <b aria-hidden="true">→</b>
      </div>
    </div>
  );
}

function ProcessingMockup() {
  const items = [
    ["✉", "Email summary"],
    ["⌕", "Deep research"],
    ["▤", "Report gen"],
  ];

  return (
    <div className={styles.processingMockup}>
      <div className={styles.processingRail} />
      <div className={styles.processingTrack}>
        {[...items, ...items].map(([icon, text], index) => (
          <div className={styles.processingRow} key={`${text}-${index}`}>
            <span aria-hidden="true">{icon}</span>
            <b>{text}</b>
            <small>PROCESSING</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportMockup() {
  return (
    <div className={styles.reportMockup}>
      <div><span aria-hidden="true">⌕</span> Collecting Information</div>
      <div><span aria-hidden="true">ϟ</span> Checking All Integrations</div>
      <article>
        <b><span aria-hidden="true">✓</span> Report Complete</b>
        <p>All Automations are functioning correctly, no issues exist.</p>
        <small>May, 31</small>
      </article>
    </div>
  );
}

function HighlightVisual({ type }: { type: "workflow" | "integrations" | "observability" }) {
  if (type === "workflow") {
    return (
      <LandscapeCard className={styles.highlightVisual}>
        <div className={styles.highlightEmail}><span>✉</span> New email received <b>✓</b></div>
        <span aria-hidden="true" className={styles.highlightConnector} />
        <div className={`${styles.highlightEmail} ${styles.highlightEmailSecondary}`}><span>◎</span> AI classifies intent <b>✓</b></div>
      </LandscapeCard>
    );
  }

  if (type === "integrations") {
    const names = ["Google sheets", "Clickup", "Airtable", "Notion", "Hubspot", "Trello", "Slack", "Mailchimp"];
    return (
      <LandscapeCard className={styles.highlightVisual}>
        <div className={styles.logoCloud}>
          {[...names, ...names].map((name, index) => (
            <span key={`${name}-${index}`}>{name.slice(0, 1)}<small>{name}</small></span>
          ))}
        </div>
      </LandscapeCard>
    );
  }

  const jobs = [
    ["Email Triage", "2S", "200 OK"],
    ["Meeting Scheduler", "4S", "200 OK"],
    ["Research Agent", "12S", "SLOW"],
    ["Report Generator", "6S", "200 OK"],
    ["Slack Digest", "1S", "200 OK"],
  ];

  return (
    <LandscapeCard className={styles.highlightVisual}>
      <div className={styles.jobPanel}>
        {jobs.map(([name, time, status], index) => (
          <div key={name} style={{ "--job-delay": `${index * -1.5}s` } as CSSProperties}>
            <span className={status === "SLOW" ? styles.warningDot : styles.liveDot} />
            <b>{name}</b>
            <small>{time}</small>
            <em className={status === "SLOW" ? styles.warning : ""}>{status}</em>
          </div>
        ))}
      </div>
    </LandscapeCard>
  );
}

function GettingVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className={styles.connectWidget}>
        <b>Connect Notion</b>
        <div className={styles.connectApps} aria-hidden="true">
          <span className={styles.clickupMark}>⌃</span>
          <span className={styles.notionMark}>N</span>
          <span><img alt="" src="/pilar/assets/slack.avif" /></span>
          <span className={styles.githubMark}>GH</span>
          <span className={styles.sheetsMark}>▤</span>
        </div>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className={styles.promptWidget}>
        <p><img alt="" src="/pilar/assets/gmail.avif" /><b>Gmail</b><small>Summarize all of my unread emails</small></p>
        <p><img alt="" src="/pilar/assets/slack.avif" /><b>Slack</b><small>Post weekly summary to #updates</small></p>
        <p><span aria-hidden="true">⌃</span><b>Clickup</b><small>Create tasks from meeting notes</small></p>
      </div>
    );
  }
  const agents = [
    ["var(--pliar-agent-one)", "Email Agent", "Drafts and replies to emails"],
    ["var(--pliar-agent-two)", "Slack Agent", "Posts updates and summaries"],
    ["var(--pliar-agent-three)", "Task Agent", "Creates and assigns tasks"],
    ["var(--pliar-agent-four)", "Data Agent", "Pulls reports and insights"],
  ];
  return (
    <div className={styles.agentWidget}>
      <small>Select an Agent</small>
      {agents.map(([color, name, description]) => (
        <p key={name}><span style={{ background: color }} /><b>{name}</b><em>{description}</em></p>
      ))}
    </div>
  );
}

export function PliarHome() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PliarHeader />
      <main>
        <section className={styles.hero} id="hero">
          <div className={styles.heroCopy}>
            <h1>AI agents that handle emails, meetings, research, and reporting.</h1>
            <p>
              Pliar connects your tools, data, and AI models into intelligent pipelines — so your team spends less time on manual processes and more time building what matters.
            </p>
          </div>
          <div className={styles.heroActions}>
            <ArrowButton href="/#pricing" primary>Start for free</ArrowButton>
            <ArrowButton href="/contact">Talk to sales</ArrowButton>
          </div>

          <img
            alt=""
            aria-hidden="true"
            className={styles.heroLandscape}
            data-pliar-landscape
            src="/pilar/assets/landscape-v3.webp"
          />
          <img
            alt="Pliar dashboard showing agent activity, processed emails, automated tasks, time saved, and accuracy"
            className={styles.heroDashboard}
            data-pliar-dashboard
            height="637"
            src="/pilar/assets/dashboard.avif"
            width="1140"
          />

          <div className={styles.trustRow}>
            <span><b>✓</b> SOC 2 Type II certified</span>
            <span><b>✓</b> 2,400+ teams onboarded</span>
            <span><b>✓</b> Up and running in under 10 minutes</span>
          </div>
        </section>

        <section aria-label="Customer logos" className={styles.logoMarquee}>
          <div aria-hidden="true">
            {[...customerLogoMarks, ...customerLogoMarks].map((_, index) => (
              <span className={styles.logoCell} key={index}>
                <CustomerLogoMark index={index} />
              </span>
            ))}
          </div>
        </section>

        <section className={styles.why} id="benefits">
          <div className={styles.sectionInner}>
            <div className={styles.whyIntro}>
              <SectionEyebrow>Why Pliar</SectionEyebrow>
              <h2>Your stack generates more<br className={styles.desktopBreak} /> data than your team can act on.</h2>
              <p className={styles.whyDescription}>
                Most automation tools patch individual gaps. Pliar is different — it orchestrates your entire workflow layer with AI, giving you a unified system that learns from your data and gets smarter over time.
              </p>
            </div>

            <div className={styles.whyGrid}>
              {[
                { title: "Intelligent Workflows", description: "Design multi-step automations visually with AI decision nodes — no code required.", content: <WorkflowMockup /> },
                { title: "AI Model Routing", description: "Route tasks to the right model automatically. Bring your own or use Pliar's agents.", content: <ProcessingMockup /> },
                { title: "Real-Time Observability", description: "Full audit logs, error tracing, and performance dashboards built in from day one.", content: <ReportMockup /> },
              ].map((card, index) => (
                <article data-pliar-reveal key={card.title} style={{ "--pliar-delay": `${index * 70}ms` } as CSSProperties}>
                  <LandscapeCard>{card.content}</LandscapeCard>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.statsGrid}>
            {[
              ["87%", "Reduction in manual ops tasks within 30 days", "down"],
              ["3.2×", "Faster time-to-value compared to building in-house", "trend"],
              ["99.9%", "Uptime SLA — production-grade from day one", "clock"],
            ].map(([value, copy, icon], index) => (
              <article data-pliar-reveal key={value} style={{ "--pliar-delay": `${index * 70}ms` } as CSSProperties}>
                <div className={styles.statValue}><h3>{value}</h3><FeatureIcon name={icon} /></div>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.highlights}>
          <div className={styles.highlightsInner}>
            {[
              { type: "workflow" as const, label: "Workflow Builder", title: "Build workflows that actually run themselves.", body: "Design multi-step automations visually. Branch logic, conditional triggers, and AI decision nodes — no code required, production-ready from day one.", link: "Start building", href: "/#pricing" },
              { type: "integrations" as const, label: "Integrations", title: "Connect your entire stack in minutes.", body: "150+ native connectors, REST API support, and custom webhooks — your data stays where it lives, and Pliar orchestrates the rest.", link: "Browse integrations", href: "/#Integrations" },
              { type: "observability" as const, label: "Observability", title: "Full visibility into every workflow run.", body: "Monitor performance, trace errors, and audit every step end-to-end. Pliar surfaces only what needs attention — so your team stays in flow.", link: "Start building", href: "/#pricing" },
            ].map((item, index) => (
              <article className={`${styles.highlightRow} ${index % 2 === 1 ? styles.highlightReverse : ""}`} key={item.label}>
                <div className={styles.highlightCopy} data-pliar-reveal>
                  <SectionEyebrow>{item.label}</SectionEyebrow>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                  <ArrowButton href={item.href}>{item.link}</ArrowButton>
                </div>
                <div data-pliar-reveal style={{ "--pliar-delay": "80ms" } as CSSProperties}>
                  <HighlightVisual type={item.type} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.features} id="features">
          <div className={styles.centerIntro} data-pliar-reveal>
            <SectionEyebrow>Platform Capabilities</SectionEyebrow>
            <h2>Everything your team<br className={styles.desktopBreak} /> needs to automate at scale.</h2>
            <p>Built for SaaS teams that need reliability, flexibility, and speed — without the engineering overhead.</p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <article data-pliar-reveal key={feature.title} style={{ "--pliar-delay": `${(index % 3) * 70}ms` } as CSSProperties}>
                <FeatureIcon name={feature.icon} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.gettingStarted}>
          <div className={styles.centerIntro} data-pliar-reveal>
            <SectionEyebrow>Getting Started</SectionEyebrow>
            <h2>From setup to production<br className={styles.desktopBreak} /> in just three simple steps.</h2>
            <p>No lengthy implementations. No dedicated ops team. Connect, configure, and ship.</p>
          </div>
          <div className={styles.gettingGrid}>
            {[
              ["Connect your apps", "Link your existing tools in minutes using Pliar's native connectors or bring your own via API."],
              ["Build your first workflow", "Use the visual builder to define triggers, logic, and AI actions. Start from a template or build from scratch."],
              ["Deploy and let Pliar run it", "Activate your workflow and monitor it in real time. Pliar handles retries, error handling, and scaling automatically."],
            ].map(([title, body], index) => (
              <article data-pliar-reveal key={title} style={{ "--pliar-delay": `${index * 70}ms` } as CSSProperties}>
                <LandscapeCard className={styles.gettingVisual}><GettingVisual step={index} /></LandscapeCard>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.integrationSection} id="Integrations">
          <div className={styles.centerIntro} data-pliar-reveal>
            <SectionEyebrow>Integrations</SectionEyebrow>
            <h2>Works with the tools<br className={styles.desktopBreak} /> your team already uses.</h2>
            <p>From CRMs to data warehouses, Pliar connects across every layer of your stack.</p>
          </div>
          {[integrations.slice(0, 4), integrations.slice(4)].map((row, rowIndex) => (
            <div className={styles.integrationViewport} key={rowIndex}>
              <div className={`${styles.integrationTrack} ${rowIndex === 1 ? styles.integrationReverse : ""}`}>
                {[...row, ...row, ...row].map((item, index) => (
                  <article aria-hidden={index >= row.length} className={styles.integrationCard} key={`${item.name}-${index}`}>
                    <img alt="" height="40" src={item.image} width="40" />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className={styles.testimonialSection} id="Testimonials">
          <div className={styles.centerIntro} data-pliar-reveal>
            <SectionEyebrow>Testimonials</SectionEyebrow>
            <h2>What engineering<br className={styles.desktopBreak} /> teams say about Pliar</h2>
            <p>Join 2,400+ SaaS teams using Pliar to move faster without adding headcount.</p>
          </div>
          <div className={styles.testimonialViewport}>
            <div className={styles.testimonialTrack}>
              {[...testimonials, ...testimonials].map((item, index) => (
                <article aria-hidden={index >= testimonials.length} className={`${styles.testimonialCard} ${index % 2 === 1 ? styles.testimonialAccent : ""}`} key={`${item.name}-${index}`}>
                  <div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div>
                  <blockquote>{item.quote}</blockquote>
                  <footer>
                    <img alt="" height="42" src={item.image} width="42" />
                    <span><b>{item.name}</b><small>{item.role}</small></span>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.pricing} id="pricing">
          <div className={styles.centerIntro} data-pliar-reveal>
            <SectionEyebrow>Pricing</SectionEyebrow>
            <h2>Scale as you grow.<br className={styles.desktopBreak} /> No surprises.</h2>
            <p>Simple, usage-based pricing built for growing SaaS teams. Start free, upgrade when you&apos;re ready.</p>
          </div>
          <div className={styles.priceToggle}>
            <span>Monthly</span>
            <button aria-label="Toggle yearly pricing" aria-pressed={yearly} onClick={() => setYearly((value) => !value)} type="button">
              <span className={yearly ? styles.toggleOn : ""} />
            </button>
            <span>Yearly</span>
          </div>
          <div className={styles.priceGrid}>
            {[
              { name: "Starter", sub: "For small teams exploring AI automation.", price: "$0", suffix: "/ forever", features: ["5 active workflows", "1,000 runs / month", "20+ integrations", "Community support", "Basic workflow templates"], cta: "Start for free" },
              { name: "Growth", sub: "For scaling teams that need more power and reliability.", price: yearly ? "$50" : "$79", suffix: "/ month", features: ["Unlimited workflows", "50,000 runs / month", "150+ integrations", "AI model routing", "Priority support", "Advanced analytics dashboard"], cta: "Start with growth", popular: true },
              { name: "Enterprise", sub: "For organizations with advanced security and scale needs.", price: "Custom", suffix: "pricing", features: ["SSO & role-based access control", "Data residency options", "99.9% uptime SLA guarantee", "Dedicated Customer Success Manager"], cta: "Talk to sales" },
            ].map((plan, index) => (
              <article className={`${styles.priceCard} ${plan.popular ? styles.pricePopular : ""}`} data-pliar-reveal key={plan.name} style={{ "--pliar-delay": `${index * 70}ms` } as CSSProperties}>
                {plan.popular && <p className={styles.popularLabel}>Most Popular</p>}
                <div className={styles.priceCardBody}>
                  <h3>{plan.name}</h3>
                  <p>{plan.sub}</p>
                  <div className={styles.priceValue}><b>{plan.price}</b><span>{plan.suffix}</span></div>
                  <ul>
                    {plan.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}
                  </ul>
                  <ArrowButton href="/contact" primary={Boolean(plan.popular)}>{plan.cta}</ArrowButton>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.centerIntro} data-pliar-reveal>
            <SectionEyebrow>FAQs</SectionEyebrow>
            <h2>Questions we get from engineering teams.</h2>
            <p>Everything you need to know about getting started with Pliar.</p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <article className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`} key={faq.question}>
                  <button
                    aria-controls={`pliar-faq-answer-${index}`}
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : index)}
                    type="button"
                  >
                    <span>{faq.question}</span><b aria-hidden="true">+</b>
                  </button>
                  <div aria-hidden={!open} id={`pliar-faq-answer-${index}`}><p>{faq.answer}</p></div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div data-pliar-reveal>
            <h2>Ready to eliminate bottlenecks<br className={styles.desktopBreak} /> and automate your workflows?</h2>
            <p>Join 2,400+ SaaS teams using Pliar to move faster without adding headcount — no credit card needed.</p>
            <div className={styles.finalActions}>
              <ArrowButton href="/#pricing" primary>Start for free</ArrowButton>
              <ArrowButton href="/contact">Talk to Sales</ArrowButton>
            </div>
            <small>No credit card required · Cancel anytime</small>
          </div>
        </section>
      </main>
      <PliarFooter />
    </>
  );
}
