import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  fuelArticleSlugs,
  getFuelArticle,
} from "@/components/fuel/blog/articleData";
import { FuelBlogPage } from "@/components/fuel/blog/FuelBlogPage";

type FuelBlogRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return fuelArticleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: FuelBlogRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getFuelArticle(slug);

  if (!article) {
    return {};
  }

  const canonical = `/fuel/blog/${article.slug}`;

  return {
    title: `${article.title} - Fuel - Premium Agency & Portfolio`,
    description:
      "Fuel is a premium creative agency and portfolio for designers, studios, brands, and photographers.",
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${article.title} - Fuel - Premium Agency & Portfolio`,
      description: article.summary,
      images: [article.heroImage],
      type: "article",
      url: canonical,
    },
  };
}

export default async function FuelBlogArticleRoute({
  params,
}: FuelBlogRouteProps) {
  const { slug } = await params;
  const article = getFuelArticle(slug);

  if (!article) {
    notFound();
  }

  return <FuelBlogPage article={article} />;
}
