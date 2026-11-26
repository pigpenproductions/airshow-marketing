// Renders sponsorship/pack-2027.html to an A4 PDF plus a PNG preview of each page.
// Usage: node scripts/sponsorship.js

const path = require('path');
const { chromium } = require('playwright-core');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'sponsorship', 'pack-2027.html');
const PDF = path.join(ROOT, 'sponsorship', 'HIA27-partnership-pack.pdf');

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM || '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
  await page.goto('file://' + SRC, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: PDF, format: 'A4', printBackground: true, preferCSSPageSize: true });
  const pages = await page.$$('.page');
  for (let i = 0; i < pages.length; i++) {
    await pages[i].screenshot({ path: path.join(ROOT, 'sponsorship', `preview-${i + 1}.png`) });
  }
  await browser.close();
  console.log(`Wrote ${path.relative(ROOT, PDF)} and ${pages.length} previews`);
})();
