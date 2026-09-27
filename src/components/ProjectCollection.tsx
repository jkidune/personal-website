"use client";
import { useState } from "react";
import type { Project } from "@/sanity/types";
import ProjectCard from "./ProjectCard";
export default function ProjectCollection({
  projects,
}: {
  projects: Project[];
}) {
  const [category, setCategory] = useState("All projects");
  const categories = [
    "All projects",
    ...Array.from(
      new Set(
        projects.map((p) => p.category).filter((x): x is string => Boolean(x)),
      ),
    ),
  ];
  const filtered =
    category === "All projects"
      ? projects
      : projects.filter((p) => p.category === category);
  return (
    <>
      <div className="filter-row">
        <div className="filter-tabs" role="group" aria-label="Filter projects">
          {categories.map((value) => (
            <button
              key={value}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <span className="filter-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </span>
      </div>
      <div className="project-grid collection-grid">
        {filtered.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>
    </>
  );
}
