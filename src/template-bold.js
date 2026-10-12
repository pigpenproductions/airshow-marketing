// "Bold" HIA27 template: dark canvas, full-bleed artboards, giant type.
// Same rules as src/template.js: tables, inline styles, VML button, mc:edit.
// Dark in every client by design, so it needs no dark-mode overrides.

const { utm, linkify } = require('./template');

const C = {
  bg: '#07090F',
  panel: '#0E1222',
  text: '#F4F5F8',
  muted: '#9AA3BD',
  rule: '#1E2438',
  red: '#D40F0F',
  white: '#FFFFFF',
};
const FD = "'Big Shoulders Display', Impact, 'Arial Narrow Bold', sans-serif";
const FB = "Geist, 'Helvetica Neue', Arial, sans-serif";
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Geist:wght@400;500;600&display=swap';
const W = 600;
const P = 24;
const T = 'role="presentation" cellpadding="0" cellspacing="0" border="0"';
const PREHEADER_PAD = '&#847;&zwnj;&nbsp;'.repeat(110);

const row = (inner, pad = `0 ${P}px`, cls = 'px') => `<tr><td class="${cls}" style="padding:${pad};">${inner}</td></tr>`;
const eyebrow = (text, color = C.red) =>
  `<p style="margin:0 0 14px 0;font-family:${FB};font-size:12px;line-height:16px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${color};">${text}</p>`;

function button(label, href, { bg = C.red, fg = C.white, cls = 'btn' } = {}) {
  const width = 64 + label.length * 9 + 56;
  return `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:54px;v-text-anchor:middle;width:${width}px;" arcsize="50%" stroke="f" fillcolor="${bg}">
<w:anchorlock/>
<center style="color:${fg};font-family:Arial,sans-serif;font-size:17px;font-weight:bold;">${label}&nbsp;&nbsp;&#8594;</center>
</v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a class="${cls}" href="${href}" target="_blank" style="display:inline-block;background-color:${bg};border-radius:999px;padding:8px 8px 8px 28px;font-family:${FB};font-size:17px;line-height:38px;font-weight:600;color:${fg};text-decoration:none;white-space:nowrap;-webkit-text-size-adjust:none;">${label}<span style="display:inline-block;width:38px;height:38px;margin-left:18px;border-radius:999px;background-color:${fg};color:${bg};font-size:18px;line-height:38px;text-align:center;vertical-align:top;">&#8594;</span></a><!--<![endif]-->`;
}

// ---------- blocks ----------

// Full-bleed artboard. Clickable when it has a link.
function art(b, ctx) {
  const a = ctx.art[b.key];
  const img = `<img src="${a.src}" width="${a.w}" height="${a.h}" alt="${a.alt}" style="display:block;width:100%;max-width:${a.w}px;height:auto;border:0;outline:none;text-decoration:none;font-family:${FD};font-weight:900;font-size:40px;line-height:44px;text-transform:uppercase;color:${C.text};-ms-interpolation-mode:bicubic;" />`;
  const linked = b.link ? `<a href="${utm(ctx.links[b.link], ctx.campaign, b.utmContent)}" target="_blank" style="display:block;text-decoration:none;">${img}</a>` : img;
  const credit = a.credit
    ? `<p style="margin:0;padding:8px ${P}px 0 ${P}px;font-family:${FB};font-size:10px;line-height:14px;letter-spacing:0.06em;color:${C.muted};">${a.credit}</p>`
    : '';
  return `<tr><td style="padding:${b.gap == null ? 0 : b.gap}px 0 0 0;"><div mc:edit="${b.key}"><table ${T} width="100%" style="width:100%;"><tr><td bgcolor="${C.panel}" style="background-color:${C.panel};">${linked}</td></tr></table>${credit}</div></td></tr>`;
}

function copy(b, ctx) {
  const title = `<p class="h2" style="margin:0 0 18px 0;font-family:${FD};font-weight:900;font-size:${b.size || 54}px;line-height:${Math.round((b.size || 54) * 0.92)}px;text-transform:uppercase;color:${C.text};mso-line-height-rule:exactly;">${b.title}</p>`;
  const ps = (b.paragraphs || [])
    .map((p) => `<p style="margin:0 0 14px 0;font-family:${FB};font-size:17px;line-height:27px;color:${C.muted};">${linkify(p, ctx)}</p>`)
    .join('');
  const cta = b.cta ? `<div style="padding-top:12px;">${button(b.cta.label, utm(ctx.links[b.cta.link || 'tickets'], ctx.campaign, b.cta.utmContent))}</div>` : '';
  const note = b.note ? `<p style="margin:16px 0 0 0;font-family:${FB};font-size:13px;line-height:19px;color:${C.muted};">${b.note}</p>` : '';
  const greet = b.greeting
    ? `<p style="margin:0 0 14px 0;font-family:${FB};font-size:17px;line-height:27px;font-weight:600;color:${C.text};">*|IF:FNAME|*Hi *|FNAME|*.*|ELSE:|*Hi there.*|END:IF|*</p>`
    : '';
  return row(`<div mc:edit="${b.key || 'copy'}">${b.eyebrow ? eyebrow(b.eyebrow) : ''}${title}${greet}${ps}${cta}${note}</div>`, `${b.top ?? 40}px ${P}px ${b.bottom ?? 44}px ${P}px`);
}

// Stacked giant lines of type: the numbers as a wall.
function typewall(b) {
  const lines = b.lines
    .map(
      (l) =>
        `<p class="wall" style="margin:0;font-family:${FD};font-weight:900;font-size:56px;line-height:54px;text-transform:uppercase;color:${l.red ? C.red : C.text};mso-line-height-rule:exactly;">${l.text}</p>`
    )
    .join('');
  const after = b.after ? `<p style="margin:22px 0 0 0;font-family:${FB};font-size:17px;line-height:27px;color:${C.muted};">${b.after}</p>` : '';
  return row(
    `<div mc:edit="proof"><table ${T} width="100%" style="width:100%;"><tr><td class="rule" style="border-top:1px solid ${C.rule};padding:36px 0 0 0;">${eyebrow(b.eyebrow)}${lines}${after}</td></tr></table></div>`,
    `8px ${P}px 48px ${P}px`
  );
}

function band(b, ctx) {
  const href = utm(ctx.links[b.link || 'tickets'], ctx.campaign, b.utmContent);
  const second = b.secondary
    ? `<p style="margin:18px 0 0 0;font-family:${FB};font-size:15px;line-height:22px;"><a href="${utm(ctx.links[b.secondary.link], ctx.campaign, b.secondary.utmContent)}" target="_blank" style="color:${C.white};font-weight:600;text-decoration:underline;">${b.secondary.label}</a></p>`
    : '';
  return `<tr><td><div mc:edit="band"><table ${T} width="100%" style="width:100%;"><tr><td class="px" bgcolor="${C.red}" style="background-color:${C.red};padding:36px ${P}px 40px ${P}px;">
${eyebrow(b.eyebrow, C.white)}
${b.title ? `<p class="h2" style="margin:0 0 16px 0;font-family:${FD};font-weight:900;font-size:46px;line-height:44px;text-transform:uppercase;color:${C.white};mso-line-height-rule:exactly;">${b.title}</p>` : ''}
${b.paragraphs.map((p) => `<p style="margin:0 0 14px 0;font-family:${FB};font-size:17px;line-height:27px;color:${C.white};">${p}</p>`).join('')}
<div style="padding-top:10px;">${button(b.label, href, { bg: C.white, fg: C.red, cls: 'btn-inv' })}</div>
${second}
</td></tr></table></div></td></tr>`;
}

function signoff(b) {
  return row(
    `<div mc:edit="signoff"><p style="margin:0 0 4px 0;font-family:${FB};font-size:17px;line-height:27px;color:${C.text};">${b.lines.join(' ')}</p>
<p style="margin:0;font-family:${FB};font-size:13px;line-height:19px;color:${C.muted};">${b.name}, ${b.title}</p></div>`,
    `40px ${P}px 0 ${P}px`
  );
}

const BLOCKS = { art, copy, typewall, band, signoff };

// ---------- frame ----------

function header(ctx) {
  const l = ctx.badge;
  return `<tr><td class="px" style="padding:18px ${P}px 18px ${P}px;"><table ${T} width="100%" style="width:100%;"><tr>
<td valign="middle" width="${l.w}" style="width:${l.w}px;"><a href="${utm(ctx.links.website, ctx.campaign, 'logo')}" target="_blank" style="text-decoration:none;"><img src="${l.src}" width="${l.w}" height="${l.h}" alt="Headcorn International Airshow" style="display:block;width:${l.w}px;height:auto;border:0;font-family:${FB};font-weight:600;font-size:10px;line-height:12px;color:${C.text};" /></a></td>
<td valign="middle" align="right" style="text-align:right;font-family:${FB};font-size:12px;line-height:17px;"><a href="*|ARCHIVE|*" target="_blank" style="color:${C.muted};text-decoration:underline;">View in browser</a></td>
</tr></table></td></tr>`;
}

function footer(ctx) {
  const link = (href, text) => `<a href="${href}" target="_blank" style="color:${C.text};font-weight:600;text-decoration:none;">${text}</a>`;
  const small = (inner, extra = '') => `<p style="margin:0 0 8px 0;font-family:${FB};font-size:12px;line-height:18px;color:${C.muted};${extra}">${inner}</p>`;
  const sep = `<span style="color:${C.rule};">&nbsp;&nbsp;/&nbsp;&nbsp;</span>`;
  return `<tr><td class="px" style="padding:44px ${P}px 40px ${P}px;"><table ${T} width="100%" style="width:100%;"><tr><td style="border-top:1px solid ${C.rule};padding:24px 0 0 0;">
<p style="margin:0 0 16px 0;font-family:${FB};font-size:14px;line-height:20px;">${link(utm(ctx.links.instagram, ctx.campaign, 'footer_instagram'), 'Instagram')}${sep}${link(utm(ctx.links.facebook, ctx.campaign, 'footer_facebook'), 'Facebook')}${sep}${link(utm(ctx.links.website, ctx.campaign, 'footer_website'), 'headcornairshow.com')}</p>
${ctx.credits ? small(ctx.credits) : ''}
${small("You're receiving this because you subscribed or bought tickets from us.")}
${small('*|LIST:ADDRESSLINE|*')}
${small(`<a href="*|UPDATE_PROFILE|*" style="color:${C.muted};text-decoration:underline;">Update preferences</a>&nbsp;&nbsp;&nbsp;<a href="*|UNSUB|*" style="color:${C.muted};text-decoration:underline;">Unsubscribe</a>`, 'margin-bottom:16px;')}
*|IF:REWARDS|*<div style="margin:0;font-family:${FB};font-size:12px;line-height:18px;color:${C.muted};">*|REWARDS|*</div>*|END:IF|*
</td></tr></table></td></tr>`;
}

const HEAD = `<style type="text/css">
  body, table, td, p, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse; }
  img { -ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; }
</style>
<style type="text/css" data-embed>
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  body { margin:0 !important; padding:0 !important; width:100% !important; background-color:${C.bg} !important; }
  a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
  u + #body a { color:inherit; text-decoration:none; font-size:inherit; font-family:inherit; font-weight:inherit; line-height:inherit; }
  .btn:hover { background-color:#B80C0C !important; }
  .btn-inv:hover { background-color:#F1F2F5 !important; }
  @media only screen and (max-width:600px) {
    .wrap { width:100% !important; }
    .px { padding-left:20px !important; padding-right:20px !important; }
  }
  @media only screen and (max-width:480px) {
    .h2 { font-size:40px !important; line-height:38px !important; }
    .wall { font-size:40px !important; line-height:40px !important; }
  }
</style>`;

const MSO_HEAD = `<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style type="text/css">
  body, table, td, p, a, span { font-family:Arial, sans-serif !important; }
  .h2, .wall { font-family:Impact, 'Arial Narrow', Arial, sans-serif !important; }
</style>
<![endif]-->`;

function render(email, ctx) {
  ctx = { ...ctx, campaign: email.campaign };
  const body = email.blocks
    .map((b) => {
      const fn = BLOCKS[b.type];
      if (!fn) throw new Error(`Unknown bold block type: ${b.type}`);
      return fn(b, ctx);
    })
    .join('\n');

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
${HEAD}
</head>
<body id="body" style="margin:0;padding:0;width:100%;background-color:${C.bg};word-spacing:normal;">
<div style="display:none;font-size:1px;color:${C.bg};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${email.preheader}${PREHEADER_PAD}</div>
<div role="article" aria-roledescription="email" aria-label="${email.subject}" lang="en-GB">
<table ${T} width="100%" bgcolor="${C.bg}" style="width:100%;background-color:${C.bg};">
<tr><td align="center">
<!--[if mso]><table ${T} width="${W}" align="center"><tr><td><![endif]-->
<table ${T} class="wrap" width="100%" bgcolor="${C.bg}" style="width:100%;max-width:${W}px;margin:0 auto;background-color:${C.bg};">
${header(ctx)}
${body}
${footer(ctx)}
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</div>
</body>
</html>`;
}

module.exports = { render };
