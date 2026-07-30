"use client";

import {
  Fragment,
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FuelArrowLink,
  FuelFooter,
  FuelHeader,
  FuelPlus,
  FuelSectionLabel,
  fuelPageClassName,
} from "@/components/fuel/FuelShell";

import styles from "./WorkPortfolio.module.css";
import {
  getRelatedProjects,
  type PortfolioProject,
  portfolioProjects,
} from "./data";

const faqs = [
  {
    question: "What distinguishes us from other agencies?",
    answer:
      "Fuel combines fast, structured delivery with a highly art-directed visual system. Every engagement is handled as a cohesive brand experience, not a collection of disconnected design requests.",
  },
  {
    question: "Why not hire an in-house designer or freelancer?",
    answer:
      "You get a flexible senior creative team without the long hiring process, fixed overhead, or limited specialty range of a single role.",
  },
  {
    question: "Are creative requests truly unlimited?",
    answer:
      "Yes. You can maintain an active request queue and we work through it in priority order with clear, predictable communication.",
  },
  {
    question: "How fast will I receive my work?",
    answer:
      "Most requests receive a first pass in two to three business days. Larger brand systems and production work are scoped transparently.",
  },
  {
    question: "What if I have a single project?",
    answer:
      "Single-project engagements are welcome. We will recommend a focused scope and timeline based on what will create the strongest result.",
  },
] as const;

function StatementLead() {
  return (
    <>
      {Array.from({ length: 35 }, (_, index) => (
        <Fragment key={index}>
          <span
            aria-hidden="true"
            className={styles.statementSpacer}
          />
          {" "}
        </Fragment>
      ))}
    </>
  );
}

function useFuelReveals() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) {
      return;
    }

    const elements = Array.from(
      page.querySelectorAll<HTMLElement>("[data-fuel-reveal]"),
    );

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => {
        element.dataset.fuelVisible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.fuelVisible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.04 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return pageRef;
}

function PortfolioHero() {
  return (
    <section className={styles.hero}>
      <img
        alt="Women Garden"
        className={styles.indexHeroImage}
        src="/fuel/routes/800e2da18bf323c2.avif"
      />
      <span aria-hidden="true" className={styles.heroShade} />
      <FuelHeader />
      <div className={styles.indexHeroBottom} data-fuel-reveal>
        <div className={styles.indexHeroTitle}>
          <h1>
            <span>Latest</span>
            <span>Portfolio</span>
          </h1>
          <span className={styles.indexCount}>(07)</span>
        </div>
        <p className={styles.indexDescription}>
          A curated collection of structured visuals and modern digital systems
        </p>
        <span className={styles.heroYear}>© 2025</span>
      </div>
    </section>
  );
}

function ProjectHero({ project }: { project: PortfolioProject }) {
  return (
    <section className={styles.hero}>
      <img
        alt={project.heroAlt}
        className={styles.detailHeroImage}
        src={project.heroImage}
      />
      <span aria-hidden="true" className={styles.detailHeroShade} />
      <FuelHeader />
      <div className={styles.detailTitleFrame}>
        <h1 data-fuel-reveal>{project.title}</h1>
      </div>
      <FuelPlus className={`${styles.heroCross} ${styles.crossTopLeft}`} />
      <FuelPlus className={`${styles.heroCross} ${styles.crossBottomLeft}`} />
      <FuelPlus className={`${styles.heroCross} ${styles.crossTopRight}`} />
      <FuelPlus className={`${styles.heroCross} ${styles.crossBottomRight}`} />
      <div className={styles.detailHeroMeta}>
        <span className={styles.heroCategory}>{project.category}</span>
        <p>{project.description}</p>
        <span className={styles.detailHeroYear}>{project.year}</span>
      </div>
    </section>
  );
}

function PortfolioCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  return (
    <a
      className={styles.projectCard}
      data-fuel-reveal
      href={`/work/portfolio/${project.slug}`}
      style={{ "--delay": `${index * 70}ms` } as CSSProperties}
    >
      <div className={styles.projectMedia}>
        <img
          alt=""
          aria-hidden="true"
          className={styles.projectBackdrop}
          src={project.heroImage}
        />
        <img
          alt={project.heroAlt}
          className={styles.projectImage}
          src={project.heroImage}
        />
      </div>
      <div className={styles.projectMeta}>
        <span>({project.number})</span>
        <span>
          <strong>{project.title}</strong>
          <em>{project.category}</em>
        </span>
        <span>{project.year}</span>
      </div>
    </a>
  );
}

function ProjectGrid({
  projects,
  related = false,
}: {
  projects: readonly PortfolioProject[];
  related?: boolean;
}) {
  return (
    <div
      className={`${styles.projectGrid} ${
        related ? styles.relatedGrid : ""
      }`}
    >
      {projects.map((project, index) => (
        <PortfolioCard index={index} key={project.slug} project={project} />
      ))}
    </div>
  );
}

function FaqSection({ number }: { number: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className={styles.faqSection}>
      <FuelSectionLabel
        number={number}
        title="Frequently Asked Questions"
      />
      <div className={styles.faqGrid}>
        <a
          aria-label="Play Fuel showreel on YouTube"
          className={styles.showreel}
          href="https://www.youtube.com/"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="Curly woman in the Fuel showreel"
            src="/fuel/75480d4610cb4757.avif"
          />
          <span>
            <strong>▶ Play</strong>
            <em>Showreel</em>
          </span>
        </a>
        <div className={styles.faqList}>
          {faqs.map((item, index) => {
            const open = index === openFaq;

            return (
              <div
                className={`${styles.faqItem} ${
                  open ? styles.faqItemOpen : ""
                }`}
                key={item.question}
              >
                <button
                  aria-expanded={open}
                  onClick={() =>
                    setOpenFaq((current) =>
                      current === index ? null : index,
                    )
                  }
                  type="button"
                >
                  <span>{item.question}</span>
                  <FuelPlus className={styles.faqPlus} />
                </button>
                <div className={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectNarrative({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <div className={styles.narrative} data-fuel-reveal>
      <div className={styles.narrativeRow}>
        <span>(Research)</span>
        <p>{project.research}</p>
      </div>
      <div className={styles.narrativeRow}>
        <span>(Experiment)</span>
        <p>{project.experiment}</p>
      </div>
      <div className={`${styles.narrativeRow} ${styles.resultsRow}`}>
        <span>(Results)</span>
        <div className={styles.resultsContent}>
          <div className={styles.resultsStats}>
            <div>
              <span>Traffic</span>
              <strong>225k</strong>
            </div>
            <div>
              <span>Success rate</span>
              <strong>100%</strong>
            </div>
          </div>
          <FuelArrowLink href="/contact">
            Live Preview
          </FuelArrowLink>
        </div>
      </div>
    </div>
  );
}

function ProjectContent({ project }: { project: PortfolioProject }) {
  return (
    <section className={styles.projectContent}>
      <FuelSectionLabel number="01" title="Read More" />
      <h2 data-fuel-reveal>
        <StatementLead />
        {project.statement}
      </h2>
      <div className={styles.projectStory}>
        <ProjectNarrative project={project} />
        <div className={styles.storyMedia}>
          {project.storyImages.map((image, index) => (
            <div
              className={styles.storyFrame}
              data-fuel-reveal
              key={`${image.src}-${index}`}
              style={{ "--delay": `${index * 50}ms` } as CSSProperties}
            >
              <img alt={image.alt} src={image.src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioIndexPage() {
  const pageRef = useFuelReveals();

  return (
    <main
      className={`${fuelPageClassName} ${styles.workPage}`}
      ref={pageRef}
    >
      <PortfolioHero />
      <section className={styles.workSection}>
        <FuelSectionLabel number="01" title="Portfolio" />
        <ProjectGrid projects={portfolioProjects} />
      </section>
      <FaqSection number="02" />
      <FuelFooter />
    </main>
  );
}

export function PortfolioDetailPage({
  project,
}: {
  project: PortfolioProject;
}) {
  const pageRef = useFuelReveals();
  const relatedProjects = getRelatedProjects(project.slug);

  return (
    <main
      className={`${fuelPageClassName} ${styles.workPage}`}
      ref={pageRef}
    >
      <ProjectHero project={project} />
      <ProjectContent project={project} />
      <section className={styles.relatedSection}>
        <FuelSectionLabel number="02" title="Portfolio" />
        <ProjectGrid projects={relatedProjects} related />
      </section>
      <FaqSection number="03" />
      <FuelFooter />
    </main>
  );
}
