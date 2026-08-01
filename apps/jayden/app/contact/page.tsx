import type { Metadata } from "next";
import { JaydenContactPage } from "@/components/jayden/contact/JaydenContactPage";

export const metadata: Metadata = {
  title: "Contact | Jayden",
  description: "Start a design or development project with Jayden Jones.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <JaydenContactPage />;
}
