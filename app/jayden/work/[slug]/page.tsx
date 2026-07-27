import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/jayden/work/ProjectDetail";
import {
  jaydenProjectStories,
  jaydenProjectStoriesBySlug,
} from "@/components/jayden/work/data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return jaydenProjectStories.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project =
    jaydenProjectStoriesBySlug[
      slug as keyof typeof jaydenProjectStoriesBySlug
    ];

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Jayden`,
    description: project.vision[0],
    alternates: {
      canonical: `/jayden/work/${project.slug}`,
    },
  };
}

export default async function JaydenProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project =
    jaydenProjectStoriesBySlug[
      slug as keyof typeof jaydenProjectStoriesBySlug
    ];

  if (!project) {
    notFound();
  }

  const nextProjects = jaydenProjectStories.filter(
    (candidate) => candidate.slug !== project.slug,
  );

  return <ProjectDetail nextProjects={nextProjects} project={project} />;
}
