import { jaydenProjects } from "@/components/jayden/shared/assets";
import {
  ContactFormSection,
  DotsDivider,
  FaqSection,
  GridSection,
  PricingSection,
  RouteMasthead,
  WorkProcess,
} from "@/components/jayden/shared/JaydenSections";
import { ProjectCards } from "./ProjectCards";
import styles from "./WorkIndex.module.css";

export function WorkIndex() {
  return (
    <div className={styles.page}>
      <RouteMasthead
        eyebrow="Works"
        lead="Every pixel tells a story, every line of code gives it life."
        title={["CREATIVE", "VAULT"]}
      />
      <GridSection className={styles.showcase}>
        <ProjectCards projects={jaydenProjects} />
        <DotsDivider />
      </GridSection>
      <WorkProcess />
      <PricingSection />
      <FaqSection />
      <ContactFormSection />
    </div>
  );
}
