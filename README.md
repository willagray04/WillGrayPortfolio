# Will Gray — Portfolio

A multi-page portfolio site. Plain HTML and CSS, no build step, no dependencies.

Live at **https://willagray04.github.io/WillGrayPortfolio/**

```
index.html       home — name, headline, featured project
about.html       about me and the work I want
projects.html    a card for each project, linking to its page
project-1.html   Brazos County multi-hazard risk mapping, in full
project-2.html   Sendero Homes estimating tool, in full
resume.html      resume as a web page, with a PDF download
style.css        shared by every page
estimator.js     budget projector, shared by index and project-2
resume.pdf       downloadable resume
assets/          figures and photographs
assets/roadmap/  all 58 pages of the Pine Island roadmap
.nojekyll        tells GitHub Pages to serve the files as-is
```

Every page links to `style.css`, carries the same menu (Home, About, Projects,
Resume), and has the email address in the footer.

## Updating it

Edit, then:

```bash
cd /Users/williamgray/Downloads/will-gray-portfolio && git add . && git commit -m "Update portfolio" && git push
```

Changes go live about a minute after each push. Authentication is an SSH key, so
there is nothing to type.

## Conventions

**`[ADD]` markers.** Anything the source material did not supply is marked
`<span class="add">[ADD]</span>` rather than guessed at — unwritten project
pages, results that do not exist yet, team member names. Search for `class="add"`
to find them all. Fill them in as the facts arrive.

**Design tokens.** Colours, fonts and widths are CSS variables in the `:root`
block at the top of `style.css`. Change a value once and every page follows.

**Theme.** Dark by default; the button bottom-right switches to light and the
choice is remembered per browser.

**Images.** Keep them under about 400 KB. On macOS:

```bash
sips -s format jpeg -s formatOptions 74 -Z 1500 input.pdf --out assets/output.jpg
```

## The budget projector

`estimator.js` holds `COSTCATS` — forty `[code, name, share, jobs]` rows, each
share being that category's mean percentage of total spend across the eight
historical jobs. It drives the projector on both `index.html` and
`project-2.html`; one file, so the two can never drift apart. A page gets the
tool by including the markup ids `#t-sqft #t-rate #t-total #t-bars` and loading
the script.

No Sendero pricing ships in it. The reader supplies the cost basis and only the
percentage structure is baked in — the client names and per-job totals in the
original SQL stay out of the repo.

## Map thumbnails

Card thumbnails are cropped to the map body (`assets/thumb-*.jpg`), dropping the
white paper margins, title blocks and legends that made them glare against the
dark page. The full sheets with their legends belong on the project pages. CSS
also takes a little brightness off light images at rest and restores it on hover.

To crop a new one:

```bash
sips --cropOffset <top> <left> --cropToHeightWidth <h> <w> in.jpg --out out.jpg
```

## Adding the remaining project pages

`projects.html` has six cards. Two link to real pages; the other four are marked
`[ADD]`. To add one, copy `project-1.html`, keep the same
six sections (problem, role, data and method, figure, what I found, what I would
do differently), and point the card's link at it.

The earlier single-page version of this site — with a 58-page roadmap viewer, an
interactive construction budget projector, and a Leaflet map of five drone flight
sites built from GPS EXIF — is preserved on the `one-page-version` branch. Those
components can be lifted into project pages 2 through 5:

```bash
git show one-page-version:index.html > /tmp/one-page.html
```

## Leaflet

`project-1.html` loads Leaflet 1.9.4 from cdnjs with subresource-integrity
hashes, over Esri World Imagery (no API key required — CARTO's basemaps now need
one, so don't switch back). If you bump the version, recompute the hashes or the
browser will refuse to load it:

```bash
curl -s https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js | openssl dgst -sha512 -binary | openssl base64 -A
```

## Note on the resume PDF

`resume.pdf` is your resume with the mailing address and phone number removed,
since the site is public. The original is in your Downloads folder as
`Resume_-_Will_Gray.pdf` if you ever want to swap it in.
