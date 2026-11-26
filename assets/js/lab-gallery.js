/*
 * LAB GALLERY — the only file you need to edit to add lab photos.
 *
 * 1. Put the image in assets/labs/<id>/  (e.g. assets/labs/kuleuven/cleanroom.jpg).
 *    Aim for ~1600 px on the long side, JPEG quality ~80, so pages stay fast.
 * 2. Add a line to that organisation's `photos` list:
 *      { src: 'assets/labs/kuleuven/cleanroom.jpg', caption: 'IGZO wafer inspection', year: '2026' },
 *    Optional: `thumb` (a smaller copy for the grid) and `alt` (text for screen readers).
 * 3. Commit and push. Organisations with no photos yet are shown greyed out.
 *
 * Only post photos you are allowed to share — industry labs (AMD, ISRO) often restrict this.
 */
window.LAB_GALLERY = [
  {
    id: 'kuleuven',
    org: 'KU Leuven',
    unit: 'COSIC · Embedded Systems & Security',
    place: 'Diepenbeek & Leuven, Belgium',
    period: '2026 –',
    photos: [
      // { src: 'assets/labs/kuleuven/01.jpg', caption: 'ES&S lab, Campus Diepenbeek', year: '2026' },
    ]
  },
  {
    id: 'amd',
    org: 'AMD',
    unit: 'Silicon Design Engineering',
    place: 'Hyderabad, India',
    period: '2025 – 2026',
    photos: []
  },
  {
    id: 'iitgn',
    org: 'IIT Gandhinagar',
    unit: 'EDSL Lab · Prof. Sandip Lashkare',
    place: 'Gandhinagar, India',
    period: '2023 – 2025',
    photos: []
  },
  {
    id: 'isro',
    org: 'Space Applications Centre, ISRO',
    unit: 'Research internship',
    place: 'Ahmedabad, India',
    period: '2023',
    photos: []
  },
  {
    id: 'smit',
    org: 'Sikkim Manipal Institute of Technology',
    unit: 'Electronics & Communication Engineering',
    place: 'Sikkim, India',
    period: '2019 – 2023',
    photos: []
  }
];
