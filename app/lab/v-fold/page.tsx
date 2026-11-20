import type { Metadata } from "next";
import Direction from "../_varieties/fold";

export const metadata: Metadata = {
  title: "Made with care | Kento Iizuka",
  description: "Unfold three carefully built software projects.",
};

export default function Page() {
  return <Direction />;
}
