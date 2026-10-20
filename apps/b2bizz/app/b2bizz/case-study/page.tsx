import type { Metadata } from "next";
import { CaseStudyListing } from "@/components/routes/case-studies/CaseStudies";

export const metadata: Metadata = { title: { absolute: "B2bizz - B2B Consulting Agency for Digital Growth" }, description: "Explore our case studies and the measurable results we deliver for B2B businesses.", alternates: { canonical: "/b2bizz/case-study" } };

export default function CaseStudyPage() { return <CaseStudyListing />; }
