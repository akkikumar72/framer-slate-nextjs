import type { Metadata } from "next";
import { BlogIndex } from "@/components/rivero/routes/blog/BlogIndex";

export const metadata: Metadata = {
  title: { absolute: "Rivero - SaaS & Startup Template" },
  description: "Discover the latest trends, tips, and strategies in HR payroll and team management.",
  alternates: { canonical: "/blog" },
};

export default function RiveroBlogPage() {
  return <BlogIndex />;
}
