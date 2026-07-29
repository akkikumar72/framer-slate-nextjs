import type { Metadata } from "next";
import { PalmerContact } from "@/components/palmer/static/PalmerStaticPages";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/palmer/contact" },
};

export default function ContactPage() {
  return <PalmerContact />;
}
