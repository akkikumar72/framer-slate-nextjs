'use client';

import { useState, type FormEvent } from 'react';
import styles from './inner.module.css';

export const faqs = [
  ['How long does a website project usually take to complete?', 'The duration of a website project typically depends on its complexity. A basic website might take 2–4 weeks, while more advanced ones can take 2–3 months or more. Clear requirements and good communication help speed up the process.'],
  ['How much does a website cost?', 'The cost of a website varies based on design, features, and functionality. A simple site can cost $500–$2,000, while custom or e-commerce sites may range from $3,000 to $10,000 or more. Ongoing maintenance and hosting also add to the total cost.'],
  ['We have a limited budget, will you still work with us?', 'Yes, absolutely! We’re happy to work within your budget and can suggest solutions that fit your needs. Let’s discuss your goals and find the best approach together.'],
  ['Do you outsource any work?', 'No, we don’t outsource our work. All design and development is handled in-house to ensure consistent quality and clear communication. This helps us maintain full control over the project timeline and results.'],
  ['What services or solutions do you offer?', 'We offer a range of services including website design, web development, UI/UX design, and branding. We also provide custom solutions like e-commerce development, admin dashboards, and content management systems.'],
];

export function FrequentlyAskedQuestions() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className={styles.faqList}>{faqs.map(([question, answer], index) => <div className={styles.faq} key={question}>
    <h3><button type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} onClick={() => setOpen(open === index ? null : index)}>
      <span>{question}</span><span className={styles.faqIcon} aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: open === index ? 'rotate(180deg)' : undefined }}><path d="m5 9 7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
    </button></h3>
    <div className={styles.faqAnswer} id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={open !== index}><p>{answer}</p></div>
  </div>)}</div>;
}

export function ContactForm() {
  const [status, setStatus] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Your message has not been sent. This local preview is not connected to a delivery service.');
  }
  return <form className={styles.contactForm} onSubmit={submit} onChange={() => status && setStatus('')}>
    <div className={styles.formRow}>
      <label>Full name<input name="Name" autoComplete="name" placeholder="Jhon Andrio" type="text" required /></label>
      <label>Email Address<input name="Email" autoComplete="email" placeholder="example@yourmail.com" type="email" required /></label>
    </div>
    <div className={styles.formRow}>
      <label>Phone number<input name="Phone" autoComplete="tel" inputMode="tel" placeholder="Enter your phone number" type="text" required /></label>
      <label>How did you hear about us?<select name="Discovery method" required defaultValue="Google Search">{['Google Search', 'Social Media', 'Friend or Family', 'Online Advertisement', 'YouTube'].map(method => <option key={method}>{method}</option>)}</select></label>
    </div>
    <div className={styles.messageField}>
      <label>Type your message<textarea name="Message" placeholder="Tell us about your project" required /></label>
      <button type="submit" className={styles.sendButton}>Send Message</button>
      {status && <p className={styles.formStatus} role="status">{status}</p>}
    </div>
  </form>;
}
