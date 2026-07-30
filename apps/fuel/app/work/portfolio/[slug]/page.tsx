import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioDetailPage } from "@/components/fuel/work/WorkPortfolio";
import {
  getPortfolioProject,
  portfolioProjects,
} from "@/components/fuel/work/data";

type FuelPortfolioDetailProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: FuelPortfolioDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} - Fuel - Premium Agency & Portfolio`,
    description:
      "Fuel is a premium creative agency and portfolio for designers, studios, brands, and photographers.",
    alternates: {
      canonical: `/work/portfolio/${project.slug}`,
    },
  };
}

export default async function FuelPortfolioDetailRoute({
  params,
}: FuelPortfolioDetailProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    notFound();
  }

  return <PortfolioDetailPage project={project} />;
}
