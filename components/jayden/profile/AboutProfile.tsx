"use client";

import { useState } from "react";
import { DotsDivider, FaqSection, GridSection, SectionLabel } from "../shared/JaydenSections";
import { jaydenAsset, jaydenAssets } from "../shared/assets";
import { RouteIntro } from "./RouteIntro";
import styles from "./AboutProfile.module.css";

const gallery = [
  jaydenAssets.galleryOne,
  jaydenAssets.galleryTwo,
  jaydenAssets.galleryThree,
  jaydenAssets.galleryFour,
] as const;

const tools = [
  {
    name: "Slack",
    description: "Smart messaging for modern teams",
    image: jaydenAsset("JITnMcenhdHgA9CIPwRC6OH30kM.png"),
  },
  {
    name: "Figma",
    description: "Leading collaborative design tool",
    image: jaydenAsset("zx6JcQGWSu4DuSKV2tWw1jIrCig.svg"),
  },
  {
    name: "Framer",
    description: "Design and ship interactive sites",
    image: jaydenAsset("KF3rSlA4PtauCl8PmciyB0vB8.png"),
  },
  {
    name: "Loom",
    description: "Instantly share video messages",
    image: jaydenAsset("DYEKrJePMB6MsrJa3Epm97h9t2Q.svg"),
  },
] as const;

const clientLogos = [
  "C1wb1Ui8RiX60t4svv5HuRgF8.svg",
  "OW572VyQBNs1o0UMixSIiglgreg.svg",
  "U1fbpyKpOhZ5WFirEojZJ76SKNU.svg",
  "fZkg5aYquWxiqNwiQfQTMfkmpXw.svg",
  "mjgMyMv03loxxn9WUeLRe5iXo.svg",
] as const;

const reasons = [
  {
    number: "01",
    title: "Creative & Impactful Designs",
    copy: "I craft modern and visually appealing websites that leave a lasting impression and engage users effectively.",
  },
  {
    number: "02",
    title: "Responsive & User-Friendly",
    copy: "I build websites that adapt seamlessly to all devices, ensuring smooth navigation and a great user experience.",
  },
  {
    number: "03",
    title: "Clean Code & Reliable Performance",
    copy: "I write structured, optimized, and scalable code that keeps websites fast, secure, and future-ready.",
  },
  {
    number: "04",
    title: "Client-Focused Collaboration",
    copy: "I believe in clear communication, timely delivery, and tailoring every project to meet your unique goals.",
  },
] as const;

const skills = [
  "Product Design",
  "Brand Identity Design",
  "UX Design",
  "Branding",
  "Packaging Design",
  "Figma",
] as const;

export function AboutProfile() {
  const [toolStart, setToolStart] = useState(0);
  const visibleTools = [tools[toolStart], tools[(toolStart + 1) % tools.length]];

  function showPrevious() {
    setToolStart((current) => (current - 1 + tools.length) % tools.length);
  }

  function showNext() {
    setToolStart((current) => (current + 1) % tools.length);
  }

  return (
    <>
      <RouteIntro eyebrow="About" title={["DIGITAL", "CREATOR"]} />

      <GridSection className={styles.biographySection}>
        <div className={styles.biography}>
          <div className={styles.biographyCopy}>
            <h1>Meet Jayden</h1>
            <p>
              I&apos;m Jayden Jones, a designer who turns ideas into visual stories with purpose.
              For me, design isn&apos;t just aesthetics &mdash; it&apos;s about crafting experiences
              that resonate. I fuse bold creativity with thoughtful strategy to spark emotion and
              connection. Every project I create is driven by passion, clarity, and lasting impact.
            </p>
            <div className={styles.skills} aria-label="Design skills">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.portrait}
            src={jaydenAssets.heroPortrait}
            alt="Jayden Jones, designer"
          />
        </div>

        <div className={styles.gallery}>
          <span>@Jayden.design</span>
          <div>
            {gallery.map((image, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={`Selected design work ${index + 1}`} key={image} src={image} />
            ))}
          </div>
        </div>
        <DotsDivider />
      </GridSection>

      <GridSection className={styles.stackSection}>
        <div className={styles.sectionTitle}>
          <h2>Tech Stack</h2>
          <div className={styles.stackControls}>
            <button aria-label="Previous" onClick={showPrevious} type="button">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" aria-hidden="true" src={jaydenAsset("6tTbkXggWgQCAJ4DO2QEdXXmgM.svg")} />
            </button>
            <button aria-label="Next" onClick={showNext} type="button">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" aria-hidden="true" src={jaydenAsset("11KSGbIZoRSg4pjdnUoif6MKHI.svg")} />
            </button>
          </div>
        </div>

        <div className={styles.toolGrid} aria-live="polite">
          {visibleTools.map((tool, index) => (
            <article key={`${tool.name}-${index}`}>
              <h3>{tool.name}</h3>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={`${tool.name} logo`} src={tool.image} />
              </div>
              <p>{tool.description}</p>
            </article>
          ))}
        </div>
        <DotsDivider />
      </GridSection>

      <GridSection className={styles.clientsSection}>
        <SectionLabel>Work with 60+ brands worldwide</SectionLabel>
        <div className={styles.clientLogos}>
          {clientLogos.map((logo, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={`Client logo ${index + 1}`} key={logo} src={jaydenAsset(logo)} />
          ))}
        </div>
        <DotsDivider />
      </GridSection>

      <GridSection className={styles.reasonsSection}>
        <h2>Why Choose Me?</h2>
        <div className={styles.reasonGrid}>
          {reasons.map((reason) => (
            <article key={reason.number}>
              <span>{reason.number}</span>
              <h3>{reason.title}</h3>
              <p>{reason.copy}</p>
            </article>
          ))}
        </div>
        <DotsDivider />
      </GridSection>

      <FaqSection />
    </>
  );
}
