import type { Metadata } from "next";
import { PalmerGallery } from "@/components/palmer/static/PalmerStaticPages";

const description =
  "A visual archive of selected identities, motion studies, and digital experiments by Akihiko.";

export const metadata: Metadata = {
  title: "Gallery",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery · Palmer®",
    description,
    type: "website",
    url: "/gallery",
    images: ["/palmer/assets/palmer-hero-poster.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery · Palmer®",
    description,
    images: ["/palmer/assets/palmer-hero-poster.jpg"],
  },
};

export default function GalleryPage() {
  return <PalmerGallery />;
}
