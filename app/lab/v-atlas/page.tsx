import type { Metadata } from "next";
import Direction from "../_varieties/atlas";

export const metadata: Metadata = {
  title: "Room to think | Kento Iizuka",
  description: "Explore engineering projects as an architectural space.",
};

export default function Page() {
  return <Direction />;
}
