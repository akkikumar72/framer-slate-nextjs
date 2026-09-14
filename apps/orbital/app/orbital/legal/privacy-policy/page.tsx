import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import styles from "../legal.module.css";

export const metadata: Metadata = pageMetadata("Privacy Policy", "/legal/privacy-policy");

const sections = [
  ["1. Information We Collect", "We may collect information you provide directly, including your name, email address, account details, payment information, messages, and other information you submit when using our services. We may also collect technical information such as your IP address, browser type, device information, and website usage data."],
  ["2. How We Use Your Information", "We use collected information to provide and improve our services, manage user accounts, process payments, provide customer support, personalize your experience, maintain security, and communicate important updates about our platform."],
  ["3. AI & User Content", "When you use Orbital AI features, you may provide prompts, files, or other content for processing. We use this information to provide the requested AI services and maintain the functionality and security of our platform."],
  ["4. Cookies & Tracking", "We may use cookies and similar technologies to remember preferences, understand how our website is used, analyze performance, and improve your overall experience."],
  ["5. Data Sharing", "We do not sell your personal information. We may share limited information with trusted service providers that help us operate our platform, process payments, provide hosting, analytics, security, or other essential services."],
  ["6. Data Security", "We use reasonable technical and organizational measures to protect your information against unauthorized access, loss, misuse, or disclosure. However, no online service can guarantee complete security."],
  ["7. Third-Party Services", "Orbital AI may integrate with third-party services, APIs, or platforms. These services may collect or process information according to their own privacy policies. We encourage you to review their policies before using them."],
  ["8. Data Retention", "We retain personal information only for as long as reasonably necessary to provide our services, meet legal obligations, resolve disputes, and enforce our agreements."],
  ["9. Your Privacy Rights", "Depending on your location, you may have rights to access, correct, update, or request deletion of your personal information. To make a privacy-related request, please contact us using the information below."],
  ["10. Children's Privacy", "Orbital AI is not intended to knowingly collect personal information from children. If you believe that a child has provided personal information to us, please contact us so we can take appropriate action."],
  ["11. Changes to This Privacy Policy", "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last Updated” date."],
] as const;

export default function PrivacyPolicyPage() {
  return <main className={`${styles.legal} orb-container`}>
    <header className={styles.header}><h1>Privacy Policy</h1><p>Last Updated: August 21, 2026</p></header>
    <div className={styles.content}>
      <p className={styles.intro}>At <strong>Orbital AI</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect information when you visit our website, use our AI platform, or interact with our services.</p>
      {sections.map(([title, copy]) => <section className={styles.section} key={title}><h2>{title}</h2><p>{copy}</p></section>)}
      <section className={styles.section}><h2>12. Contact Us</h2><p>If you have questions about this Privacy Policy or how we handle your information, please contact us at</p><p>Email: <a href="mailto:tanjimislam27@gmail.com">tanjimislam27@gmail.com</a>.</p></section>
    </div>
  </main>;
}
