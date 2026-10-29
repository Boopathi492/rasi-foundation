import fs from 'fs';
import path from 'path';
import { TAMIL_NADU_DISTRICTS, COLLEGE_TYPES } from './build-college-catalog.mjs';

export function validateCollegeCatalog(catalogPath = 'data/tamil_nadu_colleges_master.json') {
  const fullPath = path.resolve(catalogPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Catalog file not found at: ${fullPath}`);
  }

  const rawData = fs.readFileSync(fullPath, 'utf8');
  let colleges;
  try {
    colleges = JSON.parse(rawData);
  } catch (err) {
    throw new Error(`Invalid JSON format in ${fullPath}: ${err.message}`);
  }

  if (!Array.isArray(colleges)) {
    throw new Error(`Catalog root must be an array of colleges`);
  }

  const errors = [];
  const seenKeys = new Map();
  const districtCounts = {};
  const typeCounts = {};
  TAMIL_NADU_DISTRICTS.forEach(d => { districtCounts[d] = 0; });
  COLLEGE_TYPES.forEach(t => { typeCounts[t] = 0; });

  let websiteCount = 0;

  colleges.forEach((c, index) => {
    const row = index + 1;

    // name
    if (!c.name || typeof c.name !== 'string' || !c.name.trim()) {
      errors.push(`Row ${row}: 'name' is required`);
    } else if (c.name.length > 200) {
      errors.push(`Row ${row}: 'name' exceeds 200 characters (${c.name.length})`);
    }

    // location
    if (!c.location || typeof c.location !== 'string' || !c.location.trim()) {
      errors.push(`Row ${row}: 'location' is required`);
    } else if (c.location.length > 100) {
      errors.push(`Row ${row}: 'location' exceeds 100 characters (${c.location.length})`);
    }

    // district
    if (!c.district || typeof c.district !== 'string' || !c.district.trim()) {
      errors.push(`Row ${row}: 'district' is required`);
    } else if (!TAMIL_NADU_DISTRICTS.includes(c.district.trim())) {
      errors.push(`Row ${row}: 'district' '${c.district}' is not one of the 38 Tamil Nadu districts`);
    } else {
      districtCounts[c.district.trim()] = (districtCounts[c.district.trim()] || 0) + 1;
    }

    // type
    if (!c.type || typeof c.type !== 'string') {
      errors.push(`Row ${row}: 'type' is required`);
    } else if (!COLLEGE_TYPES.includes(c.type)) {
      errors.push(`Row ${row}: 'type' '${c.type}' is invalid. Allowed: ${COLLEGE_TYPES.join(', ')}`);
    } else {
      typeCounts[c.type] = (typeCounts[c.type] || 0) + 1;
    }

    // tneaCode
    if (c.tneaCode !== undefined && c.tneaCode !== null) {
      if (typeof c.tneaCode !== 'string') {
        errors.push(`Row ${row}: 'tneaCode' must be a string`);
      } else if (c.tneaCode.length > 20) {
        errors.push(`Row ${row}: 'tneaCode' exceeds 20 characters`);
      }
    }

    // note
    if (c.note !== undefined && c.note !== null) {
      if (typeof c.note !== 'string') {
        errors.push(`Row ${row}: 'note' must be a string`);
      } else if (c.note.length > 500) {
        errors.push(`Row ${row}: 'note' exceeds 500 characters (${c.note.length})`);
      }
    }

    // departments
    if (!Array.isArray(c.departments) || c.departments.length === 0) {
      errors.push(`Row ${row}: 'departments' must be a non-empty array of strings`);
    } else {
      for (const d of c.departments) {
        if (!d || typeof d !== 'string' || !d.trim()) {
          errors.push(`Row ${row}: department item cannot be empty`);
        }
      }
    }

    // website
    if (c.website) {
      if (typeof c.website !== 'string' || c.website.length > 200) {
        errors.push(`Row ${row}: 'website' must be <= 200 characters`);
      } else if (!c.website.startsWith('http://') && !c.website.startsWith('https://')) {
        errors.push(`Row ${row}: 'website' '${c.website}' must start with http:// or https://`);
      } else {
        websiteCount++;
      }
    }

    // Duplicate check
    const dedupKey = `${(c.name || '').trim().toLowerCase()}|${(c.district || '').trim().toLowerCase()}`;
    if (seenKeys.has(dedupKey)) {
      errors.push(`Row ${row}: Duplicate college name '${c.name}' in district '${c.district}' (first seen at row ${seenKeys.get(dedupKey)})`);
    } else {
      seenKeys.set(dedupKey, row);
    }
  });

  // Verify district coverage
  const zeroDistricts = Object.keys(districtCounts).filter(d => districtCounts[d] === 0);
  if (zeroDistricts.length > 0) {
    errors.push(`The following districts have zero colleges: ${zeroDistricts.join(', ')}`);
  }

  // Summary Report
  console.log('='.repeat(70));
  console.log('TAMIL NADU COLLEGE MASTER CATALOG VALIDATION REPORT');
  console.log('='.repeat(70));
  console.log(`Total Records: ${colleges.length}`);
  console.log(`Website URLs Provided: ${websiteCount} / ${colleges.length} (${((websiteCount / colleges.length) * 100).toFixed(1)}%)`);
  console.log(`Total Errors: ${errors.length}`);
  console.log('-'.repeat(70));
  console.log('COLLEGE COUNTS BY DISTRICT (All 38 Districts):');
  Object.keys(districtCounts).sort().forEach(d => {
    console.log(`  - ${d.padEnd(20)}: ${districtCounts[d]} colleges`);
  });
  console.log('-'.repeat(70));
  console.log('COLLEGE COUNTS BY TYPE / STREAM:');
  Object.keys(typeCounts).sort().forEach(t => {
    console.log(`  - ${t.padEnd(20)}: ${typeCounts[t]} colleges`);
  });
  console.log('='.repeat(70));

  if (errors.length > 0) {
    console.error('\nVALIDATION FAILED WITH ERRORS:');
    errors.slice(0, 30).forEach(e => console.error('  ERROR:', e));
    if (errors.length > 30) {
      console.error(`  ... and ${errors.length - 30} more errors.`);
    }
    return { valid: false, count: colleges.length, errors, districtCounts, typeCounts };
  }

  console.log('\nALL VALIDATION CHECKS PASSED SUCCESSFULLY!');
  return { valid: true, count: colleges.length, errors: [], districtCounts, typeCounts };
}

if (process.argv[1] && process.argv[1].endsWith('validate-college-catalog.mjs')) {
  try {
    const res = validateCollegeCatalog();
    if (!res.valid) process.exit(1);
  } catch (err) {
    console.error('Fatal Validation Error:', err.message);
    process.exit(1);
  }
}
