import type { Metadata } from "next";

import { PliarContactPage } from "@/components/pilar/PliarSecondary";

export const metadata: Metadata = {
  title: "Contact",
  description: "Our team is here to help. Reach out and we’ll get back to you quickly.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <PliarContactPage />;
}
