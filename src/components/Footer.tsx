'use client'

import React, { useState, useEffect } from 'react'
import { PopupModal } from 'react-calendly'

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false)
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Set root element for Calendly modal
    setRootElement(document.getElementById('root'))
  }, [])

  return (
    <footer className="container mx-auto px-4 pb-10 pt-20">
      
      {/* CTA Card */}
      <div className="bg-[#FAFAFA] rounded-[20px] px-6 py-16 md:p-20 flex flex-col items-center text-center mb-20 relative overflow-hidden">
        
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm">
           <span className="w-2 h-2 rounded-full bg-[#FF3333]"></span>
           <span className="text-[#FF3333] font-medium text-[13px] font-[family-name:var(--font-outfit)]">Let's Collaborate!</span>
        </div>

        {/* Text */}
        <h2 className="max-w-2xl text-2xl md:text-3xl lg:text-4xl font-medium text-black/80 mb-10 leading-relaxed font-[family-name:var(--font-outfit)]">
          Let's cut the hassle of finding the right person for your next website, try out our subscription plan or reach out first If you have any questions or need custom pricing.
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full z-10 relative">
          <a href="#start-project" className="group min-w-[180px] px-8 py-3.5 rounded-full text-white font-medium text-base shadow-[0_13px_22px_rgba(255,120,120,0.3)] bg-gradient-to-r from-[#F76D6D] to-[#FF3333] hover:opacity-95 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
            Start a project
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <button 
            onClick={() => setIsOpen(true)}
            className="min-w-[180px] px-8 py-3.5 rounded-full bg-transparent text-black border border-black font-medium text-base hover:bg-black hover:text-white transition-all transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
          >
            Book a call
          </button>
        </div>

        {/* Floating Images (Decorative) */}
        <div className="absolute top-10 left-10 hidden lg:block opacity-60 pointer-events-none animate-float-slow">
           <div className="w-16 h-16 rounded-xl bg-gray-200 rotate-[-10deg] shadow-lg overflow-hidden">
             <img src="https://i.pravatar.cc/150?u=80" alt="" className="w-full h-full object-cover" />
           </div>
        </div>
        <div className="absolute bottom-10 right-10 hidden lg:block opacity-60 pointer-events-none animate-float-delayed">
           <div className="w-20 h-20 rounded-xl bg-gray-200 rotate-[10deg] shadow-lg overflow-hidden">
             <img src="https://i.pravatar.cc/150?u=90" alt="" className="w-full h-full object-cover" />
           </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-black/60 border-t border-gray-100 pt-8 font-[family-name:var(--font-outfit)]">
        <div className="flex items-center gap-1">
          <span>© 2026 Joseph Masonda. All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-6">
           <span>Dar es Salaam, Tanzania 🌍</span>
           <span className="hidden md:inline">·</span>
           <span className="flex items-center gap-1">
             Made with <span className="text-red-500">❤️</span> by Joseph Masonda
           </span>
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
    </footer>
  )
}
