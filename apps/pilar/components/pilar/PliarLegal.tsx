import type { ReactNode } from "react";
import { PliarFooter, PliarHeader } from "@/components/pilar/PliarShell";
import styles from "./PliarLegal.module.css";

type LegalSection = {
  heading: string;
  body: ReactNode;
};

const privacySections: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    body: "We collect information you provide directly when you create an account or use the Pliar platform, including your name, email address, company name, job title, and billing details. We also collect workflow data — content you create, configure, or process through Pliar — as well as usage data such as log files, workflow run history, feature interactions, and error reports. Technical data including IP address, browser type, operating system, and session identifiers is collected automatically.",
  },
  {
    heading: "2. How We Use Your Information",
    body: "We use your information to provide, operate, and improve the Pliar platform; process transactions and send billing-related communications; authenticate your identity and maintain account security; send product updates, security notices, and service announcements; respond to support requests and resolve technical issues; analyze usage trends and improve platform performance; and comply with legal obligations and enforce our Terms of Service.",
  },
  {
    heading: "3. How We Do Not Use Your Data",
    body: "Your workflow data and the content you process through Pliar is never used to train our AI models or any shared machine learning systems. We do not sell your personal information to third parties. We do not use your data to serve you third-party advertising.",
  },
  {
    heading: "4. Data Sharing and Disclosure",
    body: "We may share your information only with trusted service providers who help us operate the platform — including hosting, payment processing, email delivery, and analytics — under strict data processing agreements. When you connect a third-party tool to Pliar, data flows to that service according to your configuration and the third party's own privacy policy. We may also disclose data when required by law, court order, or to protect the rights, property, or safety of Pliar, our users, or the public. In connection with a merger, acquisition, or sale of assets, your data may transfer to a successor entity.",
  },
  {
    heading: "5. Data Retention",
    body: (
      <>
        We retain your account data for as long as your account is active or as
        needed to provide services. Workflow run logs are retained for 90 days
        by default. You may request earlier deletion at any time by contacting{" "}
        <a href="mailto:privacy@pliar.com">privacy@pliar.com</a>. Billing records
        may be retained longer where required by law.
      </>
    ),
  },
  {
    heading: "6. Security",
    body: "Pliar is SOC 2 Type II certified. We implement encryption in transit (TLS 1.2+) and at rest, role-based access controls, and regular security audits. No system is completely secure; we encourage you to use a strong, unique password and enable two-factor authentication on your account.",
  },
  {
    heading: "7. Your Rights and Choices",
    body: (
      <>
        Depending on your location, you may have the right to access and receive
        a copy of your personal data; correct inaccurate or incomplete
        information; request deletion of your personal data; object to or
        restrict certain processing activities; receive your data in a
        machine-readable format; and withdraw consent where processing is based
        on consent. To exercise any of these rights, contact{" "}
        <a href="mailto:privacy@pliar.com">privacy@pliar.com</a>. We will respond
        within 30 days.
      </>
    ),
  },
  {
    heading: "8. Cookies and Tracking",
    body: "We use strictly necessary cookies to operate the platform and optional analytics cookies to understand how users interact with Pliar. You can disable optional cookies via your browser settings or our in-product cookie preferences. We do not use advertising or cross-site tracking cookies.",
  },
  {
    heading: "9. International Data Transfers",
    body: "Pliar is operated from the United States. If you are accessing the platform from outside the US, your data may be transferred to and processed in the US. Enterprise customers may request data residency in specific cloud regions. We rely on Standard Contractual Clauses for transfers from the EEA, UK, and Switzerland.",
  },
  {
    heading: "10. Children's Privacy",
    body: (
      <>
        Pliar is not directed to individuals under the age of 16. We do not
        knowingly collect personal information from minors. If you believe a
        minor has provided us with personal data, contact{" "}
        <a href="mailto:privacy@pliar.com">privacy@pliar.com</a> and we will
        delete it promptly.
      </>
    ),
  },
  {
    heading: "11. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. We will notify you of material changes by email or by a prominent notice within the platform at least 14 days before the change takes effect. Continued use of Pliar after the effective date constitutes acceptance of the updated policy.",
  },
  {
    heading: "12. Contact Us",
    body: (
      <>
        For privacy-related questions, data requests, or to report a concern,
        contact our Privacy Team at{" "}
        <a href="mailto:privacy@pliar.com">privacy@pliar.com</a>. We aim to
        respond to all inquiries within 5 business days.
      </>
    ),
  },
];

const termsSections: LegalSection[] = [
  {
    heading: "1. Eligibility",
    body: "You must be at least 16 years old and capable of entering a binding contract to use Pliar. If you are using Pliar on behalf of a company, that company must be a validly formed legal entity. We reserve the right to refuse service to anyone for any reason at any time.",
  },
  {
    heading: "2. Your Account",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at security@pliar.com if you suspect unauthorized access. We are not liable for losses resulting from unauthorized use of your account.",
  },
  {
    heading: "3. Acceptable Use",
    body: "You may use Pliar only for lawful purposes and in accordance with these Terms. You agree not to use Pliar to transmit unlawful, harmful, or fraudulent content; violate any applicable law, regulation, or third-party right; attempt to gain unauthorized access to Pliar's systems or other users' accounts; reverse engineer, decompile, or attempt to extract source code from the platform; use Pliar to send unsolicited communications or engage in automated abuse; resell, sublicense, or make the platform available to unauthorized parties; or use Pliar in a manner that could damage, disable, or impair our infrastructure.",
  },
  {
    heading: "4. Plans, Billing, and Payment",
    body: "Pliar offers free and paid subscription plans. Paid plans are billed in advance on a monthly or annual cycle. All fees are non-refundable except as required by law or as stated in our Refund Policy. We may change pricing with 30 days' prior notice. Failure to pay may result in suspension or termination of your account.",
  },
  {
    heading: "5. Your Data and Content",
    body: "You retain ownership of all data, content, and materials you submit to Pliar. You grant Pliar a limited, non-exclusive license to process your content solely to provide the services. We will not access your data except to provide or troubleshoot the service, or as required by law. Your data is never used to train Pliar's AI models.",
  },
  {
    heading: "6. Pliar's Intellectual Property",
    body: "All rights, title, and interest in the Pliar platform — including software, designs, logos, and documentation — are owned by Pliar, Inc. or its licensors. These Terms do not grant you any rights to Pliar's intellectual property beyond a limited, non-transferable license to use the platform during your subscription.",
  },
  {
    heading: "7. Third-Party Integrations",
    body: "Pliar allows you to connect third-party services. Your use of those services is governed by the respective third party's terms and privacy policies. We are not responsible for the availability, accuracy, or conduct of any third-party service. You are solely responsible for the integrations you configure and the data you transmit through them.",
  },
  {
    heading: "8. Uptime and Service Level",
    body: "We target 99.9% monthly uptime for paid plans. Scheduled maintenance will be announced in advance where possible. Enterprise customers may be covered by a separate Service Level Agreement. Our sole obligation for downtime is a pro-rata service credit for verified outages exceeding the monthly commitment, or as described in the applicable SLA.",
  },
  {
    heading: "9. Disclaimer of Warranties",
    body: 'Pliar is provided "as is" and "as available" without warranty of any kind. To the maximum extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the platform will be error-free, uninterrupted, or free of harmful components.',
  },
  {
    heading: "10. Limitation of Liability",
    body: "To the fullest extent permitted by law, Pliar's total liability to you for any claim arising from or related to these Terms or the platform shall not exceed the greater of (a) the amount you paid to Pliar in the 12 months preceding the claim, or (b) $100 USD. In no event shall Pliar be liable for indirect, incidental, special, consequential, or punitive damages, even if advised of the possibility of such damages.",
  },
  {
    heading: "11. Indemnification",
    body: "You agree to indemnify and hold harmless Pliar, its officers, directors, employees, and agents from any claims, damages, losses, or expenses — including reasonable attorneys' fees — arising from your use of the platform, your violation of these Terms, or your infringement of any third-party rights.",
  },
  {
    heading: "12. Term and Termination",
    body: "These Terms remain in effect while you have an active account. Either party may terminate at any time. You may cancel through your account settings. We may suspend or terminate your account immediately if you breach these Terms. Upon termination, your right to use Pliar ceases and we may delete your data after a 30-day grace period, except where retention is required by law.",
  },
  {
    heading: "13. Governing Law and Disputes",
    body: "These Terms are governed by the laws of the State of Delaware, without regard to conflict of law provisions. Any dispute arising from these Terms shall first be addressed through good-faith negotiation. If unresolved, disputes shall be submitted to binding arbitration in Delaware under the rules of the American Arbitration Association. You waive any right to participate in a class action.",
  },
  {
    heading: "14. Changes to These Terms",
    body: "We may update these Terms at any time. For material changes, we will provide at least 14 days' notice by email or in-platform notification. Continued use after the effective date constitutes acceptance. If you do not agree to the updated Terms, you must stop using the platform and close your account before the effective date.",
  },
  {
    heading: "15. Contact Us",
    body: (
      <>
        For questions about these Terms, contact our Legal Team at{" "}
        <a href="mailto:legal@pliar.com">legal@pliar.com</a>. We aim to respond
        to all inquiries within 5 business days.
      </>
    ),
  },
];

const termsIntro =
  "These Terms of Service govern your access to and use of the Pliar platform and related services provided by Pliar, Inc. By creating an account or using Pliar, you agree to be bound by these Terms. If you are using Pliar on behalf of an organization, you represent that you have authority to bind that organization.";

export function PliarLegal({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";
  const sections = isPrivacy ? privacySections : termsSections;

  return (
    <div className={styles.page}>
      <PliarHeader />
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.eyebrowIcon}>
              <svg viewBox="0 0 24 24">
                <path d="M12.73 12.73 10.45 19a.75.75 0 0 1-1.41 0l-2.28-6.27-6.27-2.28a.75.75 0 0 1 0-1.41l6.27-2.28L9.05.49a.75.75 0 0 1 1.41 0l2.28 6.27 6.27 2.28a.75.75 0 0 1 0 1.41Z" />
              </svg>
            </span>
            <span>Legal</span>
          </div>
          <h1>{title}</h1>
          <p className={styles.updated}>Last updated: January 1, 2026</p>
        </header>

        <div className={styles.contentWrapper}>
          <article className={styles.article}>
            {!isPrivacy ? <p className={styles.intro}>{termsIntro}</p> : null}
            {sections.map((section) => (
              <section className={styles.section} key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </article>
        </div>
      </main>
      <PliarFooter />
    </div>
  );
}
