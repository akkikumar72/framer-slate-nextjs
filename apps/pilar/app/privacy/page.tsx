import type { Metadata } from "next";
import { PliarLegal } from "@/components/pilar/PliarLegal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Pliar is a premium Framer template for AI products, SaaS startups, automation platforms, and modern software businesses. Featuring polished product showcases, pricing, integrations, testimonials, and conversion-focused layouts.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PilarPrivacyPage() {
  return <PliarLegal kind="privacy" />;
}
