import { PageIntro, TeamGrid } from '@/components/shared';
import { hulioMetadata } from '@/lib/metadata';
import styles from '@/components/inner/inner.module.css';

export const metadata = hulioMetadata('Our Team', '/hulio/team');

export default function TeamPage() {
  return <div className={styles.teamPage}>
    <PageIntro title="Meet Our Creative and Talented Team" description="We’re a group of passionate designers, developers, and strategists, together, we turn ideas into impactful digital experiences." />
    <section className={`container ${styles.teamListing}`} aria-label="Our team"><TeamGrid /></section>
  </div>;
}
