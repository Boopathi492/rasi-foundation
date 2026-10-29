import { readFileSync } from 'fs';

const inventory = JSON.parse(readFileSync('./scripts/engineering_colleges_inventory.json', 'utf8'));

const codeGroups = {};
inventory.forEach(c => {
  if (c.currentTneaCode) {
    if (!codeGroups[c.currentTneaCode]) codeGroups[c.currentTneaCode] = [];
    codeGroups[c.currentTneaCode].push(c);
  }
});

const duplicateCodes = Object.keys(codeGroups).filter(code => codeGroups[code].length > 1);

console.log(`Total duplicate code values: ${duplicateCodes.length}\n`);

duplicateCodes.forEach(code => {
  console.log(`CODE [${code}]:`);
  codeGroups[code].forEach(c => {
    console.log(`  - ID: ${c._id} | Name: "${c.name}" | District: ${c.district} | Loc: ${c.location}`);
  });
  console.log('');
});
