import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ButtonLink,
  MediaFrame,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui";
import { asset } from "@/lib/assets";
import { getProject, projects } from "@/lib/projects";
import { ProjectImage } from "./project-image";
import styles from "./project.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const title = `${project.title} - Nue - Next.js Portfolio Template`;
  return {
    title: { absolute: title },
    description: project.description,
    alternates: { canonical: `/nue/projects/${project.slug}` },
    openGraph: {
      title,
      description: project.description,
      images: [asset(project.thumbnail)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [asset(project.thumbnail)],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const details = [
    ["Client", project.client],
    ["Year", project.year],
    ["Services", project.services],
    ["Location", project.location],
  ];

  return (
    <>
      <Section className={styles.hero}>
        <Reveal name="project-back" duration={0.6} bounce={0.2}>
          <a
            className={styles.back}
            href="/nue#project"
            aria-label="Back to projects"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M19 12H5m0 0 6-6m-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>
        <div className={styles.introduction}>
          <Reveal name="project-title" delay={0.2} duration={0.4} bounce={0.2}>
            <h1>{project.title}</h1>
          </Reveal>
          <Reveal name="project-intro" delay={0.3}>
            <p>{project.description}</p>
          </Reveal>
        </div>
        {project.showGalleryLink && (
          <Reveal name="project-live" delay={0.5} scale={0.8} y={0}>
            <ButtonLink href="#project-gallery">View gallery</ButtonLink>
          </Reveal>
        )}
        <Reveal name="project-cover" delay={0.5} scale>
          <MediaFrame
            src={asset(project.thumbnail)}
            alt={`${project.title} website overview`}
            className={styles.cover}
            priority
          />
        </Reveal>
      </Section>

      <Section className={styles.details}>
        <Reveal name="project-details-heading">
          <SectionHeading>Project details</SectionHeading>
        </Reveal>
        <div className={styles.detailsContent}>
          <dl className={styles.metadata}>
            {details.map(([label, value], detailIndex) => (
              <div key={label}>
                <dt>
                  <Reveal
                    name={`project-metadata-${label.toLowerCase()}-title`}
                    delay={detailIndex * 0.1}
                  >
                    {label}
                  </Reveal>
                </dt>
                <dd>
                  <Reveal
                    name={`project-metadata-${label.toLowerCase()}-value`}
                    delay={detailIndex * 0.1}
                  >
                    {value}
                  </Reveal>
                </dd>
              </div>
            ))}
          </dl>
          <Reveal name="project-detail-image" scale>
            <ProjectImage
              src={asset(project.images[0].file)}
              alt={`${project.title} website design`}
              width={project.images[0].width}
              height={project.images[0].height}
            />
          </Reveal>
        </div>
      </Section>

      <Section className={styles.overview}>
        <div className={styles.overviewHeading}>
          <Reveal name="project-overview-heading">
            <SectionHeading>Overview</SectionHeading>
          </Reveal>
          <Reveal name="project-overview-copy" delay={0.1}>
            <p className={styles.overviewCopy}>{project.overview}</p>
          </Reveal>
        </div>
        <div id="project-gallery" className={styles.gallery}>
          {project.images.slice(1).map((image, imageIndex) => (
            <Reveal
              name={`project-gallery-${imageIndex + 1}`}
              key={`${image.file}-${imageIndex}`}
              scale
            >
              <ProjectImage
                src={asset(image.file)}
                alt={`${project.title} design detail ${imageIndex + 1}`}
                width={image.width}
                height={image.height}
              />
            </Reveal>
          ))}
        </div>
        <Reveal name="project-pagination">
          <nav className={styles.pagination} aria-label="Project navigation">
            {previous ? (
              <a href={`/nue/projects/${previous.slug}`} rel="prev">
                ‹ {previous.title}
              </a>
            ) : (
              <span />
            )}
            {next && (
              <a href={`/nue/projects/${next.slug}`} rel="next">
                {next.title} ›
              </a>
            )}
          </nav>
        </Reveal>
      </Section>
    </>
  );
}
