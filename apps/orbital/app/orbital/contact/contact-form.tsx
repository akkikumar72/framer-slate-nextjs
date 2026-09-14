"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./page.module.css";

export function ContactForm() {
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("This preview form is not connected, so your message was not sent.");
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.twoColumns}>
        <label>First name<input name="firstName" type="text" placeholder="Enter your first name" required /></label>
        <label>Last name<input name="lastName" type="text" placeholder="Enter your last name" required /></label>
      </div>
      <div className={styles.twoColumns}>
        <label>Work email<input name="email" type="email" placeholder="jane@company.com" required /></label>
        <label>Company<input name="company" type="text" placeholder="Ex:GR8r Studio Inc." required /></label>
      </div>
      <label>What can we help with?
        <select name="location" defaultValue="" required>
          <option value="" disabled>Select…</option>
          <option>Amsterdam</option>
          <option>Barcelona</option>
        </select>
      </label>
      <label>Message<textarea name="message" placeholder="Tell us a bit about your used case and timeline..." required /></label>
      <div className={styles.submitRow}>
        <p className={styles.status} role="status" aria-live="polite">{status}</p>
        <button type="submit">Send message</button>
      </div>
    </form>
  );
}
