# Will Gray — Portfolio

A single-page portfolio site. Plain HTML, no build step, no dependencies.

```
index.html     the whole site — content and styles live here
assets/        map exhibits and field photography (JPEG)
assets/roadmap/  all 58 pages of the Pine Island roadmap, p01.jpg - p58.jpg
.nojekyll      tells GitHub Pages to serve the files as-is
```

## Publish it on GitHub Pages

1. Create a new **public** repository on GitHub. If you name it
   `<your-username>.github.io`, the site lands at the root of your domain;
   any other name works too and lands at `/<repo-name>/`.

2. From this folder, push the files:

   ```bash
   git init -b main
   git add .
   git commit -m "Portfolio site"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. In the repository on GitHub, open **Settings → Pages**, set
   **Source** to *Deploy from a branch*, pick branch `main` and folder `/ (root)`,
   and save.

The site goes live at `https://<your-username>.github.io/<repo-name>/` within
about a minute. Every later `git push` republishes it.

## Editing

Everything is in `index.html`.

- **Projects** are the five `<section class="sheet">` blocks. Each one has a
  title, a `.meta` line, a `.prose` narrative, a `.figure` image, and a
  `.notes` strip of figures at the bottom. Copy a whole block to add a sixth.
- **Design tokens** (colours, fonts, widths) are the CSS variables in the
  `:root` block at the top. Change a value once and it updates everywhere.
- **Images** go in `assets/`. Keep them under about 400 KB each so pages load
  fast — `sips -s format jpeg -s formatOptions 74 -Z 1500 in.pdf --out out.jpg`
  does the conversion and resizing on macOS.

The page is dark by default. The button in the bottom-right corner switches it
to light, and that choice is remembered in the reader's browser.

## The two interactive pieces

**Budget projector (project 01).** Enter a square footage and a cost basis; it
allocates the total across all 40 cost categories using `COSTCATS` - the mean
share of total spend across the eight historical jobs in the Sendero database.
Deliberately, the page ships no Sendero pricing: the reader supplies the cost
basis, and only the percentage structure is baked in. If you ever clear it with
Sendero, swapping in real $/sq ft averages is a one-line change to the default
`value` on `#t-rate`.

**Flight map (project 05).** Leaflet over Esri World Imagery (aerial, no API key
required - CARTO's basemaps now need one, so don't switch back). Footprints and frame positions come from `FLIGHTS`, which I built by
reading the GPS EXIF out of your drone imagery - 416 geotagged frames across five
sites. `CONTROL` holds the approximate occupation positions parsed from the RINEX
headers. Both arrays are inlined in `index.html`, so the map works from `file://`
as well as over HTTP.

Leaflet loads from cdnjs with subresource-integrity hashes. If you ever bump the
version, recompute them or the browser will refuse to load the library:

```bash
curl -s https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js | openssl dgst -sha512 -binary | openssl base64 -A
```

## The roadmap page viewer

Project 02 embeds all 58 pages of the Pine Island roadmap. Readers flip with the
arrows, drag the slider, use the left/right arrow keys, or jump straight to a
section. Only the current page and its immediate neighbours are downloaded, so
the embed costs about 160 KB on load rather than 9 MB.

To change the section shortcuts, edit `FB_SECTIONS` near the bottom of
`index.html` - each entry is a label and the page it jumps to:

```js
var FB_SECTIONS = [
  ['Cover', 1], ['Summary', 2], ['Ordinance', 9], ['Financials', 14],
  ['Timeline', 15], ['Case studies', 25], ['Appendix', 54]
];
```

To swap in a different document, re-render its pages into `assets/roadmap/`
using the same `pNN.jpg` naming and update `FB_TOTAL`.

## Things worth adding later

- A phone number in the title block, if you want it public.
- A screenshot of the tornado StoryMap, so project 04 shows its own map
  rather than the companion exhibit from the same course.
