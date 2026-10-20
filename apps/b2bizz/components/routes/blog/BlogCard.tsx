import Link from "next/link";
import { asset, B2_PREFIX } from "@/lib/site-data";
import type { Article } from "./blog-data";
import styles from "./Blog.module.css";

export function BlogMeta({ article, hero = false }: { article: Article; hero?: boolean }) {
  return <div className={`${styles.meta} ${hero ? styles.heroMeta : ""}`}><span>{article.category}</span><time dateTime={`2026-01-${article.date.match(/Jan (\d+)/)?.[1].padStart(2, "0")}`}>{article.date}</time></div>;
}

export function BlogCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return <Link data-blog-reveal className={`${styles.card} ${featured ? styles.featured : ""}`} href={`${B2_PREFIX}/blog/${article.slug}`}>
    <div className={styles.cardMedia}><img alt={article.title} src={asset(article.image)} />{featured && <span className={styles.featuredBadge}>Featured Post</span>}</div>
    <div className={styles.cardInfo}><div><BlogMeta article={article} /><h2>{article.title}</h2></div>{featured && <p className={styles.featuredSummary}>{article.summary}</p>}</div>
  </Link>;
}
