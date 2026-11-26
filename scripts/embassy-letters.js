// Builds the 2027 embassy / air-arm invitation letters from the proven
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

const letters = [
  // ---------------- (a) Participation invitations ----------------
  {
    slug: 'kluhv-netherlands-historic-flight',
    title: 'KLu Historic Flight Invitation',
    addr: ['The Board', 'Stichting Koninklijke Luchtmacht Historische Vlucht', 'Gilze-Rijen Air Base', 'Postbus 229, 5120 AE Rijen', 'The Netherlands'],
    dear: 'Dear Members of the Board,',
    subject: 'Formal Invitation: Headcorn International Airshow, 26–27 June 2027',
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of formally inviting the Koninklijke Luchtmacht Historische Vlucht to take part in our 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent, in the United Kingdom.',
      'Headcorn is a grass aerodrome with a strong heritage character; as RAF Lashenden it served the RAF, the Royal Canadian Air Force and the US Army Air Forces in 1943–44. It would be a great privilege to welcome your Spitfire Mk IX, B-25 Mitchell and Harvard to our flying display, and we would equally welcome your lighter types, subject to your crews’ assessment of our runway.',
      'We will support all of the Flight’s operational, logistical and hospitality requirements, including arrival and departure arrangements, accommodation and ground handling.',
    ],
    extra: [],
    close: 'We are writing early so this invitation fits your season planning, and I look forward to hearing from you.',
    cc: 'Copy: Air Attaché, Embassy of the Kingdom of the Netherlands, London',
  },
  {
    slug: 'patrulla-aspa-spain',
    title: 'Patrulla ASPA Invitation',
    addr: ['Captain (N) Rafael Guerra Soler', 'Defence, Naval, Army &amp; Air Attaché', 'Defence Office, Embassy of Spain', '1st Floor, 20 Peel Street', 'London W8 7PD'],
    dear: 'Dear Captain Guerra Soler,',
    subject: 'Formal Invitation for the Patrulla ASPA: Headcorn International Airshow, 26–27 June 2027',
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of formally inviting the Spanish Air and Space Force’s helicopter display team, the Patrulla ASPA, to take part in our 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent, in the United Kingdom. I would be most grateful if you would forward it to the Ejército del Aire y del Espacio.',
      'Our programme celebrates heritage and variety, and a helicopter formation display would bring something our audience rarely sees. We understand the team is preparing its transition to a new helicopter type, and we would be delighted to welcome whichever aircraft and display suit the team’s 2027 plans.',
      'We will support all of the team’s operational, logistical and hospitality requirements, including transit, accommodation and ground handling.',
    ],
    extra: [],
    close: 'We are writing well ahead of the season so the invitation can fit the team’s approvals, and I look forward to hearing from you.',
  },
  {
    slug: 'hellenic-af-historic-flight-greece',
    title: 'Hellenic Historic Flight Invitation',
    addr: ['Mr Sarantos Alexandros Xanthouleas', 'Defence Attaché', 'Defence Attaché’s Office, Embassy of Greece', '1A Holland Park', 'London W11 3TP'],
    dear: 'Dear Defence Attaché,',
    subject: 'Formal Invitation for the Hellenic Air Force Historic Flight: Headcorn International Airshow, 26–27 June 2027',
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of formally inviting the Hellenic Air Force to bring its historic aircraft to our 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent, in the United Kingdom. I would be most grateful if you would forward it to the Hellenic Air Force.',
      'Headcorn is a grass aerodrome with a strong heritage character, and our audience has a deep affection for the Spitfire. It would be a great privilege to welcome Spitfire MJ755, delivered to the Royal Hellenic Air Force in 1947, to the skies of Kent, with the T-6 Harvard if plans allow.',
      'We will support all of the Flight’s operational, logistical and hospitality requirements, including transit, accommodation and ground handling.',
    ],
    extra: [],
    close: 'We are writing well ahead of the season so the invitation can fit the Air Force’s approvals, and I look forward to hearing from you.',
  },
  {
    slug: 'germany-air-attache-participation',
    title: 'German Armed Forces Invitation',
    addr: ['Colonel Stefan Udo Kleinheyer', 'Air Attaché', 'Embassy of the Federal Republic of Germany', '23 Belgrave Square', 'London SW1X 8PZ'],
    dear: 'Dear Colonel Kleinheyer,',
    subject: 'Formal Invitation: Headcorn International Airshow, 26–27 June 2027',
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of formally inviting the German Armed Forces to take part in our 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent, in the United Kingdom. I would be grateful if you would forward it to the appropriate offices.',
      'A flypast by one of the German Navy’s new P-8A Poseidon maritime patrol aircraft, or by a Luftwaffe A400M, would give our audience a rare view of these aircraft, and we would equally welcome a helicopter for static display. We will support all operational, logistical and hospitality requirements, and would be honoured to welcome you as our guest.',
    ],
    extra: [HOSPITALITY_ROW],
    close: 'I would be glad to provide anything further your approvals process requires, and I look forward to hearing from you.',
  },

  // ---------------- (b) VIP hospitality invitations ----------------
  {
    slug: 'usa-defense-attache-vip',
    title: 'US Defense Attaché Invitation',
    addr: ['Mr Thomas Winkler', 'Defense Attaché', 'Embassy of the United States of America', '33 Nine Elms Lane', 'London SW11 7US'],
    dear: 'Dear Mr Winkler,',
    subject: 'Invitation: Headcorn International Airshow, 26–27 June 2027',
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of inviting you, with your Air Attaché and guests, to join us as our VIP guests at the 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent. You may already have seen our invitation, which Wing Commander Heather Peart of the New Zealand High Commission kindly passed to colleagues earlier this year.',
      'Headcorn has a particular American connection: as RAF Lashenden, it was home in 1944 to the P-51 Mustangs of the US Army Air Forces’ 354th Fighter Group. It would be a privilege to welcome representatives of the United States in that spirit.',
      'We would also welcome a conversation about US Air Force participation, such as a flypast or static display, and will make the appropriate request through U.S. Air Forces in Europe.',
    ],
    extra: [HOSPITALITY_ROW],
    close: 'We would be delighted to arrange every detail of your visit. I look forward to hearing from you.',
  },
  {
    slug: 'canada-air-force-adviser-vip',
    title: 'Canadian Air Force Adviser Invitation',
    addr: ['Colonel David Holmes', 'Air Force Adviser', 'Canadian Defence Liaison Staff (London)', 'High Commission of Canada, Canada House', 'Trafalgar Square, London SW1Y 5BJ'],
    dear: 'Dear Colonel Holmes,',
    subject: 'Invitation: Headcorn International Airshow, 26–27 June 2027',
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of inviting you and a guest to join us as our VIP guests at the 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent. You may already have seen our invitation, which Wing Commander Heather Peart of the New Zealand High Commission kindly passed to colleagues earlier this year.',
      'Headcorn has a Canadian history of its own. As RAF Lashenden in 1943, the aerodrome was used by Nos. 403 and 421 Squadrons of the Royal Canadian Air Force. It would be a privilege to welcome representatives of the Royal Canadian Air Force back to Headcorn.',
      'We would also be delighted to discuss any Royal Canadian Air Force participation, whether a flypast or a static display, should that be possible in 2027.',
    ],
    extra: [HOSPITALITY_ROW],
    close: 'We would be delighted to arrange every detail of your visit. I look forward to hearing from you.',
  },
  {
    slug: 'australia-defence-staff-vip',
    title: 'Australian Defence Staff Invitation',
    addr: ['Air Commodore Matthew Harper', 'Head Australian Defence Staff', 'Australian High Commission', 'Australia House, Strand', 'London WC2B 4LA'],
    dear: 'Dear Air Commodore Harper,',
    subject: 'Invitation: Headcorn International Airshow, 26–27 June 2027',
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of inviting you and a guest, together with your Air Force Adviser, to join us as our VIP guests at the 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent. You may already have seen our invitation, which Wing Commander Heather Peart of the New Zealand High Commission kindly passed to colleagues earlier this year.',
      'Our show brings together historic and modern aircraft from across Europe, and it would be a privilege to welcome representatives of Australia and the Royal Australian Air Force.',
      'We would also be delighted to discuss any Royal Australian Air Force participation, should an aircraft be in Europe in 2027.',
    ],
    extra: [HOSPITALITY_ROW],
    close: 'We would be delighted to arrange every detail of your visit. I look forward to hearing from you.',
  },
  {
    slug: 'netherlands-air-attache-vip',
    title: 'Netherlands Air Attaché Invitation',
    addr: ['Lieutenant Colonel Sander van Hees', 'Air Attaché', 'Embassy of the Kingdom of the Netherlands', '38 Hyde Park Gate', 'London SW7 5DP'],
    dear: 'Dear Lieutenant Colonel van Hees,',
    subject: 'Invitation: Headcorn International Airshow, 26–27 June 2027',
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of inviting you and a guest to join us as our VIP guests at the 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent.',
      'We have also written to the Koninklijke Luchtmacht Historische Vlucht to invite its Spitfire, B-25 Mitchell and Harvard to the show, and we would be most grateful for any support you are able to give. We would equally welcome a conversation about Royal Netherlands Air and Space Force participation, such as a helicopter for static display or a flypast.',
      'It would be a privilege to welcome representatives of the Netherlands to Headcorn, and we will support all operational, logistical and hospitality requirements of any participation.',
    ],
    extra: [HOSPITALITY_ROW],
    close: 'We would be delighted to arrange every detail of your visit. I look forward to hearing from you.',
  },
  {
    slug: 'poland-defence-attache-vip',
    title: 'Polish Defence Attaché Invitation',
    addr: ['Colonel Rafał Artur Nowak', 'Defence, Military, Naval and Air Attaché', 'Embassy of the Republic of Poland', '47 Portland Place', 'London W1B 1JH'],
    dear: 'Dear Colonel Nowak,',
    subject: 'Invitation: Headcorn International Airshow, 26–27 June 2027',
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of inviting you and a guest to join us as our VIP guests at the 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent.',
      'Kent remembers the Polish airmen who fought in its skies in 1940, and our show celebrates that heritage alongside modern aviation. It would be a privilege to welcome representatives of Poland and the Polish Air Force as our guests.',
      'We would also be delighted to discuss any Polish Air Force participation, whether in 2027 or in future years, and we will support all operational, logistical and hospitality requirements of any participation.',
    ],
    extra: [HOSPITALITY_ROW],
    close: 'We would be delighted to arrange every detail of your visit. I look forward to hearing from you.',
  },
  {
    slug: 'france-air-space-attache-vip',
    title: 'French Air Attaché Invitation',
    addr: ['Mr Emmanuel Emond', 'Air &amp; Space Attaché', 'Defence Mission, Embassy of France', '58 Knightsbridge', 'London SW1X 7JT'],
    dear: 'Dear Mr Emond,',
    subject: 'Invitation: Headcorn International Airshow, 26–27 June 2027',
    body: [
      'On behalf of the Headcorn International Airshow, I have the honour of inviting you and a guest to join us as our VIP guests at the 2027 show on Saturday 26 and Sunday 27 June at Headcorn Aerodrome, Kent.',
      'Headcorn lies a short flight from the French coast, and our show brings together historic and modern aircraft from across Europe. It would be a privilege to welcome representatives of France and the Armée de l’Air et de l’Espace as our guests.',
      'We would also be delighted to discuss any participation by the Armée de l’Air et de l’Espace or the Marine nationale, whether a flypast or a static display, and we will support all operational, logistical and hospitality requirements of any participation.',
    ],
    extra: [HOSPITALITY_ROW],
    close: 'We would be delighted to arrange every detail of your visit. I look forward to hearing from you.',
  },
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
