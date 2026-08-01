import Link from "next/link";
import type { CSSProperties } from "react";
import { blogDate, blogLeadSummary, type RiveroBlogPost } from "./blog-data";
import styles from "./blog.module.css";

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 3v3m10-3v3M4.5 9h15M5 5.5h14a1 1 0 0 1 1 1V20H4V6.5a1 1 0 0 1 1-1Zm3 7h3m2 0h3m-8 3h3m2 0h3" />
    </svg>
  );
}

export function BlogCard({
  delay = 0,
  lead = false,
  post,
  secondary = false,
}: {
  delay?: number;
  lead?: boolean;
  post: RiveroBlogPost;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`${styles.card} ${lead ? styles.leadCard : ""} ${secondary ? styles.secondaryCard : ""}`}
      data-rivero-reveal="card"
      href={`/rivero/blog/${post.slug}`}
      style={{ "--rivero-delay": `${delay}ms` } as CSSProperties}
    >
      <span className={styles.cardImage}>
        <img alt="" src={post.image} />
      </span>
      <span className={styles.cardContent}>
        <span className={styles.date}><CalendarIcon />{blogDate}</span>
        <span className={styles.cardTitle}>{post.title}</span>
        {lead ? <span className={styles.summary}>{blogLeadSummary}</span> : null}
        {lead || secondary ? (
          <span className={styles.readMore}>
            <span>Continue Reading</span><span>Continue Reading</span><i aria-hidden="true">↗</i>
          </span>
        ) : null}
      </span>
    </Link>
  );
}
