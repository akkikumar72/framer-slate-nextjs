import Image from "next/image";
import {
  AgenioHeader,
  ContactFooter,
  CornerMarkers,
  PixelSteps,
  SectionLabel,
} from "@/components/agenio/shared/AgenioShell";
import { ProjectCard } from "./ProjectCard";
import { TestimonialCarousel } from "./TestimonialCarousel";
import type { AgenioProject, ProjectNarrative } from "./data";
import { projectsBySlug } from "./data";
import styles from "./ProjectDetail.module.css";

const projectDescription =
  "We optimized conversation workflows, improved AI response accuracy, and introduced intelligent automation features to enhance user interactions.";

function MediaFrame({
  alt,
  className = "",
  priority = false,
  src,
}: {
  alt: string;
  className?: string;
  priority?: boolean;
  src: string;
}) {
  return (
    <div className={`${styles.mediaFrame} ${className}`}>
      <Image
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 760px) 50vw, 1168px"
        src={src}
      />
    </div>
  );
}

function Narrative({ narrative }: { narrative: ProjectNarrative }) {
  return (
    <section className={styles.narrative}>
      <SectionLabel>{narrative.label}</SectionLabel>
      <div>
        <h2>{narrative.heading}</h2>
        <p>{narrative.body}</p>
      </div>
    </section>
  );
}

export function ProjectDetail({ project }: { project: AgenioProject }) {
  const nextProject = projectsBySlug[project.nextSlug];

  return (
    <main>
      <AgenioHeader />

      <header className={styles.detailIntro}>
        <CornerMarkers />
        <PixelSteps />
        <PixelSteps flip />
        <div>
          <SectionLabel>Projects</SectionLabel>
          <h1>
            <span>{project.titleLines[0]}</span>
            <span>{project.titleLines[1]}</span>
          </h1>
          <p>{projectDescription}</p>
        </div>
      </header>

      <article className={styles.caseStudy}>
        <MediaFrame
          alt={`${project.title} case study hero`}
          className={styles.heroMedia}
          priority
          src={project.hero}
        />

        <section className={`${styles.narrative} ${styles.leadNarrative}`}>
          <SectionLabel>{project.breakdown}</SectionLabel>
          <div>
            <p className={styles.introduction}>{project.introduction}</p>
            <h2>{project.leadHeading}</h2>
            <p>{project.leadBody}</p>
          </div>
        </section>

        <div className={styles.mediaPair}>
          <MediaFrame alt={`${project.title} project detail one`} src={project.gallery[0]} />
          <MediaFrame alt={`${project.title} project detail two`} src={project.gallery[1]} />
        </div>

        <MediaFrame
          alt={`${project.title} project detail three`}
          className={`${styles.wideMedia} ${styles.supplemental}`}
          src={project.gallery[2]}
        />

        <Narrative narrative={project.narratives[0]} />

        <MediaFrame
          alt={`${project.title} project detail four`}
          className={`${styles.wideMedia} ${styles.supplemental}`}
          src={project.gallery[3]}
        />

        <Narrative narrative={project.narratives[1]} />

        <MediaFrame
          alt={`${project.title} project detail five`}
          className={`${styles.wideMedia} ${styles.supplemental}`}
          src={project.gallery[4]}
        />

        <Narrative narrative={project.narratives[2]} />

        <div className={`${styles.mediaPair} ${styles.supplemental}`}>
          <MediaFrame alt={`${project.title} project detail six`} src={project.gallery[5]} />
          <MediaFrame alt={`${project.title} project detail seven`} src={project.gallery[6]} />
        </div>
      </article>

      <div className={styles.testimonialHeading}>
        <SectionLabel>Client Feedback</SectionLabel>
      </div>
      <TestimonialCarousel />

      <section className={styles.nextWorks} aria-labelledby="next-work-heading">
        <CornerMarkers />
        <div className={styles.nextHeading}>
          <SectionLabel>Keep Exploring</SectionLabel>
          <h2 id="next-work-heading">Next Works</h2>
        </div>
        <ProjectCard project={nextProject} />
      </section>

      <ContactFooter />
    </main>
  );
}
