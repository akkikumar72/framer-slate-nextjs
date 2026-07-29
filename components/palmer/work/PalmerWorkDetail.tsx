import type { PalmerProject } from "../data";
import { projects } from "../data";
import {
  PalmerProjectCard,
  projectTitle,
} from "./PalmerWorkIndex";
import styles from "./PalmerWork.module.css";

const fullLocations: Record<string, string> = {
  "arc-bloom": "Amsterdam, Netherlands",
  "atelier-nara": "Seoul, South Korea",
  "halo-wear": "Berlin, Germany",
  "lucent-lab": "Tokyo, Japan",
  "sonder-goods": "Los Angeles, USA",
};

function formatProjectDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00Z`));
}

function ProjectTitleMarquee({
  children,
  heading = false,
  id,
}: {
  children: string;
  heading?: boolean;
  id?: string;
}) {
  return (
    <div className={styles.marquee} aria-label={children}>
      <div className={styles.marqueeTrack}>
        {heading ? <h1>{children}</h1> : <h2 id={id}>{children}</h2>}
        <span aria-hidden="true">{children}</span>
      </div>
    </div>
  );
}

export function PalmerWorkDetail({ project }: { project: PalmerProject }) {
  const index = projects.findIndex(
    (candidate) => candidate.slug === project.slug,
  );
  const relatedProjects = [
    projects[(index + 1) % projects.length],
    projects[(index + 2) % projects.length],
  ];
  const title = `${projectTitle(project)} /`;

  return (
    <article className={styles.workDetail}>
      <header className={styles.detailHero}>
        <ProjectTitleMarquee heading>{title}</ProjectTitleMarquee>
      </header>

      <section
        aria-label={`${projectTitle(project)} project information`}
        className={styles.caseStudy}
      >
        <aside className={styles.projectFacts}>
          <div className={styles.projectFactsInner}>
            <time dateTime={project.date}>{formatProjectDate(project.date)}</time>
            <p className={styles.projectSummary}>{project.summary}</p>
            <dl>
              <div>
                <dt>Category:</dt>
                <dd>{project.service}</dd>
              </div>
              <div>
                <dt>Client:</dt>
                <dd>{project.client}</dd>
              </div>
              <div>
                <dt>Duration:</dt>
                <dd>{project.duration}</dd>
              </div>
              <div>
                <dt>Location:</dt>
                <dd>{fullLocations[project.slug] ?? project.location}</dd>
              </div>
            </dl>
            <a
              className={styles.liveLink}
              href="https://framer.link/19KZOSh"
              rel="noreferrer"
              target="_blank"
            >
              Live Website
            </a>
          </div>
        </aside>

        <div className={styles.mediaColumn}>
          {project.images.slice(0, 4).map((src, imageIndex) => (
            <figure className={styles.caseMedia} key={src}>
              <img
                alt={`${projectTitle(project)} case study image ${imageIndex + 1}`}
                src={src}
              />
            </figure>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="palmer-more-work-heading"
        className={styles.moreWork}
      >
        <div className={styles.moreWorkEyebrow}>
          <span>© Selected Works こんにちは</span>
          <span>(WDX® — 02)</span>
          <span>Digital Designer</span>
        </div>
        <ProjectTitleMarquee id="palmer-more-work-heading">
          More Works©
        </ProjectTitleMarquee>
        <div className={styles.moreWorkGrid}>
          {relatedProjects.map((relatedProject) => {
            const relatedIndex = projects.findIndex(
              (candidate) => candidate.slug === relatedProject.slug,
            );
            return (
              <PalmerProjectCard
                index={relatedIndex}
                key={relatedProject.slug}
                project={relatedProject}
              />
            );
          })}
        </div>
      </section>
    </article>
  );
}
