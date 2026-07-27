"use client";

import { useState } from "react";
import styles from "./HomePage.module.css";

const testimonials = [
  {
    quote:
      "I honestly didn’t expect an AI tool to feel this personal. It actually remembers what I was working on and picks up right.",
    name: "Smith J.",
    role: "CEO of StudioX.",
  },
  {
    quote:
      "I really didn’t think an AI could feel this personal. It remembers exactly what I was doing and continues smoothly from there.",
    name: "Smith J.",
    role: "CEO of StudioX.",
  },
  {
    quote:
      "It feels less like using software and more like working with someone who understands the project, the context, and what comes next.",
    name: "Smith J.",
    role: "CEO of StudioX.",
  },
  {
    quote:
      "The handoff between ideas and execution feels incredibly natural. I can stay focused on the creative direction instead of the busywork.",
    name: "Liam Hayes",
    role: "Art Director",
  },
  {
    quote:
      "The interface adapts to how I work. It remembers the details, surfaces the right tools, and lets me move without breaking focus.",
    name: "Liam Hayes",
    role: "Product Designer",
  },
  {
    quote:
      "Honestly, I never expected an AI to feel this personal. It remembers my work and jumps right back in with me.",
    name: "Julian West",
    role: "Lead Developer",
  },
];

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  function move(step: number) {
    setIndex((current) => (current + step + testimonials.length) % testimonials.length);
  }

  return (
    <section aria-roledescription="carousel" className={styles.testimonials}>
      <div className={styles.testimonialSlide} key={index}>
        <p aria-live="polite">“{testimonial.quote}”</p>
        <div className={styles.testimonialMeta}>
          <span className={styles.avatar}>{testimonial.name.slice(0, 1)}</span>
          <div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div>
        </div>
      </div>
      <div className={styles.testimonialControls}>
        <button aria-label="Previous testimonial" onClick={() => move(-1)} type="button">‹</button>
        <button aria-label="Next testimonial" onClick={() => move(1)} type="button">›</button>
      </div>
      <div className={styles.testimonialBrands}>
        {["Command+R", "Hourglass", "Lightbox", "Spherule", "Capsule", "Luminous"].map(
          (brand, brandIndex) => (
            <span className={brandIndex === index ? styles.brandActive : ""} key={brand}>
              {brand}
            </span>
          ),
        )}
      </div>
    </section>
  );
}
