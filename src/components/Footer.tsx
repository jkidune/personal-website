export default function Footer() {
  return (
    <footer style={{
      padding: '3rem', borderTop: '1px solid var(--border)',
      display: 'grid', gridTemplateColumns: '1fr auto',
      alignItems: 'center', gap: '2rem',
    }}>
      <div>
        <a href="/" style={{
          fontFamily: 'var(--font-playfair)', fontSize: '1.1rem',
          fontWeight: 700, color: 'var(--white)', textDecoration: 'none',
        }}>
          Joseph<span style={{ color: 'var(--accent)' }}>.</span>
        </a>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
          Communications · Digital · Conservation
        </p>
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {[['#about', 'About'], ['#works', 'Works'], ['#insights', 'Insights'], ['mailto:kidunejoseph91@gmail.com', 'Contact']].map(([href, label]) => (
          <a key={label} href={href} style={{
            color: 'var(--muted)', textDecoration: 'none',
            fontSize: '0.8rem', letterSpacing: '0.06em',
          }}>{label}</a>
        ))}
      </div>
      <div style={{
        gridColumn: '1 / -1', fontSize: '0.75rem', color: 'var(--muted)',
        paddingTop: '2rem', borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span>© 2026 Joseph Masonda. All rights reserved.</span>
        <span>Dar es Salaam, Tanzania 🌍</span>
      </div>
    </footer>
  )
}