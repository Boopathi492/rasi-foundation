import fs from 'fs';

const masterCourses = JSON.parse(fs.readFileSync('data/courses_master_catalog.json', 'utf8'));

function find(pattern) {
  const re = new RegExp(pattern, 'i');
  return masterCourses.filter(c => re.test(c.name) || re.test(c.code));
}

console.log('--- PHARMACY in master ---');
find('pharm').forEach(c => console.log(`  ${c.name} (${c.level}) [${c.category}]`));

console.log('--- NURSING in master ---');
find('nurs').forEach(c => console.log(`  ${c.name} (${c.level}) [${c.category}]`));

console.log('--- DENTAL in master ---');
find('dent|bds|mds').forEach(c => console.log(`  ${c.name} (${c.level}) [${c.category}]`));

console.log('--- PHYSIO / OCCUPATIONAL in master ---');
find('physio|bpt|mpt|occupat|bot|mot').forEach(c => console.log(`  ${c.name} (${c.level}) [${c.category}]`));

console.log('--- DIPLOMAS in master ---');
masterCourses.filter(c => c.level === 'Diploma').slice(0, 15).forEach(c => console.log(`  ${c.name} (${c.category})`));
