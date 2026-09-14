import { Reveal } from '@/components/shared';
import { articles, blogDescription, type Article } from './data';
import { BlogCardLink, BlogImage, ViewAllLink } from './motion';
import styles from './blog.module.css';

export { articles, blogDescription } from './data';

export function CategoryBadge({ children }: { children: React.ReactNode }) {
  return <span className={styles.category}>{children}</span>;
}

export function BlogCard({ article }: { article: Article }) {
  return (
    <BlogCardLink href={`/alytics/blog/${article.slug}`} className={styles.card}>
      <div className={styles.cardImage}>
        <BlogImage src={article.image} alt={article.imageAlt} />
        <CategoryBadge>{article.category}</CategoryBadge>
      </div>
      <div className={styles.cardContent}>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </div>
    </BlogCardLink>
  );
}

export function BlogCards({ excludeSlug, limit = 3, className = '', reveal = false }: { excludeSlug?: string; limit?: number; className?: string; reveal?: boolean }) {
  return <div className={`${styles.grid} ${className}`}>{articles.filter(article => article.slug !== excludeSlug).slice(0, limit).map(article => reveal
    ? <Reveal key={article.slug} className={styles.cardReveal} y={60} delay={0.2} threshold={0.5}><BlogCard article={article} /></Reveal>
    : <BlogCard key={article.slug} article={article} />)}</div>;
}

export function FeaturedArticle({ article }: { article: Article }) {
  return <>
    <BlogCardLink className={styles.featured} href={`/alytics/blog/${article.slug}`}>
      <div className={styles.featuredImage}><BlogImage src={article.image} alt={article.imageAlt} /></div>
      <div className={styles.featuredContent}>
        <div><CategoryBadge>{article.category}</CategoryBadge><h2>{article.title}</h2><p>{article.description}</p></div>
        <span className={styles.readTime}>{article.readTime}</span>
      </div>
    </BlogCardLink>
    <div className={styles.mobileFeatured}><BlogCard article={article} /></div>
  </>;
}

export function BlogPreview() {
  return <div className={styles.collection}>
    <Reveal y={60} delay={0.4} threshold={0}><FeaturedArticle article={articles[0]} /></Reveal>
    <BlogCards excludeSlug={articles[0].slug} reveal />
    <div className={styles.viewAll}><ViewAllLink /></div>
  </div>;
}

export function RelatedArticles({ excludeSlug }: { excludeSlug: string }) {
  return <section className={styles.related}>
    <div className="container">
      <div className={styles.relatedHeading}><h2>View more articles</h2><p>{blogDescription}</p></div>
      <BlogCards excludeSlug={excludeSlug} />
    </div>
  </section>;
}
