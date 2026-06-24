import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/types";

export default async function WorkPage() {
  const projects = await client.fetch<Project[]>(projectsQuery);
  const categories = Array.from(new Set(projects.map((project) => project.category).filter(Boolean)));

  return (
    <main className="min-h-screen bg-night px-4 pb-24 pt-32">
      <div className="site-shell">
        <header className="mb-16 grid gap-8 md:grid-cols-[1fr_0.36fr] md:items-end">
          <div>
            <p className="section-label mb-5">All Work / {projects.length} projects</p>
            <h1 className="text-7xl font-black uppercase leading-[0.86] tracking-[-0.075em] md:text-[12rem]">
              Selected Work
            </h1>
          </div>
          {categories.length > 0 ? (
            <p className="text-sm leading-relaxed text-muted">{categories.join(" / ")}</p>
          ) : null}
        </header>

        {projects.length === 0 ? (
          <div className="placeholder-media">
            <p className="text-2xl font-bold text-ink">No projects yet. Add projects in Sanity Studio.</p>
          </div>
        ) : (
          <div className="grid gap-16">
            {projects.map((project, index) => (
              <Link
                key={project._id}
                href={`/work/${project.slug}`}
                className="group grid gap-5 border-t border-line pt-8 md:grid-cols-[0.2fr_0.42fr_1fr] md:items-start"
              >
                <span className="section-label">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-ink md:text-6xl">
                    {project.title}
                  </h2>
                  <p className="mt-4 text-sm text-muted">
                    {[project.client || project.category, project.year, project.role].filter(Boolean).join(" / ")}
                  </p>
                </div>
                <div className="media-frame relative aspect-[16/9]">
                  {project.coverUrl ? (
                    <Image
                      src={project.coverUrl}
                      alt={project.coverAlt || project.title}
                      fill
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="placeholder-media h-full min-h-0">
                      <span className="section-label">Visual pending</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
