"use client";
import { type FormEvent, useState } from "react";
import Image from "next/image";
import { profile } from "@/lib/profile";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Unable to send");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        "Your message could not be saved right now. Please use the email link below.",
      );
    }
  }
  return (
    <main className="page">
      <PageHeader
        eyebrow="Good things start with a conversation"
        title="Let’s make something meaningful."
        description="Have a project, a question, or an idea? I’d love to hear from you."
      />
      <div className="contact-grid">
        <aside className="card contact-intro">
          <h2>Say hello.</h2>
          <p>
            From communication strategies to digital experiences, I’m open to
            thoughtful collaborations.
          </p>
          <div className="contact-info">
            <div>
              <Icon name="mail" />
              <div>
                <small>Email me</small>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
            <div>
              <Icon name="globe" />
              <div>
                <small>Based in</small>
                <span>{profile.location}</span>
              </div>
            </div>
            <div>
              <Icon name="clock" />
              <div>
                <small>Prefer a conversation?</small>
                <a
                  href="https://calendly.com/kidunejoseph91/30min"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a 30-minute call ↗
                </a>
              </div>
            </div>
          </div>
          <div className="contact-art">
            <Image src="/images/pastel-orbit.webp" alt="" fill sizes="350px" />
          </div>
        </aside>
        <form onSubmit={submit} className="card contact-form">
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <div className="form-row">
            <Field
              label="Your name"
              name="name"
              placeholder="Name"
              required
              maxLength={120}
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              maxLength={254}
            />
          </div>
          <Field
            label="Company or organisation"
            name="company"
            placeholder="Where you work (optional)"
            maxLength={200}
          />
          <label className="form-field">
            <span>What can I help with?</span>
            <select name="projectType">
              <option value="">Choose a project type</option>
              {projectTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>A little about your idea *</span>
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={10000}
              rows={6}
              placeholder="Tell me about your goals, timeline, and what you have in mind…"
            />
          </label>
          <div
            className={`form-status ${status}`}
            role="status"
            aria-live="polite"
          >
            {status === "sent"
              ? "Thank you! Your message has been received. I’ll be in touch."
              : error}
            {status === "error" && (
              <a
                className="text-link"
                style={{ display: "block", marginTop: 8 }}
                href={`mailto:${profile.email}`}
              >
                {profile.email} ↗
              </a>
            )}
          </div>
          <button
            className="button button-dark"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send message"}
            <Icon
              name={status === "sent" ? "check" : "arrow"}
              width="17"
              height="17"
            />
          </button>
          <p className="form-footnote">
            Your enquiry is stored securely so I can respond and track follow-up.
          </p>
        </form>
      </div>
    </main>
  );
}
function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  maxLength: number;
}) {
  return (
    <label className="form-field">
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete={
          name === "name" ? "name" : name === "email" ? "email" : "organization"
        }
      />
    </label>
  );
}
