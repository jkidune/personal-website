'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PopupModal } from 'react-calendly'

const links = [
  { label: 'Works', href: '/works' },
  { label: 'About', href: '/#about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    
    // Set root element for Calendly modal
    setRootElement(document.getElementById('root'))
    
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4 pointer-events-none">
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

          <button 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex bg-white text-black px-4 py-1.5 rounded-full font-[family-name:var(--font-outfit)] font-medium text-[13px] hover:bg-gray-100 transition-colors shadow-[0_4px_10px_rgba(0,0,0,0.05)] cursor-pointer"
          >
            Let's Talk
          </button>

          {/* Mobile Menu Button (Hamburger) */}
          <button 
            className="md:hidden text-white p-1 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`
          pointer-events-auto
          mt-2 w-full max-w-[600px]
          bg-[#1F1F1F]/95 backdrop-blur-md text-white
          rounded-[20px]
          overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${mobileMenuOpen ? 'max-h-[400px] opacity-100 shadow-xl translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}
        `}
      >
        <div className="flex flex-col p-6 gap-4 items-center text-center">
          {links.map(({ label, href }) => (
            <Link 
              key={label} 
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-[family-name:var(--font-outfit)] font-medium text-[16px] text-white/90 hover:text-[#FF3333] transition-colors w-full py-2 border-b border-white/5 last:border-0"
            >
              {label}
            </Link>
          ))}
          <button 
            onClick={() => {
              setIsOpen(true)
              setMobileMenuOpen(false)
            }}
            className="w-full bg-white text-black px-4 py-3 rounded-xl font-[family-name:var(--font-outfit)] font-medium text-[15px] hover:bg-gray-100 transition-colors shadow-sm mt-2"
          >
            Let's Talk
          </button>
        </div>
      </div>

      {/* Calendly Modal */}
      {rootElement && (
        <PopupModal
          url="https://calendly.com/kidunejoseph91/30min"
          onModalClose={() => setIsOpen(false)}
          open={isOpen}
          rootElement={rootElement}
        />
      )}
    </div>
  )
}
