// Prepares images in build/assets and writes build/assets/manifest.json.
// - Logo: puts assets/hia-logo.png on a light rounded plate so the navy
//   lettering survives dark mode and forced colour inversion.
// - Heroes: copies assets/<file> if present, else renders a labelled navy placeholder.
// - If assets/hia-logo.png is missing, renders a stand-in wordmark and warns.

const fs = require('fs');
const path = require('path');
const { launch } = require('./browser');
const emails = require('../src/emails');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'assets');
const OUT = path.join(ROOT, 'build', 'assets');

const LOGO_W = 150; // displayed wordmark width
const PLATE_PAD = 8;
const HERO_W = 552; // displayed width; source should be 2x (1104)

const FONT_LINK =
  '<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Geist:wght@400;500;600&display=swap" rel="stylesheet">';

const dataUri = (file) => `data:image/${path.extname(file).slice(1).replace('jpg', 'jpeg')};base64,${fs.readFileSync(file).toString('base64')}`;

async function shoot(page, html, selector, file, opts = {}) {
  await page.setContent(`<!doctype html><html><head>${FONT_LINK}<style>html,body{margin:0;background:transparent}</style></head><body>${html}</body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');
  await page.locator(selector).screenshot({ path: file, omitBackground: !file.endsWith('.jpg'), ...opts });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const warnings = [];
  const manifest = {};
  const browser = await launch();
  const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1400, height: 1000 } });

  // ---- logo ----
  let logoFile = path.join(SRC, 'hia-logo.png');
  if (!fs.existsSync(logoFile)) {
    warnings.push('assets/hia-logo.png not found. Using a STAND-IN wordmark. Add the real logo before sending.');
    logoFile = path.join(OUT, 'hia-logo-standin.png');
    await shoot(
      page,
      `<div id="w" style="display:inline-block;padding:2px;font-family:'Big Shoulders Display';line-height:1">
        <div style="font-weight:900;font-size:64px;line-height:52px;color:#D40F0F;letter-spacing:0.01em">HEADCORN</div>
        <div style="font-weight:900;font-size:15.5px;line-height:20px;color:#0A1543;letter-spacing:0.36em;padding:1px 0 0 2px">INTERNATIONAL</div>
        <div style="font-weight:900;font-size:64px;line-height:52px;color:#D40F0F;letter-spacing:0.01em">AIRSHOW</div>
      </div>`,
      '#w',
      logoFile
    );
  }
  const logoUri = dataUri(logoFile);
  await page.setContent(`<img id="l" src="${logoUri}">`);
  const nat = await page.locator('#l').evaluate((i) => ({ w: i.naturalWidth, h: i.naturalHeight }));
  const logoH = Math.round((LOGO_W * nat.h) / nat.w);
  await shoot(
    page,
    `<div id="p" style="display:inline-block;padding:${PLATE_PAD}px;background:#FBFBFC;border-radius:10px"><img src="${logoUri}" style="display:block;width:${LOGO_W}px;height:${logoH}px"></div>`,
    '#p',
    path.join(OUT, 'hia-logo-plate.png')
  );
  manifest.logo = { file: 'hia-logo-plate.png', w: LOGO_W + PLATE_PAD * 2, h: logoH + PLATE_PAD * 2, standin: !fs.existsSync(path.join(SRC, 'hia-logo.png')) };

  // ---- heroes ----
  for (const email of emails) {
    const h = email.hero;
    if (!h) continue;
    const real = path.join(SRC, h.file);
    if (fs.existsSync(real)) {
      fs.copyFileSync(real, path.join(OUT, h.file));
      await page.setContent(`<img id="h" src="${dataUri(real)}">`);
      const d = await page.locator('#h').evaluate((i) => ({ w: i.naturalWidth, h: i.naturalHeight }));
      if (d.w < HERO_W * 2) warnings.push(`assets/${h.file} is ${d.w}px wide. Export at ${HERO_W * 2}px for sharp retina display.`);
      manifest[h.key] = { file: h.file, w: HERO_W, h: Math.round((HERO_W * d.h) / d.w), placeholder: false };
    } else {
      const file = `${h.key}-placeholder.jpg`;
      warnings.push(`assets/${h.file} not found. ${email.slug} uses a placeholder hero.`);
      const H = 368; // 3:2
      await page.setViewportSize({ width: 1400, height: 1000 });
      await shoot(
        page,
        `<div id="h" style="width:${HERO_W}px;height:${H}px;position:relative;overflow:hidden;background:#0A1543;background-image:radial-gradient(120% 90% at 78% 8%, #22306E 0%, #0A1543 55%, #070E30 100%);font-family:Geist,Arial,sans-serif">
          <div style="position:absolute;left:0;right:0;top:${Math.round(H * 0.68)}px;height:1px;background:rgba(255,255,255,.18)"></div>
          <div style="position:absolute;left:28px;bottom:26px;color:#fff">
            <div style="font-family:'Big Shoulders Display';font-weight:800;font-size:34px;line-height:34px">${h.placeholderLabel}</div>
            <div style="font-size:13px;line-height:20px;opacity:.72;margin-top:6px">Placeholder. Replace assets/${h.file} (1104 x 736) and rebuild.</div>
          </div>
        </div>`,
        '#h',
        path.join(OUT, file),
        { type: 'jpeg', quality: 82 }
      );
      manifest[h.key] = { file, w: HERO_W, h: H, placeholder: true };
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify({ manifest, warnings }, null, 2));
  warnings.forEach((w) => console.warn(`  ! ${w}`));
  console.log(`assets: wrote ${Object.keys(manifest).length} images to build/assets`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
