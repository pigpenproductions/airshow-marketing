# HIA27 Mailchimp emails

Hand-coded, table-based HTML emails for the Headcorn International Airshow 2027,
built from one template. Hand-coded rather than MJML so the Outlook VML button,
ghost tables and `mc:edit` regions come out exactly as written.

| Email | Purpose | Output |
|---|---|---|
| 1 | Tier 1 deadline, GA tickets (bold template) | `build/email-1-tier1.html` / `.txt` |
| 3 | 2027 reintroduction, sent October (bold template) | `build/email-3-reintro.html` / `.txt` |
| 4 | Christmas push, DRAFT for December (bold template) | `build/email-4-christmas.html` / `.txt` |

Email 2 (premium early-bird) is not built yet.

## Get it into Mailchimp

Each email ships as a zip in `dist/`, ready for Mailchimp's zip import:

1. Mailchimp: **Content > Email templates > Create template > Code your own > Import zip**.
2. Upload `dist/email-3-reintro-mailchimp.zip`. Mailchimp uploads the images
   to Content Studio and rewires the paths itself.
3. Create the campaign from that template. The `mc:edit` regions (hero, intro,
   numbers, Christmas band and so on) stay editable in Mailchimp's editor.
4. On the campaign's plain-text tab, paste `dist/email-3-reintro-plain-text.txt`.
5. Set the subject and preview text from the email file (`subject`, `preheader`).
   Email 3: "2026 was the warm-up." / "Bigger show. A new theme. Headline acts
   in the new year. 2026 prices until 31 January."

To paste raw HTML instead, upload `build/assets/*` to Content Studio, put each
URL into `imageUrls` in `src/config.js`, rebuild, and paste `build/<slug>.html`.

## Build

```
npm install
npm run build     # images, HTML, plain text, pre-flight checks
npm run shots     # screenshots/ at 600px and 375px, light and dark, plus images off
npm run package   # dist/<slug>-mailchimp.zip and dist/<slug>-plain-text.txt
npm run all       # all three
```

Screenshots use the Chromium at `/opt/pw-browsers/chromium`, or `PLAYWRIGHT_CHROMIUM`.
On another machine run `npx playwright install chromium` once.

The build fails on em or en dashes, emoji, banned words ("iconic", "unforgettable",
"don't miss out"), images without width, height or alt text, links without UTMs and
duplicate `mc:edit` names. It warns about every placeholder still in the email.

## Where things live

- **Copy:** `src/emails/<slug>.js`. One block per section.
- **Layout:** two templates.
  - `src/template.js` is the original light, editorial one (no email uses it now).
  - `src/template-bold.js` is the dark, full-bleed one used by Emails 1 and 3: photo artboards, a giant type wall and a red band. Pick it with `template: 'bold'`.
  - Plain text for both comes from `src/text.js`.
- **Links:** `src/config.js`. Tickets (headcornairshow.com/tickets), website,
  Instagram, Facebook and TikTok are all set. UTMs are added automatically: `utm_source=mailchimp&utm_medium=email&utm_campaign=<campaign>&utm_content=<position>`.
- **Images:**
  - Logo: `assets/hia-logo.png` (transparent PNG). The build puts it on a light
    rounded plate so the navy lettering survives dark mode.
  - Email 1 hero: `assets/hero.jpg`, 1104 x 736.
  - Email 3 artboards: `assets/photos/` (James Hill, HIA 2026, stored at 2400px).
    Each email's `art` list sets the photo, crop, shade and type. `scripts/artboard.js`
    renders them to JPEG. With `cutout`, the aircraft is cut out of the sky and
    flies over the type, as in "Put June under the tree."
  - Originals are in Dropbox: `Headcorn International Airshow/HIA 26 Photos and Videos/Photos from show/James Hill/Edited photos`.

## [CONFIRM] before send

**Assets**
- [x] Real logo, from Dropbox `Logo & Pics`.
- [x] James Hill is happy for his photos to be used and edited. He's credited in each footer.
- [ ] Email 3's flying P-47 Thunderbolt "Nellie" is by Paul Johnson, Flightline UK, from the
      Flightline image library in Dropbox (not taken at Headcorn). Confirm that library's terms cover
      email marketing with overlaid type. He's credited in the footer.
- [ ] Display owners are happy for their aircraft to front a ticket campaign:
      Spitfire FX-M "Spirit of Kent" and P-51 Mustang "QI".

**Email 1**
- [ ] Tier 2 and 3 adult day prices (£35 from 1 Feb, £37.50 from 1 May). If not
      confirmed, set `steps: null` and the email says "The price steps up on 1 February."
- [ ] "Roughly a quarter of the world's airworthy fleet" for four Hurricanes.
- [ ] Other ticket prices: adult weekend £48, family day £75, family weekend £120,
      child or carer £15 (£25 weekend).

**Email 3**
- [ ] Email 4: "Every ticket is an e-ticket. Buy one now, give it on Christmas Day."
      Ticket confirmations need to work as a present (forwardable, or printable).
- [x] "2026 was the warm-up", "Bigger show. Bigger ambitions." and "2027 goes bigger." Confirmed.
- [ ] 2026 figures: 4 Hurricanes, 30+ aircraft, 18 operators, four countries,
      20+ WWII veterans, RAF Chinook.

**Links**
- [x] Tickets, website, Instagram, Facebook, TikTok.

## Photo rights

The bold template uses only James Hill's HIA 2026 set. Not used: the Bf 109
shots (tail markings) and the photo of a parent and child, unless consent is on file.

Being taken on our land doesn't give us the right to use a photo. Under UK
copyright law the photographer owns it, wherever it was taken. Ticket terms can
restrict commercial photography, but they don't hand the copyright to us.

To use a photo, get it in writing: the photographer's permission, a licence
clause on the #HIAGRASSROOTS photo comp entry form, or an operator's media pack
shared for promotion. Credit every photo.

## Pre-send checklist

- [ ] `npm run build` passes with no placeholder warnings.
- [ ] Zip imported into Mailchimp (or images hosted and `imageUrls` filled in).
- [ ] Test send to Gmail (web and app), Outlook (Windows desktop and outlook.com)
      and Apple Mail (iPhone and Mac). Check light and dark mode in each.
- [ ] Click every link. Check UTMs land in analytics. If Mailchimp's Google
      Analytics link tracking is on, check it doesn't overwrite `utm_campaign`.
- [ ] Merge tags: preview as a contact with a first name and one without
      ("Hi there."). Check `*|LIST:ADDRESSLINE|*`, `*|UPDATE_PROFILE|*`,
      `*|UNSUB|*`, `*|ARCHIVE|*`. Keep `*|REWARDS|*` unless the account is on a paid plan.
- [ ] Paste the matching `.txt` into Mailchimp's plain-text tab.
- [ ] Soft opt-in check: only email people who subscribed or bought tickets and
      didn't opt out. Do not send to non-subscribers (bought-in lists, partner
      contacts, enquiries) without consent under PECR.
- [ ] Subject and preheader read well together in the inbox preview.
