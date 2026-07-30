import Image from "next/image";
import Link from "next/link";
import type { AgenioProject } from "./data";
import styles from "./ProjectCard.module.css";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: AgenioProject;
  priority?: boolean;
}) {
  return (
    <Link
      aria-label={`View ${project.title} case study`}
      className={styles.card}
      href={`/projects/${project.slug}`}
    >
      <div className={styles.image}>
        <Image
          alt={`${project.title} project preview`}
          fill
          priority={priority}
          sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1440px) calc(100vw - 32px), 1408px"
          src={project.hero}
        />
      </div>
      <div className={styles.panel}>
        <div className={styles.copy}>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
        <dl className={styles.metrics}>
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.value}</dt>
              <dd>{metric.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
}
