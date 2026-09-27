"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="page">
      <div className="card empty-card">
        <h1>Something didn’t load.</h1>
        <p>Please try again in a moment.</p>
        <button className="button button-dark" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
