'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  description: string
  cover_url: string
  featured: boolean
}

const ALL_CATEGORIES = ['All', 'Conservation Tech', 'Web Application', 'Videography & Content']

export default function WorksPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filtered, setFiltered] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) { setProjects(data); setFiltered(data) }
        setLoading(false)
      })
  }, [])

  const filterBy = (cat: string) => {
    setActiveCategory(cat)
    setFiltered(cat === 'All' ? projects : projects.filter(p => p.category === cat))
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-4">
              <span className="w-6 h-[1px] bg-[#FF3333]"></span>
              Portfolio
            </div>
            <h1 className="font-[family-name:var(--font-outfit)] text-5xl md:text-6xl font-medium text-black leading-tight">
              Selected <span className="italic text-[#FF3333]">Works</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => filterBy(cat)}
                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                  ${activeCategory === cat 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#FF3333] hover:text-[#FF3333]'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {loading ? (
             [...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="bg-gray-100 aspect-[4/3] rounded-[24px] animate-pulse" />
                <div className="h-4 bg-gray-100 w-24 rounded animate-pulse" />
                <div className="h-8 bg-gray-100 w-3/4 rounded animate-pulse" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="col-span-2 text-center py-24 text-gray-400 font-[family-name:var(--font-dm-mono)]">
              No projects found in this category.
            </div>
          ) : (
            filtered.map((project) => (
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
                  
                  <h3 className="font-[family-name:var(--font-outfit)] text-3xl font-medium text-black group-hover:text-[#FF3333] transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-500 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  )
}