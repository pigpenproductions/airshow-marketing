"""Clean ticket-buyer exports (Ticketflex, Weeztix) for Mailchimp.

Usage:
  python3 scripts/clean_contacts.py OUT_DIR export1.csv [export2.csv ...]

Writes to OUT_DIR (keep it OUT of the git repo, it holds personal data):
  mailchimp-contacts.csv  one row per email, Mailchimp column names
  sms-candidates.csv      UK mobiles only, one row per number
  report.txt              counts and every row that was dropped or flagged, with reasons

It does not decide consent. Columns it can't see (opt-in status) must come
from the export; see the report for what's missing.
"""

import csv
import re
import sys
from collections import Counter, OrderedDict
from pathlib import Path

INTERNAL_DOMAINS = {"headcornairshow.com"}
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def norm_phone(raw):
    """Return (e164 or None, kind) where kind is uk_mobile, uk_mobile_inferred,
    uk_landline, international, missing or invalid."""
    s = (raw or "").strip()
    if s in ("", "-"):
        return None, "missing"
    s = s.replace("O", "0").replace("o", "0")
    s = re.sub(r"\(0\)", "", s)
    s = re.sub(r"[\s\-().]", "", s)
    if s.startswith("00"):
        s = "+" + s[2:]
    if s.startswith("+44"):
        s = "0" + s[3:]
    elif s.startswith("44") and len(s) == 12:
        s = "0" + s[2:]
    if s.startswith("+"):
        return s, "international"
    if not s.isdigit():
        return None, "invalid"
    if re.fullmatch(r"07\d{9}", s):
        return "+44" + s[1:], "uk_mobile"
    if re.fullmatch(r"7\d{9}", s):
        return "+44" + s, "uk_mobile_inferred"
    if re.fullmatch(r"0[123]\d{8,9}", s):
        return "+44" + s[1:], "uk_landline"
    return None, "invalid"


def tidy_name(name):
    name = re.sub(r"\s+", " ", (name or "").strip())
    if name.isupper() or name.islower():
        name = name.title()
    for prefix in ("Mr ", "Mrs ", "Ms ", "Miss ", "Dr "):
        if name.startswith(prefix):
            name = name[len(prefix):]
    parts = name.split(" ", 1)
    return parts[0], (parts[1] if len(parts) > 1 else "")


def read_rows(path):
    with open(path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        cols = {c.lower().strip(): c for c in reader.fieldnames or []}
        for row in reader:
            get = lambda *keys: next((row[cols[k]] for k in keys if k in cols), "")
            first, last = get("first name", "firstname"), get("last name", "lastname")
            if not first and not last:
                first, last = tidy_name(get("name", "full name"))
            else:
                first, last = tidy_name(f"{first} {last}")
            yield {
                "email": get("email", "email address").strip(),
                "first": first,
                "last": last,
                "phone_raw": get("phone", "phone number", "mobile", "telephone"),
                "optin": get("marketing", "marketing opt-in", "opt-in", "optin", "newsletter", "accepts marketing"),
                "source": Path(path).name,
                "has_optin_col": any(k in cols for k in ("marketing", "marketing opt-in", "opt-in", "optin", "newsletter", "accepts marketing")),
            }


def main():
    out = Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    report, people = [], OrderedDict()
    kinds = Counter()
    optin_cols = set()

    for path in sys.argv[2:]:
        for r in read_rows(path):
            optin_cols.add((r["source"], r["has_optin_col"]))
            email = r["email"].lower()
            if not EMAIL_RE.match(email):
                report.append(f"DROP bad email: {r['email']!r} ({r['source']})")
                continue
            if email.split("@")[1] in INTERNAL_DOMAINS:
                report.append(f"DROP internal address: {email}")
                continue
            phone, kind = norm_phone(r["phone_raw"])
            r.update(email=email, phone=phone, kind=kind)
            if email in people:
                prev = people[email]
                if not prev["phone"] and phone:
                    prev.update(phone=phone, kind=kind)
                report.append(f"MERGE duplicate email: {email}")
                continue
            people[email] = r

    for p in people.values():
        kinds[p["kind"]] += 1
        if p["kind"] in ("invalid",):
            report.append(f"FLAG unusable phone {p['phone_raw']!r}: {p['email']}")
        if p["kind"] == "uk_mobile_inferred":
            report.append(f"FLAG assumed UK mobile (missing 0) {p['phone_raw']!r}: {p['email']}")

    with open(out / "mailchimp-contacts.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["Email Address", "First Name", "Last Name", "Phone Number", "Phone Type", "Source"])
        for p in people.values():
            w.writerow([p["email"], p["first"], p["last"], p["phone"] or "", p["kind"], p["source"]])

    seen, sms = {}, []
    for p in people.values():
        if p["kind"] not in ("uk_mobile", "uk_mobile_inferred"):
            continue
        if p["phone"] in seen:
            report.append(f"FLAG shared mobile {p['phone']}: {seen[p['phone']]} and {p['email']} (kept first)")
            continue
        seen[p["phone"]] = p["email"]
        sms.append(p)
    with open(out / "sms-candidates.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["Email Address", "First Name", "Last Name", "SMS Phone Number"])
        for p in sms:
            w.writerow([p["email"], p["first"], p["last"], p["phone"]])

    summary = [
        f"Unique contacts (by email): {len(people)}",
        *[f"  phone {k}: {v}" for k, v in kinds.most_common()],
        f"SMS candidates (unique UK mobiles): {len(sms)}",
        "Opt-in column present: " + ", ".join(f"{s}={'yes' if has else 'NO'}" for s, has in sorted(optin_cols)),
    ]
    (out / "report.txt").write_text("\n".join(summary + [""] + report) + "\n")
    print("\n".join(summary))
    print(f"\n{len(report)} report lines in {out / 'report.txt'}")


if __name__ == "__main__":
    main()
