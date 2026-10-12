// Email 4: Christmas push. DRAFT for early to mid December 2026. Bold template.
// Tickets are e-tickets, so the angle is buying a ticket as a present.
// [CONFIRM] before sending: e-tickets can be forwarded or printed as a present.

const path = require('path');
const photo = (f) => path.join(__dirname, '..', '..', 'assets', 'photos', f);

module.exports = {
  slug: 'email-4-christmas',
  template: 'bold',
  subject: 'Put June under the tree.',
  campaign: 'hia27_christmas',
  preheader: 'A Headcorn 2027 e-ticket, from £30 at 2026 prices.',
  credits: 'Photography: James Hill, Headcorn International Airshow 2026.',

  art: [
    {
      key: 'art_xmas',
      photo: photo('spitfire-flypast.jpg'),
      width: 600,
      height: 660,
      cutout: { mode: 'blue' },
      sky: 'linear-gradient(170deg,#6FA8DC 0%,#80B3E3 45%,#8AAED6 100%)',
      planeStyle: 'width:660px;left:-36px;top:104px;transform:rotate(-4deg)',
      layers: `<div style="position:absolute;left:0;right:0;top:30px;text-align:center"><div class="d fit" data-w="556">Put June</div></div>
        <div style="position:absolute;left:0;right:0;bottom:30px;text-align:center"><div class="d fit" data-w="556" style="color:#D40F0F">under the tree.</div></div>`,
      alt: 'Put June under the tree. A Spitfire in flight at Headcorn.',
    },
  ],

  blocks: [
    { type: 'art', key: 'art_xmas', link: 'tickets', utmContent: 'xmas_art' },
    {
      type: 'band',
      eyebrow: 'Christmas',
      paragraphs: [
        'Every ticket is an <span style="white-space:nowrap;">e-ticket</span>. Buy one now, give it on Christmas Day.',
        'From £30 for an adult day, at 2026 prices until 31 January.',
      ],
      label: 'Get tickets',
      link: 'tickets',
      utmContent: 'band_xmas',
    },
    { type: 'signoff', lines: ['See you in June.'] },
  ],
};
