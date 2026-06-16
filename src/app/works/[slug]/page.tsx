import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery, relatedProjectsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/types";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await client.fetch<Project | null>(projectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  const related = await client.fetch<Project[]>(relatedProjectsQuery, { slug });

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mb-12">
          <div className="flex items-center gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-6">
            <span className="w-6 h-[1px] bg-[#FF3333]"></span>
            {project.category}
          </div>
          <h1 className="font-[family-name:var(--font-outfit)] text-5xl md:text-7xl font-medium text-black leading-[1.1] mb-8">
            {project.title}
          </h1>
        </div>

        <div className="w-full aspect-video md:aspect-[2/1] rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 mb-16 md:mb-24">
          {project.coverUrl ? (
            <img
              src={project.coverUrl}
              alt={project.coverAlt || project.title}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-medium text-black mb-6">
              Overview
            </h3>
            <p className="text-xl md:text-2xl text-black leading-relaxed font-light mb-12">
              {project.description}
            </p>

            {project.fullDescription ? (
              <div className="prose prose-lg text-gray-500 leading-relaxed whitespace-pre-wrap font-light max-w-none">
                {project.fullDescription}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-4 mt-12">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white hover:bg-[#FF3333] transition-colors duration-300 font-medium"
                >
                  View Live Project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gray-200 text-black hover:border-black transition-colors duration-300 font-medium"
                >
                  View on GitHub
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>

          <div className="space-y-12">
            {project.techStack && project.techStack.length > 0 ? (
              <div>
                <h4 className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-gray-400 uppercase mb-6">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div>
              <h4 className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-gray-400 uppercase mb-6">
                Project Info
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Role</span>
                  <span className="font-medium text-black">{project.role || "Design & Dev"}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Year</span>
                  <span className="font-medium text-black">{project.year || new Date().getFullYear()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Location</span>
                  <span className="font-medium text-black">{project.location || "Tanzania"}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-[24px] border border-gray-100">
              <h4 className="font-[family-name:var(--font-outfit)] text-xl font-medium text-black mb-2">
                Need something similar?
              </h4>
              <p className="text-gray-500 text-sm mb-6">
                I can help you build your next big idea. Let&apos;s talk.
              </p>
              <Link
                href="/contact"
                className="block w-full py-3 bg-black text-white text-center rounded-full text-sm font-medium hover:bg-[#FF3333] transition-colors duration-300"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-32 border-t border-gray-100 pt-16">
            <div className="flex items-center justify-between mb-12">
              <h3 className="font-[family-name:var(--font-outfit)] text-3xl font-medium text-black">
                More Projects
              </h3>
              <Link href="/works" className="text-sm font-medium underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-all">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/works/${item.slug}`}
                  className="group cursor-pointer flex flex-col gap-6"
                >
                  <div className="relative overflow-hidden rounded-[24px] bg-gray-50 border border-gray-100 aspect-[4/3]">
                    {item.coverUrl ? (
                      <img
                        src={item.coverUrl}
                        alt={item.coverAlt || item.title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[4px]"
                      />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-outfit)] text-2xl font-medium text-black group-hover:text-[#FF3333] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 mt-2 text-sm">{item.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
