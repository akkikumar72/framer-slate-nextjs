"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";
import { Section, SectionHeading, Reveal } from "@/components/ui";
import { asset } from "@/lib/assets";
import styles from "./home-interactions.module.css";

const testimonials = [
  {
    name: "Paul Richards",
    role: "Senior Designer",
    quote:
      "Our website looks stunning and functions flawlessly. The design perfectly reflects our brand — simple, modern, and effective.",
    portrait: "tysRxWKTSOpbzXtDNzk2I96nUs.jpg",
  },
  {
    name: "David Thompson",
    role: "Bold Studio, CEO",
    quote:
      "The transformation was incredible. The attention to detail and smooth experience made the entire process so easy and enjoyable.",
    portrait: "V2Fudhg4kqB0c0O3oasglJAxyJU.jpg",
  },
  {
    name: "Tyler David",
    role: "Senior Developer",
    quote:
      "They turned our scattered ideas into a professional, polished website. The result exceeded our expectations in every way.",
    portrait: "O7ZUCGJxFfKEUYDzLAX5mVPMcwM.jpg",
  },
] as const;

const questions = [
  {
    question: "How do I customize this template?",
    answer:
      "Edit the text, images, and colors in the Next.js project. Components and global styles make customization fast and consistent.",
  },
  {
    question: "Is this template fully responsive?",
    answer:
      "Absolutely. Nue is built to look great on desktop, tablet, and mobile — ensuring a seamless experience across all devices.",
  },
  {
    question: "How long does it take to complete a project?",
    answer:
      "Most projects take between one to three weeks, depending on the size and complexity. We always provide a clear timeline before starting any work.",
  },
  {
    question: "Can I use this template for my client projects?",
    answer:
      "Adapt the Next.js components for personal or client portfolios. Replace the sample content with your own and check the licenses for any assets you publish.",
  },
] as const;

function Stars() {
  return (
    <div className={styles.stars} role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 15 15" aria-hidden="true">
          <path
            d="M2.869 14.625 4.088 9.356 0 5.813 5.4 5.343 7.5.375 9.6 5.344 15 5.812 10.912 9.356 12.132 14.625 7.5 11.831Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const activeRef = useRef(0);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      element.scrollTo({
        left: activeRef.current * element.clientWidth,
        behavior: "instant",
      });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    const element = track.current;
    if (!element) return;
    const next = Math.max(0, Math.min(testimonials.length - 1, index));
    element.scrollTo({
      left: next * element.clientWidth,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  return (
    <Section id="testimonials" className={styles.section}>
      <Reveal name="testimonials-heading">
        <SectionHeading>testimonials</SectionHeading>
      </Reveal>
      <div
        className={styles.carousel}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
      >
        <ul
          ref={track}
          className={styles.track}
          onScroll={(event) => {
            const element = event.currentTarget;
            const index = Math.max(
              0,
              Math.min(
                testimonials.length - 1,
                Math.round(element.scrollLeft / element.clientWidth),
              ),
            );
            activeRef.current = index;
            setActive(index);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(active + (event.key === "ArrowRight" ? 1 : -1));
            }
          }}
          tabIndex={0}
          aria-label="Testimonials. Use the left and right arrow keys to change slides."
        >
          {testimonials.map((testimonial, index) => (
            <li
              key={testimonial.name}
              className={styles.slide}
              aria-label={`${index + 1} of ${testimonials.length}`}
              aria-roledescription="slide"
              aria-hidden={active !== index}
              inert={active !== index}
              data-active={active === index}
            >
              <div className={styles.testimonialContent}>
                <div className={styles.quoteGroup}>
                  <Reveal>
                    <Stars />
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className={styles.quote}>{testimonial.quote}</p>
                  </Reveal>
                </div>
                <div className={styles.author}>
                  <Reveal delay={0.2} scale={0.7} y={0}>
                    <div className={styles.portrait}>
                      <img
                        src={asset(testimonial.portrait)}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        loading="lazy"
                      />
                    </div>
                  </Reveal>
                  <div className={styles.authorText}>
                    <Reveal delay={0.3}>
                      <h3>{testimonial.name}</h3>
                    </Reveal>
                    <Reveal delay={0.4}>
                      <p>{testimonial.role}</p>
                    </Reveal>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div
          className={styles.controls}
          aria-label="Carousel pagination controls"
        >
          <button
            type="button"
            className={styles.previous}
            onClick={() => goTo(active - 1)}
            aria-label="Previous testimonial"
            disabled={active === 0}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m12 5-5 5 5 5" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.next}
            onClick={() => goTo(active + 1)}
            aria-label="Next testimonial"
            disabled={active === testimonials.length - 1}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m8 5 5 5-5 5" />
            </svg>
          </button>
        </div>
        <p
          className={styles.screenReaderOnly}
          aria-live="polite"
          aria-atomic="true"
        >
          Testimonial {active + 1} of {testimonials.length}:{" "}
          {testimonials[active].name}
        </p>
      </div>
    </Section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<boolean[]>(questions.map(() => false));
  const reducedMotion = useReducedMotion();

  return (
    <Section id="faq" className={styles.section}>
      <Reveal name="faq-heading">
        <SectionHeading>frequently asked questions</SectionHeading>
      </Reveal>
      <div className={styles.questions}>
        {questions.map(({ question, answer }, index) => (
          <Reveal
            className={styles.question}
            name={`faq-question-${index + 1}`}
            key={question}
            delay={0.1}
          >
            <h3 className={styles.questionHeading}>
              <button
                type="button"
                id={`nue-faq-question-${index}`}
                className={styles.questionButton}
                aria-expanded={open[index]}
                aria-controls={`nue-faq-answer-${index}`}
                onClick={() =>
                  setOpen((current) =>
                    current.map((value, item) =>
                      item === index ? !value : value,
                    ),
                  )
                }
              >
                <span>{question}</span>
                <span className={styles.plus} aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <path d="M10 3v14M3 10h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <motion.div
              id={`nue-faq-answer-${index}`}
              role="region"
              aria-labelledby={`nue-faq-question-${index}`}
              aria-hidden={!open[index]}
              inert={!open[index]}
              className={styles.answerClip}
              initial={false}
              animate={{
                height: open[index] ? "auto" : 0,
                opacity: open[index] ? 1 : 0,
              }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", duration: 0.5, bounce: 0.18 }
              }
            >
              <div className={styles.answer}>
                <p>{answer}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
