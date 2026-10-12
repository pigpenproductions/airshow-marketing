# Prompt for Framer AI: headcornairshow.com conversion update

Before you start:
1. Upload every file from `web-images/` (or `dist/headcorn-web-images.zip`) to the Framer Assets panel. Keep the filenames.
2. Duplicate the site or work on a branch, so you can compare before publishing.
3. Fill in the two [CONFIRM] items in Part 3.
4. Paste one PART at a time and check it before moving on. AI editors do better with one job at a time.

---

## CONTEXT (paste this at the top of every part)

You are editing headcornairshow.com, the website for the Headcorn International Airshow.

Facts. Use these exactly. Do not invent anything else:
- Show: Saturday 26 and Sunday 27 June 2027, Headcorn Aerodrome, Kent.
- Futures & Arrivals Day: Friday 25 June 2027. £7.50, free for veterans.
- General Admission from £30. Children 5 and under go free with an adult ticket.
- Mustang Lounge (VIP) from £140. Fighter Row (flightline seats) from £75.
- All tickets are e-tickets, issued instantly. Tickets are advance only, with no gate sales.
- Last year (2026): 4 Hurricanes, 30+ aircraft from 18 operators across four countries, 20+ WWII veterans, and an RAF Chinook for Armed Forces Day.
- The 2027 theme and the headline acts are still secret. Headline acts are announced in the new year.

Brand:
- Red #D40F0F is the only accent colour. Navy #0A1543 is for type and dark panels.
- Use the site's existing fonts. Headlines go in the existing condensed display font, in capitals.
- Voice: British English, short declarative sentences, concrete facts. Hyphens only, never em dashes.
- Never use the words "unforgettable", "iconic" or "don't miss out".
- Never mention prices going up, "early bird" or price deadlines. Say "Tickets on sale now".

Do not change:
- any booking link destination (Ticketflex, Weeztix, Polar Helicopters, the shop)
- the navigation structure, or the footer links

Photography credit: "Photography: James Hill". Put it once in the footer.

---

## PART 1: Home page, first screen (mobile first)

1. Replace the current hero image with `spitfire-spirit-of-kent-cockpit-hero-16x9.jpg` on desktop and tablet, and with `spitfire-spirit-of-kent-cockpit-hero-9x16.jpg` on mobile. Fill the frame. Keep the pilot and the roundel in view.
2. Remove the large round logo overlay from the hero. Keep the small logo in the header.
3. Over the image, add a dark gradient at the bottom (navy to transparent) and stack:
   - Small caps line: "HEADCORN INTERNATIONAL AIRSHOW"
   - Headline, very large: "26-27 JUNE 2027"
   - One line: "Headcorn Aerodrome, Kent. Futures & Arrivals Day on Friday 25 June."
   - A large red pill button "Get tickets - from £30" linking to /tickets. It must sit above the fold on a 390px-wide phone.
4. Keep the countdown, but label the four numbers DAYS, HRS, MINS, SECS, and move it under the button.
5. Add a sticky bottom bar on mobile only: "26-27 June 2027" on the left, red "Get tickets" button on the right, linking to /tickets. Show it on every page except /tickets.
6. Change the header button text from "EARLY BIRD TICKETS" to "GET TICKETS".

---

## PART 2: Home page, below the fold

1. Replace the intro section ("Set against the historic backdrop..." and "Despite the international name...") with:
   - Heading: "LAST JUNE. ONE FIELD IN KENT."
   - A stack of big lines: "4 HURRICANES." / "30+ AIRCRAFT." / "18 OPERATORS." / "20+ WWII VETERANS." / and in red "2027 GOES BIGGER."
   - One line under it: "Operators from four countries. An RAF Chinook for Armed Forces Day."
2. Add a section "WHAT'S NEXT" on `headcorn-from-the-air-busy-day.jpg` with a dark gradient, and two rows: "THE THEME" with a red bar reading "CLASSIFIED", and "HEADLINE ACTS" with a red bar reading "NEW YEAR". Under it, the sign-up from Part 4.
3. Displaying Aircraft card: use `spitfire-spirit-of-kent-flypast.jpg`. Ground Show card: use `catalina-head-on.jpg`. Keep their text and links.
4. Add a full-width photo gallery (horizontal scroll on mobile, grid on desktop) with: `mustang-overhead-invasion-stripes.jpg`, `mustang-marinell-banking.jpg`, `aerobatic-smoke-pass.jpg`, `mustang-jersey-jerk-taxi.jpg`, `spitfire-takeoff-run.jpg`, `catalina-and-jeeps.jpg`, `wartime-truck-and-spitfire.jpg`, `catalina-sunset.jpg`. No captions. Use the alt text listed at the end of this prompt.
5. End the page with a red band: "TICKETS ON SALE NOW." / "From £30 for an adult day. Every ticket is an e-ticket." / white "Get tickets" button to /tickets.
6. Remove the word "unforgettable" anywhere on the site.

---

## PART 3: Tickets page

1. Change the heading "EARLY BIRD TICKETS NOW LIVE FOR THE ANNUAL HEADCORN INTERNATIONAL AIRSHOW" to "TICKETS ON SALE NOW". Under it: "Saturday 26 and Sunday 27 June 2027. Headcorn Aerodrome, Kent."
2. Add a header image: `mustang-overhead-invasion-stripes-hero-16x9.jpg` (desktop) and `mustang-overhead-invasion-stripes-hero-9x16.jpg` cropped short (mobile).
3. Card images. Keep each card's text, price and links:
   - General Admission: `mustang-with-visitors.jpg`
   - Fighter Row: `mustang-jersey-jerk-low.jpg`
   - Futures and Arrivals Day: `catalina-sunset.jpg`
   - Helicopter Flights: `helicopter-in-flight.jpg`
   - Jeep Rides: `catalina-and-jeeps.jpg`
   - Mustang Lounge: keep the current photo.
4. On the General Admission card, add a small red badge: "Under 5s free".
5. Add a compact price list under General Admission:
   Adult weekend £48 / Family day (2 adults, 2 children) £75 / Family weekend £120 / Child or carer £15, £25 weekend.
   [CONFIRM these match the ticket shop before publishing.]
6. Fix the wording "This tickets allows you" to "This ticket gets you". Make "FUTURE'S DAY" read "Futures & Arrivals Day" everywhere.
7. Opening hours: the tickets page says 10am-6pm and the FAQ says 10am-5pm. Use [CONFIRM: correct closing time] on both pages.

---

## PART 4: Sign-up, FAQ and SEO

1. Add a sign-up block on the home page (inside "WHAT'S NEXT") and above the footer on /tickets:
   - Heading: "Get lineup news first"
   - Email field, plus an unticked checkbox: "Text me show news and day-of updates too" with a mobile number field that appears when ticked.
   - Small print: "We'll email you about Headcorn International Airshow. Unsubscribe any time."
   - Connect it to Mailchimp: [paste the Mailchimp form action URL or use Framer's Mailchimp form integration].
2. FAQ page: remove the duplicated questions ("What time does it start and finish?" and "When can I park?" each appear several times) so each question appears once.
3. Page titles and descriptions:
   - Home title: "Headcorn International Airshow | 26-27 June 2027, Kent"
   - Home description: "Warbirds, flying displays and a ground show at Headcorn Aerodrome, Kent. 26-27 June 2027, with Futures & Arrivals Day on Friday 25. Tickets from £30."
   - Tickets title: "Tickets | Headcorn International Airshow 2027"
   - Tickets description: "Tickets for Headcorn International Airshow, 26-27 June 2027. General Admission from £30, Fighter Row and the Mustang Lounge. E-tickets issued instantly."
4. Set the site's social share image to `og-share.jpg`.
5. Every image you place needs alt text, taken from the list below.

---

## Alt text

- spitfire-spirit-of-kent-cockpit: Spitfire Spirit of Kent with its propeller turning and the pilot in the cockpit
- spitfire-spirit-of-kent-flypast: Spitfire Spirit of Kent banking overhead
- mustang-overhead-invasion-stripes: P-51 Mustang overhead showing its invasion stripes
- mustang-marinell-banking: P-51 Mustang Marinell banking in a blue sky
- aerobatic-smoke-pass: An aerobatic aircraft trailing smoke
- helicopter-in-flight: A helicopter in flight at Headcorn
- mustang-qi-polished-nose: Polished aluminium and propeller of a P-51 Mustang marked QI
- mustang-jersey-jerk-low: P-51 Mustang Jersey Jerk from a low angle on the grass
- mustang-jersey-jerk-taxi: P-51 Mustang Jersey Jerk taxiing with its propeller turning
- spitfire-takeoff-run: Spitfire on its take-off run, propeller blurred
- spitfire-cockpit-instruments: Inside a Spitfire cockpit
- catalina-head-on: PBY Catalina flying boat head-on on the grass
- catalina-and-jeeps: A Catalina behind a line of wartime jeeps and re-enactors
- wartime-truck-and-spitfire: A wartime truck parked beside a Spitfire
- mustang-with-visitors: Visitors close to a P-51 Mustang on the airfield
- headcorn-from-the-air-busy-day: Headcorn Aerodrome from the air on a busy show day
- catalina-sunset: A Catalina on the airfield at sunset

---

## Do these yourself (Framer AI can't)

**1. Google event data.** Paste into Site Settings > Custom Code > End of `<head>` (or per page on Home and /tickets):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Headcorn International Airshow 2027",
  "startDate": "2027-06-26T10:00:00+01:00",
  "endDate": "2027-06-27T18:00:00+01:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Headcorn Aerodrome",
    "address": { "@type": "PostalAddress", "streetAddress": "Shenley Road", "addressLocality": "Headcorn, Ashford", "postalCode": "TN27 9HX", "addressRegion": "Kent", "addressCountry": "GB" }
  },
  "image": ["https://headcornairshow.com/og-share.jpg"],
  "description": "Warbirds, flying displays and a ground show at Headcorn Aerodrome, Kent, with Futures & Arrivals Day on Friday 25 June.",
  "offers": {
    "@type": "Offer",
    "url": "https://headcornairshow.com/tickets",
    "price": "30.00",
    "priceCurrency": "GBP",
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-10-01"
  },
  "organizer": { "@type": "Organization", "name": "AMP Productions Limited", "url": "https://headcornairshow.com" }
}
</script>
```

- Delete the old 2026 Event block from the tickets page.
- Set the `endDate` time to the confirmed closing time.
- Replace the `image` URL with the hosted og-share.jpg URL from Framer.

**2. Purchase tracking.** Turn on the Meta Pixel and GA4 purchase tracking inside the **Weeztix** and **Ticketflex** shop settings, and add the Meta Pixel to Framer (Site Settings > Integrations, or custom code). Without this, Meta ads can't learn which clicks turn into ticket sales.

**3. Ticket checkout opt-in.** In Ticketflex (and Weeztix), change the marketing tick box to cover texts as well as emails, or add a separate texts box. That builds a lawful SMS list from now on.

---

# PASS 2: what's left after the first run

The first pass did: the home hero (Spitfire crops, dates, location, ticket button), the countdown moved under the button,
the header button changed to GET TICKETS, home and tickets SEO, the share image, and the General Admission wording.

Paste the CONTEXT block, then these one at a time.

## 2A: Small fixes, site-wide

1. Under each countdown number, add a small label: DAYS, HRS, MINS, SECS.
2. Mobile only: add a sticky bar fixed to the bottom of the screen. "26-27 June 2027" on the left, a red pill "Get tickets" on the right, linking to /tickets. Show it on every page except /tickets. It must not cover the footer links when scrolled to the bottom (add bottom padding to the footer on mobile).
3. In the footer, add one small line: "Photography: James Hill".
4. Replace "FUTURE'S DAY" with "Futures & Arrivals Day" everywhere, including the footer.

## 2B: Home page, below the hero

Do steps 1, 2, 3 and 5 of PART 2 exactly as written above (the numbers wall, WHAT'S NEXT on the aerial photo, the Displaying Aircraft and Ground Show card images, and the red closing band). Then remove the word "unforgettable" from the site.

## 2C: Home gallery

Do step 4 of PART 2: the eight-photo gallery, horizontal scroll on mobile, grid on desktop, alt text from the list.

## 2D: Tickets page

Do steps 3, 4, 5 and 7 of PART 3 (card photos, the Under 5s free badge, the extra price list, the opening hours) and fix the remaining wording in step 6.

## 2E: FAQ

Do step 2 of PART 4 (each question appears once, and the opening times match the tickets page).

## 2F: Sign-up (do this last, after you have the Mailchimp form URL)

Do step 1 of PART 4.
