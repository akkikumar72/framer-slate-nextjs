"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

import { PliarFooter, PliarHeader } from "@/components/pilar/PliarShell";

import styles from "./PliarSecondary.module.css";

type ContactField = "name" | "email" | "purpose" | "message";
type ContactErrors = Partial<Record<ContactField, string>>;

function ContactIcon({ type }: { type: "email" | "phone" | "location" }) {
  if (type === "email") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M3.75 5.75h16.5v12.5H3.75z" />
        <path d="m4.5 6.5 7.5 6 7.5-6" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M8.2 3.75 5.45 5.1c-.85.42-1.25 1.4-.94 2.3 2.05 5.86 6.23 10.04 12.09 12.09.9.31 1.88-.09 2.3-.94l1.35-2.75-4.2-2.05-1.15 1.9a13.07 13.07 0 0 1-6.55-6.55l1.9-1.15-2.05-4.2Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20 10.25c0 5.25-8 10-8 10s-8-4.75-8-10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.25" r="2.6" />
    </svg>
  );
}

function LightningMark() {
  return (
    <span className={styles.lightningMark} aria-hidden="true">
      <svg viewBox="0 0 12 12">
        <path d="M7.05.9 2.7 6.25h2.83L4.94 11.1l4.36-5.4H6.47L7.05.9Z" />
      </svg>
    </span>
  );
}

function validateContactForm(form: HTMLFormElement): ContactErrors {
  const data = new FormData(form);
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const purpose = String(data.get("purpose") ?? "");
  const message = String(data.get("message") ?? "").trim();
  const errors: ContactErrors = {};

  if (!name) errors.name = "Enter your name.";
  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!purpose) errors.purpose = "Choose a contact purpose.";
  if (!message) errors.message = "Tell us how we can help.";

  return errors;
}

export function PliarContactPage() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(event.currentTarget);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  const clearFieldError = (field: ContactField) => {
    if (!errors[field] && !submitted) return;
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  return (
    <div className={styles.page}>
      <PliarHeader />
      <main className={styles.contactMain}>
        <div className={styles.contactGrid}>
          <section className={styles.contactIntro} aria-labelledby="pliar-contact-heading">
            <h1 id="pliar-contact-heading">Get in Touch</h1>
            <p className={styles.contactLead}>
              Our team is here to help. Reach out and we’ll get back to you quickly.
            </p>

            <address className={styles.contactDetails}>
              <a href="mailto:contact@pliar.com">
                <ContactIcon type="email" />
                <span>contact@pliar.com</span>
              </a>
              <a href="tel:+12345678910">
                <ContactIcon type="phone" />
                <span>+123 456 78910</span>
              </a>
              <p>
                <ContactIcon type="location" />
                <span>100 Fiction Ln, San Francisco, USA</span>
              </p>
            </address>
          </section>

          <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
            <label className={styles.formField}>
              <span>Name</span>
              <input
                aria-describedby={errors.name ? "pliar-contact-name-error" : undefined}
                aria-invalid={Boolean(errors.name)}
                autoComplete="name"
                name="name"
                onChange={() => clearFieldError("name")}
                placeholder="Ethan Walker"
                required
                type="text"
              />
              {errors.name ? (
                <small className={styles.fieldError} id="pliar-contact-name-error">
                  {errors.name}
                </small>
              ) : null}
            </label>

            <label className={styles.formField}>
              <span>Email</span>
              <input
                aria-describedby={errors.email ? "pliar-contact-email-error" : undefined}
                aria-invalid={Boolean(errors.email)}
                autoComplete="email"
                inputMode="email"
                name="email"
                onChange={() => clearFieldError("email")}
                placeholder="contact@ethan.com"
                required
                type="email"
              />
              {errors.email ? (
                <small className={styles.fieldError} id="pliar-contact-email-error">
                  {errors.email}
                </small>
              ) : null}
            </label>

            <label className={styles.formField}>
              <span>Contact Purpose</span>
              <span className={styles.selectWrap}>
                <select
                  aria-describedby={errors.purpose ? "pliar-contact-purpose-error" : undefined}
                  aria-invalid={Boolean(errors.purpose)}
                  defaultValue=""
                  name="purpose"
                  onChange={() => clearFieldError("purpose")}
                  required
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  <option value="general">General</option>
                  <option value="sales">Sales</option>
                  <option value="emergency">Emergency</option>
                  <option value="other">Other</option>
                </select>
                <svg aria-hidden="true" viewBox="0 0 16 16">
                  <path d="m4.25 6.25 3.75 3.5 3.75-3.5" />
                </svg>
              </span>
              {errors.purpose ? (
                <small className={styles.fieldError} id="pliar-contact-purpose-error">
                  {errors.purpose}
                </small>
              ) : null}
            </label>

            <label className={styles.formField}>
              <span>How can we help?</span>
              <textarea
                aria-describedby={errors.message ? "pliar-contact-message-error" : undefined}
                aria-invalid={Boolean(errors.message)}
                name="message"
                onChange={() => clearFieldError("message")}
                placeholder="Enter your message"
                required
                rows={5}
              />
              {errors.message ? (
                <small className={styles.fieldError} id="pliar-contact-message-error">
                  {errors.message}
                </small>
              ) : null}
            </label>

            <div className={styles.submitArea}>
              <button type="submit">Send Inquiry</button>
              <p className={styles.formStatus} role="status" aria-live="polite">
                {submitted ? "Validated locally. No information was sent." : ""}
              </p>
            </div>
          </form>
        </div>
      </main>
      <PliarFooter />
    </div>
  );
}

export function PliarNotFoundPage() {
  return (
    <div className={styles.page}>
      <PliarHeader />
      <main className={styles.notFoundMain}>
        <section className={styles.notFoundContent} aria-labelledby="pliar-not-found-heading">
          <p className={styles.notFoundLabel}>
            <LightningMark />
            <span>404</span>
          </p>
          <h1 id="pliar-not-found-heading">The page you are looking for is not available.</h1>
          <Link className={styles.backLink} href="/#hero">
            Back to home
          </Link>
        </section>
      </main>
      <PliarFooter />
    </div>
  );
}
