import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import Icon from "@/components/Icon";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { projects } = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project?.title || "Project",
    description: project?.description,
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const { projects, unavailable } = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  if (unavailable)
    return (
      <main className="page">
        <div className="card empty-card">
          <h1>This project is temporarily unavailable.</h1>
          <p>Please try again shortly, or contact me for more details.</p>
          <Link href="/contact" className="button button-dark">
            Get in touch
          </Link>
        </div>
      </main>
    );
  if (!project) notFound();
  const related = projects.filter((p) => p.slug !== slug).slice(0, 2);
  const facts = [
    ["Client", project.client],
    ["Year", project.year?.toString()],
    ["Role", project.role],
    ["Services", project.services?.join(", ") || project.category],
    ["Tools", project.techStack?.join(", ")],
  ].filter(([, value]) => value);
  return (
    <main className="page">
      <Link className="detail-back" href="/work">
        <Icon name="back" width="16" height="16" />
        All projects
      </Link>
      <header className="detail-header">
        <span className="eyebrow">
          {project.category || "Selected project"}
        </span>
        <h1>{project.title}</h1>
        {project.description && <p>{project.description}</p>}
      </header>
      <div className="detail-cover">
        <Image
          src={project.coverUrl || "/images/paper-flow.webp"}
          alt={project.coverUrl ? project.coverAlt || project.title : ""}
          fill
          priority
          sizes="(min-width: 1000px) 75vw, 100vw"
        />
      </div>
      <div className="detail-layout">
        <div className="card detail-notes">
          {project.fullDescription && (
            <section>
              <h2>Overview</h2>
              <p>{project.fullDescription}</p>
            </section>
          )}
          {[
            ["The challenge", project.challenge],
            ["The approach", project.approach],
            ["The outcome", project.outcome],
          ]
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <section key={label}>
                <h2>{label}</h2>
                <p>{value}</p>
              </section>
            ))}
          {Boolean(project.deliverables?.length) && (
            <section>
              <h2>Deliverables</h2>
              <ul>
                {project.deliverables?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
          {!project.fullDescription &&
            !project.challenge &&
            !project.approach &&
            !project.outcome &&
            !project.deliverables?.length && (
              <section>
                <h2>About this project</h2>
                <p>
                  {project.description ||
                    `A selection from my work in ${project.category?.toLowerCase() || "communication and design"}.`}
                </p>
                <p>
                  Get in touch to learn more about the process and my
                  contribution.
                </p>
              </section>
            )}
        </div>
        <aside className="card project-facts">
          <dl>
            {facts.map(([label, value]) => (
              <div className="fact" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {[
            ["View website", project.liveUrl],
            ["Behance", project.behanceUrl],
            ["GitHub", project.githubUrl],
            ["Vimeo", project.vimeoUrl],
          ]
            .filter(([, href]) => href)
            .map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="button button-light"
                target="_blank"
                rel="noreferrer"
              >
                {label}
                <Icon name="arrow" width="16" height="16" />
              </a>
            ))}
        </aside>
      </div>
      {Boolean(project.gallery?.length) && (
        <div className="gallery-grid">
          {project.gallery
            ?.filter((image) => image.url)
            .map((image, index) => (
              <figure key={`${image.url}-${index}`}>
                <div className="gallery-photo">
                  <Image
                    src={image.url!}
                    alt={image.alt || project.title}
                    fill
                    sizes="(min-width: 700px) 40vw, 100vw"
                  />
                </div>
                {image.caption && <figcaption>{image.caption}</figcaption>}
              </figure>
            ))}
        </div>
      )}
      {related.length > 0 && (
        <section className="section-block">
          <div className="section-heading">
            <h2>More to explore</h2>
          </div>
          <div className="project-grid collection-grid">
            {related.map((item, index) => (
              <ProjectCard key={item._id} project={item} index={index} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
