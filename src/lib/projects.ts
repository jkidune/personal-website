import { cache } from "react";
import { unstable_cache } from "next/cache";
import localProjects from "@/data/portfolio-projects.json";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/types";

// Cache the fallback too, so a CMS outage does not delay every project page.
const loadProjects = unstable_cache(
  async (): Promise<{ projects: Project[]; unavailable: boolean }> => {
    try {
      const projects = await client.withConfig({ maxRetries: 0 }).fetch<Project[]>(
        projectsQuery,
        {},
        { timeout: 5000 },
      );
      return { projects: projects.length ? projects : localProjects, unavailable: false };
    } catch {
      console.warn("Sanity is unavailable; serving the curated portfolio collection.");
      return { projects: localProjects, unavailable: false };
    }
  },
  ["portfolio-project-collection"],
  { revalidate: 300 },
);
export const getProjects = cache(loadProjects);
