import { cookies } from "next/headers";
import { getRuntimeEnv } from "./cloudflare-runtime";

export const ADMIN_COOKIE = "portfolio_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return diff === 0;
}

export function getAdminConfig() {
  const env = getRuntimeEnv();
  return {
    password: env.ADMIN_PASSWORD ?? "",
    sessionSecret: env.ADMIN_SESSION_SECRET ?? "",
  };
}

export async function createAdminSession() {
  const { sessionSecret } = getAdminConfig();
  if (!sessionSecret) throw new Error("ADMIN_SESSION_SECRET is not configured.");

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `v1.${expiresAt}`;
  const signature = await sign(payload, sessionSecret);

  return {
    value: `${payload}.${signature}`,
    maxAge: SESSION_TTL_SECONDS,
  };
}

export async function isAdminAuthenticated() {
  const { sessionSecret } = getAdminConfig();
  if (!sessionSecret) return false;

  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!value) return false;

  const [version, expiresAtText, signature] = value.split(".");
  if (version !== "v1" || !expiresAtText || !signature) return false;

  const expiresAt = Number(expiresAtText);
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000))
    return false;

  const payload = `${version}.${expiresAtText}`;
  const expected = await sign(payload, sessionSecret);
  return safeEqual(signature, expected);
}
