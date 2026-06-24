import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/sanity/types";

function ProjectImage({ project, index }: { project: Project; index: number }) {
  if (!project.coverUrl) {
    return (
      <div className="placeholder-media aspect-[16/10]">
        <span className="section-label">{project.title} / Visual pending</span>
      </div>
    );
  }

  return (
    <div className={`media-frame relative ${index === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
      <Image
        src={project.coverUrl}
        alt={project.coverAlt || project.title}
        fill
        sizes={index === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      />
    </div>
  );
}

export default function Works({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="bg-night px-4 py-24 md:py-36">
      <div className="site-shell">
        <div className="mb-16 grid gap-6 md:grid-cols-[0.34fr_1fr]">
          <p className="section-label">Selected Work</p>
          <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-8xl">
            Image-led projects with strategy underneath.
          </h2>
        </div>

        {projects.length === 0 ? (
          <div className="placeholder-media">
            <div className="max-w-md text-center">
              <p className="section-label mb-4">Sanity empty state</p>
              <p className="text-2xl font-bold text-ink">Add projects in Sanity Studio to populate this section.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-12 md:gap-20">
            {projects.map((project, index) => (
              <Link
                key={project._id}
                href={`/work/${project.slug}`}
                className={`group grid gap-5 ${index > 0 ? "md:grid-cols-2 md:items-end" : ""} ${
                  index === 2 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <ProjectImage project={project} index={index} />
                <div className={index === 0 ? "grid gap-4 md:grid-cols-[1fr_0.45fr]" : ""}>
                  <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-ink md:text-6xl">
                    {project.title}
                  </h3>
                  <div className="mt-2 grid gap-3 text-sm text-muted">
                    <p>{project.description}</p>
                    <p className="section-label">
                      {[project.category, project.year, project.role].filter(Boolean).join(" / ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16">
          <Link href="/work" className="editorial-link text-lg font-bold">
            View all work
          </Link>
        </div>
      </div>
    </section>
  );
}
