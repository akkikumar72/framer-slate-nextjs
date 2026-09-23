import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "../../../../components/project-card";
import { Reveal } from "../../../../components/reveal";
import { asset } from "../../../../lib/assets";
import { getProject, projects, type Project } from "../../../../lib/projects";
import styles from "./project.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return { title: "Project not found" };
  const url = `/roco/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: { title: project.title, description: project.description, url, type: "website", images: [asset(project.ogImage)] },
    twitter: { card: "summary_large_image", title: project.title, description: project.description, images: [asset(project.ogImage)] },
  };
}

function Arrow({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 256 256" aria-hidden="true" className={styles.arrow}><path d={back ? "M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" : "M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"} /></svg>;
}

function Actions({ project }: { project: Project }) {
  return (
    <div className={styles.actions}>
      <div className={styles.backRow}>
        <Link href="/roco/projects" className={styles.back}><Arrow back />Back to Projects</Link>
        <span className={styles.rule} aria-hidden="true" />
      </div>
      <div className={styles.actionLinks}>
        {project.actions.map((action, index) => (
          <a className={`${styles.button} ${index === 0 ? styles.primary : ""}`} key={action.url} href={action.url} target={action.url.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer">
            {action.label}{index !== 0 && <Arrow />}
          </a>
        ))}
      </div>
    </div>
  );
}

const infoIcons = [
  "M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z",
  "M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z",
  "M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z",
];

export default async function ProjectPage({ params }: PageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const related = project.relatedSlugs.map(getProject).filter((item): item is Project => Boolean(item));

  return (
    <div className={styles.page}>
      <section className={styles.project} aria-labelledby="project-title">
        <Reveal><Actions project={project} /></Reveal>
        <Reveal><h1 id="project-title" className={styles.title}>{project.title}</h1></Reveal>
        <div className={styles.info}>
          {[project.client, project.duration, project.category].map((text, index) => (
            <div className={styles.infoGroup} key={index}>
              {index > 0 && <span className={styles.rule} aria-hidden="true" />}
              <span className={styles.infoValue}><svg viewBox="0 0 256 256" aria-hidden="true"><path d={infoIcons[index]} /></svg>{text}</span>
            </div>
          ))}
        </div>
        <Reveal className={styles.hero}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(project.image)} alt={project.imageAlt} width={1200} height={1200} fetchPriority="high" />
        </Reveal>
        {/* The static source article is restricted to semantic rich-text tags and links. */}
        <Reveal><article className={styles.article} dangerouslySetInnerHTML={{ __html: project.articleHtml }} /></Reveal>
        <Reveal className={styles.bottomActions}><Actions project={project} /></Reveal>
      </section>
      <section className={styles.related} aria-labelledby="other-projects">
        <Reveal><h2 id="other-projects">Other Projects</h2></Reveal>
        <div className={styles.relatedGrid}>
          {related.map((item) => <Reveal key={item.slug}><ProjectCard project={item} /></Reveal>)}
        </div>
        <Reveal><div className={styles.viewAll}><span className={styles.rule} aria-hidden="true" /><Link className={styles.button} href="/roco/projects">View All Projects<Arrow /></Link></div></Reveal>
      </section>
    </div>
  );
}
