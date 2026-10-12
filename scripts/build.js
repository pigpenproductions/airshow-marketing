// Renders every email in src/emails to build/<slug>.html and build/<slug>.txt,
// inlines CSS with juice, then runs pre-flight checks.

const fs = require('fs');
const path = require('path');
const juice = require('juice');
const config = require('../src/config');
const emails = require('../src/emails');
const { render } = require('../src/template');
const { renderText } = require('../src/text');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'build');
const GMAIL_CLIP = 102 * 1024; // Gmail clips at ~102KB

const { manifest, warnings: assetWarnings } = JSON.parse(fs.readFileSync(path.join(OUT, 'assets', 'manifest.json'), 'utf8'));

const img = (key) => {
  const m = manifest[key];
  if (!m) throw new Error(`No asset "${key}" in manifest. Run npm run assets.`);
  return { ...m, src: config.imageUrls[key] || `assets/${m.file}`, hosted: Boolean(config.imageUrls[key]) };
};

const BANNED = [/iconic/i, /unforgettable/i, /don.t miss out/i, /\belevate/i, /\bseamless/i, /\bunleash/i];

function check(slug, html, text) {
  const errors = [];
  const warns = [];
  const bytes = Buffer.byteLength(html);
  if (bytes > GMAIL_CLIP * 0.9) (bytes > GMAIL_CLIP ? errors : warns).push(`HTML is ${(bytes / 1024).toFixed(1)}KB, near Gmail's clip limit`);

  const visible = text;
  if (/[–—]/.test(html + text)) errors.push('Contains an en or em dash. Use hyphens.');
  if (/\p{Extended_Pictographic}/u.test(visible.replace(/[£©®]/g, ''))) errors.push('Contains an emoji.');
  BANNED.forEach((re) => re.test(visible) && errors.push(`Banned word: ${re}`));

  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    for (const a of ['width=', 'height=', 'alt="']) if (!tag.includes(a)) errors.push(`<img> missing ${a}: ${tag.slice(0, 80)}`);
  }
  const edits = [...html.matchAll(/mc:edit="([^"]+)"/g)].map((m) => m[1]);
  if (new Set(edits).size !== edits.length) errors.push(`Duplicate mc:edit names: ${edits}`);

  for (const m of html.matchAll(/<(?:a|v:roundrect)\b[^>]*href="([^"]+)"/g)) {
    const href = m[1];
    if (href.startsWith('*|')) continue;
    if (!href.includes('utm_source=mailchimp')) errors.push(`Link without UTMs: ${href}`);
  }
  for (const ph of ['TICKET_URL', 'INSTAGRAM_URL', 'FACEBOOK_URL', 'PHOTO_CREDIT']) {
    if (html.includes(ph)) warns.push(`Placeholder still in email: ${ph}`);
  }
  for (const m of html.matchAll(/src="([^"]+)"/g)) {
    if (!/^https:\/\//.test(m[1])) {
      warns.push('Images use local paths. Upload to Mailchimp and set imageUrls in src/config.js before pasting.');
      break;
    }
  }
  return { errors, warns, bytes, edits };
}

function main() {
  let failed = false;
  for (const email of emails) {
    const ctx = { links: config.links, logo: img('logo'), hero: email.hero ? { ...img(email.hero.key), alt: email.hero.alt, credit: email.hero.credit } : null };

    const raw = render(email, ctx);
    const html = juice(raw, { preserveMediaQueries: true, preserveFontFaces: true, applyWidthAttributes: false, applyHeightAttributes: false, removeStyleTags: true });
    const text = renderText(email, ctx);

    fs.writeFileSync(path.join(OUT, `${email.slug}.html`), html);
    fs.writeFileSync(path.join(OUT, `${email.slug}.txt`), text);

    const { errors, warns, bytes, edits } = check(email.slug, html, text);
    console.log(`\n${email.slug}  ${(bytes / 1024).toFixed(1)}KB  subject: "${email.subject}"`);
    console.log(`  mc:edit regions: ${edits.join(', ')}`);
    [...assetWarnings.filter((w) => w.includes(email.slug) || !w.includes('email-')), ...warns].forEach((w) => console.log(`  ! ${w}`));
    errors.forEach((e) => console.log(`  x ${e}`));
    if (errors.length) failed = true;
  }
  if (failed) {
    console.error('\nBuild failed pre-flight checks.');
    process.exit(1);
  }
  console.log('\nBuild OK.');
}

main();
