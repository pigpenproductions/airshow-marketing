// Email 1: Tier 1 GA price deadline. Copy lives here; layout lives in src/template.js.

module.exports = {
  slug: 'email-1-tier1',
  subject: 'Still at 2026 prices. For now.',
  campaign: 'hia27_tier1',
  preheader: '2026 prices until 23:59 on Sunday 31 January.',

  hero: {
    key: 'hero-tier1',
    file: 'hero.jpg', // drop the real photo at assets/hero.jpg
    placeholderLabel: 'Hero photo',
    alt: 'Headcorn International Airshow',
    credit: 'Photo: PHOTO_CREDIT',
  },

  blocks: [
    { type: 'flag', text: 'TIER 1 ENDS 23:59, SUN 31 JANUARY' },
    { type: 'headline', text: 'Still at 2026 prices. For now.' },
    {
      type: 'intro',
      paragraphs: [
        'Saturday 26 and Sunday 27 June 2027, with Futures &amp; Arrivals Day on Friday 25. Tickets hold at last year\'s price until the end of January.',
      ],
    },
    { type: 'hero' },
    {
      type: 'ladder',
      title: 'Adult day ticket',
      now: { label: 'Now to 31 Jan', price: '£30' },
      // [CONFIRM] Tier 2 and 3 prices. To drop them, set steps: null
      // and the block falls back to `fallback` under the £30 price.
      steps: [
        { label: '1 Feb to 30 Apr', price: '£35' },
        { label: 'From 1 May', price: '£37.50' },
      ],
      fallback: 'The price steps up on 1 February.',
    },
    {
      type: 'priceList',
      title: 'Other tickets',
      rows: [
        { label: 'Adult weekend', price: '£48' },
        { label: 'Family day', note: '(2 adults, 2 children)', price: '£75' },
        { label: 'Family weekend', price: '£120' },
        { label: 'Child or carer', price: '£15, £25 weekend' },
      ],
    },
    {
      type: 'cta',
      label: 'Get tickets',
      utmContent: 'cta_main',
      aside: 'Buying for someone? Every ticket is an e-ticket.',
    },
    {
      type: 'proof',
      figure: '4',
      lead: 'Hurricanes in one field last June.',
      body: 'Roughly a quarter of the world\'s airworthy fleet. Plus 30+ aircraft from 18 operators across four countries, 20+ WWII veterans and an RAF Chinook for Armed Forces Day.',
    },
    {
      type: 'closing',
      text: 'The first 2027 lineup announcements come in the new year. <a href="{{tickets:closing}}">The 2026 price is here now.</a>',
    },
  ],
};
