import { RiveroButton, RiveroPageFrame } from "@/components/rivero/RiveroShell";
import styles from "@/components/rivero/routes/static/RiveroStaticPages.module.css";

export function RiveroNotFoundPage() {
  return (
    <RiveroPageFrame>
      <main className={styles.lightPage}>
        <section className={styles.notFound}>
          <img
            alt="404 Image"
            src="/rivero/assets/f5b98463cf9909a4.png"
          />
          <p>Page you’er Looking For Is Not Found!</p>
          <RiveroButton href="/">Return to The Website</RiveroButton>
        </section>
      </main>
    </RiveroPageFrame>
  );
}
