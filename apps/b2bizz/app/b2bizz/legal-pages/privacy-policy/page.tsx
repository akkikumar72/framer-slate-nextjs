import type { Metadata } from "next";
import { PrivacyPage } from "@/components/routes/static/UtilityPages";
export const metadata:Metadata={title:{absolute:"Privacy policy"},alternates:{canonical:"/b2bizz/legal-pages/privacy-policy"}};
export default function Page(){return <PrivacyPage/>}
