// Plain-text version, built from the same copy as the HTML.

const { utm, linkify } = require('./template');

const strip = (s) =>
  s
    .replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g, '$2 ($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ');

const BLOCKS = {
  flag: (b) => b.text,
  headline: (b) => b.text.toUpperCase(),
  intro: (b) => [b.greeting === false ? null : '*|IF:FNAME|*Hi *|FNAME|*.*|ELSE:|*Hi there.*|END:IF|*', ...b.paragraphs.map(strip)].filter(Boolean).join('\n\n'),
  hero: () => null,
  poster: () => null,
  art: () => null,
  copy: (b, ctx) =>
    [
      b.eyebrow ? b.eyebrow.toUpperCase() : null,
      b.title.toUpperCase(),
      b.greeting ? '*|IF:FNAME|*Hi *|FNAME|*.*|ELSE:|*Hi there.*|END:IF|*' : null,
      ...(b.paragraphs || []).map((p) => strip(linkify(p, ctx))),
      b.cta ? `${b.cta.label}: ${utm(ctx.links[b.cta.link || 'tickets'], ctx.campaign, b.cta.utmContent)}` : null,
      b.note || null,
    ]
      .filter(Boolean)
      .join('\n\n'),
  typewall: (b) => [b.eyebrow.toUpperCase(), ...b.lines.map((l) => l.text), b.after ? `\n${b.after}` : null].filter(Boolean).join('\n'),
  dossier: (b) => [b.title.toUpperCase(), ...b.rows.map((r) => `${r.label}: ${r.bar.toLowerCase()}`), b.body].join('\n'),
  stats: (b) => [b.eyebrow.toUpperCase(), `${b.figure} ${b.lead}`, ...b.rows.map((r) => `${r.n} ${r.label}`), b.kicker ? `\n${b.kicker}` : null].filter(Boolean).join('\n'),
  band: (b, ctx) =>
    [
      b.title ? b.title.toUpperCase() : b.eyebrow.toUpperCase(),
      ...b.paragraphs.map(strip),
      `${b.label}: ${utm(ctx.links[b.link || 'tickets'], ctx.campaign, b.utmContent)}`,
      b.secondary ? `${b.secondary.label}: ${utm(ctx.links[b.secondary.link], ctx.campaign, b.secondary.utmContent)}` : null,
    ]
      .filter(Boolean)
      .join('\n\n'),
  ladder: (b) => {
    const lines = [b.title.toUpperCase(), `${b.now.label}: ${b.now.price}`];
    if (b.steps && b.steps.length) b.steps.forEach((s) => lines.push(`${s.label}: ${s.price}`));
    else lines.push(b.fallback);
    return lines.join('\n');
  },
  priceList: (b) => [b.title.toUpperCase(), ...b.rows.map((r) => `${r.label}${r.note ? ' ' + r.note : ''}: ${r.price}`)].join('\n'),
  priceTable: (b) =>
    [
      b.title.toUpperCase(),
      ...b.groups.flatMap((g) => [`${g.name}`, ...g.rows.map((r) => `  ${r.label}: ${r.day} day, ${r.weekend} weekend`)]),
      b.note ? `\n${b.note}` : null,
    ]
      .filter(Boolean)
      .join('\n'),
  cta: (b, ctx) => [`${b.label}: ${utm(ctx.links.tickets, ctx.campaign, b.utmContent)}`, b.aside].filter(Boolean).join('\n\n'),
  proof: (b) => `${b.figure} ${b.lead}\n${b.body}`,
  closing: (b, ctx) => strip(linkify(b.text, ctx)),
  signoff: (b) => [...b.lines, b.name ? `\n${b.name}${b.title ? `, ${b.title}` : ''}` : null].filter(Boolean).join('\n'),
};

function renderText(email, ctx) {
  ctx = { ...ctx, campaign: email.campaign };
  const rule = '-'.repeat(40);
  const art = Object.fromEntries((email.art || []).map((a) => [a.key, a.alt]));
  BLOCKS.art = (b) => art[b.key] || null;
  const parts = [
    `${email.preheader}`,
    'View in browser: *|ARCHIVE|*',
    rule,
    'HEADCORN INTERNATIONAL AIRSHOW\n26-27 June 2027. Headcorn Aerodrome, Kent',
    rule,
    ...email.blocks.map((b) => BLOCKS[b.type](b, ctx)).filter(Boolean),
    rule,
    `Instagram: ${utm(ctx.links.instagram, ctx.campaign, 'footer_instagram')}`,
    `Facebook: ${utm(ctx.links.facebook, ctx.campaign, 'footer_facebook')}`,
    `TikTok: ${utm(ctx.links.tiktok, ctx.campaign, 'footer_tiktok')}`,
    `Website: ${utm(ctx.links.website, ctx.campaign, 'footer_website')}`,
    email.credits || null,
    "You're receiving this because you subscribed or bought tickets from us.",
    '*|LIST:ADDRESSLINE|*',
    'Update preferences: *|UPDATE_PROFILE|*\nUnsubscribe: *|UNSUB|*',
  ];
  return parts.filter(Boolean).join('\n\n') + '\n';
}

module.exports = { renderText };
