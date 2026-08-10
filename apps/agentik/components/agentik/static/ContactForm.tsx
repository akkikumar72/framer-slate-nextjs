"use client";

import { type FormEvent, useState } from "react";
import { RollingButton } from "@/components/agentik/shared/AgentikShell";
import styles from "./AgentikStaticPages.module.css";

export function ContactForm() {
  const [validated, setValidated] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setValidated(true);
  }

  return (
    <section className={styles.contactFormSection}>
      <div className={`${styles.rail} ${styles.contactFormRail}`}>
        <form className={styles.contactForm} onInput={() => setValidated(false)} onSubmit={submit}>
          <label className={styles.formField}>
            <span>Name<em>*</em></span>
            <input autoComplete="name" name="Name" placeholder="Bruce Wayne" required type="text" />
          </label>
          <label className={styles.formField}>
            <span>Email<em>*</em></span>
            <input autoComplete="email" name="Email" placeholder="bruce@wayne.enterprises" required type="email" />
          </label>
          <label className={styles.formField}>
            <span>Comapny name</span>
            <input aria-label="Company name" autoComplete="organization" name="Company Name" placeholder="Wayne Enterprises" required type="text" />
          </label>
          <label className={styles.formField}>
            <span>Comapny size</span>
            <select aria-label="Company size" defaultValue="" name="Company Size" required>
              <option disabled value="">Select…</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
          </label>
          <RollingButton className={styles.submitButton} type="submit">
            {validated ? "Validated locally" : "Submit"}
          </RollingButton>
          <p className={styles.visuallyHidden} role="status">
            {validated ? "Your details were validated locally. No information was sent." : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
