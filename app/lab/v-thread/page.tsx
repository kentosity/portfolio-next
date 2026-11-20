import type { Metadata } from "next";
import Direction from "../_varieties/thread";

export const metadata: Metadata = {
  title: "Follow the thread | Kento Iizuka",
  description: "A woven study of how useful systems connect.",
};

export default function Page() {
  return <Direction />;
}
