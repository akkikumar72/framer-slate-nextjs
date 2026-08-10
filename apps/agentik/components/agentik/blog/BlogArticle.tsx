import type { AgentikBlogPost } from "@/components/agentik/shared/content";
import { RollingLink } from "@/components/agentik/shared/AgentikShell";
import type {
  AgentikArticleBlock,
  AgentikArticleDocument,
} from "./articleContent";
import { PostMeta } from "./PostMeta";
import styles from "./AgentikBlog.module.css";

function RichParagraph({ block }: { block: Extract<AgentikArticleBlock, { type: "paragraph" }> }) {
  return (
    <p>
      {block.lead ? <strong>{block.lead}</strong> : null}
      {block.lead && block.breakAfterLead ? <br /> : null}
      {block.lead && block.text && !block.breakAfterLead ? " " : null}
      {block.text}
    </p>
  );
}

function RichList({ block }: { block: Extract<AgentikArticleBlock, { type: "list" }> }) {
  const List = block.ordered ? "ol" : "ul";

  return (
    <List>
      {block.items.map((item, index) => (
        <li key={`${item.lead ?? item.text}-${index}`}>
          <p>
            {item.lead ? <strong>{item.lead}</strong> : null}
            {item.lead ? " " : null}
            {item.text}
          </p>
        </li>
      ))}
    </List>
  );
}

function ArticleBlock({ block }: { block: AgentikArticleBlock }) {
  if (block.type === "heading") return <h2>{block.text}</h2>;
  if (block.type === "paragraph") return <RichParagraph block={block} />;
  if (block.type === "list") return <RichList block={block} />;

  return (
    <blockquote>
      {block.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </blockquote>
  );
}

export function AgentikBlogArticle({
  article,
  post,
}: {
  article: AgentikArticleDocument;
  post: AgentikBlogPost;
}) {
  return (
    <div className={styles.detailPage}>
      <section className={styles.detailHero}>
        <div className={styles.detailHeroInner}>
          <RollingLink
            className={styles.backLink}
            href="/blog"
            leadingIcon={<span aria-hidden="true" className={styles.backArrow}>←</span>}
            variant="text"
          >
            Go back
          </RollingLink>
          <div className={styles.detailTitleGroup}>
            <h1 data-agentik-reveal>{post.title}</h1>
            <div data-agentik-reveal>
              <PostMeta post={post} />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.detailCover} data-agentik-reveal>
        <img alt="Blog Cover Image" src={post.cover} />
      </div>

      <section className={styles.articleFrame}>
        <article className={styles.articleBody}>
          {article.blocks.map((block, index) => (
            <ArticleBlock block={block} key={`${block.type}-${index}`} />
          ))}
        </article>
      </section>
    </div>
  );
}
