import Link from "next/link";
import { capabilities, experience, profile } from "@/lib/profile";

export default function About() {
  return (
    <section className="bg-night px-4 py-24 md:py-32">
      <div className="site-shell">
        <div className="grid gap-16 lg:grid-cols-[0.38fr_1fr]">
          <div>
            <p className="section-label mb-5">Selected Experience</p>
            <p className="max-w-sm text-lg leading-relaxed text-muted">
              Roles and responsibilities drawn from Joseph&apos;s CV.
            </p>
          </div>
          <div>
            <div className="border-t border-line">
              {experience.map((item) => (
                <div key={`${item.organization}-${item.role}`} className="grid gap-3 border-b border-line py-5 text-sm md:grid-cols-[1fr_1fr_0.45fr]">
                  <span className="font-bold uppercase text-ink">{item.organization}</span>
                  <span className="text-ink/86">{item.role}</span>
                  <span className="text-muted">{item.period}</span>
                </div>
              ))}
            </div>
            <Link href="/about" className="editorial-link mt-8 inline-block font-bold">
              Read the full story
            </Link>
          </div>
        </div>

        <div className="mt-28 grid gap-10 lg:grid-cols-[0.38fr_1fr]">
          <div>
            <p className="section-label mb-5">Capabilities</p>
            <p className="max-w-sm text-lg leading-relaxed text-muted">{profile.summary}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {capabilities.map((item) => (
              <span key={item} className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-ink md:text-6xl">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
