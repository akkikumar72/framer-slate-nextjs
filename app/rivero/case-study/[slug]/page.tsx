import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetailPage } from "@/components/rivero/routes/case-study/CaseStudyPages";
import { caseStudies, caseStudyBySlug } from "@/components/rivero/routes/case-study/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = caseStudyBySlug.get((await params).slug);
  if (!study) return {};
  return {
    title: { absolute: `${study.title} - Rivero` },
    description: study.description,
    alternates: { canonical: `/rivero/case-study/${study.slug}` },
    openGraph: { title: study.title, description: study.description, images: [{ url: study.cover, alt: study.title }] },
  };
}

export default async function Page({ params }: Props) {
  const study = caseStudyBySlug.get((await params).slug);
  if (!study) notFound();
  return <CaseStudyDetailPage study={study} />;
}
