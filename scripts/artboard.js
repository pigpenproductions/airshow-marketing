// Renders a full-bleed "artboard": a photo cropped to size, an optional shade,
// display type, and optionally the aircraft cut out of the sky and laid back
// on top so it flies through the type. Output is a 2x JPEG.
//
// spec: {
//   photo, width, height,
//   position: '50% 50%',      // object-position for the crop
//   zoom: 1,                  // extra scale around `position`
//   shade: 'linear-gradient(...)',
//   layers: '<div>...</div>', // HTML; .fit[data-w] scales text to that width
//   cutout: { mode: 'blue' }, // optional
//   sky: 'linear-gradient(...)', // with cutout: drop the photo, paint this sky,
//   planeStyle: 'left:..;top:..;width:..' // and place the aircraft freely
//   photoStyle: '...'         // with sky and no cutout: place the whole photo
//                             // on the painted sky (fade its edges with a mask)
// }

const fs = require('fs');
const path = require('path');
const { cutout, FONT_LINK } = require('./poster');

async function renderArt(page, spec, outFile) {
  const W = spec.width;
  const H = spec.height;
  const tmp = path.join(path.dirname(outFile), `.art-${path.basename(outFile, '.jpg')}.html`);
  const photoUrl = 'file://' + path.resolve(spec.photo);
  const pos = spec.position || '50% 50%';
  const imgStyle = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos};transform:scale(${spec.zoom || 1});transform-origin:${pos}`;

  let plane = '';
  if (spec.cutout) {
    const cut = await cutout(page, spec.photo, spec.cutout);
    const planeFile = tmp.replace('.html', '-plane.png');
    fs.writeFileSync(planeFile, Buffer.from(cut.plane.split(',')[1], 'base64'));
    plane = spec.sky
      ? `<img src="file://${planeFile}" style="position:absolute;z-index:3;${spec.planeStyle}">`
      : `<img src="file://${planeFile}" style="${imgStyle};z-index:3">`;
  }

  fs.writeFileSync(
    tmp,
    `<!doctype html><html><head>${FONT_LINK}<style>
body{margin:0;background:#000}
#art{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:#07090F;font-family:'Big Shoulders Display';color:#fff}
.d{font-family:'Big Shoulders Display';font-weight:900;line-height:.84;letter-spacing:-.005em;text-transform:uppercase;white-space:nowrap}
.s{font-family:Geist;font-weight:600;font-size:13px;letter-spacing:.16em;text-transform:uppercase}
.fit{display:inline-block}
</style></head><body>
<div id="art">
${spec.sky ? `<div style="position:absolute;inset:0;z-index:1;background:${spec.sky}"></div>` : ''}
${!spec.sky ? `<img src="${photoUrl}" style="${imgStyle};z-index:1">` : spec.photoStyle ? `<img src="${photoUrl}" style="position:absolute;z-index:1;${spec.photoStyle}">` : ''}
${spec.shade ? `<div style="position:absolute;inset:0;z-index:1;background:${spec.shade}"></div>` : ''}
<div style="position:absolute;inset:0;z-index:2">${spec.layers || ''}</div>
${plane}
${spec.front ? `<div style="position:absolute;inset:0;z-index:4">${spec.front}</div>` : ''}
</div></body></html>`
  );

  await page.setViewportSize({ width: W + 40, height: H + 40 });
  await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('.fit[data-w]')) {
      el.style.fontSize = '100px';
      el.style.fontSize = (100 * Number(el.dataset.w)) / el.getBoundingClientRect().width + 'px';
    }
  });
  await page.locator('#art').screenshot({ path: outFile, type: 'jpeg', quality: 80 });
  for (const f of fs.readdirSync(path.dirname(outFile))) if (f.startsWith('.art-')) fs.unlinkSync(path.join(path.dirname(outFile), f));
  return { w: W, h: H };
}

module.exports = { renderArt };
