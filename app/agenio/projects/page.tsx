import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/agenio/projects/ProjectsIndex";
import { projectPageDescription } from "@/components/agenio/projects/data";

export const metadata: Metadata = {
  title: {
    absolute: "AgencyIO - AI Agency Framer Template",
  },
  description: projectPageDescription,
  alternates: {
    canonical: "/agenio/projects",
  },
  openGraph: {
    title: "AgencyIO - AI Agency Framer Template",
    description: projectPageDescription,
    type: "website",
    url: "/agenio/projects",
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

export default function AgenioProjectsPage() {
  return <ProjectsIndex />;
}
