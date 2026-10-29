import { readFileSync } from 'fs';

const inventory = JSON.parse(readFileSync('./scripts/engineering_colleges_inventory.json', 'utf8'));

console.log('--- ALL 217 ENGINEERING CANDIDATES IN INVENTORY ---');
inventory.forEach((c, i) => {
  console.log(`${(i+1).toString().padStart(3, ' ')}. [${c.district}] ${c.name} -> Current Code: "${c.currentTneaCode}"`);
});
