export default function About() {
  return (
    <section id="about" style={{
      padding: '7rem 0',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      gap: '6rem', alignItems: 'center',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem',
          color: 'var(--accent)', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: '2rem',
        }}>
          About Me (02)
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <h2 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(2rem, 3vw, 3rem)',
          fontWeight: 700, color: 'var(--white)',
          marginBottom: '2rem', lineHeight: 1.2,
        }}>
          A communicator who <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>builds</em> things
        </h2>
        {[
          <>I graduated in <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Wildlife Management</strong> and realised that the best way to protect what matters is to tell its story well — and then build the tools to amplify it.</>,
          <>Over 7 years I've led <strong style={{ color: 'var(--text)', fontWeight: 500 }}>communications and digital marketing</strong> campaigns, built websites, created video content, and started writing code when words alone weren't enough.</>,
          <>Based in <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Dar es Salaam, Tanzania</strong>. Working globally. Passionate about conservation, community, and digital work that actually changes things.</>,
        ].map((text, i) => (
          <p key={i} style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            {text}
          </p>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '2.5rem' }}>
          {['Digital Marketing', 'Content Strategy', 'React & Next.js', 'Videography', 'Brand Communications', 'Conservation Tech'].map(skill => (
            <div key={skill} style={{
              padding: '0.6rem 1rem', border: '1px solid var(--border)',
              borderRadius: 2, fontSize: '0.8rem', color: 'var(--muted)',
              letterSpacing: '0.05em',
            }}>{skill}</div>
          ))}
        </div>
      </div>

      <div className="reveal">
        <div style={{ display: 'flex', gap: '3rem', marginBottom: '3rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border)' }}>
          {[['7+', 'Years experience'], ['30+', 'Projects delivered'], ['3', 'Countries worked in']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '3rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', letterSpacing: '0.06em', marginTop: '0.25rem' }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-playfair)', fontSize: '1.15rem',
            fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.6,
          }}>
            "Technology is one of the most powerful tools we have for conservation — but only if the right people are building it and telling its story."
          </p>
        </div>
      </div>
    </section>
  )
}