import type { Metadata } from "next";
import { ContactPage } from "@/components/payble/utility/UtilityPages";
import "@/components/payble/utility.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Payble team for help with your account, pricing, or money management questions.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
