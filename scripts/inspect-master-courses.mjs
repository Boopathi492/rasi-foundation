import fs from 'fs';

const courses = JSON.parse(fs.readFileSync('data/courses_master_catalog.json', 'utf8'));
console.log(`Total courses in master: ${courses.length}`);

const catMap = {};
courses.forEach(c => {
  const cat = (c.category || 'other').toLowerCase();
  if (!catMap[cat]) catMap[cat] = [];
  catMap[cat].push(c.name);
});

for (const [cat, names] of Object.entries(catMap)) {
  console.log(`\n=== Category: ${cat} (${names.length}) ===`);
  console.log(names.slice(0, 15).join(', ') + (names.length > 15 ? ' ...' : ''));
}
