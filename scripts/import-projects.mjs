import fs from "node:fs";
import path from "node:path";
import { dryRun, getClient, normalizeHeaders, readXlsxRows, slugify, stableId } from "./import-shared.mjs";

const spreadsheet = path.join(process.cwd(), "public", "Joseph_Masonda_Portfolio_Content_System.xlsx");
if (!fs.existsSync(spreadsheet)) {
  throw new Error(`Project spreadsheet not found: ${spreadsheet}`);
}

const rows = readXlsxRows(spreadsheet).filter((row) => row.some(Boolean));
const headerIndex = rows.findIndex((row) => row.some((cell) => /project\s*\/\s*content title|project title|title/i.test(String(cell))));
const headers = normalizeHeaders(rows[headerIndex] || []);
const records = rows.slice(headerIndex + 1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ""])));

function pick(record, names) {
  for (const name of names) {
    const key = name.toLowerCase().replace(/[^a-z0-9]+/g, "");
    if (record[key]) return String(record[key]).trim();
  }
  return "";
}

function list(value) {
  return String(value || "").split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
}

const docs = records
  .map((record) => {
    const title = pick(record, ["title", "project title", "project content title", "project / content title", "name"]);
    if (!title) return null;
    const slug = slugify(pick(record, ["slug"]) || title);
    return {
      _id: stableId("project", slug),
      _type: "project",
      title,
      slug: { _type: "slug", current: slug },
      description: pick(record, ["excerpt", "summary", "description"]).slice(0, 260),
      client: pick(record, ["client", "client organisation sector", "client / organisation / sector"]),
      category: pick(record, ["category", "type", "service", "services"]),
      industry: pick(record, ["industry", "sector"]),
      year: Number(pick(record, ["year"])) || undefined,
      role: pick(record, ["role", "role contribution", "role / contribution"]),
      services: list(pick(record, ["services", "capabilities shown"])),
      techStack: list(pick(record, ["tools", "tools stack", "tools / stack", "tech stack", "techStack"])),
      liveUrl: pick(record, ["projectUrl", "website", "liveUrl", "live repo read url", "live / repo / read url"]) || undefined,
      challenge: pick(record, ["problem goal", "problem / goal"]) || undefined,
      approach: pick(record, ["portfolio story angle"]) || undefined,
      outcome: pick(record, ["public evidence result", "public evidence / result", "results metrics", "results / metrics"]) || undefined,
      behanceUrl: pick(record, ["behanceUrl", "behance"]) || undefined,
      githubUrl: pick(record, ["githubUrl", "github"]) || undefined,
      vimeoUrl: pick(record, ["vimeoUrl", "vimeo"]) || undefined,
      featured: /^true|yes|1$/i.test(pick(record, ["featured"])),
      sortOrder: Number(pick(record, ["sortOrder", "order"])) || undefined,
    };
  })
  .filter(Boolean);

console.log(JSON.stringify({ mode: dryRun ? "dry-run" : "write", found: docs.length, titles: docs.map((doc) => doc.title) }, null, 2));

if (!dryRun) {
  const client = await getClient();
  for (const doc of docs) {
    await client.createIfNotExists(doc);
    await client.patch(doc._id).setIfMissing(doc).set({
      title: doc.title,
      description: doc.description,
      client: doc.client,
      category: doc.category,
      industry: doc.industry,
      year: doc.year,
      role: doc.role,
      services: doc.services,
      techStack: doc.techStack,
      liveUrl: doc.liveUrl,
      behanceUrl: doc.behanceUrl,
      githubUrl: doc.githubUrl,
      vimeoUrl: doc.vimeoUrl,
      featured: doc.featured,
      sortOrder: doc.sortOrder,
    }).commit();
  }
  console.log(`Imported ${docs.length} project records.`);
}
