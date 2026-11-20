import type { Metadata } from "next";
import Catalogue from "./catalogue";

export const metadata: Metadata = {
  title: "Design directions | Kento Iizuka",
  description: "Eleven portfolio studies, from kinetic typography to spatial architecture and folded paper.",
};

export default function Page() {
  return <Catalogue />;
}
