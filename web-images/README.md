# Headcorn website image pack (2026 show)

17 photos from HIA 2026, prepared for Framer. 2560px on the long edge, metadata stripped.
Framer makes the smaller responsive sizes itself, so upload these as they are.

- `manifest.csv`: alt text, photo credit, focal point and suggested placement for every image.
- `*-hero-16x9.jpg` / `*-hero-9x16.jpg`: desktop and mobile hero crops for the three hero picks.
- `og-share.jpg`: 1200x630 link-preview image (Framer: Site Settings > General > Social image).
- `contact-sheet.jpg`: the set at a glance.

## Using them in Framer

1. Drag the files into the Assets panel (or straight onto an image layer).
2. On each image, paste the `alt` text from `manifest.csv` into the image's alt text field.
3. Use Fill mode. If the subject gets cropped, move the image position towards the `focal_x_pct` / `focal_y_pct`
   in the manifest.
4. For the home hero, use the 16x9 crop on desktop and the 9x16 crop on the mobile breakpoint.
5. For a gallery, make a CMS collection with Image, Alt, Credit and Category fields, and add one item per photo.

## Credits

James Hill took everything except the aerial view and the Catalina at sunset (both marked "Credit TBC").
Credit "Photography: James Hill" wherever the images appear, for example in the site footer.
