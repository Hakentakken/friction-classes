import { chromium } from "@playwright/test";
import fs from "node:fs";
import assert from "node:assert/strict";
import AxeBuilder from "@axe-core/playwright";
import { pageRegistry } from '../src/lib/seo.mjs';

fs.mkdirSync("qa/screenshots", { recursive: true });
const browser = await chromium.launch();
const origin = process.env.QA_URL || "http://localhost:4322";
const errors = [];
const results = [];
const accessibility = [];
const pages = Object.keys(pageRegistry);
for (const theme of ["light", "dark"]) {
  for (const width of [320, 390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: width < 500 ? 844 : 1000 },
      colorScheme: theme,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.route("https://wa.me/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "WhatsApp QA stub: no message sent.",
      }),
    );
    for (const route of pages) {
      const response = await page.goto(`${origin}/${route}`);
      assert(response?.ok(), `Response ${route}`);
      await page.evaluate(() => document.fonts.ready);
      // Render deferred below-fold sections before full-page visual/a11y checks.
      for (const section of await page.locator('main > .section').all()) {
        await section.scrollIntoViewIfNeeded();
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      assert.equal(await page.getAttribute("html", "data-theme"), theme);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      assert(!overflow, `Overflow: ${route}, ${theme}, ${width}`);
      assert.equal(await page.locator("h1").count(), 1);
      const broken = await page
        .locator("img")
        .evaluateAll(
          (imgs) =>
            imgs.filter((img) => !img.complete || img.naturalWidth === 0)
              .length,
        );
      assert.equal(broken, 0, `Images ${route}`);
      if (width === 390 || width === 1440) {
        const audit = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        accessibility.push({
          route: route || "/",
          width,
          theme,
          violations: audit.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
        });
      }
      if (width !== 320 && ["", "contact/", "mentors/", "learn/", "nri-families/usa/", "learn/choosing-an-online-tutor/"].includes(route))
        await page.screenshot({
          path: `qa/screenshots/${route.replaceAll("/", "-").replace(/-$/, '') || "home"}-${width}-${theme}.png`,
          fullPage: true,
        });
      if (width !== 320 && route === "")
        await page.screenshot({
          path: `qa/screenshots/hero-${width}-${theme}.png`,
        });
    }
    await page.goto(origin);
    await page.locator(".theme-toggle").click();
    assert.equal(
      await page.getAttribute("html", "data-theme"),
      theme === "dark" ? "light" : "dark",
    );
    await page.reload();
    assert.equal(
      await page.getAttribute("html", "data-theme"),
      theme === "dark" ? "light" : "dark",
    );
    if (width < 500) {
      await page.locator(".menu-toggle").click();
      assert.equal(
        await page.locator(".menu-toggle").getAttribute("aria-expanded"),
        "true",
      );
      await page.keyboard.press("Escape");
      assert.equal(
        await page.locator(".menu-toggle").getAttribute("aria-expanded"),
        "false",
      );
    }
    await page.goto(`${origin}/faq/`);
    await page.locator("summary").first().click();
    assert(
      (await page.locator("details").first().getAttribute("open")) !== null,
    );
    await page.goto(`${origin}/contact/`);
    await page.locator("button[type=submit]").click();
    assert.equal(await page.locator("#form-status").textContent(), "");
    await page.locator("#parent-name").fill("  ");
    await page.locator("#child-class").selectOption("Class 5");
    await page.locator("#subject").selectOption("Science");
    await page.locator("#country").fill("UK, London");
    await page
      .locator("#preferred-time")
      .fill("Weekdays after 5 pm, London time");
    await page.locator("button[type=submit]").click();
    assert.equal(await page.locator("#form-status").textContent(), "");
    await page.locator("#parent-name").fill("QA Parent & Guardian");
    // Intercept window.open to inspect the destination without contacting WhatsApp.
    await page.evaluate(() => {
      window.open = (url) => {
        window.__qaOpenedUrl = String(url);
        return null;
      };
    });
    await page.locator("button[type=submit]").click();
    const destination = await page.evaluate(() => window.__qaOpenedUrl);
    const url = new URL(destination);
    assert.equal(url.host, "wa.me");
    assert.equal(url.pathname, "/918076870866");
    assert(url.searchParams.get("text").includes("QA Parent & Guardian"));
    assert(url.searchParams.get("text").includes("Class 5"));
    assert.equal(
      await page.locator("#whatsapp-fallback").getAttribute("href"),
      destination,
    );
    assert(await page.locator("#whatsapp-fallback").isVisible());
    const storage = await page.evaluate(() => Object.keys(localStorage));
    assert.deepEqual(storage, ["friction-theme"]);
    results.push(
      `${width}px ${theme}: ${pages.length} pages, no overflow/broken images, theme persistence, FAQ, navigation and validated WhatsApp form passed`,
    );
    console.log(results.at(-1));
    await context.close();
  }
}
// Check content and direct CTA still work with JavaScript unavailable.
const context = await browser.newContext({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
const page = await context.newPage();
await page.goto(origin);
assert(await page.locator("h1").isVisible());
assert(
  await page.locator('.hero-actions a[href^="https://wa.me/"]').isVisible(),
);
await context.close();
await browser.close();
assert.deepEqual(errors, [], "No browser errors");
fs.writeFileSync(
  "qa/accessibility-results.json",
  JSON.stringify(accessibility, null, 2),
);
assert.equal(
  accessibility.filter((result) => result.violations.length).length,
  0,
  "Accessibility violations: see qa/accessibility-results.json",
);
const report = `${results.join("\n")}\nNo browser console or page errors. No-JS hero and direct WhatsApp CTA verified.\nWhatsApp destinations tested with interception; no message sent.\n`;
fs.writeFileSync("qa/browser-results.txt", report);
console.log(report);
