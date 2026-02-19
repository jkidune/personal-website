const testimonials = [
  {
    quote: '"Joseph brings a rare combination of strategic thinking and genuine passion for impact. His communications work elevated everything we were trying to achieve."',
    name: 'Amina Mwalimu', role: 'Programme Director, DVV International', initial: 'A',
  },
  {
    quote: '"His ability to translate complex conservation issues into compelling digital content is something I haven\'t seen often. Truly exceptional communicator."',
    name: 'David Kimani', role: 'Conservation Lead, Wildlife Fund', initial: 'D',
  },
  {
    quote: '"Joseph built our digital presence from the ground up. Professional, creative, and deeply committed to getting things right. Would work with him again immediately."',
    name: 'Sarah Oluwole', role: 'Founder, GreenAfrica Initiative', initial: 'S',
  },
]

export default function Testimonials() {
  return (
    <section style={{ padding: '7rem 0', borderTop: '1px solid var(--border)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem',
        color: 'var(--accent)', letterSpacing: '0.15em',
        textTransform: 'uppercase', marginBottom: '4rem',
      }}>
        Kind Words (04)
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            padding: '2rem', border: '1px solid var(--border)',
            borderRadius: 4, background: 'var(--surface)',
          }}>
            <p style={{
              fontFamily: 'var(--font-playfair)', fontSize: '0.95rem',
              fontStyle: 'italic', color: 'var(--text)',
              lineHeight: 1.7, marginBottom: '1.5rem',
            }}>{t.quote}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--border)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-playfair)', fontSize: '1rem',
                color: 'var(--accent)',
              }}>{t.initial}</div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 500 }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}