import { asset } from "@/lib/site-data";
import { articles, type Article } from "./blog-data";
import { BlogCard, BlogMeta } from "./BlogCard";
import { ArticleVideo } from "./ArticleVideo";
import { BlogReveal } from "./BlogReveal";
import styles from "./Blog.module.css";

export function BlogArticle({ article }: { article: Article }) {
  const recent = articles.filter((post) => post.slug !== article.slug).slice(0, 3);
  return <BlogReveal><main className={styles.blog}>
    <section className={styles.articleHero}><div className={styles.articleHeroInner}><div className={styles.articleIntro} data-blog-reveal><BlogMeta article={article} hero /><h1>{article.title}</h1><p>{article.summary}</p></div><img alt={article.title} data-blog-reveal className={styles.heroImage} src={asset(article.hero)} /></div></section>
    <article aria-label={article.title} data-blog-reveal className={styles.articleBody}>{article.blocks.map((block, index) => {
      if (block.type === "list") return <ul key={index}>{block.items?.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</ul>;
      if (block.type === "video") return <ArticleVideo key={index} />;
      if (block.type === "blockquote") return <blockquote key={index}><p>{block.text}</p></blockquote>;
      return <p key={index}>{block.text}</p>;
    })}</article>
    <section aria-labelledby="recent-articles" className={styles.recent}><h2 data-blog-reveal id="recent-articles">Recent articles</h2><div className={styles.grid}>{recent.map((post) => <BlogCard article={post} key={post.slug} />)}</div></section>
  </main></BlogReveal>;
}
