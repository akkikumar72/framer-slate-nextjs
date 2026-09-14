import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import styles from "./blog.module.css";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link className={styles.card} href={`/orbital/blog/${post.slug}#hero`}>
      <div className={styles.cardImageWrap}>
        <img className={styles.cardImage} src={post.image} alt={`${post.title} article illustration`} />
      </div>
      <div className={styles.cardCopy}>
        <p className={styles.cardEyebrow}>{post.category} · {post.readTime}</p>
        <div className={styles.cardHeading}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      </div>
      <div className={styles.cardAuthor}>
        <img src={post.authorImage} alt={`${post.author} portrait`} />
        <p>{post.author}</p>
        <span aria-hidden="true" />
        <p>{post.date}</p>
      </div>
    </Link>
  );
}
