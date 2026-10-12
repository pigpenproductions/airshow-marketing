// Screenshots of each built email: 600px and 375px, light and dark,
// plus one images-off render at 600px. Output: screenshots/.
// Usage: npm run shots [-- email-1-tier1]

const fs = require('fs');
const path = require('path');
const { launch } = require('./browser');
const emails = require('../src/emails');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'screenshots');

async function main() {
  const only = process.argv[2];
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await launch();
  for (const email of emails.filter((e) => !only || e.slug === only)) {
    // Preview copy with merge tags filled the way Mailchimp would for a
    // subscriber with no first name. The built file itself is untouched.
    const preview = path.join(ROOT, 'build', `.preview-${email.slug}.html`);
    fs.writeFileSync(
      preview,
      fs
        .readFileSync(path.join(ROOT, 'build', `${email.slug}.html`), 'utf8')
        .replace(/\*\|IF:FNAME\|\*.*?\*\|ELSE:\|\*(.*?)\*\|END:IF\|\*/g, '$1')
        .replace(/\*\|IF:REWARDS\|\*[\s\S]*?\*\|END:IF\|\*/g, '')
        .replace('*|LIST:ADDRESSLINE|*', 'AMP Productions Limited, [list address line]')
    );
    const url = 'file://' + preview;
    const runs = [
      ...[600, 375].flatMap((width) => ['light', 'dark'].map((scheme) => ({ width, scheme }))),
      { width: 600, scheme: 'light', imagesOff: true },
    ];
    for (const r of runs) {
      const ctx = await browser.newContext({ viewport: { width: r.width, height: 900 }, deviceScaleFactor: 2, colorScheme: r.scheme });
      const page = await ctx.newPage();
      if (r.imagesOff) await page.route(/\.(png|jpe?g|gif)$/, (route) => route.abort());
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const name = `${email.slug}-${r.width}-${r.scheme}${r.imagesOff ? '-images-off' : ''}.png`;
      await page.screenshot({ path: path.join(OUT, name), fullPage: true });
      console.log(`  screenshots/${name}`);
      await ctx.close();
    }
  }
  await browser.close();
  for (const f of fs.readdirSync(path.join(ROOT, 'build'))) if (f.startsWith('.preview-')) fs.unlinkSync(path.join(ROOT, 'build', f));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
