import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { capabilities, experience, profile, tools } from "@/lib/profile";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
export const metadata: Metadata = { title: "About me" };
export default function AboutPage() {
  return (
    <main className="page">
      <PageHeader
        eyebrow="The person behind the work"
        title="A little about me."
        action={
          <a
            className="button button-light"
            href="/JOSEPH%20MASONDA%20RESUME%202026.docx"
            download
          >
            <Icon name="download" width="16" height="16" />
            Download CV
          </a>
        }
      />
      <section className="about-grid">
        <div className="card about-copy">
          <h2>Strategy with a storyteller’s eye.</h2>
          <p>{profile.summary}</p>
          <p>
            My work spans donor-funded programmes, advocacy campaigns, knowledge
            sharing, digital platforms, and multimedia production.
          </p>
          <p>
            A foundation in Wildlife Management and postgraduate study in Mass
            Communication and Journalism inform how I connect environmental and
            social issues with the people who matter.
          </p>
          <Link href="/contact" className="button button-dark">
            Let’s work together
            <Icon name="arrow" width="17" height="17" />
          </Link>
        </div>
        <div className="about-portrait">
          <Image
            src={profile.images.tall}
            alt="Joseph Masonda"
            fill
            priority
            sizes="(min-width: 960px) 35vw, 100vw"
          />
          <div className="about-photo-label">
            <strong>Joseph Masonda</strong>
            <span>Communicator. Designer. Storyteller.</span>
          </div>
        </div>
      </section>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Along the way</p>
            <h2>Experience</h2>
          </div>
        </div>
        <div className="card experience-list">
          {experience.map((item) => (
            <div className="experience-row" key={item.organization}>
              <span className="experience-icon">
                <Icon name="briefcase" />
              </span>
              <div>
                <h3>{item.role}</h3>
                <p>{item.organization}</p>
              </div>
              <span>
                {item.period === "CV documented role"
                  ? "Previous experience"
                  : item.period}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="capability-grid">
        <div className="card capability-card">
          <h2>What I bring</h2>
          <div className="tags">
            {capabilities.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="card capability-card">
          <h2>In my toolkit</h2>
          <div className="tags">
            {tools.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
