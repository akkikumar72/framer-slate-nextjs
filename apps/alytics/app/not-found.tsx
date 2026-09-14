import type { Metadata } from "next";
export const metadata: Metadata = { title: { absolute: "Page Not Found – Alytics" }, robots: { index: false, follow: false } };
import { NotFoundContent } from '@/components/utility/NotFoundContent';
export default function NotFound(){return <main id="main-content"><NotFoundContent/></main>}
