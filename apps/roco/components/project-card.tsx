import Link from "next/link";
import { asset } from "../lib/assets";
import type { Project } from "../lib/projects";
import styles from "./project-card.module.css";

export function ProjectCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <Link className={styles.card} href={`/roco/projects/${project.slug}`}>
      <div className={styles.photo}>
        {/* These collection thumbnails intentionally retain the reference's square crop. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(project.image)}
          alt={project.imageAlt}
          width={800}
          height={800}
          loading={eager ? "eager" : "lazy"}
        />
      </div>
      <div className={styles.caption}>
        <p className={styles.category}>{project.category}</p>
        <h3 className={styles.title}>{project.title}</h3>
        <span className={styles.arrows} aria-hidden="true">
          <span>{Array.from({ length: 6 }, (_, i) => (
            <svg key={i} viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" /></svg>
          ))}</span>
        </span>
      </div>
    </Link>
  );
}
