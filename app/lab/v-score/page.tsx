import type { Metadata } from "next";
import Direction from "../_varieties/score";

export const metadata: Metadata = {
  title: "Good things connect | Kento Iizuka",
  description: "Three engineering projects as a musical signal path.",
};

export default function Page() {
  return <Direction />;
}
