'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  description: string
  full_description: string
  cover_url: string
  live_url: string
  github_url: string
  tech_stack: string[]
  featured: boolean
}

export default function ProjectPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [related, setRelated] = useState<Project[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single()

      if (data) {
        setProject(data)
        const { data: rel } = await supabase
          .from('projects')
          .select('*')
          .neq('slug', slug)
          .limit(2)
        if (rel) setRelated(rel)
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <div className="container" style={{ paddingTop: '10rem' }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{
              height: i === 0 ? 56 : 20,
              background: 'var(--surface)', borderRadius: 8,
              marginBottom: '1.5rem', opacity: 0.5,
              width: i === 1 ? '50%' : '100%',
            }} />
          ))}
        </div>
      </main>
    )
  }

  if (!project) {
    return (
      <main style={{
        background: 'var(--bg)', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Project not found.</p>
          <a href="/" className="btn-primary">Go Home</a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Navbar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,8,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)', padding: '1.25rem 0',
      }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <a href="/" style={{
            fontFamily: 'var(--font-inter)', fontSize: '1.1rem',
            fontWeight: 700, color: 'var(--white)', textDecoration: 'none',
          }}>
            Joseph<span style={{ color: 'var(--accent)' }}>.</span>
          </a>
          <a href="/#works"
            style={{
              color: 'var(--muted)', textDecoration: 'none',
              fontSize: '0.85rem', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← Back to Works
          </a>
        </div>
      </div>

      {/* Hero Image */}
      <div style={{ width: '100%', height: '65vh', position: 'relative', overflow: 'hidden' }}>
        <img
          src={project.cover_url}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, var(--bg) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'flex-end', paddingBottom: '4rem',
        }}>
          <div className="container">
            <div style={{ maxWidth: 720 }}>
              <div style={{
                display: 'inline-block',
                fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem',
                color: 'var(--accent)', letterSpacing: '0.12em',
                textTransform: 'uppercase', marginBottom: '1rem',
                background: 'rgba(200,181,96,0.1)',
                padding: '0.35rem 0.85rem', borderRadius: 100,
                border: '1px solid rgba(200,181,96,0.3)',
              }}>
                {project.category}
              </div>
              <h1 style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                fontWeight: 800, color: 'var(--white)',
                lineHeight: 1.1, letterSpacing: '-0.03em',
              }}>
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container" style={{ paddingBottom: '8rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '5rem',
          alignItems: 'start',
          marginTop: '4rem',
        }}>

          {/* Left */}
          <div>
            <p style={{
              fontSize: '1.2rem', color: 'var(--text)',
              lineHeight: 1.8, marginBottom: '2.5rem',
              fontStyle: 'italic',
              paddingBottom: '2.5rem',
              borderBottom: '1px solid var(--border)',
            }}>
              {project.description}
            </p>

            {project.full_description && (
              <div style={{
                fontSize: '1.05rem', color: 'var(--muted)',
                lineHeight: 1.9, whiteSpace: 'pre-wrap',
              }}>
                {project.full_description}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}>
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View Live Project ↗
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </div>

          {/* Right — sidebar */}
          <div style={{ position: 'sticky', top: '6rem' }}>

            {project.tech_stack && project.tech_stack.length > 0 && (
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem',
                  color: 'var(--accent)', letterSpacing: '0.12em',
                  textTransform: 'uppercase', marginBottom: '1rem',
                }}>
                  Tech Stack
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tech_stack.map((tech) => (
                    <span key={tech} style={{
                      padding: '0.4rem 0.85rem',
                      border: '1px solid var(--border)',
                      borderRadius: 100, fontSize: '0.8rem', color: 'var(--muted)',
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem',
            }}>
              <p style={{
                fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem',
                color: 'var(--accent)', letterSpacing: '0.12em',
                textTransform: 'uppercase', marginBottom: '1rem',
              }}>
                Project Info
              </p>
              {[
                { label: 'Category', value: project.category },
                { label: 'Author', value: 'Joseph Masonda' },
                { label: 'Location', value: 'Dar es Salaam, Tanzania' },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  paddingBottom: '0.75rem', marginBottom: '0.75rem',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{label}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text)', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Status</span>
                <span style={{
                  fontSize: '0.75rem', color: '#4a7c59',
                  background: 'rgba(74,124,89,0.1)',
                  padding: '0.2rem 0.6rem', borderRadius: 100,
                  border: '1px solid rgba(74,124,89,0.3)',
                }}>● Live</span>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(200,181,96,0.1), rgba(74,124,89,0.1))',
              border: '1px solid var(--border)',
              borderRadius: 16, padding: '1.5rem', textAlign: 'center',
            }}>
              <p style={{
                fontFamily: 'var(--font-inter)', fontWeight: 700,
                color: 'var(--white)', marginBottom: '0.5rem', fontSize: '0.95rem',
              }}>
                Want something like this?
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                Let's talk about your project idea.
              </p>
              <a
                href="mailto:kidunejoseph91@gmail.com"
                className="btn-primary"
                style={{ width: '100%', textAlign: 'center', display: 'block' }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <div style={{ marginTop: '6rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem',
              color: 'var(--accent)', letterSpacing: '0.15em',
              textTransform: 'uppercase', marginBottom: '2rem',
            }}>
              More Projects
              <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {related.map((p) => (
                <div
                  key={p.id}
                  onClick={() => router.push(`/works/${p.slug}`)}
                  style={{
                    position: 'relative', overflow: 'hidden',
                    borderRadius: 16, border: '1px solid var(--border)',
                    cursor: 'pointer', transition: 'border-color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <img
                    src={p.cover_url} alt={p.title}
                    style={{
                      width: '100%', height: 220,
                      objectFit: 'cover', display: 'block',
                      filter: 'brightness(0.6)',
                      transition: 'filter 0.3s',
                    }}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem',
                      color: 'var(--accent)', letterSpacing: '0.12em',
                      textTransform: 'uppercase', marginBottom: '0.4rem',
                    }}>{p.category}</div>
                    <div style={{
                      fontFamily: 'var(--font-inter)', fontSize: '1.1rem',
                      fontWeight: 700, color: 'var(--white)',
                    }}>{p.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
