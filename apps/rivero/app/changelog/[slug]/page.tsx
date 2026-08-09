import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChangelogPage } from "@/components/rivero/routes/changelog/ChangelogPage";
import { changelogSlugs, isChangelogSlug } from "@/components/rivero/routes/changelog/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return changelogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isChangelogSlug(slug)) return {};
  return {
    title: { absolute: "Rivero - SaaS & Startup Template" },
    description: "Stay up-to-date with the latest Rivero updates, features, and improvements.",
    alternates: { canonical: `/changelog/${slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isChangelogSlug(slug)) notFound();
  return <ChangelogPage />;
}
