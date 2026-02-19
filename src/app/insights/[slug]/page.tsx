'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  tag: string
  cover_url: string
  created_at: string
}

export default function ArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data }) => {
        if (data) setArticle(data)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <div className="container" style={{ padding: '10rem 3rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{
                height: i === 0 ? 48 : 20,
                background: 'var(--surface)',
                borderRadius: 8,
                marginBottom: '1.5rem',
                opacity: 0.5,
                width: i === 1 ? '60%' : '100%',
              }} />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (!article) {
    return (
      <main style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Article not found.</p>
          <a href="/" className="btn-primary">Go Home</a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Nav back */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,8,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '1.25rem 0',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{
            fontFamily: 'var(--font-inter)', fontSize: '1.1rem',
            fontWeight: 700, color: 'var(--white)', textDecoration: 'none',
          }}>
            Joseph<span style={{ color: 'var(--accent)' }}>.</span>
          </a>
          <a href="/#insights" style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            color: 'var(--muted)', textDecoration: 'none',
            fontSize: '0.85rem', transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← Back to Insights
          </a>
        </div>
      </div>

      {/* Hero */}
      <div style={{
        width: '100%', height: '60vh', position: 'relative',
        overflow: 'hidden', marginBottom: '4rem',
      }}>
        <img
          src={article.cover_url}
          alt={article.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.4)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'flex-end',
          padding: '0 0 4rem',
        }}>
          <div className="container">
            <div style={{ maxWidth: 760 }}>
              <div style={{
                display: 'inline-block',
                fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem',
                color: 'var(--accent)', letterSpacing: '0.12em',
                textTransform: 'uppercase', marginBottom: '1rem',
                background: 'rgba(200,181,96,0.1)',
                padding: '0.35rem 0.85rem', borderRadius: 100,
                border: '1px solid rgba(200,181,96,0.3)',
              }}>
                {article.tag}
              </div>
              <h1 style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 800, color: 'var(--white)',
                lineHeight: 1.1, letterSpacing: '-0.03em',
                marginBottom: '1rem',
              }}>
                {article.title}
              </h1>
              <p style={{
                fontSize: '1.05rem', color: 'rgba(240,237,230,0.7)',
                lineHeight: 1.6,
              }}>
                {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
                {' · '}
                {Math.ceil((article.content?.length || 0) / 1000)} min read
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="container">
        <div style={{ maxWidth: 720, margin: '0 auto', paddingBottom: '8rem' }}>

          {/* Excerpt */}
          <p style={{
            fontSize: '1.2rem', color: 'var(--text)',
            lineHeight: 1.8, marginBottom: '3rem',
            paddingBottom: '3rem', borderBottom: '1px solid var(--border)',
            fontStyle: 'italic',
          }}>
            {article.excerpt}
          </p>

          {/* Content */}
          <div style={{
            fontSize: '1.05rem', color: 'var(--muted)',
            lineHeight: 1.9, whiteSpace: 'pre-wrap',
          }}>
            {article.content || (
              <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
                Full article content coming soon.
              </p>
            )}
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '5rem', paddingTop: '3rem',
            borderTop: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>Written by</p>
              <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, color: 'var(--white)' }}>
                Joseph Masonda
              </p>
            </div>
            <a href="/#insights" className="btn-secondary">
              ← More Articles
            </a>
          </div>
        </div>
      </div>

    </main>
  )
}