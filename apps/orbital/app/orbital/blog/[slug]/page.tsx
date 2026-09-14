import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "../BlogCard";
import styles from "../blog.module.css";
import { blogPosts, featuredBlogPosts, getBlogPost } from "@/lib/blog";
import { pageMetadata } from "@/lib/site";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return pageMetadata(post.title, `/blog/${post.slug}`, post.excerpt);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main id="hero" className={styles.articlePage}>
      <article className={`orb-container ${styles.articleContainer}`}>
        <Link className={styles.backButton} href="/orbital/blog">
          <span className={styles.backIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M15 18s-6-4.419-6-6 6-6 6-6" />
            </svg>
          </span>
          <span>Back Now</span>
        </Link>

        <header className={styles.articleHeader}>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>

        <div className={styles.articleContent}>
          <div className={styles.heroImageWrap}>
            <img src={post.image} alt={`${post.title} article illustration`} />
          </div>

          <div className={styles.articleMeta}>
            <div className={styles.authorProfile}>
              <img src={post.authorImage} alt={`${post.author} portrait`} />
              <div>
                <p className={styles.authorName}>{post.author}</p>
                <p className={styles.authorRole}>{post.role}</p>
              </div>
            </div>
            <div className={styles.readMeta}>
              <div className={styles.metaItem}>
                <svg aria-hidden="true" viewBox="0 0 14 15">
                  <path d="M3 0a.667.667 0 0 1 .666.667v2a.667.667 0 1 1-1.333 0v-2A.667.667 0 0 1 3 0Zm8 0a.667.667 0 0 1 .666.667v2a.667.667 0 1 1-1.333 0v-2A.667.667 0 0 1 11 0Z" />
                  <path d="M2 1.333h10a2 2 0 0 1 2 2v9.334a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3.333a2 2 0 0 1 2-2Zm-.667 4v7.334c0 .368.299.666.667.666h10a.667.667 0 0 0 .667-.666V5.333H1.333Z" />
                  <path d="M4.333 7.167a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666Zm2.667 0a.833.833 0 1 1 0 1.666 0.833.833 0 0 1 0-1.666Zm2.667 0a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666Zm-5.334 2.666a.833.833 0 1 1 0 1.667.833.833 0 0 1 0-1.667Zm2.667 0A.833.833 0 1 1 7 11.5a.833.833 0 0 1 0-1.667Z" />
                </svg>
                <p>{post.date}</p>
              </div>
              <span className={styles.metaDivider} aria-hidden="true" />
              <div className={styles.metaItem}>
                <svg aria-hidden="true" viewBox="0 0 15 15">
                  <path d="M7.167 0a7.167 7.167 0 1 1 0 14.334A7.167 7.167 0 0 1 7.167 0Zm0 3.834a.667.667 0 0 0-.667.666v2.667c0 .177.07.347.195.472L8.03 8.972a.667.667 0 1 0 .942-.943L7.834 6.891V4.5a.667.667 0 0 0-.667-.666Z" />
                </svg>
                <p>{post.category} · {post.readTime}</p>
              </div>
            </div>
          </div>

          <div className={styles.richText}>
            {post.body.map((block, index) => {
              if (block.type === "heading") return <h3 key={index}>{block.text}</h3>;
              if (block.type === "quote") return <blockquote key={index}>{block.text}</blockquote>;
              if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
              if (block.type === "image") return <img className={styles.detailImage} key={index} src={block.src} alt={block.alt} />;
              return <p key={index}>{block.text}</p>;
            })}
          </div>
        </div>
      </article>

      <section className={styles.keepReading} aria-labelledby="keep-reading-title">
        <div className={`orb-container ${styles.keepReadingInner}`}>
          <h2 id="keep-reading-title">Keep reading</h2>
          <div className={styles.keepReadingGrid}>
            {featuredBlogPosts.map((featured) => <BlogCard key={featured.slug} post={featured} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
