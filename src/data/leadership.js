// Founder and Director profiles for the About page.
//
// Verified source: the names, roles, qualifications and short descriptions below were copied from the previous
// version of src/pages/about.js; the founder's name also appears in Footer.js and SEO.js. Phone numbers are the
// ones already published on that page.
//
// NOT AVAILABLE in the repository (the Rasi Foundation team must supply them; nothing has been invented):
//   - an authorised portrait photo for each person  -> set `photo` to a path under /public (e.g. '/images/leadership/founder.jpg')
//   - a longer, approved biography                  -> set `more` (array of paragraphs); it is shown under "Read more"
//   - an approved quote or message, if wanted       -> set `message`
// While `photo` is empty the card shows a clearly labelled neutral placeholder.

export const LEADERSHIP = [
  {
    id: 'founder',
    name: 'Prof. P. Gunasekaran',
    designation: 'Founder',
    credentials: 'M.Sc., M.Phil.',
    bio: 'Career Guidance Advisor and Analyst with experience in the education sector.',
    more: [],
    message: '',
    photo: '',
    photoAlt: 'Portrait of Prof. P. Gunasekaran',
    phone: '+91 97894 46100',
    tel: '+919789446100',
  },
  {
    id: 'director',
    name: 'P. Yuvaraj Kumar',
    designation: 'Administrative Director',
    credentials: 'MBA',
    bio: 'Career Guidance Advisor responsible for administration and day-to-day service to students.',
    more: [],
    message: '',
    photo: '',
    photoAlt: 'Portrait of P. Yuvaraj Kumar',
    phone: '+91 92949 69196',
    tel: '+919294969196',
  },
];
