import Image from "next/image";
import { capabilities, experience, profile, tools } from "@/lib/profile";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-night px-4 pb-24 pt-32">
      <div className="site-shell">
        <header className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:items-end">
          <div className="media-frame relative aspect-[4/5]">
            <Image src={profile.images.tall} alt="Joseph Masonda portrait" fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="section-label mb-5">About Joseph</p>
            <h1 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.075em] md:text-[9rem]">
              Strategy with a storyteller&apos;s eye.
            </h1>
          </div>
        </header>

        <section className="grid gap-12 py-20 lg:grid-cols-[0.32fr_1fr]">
          <p className="section-label">Biography</p>
          <div className="max-w-4xl">
            <p className="text-3xl font-bold leading-tight text-ink md:text-5xl">{profile.summary}</p>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">
              His work spans donor-funded programmes, knowledge management, advocacy campaigns, website and social media systems, event communication, and multimedia production. His academic foundation in Wildlife Management and ongoing postgraduate study in Mass Communication and Journalism shape a practice grounded in both environmental context and public communication.
            </p>
          </div>
        </section>

        <section className="grid gap-12 py-12 lg:grid-cols-[0.32fr_1fr]">
          <p className="section-label">Selected Experience</p>
          <div className="border-t border-line">
            {experience.map((item) => (
              <div key={`${item.organization}-${item.role}`} className="grid gap-3 border-b border-line py-5 md:grid-cols-[1fr_1fr_0.45fr]">
                <span className="font-bold uppercase text-ink">{item.organization}</span>
                <span className="text-ink/85">{item.role}</span>
                <span className="text-muted">{item.period}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-12 py-12 lg:grid-cols-[0.32fr_1fr]">
          <p className="section-label">Capabilities</p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {capabilities.map((item) => (
              <span key={item} className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-ink md:text-6xl">{item}</span>
            ))}
          </div>
        </section>

        <section className="grid gap-12 py-12 lg:grid-cols-[0.32fr_1fr]">
          <p className="section-label">Tools / Platforms</p>
          <div className="grid gap-3 md:grid-cols-3">
            {tools.map((item) => (
              <span key={item} className="border-t border-line pt-3 text-muted">{item}</span>
            ))}
          </div>
        </section>

        <div className="grid gap-6 py-12 md:grid-cols-2">
          <div className="media-frame relative aspect-[16/10]">
            <Image src={profile.images.secondary} alt="Joseph Masonda portrait" fill sizes="50vw" className="object-cover" />
          </div>
          <div className="media-frame relative aspect-[16/10]">
            <Image src={profile.images.field} alt="Joseph Masonda field work" fill sizes="50vw" className="object-cover" />
          </div>
        </div>

        <a href="/JOSEPH MASONDA RESUME 2026.docx" className="editorial-link font-bold">
          Download CV
        </a>
      </div>
    </main>
  );
}
