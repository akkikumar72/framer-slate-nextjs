import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, asset } from "@/lib/site-data";
import { caseStudyContent, CaseStudyDetail } from "@/components/routes/case-studies/CaseStudyDetail";

export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyContent.find((record) => record.slug === slug);
  if (!study) return {};
  return { title: { absolute: study.title }, description: study.overview[0], alternates: { canonical: `/b2bizz/case-study/${study.slug}` }, openGraph: { title: study.title, description: study.overview[0], images: [asset(study.images[0])] } };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudyContent.find((record) => record.slug === slug);
  if (!study) notFound();
  return <CaseStudyDetail study={study} />;
}
