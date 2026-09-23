import { QuoteMark } from "./QuoteMark";
import { asset } from "../lib/assets";
import {
  caseStudies,
  type CaseStudyKind,
  type CaseStudySection,
} from "../lib/case-studies";
import styles from "./CaseStudy.module.css";

type CaseStudyProps = {
  kind: CaseStudyKind;
};

function ProjectImage({
  name,
  className,
  objectPosition,
}: {
  name: string;
  className: string;
  objectPosition?: string;
}) {
  return (
    <img
      className={className}
      src={asset(name)}
      alt=""
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}

function ContentSection({ section }: { section: CaseStudySection }) {
  const imageGroupClass =
    section.imageLayout === "pair" ? styles.imagePair : styles.imageStack;

  return (
    <section className={styles.section}>
      <div className={styles.sectionCopy}>
        <h2>{section.title}</h2>
        <p>{section.copy}</p>
      </div>
      <div className={imageGroupClass}>
        {section.images.map((image) => (
          <ProjectImage
            key={image}
            name={image}
            className={
              section.imageLayout === "pair"
                ? styles.pairImage
                : styles.wideImage
            }
          />
        ))}
      </div>
    </section>
  );
}

export function CaseStudy({ kind }: CaseStudyProps) {
  const study = caseStudies[kind];

  return (
    <article className={styles.caseStudy}>
      <div className={styles.hero}>
        <ProjectImage
          name={study.heroImage}
          className={styles.heroImage}
          objectPosition={study.heroPosition}
        />
      </div>

      <div className={styles.body}>
        <section className={styles.intro}>
          <div className={styles.introCopy}>
            <h1 id="gridfolio-dialog-title">{study.title}</h1>
            <p>{study.summary}</p>
          </div>
          <ProjectImage name={study.leadImage} className={styles.wideImage} />
        </section>

        {study.sections.map((section) => (
          <ContentSection key={section.title} section={section} />
        ))}

        <section className={styles.review}>
          <h2>Review</h2>
          <div className={styles.quote}>
            <QuoteMark className={styles.quoteMark} />
            <p className={styles.reviewCopy}>{study.review}</p>
            <p className={styles.reviewer}>{study.reviewer}</p>
          </div>
        </section>
      </div>
    </article>
  );
}
