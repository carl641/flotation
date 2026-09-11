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
| ADA Compliant Docks | `/ada-compliant-boat-docks/` |
| Specialty Styles (Beaumont, Lodge) | `/specialty-dock-styles/` |
| Fixed & Floating | `/fixed-floating-boat-docks/` |
| Options & Accessories | `/options-accessories/` |
| Tech Specs | `/tech-specs/` |
| About | `/about-flotation-systems-aluminum-boat-docks/` |
| Color Choices | `/boat-dock-color-choices/` |
| Ramps & Bridges | `/ramps-bridges/` |
| Slip Configurations | `/slip-configurations/` |
| WavePro™ Technology | `/wavepro-technology/` |
| LockDry® Marine Decking | `/lockdry-marine-decking/` |
| Contact Us | `/contact-flotation-systems/` |
| Warranty Information | `/warranty-information/` |

The nine galleries are listed under **Galleries** below. The ADA style page and
ADA gallery slugs are guesses - the live site has no link to either - so confirm
them before launch. So are the eight slugs added with the new nav (Options &
Accessories through Warranty Information, except About, which uses the live
site's existing about slug); the live site has no equivalent
pages, so pick final slugs before launch.

Copy is carried over from the corresponding pages on the current site, except on
the eight pages listed below under **Template pages**.

### Navigation

The header menu is, in order: **Dock Styles**, **Options & Accessories**,
**Tech Specs**, **Galleries**, **About**, then the **Get a Quote** button.
Every item is both a link and a flyout parent. On mobile every flyout is an
indented, always-open list, so nothing depends on hover.

| Menu item | Links to | Dropdown |
| --- | --- | --- |
| Dock Styles | `/flotation-systems-aluminum-boat-dock-styles/` | the nine style pages |
| Options & Accessories | `/options-accessories/` | Colors, Ramps & Bridges, Slip Configurations |
| Tech Specs | `/tech-specs/` | WavePro™ Technology, LockDry® Marine Decking |
| Galleries | `/flotation-systems-galleries/` | the eight style galleries |
| About | `/about-flotation-systems-aluminum-boat-docks/` | Contact, Warranty Information |
| Get a Quote (button) | `/contact-flotation-systems/` | - |

The nav is generated from a single model rather than hand-edited per page - when
it changes, regenerate it on all pages so the 31 copies stay identical.

### Options & Accessories

`options-accessories/` carries the copy from the live site's two separate
**Boat Dock Options** and **Boat Dock Accessories** pages, combined into one
page with a clear split: `#options` covers what is built into the dock (lifts,
WavePro™ 6 posts, slip fill-ins, alternative decking, swim platforms, closets,
stairs, shades, cupolas, railings), `#accessories` covers what is added on top
(covers, floats, dog gear, board racks, kayak launches, fish stations, lights,
ladders, diving boards, seating, storage, hardware). The hero is a six-photo carousel of
gallery docks, followed by a sticky `gallery-jump` bar (the same component the
galleries hub uses) linking the eight groups on the page.

Each half opens with one full split - watercraft lifts, and the Marine Concepts
cover system - and the remaining items are `config-card` tiles grouped into
"Built into the dock", "Railings", "On the water", "Fishing & lighting",
"Seating & storage" and "Hardware". Each tile carries a one-line summary with
the rest of the live copy collapsed behind a `card-more` `<details>` toggle, so
the page stays scannable without dropping any of it: closed, the page is about
13,000px instead of 31,000px.

All 49 `opt-`/`acc-` Uploadcare photos are used: each item's primary shot is
the tile (or split) image, and extra shots sit inside that item's `<details>`
as a `card-more-shots` row - or, on the two splits, in a `gallery-strip
strip-under` below.

### Get a Quote

`get-boat-dock-quote/` (the live site's quote slug) combines three live pages,
laid out like Contact Us:

- **Request a quote** - copy beside a `.placeholder-box` for the form embed
  (most likely the same form as Contact Us).
- **How to order** - the LockDry decking Sketch / Detail / Send steps, each
  with its `order-step` photo.
- **After you send it** - quote turnaround, payment methods and lead times.
- **Find a dealer** - the live intro copy and the "taking on dealers
  nationwide" line.
- **Dealer spotlight** - Randy Travis, illustrated with gallery photos (the
  live site's spotlight shots were never supplied) - followed by
  the first five dealers as cards (contact, email, site, address, phone,
  territories, and the bio where the live site has a real one). The other
  twenty are in `scratchpad/dealers.py` if the list should grow or move to a
  dealer page of its own.

The header's "Get a Quote" button now points here rather than at Contact Us.

Most dealer bios are still lorem ipsum on the live site, so those cards carry
contact details only - they need real copy before launch.

### Warranty Information

`warranty-information/` carries the live page's copy: the promise, the four
things that stand behind it as a feature grid, and the dealer support section
with the warranty seal (uncropped, via `full-media`). The hero is a four-photo
carousel of gallery docks.

### Contact Us

`contact-flotation-systems/` carries the live page's copy: the intro line, the
full address block (phone, toll-free, fax, email, hours) and "Come by and see
us." The page runs: intro copy
beside the form slot, then one card with the map above the address
and numbers, then "Come by and see us" with the owners photo.

- **The form is a `.placeholder-box`** - an olive-wash box reading "Form
  placeholder", the same wash the photo slots use, sitting where the form
  goes. Replace the whole box with the form embed.
- **The map sits inside the address card**, above the address and numbers, as
  one `contact-card`.
- **The map is a keyless Google Maps embed** pinned to 2700 Alabama Highway 69
  South, in its own full-width section. It needs no API key, but swap in your
  map plugin or a keyed embed if you prefer; an "Open in Google Maps" link sits
  beneath it either way.

### About Us

`about-flotation-systems-aluminum-boat-docks/` carries the live About page's
copy and all five `about` files: the plant as the hero, the owners photo and
the dealer-network map with real `<figcaption>` credits. The warranty section
is lifted onto its own `warranty-panel` - a bordered card carrying both seals
and a "Read the warranty" button - so the promise stands out from the page
flow; Contact Us and Warranty Information are also the hero's two buttons.

The owners photo uses `img.full-media` (`aspect-ratio: auto; object-fit:
contain`), because a group portrait has to be seen whole - a cover crop cuts
people out of it.

### Tech Specs

`tech-specs/` opens with "Every dock comes down to three things" - how it is
engineered (WavePro™), what you walk on (LockDry®), and what it is made of.
The first two cards lead to their own pages; the third is an in-page link,
because the rest of the page *is* Materials & Methods: the live site's
materials/design/manufacturing copy, the six construction spec lists, and all
six `material-construction` shop photos, under a hero carousel of gallery
docks. There is no separate `/materials-methods/` page - it was folded into
this one, and links that pointed at it now point here.

### LockDry® Marine Decking

`lockdry-marine-decking/` carries the live page's copy and all 12 `lockdry`/
`deck` files. The hero is a five-photo carousel of gallery docks; the logo sits
above the intro; the gutter animation and the starter/main/finisher plank
profiles use the `plan-media` contain treatment. The decking specs are a
`spec-table`, and the four decking colors repeat here as a `swatch-grid`.

The page and the Colors page link to each other with buttons: "See all dock
colors" and "Decking colors" here, "More on LockDry® decking" in the Colors
page's decking section.

### WavePro™ Technology

`wavepro-technology/` carries the live page's copy and all 14 `wave` files. The
hero is the mockup render; `wave (logo1)` sits above the intro and `wave
(logo2)` is the closing banner. The eleven numbered files are CAD drawings and
component cut-outs, so they use `img.plan-media` (`object-fit: contain`) like
the slip plans - the detail they show is the point, and a cover crop would cut
it off.

### Slip Configurations

`slip-configurations/` carries the live page's copy. The four `slip-*` files
are plan drawings, not photographs, so they use `img.plan-media`
(`object-fit: contain` on a light ground) instead of the usual cover crop -
cropping a plan drawing loses the layout it exists to show. The hero is a
five-photo carousel of gallery docks, and the page's closing sections link out
to Fixed & Floating, Ramps & Bridges, Dock Styles, and the two halves of
Options & Accessories.

### Ramps & Bridges

`ramps-bridges/` carries the live page's copy and all 14 `ramps` photos. The
seven filenames marked `(gallery)` are the hero carousel and the "Explore more
boat dock ramp designs" grid; `ramps1` and `ramps4` are split media; the rest
are the captioned grid. The two photos that carry burned-in labels on the live
site (`ramps5`, `ramps6` - "ADA picket rails and grab bars with a transition
plate") and `ramps7` ("Dock, pier and ramp gates") have those labels as
`<figcaption>` text below the photo instead. Both grids feed the shared
lightbox, same as a gallery page.

### Build status

Every page now carries the live site's own copy; no "Still to come" placeholder
sections remain. Two things are still outstanding:

- **The contact form embed** - `contact-flotation-systems/` has a
  `.placeholder-box` where the form goes. See **Contact Us** above.
- **Alt text for photos nobody has described.** The Uploadcare CDN is not
  reachable from the machine these pages were built on, so alt text for the
  dock photography is generic and keyed to each item's name. Anything a
  screen reader should hear more precisely needs a human who can see the
  photos.

All links between these pages and to `assets/` are **relative** (`../assets/...`,
`../sundeck-boat-docks/`), so the site works both at a domain root and under a
subpath like GitHub Pages' `/<repo>/`. Do not change them to root-relative
(`/assets/...`) — that breaks the Pages preview. Links to pages that only exist
on the live WordPress site (dealers, about) are absolute
`https://www.aluminumboatdocks.com/...` URLs so they resolve from either host;
point them back at local slugs as those pages get built out. Every "Get a Quote" and "Contact Us"
link now points at the local `contact-flotation-systems/` page, and every
"About Us" link at the local about page, instead of the live URLs.

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

A ninth page, `/flotation-systems-galleries/`, is the hub: it excerpts the 6
most recent projects from each gallery behind a "View more" button to the full
gallery, and shares the
galleries' hero, jump nav, grid and lightbox.

The ADA gallery had no link on the live site, so its slug is a guess - confirm
it before launch. The others match the live site's existing slugs.

The photos are hosted on Uploadcare and
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

In the Pier & Platform gallery, the caption on the eighth 2022-2023 photo
reads "P3-22" because that is the
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
