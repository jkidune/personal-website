import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/sanity/types";
import Icon from "./Icon";
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="project-card">
      <div className="project-card-top">
        <span className="project-monogram">
          {(project.client || project.title).slice(0, 2).toUpperCase()}
        </span>
        <div>
          <strong>{project.client || "Selected project"}</strong>
          <small>{project.year || project.category || "Portfolio"}</small>
        </div>
        <Icon name="arrow" />
      </div>
      <div className="project-image">
        <Image
          src={
            project.coverUrl ||
            `/images/${index % 2 ? "pastel-orbit" : "paper-flow"}.webp`
          }
          alt={project.coverUrl ? project.coverAlt || project.title : ""}
          fill
          sizes="(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 100vw"
        />
        {!project.coverUrl && (
          <span className="image-caption">
            {project.category || "Communication & design"}
          </span>
        )}
      </div>
      <div className="project-card-body">
        <h3>{project.title}</h3>
        {project.description && <p>{project.description}</p>}
        <div className="tags">
          {(project.services?.length
            ? project.services
            : [project.category || "Communications"]
          )
            .slice(0, 3)
            .map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
        </div>
        {project.role && (
          <div className="card-meta">
            <Icon name="briefcase" width="16" height="16" />
            <span>{project.role}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
