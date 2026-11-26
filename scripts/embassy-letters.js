// Builds the 2027 embassy / air-arm invitation letters (state bodies only;
// private or volunteer operators such as KLuHV get a plain email instead) from the proven
// RJF letter format (letters/rjf-invitation-2027.html) and renders each to
// a one-page A4 PDF with the pre-installed Playwright Chromium.
//
//   node scripts/embassy-letters.js          # HTML + PDF
//   node scripts/embassy-letters.js --html   # HTML only
//
// Output: letters/embassy-2027/<slug>.html and .pdf
// Addressees and addresses are taken from the FCDO London Diplomatic List
// (September 2026) or the operator's own website. See
// outreach/embassies/target-list.csv for sources.

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'letters', 'embassy-2027');
const DATE = '26 November 2026';

const details = (extra = []) => [
  ['Show days', 'Saturday 26 and Sunday 27 June 2027'],
  ['Arrivals', 'Futures &amp; Arrivals Day, Friday 25 June 2027'],
  ['Venue', 'Headcorn Aerodrome, Headcorn, Kent, United Kingdom'],
  ...extra,
  ['2026 in brief', 'More than 10,000 visitors across the weekend, and more than 30 aircraft from 18 operators in four countries'],
];

const HOSPITALITY_ROW = ['Hospitality', 'VIP hospitality on either or both show days, with the opportunity to meet crews on the flightline'];

// Tone: diplomatic, cordial and proud. Leave participation open: do not
// name specific aircraft or lean on wartime history.
const SUBJECT = 'Invitation: Headcorn International Airshow, 26–27 June 2027';
const FORMAL_SUBJECT = 'Formal Invitation: Headcorn International Airshow, 26–27 June 2027';
const PROUD = 'Following a very successful show in June 2026, we are proud to be bringing together aircraft, crews and visitors from across Europe and beyond once again.';
const VIP_CLOSE = 'We would be delighted to arrange every detail of your visit, and I look forward to hearing from you.';
const PART_CLOSE = 'We will support all operational, logistical and hospitality requirements, and we would be honoured to welcome you as our guest. I would be glad to provide anything further your approvals process may require, and I look forward to hearing from you.';

const vip = ({ slug, title, addr, dear, opener, country, force }) => ({
  slug, title, addr, dear, subject: SUBJECT,
  body: [
    opener || 'On behalf of the Headcorn International Airshow, I have the honour of inviting you and a guest to join us as our guests of honour at our 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent.',
    `${PROUD} It would be a great privilege to welcome representatives of ${country} to Headcorn, and we would be delighted to host you.`,
    `We would also warmly welcome any participation by the ${force} that you feel may be appropriate, and I would be glad to discuss this at your convenience.`,
  ],
  extra: [HOSPITALITY_ROW],
  close: VIP_CLOSE,
});

const viaPeart = 'Further to Wing Commander Heather Peart’s kind introduction, I have the honour of inviting you and a guest, on behalf of the Headcorn International Airshow, to join us as our guests of honour at our 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent.';

const letters = [
  // ---------------- (a) Participation invitations ----------------
  {
    slug: 'spain-defence-office-participation',
    title: 'Spanish Air Force Invitation',
    addr: ['Captain (N) Rafael Guerra Soler', 'Defence, Naval, Army &amp; Air Attaché', 'Defence Office, Embassy of Spain', '1st Floor, 20 Peel Street', 'London W8 7PD'],
    dear: 'Dear Captain Guerra Soler,',
    subject: FORMAL_SUBJECT,
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of formally inviting the Spanish Air and Space Force to take part in our 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent, in the United Kingdom. I would be most grateful if you would kindly forward this invitation to the Ejército del Aire y del Espacio.',
      `${PROUD} We have long admired the Patrulla ASPA, and it would be an honour to welcome the team should its programme allow, though we would be delighted to discuss any participation the Air and Space Force feels appropriate.`,
    ],
    extra: [HOSPITALITY_ROW],
    close: PART_CLOSE,
  },
  {
    slug: 'greece-defence-attache-participation',
    title: 'Hellenic Air Force Invitation',
    addr: ['Mr Sarantos Alexandros Xanthouleas', 'Defence Attaché', 'Defence Attaché’s Office, Embassy of Greece', '1A Holland Park', 'London W11 3TP'],
    dear: 'Dear Defence Attaché,',
    subject: FORMAL_SUBJECT,
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of formally inviting the Hellenic Air Force to take part in our 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent, in the United Kingdom. I would be most grateful if you would kindly forward this invitation to the Hellenic Air Force.',
      `${PROUD} Our show has a strong heritage character, and we would be delighted to discuss any participation the Hellenic Air Force feels appropriate, whether in the air or on the ground.`,
    ],
    extra: [HOSPITALITY_ROW],
    close: PART_CLOSE,
  },
  {
    slug: 'germany-air-attache-participation',
    title: 'German Armed Forces Invitation',
    addr: ['Colonel Stefan Udo Kleinheyer', 'Air Attaché', 'Embassy of the Federal Republic of Germany', '23 Belgrave Square', 'London SW1X 8PZ'],
    dear: 'Dear Colonel Kleinheyer,',
    subject: FORMAL_SUBJECT,
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of formally inviting the German Armed Forces to take part in our 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent, in the United Kingdom. I would be most grateful if you would kindly forward this invitation to the appropriate offices.',
      `${PROUD} We would be delighted to discuss any participation the Luftwaffe or the German Navy feels appropriate, whether in the air or on the ground.`,
    ],
    extra: [HOSPITALITY_ROW],
    close: PART_CLOSE,
  },

  // ---------------- (b) VIP hospitality invitations ----------------
  // US, Canada and Australia: HOLD. Send only once the attaché replies to
  // Wing Commander Peart's introduction.
  vip({
    slug: 'usa-defense-attache-vip', title: 'US Defense Attaché Invitation',
    addr: ['Mr Thomas Winkler', 'Defense Attaché', 'Embassy of the United States of America', '33 Nine Elms Lane', 'London SW11 7US'],
    dear: 'Dear Mr Winkler,', opener: viaPeart,
    country: 'the United States', force: 'United States Air Force',
  }),
  vip({
    slug: 'canada-air-force-adviser-vip', title: 'Canadian Air Force Adviser Invitation',
    addr: ['Colonel David Holmes', 'Air Force Adviser', 'Canadian Defence Liaison Staff (London)', 'High Commission of Canada, Canada House', 'Trafalgar Square, London SW1Y 5BJ'],
    dear: 'Dear Colonel Holmes,', opener: viaPeart,
    country: 'Canada and the Royal Canadian Air Force', force: 'Royal Canadian Air Force',
  }),
  vip({
    slug: 'australia-defence-staff-vip', title: 'Australian Defence Staff Invitation',
    addr: ['Air Commodore Matthew Harper', 'Head Australian Defence Staff', 'Australian High Commission', 'Australia House, Strand', 'London WC2B 4LA'],
    dear: 'Dear Air Commodore Harper,', opener: viaPeart,
    country: 'Australia and the Royal Australian Air Force', force: 'Royal Australian Air Force',
  }),
  vip({
    slug: 'netherlands-air-attache-vip', title: 'Netherlands Air Attaché Invitation',
    addr: ['Lieutenant Colonel Sander van Hees', 'Air Attaché', 'Embassy of the Kingdom of the Netherlands', '38 Hyde Park Gate', 'London SW7 5DP'],
    dear: 'Dear Lieutenant Colonel van Hees,',
    country: 'the Netherlands and the Royal Netherlands Air and Space Force', force: 'Royal Netherlands Air and Space Force',
  }),
  vip({
    slug: 'poland-defence-attache-vip', title: 'Polish Defence Attaché Invitation',
    addr: ['Colonel Rafał Artur Nowak', 'Defence, Military, Naval and Air Attaché', 'Embassy of the Republic of Poland', '47 Portland Place', 'London W1B 1JH'],
    dear: 'Dear Colonel Nowak,',
    country: 'Poland and the Polish Air Force', force: 'Polish Air Force, whether in 2027 or in future years,',
  }),
  vip({
    slug: 'france-air-space-attache-vip', title: 'French Air Attaché Invitation',
    addr: ['Mr Emmanuel Emond', 'Air &amp; Space Attaché', 'Defence Mission, Embassy of France', '58 Knightsbridge', 'London SW1X 7JT'],
    dear: 'Dear Mr Emond,',
    country: 'France and the Armée de l’Air et de l’Espace', force: 'Armée de l’Air et de l’Espace or the Marine nationale',
  }),
];

const css = fs.readFileSync(path.join(__dirname, '..', 'letters', 'rjf-invitation-2027.html'), 'utf8')
  .match(/<style>([\s\S]*?)<\/style>/)[1];

function html(l) {
  const rows = details(l.extra).map(([k, v]) => `      <tr><td>${k}</td><td>${v}</td></tr>`).join('\n');
  const paras = l.body.map((p) => `  <p>${p}</p>`).join('\n\n');
  const cc = l.cc ? `\n  <p class="cc">${l.cc}</p>` : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${l.title}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@500;600&display=swap" rel="stylesheet">
<style>${css}
  .page { font-size: 11.4pt; }
  .cc { font-size: 10pt; font-style: italic; margin-top: 3mm; text-align: left; }
</style>
</head>
<body>
<div class="page">
  <div class="frame"></div>

  <header>
    <img src="../hia-logo-gold.png" alt="Headcorn International Airshow">
    <div class="wordmark">Headcorn International Airshow &middot; 2027</div>
    <div class="rule"></div>
  </header>

  <div class="meta">
    <div class="addr">
      ${l.addr.join('<br>\n      ')}
    </div>
    <div class="date">${DATE}</div>
  </div>

  <p>${l.dear}</p>

  <p class="subject">${l.subject}</p>

${paras}

  <div class="details">
    <table>
${rows}
    </table>
  </div>

  <p>${l.close}</p>

  <div class="sign">
    Yours sincerely,
    <div class="space"><img src="../signature-alexander-yates.png" alt="Signature of Alexander Yates"></div>
    <strong>Alexander Yates</strong><br>
    Event Director, Headcorn International Airshow
  </div>${cc}

  <footer>
    <span>alex@headcornairshow.com</span>&middot;<span>+44 (0)7766 544 388</span>&middot;<span>www.headcornairshow.com</span>
  </footer>
</div>
</body>
</html>
`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const l of letters) fs.writeFileSync(path.join(OUT, `${l.slug}.html`), html(l));
  console.log(`wrote ${letters.length} HTML letters to ${OUT}`);
  if (process.argv.includes('--html')) return;

  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const l of letters) {
    await page.goto('file://' + path.join(OUT, `${l.slug}.html`), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // One-page check: the content must not run into the footer.
    const overflow = await page.evaluate(() => {
      const sign = document.querySelector('.sign').getBoundingClientRect();
      const cc = document.querySelector('.cc');
      const last = cc ? cc.getBoundingClientRect().bottom : sign.bottom;
      const foot = document.querySelector('footer').getBoundingClientRect().top;
      return Math.round(last - foot);
    });
    await page.pdf({ path: path.join(OUT, `${l.slug}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log(`${l.slug}.pdf  ${overflow > -4 ? 'OVERFLOW ' + overflow + 'px' : 'ok (' + -overflow + 'px clear)'}`);
  }
  await browser.close();
})();
