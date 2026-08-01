import type { Metadata } from "next";
import { ContactForm } from "@/components/saazai/company/ContactForm";
import {
  CtaSection,
  PageHero,
} from "@/components/saazai/shared/SaazaiSections";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact Saazai sales and product support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero breadcrumb="Home / Contact">Contact us</PageHero>
      <ContactForm />
      <CtaSection />
    </>
  );
}
