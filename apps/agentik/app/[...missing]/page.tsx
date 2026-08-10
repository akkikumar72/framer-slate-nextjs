import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { follow: false, index: false },
};

export default function AgentikMissingPage(): never {
  notFound();
}
