import { asset } from "@/lib/site";
import { Button } from "./shared";
import styles from "./not-found.module.css";

export function NotFoundPage() {
  return <main className={`orb-container ${styles.page}`}>
    <div className={styles.title}>
      <div className={styles.copy}>
        <h1>Sorry! Page Not Found</h1>
        <p>The page you are looking for doesn&apos;t exist or has been moved.</p>
      </div>
      <Button className={styles.button} href="/orbital">Back to Homepage</Button>
    </div>
    <div className={styles.illustration}>
      <img src={asset("5PKfVRFMSLFgSu5yCeABpfCtpc")} alt="" width="2716" height="828" />
    </div>
  </main>;
}
