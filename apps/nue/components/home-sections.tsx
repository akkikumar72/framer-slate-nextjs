"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonLink, Reveal, Section, SectionHeading } from "@/components/ui";
import { asset } from "@/lib/assets";
import styles from "./home-sections.module.css";

const services = [
  {
    title: "Web Design",
    description:
      "I create clean, functional websites that reflect your brand and engage your audience with clarity and purpose.",
  },
  {
    title: "No code Development",
    description:
      "I build functional websites and apps using no-code tools, turning ideas into efficient, live digital experiences.",
  },
  {
    title: "Branding",
    description:
      "I craft distinctive brand identities that capture your vision and communicate your story through cohesive visuals and thoughtful design.",
  },
  {
    title: "UI/UX Design",
    description:
      "I design intuitive, user-centered interfaces that prioritize clarity, consistency, and seamless interaction across every device.",
  },
];

const experience = [
  {
    company: "PixelWave",
    role: "Web Designer",
    years: "2024 - 2025",
    image: "Wd8THz119gmVPFFpX1OVKNSYgVY.jpg",
  },
  {
    company: "BrightStudio",
    role: "UI/UX Designer",
    years: "2022 - 2023",
    image: "ohcPbG9vn7bqdZK0InFEAYyvovQ.jpg",
  },
  {
    company: "CodeCraft",
    role: "Next.js Developer",
    years: "2021 - 2023",
    image: "PtPyrU4cGpOXWMdXbfT4t48laQ4.jpg",
  },
  {
    company: "Solitude",
    role: "Web Designer",
    years: "2020 - 2021",
    image: "wT2o7OLjAK66Iw5f8tmdHireFc.jpg",
  },
];

const stacks = [
  {
    name: "Next.js",
    use: "Web Design",
    image: "nextjs.svg",
  },
  {
    name: "Photoshop",
    use: "Image Editing",
    image: "mf84nvHn0X0NRSx4KOHehlFkiRc.jpg",
  },
  {
    name: "Figma",
    use: "Visual Design",
    image: "En4W1Bc51J0mcc4m5tUsSuCE.jpg",
  },
  {
    name: "Webflow",
    use: "No-code Development",
    image: "OU358CIDKL5V5A4NxxzemxsSsao.jpg",
  },
  { name: "Zoom", use: "Meetings", image: "e9kiXPiQBrigIkb0qCk4kSF4g0.jpg" },
  { name: "Notion", use: "Planning", image: "w4JVExgyoWOxCcqxAJfH5GAcVM.jpg" },
];

function AboutPhotos() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.photos} ${visible ? styles.photosVisible : ""}`}
      data-motion="about-photos"
      data-motion-state={visible ? "visible" : "waiting"}
    >
      <noscript>
        <style>{`
          [data-motion="about-photo-portrait"] { opacity: 1; transform: rotate(-4.16deg); }
          [data-motion="about-photo-workspace"] { opacity: 1; transform: rotate(4.16deg); }
        `}</style>
      </noscript>
      <div
        className={`${styles.photo} ${styles.photoPortrait}`}
        data-motion="about-photo-portrait"
      >
        <img
          src={asset("kYbZa9Y70vK4Fup8zAaBJgMjcpA.jpg")}
          alt="Profile or personal photo"
          width={109}
          height={109}
        />
      </div>
      <div
        className={`${styles.photo} ${styles.photoWorkspace}`}
        data-motion="about-photo-workspace"
      >
        <img
          src={asset("cA5OptdvEX01Sun5Z4ZMXWkg0J8.jpg")}
          alt="Creative workspace or desk setup image"
          width={109}
          height={109}
        />
      </div>
    </div>
  );
}

export function About() {
  return (
    <Section id="about" className={styles.section}>
      <Reveal name="about-heading">
        <SectionHeading>about me</SectionHeading>
      </Reveal>
      <div className={styles.aboutContent}>
        <AboutPhotos />
        <div className={styles.aboutCopy}>
          <Reveal name="about-copy" delay={0.15}>
            <p>
              I’m David Simmons, a passionate digital designer and no-code
              developer who bridges creativity with technology. Currently
              exploring new ways to craft meaningful digital experiences, I’m
              driven by curiosity and a love for clean, purposeful design.
            </p>
            <p>
              I thrive on transforming ideas into reality — whether it’s shaping
              intuitive interfaces, crafting distinctive brand identities,
              designing immersive visuals, or building websites that feel
              effortless to use.
            </p>
          </Reveal>
        </div>
        <Reveal
          name="about-contact"
          scale={0.8}
          y={0}
          delay={0.2}
          duration={0.7}
        >
          <ButtonLink href="#contact">Get in Touch</ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}

export function Services() {
  return (
    <Section id="services" className={`${styles.section} ${styles.services}`}>
      <Reveal name="services-heading" className={styles.serviceHeading}>
        <SectionHeading>services</SectionHeading>
      </Reveal>
      <div className={styles.serviceContent}>
        <div className={styles.serviceCards}>
          {services.map((service, index) => (
            <div key={service.title} className={styles.serviceRow}>
              <article className={styles.serviceCard}>
                <img
                  className={styles.pin}
                  src={asset("pQSIhyVSrKe5ubgcAAi5huBUI.png")}
                  alt=""
                  width={56}
                  height={48}
                />
                <Reveal
                  name={`service-${index + 1}-number`}
                  delay={0.1}
                  duration={0.6}
                >
                  <span className={styles.serviceNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Reveal>
                <div className={styles.serviceText}>
                  <Reveal
                    name={`service-${index + 1}-title`}
                    delay={0.2}
                    duration={0.6}
                  >
                    <h3>{service.title}</h3>
                  </Reveal>
                  <Reveal
                    name={`service-${index + 1}-description`}
                    delay={0.3}
                    duration={0.7}
                  >
                    <p>{service.description}</p>
                  </Reveal>
                </div>
              </article>
            </div>
          ))}
        </div>
        <Reveal
          name="services-contact"
          scale={0.8}
          y={0}
          delay={0.2}
          duration={0.7}
        >
          <ButtonLink href="#contact">Book a Service</ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}

function Logo({
  image,
  name,
  className = "",
}: {
  image: string;
  name: string;
  className?: string;
}) {
  return (
    <Reveal
      name={`${name.toLowerCase()}-logo`}
      scale={0.7}
      y={0}
      duration={0.6}
      bounce={0.2}
      className={`${styles.logo} ${className}`}
    >
      <img src={asset(image)} alt={`${name} logo`} width={54} height={54} />
    </Reveal>
  );
}

export function Experience() {
  return (
    <Section id="experience" className={styles.section}>
      <Reveal name="experience-heading">
        <SectionHeading>Experience</SectionHeading>
      </Reveal>
      <div className={styles.experienceList}>
        {experience.map((job) => (
          <article key={job.company} className={styles.experienceCard}>
            <div className={styles.company}>
              <Logo
                image={job.image}
                name={job.company}
                className={styles.companyLogo}
              />
              <div className={styles.nameAndRole}>
                <Reveal
                  name={`${job.company.toLowerCase()}-company`}
                  delay={0.2}
                  duration={0.6}
                >
                  <h3>{job.company}</h3>
                </Reveal>
                <Reveal
                  name={`${job.company.toLowerCase()}-role`}
                  delay={0.4}
                  duration={0.6}
                >
                  <p>{job.role}</p>
                </Reveal>
              </div>
            </div>
            <Reveal
              name={`${job.company.toLowerCase()}-years`}
              delay={0.4}
              duration={0.6}
              className={styles.years}
            >
              <p>{job.years}</p>
            </Reveal>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Stacks() {
  return (
    <Section id="stacks" className={styles.section}>
      <Reveal name="stacks-heading">
        <SectionHeading>stacks &amp; skills</SectionHeading>
      </Reveal>
      <div className={styles.stackGrid}>
        {stacks.map((stack) => (
          <article key={stack.name} className={styles.stackCard}>
            <Logo image={stack.image} name={stack.name} />
            <div className={styles.nameAndRole}>
              <Reveal
                name={`${stack.name.toLowerCase()}-name`}
                delay={0.2}
                duration={0.6}
              >
                <h3>{stack.name}</h3>
              </Reveal>
              <Reveal
                name={`${stack.name.toLowerCase()}-use`}
                delay={0.4}
                duration={0.6}
              >
                <p>{stack.use}</p>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
