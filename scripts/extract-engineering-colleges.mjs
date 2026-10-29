import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function extract() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  await dbConnect();

  const all = await College.find({ isActive: true })
    .select('name district location type tneaCode departments specialization institutionType website')
    .sort({ district: 1, name: 1 })
    .lean();

  const engineering = all.filter(c => {
    if (c.type === 'Engineering') return true;
    if (!c.type) {
      const name = c.name.toLowerCase();
      // Check if it's an engineering college in legacy zones
      if (name.includes('engineering') || name.includes('technology') || name.includes('institute of tech')) {
        return true;
      }
      if ((c.departments || []).some(d => /B\.E|B\.Tech|Mechanical|Civil|Electrical|Computer Science|ECE|EEE/i.test(d))) {
        return true;
      }
    }
    return false;
  });

  console.log(`Total Engineering/Technology candidates: ${engineering.length}`);
  const jsonOutput = engineering.map(c => ({
    _id: c._id.toString(),
    name: c.name,
    district: c.district,
    location: c.location,
    type: c.type || 'Legacy',
    currentTneaCode: c.tneaCode || '',
    website: c.website || ''
  }));

  const { writeFileSync } = await import('fs');
  writeFileSync('./scripts/engineering_colleges_inventory.json', JSON.stringify(jsonOutput, null, 2));
  console.log('Saved to ./scripts/engineering_colleges_inventory.json');
  process.exit(0);
}

extract().catch(console.error);
