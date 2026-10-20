import Link from "next/link";
import { B2_PREFIX, asset } from "@/lib/site-data";
import styles from "./StaticPages.module.css";
import { StaticMotion } from "./StaticMotion";

export function ChangelogPage() {
  return <main className={styles.page}>
    <StaticMotion/>
    <section className={styles.utilityHero}><h1>B2bizz changelog</h1><p>Stay up to date with the latest improvements, fixes, and new features.</p></section>
    <section className={styles.changelog}>
      <article><h2>Version 1.1.0</h2><div><section><h3>New Page Added:</h3><ul><li>Home 2</li></ul></section><section><h3>Updates:</h3><ul><li>Added interaction to the service card</li><li>Improved footer subscribe form input focus</li><li>Added CMS field description for better navigation</li></ul></section></div></article>
      <article><h2>Version 1.0.0</h2><div><ul><li>Initial release</li></ul></div></article>
    </section>
  </main>;
}

export function PrivacyPage() {
  return <main className={styles.page}>
    <StaticMotion/>
    <section className={styles.privacyHero}><h1>Privacy policy</h1><p>Last updated: <span>9 months ago</span></p></section>
    <article className={styles.policy}>
      <p>At B2bizz, your privacy is our priority. We are committed to protecting your personal information and ensuring transparency about how we collect, use, and safeguard your data. This Privacy Policy explains our practices regarding your information when you visit our website, use our services, or engage with our digital solutions.</p>
      <h2>Information we collect</h2><p>We collect information to provide better services and enhance your experience. The types of information we may collect include:</p>
      <ul><li>Personal information (e.g., name, email address, phone number) — provided contact requests, or newsletters.</li><li>Project information — details you share with us regarding your brand, business, or project requirements.</li><li>Usage data — such as IP address, browser type, pages visited, and time spent on the site (collected automatically via cookies or analytics tools).</li></ul>
      <h2>How we use your information</h2><p>We use the information we collect to:</p><ul className={styles.policyUses}><li>Respond to your inquiries or project requests</li><li>Provide and improve our services</li><li>Communicate important updates or offers</li><li>Analyse website performance and user behaviour</li><li>Ensure legal compliance and prevent misuse</li></ul>
      <h2>Sharing your information</h2><p>We do not sell or trade your personal data. We may share your information with:</p><ul><li>Trusted third-party service providers (e.g., hosting, analytics, CRM tools) who assist in operating our business</li><li>Law enforcement or government agencies if required by law</li></ul><p>All third-party services comply with applicable data protection laws.</p>
      <h2>Cookies &amp; tracking technologies</h2><p>Our website uses cookies and similar technologies to enhance user experience and gather usage statistics. You can manage or disable cookies in your browser settings.</p>
      <h2>Data security</h2><p>We implement appropriate technical and organizational measures to safeguard your personal data from unauthorized access, alteration, or disclosure.</p>
      <h2>Your rights</h2><p>You have the right to:</p><ul><li>Access or update your personal information</li><li>Request the deletion of your data</li><li>Withdraw consent or opt out of communications</li></ul>
      <h2>Third-party links</h2><p>Our website may contain links to third-party websites. We are not responsible for their content or privacy practices. We encourage you to review their privacy policies before sharing any data.</p>
      <h2>Changes to this policy</h2><p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date. We recommend checking back periodically to stay informed.</p>
      <h2>Contact us</h2><p>If you have any questions about this Privacy Policy or how we handle your data, please <Link href={`${B2_PREFIX}/contact`}>contact us</Link>.</p>
    </article>
  </main>;
}

export function NotFoundPage() {
  return <main className={`${styles.page} ${styles.notFound}`}><div><img alt="Abstract dark landscape" src={asset("AY6PQekAWDMcCklwuXMbqPS9CeE.jpg")}/><div className={styles.notFoundInfo}><h1>404</h1><h2>Page not found</h2><p>The page you are looking for doesn&apos;t exist or has been moved.</p></div><Link className={styles.solidButton} href={B2_PREFIX}>Back to home</Link></div></main>;
}
