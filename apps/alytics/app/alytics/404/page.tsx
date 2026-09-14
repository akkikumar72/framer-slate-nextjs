import type { Metadata } from "next";
export const metadata: Metadata = { title: { absolute: "Page Not Found – Alytics" }, robots: { index: false, follow: false } };
import { notFound } from 'next/navigation';
export default function NotFoundPage(){notFound()}
