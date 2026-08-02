import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetail } from "@/components/dashfluence/blog/BlogDetail";
import {
  dashfluenceBlogBySlug,
  dashfluenceBlogPosts,
} from "@/components/dashfluence/blog/data";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return dashfluenceBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = dashfluenceBlogBySlug[slug];

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/Dashfluence/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
      type: "article",
      url: `/Dashfluence/blog/${post.slug}`,
    },
  };
}

export default async function DashfluenceBlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const post = dashfluenceBlogBySlug[slug];

  if (!post) notFound();

  return <BlogDetail post={post} />;
}
