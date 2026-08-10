import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/components/dashfluence/services/ServiceDetailPage";
import {
  dashfluenceServices,
  dashfluenceServicesBySlug,
} from "@/components/dashfluence/services/service-data";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return dashfluenceServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = dashfluenceServicesBySlug[slug];

  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/Dashfluence/services/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.description,
      images: [service.image],
      type: "website",
      url: `/Dashfluence/services/${service.slug}`,
    },
  };
}

export default async function DashfluenceServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = dashfluenceServicesBySlug[slug];

  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
