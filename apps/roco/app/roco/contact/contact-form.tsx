"use client";

import { useState, type FormEvent } from "react";
import styles from "./contact.module.css";

type SubmissionState = { kind: "error" | "success"; text: string } | null;

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmissionState>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const message = String(fields.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setResult({ kind: "error", text: "Please complete your name, email, and message." });
      return;
    }
    setPending(true);
    setResult(null);
    try {
      const response = await fetch("/roco/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const body = await response.json().catch(() => ({})) as { error?: string; message?: string };
      if (!response.ok) {
        setResult({ kind: "error", text: body.error || "Your message could not be sent. Please try again or use a contact link." });
        return;
      }
      setResult({ kind: "success", text: body.message || "Your message was sent successfully." });
      form.reset();
    } catch {
      setResult({ kind: "error", text: "Your message could not be sent. Please try again or use a contact link." });
    } finally {
      setPending(false);
    }
  }

  return <form className={styles.form} onSubmit={submit} aria-label="Message Me" aria-busy={pending}>
    <div className={styles.fieldRow}>
      <label className={styles.field}><span className={styles.hiddenLabel}>Name</span><input type="text" name="name" placeholder="Name" autoComplete="name" required maxLength={200} /></label>
      <label className={styles.field}><span className={styles.hiddenLabel}>Email</span><input type="email" name="email" placeholder="Email" autoComplete="email" required maxLength={320} /></label>
    </div>
    <label className={styles.messageField}><span className={styles.hiddenLabel}>Message</span><textarea name="message" placeholder="Write a message..." required maxLength={10000} /></label>
    <button type="submit" className={styles.submit} disabled={pending}>{pending ? "Sending..." : "Send Message"}</button>
    {result && <p className={result.kind === "error" ? styles.error : styles.success} role={result.kind === "error" ? "alert" : "status"}>{result.text}</p>}
  </form>;
}
