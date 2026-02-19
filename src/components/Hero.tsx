export default function Hero() {
  return (
    <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', padding: '8rem 0 4rem' }}>
      {/* Glow effects */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,124,89,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: '30%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,181,96,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', height: '100%' }}>
        {/* Left */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: 'var(--font-dm-mono)', fontSize: '0.75rem',
            color: 'var(--accent)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '2rem',
            opacity: 0, animation: 'fadeUp 0.8s 0.2s forwards',
          }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
            Communications & Digital
          </div>

          <h1 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(3rem, 5vw, 5.5rem)',
            fontWeight: 900, lineHeight: 1.05,
            color: 'var(--white)', marginBottom: '2rem',
            opacity: 0, animation: 'fadeUp 0.8s 0.4s forwards',
            letterSpacing: '-0.03em',
          }}>
            Telling stories<br />
            that <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>move</em><br />
            the world forward
          </h1>

          <p style={{
            fontSize: '1.05rem', color: 'var(--muted)',
            lineHeight: 1.7, maxWidth: 480, marginBottom: '3rem',
            opacity: 0, animation: 'fadeUp 0.8s 0.6s forwards',
            fontFamily: 'var(--font-dm-sans)',
          }}>
            7 years building brands, digital strategies, and conservation narratives.
            I work at the intersection of technology, communication, and impact.
          </p>

          <div style={{
            display: 'flex', gap: '1rem', alignItems: 'center',
            opacity: 0, animation: 'fadeUp 0.8s 0.8s forwards',
          }}>
            <a href="#works" className="btn-primary">View My Work</a>
            <a href="mailto:kidunejoseph91@gmail.com" className="btn-secondary">Let's Talk</a>
          </div>
        </div>

        {/* Right */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          opacity: 0, animation: 'fadeIn 1.2s 0.5s forwards',
        }}>
          <div style={{ position: 'relative', width: 420, height: 520 }}>
            <img
              src="https://i.postimg.cc/G2Xt8j9H/77.png"
              alt="Joseph Masonda"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, filter: 'grayscale(20%)' }}
            />
            <div style={{
              position: 'absolute', bottom: '-1.5rem', left: '-2rem',
              background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '1rem 1.5rem', borderRadius: 12,
            }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', display: 'block' }}>7+</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>Years of Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}