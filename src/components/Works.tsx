'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  title: string
  category: string
  cover_url: string
  url: string
  featured: boolean
}

export default function Works() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch data first
  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setProjects(data)
        setLoading(false)
      })
  }, [])

  // Run observer only after data is loaded
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

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [loading])

  return (
    <section id="works" style={{ padding: '7rem 0' }}>
      <div className="container">
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem',
          color: 'var(--accent)', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: '2rem',
        }}>
          Selected Works
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
            Projects built for{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>real impact</em>
          </h2>
          <a href="#" className="btn-secondary">View All Works</a>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                background: 'var(--surface)', borderRadius: 16,
                height: i === 0 ? 580 : 280,
                gridRow: i === 0 ? 'span 2' : undefined,
                opacity: 0.5,
              }} />
            ))}
          </div>
        ) : (
          <div className="reveal" style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem',
          }}>
            {projects.map((w, i) => (
              <div key={w.id} style={{
                position: 'relative', overflow: 'hidden',
                borderRadius: 16, border: '1px solid var(--border)',
                gridRow: i === 0 ? 'span 2' : undefined,
                cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  const img = e.currentTarget.querySelector('img') as HTMLImageElement
                  if (img) { img.style.transform = 'scale(1.04)'; img.style.filter = 'brightness(0.5)' }
                  const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement
                  if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translateY(0)' }
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget.querySelector('img') as HTMLImageElement
                  if (img) { img.style.transform = 'scale(1)'; img.style.filter = 'brightness(0.7)' }
                  const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement
                  if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translateY(8px)' }
                }}
              >
                <img src={w.cover_url} alt={w.title} style={{
                  width: '100%', height: '100%',
                  minHeight: i === 0 ? 580 : 280,
                  objectFit: 'cover', display: 'block',
                  transition: 'transform 0.6s ease, filter 0.4s',
                  filter: 'brightness(0.7)',
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '2rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem',
                    color: 'var(--accent)', letterSpacing: '0.12em',
                    textTransform: 'uppercase', marginBottom: '0.5rem',
                  }}>{w.category}</div>
                  <div style={{
                    fontFamily: 'var(--font-inter)', fontSize: '1.3rem',
                    fontWeight: 700, color: 'var(--white)',
                  }}>{w.title}</div>
                </div>
                <div className="arrow" style={{
                  position: 'absolute', top: '1.5rem', right: '1.5rem',
                  width: 40, height: 40, background: 'var(--accent)',
                  borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'var(--bg)', fontSize: '1rem',
                  opacity: 0, transform: 'translateY(8px)',
                  transition: 'opacity 0.3s, transform 0.3s',
                }}>↗</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}