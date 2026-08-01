import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntegrationDetailPage } from "@/components/rivero/routes/integrations/IntegrationPages";
import { integrationBySlug, integrations } from "@/components/rivero/routes/integrations/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return integrations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const integration = integrationBySlug.get((await params).slug);
  if (!integration) return {};
  return {
    title: { absolute: "Rivero - SaaS & Startup Template" },
    description: integration.description,
    alternates: { canonical: `/rivero/integrations/${integration.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const integration = integrationBySlug.get((await params).slug);
  if (!integration) notFound();
  return <IntegrationDetailPage integration={integration} />;
}
