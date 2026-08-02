import type { Metadata } from "next";
import { AboutPage } from "@/components/dashfluence/static/DashfluenceStaticPages";
export const metadata: Metadata = { title: "About", alternates: { canonical: "/Dashfluence/about" } };
export default function Page() { return <AboutPage />; }
