import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared";
import { blogPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/site";
import { BlogCard } from "./BlogCard";
import styles from "./blog.module.css";

export const metadata: Metadata = pageMetadata(
  "Blog",
  "/blog",
  "Engineering deep-dives, product updates, and field notes from teams shipping agents in production.",
);

export default function BlogPage() {
  return (
    <main className={styles.blogIndex}>
      <div className={`orb-container ${styles.indexContainer}`}>
        <SectionLabel number="01" label="The Orbital Blog" />
        <div className={styles.indexIntro}>
          <h1>Notes on building, connecting, and deploying agents.</h1>
          <p>Engineering deep-dives, product updates, and field notes from teams shipping agents in production.</p>
        </div>
        <div className={styles.indexGrid}>
          {blogPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      </div>
    </main>
  );
}
