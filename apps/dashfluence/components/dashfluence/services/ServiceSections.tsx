import Image from "next/image";
import Link from "next/link";

import {
  DashButton,
  SectionEyebrow,
} from "@/components/dashfluence/shared/DashfluenceShell";
import { DASHFLUENCE_BASE } from "@/components/dashfluence/shared/routes";
import { serviceBlogCards, serviceFaqs } from "./service-data";
import styles from "./Services.module.css";

export function ServiceFaqSection() {
  return (
    <section className={styles.faqSection}>
      <div className={styles.faqInner}>
        <div className={styles.faqIntro} data-dash-reveal="rise">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2>Got Questions?<br />We’ve Got Answers.</h2>
          <p>Here are some of the most common queries to help you get started.</p>
          <DashButton href={`${DASHFLUENCE_BASE}/contact-us`}>Contact us</DashButton>
        </div>

        <div className={styles.faqList} data-dash-reveal="rise">
          {serviceFaqs.map((faq, index) => (
            <details className={styles.faqItem} key={faq.question} open={index === 0}>
              <summary>
                <span><small>{String(index + 1).padStart(2, "0")}</small>{faq.question}</span>
                <span aria-hidden="true" className={styles.faqPlus}>+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceBlogSection() {
  return (
    <section className={styles.blogSection}>
      <div className={styles.blogInner}>
        <div className={styles.blogHeading} data-dash-reveal="rise">
          <div>
            <SectionEyebrow>Blogs</SectionEyebrow>
            <h2>Smart Marketing Tips, Fresh Weekly</h2>
          </div>
          <p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p>
        </div>

        <div className={styles.blogGrid}>
          {serviceBlogCards.map((post, index) => (
            <article
              className={styles.blogCard}
              data-dash-reveal="rise"
              key={post.href}
              style={{ "--dash-delay": `${index * 90}ms` } as React.CSSProperties}
            >
              <Link className={styles.blogImage} href={post.href}>
                <Image
                  alt={post.title}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), 50vw"
                  src={post.image}
                />
              </Link>
              <div className={styles.blogMeta}>
                <time>{post.date}</time>
                <h3><Link href={post.href}>{post.title}</Link></h3>
                <p>{post.excerpt}</p>
                <Link className={styles.blogLink} href={post.href}>Read full blog <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
