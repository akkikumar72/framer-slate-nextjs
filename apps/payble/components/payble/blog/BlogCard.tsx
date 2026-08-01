import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "../blog-data";

export function BlogCard({
  article,
  priority = false,
}: {
  article: BlogArticle;
  priority?: boolean;
}) {
  return (
    <article className="payble-journal-card">
      <Link href={`/blog/${article.slug}`}>
        <span className="payble-journal-card__image">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority={priority}
            sizes="(max-width: 810px) 100vw, 33vw"
          />
        </span>
        <span className="payble-journal-card__meta">
          <time dateTime={article.isoDate}>{article.date}</time>
          <span aria-label={`${article.category}, ${article.readTime}`}>↗</span>
        </span>
        <h2>{article.title}</h2>
      </Link>
    </article>
  );
}
