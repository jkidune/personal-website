"use client";

import dynamic from "next/dynamic";

const SanityStudioInner = dynamic(() => import("./SanityStudioInner"), {
  ssr: false,
  loading: () => (
    <div className="studio-loading">
      <span>Loading content studio…</span>
    </div>
  ),
});

export default function SanityStudioClient() {
  return <SanityStudioInner />;
}
