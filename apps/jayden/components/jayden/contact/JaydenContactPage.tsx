import {
  ContactFormSection,
  DotsDivider,
  GridSection,
  RouteMasthead,
} from "@/components/jayden/shared/JaydenSections";
import { jaydenAssets } from "@/components/jayden/shared/assets";
import styles from "./JaydenContactPage.module.css";

const contactMethods = [
  {
    label: "E-mail",
    title: "Start a Project",
    detail: "ridhwanco.dev@gmail.com",
    href: "mailto:ridhwanco.dev@gmail.com",
    image: jaydenAssets.contactMail,
  },
  {
    label: "Phone",
    title: "Let’s Talk",
    detail: "+1 555 123 4567",
    href: "tel:+15551234567",
    image: jaydenAssets.contactPhone,
  },
  {
    label: "Based In",
    title: "Chennai, India",
    detail: "Open for Global Projects",
    image: jaydenAssets.contactLocation,
  },
] as const;

export function JaydenContactPage() {
  return (
    <div className={styles.page}>
      <RouteMasthead
        cta="Get Started"
        ctaHref="/contact#contact"
        eyebrow="Contact Me"
        lead="Every pixel tells a story, every line of code gives it life."
        title={["Something", "Great"]}
      />

      <GridSection className={styles.methodsSection}>
        <div className={styles.methodList}>
          {contactMethods.map((method) => {
            const content = (
              <>
                <div className={styles.methodCopy}>
                  <span className={styles.methodLabel}>
                    <i aria-hidden="true" />
                    {method.label}
                  </span>
                  <div className={styles.methodText}>
                    <h2>{method.title}</h2>
                    <p>{method.detail}</p>
                  </div>
                </div>
                <div className={styles.methodIcon}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" aria-hidden="true" src={method.image} />
                </div>
              </>
            );

            return "href" in method ? (
              <a className={styles.methodCard} href={method.href} key={method.label}>
                {content}
              </a>
            ) : (
              <article className={styles.methodCard} key={method.label}>
                {content}
              </article>
            );
          })}
        </div>
        <DotsDivider />
      </GridSection>

      <div className={styles.formWrap}>
        <ContactFormSection />
      </div>
    </div>
  );
}
