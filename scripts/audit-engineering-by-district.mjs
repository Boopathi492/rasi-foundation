import { readFileSync } from 'fs';

const inventory = JSON.parse(readFileSync('./scripts/engineering_colleges_inventory.json', 'utf8'));

const byDistrict = {};
inventory.forEach(c => {
  if (!byDistrict[c.district]) byDistrict[c.district] = [];
  byDistrict[c.district].push(c);
});

Object.keys(byDistrict).sort().forEach(d => {
  console.log(`\n=== DISTRICT: ${d} (${byDistrict[d].length} colleges) ===`);
  byDistrict[d].forEach(c => {
    console.log(`  - [${c.currentTneaCode || 'NONE'}] ${c.name} (${c.location})`);
  });
});
