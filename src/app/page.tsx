import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import ProjectCard from "@/components/ProjectCard";
import ArticleCard from "@/components/ArticleCard";
import { getArchiveIndex } from "@/lib/archive";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  const { projects, unavailable } = await getProjects();
  const featured = [...projects]
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .slice(0, 3);
  const articles = getArchiveIndex();
  return (
    <main className="page home-page">
      <header className="overview-bar">
        <span>
          <span className="small-star">✳</span> A little corner of my world
        </span>
        <a
          href="https://calendly.com/kidunejoseph91/30min"
          target="_blank"
          rel="noreferrer"
        >
          Let’s connect <Icon name="arrow" width="16" height="16" />
        </a>
      </header>
      <section className="intro-grid" aria-label="Introduction">
        <div className="intro-card card">
          <div className="intro-person">
            <Image
              src="/Masonda-profile.jpg"
              alt="Joseph Masonda"
              width={56}
              height={56}
              priority
            />
            <div>
              <span className="eyebrow">Hello, I’m</span>
              <h1>
                Joseph Masonda<span className="wave">✳</span>
              </h1>
            </div>
          </div>
          <h2>
            Clear strategy.
            <br />
            Thoughtful design.
            <br />
            <span>Stories that connect.</span>
          </h2>
          <p className="intro-description">
            I help ideas find their voice through strategic communications,
            digital design, and meaningful storytelling.
          </p>
          <Link href="/contact" className="button button-dark">
            <Icon name="chat" width="18" height="18" />
            Discuss a project
            <Icon name="arrow" width="17" height="17" />
          </Link>
          <div className="intro-tags">
            <span>
              <Icon name="globe" />
              Digital design
            </span>
            <span>
              <Icon name="pen" />
              Storytelling
            </span>
            <span>
              <Icon name="spark" />
              Strategy
            </span>
          </div>
          <div className="intro-foot">
            <span>Based in Dar es Salaam, TZ</span>
            <span>Creating since 2018</span>
          </div>
        </div>
        <div className="intro-art">
          <div className="art-panel paper-panel">
            <Image
              src="/images/paper-flow.webp"
              alt="Sculptural white paper flowing in delicate layers"
              fill
              priority
              sizes="(min-width: 1100px) 30vw, (min-width: 768px) 40vw, 100vw"
            />
            <span className="art-label">
              Clarity in every detail{" "}
              <Icon name="spark" width="16" height="16" />
            </span>
          </div>
          <Link href="/work" className="art-panel orbit-panel">
            <Image
              src="/images/pastel-orbit.webp"
              alt="Lavender sphere and an iridescent blue orbit"
              fill
              sizes="(min-width: 1100px) 30vw, (min-width: 768px) 40vw, 100vw"
            />
            <span className="art-label">
              A different perspective{" "}
              <span className="round-arrow">
                <Icon name="arrow" />
              </span>
            </span>
          </Link>
        </div>
      </section>
      <div className="at-a-glance">
        <div>
          <Icon name="briefcase" />
          <strong>7+ years</strong>
          <span>of creative practice</span>
        </div>
        <div>
          <Icon name="globe" />
          <strong>Strategy + storytelling</strong>
          <span>across programmes & brands</span>
        </div>
        <Link href="/archive">
          <Icon name="article" />
          <strong>{articles.length} stories</strong>
          <span>
            from my notebook <Icon name="arrow" width="15" height="15" />
          </span>
        </Link>
      </div>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The portfolio</p>
            <h2>
              Selected projects
              <span className="count-badge">{projects.length}</span>
            </h2>
          </div>
          <Link href="/work" className="text-link">
            All projects <Icon name="right" width="17" height="17" />
          </Link>
        </div>
        {featured.length > 0 ? (
          <div className="project-grid">
            {featured.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="empty-card card">
            <Icon name="work" />
            <h3>
              {unavailable
                ? "The project collection is temporarily unavailable."
                : "More work is on the way."}
            </h3>
            <p>
              Explore my creative work on Bento, or get in touch to discuss a
              project.
            </p>
            <a
              className="button button-light"
              href="https://bento.me/joseph-masonda"
              target="_blank"
              rel="noreferrer"
            >
              Explore portfolio <Icon name="arrow" />
            </a>
          </div>
        )}
      </section>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">From the notebook</p>
            <h2>Writing & ideas</h2>
          </div>
          <Link href="/archive" className="text-link">
            All stories <Icon name="right" width="17" height="17" />
          </Link>
        </div>
        <div className="article-grid">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
      <section className="collaboration-card card">
        <span className="collaboration-icon">
          <Icon name="chat" width="28" height="28" />
        </span>
        <div>
          <h2>Have something in mind?</h2>
          <p>Let’s turn your next idea into something meaningful.</p>
        </div>
        <Link href="/contact" className="button button-dark">
          Let’s talk <Icon name="arrow" />
        </Link>
      </section>
    </main>
  );
}
