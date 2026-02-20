'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const services = [
  'Web Application',
  'Portfolio Website',
  'Digital Marketing',
  'Content Strategy',
  'Videography',
  'Conservation Tech',
  'Other',
]

const budgets = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000+',
  'Let\'s discuss',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', service: '', budget: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

 const submit = async () => {
  if (!form.name || !form.email || !form.message) return
  setStatus('sending')

  try {
    // Save to Supabase
    const { error: dbError } = await supabase.from('contacts').insert([form])
    if (dbError) throw dbError

    // Send email notification
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) throw new Error('Email failed')

    setStatus('sent')
  } catch (err) {
    console.error(err)
    setStatus('error')
  }
}

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Navbar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,8,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)', padding: '1.25rem 0',
      }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <a href="/" style={{
            fontFamily: 'var(--font-inter)', fontSize: '1.1rem',
            fontWeight: 700, color: 'var(--white)', textDecoration: 'none',
          }}>
            Joseph<span style={{ color: 'var(--accent)' }}>.</span>
          </a>
          <a href="/"
            style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← Back Home
          </a>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '6rem', alignItems: 'start',
        }}>

          {/* Left — intro */}
          <div style={{ position: 'sticky', top: '8rem' }}>
            <div style={{
              fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem',
              color: 'var(--accent)', letterSpacing: '0.15em',
              textTransform: 'uppercase', marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
              Get in Touch
            </div>
            <h1 style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 800, color: 'var(--white)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
            }}>
              Let's build something<br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>worth remembering</em>
            </h1>
            <p style={{
              fontSize: '1.05rem', color: 'var(--muted)',
              lineHeight: 1.8, marginBottom: '3rem', maxWidth: 420,
            }}>
              Whether you have a clear brief or just an idea on a napkin — I'd love to hear about it.
              I typically respond within 24 hours.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Email', value: 'kidunejoseph91@gmail.com', href: 'mailto:kidunejoseph91@gmail.com' },
                { label: 'Website', value: 'josephmasonda.qzz.io', href: 'https://josephmasonda.qzz.io' },
                { label: 'Location', value: 'Dar es Salaam, Tanzania', href: null },
              ].map(({ label, value, href }) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '1rem 0',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem',
                    color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>{label}</span>
                  {href ? (
                    <a href={href} style={{
                      fontSize: '0.9rem', color: 'var(--text)',
                      textDecoration: 'none', transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                    >{value}</a>
                  ) : (
                    <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'sent' ? (
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 20, padding: '4rem', textAlign: 'center',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
                <h2 style={{
                  fontFamily: 'var(--font-inter)', fontSize: '1.5rem',
                  fontWeight: 700, color: 'var(--white)', marginBottom: '0.75rem',
                }}>Message sent</h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Thanks for reaching out. I'll be in touch within 24 hours.
                </p>
                <a href="/" className="btn-secondary">Back to Home</a>
              </div>
            ) : (
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 20, padding: '2.5rem',
              }}>
                {/* Name & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  {[
                    { field: 'name', label: 'Your Name', placeholder: 'Joseph Masonda', type: 'text' },
                    { field: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
                  ].map(({ field, label, placeholder, type }) => (
                    <div key={field}>
                      <label style={{
                        display: 'block', fontFamily: 'var(--font-dm-mono)',
                        fontSize: '0.65rem', color: 'var(--accent)',
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        marginBottom: '0.5rem',
                      }}>{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[field as keyof typeof form]}
                        onChange={e => update(field, e.target.value)}
                        style={{
                          width: '100%', background: 'var(--bg)',
                          border: '1px solid var(--border)', borderRadius: 10,
                          padding: '0.85rem 1rem', color: 'var(--text)',
                          fontSize: '0.9rem', outline: 'none',
                          transition: 'border-color 0.2s',
                          boxSizing: 'border-box',
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                      />
                    </div>
                  ))}
                </div>

                {/* Service */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block', fontFamily: 'var(--font-dm-mono)',
                    fontSize: '0.65rem', color: 'var(--accent)',
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem',
                  }}>Service Needed</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {services.map(s => (
                      <button
                        key={s}
                        onClick={() => update('service', s)}
                        style={{
                          padding: '0.5rem 1rem', borderRadius: 100,
                          border: `1px solid ${form.service === s ? 'var(--accent)' : 'var(--border)'}`,
                          background: form.service === s ? 'rgba(200,181,96,0.12)' : 'transparent',
                          color: form.service === s ? 'var(--accent)' : 'var(--muted)',
                          fontSize: '0.8rem', cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >{s}</button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block', fontFamily: 'var(--font-dm-mono)',
                    fontSize: '0.65rem', color: 'var(--accent)',
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem',
                  }}>Project Budget</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {budgets.map(b => (
                      <button
                        key={b}
                        onClick={() => update('budget', b)}
                        style={{
                          padding: '0.5rem 1rem', borderRadius: 100,
                          border: `1px solid ${form.budget === b ? 'var(--accent)' : 'var(--border)'}`,
                          background: form.budget === b ? 'rgba(200,181,96,0.12)' : 'transparent',
                          color: form.budget === b ? 'var(--accent)' : 'var(--muted)',
                          fontSize: '0.8rem', cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >{b}</button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block', fontFamily: 'var(--font-dm-mono)',
                    fontSize: '0.65rem', color: 'var(--accent)',
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem',
                  }}>Your Message</label>
                  <textarea
                    placeholder="Tell me about your project — what you're building, what you need, and any timeline you have in mind..."
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    rows={5}
                    style={{
                      width: '100%', background: 'var(--bg)',
                      border: '1px solid var(--border)', borderRadius: 10,
                      padding: '0.85rem 1rem', color: 'var(--text)',
                      fontSize: '0.9rem', outline: 'none', resize: 'vertical',
                      transition: 'border-color 0.2s', fontFamily: 'var(--font-dm-sans)',
                      lineHeight: 1.7, boxSizing: 'border-box',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>

                <button
                  onClick={submit}
                  disabled={status === 'sending' || !form.name || !form.email || !form.message}
                  style={{
                    width: '100%', padding: '1rem',
                    background: (!form.name || !form.email || !form.message) ? 'var(--border)' : 'var(--accent)',
                    color: 'var(--bg)', border: 'none', borderRadius: 100,
                    fontFamily: 'var(--font-inter)', fontSize: '0.9rem',
                    fontWeight: 600, cursor: (!form.name || !form.email || !form.message) ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (form.name && form.email && form.message)
                      e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>

                {status === 'error' && (
                  <p style={{ color: '#e57373', fontSize: '0.85rem', marginTop: '0.75rem', textAlign: 'center' }}>
                    Something went wrong. Please email directly at kidunejoseph91@gmail.com
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}