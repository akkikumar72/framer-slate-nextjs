import type { Metadata } from "next";
import { BlogIndex } from "@/components/routes/blog/BlogIndex";

export const metadata: Metadata = { title: { absolute: "B2bizz - B2B Consulting Agency for Digital Growth" }, description: "Our blogs. Explore B2B growth, strategy, analytics, and digital transformation.", alternates: { canonical: "/b2bizz/blog" } };

export default function BlogPage() { return <BlogIndex />; }
