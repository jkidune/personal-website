import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import PageHeader from "@/components/PageHeader";
import ProjectCollection from "@/components/ProjectCollection";
import Icon from "@/components/Icon";
export const metadata: Metadata = { title: "Projects" };
export default async function WorkPage() {
  const { projects, unavailable } = await getProjects();
  return (
    <main className="page">
      <PageHeader
        eyebrow="The portfolio"
        title="Projects"
        description="A collection of work across communication, digital design, and storytelling. Different challenges, one thoughtful approach."
      />
      {projects.length ? (
        <ProjectCollection projects={projects} />
      ) : (
        <div className="card empty-card">
          <Icon name="work" width="30" height="30" />
          <h2>
            {unavailable
              ? "The collection is temporarily unavailable."
              : "More work is on the way."}
          </h2>
          <p>In the meantime, explore my portfolio on Bento.</p>
          <a
            href="https://bento.me/joseph-masonda"
            target="_blank"
            rel="noreferrer"
            className="button button-dark"
          >
            Explore portfolio
            <Icon name="arrow" />
          </a>
        </div>
      )}
    </main>
  );
}
