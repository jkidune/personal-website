'use client'

import { useState } from 'react'
import Link from 'next/link'

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
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — Intro */}
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-6">
              <span className="w-6 h-[1px] bg-[#FF3333]"></span>
              Get in Touch
            </div>
            
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl lg:text-6xl font-medium text-black leading-[1.1] mb-6">
              Let's build something<br />
              <span className="italic text-[#FF3333]">worth remembering</span>
            </h1>
            
            <p className="text-lg text-gray-500 leading-relaxed mb-12 max-w-md">
              Whether you have a clear brief or just an idea on a napkin — I'd love to hear about it.
              I typically respond within 24 hours.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-6">
              {[
                { label: 'Email', value: 'kidunejoseph91@gmail.com', href: 'mailto:kidunejoseph91@gmail.com' },
                { label: 'Website', value: 'josephmasonda.qzz.io', href: 'https://josephmasonda.qzz.io' },
                { label: 'Location', value: 'Dar es Salaam, Tanzania', href: null },
              ].map(({ label, value, href }) => (
                <div key={label} className="group border-b border-gray-100 pb-4">
                  <span className="block font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.15em] text-[#FF3333] uppercase mb-2">
                    {label}
                  </span>
                  {href ? (
                    <a 
                      href={href} 
                      className="text-lg text-black hover:text-[#FF3333] transition-colors duration-200 font-[family-name:var(--font-outfit)]"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-lg text-black font-[family-name:var(--font-outfit)]">
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-gray-50 rounded-[32px] p-8 md:p-12 border border-gray-100">
            {status === 'sent' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#FF3333]/10 text-[#FF3333] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                  ✦
                </div>
                <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium text-black mb-3">
                  Message sent successfully
                </h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                  Thanks for reaching out. I'll review your message and get back to you within 24 hours.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-black text-white hover:bg-[#FF3333] transition-colors duration-300 font-medium"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { field: 'name', label: 'Your Name', placeholder: 'Joseph Masonda', type: 'text' },
                    { field: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
                  ].map(({ field, label, placeholder, type }) => (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.15em] text-[#FF3333] uppercase">
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[field as keyof typeof form]}
                        onChange={e => update(field, e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 text-black placeholder:text-gray-300 focus:outline-none focus:border-[#FF3333] focus:ring-1 focus:ring-[#FF3333] transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>

                {/* Service */}
                <div className="flex flex-col gap-3">
                  <label className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.15em] text-[#FF3333] uppercase">
                    Service Needed
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map(s => (
                      <button
                        key={s}
                        onClick={() => update('service', s)}
                        className={`
                          px-4 py-2 rounded-full text-sm transition-all duration-200 border
                          ${form.service === s 
                            ? 'bg-[#FF3333] text-white border-[#FF3333]' 
                            : 'bg-white text-gray-500 border-gray-200 hover:border-[#FF3333] hover:text-[#FF3333]'
                          }
                        `}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-3">
                  <label className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.15em] text-[#FF3333] uppercase">
                    Project Budget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map(b => (
                      <button
                        key={b}
                        onClick={() => update('budget', b)}
                        className={`
                          px-4 py-2 rounded-full text-sm transition-all duration-200 border
                          ${form.budget === b 
                            ? 'bg-[#FF3333] text-white border-[#FF3333]' 
                            : 'bg-white text-gray-500 border-gray-200 hover:border-[#FF3333] hover:text-[#FF3333]'
                          }
                        `}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.15em] text-[#FF3333] uppercase">
                    Your Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project — what you're building, what you need, and any timeline you have in mind..."
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    rows={6}
                    className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 text-black placeholder:text-gray-300 focus:outline-none focus:border-[#FF3333] focus:ring-1 focus:ring-[#FF3333] transition-all duration-200 resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={submit}
                  disabled={status === 'sending' || !form.name || !form.email || !form.message}
                  className={`
                    w-full py-4 rounded-full font-[family-name:var(--font-outfit)] font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2
                    ${(!form.name || !form.email || !form.message)
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-[#FF3333] hover:shadow-[0_13px_22px_rgba(255,120,120,0.3)] hover:-translate-y-1'
                    }
                  `}
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>

                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">
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
