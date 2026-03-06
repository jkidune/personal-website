import React from 'react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden bg-white">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center opacity-30">
        <div className="w-full h-full max-w-7xl grid grid-cols-6 gap-4">
           <div className="border-r border-gray-200 h-full hidden md:block"></div>
           <div className="border-r border-gray-200 h-full hidden md:block"></div>
           <div className="border-r border-gray-200 h-full"></div>
           <div className="border-r border-gray-200 h-full"></div>
           <div className="border-r border-gray-200 h-full hidden md:block"></div>
           <div className="border-r border-gray-200 h-full hidden md:block"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center text-center z-10 relative">
        
        {/* Badge */}
        <div className="mb-10 inline-flex items-center gap-2 bg-brand-red text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg shadow-red-500/20 transition-transform hover:scale-105 cursor-default">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          Now booking for Q4, 2025
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight text-brand-black mb-10 leading-[1.1] max-w-5xl mx-auto font-outfit">
          <span className="block">Collaborative</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 my-2">
            <span>Designs</span>
            
            {/* Avatars Stack */}
            <div className="flex -space-x-4 items-center mx-2">
               <div className="w-14 h-14 rounded-full border-[3px] border-white overflow-hidden bg-gray-100 shadow-avatar relative z-30 transition-transform hover:scale-110 hover:z-40">
                 <img src="https://i.pravatar.cc/150?u=23" alt="Collaborator" className="w-full h-full object-cover" />
               </div>
               <div className="w-14 h-14 rounded-full border-[3px] border-white overflow-hidden bg-gray-100 shadow-avatar relative z-20 transition-transform hover:scale-110 hover:z-40">
                 <img src="https://i.pravatar.cc/150?u=15" alt="Collaborator" className="w-full h-full object-cover" />
               </div>
               <div className="w-14 h-14 rounded-full border-[3px] border-white overflow-hidden bg-gray-100 shadow-avatar relative z-10 transition-transform hover:scale-110 hover:z-40">
                 <img src="https://i.pravatar.cc/150?u=42" alt="Collaborator" className="w-full h-full object-cover" />
               </div>
            </div>

            {/* Lightning Icon */}
            <div className="w-14 h-14 rounded-full bg-[image:var(--background-image-gradient-lightning)] flex items-center justify-center text-white shadow-lightning transform -rotate-12 transition-transform hover:rotate-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
              </svg>
            </div>
            <span>for</span>
          </div>
          <span className="block">High Performing</span>
          <span className="block">Teams!</span>
        </h1>

        {/* Subheading */}
        <div className="max-w-3xl mx-auto text-brand-text-gray text-lg md:text-xl leading-relaxed mb-12 space-y-2 font-outfit">
          <p>
            My name is Joseph, I specialize in creating beautiful & modern websites for startups, founders & business owners.
          </p>
          <p>
            I make websites crafted with care in <span className="text-brand-red font-semibold underline decoration-brand-red/30 decoration-2 underline-offset-4 hover:decoration-brand-red transition-all cursor-pointer">Framer</span>, Wordpress, Webflow or by develoment to help you make an online presence fast & easy.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full">
          <a href="#start-project" className="group min-w-[200px] px-8 py-4 rounded-full text-white font-medium text-lg shadow-button-primary bg-[image:var(--background-image-gradient-button)] hover:opacity-95 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
            Start a project
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#book-call" className="min-w-[200px] px-8 py-4 rounded-full bg-white text-brand-black border border-brand-mercury font-medium text-lg shadow-button-secondary hover:shadow-md transition-all hover:bg-gray-50 transform hover:-translate-y-1 flex items-center justify-center">
            Book a call
          </a>
        </div>

      </div>
    </section>
  )
}
