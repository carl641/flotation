#!/usr/bin/env python3
"""Stamp every page's stylesheet and script link with a short hash of the file.

Browsers and the host cache assets/css/style.css and assets/js/main.js by URL,
so an edit to either can take a while to show up. Run this after changing
them: each page's link gets ?v=<hash of the current file>, the URL changes
whenever the file does, and visitors load the new copy straight away.

    python3 tools/stamp-assets.py
"""
import hashlib
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ["assets/css/style.css", "assets/js/main.js"]

stamps = {a: hashlib.sha1((ROOT / a).read_bytes()).hexdigest()[:10] for a in ASSETS}
changed = 0
for page in ROOT.rglob("*.html"):
    if ".git" in page.parts:
        continue
    text = page.read_text()
    new = text
    for asset, stamp in stamps.items():
        new = re.sub(r'((?:href|src)="(?:\.\./)*' + re.escape(asset) + r')(?:\?v=[0-9a-f]+)?"',
                     r'\1?v=' + stamp + '"', new)
    if new != text:
        page.write_text(new)
        changed += 1
print("stamped", changed, "pages:", ", ".join(f"{a}?v={s}" for a, s in stamps.items()))
