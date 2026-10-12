# HIA27 Mailchimp emails

Hand-coded, table-based HTML emails for the Headcorn International Airshow 2027,
built from one template. Hand-coded rather than MJML so the Outlook VML button,
ghost tables and `mc:edit` regions come out exactly as written.

| Email | Purpose | Output |
|---|---|---|
| 1 | Tier 1 deadline, GA tickets | `build/email-1-tier1.html` / `.txt` |
| 3 | 2027 reintroduction and Christmas gift push | `build/email-3-reintro-xmas.html` / `.txt` |

Email 2 (premium early-bird) is not built yet.

## Build

```
npm install
npm run build     # images, HTML, plain text, pre-flight checks
npm run shots     # screenshots/ at 600px and 375px, light and dark, plus images off
```

Screenshots use the Chromium at `/opt/pw-browsers/chromium`, or `PLAYWRIGHT_CHROMIUM`.
On another machine run `npx playwright install chromium` once.

The build fails on em or en dashes, emoji, banned words ("iconic", "unforgettable",
"don't miss out"), images without width, height or alt text, links without UTMs and
duplicate `mc:edit` names. It warns about every placeholder still in the email.

## Where things live

- **Copy:** `src/emails/<slug>.js`. One block per section.
- **Layout:** `src/template.js`. Plain-text version: `src/text.js`.
- **Links:** `src/config.js`. Replace `TICKET_URL`, `GIFT_URL`, `INSTAGRAM_URL`, `FACEBOOK_URL`.
  UTMs are added automatically: `utm_source=mailchimp&utm_medium=email&utm_campaign=<campaign>&utm_content=<position>`.
- **Images:**
  - Logo: `assets/hia-logo.png` (transparent PNG). The build puts it on a light
    rounded plate so the navy lettering survives dark mode.
  - Email 1 hero: `assets/hero.jpg`, 1104 x 736.
  - Email 3 cover: built from `assets/source/hurricane-overhead.png` by
    `scripts/poster.js`. It cuts the aircraft out of the sky and lays it over
    the giant type. Words, sizes and position are set in the email's `poster` block.
    Works on any aircraft-against-open-sky photo.
- **Mailchimp image URLs:** upload `build/assets/*` to Content Studio, paste each URL
  into `imageUrls` in `src/config.js`, rebuild, then paste the HTML into
  Mailchimp "Code your own". Without this the images are local paths and will break.

## [CONFIRM] before send

**Assets**
- [ ] Real logo. `assets/hia-logo.png` is missing, so a stand-in wordmark is in use.
- [ ] Email 1 hero photo, and its credit (`PHOTO_CREDIT`).
- [ ] Email 3 cover photo: who took it, and written permission to use it in
      marketing. Then get the original full-resolution file. The current file is a
      592px Instagram screenshot, so it's soft on retina screens. Confirm the
      aircraft is a Hawker Hurricane before the alt text says so.

**Email 1**
- [ ] Tier 2 and 3 adult day prices (£35 from 1 Feb, £37.50 from 1 May). If not
      confirmed, set `steps: null` and the email says "The price steps up on 1 February."
- [ ] "Roughly a quarter of the world's airworthy fleet" for four Hurricanes.

**Email 3**
- [ ] Gift cards are on sale on the send date ("Gift cards are on sale now").
- [ ] "A bigger show with bigger ambitions" and "2027 has to beat that. It will."
      Alex should be comfortable standing behind both.
- [ ] 2026 figures: 4 Hurricanes, 30+ aircraft, 18 operators, four countries,
      20+ WWII veterans, RAF Chinook.
- [ ] Sign-off from Alex.

**Links**
- [ ] Instagram and Facebook URLs. Ticket and gift card URLs.

## Photo rights

Being taken on our land doesn't give us the right to use a photo. Under UK
copyright law the photographer owns it, wherever it was taken. Ticket terms can
restrict commercial photography, but they don't hand the copyright to us.

To use a photo, get it in writing: the photographer's permission, a licence
clause on the #HIAGRASSROOTS photo comp entry form, or an operator's media pack
shared for promotion. Credit every photo.

## Pre-send checklist

- [ ] `npm run build` passes with no placeholder warnings.
- [ ] Images hosted on Mailchimp and `imageUrls` filled in.
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
