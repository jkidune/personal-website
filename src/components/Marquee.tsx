'use client'

import Image from 'next/image'

const partners = [
  'Stripe', 'Spotify', 'Slack', 'Intercom', 'Framer', 
  'Webflow', 'Linear', 'Raycast', 'Vercel', 'Supabase'
]

export default function Marquee() {
  return (
    <section className="py-20 border-b border-gray-100 overflow-hidden bg-white">
      <div className="container mx-auto px-4 mb-10 text-center">
        <p className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-4">
          Trusted by 50+ Growing Partners
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap gap-16 items-center">
          {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
            <div key={i} className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default">
              {/* Placeholder Logo */}
              <div className="h-8 flex items-center justify-center font-[family-name:var(--font-outfit)] font-semibold text-xl text-black">
                {partner}
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
