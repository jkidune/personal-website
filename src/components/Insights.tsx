'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  tag: string
  cover_url: string
  created_at: string
}

export default function Insights() {
  const [posts, setPosts] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setPosts(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }), { threshold: 0.1 }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    }, 100)
    return () => { clearTimeout(timer); observer.disconnect() }
  }, [loading])

  return (
    <section id="insights" style={{ padding: '7rem 0', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem',
          color: 'var(--accent)', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: '2rem',
        }}>
          Insights
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
            fontWeight: 800, color: 'var(--white)',
            maxWidth: 500, lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}>
            Thoughts on{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>tech & conservation</em>
          </h2>
          <a href="/insights" className="btn-secondary">View All Insights</a>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                background: 'var(--surface)', borderRadius: 16,
                height: 340, opacity: 0.5,
              }} />
            ))}
          </div>
        ) : (
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {posts.map((p) => (
              <div
                key={p.id}
                onClick={() => router.push(`/insights/${p.slug}`)}
                style={{
                  border: '1px solid var(--border)', borderRadius: 16,
                  overflow: 'hidden', transition: 'border-color 0.3s, transform 0.2s',
                  cursor: 'pointer', height: '100%',
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
                <img
                  src={p.cover_url}
                  alt={p.title}
                  style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem',
                    color: 'var(--accent)', letterSpacing: '0.12em',
                    textTransform: 'uppercase', marginBottom: '0.75rem',
                  }}>{p.tag}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-inter)', fontSize: '1.05rem',
                    fontWeight: 700, color: 'var(--white)',
                    lineHeight: 1.4, marginBottom: '0.75rem',
                  }}>{p.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                    {p.excerpt}
                  </p>
                  <div style={{
                    marginTop: '1.25rem', fontSize: '0.8rem',
                    color: 'var(--accent)', fontWeight: 500,
                  }}>
                    Read more →
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}