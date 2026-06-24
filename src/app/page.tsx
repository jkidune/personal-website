import Hero from '@/components/Hero'
import Works from '@/components/Works'
import About from '@/components/About'
import Insights from '@/components/Insights'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { featuredProjectsQuery } from '@/sanity/lib/queries'
import type { Project } from '@/sanity/types'
import { getArchiveIndex } from '@/lib/archive'
import { profile } from '@/lib/profile'

export default async function Home() {
  const projects = await client.fetch<Project[]>(featuredProjectsQuery)
  const archive = getArchiveIndex()
  const trailImages = [
    ...projects
      .filter((project) => project.coverUrl)
      .map((project) => ({ src: project.coverUrl as string, alt: project.coverAlt || project.title })),
    { src: profile.images.portrait, alt: 'Joseph Masonda portrait' },
    { src: profile.images.field, alt: 'Joseph Masonda field work image' },
  ]

  return (
    <main className="bg-night">
      <Hero trailImages={trailImages} />
      <Works projects={projects} />
      <About />
      <Insights articles={archive} />
      <section className="bg-ink px-4 py-20 text-night md:py-28">
        <div className="site-shell">
          <div className="grid gap-10 md:grid-cols-[1fr_0.4fr] md:items-end">
            <h2 className="max-w-[10ch] text-6xl font-black uppercase leading-[0.86] tracking-[-0.075em] text-night md:text-9xl">
              Let&apos;s make something meaningful.
            </h2>
            <div>
              <p className="mb-8 max-w-sm text-lg font-bold leading-snug text-night/70">
                Available for communications strategy, digital design, content systems, and conservation storytelling.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="bg-night px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-ink">
                  Contact
                </Link>
                <a href={`mailto:${profile.email}`} className="border border-night px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-night">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
