"use client";

import { type FormEvent, useState } from "react";

import styles from "./ContactPage.module.css";

export function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Preview only. No job request was sent.");
  }

  return (
    <form
      className={styles.form}
      onInput={() => setStatus("")}
      onSubmit={handleSubmit}
    >
      <div className={styles.formIntro}>
        <h1>Get In Touch”</h1>
        <p>
          Pick a plan, submit a job request, and your イメージ will kickoff
          <br />
          within 24 hours.
        </p>
      </div>
      <div className={styles.formRow}>
        <label>
          <span>First Name*</span>
          <input
            aria-label="First Name*"
            autoComplete="given-name"
            name="firstName"
            placeholder="Jim"
            required
          />
        </label>
        <label>
          <span>Last Name*</span>
          <input
            aria-label="Last Name*"
            autoComplete="family-name"
            name="lastName"
            placeholder="Hopper"
            required
          />
        </label>
      </div>
      <div className={styles.formRow}>
        <label>
          <span>Category</span>
          <span className={styles.selectWrap}>
            <select aria-label="Category" defaultValue="" name="category">
              <option disabled value="">
                Select
              </option>
              <option>Art Direction</option>
              <option>Photography</option>
            </select>
          </span>
        </label>
        <label>
          <span>Email</span>
          <input
            aria-label="Email"
            autoComplete="email"
            name="email"
            placeholder="fuel@mail.com"
            type="email"
          />
        </label>
      </div>
      <label className={styles.message}>
        <span>Message</span>
        <textarea
          aria-label="Message"
          name="message"
          placeholder="Enter your message....."
        />
      </label>
      <button className={styles.submit} type="submit">
        Submit
      </button>
      <p className={styles.status} role="status">
        {status}
      </p>
    </form>
  );
}
