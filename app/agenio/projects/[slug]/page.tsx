import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/agenio/projects/ProjectDetail";
import {
  projectPageDescription,
  projects,
  projectsBySlug,
} from "@/components/agenio/projects/data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsBySlug[slug];

  if (!project) {
    return {};
  }

  const canonical = `/agenio/projects/${project.slug}`;

  return {
    title: {
      absolute: "AgencyIO - AI Agency Framer Template",
    },
    description: projectPageDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: "AgencyIO - AI Agency Framer Template",
      description: projectPageDescription,
      type: "website",
      url: canonical,
      images: [
        {
          url: "/agenio/projects/og.png",
          width: 1600,
          height: 1200,
          alt: "Agenio AI agency",
        },
      ],
    },
  };
}

export default async function AgenioProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsBySlug[slug];

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
