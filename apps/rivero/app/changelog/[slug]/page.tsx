import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChangelogPage } from "@/components/rivero/routes/changelog/ChangelogPage";
import { changelogEntries, getChangelogEntry } from "@/components/rivero/routes/changelog/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return changelogEntries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getChangelogEntry((await params).slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: "Stay up-to-date with the latest Rivero updates, features, and improvements.",
    alternates: { canonical: `/changelog/${entry.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const entry = getChangelogEntry((await params).slug);
  if (!entry) notFound();
  return <ChangelogPage entry={entry} />;
}
