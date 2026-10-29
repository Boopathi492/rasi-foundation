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

/** Convert an INR amount to English words (e.g. 500 -> "Five Hundred Rupees Only") */
export function numberToWordsINR(amount) {
  const num = Number(amount);
  if (isNaN(num) || num < 0) return '';
  if (num === 0) return 'Zero Rupees Only';

  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  function convertTwoDigits(n) {
    if (n === 0) return '';
    if (n < 20) return ones[n];
    const rem = n % 10;
    return tens[Math.floor(n / 10)] + (rem ? ' ' + ones[rem] : '');
  }

  function convertThreeDigits(n) {
    const h = Math.floor(n / 100);
    const rem = n % 100;
    let res = '';
    if (h > 0) {
      res += ones[h] + ' Hundred';
      if (rem > 0) res += ' ';
    }
    if (rem > 0) {
      res += convertTwoDigits(rem);
    }
    return res;
  }

  const integerPart = Math.floor(num);
  const paisePart = Math.round((num - integerPart) * 100);

  const parts = [];
  let current = integerPart;

  const hundredPart = current % 1000;
  current = Math.floor(current / 1000);

  const thousandPart = current % 100;
  current = Math.floor(current / 100);

  const lakhPart = current % 100;
  current = Math.floor(current / 100);

  const crorePart = current;

  if (crorePart > 0) {
    parts.push(convertThreeDigits(crorePart) + ' Crore');
  }
  if (lakhPart > 0) {
    parts.push(convertTwoDigits(lakhPart) + ' Lakh');
  }
  if (thousandPart > 0) {
    parts.push(convertTwoDigits(thousandPart) + ' Thousand');
  }
  if (hundredPart > 0) {
    parts.push(convertThreeDigits(hundredPart));
  }

  let words = parts.join(' ').trim();
  if (!words) words = 'Zero';
  words += ' Rupees';

  if (paisePart > 0) {
    words += ' and ' + convertTwoDigits(paisePart) + ' Paise';
  }

  words += ' Only';
  return words;
}

/** Serialize PDF 1.4 stream from an array of page operations */
function assemblePdfDocument(pagesOps, pw = PAGE_W, ph = PAGE_H) {
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

/**
 * Build an authoritative, single-page A4 Official Student Payment Receipt PDF.
 * Styled with Emerald & Slate accents, structured 2-column info grids,
 * fee particulars table, digital verification badge, and contact footer.
 */
export function buildStudentPaymentReceipt(data = {}) {
  const pw = PAGE_W;
  const ph = PAGE_H;
  const margin = 36;
  const contentW = pw - margin * 2; // 523.28 pt

  const ops = [];
  const color = (r, g, b, stroke = false) => `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} ${stroke ? 'RG' : 'rg'}`;
  const text = (x, y, str, size = 8, bold = false) => `BT /${bold ? 'F2' : 'F1'} ${size} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${escapePdf(str)}) Tj ET`;
  const rect = (x, y, w, h, stroke = false, fill = true) => {
    if (fill && stroke) return `${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re B`;
    if (fill) return `${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`;
    return `${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re s`;
  };
  const line = (x1, y1, x2, y2, lineWidth = 1) => `${lineWidth.toFixed(2)} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`;

  // --- 1. Top Brand Bar (Emerald Accent) ---
  ops.push(color(0.016, 0.471, 0.341)); // Emerald #047857
  ops.push(rect(0, ph - 8, pw, 8, false, true));

  // --- 2. Organization & Document Header ---
  // Left: Foundation Branding
  ops.push(color(0.024, 0.373, 0.275)); // Emerald dark #065f46
  ops.push(text(margin, ph - 30, 'RASI FOUNDATION', 17, true));

  ops.push(color(0.278, 0.333, 0.412)); // Slate 600
  ops.push(text(margin, ph - 44, 'Educational Guidance & Career Counseling Support', 8.5, false));

  ops.push(color(0.392, 0.455, 0.545)); // Slate 500
  ops.push(text(margin, ph - 56, 'Regd. Educational Trust | Rasipuram, Namakkal District, Tamil Nadu', 7.5, false));
  ops.push(text(margin, ph - 67, `Phone: ${data.phoneDisplay || '+91 97 89 44 61 00'}  |  Email: ${data.email || 'rasipuramrasifoundation@gmail.com'}`, 7.5, false));

  // Right: Document Title Box
  const titleBoxW = 220;
  const titleBoxH = 46;
  const titleBoxX = pw - margin - titleBoxW;
  const titleBoxY = ph - 24 - titleBoxH;

  // Box background & border
  ops.push(color(0.973, 0.980, 0.988)); // Slate 50
  ops.push(color(0.016, 0.471, 0.341, true)); // Emerald border
  ops.push('1.2 w');
  ops.push(rect(titleBoxX, titleBoxY, titleBoxW, titleBoxH, true, true));

  const titleText = 'OFFICIAL STUDENT PAYMENT RECEIPT';
  const titleX = titleBoxX + (titleBoxW - textWidth(titleText, 9, true)) / 2;
  ops.push(color(0.059, 0.090, 0.165));
  ops.push(text(titleX, titleBoxY + 31, titleText, 9, true));

  const subBadgeText = 'TAX EXEMPT EDUCATIONAL TRUST ACKNOWLEDGEMENT';
  const subBadgeX = titleBoxX + (titleBoxW - textWidth(subBadgeText, 6, false)) / 2;
  ops.push(color(0.392, 0.455, 0.545));
  ops.push(text(subBadgeX, titleBoxY + 19, subBadgeText, 6, false));

  const origText = 'ORIGINAL FOR RECIPIENT';
  const origX = titleBoxX + (titleBoxW - textWidth(origText, 7, true)) / 2;
  ops.push(color(0.016, 0.471, 0.341));
  ops.push(text(origX, titleBoxY + 8, origText, 7, true));

  // Header separator line
  ops.push(color(0.886, 0.910, 0.941, true)); // Slate 200
  ops.push(line(margin, ph - 80, pw - margin, ph - 80, 1));

  // --- 3. Quick Reference Metadata Ribbon (4 Cards) ---
  const ribbonY = ph - 88 - 36;
  const ribbonH = 36;
  ops.push(color(0.973, 0.980, 0.988));
  ops.push(color(0.886, 0.910, 0.941, true));
  ops.push('1 w');
  ops.push(rect(margin, ribbonY, contentW, ribbonH, true, true));

  const colW4 = contentW / 4;
  // Dividers between the 4 cells
  for (let i = 1; i < 4; i++) {
    ops.push(line(margin + colW4 * i, ribbonY, margin + colW4 * i, ribbonY + ribbonH, 0.75));
  }

  // Cell 1: Receipt Number
  ops.push(color(0.392, 0.455, 0.545));
  ops.push(text(margin + 8, ribbonY + 23, 'RECEIPT NUMBER', 6.5, true));
  ops.push(color(0.059, 0.090, 0.165));
  ops.push(text(margin + 8, ribbonY + 9, String(data.receiptNo || 'RCPT_PENDING').slice(0, 24), 8, true));

  // Cell 2: Payment Date & Time
  ops.push(color(0.392, 0.455, 0.545));
  ops.push(text(margin + colW4 + 8, ribbonY + 23, 'PAYMENT DATE & TIME', 6.5, true));
  ops.push(color(0.059, 0.090, 0.165));
  ops.push(text(margin + colW4 + 8, ribbonY + 9, String(data.paymentDate || 'Verified Record').slice(0, 26), 7.5, true));

  // Cell 3: Payment Status
  ops.push(color(0.392, 0.455, 0.545));
  ops.push(text(margin + colW4 * 2 + 8, ribbonY + 23, 'PAYMENT STATUS', 6.5, true));
  const isRefunded = data.status === 'refunded' || data.refundStatus === 'full';
  const statusLabel = isRefunded ? 'REFUNDED' : 'PAID - VERIFIED';
  // Green badge pill for PAID, Amber for REFUNDED
  if (isRefunded) {
    ops.push(color(0.85, 0.4, 0.1));
  } else {
    ops.push(color(0.020, 0.588, 0.412));
  }
  const badgeW = textWidth(statusLabel, 7.5, true) + 12;
  ops.push(rect(margin + colW4 * 2 + 8, ribbonY + 6, badgeW, 14, false, true));
  ops.push(color(1, 1, 1));
  ops.push(text(margin + colW4 * 2 + 14, ribbonY + 10, statusLabel, 7.5, true));

  // Cell 4: Gateway Reference ID
  ops.push(color(0.392, 0.455, 0.545));
  ops.push(text(margin + colW4 * 3 + 8, ribbonY + 23, 'GATEWAY TRANSACTION ID', 6.5, true));
  ops.push(color(0.059, 0.090, 0.165));
  ops.push(text(margin + colW4 * 3 + 8, ribbonY + 9, String(data.paymentId || data.orderId || 'Direct Gateway').slice(0, 24), 7.5, true));

  // --- 4. Two-Column Particulars Section (Student Info & Academic Details) ---
  const colGap = 12;
  const colW2 = (contentW - colGap) / 2;
  const sectionH = 175;
  const sectionY = ribbonY - 10 - sectionH;

  // Function to draw a 2-column info card
  function drawCard(x, y, w, h, title, rows) {
    // Outer border & background
    ops.push(color(1, 1, 1)); // White bg
    ops.push(color(0.886, 0.910, 0.941, true)); // Slate 200 border
    ops.push('0.75 w');
    ops.push(rect(x, y, w, h, true, true));

    // Header bar
    const hdrH = 20;
    ops.push(color(0.925, 0.992, 0.961)); // Emerald 50
    ops.push(color(0.655, 0.953, 0.816, true)); // Emerald 200 border
    ops.push(rect(x, y + h - hdrH, w, hdrH, true, true));

    ops.push(color(0.024, 0.373, 0.275)); // Emerald 800
    ops.push(text(x + 10, y + h - 14, title, 8, true));

    // Rows
    let rowY = y + h - hdrH - 14;
    for (const r of rows) {
      ops.push(color(0.392, 0.455, 0.545)); // Slate 500
      ops.push(text(x + 10, rowY, r.label, 7.5, false));

      ops.push(color(0.059, 0.090, 0.165)); // Slate 900
      const valW = w - 105;
      const wrapped = wrapText(r.value || '-', valW, 7.5, r.bold || false);
      ops.push(text(x + 95, rowY, wrapped[0], 7.5, r.bold || false));
      if (wrapped[1] && r.multiline) {
        rowY -= 9;
        ops.push(text(x + 95, rowY, wrapped[1], 7.5, r.bold || false));
      }
      rowY -= r.rowGap || 17.5;
    }
  }

  // Left Column: Student / Applicant Particulars
  const studentRows = [
    { label: 'Student Name', value: data.studentName || data.name || 'Candidate', bold: true },
    { label: 'Application Ref', value: data.applicationRef || data.receiptNo || 'On Record' },
    { label: 'Contact Mobile', value: data.studentMobile || data.phone || 'Recorded' },
    { label: 'Email Address', value: data.studentEmail || data.email || 'Recorded' },
    { label: "Father / Guardian", value: data.fatherName || 'Not Stated' },
    { label: 'Social Category', value: data.community || 'General / Unspecified' },
    { label: 'District / State', value: `${data.district || 'Namakkal'}, Tamil Nadu` },
    { label: 'Aadhaar Number', value: data.maskedAadhaar || 'Verified on Registration', bold: true },
  ];
  drawCard(margin, sectionY, colW2, sectionH, 'STUDENT / APPLICANT PARTICULARS', studentRows);

  // Right Column: Academic & Admission Particulars
  const academicRows = [
    { label: 'Course Applied', value: data.courseApplied || 'Higher Education Counseling', bold: true, multiline: true, rowGap: 21 },
    { label: 'College / Campus', value: data.collegeName || 'Counseling Choice Under Finalization', multiline: true, rowGap: 21 },
    { label: 'TNEA / Code', value: data.tneaCode ? `Code: ${data.tneaCode}` : 'Direct Admission / Non-TNEA' },
    { label: 'Admission Quota', value: data.quota === 'GQ' ? 'Government Quota (GQ)' : data.quota === 'MQ' ? 'Management Quota (MQ)' : data.quota || 'Merit Guidance' },
    { label: 'Academic Level', value: data.admissionType || 'Undergraduate (UG)' },
    { label: 'First Graduate', value: data.isFirstGraduate ? 'Yes (Eligible)' : 'No' },
    { label: 'School Category', value: data.isGovtSchool ? 'Govt School (7.5% Quota Eligible)' : 'General / Private' },
    { label: '12th Cut-Off / Reg', value: data.expectedCutOff ? `Cut-Off: ${data.expectedCutOff}` : (data.plusTwoExamNumber ? `Roll: ${data.plusTwoExamNumber}` : 'Recorded on File') },
  ];
  drawCard(margin + colW2 + colGap, sectionY, colW2, sectionH, 'ACADEMIC & ADMISSION PARTICULARS', academicRows);

  // --- 5. Fee Particulars & Transaction Breakdown Table ---
  const tblTop = sectionY - 12;
  const tblH = 100;
  const tblY = tblTop - tblH;

  // Table header bar
  const tblHdrH = 18;
  ops.push(color(0.059, 0.090, 0.165)); // Slate 900
  ops.push(rect(margin, tblTop - tblHdrH, contentW, tblHdrH, false, true));

  // Table header text
  ops.push(color(1, 1, 1));
  ops.push(text(margin + 10, tblTop - 13, 'PARTICULARS / FEE PURPOSE', 7.5, true));
  ops.push(text(margin + 280, tblTop - 13, 'PAYMENT MODE / RAIL', 7.5, true));
  const amtHdr = 'AMOUNT (INR)';
  ops.push(text(pw - margin - 10 - textWidth(amtHdr, 7.5, true), tblTop - 13, amtHdr, 7.5, true));

  // Table row 1 (Fee item)
  const row1Y = tblTop - tblHdrH - 32;
  ops.push(color(1, 1, 1));
  ops.push(color(0.886, 0.910, 0.941, true));
  ops.push('0.75 w');
  ops.push(rect(margin, row1Y, contentW, 32, true, true));

  // Row 1 values
  ops.push(color(0.059, 0.090, 0.165));
  ops.push(text(margin + 10, row1Y + 19, data.purposeTitle || 'Career Counseling Guidance Fee', 8.5, true));
  ops.push(color(0.392, 0.455, 0.545));
  ops.push(text(margin + 10, row1Y + 8, data.purposeDescription || 'Higher Education Admission & Counseling Support Fee', 7, false));

  // Payment rail
  ops.push(color(0.200, 0.255, 0.333));
  const railText = (data.paymentMethod || 'Razorpay Gateway').toUpperCase();
  ops.push(text(margin + 280, row1Y + 19, railText, 8, true));
  ops.push(color(0.392, 0.455, 0.545));
  const railSub = data.vpa ? `VPA: ${data.vpa}` : (data.bank ? `Bank: ${data.bank}` : 'Direct Digital Gateway Settlement');
  ops.push(text(margin + 280, row1Y + 8, railSub.slice(0, 36), 7, false));

  // Amount
  const amtFormatted = `INR ${Number(data.amount || 0).toFixed(2)}`;
  ops.push(color(0.059, 0.090, 0.165));
  ops.push(text(pw - margin - 10 - textWidth(amtFormatted, 8.5, true), row1Y + 14, amtFormatted, 8.5, true));

  // Table Total Row
  const totalRowY = row1Y - 24;
  ops.push(color(0.973, 0.980, 0.988)); // Slate 50
  ops.push(color(0.796, 0.835, 0.882, true)); // Slate 300
  ops.push(rect(margin, totalRowY, contentW, 24, true, true));

  ops.push(color(0.059, 0.090, 0.165));
  ops.push(text(margin + 10, totalRowY + 8, 'TOTAL AMOUNT RECEIVED & SETTLED', 8, true));

  const totalAmtText = `INR ${Number(data.amount || 0).toFixed(2)}`;
  ops.push(color(0.016, 0.471, 0.341)); // Emerald #047857
  ops.push(text(pw - margin - 10 - textWidth(totalAmtText, 10, true), totalRowY + 7, totalAmtText, 10, true));

  // Amount in Words Banner
  const wordsBannerY = totalRowY - 24;
  ops.push(color(0.941, 0.992, 0.957)); // Emerald 50
  ops.push(color(0.525, 0.937, 0.675, true)); // Emerald 300 border
  ops.push('0.75 w');
  ops.push(rect(margin, wordsBannerY, contentW, 22, true, true));

  ops.push(color(0.024, 0.373, 0.275)); // Emerald 800
  ops.push(text(margin + 10, wordsBannerY + 7, 'Amount in Words: ', 7.5, true));
  const wordsText = numberToWordsINR(data.amount || 0);
  ops.push(color(0.086, 0.396, 0.204)); // Emerald 700
  ops.push(text(margin + 10 + textWidth('Amount in Words: ', 7.5, true), wordsBannerY + 7, wordsText, 8, true));

  // --- 6. Transaction Audit Trail & Digital Verification Seal ---
  const auditTop = wordsBannerY - 10;
  const auditH = 78;
  const auditY = auditTop - auditH;

  const auditW = 330;
  const sealW = contentW - auditW - colGap;

  // Left: Audit Trail Box
  ops.push(color(0.973, 0.980, 0.988));
  ops.push(color(0.886, 0.910, 0.941, true));
  ops.push('0.75 w');
  ops.push(rect(margin, auditY, auditW, auditH, true, true));

  // Audit Header
  ops.push(color(0.945, 0.961, 0.976));
  ops.push(rect(margin, auditY + auditH - 16, auditW, 16, false, true));
  ops.push(color(0.200, 0.255, 0.333));
  ops.push(text(margin + 10, auditY + auditH - 12, 'GATEWAY AUDIT & TRANSACTION LOG', 7, true));

  // Audit details
  const auditRows = [
    { label: 'Razorpay Order ID', value: data.orderId || 'Direct Capture' },
    { label: 'Razorpay Payment ID', value: data.paymentId || 'pay_verified' },
    { label: 'Completed At (IST)', value: data.paymentDate || 'Verified Record' },
    { label: 'Settlement Channel', value: 'Authoritative Digital Capture via Razorpay' },
  ];
  let aRowY = auditY + auditH - 30;
  for (const ar of auditRows) {
    ops.push(color(0.392, 0.455, 0.545));
    ops.push(text(margin + 10, aRowY, ar.label, 7, false));
    ops.push(color(0.059, 0.090, 0.165));
    ops.push(text(margin + 110, aRowY, String(ar.value).slice(0, 40), 7, true));
    aRowY -= 12;
  }

  // Right: Digital Verification Seal Stamp
  const sealX = margin + auditW + colGap;
  ops.push(color(0.925, 0.992, 0.961)); // Emerald 50
  ops.push(color(0.016, 0.471, 0.341, true)); // Emerald border
  ops.push('1.5 w');
  ops.push(rect(sealX, auditY, sealW, auditH, true, true));

  // Inner border for official seal appearance
  ops.push(color(0.655, 0.953, 0.816, true)); // Emerald 200
  ops.push('0.5 w');
  ops.push(rect(sealX + 3, auditY + 3, sealW - 6, auditH - 6, true, false));

  const sealTitle = 'RASI FOUNDATION';
  ops.push(color(0.024, 0.373, 0.275));
  ops.push(text(sealX + (sealW - textWidth(sealTitle, 8, true)) / 2, auditY + auditH - 16, sealTitle, 8, true));

  const stampBadge = '[ VERIFIED DIGITAL RECEIPT ]';
  ops.push(color(0.016, 0.471, 0.341));
  ops.push(text(sealX + (sealW - textWidth(stampBadge, 6.5, true)) / 2, auditY + auditH - 28, stampBadge, 6.5, true));

  const stampStatus = isRefunded ? 'REFUND PROCESSED' : 'PAID IN FULL';
  ops.push(color(isRefunded ? 0.85 : 0.024, isRefunded ? 0.4 : 0.373, isRefunded ? 0.1 : 0.275));
  ops.push(text(sealX + (sealW - textWidth(stampStatus, 8.5, true)) / 2, auditY + auditH - 42, stampStatus, 8.5, true));

  const stampNote1 = 'Computer Generated & Verified';
  ops.push(color(0.278, 0.333, 0.412));
  ops.push(text(sealX + (sealW - textWidth(stampNote1, 6.5, false)) / 2, auditY + auditH - 54, stampNote1, 6.5, false));

  const stampNote2 = 'Valid Without Physical Signature';
  ops.push(color(0.392, 0.455, 0.545));
  ops.push(text(sealX + (sealW - textWidth(stampNote2, 6, false)) / 2, auditY + auditH - 65, stampNote2, 6, false));

  // --- 7. Candidate Guidance & Instructions Box ---
  const instTop = auditY - 10;
  const instH = 58;
  const instY = instTop - instH;

  ops.push(color(1, 1, 1));
  ops.push(color(0.886, 0.910, 0.941, true));
  ops.push('0.75 w');
  ops.push(rect(margin, instY, contentW, instH, true, true));

  ops.push(color(0.973, 0.980, 0.988));
  ops.push(rect(margin, instY + instH - 15, contentW, 15, false, true));
  ops.push(color(0.200, 0.255, 0.333));
  ops.push(text(margin + 10, instY + instH - 11, 'IMPORTANT GUIDANCE & INSTRUCTIONS FOR APPLICANT', 7, true));

  const bullets = [
    '1. This receipt confirms successful payment towards Rasi Foundation student guidance and career counseling services.',
    '2. Please quote the Receipt Number and Student Name in all subsequent counseling and seat allotment communications.',
    '3. College admission is subject to institutional eligibility criteria, verification of original certificates, and official seat allotment rules.'
  ];
  let bY = instY + instH - 26;
  for (const b of bullets) {
    ops.push(color(0.278, 0.333, 0.412));
    ops.push(text(margin + 10, bY, b, 6.8, false));
    bY -= 11;
  }

  // --- 8. Contact & Legal Footer ---
  const footerLineY = instY - 12;
  ops.push(color(0.886, 0.910, 0.941, true));
  ops.push(line(margin, footerLineY, pw - margin, footerLineY, 0.75));

  const fY = footerLineY - 12;
  ops.push(color(0.059, 0.090, 0.165));
  ops.push(text(margin, fY, 'Rasi Foundation — Educational Guidance & Career Counseling Support', 7.5, true));

  ops.push(color(0.392, 0.455, 0.545));
  ops.push(text(margin, fY - 10, `Contact: ${data.phoneDisplay || '+91 97 89 44 61 00'}  |  Email: ${data.email || 'rasipuramrasifoundation@gmail.com'}  |  Web: ${data.website || 'www.rasifoundation.com'}`, 7, false));
  ops.push(text(margin, fY - 19, 'This is a computer-generated digital receipt issued by Rasi Foundation. Valid without physical signature. No commercial value.', 6.5, false));

  const pgLabel = 'Page 1 of 1';
  ops.push(color(0.392, 0.455, 0.545));
  ops.push(text(pw - margin - textWidth(pgLabel, 7.5, true), fY, pgLabel, 7.5, true));

  const genStamp = `Generated: ${new Date().toISOString().replace('T', ' ').slice(0, 19)} UTC`;
  ops.push(color(0.5, 0.55, 0.62));
  ops.push(text(pw - margin - textWidth(genStamp, 6.5, false), fY - 10, genStamp, 6.5, false));

  return assemblePdfDocument([ops], pw, ph);
}

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

  return assemblePdfDocument(pagesOps, pw, ph);
}

export const PDF_MIME = 'application/pdf';
export const buildPdfReport = buildPdf;


