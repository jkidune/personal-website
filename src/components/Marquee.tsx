const items = [
  'Digital Marketing', 'Conservation Tech', 'Content Strategy',
  'Web Development', 'Videography', 'Brand Communications',
  'React & Next.js', 'Wildlife Conservation',
]

export default function Marquee() {
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '1.2rem 0', overflow: 'hidden',
      background: 'var(--surface)',
    }}>
      <div style={{
        display: 'flex', gap: '3rem',
        width: 'max-content',
        animation: 'marquee 25s linear infinite',
      }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            fontFamily: 'var(--font-dm-mono)', fontSize: '0.75rem',
            color: 'var(--muted)', letterSpacing: '0.1em',
            textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>
            <span style={{
              width: 4, height: 4, background: 'var(--accent)',
              borderRadius: '50%', display: 'inline-block',
            }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}