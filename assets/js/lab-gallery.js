/*
 * LAB GALLERY — the only file you need to edit to add photos or videos.
 *
 * Photo:  { src: 'assets/labs/<id>/name.jpg', thumb: 'assets/labs/<id>/name-sm.jpg', w: 1800, h: 1350,
 *           caption: 'What is happening', year: '2026' }
 * Video:  { type: 'video', src: 'assets/labs/<id>/clip.mp4', poster: 'assets/labs/<id>/clip-poster.jpg',
 *           w: 540, h: 960, caption: '…', year: '2025' }
 *
 * Keep photos about 1800 px on the long side (JPEG quality ~80) with a ~900 px "-sm" copy for the grid.
 * `w` and `h` are the full-size pixel dimensions; they let the lightbox open instantly.
 * Organisations with no photos are shown greyed out.
 */
window.LAB_GALLERY = [
  {
    id: 'kuleuven',
    org: 'KU Leuven',
    unit: 'COSIC · Embedded Systems & Security',
    place: 'Diepenbeek & Leuven, Belgium',
    period: '2026 – present',
    photos: [
      { src: 'assets/labs/kuleuven/winter-market-2026.jpg', thumb: 'assets/labs/kuleuven/winter-market-2026-sm.jpg', w: 1800, h: 1350,
        caption: 'Winter-market outing with colleagues in Belgium', year: '2026' }
    ]
  },
  {
    id: 'amd',
    org: 'AMD',
    unit: 'Silicon Design Engineering',
    place: 'Hyderabad, India',
    period: '2025 – 2026',
    photos: [
      { src: 'assets/labs/amd/amd-office.jpg', thumb: 'assets/labs/amd/amd-office-sm.jpg', w: 1800, h: 1356,
        caption: 'At the AMD office in Hyderabad', year: '2025' },
      { src: 'assets/labs/amd/amd-team.jpg', thumb: 'assets/labs/amd/amd-team-sm.jpg', w: 1800, h: 1013,
        caption: 'With the team at AMD Hyderabad', year: '2026' },
      { src: 'assets/labs/amd/amd-colleagues.jpg', thumb: 'assets/labs/amd/amd-colleagues-sm.jpg', w: 1600, h: 1201,
        caption: 'Colleagues between meetings', year: '2025' },
      { src: 'assets/labs/amd/amd-gift-exchange.jpg', thumb: 'assets/labs/amd/amd-gift-exchange-sm.jpg', w: 960, h: 1280,
        caption: 'Gift exchange with the team', year: '2025' }
    ]
  },
  {
    id: 'iitgn',
    org: 'IIT Gandhinagar',
    unit: 'EDSL · Prof. Sandip Lashkare',
    place: 'Gandhinagar, India',
    period: '2023 – 2025',
    photos: [
      { src: 'assets/labs/iitgn/thesis-defence-2025.jpg', thumb: 'assets/labs/iitgn/thesis-defence-2025-sm.jpg', w: 1800, h: 1356,
        caption: 'M.Tech thesis defence: ESD protection and clamping circuits for brain–machine interfaces', year: 'June 2025' },
      { src: 'assets/labs/iitgn/lab-group.jpg', thumb: 'assets/labs/iitgn/lab-group-sm.jpg', w: 1800, h: 1356,
        caption: 'With the lab group', year: '2025' },
      { type: 'video', src: 'assets/labs/iitgn/iitgn-reel.mp4', poster: 'assets/labs/iitgn/iitgn-reel-poster.jpg', w: 540, h: 960,
        caption: 'Two years at IIT Gandhinagar, in one minute', year: '2023 – 2025' },
      { src: 'assets/labs/iitgn/convocation-class-of-2025.jpg', thumb: 'assets/labs/iitgn/convocation-class-of-2025-sm.jpg', w: 1800, h: 1356,
        caption: 'Convocation, Class of 2025', year: 'June 2025' },
      { src: 'assets/labs/iitgn/labmates-evening.jpg', thumb: 'assets/labs/iitgn/labmates-evening-sm.jpg', w: 1800, h: 1353,
        caption: 'An evening with labmates', year: '2025' },
      { src: 'assets/labs/iitgn/convocation-mentors.jpg', thumb: 'assets/labs/iitgn/convocation-mentors-sm.jpg', w: 1800, h: 1356,
        caption: 'After the convocation with mentors and friends', year: 'June 2025' },
      { src: 'assets/labs/iitgn/farewell-class-of-2025.jpg', thumb: 'assets/labs/iitgn/farewell-class-of-2025-sm.jpg', w: 1280, h: 960,
        caption: 'Class of 2025 farewell', year: '2025' },
      { src: 'assets/labs/iitgn/convocation-1.jpg', thumb: 'assets/labs/iitgn/convocation-1-sm.jpg', w: 1353, h: 1800,
        caption: 'Convocation day', year: 'June 2025' },
      { src: 'assets/labs/iitgn/classmates-night.jpg', thumb: 'assets/labs/iitgn/classmates-night-sm.jpg', w: 1800, h: 1350,
        caption: 'Classmates on a late walk across campus', year: '2025' },
      { src: 'assets/labs/iitgn/convocation-2.jpg', thumb: 'assets/labs/iitgn/convocation-2-sm.jpg', w: 1800, h: 1353,
        caption: 'Convocation day', year: 'June 2025' },
      { src: 'assets/labs/iitgn/convocation-3.jpg', thumb: 'assets/labs/iitgn/convocation-3-sm.jpg', w: 1800, h: 1353,
        caption: 'Convocation day', year: 'June 2025' }
    ]
  },
  {
    id: 'conferences',
    org: 'Conferences',
    unit: 'Talks & posters',
    place: 'ICEE 2025',
    period: '2025',
    photos: [
      { src: 'assets/labs/conferences/icee-2025-poster.jpg', thumb: 'assets/labs/conferences/icee-2025-poster-sm.jpg', w: 1280, h: 960,
        caption: 'Poster at ICEE 2025: ESD protection with on-chip diodes for 65 nm high-voltage neurostimulators', year: '2025' },
      { src: 'assets/labs/conferences/icee-2025-lunch.jpg', thumb: 'assets/labs/conferences/icee-2025-lunch-sm.jpg', w: 1368, h: 912,
        caption: 'Lunch with fellow researchers at ICEE 2025', year: '2025' }
    ]
  },
  {
    id: 'isro',
    org: 'Space Applications Centre, ISRO',
    unit: 'Research internship',
    place: 'Ahmedabad, India',
    period: '2023',
    photos: [
      { src: 'assets/labs/isro/ahmedabad-riverfront.jpg', thumb: 'assets/labs/isro/ahmedabad-riverfront-sm.jpg', w: 1800, h: 1350,
        caption: 'Weekend at the Sabarmati Riverfront with fellow interns', year: '2023' },
      { src: 'assets/labs/isro/ahmedabad-lakeside.jpg', thumb: 'assets/labs/isro/ahmedabad-lakeside-sm.jpg', w: 1800, h: 1350,
        caption: 'Lakeside evening in Ahmedabad during the internship', year: '2023' },
      { src: 'assets/labs/isro/ahmedabad-evening.jpg', thumb: 'assets/labs/isro/ahmedabad-evening-sm.jpg', w: 1800, h: 1350,
        caption: 'An evening out in Ahmedabad with fellow interns', year: '2023' },
      { src: 'assets/labs/isro/arcade-evening.jpg', thumb: 'assets/labs/isro/arcade-evening-sm.jpg', w: 1600, h: 900,
        caption: 'Arcade evening with fellow interns from SAC, ISRO', year: '2023' }
    ]
  },
  {
    id: 'smit',
    org: 'Sikkim Manipal Institute of Technology',
    unit: 'Electronics & Communication Engineering',
    place: 'Sikkim, India',
    period: '2019 – 2023',
    photos: [
      { src: 'assets/labs/smit/batch-photo.jpg', thumb: 'assets/labs/smit/batch-photo-sm.jpg', w: 1024, h: 768,
        caption: 'With the batch at convocation', year: '2023' },
      { src: 'assets/labs/smit/fest-formal-night.jpg', thumb: 'assets/labs/smit/fest-formal-night-sm.jpg', w: 1800, h: 1200,
        caption: 'Formal night at the college fest', year: '' },
      { src: 'assets/labs/smit/friends-fest-week.jpg', thumb: 'assets/labs/smit/friends-fest-week-sm.jpg', w: 1152, h: 648,
        caption: 'College friends during fest week', year: '' }
    ]
  },
  {
    id: 'moments',
    org: 'Along the way',
    unit: 'Friends & evenings out',
    place: 'India',
    period: '',
    photos: [
      { src: 'assets/labs/moments/evening-out-2025.jpg', thumb: 'assets/labs/moments/evening-out-2025-sm.jpg', w: 1600, h: 1200,
        caption: 'An evening out with friends', year: 'Nov 2025' },
      { src: 'assets/labs/moments/road-trip.jpg', thumb: 'assets/labs/moments/road-trip-sm.jpg', w: 864, h: 1152,
        caption: 'Late-night road trip', year: '' }
    ]
  }
];
