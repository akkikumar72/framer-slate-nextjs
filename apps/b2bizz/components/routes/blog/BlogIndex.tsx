"use client";

import { useState } from "react";
import { articles } from "./blog-data";
import { BlogCard } from "./BlogCard";
import { BlogReveal } from "./BlogReveal";
import styles from "./Blog.module.css";

export function BlogIndex() {
  const [loaded, setLoaded] = useState(false);
  const featured = articles[5];
  const posts = articles.filter((article) => article.slug !== featured.slug);
  return <BlogReveal><main className={styles.blog}>
    <section className={styles.indexHero}><h1 data-blog-reveal>Our blogs</h1></section>
    <section aria-label="Blog articles" className={styles.listing}>
      <div className={styles.grid}><BlogCard article={featured} featured />{posts.slice(0, loaded ? posts.length : 4).map((article) => <BlogCard article={article} key={article.slug} />)}</div>
      <div className={styles.loadMore}><button disabled={loaded} onClick={() => setLoaded(true)} type="button">{loaded ? "That’s everything for now!" : "Load More"}</button><span aria-live="polite" className={styles.srOnly}>{loaded ? "All seven articles are displayed." : ""}</span></div>
    </section>
  </main></BlogReveal>;
}
