const posts = [
  {
    tag: 'Conservation Tech',
    title: 'How digital tools are changing wildlife monitoring in East Africa',
    excerpt: 'From satellite tracking to community apps, technology is reshaping how we protect biodiversity.',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
  },
  {
    tag: 'Digital Marketing',
    title: 'Building an authentic brand in the age of AI-generated everything',
    excerpt: 'When everyone has access to the same tools, what makes you stand out? Real stories, real people.',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  },
  {
    tag: 'Web Development',
    title: 'Why communications professionals should learn to code (even a little)',
    excerpt: 'You don\'t need to be a developer. But understanding the web changes how you tell stories on it.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  },
]

export default function Insights() {
  return (
    <section id="insights" style={{ padding: '7rem 0', borderTop: '1px solid var(--border)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem',
        color: 'var(--accent)', letterSpacing: '0.15em',
        textTransform: 'uppercase', marginBottom: '2rem',
      }}>
        Insights (05)
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
          fontWeight: 700, color: 'var(--white)', maxWidth: 500, lineHeight: 1.15,
        }}>
          Thoughts on <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>tech & conservation</em>
        </h2>
        <a href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem' }}>
          View All Insights →
        </a>
      </div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {posts.map((p, i) => (
          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden' }}>
            <img src={p.img} alt={p.title} style={{ width: '100%', height: 200, objectFit: 'cover', filter: 'grayscale(30%)' }} />
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem',
                color: 'var(--accent)', letterSpacing: '0.12em',
                textTransform: 'uppercase', marginBottom: '0.75rem',
              }}>{p.tag}</div>
              <h3 style={{
                fontFamily: 'var(--font-playfair)', fontSize: '1.05rem',
                color: 'var(--white)', lineHeight: 1.4, marginBottom: '0.75rem',
              }}>{p.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{p.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}