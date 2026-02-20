'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'About', href: '/#about' },
  { label: 'Works', href: '/works' },
  { label: 'Insights', href: '/insights' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1.25rem 0',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      background: scrolled ? 'rgba(10,10,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div className="container" style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', width: '100%',
      }}>
        <a href="/" style={{
          fontFamily: 'var(--font-inter)', fontSize: '1.2rem',
          fontWeight: 800, color: 'var(--white)', textDecoration: 'none',
          letterSpacing: '-0.02em',
        }}>
          Joseph<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href} style={{
              color: 'var(--muted)', textDecoration: 'none',
              fontSize: '0.85rem', letterSpacing: '0.06em',
              textTransform: 'uppercase', transition: 'color 0.2s',
              fontFamily: 'var(--font-inter)', fontWeight: 500,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {label}
            </a>
          ))}
          <a href="/contact" style={{
            background: 'var(--accent)', color: 'var(--bg)',
            padding: '0.65rem 1.5rem', borderRadius: '100px',
            textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600,
            fontFamily: 'var(--font-inter)', letterSpacing: '0.02em',
            transition: 'background 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#d4c270'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </nav>
  )
}