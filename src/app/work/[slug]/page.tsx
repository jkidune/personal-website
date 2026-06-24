import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery, relatedProjectsQuery } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/types";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function metaRows(project: Project) {
  return [
    ["Client", project.client || project.category],
    ["Year", project.year?.toString()],
    ["Role", project.role],
    ["Services", project.services?.join(", ") || project.category],
    ["Tools", project.techStack?.join(", ")],
  ].filter(([, value]) => value);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await client.fetch<Project | null>(projectBySlugQuery, { slug });
  if (!project) notFound();

  const related = await client.fetch<Project[]>(relatedProjectsQuery, { slug });

  return (
    <main className="min-h-screen bg-night pb-24 pt-28">
      <article>
        <header className="site-shell px-4 pb-10">
          <p className="section-label mb-5">{project.category || "Project"}</p>
          <h1 className="max-w-6xl text-6xl font-black uppercase leading-[0.86] tracking-[-0.075em] md:text-[10rem]">
            {project.title}
          </h1>
        </header>

        <div className="media-frame relative aspect-[16/10] md:aspect-[16/7]">
          {project.coverUrl ? (
            <Image src={project.coverUrl} alt={project.coverAlt || project.title} fill priority sizes="100vw" className="object-cover" />
          ) : (
            <div className="placeholder-media h-full">
              <span className="section-label">{project.title} / Visual pending</span>
            </div>
          )}
        </div>

        <div className="site-shell grid gap-14 px-4 py-16 lg:grid-cols-[1fr_0.42fr]">
          <div>
            <p className="max-w-4xl text-2xl font-bold leading-tight text-ink md:text-5xl">
              {project.description || project.fullDescription || "Project details are being prepared in Sanity."}
            </p>
            {project.fullDescription ? (
              <p className="mt-10 max-w-3xl whitespace-pre-line text-lg leading-relaxed text-muted">{project.fullDescription}</p>
            ) : null}
          </div>
          <div className="border-t border-line">
            {metaRows(project).map(([label, value]) => (
              <div key={label} className="grid grid-cols-[0.35fr_1fr] gap-4 border-b border-line py-4 text-sm">
                <span className="section-label">{label}</span>
                <span className="text-ink">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="site-shell grid gap-12 px-4 lg:grid-cols-[0.32fr_1fr]">
          <p className="section-label">Project Notes</p>
          <div className="grid gap-10 md:grid-cols-2">
            {[
              ["Challenge", project.challenge],
              ["Approach", project.approach],
              ["Outcome", project.outcome],
            ].filter(([, value]) => value).map(([label, value]) => (
              <section key={label}>
                <h2 className="mb-4 text-2xl font-black uppercase tracking-[-0.04em]">{label}</h2>
                <p className="leading-relaxed text-muted">{value}</p>
              </section>
            ))}
            {project.deliverables && project.deliverables.length > 0 ? (
              <section>
                <h2 className="mb-4 text-2xl font-black uppercase tracking-[-0.04em]">Deliverables</h2>
                <ul className="grid gap-2 text-muted">
                  {project.deliverables.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            ) : null}
          </div>
        </div>

        <div className="site-shell grid gap-6 px-4 py-20">
          {(project.gallery || []).length > 0 ? (
            project.gallery?.map((image, index) => image.url ? (
              <figure key={`${image.url}-${index}`} className={`media-frame relative ${index % 3 === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                <Image src={image.url} alt={image.alt || project.title} fill sizes="100vw" className="object-cover" />
                {image.caption ? <figcaption className="absolute bottom-3 left-3 text-xs text-ink/80">{image.caption}</figcaption> : null}
              </figure>
            ) : null)
          ) : (
            <div className="placeholder-media">
              <span className="section-label">Gallery can be added in Sanity</span>
            </div>
          )}
        </div>

        <div className="site-shell flex flex-wrap gap-4 px-4">
          {[
            ["Website", project.liveUrl],
            ["Behance", project.behanceUrl],
            ["GitHub", project.githubUrl],
            ["Vimeo", project.vimeoUrl],
          ].filter(([, href]) => href).map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="editorial-link font-bold">
              {label}
            </a>
          ))}
        </div>
      </article>

      {related.length > 0 ? (
        <section className="site-shell mt-24 border-t border-line px-4 pt-10">
          <p className="section-label mb-8">Next Projects</p>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <Link key={item._id} href={`/work/${item.slug}`} className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-ink hover:text-accent">
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
