import { RiveroPageFrame } from "@/components/rivero/RiveroShell";
import { BlogCard } from "./BlogCard";
import {
  articleExplanation,
  articleIntro,
  articleSections,
  blogCategory,
  blogDate,
  getRelatedPosts,
  type RiveroBlogPost,
} from "./blog-data";
import styles from "./blog.module.css";

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 3v3m10-3v3M4.5 9h15M5 5.5h14a1 1 0 0 1 1 1V20H4V6.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function BlogArticle({ post }: { post: RiveroBlogPost }) {
  const related = getRelatedPosts(post);

  return (
    <RiveroPageFrame>
      <main className={`${styles.page} ${styles.articlePage}`}>
        <article className={styles.article}>
          <div className={styles.articleTop}>
            <div className={styles.articleHeading} data-rivero-reveal="hero">
              <div className={styles.articleMeta}>
                <span>{blogCategory}</span>
                <span><CalendarIcon />{blogDate}</span>
              </div>
              <h1>{post.title}</h1>
            </div>
            <div className={styles.articleHero} data-rivero-reveal="card" style={{ "--rivero-delay": "100ms" } as React.CSSProperties}>
              <img alt="" src={post.image} />
            </div>
          </div>

          <div className={styles.articleBody}>
            <p data-rivero-reveal>{articleIntro}</p>
            {articleSections.map((section, index) => (
              <section data-rivero-reveal key={section}>
                <h2>{section}</h2>
                <p>{articleExplanation}</p>
                {index === 3 ? (
                  <img
                    alt="A bright, modern workspace"
                    className={styles.articleInlineImage}
                    src="/rivero/assets/e68e03fd10f049a6.png"
                  />
                ) : null}
              </section>
            ))}
          </div>
        </article>

        <section className={styles.relatedSection}>
          <div className={styles.relatedContainer}>
            <div className={styles.relatedTitle} data-rivero-reveal>
              <h2>Related articles</h2>
              <p>Our platform is designed to empower businesses of all sizes to work smarter and achieve their goals with confidence.</p>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((relatedPost, index) => (
                <BlogCard delay={index * 80} key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </RiveroPageFrame>
  );
}
