import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const browser = await chromium.launch();
const results = [];
for (const theme of ['light', 'dark']) {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ colorScheme: theme, viewport: { width, height: 1000 } });
    const page = await context.newPage();
    await page.goto(process.env.QA_URL || 'http://localhost:4322');
    await page.evaluate(() => document.fonts.ready);
    for (const element of await page.locator('.reveal').all()) {
      await element.scrollIntoViewIfNeeded();
      await page.waitForFunction(el => getComputedStyle(el).opacity === '1', await element.elementHandle());
    }
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    // Full-page screenshots must render off-screen sections too. This override
    // is only for the screenshot, after testing the actual scrolling behavior.
    await page.addStyleTag({ content: '.home-page main > .section { content-visibility: visible !important; }' });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `qa/screenshots/home-${width}-${theme}.png`, fullPage: true });
    results.push({ width, theme, revealElements: await page.locator('.reveal').count(), allVisibleOnScroll: true });
    await context.close();
  }
}
await browser.close();
fs.writeFileSync('qa/motion-results.json', JSON.stringify(results, null, 2));
console.log('PASS: home reveal effects and scrolling in four viewport/theme combinations; complete screenshots saved.');
