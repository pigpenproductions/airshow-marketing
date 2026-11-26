# HIA 2027: embassy and air-arm outreach

Prepared 26 November 2026. Nothing has been sent and no one has been contacted.

- **Target list:** [`target-list.csv`](target-list.csv) has 16 researched targets plus the 5 existing contacts. Each row gives the route in, the published official contact, its source, the deadline, the priority and what is unverified.
- **Letters:** `letters/embassy-2027/`, 9 one-page A4 PDFs plus the HTML source. They are built by `scripts/embassy-letters.js` from the proven RJF format. To rebuild, run `NODE_PATH=$(npm root -g) node scripts/embassy-letters.js`.
- **Zoho drafts (saved, not sent):** three emails from alex@headcornairshow.com. For drafts 2 and 3 **the PDFs are not attached**, because the connector could not carry files of this size, so attach the named PDF before sending:
  1. KLuHV: To office@kluhv.nl, Cc staff.sales@kluhv.nl. **A plain email, with no attachment needed.** KLuHV is a volunteer foundation, not a state body, so the formal letter was dropped. The email asks about availability and costs.
  2. Patrulla ASPA: To the Spanish Defence Office, agredlon@oc.mde.es. Attach `patrulla-aspa-spain.pdf`.
  3. Hellenic AF Historic Flight: To the Greek Defence Attaché's Office, London_defatt@navy.mil.gr. Attach `hellenic-af-historic-flight-greece.pdf`.

Contacts come from the **FCDO London Diplomatic List (September 2026)**, the official published list of embassy staff, or from the operator's own website. No personal email address has been guessed.

## Who to approach first, and why

| # | Target | Letter | Why first |
|---|---|---|---|
| 1 | **US Defense Attaché** (VIP), followed by a USAFE request | `usa-defense-attache-vip` | The air attaché already has your invitation via the NZ adviser, so follow it up while it is warm. Headcorn was RAF Lashenden, home of the USAAF 354th Fighter Group's P-51s in 1944. USAFE is the gateway to any USAF flypast or static. |
| 2 | **Canadian Air Force Adviser** (VIP) | `canada-air-force-adviser-vip` | Also received the NZ forward. 403 and 421 Squadrons RCAF flew from Lashenden in 1943, which is a ready-made story. |
| 3 | **Australian Defence Staff** (VIP) | `australia-defence-staff-vip` | Also received the NZ forward. The Head is an Air Commodore. |
| 4 | **KLu Historische Vlucht** (Spitfire, B-25, Harvard) and the **NL Air Attaché** (VIP) | plain email (Zoho draft), `netherlands-air-attache-vip` | This is the best heritage and variety fit found: a twin bomber plus a Spitfire, and light grass types for arrivals day. KLuHV is a private volunteer foundation, **not state-funded**, and prices events individually, so expect costs. Ask the NL Air Attaché for the government-funded part, such as an RNLAF static or flypast. |
| 5 | **Patrulla ASPA** (Spanish helicopter team) | `patrulla-aspa-spain` | Adds rotary variety, and the team does travel abroad (South America, 2026). |
| 6 | **Hellenic AF Spitfire MJ755 and Harvard** | `hellenic-af-…` | A long shot, but a strong story if it comes off. |
| 7 | **German Air Attaché**: P-8A Poseidon or A400M flypast, helicopter static | `germany-air-attache-participation` | Maritime patrol and transport are missing from the programme, and the P-8A is new in German service. This is a speculative ask. |
| 8 | **Polish Defence Attaché** (VIP) | `poland-defence-attache-vip` | Battle of Britain and Kent link. Polish display flying is restricted after the 2025 F-16 accident, so treat this as groundwork for 2028. |
| 9 | **French Air & Space Attaché** (VIP) | `france-air-space-attache-vip` | France has the nearest foreign air force, so this opens a door for future flypasts. |

Thank the NZ air adviser (WGCDR Heather Peart, per the Diplomatic List) when the AUS, CAN and US letters go. They mention her forward.

## Deadlines

- **Swiss Air Force: missed.** Applications for 2027 closed on **30 October 2026** (vtg.admin.ch). Diary end of October 2027 for a 2028 application (Super Puma or PC-7 Team).
- **USAF demo teams** (F-35A/F-16): USAFE wants requests **one year ahead**, so June 2027 demos are effectively out. Flypast and static lead times are unverified, so ask early.
- **RAF assets, for context:** 2027 Red Arrows display bids closed 30 September 2026 and flypast bids on 31 October 2026.
- **Everyone else:** no deadline is published. Following the Jordanian lesson, send in **December 2026**, well before March.

## Decisions for Alex

1. **Possible costs.** USAFE states it does not fund aerial-event participation. KLuHV is a volunteer foundation that prices events "op maat" (bespoke), so it may charge. Decide what you can cover (fuel, landing, hotels) before you reply to any yes. The letters commit only to supporting "operational, logistical and hospitality requirements", as in the RJF letter.
2. **Clash with Shuttleworth.** Shuttleworth's flagship show is on the **same weekend (26–27 June 2027)**, so heritage operators may be asked to choose. Early asks help.
3. **Runway and airspace.** Sources disagree on the 10/28 grass runway (about 800 m declared, versus 1,100 m on Wikipedia). Confirm which aircraft can land (for example the B-25), and which must display or fly past from another airfield, before promising arrivals-day slots. The jet heritage flights (Swedish, Norwegian) are flypast-only and limited by UK post-Shoreham rules, so they are ranked low.
4. **Check before sending.**
   - The Diplomatic List shows the US Defense Attaché as "Mr Thomas Winkler". Confirm his title and rank with the embassy switchboard (020 7499 9000), and ask who the Air Attaché is.
   - The Greek Defence Attaché's rank is not listed, so the letter uses "Dear Defence Attaché".
   - The French attaché is listed as "Mr Emmanuel Emond".
   - KLuHV's postal address is from a third-party listing, so email is safer.
   - The letters are dated 26 November 2026. Re-date them if they go later (edit `DATE` in the script).
5. **Post or email for the VIP letters.** Only Spain, Greece and KLuHV have dedicated official email addresses. The others list a general embassy inbox or a postal address (see the CSV), so post or hand delivery suits the formal VIP letters.
6. **Whether to add Brazil** (Air Adviser, cabe@bace.org.uk) or **Sweden** (Defence Attaché) as further VIP letters. Both are on the list, but no letter is drafted.

## Letter style

The formal "I have the honour" letter is used **only for governments and air forces**, where an approvals process expects one. Private or volunteer operators (KLuHV, the Norwegian Historical Squadron and similar) get a short, friendly email that asks directly about availability and costs.

## Ruled out (researched)

- **RNLAF Apache solo:** suspended, and the AH-64D was retired. A Dutch AH-64E static was at Cosford in 2026, so that ask is in the NL letter instead.
- **Czech Mi-24:** the type has been retired.
- **Belgian Red Devils:** suspended.
- **Polish teams:** restricted since August 2025.
- **Norwegian Historical Squadron:** a private non-profit, not government-funded, so it is listed for completeness only.

## Key sources

FCDO London Diplomatic List, Sept 2026 (assets.publishing.service.gov.uk) · vtg.admin.ch organiser information · kluhv.nl · usafe.af.mil/Aerial-Events (search excerpt; the site blocked direct reading) · en.wikipedia.org/wiki/Headcorn_Aerodrome · migflug.com · europeanairshows.co.uk · thisisflight.net · janes.com · en.protothema.gr · shuttleworth.org (2027 dates) · raf.mod.uk (Red Arrows 2027 bid dates, via search). The full per-target sources are in the CSV.
