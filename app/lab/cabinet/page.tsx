import type { Metadata } from "next";
import careerProfile from "../../content/career-profile.json";
import Cabinet from "./cabinet";
import { projectObjects } from "./projects";

export const metadata: Metadata = {
  title: "Working objects | Kento Iizuka",
  description: "A cabinet of systems, tools, and ideas by Kento Iizuka. Pick up an object and explore the project behind it.",
};

export default function CabinetPage() {
  const projects = careerProfile.featuredProjects.flatMap((project) => {
    const object = projectObjects[project.link];
    return object ? [{ ...project, ...object }] : [];
  });

  return <Cabinet projects={projects} />;
}
