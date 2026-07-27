"use client";

import {
  FuelFooter,
  FuelHeader,
  FuelPlus,
  FuelSectionLabel,
  fuelPageClassName,
} from "@/components/fuel/FuelShell";

import type { FuelArticle } from "./articleData";
import {
  fuelStorySections,
  getRelatedFuelArticles,
} from "./articleData";
import { FuelBlogFaq } from "./FuelBlogFaq";
import styles from "./FuelBlogPage.module.css";

export function FuelBlogPage({ article }: { article: FuelArticle }) {
  const relatedArticles = getRelatedFuelArticles(article.slug);

  return (
    <main className={`${fuelPageClassName} ${styles.pageSurface}`}>
      <section aria-labelledby="fuel-article-title" className={styles.hero}>
        <div className={styles.heroReveal}>
          <FuelHeader />
          <article className={styles.heroCard}>
            <img
              alt={article.heroAlt}
              className={styles.heroImage}
              src={article.heroImage}
            />
            <div className={styles.heroShade} />
            <div className={styles.heroCopy}>
              <p className={styles.category}>{article.category}</p>
              <h1 id="fuel-article-title">{article.title}</h1>
              <p className={styles.summary}>{article.summary}</p>
            </div>
            <dl className={styles.heroMeta}>
              <div>
                <dt>Date:</dt>
                <dd>{article.date}</dd>
              </div>
              <div>
                <dt>Author:</dt>
                <dd>{article.author}</dd>
              </div>
            </dl>
            <FuelPlus className={styles.heroPlusOne} />
            <FuelPlus className={styles.heroPlusTwo} />
            <FuelPlus className={styles.heroPlusThree} />
            <FuelPlus className={styles.heroPlusFour} />
          </article>
        </div>
      </section>

      <div className={styles.story}>
        {fuelStorySections.map((section, index) => (
          <section
            className={`${styles.storySection} ${
              styles[`storySection${index + 1}`]
            }`}
            key={section.title}
          >
            <span className={styles.storyNumber}>{section.number}</span>
            <div className={styles.storyContent}>
              <h2>{section.title}</h2>
              <div className={styles.storyCopy}>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            {section.images.length > 0 ? (
              <div
                className={`${styles.storyMedia} ${
                  section.layout === "pair"
                    ? styles.storyMediaPair
                    : styles.storyMediaSingle
                }`}
              >
                {section.images.map((image) => (
                  <img alt={image.alt} key={image.src} src={image.src} />
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>

      <section aria-label="Related articles" className={styles.articles}>
        <FuelSectionLabel number="01" title="Article" />
        <div className={styles.articleGrid}>
          {relatedArticles.map((related) => (
            <a
              className={styles.articleCard}
              href={`/fuel/blog/${related.slug}`}
              key={related.slug}
            >
              <img alt={related.heroAlt} src={related.heroImage} />
              <span className={styles.articleMeta}>
                <span>{related.number}</span>
                <span>
                  <strong>{related.title}</strong>
                  <em>{related.category}</em>
                </span>
                <span>© 2025</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section aria-label="Frequently Asked Questions" className={styles.faq}>
        <FuelSectionLabel number="02" title="Frequently Asked Questions" />
        <FuelBlogFaq />
      </section>

      <FuelFooter />
    </main>
  );
}
