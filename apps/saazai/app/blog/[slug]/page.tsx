import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/saazai/blog/BlogCard";
import styles from "@/components/saazai/blog/Blog.module.css";
import {
  CtaSection,
  PageHero,
  PatternBand,
} from "@/components/saazai/shared/SaazaiSections";
import {
  saazaiBlogPosts,
  saazaiBlogPostsBySlug,
} from "../blog-data";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return saazaiBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = saazaiBlogPostsBySlug[slug];

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function SaazaiBlogDetailPage({
  params,
}: BlogDetailProps) {
  const { slug } = await params;
  const post = saazaiBlogPostsBySlug[slug];

  if (!post) {
    notFound();
  }

  const morePosts = saazaiBlogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className={styles.page}>
      <div className={styles.detailHero}>
        <PageHero
          breadcrumb="Home / Blog Details"
          description="We’re a team of creators, engineers, and thinkers building."
        >
          {post.title}
        </PageHero>
      </div>

      <article className={styles.article}>
        <div className={styles.articleBody}>
          <Image
            alt=""
            className={styles.articleImage}
            height={720}
            priority
            sizes="(max-width: 680px) 100vw, 550px"
            src={post.image}
            width={1200}
          />

          <h2>First of all, what does no-code mean?</h2>
          <p>
            This is basically what you expect to be paid for a day’s work. But
            sometimes it can be hard to find a good point of reference on which
            to base a fair rate. As a website developer, it’s common practice to
            charge an average daily rate.
          </p>
          <p>
            Many freelancers intentionally lower their prices out of fear of
            driving potential clients away, but as a result they miss out on
            excellent professional opportunities.
          </p>

          <h2>Things to have sorted before starting building</h2>
          <p>
            Many freelancers intentionally lower their prices out of fear of
            driving potential clients away, but as a result they miss out on
            excellent professional opportunities.
          </p>

          <h2>Calculate the manage your tasks.</h2>
          <p>
            It’s rare as a freelancer to work for one or more clients for an
            entire month. You’re the boss of your company. As a freelancer,
            it’s common practice to charge an average daily rate.
          </p>
          <ol>
            <li>Create a Shopify account</li>
            <li>Create a Collection for your products in Webflow</li>
            <li>Create a Collections for your products in Webflow</li>
          </ol>

          <Image
            alt="A collaborative product team discussing a project"
            className={styles.articleSecondary}
            height={600}
            sizes="(max-width: 680px) 100vw, 550px"
            src="/saazai/assets/blog-article-secondary.png"
            width={1032}
          />

          <h2>Things to have sorted before starting building</h2>
          <p>
            Many freelancers intentionally lower their prices out of fear of
            driving potential clients away, but as a result they miss out on
            excellent professional opportunities.
          </p>

          <blockquote>
            According to Harvard Business Review, no-code websites perform 31
            percent better than traditionally designed and developed websites.
          </blockquote>

          <h2>Opportunities for learning and growth</h2>
          <p>
            Similarly, time off can be a great opportunity for learning and
            growth. Depending on your priorities, you could use your time to:
          </p>
          <ul>
            <li>Meet new people</li>
            <li>Visit new places</li>
            <li>Develop new skills</li>
          </ul>

          <h2>Conclusions</h2>
          <p>
            Similarly, time off can be a great opportunity for learning and
            growth. Depending on your priorities, you could use your time to:
          </p>

          <div className={styles.authorPanel}>
            <Image
              alt=""
              className={styles.authorImage}
              height={52}
              src="/saazai/assets/author-esther.png"
              width={52}
            />
            <div>
              <h3>{post.author}</h3>
              <p>{post.role}</p>
            </div>
            <div aria-label={`${post.author} social links`} className={styles.socials}>
              <a aria-label="Twitter" href="https://x.com/" rel="noreferrer" target="_blank">
                X
              </a>
              <a aria-label="Facebook" href="https://facebook.com/" rel="noreferrer" target="_blank">
                f
              </a>
              <a aria-label="LinkedIn" href="https://linkedin.com/" rel="noreferrer" target="_blank">
                in
              </a>
            </div>
          </div>

          <Link className={styles.backLink} href="/blog">
            Back To Blog
          </Link>
        </div>

        <aside className={styles.articleAside}>
          <span aria-hidden="true" className={styles.asideIcon}>
            ♙
          </span>
          <h2>Actionable tips from a top developer</h2>
          <p>Get the insight that doubles sales for startups and performance SMBs.</p>
          <Link className={styles.asideButton} href="/contact">
            Get started <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </article>

      <PatternBand />

      <section className={styles.moreBlogs}>
        <p className={styles.latestLabel}>✣ &nbsp; More Blogs</p>
        <h2>More blogs</h2>
        <div className={styles.moreGrid}>
          {morePosts.map((candidate) => (
            <BlogCard key={candidate.slug} post={candidate} />
          ))}
        </div>
      </section>

      <PatternBand />
      <CtaSection />
    </div>
  );
}
