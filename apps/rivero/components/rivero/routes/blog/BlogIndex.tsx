import { RiveroPageFrame } from "@/components/rivero/RiveroShell";
import { BlogCard } from "./BlogCard";
import { riveroBlogPosts } from "./blog-data";
import styles from "./blog.module.css";

export function BlogIndex() {
  const featured = riveroBlogPosts.slice(0, 3);
  const recent = riveroBlogPosts.slice(3);

  return (
    <RiveroPageFrame>
      <main className={`${styles.page} ${styles.indexPage}`}>
        <section className={styles.indexHero}>
          <div className={styles.indexContainer}>
            <div className={styles.indexTitle} data-rivero-reveal="hero">
              <h1>Our Blog</h1>
              <p>Discover the latest trends, tips, and strategies in HR payroll, and team management stay informed.</p>
            </div>
            <div className={styles.featuredGrid}>
              <BlogCard lead post={featured[0]} />
              <BlogCard delay={90} post={featured[1]} secondary />
              <BlogCard delay={160} post={featured[2]} secondary />
            </div>
          </div>
        </section>

        <section className={styles.recentSection}>
          <div className={styles.recentContainer}>
            <h2 data-rivero-reveal>Recent News</h2>
            <div className={styles.recentGrid}>
              {recent.map((post, index) => (
                <BlogCard delay={(index % 3) * 70} key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </RiveroPageFrame>
  );
}
