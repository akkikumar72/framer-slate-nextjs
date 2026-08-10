import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";

import { SectionEyebrow } from "../shared/DashfluenceShell";
import { dashfluenceHref } from "../shared/routes";
import {
  dashfluenceWorkArticles,
  dashfluenceWorkBlogPreview,
  dashfluenceWorkConclusion,
  dashfluenceWorkFaqs,
  dashfluenceWorkProjects,
  type DashfluenceWorkProject,
} from "./data";
import styles from "./Work.module.css";

function WorkCard({
  project,
  priority = false,
  size = "wide",
}: {
  priority?: boolean;
  project: DashfluenceWorkProject;
  size?: "wide" | "narrow";
}) {
  return (
    <Link
      className={`${styles.workCard} ${size === "narrow" ? styles.workCardNarrow : ""}`}
      data-dash-reveal="short"
      href={dashfluenceHref(`/work/${project.slug}`)}
    >
      <span className={styles.workImage}>
        <Image
          alt={`${project.title} case study`}
          fill
          priority={priority}
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) 47vw, 600px"
          src={project.heroImage}
        />
      </span>
      <span className={styles.workCardBody}>
        <span className={styles.workText}>
          <span className={styles.workTitle}>{project.title}</span>
          <span className={styles.workDescription}>{project.description}</span>
        </span>
        <span className={styles.categoryPill}>{project.category}</span>
      </span>
    </Link>
  );
}

export function WorkIndexPage() {
  const projects = dashfluenceWorkProjects;

  return (
    <div className={styles.page} data-dash-work-page>
      <section className={styles.workIndexHero}>
        <div className={styles.indexContainer}>
          <div className={styles.indexIntro}>
            <h1 data-dash-reveal="rise">Discover our creative works</h1>
            <p data-dash-reveal="rise" style={{ "--dash-delay": "90ms" } as CSSProperties}>
              Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.
            </p>
          </div>

          <div className={styles.masonry}>
            <div className={styles.workRow}>
              <WorkCard priority project={projects[0]} />
              <WorkCard priority project={projects[1]} size="narrow" />
            </div>
            <div className={styles.soloCard}>
              <WorkCard project={projects[2]} />
            </div>
            <div className={styles.workRow}>
              <WorkCard project={projects[3]} />
              <WorkCard project={projects[4]} size="narrow" />
            </div>
            <div className={styles.soloCard}>
              <WorkCard project={projects[5]} />
            </div>
            <div className={styles.workRow}>
              <WorkCard project={projects[6]} size="narrow" />
              <WorkCard project={projects[7]} />
            </div>
          </div>
        </div>
      </section>

      <WorkFaqSection />
      <WorkBlogSection showDescription={false} />
    </div>
  );
}

export function WorkDetailPage({ project }: { project: DashfluenceWorkProject }) {
  const meta = [
    ["Date :", project.date],
    ["Category:", project.category],
    ["Client:", project.client],
    ["Project duration:", project.duration],
  ];

  return (
    <div className={styles.page} data-dash-work-page>
      <article className={styles.detail}>
        <div className={styles.detailTop}>
          <h1 data-dash-reveal="left">{project.title}</h1>
          <dl className={styles.metadata}>
            {meta.map(([label, value], index) => (
              <div
                data-dash-reveal="short"
                key={label}
                style={{ "--dash-delay": `${index * 55}ms` } as CSSProperties}
              >
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.detailHeroImage} data-dash-reveal="left">
          <Image
            alt={`${project.title} campaign presentation`}
            fill
            priority
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) calc(100vw - 60px), 1360px"
            src={project.heroImage}
          />
        </div>

        <div className={styles.articleBody}>
          {dashfluenceWorkArticles.map((section) => (
            <section data-dash-reveal="rise" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}

          <div className={styles.secondaryImage} data-dash-reveal="short">
            <Image
              alt={`${project.title} creative development process`}
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), 1100px"
              src={project.secondaryImage}
            />
          </div>

          <section data-dash-reveal="rise">
            <h2>{dashfluenceWorkConclusion.title}</h2>
            <p>{dashfluenceWorkConclusion.body}</p>
          </section>

          <Link className={styles.backLink} href={dashfluenceHref("/work")}>
            <span aria-hidden="true">←</span> Back To Work
          </Link>
        </div>
      </article>

      <WorkFaqSection />
      <WorkBlogSection showDescription />
    </div>
  );
}

function WorkFaqSection() {
  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <div className={styles.faqIntro} data-dash-reveal="rise">
          <div>
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2>Got Questions? We’ve Got Answers.</h2>
            <p>Here are some of the most common queries to help you get started.</p>
          </div>
          <Link className={styles.faqArrow} href={dashfluenceHref("/contact-us")} aria-label="Contact Dashfluence">
            ↗
          </Link>
        </div>

        <div className={styles.faqList} data-dash-reveal="short">
          {dashfluenceWorkFaqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                <span><b>{String(index + 1).padStart(2, "0")}</b>{item.question}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkBlogSection({ showDescription }: { showDescription: boolean }) {
  return (
    <section className={styles.blogSection}>
      <div className={styles.blogContainer}>
        <div className={styles.blogHeading}>
          <div data-dash-reveal="rise">
            <SectionEyebrow>Blogs</SectionEyebrow>
            <h2>Smart Marketing Tips, Fresh Weekly</h2>
          </div>
          {showDescription ? (
            <p data-dash-reveal="rise">
              Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.
            </p>
          ) : null}
        </div>

        <div className={styles.blogGrid}>
          {dashfluenceWorkBlogPreview.map((post, index) => (
            <Link
              className={`${styles.blogCard} ${index === 1 ? styles.blogCardNarrow : ""}`}
              data-dash-reveal="short"
              href={dashfluenceHref(`/blog/${post.slug}`)}
              key={post.slug}
            >
              <span className={styles.blogImage}>
                <Image
                  alt={post.title}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) 47vw, 600px"
                  src={post.image}
                />
              </span>
              <span className={styles.blogCopy}>
                <small>{post.date}</small>
                <strong>{post.title}</strong>
                <span>{post.description}</span>
                <b>READ FULL BLOG <i aria-hidden="true">↗</i></b>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
