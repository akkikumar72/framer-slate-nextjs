import { PageIntro } from '@/components/shared';
import { hulioMetadata } from '@/lib/metadata';
import styles from '@/components/inner/inner.module.css';

export const metadata = hulioMetadata('Privacy Policy', '/hulio/privacy-policy');

export default function PrivacyPolicyPage() {
  return <div className={styles.policyPage}>
    <PageIntro title="Privacy Policy" description="How we collect, use, and protect your information to provide a safe, transparent, and personalized experience across all our services" />
    <article className={styles.policy}>
      <section><h2>Last Updated: Sunday, June 12, 2025</h2><p>At Hulio, your privacy matters. When you use our services, we may collect basic information—such as your name, email address, and usage data—to enhance your experience. We never sell your personal data. Any third-party tools we use are carefully vetted to ensure your information remains secure.</p></section>
      <section><h2>1. Information We Collect</h2><p>We collect personal data that you voluntarily provide when you:</p><ul><li>Sign up or create an account</li><li>Contact us through email or forms</li><li>Use our product features and tools</li></ul><p>This may include:</p><ul><li>Name</li><li>Email address</li><li>Company name</li><li>Billing and payment information</li><li>Usage data (e.g., page visits, clicks)</li></ul><p>We also gather non-personal information through cookies and analytics tools to monitor performance and improve functionality.</p></section>
      <section><h2>2. How We Use Your Information</h2><p>Your information is used to:</p><ul><li>Deliver and maintain our services</li><li>Personalize and improve your user experience</li><li>Handle transactions and billing</li><li>Communicate with you (e.g., support, product updates)</li><li>Enhance performance and usability</li><li>Maintain security and prevent fraud</li></ul></section>
      <section><h2>3. Sharing &amp; Disclosure</h2><p>We <strong>do not</strong> sell your personal data.</p><p>We may share information with trusted third-party partners (e.g., hosting providers, analytics services, payment processors) to help us operate our platform. These providers follow strict confidentiality and data protection standards.</p><p>We may also disclose data when required by law or to protect the rights, safety, and property of Meridian or others.</p></section>
      <section><h2>4. Data Retention</h2><p>We retain your data only for as long as needed to fulfill the purposes outlined in this policy or as legally required. You can request deletion of your personal information at any time.</p></section>
      <section><h2>5. Your Rights</h2><p>Depending on your location, you may have rights under laws like the <strong>GDPR</strong> or <strong>CCPA</strong>, including:</p><ul><li>Accessing the personal data we hold about you</li><li>Requesting corrections or deletion</li><li>Withdrawing consent for processing</li><li>Filing a complaint with your local data protection authority</li></ul></section>
      <section><h2>6. Data Security</h2><p>We implement industry-standard security practices, including encryption, secure servers, and continuous monitoring, to safeguard your data against unauthorized access, alteration, or disclosure.</p></section>
      <section><h2>7. Changes to This Policy</h2><p>We may update this privacy policy from time to time. If significant changes occur, we’ll notify you via email or through our website.</p></section>
    </article>
  </div>;
}
