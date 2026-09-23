import type { Metadata } from "next";
import { ProjectCard } from "../../../components/project-card";
import { Reveal } from "../../../components/reveal";
import { projects } from "../../../lib/projects";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Roco Portfolio Template",
  description: "Roco is a free Next.js portfolio template for web designers and creative freelancers. Warm, personal design with projects, stack, about, and contact pages included.",
  alternates: { canonical: "/roco/projects" },
};

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <Reveal><h1 className={styles.title}>My Remarkable Projects</h1></Reveal>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} eager={index < 2} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
