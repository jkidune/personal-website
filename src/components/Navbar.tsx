'use client'

import { useEffect, useState } from 'react'

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
      padding: '1.5rem 3rem',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      background: scrolled ? 'rgba(10,10,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s',
    }}>
      <a href="/" style={{
        fontFamily: 'var(--font-playfair)', fontSize: '1.2rem',
        fontWeight: 700, color: 'var(--white)', textDecoration: 'none',
      }}>
        Joseph<span style={{ color: 'var(--accent)' }}>.</span>
      </a>
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {['about', 'works', 'insights'].map((link) => (
          <a key={link} href={`#${link}`} style={{
            color: 'var(--muted)', textDecoration: 'none',
            fontSize: '0.85rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {link}
          </a>
        ))}
        <a href="mailto:kidunejoseph91@gmail.com" style={{
          background: 'var(--accent)', color: 'var(--bg)',
          padding: '0.6rem 1.4rem', borderRadius: '2px',
          textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
          letterSpacing: '0.05em', transition: 'background 0.2s',
        }}>
          Let's Talk
        </a>
      </div>
    </nav>
  )
}