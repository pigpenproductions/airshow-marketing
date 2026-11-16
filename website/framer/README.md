# Building headcornairshow.com without burning AI credits

Two things change from here:
1. **The hard visual pieces are ready-made code.** You paste each one into Framer once. They cost no AI credits and look exactly like `preview-desktop.jpg` and `preview-mobile.jpg`.
2. **Everything else is done by hand in Framer.** That's quicker than it sounds, and the steps are in Part 2.

Use Astra or Claude in Chrome only for writing copy, if at all.

---

## Part 1: Add the three code components (about 20 minutes)

| File | What it is | Replaces |
|---|---|---|
| `WelcomeTicker.tsx` | A red strip of "WELCOME · BIENVENUE · WILLKOMMEN…" with plane icons, scrolling slowly | Nothing. It sits under the hero. |
| `ArrivalsBoard.tsx` | The airport arrivals board, with flip-letter tiles that spin and land when you scroll to it | The flat white "LAST JUNE" stats block, and Astra's stats animation |
| `RadarSignup.tsx` | The radar over the aerial photo, plus the boarding-pass email sign-up that goes straight into Mailchimp | The "WHAT'S NEXT" panel and its sign-up form |

### Adding each component (the same steps for all three)

1. Open the project in Framer. On a phone, use the desktop app or a laptop.
2. Open the **Assets** panel on the left, find **Code**, and click **+** > **New component** (sometimes called "New code file").
3. Name it exactly `ArrivalsBoard` (then `RadarSignup`, then `WelcomeTicker`).
4. Framer opens a code editor with some sample code. Select all of it (Cmd/Ctrl + A) and delete it.
5. Open the matching `.tsx` file from this folder, copy everything, paste it into Framer, and save (Cmd/Ctrl + S).
6. Close the editor. The component is now in Assets > Code. Drag it onto the Home page where it belongs (see the order below).
7. Select it on the canvas. In the right-hand panel, set **Width** to **Fill** (or 100%) and **Height** to **Fit content**.

They all resize to the space they're given, so you don't need separate phone and desktop versions. Check the phone breakpoint anyway (Part 3).

### Order on the Home page

1. Hero (keep what you have)
2. **WelcomeTicker**
3. **ArrivalsBoard**
4. **RadarSignup**
5. Lineup grid (Astra's)
6. Tickets strip or cards
7. Day planner
8. Gallery
9. History teaser (Part 2)
10. Red "TICKETS ON SALE NOW." band
11. Footer

Delete the old white "LAST JUNE" block and the old "WHAT'S NEXT" panel once the new ones are in. Then, on the old stats layer, remove the `withStatsSequence` override (it was looking for that text).

### Settings for each component

All of these are in the right-hand panel when the component is selected.

**ArrivalsBoard**
- **Rows:** each row has Flight, Arrival, Status and Style.
  - **On announcement day:** change a row's Arrival to the act (for example "P-51 MUSTANG"), its Status to "CONFIRMED", and its Style to "Revealed". You can add a row with **+**. That's the whole update, and a 30-second job.
  - Keep each Arrival to about 14 characters so it fits on a phone in one line. Spaces count.
- **2027 letters:** the amber colour. Change it to white (#F4F5F8) if you want red to be the only accent.
- **Footnote** and the titles: edit them as plain text.

**RadarSignup**
- **Image:** choose `headcorn-from-the-air-busy-day.jpg` (or any aerial shot) from your assets.
- **Mailchimp URL** (required, or the form won't send):
  1. In Mailchimp, go to **Audience** > **Signup forms** > **Embedded forms**.
  2. Scroll to the code box and find `action="https://....list-manage.com/subscribe/post?u=...&amp;id=..."`.
  3. Copy what's between the quotes and change every `&amp;` to `&`. It should look like `https://headcornairshow.us21.list-manage.com/subscribe/post?u=abc123&id=def456`.
  4. Paste it into **Mailchimp URL**.
- **Tag ID** (optional): this tags sign-ups from this form. In the Mailchimp embedded form builder, add a tag to the form, and the code will show `name="tags" value="1234567"`. Put that number here.
- **Blips:** the labels on the radar. X and Y move them. Keep each label inside the circle (X between 15 and 65, Y between 20 and 75).
- **Pass fields:** written as `LABEL:VALUE|LABEL:VALUE`, for example `DATE:26 JUN 27|GATES:10:00|FLYING:12:00|CLASS:FIRST TO KNOW`.

**Test the sign-up after publishing:**
- Submitting a real email should show "You're on the list. Check your inbox to confirm."
- Mailchimp then sends its usual confirmation email, if double opt-in is on.
- Submitting the same email again shows Mailchimp's "already subscribed" message.
- On the Framer canvas the form says "Sign-up is not connected yet" until the URL is set. That's expected.

**WelcomeTicker**
- **Words:** add, remove or reorder them.
- **Loop (sec):** a higher number scrolls slower. 40 is calm, 25 is energetic.

### What the code already handles

- **Google can read the text.** It's real text in the page, not pictures. Each board row also has hidden plain text for screen readers.
- **Reduced motion:** anyone whose phone or computer is set to reduce motion gets everything still.
- **Fonts:** Oswald and JetBrains Mono load automatically.
- **Tested:** I compiled all three with strict TypeScript and tested them in Chrome at 390px and 1280px. The tiles land on the right text, there are no console errors, and the email checks work (a bad address, and the "not connected" state).
- **Not tested:** one thing is untested because it needs your live Mailchimp URL: a real submission. Check it after publishing.

---

## Part 2: What makes it look "next level" (by hand in Framer)

Big airshow and motorsport sites feel premium because of a few disciplined choices, not lots of effects. Here's how to get each one in Framer.

### 1. One dark world, start to finish
- From the hero down to the footer, use only three backgrounds:
  - Ink #050A24 (the arrivals board)
  - Navy #0A1543 (the radar and most sections)
  - Red #D40F0F (the ticker and the final ticket band)
- Get rid of white sections in the middle of the page. They're what made the old stats block feel flat.
- In Framer, select the section frame and set **Fill** to the colour. Save the three as **Color Styles** (Assets > Colors) so every section uses the same three.

### 2. Type: two sizes, both loud
- **Headings:** Oswald Bold, capitals, very large and tight.
  - Desktop: 88-96px, line height 0.9, letter spacing -1%.
  - Phone: 44-56px.
  - Make a **Text Style** called "Display" with those sizes set per breakpoint.
- **Small labels:** 12px, capitals, letter spacing 14%, colour #8A93B8. These are the "HEADCORN AERODROME · EGKH" style eyebrows above every heading. Make a "Label" text style.
- **Body text:** Oswald Regular, 18-19px, line height 1.45, colour #C9CEE4.
- Use only these three styles. Inconsistency is what makes sites look cheap.

### 3. Space
- Give each section 80px of padding top and bottom on desktop, and 56px on a phone. Set the inner content to a maximum width of 1120px, centred.
- In Framer, use a Stack with **Padding** 80, then an inner frame with **Max Width** 1120.

### 4. Photos do the selling
- **Full-bleed:** use edge-to-edge images, not small cards. James Hill's shots are good enough to fill the screen.
- **Darken the bottom of every photo that has text on it.** Add a gradient fill layer from navy at 85% to transparent.
- **Quality:** set **Image > Resolution** to High on the hero and to Auto everywhere else.
- **Gallery:** Insert > **Ticker** (Framer's built-in), with 6-8 photos, set to slow, and pause-on-hover off. A moving strip of aircraft between sections adds life at no cost.

### 5. Motion: subtle, everywhere, never fussy
Select a layer and open **Effects** in the right-hand panel. Framer renames these now and then, so look for "Appear", "Scroll" or "Loop".
- **Headings and section content:** Appear on scroll. Set Opacity 0 → 1 and Y 40 → 0, over 0.6s with ease out. Trigger it once, when the layer is 20% in view.
- **Cards in a row** (lineup, tickets): the same Appear, with a **Stagger** of 0.08s so they arrive one after another.
- **Hero image:** you already have the slow zoom.
- **Photo sections:** Scroll speed or parallax at about 80% on the background image, so it drifts slightly slower than the page.
- **Buttons:** on hover, scale 1.03 with a slightly brighter red, over 0.15s.
- Don't add bounce, spin or confetti. Weight and slowness read as premium.

### 6. Make the ticket button impossible to miss
- **One style everywhere:** a red pill, white capitals, at least 48px tall, with the same wording ("Get tickets") on every page.
- **Sticky header:** select the header and set **Position** to **Sticky** (top 0).
- **Mobile buy bar:** Astra's bar goes in a Framer **Component** placed on every page except /tickets.
- **On the ticket cards:** show the price in the display font, then one line of what you get, then the button.

### 7. A history teaser near the bottom
- **Layout:** a full-bleed black-and-white image of the airfield (any period shot you own, or a desaturated Mustang).
- **Heading:** "IN 1944 THIS FIELD WAS LASHENDEN."
- **One line:** "Home of the 354th Fighter Group and its P-51B Mustangs."
- **Button:** "Read the story", linking to /history.
- It's the thing no other show can say, and both Google and AI assistants love a unique story.

### 8. Footer as a finale
- Use the navy background with a huge outlined "HEADCORN" in the background. A text layer with no fill and a 1px stroke at 6% white looks like the "EGKH" behind the board.
- Under it go the links, the company details, the social icons and "Photography: James Hill".

---

## Part 3: Check before you publish

1. **Preview at every breakpoint.** Click the breakpoint tabs at the top (Desktop, Tablet, Phone). On Phone, check:
   - nothing spills off the side;
   - the hero button is visible without scrolling;
   - the board rows fit on one line.
2. **Speed.** After publishing, run https://pagespeed.web.dev on the home page. Aim for 80+ on mobile. If it's low, the usual cause is a huge image: set it to Auto resolution, or replace it with the 2560px versions from `web-images/`.
3. **The form.** Sign up with your own email and confirm it arrives in Mailchimp.
4. **Old leftovers.** Search the site (Cmd/Ctrl + F in the layers panel) for "2026", "early bird" and "By the Biplanes".

---

## Part 4: Spending AI credits wisely

- **Never use the AI for layout or effects.** It's slow, it burns credits, and the results drift. Use these components and the manual steps above.
- **Use the AI only for writing:** a page's copy, an FAQ answer, alt text. Paste in the facts block from `astra-prompt.md` every time so it doesn't invent anything.
- Claude in Chrome is the most expensive option of all: it screenshots and clicks its way through every step. Keep it for checking a finished page, not building one.
- **Bring new pieces back here.** If you want another bespoke section (a lineup reveal with a "declassified" stamp, an interactive ticket picker, a live weather and runway strip for show week), ask me for it as a code component like these three. I build and test it here, and you paste it in.
