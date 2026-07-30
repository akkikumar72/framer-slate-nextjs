import type { Metadata } from "next";
import { PalmerContact } from "@/components/palmer/static/PalmerStaticPages";

const description =
  "Start a design, identity, motion, or Framer project with Akihiko.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Palmer®",
    description,
    type: "website",
    url: "/contact",
    images: ["/palmer/assets/palmer-hero-poster.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact · Palmer®",
    description,
    images: ["/palmer/assets/palmer-hero-poster.jpg"],
  },
};

export default function ContactPage() {
  return <PalmerContact />;
}
