'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  tag: string
  cover_url: string
  created_at: string
}

export default function ArticlePage() {
  const { slug } = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [related, setRelated] = useState<Article[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (data) {
        setArticle(data)
        // Fetch related articles
        const { data: rel } = await supabase
          .from('articles')
          .select('*')
          .eq('published', true)
          .neq('slug', slug)
          .limit(2)
        if (rel) setRelated(rel)
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="h-8 w-32 bg-gray-100 rounded mb-6 animate-pulse" />
          <div className="h-16 w-3/4 bg-gray-100 rounded mb-8 animate-pulse" />
          <div className="h-96 w-full bg-gray-100 rounded-[32px] animate-pulse" />
        </div>
      </main>
    )
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-6 font-[family-name:var(--font-dm-mono)]">Article not found.</p>
          <a href="/insights" className="px-8 py-3 bg-black text-white rounded-full hover:bg-[#FF3333] transition-colors duration-300 font-medium">
            Back to Insights
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      
      {/* Article Content */}
      <article className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <header className="mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-6">
            <span className="w-6 h-[1px] bg-[#FF3333]"></span>
            {article.tag}
          </div>
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-6xl font-medium text-black leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400 font-medium">
            <span>
              {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>
              {Math.ceil((article.content?.length || 0) / 1000)} min read
            </span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full aspect-video rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 mb-16 shadow-sm">
          <img
            src={article.cover_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Body */}
        <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed prose-headings:font-[family-name:var(--font-outfit)] prose-headings:font-medium prose-headings:text-black prose-a:text-[#FF3333] prose-strong:font-medium prose-strong:text-black">
          {article.excerpt && (
            <p className="text-xl md:text-2xl text-black leading-relaxed font-normal mb-12 not-prose border-l-4 border-[#FF3333] pl-6 italic">
              {article.excerpt}
            </p>
          )}
          <div className="whitespace-pre-wrap">
            {article.content || "Content coming soon..."}
          </div>
        </div>

        {/* Author Footer */}
        <div className="mt-24 pt-12 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-gray-400 uppercase mb-2">Written by</p>
            <p className="font-[family-name:var(--font-outfit)] text-lg font-medium text-black">Joseph Masonda</p>
          </div>
          <a href="/insights" className="text-sm font-medium underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-all">
            Back to All Articles
          </a>
        </div>

      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="mt-32 pt-24 bg-gray-50/50 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h3 className="font-[family-name:var(--font-outfit)] text-3xl font-medium text-black">
                More Insights
              </h3>
              <a href="/insights" className="text-sm font-medium underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-all">
                View All
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => router.push(`/insights/${p.slug}`)}
                  className="group cursor-pointer flex flex-col gap-6"
                >
                  <div className="relative overflow-hidden rounded-[24px] bg-white border border-gray-100 aspect-[4/3]">
                     <img 
                       src={p.cover_url} 
                       alt={p.title}
                       className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[4px]"
                     />
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                             <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                             <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                          </svg>
                        </div>
                     </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase">
                        {p.tag}
                      </span>
                    </div>
                    <h4 className="font-[family-name:var(--font-outfit)] text-xl font-medium text-black group-hover:text-[#FF3333] transition-colors duration-300 line-clamp-2">
                      {p.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}