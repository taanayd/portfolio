# taanayd.github.io/portfolio

Personal academic site of Tanay Das. Plain HTML and CSS with no build step; GitHub Pages serves it as-is.

| Page | File |
|---|---|
| Home | `index.html` |
| Research | `research.html` |
| Publications | `publications.html` |
| Projects | `projects.html` |
| Experience, education, awards, teaching, skills | `experience.html` |
| Lab gallery | `gallery.html` (data in `assets/js/lab-gallery.js`) |
| Photography | `photography.html` |

Old URLs (`papers.html`, `journey.html`, `work.html`, `tools.html`, `toolkit.html`) redirect to the new pages.

## Adding lab photos
1. Put the image in `assets/labs/<org-id>/` (for example `assets/labs/kuleuven/cleanroom.jpg`), about 1600 px on the long side.
2. Add `{ src: 'assets/labs/kuleuven/cleanroom.jpg', caption: 'IGZO wafer inspection', year: '2026' }` to that organisation's `photos` list in `assets/js/lab-gallery.js`.
3. Commit and push.

## Third-party
- [PhotoSwipe 5.4.4](https://github.com/dimsemenov/PhotoSwipe) (MIT) for the lightbox, vendored in `assets/vendor/photoswipe/`.
- Fonts: Newsreader, IBM Plex Sans and IBM Plex Mono (SIL OFL), self-hosted in `assets/fonts/`.
- Light/dark theme follows the system setting; the toggle in the header remembers your choice.
