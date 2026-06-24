import fs from "node:fs";
import path from "node:path";
import { dryRun, getClient, slugify, stableId } from "./import-shared.mjs";

const articlesDir = path.join(process.cwd(), "public", "medium_articles_json", "articles");
const files = fs.readdirSync(articlesDir).filter((file) => file.endsWith(".json") && !file.startsWith("._"));

function block(text, style = "normal") {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2, 10),
    style,
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
    markDefs: [],
  };
}

function contentToPortableText(content = []) {
  return content.flatMap((item) => {
    if (item.type === "heading") return [block(item.text, item.level === 3 ? "h3" : "h2")];
    if (item.type === "quote") return [block(item.text, "blockquote")];
    if (item.type === "list") return (item.items || []).map((entry) => block(entry));
    return item.text ? [block(item.text)] : [];
  });
}

const docs = files.map((file) => {
  const source = JSON.parse(fs.readFileSync(path.join(articlesDir, file), "utf8"));
  const slug = source.slug || slugify(source.title);
  return {
    _id: stableId("article", slug),
    _type: "article",
    title: source.title,
    slug: { _type: "slug", current: slug },
    excerpt: source.summary,
    tag: source.category,
    category: source.category,
    tags: source.tags || [],
    readTimeMinutes: source.readTimeMinutes,
    originalUrl: source.source?.originalUrl,
    content: contentToPortableText(source.content),
    published: source.status !== "draft",
    publishedAt: source.publishedAt,
  };
});

console.log(JSON.stringify({ mode: dryRun ? "dry-run" : "write", found: docs.length, titles: docs.map((doc) => doc.title) }, null, 2));

if (!dryRun) {
  const client = await getClient();
  for (const doc of docs) {
    await client.createIfNotExists(doc);
    await client.patch(doc._id).set({
      title: doc.title,
      excerpt: doc.excerpt,
      tag: doc.tag,
      category: doc.category,
      tags: doc.tags,
      readTimeMinutes: doc.readTimeMinutes,
      originalUrl: doc.originalUrl,
      content: doc.content,
      published: doc.published,
      publishedAt: doc.publishedAt,
    }).commit();
  }
  console.log(`Imported ${docs.length} article records.`);
}
