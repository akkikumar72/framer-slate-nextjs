import type { Metadata } from "next";
import { RiveroNotFoundPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = { title: "Page Not Found | Rivero" };
export default function Page() { return <RiveroNotFoundPage />; }
