import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { projects } = await getProjects();

  return (
    <main className="admin-content">
      <section className="admin-dashboard-head admin-dashboard-head-row">
        <div>
          <p className="eyebrow">Content management</p>
          <h1>Projects</h1>
          <p>These project records are sourced from Sanity when CMS content is available.</p>
        </div>
        <Link href="/studio" target="_blank" className="button button-dark">
          Edit in Sanity ↗
        </Link>
      </section>

      <section className="admin-content-list">
        {projects.map((project) => (
          <article className="admin-content-row card" key={project._id || project.slug}>
            <div>
              <span className="admin-content-type">{project.category || "Project"}</span>
              <h2>{project.title}</h2>
              <p>{project.description || "No short description added yet."}</p>
            </div>
            <div className="admin-content-row-meta">
              {project.year ? <span>{project.year}</span> : null}
              <Link href={`/work/${project.slug}`} target="_blank">
                View ↗
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
