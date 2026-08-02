import Link from "next/link";
import { type CSSProperties } from "react";
import { DASHFLUENCE_BASE } from "@/components/dashfluence/shared/routes";
import { FeaturedBlogCard } from "./BlogIndex";
import {
  dashfluenceBlogBySlug,
  type DashfluenceBlogPost,
} from "./data";
import styles from "./Blog.module.css";

const intro =
  "Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.";

const articleSections = [
  {
    heading:
      "Understanding the Importance of Social Media Growth in Today’s Digital Landscape",
    copy:
      "In today’s hyper-connected world, social media is not just a channel—it’s the heartbeat of brand visibility and customer engagement. Growing your social media presence is essential for building relationships with your audience, fostering brand loyalty, and driving business growth. However, mastering social media growth goes beyond simply accumulating followers or posting regularly. It requires a strategic, data-informed approach that aligns with your brand values and business objectives. By developing a deep understanding of your audience, crafting compelling content, and leveraging the right platforms, you can turn social media into a powerful engine for sustainable growth.",
  },
  {
    heading: "Building an Authentic and Engaged Community That Converts",
    copy:
      "One of the most critical aspects of social media growth is cultivating an authentic community. Instead of focusing solely on vanity metrics like follower count, aim to foster meaningful interactions and genuine connections with your audience. Authenticity breeds trust, which in turn nurtures loyalty and advocacy. Engage with your followers by responding to comments, asking questions, and encouraging user-generated content. Additionally, leveraging tools like polls, live videos, and stories can humanize your brand and create a dynamic two-way communication channel. As your community grows organically and becomes more engaged, you’ll notice higher conversion rates and a stronger brand presence in your niche.",
  },
  {
    heading: "Crafting Consistent, Value-Driven Content That Resonates",
    copy:
      "Content is the foundation of social media growth. Creating consistent, high-quality, and value-driven content tailored to your audience’s interests and needs is paramount. This involves a mix of educational, entertaining, and promotional posts that inspire action while staying true to your brand’s voice. Use analytics to identify what types of content perform best—whether that’s video tutorials, behind-the-scenes glimpses, or customer testimonials—and optimize your content strategy accordingly. Additionally, incorporating storytelling techniques can make your posts more relatable and memorable, helping your brand stand out in crowded feeds and foster deeper emotional connections.",
  },
] as const;

const serviceCopy =
  "Leave a lasting impression. From concept to creation, we ensure your brand visually communicates exactly who you are. Your brand is more than just a logo — it’s the story, emotion, and promise you deliver to your audience. With our Brand Identity & Visual Design service, we craft designs that connect deeply, inspire trust, and leave a lasting impression.";

export function BlogDetail({ post }: { post: DashfluenceBlogPost }) {
  const recommendations = [
    dashfluenceBlogBySlug["how-to-create-scroll-stopping-ads"],
    dashfluenceBlogBySlug["mastering-social-media-growth"],
  ].filter((item) => item.slug !== post.slug);

  if (recommendations.length < 2) {
    recommendations.push(dashfluenceBlogBySlug["seo-in-2025-what-still-works"]);
  }

  return (
    <div className={styles.page}>
      <section className={styles.detailHero}>
        <h1 data-dash-reveal="rise">{post.title}</h1>
        <div className={styles.detailMeta} data-dash-reveal="rise" style={{ "--dash-delay": "80ms" } as CSSProperties}>
          <time dateTime={post.dateIso}>{post.date}</time>
          <p>{intro}</p>
        </div>
        <div className={styles.detailHeroImage} data-dash-reveal="short" style={{ "--dash-delay": "120ms" } as CSSProperties}>
          <img alt={post.title} src={post.heroImage} />
        </div>
      </section>

      <article className={styles.article}>
        {articleSections.map((section) => (
          <section data-dash-reveal="rise" key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.copy}</p>
          </section>
        ))}

        <section data-dash-reveal="rise">
          <h2>What’s Included in This Service</h2>
          <p>{serviceCopy}</p>
        </section>

        <div className={styles.articleImage} data-dash-reveal="short">
          <img alt="Creative team workspace" loading="lazy" src={post.secondaryImages[0]} />
        </div>

        <section data-dash-reveal="rise">
          <h2>Conclusion: Your Path to Sustainable Social Media Growth</h2>
          <p>{serviceCopy}</p>
        </section>

        <div className={styles.articleImage} data-dash-reveal="short">
          <img alt="Marketing strategy in action" loading="lazy" src={post.secondaryImages[1]} />
        </div>

        <Link className={styles.backButton} href={`${DASHFLUENCE_BASE}/blog`}>
          Back To Blog
        </Link>
      </article>

      <section className={styles.featuredSection}>
        <div className={styles.featuredIntro}>
          <div data-dash-reveal="rise">
            <p className={styles.eyebrow}><span aria-hidden="true">⌜</span> Blogs</p>
            <h2>Smart Marketing Tips, Fresh Weekly</h2>
          </div>
          <p className={styles.introCopy} data-dash-reveal="rise">{intro}</p>
        </div>
        <div className={styles.featuredGrid}>
          {recommendations.slice(0, 2).map((item, index) => (
            <FeaturedBlogCard key={item.slug} post={item} secondary={index === 1} />
          ))}
        </div>
      </section>
    </div>
  );
}
