"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  Awards,
  ContactFormSection,
  DotsDivider,
  FaqSection,
  GridSection,
  PricingSection,
  SectionLabel,
  WorkCards,
  WorkProcess,
} from "../shared/JaydenSections";
import { jaydenAssets } from "../shared/assets";
import motionStyles from "../shared/JaydenMotion.module.css";
import { JaydenFluidBackground } from "./JaydenFluidBackground";
import styles from "./JaydenHome.module.css";

const services = [
  {
    number: "[01]",
    title: "Brand Design",
    items: ["Typography & Color Systems", "Logo Design", "Brand Guidelines"],
  },
  {
    number: "[02]",
    title: "UI/UX Design",
    items: ["User Research", "Interface Design", "Interactive Prototypes"],
  },
  {
    number: "[03]",
    title: "Webflow Dev",
    items: ["Responsive Development", "CMS Architecture", "Motion & Interactions"],
  },
  {
    number: "[04]",
    title: "Framer Dev",
    items: ["Site Systems", "Code Components", "Responsive Launch"],
  },
];

const tech = [
  {
    name: "Slack",
    description: "Smart messaging for modern teams",
    image: jaydenAssets.avatarOne,
  },
  {
    name: "Figma",
    description: "Leading collaborative design tool",
    image: "/jayden/assets/zx6JcQGWSu4DuSKV2tWw1jIrCig.svg",
  },
  {
    name: "Framer",
    description: "Design and ship interactive sites",
    image: "/jayden/assets/KF3rSlA4PtauCl8PmciyB0vB8.png",
  },
  {
    name: "Loom",
    description: "Instantly share video messages",
    image: "/jayden/assets/DYEKrJePMB6MsrJa3Epm97h9t2Q.svg",
  },
];

const testimonials = [
  {
    quote:
      "Jayden is a designer with passionate, professional and full creativity. Much more than I expected. Great services, high quality products and affordable.",
    name: "Sheik Asif",
    role: "Ceo of Avade Inc",
    image: jaydenAssets.testimonialOne,
  },
  {
    quote:
      "Jayden brought my vision to life with amazing creativity. So much better than expected. Fast service, great results, and fair pricing.",
    name: "Musk",
    role: "Ceo of Prost",
    image: jaydenAssets.testimonialTwo,
  },
  {
    quote:
      "Very creative and super professional. Jayden nailed the design, better than I imagined. Excellent service and worth every penny.",
    name: "Alex Vamos",
    role: "Ceo of Para Groups",
    image: jaydenAssets.testimonialThree,
  },
];

function motionDelay(index: number, step = 80) {
  return { "--jayden-delay": `${index * step}ms` } as CSSProperties;
}

export function JaydenHome() {
  const [serviceIndex, setServiceIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [netWorth, setNetWorth] = useState(0);
  const [successRate, setSuccessRate] = useState(0);

  useEffect(() => {
    const counterSection = document.getElementById("jayden-counters");
    if (!counterSection) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();
        if (reducedMotion) {
          setNetWorth(1);
          setSuccessRate(11);
          return;
        }

        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / 900, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setNetWorth(progress > 0.28 ? 1 : 0);
          setSuccessRate(Math.round(11 * eased));

          if (progress < 1) {
            animationFrame = window.requestAnimationFrame(animate);
          }
        };

        animationFrame = window.requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(counterSection);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(
      () => setTestimonialIndex((current) => (current + 1) % testimonials.length),
      5000,
    );
    return () => window.clearInterval(interval);
  }, []);

  const testimonial = useMemo(
    () => testimonials[testimonialIndex],
    [testimonialIndex],
  );

  return (
    <>
      <section className={styles.hero} id="home">
        <JaydenFluidBackground />
        <div className={styles.heroGrid}>
          <div className={styles.heroImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Photo of John Jayden, web developer"
              className={styles.heroPortrait}
              src={jaydenAssets.heroPortrait}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Jayden" className={styles.heroSignature} src={jaydenAssets.mark} />
          </div>
          <div
            className={`${styles.heroCopy} ${motionStyles.reveal}`}
            data-jayden-reveal
            style={motionDelay(1)}
          >
            <p>Hi, I&apos;m Jayden Jones,</p>
            <p>Working as Web-designer and Developer</p>
          </div>
          <div
            className={`${styles.socials} ${motionStyles.reveal}`}
            aria-label="Social links"
            data-jayden-reveal
            style={motionDelay(2)}
          >
            <a aria-label="X" href="https://x.com/" rel="noreferrer" target="_blank">
              X
            </a>
            <a
              aria-label="Dribbble"
              href="https://dribbble.com/"
              rel="noreferrer"
              target="_blank"
            >
              Dr
            </a>
            <a
              aria-label="Instagram"
              href="https://instagram.com/"
              rel="noreferrer"
              target="_blank"
            >
              In
            </a>
            <a
              aria-label="Pinterest"
              href="https://pinterest.com/"
              rel="noreferrer"
              target="_blank"
            >
              Pi
            </a>
          </div>
          <div
            className={`${styles.heroActions} ${motionStyles.reveal}`}
            data-jayden-reveal
            style={motionDelay(3)}
          >
            <a
              className={styles.getStarted}
              href="https://framer.link/1XFypT0"
              rel="noreferrer"
              target="_blank"
            >
              <span>Get Started</span>
              <b aria-hidden="true">↗</b>
            </a>
            <Link className={styles.viewWork} href="/work">
              View My Work
            </Link>
          </div>
          <DotsDivider />
        </div>
      </section>

      <GridSection className={styles.counterSection} id="jayden-counters">
        <div className={styles.counters}>
          <article
            className={motionStyles.reveal}
            data-jayden-reveal
            style={motionDelay(0)}
          >
            <SectionLabel>Net Worth Gross</SectionLabel>
            <strong>{netWorth}M+</strong>
          </article>
          <article
            className={motionStyles.reveal}
            data-jayden-reveal
            style={motionDelay(1)}
          >
            <SectionLabel>Success Rate</SectionLabel>
            <strong>{successRate}%</strong>
          </article>
        </div>
        <div
          className={`${styles.counterMeta} ${motionStyles.reveal}`}
          data-jayden-reveal
          style={motionDelay(2)}
        >
          <div className={styles.customerMeta}>
            <div>
              {[jaydenAssets.avatarOne, jaydenAssets.avatarTwo, jaydenAssets.avatarThree].map(
                (image) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="" aria-hidden="true" key={image} src={image} />
                ),
              )}
            </div>
            <span>★★★★★</span>
            <p>50+ Customers</p>
          </div>
          <p>Ready for Global Projects</p>
        </div>
        <DotsDivider />
      </GridSection>

      <GridSection className={styles.experienceSection}>
        <div
          className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
          data-jayden-reveal
        >
          <SectionLabel>Experiences</SectionLabel>
        </div>
        <p
          className={`${styles.experienceLead} ${motionStyles.reveal}`}
          data-jayden-reveal
          style={motionDelay(1)}
        >
          Dylan offers more than just a place
          <br />
          to live it&apos;s a space designed to reflect your unique style inspiration
        </p>
        <div className={styles.experienceList}>
          <Link
            className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
            data-jayden-reveal
            href="/about"
            style={motionDelay(0)}
          >
            <span>Product Designer</span>
            <time>2023 - Present</time>
          </Link>
          <Link
            className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
            data-jayden-reveal
            href="/about"
            style={motionDelay(1)}
          >
            <span>UI/UX Designer</span>
            <time>2022 - 2023</time>
          </Link>
          <Link
            className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
            data-jayden-reveal
            href="/about"
            style={motionDelay(2)}
          >
            <span>Intern UI Designer</span>
            <time>2020 - 2021</time>
          </Link>
        </div>
        <DotsDivider />
      </GridSection>

      <WorkCards className={styles.homeWorkSection} />

      <GridSection className={styles.servicesSection} id="services">
        <div
          className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
          data-jayden-reveal
        >
          <SectionLabel>My Services</SectionLabel>
        </div>
        <div className={styles.servicePanel}>
          {services.map((service, index) => {
            const active = serviceIndex === index;
            return (
              <article
                className={`${active ? styles.serviceActive : ""} ${motionStyles.reveal} ${motionStyles.fromLeft}`}
                data-jayden-reveal
                key={service.title}
                style={motionDelay(index)}
              >
                <button
                  aria-expanded={active}
                  onClick={() => setServiceIndex(index)}
                  type="button"
                >
                  <span>{service.title}</span>
                  <small>{service.number}</small>
                </button>
                <div>
                  {service.items.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                  <Link href="/service">View service ↗</Link>
                </div>
              </article>
            );
          })}
        </div>
        <div
          className={`${styles.serviceAvailability} ${motionStyles.reveal}`}
          data-jayden-reveal
        >
          <span>Available Worldwide</span>
          <Link href="/#contact">Contact me ↗</Link>
        </div>
        <DotsDivider />
      </GridSection>

      <GridSection className={styles.aboutSection}>
        <div
          className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
          data-jayden-reveal
        >
          <SectionLabel>About Me</SectionLabel>
        </div>
        <div
          className={`${styles.aboutCopy} ${motionStyles.reveal}`}
          data-jayden-reveal
          style={motionDelay(1)}
        >
          <h2>Behind every great design is an even greater story</h2>
          <p>
            Every design has a starting point, and for truly impactful visuals. It&apos;s
            the narrative that guides the creative process, ensuring the final product
            resonates with meaning and purpose.
          </p>
          <span>@Jayden.design</span>
        </div>
        <div className={styles.gallery}>
          {[
            jaydenAssets.galleryOne,
            jaydenAssets.galleryTwo,
            jaydenAssets.galleryThree,
            jaydenAssets.galleryFour,
          ].map((image, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={`Jayden project detail ${index + 1}`}
              className={`${motionStyles.reveal} ${motionStyles.scaleIn}`}
              data-jayden-reveal
              key={image}
              src={image}
              style={motionDelay(index)}
            />
          ))}
        </div>
        <DotsDivider />
      </GridSection>

      <GridSection className={styles.techSection}>
        <div
          className={`${styles.techTitle} ${motionStyles.reveal} ${motionStyles.fromLeft}`}
          data-jayden-reveal
        >
          <h2>Tech Stack</h2>
        </div>
        <div className={styles.techTrack}>
          {tech.map((item, index) => (
            <article
              className={motionStyles.reveal}
              data-jayden-reveal
              key={item.name}
              style={motionDelay(index)}
            >
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={`${item.name} logo`} src={item.image} />
            </article>
          ))}
        </div>
        <DotsDivider />
      </GridSection>

      <GridSection className={styles.partnerSection}>
        <div
          className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
          data-jayden-reveal
        >
          <SectionLabel>Work with 60+ brands worldwide</SectionLabel>
        </div>
        <div className={styles.partnerLogos}>
          {[
            "C1wb1Ui8RiX60t4svv5HuRgF8.svg",
            "OW572VyQBNs1o0UMixSIiglgreg.svg",
            "U1fbpyKpOhZ5WFirEojZJ76SKNU.svg",
            "fZkg5aYquWxiqNwiQfQTMfkmpXw.svg",
            "mjgMyMv03loxxn9WUeLRe5iXo.svg",
          ].map((logo, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt="Client logo"
              className={motionStyles.reveal}
              data-jayden-reveal
              key={logo}
              src={`/jayden/assets/${logo}`}
              style={motionDelay(index, 55)}
            />
          ))}
        </div>
        <DotsDivider />
      </GridSection>

      <GridSection className={styles.testimonialSection} id="testimonial">
        <div
          className={`${motionStyles.reveal} ${motionStyles.fromLeft}`}
          data-jayden-reveal
        >
          <SectionLabel>Testimonial</SectionLabel>
        </div>
        <article
          className={`${styles.testimonialCard} ${motionStyles.reveal} ${motionStyles.scaleIn}`}
          data-jayden-reveal
          style={motionDelay(1)}
        >
          <blockquote>“ {testimonial.quote} ”</blockquote>
          <div className={styles.testimonialPerson}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={`Portrait of ${testimonial.name}`} src={testimonial.image} />
            <div>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </div>
          </div>
          <div className={styles.testimonialControls}>
            <button
              aria-label="Previous testimonial"
              onClick={() =>
                setTestimonialIndex(
                  (testimonialIndex - 1 + testimonials.length) % testimonials.length,
                )
              }
              type="button"
            >
              ←
            </button>
            <span>
              {testimonialIndex + 1} / {testimonials.length}
            </span>
            <button
              aria-label="Next testimonial"
              onClick={() =>
                setTestimonialIndex((testimonialIndex + 1) % testimonials.length)
              }
              type="button"
            >
              →
            </button>
          </div>
        </article>
        <DotsDivider />
      </GridSection>

      <Awards />
      <WorkProcess />
      <PricingSection />
      <FaqSection />
      <ContactFormSection />
    </>
  );
}
