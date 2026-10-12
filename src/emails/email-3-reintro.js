// Email 3: HIA27 reintroduction. Bold template. Sent October 2026.
// The Christmas angle lives in Email 4 (December).
// Photography: James Hill, HIA 2026 (Dropbox: HIA 26 Photos and Videos/Photos from show/James Hill).

const path = require('path');
const photo = (f) => path.join(__dirname, '..', '..', 'assets', 'photos', f);

module.exports = {
  slug: 'email-3-reintro',
  template: 'bold',
  subject: '2026 was the warm-up.',
  campaign: 'hia27_reintro',
  preheader: 'Bigger show. New theme. Headline acts in the new year. Price held until 31 January.',
  // A/B subject: 'Headcorn 2027. Same price as 2026.'
  credits: 'Photography: James Hill, Headcorn International Airshow 2026. P-47 Thunderbolt: Paul Johnson, Flightline UK.',

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
      photo: photo('mustang-qi-close.jpg'),
      width: 600,
      height: 600,
      position: '30% 50%',
      shade: 'linear-gradient(0deg,rgba(5,7,15,.94) 0%,rgba(5,7,15,.55) 38%,rgba(5,7,15,0) 62%)',
      layers: `<div style="position:absolute;left:24px;right:24px;bottom:30px">
          <div class="d" style="font-size:64px;margin-bottom:18px">What's next</div>
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px"><div class="s" style="width:140px">The theme</div><div class="s" style="flex:1;background:#D40F0F;height:46px;display:flex;align-items:center;justify-content:flex-end;padding:0 14px">Classified</div></div>
          <div style="display:flex;align-items:center;gap:14px"><div class="s" style="width:140px">Headline acts</div><div class="s" style="flex:1;background:#D40F0F;height:46px;display:flex;align-items:center;justify-content:flex-end;padding:0 14px">New year</div></div>
        </div>`,
      alt: "What's next. The theme: classified. Headline acts: announced in the new year.",
    },
    {
      key: 'art_flying',
      photo: photo('thunderbolt-nellie-bank.jpg'),
      width: 600,
      height: 620,
      position: '62% 50%',
      zoom: 1.12,
      shade: 'linear-gradient(180deg,rgba(5,7,15,.35) 0%,rgba(5,7,15,0) 34%,rgba(5,7,15,0) 70%,rgba(5,7,15,.55) 100%)',
      layers: `<div style="position:absolute;left:22px;top:26px">
          <div class="d fit" data-w="380">2027 goes</div><br>
          <div class="d fit" data-w="380" style="color:#E3141B;margin-top:4px">bigger.</div>
        </div>
        <div class="s" style="position:absolute;left:24px;bottom:24px">P-47 Thunderbolt &lsquo;Nellie&rsquo;</div>`,
      alt: '2027 goes bigger. A P-47 Thunderbolt banking hard.',
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
        'Same price as 2026. Held until 23:59 on Sunday 31 January.',
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
      title: 'Same price as 2026. Held until 31 January.',
      paragraphs: ['From £30 for an adult day. Every ticket is an <span style="white-space:nowrap;">e-ticket</span>.'],
      label: 'Get tickets',
      link: 'tickets',
      utmContent: 'band',
    },
    { type: 'signoff', lines: ['See you in June.'] },
  ],
};
