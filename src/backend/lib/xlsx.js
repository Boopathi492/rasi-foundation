// Minimal dependency-free .xlsx (Office Open XML) writer.
// Features: named sheets, header row styling, frozen header, autofilter, column widths,
// date / number / text types, optional summary sheet, and spreadsheet formula-injection protection.

import zlib from 'node:zlib';

// ---------- CRC32 + ZIP ----------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

export function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

export function zipFiles(files) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  const dosTime = 0;
  const dosDate = ((2024 - 1980) << 9) | (1 << 5) | 1;
  for (const { name, data } of files) {
    const nameBuf = Buffer.from(name, 'utf8');
    const raw = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf8');
    const comp = zlib.deflateRawSync(raw);
    const crc = crc32(raw);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // UTF-8 names
    local.writeUInt16LE(8, 8); // deflate
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(comp.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuf, comp);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(comp.length, 20);
    central.writeUInt32LE(raw.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBuf);
    offset += 30 + nameBuf.length + comp.length;
  }
  const centralBuf = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, centralBuf, end]);
}

// ---------- Cell safety ----------
/** Neutralise spreadsheet formula injection: cells beginning with = + - @ TAB CR are prefixed with an apostrophe. */
export function safeCell(value) {
  if (typeof value !== 'string') return value;
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
  return /^[=+\-@\t\r]/.test(cleaned) ? `'${cleaned}` : cleaned;
}

export function escapeXml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
}

function colName(i) {
  let s = '';
  let n = i + 1;
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function excelDateSerial(d) {
  return d.getTime() / 86400000 + 25569;
}

export function safeSheetName(name, used = new Set()) {
  let base = String(name || 'Sheet').replace(/[\\/?*[\]:]/g, ' ').trim().slice(0, 31) || 'Sheet';
  let candidate = base;
  let i = 2;
  while (used.has(candidate.toLowerCase())) candidate = `${base.slice(0, 28)} ${i++}`;
  used.add(candidate.toLowerCase());
  return candidate;
}

// styles: 0 default, 1 header (bold, fill), 2 date-time, 3 integer, 4 decimal, 5 title (bold large)
const STYLES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="1"><numFmt numFmtId="164" formatCode="yyyy\\-mm\\-dd\\ hh:mm"/></numFmts>
<fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="14"/><name val="Calibri"/></font></fonts>
<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF14213D"/><bgColor indexed="64"/></patternFill></fill></fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="6">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
<xf numFmtId="1" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
<xf numFmtId="2" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
</cellXfs>
</styleSheet>`;

function cellXml(ref, value, type) {
  if (value === null || value === undefined || value === '') return '';
  if (type === 'date' || value instanceof Date) {
    const d = value instanceof Date ? value : new Date(value);
    if (!Number.isNaN(d.getTime())) return `<c r="${ref}" s="2"><v>${excelDateSerial(d)}</v></c>`;
  }
  if (type === 'number' || (typeof value === 'number' && Number.isFinite(value))) {
    const n = Number(value);
    if (Number.isFinite(n)) return `<c r="${ref}" s="${Number.isInteger(n) ? 3 : 4}"><v>${n}</v></c>`;
  }
  if (typeof value === 'boolean') return `<c r="${ref}" t="inlineStr"><is><t>${value ? 'Yes' : 'No'}</t></is></c>`;
  return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${escapeXml(safeCell(String(value)))}</t></is></c>`;
}

function sheetXml({ columns, rows, title }) {
  const headerRow = title ? 2 : 1; // optional title row above headers
  const lastCol = colName(Math.max(0, columns.length - 1));
  const out = [];
  out.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
  out.push('<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">');
  out.push(`<sheetViews><sheetView workbookViewId="0"><pane ySplit="${headerRow}" topLeftCell="A${headerRow + 1}" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>`);
  out.push('<sheetFormatPr defaultRowHeight="15"/>');
  out.push('<cols>');
  columns.forEach((c, i) => out.push(`<col min="${i + 1}" max="${i + 1}" width="${Math.min(60, Math.max(8, c.width || Math.max(12, String(c.header).length + 4)))}" customWidth="1"/>`));
  out.push('</cols><sheetData>');
  if (title) out.push(`<row r="1"><c r="A1" s="5" t="inlineStr"><is><t xml:space="preserve">${escapeXml(safeCell(title))}</t></is></c></row>`);
  out.push(`<row r="${headerRow}" ht="22" customHeight="1">${columns.map((c, i) => `<c r="${colName(i)}${headerRow}" s="1" t="inlineStr"><is><t xml:space="preserve">${escapeXml(safeCell(c.header))}</t></is></c>`).join('')}</row>`);
  rows.forEach((row, ri) => {
    const r = headerRow + 1 + ri;
    out.push(`<row r="${r}">${columns.map((c, ci) => cellXml(`${colName(ci)}${r}`, row[c.key], c.type)).join('')}</row>`);
  });
  out.push('</sheetData>');
  if (columns.length && rows.length) out.push(`<autoFilter ref="A${headerRow}:${lastCol}${headerRow + rows.length}"/>`);
  out.push('</worksheet>');
  return out.join('');
}

/**
 * buildXlsx({ sheets: [{ name, title?, columns: [{ header, key, width?, type? }], rows: [{...}] }] }) -> Buffer
 * type: 'text' | 'number' | 'date'
 */
export function buildXlsx({ sheets }) {
  if (!Array.isArray(sheets) || sheets.length === 0) throw new Error('At least one sheet is required');
  const used = new Set();
  const named = sheets.map((s) => ({ ...s, safeName: safeSheetName(s.name, used) }));
  const files = [
    {
      name: '[Content_Types].xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${named.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>`,
    },
    {
      name: '_rels/.rels',
      data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
    },
    {
      name: 'xl/workbook.xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${named.map((s, i) => `<sheet name="${escapeXml(s.safeName)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>`,
    },
    {
      name: 'xl/_rels/workbook.xml.rels',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${named.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${named.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    },
    { name: 'xl/styles.xml', data: STYLES_XML },
    ...named.map((s, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: sheetXml(s) })),
  ];
  return zipFiles(files);
}

export const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
