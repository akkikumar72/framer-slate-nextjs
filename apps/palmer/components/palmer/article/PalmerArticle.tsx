import Link from "next/link";

import type { PalmerArticle as PalmerArticleData } from "../data";
import { Eyebrow } from "../shared/PalmerShell";
import styles from "./PalmerArticle.module.css";

type PalmerArticleProps = {
  article: PalmerArticleData;
  nextArticle: PalmerArticleData;
};

const articleCopy: Record<
  string,
  {
    lead: string;
    leadBody: string;
    counterpoint: string;
    counterpointBody: string;
    closing: string;
  }
> = {
  "gregory-lalle": {
    lead: "Space carries emotion.",
    leadBody:
      "Every composition begins before an object enters the frame. Proportion, pause, and contrast create the atmosphere that allows an idea to be felt.",
    counterpoint: "Structure should stay quiet.",
    counterpointBody:
      "A useful system creates rhythm without announcing itself. It keeps the work coherent while leaving enough room for surprise, friction, and personality.",
    closing:
      "The result is not emptiness. It is a deliberate sequence of tension and release, built to remain clear as the experience moves.",
  },
  "clive-willow": {
    lead: "Type is a moving image.",
    leadBody:
      "Scale, pace, and spacing turn language into a visual material. The strongest typography communicates before every word has been read.",
    counterpoint: "Expression needs a system.",
    counterpointBody:
      "Flexible rules let type expand, compress, and respond without losing its voice. Restraint makes the moments of movement more precise.",
    closing:
      "When typography can breathe with the screen, information and atmosphere become the same continuous experience.",
  },
  "raven-claw": {
    lead: "Clarity is an active choice.",
    leadBody:
      "Minimal design is shaped by what remains. Each image, line, and interval must earn its place, giving the essential elements more presence.",
    counterpoint: "Silence can be expressive.",
    counterpointBody:
      "Negative space is not a neutral background. It controls tempo, directs attention, and gives an identity the confidence to avoid unnecessary noise.",
    closing:
      "Reduction works when it sharpens meaning. The final system feels calm because every relationship has been considered.",
  },
  "clay-nicolas": {
    lead: "An archive should feel alive.",
    leadBody:
      "A portfolio is more than a record of finished work. Its sequence, crop, and pacing reveal how a practice thinks and what it chooses to value.",
    counterpoint: "Editorial rhythm creates memory.",
    counterpointBody:
      "Alternating density with stillness allows individual projects to remain distinct while the collection reads as one authored point of view.",
    closing:
      "The best portfolios guide without over-explaining. They create enough structure for each image to arrive with intent.",
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function ArticleImage({
  article,
  className,
  index,
}: {
  article: PalmerArticleData;
  className?: string;
  index: number;
}) {
  const src = article.images[index % article.images.length];

  return (
    <figure className={className}>
      <img
        alt={`${article.title} editorial photograph ${index + 1}`}
        loading={index > 1 ? "lazy" : "eager"}
        src={src}
      />
    </figure>
  );
}

export function PalmerArticle({
  article,
  nextArticle,
}: PalmerArticleProps) {
  const copy = articleCopy[article.slug] ?? articleCopy["raven-claw"];

  return (
    <>
      <article className={styles.article}>
        <header className={styles.intro}>
          <div className={styles.introLead}>
            <h1>{article.title}</h1>
            <p className={styles.excerpt}>{article.excerpt}</p>
            <span className={styles.category}>{article.category}</span>
          </div>

          <dl className={styles.meta}>
            <div>
              <dt>Author</dt>
              <dd>Akihiko</dd>
            </div>
            <div>
              <dt>Read Time</dt>
              <dd>{article.readTime}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{article.location}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>{formatDate(article.date)}</dd>
            </div>
          </dl>
        </header>

        <div className={styles.story}>
          <section className={`${styles.chapter} ${styles.chapterLead}`}>
            <ArticleImage
              article={article}
              className={styles.stickyImage}
              index={0}
            />
            <div className={styles.chapterBody}>
              <ArticleImage
                article={article}
                className={styles.overscanImage}
                index={1}
              />
              <ArticleImage
                article={article}
                className={styles.overscanImage}
                index={2}
              />
              <div className={styles.chapterCopy}>
                <span>01 / Perspective</span>
                <h2>{copy.lead}</h2>
                <p>{copy.leadBody}</p>
              </div>
            </div>
          </section>

          <section
            className={`${styles.chapter} ${styles.chapterReverse} ${styles.chapterCounterpoint}`}
          >
            <ArticleImage
              article={article}
              className={styles.stickyImage}
              index={3}
            />
            <div className={styles.chapterBody}>
              <div className={styles.chapterCopy}>
                <span>02 / Method</span>
                <h2>{copy.counterpoint}</h2>
                <p>{copy.counterpointBody}</p>
              </div>
              <ArticleImage
                article={article}
                className={styles.overscanImage}
                index={4}
              />
            </div>
          </section>

          <section className={styles.finale}>
            <ArticleImage
              article={article}
              className={styles.finaleImage}
              index={5}
            />
            <div className={styles.finaleCopy}>
              <span>03 / Reflection</span>
              <p>{copy.closing}</p>
            </div>
          </section>
        </div>
      </article>

      <MoreArticle article={nextArticle} />
    </>
  );
}

function MoreArticle({ article }: { article: PalmerArticleData }) {
  const repetitions = Array.from({ length: 4 }, (_, index) => index);

  return (
    <section className={styles.more}>
      <Eyebrow index="09">Selected writing</Eyebrow>
      <div className={styles.marquee}>
        <h2 className={styles.marqueeTrack}>
          {repetitions.map((index) => (
            <span aria-hidden={index > 0 ? "true" : undefined} key={index}>
              More Article©
            </span>
          ))}
        </h2>
      </div>

      <Link
        aria-label={`Read ${article.title}`}
        className={styles.moreCard}
        href={`/article/${article.slug}`}
      >
        <img
          alt=""
          aria-hidden="true"
          className={styles.moreBackdrop}
          loading="lazy"
          src={article.images[0]}
        />
        <span className={styles.moreShade} />
        <img
          alt={`${article.title} article`}
          className={styles.moreInset}
          loading="lazy"
          src={article.images.at(-1) ?? article.images[0]}
        />
        <span className={styles.moreMeta}>
          <small>{article.category}</small>
          <strong>{article.title}</strong>
          <small>{article.readTime}</small>
        </span>
      </Link>
    </section>
  );
}
