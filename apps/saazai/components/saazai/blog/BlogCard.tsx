import Image from "next/image";
import Link from "next/link";

import type { SaazaiBlogPost } from "@/app/blog/blog-data";
import styles from "./Blog.module.css";

export function BlogCard({
  featured = false,
  post,
}: {
  featured?: boolean;
  post: SaazaiBlogPost;
}) {
  return (
    <article className={`${styles.card} ${featured ? styles.featuredCard : ""}`}>
      <Link
        aria-label={`Read ${post.title}`}
        className={styles.imageLink}
        href={`/blog/${post.slug}`}
      >
        <Image
          alt=""
          className={styles.cardImage}
          fill
          sizes={
            featured
              ? "(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 350px"
              : "(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 350px"
          }
          src={post.image}
        />
      </Link>
      {featured ? (
        <p className={styles.cardMeta}>
          <span>{post.category}</span>
          <i aria-hidden="true" />
          <span>
            Posted on <time dateTime={post.dateTime}>{post.date}</time>
          </span>
        </p>
      ) : (
        <p className={styles.cardDate}>
          <span aria-hidden="true">▣</span>{" "}
          <time dateTime={post.dateTime}>{post.date}</time>
        </p>
      )}
      <h3>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
    </article>
  );
}
