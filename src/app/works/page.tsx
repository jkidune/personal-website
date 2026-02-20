'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  description: string
  cover_url: string
  featured: boolean
}

const ALL_CATEGORIES = ['All', 'Conservation Tech', 'Web Application', 'Videography & Content']

export default function WorksPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filtered, setFiltered] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) { setProjects(data); setFiltered(data) }
        setLoading(false)
      })
  }, [])

  const filterBy = (cat: string) => {
    setActiveCategory(cat)
    setFiltered(cat === 'All' ? projects : projects.filter(p => p.category === cat))
  }

  const featured = filtered[0]
  const rest = filtered.slice(1)

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
          <a href="/"
            style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← Back Home
          </a>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '9rem', paddingBottom: '8rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{
            fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem',
            color: 'var(--accent)', letterSpacing: '0.15em',
            textTransform: 'uppercase', marginBottom: '1rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
            All Projects
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 800, color: 'var(--white)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
            }}>
              Works
            </h1>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {ALL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => filterBy(cat)}
                  style={{
                    padding: '0.5rem 1.1rem', borderRadius: 100,
                    border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
                    background: activeCategory === cat ? 'rgba(200,181,96,0.12)' : 'transparent',
                    color: activeCategory === cat ? 'var(--accent)' : 'var(--muted)',
                    fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s',
                    fontFamily: 'var(--font-dm-mono)', letterSpacing: '0.05em',
                  }}
                >{cat}</button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{
                background: 'var(--surface)', borderRadius: 16,
                height: 340, opacity: 0.4,
              }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ color: 'var(--muted)' }}>No projects found in this category.</p>
          </div>
        ) : (
          <>
            {/* Featured — large */}
            {featured && (
              <div
                onClick={() => router.push(`/works/${featured.slug}`)}
                style={{
                  position: 'relative', overflow: 'hidden',
                  borderRadius: 20, cursor: 'pointer',
                  marginBottom: '1.5rem', border: '1px solid var(--border)',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  const img = e.currentTarget.querySelector('img') as HTMLImageElement
                  if (img) img.style.filter = 'brightness(0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  const img = e.currentTarget.querySelector('img') as HTMLImageElement
                  if (img) img.style.filter = 'brightness(0.55)'
                }}
              >
                <img
                  src={featured.cover_url} alt={featured.title}
                  style={{
                    width: '100%', height: 480,
                    objectFit: 'cover', display: 'block',
                    filter: 'brightness(0.55)', transition: 'filter 0.4s',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                }}>
                  <div>
                    <div style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem',
                      color: 'var(--accent)', letterSpacing: '0.12em',
                      textTransform: 'uppercase', marginBottom: '0.75rem',
                      background: 'rgba(200,181,96,0.1)',
                      padding: '0.3rem 0.75rem', borderRadius: 100,
                      border: '1px solid rgba(200,181,96,0.2)',
                    }}>
                      ✦ Featured · {featured.category}
                    </div>
                    <h2 style={{
                      fontFamily: 'var(--font-inter)', fontSize: '2rem',
                      fontWeight: 800, color: 'var(--white)',
                      lineHeight: 1.15, letterSpacing: '-0.02em',
                      marginBottom: '0.5rem',
                    }}>{featured.title}</h2>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(240,237,230,0.7)', maxWidth: 500 }}>
                      {featured.description}
                    </p>
                  </div>
                  <div style={{
                    width: 48, height: 48, background: 'var(--accent)',
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: 'var(--bg)', fontSize: '1.1rem', flexShrink: 0,
                  }}>↗</div>
                </div>
              </div>
            )}

            {/* Rest — 2 col grid */}
            {rest.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                {rest.map(p => (
                  <div
                    key={p.id}
                    onClick={() => router.push(`/works/${p.slug}`)}
                    style={{
                      position: 'relative', overflow: 'hidden',
                      borderRadius: 16, border: '1px solid var(--border)',
                      cursor: 'pointer', transition: 'border-color 0.3s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      const img = e.currentTarget.querySelector('img') as HTMLImageElement
                      if (img) img.style.filter = 'brightness(0.4)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      const img = e.currentTarget.querySelector('img') as HTMLImageElement
                      if (img) img.style.filter = 'brightness(0.65)'
                    }}
                  >
                    <img src={p.cover_url} alt={p.title}
                      style={{
                        width: '100%', height: 280,
                        objectFit: 'cover', display: 'block',
                        filter: 'brightness(0.65)', transition: 'filter 0.4s',
                      }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                    }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                      <div style={{
                        fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem',
                        color: 'var(--accent)', letterSpacing: '0.12em',
                        textTransform: 'uppercase', marginBottom: '0.4rem',
                      }}>{p.category}</div>
                      <div style={{
                        fontFamily: 'var(--font-inter)', fontSize: '1.15rem',
                        fontWeight: 700, color: 'var(--white)',
                      }}>{p.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}