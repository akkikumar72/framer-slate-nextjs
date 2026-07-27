import Link from "next/link";
import {
  AgenioHeader,
  ContactFooter,
  CornerMarkers,
  DarkButton,
  PixelSteps,
  SectionLabel,
} from "@/components/agenio/shared/AgenioShell";
import { ProjectCard } from "./ProjectCard";
import { pricingPlans, projectFaqs, projects } from "./data";
import styles from "./ProjectsIndex.module.css";

const delays = [
  {
    number: "01",
    title: "Manual Operations Slow Progress",
    label: "/Workload",
    value: 80,
  },
  {
    number: "02",
    title: "Competitors Outpace Innovation",
    label: "/Growth",
    value: 65,
  },
  {
    number: "03",
    title: "Automation Potential Remains Untapped",
    label: "/Opportunities",
    value: 70,
  },
] as const;

export function ProjectsIndex() {
  return (
    <main>
      <AgenioHeader />

      <section className={styles.intro}>
        <CornerMarkers />
        <PixelSteps />
        <PixelSteps flip />
        <div>
          <SectionLabel>Our Work In Action</SectionLabel>
          <h1>Featured Work</h1>
          <p>
            We transform workflows into intelligent AI solutions through
            automation technology.
            <br />
            Each project combines AI systems &amp; strategy to deliver business
            impact.
          </p>
        </div>
      </section>

      <section className={styles.works} aria-labelledby="recent-works">
        <CornerMarkers />
        <div className={styles.sectionHeading}>
          <SectionLabel>Projects</SectionLabel>
          <h2 id="recent-works">
            Recent
            <br />
            Works
          </h2>
        </div>
        <div className={styles.projectList}>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} priority={index === 0} project={project} />
          ))}
        </div>
      </section>

      <section className={styles.delays} aria-labelledby="delay-heading">
        <CornerMarkers />
        <div className={styles.sectionHeading}>
          <SectionLabel>Business Impact</SectionLabel>
          <h2 id="delay-heading">
            Why Delay
            <br />
            Hurts
          </h2>
        </div>
        <div className={styles.delayList}>
          {delays.map((delay) => (
            <article key={delay.number}>
              <div className={styles.delayTitle}>
                <span>/ {delay.number}</span>
                <h3>{delay.title}</h3>
              </div>
              <div className={styles.progress}>
                <div className={styles.track}>
                  <span style={{ width: `${delay.value}%` }}>
                    <i />
                  </span>
                </div>
                <div>
                  <p>{delay.label}</p>
                  <b>{delay.value}%</b>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Our approach" className={styles.marquee}>
        <div>
          {[0, 1, 2, 3].map((item) => (
            <span key={`innovative-${item}`}>Innovative <i>✦</i></span>
          ))}
        </div>
        <div>
          {[0, 1, 2, 3].map((item) => (
            <span key={`visionary-${item}`}>Visionary <i>✦</i></span>
          ))}
        </div>
      </section>

      <section className={styles.pricing} id="pricing-plan" aria-labelledby="pricing-heading">
        <CornerMarkers />
        <div className={styles.sectionHeading}>
          <SectionLabel>Pricing Plan</SectionLabel>
          <h2 id="pricing-heading">
            Choose Your
            <br />
            Perfect Plan
          </h2>
        </div>
        <div className={styles.planGrid}>
          {pricingPlans.map((plan, index) => (
            <article className={index === 1 ? styles.featuredPlan : undefined} key={plan.name}>
              <div className={styles.planTop}>
                <p>{plan.availability}</p>
                <h3>{plan.name}</h3>
                <span>{plan.audience}</span>
              </div>
              <div className={styles.price}>
                <strong>{plan.price}</strong>
                <span>/ project</span>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <DarkButton href="/agenio#contact">Get Started</DarkButton>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-heading">
        <CornerMarkers />
        <div className={styles.sectionHeading}>
          <SectionLabel>Frequently Asked</SectionLabel>
          <h2 id="faq-heading">Questions? Answers!</h2>
        </div>
        <div className={styles.faqList}>
          {projectFaqs.map((faq, index) => (
            <details key={faq.question} open={index === 1}>
              <summary>
                <span>{faq.question}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <p className={styles.moreQuestions}>
          Still have questions?{" "}
          <Link href="/agenio#contact">Start a conversation</Link>
        </p>
      </section>

      <ContactFooter />
    </main>
  );
}
