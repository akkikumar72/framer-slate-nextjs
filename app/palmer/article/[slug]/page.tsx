import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PalmerArticle } from "@/components/palmer/article/PalmerArticle";
import { articles } from "@/components/palmer/data";

type PalmerArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PalmerArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((candidate) => candidate.slug === slug);

  if (!article) {
    return {};
  }

  const canonical = `/palmer/article/${article.slug}`;
  const title = `${article.title} - Palmer® - Minimal Portfolio & Agency`;

  return {
    title: { absolute: title },
    description: article.excerpt,
    alternates: { canonical },
    openGraph: {
      title,
      description: article.excerpt,
      images: [{ alt: article.title, url: article.images[0] }],
      type: "article",
      publishedTime: article.date,
      url: canonical,
    },
  };
}

export default async function PalmerArticlePage({
  params,
}: PalmerArticlePageProps) {
  const { slug } = await params;
  const articleIndex = articles.findIndex(
    (candidate) => candidate.slug === slug,
  );

  if (articleIndex === -1) {
    notFound();
  }

  const article = articles[articleIndex];
  const nextArticle = articles[(articleIndex + 1) % articles.length];

  return <PalmerArticle article={article} nextArticle={nextArticle} />;
}
