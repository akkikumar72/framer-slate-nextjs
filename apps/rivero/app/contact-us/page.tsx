import type { Metadata } from "next";
import { ContactPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = { title: "Contact Us | Rivero" };
export default function Page() { return <ContactPage />; }
