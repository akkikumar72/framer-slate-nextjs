import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/components/palmer/data";
import { PalmerWorkDetail } from "@/components/palmer/work/PalmerWorkDetail";

type PalmerWorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PalmerWorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);

  if (!project) {
    return {};
  }

  const canonical = `/palmer/work/${project.slug}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${project.title} · Palmer®`,
      description: project.summary,
      type: "article",
      url: canonical,
      images: [
        {
          url: project.images[0],
          alt: `${project.title} case study`,
        },
      ],
    },
  };
}

export default async function PalmerWorkDetailPage({
  params,
}: PalmerWorkDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);

  if (!project) {
    notFound();
  }

  return <PalmerWorkDetail project={project} />;
}
