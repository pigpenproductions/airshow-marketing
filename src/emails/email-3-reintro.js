// Email 3: HIA27 reintroduction. Bold template. SENT Monday 12 October 2026, about 13:30,
// single subject (2026 was the warm-up.), no A/B test.
// The Christmas angle lives in Email 4 (December).
// Photography: James Hill, HIA 2026 (Dropbox: HIA 26 Photos and Videos/Photos from show/James Hill).

const path = require('path');
const photo = (f) => path.join(__dirname, '..', '..', 'assets', 'photos', f);

module.exports = {
  slug: 'email-3-reintro',
  template: 'bold',
  subject: '2026 was the warm-up.',
  campaign: 'hia27_reintro',
  preheader: 'Bigger show. New theme. Headline acts in the new year. Tickets on sale now.',
  // A/B subject: 'Headcorn 2027. Tickets on sale now.'
  // No price comparisons or price deadlines in this email.
  credits: 'Photography: James Hill, Headcorn International Airshow 2026.',

  // Artboards: photo + type, rendered to JPEG by scripts/assets.js.
  art: [
    {
      key: 'art_hero',
      photo: photo('spitfire-spirit-of-kent-close.jpg'),
      width: 600,
      height: 780,
      position: '64% 50%',
      shade: 'linear-gradient(180deg,rgba(5,7,15,.70) 0%,rgba(5,7,15,0) 26%,rgba(5,7,15,0) 52%,rgba(5,7,15,.92) 100%)',
      layers: `<div class="s" style="position:absolute;left:24px;top:22px">Headcorn International Airshow</div>
        <div class="s" style="position:absolute;right:24px;top:22px">25-27 June 2027</div>
        <div style="position:absolute;left:22px;bottom:30px">
          <div class="d fit" data-w="556">2026 was</div><br>
          <div class="d fit" data-w="556" style="color:#E3141B;margin-top:6px">the warm-up.</div>
        </div>`,
      alt: '2026 was the warm-up. Headcorn International Airshow, 25-27 June 2027.',
    },
    {
      key: 'art_theme',
      photo: photo('headcorn-busy-day-aerial.jpg'),
      width: 600,
      height: 600,
      position: '45% 40%',
      shade: 'linear-gradient(0deg,rgba(5,7,15,.95) 0%,rgba(5,7,15,.6) 40%,rgba(5,7,15,0) 66%)',
      layers: `<div style="position:absolute;left:24px;right:24px;bottom:30px">
          <div class="d" style="font-size:64px;margin-bottom:18px">What's next</div>
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px"><div class="s" style="width:140px">The theme</div><div class="s" style="flex:1;background:#D40F0F;height:46px;display:flex;align-items:center;justify-content:flex-end;padding:0 14px">Classified</div></div>
          <div style="display:flex;align-items:center;gap:14px"><div class="s" style="width:140px">Headline acts</div><div class="s" style="flex:1;background:#D40F0F;height:46px;display:flex;align-items:center;justify-content:flex-end;padding:0 14px">New year</div></div>
        </div>`,
      alt: "What's next. The theme: classified. Headline acts: announced in the new year. Headcorn from the air on a busy day.",
    },
    {
      key: 'art_flying',
      photo: photo('spitfire-flypast.jpg'),
      width: 600,
      height: 640,
      cutout: { mode: 'blue' },
      sky: 'linear-gradient(170deg,#6FA8DC 0%,#80B3E3 45%,#8AAED6 100%)',
      planeStyle: 'width:700px;left:-30px;top:196px;transform:rotate(-5deg)',
      layers: `<div style="position:absolute;left:22px;top:26px">
          <div class="d fit" data-w="556">2027 goes</div><br>
          <div class="d fit" data-w="556" style="color:#D40F0F;margin-top:4px">bigger.</div>
        </div>`,
      alt: '2027 goes bigger. Spitfire Spirit of Kent in flight.',
    },
  ],

  blocks: [
    { type: 'art', key: 'art_hero', link: 'tickets', utmContent: 'hero' },
    {
      type: 'copy',
      key: 'intro',
      eyebrow: '25-27 June 2027 / Headcorn Aerodrome, Kent',
      title: 'Bigger show. Bigger ambitions.',
      paragraphs: [
        'Futures &amp; Arrivals Day on Friday 25 June. Then the full show on Saturday 26 and Sunday 27.',
        'Tickets are on sale now, from £30 for an adult day.',
      ],
      cta: { label: 'Get tickets', link: 'tickets', utmContent: 'intro_cta' },
    },
    { type: 'art', key: 'art_theme', link: 'tickets', utmContent: 'theme' },
    {
      type: 'typewall',
      eyebrow: 'Last June. One field in Kent.',
      lines: [
        { text: '4 Hurricanes.' },
        { text: '30+ aircraft.' },
        { text: '18 operators.' },
        { text: '20+ WWII veterans.' },
      ],
      after: 'Operators from four countries. An RAF Chinook for Armed Forces Day.',
    },
    { type: 'art', key: 'art_flying', link: 'tickets', utmContent: 'flying' },
    {
      type: 'band',
      eyebrow: 'Headcorn 2027',
      title: 'Tickets on sale now.',
      paragraphs: ['From £30 for an adult day. Every ticket is an <span style="white-space:nowrap;">e-ticket</span>.'],
      label: 'Get tickets',
      link: 'tickets',
      utmContent: 'band',
    },
    { type: 'signoff', lines: ['See you in June.'] },
  ],
};
