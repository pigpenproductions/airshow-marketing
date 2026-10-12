// HIA27 email template. Hand-coded tables, inline styles, MSO fallbacks.
// render(email, ctx) returns un-inlined HTML; scripts/build.js runs juice over it.

const C = {
  red: '#D40F0F',
  navy: '#0A1543',
  muted: '#4B5470',
  rule: '#DDE1E8',
  outer: '#E8EBF0',
  body: '#FBFBFC',
  tray: '#EEF0F4',
  white: '#FFFFFF',
};

const FD = "'Big Shoulders Display', Impact, 'Arial Narrow Bold', sans-serif";
const FB = "Geist, 'Helvetica Neue', Arial, sans-serif";
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Geist:wght@400;500;600&display=swap';

const W = 600; // container
const P = 24; // side padding
const INNER = W - P * 2; // 552

const T = 'role="presentation" cellpadding="0" cellspacing="0" border="0"';

// Pads the hidden preheader so body copy doesn't leak into the inbox preview.
const PREHEADER_PAD = '&#847;&zwnj;&nbsp;'.repeat(110);

function utm(base, campaign, content) {
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}utm_source=mailchimp&utm_medium=email&utm_campaign=${campaign}&utm_content=${content}`;
}

// Replaces {{tickets:content}} tokens in copy with tracked links.
function linkify(html, ctx) {
  return html.replace(/\{\{(\w+):(\w+)\}\}/g, (_, key, content) => utm(ctx.links[key], ctx.campaign, content));
}

function row(inner, { pad = `0 ${P}px`, cls = 'px' } = {}) {
  return `<tr><td class="${cls}" style="padding:${pad};">${inner}</td></tr>`;
}

// ---------- blocks ----------

function flag(b) {
  return row(
    `<table ${T}><tr><td class="flag" bgcolor="${C.red}" style="background-color:${C.red};padding:8px 12px 7px 12px;font-family:${FD};font-weight:800;font-size:16px;line-height:16px;letter-spacing:0.06em;color:${C.white};mso-line-height-rule:exactly;">${b.text}</td></tr></table>`,
    { pad: `28px ${P}px 0 ${P}px` }
  );
}

function headline(b) {
  return row(
    `<div mc:edit="headline"><h1 class="h1 t-navy" style="margin:0;font-family:${FD};font-weight:900;font-size:66px;line-height:62px;letter-spacing:-0.005em;color:${C.navy};mso-line-height-rule:exactly;">${b.text}</h1></div>`,
    { pad: `18px ${P}px 0 ${P}px` }
  );
}

function intro(b) {
  const ps = b.paragraphs
    .map((p) => `<p class="t-navy" style="margin:0 0 14px 0;font-family:${FB};font-size:17px;line-height:26px;color:${C.navy};">${p}</p>`)
    .join('');
  const hi = `<p class="t-navy" style="margin:0 0 14px 0;font-family:${FB};font-size:17px;line-height:26px;font-weight:600;color:${C.navy};">*|IF:FNAME|*Hi *|FNAME|*.*|ELSE:|*Hi there.*|END:IF|*</p>`;
  return row(`<div mc:edit="intro">${b.greeting === false ? '' : hi}${ps}</div>`, { pad: `22px ${P}px 10px ${P}px` });
}

function hero(b, ctx) {
  const h = ctx.hero;
  // Card border 1px + 15px gutter + 1px tray border + 7px padding leaves the image at exactly 552px.
  return row(
    `<div mc:edit="hero">
<table ${T} width="100%" style="width:100%;border-collapse:separate;"><tr><td class="tray b-rule" bgcolor="${C.tray}" style="background-color:${C.tray};border:1px solid ${C.rule};border-radius:18px;padding:7px;">
<table ${T} width="100%" style="width:100%;border-collapse:separate;"><tr><td bgcolor="${C.navy}" style="background-color:${C.navy};border-radius:12px;">
<img src="${h.src}" width="${h.w}" height="${h.h}" alt="${h.alt}" style="display:block;width:100%;max-width:${h.w}px;height:auto;border:0;outline:none;text-decoration:none;border-radius:12px;font-family:${FB};font-size:15px;line-height:22px;color:${C.white};-ms-interpolation-mode:bicubic;" />
</td></tr></table>
</td></tr></table>
<p class="t-muted credit" style="margin:0;padding:8px 9px 0 9px;font-family:${FB};font-size:11px;line-height:16px;color:${C.muted};">${h.credit}</p>
</div>`,
    { pad: `14px 15px 0 15px`, cls: 'px-hero' }
  );
}

function eyebrow(text) {
  return `<p class="t-muted" style="margin:0 0 12px 0;font-family:${FB};font-size:13px;line-height:18px;font-weight:600;color:${C.muted};">${text}</p>`;
}

function ladderCell({ label, price }, { now }) {
  const top = now ? C.red : C.rule;
  const labelColor = now ? C.navy : C.muted;
  const priceStyle = now
    ? `font-family:${FD};font-weight:900;font-size:92px;line-height:84px;color:${C.red};`
    : `font-family:${FD};font-weight:800;font-size:36px;line-height:38px;color:${C.muted};`;
  return `<td class="${now ? 'lad-top-red' : 'lad-top b-rule'}" valign="top" style="border-top:3px solid ${top};padding:10px 0 0 0;">
<p class="${now ? 't-navy' : 't-muted'}" style="margin:0;font-family:${FB};font-size:13px;line-height:18px;font-weight:600;color:${labelColor};">${label}</p>
<p class="${now ? 't-red lad-now' : 't-muted lad-step'}" style="margin:${now ? 8 : 10}px 0 0 0;${priceStyle}mso-line-height-rule:exactly;">${price}</p>
</td>`;
}

function ladder(b) {
  let inner;
  if (b.steps && b.steps.length === 2) {
    // 2fr / 1fr / 1fr. The two step columns sit in their own table so they stay
    // side by side when the ladder stacks on narrow screens.
    inner = `<table ${T} width="100%" style="width:100%;"><tr>
<td class="lad-a" width="47%" valign="top" style="width:47%;"><table ${T} width="100%" style="width:100%;"><tr>${ladderCell(b.now, { now: true })}</tr></table></td>
<td class="lad-gap" width="3%" style="width:3%;font-size:0;line-height:0;">&nbsp;</td>
<td class="lad-b" width="50%" valign="top" style="width:50%;"><table ${T} width="100%" style="width:100%;"><tr>
<td width="47%" valign="top" style="width:47%;"><table ${T} width="100%" style="width:100%;"><tr>${ladderCell(b.steps[0], {})}</tr></table></td>
<td width="6%" style="width:6%;font-size:0;line-height:0;">&nbsp;</td>
<td width="47%" valign="top" style="width:47%;"><table ${T} width="100%" style="width:100%;"><tr>${ladderCell(b.steps[1], {})}</tr></table></td>
</tr></table></td>
</tr></table>`;
  } else {
    inner = `<table ${T} width="100%" style="width:100%;"><tr>${ladderCell(b.now, { now: true })}</tr></table>
<p class="t-navy" style="margin:14px 0 0 0;font-family:${FB};font-size:15px;line-height:22px;color:${C.navy};">${b.fallback}</p>`;
  }
  return row(`<div mc:edit="price_ladder">${eyebrow(b.title)}${inner}</div>`, { pad: `34px ${P}px 0 ${P}px` });
}

function priceList(b) {
  const rows = b.rows
    .map((r, i) => {
      const top = i === 0 ? `border-top:1px solid ${C.rule};` : '';
      const note = r.note ? ` <span class="t-muted" style="color:${C.muted};font-weight:400;">${r.note}</span>` : '';
      return `<tr>
<td class="b-rule t-navy" valign="top" style="${top}border-bottom:1px solid ${C.rule};padding:12px 12px 12px 0;font-family:${FB};font-size:15px;line-height:22px;font-weight:500;color:${C.navy};">${r.label}${note}</td>
<td class="b-rule t-navy num" align="right" valign="top" style="${top}border-bottom:1px solid ${C.rule};padding:12px 0;font-family:${FB};font-size:15px;line-height:22px;font-weight:600;color:${C.navy};text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums;font-feature-settings:'tnum';">${r.price}</td>
</tr>`;
    })
    .join('');
  return row(
    `<div mc:edit="price_list">${eyebrow(b.title)}<table ${T} width="100%" style="width:100%;">${rows}</table></div>`,
    { pad: `34px ${P}px 0 ${P}px` }
  );
}

function button(label, href, { bg = C.red, fg = C.white, cls = 'btn' } = {}) {
  const width = 64 + label.length * 9 + 56;
  return `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:52px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}">
<w:anchorlock/>
<center style="color:${fg};font-family:Arial,sans-serif;font-size:17px;font-weight:bold;">${label}&nbsp;&nbsp;&#8594;</center>
</v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a class="${cls}" href="${href}" target="_blank" style="display:inline-block;background-color:${bg};border-radius:999px;padding:7px 7px 7px 26px;font-family:${FB};font-size:17px;line-height:38px;font-weight:600;color:${fg};text-decoration:none;white-space:nowrap;-webkit-text-size-adjust:none;">${label}<span style="display:inline-block;width:38px;height:38px;margin-left:16px;border-radius:999px;background-color:${fg};color:${bg};font-size:18px;line-height:38px;text-align:center;vertical-align:top;">&#8594;</span></a><!--<![endif]-->`;
}

function cta(b, ctx) {
  const href = utm(ctx.links.tickets, ctx.campaign, b.utmContent);
  const aside = b.aside
    ? `<td class="cta-aside t-muted" valign="middle" style="padding:0 0 0 20px;font-family:${FB};font-size:14px;line-height:20px;color:${C.muted};">${b.aside}</td>`
    : '';
  return row(
    `<table ${T} width="100%" style="width:100%;"><tr><td class="cta-btn" valign="middle" style="white-space:nowrap;">${button(b.label, href)}</td>${aside}</tr></table>`,
    { pad: `30px ${P}px 0 ${P}px` }
  );
}

function proof(b) {
  return row(
    `<div mc:edit="proof"><table ${T} width="100%" style="width:100%;"><tr>
<td class="b-rule" colspan="2" style="border-top:1px solid ${C.rule};padding:0;font-size:0;line-height:0;height:28px;">&nbsp;</td></tr><tr>
<td class="proof-fig t-red" valign="top" style="padding:0 22px 0 0;font-family:${FD};font-weight:900;font-size:${b.figureSize || 150}px;line-height:${Math.round((b.figureSize || 150) * 0.82)}px;color:${C.red};white-space:nowrap;mso-line-height-rule:exactly;">${b.figure}</td>
<td class="proof-txt" valign="top" style="padding:6px 0 0 0;">
<p class="t-navy" style="margin:0 0 10px 0;font-family:${FD};font-weight:800;font-size:30px;line-height:30px;color:${C.navy};mso-line-height-rule:exactly;">${b.lead}</p>
<p class="t-muted" style="margin:0;font-family:${FB};font-size:15px;line-height:23px;color:${C.muted};">${b.body}</p>
</td></tr></table></div>`,
    { pad: `40px ${P}px 0 ${P}px` }
  );
}

function closing(b, ctx) {
  return row(
    `<p class="t-navy closing" style="margin:0;font-family:${FB};font-size:17px;line-height:26px;font-weight:500;color:${C.navy};">${linkify(b.text, ctx)}</p>`,
    { pad: `34px ${P}px 0 ${P}px` }
  );
}

// Full-bleed cover image, edge to edge inside the card.
function poster(b, ctx) {
  const p = ctx.poster;
  return `<tr><td style="padding:24px 0 0 0;"><div mc:edit="hero">
<table ${T} width="100%" style="width:100%;"><tr><td bgcolor="#8FA6BB" style="background-color:#8FA6BB;">
<img src="${p.src}" width="${p.w}" height="${p.h}" alt="${p.alt}" style="display:block;width:100%;max-width:${p.w}px;height:auto;border:0;outline:none;text-decoration:none;font-family:${FD};font-weight:900;font-size:44px;line-height:46px;color:${C.navy};-ms-interpolation-mode:bicubic;" />
</td></tr></table>
<p class="t-muted credit" style="margin:0;padding:8px ${P}px 0 ${P}px;font-family:${FB};font-size:11px;line-height:16px;color:${C.muted};">${p.credit}</p>
</div></td></tr>`;
}

// Navy "classified" panel: label left, red redaction bar right.
function dossier(b) {
  const rows = b.rows
    .map(
      (r) => `<tr>
<td class="dos-label" valign="middle" width="34%" style="width:34%;padding:0 12px 12px 0;font-family:${FB};font-size:13px;line-height:18px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#C9CEDD;">${r.label}</td>
<td valign="middle" style="padding:0 0 12px 0;"><table ${T} width="100%" style="width:100%;"><tr><td class="flag" bgcolor="${C.red}" height="44" style="background-color:${C.red};height:44px;padding:0 14px;font-family:${FD};font-weight:800;font-size:15px;line-height:44px;letter-spacing:0.12em;color:${C.white};text-align:right;mso-line-height-rule:exactly;">${r.bar}</td></tr></table></td>
</tr>`
    )
    .join('');
  return row(
    `<div mc:edit="dossier"><table ${T} width="100%" style="width:100%;"><tr><td class="panel" bgcolor="${C.navy}" style="background-color:${C.navy};border-radius:16px;padding:26px 24px 16px 24px;">
<p style="margin:0 0 6px 0;font-family:${FB};font-size:13px;line-height:18px;font-weight:600;color:#C9CEDD;">${b.eyebrow}</p>
<p class="dos-h" style="margin:0 0 20px 0;font-family:${FD};font-weight:900;font-size:40px;line-height:40px;color:${C.white};mso-line-height-rule:exactly;">${b.title}</p>
<table ${T} width="100%" style="width:100%;">${rows}</table>
<p style="margin:6px 0 10px 0;font-family:${FB};font-size:15px;line-height:22px;color:#C9CEDD;">${b.body}</p>
</td></tr></table></div>`,
    { pad: `34px ${P}px 0 ${P}px` }
  );
}

// One giant figure, then a ruled list of supporting figures.
function stats(b) {
  const rows = b.rows
    .map(
      (r) => `<tr>
<td class="b-rule t-navy stat-n" valign="baseline" width="96" style="width:96px;border-bottom:1px solid ${C.rule};padding:10px 12px 8px 0;font-family:${FD};font-weight:900;font-size:36px;line-height:38px;color:${C.navy};white-space:nowrap;mso-line-height-rule:exactly;">${r.n}</td>
<td class="b-rule t-muted" valign="baseline" style="border-bottom:1px solid ${C.rule};padding:10px 0 8px 0;font-family:${FB};font-size:15px;line-height:22px;color:${C.muted};">${r.label}</td>
</tr>`
    )
    .join('');
  return row(
    `<div mc:edit="proof">${eyebrow(b.eyebrow)}<table ${T} width="100%" style="width:100%;"><tr>
<td class="proof-fig t-red" valign="top" style="padding:0 22px 0 0;font-family:${FD};font-weight:900;font-size:${b.figureSize || 170}px;line-height:${Math.round((b.figureSize || 170) * 0.82)}px;color:${C.red};white-space:nowrap;mso-line-height-rule:exactly;">${b.figure}</td>
<td class="proof-txt" valign="bottom" style="padding:0 0 8px 0;">
<p class="t-navy" style="margin:0;font-family:${FD};font-weight:800;font-size:34px;line-height:34px;color:${C.navy};mso-line-height-rule:exactly;">${b.lead}</p>
</td></tr></table>
<table ${T} width="100%" style="width:100%;margin-top:14px;"><tr><td class="b-rule" colspan="2" style="border-top:1px solid ${C.rule};font-size:0;line-height:0;">&nbsp;</td></tr>${rows}</table>
${b.kicker ? `<p class="t-navy" style="margin:18px 0 0 0;font-family:${FB};font-size:17px;line-height:26px;font-weight:600;color:${C.navy};">${b.kicker}</p>` : ''}
</div>`,
    { pad: `40px ${P}px 0 ${P}px` }
  );
}

// Full-width red band with its own white button.
function band(b, ctx) {
  const href = utm(ctx.links[b.link || 'tickets'], ctx.campaign, b.utmContent);
  const second = b.secondary
    ? `<p style="margin:16px 0 0 0;font-family:${FB};font-size:15px;line-height:22px;color:${C.white};"><a href="${utm(ctx.links[b.secondary.link], ctx.campaign, b.secondary.utmContent)}" target="_blank" style="color:${C.white};font-weight:600;text-decoration:underline;">${b.secondary.label}</a></p>`
    : '';
  return `<tr><td style="padding:44px 0 0 0;"><div mc:edit="band"><table ${T} width="100%" style="width:100%;"><tr><td class="band px" bgcolor="${C.red}" style="background-color:${C.red};padding:38px ${P}px 40px ${P}px;">
<p style="margin:0 0 10px 0;font-family:${FB};font-size:13px;line-height:18px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${C.white};">${b.eyebrow}</p>
<p class="band-h" style="margin:0 0 16px 0;font-family:${FD};font-weight:900;font-size:62px;line-height:58px;color:${C.white};mso-line-height-rule:exactly;">${b.title}</p>
${b.paragraphs.map((p) => `<p style="margin:0 0 14px 0;font-family:${FB};font-size:17px;line-height:26px;color:${C.white};">${p}</p>`).join('')}
<div style="padding-top:10px;">${button(b.label, href, { bg: C.white, fg: C.red, cls: 'btn-inv' })}</div>
${second}
</td></tr></table></div></td></tr>`;
}

function signoff(b) {
  return row(
    `<div mc:edit="signoff">${b.lines.map((l) => `<p class="t-navy" style="margin:0 0 14px 0;font-family:${FB};font-size:17px;line-height:26px;color:${C.navy};">${l}</p>`).join('')}
<p class="t-red" style="margin:6px 0 2px 0;font-family:${FD};font-weight:900;font-size:34px;line-height:34px;color:${C.red};mso-line-height-rule:exactly;">${b.name}</p>
<p class="t-muted" style="margin:0;font-family:${FB};font-size:13px;line-height:18px;color:${C.muted};">${b.title}</p></div>`,
    { pad: `36px ${P}px 0 ${P}px` }
  );
}

const BLOCKS = { flag, headline, intro, hero, poster, ladder, priceList, cta, proof, stats, dossier, band, closing, signoff };

// ---------- frame ----------

function topline(email) {
  return `<table ${T} width="100%" style="width:100%;"><tr>
<td class="t-muted px-top" valign="top" style="padding:16px 0 12px ${P}px;font-family:${FB};font-size:12px;line-height:17px;color:${C.muted};">${email.preheader}</td>
<td class="px-top-r" align="right" valign="top" style="padding:16px ${P}px 12px 16px;font-family:${FB};font-size:12px;line-height:17px;white-space:nowrap;text-align:right;"><a class="t-navy" href="*|ARCHIVE|*" target="_blank" style="color:${C.navy};text-decoration:underline;">View in browser</a></td>
</tr></table>`;
}

function header(ctx) {
  const l = ctx.logo;
  // The logo PNG carries its own light plate (8px each side), so 16px cell
  // padding lines the wordmark up with the 24px text column.
  return `<tr><td class="px-head" style="padding:20px ${P}px 0 16px;">
<table ${T} width="100%" style="width:100%;"><tr>
<td valign="middle" width="${l.w}" style="width:${l.w}px;"><a href="${utm(ctx.links.website, ctx.campaign, 'logo')}" target="_blank" style="text-decoration:none;"><img class="logo" src="${l.src}" width="${l.w}" height="${l.h}" alt="Headcorn International Airshow" style="display:block;width:${l.w}px;height:auto;border:0;outline:none;text-decoration:none;font-family:${FD};font-weight:900;font-size:22px;line-height:24px;color:${C.red};" /></a></td>
<td valign="middle" align="right" style="text-align:right;padding-left:12px;">
<p class="t-navy head-date" style="margin:0;font-family:${FD};font-weight:800;font-size:26px;line-height:28px;color:${C.navy};white-space:nowrap;mso-line-height-rule:exactly;">26-27 June 2027</p>
<p class="t-muted" style="margin:2px 0 0 0;font-family:${FB};font-size:13px;line-height:18px;color:${C.muted};">Headcorn Aerodrome, Kent</p>
</td></tr></table></td></tr>`;
}

function footer(ctx) {
  const link = (href, text) =>
    `<a class="t-navy" href="${href}" target="_blank" style="color:${C.navy};font-weight:600;text-decoration:none;">${text}</a>`;
  const small = (inner, extra = '') =>
    `<p class="t-muted" style="margin:0 0 8px 0;font-family:${FB};font-size:12px;line-height:18px;color:${C.muted};${extra}">${inner}</p>`;
  const sep = `<span class="t-muted" style="color:${C.rule};">&nbsp;&nbsp;/&nbsp;&nbsp;</span>`;
  return `<tr><td class="px" style="padding:44px ${P}px 36px ${P}px;">
<table ${T} width="100%" style="width:100%;"><tr><td class="b-rule" style="border-top:1px solid ${C.rule};padding:22px 0 0 0;">
<p style="margin:0 0 16px 0;font-family:${FB};font-size:14px;line-height:20px;">${link(utm(ctx.links.instagram, ctx.campaign, 'footer_instagram'), 'Instagram')}${sep}${link(utm(ctx.links.facebook, ctx.campaign, 'footer_facebook'), 'Facebook')}${sep}${link(utm(ctx.links.tiktok, ctx.campaign, 'footer_tiktok'), 'TikTok')}${sep}${link(utm(ctx.links.website, ctx.campaign, 'footer_website'), 'headcornairshow.com')}</p>
${small("You're receiving this because you subscribed or bought tickets from us.")}
${small('*|LIST:ADDRESSLINE|*')}
${small(`<a class="t-muted" href="*|UPDATE_PROFILE|*" style="color:${C.muted};text-decoration:underline;">Update preferences</a>&nbsp;&nbsp;&nbsp;<a class="t-muted" href="*|UNSUB|*" style="color:${C.muted};text-decoration:underline;">Unsubscribe</a>`, 'margin-bottom:16px;')}
*|IF:REWARDS|*<div class="t-muted" style="margin:0;font-family:${FB};font-size:12px;line-height:18px;color:${C.muted};">*|REWARDS|*</div>*|END:IF|*
</td></tr></table>
</td></tr>`;
}

const HEAD_STYLES = `
<style type="text/css">
  body, table, td, p, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; }
  .closing a { color:${C.red}; text-decoration:underline; text-underline-offset:3px; }
</style>
<style type="text/css" data-embed>
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  body { margin:0 !important; padding:0 !important; width:100% !important; }
  a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
  u + #body a { color:inherit; text-decoration:none; font-size:inherit; font-family:inherit; font-weight:inherit; line-height:inherit; }
  .btn:hover { background-color:#B80C0C !important; }
  .btn-inv:hover { background-color:#F1F2F5 !important; }

  @media only screen and (max-width:600px) {
    .wrap { width:100% !important; }
    .px { padding-left:20px !important; padding-right:20px !important; }
    .px-hero { padding-left:12px !important; padding-right:12px !important; }
    .px-head { padding-left:12px !important; padding-right:20px !important; }
    .px-top { padding-left:20px !important; }
    .px-top-r { padding-right:20px !important; }
    .credit { padding-left:8px !important; padding-right:8px !important; }
  }
  @media only screen and (max-width:480px) {
    .h1 { font-size:50px !important; line-height:48px !important; }
    .logo { width:124px !important; }
    .head-date { font-size:21px !important; line-height:24px !important; }
    .lad-a, .lad-b { display:block !important; width:100% !important; }
    .lad-gap { display:none !important; }
    .lad-a { padding-bottom:22px !important; }
    .lad-now { font-size:84px !important; line-height:76px !important; }
    .lad-step { font-size:32px !important; line-height:34px !important; }
    .cta-btn, .cta-aside { display:block !important; width:100% !important; }
    .cta-aside { padding:14px 0 0 0 !important; }
    .proof-fig { font-size:${'{{PROOF_MOBILE}}'}px !important; line-height:${'{{PROOF_MOBILE_LH}}'}px !important; padding-right:16px !important; }
    .proof-txt p:first-child { font-size:25px !important; line-height:26px !important; }
    .band-h { font-size:48px !important; line-height:46px !important; }
    .dos-h { font-size:32px !important; line-height:32px !important; }
    .dos-label { width:30% !important; font-size:11px !important; }
    .flag { font-size:13px !important; }
  }

  @media (prefers-color-scheme: dark) {
    .bg-outer { background-color:#060A1F !important; }
    .bg-body { background-color:#0E1532 !important; border-color:#222B52 !important; }
    .t-navy { color:#F2F3F7 !important; }
    .t-muted { color:#A9B0C7 !important; }
    .t-red { color:#FF4B45 !important; }
    .b-rule { border-color:#2A3460 !important; }
    .lad-top { border-top-color:#2A3460 !important; }
    .tray { background-color:#151D42 !important; border-color:#2A3460 !important; }
    .closing a { color:#FF4B45 !important; }
    .panel { background-color:#18214A !important; }
  }
</style>
<style type="text/css" data-embed>
  /* Outlook.com and Outlook apps: kept apart so a parser that rejects
     attribute selectors can't take the responsive rules down with it. */
  [data-ogsc] .t-navy { color:#F2F3F7 !important; }
  [data-ogsc] .t-muted { color:#A9B0C7 !important; }
  [data-ogsc] .t-red { color:#FF4B45 !important; }
  [data-ogsb] .bg-outer { background-color:#060A1F !important; }
  [data-ogsb] .bg-body { background-color:#0E1532 !important; }
  [data-ogsb] .tray { background-color:#151D42 !important; }
  [data-ogsb] .panel { background-color:#18214A !important; }
</style>`;

const MSO_HEAD = `<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style type="text/css">
  body, table, td, p, a, span, h1 { font-family:Arial, sans-serif !important; }
  .ff-d, .h1, .flag, .lad-now, .lad-step, .proof-fig, .head-date, .band-h, .dos-h, .stat-n { font-family:Impact, 'Arial Narrow', Arial, sans-serif !important; }
  .proof-txt p:first-child { font-family:Impact, 'Arial Narrow', Arial, sans-serif !important; }
</style>
<![endif]-->`;

function render(email, ctx) {
  ctx = { ...ctx, campaign: email.campaign };
  const proofBlock = email.blocks.find((b) => b.type === 'proof');
  const mobileFig = proofBlock ? Math.round((proofBlock.figureSize || 150) * 0.78) : 110;

  const body = email.blocks
    .map((b) => {
      const fn = BLOCKS[b.type];
      if (!fn) throw new Error(`Unknown block type: ${b.type}`);
      return fn(b, ctx);
    })
    .join('\n');

  const head = HEAD_STYLES.replace('{{PROOF_MOBILE}}', mobileFig).replace('{{PROOF_MOBILE_LH}}', Math.round(mobileFig * 0.82));

  return `<!DOCTYPE html>
<html lang="en-GB" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>*|MC:SUBJECT|*</title>
<!--[if !mso]><!--><link href="${FONTS_URL}" rel="stylesheet" type="text/css"><!--<![endif]-->
${MSO_HEAD}
${head}
</head>
<body id="body" class="bg-outer" style="margin:0;padding:0;width:100%;background-color:${C.outer};word-spacing:normal;">
<div style="display:none;font-size:1px;color:${C.outer};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${email.preheader}${PREHEADER_PAD}</div>
<div role="article" aria-roledescription="email" aria-label="${email.subject}" lang="en-GB">
<table ${T} width="100%" class="bg-outer" bgcolor="${C.outer}" style="width:100%;background-color:${C.outer};">
<tr><td align="center" style="padding:0 0 32px 0;">
<!--[if mso]><table ${T} width="${W}" align="center"><tr><td><![endif]-->
<table ${T} class="wrap" width="100%" style="width:100%;max-width:${W}px;margin:0 auto;">
<tr><td>${topline(email)}</td></tr>
<tr><td>
<table ${T} width="100%" class="bg-body" bgcolor="${C.body}" style="width:100%;background-color:${C.body};border:1px solid ${C.rule};">
${header(ctx)}
${body}
${footer(ctx)}
</table>
</td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</div>
</body>
</html>`;
}

module.exports = { render, utm, linkify, C, INNER };
