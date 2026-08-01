import Image from "next/image";
import Link from "next/link";
import { DownloadApp, Newsletter } from "../PaybleShared";
import {
  type BlogArticle,
  relatedArticlesFor,
} from "../blog-data";
import { BlogCard } from "./BlogCard";

export function BlogArticlePage({ article }: { article: BlogArticle }) {
  const relatedArticles = relatedArticlesFor(article);

  return (
    <main className="payble-page payble-article-page">
      <article className="payble-article">
        <div className="payble-container">
          <header className="payble-article__header">
            <h1>{article.title}</h1>
          </header>

          <div className="payble-article__cover">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 810px) 100vw, 1184px"
            />
          </div>

          <div className="payble-article__body-layout">
            <div className="payble-article__prose">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h3>{section.heading}</h3>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <aside className="payble-article__byline" aria-label="Article details">
              <div>
                <span>Article by</span>
                <div className="payble-article__author">
                  <Image
                    src={article.authorImage}
                    alt={`${article.author} - ${article.role}`}
                    width={48}
                    height={48}
                  />
                  <div>
                    <strong>{article.author}</strong>
                    <small>{article.role}</small>
                  </div>
                </div>
              </div>
              <div>
                <span>Published on</span>
                <time dateTime={article.isoDate}>{article.date}</time>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section
        className="payble-related"
        aria-labelledby="payble-related-title"
      >
        <div className="payble-container">
          <div className="payble-related__heading">
            <div>
              <h3 id="payble-related-title">Other Articles by</h3>
              <h3>{article.author}</h3>
            </div>
            <Link className="payble-text-link" href="/blog">
              View All Articles <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="payble-journal-grid payble-journal-grid--related">
            {relatedArticles.map((related) => (
              <BlogCard article={related} key={related.slug} />
            ))}
          </div>
        </div>
      </section>

      <DownloadApp />
      <Newsletter />
    </main>
  );
}
