import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, CategoryBadge, RelatedArticles } from '@/components/blog';
import styles from './page.module.css';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  return {
    title: { absolute: `${article.title} - Alytics - The Perfect Saas Template` },
    description: article.metaDescription,
    alternates: { canonical: `/alytics/blog/${slug}` },
    openGraph: { title: `${article.title} - Alytics - The Perfect Saas Template`, description: article.metaDescription, images: ['/alytics/9OPN2cebX01z72lPtIMJjOjP9Xk.png'], type: 'article' },
    twitter: { card: 'summary_large_image', title: `${article.title} - Alytics - The Perfect Saas Template`, description: article.metaDescription, images: ['/alytics/9OPN2cebX01z72lPtIMJjOjP9Xk.png'] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  return <main id="main-content">
    <article className={styles.article}>
      <header>
        <div className={styles.toolbar}>
          <Link href="/alytics/blog" className={styles.back}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 6-6 6 6 6M8 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Back</Link>
          <CategoryBadge>{article.category}</CategoryBadge>
        </div>
        <h1>{article.title}</h1>
        <p className={styles.description}>{article.description}</p>
        <p className={styles.readTime}>{article.readTime}</p>
      </header>
      <img className={styles.heroImage} src={article.image} alt={article.imageAlt} width={1200} height={840} />
      <div className={styles.prose}>
        <p>{article.intro}</p>
        {article.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
      </div>
    </article>
    <RelatedArticles excludeSlug={article.slug} />
  </main>;
}
