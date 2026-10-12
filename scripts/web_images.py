"""Build the Framer image pack for headcornairshow.com.

  python3 scripts/web_images.py

Reads originals from assets/dropbox/ (downloaded from Dropbox, not committed)
and writes web-images/:
  <slug>.jpg            2560px long edge, sRGB, quality 84, metadata stripped
  <slug>-hero-16x9.jpg  2560x1440 desktop hero crop (hero picks only)
  <slug>-hero-9x16.jpg  1440x2560 mobile hero crop (hero picks only)
  og-share.jpg          1200x630 link-preview image
  manifest.csv          alt text, credit, focal point and suggested placement
  contact-sheet.jpg     the whole set at a glance
"""

import csv
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "dropbox"
OUT = ROOT / "web-images"
JH = "James Hill / Headcorn International Airshow 2026"

# slug, source, focal (x, y as 0-1), hero, alt, credit, category, where to use it
IMAGES = [
    ("spitfire-spirit-of-kent-cockpit", "jh-155620.jpg", (0.64, 0.5), True,
     "Spitfire Spirit of Kent with its propeller turning and the pilot in the cockpit", JH, "Warbirds", "Home hero"),
    ("spitfire-spirit-of-kent-flypast", "jh-161448.jpg", (0.5, 0.5), True,
     "Spitfire Spirit of Kent banking overhead", JH, "Flying", "Home hero (alt) / Displaying Aircraft card"),
    ("mustang-overhead-invasion-stripes", "jh-154122.jpg", (0.45, 0.5), True,
     "P-51 Mustang overhead showing its invasion stripes", JH, "Flying", "Tickets page header"),
    ("mustang-marinell-banking", "jh-154232.jpg", (0.45, 0.5), False,
     "P-51 Mustang Marinell banking in a blue sky", JH, "Flying", "Displaying Aircraft / lineup"),
    ("aerobatic-smoke-pass", "jh-151503.jpg", (0.45, 0.45), False,
     "An aerobatic aircraft trailing smoke", JH, "Flying", "Displaying Aircraft / modern acts"),
    ("helicopter-in-flight", "jh-103525.jpg", (0.45, 0.5), False,
     "A helicopter in flight at Headcorn", JH, "Flying", "Helicopter Flights card"),
    ("mustang-qi-polished-nose", "jh-093628.jpg", (0.4, 0.5), False,
     "Polished aluminium and propeller of a P-51 Mustang marked QI", JH, "Warbirds", "Ground Show / detail"),
    ("mustang-jersey-jerk-low", "jh-093703.jpg", (0.5, 0.55), False,
     "P-51 Mustang Jersey Jerk from a low angle on the grass", JH, "Warbirds", "Fighter Row card"),
    ("mustang-jersey-jerk-taxi", "jh-100615.jpg", (0.4, 0.6), False,
     "P-51 Mustang Jersey Jerk taxiing with its propeller turning", JH, "Warbirds", "Fighter Row page"),
    ("spitfire-takeoff-run", "jh-160409.jpg", (0.4, 0.55), False,
     "Spitfire on its take-off run, propeller blurred", JH, "Warbirds", "Fighter Row / flightline"),
    ("spitfire-cockpit-instruments", "jh-143606.jpg", (0.5, 0.45), False,
     "Inside a Spitfire cockpit", JH, "Detail", "Mustang Lounge / VIP"),
    ("catalina-head-on", "jh-090349.jpg", (0.5, 0.5), False,
     "PBY Catalina flying boat head-on on the grass", JH, "Warbirds", "Ground Show card"),
    ("catalina-and-jeeps", "jh-090116.jpg", (0.5, 0.6), False,
     "A Catalina behind a line of wartime jeeps and re-enactors", JH, "Ground show", "Jeep Rides card"),
    ("wartime-truck-and-spitfire", "jh-145208.jpg", (0.4, 0.6), False,
     "A wartime truck parked beside a Spitfire", JH, "Ground show", "Ground Show page"),
    ("mustang-with-visitors", "jh-101807.jpg", (0.6, 0.6), False,
     "Visitors close to a P-51 Mustang on the airfield", JH, "Visitors", "General Admission card"),
    ("headcorn-from-the-air-busy-day", "c-busyday.jpg", (0.45, 0.4), False,
     "Headcorn Aerodrome from the air on a busy show day", "Credit TBC", "Venue", "Visit / Parking / Directions"),
    ("catalina-sunset", "c-P1029416.jpg", (0.5, 0.55), False,
     "A Catalina on the airfield at sunset", "Credit TBC", "Atmosphere", "Futures & Arrivals Day / Camping"),
]


def save(im, path, quality=84):
    im.convert("RGB").save(path, "JPEG", quality=quality, optimize=True, progressive=True)


def crop_to(im, ratio, focal):
    """Largest crop of the given aspect ratio, centred on the focal point."""
    w, h = im.size
    if w / h > ratio:
        cw, ch = int(h * ratio), h
    else:
        cw, ch = w, int(w / ratio)
    x = min(max(int(focal[0] * w - cw / 2), 0), w - cw)
    y = min(max(int(focal[1] * h - ch / 2), 0), h - ch)
    return im.crop((x, y, x + cw, y + ch))


def main():
    OUT.mkdir(exist_ok=True)
    rows, thumbs = [], []
    for slug, src, focal, hero, alt, credit, cat, use in IMAGES:
        im = ImageOps.exif_transpose(Image.open(SRC / src))
        if src == "c-busyday.jpg":  # trim the black frame on the original
            im = im.crop((8, 8, im.width - 8, im.height - 8))
        main_im = im.copy()
        main_im.thumbnail((2560, 2560), Image.LANCZOS)
        save(main_im, OUT / f"{slug}.jpg")
        files = [f"{slug}.jpg"]
        if hero:
            for name, ratio, size in (("hero-16x9", 16 / 9, (2560, 1440)), ("hero-9x16", 9 / 16, (1440, 2560))):
                c = crop_to(im, ratio, focal)
                c = c.resize(size if c.width >= size[0] else (c.width, c.height), Image.LANCZOS)
                save(c, OUT / f"{slug}-{name}.jpg")
                files.append(f"{slug}-{name}.jpg")
        rows.append({
            "file": f"{slug}.jpg", "extra_crops": " ".join(files[1:]), "alt": alt, "credit": credit,
            "category": cat, "suggested_use": use, "orientation": "landscape" if main_im.width >= main_im.height else "portrait",
            "width": main_im.width, "height": main_im.height, "focal_x_pct": int(focal[0] * 100), "focal_y_pct": int(focal[1] * 100),
        })
        t = main_im.copy()
        t.thumbnail((480, 480))
        thumbs.append((slug, t))

    # Link-preview image for Facebook, WhatsApp, iMessage and Google.
    og = crop_to(ImageOps.exif_transpose(Image.open(SRC / "jh-155620.jpg")), 1200 / 630, (0.64, 0.5)).resize((1200, 630), Image.LANCZOS)
    save(og, OUT / "og-share.jpg", quality=86)

    with open(OUT / "manifest.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    cols, tw, th = 4, 480, 320
    sheet = Image.new("RGB", (cols * tw, ((len(thumbs) + cols - 1) // cols) * th), (12, 14, 22))
    for i, (_, t) in enumerate(thumbs):
        x, y = (i % cols) * tw, (i // cols) * th
        sheet.paste(t, (x + (tw - t.width) // 2, y + (th - t.height) // 2))
    save(sheet, OUT / "contact-sheet.jpg", quality=80)
    total = sum(p.stat().st_size for p in OUT.glob("*.jpg"))
    print(f"{len(rows)} images, {len(list(OUT.glob('*.jpg')))} files, {total / 1e6:.1f} MB in {OUT}")


if __name__ == "__main__":
    main()
