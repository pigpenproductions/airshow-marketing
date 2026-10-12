// Email 3: HIA27 reintroduction and Christmas gift push. Send once gift cards
// are on sale (late November). Bolder layout: cover poster, classified panel,
// 2026 numbers, red Christmas band.

const path = require('path');

module.exports = {
  slug: 'email-3-reintro-xmas',
  subject: 'Headcorn is back. Bigger.',
  campaign: 'hia27_reintro_xmas',
  preheader: 'A new theme. Bigger acts in the new year. 2026 prices until 31 January.',

  poster: {
    key: 'poster-reintro',
    // [CONFIRM] rights and photographer for this photo, and get the original
    // full-resolution file. This one is a 592px screenshot.
    source: path.join(__dirname, '..', '..', 'assets', 'source', 'hurricane-overhead.png'),
    trimRight: 16, // crops the Instagram carousel dot off the right edge
    width: 600,
    height: 770,
    offsetY: 0,
    top: { text: 'BIGGER', color: '#0A1543', top: 22, pad: 18 },
    bottom: { text: '2027', color: '#D40F0F', bottom: -6, pad: 14 },
    alt: 'Bigger. 2027. A Hawker Hurricane overhead.',
    credit: 'Photo: PHOTO_CREDIT',
  },

  blocks: [
    { type: 'poster' },
    { type: 'flag', text: '25-27 JUNE 2027, HEADCORN, KENT' },
    { type: 'headline', text: 'Headcorn is back.' },
    {
      type: 'intro',
      paragraphs: [
        'Headcorn 2027 is a bigger show with bigger ambitions. Futures &amp; Arrivals Day on Friday 25 June, then the full show on Saturday 26 and Sunday 27.',
      ],
    },
    {
      type: 'dossier',
      eyebrow: 'What we can tell you',
      title: 'Not much. Yet.',
      rows: [
        { label: 'The theme', bar: 'TO BE ANNOUNCED' },
        { label: 'Big acts', bar: 'IN THE NEW YEAR' },
      ],
      body: 'Both land in your inbox first chance we get.',
    },
    {
      type: 'stats',
      eyebrow: 'Last June, for scale',
      figure: '4',
      lead: 'Hurricanes in one field.',
      rows: [
        { n: '30+', label: 'aircraft from 18 operators across four countries' },
        { n: '20+', label: 'WWII veterans' },
        { n: '1', label: 'RAF Chinook for Armed Forces Day' },
      ],
      kicker: '2027 has to beat that. It will.',
    },
    {
      type: 'band',
      eyebrow: 'Christmas',
      title: 'Put June under the tree.',
      paragraphs: [
        'Gift cards are on sale now. Tickets are still at 2026 prices until 23:59 on Sunday 31 January, from £30 for an adult day.',
      ],
      label: 'Buy a gift card',
      link: 'gift',
      utmContent: 'band_gift',
      secondary: { label: 'Or get tickets for yourself', link: 'tickets', utmContent: 'band_tickets' },
    },
    {
      type: 'signoff',
      lines: ['See you in June.'],
      name: 'Alex',
      title: 'Alex Yates, Headcorn International Airshow',
    },
  ],
};
