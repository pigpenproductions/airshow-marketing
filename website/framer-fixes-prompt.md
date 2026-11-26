# Framer AI: fix the worst problems first

Text fixes only. No layout, no effects, no new sections. That keeps each prompt cheap and stops the AI drifting.

## Which model

- **Use Luna.** Framer recommends it for routine content updates, and every fix here is a text swap.
- **Step up to Sol only if Luna fails** on a prompt, for example when a fix needs a CMS item or a component variant changed. Go back to Luna for the next prompt.
- **Don't use Astra or Opus.** They're for code components and complex layouts. They cost more and add nothing here.
- Model names in Framer's picker change often. If you don't see Luna, pick the model labelled for content edits or lowest credits.

## How to run it

1. Fill in the two [FILL] values in the CONTEXT block before you start.
2. Start a fresh Agent chat for each prompt. Paste CONTEXT, then one prompt. Short chats keep each request small.
3. Check the page before you move on. Don't publish until Prompt 5 is done.
4. If credits run low, stop after Prompt 2. Prompts 1 and 2 hold the errors a visitor or journalist would notice.

---

## CONTEXT (paste at the top of every prompt)

You are editing text on headcornairshow.com, the Headcorn International Airshow website, in Framer. Change text only. Do not change layout, styles, images, links, navigation or the footer. Do not add sections. Do not invent facts.

Facts. Use these exactly:
- Show: Saturday 26 and Sunday 27 June 2027, Headcorn Aerodrome, Kent.
- Futures & Arrivals Day: Friday 25 June 2027. Price [FILL: £7.50 or £10]. Free for schoolchildren and veterans.
- Car parks open 9am. Gates and the ground show open 10am. Flying from about noon. The show closes 6pm.
- General Admission from £30. Children 5 and under go free with an adult. Fighter Row from £75. Mustang Lounge from £140.
- Tickets are advance only, e-tickets issued instantly. No gate sales.

Voice: British English. Short, plain sentences. Hyphens only, never em dashes.

---

## PROMPT 1: Futures page (/futures) - wrong dates and price

1. Replace every date on this page with "Friday 25 June 2027". This includes the two FAQ answers that say "Friday, 26 June 2025" and "Friday, 26 June 2026", and the paragraph that says "Friday 26 June 2025".
2. Replace every "Schools & Seniors Day" with "Futures & Arrivals Day".
3. Replace "£7.50" with the Futures price from the facts, wherever it appears.
4. The intro paragraph appears twice. Delete the second copy (the one starting "Join us on Friday 26 June 2025").
5. In the remaining paragraph, change "local schoolchildren, and veterans" to "local schoolchildren and veterans". Remove "senior citizens" wherever it appears.
6. The FAQ "When is the Schools & Seniors Day?" appears twice. Keep one, titled "When is Futures & Arrivals Day?", with the answer: "Friday 25 June 2027, the day before the main airshow weekend."
7. Fix "an memorable" to "a memorable", "activites" to "activities" and "Airshow Airshow" to "Airshow".

## PROMPT 2: Parking (/parking) and Aircraft (/confirmed-aircraft) - placeholders

On /parking:
1. Replace "gates open at [time]" with "gates open at 10am".
2. Replace "With around 20,000 visitors expected over the weekend, please anticipate some traffic" with "It's a busy weekend, so expect some traffic".

On /confirmed-aircraft:
3. Delete the placeholder text "XYZ XYZ" under P-47 Thunderbolt 'Nellie B'. Leave the operator line "Biggin Hill Heritage Hangar" as it is.

## PROMPT 3: FAQ (/faq) - wrong answers and a duplicate

1. The question "What happens if the weather is bad?" appears twice. Delete the second one and its answer.
2. Replace the answer to "What facilities are there for toilets & baby change?" with: "There are toilets on site, including accessible toilets and baby change." [CONFIRM before publishing.]
3. Replace the answer to "Will I get to meet any pilots/ aircraft up close?" with: "The ground show has static aircraft you can see up close. Fighter Row seats put you on the flightline as the aircraft start up and taxi." Change the question to "Can I see the aircraft up close?"
4. Change "the Headcorn Aerodrome Airshow" in the intro to "the Headcorn International Airshow".

## PROMPT 4: Tickets page (/tickets) - copied card text

The Fighter Row description has been pasted into two other cards. Fix only these two cards. Leave the Fighter Row card as it is.

1. Futures and Arrivals Day card: replace "Up close and personal. Fighter Row places you right up against the airfield flight line offering the best views of the air and static displays." with "Watch the display aircraft fly in the day before the show. Schoolchildren and veterans go free."
2. Same card: make the price match the Futures price in the facts.
3. Jeep Rides card: replace the same copied Fighter Row sentence with nothing. Keep "Ride along the flightline in a wartime Jeep. Exclusive close up access to the fighters from a mobile viewpoint."

## PROMPT 5: Small copy and SEO fixes

1. /ground-show: change "from around the worlds world as well as locally" to "from around the world and from Kent".
2. /news-updates: change the page title to "News and Aircraft Updates | Headcorn Airshow 2027" and the meta description to "The latest news and aircraft announcements for the Headcorn International Airshow, 26-27 June 2027, Kent."

---

## Do these yourself (the AI can't, or shouldn't)

- **Futures price in the structured data.** The homepage and /tickets code says Futures Day costs 7.50. If you chose £10, edit `"price": "7.50"` to `"price": "10.00"` in Site Settings > Custom Code. Google shows this price in search results, so it must match.
- **/news-updates is empty.** The page has no content. Either connect it to the aircraft updates CMS collection or remove it from the nav and sitemap until the first 2027 announcement. Don't spend AI credits on it.
- **Toilet facilities.** Confirm the FAQ answer in Prompt 3 is true before publishing.
- **Two ticket shops.** /tickets links to both Ticketflex and Weeztix. Check each BOOK button goes to the right shop for that product.

## Check before you publish

Search the site's text (Ctrl/Cmd + F in the layers panel) for: "2025", "2026", "Seniors", "[time]", "XYZ", "20,000", "7.50".

- "2026" should appear only in last year's stats and photo credits.
- "7.50" should appear only if £7.50 is the confirmed Futures price.
