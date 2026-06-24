import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

export const root = process.cwd();
export const dryRun = process.argv.includes("--dry-run");

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function stableId(prefix, value) {
  return `${prefix}.${createHash("sha1").update(value).digest("hex").slice(0, 16)}`;
}

export function xmlText(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

export async function getClient() {
  const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN;
  if (!token && !dryRun) {
    throw new Error("Set SANITY_API_TOKEN or SANITY_WRITE_TOKEN for write mode.");
  }
  const { createClient } = await import("@sanity/client");
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "36x1zm20",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-16",
    token,
    useCdn: false,
  });
}

export function readXlsxRows(filePath) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "joseph-xlsx-"));
  execFileSync("unzip", ["-q", filePath, "-d", tmp]);
  const sharedPath = path.join(tmp, "xl", "sharedStrings.xml");
  const sheetPath = path.join(tmp, "xl", "worksheets", "sheet1.xml");
  const shared = fs.existsSync(sharedPath)
    ? Array.from(fs.readFileSync(sharedPath, "utf8").matchAll(/<si>([\s\S]*?)<\/si>/g)).map((match) =>
        xmlText(Array.from(match[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)).map((part) => part[1]).join(""))
      )
    : [];
  const sheet = fs.readFileSync(sheetPath, "utf8");
  const rows = Array.from(sheet.matchAll(/<(?:\w+:)?row[^>]*>([\s\S]*?)<\/(?:\w+:)?row>/g)).map((row) => {
    const values = [];
    Array.from(row[1].matchAll(/<(?:\w+:)?c([^>]*)>([\s\S]*?)<\/(?:\w+:)?c>/g)).forEach((cell) => {
      const ref = /r="([A-Z]+)\d+"/.exec(cell[1])?.[1] || "A";
      const col = ref.split("").reduce((sum, char) => sum * 26 + char.charCodeAt(0) - 64, 0) - 1;
      const type = /t="([^"]+)"/.exec(cell[1])?.[1];
      const raw = /<(?:\w+:)?v>([\s\S]*?)<\/(?:\w+:)?v>/.exec(cell[2])?.[1] || "";
      const inline = Array.from(cell[2].matchAll(/<(?:\w+:)?t[^>]*>([\s\S]*?)<\/(?:\w+:)?t>/g)).map((part) => part[1]).join("");
      values[col] = type === "s" ? shared[Number(raw)] || "" : xmlText(inline || raw);
    });
    return values;
  });
  fs.rmSync(tmp, { recursive: true, force: true });
  return rows;
}

export function normalizeHeaders(headers) {
  return headers.map((header) => String(header || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, ""));
}
