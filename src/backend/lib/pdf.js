// Minimal dependency-free PDF report writer (A4, built-in Helvetica / Helvetica-Bold).
// Supports: branded header, title, generated timestamp, applied filters, summary metrics, paginated tables with
// repeating header rows, wrapped cell text, page numbers ("Page x of y") and a footer.
//
// LIMITATION: standard PDF fonts are Latin-1 (WinAnsi) only. Characters outside Latin-1 (for example Tamil script)
// are replaced with "?" in PDFs. The Excel export keeps full Unicode.

const HELV = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];

export function textWidth(text, size, bold = false) {
  let w = 0;
  for (const ch of String(text)) {
    const code = ch.charCodeAt(0);
    const base = code >= 32 && code <= 126 ? HELV[code - 32] : 556;
    w += bold ? base * 1.04 : base;
  }
  return (w / 1000) * size;
}

/** Latin-1 safe text: replace unsupported characters, strip control chars. */
export function pdfSafeText(value) {
  return String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, '?');
}

function escapePdf(s) {
  return pdfSafeText(s).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function wrapText(text, maxWidth, size, bold = false) {
  const words = pdfSafeText(text).split(' ').filter((w) => w.length);
  if (words.length === 0) return [''];
  const lines = [];
  let line = '';
  for (let word of words) {
    // hard-split very long tokens
    while (textWidth(word, size, bold) > maxWidth && word.length > 1) {
      let cut = word.length - 1;
      while (cut > 1 && textWidth(word.slice(0, cut), size, bold) > maxWidth) cut--;
      if (line) { lines.push(line); line = ''; }
      lines.push(word.slice(0, cut));
      word = word.slice(cut);
    }
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, size, bold) <= maxWidth) line = candidate;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines;
}

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 40;

/**
 * buildPdf({ title, subtitle?, brand?, generatedAt?, filters?: {k:v}, summary?: [{label,value}],
 *            columns:[{header,key,width? (relative weight)}], rows:[{...}], footer? }) -> Buffer
 */
export function buildPdf({ title, subtitle = '', brand = 'Rasi Foundation', generatedAt = new Date(), filters = {}, summary = [], columns, rows, footer = 'Confidential - for authorised use only', landscape = false }) {
  const pw = landscape ? PAGE_H : PAGE_W;
  const ph = landscape ? PAGE_W : PAGE_H;
  const contentW = pw - MARGIN * 2;
  const totalWeight = columns.reduce((s, c) => s + (c.width || 1), 0);
  const colW = columns.map((c) => ((c.width || 1) / totalWeight) * contentW);
  const FS = 8;
  const LH = 10.5;
  const pagesOps = [];
  let ops = [];
  let y = 0;

  const color = (r, g, b, stroke = false) => `${r} ${g} ${b} ${stroke ? 'RG' : 'rg'}`;
  const text = (x, yy, str, size = FS, bold = false) => `BT /${bold ? 'F2' : 'F1'} ${size} Tf ${x.toFixed(2)} ${yy.toFixed(2)} Td (${escapePdf(str)}) Tj ET`;

  function newPage(first) {
    if (ops.length) pagesOps.push(ops);
    ops = [];
    y = ph - MARGIN;
    // brand bar
    ops.push(color(0.078, 0.129, 0.239), `0 ${ph - 26} ${pw} 26 re f`);
    ops.push(color(1, 1, 1), text(MARGIN, ph - 17, brand, 11, true));
    ops.push(color(1, 1, 1), text(pw - MARGIN - textWidth(pdfSafeText(title).slice(0, 60), 8), ph - 17, pdfSafeText(title).slice(0, 60), 8));
    y = ph - 26 - 22;
    if (first) {
      ops.push(color(0.09, 0.125, 0.2), text(MARGIN, y, title, 16, true));
      y -= 16;
      if (subtitle) { ops.push(color(0.39, 0.45, 0.55), text(MARGIN, y, subtitle, 9)); y -= 13; }
      ops.push(color(0.39, 0.45, 0.55), text(MARGIN, y, `Generated: ${new Date(generatedAt).toISOString().replace('T', ' ').slice(0, 19)} UTC`, 8));
      y -= 12;
      const f = Object.entries(filters).filter(([, v]) => v !== undefined && v !== null && String(v) !== '');
      if (f.length) {
        const line = `Filters: ${f.map(([k, v]) => `${k}=${v}`).join('; ')}`;
        for (const l of wrapText(line, contentW, 8)) { ops.push(color(0.39, 0.45, 0.55), text(MARGIN, y, l, 8)); y -= 10; }
      }
      y -= 6;
      if (summary.length) {
        const boxW = Math.min(150, (contentW - 8 * (summary.length - 1)) / summary.length);
        let x = MARGIN;
        let rowTop = y;
        for (const item of summary) {
          if (x + boxW > pw - MARGIN + 0.1) { x = MARGIN; rowTop -= 40; }
          ops.push(color(0.96, 0.97, 0.98), `${x} ${rowTop - 32} ${boxW} 34 re f`);
          ops.push(color(0.39, 0.45, 0.55), text(x + 6, rowTop - 11, String(item.label).slice(0, 30), 7));
          ops.push(color(0.09, 0.125, 0.2), text(x + 6, rowTop - 26, String(item.value).slice(0, 18), 12, true));
          x += boxW + 8;
        }
        y = rowTop - 44;
      }
    }
    drawTableHeader();
  }

  function drawTableHeader() {
    const h = 18;
    ops.push(color(0.078, 0.129, 0.239), `${MARGIN} ${y - h + 4} ${contentW} ${h} re f`);
    let x = MARGIN;
    columns.forEach((c, i) => {
      const label = wrapText(c.header, colW[i] - 8, FS, true)[0];
      ops.push(color(1, 1, 1), text(x + 4, y - 8, label, FS, true));
      x += colW[i];
    });
    y -= h + 2;
  }

  newPage(true);
  rows.forEach((row, ri) => {
    const cells = columns.map((c, i) => wrapText(row[c.key] ?? '', colW[i] - 8, FS));
    const lines = Math.min(6, Math.max(...cells.map((c) => c.length)));
    const rowH = lines * LH + 6;
    if (y - rowH < MARGIN + 28) newPage(false);
    if (ri % 2 === 0) ops.push(color(0.97, 0.98, 0.99), `${MARGIN} ${y - rowH + 8} ${contentW} ${rowH} re f`);
    let x = MARGIN;
    cells.forEach((cellLines, i) => {
      cellLines.slice(0, 6).forEach((l, li) => ops.push(color(0.09, 0.125, 0.2), text(x + 4, y - 2 - li * LH, l, FS)));
      x += colW[i];
    });
    y -= rowH;
  });
  if (rows.length === 0) {
    ops.push(color(0.39, 0.45, 0.55), text(MARGIN + 4, y - 8, 'No records match the selected filters.', 9));
  }
  pagesOps.push(ops);

  // footer + page numbers
  const total = pagesOps.length;
  pagesOps.forEach((pOps, i) => {
    pOps.push(color(0.5, 0.55, 0.62, true), `${MARGIN} ${MARGIN - 4} m ${pw - MARGIN} ${MARGIN - 4} l S`);
    pOps.push(color(0.39, 0.45, 0.55), text(MARGIN, MARGIN - 16, footer, 7));
    const label = `Page ${i + 1} of ${total}`;
    pOps.push(color(0.39, 0.45, 0.55), text(pw - MARGIN - textWidth(label, 8), MARGIN - 16, label, 8));
  });

  // ---- assemble objects ----
  const objects = [];
  const add = (body) => { objects.push(body); return objects.length; };
  const catalogId = add('');
  const pagesId = add('');
  const f1 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  const f2 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  const pageIds = [];
  for (const pOps of pagesOps) {
    const stream = pOps.join('\n');
    const contentId = add(`<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`);
    const pageId = add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pw.toFixed(2)} ${ph.toFixed(2)}] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  }
  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

  let out = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(Buffer.byteLength(out, 'latin1'));
    out += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefPos = Buffer.byteLength(out, 'latin1');
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((o) => { out += `${String(o).padStart(10, '0')} 00000 n \n`; });
  out += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
  return Buffer.from(out, 'latin1');
}

export const PDF_MIME = 'application/pdf';
export const buildPdfReport = buildPdf;

