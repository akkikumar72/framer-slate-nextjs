"use client";

import Image from "next/image";
import { useState } from "react";
import { testimonials } from "./data";
import styles from "./ProjectDetail.module.css";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  return (
    <section
      aria-label="Client testimonials"
      aria-roledescription="carousel"
      className={styles.testimonial}
    >
      <Image
        alt=""
        aria-hidden="true"
        fill
        sizes="(max-width: 1440px) 100vw, 1408px"
        src={testimonial.image}
      />
      <div aria-atomic="true" aria-live="polite" className={styles.testimonialPanel}>
        <p className={styles.testimonialCount}>
          0{index + 1} / 0{testimonials.length}
        </p>
        <h2>{testimonial.title}</h2>
        <blockquote>“{testimonial.quote}”</blockquote>
        <div>
          <strong>{testimonial.name}</strong>
          <span>{testimonial.role}</span>
        </div>
      </div>
      <div className={styles.carouselControls}>
        <button
          aria-label="Previous testimonial"
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
          type="button"
        >
          ←
        </button>
        <button
          aria-label="Next testimonial"
          disabled={index === testimonials.length - 1}
          onClick={() =>
            setIndex((current) => Math.min(testimonials.length - 1, current + 1))
          }
          type="button"
        >
          →
        </button>
      </div>
    </section>
  );
}
