# Prompt for GPT Astra: headcornairshow.com for sales, Google and AI search

What this does, in order of how much money it makes:
1. **Sales.** Gives every page a reason to buy now and a ticket button that is always in reach. It does this without price-rise or "early bird" talk.
2. **Google.** Fixes the 2026 metadata, gives every page one H1, adds full structured data, and writes copy around the words people actually search for.
3. **AI answers (ChatGPT, Claude, Perplexity, Google AI Overviews).** Publishes a clean, citable fact sheet and Q&A, so an assistant asked "best airshows in the UK 2027" has accurate Headcorn facts to quote.

**An honest caveat.** No prompt can guarantee a Google ranking or a ChatGPT mention. Both mostly reward two things:
- other sites talking about you (press, listings, reviews, links);
- clear facts that agree everywhere they appear.

This prompt fixes everything on the site. The off-site checklist at the end does the rest, and it matters just as much. Don't stuff keywords or invent "best in the UK" claims. Google demotes keyword stuffing, and AI assistants ignore unsupported superlatives. Specific, true facts win.

## How to use it

- Work on a duplicate or branch. Paste the **CONTEXT** block, then **one PART at a time**, and check each before moving on.
- Fill every `[CONFIRM]` before you publish. If you can't confirm something, delete the line rather than guess.
- This assumes the Framer AI first pass and PASS 2 (`framer-ai-prompt.md`) are done. Where they overlap, this file wins.

### What I found on the live site (12 Oct 2026)

- **Meta descriptions:**
  - Home and tickets still say "27-28th June 2026".
  - The home description has an em dash.
  - The FAQ description is just "Official website for the Headcorn International Airshow."
- **Title tags:**
  - Home is only "Headcorn International Airshow" (no year, place or dates).
  - The tickets title is "Buy Official Tickets" (no brand).
  - The confirmed aircraft title is "2026 CONFIRMED AIRCRAFT".
- **H1s:**
  - Several pages have two H1s; the ground show repeats "THE GROUND SHOW".
  - On confirmed aircraft, a 15px disclaimer line is tagged as an H1.
- **Ticket types:** The T&Cs list a "By the Biplanes" ticket that isn't sold. Remove it.
- **Legal:** The T&Cs don't show the company number or registered office. UK company websites must show both (see PART 7).
- **robots.txt:** Allows everything, including AI crawlers, and has a sitemap. Good, keep it.
- **2026 aircraft pages:** There are 10 CMS pages (Spitfire N3200, Seafire XVII, Sabre and others). They're indexed and probably have inbound links. Keep them all. Re-label them as the 2026 archive (PART 5).
- **Heritage article:** The site's own heritage article confirms the airfield was Lashenden Advanced Landing Ground, home of the 354th Fighter Group flying P-51B Mustangs. That's the strongest story the site has. It's buried in a news post.

---

## CONTEXT (paste at the top of every part)

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
  - Gates and car parks open 9am.
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

---

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

---

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

---

## PART 3: Make it dynamic and built to sell

1. **The hero.** Keep the Spitfire hero from the first pass. Add:
   - a slow 6% zoom on the image (Ken Burns, 12 seconds, once, no loop);
   - the countdown with DAYS / HRS / MINS / SECS labels;
   - a pulsing red dot with "TICKETS ON SALE NOW" above the headline.
   - Respect `prefers-reduced-motion`: turn the motion off for anyone who has asked for it.
2. **Stat counters.** The "LAST JUNE" stats wall counts up when it scrolls into view: 4 HURRICANES, 30+ AIRCRAFT, 18 OPERATORS, 20+ WWII VETERANS. The last line, "2027 GOES BIGGER.", slams in red after the counters finish.
3. **The lineup reveal.** Add a section, "THE 2027 LINEUP", as a 3x2 grid of cards. Build it from a new CMS collection, "Lineup 2027", with these fields:
   - name
   - image
   - status (Classified or Revealed)
   - one-line fact
   - reveal date

   How the cards behave:
   - **Classified cards** show a blurred, darkened aircraft silhouette (use `aerobatic-smoke-pass.jpg` heavily blurred) and a red "CLASSIFIED" stamp. Underneath, a line says "Revealed in the new year".
   - **Revealed cards** flip on hover or tap to show the aircraft photo and its one-line fact, and link to the aircraft's CMS page.
   - Under the grid: "Be first to know. Get each reveal by email." Add an email field with "Tell me first", wired to the Mailchimp form.

   Every reveal becomes a reason to email, post, and bring people back to the site.
4. **The ticket finder.** On /tickets, above the cards, add a 3-tap selector: "Who's coming?" with Adults (number), Children 6-15 (number), Under 5s (number), and "How close do you want to be?" with three answers: "Anywhere on the crowd line", "On the flightline", "VIP". It recommends one ticket (General Admission, Fighter Row or Mustang Lounge), shows the total from the confirmed prices, and gives a red "Book these tickets" button to that ticket's booking link. Under 5s show as "Free". [CONFIRM child and family prices before turning on the totals. Until then, show the recommendation without a total.]
5. **Ticket cards.**
   - Make each card one large tap target. Put the price in the display font.
   - Add a single line of what you get in plain words.
   - Add a "Limited places" tag on Fighter Row and Mustang Lounge only. [CONFIRM capacity is limited.]
   - Add an "Instant e-ticket" icon line on every card.
   - Add a "Best for families" tag on General Admission.
6. **Sticky buy bar.**
   - On mobile, "26-27 June 2027 / Get tickets" shows on every page except /tickets.
   - On desktop, the header "GET TICKETS" button turns solid red once you scroll past the hero.
7. **Day planner.** Add a "YOUR DAY AT HEADCORN" timeline as a horizontal scroll on mobile:
   - 9am car parks open
   - 10am gates open and the ground show starts
   - noon flying begins
   - 6pm show closes
   - Each step has a photo from the image pack.

   It answers the question everyone has before they buy: "what does the day look like?"
8. **Real social proof only.**
   - Add a strip of 3 short quotes from real Google or Facebook reviews of the 2026 show, with first name and initial. [Paste real quotes. Don't invent any. If there are none yet, leave the strip out.]
   - Add a strip of "as featured in" logos only for outlets that genuinely covered the show. [CONFIRM]
9. **Gifting line.** From 1 November to 24 December, show a slim banner: "Every ticket is an e-ticket. Buy now, give it on Christmas Day." Schedule it with a Framer variant or CMS toggle so it can be switched off.
10. **Speed matters as much as any of this.**
    - Load the hero image eagerly, at high priority. Lazy-load everything else.
    - Keep the hero under 300KB on mobile.
    - Don't use video autoplay on mobile.
    - Don't use pop-ups that cover the page on mobile (Google penalises them). Use inline sign-ups and the sticky bar instead.

---

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

---

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

---

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

---

## PART 7: Things you do outside Framer (these decide rankings and AI answers)

These are not for Astra. Do them yourself:

1. **Google Search Console.**
   - Verify the domain and submit `https://headcornairshow.com/sitemap.xml`.
   - After publishing, use URL Inspection > Request indexing on the home page, /tickets, /facts, /history and /faq.
2. **Bing Webmaster Tools.**
   - Import the site from Search Console in two clicks.
   - ChatGPT search and Copilot run largely on Bing's index, so this matters for "best airshow UK" answers. Turn on IndexNow if offered.
3. **Google Business Profile.**
   - Claim or create "Headcorn International Airshow" as an event organiser at the aerodrome address.
   - Add photos.
   - Post each lineup reveal as an Event post.
   - Ask 2026 attendees for reviews. Asking is fine; don't offer anything in return.
4. **Listings that AI tools and journalists read.** Submit the 2027 dates, a short description and the /facts link to:
   - Visit Kent and Kent Online / Kent Live what's-on
   - airshow calendars such as UK Airshow Review, FlyPast, Aeroplane and Key Aero, and the Air Display Association Europe listings
   - Time Out and Hoop / DayOutWithTheKids (for families)
   - TripAdvisor (attractions/events)

   Every consistent mention strengthens the "Headcorn = June airshow in Kent" association that search engines and AI models learn from.
5. **Press for each reveal.** Send a 150-word release, with one photo, to:
   - Kent Online, BBC Radio Kent, KMTV
   - FlyPast, Aeroplane, Key Aero

   Lead with the strongest fact. Links from those sites are the biggest single ranking lever you have.
6. **Wikipedia.** Don't write or edit the Headcorn Aerodrome article yourselves; that's a conflict of interest and it gets reverted. Once independent press coverage exists, a neutral editor can cite it. Make sure the Lashenden and 354th FG history is accurately sourced on your /history page so it can be cited.
7. **Consistency.** Use the same name, dates, address and "from £30" everywhere:
   - the site and Google Business Profile
   - Facebook, Instagram and TikTok bios
   - Ticketflex and Weeztix event pages
   - listings

   AI assistants trust facts that agree across sources and skip ones that conflict.
8. **Tracking.**
   - Meta Pixel and GA4 purchase events on Ticketflex and Weeztix.
   - Cross-domain tracking from headcornairshow.com.
   - UTM tags on every email, social and press link.

   This is how you'll know which of all this actually sells tickets.

---

## Before you publish

- [ ] Every `[CONFIRM]` is filled or deleted.
- [ ] Search the published site for "2026": only the intended archive and "last year" references remain.
- [ ] Search for these banned words: early bird, unforgettable, iconic, world-class, don't miss out, and the em dash (—).
- [ ] Every page has exactly one H1 (check with the Detailed SEO extension or view source).
- [ ] The Rich Results Test passes for home, /tickets and /faq.
- [ ] The mobile hero, sticky bar and ticket finder work on a 390px phone.
- [ ] PageSpeed Insights mobile score is above 80 on home and /tickets.
- [ ] Analytics and the Meta Pixel do not fire before cookie consent.

---

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
