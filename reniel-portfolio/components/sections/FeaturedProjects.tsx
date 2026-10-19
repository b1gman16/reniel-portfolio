import { featuredProjects } from "@/data/featured-projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function FeaturedProjects() {
  const [bayfront, hallguard] = featuredProjects;
  return (
    <>
      <ProjectCard project={bayfront} tone="light" delay={0} className="col-span-12 lg:col-span-7" />
      <ProjectCard project={hallguard} tone="dark" delay={140} className="col-span-12 lg:col-span-5" />
    </>
  );
}