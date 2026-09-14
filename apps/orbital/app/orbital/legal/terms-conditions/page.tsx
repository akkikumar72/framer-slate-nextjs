import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import styles from "../legal.module.css";

export const metadata: Metadata = pageMetadata("Terms & Conditions", "/legal/terms-conditions");

const sections = [
  ["1. Use of Our Services", "You may use Orbital AI only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the security of your account and for all activities carried out through your account."],
  ["2. AI Services", "Orbital AI provides AI-powered tools and features designed to assist users with various tasks. AI-generated responses may not always be accurate, complete, or suitable for every purpose. You should review and verify important information before relying on it."],
  ["3. User Content", "You may submit prompts, files, text, and other content while using our services. You are responsible for ensuring that you have the necessary rights and permissions to submit such content and that it does not violate applicable laws or third-party rights."],
  ["4. Prohibited Use", "You agree not to misuse our services, attempt to gain unauthorized access, interfere with platform security, distribute harmful content, or use Orbital AI for unlawful activities."],
  ["5. Accounts", "Some features may require you to create an account. You are responsible for providing accurate information and keeping your login credentials secure. We reserve the right to suspend or terminate accounts that violate these Terms."],
  ["6. Payments & Subscriptions", "Certain Orbital AI features may require a paid subscription or other fees. Prices, plans, billing periods, and available features may change from time to time. Subscription charges are handled according to the applicable billing and refund terms."],
  ["7. Intellectual Property", "All platform content, including software, branding, graphics, text, designs, and logos, belongs to Orbital AI or its licensors. You may not copy, modify, distribute, or reproduce our intellectual property without prior permission."],
  ["8. AI-Generated Content", "AI-generated content is provided for informational and assistive purposes. Orbital AI does not guarantee that generated content will always be accurate, original, or free from errors. You are responsible for reviewing content before using it."],
  ["9. Third-Party Services", "Our platform may integrate with third-party tools, APIs, or services. Your use of those services may be subject to their own terms and policies. Orbital AI is not responsible for third-party services outside our control."],
  ["10. Service Availability", "We aim to keep Orbital AI available and reliable, but we do not guarantee uninterrupted or error-free access. Services may occasionally be unavailable due to maintenance, updates, technical issues, or circumstances beyond our control."],
  ["11. Limitation of Liability", "To the extent permitted by applicable law, Orbital AI will not be liable for indirect, incidental, or consequential losses resulting from your use of, or inability to use, our services."],
  ["12. Termination", "We may suspend or terminate access to our services if you violate these Terms or misuse the platform. You may stop using our services at any time, subject to any applicable subscription or billing obligations."],
  ["13. Changes to These Terms", "We may update these Terms & Conditions from time to time. Changes will be posted on this page with an updated “Last Updated” date. Your continued use of the services after changes are posted constitutes acceptance of the updated Terms."],
] as const;

export default function TermsConditionsPage() {
  return <main className={`${styles.legal} orb-container`}>
    <header className={styles.header}><h1>Terms &amp; Conditions</h1><p>Last Updated: August 21, 2026</p></header>
    <div className={styles.content}>
      <p className={styles.intro}>Welcome to Orbital AI. By accessing our website or using our AI platform and services, you agree to these Terms &amp; Conditions. Please read them carefully before using our services.</p>
      {sections.map(([title, copy]) => <section className={styles.section} key={title}><h2>{title}</h2><p>{copy}</p></section>)}
      <section className={styles.section}><h2>14. Contact Us</h2><p>If you have any questions about these Terms &amp; Conditions, please contact us at.</p><p>Email: <a href="mailto:tanjimislam27@gmail.com">tanjimislam27@gmail.com</a>.</p></section>
    </div>
  </main>;
}
