// Email 1: Tier 1 GA price deadline. Bold template.
// Urgency comes from the tier deadline, not from shouting about price.
// Photography: James Hill, HIA 2026.

const path = require('path');
const photo = (f) => path.join(__dirname, '..', '..', 'assets', 'photos', f);

module.exports = {
  slug: 'email-1-tier1',
  template: 'bold',
  subject: 'Still at 2026 prices. For now.',
  campaign: 'hia27_tier1',
  preheader: '2026 prices until 23:59 on Sunday 31 January.',
  credits: 'Photography: James Hill, Headcorn International Airshow 2026.',

  art: [
    {
      key: 'art_t1_hero',
      photo: photo('mustang-belly.jpg'),
      width: 600,
      height: 760,
      // The whole aircraft, on a sky painted to match the photo's own.
      sky: 'linear-gradient(90deg,#456FAB 0%,#3F69A5 50%,#3A639E 100%)',
      photoStyle: 'left:0;top:196px;width:600px;-webkit-mask-image:linear-gradient(180deg,transparent 0%,#000 16%,#000 84%,transparent 100%)',
      layers: `<div style="position:absolute;left:22px;top:26px">
          <div class="d fit" data-w="556">Still at</div><br>
          <div class="d fit" data-w="556" style="margin-top:4px">2026 prices.</div>
        </div>
        <div style="position:absolute;left:22px;bottom:28px">
          <div class="d fit" data-w="556" style="color:#E3141B">For now.</div>
        </div>`,
      alt: 'Still at 2026 prices. For now. A P-51 Mustang overhead at Headcorn.',
    },
    {
      key: 'art_t1_taxi',
      photo: photo('mustang-jersey-jerk-taxi.jpg'),
      width: 600,
      height: 400,
      position: '50% 55%',
      alt: 'A P-51 Mustang taxiing at Headcorn, propeller turning.',
    },
  ],

  blocks: [
    { type: 'art', key: 'art_t1_hero', link: 'tickets', utmContent: 'hero' },
    {
      type: 'copy',
      key: 'intro',
      eyebrow: 'Tier 1 ends 23:59, Sun 31 January',
      title: "Last year's price. This year's show.",
      paragraphs: [
        "Saturday 26 and Sunday 27 June 2027, with Futures &amp; Arrivals Day on Friday 25. Tickets hold at last year's price until the end of January.",
      ],
      cta: { label: 'Get tickets', link: 'tickets', utmContent: 'intro_cta' },
      note: 'Buying for someone? Every ticket is an e-ticket.',
    },
    {
      type: 'prices',
      eyebrow: 'Adult day ticket',
      now: { label: 'Now to 31 Jan', price: '£30' },
      // [CONFIRM] Tier 2 and 3 prices. To drop them, set steps: null
      // and the block shows `fallback` under the £30 price.
      steps: [
        { label: '1 Feb to 30 Apr', price: '£35' },
        { label: 'From 1 May', price: '£37.50' },
      ],
      fallback: 'The price steps up on 1 February.',
      listTitle: 'Other tickets',
      rows: [
        { label: 'Adult weekend', price: '£48' },
        { label: 'Family day', note: '(2 adults, 2 children)', price: '£75' },
        { label: 'Family weekend', price: '£120' },
        { label: 'Child or carer', price: '£15, £25 weekend' },
      ],
    },
    { type: 'art', key: 'art_t1_taxi', link: 'tickets', utmContent: 'taxi' },
    {
      type: 'typewall',
      eyebrow: 'Last June',
      lines: [{ text: '4 Hurricanes.' }, { text: 'One field in Kent.', red: true }],
      after: "Roughly a quarter of the world's airworthy fleet. Plus 30+ aircraft from 18 operators across four countries, 20+ WWII veterans and an RAF Chinook for Armed Forces Day.",
    },
    {
      type: 'band',
      eyebrow: 'Tier 1 ends 23:59, Sun 31 January',
      title: 'The lineup lands in the new year. The 2026 price is here now.',
      paragraphs: [],
      label: 'Get tickets',
      link: 'tickets',
      utmContent: 'band',
    },
  ],
};
