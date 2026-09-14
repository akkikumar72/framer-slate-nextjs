import { BlogGrid } from '@/components/collections/grids';
import { PageIntro } from '@/components/shared';
import { hulioMetadata } from '@/lib/metadata';
import styles from '@/components/collections/collections.module.css';

export const metadata = hulioMetadata('Blog', '/hulio/blog');
export default function BlogPage() {
  return <div className={styles.blogIndex}>
    <PageIntro title="The latest blog from us." description="We’re a group of passionate designers, developers, and strategists, together, we turn ideas into impactful digital experiences." />
    <section className={`container ${styles.indexGrid}`} aria-label="Latest articles"><BlogGrid loadMore /></section>
  </div>;
}
