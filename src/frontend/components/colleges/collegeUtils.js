// Helpers shared by the Colleges page components. Only fields that exist in the college records are used.

// Accept only http(s) or site-relative URLs so a stored value can never become a script URL.
export function safeUrl(value) {
  if (!value || typeof value !== 'string') return '';
  const t = value.trim();
  if (/^https?:\/\//i.test(t)) return t;
  if (t.startsWith('/') && !t.startsWith('//')) return t;
  return '';
}

// Real logo only when the record carries one (`logoUrl` or `logo`); otherwise '' so a fallback emblem is shown.
export function logoOf(college) {
  return safeUrl(college?.logoUrl || college?.logo);
}

// `website` is an existing College field. Bare domains get https:// added.
export function websiteOf(college) {
  const t = (college?.website || '').trim();
  if (!t) return '';
  if (/^https?:\/\//i.test(t)) return t;
  if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(t)) return `https://${t}`;
  return '';
}

export const collegeKey = (c) => `${c.zone}|${(c.name || '').toLowerCase()}`;

export const isBengaluru = (c) => /bengaluru|bangalore/i.test(`${c.zone} ${c.location}`);

// Normalise department names so "AI & DS" style differences in "&" / "and" / spacing do not split rows.
export const normaliseDept = (d) => (d || '').toLowerCase().replace(/&/g, ' and ').replace(/\s+/g, ' ').trim();

// "B.E. Computer Science" -> "B.E."; anything without a degree prefix -> "Other programmes".
export function degreeOf(dept) {
  const m = /^([A-Z][A-Za-z]*\.(?:[A-Z][A-Za-z]*\.)?)\s/.exec(dept || '');
  return m ? m[1] : 'Other programmes';
}

// Brand-coloured themes cycled over zones (class names are literal so Tailwind keeps them).
const THEMES = [
  { band: 'from-forest-dark via-forest to-[#0a6a52]', chip: 'bg-forest/10 text-forest', bar: 'bg-forest' },
  { band: 'from-[#7d0a1f] via-crimson to-[#5c0817]', chip: 'bg-crimson/10 text-crimson', bar: 'bg-crimson' },
  { band: 'from-[#5e4309] via-[#8a6410] to-[#a37316]', chip: 'bg-gold-100 text-gold-600', bar: 'bg-gold-500' },
  { band: 'from-brand-900 via-brand-700 to-brand-600', chip: 'bg-brand-100 text-brand-800', bar: 'bg-brand-600' },
  { band: 'from-rasi-900 via-rasi-700 to-rasi-600', chip: 'bg-rasi-100 text-rasi-700', bar: 'bg-rasi-600' },
];

export const themeFor = (index) => THEMES[(index < 0 ? 0 : index) % THEMES.length];
