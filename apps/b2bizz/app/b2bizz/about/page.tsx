import type { Metadata } from "next";
import { AboutPage } from "@/components/routes/static/AboutPage";
export const metadata:Metadata={title:{absolute:"B2bizz - B2B Consulting Agency for Digital Growth"},alternates:{canonical:"/b2bizz/about"}};
export default function Page(){return <AboutPage/>}
