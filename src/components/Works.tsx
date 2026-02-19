'use client'
import { useEffect } from 'react'

const works = [
  {
    title: 'Wildlife Conservation Platform',
    category: 'Conservation Tech',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    span: true,
  },
  {
    title: 'WriterMatch Platform',
    category: 'Web Application',
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
  },
  {
    title: 'Documentary Production',
    category: 'Videography & Content',
    img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
  },
]

export default function Works() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }), { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="works" style={{ padding: '7rem 0' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem',
        color: 'var(--accent)', letterSpacing: '0.15em',
        textTransform: 'uppercase', marginBottom: '2rem',
      }}>
        Selected Works (03)
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
          fontWeight: 700, lineHeight: 1.15,
          color: 'var(--white)', maxWidth: 500,
        }}>
          Projects built for <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>real impact</em>
        </h2>
        <a href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem' }}>
          View All Works →
        </a>
      </div>

      <div className="container" style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem',
      }}>
        {works.map((w, i) => (
          <div key={i} style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 4, border: '1px solid var(--border)',
            gridRow: w.span ? 'span 2' : undefined,
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
            <img src={w.img} alt={w.title} style={{
              width: '100%', height: '100%',
              minHeight: w.span ? 580 : 280,
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
                fontFamily: 'var(--font-playfair)', fontSize: '1.3rem',
                color: 'var(--white)',
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
    </section>
  )
}