import type { Metadata } from "next";

import { BlogCard } from "@/components/saazai/blog/BlogCard";
import styles from "@/components/saazai/blog/Blog.module.css";
import {
  CtaSection,
  GradientText,
  PageHero,
  PatternBand,
} from "@/components/saazai/shared/SaazaiSections";
import { saazaiBlogPosts } from "./blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, practical guides, and product thinking for smarter AI-powered operations.",
  alternates: {
    canonical: "/saazai/blog",
  },
};

export default function SaazaiBlogPage() {
  const featuredPosts = saazaiBlogPosts.slice(0, 3);
  const latestPosts = saazaiBlogPosts.slice(3);

  return (
    <div className={styles.page}>
      <div className={styles.indexHero}>
        <PageHero
          breadcrumb="Home / Blog"
          description="We’re a team of creators, engineers, and thinkers building."
        >
          Insights that drive <GradientText>agents operations</GradientText>
        </PageHero>
      </div>

      <section className={styles.featured}>
        <h2>Featured blogs</h2>
        <div className={styles.featuredGrid}>
          {featuredPosts.map((post) => (
            <BlogCard featured key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <PatternBand />

      <section className={styles.latest}>
        <p className={styles.latestLabel}>✣ &nbsp; Blogs</p>
        <h2>Latest Insights from the road</h2>
        <div className={styles.latestGrid}>
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <PatternBand />
      <CtaSection />
    </div>
  );
}
