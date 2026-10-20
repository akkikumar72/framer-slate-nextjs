import Link from "next/link";
import { B2_PREFIX, asset } from "@/lib/site-data";
import styles from "./ConsultationCta.module.css";

export function ConsultationCta({
  title = "Is your B2B business ready for the next level?",
  button = "Book a free call",
  reveal = false,
}: {
  title?: string;
  button?: string;
  reveal?: boolean;
}) {
  return (
    <section className={styles.cta} data-b2-reveal={reveal ? "cta" : undefined}>
      <div className={styles.copy}>
        <h2>{title}</h2>
        <Link href={`${B2_PREFIX}/contact`}><img alt="" aria-hidden="true" src={asset("button-arrow.svg")} /><span>{button}</span></Link>
      </div>
      <div className={styles.media}>
        <img alt="Abstract consulting workspace" src={asset("cta-background.jpg")} />
      </div>
      <Link className={styles.option} href={`${B2_PREFIX}/contact`}><img alt="" src={asset("FNXmFBsR2D4C0k2feNCZLAs3q5s.svg")} /><span><b>Time to level up your B2B game?</b>Contact now</span><i aria-hidden="true"><img alt="" src={asset("MhAEp2N1wwDuRfYGNfI0npA9N8.svg")} /></i></Link>
      <Link className={styles.option} href={`${B2_PREFIX}/about#team`}><img alt="" src={asset("R1XsGA4fBWxao88g7o1D35jw.svg")} /><span><b>Need expert help to scale fast?</b>Contact our experts</span><i aria-hidden="true"><img alt="" src={asset("MhAEp2N1wwDuRfYGNfI0npA9N8.svg")} /></i></Link>
    </section>
  );
}
