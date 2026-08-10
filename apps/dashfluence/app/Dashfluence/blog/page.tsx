import type { Metadata } from "next";
import { BlogIndex } from "@/components/dashfluence/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, tips and stories for building stronger brands and higher-performing marketing.",
  alternates: { canonical: "/Dashfluence/blog" },
};

export default function DashfluenceBlogPage() {
  return <BlogIndex />;
}
