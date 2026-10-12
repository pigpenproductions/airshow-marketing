// Packages each built email as a Mailchimp-ready zip in dist/:
//   <slug>-mailchimp.zip  ->  <slug>.html + images/
// In Mailchimp: Templates > Create Template > Code your own > Import zip.
// Mailchimp uploads the images to Content Studio and rewrites the paths.
// The plain-text version sits beside the zip, to paste at campaign stage.

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const emails = require('../src/emails');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const DIST = path.join(ROOT, 'dist');
const only = process.argv[2];

fs.mkdirSync(DIST, { recursive: true });
for (const email of emails.filter((e) => !only || e.slug === only)) {
  let html = fs.readFileSync(path.join(BUILD, `${email.slug}.html`), 'utf8');
  const zip = new AdmZip();
  const used = new Set();
  html = html.replace(/src="assets\/([^"]+)"/g, (_, f) => {
    used.add(f);
    return `src="images/${f}"`;
  });
  for (const f of used) zip.addLocalFile(path.join(BUILD, 'assets', f), 'images');
  zip.addFile(`${email.slug}.html`, Buffer.from(html, 'utf8'));
  const out = path.join(DIST, `${email.slug}-mailchimp.zip`);
  zip.writeZip(out);
  fs.copyFileSync(path.join(BUILD, `${email.slug}.txt`), path.join(DIST, `${email.slug}-plain-text.txt`));
  const kb = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`  dist/${path.basename(out)}  ${kb}KB  (${used.size} images)`);
  if (/src="https?:/.test(html)) console.log('    note: some images already use hosted URLs from src/config.js');
}
