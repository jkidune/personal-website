import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { latestArticlesQuery } from "@/sanity/lib/queries";
import type { Article } from "@/sanity/types";

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function Insights() {
  const posts = await client.fetch<Article[]>(latestArticlesQuery);

  return (
    <section id="insights" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
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
          <Link
            href="/insights"
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            View All Insights
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-[24px] border border-gray-100 bg-gray-50 p-10 text-center text-gray-500">
            Add your first articles in Sanity Studio to feature them here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/insights/${post.slug}`}
                className="group cursor-pointer flex flex-col gap-5"
              >
                <div className="relative overflow-hidden rounded-[24px] bg-gray-50 border border-gray-100 aspect-[16/10]">
                  {post.coverUrl ? (
                    <img
                      src={post.coverUrl}
                      alt={post.coverAlt || post.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    />
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-dm-mono)] text-xs tracking-[0.15em] text-[#FF3333] uppercase">
                      {post.tag}
                    </span>
                    <span className="h-[1px] w-8 bg-gray-200"></span>
                    <span className="font-[family-name:var(--font-dm-mono)] text-xs text-gray-400">
                      {formatDate(post.publishedAt || post._createdAt)}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-outfit)] text-xl font-medium text-black group-hover:text-[#FF3333] transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
