"use client";

import { useState } from "react";
import {
  DotsDivider,
  GridSection,
  SectionLabel,
} from "@/components/jayden/shared/JaydenSections";
import { jaydenAssets } from "@/components/jayden/shared/assets";
import type { JaydenProjectStory } from "./data";
import { ProjectCards } from "./ProjectCards";
import styles from "./ProjectDetail.module.css";

const testimonials = [
  {
    author: "Sheik Asif",
    company: "Ceo of Avade Inc",
    image: jaydenAssets.testimonialOne,
    quote:
      "Jayden is a designer with passionate, professional and full creativity. Much more than I’m expect. Great services, high quality products & affordable.",
  },
  {
    author: "Musk",
    company: "Ceo of Prost",
    image: jaydenAssets.testimonialTwo,
    quote:
      "Jayden brought my vision to life with amazing creativity. So much better than expected. Fast service, great results, and fair pricing.",
  },
  {
    author: "Alex Vamos",
    company: "Ceo of Para Groups",
    image: jaydenAssets.testimonialThree,
    quote:
      "Very creative and super professional! Jayden nailed the design, better than I imagined. Excellent service and worth every penny.",
  },
];

export function ProjectDetail({
  nextProjects,
  project,
}: {
  nextProjects: JaydenProjectStory[];
  project: JaydenProjectStory;
}) {
  const [testimonial, setTestimonial] = useState(0);
  const activeTestimonial = testimonials[testimonial];

  function moveTestimonial(direction: -1 | 1) {
    setTestimonial(
      (current) => (current + direction + testimonials.length) % testimonials.length,
    );
  }

  return (
    <div className={styles.page}>
      <GridSection className={styles.hero}>
        <div className={styles.heroTop}>
          <SectionLabel>Project Details</SectionLabel>
          <aside className={styles.heroAside}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden="true" src={jaydenAssets.workBackdrop} />
            <p>Every pixel tells a story, every line of code gives it life.</p>
          </aside>
        </div>
        <div className={styles.heroTitle}>
          <span>{project.category}</span>
          <h1>{project.title}</h1>
          <dl className={styles.facts}>
            <div>
              <dt>Date:</dt>
              <dd>{project.date}</dd>
            </div>
            <div>
              <dt>Client :</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Project Duration :</dt>
              <dd>{project.duration}</dd>
            </div>
          </dl>
        </div>
        <DotsDivider />
      </GridSection>

      <GridSection className={styles.projectBody}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={`${project.title} project presentation`}
          className={styles.primaryImage}
          src={project.cardImage}
        />

        <article className={styles.story}>
          <h2>Design Vision</h2>
          <p>{project.vision[0]}</p>
          <p>{project.vision[1]}</p>
        </article>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={`${project.title} design process detail`}
          className={styles.storyImage}
          src={project.detailImages[1]}
        />

        <article className={styles.story}>
          <h2>Design Process</h2>
          <p>{project.process}</p>
          <strong>Process included:</strong>
          <ul>
            {project.processItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={`${project.title} final design detail`}
          className={styles.storyImage}
          src={project.detailImages[0]}
        />

        <article className={styles.story}>
          <h2>Design Outcome</h2>
          <p>{project.outcome}</p>
          <strong>Outcome highlights:</strong>
          <ul>
            {project.outcomeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <DotsDivider />
      </GridSection>

      <GridSection className={styles.testimonial}>
        <section
          aria-label={`Testimonial from ${activeTestimonial.author}`}
          aria-live="polite"
          className={styles.testimonialCard}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            aria-hidden="true"
            className={styles.testimonialImage}
            src={activeTestimonial.image}
          />
          <div className={styles.testimonialContent}>
            <span className={styles.testimonialLabel}>Testimonial</span>
            <blockquote className={styles.quote}>
              “ {activeTestimonial.quote} ”
            </blockquote>
            <div className={styles.person}>
              <strong>{activeTestimonial.author}</strong>
              <span>{activeTestimonial.company}</span>
            </div>
            <div className={styles.testimonialControls}>
              <button
                aria-label="Previous"
                onClick={() => moveTestimonial(-1)}
                type="button"
              >
                ←
              </button>
              <button
                aria-label="Next"
                onClick={() => moveTestimonial(1)}
                type="button"
              >
                →
              </button>
            </div>
          </div>
        </section>
        <DotsDivider />
      </GridSection>

      <GridSection className={styles.nextProjects}>
        <div className={styles.nextHeading}>
          <h2>Next projects</h2>
        </div>
        <ProjectCards projects={nextProjects} />
        <DotsDivider />
      </GridSection>
    </div>
  );
}
