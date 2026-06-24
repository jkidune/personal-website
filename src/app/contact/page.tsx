'use client'

import { FormEvent, useState } from "react";
import { profile } from "@/lib/profile";

const projectTypes = [
  "Communication strategy",
  "Website design",
  "Content strategy",
  "Digital marketing",
  "Campaign design",
  "UI/UX design",
  "Other",
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      projectType: String(data.get("projectType") || ""),
      message: String(data.get("message") || ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Please complete your name, email, and message.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Message failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(`The form could not send right now. Please email ${profile.email}.`);
    }
  }

  return (
    <main className="min-h-screen bg-night px-4 pb-24 pt-32">
      <div className="site-shell">
        <header className="mb-16 grid gap-8 md:grid-cols-[1fr_0.36fr] md:items-end">
          <div>
            <p className="section-label mb-5">Contact</p>
            <h1 className="text-7xl font-black uppercase leading-[0.86] tracking-[-0.075em] md:text-[12rem]">
              Let&apos;s talk.
            </h1>
          </div>
          <div className="text-sm leading-relaxed text-muted">
            <p>Tell Joseph what you are building, changing, publishing, or communicating.</p>
            <a href={`mailto:${profile.email}`} className="editorial-link mt-4 inline-block">{profile.email}</a>
          </div>
        </header>

        <div className="grid gap-16 lg:grid-cols-[0.35fr_1fr]">
          <aside className="grid content-start gap-8 text-sm text-muted">
            <div>
              <p className="section-label mb-3">Location</p>
              <p className="text-ink">{profile.location}</p>
            </div>
            <div>
              <p className="section-label mb-3">Profiles</p>
              <div className="grid gap-2">
                {profile.portfolioLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="editorial-link">{link.label}</a>
                ))}
              </div>
            </div>
          </aside>

          <form onSubmit={submit} className="grid gap-6" noValidate>
            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <Field label="Company or organization" name="company" />
            <label className="grid gap-2">
              <span className="section-label">Project type</span>
              <select name="projectType" className="border-b border-line bg-transparent py-4 text-ink focus:border-accent">
                <option value="">Select a type</option>
                {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="section-label">Message *</span>
              <textarea
                name="message"
                required
                rows={7}
                className="border border-line bg-transparent p-4 text-ink placeholder:text-dim focus:border-accent"
                placeholder="Share context, goals, timeline, and any links."
              />
            </label>

            <div aria-live="polite" className="min-h-6 text-sm text-accent">
              {status === "sent" ? "Message sent. Joseph will get back to you soon." : error}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-fit bg-ink px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-night transition-colors hover:bg-accent disabled:opacity-50"
            >
              {status === "sending" ? "Sending" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="section-label">{label}{required ? " *" : ""}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="border-b border-line bg-transparent py-4 text-ink placeholder:text-dim focus:border-accent"
      />
    </label>
  );
}
