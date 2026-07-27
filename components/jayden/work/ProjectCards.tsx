import Link from "next/link";
import type { JaydenProject } from "@/components/jayden/shared/assets";
import styles from "./ProjectCards.module.css";

export function ProjectCards({ projects }: { projects: JaydenProject[] }) {
  return (
    <div className={styles.list}>
      {projects.map((project) => (
        <Link
          aria-label={`View ${project.title}`}
          className={styles.card}
          href={`/jayden/work/${project.slug}`}
          key={project.slug}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={`${project.title} project preview`}
            className={styles.image}
            src={project.cardImage}
          />
          <div className={styles.overlay}>
            <div>
              <span className={styles.category}>{project.category}</span>
              <h2 className={styles.title}>{project.title}</h2>
              <time className={styles.date}>{project.date}</time>
            </div>
            <span aria-hidden="true" className={styles.arrow}>
              ↗
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
