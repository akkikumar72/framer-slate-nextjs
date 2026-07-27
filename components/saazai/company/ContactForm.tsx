"use client";

import Image from "next/image";
import { type FormEvent, useState } from "react";
import { SectionLabel } from "@/components/saazai/shared/SaazaiSections";
import styles from "./company.module.css";

const details = [
  {
    icon: "▱",
    title: "Chat to sales",
    copy: "Talk to sales anytime. It’s free, 24/7.",
    value: "support@omni.com",
  },
  {
    icon: "♧",
    title: "Call us",
    copy: "Call our sales team anytime. Available 24/7.",
    value: "012244445566",
  },
  {
    icon: "⌖",
    title: "Address",
    copy: "Open 24/7. Feel free to visit anytime.",
    value: "190 Shiloh Hawaii 81063",
  },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("Thanks. Your message has been received.");
    form.reset();
  }

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1400);
  }

  return (
    <section className={styles.contactArea}>
      <div className={styles.contactGrid}>
        <form className={styles.contactForm} onSubmit={submit}>
          <SectionLabel>Contact Details</SectionLabel>
          <h2>Lets contact.</h2>
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label htmlFor="saazai-first-name">First Name</label>
              <input
                autoComplete="given-name"
                id="saazai-first-name"
                name="firstName"
                placeholder="eg. Anna"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="saazai-last-name">Last Name</label>
              <input
                autoComplete="family-name"
                id="saazai-last-name"
                name="lastName"
                placeholder="eg. Kaned"
                required
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="saazai-work-email">Work email</label>
            <input
              autoComplete="email"
              id="saazai-work-email"
              name="email"
              placeholder="enter email"
              required
              type="email"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="saazai-phone">Phone Number</label>
            <input
              autoComplete="tel"
              id="saazai-phone"
              name="phone"
              pattern="[+()0-9 .-]{7,}"
              placeholder="18 2525 3636"
              required
              type="tel"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="saazai-message">Write Message</label>
            <textarea
              id="saazai-message"
              minLength={8}
              name="message"
              placeholder="Write your text ....."
              required
            />
          </div>
          <button className={styles.submit} type="submit">
            Submit <span aria-hidden="true">→</span>
          </button>
          <output aria-live="polite" className={styles.status}>
            {status}
          </output>
        </form>
        <Image
          alt="Team members reaching their hands together"
          className={styles.contactImage}
          height={1100}
          priority
          src="/saazai/assets/contact-hands.png"
          width={788}
        />
      </div>

      <div className={styles.contactCards}>
        {details.map((detail) => (
          <article className={styles.contactCard} key={detail.title}>
            <span aria-hidden="true" className={styles.contactCardIcon}>
              {detail.icon}
            </span>
            <h3>{detail.title}</h3>
            <p>{detail.copy}</p>
            <div className={styles.copyRow}>
              <span>{detail.value}</span>
              <button
                aria-label={`Copy ${detail.value}`}
                onClick={() => copy(detail.value)}
                title={copied === detail.value ? "Copied" : "Copy"}
                type="button"
              >
                {copied === detail.value ? "✓" : "▣"}
              </button>
            </div>
          </article>
        ))}
        <article className={`${styles.contactCard} ${styles.mapCard}`}>
          <Image
            alt="World map showing Saazai support locations"
            height={1080}
            src="/saazai/assets/contact-map.png"
            width={1660}
          />
        </article>
      </div>
    </section>
  );
}
