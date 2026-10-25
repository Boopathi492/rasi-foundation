import test from 'node:test';
import assert from 'node:assert/strict';
import zlib from 'node:zlib';
import path from 'node:path';

import { maskAadhaar, redactDeep, redactString, sanitizePath, summarizeChanges, REDACTED } from '../../src/backend/lib/redact.js';
import { can, roleFromTokenPayload, isValidRole, ROLES } from '../../src/backend/lib/rbac.js';
import {
  isEmail, normalizeIndianMobile, normalizeAadhaar, sanitizeText, validateMarks, isSafeUrl, pick,
  escapeRegex, parsePagination, isObjectId,
} from '../../src/backend/lib/validators.js';
import { createRateLimiter, resetRateLimits } from '../../src/backend/lib/rateLimit.js';
import { hashPassword, verifyPassword, passwordPolicyProblems } from '../../src/backend/lib/password.js';
import {
  detectKind, validateUpload, resolveStoragePath, sanitizeFileName, decodeBase64Payload, newStorageKey, imageDimensions,
} from '../../src/backend/lib/uploads.js';
import { buildXlsx, safeCell, crc32 } from '../../src/backend/lib/xlsx.js';
import { buildPdf, pdfSafeText } from '../../src/backend/lib/pdf.js';

// ---------- redaction ----------
test('maskAadhaar never reveals more than the last 4 digits', () => {
  assert.equal(maskAadhaar('234567891234'), 'XXXX XXXX 1234');
  assert.equal(maskAadhaar('2345 6789 1234'), 'XXXX XXXX 1234');
  assert.equal(maskAadhaar(''), '');
});

test('redactDeep hides secrets, tokens, passwords and Aadhaar keys', () => {
  const out = redactDeep({
    name: 'Test', password: 'p', authorization: 'Bearer abc', aadhaarNumber: '234567891234',
    nested: { token: 'x', ok: 1 }, MONGODB_URI: 'mongodb+srv://u:p@h/db',
  });
  assert.equal(out.password, REDACTED);
  assert.equal(out.authorization, REDACTED);
  assert.equal(out.aadhaarNumber, REDACTED);
  assert.equal(out.nested.token, REDACTED);
  assert.equal(out.nested.ok, 1);
  assert.equal(out.MONGODB_URI, REDACTED);
  assert.equal(out.name, 'Test');
});

test('redactString scrubs Mongo URIs, JWTs, bearer tokens and Aadhaar numbers inside text', () => {
  const s = redactString('fail mongodb+srv://user:secret@cluster/db token Bearer abc.def.ghi aadhaar 2345 6789 1234');
  assert.ok(!s.includes('secret'));
  assert.ok(!s.includes('abc.def.ghi'));
  assert.ok(!s.includes('2345 6789 1234'));
  assert.ok(s.includes('XXXX XXXX 1234'));
});

test('redactDeep is cycle-safe', () => {
  const a = { x: 1 }; a.self = a;
  assert.doesNotThrow(() => redactDeep(a));
});

test('sanitizePath drops the query string', () => {
  assert.equal(sanitizePath('/api/x?token=abc'), '/api/x');
});

test('summarizeChanges lists names only for sensitive fields', () => {
  const s = summarizeChanges({ status: 'new', aadhaarNumber: '1' }, { status: 'closed', aadhaarNumber: '2' });
  assert.deepEqual(s.status, { from: 'new', to: 'closed' });
  assert.deepEqual(s.aadhaarNumber, { changed: true });
});

// ---------- RBAC ----------
test('RBAC: unknown role gets nothing (fail closed)', () => {
  assert.equal(can('hacker', 'students:view'), false);
  assert.equal(can(undefined, 'students:view'), false);
  assert.equal(isValidRole('hacker'), false);
});

test('RBAC: role boundaries', () => {
  assert.equal(can(ROLES.SUPER_ADMIN, 'users:manage'), true);
  assert.equal(can(ROLES.ADMIN, 'users:manage'), false, 'admin cannot manage roles');
  assert.equal(can(ROLES.ADMIN, 'aadhaar:view'), false, 'admin cannot see full Aadhaar');
  assert.equal(can(ROLES.SUPER_ADMIN, 'aadhaar:view'), true);
  assert.equal(can(ROLES.COUNSELLOR, 'counselling:edit'), true);
  assert.equal(can(ROLES.COUNSELLOR, 'students:export'), false);
  assert.equal(can(ROLES.COUNSELLOR, 'feedback:approve'), false);
  assert.equal(can(ROLES.EXAM_MANAGER, 'scholarship_exam:edit'), true);
  assert.equal(can(ROLES.EXAM_MANAGER, 'colleges:edit'), false);
  assert.equal(can(ROLES.ADMIN, 'feedback:approve'), true);
  assert.equal(can(ROLES.ADMIN, 'audit:manage'), false, 'nobody but super admin can manage audit');
});

test('RBAC: legacy tokens without a role map to super_admin; invalid roles map to null', () => {
  assert.equal(roleFromTokenPayload({ username: 'x' }), ROLES.SUPER_ADMIN);
  assert.equal(roleFromTokenPayload({ role: 'admin' }), ROLES.ADMIN);
  assert.equal(roleFromTokenPayload({ role: 'root' }), null);
  assert.equal(roleFromTokenPayload(null), null);
});

// ---------- validators ----------
test('email / mobile / aadhaar validation', () => {
  assert.equal(isEmail('a@b.co'), true);
  assert.equal(isEmail('a@b'), false);
  assert.equal(isEmail('<script>@x.com'), false);
  assert.equal(normalizeIndianMobile('+91 98765 43210'), '9876543210');
  assert.equal(normalizeIndianMobile('5876543210'), null);
  assert.equal(normalizeIndianMobile('98765'), null);
  assert.equal(normalizeAadhaar('2345 6789 1234'), '234567891234');
  assert.equal(normalizeAadhaar('123456789012'), null, 'must not start with 0/1');
  assert.equal(normalizeAadhaar('23456789123'), null);
});

test('marks validation honours the caller-supplied maximum', () => {
  assert.equal(validateMarks(450, { max: 500 }).ok, true);
  assert.equal(validateMarks(501, { max: 500 }).ok, false);
  assert.equal(validateMarks(-1, { max: 500 }).ok, false);
  assert.equal(validateMarks('abc', { max: 500 }).ok, false);
  assert.equal(validateMarks('', { max: 500 }).ok, false);
});

test('sanitizeText strips tags and control characters', () => {
  assert.equal(sanitizeText('<b>Hi</b>\u0000 there'), 'Hi there');
  assert.equal(sanitizeText('x'.repeat(1000), 10).length, 10);
});

test('isSafeUrl blocks javascript:/data: and protocol-relative URLs', () => {
  assert.equal(isSafeUrl('https://rasi.org'), true);
  assert.equal(isSafeUrl('/colleges'), true);
  assert.equal(isSafeUrl('javascript:alert(1)'), false);
  assert.equal(isSafeUrl('data:text/html,hi'), false);
  assert.equal(isSafeUrl('//evil.com'), false);
});

test('pick prevents mass assignment; escapeRegex neutralises regex injection; pagination caps + allowlists sort', () => {
  assert.deepEqual(pick({ a: 1, status: 'x' }, ['a']), { a: 1 });
  assert.equal(escapeRegex('.*(a+)+$'), '\\.\\*\\(a\\+\\)\\+\\$');
  const p = parsePagination({ page: '-5', limit: '9999', sort: '$where' }, { sortable: ['createdAt', 'name'] });
  assert.equal(p.page, 1);
  assert.equal(p.limit, 100);
  assert.equal(p.sort, '-createdAt');
  assert.equal(parsePagination({ sort: 'name' }, { sortable: ['name'] }).sort, 'name');
  assert.equal(isObjectId('507f1f77bcf86cd799439011'), true);
  assert.equal(isObjectId('{"$ne":1}'), false);
});

// ---------- rate limiting ----------
test('rate limiter blocks after the limit and recovers after the window', () => {
  resetRateLimits();
  const rl = createRateLimiter({ windowMs: 1000, max: 3 });
  const t = 1_000_000;
  assert.equal(rl.check('ip1', t).allowed, true);
  assert.equal(rl.check('ip1', t).allowed, true);
  assert.equal(rl.check('ip1', t).allowed, true);
  const blocked = rl.check('ip1', t + 10);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSec >= 1);
  assert.equal(rl.check('ip2', t).allowed, true, 'separate keys are independent');
  assert.equal(rl.check('ip1', t + 2000).allowed, true, 'window resets');
});

// ---------- passwords ----------
test('password hashing: verifies correct, rejects wrong, never stores plaintext', async () => {
  const h = await hashPassword('Correct-Horse-9!');
  assert.ok(h.startsWith('scrypt$'));
  assert.ok(!h.includes('Correct-Horse'));
  assert.equal(await verifyPassword('Correct-Horse-9!', h), true);
  assert.equal(await verifyPassword('wrong', h), false);
  assert.equal(await verifyPassword('x', 'garbage'), false);
  const h2 = await hashPassword('Correct-Horse-9!');
  assert.notEqual(h, h2, 'unique salt per hash');
});

test('password policy', () => {
  assert.ok(passwordPolicyProblems('short').length > 0);
  assert.equal(passwordPolicyProblems('Str0ng-Passw0rd!').length, 0);
});

// ---------- uploads ----------
const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(8), Buffer.from([0, 0, 1, 0xf4, 0, 0, 0, 0xc8]), Buffer.alloc(16)]);
const JPG = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(32)]);
const PDF = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\n');

test('upload validation uses magic bytes, not names or MIME', () => {
  assert.equal(detectKind(PNG), 'png');
  assert.equal(validateUpload({ fileName: 'a.png', buffer: PNG }).ok, true);
  assert.equal(validateUpload({ fileName: 'a.jpg', buffer: PNG }).ok, false, 'extension/content mismatch');
  assert.equal(validateUpload({ fileName: 'evil.exe', buffer: PNG }).ok, false);
  assert.equal(validateUpload({ fileName: 'x.png', buffer: Buffer.from('MZ not an image at all') }).ok, false);
  assert.equal(validateUpload({ fileName: 'a.pdf', buffer: PDF, allowedKinds: ['png'] }).ok, false);
  assert.equal(validateUpload({ fileName: 'a.png', buffer: Buffer.alloc(0) }).ok, false);
  assert.equal(validateUpload({ fileName: 'a.png', buffer: PNG, maxBytes: 10 }).ok, false, 'size limit');
  assert.equal(validateUpload({ fileName: 'x.pdf', buffer: Buffer.from('%PDF-1.4\n/JavaScript (app.alert(1))') }).ok, false, 'active PDF content');
  assert.equal(validateUpload({ fileName: 'shell.php.png', buffer: PNG }).ok, false, 'double extension');
});

test('path traversal in storage keys is rejected', () => {
  const root = path.resolve('tmp-root');
  assert.throws(() => resolveStoragePath('../secret.txt', root));
  assert.throws(() => resolveStoragePath('a/../../b', root));
  assert.throws(() => resolveStoragePath('/etc/passwd', root));
  assert.throws(() => resolveStoragePath('C:\\Windows\\win.ini', root) && resolveStoragePath('..\\x', root));
  assert.throws(() => resolveStoragePath('a\0b', root));
  const ok = resolveStoragePath(newStorageKey('documents', 'png'), root);
  assert.ok(ok.startsWith(root + path.sep));
});

test('malicious file names are sanitised; storage keys never contain the user name', () => {
  assert.equal(sanitizeFileName('../../etc/passwd'), 'passwd');
  assert.equal(sanitizeFileName('..\\..\\boot.ini'), 'boot.ini');
  assert.equal(sanitizeFileName('<script>.png'), 'script.png');
  const key = newStorageKey('documents', 'png');
  assert.match(key, /^documents\/\d{4}\/\d{2}\/[a-f0-9]{32}\.png$/);
});

test('base64 payload decoding enforces size and alphabet before decoding', () => {
  assert.equal(decodeBase64Payload('!!!').ok, false);
  assert.equal(decodeBase64Payload('').ok, false);
  assert.equal(decodeBase64Payload('A'.repeat(4000), 100).ok, false);
  const d = decodeBase64Payload(`data:image/png;base64,${PNG.toString('base64')}`);
  assert.equal(d.ok, true);
  assert.ok(d.buffer.equals(PNG));
});

test('imageDimensions reads PNG header', () => {
  assert.deepEqual(imageDimensions(PNG), { width: 500, height: 200 });
  assert.equal(imageDimensions(PDF), null);
  assert.ok(detectKind(JPG) === 'jpeg');
});

// ---------- xlsx ----------
function readZipEntries(buf) {
  // parse via central directory
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  const count = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const entries = {};
  for (let i = 0; i < count; i++) {
    assert.equal(buf.readUInt32LE(off), 0x02014b50);
    const csize = buf.readUInt32LE(off + 20);
    const usize = buf.readUInt32LE(off + 24);
    const nlen = buf.readUInt16LE(off + 28);
    const crc = buf.readUInt32LE(off + 16);
    const lho = buf.readUInt32LE(off + 42);
    const name = buf.subarray(off + 46, off + 46 + nlen).toString('utf8');
    const lnlen = buf.readUInt16LE(lho + 26);
    const lxlen = buf.readUInt16LE(lho + 28);
    const data = buf.subarray(lho + 30 + lnlen + lxlen, lho + 30 + lnlen + lxlen + csize);
    const raw = zlib.inflateRawSync(data);
    assert.equal(raw.length, usize);
    assert.equal(crc32(raw), crc, `crc mismatch for ${name}`);
    entries[name] = raw.toString('utf8');
    off += 46 + nlen;
  }
  return entries;
}

test('xlsx export is a valid OOXML zip with frozen header, filter and widths', () => {
  const buf = buildXlsx({
    sheets: [{
      name: 'Students: 2026/Q1?', title: 'Rasi Report',
      columns: [{ header: 'Name', key: 'name', width: 20 }, { header: 'Marks', key: 'marks', type: 'number' }, { header: 'Created', key: 'at', type: 'date' }],
      rows: [{ name: 'Asha', marks: 450, at: new Date('2026-01-02T03:04:00Z') }],
    }],
  });
  assert.equal(buf.readUInt32LE(0), 0x04034b50);
  const e = readZipEntries(buf);
  for (const f of ['[Content_Types].xml', '_rels/.rels', 'xl/workbook.xml', 'xl/_rels/workbook.xml.rels', 'xl/styles.xml', 'xl/worksheets/sheet1.xml']) assert.ok(e[f], f);
  assert.ok(e['xl/worksheets/sheet1.xml'].includes('state="frozen"'));
  assert.ok(e['xl/worksheets/sheet1.xml'].includes('<autoFilter'));
  assert.ok(e['xl/worksheets/sheet1.xml'].includes('customWidth="1"'));
  assert.ok(!/[\\/?*[\]:]/.test(/name="([^"]+)"/.exec(e['xl/workbook.xml'])[1]), 'sheet name sanitised');
  assert.ok(e['xl/worksheets/sheet1.xml'].includes('<v>450</v>'));
});

test('xlsx formula injection is neutralised', () => {
  for (const evil of ['=HYPERLINK("http://x","y")', '+1+1', '-2+3', '@SUM(A1)', '\t=1']) {
    assert.ok(safeCell(evil).startsWith("'"), evil);
  }
  assert.equal(safeCell('normal'), 'normal');
  const buf = buildXlsx({ sheets: [{ name: 'S', columns: [{ header: '=cmd', key: 'a' }], rows: [{ a: '=1+1' }] }] });
  const xml = readZipEntries(buf)['xl/worksheets/sheet1.xml'];
  assert.ok(xml.includes("&apos;=1+1"));
  assert.ok(xml.includes("&apos;=cmd"));
  assert.ok(!xml.includes('<t xml:space="preserve">=1+1'));
});

test('xlsx rejects empty workbook and de-duplicates sheet names', () => {
  assert.throws(() => buildXlsx({ sheets: [] }));
  const e = readZipEntries(buildXlsx({ sheets: [{ name: 'A', columns: [], rows: [] }, { name: 'a', columns: [], rows: [] }] }));
  const names = [...e['xl/workbook.xml'].matchAll(/<sheet name="([^"]+)"/g)].map((m) => m[1].toLowerCase());
  assert.equal(new Set(names).size, 2);
});

// ---------- pdf ----------
test('pdf export: valid structure, page numbers, repeated headers, latin-1 safe', () => {
  const rows = Array.from({ length: 120 }, (_, i) => ({ name: `Student ${i} (test) \\ back`, district: 'Namakkal', note: 'தமிழ் text ' + 'long '.repeat(20) }));
  const buf = buildPdf({
    title: 'Student Registrations', filters: { district: 'Namakkal' }, summary: [{ label: 'Total', value: 120 }],
    columns: [{ header: 'Name', key: 'name' }, { header: 'District', key: 'district' }, { header: 'Note', key: 'note', width: 2 }], rows,
  });
  const s = buf.toString('latin1');
  assert.ok(s.startsWith('%PDF-1.4'));
  assert.ok(s.trimEnd().endsWith('%%EOF'));
  const pages = (s.match(/\/Type \/Page /g) || []).length;
  assert.ok(pages > 1, 'paginates');
  assert.ok(s.includes(`Page 1 of ${pages}`));
  assert.ok(s.includes(`Page ${pages} of ${pages}`));
  assert.equal((s.match(/\(District\) Tj/g) || []).length, pages, 'header row repeats on every page');
  assert.ok(s.includes('Namakkal'));
  assert.ok(!s.includes('தமிழ்'));
  // xref offsets point at "N 0 obj"
  const xrefPos = Number(/startxref\n(\d+)/.exec(s)[1]);
  assert.ok(s.slice(xrefPos).startsWith('xref'));
  const offs = [...s.slice(xrefPos).matchAll(/(\d{10}) 00000 n/g)].map((m) => Number(m[1]));
  offs.forEach((o, i) => assert.ok(s.slice(o).startsWith(`${i + 1} 0 obj`), `obj ${i + 1} offset`));
});

test('pdfSafeText replaces non-latin1 characters', () => {
  assert.equal(pdfSafeText('a\u0BA4b\u2019c'), "a?b'c");
});

test('pdf with zero rows still renders an explicit empty state', () => {
  const s = buildPdf({ title: 'Empty', columns: [{ header: 'A', key: 'a' }], rows: [] }).toString('latin1');
  assert.ok(s.includes('No records match'));
});
