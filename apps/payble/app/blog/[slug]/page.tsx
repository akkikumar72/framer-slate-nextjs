import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/payble/blog/BlogArticlePage";
import {
  blogArticleBySlug,
  blogArticles,
} from "@/components/payble/blog-data";

type BlogArticleRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticleBySlug.get(slug);

  if (!article) {
    return {};
  }

  const description =
    article.sections[0]?.paragraphs?.[0] ??
    "Practical financial guidance from Payble.";

  return {
    title: article.title,
    description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.isoDate,
      authors: [article.author],
      images: [
        {
          url: article.image,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function PaybleBlogArticleRoute({
  params,
}: BlogArticleRouteProps) {
  const { slug } = await params;
  const article = blogArticleBySlug.get(slug);

  if (!article) {
    notFound();
  }

  return <BlogArticlePage article={article} />;
}
