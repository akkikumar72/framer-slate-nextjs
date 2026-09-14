import { SectionLabel } from '@/components/shared';
import { ContactForm, FrequentlyAskedQuestions } from '@/components/inner/contact';
import { hulioMetadata } from '@/lib/metadata';
import styles from '@/components/inner/inner.module.css';

export const metadata = hulioMetadata('Contact Us', '/hulio/contact');

export default function ContactPage() {
  return <>
    <section className={`container ${styles.contactSection}`} aria-labelledby="contact-heading">
      <div className={styles.contactHeading}><SectionLabel>Contact with Us</SectionLabel><h1 id="contact-heading">Let’s talk and create something cool together.</h1></div>
      <ContactForm />
    </section>
    <section className={`container ${styles.faqSection}`} aria-labelledby="faq-heading">
      <div className={styles.faqHeading}><SectionLabel>Anything else?</SectionLabel><h2 id="faq-heading">The answers to<br />your questions.</h2></div>
      <FrequentlyAskedQuestions />
    </section>
  </>;
}
