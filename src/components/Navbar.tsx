'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Works', href: '/works' },
  { label: 'About', href: '/#about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav 
        className={`
          pointer-events-auto
          flex items-center justify-between
          px-5 py-3
          bg-[#1F1F1F] text-white
          rounded-[15px]
          shadow-[0_7px_10px_rgba(0,0,0,0.14)]
          transition-all duration-300 ease-in-out
          ${scrolled ? 'w-full max-w-2xl bg-[#1F1F1F]/90 backdrop-blur-md shadow-xl' : 'w-full max-w-[600px]'}
        `}
      >
        {/* Logo */}
        <Link href="/" className="font-[family-name:var(--font-outfit)] font-medium text-[17px] text-white tracking-tight">
          Joseph<span className="text-[#FF3333]">.</span>
        </Link>

        {/* Links & Button */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {links.map(({ label, href }) => (
              <Link 
                key={label} 
                href={href}
                className="font-[family-name:var(--font-outfit)] font-medium text-[13px] text-white/90 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          <Link 
            href="/contact"
            className="hidden sm:flex bg-white text-black px-4 py-1.5 rounded-full font-[family-name:var(--font-outfit)] font-medium text-[13px] hover:bg-gray-100 transition-colors shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
          >
            Let's Talk
          </Link>

          {/* Mobile Menu Button (Hamburger) - Placeholder for now */}
          <button className="md:hidden text-white p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>
    </div>
  )
}
