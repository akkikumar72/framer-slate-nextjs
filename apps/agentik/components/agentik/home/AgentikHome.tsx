"use client";

import Link from "next/link";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AgentikShell,
  Reveal,
  RollingLink,
  SectionEyebrow,
} from "@/components/agentik/shared/AgentikShell";
import { BLOG_POSTS } from "@/components/agentik/shared/content";
import styles from "./AgentikHome.module.css";

const CONSULTATION_URL = "https://cal.com/ramish-design/mentoring";

const HERO_TYPEWRITER_MESSAGES = [
  "I've cleared your inbox and drafted 5 replies.",
  "Your monthly report is ready. Revenue is up 12%.",
  "47 new leads found. Want me to start outreach?",
] as const;

const SERVICE_TYPEWRITER_MESSAGES = [
  "Hi, how can I help you today?",
  "Your order is shipped!",
  "I've forwarded this to the team.",
] as const;

const PROCESS_TYPEWRITER_MESSAGES = [
  "All workflows synced and ready.",
  "Connecting to the CRM now",
  "Slack integration is live.",
] as const;

const PROCESS_APP_ICONS = [
  {
    name: "Agentik",
    accent: true,
    path: "M23.333 13.333c0-.92-.746-1.666-1.666-1.666S20 12.413 20 13.333c0 3.849-.85 6.237-2.307 7.694-1.456 1.455-3.846 2.306-7.693 2.306-.92 0-1.667.747-1.667 1.667S9.08 26.667 10 26.667c3.847 0 6.237.85 7.693 2.306C19.148 30.43 20 32.82 20 36.667c0 .92.746 1.666 1.667 1.666s1.666-.746 1.666-1.666c0-3.847.85-6.237 2.307-7.694 1.457-1.455 3.847-2.306 7.693-2.306.921 0 1.667-.747 1.667-1.667s-.746-1.667-1.667-1.667c-3.846 0-6.236-.85-7.693-2.306-1.455-1.457-2.307-3.845-2.307-7.694ZM10 9.167a.833.833 0 0 0-1.667 0c0 1.633-.361 2.621-.953 3.213-.592.592-1.58.953-3.213.953a.833.833 0 0 0 0 1.667c1.633 0 2.621.362 3.213.953.592.592.953 1.58.953 3.214a.833.833 0 0 0 1.667 0c0-1.634.362-2.622.953-3.214.592-.591 1.58-.953 3.214-.953a.833.833 0 0 0 0-1.667c-1.634 0-2.622-.361-3.214-.953-.591-.592-.953-1.58-.953-3.213Zm8.333-6.667a.833.833 0 0 0-1.666 0c0 1.055-.234 1.625-.555 1.945-.32.322-.89.555-1.945.555a.833.833 0 0 0 0 1.667c1.055 0 1.625.233 1.945.555.32.32.555.89.555 1.945a.833.833 0 0 0 1.666 0c0-1.055.234-1.625.555-1.945.32-.322.89-.555 1.945-.555a.833.833 0 0 0 0-1.667c-1.055 0-1.625-.233-1.945-.555-.321-.32-.555-.89-.555-1.945Z",
  },
  {
    name: "Notion",
    path: "M9.627 9.244c1.026.833 1.413.772 3.34.642l18.176-1.09c.385 0 .065-.385-.063-.45l-3.018-2.182c-.579-.45-1.35-.963-2.827-.833l-17.6 1.283c-.642.063-.77.383-.515.642l2.507 1.988Zm1.091 4.237v19.125c0 1.026.514 1.411 1.67 1.348l19.975-1.157c1.157-.063 1.287-.77 1.287-1.605V12.196c0-.834-.322-1.284-1.03-1.219l-20.875 1.219c-.77.066-1.027.45-1.027 1.283Zm19.72 1.025c.129.578 0 1.156-.578 1.221l-.963.192v14.118c-.835.45-1.607.707-2.249.707-1.028 0-1.285-.322-2.055-1.283l-6.296-9.884v9.562l1.993.45s0 1.155-1.608 1.155l-4.43.257c-.13-.257 0-.899.45-1.027l1.155-.32V17.009l-1.605-.128c-.129-.579.191-1.412 1.091-1.477l4.754-.322 6.551 10.014v-8.857l-1.67-.192c-.128-.706.384-1.22 1.027-1.283l4.433-.258ZM6.157 4.881l18.308-1.349c2.247-.193 2.827-.063 4.238.964l5.845 4.106c.964.707 1.285.9 1.285 1.669v22.526c0 1.414-.515 2.247-2.311 2.375l-21.26 1.284c-1.35.065-1.994-.127-2.7-1.027l-4.304-5.583c-.771-1.029-1.091-1.797-1.091-2.697V7.126c0-1.155.515-2.117 1.99-2.245Z",
  },
  {
    name: "Google",
    path: "M20.189 3.333c4.5 0 8.257 1.652 11.15 4.35l-4.772 4.772c-1.74-1.638-3.923-2.485-6.378-2.488-4.328 0-8.007 2.916-9.33 6.85v.015c-2.067 6.201 2.462 13.211 9.33 13.211 4.123 0 8.153-2.301 8.973-6.62h-8.97v-6.455h15.697c.202 1.125.303 2.266.302 3.409 0 5.076-1.817 9.35-4.969 12.258h-.003l-.528.463c-2.704 2.262-6.284 3.567-10.502 3.567-6.517 0-12.137-3.742-14.88-9.182v-.023a16.663 16.663 0 0 1 .002-14.927v-.001c2.74-5.455 8.361-9.199 14.876-9.199Z",
  },
  {
    name: "Framer",
    path: "M31.185 3.333v11.112H20.073L8.962 3.333h22.221ZM8.962 14.445h11.111l11.11 11.11h-11.11v11.112L8.962 25.555v-11.11Z",
  },
  {
    name: "Linear",
    path: "M3.742 23.842c-.074-.317.303-.517.533-.287l12.17 12.172c.23.228.03.605-.287.531-6.155-1.455-10.961-6.261-12.416-12.416Zm-.409-4.879a.333.333 0 0 0 .097.254L20.783 36.57a.333.333 0 0 0 .254.097c.79-.05 1.565-.154 2.321-.31a.333.333 0 0 0 .159-.55L4.192 16.483a.333.333 0 0 0-.55.159 16.7 16.7 0 0 0-.309 2.321Zm1.404-5.728a.333.333 0 0 0 .07.367l21.591 21.591a.333.333 0 0 0 .367.07c.595-.266 1.172-.565 1.728-.895a.333.333 0 0 0 .062-.513L6.145 11.445a.333.333 0 0 0-.513.062c-.332.558-.631 1.135-.895 1.728Zm2.816-3.877a.333.333 0 0 1-.016-.451A16.63 16.63 0 0 1 19.983 3.333c9.214 0 16.684 7.469 16.684 16.684a16.63 16.63 0 0 1-5.574 12.445.333.333 0 0 1-.45-.015L7.552 9.358Z",
  },
  {
    name: "LinkedIn",
    path: "M32.75 5H7.25A2.25 2.25 0 0 0 5 7.25v25.5A2.25 2.25 0 0 0 7.25 35h25.5A2.25 2.25 0 0 0 35 32.75V7.25A2.25 2.25 0 0 0 32.75 5ZM14 30.5H9.5V17H14v13.5Zm-2.25-16.125a2.625 2.625 0 1 1 .1-5.249 2.625 2.625 0 0 1-.1 5.249ZM30.5 30.5H26v-7.11c0-2.13-.9-2.895-2.07-2.895a2.61 2.61 0 0 0-2.43 2.79v7.215H17V17h4.35v1.95a4.75 4.75 0 0 1 4.05-2.1c2.325 0 5.04 1.29 5.04 5.49l.06 8.16Z",
  },
] as const;

const ACTIVITY_ITEMS = [
  ["NEW LEAD ADDED", "SARAH CHEN FROM ACME CORP", "lead"],
  ["INVOICE #1847 SENT", "£2,400 TO GREENFIELD LTD", "invoice"],
  ["MEETING NOTES TAKEN", "NEXT ACTIONS FROM CALL WITH TOM R.", "meeting"],
  ["FOLLOW-UP SENT", "3RD TOUCHPOINT TO 12 PROSPECTS", "follow"],
  ["EXPENSE LOGGED", "$10 FRAMER SUBSCRIPTION FILED", "expense"],
] as const;

const PROCESS_STEPS = [
  {
    title: "Discovery call",
    text: "We get to know your business, your goals, and where your team is losing the most time.",
  },
  {
    title: "Build your plan",
    text: "We map out the AI tools and automations that will deliver the biggest impact.",
  },
  {
    title: "Setup & integrate",
    text: "We build everything into the tools you already use and test it all until it runs smoothly.",
  },
  {
    title: "Train & support",
    text: "We ensure your team feels confident using it and stay on hand to refine as you grow.",
  },
] as const;

const TEAM_EMOJIS = [
  "/agentik/assets/emoji-workflow.avif",
  "/agentik/assets/emoji-analytics.avif",
  "/agentik/assets/emoji-chat.avif",
  "/agentik/assets/emoji-integration.avif",
  "/agentik/assets/emoji-agent.avif",
  "/agentik/assets/emoji-voice.avif",
  "/agentik/assets/emoji-automation.avif",
] as const;

const TEAM_LABELS = [
  "MARKETER",
  "DESIGNER",
  "ANALYST",
  "HR",
  "ENGINEER",
  "QA TESTER",
  "SUPPORT",
] as const;

const PLANS = [
  {
    name: "STARTER",
    monthly: "$49",
    annual: "$39",
    description: "Perfect for small businesses getting started with AI.",
    features: [
      "Basic workflow automation",
      "1 custom AI agent",
      "Standard analytics & reporting",
      "Email & chat support",
      "Up to 3 integrations",
    ],
  },
  {
    name: "PRO",
    monthly: "$99",
    annual: "$79",
    description: "For growing teams who are ready to automate at scale.",
    features: [
      "Advanced workflow automation",
      "3 custom AI agents + voice agent",
      "Enhanced analytics & insights",
      "Priority support",
      "Up to 10 integrations",
    ],
  },
  {
    name: "ENTERPRISE",
    monthly: "Custom",
    annual: "Custom",
    description: "For businesses that need a fully tailored AI setup.",
    features: [
      "Fully customizable automation",
      "Unlimited AI agents",
      "Predictive analytics & forecasting",
      "Dedicated account manager",
      "Unlimited integrations",
    ],
  },
] as const;

const FAQS = [
  {
    question: "How long does it take to get set up?",
    answer:
      "Most clients are fully up and running within 2-4 weeks. It depends on the complexity of your workflows, but we move fast and keep you in the loop at every stage.",
  },
  {
    question: "Do I need any technical knowledge?",
    answer:
      "Not at all. We handle everything — from strategy to setup to training. You just need to know how your business runs. We'll take care of the rest.",
  },
  {
    question: "Will AI replace my team?",
    answer:
      "No. AI handles the repetitive tasks that slow your team down. Your people get to focus on higher-value work — the stuff that actually grows your business.",
  },
  {
    question: "What tools do you integrate with?",
    answer:
      "We work with the tools you already use — Slack, HubSpot, Salesforce, Google Workspace, Notion, Zapier, and more. If you use it, we can probably connect to it.",
  },
  {
    question: "What if it doesn't work for my business?",
    answer:
      "We start every engagement with a discovery call to make sure AI is the right fit. If it's not, we'll tell you. We'd rather be honest than waste your time.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely. Start with what fits now and scale up whenever you're ready. There are no long-term contracts or lock-ins.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free consultation. We'll learn about your business, find the biggest opportunities, and put together a clear plan — no pressure, no jargon.",
  },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 18 18">
      <path d="M4 9h9.2M10 5.8 13.2 9 10 12.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d="M 4.143 0 L 1.318 0 C 0.59 0 0 0.59 0 1.318 C 0 8.598 5.902 14.5 13.182 14.5 C 13.91 14.5 14.5 13.91 14.5 13.182 L 14.5 10.357 L 11.393 8.286 L 9.782 9.897 C 9.502 10.177 9.084 10.264 8.732 10.082 C 8.136 9.774 7.168 9.195 6.214 8.286 C 5.238 7.354 4.665 6.351 4.378 5.744 C 4.217 5.404 4.311 5.011 4.577 4.745 L 6.214 3.107 Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" transform="translate(4.75 4.75)" />
      <path d="M 0 0 C 2.431 0.696 4.34 2.63 5 5.076" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" transform="translate(14 5.029)" />
    </svg>
  );
}

function AttachmentIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 15 15">
      <path d="M6.875 3.438A2.188 2.188 0 0 1 11.25 3.438V10a3.75 3.75 0 0 1-7.5 0V5.625a.625.625 0 0 1 1.25 0V10a2.5 2.5 0 0 0 5 0V3.438a.938.938 0 0 0-1.875 0v5.937a.625.625 0 0 1-1.25 0V3.438Z" fill="currentColor" />
    </svg>
  );
}

function UploadImageIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 15 15">
      <path d="M1.875 3.125c0-.69.56-1.25 1.25-1.25h8.75c.69 0 1.25.56 1.25 1.25v8.75c0 .69-.56 1.25-1.25 1.25h-8.75c-.69 0-1.25-.56-1.25-1.25V3.125Zm10 8.75v-8.75h-8.75v5.366l.991-.991a1.25 1.25 0 0 1 1.768 0l4.375 4.375h1.616Z" fill="currentColor" />
      <path d="m8.489 5.223.298-.597a.313.313 0 0 1 .559 0l.3.598a.313.313 0 0 0 .139.14l.598.298a.313.313 0 0 1 0 .559l-.598.3a.313.313 0 0 0-.139.139l-.3.598a.313.313 0 0 1-.559 0l-.299-.598a.313.313 0 0 0-.139-.139l-.598-.3a.313.313 0 0 1 0-.559l.598-.298a.313.313 0 0 0 .14-.14Z" fill="currentColor" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18">
      <path d="M6.75 3a.75.75 0 0 0-1.5 0v12a.75.75 0 0 0 1.5 0V3Zm6 1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Zm-3 1.5a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0V6Zm-6 1.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-3Zm12 0a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-3Z" fill="currentColor" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 28 28">
      <path d="M14 2.8c.5 6.2 4.6 10.3 10.8 11.2-6.2.8-10.3 5-10.8 11.2C13.5 19 9.4 14.8 3.2 14 9.4 13.1 13.5 9 14 2.8Z" fill="currentColor" />
    </svg>
  );
}

function ProcessAppIcon({ icon }: { icon: (typeof PROCESS_APP_ICONS)[number] }) {
  return (
    <span
      aria-label={icon.name}
      className={styles.processMapIcon}
      data-accent={"accent" in icon && icon.accent ? "true" : undefined}
      role="img"
    >
      <svg aria-hidden="true" viewBox="0 0 40 40">
        <path d={icon.path} fill="currentColor" />
      </svg>
    </span>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useTypewriter(
  messages: readonly string[],
  mode: "cycle" | "delete",
) {
  const reducedMotion = usePrefersReducedMotion();
  const [messageIndex, setMessageIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const message = messages[messageIndex];

    if (reducedMotion) {
      if (characterIndex !== message.length) {
        const frame = window.requestAnimationFrame(() => setCharacterIndex(message.length));
        return () => window.cancelAnimationFrame(frame);
      }
      return;
    }

    if (mode === "cycle") {
      const timeout = window.setTimeout(() => {
        if (characterIndex === message.length) {
          setCharacterIndex(0);
          setMessageIndex((current) => (current + 1) % messages.length);
          return;
        }
        setCharacterIndex((current) => current + 1);
      }, characterIndex === message.length ? 500 : 50);

      return () => window.clearTimeout(timeout);
    }

    let delay = deleting ? 19 : 48;

    if (!deleting && characterIndex === message.length) delay = 1350;
    if (deleting && characterIndex === 0) delay = 360;

    const timeout = window.setTimeout(() => {
      if (!deleting && characterIndex === message.length) {
        setDeleting(true);
        return;
      }
      if (deleting && characterIndex === 0) {
        setDeleting(false);
        setMessageIndex((current) => (current + 1) % messages.length);
        return;
      }
      setCharacterIndex((current) => current + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [characterIndex, deleting, messageIndex, messages, mode, reducedMotion]);

  return messages[messageIndex].slice(0, characterIndex);
}

function ChatComposer({
  className = "",
  hero = false,
  messages,
  reveal = false,
  staticText,
}: {
  className?: string;
  hero?: boolean;
  messages?: readonly string[];
  reveal?: boolean;
  staticText?: string;
}) {
  const typedText = useTypewriter(
    messages ?? (hero ? HERO_TYPEWRITER_MESSAGES : SERVICE_TYPEWRITER_MESSAGES),
    hero ? "delete" : "cycle",
  );

  return (
    <div
      className={`${styles.chatComposer} ${hero ? styles.heroComposer : ""} ${reveal ? styles.serviceReveal : ""} ${className}`}
      data-agentik-reveal={reveal || undefined}
      data-agentik-reveal-threshold={reveal ? 0.5 : undefined}
      style={reveal ? ({ "--agentik-reveal-delay": "200ms" } as CSSProperties) : undefined}
    >
      <div className={styles.chatMessage} aria-live={hero ? "polite" : undefined}>
        <span className={styles.chatSpark}><SparkIcon /></span>
        <span>{staticText ?? typedText}</span>
        <span aria-hidden="true" className={styles.caret} />
      </div>
      <div className={styles.chatActions}>
        <span><AttachmentIcon /> ADD ATTACHMENT</span>
        <span><UploadImageIcon /> UPLOAD IMAGE</span>
        <span aria-hidden="true" className={styles.waveMini}><WaveIcon /></span>
      </div>
    </div>
  );
}

function ProcessAppMap() {
  return (
    <div className={styles.processMap}>
      <svg aria-hidden="true" className={`${styles.processMapLine} ${styles.processMapLineLeft}`} viewBox="0 0 125 389">
        <path d="M124.5 0H0V389" pathLength="1" />
      </svg>
      <svg aria-hidden="true" className={`${styles.processMapLine} ${styles.processMapLineUpper}`} viewBox="0 0 241 1">
        <path d="M0 .5H241" pathLength="1" />
      </svg>
      <svg aria-hidden="true" className={`${styles.processMapLine} ${styles.processMapLineLower}`} viewBox="0 0 241 1">
        <path d="M0 .5H241" pathLength="1" />
      </svg>
      <svg aria-hidden="true" className={`${styles.processMapLine} ${styles.processMapLineStem}`} viewBox="0 0 1 190">
        <path d="M.5 0V190" pathLength="1" />
      </svg>
      <svg aria-hidden="true" className={`${styles.processMapLine} ${styles.processMapLineRight}`} viewBox="0 0 119 389">
        <path d="M0 0H119V389" pathLength="1" />
      </svg>
      {PROCESS_APP_ICONS.map((icon, index) => (
        <ProcessAppIcon icon={icon} key={icon.name} />
      ))}
    </div>
  );
}

function ProcessChatVisual({ complete = false }: { complete?: boolean }) {
  return (
    <div className={styles.processChatVisual}>
      <span aria-hidden="true" className={styles.processChatLine} />
      <ChatComposer
        className={`${styles.heroComposer} ${styles.processChat}`}
        messages={PROCESS_TYPEWRITER_MESSAGES}
        staticText={complete ? "All workflows synced and ready." : undefined}
      />
      <span aria-hidden="true" className={styles.processSuccess}>
        <svg viewBox="0 0 52 52">
          <path d="M41.846 9.198a3.25 3.25 0 0 1 .944 4.498L24.374 41.862a3.25 3.25 0 0 1-5.189.336l-9.75-11.375a3.25 3.25 0 0 1 4.935-4.229l6.934 8.088 16.044-24.544a3.25 3.25 0 0 1 4.498-.94Z" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.rail} ${styles.heroRail}`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <SectionEyebrow className={`${styles.heroEyebrow} ${styles.loadEyebrow}`}>
              3 SPOTS LEFT FOR APRIL
            </SectionEyebrow>
            <h1 className={styles.loadMain}>AI made easy so your business scales fast</h1>
            <p className={`${styles.heroLead} ${styles.loadMain}`}>
              We help businesses implement AI tools and workflows<br className={styles.heroLeadBreak} />{" "}that cut costs, save time, and drive real growth.
            </p>
            <div className={`${styles.heroActions} ${styles.loadActions}`}>
              <RollingLink href={CONSULTATION_URL} leadingIcon={<PhoneIcon />}>
                Book a free consultation
              </RollingLink>
              <RollingLink href="#process" variant="secondary">
                See how it works
              </RollingLink>
            </div>
          </div>
          <div aria-hidden="true" className={styles.heroVisual}>
            <div className={styles.heroAurora} />
            <div className={styles.composerWrap}>
              <ChatComposer hero />
            </div>
          </div>
        </div>
        <div className={`${styles.companyStrip} ${styles.loadLogos}`}>
          <p>Transforming companies<br />around the globe:</p>
          <div className={styles.logoMarquee}>
            <div className={styles.logoTrack}>
              <span><b>↗</b> Scale</span>
              <span><b>◐</b> monochrome</span>
              <span><b>▣</b> SnapShot</span>
              <span><b>♭</b> umbrella</span>
              <span><b>ⓦ</b> waveless</span>
              <span aria-hidden="true"><b>↗</b> Scale</span>
              <span aria-hidden="true"><b>◐</b> monochrome</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivityList({
  animated = false,
  compact = false,
  reveal = false,
}: {
  animated?: boolean;
  compact?: boolean;
  reveal?: boolean;
}) {
  const items = compact ? ACTIVITY_ITEMS.slice(1, 4) : ACTIVITY_ITEMS;
  const list = (
    <ul className={styles.activityList}>
      {items.map(([label, detail, tone]) => (
        <li key={label}>
          <span aria-hidden="true" className={`${styles.activityIcon} ${styles[`activity${tone}`]}`}>
            {tone === "lead" ? "♟" : tone === "invoice" ? "▣" : tone === "meeting" ? "⌕" : tone === "follow" ? "↗" : "▤"}
          </span>
          <span><b>{label}</b><small>{detail}</small></span>
        </li>
      ))}
    </ul>
  );

  return animated ? (
    <div
      className={`${styles.activityViewport} ${reveal ? styles.serviceReveal : ""}`}
      data-agentik-reveal={reveal || undefined}
      data-agentik-reveal-threshold={reveal ? 0.5 : undefined}
      style={reveal ? ({ "--agentik-reveal-delay": "200ms" } as CSSProperties) : undefined}
    >
      {list}
    </div>
  ) : list;
}

function IntegrationWidget() {
  return (
    <div className={styles.integrationIcons} aria-hidden="true">
      <span>G</span><span>✣</span><span>N</span><span>F</span><span>◒</span><span>in</span>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className={styles.services}>
      <div className={`${styles.rail} ${styles.servicesRail}`}>
        <div className={styles.servicesHeader}>
          <Reveal className={styles.servicesHeading}>
            <SectionEyebrow>SERVICES</SectionEyebrow>
            <h2>AI solutions built around how your business works</h2>
            <p>We plug AI into your existing tools and workflows. Cutting costs, saving hours, and freeing your team to focus on work that moves the needle.</p>
          </Reveal>
        </div>
        <div className={styles.serviceGrid}>
          <div className={`${styles.serviceCard} ${styles.workflowCard}`}>
            <Reveal className={`${styles.serviceCopy} ${styles.serviceReveal}`} delay={200} threshold={0.5}>
              <h3>Workflow<br className={styles.workflowBreak} />{" "}automations</h3>
              <p>Automate the busywork. Free your team to focus on what matters.</p>
            </Reveal>
            <ActivityList animated reveal />
          </div>
          <div className={styles.serviceColumn}>
            <Reveal className={`${styles.serviceCard} ${styles.dataCard}`} delay={70}>
              <div className={styles.serviceCopy}>
                <SectionEyebrow>REAL-TIME INSIGHTS</SectionEyebrow>
                <h3>Data &amp; analytics</h3>
                <p>Turn your raw data into clear insights that help you make smarter decisions, faster.</p>
              </div>
            </Reveal>
            <Reveal className={`${styles.serviceCard} ${styles.integrationCard}`} delay={110}>
              <IntegrationWidget />
              <div className={styles.serviceCopy}>
                <h3>Seamless integration</h3>
                <p>We plug AI into the tools you already use. No disruption, no learning curve.</p>
              </div>
            </Reveal>
          </div>
          <div className={`${styles.serviceCard} ${styles.chatbotCard}`}>
            <ChatComposer reveal />
            <Reveal className={`${styles.serviceCopy} ${styles.serviceReveal}`} delay={200} threshold={0.5}>
              <SectionEyebrow>CUSTOM AGENTS</SectionEyebrow>
              <h3>AI chatbots &amp; support</h3>
              <p>Give your customers instant answers 24/7 without growing your team.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const visualRef = useRef<HTMLDivElement>(null);
  const discoveryVideoRef = useRef<HTMLVideoElement>(null);
  const buildVideoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const visual = visualRef.current;
    const videos = [discoveryVideoRef.current, buildVideoRef.current].filter(
      (video): video is HTMLVideoElement => video !== null,
    );
    if (!visual) return;
    const shouldReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || reducedMotion;
    const setPlayback = (playing: boolean) => videos.forEach((video) => {
      if (!playing || shouldReduce) video.pause();
      else void video.play().catch(() => undefined);
    });
    const observer = new IntersectionObserver(
      ([entry]) => setPlayback(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(visual);
    return () => {
      observer.disconnect();
      setPlayback(false);
    };
  }, [reducedMotion]);

  return (
    <section className={styles.process} id="process">
      <div className={`${styles.rail} ${styles.processRail}`}>
        <Reveal className={styles.processHeader}>
          <SectionEyebrow>SETUP PROCESS</SectionEyebrow>
          <h2>From first call to fully integrated in weeks</h2>
          <p>Learn how your business runs, find where AI makes the biggest impact, and set everything up for you.</p>
        </Reveal>
        <div className={styles.processBody}>
          <div aria-label="Setup process steps" className={styles.processSteps} data-agentik-reveal>
            {PROCESS_STEPS.map((step, index) => (
              <button
                aria-controls="agentik-process-visual"
                aria-pressed={activeStep === index}
                className={styles.processStep}
                data-active={activeStep === index ? "true" : undefined}
                key={step.title}
                onClick={() => setActiveStep(index)}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  setActiveStep(index);
                }}
                type="button"
              >
                <SectionEyebrow>STEP {index + 1}</SectionEyebrow>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </button>
            ))}
          </div>
          <div
            aria-label={`Step ${activeStep + 1}: ${PROCESS_STEPS[activeStep].title}`}
            className={styles.processVisual}
            id="agentik-process-visual"
            ref={visualRef}
          >
            <div aria-hidden={activeStep !== 3} className={styles.processPanel} data-visible={activeStep <= 3 ? "true" : undefined}>
              <div className={styles.processVideoFrame}>
                <video autoPlay={!reducedMotion} className={styles.processVideo} loop muted playsInline preload="metadata" ref={discoveryVideoRef} src="/agentik/assets/process-discovery.mp4" />
              </div>
            </div>
            <div
              aria-hidden={activeStep !== 2}
              className={styles.processPanel}
              data-mobile-complete={activeStep === 3 ? "true" : undefined}
              data-visible={activeStep <= 2 ? "true" : undefined}
            >
              <ProcessChatVisual complete={activeStep === 3} />
            </div>
            <div aria-hidden={activeStep !== 1} className={styles.processPanel} data-visible={activeStep <= 1 ? "true" : undefined}>
              <ProcessAppMap />
            </div>
            <div aria-hidden={activeStep !== 0} className={styles.processPanel} data-visible={activeStep === 0 ? "true" : undefined}>
              <div className={styles.processVideoFrame}>
                <video autoPlay={!reducedMotion} className={styles.processVideo} loop muted playsInline preload="metadata" ref={buildVideoRef} src="/agentik/assets/process-build.mp4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.metric}>
      <Reveal className={styles.metricContent}>
        <strong>{value}</strong><span>{label}</span>
      </Reveal>
    </div>
  );
}

function CaseStudySection({ second = false }: { second?: boolean }) {
  const firstMetrics = [
    ["30hr", "SAVED PER WEEK"],
    ["$42k", "SAVED ANNUALLY"],
    ["98%", "CUSTOMER SATISFACTION"],
    ["3x", "FASTER RESPONSE TIME"],
  ];
  const secondMetrics = [
    ["4x", "FASTER LEAD REPSONSE"],
    ["35%", "INCREASE IN CLOSE RATE"],
    ["200+", "HOURS SAVED PER MONTH"],
    ["$120k", "REVENUE IN 90 DAYS"],
  ];

  return (
    <section className={`${styles.caseStudy} ${second ? styles.caseStudySecond : ""}`}>
      <div className={`${styles.rail} ${styles.caseRail}`}>
        <div className={styles.caseImage}>
          <img
            alt={second ? "Sophie Pearson in her office" : "James Walker in his office"}
            src={second ? "/agentik/assets/case-study-michelle.avif" : "/agentik/assets/case-study-daniel.avif"}
          />
        </div>
        <div className={styles.caseCopy}>
          <Reveal className={styles.caseQuote}>
            <SectionEyebrow>CLIENT SUCCESS</SectionEyebrow>
            <h2>{second
              ? "We were losing deals because we couldn't follow up fast enough. Now AI does it in seconds."
              : "We had no idea where to start with AI. Now we're saving 30 hours a week."}</h2>
            <p>{second
              ? "Our sales team was stretched thin and leads were slipping through the cracks. They built us an AI system that follows up instantly, qualifies leads, and books meetings, all before we've even seen the notification."
              : "We were drowning in manual processes and knew AI could help but didn't know how. They came in, learned our business in a week, and built automations that changed how our entire team works. Best investment we've made."}</p>
            <div className={styles.casePerson}>
              <strong>{second ? "SOPHIE PEARSON" : "JAMES WALKER"}</strong>
              <span>{second ? "HEAD OF SALES @ RIDGEWAY DIGITAL" : "COO @ GREENFIELD LOGISTICS"}</span>
            </div>
          </Reveal>
          <div className={styles.metrics}>
            {(second ? secondMetrics : firstMetrics).map(([value, label]) => <Metric key={label} label={label} value={value} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentOrbit() {
  return (
    <div className={styles.agentOrbit}>
      <div className={styles.orbitRing} />
      <span className={styles.orbitCenter}><SparkIcon /></span>
      {TEAM_EMOJIS.map((image, index) => (
        <span className={styles.orbitPerson} key={image} style={{ "--orbit-index": index } as CSSProperties}>
          <img alt="" src={image} />
          <small>{TEAM_LABELS[index]}</small>
        </span>
      ))}
    </div>
  );
}

function VoiceWidget() {
  const waveform = [18, 32, 48, 25, 65, 92, 55, 118, 80, 44, 104, 58, 77, 35, 52, 22];
  return (
    <div className={styles.voiceWidget}>
      <div className={styles.waveform}>
        {waveform.map((height, index) => <i key={`${height}-${index}`} style={{ height }} />)}
        <span className={styles.voiceSpark}><SparkIcon /></span>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className={`${styles.rail} ${styles.featuresRail}`}>
        <div className={styles.featuresHeader}>
          <Reveal className={styles.featuresHeading}>
            <SectionEyebrow>FEATURES</SectionEyebrow>
            <h2>Powerful AI features that work behind the scene</h2>
            <p>Smart tools that handle the heavy lifting across your business, so your team can stop firefighting and start growing.</p>
          </Reveal>
          <Reveal className={styles.featuresCta} delay={100}>
            <RollingLink href={CONSULTATION_URL} trailingIcon={<ArrowIcon />}>
              Let&apos;s build your AI powerhouse
            </RollingLink>
          </Reveal>
        </div>
        <div className={styles.featureGrid}>
          <Reveal className={styles.featureCard}>
            <div className={styles.featureVisual}><AgentOrbit /></div>
            <h3>Custom AI Agents</h3>
            <p>Assistants trained on your data that work the way your business does.</p>
          </Reveal>
          <Reveal className={styles.featureCard} delay={80}>
            <div className={styles.featureVisual}><VoiceWidget /></div>
            <h3>Voice Agents</h3>
            <p>Joins meetings, takes notes, and follows up with your team after.</p>
          </Reveal>
          <Reveal className={styles.featureCard} delay={140}>
            <div className={`${styles.featureVisual} ${styles.automationVisual}`}><ActivityList compact /></div>
            <h3>Multi-Platform Automation</h3>
            <p>One system connecting your CRM, email, Slack, and everything else.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    const breakpoints = [
      window.matchMedia("(min-width: 1200px)"),
      window.matchMedia("(max-width: 809.98px)"),
    ];
    const resetBilling = () => setAnnual(false);

    breakpoints.forEach((query) => query.addEventListener("change", resetBilling));
    return () => breakpoints.forEach((query) => query.removeEventListener("change", resetBilling));
  }, []);

  return (
    <section className={styles.pricing}>
      <div className={`${styles.rail} ${styles.pricingRail}`}>
        <Reveal className={styles.pricingHeader}>
          <SectionEyebrow className={styles.pricingEyebrow}>PRICING</SectionEyebrow>
          <h2>AI that fits your business and your budget</h2>
          <p className={styles.pricingDescription}>Every plan includes onboarding, ongoing support, and a dedicated team, so you get results from day one without any surprises.</p>
          <div className={styles.billingToggle}>
            <button aria-pressed={!annual} onClick={() => setAnnual(false)} type="button">MONTHLY</button>
            <button
              aria-label={annual ? "Show monthly prices" : "Show annual prices"}
              className={styles.toggleTrack}
              data-annual={annual ? "true" : undefined}
              onClick={() => setAnnual((value) => !value)}
              type="button"
            ><span /></button>
            <button aria-pressed={annual} onClick={() => setAnnual(true)} type="button">ANNUALLY</button>
          </div>
        </Reveal>
        <div className={styles.planGrid}>
          {PLANS.map((plan, index) => {
            const enterprise = index === 2;
            return (
              <div className={`${styles.planColumn} ${enterprise ? styles.enterpriseColumn : ""}`} key={plan.name}>
                <Reveal className={styles.planContent} delay={200} threshold={0.5}>
                  <div className={styles.planCard}>
                    <SectionEyebrow className={styles.planName}>{plan.name}</SectionEyebrow>
                    <div className={styles.planHeading}>
                      <div className={styles.priceLine}>
                        <strong>{annual ? plan.annual : plan.monthly}</strong>
                        {!enterprise && <span>{annual ? "/ billed annually" : "/ month"}</span>}
                      </div>
                      <p className={styles.planDescription}>{plan.description}</p>
                    </div>
                    <RollingLink
                      href={CONSULTATION_URL}
                      leadingIcon={enterprise ? <PhoneIcon /> : undefined}
                      trailingIcon={!enterprise ? <ArrowIcon /> : undefined}
                      variant={enterprise ? "secondary" : "primary"}
                    >
                      {enterprise ? "Book a call with us" : "Get started"}
                    </RollingLink>
                  </div>
                  <ul className={styles.planFeatures}>
                    {plan.features.map((feature) => <li key={feature}><span aria-hidden="true">•</span>{feature}</li>)}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  const posts = BLOG_POSTS.slice(0, 2);
  return (
    <section className={styles.blog}>
      <div className={`${styles.rail} ${styles.blogRail}`}>
        <div className={styles.blogHeader}>
          <Reveal className={styles.blogHeading}>
            <SectionEyebrow>BLOG</SectionEyebrow>
            <h2>Insights to keep you ahead of the curve</h2>
            <p>Practical guides, AI trends, and real strategies to help you get more from automation, written for business owners, not engineers.</p>
          </Reveal>
          <Reveal className={styles.blogMore} delay={100}>
            <RollingLink href="/blog" trailingIcon={<ArrowIcon />} variant="text">View more</RollingLink>
          </Reveal>
        </div>
        <div className={styles.blogGrid}>
          {posts.map((post, index) => (
            <Reveal className={styles.blogReveal} delay={index * 90} key={post.slug}>
              <Link className={styles.blogCard} href={`/blog/${post.slug}`}>
                <span className={styles.blogCover}><img alt="" src={post.cover} /></span>
                <strong>{post.title}</strong>
                <span className={styles.blogMeta}>
                  <span><img alt="" src={post.authorImage} /><small>{post.category.toUpperCase()} <i>•</i> {post.author.toUpperCase()}</small></span>
                  <ArrowIcon />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]));
  const ids = useMemo(() => FAQS.map((_, index) => `agentik-faq-${index}`), []);

  const toggle = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className={styles.faq}>
      <div className={`${styles.rail} ${styles.faqRail}`}>
        <Reveal className={styles.faqHeading}>
          <SectionEyebrow>FAQS</SectionEyebrow>
          <h2>Clearing all doubts and concerns</h2>
          <p>Everything you need to know before getting started with us. Below are out most common questions we get asked.</p>
        </Reveal>
        <Reveal className={styles.faqList} delay={100}>
          {FAQS.map((item, index) => {
            const open = openItems.has(index);
            return (
              <div className={styles.faqItem} data-open={open ? "true" : undefined} key={item.question}>
                <button aria-controls={ids[index]} aria-expanded={open} onClick={() => toggle(index)} type="button">
                  <span>{item.question}</span><i aria-hidden="true" />
                </button>
                <div className={styles.faqAnswer} id={ids[index]}>
                  <div><p>{item.answer}</p></div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

export default function AgentikHome() {
  return (
    <AgentikShell>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <CaseStudySection />
      <FeaturesSection />
      <PricingSection />
      <CaseStudySection second />
      <BlogSection />
      <FaqSection />
    </AgentikShell>
  );
}
