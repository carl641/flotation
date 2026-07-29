# flotation

Redesigned homepage for [aluminumboatdocks.com](https://www.aluminumboatdocks.com/) (Flotation Systems, Inc.).

Static site, no build step: `index.html` plus `assets/` (CSS, JS, self-hosted Archivo variable font).

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Design notes

- Brand palette: olive `#61714a` (single accent), grey-green neutrals, dark teal (`#1a3130` / `#122423`) for the closing CTA band and footer.
- Hero uses the Vimeo video `1213775675` as a full-bleed background (`background=1&autoplay=1&loop=1&muted=1`). A brand gradient shows until the video loads, and the video is hidden entirely under `prefers-reduced-motion`.
- Light and dark mode are both supported via `prefers-color-scheme`.
- Internal links point at the live site's existing WordPress slugs so the page can drop into the root of aluminumboatdocks.com.

## TODO: swap placeholder photos

Section imagery currently uses seeded picsum.photos placeholders behind a brand duotone treatment. Replace each with real Flotation Systems photography (the duotone CSS keeps mixed photography cohesive, and can be removed per image by dropping the `duo` class):

| Location | Suggested photo | Approx. size |
| --- | --- | --- |
| About section | Finished dock at golden hour, portrait crop | 1000x1250 |
| Dock Collection: Sundeck (featured) | Sundeck dock from the gallery | 1200x900 |
| Dock Collection: Gable Roof, Hip Roof, Sundeck Combo, Piers & Platforms | Matching gallery photos | 800x500 each |
| Dock Collection: Marinas & Commercial, Fixed Stationary | Wide crops | 1200x520 each |
| Beaumont Series band | Beaumont dock, wide landscape | 2000x1100 |
