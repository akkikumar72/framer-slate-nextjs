import type { Metadata } from "next";
import { ContactPage } from "@/components/dashfluence/static/DashfluenceStaticPages";
export const metadata: Metadata = { title: "Contact us", alternates: { canonical: "/Dashfluence/contact-us" } };
export default function Page() { return <ContactPage />; }
