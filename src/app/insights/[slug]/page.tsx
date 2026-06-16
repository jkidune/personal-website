import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { articleBySlugQuery, relatedArticlesQuery } from "@/sanity/lib/queries";
import type { Article } from "@/sanity/types";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function formatLongDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingMinutes(content?: Article["content"]) {
  if (!content) return 1;
  const text = content
    .flatMap((block) => ("children" in block ? block.children : []))
    .map((child) => ("text" in child ? child.text : ""))
    .join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await client.fetch<Article | null>(articleBySlugQuery, { slug });

  if (!article) {
    notFound();
  }

  const related = await client.fetch<Article[]>(relatedArticlesQuery, { slug });
  const date = article.publishedAt || article._createdAt;

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <article className="container mx-auto px-4 max-w-4xl">
        <header className="mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-6">
            <span className="w-6 h-[1px] bg-[#FF3333]"></span>
            {article.tag}
          </div>
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-6xl font-medium text-black leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400 font-medium">
            <span>{formatLongDate(date)}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{readingMinutes(article.content)} min read</span>
          </div>
        </header>

        <div className="w-full aspect-video rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 mb-16 shadow-sm">
          {article.coverUrl ? (
            <img
              src={article.coverUrl}
              alt={article.coverAlt || article.title}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed prose-headings:font-[family-name:var(--font-outfit)] prose-headings:font-medium prose-headings:text-black prose-a:text-[#FF3333] prose-strong:font-medium prose-strong:text-black">
          {article.excerpt ? (
            <p className="text-xl md:text-2xl text-black leading-relaxed font-normal mb-12 not-prose border-l-4 border-[#FF3333] pl-6 italic">
              {article.excerpt}
            </p>
          ) : null}
          {article.content && article.content.length > 0 ? (
            <PortableText value={article.content} />
          ) : (
            <p>Content coming soon...</p>
          )}
        </div>

        <div className="mt-24 pt-12 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-gray-400 uppercase mb-2">Written by</p>
            <p className="font-[family-name:var(--font-outfit)] text-lg font-medium text-black">Joseph Masonda</p>
          </div>
          <Link href="/insights" className="text-sm font-medium underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-all">
            Back to All Articles
          </Link>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mt-32 pt-24 bg-gray-50/50 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h3 className="font-[family-name:var(--font-outfit)] text-3xl font-medium text-black">
                More Insights
              </h3>
              <Link href="/insights" className="text-sm font-medium underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-all">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/insights/${item.slug}`}
                  className="group cursor-pointer flex flex-col gap-6"
                >
                  <div className="relative overflow-hidden rounded-[24px] bg-white border border-gray-100 aspect-[4/3]">
                    {item.coverUrl ? (
                      <img
                        src={item.coverUrl}
                        alt={item.coverAlt || item.title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[4px]"
                      />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase">
                        {item.tag}
                      </span>
                    </div>
                    <h4 className="font-[family-name:var(--font-outfit)] text-xl font-medium text-black group-hover:text-[#FF3333] transition-colors duration-300 line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
