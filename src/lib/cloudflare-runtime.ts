import { getCloudflareContext } from "@opennextjs/cloudflare";

export type ContactMessageStatus = "new" | "contacted" | "closed";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string | null;
  message: string;
  status: ContactMessageStatus;
  created_at: string;
  updated_at: string;
  source_url: string | null;
  user_agent: string | null;
  notification_sent: number;
};

type D1RunResult = {
  success?: boolean;
};

type D1AllResult<T> = {
  results?: T[];
};

type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  run: () => Promise<D1RunResult>;
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  all: <T = Record<string, unknown>>() => Promise<D1AllResult<T>>;
};

export type D1Database = {
  prepare: (query: string) => D1Statement;
};

export type RuntimeEnv = {
  DB?: D1Database;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
};

export function getRuntimeEnv(): RuntimeEnv {
  try {
    return getCloudflareContext().env as unknown as RuntimeEnv;
  } catch {
    return process.env as unknown as RuntimeEnv;
  }
}

export function getContactDb(): D1Database | null {
  return getRuntimeEnv().DB ?? null;
}
