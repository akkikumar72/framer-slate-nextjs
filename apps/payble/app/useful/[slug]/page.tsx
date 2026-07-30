import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/payble/utility/UtilityPages";
import { legalDocuments } from "@/components/payble/utility/legal-data";
import "@/components/payble/utility.css";

type LegalRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(legalDocuments).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LegalRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const document = legalDocuments[slug];

  if (!document) {
    return {};
  }

  return {
    title: document.title,
    description: `${document.title} for Payble's personal finance services.`,
    alternates: {
      canonical: `/useful/${slug}`,
    },
  };
}

export default async function Page({ params }: LegalRouteProps) {
  const { slug } = await params;
  const document = legalDocuments[slug];

  if (!document) {
    notFound();
  }

  return <LegalPage document={document} />;
}
