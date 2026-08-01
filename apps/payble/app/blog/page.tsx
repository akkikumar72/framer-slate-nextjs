import type { Metadata } from "next";
import { BlogCard } from "@/components/payble/blog/BlogCard";
import { blogArticles } from "@/components/payble/blog-data";
import {
  DownloadApp,
  Newsletter,
  PageHero,
} from "@/components/payble/PaybleShared";

export const metadata: Metadata = {
  title: {
    absolute: "Payble - AI SAAS Template",
  },
  description:
    "Explore comprehensive strategies and advanced tools that help you manage your money, optimize your spending, and reach your financial goals faster.",
  alternates: {
    canonical: "/blog",
  },
};

export default function PaybleBlogPage() {
  return (
    <main className="payble-page payble-blog-index">
      <PageHero
        kicker="Blog Articles"
        title="Your Guide to Smarter Money"
        description="Explore comprehensive strategies and advanced tools that empower you to effortlessly manage your money, optimize your spending, and reach your financial goals faster."
      />

      <section className="payble-journal" aria-label="Payble articles">
        <div className="payble-container payble-journal-grid">
          {blogArticles.map((article, index) => (
            <BlogCard
              article={article}
              key={article.slug}
              priority={index < 3}
            />
          ))}
        </div>
      </section>

      <DownloadApp />
      <Newsletter />
    </main>
  );
}
