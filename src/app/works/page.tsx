import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/types";

const ALL_CATEGORY = "All";

type WorksPageProps = {
  searchParams?: Promise<{ category?: string }>;
};

export default async function WorksPage({ searchParams }: WorksPageProps) {
  const params = await searchParams;
  const projects = await client.fetch<Project[]>(projectsQuery);
  const categories = [
    ALL_CATEGORY,
    ...Array.from(new Set(projects.map((project) => project.category).filter(Boolean))) as string[],
  ];
  const activeCategory = params?.category || ALL_CATEGORY;
  const filtered =
    activeCategory === ALL_CATEGORY
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-4">
              <span className="w-6 h-[1px] bg-[#FF3333]"></span>
              Portfolio
            </div>
            <h1 className="font-[family-name:var(--font-outfit)] text-5xl md:text-6xl font-medium text-black leading-tight">
              Selected <span className="italic text-[#FF3333]">Works</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={category === ALL_CATEGORY ? "/works" : `/works?category=${encodeURIComponent(category)}`}
                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                  ${activeCategory === category
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#FF3333] hover:text-[#FF3333]"
                  }
                `}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-24 text-gray-400 font-[family-name:var(--font-dm-mono)]">
            No projects yet. Add projects in Sanity Studio.
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400 font-[family-name:var(--font-dm-mono)]">
            No projects found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {filtered.map((project) => (
              <Link
                key={project._id}
                href={`/works/${project.slug}`}
                className="group cursor-pointer flex flex-col gap-6"
              >
                <div className="relative overflow-hidden rounded-[24px] bg-gray-50 border border-gray-100 aspect-[4/3]">
                  {project.coverUrl ? (
                    <img
                      src={project.coverUrl}
                      alt={project.coverAlt || project.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[4px]"
                    />
                  ) : null}

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase">
                      {project.category}
                    </span>
                    <span className="h-[1px] w-8 bg-gray-200"></span>
                  </div>

                  <h3 className="font-[family-name:var(--font-outfit)] text-3xl font-medium text-black group-hover:text-[#FF3333] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
