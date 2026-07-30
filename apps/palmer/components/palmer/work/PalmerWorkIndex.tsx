import Link from "next/link";
import { projects, type PalmerProject } from "../data";
import styles from "./PalmerWork.module.css";

export function projectTitle(project: PalmerProject) {
  return project.slug === "arc-bloom" ? "Arc & Bloom" : project.title;
}

export function PalmerProjectCard({
  index,
  project,
}: {
  index: number;
  project: PalmerProject;
}) {
  const title = projectTitle(project);

  return (
    <Link
      aria-label={`View ${title} project`}
      className={styles.projectCard}
      data-palmer-project
      href={`/work/${project.slug}`}
    >
      <span className={styles.projectMedia}>
        <img
          alt=""
          aria-hidden="true"
          className={styles.projectBackdrop}
          src={project.images[1]}
        />
        <img
          alt={`${title} project`}
          className={styles.projectInset}
          src={project.images[0]}
        />
        <span className={styles.serviceRibbon}>{project.service}</span>
      </span>
      <span className={styles.projectCaption}>
        <strong>{title}</strong>
        <span>({String(index + 1).padStart(2, "0")})</span>
      </span>
    </Link>
  );
}

export function PalmerWorkIndex() {
  return (
    <section className={styles.workIndex} aria-labelledby="palmer-work-heading">
      <header className={styles.workLead}>
        <div className={styles.workLeadSticky}>
          <h1 id="palmer-work-heading">
            <span>All</span>
            <span>Works</span>
          </h1>
          <sup>({projects.length})</sup>
        </div>
      </header>
      <div className={styles.projectList}>
        {projects.map((project, index) => (
          <PalmerProjectCard
            index={index}
            key={project.slug}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
