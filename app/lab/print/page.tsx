import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import careerProfile from "../../content/career-profile.json";
import PrintWorkshop from "./print-workshop";
import styles from "./print.module.css";

const displayType = Barlow_Condensed({
  weight: ["600", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--print-display",
});

export const metadata: Metadata = {
  title: "Works in print | Kento Iizuka",
  description: "Four digital projects, collected as a publication. A print workshop by Kento Iizuka.",
};

export default function PrintPage() {
  return (
    <div className={`${styles.workshop} ${displayType.variable}`}>
      <PrintWorkshop projects={careerProfile.featuredProjects} />
    </div>
  );
}
