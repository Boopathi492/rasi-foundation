async function testPublicAPIs() {
    console.log('--- Testing Public Achievements API ---');
    try {
        const res = await fetch('http://localhost:3000/api/achievements');
        const data = await res.json();
        console.log('Success: Received data for categories:', Object.keys(data).join(', '));
        console.log('Sample Stat:', data.stats[0]?.title || 'None');
        console.log('Sample Placement:', data.placements[0]?.course || 'None');
    } catch (e) {
        console.error('Failed Achievements API:', e.message);
    }

    console.log('\n--- Testing Public Colleges API ---');
    try {
        const res = await fetch('http://localhost:3000/api/colleges');
        const data = await res.json();
        console.log('Success: Received data for districts:', data.map(d => d.district).join(', '));
    } catch (e) {
        console.error('Failed Colleges API:', e.message);
    }
}

async function testAdminAPI() {
    console.log('\n--- Testing Admin Login ---');
    let token;
    try {
        const res = await fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'rasi_admin', password: 'RasiAdmin@2026!' })
        });
        const data = await res.json();
        if (data.token) {
            console.log('Success: Logged in successfully');
            token = data.token;
        } else {
            console.log('Failed to login:', data.message);
            return;
        }
    } catch (e) {
        console.error('Failed Login API:', e.message);
        return;
    }

    console.log('\n--- Testing Protected Admin Colleges API ---');
    try {
        const res = await fetch('http://localhost:3000/api/admin/colleges', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        console.log(`Success: Fetched ${data.length} colleges via admin auth`);
    } catch (e) {
        console.error('Failed Admin Colleges API:', e.message);
    }
}

async function run() {
    await testPublicAPIs();
    await testAdminAPI();
}

run();
