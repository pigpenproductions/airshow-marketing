# GPT Astra: resume prompt (paste this when your credits reset)

Paste the CONTEXT block from `astra-prompt.md` first, then everything below the line.

Before you paste, do these two things yourself. Astra can't take file uploads for them.

1. **Social share image.**
   - Go to Framer > Site Settings > General > Social Image and upload `og-share.jpg` (1200x630).
   - Do the same in Page Settings for Home and Tickets.
   - Copy the hosted URL Framer gives it. The structured data in PART 6 needs it.
2. **Alt text.** It's already in the table at the end of this prompt, so there's no need to upload `manifest.csv`.

---

You ran out of credits part-way through PART 3. Here is where things stand. Don't redo finished work. Check it quickly, then carry on.

**Facts confirmed since the last run (they replace anything older):**
- Car parks open 9am. Gates and the ground show open 10am. Flying from about noon. The show closes 6pm.
- Children aged 5 and under go free. Write "5 and under - Free".
- The defence attachés of two nations attended in 2026, and more nations' attachés are expected for 2027.
- There is no "By the Biplanes" ticket. Remove it wherever it appears, including the Terms.
- Use the existing site photos where you've already placed them.

**Already done. Verify each one, but don't rebuild it:**
- the hero zoom, pulse dot and labelled countdown
- the stats sequence
- the header button turning red on scroll
- the Christmas schedule override
- the lineup grid with the inline sign-up
- the ticket finder, with no totals
- the day planner

**Fixes to the code overrides in HeadcornMotion.tsx:**
1. **withHeroZoom.** Apply it to the hero *image* layer only, not the frame that holds the headline and button. Otherwise the text zooms too. Also, the eager/fetchpriority attributes are set after the image has started loading, so they do nothing. In the Framer image settings, mark the hero image as the page's priority image (no lazy loading) if that option exists.
2. **withHeaderTicketScroll.** Before the user scrolls, the button is transparent with white text. If the header background is light, the button is invisible at the top of the page. Check it on desktop at scroll position 0. If it's hard to read, use navy #0A1543 text with a red border before the scroll, and white text on solid red after it. Also, only call setActive when the value actually changes, not on every scroll event.
3. **useMergedRefs.** It depends on `[refs]`, which is a new array on every render, so the ref callback re-fires each render. Depend on the individual refs instead.
4. **withChristmasSchedule.** `campaignYear = 2026` is right for this season. Leave a comment saying to change it next year.

**Still to do, in this order:**

1. **Lineup collection and slugs.**
   - Don't give the "Lineup 2027" collection its own detail pages. Six "Classified" placeholder pages would be thin content that Google indexes.
   - Add a Link field, "Aircraft page", to the collection instead.
   - Classified cards don't link anywhere. Give them slugs `classified-1` to `classified-6`.
   - When an act is revealed:
     - create its page in the existing aircraft collection, with the slug `<aircraft-name>-headcorn-airshow-2027` (lowercase, hyphens);
     - set the card's status to Revealed and point "Aircraft page" at it.
   - Never change the slugs of existing aircraft pages.
2. **Ticket cards** (PART 3 item 5).
   - Make each whole card one tap target, with the price in the display font.
   - Add one plain line of what you get.
   - Add an "Instant e-ticket" line on every card.
   - Add a "Best for families" tag on General Admission.
   - Leave out "Limited places" until it's confirmed.
3. **Gifting banner.** "Every ticket is an e-ticket. Buy now, give it on Christmas Day." Put it at the top of every page, using withChristmasSchedule.
4. **Mobile buy bar.** "26-27 June 2027 / Get tickets". It goes in the shared layout and shows on every page except /tickets. Leave room at the bottom of each page so it never covers the footer links or the cookie banner.
5. **Responsive check** at 390px, 768px and 1280px. Look for:
   - no horizontal scrolling;
   - tap targets at least 44px;
   - the hero button above the fold on a 390px phone.
6. **Older body copy.** Search every page for prices and claims, and keep only the ones on this list:
   - **Confirmed:**
     - General Admission from £30
     - Fighter Row from £75
     - Mustang Lounge from £140
     - Futures & Arrivals Day £7.50, free for veterans
     - 5 and under free
     - carers at the child rate, for one carer per disabled visitor
     - e-tickets only, no gate sales
     - the 2026 numbers in the CONTEXT block
   - **Not confirmed. Remove these, or replace them with "See tickets for prices":**
     - child prices, family tickets and weekend tickets
     - "limited places"
     - any 2027 aircraft or act
     - any "early bird", tier or price-rise wording
     - any review, quote or press logo
   - List every line you removed or changed, so it can be checked.
7. Then do **PART 4** (/history, /facts, the FAQ rewrite), **PART 5** (fine print), **PART 6** (structured data) and **PART 8** (arrivals board, radar and boarding pass) from `astra-prompt.md`.
8. **Image SEO.**
   - Give every image descriptive alt text: what's in the photo, with the aircraft type and "Headcorn" where true. Use the table below for photos from the pack. For the site's existing photos, write alt text in the same style.
   - Decorative shapes, textures and the blurred classified image get empty alt.
   - Don't put keywords in the alt text that the photo doesn't show.

**Alt text for the image pack:**

| File | Alt text |
|---|---|
| spitfire-spirit-of-kent-cockpit.jpg (and its hero crops) | Spitfire Spirit of Kent with its propeller turning and the pilot in the cockpit |
| spitfire-spirit-of-kent-flypast.jpg (and its hero crops) | Spitfire Spirit of Kent banking overhead |
| mustang-overhead-invasion-stripes.jpg (and its hero crops) | P-51 Mustang overhead showing its invasion stripes |
| mustang-marinell-banking.jpg | P-51 Mustang Marinell banking in a blue sky |
| aerobatic-smoke-pass.jpg | An aerobatic aircraft trailing smoke |
| helicopter-in-flight.jpg | A helicopter in flight at Headcorn |
| mustang-qi-polished-nose.jpg | Polished aluminium and propeller of a P-51 Mustang marked QI |
| mustang-jersey-jerk-low.jpg | P-51 Mustang Jersey Jerk from a low angle on the grass |
| mustang-jersey-jerk-taxi.jpg | P-51 Mustang Jersey Jerk taxiing with its propeller turning |
| spitfire-takeoff-run.jpg | Spitfire on its take-off run, propeller blurred |
| spitfire-cockpit-instruments.jpg | Inside a Spitfire cockpit |
| catalina-head-on.jpg | PBY Catalina flying boat head-on on the grass |
| catalina-and-jeeps.jpg | A Catalina behind a line of wartime jeeps and re-enactors |
| wartime-truck-and-spitfire.jpg | A wartime truck parked beside a Spitfire |
| mustang-with-visitors.jpg | Visitors close to a P-51 Mustang on the airfield |
| headcorn-from-the-air-busy-day.jpg | Headcorn Aerodrome from the air on a busy show day |
| catalina-sunset.jpg | A Catalina on the airfield at sunset |
| og-share.jpg | (social image, no alt needed) |

Don't publish. When you finish, list what you changed, page by page, and anything still marked [CONFIRM].
