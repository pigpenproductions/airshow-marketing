// Rubber-stamp graphics for aircraft reveals: transparent PNGs.
//
//   NODE_PATH=<dir with playwright-core> node scripts/stamps.js
//
// Writes assets/stamps/:
//   declassified-<colour>.png        no file number
//   declassified-<colour>-01..08.png "AIRCRAFT 01" ... for each reveal
//   classified-<colour>.png          for teasers before a reveal
//   flying-static-<colour>.png       aircraft that fly AND sit on static
//   flying-static-first-<colour>.png same, "FIRST AT HEADCORN SINCE 1944" (P-47)
//
//   node scripts/stamps.js flying    renders only the flying-static stamps
//   example-teaser.jpg / example-reveal.jpg  how they sit on a 1080x1350 post

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'stamps');
const FONTS =
  '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">';
const COLOURS = { red: '#D40F0F', white: '#F4F5F8', navy: '#0A1543' };

// The stamp is an SVG: a double border, a top line, the big word and a bottom
// line, tilted, with an ink filter that roughens the edges and knocks out
// specks so it reads as a real rubber stamp rather than clean type.
function stampSvg({ word, top, bottom, colour, seed = 3, tilt = -7 }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 520" width="2200" height="1040">
  <defs>
    <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="${seed}" result="warp"/>
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="6" xChannelSelector="R" yChannelSelector="G" result="rough"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="${seed + 11}" result="grain"/>
      <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -4 0 0 0 2.75" result="speckMask"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="${seed + 29}" result="blot"/>
      <feColorMatrix in="blot" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2 0 0 0 2.25" result="blotMask"/>
      <feComposite in="rough" in2="speckMask" operator="in" result="speckled"/>
      <feComposite in="speckled" in2="blotMask" operator="in"/>
    </filter>
  </defs>
  <g transform="rotate(${tilt} 550 260)" filter="url(#ink)" fill="${colour}" stroke="${colour}">
    <rect x="60" y="80" width="980" height="360" rx="22" fill="none" stroke-width="16"/>
    <rect x="84" y="104" width="932" height="312" rx="12" fill="none" stroke-width="5"/>
    <text x="550" y="162" text-anchor="middle" stroke="none"
      font-family="JetBrains Mono, monospace" font-weight="700" font-size="30" letter-spacing="7">${top}</text>
    <line x1="120" y1="186" x2="980" y2="186" stroke-width="4"/>
    <text x="550" y="338" text-anchor="middle" stroke="none"
      font-family="Oswald, sans-serif" font-weight="700" font-size="150"
      textLength="${word.length > 10 ? 860 : 760}" lengthAdjust="spacingAndGlyphs">${word}</text>
    <line x1="120" y1="364" x2="980" y2="364" stroke-width="4"/>
    <text x="550" y="404" text-anchor="middle" stroke="none"
      font-family="JetBrains Mono, monospace" font-weight="700" font-size="28" letter-spacing="6">${bottom}</text>
  </g>
</svg>`;
}

async function renderStamp(page, spec, file) {
  await page.setViewportSize({ width: 2200, height: 1040 });
  await page.setContent(
    `<!doctype html><html><head>${FONTS}<style>html,body{margin:0;background:transparent}</style></head>
     <body>${stampSvg(spec)}</body></html>`,
    { waitUntil: 'networkidle' }
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file, omitBackground: true });
}

// 1080x1350 example posts: a blurred teaser with CLASSIFIED, then the sharp
// reveal with DECLASSIFIED. The aircraft name is a placeholder.
async function renderExample(page, { photo, stamp, blur, label, name, file }) {
  const img = 'file://' + photo;
  const st = 'file://' + stamp;
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.goto('file://' + path.join(OUT, '.blank.html'));
  await page.setContent(
    `<!doctype html><html><head>${FONTS}<style>
      html,body{margin:0;width:1080px;height:1350px;overflow:hidden;background:#050A24;font-family:Oswald,sans-serif;color:#F4F5F8}
      .photo{position:absolute;inset:0;background:url('${img}') center/cover;filter:${blur ? 'blur(26px) brightness(.45)' : 'none'};transform:scale(${blur ? 1.1 : 1})}
      .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,10,36,.75) 0%,rgba(5,10,36,0) 30%,rgba(5,10,36,0) 55%,rgba(5,10,36,.92) 100%)}
      .top{position:absolute;left:56px;top:52px;font:700 22px 'JetBrains Mono',monospace;letter-spacing:.2em}
      .top b{color:#D40F0F}
      .stamp{position:absolute;right:40px;top:${blur ? 470 : 150}px;width:${blur ? 1000 : 560}px}
      .name{position:absolute;left:56px;bottom:150px;font-weight:700;font-size:118px;line-height:.9;text-transform:uppercase}
      .label{position:absolute;left:56px;bottom:395px;font:700 24px 'JetBrains Mono',monospace;letter-spacing:.18em;color:#D40F0F}
      .foot{position:absolute;left:56px;right:56px;bottom:56px;display:flex;justify-content:space-between;font:600 26px Oswald;letter-spacing:.12em;text-transform:uppercase}
    </style></head><body>
      <div class="photo"></div><div class="shade"></div>
      <div class="top">HEADCORN INTERNATIONAL AIRSHOW · <b>HIA27</b></div>
      <img class="stamp" src="${st}">
      ${label ? `<div class="label">${label}</div>` : ''}
      ${name ? `<div class="name">${name}</div>` : ''}
      <div class="foot"><span>26-27 June 2027 · Kent</span><span>Tickets on sale now</span></div>
    </body></html>`,
    { waitUntil: 'networkidle' }
  );
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: file, type: 'jpeg', quality: 88 });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, '.blank.html'), '<!doctype html>');
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage();
  const top = 'HEADCORN INTERNATIONAL AIRSHOW';
  let n = 0;
  // Flying + static: tilted the other way to DECLASSIFIED so the two never
  // look copy-pasted when they share a post.
  for (const [name, colour] of Object.entries(COLOURS)) {
    await renderStamp(page, { word: 'FLYING + STATIC', top, bottom: 'HIA27 · IN THE AIR · ON THE GROUND', colour, seed: 17, tilt: 6 }, path.join(OUT, `flying-static-${name}.png`));
    await renderStamp(page, { word: 'FLYING + STATIC', top, bottom: 'HIA27 · FIRST AT HEADCORN SINCE 1944', colour, seed: 19, tilt: 6 }, path.join(OUT, `flying-static-first-${name}.png`));
    n += 2;
  }
  if (process.argv[2] === 'flying') {
    fs.unlinkSync(path.join(OUT, '.blank.html'));
    await browser.close();
    console.log(`${n} stamps in ${OUT}`);
    return;
  }
  for (const [name, colour] of Object.entries(COLOURS)) {
    await renderStamp(page, { word: 'DECLASSIFIED', top, bottom: 'HIA27 · CLEARED FOR RELEASE', colour }, path.join(OUT, `declassified-${name}.png`));
    await renderStamp(page, { word: 'CLASSIFIED', top, bottom: 'HIA27 · EYES ONLY', colour, seed: 5 }, path.join(OUT, `classified-${name}.png`));
    n += 2;
    for (let i = 1; i <= 8; i++) {
      const num = String(i).padStart(2, '0');
      await renderStamp(
        page,
        { word: 'DECLASSIFIED', top, bottom: `HIA27 · AIRCRAFT ${num} · CLEARED`, colour, seed: 3 + i },
        path.join(OUT, `declassified-${name}-${num}.png`)
      );
      n += 1;
    }
  }
  const photo = path.join(ROOT, 'assets', 'photos', 'spitfire-flypast.jpg');
  await renderExample(page, { photo, stamp: path.join(OUT, 'classified-red.png'), blur: true, file: path.join(OUT, 'example-teaser.jpg') });
  await renderExample(page, {
    photo, stamp: path.join(OUT, 'declassified-red-01.png'), blur: false,
    label: 'AIRCRAFT 01 · CONFIRMED', name: 'Aircraft<br>name here', file: path.join(OUT, 'example-reveal.jpg'),
  });
  fs.unlinkSync(path.join(OUT, '.blank.html'));
  await browser.close();
  console.log(`${n} stamps and 2 examples in ${OUT}`);
})();
