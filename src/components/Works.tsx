import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { featuredProjectsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/types";

export default async function Works() {
  const projects = await client.fetch<Project[]>(featuredProjectsQuery);

  return (
    <section id="works" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-4">
              <span className="w-6 h-[1px] bg-[#FF3333]"></span>
              Selected Works
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-medium text-black max-w-xl leading-tight">
              Projects built for <span className="italic text-[#FF3333]">real impact</span>
            </h2>
          </div>
          <Link
            href="/works"
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            View All Works
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-[24px] border border-gray-100 bg-gray-50 p-10 text-center text-gray-500">
            Add your first projects in Sanity Studio to feature them here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {projects.map((project) => (
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

                  <h3 className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-medium text-black group-hover:text-[#FF3333] transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
