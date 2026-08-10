import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogSlugs } from "@/components/rivero/routeData";
import { BlogArticle } from "@/components/rivero/routes/blog/BlogArticle";
import { getRiveroBlogPost } from "@/components/rivero/routes/blog/blog-data";

type RiveroBlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RiveroBlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getRiveroBlogPost(slug);

  if (!post) return {};

  const canonical = `/blog/${post.slug}`;
  return {
    title: { absolute: `${post.title} - Rivero` },
    description: "Rivero is a modern SaaS platform for streamlined HR, payroll, and team management.",
    alternates: { canonical },
    openGraph: {
      title: `${post.title} - Rivero`,
      description: "Practical guidance for modern HR, payroll, and team management.",
      images: [{ alt: post.title, url: post.image }],
      type: "article",
      url: canonical,
    },
  };
}

export default async function RiveroBlogArticlePage({ params }: RiveroBlogArticlePageProps) {
  const { slug } = await params;
  const post = getRiveroBlogPost(slug);

  if (!post) notFound();

  return <BlogArticle post={post} />;
}
