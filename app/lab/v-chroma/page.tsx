import type { Metadata } from "next";
import Direction from "../_varieties/chroma";

export const metadata: Metadata = {
  title: "A place for every part | Kento Iizuka",
  description: "A playful colour study of software that fits together.",
};

export default function Page() {
  return <Direction />;
}
