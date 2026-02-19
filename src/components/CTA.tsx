export default function CTA() {
  return (
    <section style={{
      padding: '8rem 0', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
      background: 'var(--surface)', borderTop: '1px solid var(--border)',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,181,96,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        fontFamily: 'var(--font-dm-mono)', fontSize: '0.75rem',
        color: 'var(--accent)', letterSpacing: '0.15em',
        textTransform: 'uppercase', marginBottom: '1.5rem',
      }}>Available for projects</div>
      <h2 style={{
        fontFamily: 'var(--font-playfair)',
        fontSize: 'clamp(2.5rem, 5vw, 5rem)',
        fontWeight: 900, color: 'var(--white)',
        lineHeight: 1.1, marginBottom: '2rem',
      }}>
        Let's build<br />
        something <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>worth</em><br />
        remembering
      </h2>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <a href="mailto:kidunejoseph91@gmail.com" style={{
          background: 'var(--accent)', color: 'var(--bg)',
          padding: '0.9rem 2rem', borderRadius: 2,
          textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
        }}>Get in Touch</a>
        <a href="#works" style={{
          color: 'var(--text)', textDecoration: 'none',
          fontSize: '0.875rem', letterSpacing: '0.05em',
        }}>View Work →</a>
      </div>
    </section>
  )
}