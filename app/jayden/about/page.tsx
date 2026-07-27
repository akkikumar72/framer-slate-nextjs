import type { Metadata } from "next";
import { AboutProfile } from "@/components/jayden/profile/AboutProfile";

export const metadata: Metadata = {
  title: "About | Jayden",
  description: "Meet Jayden Jones, a digital creator focused on impactful design and development.",
};

export default function JaydenAboutPage() {
  return <AboutProfile />;
}
