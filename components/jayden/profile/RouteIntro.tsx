import { ArrowLink, DotsDivider, GridSection, SectionLabel } from "../shared/JaydenSections";
import { jaydenAssets } from "../shared/assets";
import styles from "./RouteIntro.module.css";

type RouteIntroProps = {
  eyebrow: string;
  kicker?: string;
  tall?: boolean;
  title: [string, string];
};

export function RouteIntro({ eyebrow, kicker, tall = false, title }: RouteIntroProps) {
  return (
    <GridSection className={styles.masthead}>
      <div
        className={`${styles.mastheadContent} ${tall ? styles.mastheadTall : ""} ${
          kicker ? styles.withKicker : styles.withoutKicker
        }`}
      >
        <SectionLabel>{eyebrow}</SectionLabel>

        <div className={styles.note}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" aria-hidden="true" src={jaydenAssets.workBackdrop} />
          <p>Every pixel tells a story, every line of code gives it life.</p>
        </div>

        <div className={styles.titleBlock}>
          {kicker ? <span>{kicker}</span> : null}
          <h1 aria-label={title.join(" ")}>
            <b>{title[0]}</b>
            <b>{title[1]}</b>
          </h1>
        </div>

        <ArrowLink href="/jayden/contact" light>
          Get Started
        </ArrowLink>
      </div>
      <DotsDivider />
    </GridSection>
  );
}
