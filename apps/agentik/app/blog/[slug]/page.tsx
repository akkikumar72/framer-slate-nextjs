import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgentikBlogArticle } from "@/components/agentik/blog/BlogArticle";
import { getAgentikArticle } from "@/components/agentik/blog/articleContent";
import { AgentikShell } from "@/components/agentik/shared/AgentikShell";
import { BLOG_POSTS } from "@/components/agentik/shared/content";

type AgentikBlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AgentikBlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((candidate) => candidate.slug === slug);
  const article = getAgentikArticle(slug);

  if (!post || !article) return {};

  const canonical = `/blog/${post.slug}`;
  const title = `${post.title} | Framer Website Template for AI Automation Agencies`;

  return {
    title: { absolute: title },
    description: article.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: article.description,
      images: [{ alt: post.title, url: post.cover }],
      type: "article",
      url: canonical,
    },
  };
}

export default async function AgentikBlogDetailPage({
  params,
}: AgentikBlogDetailPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((candidate) => candidate.slug === slug);
  const article = getAgentikArticle(slug);

  if (!post || !article) notFound();

  return (
    <AgentikShell>
      <AgentikBlogArticle article={article} post={post} />
    </AgentikShell>
  );
}
