import type { Metadata } from "next";
import { HomeTwo } from "@/components/routes/home/HomeTwo";

export const metadata: Metadata = { title:{absolute:"B2bizz - B2B Consulting Agency for Digital Growth"}, alternates:{canonical:"/b2bizz/home-2"} };
export default function HomeTwoPage(){return <HomeTwo/>}
