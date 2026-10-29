import http from 'http';

const routes = [
  '/colleges',
  '/courses',
  '/admin/colleges',
  '/admin/courses',
  '/api/colleges?format=flat&limit=5',
  '/api/courses?limit=5',
  '/api/colleges?type=Medical&specialization=Pharmacy&district=Coimbatore',
  '/api/colleges?type=Medical&specialization=Nursing&district=Chennai',
  '/api/colleges?type=Medical&course=BDS&district=Madurai',
  '/api/colleges?type=Engineering&course=Artificial%20Intelligence&district=Coimbatore',
  '/api/colleges?type=Agriculture&district=Coimbatore',
];

async function probe(path) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'] || '',
          contentLength: data.length,
          preview: data.slice(0, 100).replace(/\s+/g, ' ')
        });
      });
    });
    req.on('error', (err) => {
      resolve({ path, statusCode: 'ERROR', error: err.message });
    });
  });
}

async function main() {
  console.log('Probing running Next.js server on http://localhost:3000...\n');
  for (const route of routes) {
    const res = await probe(route);
    console.log(`[STATUS ${res.statusCode}] ${res.path} (${res.contentLength || 0} bytes)`);
  }
}

main();
