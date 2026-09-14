import type { Metadata } from 'next';
import { articles, blogDescription, BlogCards, CategoryBadge, FeaturedArticle } from '@/components/blog';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Alytics - The Perfect Saas Template' },
  description: articles[0].metaDescription,
  openGraph: { title: 'Alytics - The Perfect Saas Template', description: articles[0].metaDescription, images: ['/alytics/9OPN2cebX01z72lPtIMJjOjP9Xk.png'] },
  twitter: { card: 'summary_large_image', title: 'Alytics - The Perfect Saas Template', description: articles[0].metaDescription, images: ['/alytics/9OPN2cebX01z72lPtIMJjOjP9Xk.png'] },
  alternates: { canonical: '/alytics/blog' },
};

export default function BlogPage() {
  return <main id="main-content" className={styles.page}>
    <div className="container">
      <header className={styles.heading}>
        <CategoryBadge>Blogs</CategoryBadge>
        <h1>Explore Ideas to Grow Your SaaS Smarter</h1>
        <p>{blogDescription}</p>
      </header>
      <div className={styles.collection}>
        <FeaturedArticle article={articles[0]} />
        <BlogCards excludeSlug={articles[0].slug} />
      </div>
    </div>
  </main>;
}
