import type { Metadata } from "next";
import { ContactPage } from "@/components/routes/static/ContactPage";
export const metadata:Metadata={title:{absolute:"B2bizz - B2B Consulting Agency for Digital Growth"},alternates:{canonical:"/b2bizz/contact"}};
export default function Page(){return <ContactPage/>}
