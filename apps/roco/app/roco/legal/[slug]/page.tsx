import type { Metadata } from "next";
import { createElement, type ReactNode } from "react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import policyData from "../legal-content.json";
import styles from "../legal.module.css";

type ContentNode = string | { tag: string; children: ContentNode[] };
type Policy = { title: string; blocks: ContentNode[] };
const policies: Record<string, Policy> = policyData;
type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies[slug];
  if (!Object.hasOwn(policies, slug)) notFound();
  return {
    title: `${policy.title} - Roco Portfolio Template`,
    alternates: { canonical: `/roco/legal/${slug}` },
  };
}

function renderContent(node: ContentNode, key: number): ReactNode {
  if (typeof node === "string") return node;
  return node.tag === "br"
    ? createElement("br", { key })
    : createElement(node.tag, { key }, node.children.map(renderContent));
}

export default async function LegalPage({ params }: PageProps) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!Object.hasOwn(policies, slug)) notFound();
  return <article className={styles.page}>
    <h1>{policy.title}</h1>
    <Reveal className={styles.content}>{policy.blocks.map(renderContent)}</Reveal>
  </article>;
}
