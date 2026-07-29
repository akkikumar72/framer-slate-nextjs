import type { Metadata } from "next";
import { PalmerGallery } from "@/components/palmer/static/PalmerStaticPages";

export const metadata: Metadata = {
  title: "Gallery",
  alternates: { canonical: "/palmer/gallery" },
};

export default function GalleryPage() {
  return <PalmerGallery />;
}
