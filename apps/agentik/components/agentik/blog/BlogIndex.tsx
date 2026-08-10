import Link from "next/link";
import type { CSSProperties } from "react";
import { BLOG_POSTS } from "@/components/agentik/shared/content";
import { SectionEyebrow } from "@/components/agentik/shared/AgentikShell";
import { PostMeta } from "./PostMeta";
import styles from "./AgentikBlog.module.css";

const intro =
  "A team of AI specialists helping companies save time, cut costs, and scale, without the complexity.";

export function AgentikBlogIndex() {
  return (
    <div className={styles.indexPage}>
      <section className={styles.indexHero}>
        <div className={styles.indexHeroInner}>
          <SectionEyebrow className={styles.indexEyebrow}>Blog</SectionEyebrow>
          <div className={styles.indexHeroCopy} data-agentik-reveal>
            <h1>We help businesses scale with AI</h1>
            <p>{intro}</p>
          </div>
        </div>
      </section>

      <section aria-label="Agentik insights" className={styles.blogGrid}>
        {BLOG_POSTS.map((post, index) => (
          <Link
            className={styles.blogCard}
            data-agentik-reveal
            href={`/blog/${post.slug}`}
            key={post.slug}
            style={
              {
                "--agentik-reveal-delay": `${(index % 2) * 80}ms`,
              } as CSSProperties
            }
          >
            <span className={styles.cardImage}>
              <img
                alt="Blog Cover Image"
                loading={index < 2 ? "eager" : "lazy"}
                src={post.cover}
              />
            </span>
            <span className={styles.cardCopy}>
              <h2>{post.title}</h2>
              <PostMeta post={post} />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
