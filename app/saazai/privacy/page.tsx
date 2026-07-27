import type { Metadata } from "next";
import styles from "@/components/saazai/company/company.module.css";
import {
  CtaSection,
  PageHero,
} from "@/components/saazai/shared/SaazaiSections";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Saazai collects, uses, and protects data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero breadcrumb="Last Updated / Jun 12, 2025">
        Privacy policy
      </PageHero>
      <article className={styles.legal}>
        <h2>Information We Collect from All Our Users</h2>
        <p>
          We collect data to operate efficiently and deliver a seamless,
          personalized coding experience. This includes personally identifiable
          information such as your name, email address, and billing information
          when you sign up or subscribe. Additionally, we collect usage data,
          such as IP addresses, device type, browser type, visited pages, clicked
          elements, session durations, and crash reports. Since our product is a
          code editor, we also collect the code or project data you upload or
          create on the platform to ensure editor functionality and user
          experience.
        </p>
        <p>
          This data helps us troubleshoot issues, enhance features, and tailor
          the platform to your needs. We only collect data relevant to your
          interaction with the platform and do not collect unnecessary personal
          information. All data is securely stored and processed in compliance
          with international data laws.
        </p>
        <ul>
          <li>Personal info like name, email, and profile details</li>
          <li>Code or project data shared via the editor</li>
          <li>Device, browser, and usage behavior logs</li>
        </ul>

        <h2>How We Use the Data You Provide</h2>
        <p>
          The data we collect is used to enhance your experience, ensure
          platform stability, and help our AI systems deliver smarter
          suggestions. Your personal data enables us to maintain your account,
          handle subscriptions, and provide essential communications. Usage
          analytics and behavioral patterns help us understand how the platform
          is being used so we can optimize performance and introduce meaningful
          updates. If you’re using our Smart AI Code Editor, real-time
          suggestions and autocomplete features depend on temporary contextual
          data to assist you intelligently.
        </p>
        <p>
          We never use your code for external training or analysis without
          consent. The insights we gain from your interaction with our tools
          help us personalize the platform and make it smarter with every
          session.
        </p>
        <ul>
          <li>Generate personalized AI code suggestions based on interaction</li>
          <li>Optimize platform features using real-time feedback and usage</li>
          <li>Improve stability and prevent unauthorized access</li>
        </ul>

        <h2>Protecting Your Code and Project Data</h2>
        <p>
          Your code is your intellectual property, and protecting it is our
          highest priority. Any code or files uploaded to our platform remain
          strictly private and are never accessible to unauthorized personnel
          or used for model training without explicit permission. All code data
          is encrypted both in transit and at rest using industry-standard
          protocols. You work in isolated and secure execution environments
          designed for privacy, stability, and compliance.
        </p>
        <ul>
          <li>End-to-end encryption for stored and transmitted code</li>
          <li>Private environment for secure code execution</li>
          <li>Code never used to train AI models without consent</li>
        </ul>

        <h2>Sharing Data with Third-Party Service Providers</h2>
        <p>
          We rely on a limited set of trusted third-party services to operate
          essential functions of our platform, such as cloud hosting, payment
          processing, error tracking, and analytics. These providers are
          contractually bound to handle your data in accordance with strict data
          protection agreements and are only given access to the minimum data
          necessary to perform their functions.
        </p>
        <p>
          We do not sell, rent, or otherwise share your personal data with third
          parties for advertising or marketing purposes. Examples of third
          parties may include Google Analytics, Stripe for payment processing,
          and secure cloud providers like AWS or Google Cloud.
        </p>
        <ul>
          <li>End-to-end encryption for stored and transmitted code</li>
          <li>Private environment for secure code execution</li>
          <li>Code never used to train AI models without consent</li>
        </ul>

        <h2>How We Use Cookies and Tracking Tools</h2>
        <p>
          Cookies help personalize your experience and track feature
          performance. We use only essential and analytics cookies. You can
          control your preferences through browser settings or our cookie
          banner.
        </p>
        <ul>
          <li>Session cookies used to remember login and settings</li>
          <li>Analytics cookies improve editor speed and features</li>
          <li>No advertising or marketing tracking without consent</li>
        </ul>

        <h2>Security Practices to Keep Your Data Safe</h2>
        <p>
          We implement strict security measures including data encryption,
          secure authentication, and regular system audits to protect your
          information from unauthorized access or misuse.
        </p>
        <ul>
          <li>SSL/TLS encryption for all transmitted data</li>
          <li>Two-factor authentication to secure user accounts</li>
          <li>Internal access control and staff confidentiality policies</li>
        </ul>

        <h2>Future Changes to This Privacy Policy Document</h2>
        <p>
          We may occasionally update this policy to reflect new features or
          legal requirements. You’ll be notified of significant changes via
          email or dashboard alert.
        </p>
      </article>
      <CtaSection />
    </>
  );
}
