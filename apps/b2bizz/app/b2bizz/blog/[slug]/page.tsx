import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/components/routes/blog/blog-data";
import { BlogArticle } from "@/components/routes/blog/BlogArticle";

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: { absolute: article.title }, description: article.summary, alternates: { canonical: `/b2bizz/blog/${slug}` }, openGraph: { title: article.title, description: article.summary, type: "article", images: [`/b2bizz/assets/${article.hero}`] } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <BlogArticle article={article} />;
}
