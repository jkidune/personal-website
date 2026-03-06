'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  cover_url: string
  url: string
  featured: boolean
}

export default function Works() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(4)
      .then(({ data }) => {
        if (data) setProjects(data)
        setLoading(false)
      })
  }, [])

  return (
    <section id="works" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-4">
              <span className="w-6 h-[1px] bg-[#FF3333]"></span>
              Selected Works
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-medium text-black max-w-xl leading-tight">
              Projects built for <span className="italic text-[#FF3333]">real impact</span>
            </h2>
          </div>
          <a 
            href="/works" 
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            View All Works
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {loading ? (
            // Skeleton Loading
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="bg-gray-100 aspect-[4/3] rounded-[24px] animate-pulse" />
                <div className="h-4 bg-gray-100 w-24 rounded animate-pulse" />
                <div className="h-8 bg-gray-100 w-3/4 rounded animate-pulse" />
              </div>
            ))
          ) : (
            projects.map((project) => (
              <div 
                key={project.id}
                onClick={() => router.push(`/works/${project.slug}`)}
                className="group cursor-pointer flex flex-col gap-6"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[24px] bg-gray-50 border border-gray-100 aspect-[4/3]">
                   <img 
                     src={project.cover_url} 
                     alt={project.title}
                     className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[4px]"
                   />
                   
                   {/* Hover Icon Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                          <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                      </div>
                   </div>
                </div>

                {/* Content Below */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase">
                      {project.category}
                    </span>
                    <span className="h-[1px] w-8 bg-gray-200"></span>
                  </div>
                  
                  <h3 className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-medium text-black group-hover:text-[#FF3333] transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  )
}
