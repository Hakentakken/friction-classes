import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const browser = await chromium.launch();
const results = [];
for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ colorScheme: theme, reducedMotion: 'reduce' });
  const page = await context.newPage();
  for (const width of [430, 600, 768, 1024, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['', 'mentors/', 'contact/']) {
      await page.goto(`http://localhost:4321/${route}`);
      await page.evaluate(() => document.fonts.ready);
      const issues = await page.evaluate(() => [...document.querySelectorAll('h1,h2,h3')]
        .filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.textContent));
      assert.deepEqual(issues, [], `Clipped heading: ${width}, ${theme}, ${route}`);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if (width === 430 && route === 'mentors/') {
        const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        assert.deepEqual(audit.violations, []);
        await page.screenshot({ path: `qa/screenshots/mentors-430-${theme}.png`, fullPage: true });
      }
      results.push({ width, theme, route: route || '/', clippedHeadings: 0, horizontalOverflow: false });
    }
  }
  await context.close();
}
await browser.close();
fs.writeFileSync('qa/breakpoint-results.json', JSON.stringify(results, null, 2));
console.log('PASS: 30 additional viewport/page/theme checks; 430px mentor accessibility passed in both themes.');
