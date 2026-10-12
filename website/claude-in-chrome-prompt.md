# Prompt for Claude in Chrome: finish the headcornairshow.com update in Framer

**Before you start (you, not Claude):**
1. In Chrome, sign in to Framer and open the headcornairshow.com project. Duplicate it first (Project menu > Duplicate) if you want a safe copy to compare against.
2. Upload `og-share.jpg` yourself, as the Social Image in Site Settings and on the Home and Tickets pages. Claude in Chrome can't pick files from your computer.
3. Paste everything below the line into Claude in Chrome. If it's too long for the box, paste it in two halves: up to "REFERENCE", then the rest.

---

You are working in my Framer editor, in this Chrome window, to finish an update to headcornairshow.com, the website for the Headcorn International Airshow. Another AI (Framer's GPT Astra) did part of the work and then ran out of credits. Pick up where it stopped.

## Rules (follow these strictly)

- **Never press Publish.** Leave everything as an unpublished draft for me to review.
- **Don't do anything irreversible or account-level:**
  - Don't delete pages, CMS collections or CMS items.
  - Don't change the domain, plan, billing, integrations or team settings.
  - Don't buy credits.
  - Don't sign in or out of anything.

  If a dialog asks for payment, permissions or confirmation of a deletion, stop and ask me.
- Don't change any booking link (Ticketflex, Weeztix, Polar Helicopters, shop.headcornairshow.com) or the URL slug of any existing page or CMS item.
- Use only the facts in the CONTEXT section. Never invent aircraft, prices, reviews, quotes or press logos. If something needs a fact you don't have, leave it out and add it to your report as [CONFIRM].
- Writing style: British English, hyphens only and never em dashes. The CONTEXT section lists the words never to use.
- Work in small steps. After each one, check it in Framer's preview, at both desktop width and the 390px mobile breakpoint.
- Framer autosaves, so keep a running log of every change, page by page. Give it to me at the end.
- If the Framer UI doesn't let you do something cleanly, skip it, note it in the log, and move on. Don't fight the editor.

## Task order (easiest and most valuable first)

1. **Check the existing work.** Open the Home and Tickets pages in preview. Confirm these are present and working, and fix only what's broken:
   - the hero zoom, pulse dot and labelled countdown
   - the stats sequence
   - the lineup grid with the inline sign-up
   - the ticket finder, with no price totals
   - the day planner
2. **Fix the code file.** In Assets > Code, open `HeadcornMotion.tsx`:
   - In `useMergedRefs`, change the `useCallback` dependency list from `[refs]` to `refs`.
   - In `withChristmasSchedule`, add the comment `// Change to 2027 next season` next to `const campaignYear = 2026`.
   - **Zoom override:** on the Home page, check which layer the `withHeroZoom` override is attached to. If it's on a frame that holds the headline or button, move it to the hero image layer only.
   - **Header button:** view the desktop page scrolled to the very top. If the header "GET TICKETS" button is hard to read (white text on a light header), edit `withHeaderTicketScroll` so that before scrolling it uses `color: "#0A1543"`, with a red border, on a transparent background. After scrolling past the hero it stays white on solid red.
   - Save, and check that the preview still loads.
3. **The rest of PART 3,** as described under "Still to do" in the REFERENCE (from item 1, lineup slugs, to item 5, the responsive check).
4. **SEO fields.** For every page in the PART 1 table, open Page Settings and set the title and description. Then make sure the page has exactly one H1 with the listed text: change any extra H1 to H2 in the text style or tag settings.
5. **Clean up the old copy** (item 6 under "Still to do"). Search every page for prices and claims.
6. **Alt text.** Select each image and set its Alt Text in the right-hand panel, using the table in the REFERENCE. Write similar alt text for any image that isn't in the table.
7. **New pages and fine print.**
   - Create /history and /facts from PART 4, and rewrite the FAQ.
   - Then do the PART 5 fine print and footer. Leave the company number and registered office as [CONFIRM] if you can't find them on the site.
8. **Structured data.** Paste the PART 6 JSON-LD:
   - the site-wide block into Site Settings > General > Custom Code > End of `<head>`;
   - the others into each page's Page Settings > Custom Code.

   First, delete any existing 2026 Event JSON-LD block. Replace `[LOGO-URL]`, `[HERO-16x9]` and `[OG-SHARE]` with the real hosted image URLs. You can find them by right-clicking the image in Assets or by inspecting the published page.
9. **Only if time allows:** the PART 8 redesign (arrivals board, radar, boarding pass). It's the most visual job. If it goes badly, stop, and tell me what got done.

**Finish** with a report covering:
- what you changed, page by page;
- anything you skipped and why;
- every [CONFIRM] item;
- anything in the preview that looks broken.

Remember: don't publish.

---

# REFERENCE

## CONTEXT

You are editing headcornairshow.com, the official website of the Headcorn International Airshow, built in Framer.

Goals, in priority order:
1. Sell tickets.
2. Rank on Google for airshow searches in Kent, the South East and the UK.
3. Be the clearest, most quotable source of facts about the show for AI assistants.

FACTS. Use these exactly. Never invent aircraft, acts, prices, quotes, reviews or numbers.
- Name: Headcorn International Airshow 2027.
- Dates: Saturday 26 and Sunday 27 June 2027. Futures & Arrivals Day is Friday 25 June 2027.
- Venue: Headcorn Aerodrome (historically Lashenden), Shenley Road, Headcorn, Ashford, Kent TN27 9HX. Near Maidstone and Ashford.
- Hours:
  - Car parks open 9am. Gates and the ground show open 10am.
  - Show 10am to 6pm.
  - Flying from about noon.
- Tickets:
  - General Admission from £30.
  - Children 5 and under go free with an adult.
  - Fighter Row (flightline seats) from £75.
  - Mustang Lounge (VIP hospitality) from £140.
  - Futures & Arrivals Day £7.50, free for veterans.
  - [CONFIRM family and weekend prices].
  - Carer tickets are at the child rate, for one carer per disabled visitor.
- Every ticket is an e-ticket, issued instantly. Advance tickets only. There are no sales on the gate.
- The 2026 show had 4 Hurricanes, 30+ aircraft from 18 operators across four countries, 20+ WWII veterans, defence attachés from two nations, and an RAF Chinook for Armed Forces Day. More nations' defence attachés are expected in 2027. [CONFIRM which two nations, and whether they can be named.]
- 2027: a bigger show. The theme is still secret. Headline acts are announced in the new year.
- History: In 1943-44 the airfield was Lashenden Advanced Landing Ground. It was home to the US 354th Fighter Group, the first group to fly the P-51B Mustang in combat, on long-range escort missions into Germany. [CONFIRM the "first group" wording against the heritage article before publishing.]
- Rules: Photography is welcome. Drones are banned.
- Organiser: AMP Productions Limited.
- Social:
  - instagram.com/headcornairshow
  - facebook.com/headcornairshow
  - tiktok.com/@headcornairshow

VOICE:
- Use British English, short declarative sentences and concrete facts.
- Use hyphens only, never em dashes.
- Never use "unforgettable", "iconic", "don't miss out", "early bird", "world-class", "best in the UK" or "biggest".
- Never mention prices going up, price tiers, or deadlines.
- The only urgency allowed is true urgency:
  - "Advance tickets only. No sales on the gate."
  - "Fighter Row and Mustang Lounge places are limited." [CONFIRM]
  - "Headline acts announced in the new year. Sign up to hear first."
- Name aircraft types for 2027 only once they're confirmed. Until then, say "last year" or "in 2026" when you name an aircraft.

BRAND:
- Red #D40F0F is the only accent. Navy #0A1543 is for type and dark panels.
- Use the existing condensed display font, in capitals, for headings.
- Photography credit: "Photography: James Hill". It goes once, in the footer.

DO NOT CHANGE:
- booking link destinations (Ticketflex, Weeztix, Polar Helicopters, shop.headcornairshow.com)
- URL slugs of existing pages and CMS items. Changing them breaks Google rankings and inbound links.


## PART 1: Page titles, meta descriptions and headings (Google)

Set these in each page's SEO settings. Use one H1 per page, and change every other H1 to H2 or body text. Titles stay under 60 characters and descriptions under 155. Each page's open graph image is `og-share.jpg` unless stated.

| Page | Title tag | Meta description | H1 |
|---|---|---|---|
| / | Headcorn International Airshow 2027 \| Kent, 26-27 June | A WW2 warbird airshow at Headcorn Aerodrome, Kent. Flying displays, a full ground show and family day out. 26-27 June 2027. Tickets from £30. | HEADCORN INTERNATIONAL AIRSHOW 2027 |
| /tickets | Airshow Tickets 2027 \| Headcorn International Airshow | Tickets for the Headcorn International Airshow, 26-27 June 2027, Kent. General Admission from £30, under 5s free. E-tickets, issued instantly. | TICKETS ON SALE NOW |
| /general-admission | General Admission \| Headcorn Airshow 2027, Kent | A full day of flying displays and the ground show at Headcorn Aerodrome, Kent. Adults from £30, under 5s free. Advance e-tickets only. | GENERAL ADMISSION |
| /fighter-row | Fighter Row Flightline Seats \| Headcorn Airshow 2027 | Reserved seats on the flightline, right by the warbirds as they start up and taxi. Headcorn International Airshow, Kent, 26-27 June 2027. | FIGHTER ROW |
| /mustang-lounge | Mustang Lounge VIP Hospitality \| Headcorn Airshow | VIP airshow hospitality in Kent. Private lounge, catering and prime views of the flying. Headcorn International Airshow, 26-27 June 2027. | MUSTANG LOUNGE |
| /futures and /arrivals | Futures & Arrivals Day, Fri 25 June 2027 \| Headcorn | Watch the display aircraft fly in the day before the airshow. £7.50, free for veterans. Headcorn Aerodrome, Kent, Friday 25 June 2027. | FUTURES & ARRIVALS DAY |
| /confirmed-aircraft | Aircraft at Headcorn Airshow 2027 \| Warbirds & Displays | The aircraft confirmed for the Headcorn International Airshow 2027, and the 2026 lineup: Spitfires, Hurricanes, Mustangs and more. | THE AIRCRAFT |
| /ground-show | Airshow Ground Show \| Vehicles, Food & Stands, Kent | Wartime vehicles, re-enactors, international car displays, food and trade stands at the Headcorn International Airshow, Kent. | THE GROUND SHOW |
| /camping | Airshow Camping in Kent \| Headcorn International Airshow | Camp at Headcorn Aerodrome for the airshow weekend, 26-27 June 2027. Wake up next to the airfield. [CONFIRM facilities] | CAMPING |
| /parking | Getting to Headcorn Airshow \| Parking & Directions | How to get to Headcorn Aerodrome, Kent TN27 9HX. Car parks open 9am. Directions by car and train from London. | GETTING HERE |
| /faq | Headcorn Airshow FAQ \| Times, Tickets, Parking | Opening times, tickets, children, parking, accessibility, cameras and drones at the Headcorn International Airshow 2027. | QUESTIONS |
| /volunteer | Volunteer at an Airshow in Kent \| Headcorn Airshow | Join the volunteer team at the Headcorn International Airshow 2027, Headcorn Aerodrome, Kent. | VOLUNTEER |
| /trade-stands | Airshow Trade Stands 2027 \| Headcorn International Airshow | Book a trade or food stand at the Headcorn International Airshow, Kent, 26-27 June 2027. | TRADE STANDS |
| /contact | Contact \| Headcorn International Airshow | Contact the Headcorn International Airshow team, Headcorn Aerodrome, Kent. | CONTACT |
| /history (new, PART 4) | Lashenden: Headcorn Aerodrome's WW2 History | In 1944 this Kent airfield was Lashenden, home of the US 354th Fighter Group and its P-51B Mustangs. The story behind the airshow. | THE MUSTANGS OF LASHENDEN |
| /facts (new, PART 4) | Headcorn International Airshow 2027: Key Facts | Dates, venue, tickets, opening times and what to expect at the Headcorn International Airshow 2027, Kent. Updated [date]. | KEY FACTS |

Also:
- **Alt text.** Every image gets descriptive alt text, using the `web-images/manifest.csv` alt column. Decorative shapes get empty alt.
- **Link text.** Write descriptive link text such as "See Fighter Row tickets", never "Click here" or "Read more".
- **Headings below the H1.** H2s carry the search phrases naturally. Examples:
  - "A WW2 airshow in the heart of Kent"
  - "Flying displays from noon"
  - "A family day out in Kent"
  - "Getting to Headcorn from London"
- **CMS fields.** Give the aircraft and news collections their own SEO title and description fields, and bind them in the CMS page settings.


## PART 2: Words that search engines and AI pick up (home page copy)

Add this as body text on the home page, under the hero and stats. It's real text, never text baked into an image, and it reads naturally:

> **A WW2 warbird airshow in the heart of Kent.**
> The Headcorn International Airshow takes place on 26 and 27 June 2027 at Headcorn Aerodrome, between Maidstone and Ashford. Historic aircraft fly where they flew from in 1944, when this field was Lashenden, home of the 354th Fighter Group and its P-51 Mustangs.
>
> In 2026 the show brought 4 Hurricanes, more than 30 aircraft from 18 operators across four countries, over 20 Second World War veterans, and defence attachés from two nations to one field in Kent. 2027 goes bigger. The theme is still under wraps, and the headline acts are announced in the new year.
>
> Flying displays start around noon. On the ground there are wartime vehicles, re-enactors, international car displays, food and trade stands, helicopter flights and jeep rides. Children aged 5 and under go free. Every ticket is an e-ticket, sold in advance only.

Then a strip of plain-text "fact chips" (small caps, separated by dots). This is text, not an image:
`26-27 JUNE 2027 · HEADCORN AERODROME, KENT · FLYING FROM NOON · UNDER 5S FREE · ADVANCE E-TICKETS ONLY`

Search phrases to use naturally across the site, at most once or twice each per page:
- airshow Kent 2027; Kent airshow
- UK airshows 2027; airshow June 2027
- WW2 airshow; Second World War aircraft
- warbirds; Spitfire flying display; Hawker Hurricane; P-51 Mustang
- vintage aircraft; historic aviation
- family day out in Kent; things to do in Kent in June; days out near Maidstone
- airshow near London
- VIP airshow hospitality; airshow camping; airshow tickets


## Facts confirmed since the main brief, and Still to do (from the resume prompt)

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
2. **Ticket cards** (PART 3, item 5 of the original brief).
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
7. Then do **PART 4** (/history, /facts, the FAQ rewrite), **PART 5** (fine print), **PART 6** (structured data) and **PART 8** (arrivals board, radar and boarding pass) (all in this REFERENCE).
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


## PART 4: New pages that rank and get quoted

1. **/history: "The Mustangs of Lashenden".**
   - Move and expand the heritage article into a proper page. Keep the old news post and link it to the new page.
   - Cover:
     - The airfield was surveyed in 1941-42 and accepted as an Advanced Landing Ground in July 1943.
     - The 354th Fighter Group flew the P-51B from here on long-range escort missions.
     - Today the same field hosts the airshow.
   - Add a "Then and now" image pair, and finish with the ticket band.
   - This page earns links from history and aviation sites. Google and AI assistants reward that kind of unique story.
2. **/facts: "Key facts".**
   - Make a plain, scannable page that an AI assistant or journalist can quote. Use a definition list of:
     - name; dates; venue and postcode
     - opening times; flying times
     - ticket types and prices; under 5s free; e-tickets and advance only
     - organiser
     - 2026 in numbers
     - 2027 status (theme secret, headline acts in the new year)
     - history (Lashenden, 354th FG)
     - social links; press contact
   - Put "Last updated: [date]" at the top, and update it whenever a fact changes.
   - Link to it from the footer as "Key facts" and from the FAQ.
3. **FAQ rewrite (/faq).** One question per H3, with a 1-3 sentence direct answer that starts with the answer:
   - When is the Headcorn International Airshow 2027? *Saturday 26 and Sunday 27 June 2027, with Futures & Arrivals Day on Friday 25 June.*
   - Where is it? *Headcorn Aerodrome, Shenley Road, Headcorn, Kent TN27 9HX, between Maidstone and Ashford.*
   - What time does it start and finish?
   - When does the flying start?
   - How much are tickets? Do children go free?
   - Can I buy tickets on the gate? *No. Tickets are advance only, as e-tickets.*
   - Which aircraft are flying in 2027? *Headline acts are announced in the new year. In 2026 the show had 4 Hurricanes and 30+ aircraft from 18 operators.*
   - Is it a good day out for families?
   - How do I get there from London? *[CONFIRM train: London to Headcorn station, plus the distance or shuttle to the aerodrome.]*
   - Is there parking? Is there camping?
   - Is it accessible? What about carers?
   - Can I bring a camera? A drone? Dogs? [CONFIRM dogs]
   - What happens if the weather is bad? [CONFIRM policy]
   - What is Fighter Row? What is the Mustang Lounge?
   - Is there food and drink?

   Remove the duplicate questions. Keep every fact consistent with /facts.
4. **Aircraft CMS for 2027.** When an act is confirmed, add it to the Lineup 2027 collection.
   - The URL is `/collection/<aircraft-name>-headcorn-airshow-2027`.
   - The title is "<Aircraft> at Headcorn International Airshow 2027".
   - Write a 150-300 word page: what it is, its history, why it matters, and when it flies.
   - Each one ranks for "<aircraft> airshow 2027" searches, which people do run.


## PART 5: Fine print and housekeeping

1. **Fix 2026 references.**
   - Change every "2026" that should be "2027".
   - Leave genuine 2026 references, such as "the 2026 show had..." and the archive.
   - On /confirmed-aircraft, add a "2026 LINEUP" heading above the existing aircraft. Rename the old CMS items' SEO titles to "... at Headcorn International Airshow 2026". Keep the slugs.
2. **Footer, every page:**
   - "Headcorn International Airshow is organised by AMP Productions Limited. Registered in England and Wales, company number [CONFIRM]. Registered office: [CONFIRM]." This is a legal requirement for UK company websites.
   - © 2027 Headcorn International Airshow.
   - Links: Key facts · FAQ · Terms · Privacy · Cookies · Contact.
   - Photography: James Hill.
   - Instagram, Facebook and TikTok icons, with aria-labels.
3. **Privacy and cookies.**
   - Add a Privacy Policy page and a cookie banner that blocks Google Analytics, Google Ads and the Meta Pixel until the visitor accepts. UK law (PECR) requires consent before these run.
   - Turn on Framer's cookie banner, or use a consent tool with Google Consent Mode v2. Without Consent Mode, Google Ads loses conversion data.
4. **Terms & conditions.**
   - Update the year.
   - Make the ticket types match what's on sale: remove "By the Biplanes", which isn't sold.
   - Add the weather and cancellation wording. [CONFIRM]
5. **Accessibility.** Run these checks (they help Google too):
   - Text contrast is at least 4.5:1 on every image overlay.
   - Buttons have text.
   - Form fields have labels.
   - Pages work with a keyboard.
   - The site has a language of en-GB.


## PART 6: Structured data (paste into Page Settings > Custom Code > End of head)

Use one block per page, as shown. Replace the `[CONFIRM]` values first, and replace the image URLs with the hosted Framer URLs. Then test every page at https://search.google.com/test/rich-results and https://validator.schema.org.

**Site-wide (Site Settings > Custom Code > head):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://headcornairshow.com/#org",
      "name": "Headcorn International Airshow",
      "legalName": "AMP Productions Limited",
      "url": "https://headcornairshow.com/",
      "logo": "https://headcornairshow.com/[LOGO-URL].png",
      "sameAs": [
        "https://www.instagram.com/headcornairshow/",
        "https://www.facebook.com/headcornairshow",
        "https://www.tiktok.com/@headcornairshow"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://headcornairshow.com/#website",
      "name": "Headcorn International Airshow",
      "url": "https://headcornairshow.com/",
      "inLanguage": "en-GB",
      "publisher": { "@id": "https://headcornairshow.com/#org" }
    },
    {
      "@type": "Place",
      "@id": "https://headcornairshow.com/#venue",
      "name": "Headcorn Aerodrome",
      "alternateName": "Lashenden (Headcorn) Aerodrome",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shenley Road",
        "addressLocality": "Headcorn",
        "addressRegion": "Kent",
        "postalCode": "TN27 9HX",
        "addressCountry": "GB"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 51.157, "longitude": 0.645 }
    }
  ]
}
</script>
```

[CONFIRM the latitude and longitude by dropping a pin on the main gate in Google Maps.]

**Home and /tickets (the event). Delete the old 2026 Event block first:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Festival",
  "@id": "https://headcornairshow.com/#event2027",
  "name": "Headcorn International Airshow 2027",
  "description": "A WW2 warbird airshow at Headcorn Aerodrome, Kent: flying displays, a ground show of wartime vehicles and re-enactors, food and trade stands. Children 5 and under go free.",
  "startDate": "2027-06-26T10:00:00+01:00",
  "endDate": "2027-06-27T18:00:00+01:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": { "@id": "https://headcornairshow.com/#venue" },
  "image": [
    "https://headcornairshow.com/[HERO-16x9].jpg",
    "https://headcornairshow.com/[OG-SHARE].jpg"
  ],
  "organizer": { "@id": "https://headcornairshow.com/#org" },
  "performer": { "@type": "PerformingGroup", "name": "Display pilots and historic aircraft operators, to be announced" },
  "isAccessibleForFree": false,
  "typicalAgeRange": "0-99",
  "keywords": "airshow, Kent airshow, WW2 aircraft, warbirds, Spitfire, Hurricane, P-51 Mustang, family day out, UK airshows 2027",
  "offers": [
    { "@type": "Offer", "name": "General Admission (adult, one day)", "price": "30.00", "priceCurrency": "GBP", "availability": "https://schema.org/InStock", "validFrom": "2026-10-01", "url": "https://headcornairshow.com/general-admission" },
    { "@type": "Offer", "name": "Fighter Row", "price": "75.00", "priceCurrency": "GBP", "availability": "https://schema.org/InStock", "validFrom": "2026-10-01", "url": "https://headcornairshow.com/fighter-row" },
    { "@type": "Offer", "name": "Mustang Lounge", "price": "140.00", "priceCurrency": "GBP", "availability": "https://schema.org/InStock", "validFrom": "2026-10-01", "url": "https://headcornairshow.com/mustang-lounge" }
  ],
  "subEvent": [
    {
      "@type": "Event",
      "name": "Futures & Arrivals Day 2027",
      "startDate": "2027-06-25",
      "endDate": "2027-06-25",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@id": "https://headcornairshow.com/#venue" },
      "url": "https://headcornairshow.com/futures",
      "offers": { "@type": "Offer", "price": "7.50", "priceCurrency": "GBP", "availability": "https://schema.org/InStock", "url": "https://headcornairshow.com/futures" }
    }
  ]
}
</script>
```

Notes on this block:
- The `"performer"` placeholder is there because Google flags a missing performer. Replace it with the real headline act names when they're announced.
- **Never add `aggregateRating` or review markup.** Google penalises self-served star ratings on your own site.

**/faq: FAQPage.**
- Add one `Question` per FAQ item, with the same wording as the page.
- Google now only shows FAQ rich results for a few sites, so don't expect stars or dropdowns in search. AI crawlers and Bing still read the markup.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "When is the Headcorn International Airshow 2027?", "acceptedAnswer": { "@type": "Answer", "text": "Saturday 26 and Sunday 27 June 2027 at Headcorn Aerodrome, Kent, with Futures & Arrivals Day on Friday 25 June." } },
    { "@type": "Question", "name": "Can I buy tickets on the gate?", "acceptedAnswer": { "@type": "Answer", "text": "No. Tickets are sold in advance only, as e-tickets issued instantly at headcornairshow.com/tickets." } },
    { "@type": "Question", "name": "Do children go free?", "acceptedAnswer": { "@type": "Answer", "text": "Children aged 5 and under go free with an adult ticket." } }
  ]
}
</script>
```

Add the remaining questions in the same pattern.

**Every inner page: BreadcrumbList.** For example, on /fighter-row:

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
 {"@type":"ListItem","position":1,"name":"Home","item":"https://headcornairshow.com/"},
 {"@type":"ListItem","position":2,"name":"Tickets","item":"https://headcornairshow.com/tickets"},
 {"@type":"ListItem","position":3,"name":"Fighter Row","item":"https://headcornairshow.com/fighter-row"}]}
</script>
```


## PART 8: Replace the flat "LAST JUNE" and "WHAT'S NEXT" sections (international look)

See `website/mockups/international-mobile.png` and `international-desktop.png` for the target. The working code is in `international.html`. Build it natively in Framer so the text stays crawlable. Remove the current white "LAST JUNE" stats block and the "WHAT'S NEXT" panel, and put these in their place, full width with no white margins:

1. **Welcome ticker.**
   - A red (#D40F0F) strip, 44px tall, scrolling slowly right to left in a loop.
   - Words, in white bold condensed capitals with a small plane icon between each: WELCOME · BIENVENUE · WILLKOMMEN · WELKOM · BENVENUTI · VELKOMMEN · WITAMY · BIENVENIDOS · HEADCORN · 26-27 JUNE 2027.
   - Mark it aria-hidden.
2. **Arrivals board** (replaces the stats wall).
   - **Background:** very dark navy (#050A24), with a faint 80px grid and a huge outlined "EGKH" (Headcorn's airfield code) at 6% opacity behind.
   - **Small caps label:** "HEADCORN AERODROME · EGKH · ARRIVALS".
   - **H2:** "LAST JUNE." in white, then "ONE FIELD IN KENT." in red, very large.
   - **Right-hand label:** "NEXT ARRIVALS" with "26 JUN 2027" in a monospace font (JetBrains Mono), amber.
   - **The board:** an airport arrivals board with the columns FLIGHT / ARRIVAL / STATUS.
     - The ARRIVAL text is split-flap tiles: one dark tile per letter, with a thin hinge line across the middle.
     - When the board scrolls into view, each tile spins through random letters for about a second and lands on the real text, left to right.
     - Turn the spin off for prefers-reduced-motion.
     - Rows:
       - HIA 26 · 4 HURRICANES · LANDED (grey outline)
       - HIA 26 · 30+ AIRCRAFT · LANDED
       - HIA 26 · 18 OPERATORS · LANDED
       - HIA 26 · 20+ VETERANS · LANDED
       - HIA 26 · 2 DEF ATTACHÉS · LANDED
       - HIA 27 · THE THEME · CLASSIFIED (solid red)
       - HIA 27 · HEADLINERS · NEW YEAR (amber outline)
       - HIA 27 · MORE NATIONS · INBOUND (red outline with a blinking red dot)
     - The 2027 rows have amber letters.
   - **On mobile:** hide the header row, put FLIGHT and STATUS on one line, and put the tiles full width beneath.
   - **Line under the board:** "2026: defence attachés from two nations. Operators from four countries. An RAF Chinook for Armed Forces Day." On the right: "2027 GOES BIGGER."
   - Make the board a CMS collection ("Arrivals", with the fields flight, text, status and style). Then each announcement in the new year is just a change of status from CLASSIFIED to the act's name.
3. **Radar** (replaces "WHAT'S NEXT").
   - Navy (#0A1543) section in two columns, stacked on mobile.
   - **Left: a circular radar.**
     - `headcorn-from-the-air-busy-day.jpg`, cropped to a circle and darkened towards the edge.
     - Thin white range rings and crosshairs at 20% opacity.
     - A red sweep rotating every 5 seconds.
     - A white diamond in the centre for Headcorn.
     - Three pulsing red blips, each labelled in monospace on a dark tag: "THE THEME / CLASSIFIED", "HEADLINE ACTS / NEW YEAR", "NATIONS / INBOUND".
     - Text at the bottom: "51°09'N 000°38'E · HEADCORN".
   - **Right: the copy.**
     - Small caps "WHAT'S NEXT".
     - H2 "ON THE RADAR FOR 2027.", with 2027 in red.
     - The line "A bigger show. More nations inbound. The theme stays classified, and the headline acts land in the new year. Get the news before anyone else."
4. **Boarding pass sign-up** (replaces the current sign-up form). A white ticket card with rounded corners and two half-circle notches cut where a dashed tear line separates the stub.
   - **Main part:**
     - "BOARDING PASS", with "HIA 27" in red.
     - A route: FROM "ANYWHERE" ···✈··· TO "EGKH".
     - Monospace fields: DATE 26 JUN 27 · SHOW 10:00 · FLYING 12:00 · CLASS FIRST TO KNOW.
     - The email field and a full-width red "GET ON THE LIST" button.
     - The SMS tick box: "Text me show news and on-the-day updates too."
   - **Stub:** "SEAT / YOURS" and a barcode pattern.
   - Keep the existing Mailchimp connection and fields.
5. **End** with the red "TICKETS ON SALE NOW." band from PART 2.

Amber (#FFC23D) appears only on the arrivals board, because departure boards are amber. If you want red as the only accent everywhere, make those letters white instead.
