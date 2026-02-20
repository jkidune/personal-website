'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  tag: string
  cover_url: string
  created_at: string
}

const ALL_TAGS = ['All', 'Conservation Tech', 'Digital Marketing', 'Web Development']

export default function InsightsPage() {
  const [posts, setPosts] = useState<Article[]>([])
  const [filtered, setFiltered] = useState<Article[]>([])
  const [activeTag, setActiveTag] = useState('All')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) { setPosts(data); setFiltered(data) }
        setLoading(false)
      })
  }, [])

  const filterByTag = (tag: string) => {
    setActiveTag(tag)
    setFiltered(tag === 'All' ? posts : posts.filter(p => p.tag === tag))
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
            All Articles
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 800, color: 'var(--white)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
            }}>
              Insights
            </h1>
            {/* Tag filters */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => filterByTag(tag)}
                  style={{
                    padding: '0.5rem 1.1rem', borderRadius: 100,
                    border: `1px solid ${activeTag === tag ? 'var(--accent)' : 'var(--border)'}`,
                    background: activeTag === tag ? 'rgba(200,181,96,0.12)' : 'transparent',
                    color: activeTag === tag ? 'var(--accent)' : 'var(--muted)',
                    fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s',
                    fontFamily: 'var(--font-dm-mono)', letterSpacing: '0.05em',
                  }}
                >{tag}</button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                background: 'var(--surface)', borderRadius: 16,
                height: 320, opacity: 0.4,
              }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ color: 'var(--muted)' }}>No articles found for this category.</p>
          </div>
        ) : (
          <>
            {/* Featured article — full width */}
            {featured && (
              <div
                onClick={() => router.push(`/insights/${featured.slug}`)}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  border: '1px solid var(--border)', borderRadius: 20,
                  overflow: 'hidden', cursor: 'pointer',
                  marginBottom: '1.5rem', transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <img
                  src={featured.cover_url} alt={featured.title}
                  style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block', filter: 'brightness(0.85)' }}
                />
                <div style={{
                  padding: '3rem', background: 'var(--surface)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}>
                  <div style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem',
                    color: 'var(--accent)', letterSpacing: '0.12em',
                    textTransform: 'uppercase', marginBottom: '1rem',
                    background: 'rgba(200,181,96,0.1)',
                    padding: '0.3rem 0.75rem', borderRadius: 100,
                    border: '1px solid rgba(200,181,96,0.2)',
                    alignSelf: 'flex-start',
                  }}>
                    ✦ Featured · {featured.tag}
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-inter)', fontSize: '1.6rem',
                    fontWeight: 800, color: 'var(--white)',
                    lineHeight: 1.2, letterSpacing: '-0.02em',
                    marginBottom: '1rem',
                  }}>{featured.title}</h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {featured.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                      {new Date(featured.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 500 }}>Read more →</span>
                  </div>
                </div>
              </div>
            )}

            {/* Rest — 3 col grid */}
            {rest.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {rest.map(p => (
                  <div
                    key={p.id}
                    onClick={() => router.push(`/insights/${p.slug}`)}
                    style={{
                      border: '1px solid var(--border)', borderRadius: 16,
                      overflow: 'hidden', cursor: 'pointer',
                      transition: 'border-color 0.3s, transform 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <img src={p.cover_url} alt={p.title}
                      style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{
                        fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem',
                        color: 'var(--accent)', letterSpacing: '0.12em',
                        textTransform: 'uppercase', marginBottom: '0.75rem',
                      }}>{p.tag}</div>
                      <h3 style={{
                        fontFamily: 'var(--font-inter)', fontSize: '1rem',
                        fontWeight: 700, color: 'var(--white)',
                        lineHeight: 1.4, marginBottom: '0.75rem',
                      }}>{p.title}</h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                        {p.excerpt}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                          {new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                        <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>Read →</span>
                      </div>
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