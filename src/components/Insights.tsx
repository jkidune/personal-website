'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  tag: string
  cover_url: string
  created_at: string
}

export default function Insights() {
  const [posts, setPosts] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setPosts(data)
        setLoading(false)
      })
  }, [])

  return (
    <section id="insights" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-4">
              <span className="w-6 h-[1px] bg-[#FF3333]"></span>
              Insights
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-medium text-black max-w-xl leading-tight">
              Thoughts on <span className="italic text-[#FF3333]">tech & conservation</span>
            </h2>
          </div>
          <a 
            href="/insights" 
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            View All Insights
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
             [...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="bg-gray-100 aspect-[16/10] rounded-[24px] animate-pulse" />
                <div className="h-4 bg-gray-100 w-24 rounded animate-pulse" />
                <div className="h-8 bg-gray-100 w-3/4 rounded animate-pulse" />
              </div>
            ))
          ) : (
            posts.map((p) => (
              <div 
                key={p.id}
                onClick={() => router.push(`/insights/${p.slug}`)}
                className="group cursor-pointer flex flex-col gap-5"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-[24px] bg-gray-50 border border-gray-100 aspect-[16/10]">
                   <img 
                     src={p.cover_url} 
                     alt={p.title}
                     className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                   />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase">
                      {p.tag}
                    </span>
                    <span className="h-[1px] w-8 bg-gray-200"></span>
                    <span className="font-[family-name:var(--font-dm-mono)] text-xs text-gray-400">
                      {new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 className="font-[family-name:var(--font-outfit)] text-xl font-medium text-black group-hover:text-[#FF3333] transition-colors duration-300 leading-snug">
                    {p.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {p.excerpt}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  )
}