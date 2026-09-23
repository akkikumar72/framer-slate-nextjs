"use client";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { Reveal, Section, SectionHeading } from "./ui";

const subscribeToHydration = () => () => {};

export function Contact() {
  // Native submission must stay unavailable until the draft handler is ready.
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [draft, setDraft] = useState("");
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    for (const fieldName of ["name", "message"]) {
      const field = event.currentTarget.elements.namedItem(fieldName) as
        | HTMLInputElement
        | HTMLTextAreaElement;
      if (!field.value.trim()) {
        field.setCustomValidity(`Please enter your ${fieldName}.`);
        field.reportValidity();
        return;
      }
    }
    const fields = new FormData(event.currentTarget);
    const name = String(fields.get("name") || "").trim(),
      email = String(fields.get("email") || "").trim(),
      message = String(fields.get("message") || "").trim();
    setDraft(
      `mailto:nue@gmail.com?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom ${name}\n${email}`)}`,
    );
  }
  return (
    <Section id="contact" className="nue-contact">
      <div>
        <Reveal name="contact-heading">
          <SectionHeading>Contact</SectionHeading>
        </Reveal>
        <Reveal name="contact-copy" delay={0.1}>
          <p className="nue-contact-copy">
            I’m always open to new projects, collaborations, or a conversation
            about design. If you have an idea in mind or want to connect, feel
            free to get in touch.
          </p>
        </Reveal>
      </div>
      <div className="nue-socials">
        <Reveal name="contact-social-x" scale={0.7} delay={0.1}>
          <a
            href="https://x.com/aathif_designer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on X"
          >
            𝕏
          </a>
        </Reveal>
        <Reveal name="contact-social-instagram" scale={0.7} delay={0.2}>
          <a
            href="https://www.instagram.com/aathif.design/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
            </svg>
          </a>
        </Reveal>
        <Reveal name="contact-social-dribbble" scale={0.7} delay={0.3}>
          <a
            href="https://dribbble.com/Aathif-th"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Dribbble"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M7 4c6 7 9 16 9 16M3 10c8 1 14-3 16-5M5 19c3-6 8-9 16-6" />
            </svg>
          </a>
        </Reveal>
        <Reveal name="contact-social-email" scale={0.7} delay={0.4}>
          <a href="mailto:nue@gmail.com" aria-label="Email Nue">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 6 9 7 9-7" />
            </svg>
          </a>
        </Reveal>
      </div>
      <form
        className="nue-contact-form"
        onSubmit={prepare}
        onChange={(event) => {
          const field = event.target;
          if (
            field instanceof HTMLInputElement ||
            field instanceof HTMLTextAreaElement
          )
            field.setCustomValidity("");
          setDraft("");
        }}
      >
        <div className="nue-field-row">
          <Reveal name="contact-name">
            <label>
              Name
              <input
                name="name"
                placeholder="John Doe"
                autoComplete="name"
                maxLength={100}
                disabled={!hydrated}
                required
              />
            </label>
          </Reveal>
          <Reveal name="contact-email" delay={0.1}>
            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="johndoe@gmail.com"
                autoComplete="email"
                maxLength={254}
                disabled={!hydrated}
                required
              />
            </label>
          </Reveal>
        </div>
        <Reveal name="contact-message" delay={0.1}>
          <label>
            Message
            <textarea
              name="message"
              rows={4}
              maxLength={5000}
              disabled={!hydrated}
              required
            />
          </label>
        </Reveal>
        <Reveal name="contact-submit" delay={0.1}>
          <button
            className="nue-button nue-button-dark"
            type="submit"
            disabled={!hydrated}
          >
            <span className="nue-button-label">
              <span>Submit</span>
              <span aria-hidden="true">Submit</span>
            </span>
          </button>
        </Reveal>
        {draft && (
          <div className="nue-contact-status" role="status">
            <p>Your message is ready. Open your email app to send it.</p>
            <a href={draft}>Open email draft ↗</a>
          </div>
        )}
      </form>
      <noscript>
        <p className="nue-contact-status">
          This form needs JavaScript to prepare an email draft.{" "}
          <a href="mailto:nue@gmail.com">Email Nue directly</a> instead.
        </p>
      </noscript>
    </Section>
  );
}
