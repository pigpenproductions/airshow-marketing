// Builds a "magazine cover" hero: the photo as background, giant display type,
// then the aircraft cut out of the sky and laid back on top so it flies over
// the lettering. Works on photos of an aircraft against open sky.
//
// The cut-out is a flood fill from the photo's edges: anything reachable
// through small colour steps is sky. Roundels and canopy enclosed by the
// airframe are never reached, so they stay.

const fs = require('fs');
const path = require('path');

const FONT_LINK =
  '<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Geist:wght@400;500;600&display=swap" rel="stylesheet">';

// mode 'grey' suits pale, grey-blue skies. mode 'blue' suits saturated blue
// skies over grey-green camouflage: sky must be clearly bluer than it is red.
async function cutout(page, srcFile, { trimRight = 0, tolerance = 22, mode = 'grey' } = {}) {
  const mime = srcFile.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const uri = `data:${mime};base64,${fs.readFileSync(srcFile).toString('base64')}`;
  await page.setContent('<!doctype html><body></body>');
  return page.evaluate(
    async ({ uri, trimRight, tolerance, mode }) => {
      const img = new Image();
      img.src = uri;
      await img.decode();
      const w = img.naturalWidth - trimRight;
      const h = img.naturalHeight;
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const x = c.getContext('2d');
      x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, w, h);
      const px = d.data;
      const sky = new Uint8Array(w * h);
      const stack = [];
      const push = (i) => {
        if (!sky[i]) {
          sky[i] = 1;
          stack.push(i);
        }
      };
      for (let i = 0; i < w; i++) push(i), push((h - 1) * w + i);
      for (let j = 0; j < h; j++) push(j * w), push(j * w + w - 1);
      const diff = (a, b) => Math.abs(px[a * 4] - px[b * 4]) + Math.abs(px[a * 4 + 1] - px[b * 4 + 1]) + Math.abs(px[a * 4 + 2] - px[b * 4 + 2]);
      // Pixels darker than the sky by this much are never sky, even through soft edges.
      const lum = (i) => 0.3 * px[i * 4] + 0.59 * px[i * 4 + 1] + 0.11 * px[i * 4 + 2];
      const skyish = mode === 'blue' ? (i) => px[i * 4 + 2] - px[i * 4] > 45 && lum(i) > 80 : (i) => lum(i) > 95;
      const skyishLoose = mode === 'blue' ? (i) => px[i * 4 + 2] - px[i * 4] > 35 && lum(i) > 70 : (i) => lum(i) > 105;
      while (stack.length) {
        const i = stack.pop();
        const cx = i % w;
        const cy = (i - cx) / w;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const n = ny * w + nx;
          if (!sky[n] && diff(i, n) < tolerance && skyish(n)) push(n);
        }
      }
      // Clean-up passes: sky-coloured pixels touching the sky are sky. Catches
      // JPEG noise pockets along trailing edges. Enclosed roundels never touch sky.
      for (let pass = 0; pass < 4; pass++) {
        const grow = [];
        for (let k = 0; k < w * h; k++) {
          if (sky[k] || !skyishLoose(k)) continue;
          const kx = k % w;
          if ((kx > 0 && sky[k - 1]) || (kx < w - 1 && sky[k + 1]) || sky[k - w] || sky[k + w]) grow.push(k);
        }
        grow.forEach((k) => (sky[k] = 1));
      }
      // Blue skies: grain leaves islands the fill can't reach. Any clearly
      // sky-blue, bright pixel is sky. Roundel blue is far too dark to match.
      if (mode === 'blue') {
        for (let k = 0; k < w * h; k++) if (px[k * 4 + 2] - px[k * 4] > 50 && lum(k) > 110) sky[k] = 1;
      }
      // Alpha with a one-pixel feather on the airframe edge.
      for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
          const k = j * w + i;
          if (sky[k]) {
            px[k * 4 + 3] = 0;
          } else {
            let s = 0;
            if (i > 0 && sky[k - 1]) s++;
            if (i < w - 1 && sky[k + 1]) s++;
            if (j > 0 && sky[k - w]) s++;
            if (j < h - 1 && sky[k + w]) s++;
            if (s >= 2) px[k * 4 + 3] = 150;
          }
        }
      }
      x.putImageData(d, 0, 0);
      const bg = document.createElement('canvas');
      bg.width = w;
      bg.height = h;
      bg.getContext('2d').drawImage(img, 0, 0);
      return { plane: c.toDataURL('image/png'), photo: bg.toDataURL('image/png'), w, h };
    },
    { uri, trimRight, tolerance, mode }
  );
}

// spec: { source, trimRight, width, height, offsetY, top: {text,color}, bottom: {text,color}, caption }
async function makePoster(page, spec, outFile) {
  const cut = await cutout(page, spec.source, { trimRight: spec.trimRight || 0 });
  const W = spec.width;
  const H = spec.height;
  const scale = W / cut.w;
  const imgH = Math.round(cut.h * scale);
  const layer = (src, z) =>
    `<img src="${src}" style="position:absolute;left:0;top:${-spec.offsetY}px;width:${W}px;height:${imgH}px;z-index:${z}">`;
  const word = (t, z) =>
    `<div class="fit" data-pad="${t.pad || 24}" style="position:absolute;left:0;right:0;${t.top != null ? `top:${t.top}px` : `bottom:${t.bottom}px`};z-index:${z};text-align:center;font-family:'Big Shoulders Display';font-weight:900;color:${t.color};line-height:0.8;letter-spacing:${t.tracking || '-0.01em'};white-space:nowrap"><span>${t.text}</span></div>`;
  const caption = spec.caption
    ? `<div style="position:absolute;left:24px;right:24px;bottom:${spec.caption.bottom}px;z-index:5;display:flex;justify-content:space-between;font-family:Geist;font-weight:600;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${spec.caption.color}"><span>${spec.caption.left}</span><span>${spec.caption.right}</span></div>`
    : '';

  await page.setViewportSize({ width: W + 40, height: H + 40 });
  await page.setContent(`<!doctype html><html><head>${FONT_LINK}<style>body{margin:0}</style></head><body>
<div id="poster" style="position:relative;width:${W}px;height:${H}px;overflow:hidden;background:#8FA6BB">
${layer(cut.photo, 1)}
${word(spec.top, 2)}
${word(spec.bottom, 2)}
${layer(cut.plane, 3)}
${caption}
</div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');
  // Size each word to fill the width, less its padding.
  await page.evaluate((W) => {
    for (const el of document.querySelectorAll('.fit')) {
      const target = W - 2 * Number(el.dataset.pad);
      const span = el.firstElementChild;
      el.style.fontSize = '100px';
      el.style.fontSize = (100 * target) / span.getBoundingClientRect().width + 'px';
    }
  }, W);
  await page.locator('#poster').screenshot({ path: outFile, type: 'jpeg', quality: 84 });
  return { w: W, h: H };
}

module.exports = { makePoster, cutout, FONT_LINK };
