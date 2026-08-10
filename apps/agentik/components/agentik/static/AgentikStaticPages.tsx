import Link from "next/link";
import {
  AgentikShell,
  Reveal,
  RollingLink,
  SectionEyebrow,
} from "@/components/agentik/shared/AgentikShell";
import {
  BLOG_POSTS,
  TEAM_MEMBERS,
} from "@/components/agentik/shared/content";
import { CareersOpenings } from "./CareersOpenings";
import { ContactFaq } from "./ContactFaq";
import { ContactForm } from "./ContactForm";
import styles from "./AgentikStaticPages.module.css";

const CONSULTATION_URL = "https://cal.com/ramish-design/mentoring";

const ABOUT_STATS = [
  { value: "50+", label: "Businesses transformed" },
  { value: "10k+", label: "Hours saved monthly" },
  { value: "$2.1m", label: "Saved for our clients" },
] as const;

const CAREER_STATS = [
  { value: "100%", label: "Remote team" },
  { value: "12", label: "Countries represented" },
  { value: "0", label: "Pointless meeting policy" },
] as const;

const PILLARS = [
  {
    label: "Pillar 1",
    title: "Simplicity first",
    copy: "No jargon, no complexity. If your team can't understand it, we haven't done our job.",
  },
  {
    label: "Pillar 2",
    title: "Results > hype",
    copy: "We don't chase trends. Every solution is measured by time saved or money made.",
  },
  {
    label: "Pillar 3",
    title: "Built to last",
    copy: "No quick fixes. We build AI systems that grow with your business long term.",
  },
] as const;

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      {direction === "left" ? (
        <path d="m11.8 5.4-4.6 4.6 4.6 4.6M7.4 10h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      ) : (
        <path d="m8.2 5.4 4.6 4.6-4.6 4.6M12.6 10h-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
      )}
    </svg>
  );
}

function MetricStrip({ items }: { items: ReadonlyArray<{ value: string; label: string }> }) {
  return (
    <div className={styles.metricStrip}>
      {items.map((item) => (
        <div className={styles.metric} key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function SocialLinks({ name }: { name: string }) {
  return (
    <div aria-label={`${name} social links`} className={styles.socialLinks}>
      <a aria-label={`${name} on X`} href="https://x.com/ramishdotdesign" rel="noreferrer" target="_blank">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18.7 2h3.7l-8.1 9.2L23.8 22h-7.4l-5.8-7.6L3.9 22H.2l8.7-10L-.2 2h7.6l5.3 7Zm-1.3 18.1h2L6.3 3.8H4.2Z" /></svg>
      </a>
      <a aria-label={`${name} on LinkedIn`} href="https://www.linkedin.com/" rel="noreferrer" target="_blank">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5.3 7.8H1.1V22h4.2ZM3.2 2A2.4 2.4 0 1 0 3.2 6.8 2.4 2.4 0 0 0 3.2 2M22.9 13.9c0-4.3-2.3-6.3-5.3-6.3-2.4 0-3.5 1.3-4.1 2.3V7.8H9.3V22h4.2v-7c0-1.9.4-3.7 2.7-3.7 2.3 0 2.3 2.1 2.3 3.8V22h4.2Z" /></svg>
      </a>
    </div>
  );
}

function TeamSection({ centered = false, showAction = false }: { centered?: boolean; showAction?: boolean }) {
  return (
    <section className={styles.teamSection}>
      <div className={`${styles.rail} ${styles.teamRail}`}>
        <div className={`${styles.teamHeader} ${centered ? styles.teamHeaderCentered : ""}`}>
          <div className={styles.teamHeading}>
            <SectionEyebrow className={styles.accentEyebrow}>Team</SectionEyebrow>
            <h2>The people behind your AI transformation</h2>
            <p>A small team of specialists who care more about your results than buzzwords.</p>
          </div>
          {showAction ? (
            <div className={styles.teamAction}>
              <RollingLink href="/careers" trailingIcon={<Arrow />}>
                Join our team
              </RollingLink>
            </div>
          ) : null}
        </div>
        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member) => (
            <div className={styles.teamReveal} key={member.name}>
              <article className={styles.teamCard}>
                <div className={styles.teamImage}>
                  <img
                    alt={member.name}
                    loading="lazy"
                    src={member.image}
                    style={{ objectPosition: member.position ?? "50% 28%" }}
                  />
                </div>
                <div className={styles.teamDetails}>
                  <span>{member.role}</span>
                  <h3>{member.name}</h3>
                  <SocialLinks name={member.name} />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className={styles.missionSection}>
      <div className={`${styles.rail} ${styles.missionRail}`}>
        <div className={styles.missionHeading}>
          <SectionEyebrow className={styles.accentEyebrow}>Mission</SectionEyebrow>
          <h2>We exist to close the gap between AI and busines</h2>
          <p>We started because we saw too many businesses being left behind. We&apos;re here to change that.</p>
        </div>
        <div className={styles.pillarGrid}>
          {PILLARS.map((pillar) => (
            <div className={styles.pillarReveal} key={pillar.title}>
              <article className={styles.pillarCard}>
                <SectionEyebrow className={styles.accentEyebrow}>{pillar.label}</SectionEyebrow>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogTeaser() {
  return (
    <section className={styles.blogSection}>
      <div className={`${styles.rail} ${styles.blogRail}`}>
        <div className={styles.blogHeader}>
          <div className={styles.blogHeading}>
            <SectionEyebrow className={styles.accentEyebrow}>Blog</SectionEyebrow>
            <h2>Insights to keep you ahead of the curve</h2>
            <p>Practical guides, AI trends, and real strategies to help you get more from automation, written for business owners, not engineers.</p>
          </div>
          <div className={styles.blogAction}>
            <RollingLink href="/blog" trailingIcon={<Arrow />}>
              View more
            </RollingLink>
          </div>
        </div>
        <div className={styles.blogGrid}>
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <div className={styles.blogReveal} key={post.slug}>
              <Link className={styles.blogCard} href={`/blog/${post.slug}`}>
                <span className={styles.blogCover}>
                  <img alt={post.title} loading="lazy" src={post.cover} />
                </span>
                <strong>{post.title}</strong>
                <span className={styles.blogMeta}>
                  <small>{post.category}</small>
                  <i aria-hidden="true">•</i>
                  <img alt="" src={post.authorImage} style={{ objectPosition: post.authorPosition ?? "50% 28%" }} />
                  <small>{post.author}</small>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AgentikAboutPage() {
  return (
    <AgentikShell>
      <section className={`${styles.splitHero} ${styles.aboutHero}`}>
        <div className={`${styles.rail} ${styles.splitHeroRail}`}>
          <div className={styles.heroMedia}>
            <img alt="Agentik team" fetchPriority="high" src="/agentik/assets/about-hero.png" />
          </div>
          <div className={styles.heroCopy}>
            <Reveal className={styles.heroEyebrow} delay={120}>
              <SectionEyebrow className={styles.accentEyebrow}>About</SectionEyebrow>
            </Reveal>
            <Reveal className={styles.heroTitle} delay={200}>
              <h1>We help businesses scale with AI</h1>
            </Reveal>
            <Reveal className={styles.heroLead} delay={280}>
              <p>A team of AI specialists helping companies save time, cut costs, and scale, without the complexity.</p>
            </Reveal>
            <Reveal className={styles.heroActions} delay={360}>
              <RollingLink href={CONSULTATION_URL}>Book a free AI audit</RollingLink>
              <RollingLink href="/careers" trailingIcon={<Arrow />} variant="secondary">
                Join our team
              </RollingLink>
            </Reveal>
          </div>
          <MetricStrip items={ABOUT_STATS} />
        </div>
      </section>
      <MissionSection />
      <TeamSection showAction />
      <BlogTeaser />
    </AgentikShell>
  );
}

export function AgentikCareersPage() {
  return (
    <AgentikShell>
      <section className={`${styles.splitHero} ${styles.careersHero}`}>
        <div className={`${styles.rail} ${styles.splitHeroRail}`}>
          <div className={styles.heroMedia}>
            <img alt="Agentik colleagues" fetchPriority="high" src="/agentik/assets/careers-hero.png" />
          </div>
          <div className={styles.heroCopy}>
            <Reveal className={styles.heroEyebrow} delay={120}>
              <SectionEyebrow className={styles.accentEyebrow}>Careers</SectionEyebrow>
            </Reveal>
            <Reveal className={styles.heroTitle} delay={200}>
              <h1>Help us bring AI to businesses everywhere</h1>
            </Reveal>
            <Reveal className={styles.heroLead} delay={280}>
              <p>We&apos;re a small team doing big things. If you&apos;re passionate about AI, we&apos;d love to hear from you.</p>
            </Reveal>
          </div>
          <MetricStrip items={CAREER_STATS} />
        </div>
      </section>
      <CareersOpenings />
      <TeamSection centered />
    </AgentikShell>
  );
}

export function AgentikContactPage() {
  return (
    <AgentikShell>
      <section className={styles.contactHero}>
        <div className={`${styles.rail} ${styles.contactHeroRail}`}>
          <Reveal className={styles.contactHeroCopy} delay={120}>
            <SectionEyebrow className={styles.accentEyebrow}>Contact</SectionEyebrow>
            <h1>Let&apos;s talk about what AI can do for you</h1>
            <p>Fill in the form below and we&apos;ll get back to you within 24 hours. No sales pitch, no pressure.</p>
          </Reveal>
        </div>
      </section>
      <ContactForm />
      <section className={styles.contactFaqSection}>
        <div className={`${styles.rail} ${styles.contactFaqRail}`}>
          <div className={styles.contactFaqHeading}>
            <SectionEyebrow className={styles.accentEyebrow}>Faqs</SectionEyebrow>
            <h2>Clearing all doubts and concerns</h2>
            <p>Everything you need to know before getting started with us. Below are out most common questions we get asked.</p>
          </div>
          <ContactFaq />
        </div>
      </section>
    </AgentikShell>
  );
}

export function AgentikNotFoundPage() {
  return (
    <AgentikShell>
      <section className={styles.notFoundHero}>
        <div className={`${styles.rail} ${styles.notFoundRail}`}>
          <div className={styles.notFoundCopy}>
            <SectionEyebrow className={styles.accentEyebrow}>Error 404</SectionEyebrow>
            <h1>Even AI can&apos;t find this page</h1>
            <p>Unlike our AI, this page isn&apos;t available 24/7. Let&apos;s take you home.</p>
            <RollingLink
              className={styles.homeButton}
              href="/"
              leadingIcon={<span className={styles.mobileHomeLabel}><Arrow direction="left" /></span>}
              trailingIcon={<span className={styles.desktopHomeLabel}><Arrow /></span>}
            >
              Take me home
            </RollingLink>
          </div>
        </div>
      </section>
    </AgentikShell>
  );
}
