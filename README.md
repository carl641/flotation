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
| Pier & Platform Gallery | `/flotation-systems-boat-dock-pier-platform-gallery/` |

Copy is carried over from the corresponding pages on the current site. The
"Dock Styles" item in the header is now a flyout listing all seven styles; on
mobile it is an indented always-open list. "Galleries" is a second flyout of the
same kind. All eight galleries are now local pages; only the "All Galleries"
hub still points at the live WordPress URL.

All links between these pages and to `assets/` are **relative** (`../assets/...`,
`../sundeck-boat-docks/`), so the site works both at a domain root and under a
subpath like GitHub Pages' `/<repo>/`. Do not change them to root-relative
(`/assets/...`) — that breaks the Pages preview. Links to pages that only exist
on the live WordPress site (contact, dealers, galleries, about) are absolute
`https://www.aluminumboatdocks.com/...` URLs so they resolve from either host;
point them back at local slugs as those pages get built out.

## Dock Styles photography

Photos are hosted on Uploadcare and referenced by full CDN URL; no image files
live in this repo. Two style pages carry photography so far - Piers & Platforms
and Sundeck. The rest still hold `.ph` placeholder blocks, each preceded by an
`<!-- IMAGE PLACEHOLDER: ... -->` comment describing the shot it wants.

Every style page has the same nine slots (the hub has six):

| Slot | Where | Frame |
| --- | --- | --- |
| Hero | Full-bleed behind the page title | Fills the hero |
| Overview portrait | Beside the intro copy | 4/5 |
| Configuration cards | Three, in the configurations row | 16/10 each |
| Gallery strip | Four, above the gallery link | 16/10 each |

**House rules for these slots** - follow them on every style page:

1. **The hero is a carousel.** Stack the images inside
   `<div class="hero-media hero-media-photo hero-media-slideshow">`, in the
   order given. They cross-fade every 5.5s (`assets/js/main.js`). The first
   image gets `fetchpriority="high"`, the rest `loading="lazy"`; all take
   `alt=""` because the hero is decorative. With JS off, or under
   `prefers-reduced-motion`, the first image simply holds.
2. **Frames keep the placeholder's size.** Replace the whole
   `<div class="ph ...">` block with an `<img>` and leave the surrounding
   `<figure>` / card markup alone. The stylesheet gives each slot the ratio its
   placeholder had, so swapping in a photo never moves the layout.
3. **Photos zoom to fill the frame.** `object-fit: cover` on
   `.split-media > img`, `.config-card > img` and `.gallery-strip img`: the
   photo keeps its own proportions and scales up until it covers the box,
   cropping at the edges. Never letterbox (`contain`) and never distort - a
   rectangle stays a rectangle, the frame just shows a window onto it. Where a
   crop cuts the subject, fix that one image with `object-position`, not by
   changing the fit.
4. Keep `width`/`height` attributes on every `<img>` so the browser reserves
   space. They only work because the base `img` rule sets `height: auto` - do
   not remove it, or an image constrained narrower than its attribute width
   will stretch vertically.
5. Where a page runs short of new photos, fill the remaining slots from that
   style's gallery page and reuse the gallery caption as the `alt` text.

## Galleries

Eight gallery pages carry every photo and caption from the current site, in the
same groups it uses (typically Recent Projects, 2022-2023, and 2021 and
previous):

| Gallery | Slug | Photos |
| --- | --- | --- |
| Sundeck | `/flotation-systems-sundeck-boat-dock-gallery/` | 104 |
| Sundeck Combo | `/flotation-systems-sundeck-combo-boat-dock-gallery/` | 44 |
| Gable Roof | `/flotation-systems-gable-roof-boat-dock-gallery/` | 66 |
| Hip Roof | `/flotation-systems-hip-roof-boat-dock-gallery/` | 149 |
| Pier & Platform | `/flotation-systems-boat-dock-pier-platform-gallery/` | 57 |
| ADA Compliant | `/flotation-systems-ada-compliant-boat-dock-gallery/` | 13 |
| Marinas & Commercial | `/flotation-systems-commercial-marina-boat-docks-gallery/` | 42 |
| Fixed & Stationary | `/flotation-systems-fixed-stationary-dock-gallery/` | 13 |

The ADA gallery had no link on the live site, so its slug is a guess - confirm
it before launch. The others match the live site's existing slugs. The photos are hosted on Uploadcare and
referenced by their full CDN URLs (`https://1fugrywua1.ucarecd.net/<uuid>/...`);
no image files live in this repo. To serve smaller derivatives, insert
Uploadcare operations between the UUID and the filename, e.g.
`/<uuid>/-/scale_crop/900x675/center/-/format/auto/<file>.jpg`.

Clicking any photo opens the lightbox (`#lightbox` markup on the page, behavior
and styles in `assets/js/main.js` / `assets/css/style.css`): the caption shows
under the photo, with left/right arrows, keyboard arrows and Esc, swipe on
touch, neighbour preloading, and focus returned to the tile on close. The
lightbox script is generic - any page with `.gallery-open` buttons plus the
`#lightbox` markup gets the same behavior.

The caption on the eighth 2022-2023 photo reads "P3-22" because that is the
label on the current live page (the file behind it is `P3(8)-22.jpg`); it looks
like a typo there but the copy was carried over as-is.

## Design notes

- Brand palette: olive `#61714a` (single accent), grey-green neutrals, dark teal (`#1a3130` / `#122423`) for the closing CTA band and footer.
- Hero uses the Vimeo video `1213775675` as a full-bleed background (`background=1&autoplay=1&loop=1&muted=1`). A brand gradient shows until the video loads, and the video is hidden entirely under `prefers-reduced-motion`.
- Light and dark mode are both supported via `prefers-color-scheme`.
- Page slugs match the live site's existing WordPress slugs, so the tree can drop into the root of aluminumboatdocks.com with links intact.

## TODO: swap placeholder photos

Section imagery currently uses seeded picsum.photos placeholders behind a brand duotone treatment. Replace each with real Flotation Systems photography (the duotone CSS keeps mixed photography cohesive, and can be removed per image by dropping the `duo` class):

| Location | Suggested photo | Approx. size |
| --- | --- | --- |
| About section | Finished dock at golden hour, portrait crop | 1000x1250 |
| Dock Collection: Sundeck (featured) | Sundeck dock from the gallery | 1200x900 |
| Dock Collection: Gable Roof, Hip Roof, Sundeck Combo, Piers & Platforms | Matching gallery photos | 800x500 each |
| Dock Collection: Marinas & Commercial, Fixed Stationary | Wide crops | 1200x520 each |
| Beaumont Series band | Beaumont dock, wide landscape | 2000x1100 |
