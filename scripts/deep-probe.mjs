import http from 'http';

function getJson(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data.slice(0, 300) });
        }
      });
    }).on('error', reject);
  });
}

function extractColleges(body) {
  if (Array.isArray(body)) {
    // grouped format [ { district, colleges: [...] } ]
    return body.flatMap(g => g.colleges || []);
  }
  if (body && Array.isArray(body.colleges)) {
    return body.colleges;
  }
  return [];
}

async function run() {
  console.log('================================================================');
  console.log('       RASI FOUNDATION — DEEP PROBE OF LIVE NEXT.JS SERVER      ');
  console.log('================================================================\n');

  // 1. Overall counts
  const collegesRes = await getJson('/api/colleges?format=flat&limit=1');
  const coursesRes = await getJson('/api/courses?limit=1');

  console.log(`[API CHECK] Total Colleges : ${collegesRes.body?.total} (Expected: 772)`);
  console.log(`[API CHECK] Total Courses  : ${coursesRes.body?.total} (Expected: 362)`);

  // 2. Scenario 1: Medical -> Pharmacy -> B.Pharm -> Coimbatore
  console.log('\n--- Scenario 1: Medical -> Pharmacy -> B.Pharm -> Coimbatore ---');
  const res1 = await getJson('/api/colleges?format=flat&type=Medical&course=B.Pharm&district=Coimbatore');
  const list1 = extractColleges(res1.body);
  console.log(`Matched colleges: ${list1.length}`);
  list1.forEach((c, i) => {
    const courseNames = (c.courses || []).map(x => typeof x === 'string' ? x : x.name);
    console.log(`  ${i+1}. ${c.name} (${c.location}, ${c.district})`);
    console.log(`     Specialization: ${c.specialization || 'N/A'}`);
    console.log(`     Courses (${courseNames.length}): ${courseNames.slice(0, 4).join(', ')}`);
  });

  // 3. Scenario 2: Medical -> Nursing -> B.Sc Nursing -> Chennai
  console.log('\n--- Scenario 2: Medical -> Nursing -> B.Sc Nursing -> Chennai ---');
  const res2 = await getJson('/api/colleges?format=flat&type=Medical&course=B.Sc%20Nursing&district=Chennai');
  const list2 = extractColleges(res2.body);
  console.log(`Matched colleges: ${list2.length}`);
  list2.forEach((c, i) => {
    const courseNames = (c.courses || []).map(x => typeof x === 'string' ? x : x.name);
    console.log(`  ${i+1}. ${c.name} (${c.location}, ${c.district})`);
    console.log(`     Courses (${courseNames.length}): ${courseNames.slice(0, 4).join(', ')}`);
  });

  // 4. Scenario 3: Medical -> Dental -> BDS -> Madurai
  console.log('\n--- Scenario 3: Medical -> Dental -> BDS -> Madurai ---');
  const res3 = await getJson('/api/colleges?format=flat&type=Medical&course=BDS&district=Madurai');
  const list3 = extractColleges(res3.body);
  console.log(`Matched colleges: ${list3.length}`);
  list3.forEach((c, i) => {
    const courseNames = (c.courses || []).map(x => typeof x === 'string' ? x : x.name);
    console.log(`  ${i+1}. ${c.name} (${c.location}, ${c.district})`);
    console.log(`     Courses (${courseNames.length}): ${courseNames.slice(0, 4).join(', ')}`);
  });

  // 5. Scenario 4: Engineering -> AI & Data Science -> Coimbatore
  console.log('\n--- Scenario 4: Engineering -> AI & Data Science -> Coimbatore ---');
  const res4 = await getJson('/api/colleges?format=flat&type=Engineering&course=Artificial%20Intelligence%20and%20Data%20Science&district=Coimbatore');
  const list4 = extractColleges(res4.body);
  console.log(`Matched colleges: ${list4.length}`);
  list4.forEach((c, i) => {
    const courseNames = (c.courses || []).map(x => typeof x === 'string' ? x : x.name);
    console.log(`  ${i+1}. ${c.name} (${c.location}, ${c.district})`);
  });

  // 6. Scenario 5: Agriculture -> course -> district
  console.log('\n--- Scenario 5: Agriculture -> B.Sc (Hons) Agriculture -> Coimbatore ---');
  const res5 = await getJson('/api/colleges?format=flat&type=Agriculture&course=B.Sc%20(Hons)%20Agriculture&district=Coimbatore');
  const list5 = extractColleges(res5.body);
  console.log(`Matched colleges: ${list5.length}`);
  list5.forEach((c, i) => {
    const courseNames = (c.courses || []).map(x => typeof x === 'string' ? x : x.name);
    console.log(`  ${i+1}. ${c.name} (${c.location}, ${c.district})`);
    console.log(`     Courses (${courseNames.length}): ${courseNames.slice(0, 4).join(', ')}`);
  });

  // 7. Check backward compatible grouped format
  console.log('\n--- Grouped format test (default for /colleges page) ---');
  const groupedRes = await getJson('/api/colleges?type=Medical&district=Madurai');
  const groupedList = extractColleges(groupedRes.body);
  console.log(`Grouped returned ${groupedRes.body.length} district groups, total colleges: ${groupedList.length}`);
  groupedRes.body.forEach(g => {
    console.log(`  District group '${g.district}': ${g.colleges.length} colleges`);
  });

  console.log('\n================================================================');
  console.log('                      PROBE COMPLETED                           ');
  console.log('================================================================\n');
}

run().catch(console.error);
