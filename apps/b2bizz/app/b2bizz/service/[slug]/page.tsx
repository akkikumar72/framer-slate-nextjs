import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/site-data";
import { ServiceDetail } from "@/components/routes/services/Services";

export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return { title: { absolute: `${service.title} - B2bizz - B2B Consulting Agency for Digital Growth` }, description: "Empower your B2B business with result-driven consulting. From strategy to execution, we deliver measurable growth through expert digital and operational solutions.", alternates: { canonical: `/b2bizz/service/${service.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return <ServiceDetail slug={service.slug} />;
}
