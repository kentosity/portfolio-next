import type { Metadata } from "next";
import careerProfile from "../../content/career-profile.json";
import Notebook from "./notebook";
import "./notebook.css";

export const metadata: Metadata = {
  title: "Field notebook | Kento Iizuka",
  description:
    "An illustrated look inside three engineering projects by Kento Iizuka.",
};

export default function NotebookPage() {
  return <Notebook projects={careerProfile.featuredProjects.slice(0, 3)} />;
}
