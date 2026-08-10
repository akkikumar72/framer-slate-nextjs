"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { DASHFLUENCE_BASE } from "@/components/dashfluence/shared/routes";
import {
  dashfluenceBlogBySlug,
  dashfluenceBlogPosts,
  dashfluenceFeaturedPosts,
  dashfluenceIndexPosts,
  type DashfluenceBlogPost,
} from "./data";
import styles from "./Blog.module.css";

const intro =
  "Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.";

function Tag({ children }: { children: string }) {
  return <span className={styles.tag}>{children}</span>;
}

function EditorialCard({
  compact = false,
  delay = 0,
  post,
}: {
  compact?: boolean;
  delay?: number;
  post: DashfluenceBlogPost;
}) {
  const card = (
    <Link
      className={styles.editorialCard}
      href={`${DASHFLUENCE_BASE}/blog/${post.slug}`}
    >
      <div className={styles.editorialImageWrap}>
        <img alt={post.title} loading="lazy" src={post.heroImage} />
      </div>
      <div className={styles.tags}>
        <Tag>{post.category}</Tag>
        <Tag>{post.role}</Tag>
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
    </Link>
  );

  if (compact) {
    return (
      <div
        className={styles.compactSlot}
        data-dash-reveal="rise"
        style={{ "--dash-delay": `${delay}ms` } as CSSProperties}
      >
        {card}
      </div>
    );
  }

  return (
    <div
      data-dash-reveal="rise"
      style={{ "--dash-delay": `${delay}ms` } as CSSProperties}
    >
      {card}
    </div>
  );
}

function LoadedCard({ post }: { post: DashfluenceBlogPost }) {
  return (
    <div className={`${styles.compactSlot} ${styles.loadedCard}`}>
      <Link className={styles.editorialCard} href={`${DASHFLUENCE_BASE}/blog/${post.slug}`}>
        <div className={styles.editorialImageWrap}>
          <img alt={post.title} loading="lazy" src={post.heroImage} />
        </div>
        <div className={styles.tags}>
          <Tag>{post.category}</Tag>
          <Tag>{post.role}</Tag>
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </Link>
    </div>
  );
}

export function FeaturedBlogCard({
  post,
  secondary = false,
}: {
  post: DashfluenceBlogPost;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`${styles.featuredCard} ${secondary ? styles.featuredCardSecondary : ""}`}
      data-dash-reveal="rise"
      href={`${DASHFLUENCE_BASE}/blog/${post.slug}`}
      style={{ "--dash-delay": secondary ? "90ms" : "0ms" } as CSSProperties}
    >
      <div className={styles.featuredImageWrap}>
        <img alt={post.title} loading="lazy" src={post.heroImage} />
      </div>
      <time dateTime={post.dateIso}>{post.date}</time>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <span className={styles.readMore}>Read Full Blog</span>
    </Link>
  );
}

export function RelatedBlogs({ posts }: { posts: readonly DashfluenceBlogPost[] }) {
  return (
    <section className={styles.featuredSection}>
      <div className={styles.featuredIntro}>
        <div data-dash-reveal="rise">
          <p className={styles.eyebrow}><span aria-hidden="true">⌜</span> Blogs</p>
          <h2>Smart Marketing Tips, Fresh Weekly</h2>
        </div>
        <p className={styles.introCopy} data-dash-reveal="rise">{intro}</p>
      </div>
      <div className={styles.featuredGrid}>
        {posts.slice(0, 2).map((post, index) => (
          <FeaturedBlogCard key={post.slug} post={post} secondary={index === 1} />
        ))}
      </div>
    </section>
  );
}

export function BlogIndex() {
  const [expanded, setExpanded] = useState(false);
  const loadedPostsRef = useRef<HTMLDivElement>(null);
  const primary = dashfluenceIndexPosts
    .slice(0, 2)
    .map((slug) => dashfluenceBlogBySlug[slug]);
  const compact = dashfluenceIndexPosts
    .slice(2)
    .map((slug) => dashfluenceBlogBySlug[slug]);
  const remaining = dashfluenceBlogPosts.filter(
    (item) =>
      !dashfluenceIndexPosts.includes(item.slug as (typeof dashfluenceIndexPosts)[number]) &&
      !dashfluenceFeaturedPosts.includes(item.slug as (typeof dashfluenceFeaturedPosts)[number]),
  );
  const featured = dashfluenceFeaturedPosts.map(
    (slug) => dashfluenceBlogBySlug[slug],
  );

  useEffect(() => {
    if (!expanded) return;
    requestAnimationFrame(() => loadedPostsRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
  }, [expanded]);

  return (
    <div className={styles.page}>
      <section className={styles.indexHero}>
        <h1 data-dash-reveal="rise">Insights, tips &amp; stories</h1>
        <p className={styles.introCopy} data-dash-reveal="rise" style={{ "--dash-delay": "80ms" } as CSSProperties}>{intro}</p>
      </section>

      <section aria-label="Featured insights" className={styles.editorialSection}>
        <div className={styles.primaryGrid}>
          {primary.map((post, index) => (
            <EditorialCard delay={index * 80} key={post.slug} post={post} />
          ))}
        </div>

        <div className={styles.compactGrid}>
          {compact.map((post, index) => (
            <EditorialCard compact delay={(index % 2) * 80} key={post.slug} post={post} />
          ))}
        </div>

        <div
          className={styles.loadMoreGrid}
          hidden={!expanded}
          id="dashfluence-more-posts"
          ref={loadedPostsRef}
        >
          {expanded
            ? remaining.map((post) => <LoadedCard key={post.slug} post={post} />)
            : null}
        </div>

        {!expanded ? <button aria-controls="dashfluence-more-posts" aria-expanded="false" className={styles.loadMore} onClick={() => setExpanded(true)} type="button">Load More</button> : null}
      </section>

      <RelatedBlogs posts={featured} />
    </div>
  );
}
