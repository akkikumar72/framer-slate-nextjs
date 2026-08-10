import type { AgentikBlogPost } from "@/components/agentik/shared/content";
import styles from "./AgentikBlog.module.css";

export function PostMeta({ post }: { post: AgentikBlogPost }) {
  return (
    <div className={styles.meta}>
      <span>{post.category}</span>
      <span aria-hidden="true" className={styles.metaDot}>
        •
      </span>
      <span className={styles.author}>
        <img
          alt={`${post.author} profile`}
          height="32"
          src={post.authorImage}
          style={{ objectPosition: post.authorPosition }}
          width="32"
        />
        <span>{post.author}</span>
      </span>
    </div>
  );
}
