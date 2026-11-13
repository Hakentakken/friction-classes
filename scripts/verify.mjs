import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { site } from "../src/config.mjs";
import { pageRegistry } from '../src/lib/seo.mjs';

const root = path.resolve(process.env.VERIFY_DIR || "dist");
const files = fs
  .readdirSync(root, { recursive: true })
  .filter((f) => f.endsWith(".html"));
const base = site.basePath.replace(/\/$/, "");
let checked = 0;
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${file}: one primary heading`,
  );
  assert(html.includes("Skip to content"), `${file}: skip link`);
  if (!site.EMAIL)
    assert(!html.includes("mailto:"), `${file}: unknown email stays hidden`);
  assert(
    !/Pvt Ltd|\bLLP\b|success rate|testimonials|IIT faculty|free demo/i.test(
      html,
    ),
    `${file}: unsupported claims`,
  );
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (/^(https?:|tel:|mailto:|data:)/.test(value)) continue;
    const url = new URL(
      value,
      `https://local.test${base}/${file.replaceAll("\\", "/").replace(/index\.html$/, "")}`,
    );
    assert(
      !base || url.pathname.startsWith(`${base}/`),
      `${file}: link escapes base: ${value}`,
    );
    const local = decodeURIComponent(url.pathname.slice(base.length)).replace(
      /^\//,
      "",
    );
    let target = path.join(root, local);
    if (fs.existsSync(target) && fs.statSync(target).isDirectory())
      target = path.join(target, "index.html");
    assert(fs.existsSync(target), `${file}: missing ${value}`);
    if (url.hash && target.endsWith(".html")) {
      const targetHtml = fs.readFileSync(target, "utf8");
      assert(
        targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `${file}: missing fragment ${value}`,
      );
    }
    checked++;
  }
}
assert.equal(files.length, Object.keys(pageRegistry).length, "All registered pages are built");
assert(fs.existsSync(path.join(root, ".nojekyll")));
console.log(
  `PASS: ${files.length} pages, ${checked} local links/assets/fragments, page headings and content safeguards. Base: ${base || "/"}`,
);
