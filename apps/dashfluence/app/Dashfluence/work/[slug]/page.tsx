import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkDetailPage } from "@/components/dashfluence/work/WorkPages";
import {
  dashfluenceWorkProjects,
  dashfluenceWorkProjectsBySlug,
} from "@/components/dashfluence/work/data";

type DashfluenceWorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return dashfluenceWorkProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: DashfluenceWorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = dashfluenceWorkProjectsBySlug[slug];

  if (!project) return {};

  const canonical = `/Dashfluence/work/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical },
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.heroImage, alt: `${project.title} case study` }],
      type: "article",
      url: canonical,
    },
  };
}

export default async function DashfluenceWorkDetailRoute({
  params,
}: DashfluenceWorkDetailPageProps) {
  const { slug } = await params;
  const project = dashfluenceWorkProjectsBySlug[slug];

  if (!project) notFound();

  return <WorkDetailPage project={project} />;
}
