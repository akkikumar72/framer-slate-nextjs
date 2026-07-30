import Link from "next/link";
import type { CSSProperties } from "react";

import { palmerAsset } from "../assets";
import shellStyles from "../shared/PalmerShell.module.css";
import styles from "./PalmerStaticPages.module.css";

const lostMedia = [
  "rmeBLxZhEpvUaEnrIirzHJQynwc.png",
  "D5DNZqI6mcEFCYSZWhnmUO1zKY.png",
  "7uG4BhwVaiwETVmXbIX3b81RuRw.png",
  "3E2J9orCMTWzLWz1Wycx5lBwyAo.png",
  "YxK2kyMSXDwqtlKpiPq0jLJ9o.png",
  "6r6tLlKin4YdRCER0gZK7UJpWI.png",
  "OAptuWFNfA2ykYxM7NRYIeUI3Xc.png",
  "7WVAcnCw5jrTdcET3CmMrpU7gf0.png",
  "svmMd86RbsKfib7KzvpKAUsHrk.png",
  "cbnxN8O3gBHbXDKR01AwSLGUGXo.png",
].map(palmerAsset);

export function PalmerNotFound() {
  return (
    <section className={styles.notFound}>
      <div className={styles.notFoundSticky}>
        <div className={shellStyles.eyebrow}>
          <span>(404)</span>
          <p>Lost page</p>
        </div>
        <div className={styles.notFoundTitle}>
          <h1>
            Page
            <br />
            Not Found.
          </h1>
          <Link href="/">Go Home ↗</Link>
        </div>
        <div aria-hidden="true" className={styles.lostField}>
          {lostMedia.map((src, index) => (
            <img
              alt=""
              key={src}
              loading="lazy"
              src={src}
              style={{ "--index": index } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
