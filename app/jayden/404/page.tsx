import type { Metadata } from "next";
import { JaydenNotFoundPage } from "./JaydenNotFoundPage";

export const metadata: Metadata = {
  title: "404 | Jayden",
  description: "The requested Jayden portfolio page could not be found.",
};

export default function Jayden404Route() {
  return <JaydenNotFoundPage />;
}
