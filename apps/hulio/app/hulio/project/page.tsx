import { ProjectGrid } from '@/components/collections/grids';
import { PageIntro } from '@/components/shared';
import { hulioMetadata } from '@/lib/metadata';
import styles from '@/components/collections/collections.module.css';

export const metadata = hulioMetadata('Projects', '/hulio/project');
export default function ProjectPage() {
  return <div className={styles.projectIndex}>
    <PageIntro title="Creative Work with Real World Results" description="Explore our portfolio of projects that showcase our creativity, expertise, and passion for delivering impactful solutions." />
    <section className={`container ${styles.indexGrid}`} aria-label="Our projects"><ProjectGrid loadMore /></section>
  </div>;
}
