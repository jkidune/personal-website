import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { articlesQuery } from "@/sanity/lib/queries";
import type { Article } from "@/sanity/types";

const ALL_TAG = "All";

type InsightsPageProps = {
  searchParams?: Promise<{ tag?: string }>;
};

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const params = await searchParams;
  const posts = await client.fetch<Article[]>(articlesQuery);
  const tags = [
    ALL_TAG,
    ...Array.from(new Set(posts.map((post) => post.tag).filter(Boolean))) as string[],
  ];
  const activeTag = params?.tag || ALL_TAG;
  const filtered =
    activeTag === ALL_TAG ? posts : posts.filter((post) => post.tag === activeTag);

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase mb-4">
              <span className="w-6 h-[1px] bg-[#FF3333]"></span>
              Insights
            </div>
            <h1 className="font-[family-name:var(--font-outfit)] text-5xl md:text-6xl font-medium text-black leading-tight">
              Latest <span className="italic text-[#FF3333]">Articles</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={tag === ALL_TAG ? "/insights" : `/insights?tag=${encodeURIComponent(tag)}`}
                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                  ${activeTag === tag
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#FF3333] hover:text-[#FF3333]"
                  }
                `}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 text-gray-400 font-[family-name:var(--font-dm-mono)]">
            No articles yet. Add articles in Sanity Studio.
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400 font-[family-name:var(--font-dm-mono)]">
            No articles found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filtered.map((post) => (
              <Link
                key={post._id}
                href={`/insights/${post.slug}`}
                className="group cursor-pointer flex flex-col gap-6"
              >
                <div className="relative overflow-hidden rounded-[24px] bg-gray-50 border border-gray-100 aspect-[4/3]">
                  {post.coverUrl ? (
                    <img
                      src={post.coverUrl}
                      alt={post.coverAlt || post.title}
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

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase">
                      {post.tag}
                    </span>
                    <span className="h-[1px] w-4 bg-gray-200"></span>
                    <span className="text-xs text-gray-400 font-medium">
                      {formatDate(post.publishedAt || post._createdAt)}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-medium text-black group-hover:text-[#FF3333] transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
