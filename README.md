# flotation

Redesigned homepage for [aluminumboatdocks.com](https://www.aluminumboatdocks.com/) (Flotation Systems, Inc.).

Static site, no build step: `index.html`, the Dock Styles pages, and `assets/`
(CSS, JS, self-hosted Archivo variable font).

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Pages

Each page lives at the live site's existing WordPress slug, as `<slug>/index.html`,
so the tree can drop into the root of aluminumboatdocks.com and every internal
link resolves unchanged.

| Page | Slug |
| --- | --- |
| Dock Styles (hub) | `/flotation-systems-aluminum-boat-dock-styles/` |
| Sundeck Docks | `/sundeck-boat-docks/` |
| Sundeck Combo Docks | `/sundeck-combo-boat-docks/` |
| Gable Roof Docks | `/gable-roof-covered-boat-docks/` |
| Hip Roof Docks | `/hip-roof-covered-boat-docks/` |
| Dock Piers & Platforms | `/dock-piers-boat-piers-floating-piers/` |
| Marinas & Commercial | `/marina-docks-commercial-boat-docks/` |
| Fixed & Floating | `/fixed-floating-boat-docks/` |

Copy is carried over from the corresponding pages on the current site. The
"Dock Styles" item in the header is now a flyout listing all seven styles; on
mobile it is an indented always-open list. Assets on these pages are referenced
root-relative (`/assets/...`), so preview them through the local server rather
than `file://`.

## TODO: upload the Dock Styles photography

Every photo slot on the new pages is an `.ph` placeholder block, each preceded by
an `<!-- IMAGE PLACEHOLDER: ... -->` comment describing the shot it wants. Nine
per style page, six on the hub:

| Slot | Where | Approx. size |
| --- | --- | --- |
| Hero backdrop | Full-bleed behind the page title | 2400x1200 |
| Overview portrait | Beside the intro copy | 1000x1250 |
| Configuration cards | Three, in the configurations row | 800x500 each |
| Gallery strip | Four, above the gallery link | 800x500 each |

Replace the whole `<div class="ph ...">` block with an `<img>` (keep the
surrounding `<figure>`/card markup). The hub grid and the "Other dock styles"
rows already use the real photos in `assets/images/`.

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
