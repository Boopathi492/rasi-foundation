import { readFileSync } from 'fs';

const inventory = JSON.parse(readFileSync('./scripts/engineering_colleges_inventory.json', 'utf8'));
const cbe = inventory.filter(c => c.district.startsWith('Coimbatore'));

console.log(`Coimbatore & Coimbatore Zone Colleges (${cbe.length}):`);
cbe.forEach((c, i) => {
  console.log(`${(i+1).toString().padStart(2, ' ')}. [Code: ${c.currentTneaCode || 'NONE'}] ${c.name} (${c.district})`);
});
