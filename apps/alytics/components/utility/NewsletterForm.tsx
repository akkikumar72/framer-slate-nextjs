"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "./utility.module.css";

type FieldErrors = { name?: string; email?: string };

export function NewsletterForm() {
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [complete, setComplete] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FieldErrors = {};
    const name = nameInput.current?.value.trim() ?? "";
    const email = emailInput.current?.value.trim() ?? "";

    if (!name) nextErrors.name = "Please enter your name.";
    if (!email || !emailInput.current?.validity.valid) {
      nextErrors.email = "Please enter a valid email address.";
    }

    setErrors(nextErrors);
    setComplete(false);
    if (nextErrors.name) nameInput.current?.focus();
    else if (nextErrors.email) emailInput.current?.focus();
    else setComplete(true);
  }

  function clearFeedback(field: keyof FieldErrors) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    setComplete(false);
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate aria-label="Join the Alytics newsletter">
      <div className={styles.field}>
        <label htmlFor="newsletter-name">Name</label>
        <input
          ref={nameInput}
          id="newsletter-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          required
          maxLength={200}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "newsletter-name-error" : undefined}
          onChange={() => clearFeedback("name")}
        />
        {errors.name && <span className={styles.error} id="newsletter-name-error">{errors.name}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="newsletter-email">Email</label>
        <input
          ref={emailInput}
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@alytics.com"
          required
          maxLength={254}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "newsletter-email-error" : undefined}
          onChange={() => clearFeedback("email")}
        />
        {errors.email && <span className={styles.error} id="newsletter-email-error">{errors.email}</span>}
      </div>
      <button type="submit" className={`button ${styles.submit}`}>Submit</button>
      {complete && (
        <p role="status" className={styles.confirmation}>
          Preview complete. Your details were validated locally. No subscription was created.
        </p>
      )}
    </form>
  );
}
