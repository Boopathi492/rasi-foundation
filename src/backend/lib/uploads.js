// Secure upload validation + private disk storage.
//  - File type is decided by MAGIC BYTES, never by the client-supplied MIME type or filename.
//  - Storage keys are generated server-side (random); user filenames are only kept as sanitised display names.
//  - Resolved paths are verified to stay inside the upload root (path-traversal safe).
//  - Default root is <project>/storage/uploads (outside /public, so never statically served). Override with UPLOAD_DIR.
//  - MongoDB stores only the relative storage key, never an absolute machine path or file contents.

import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

export const MAX_DOCUMENT_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024; // 3 MB (banners / logos)

export const KINDS = {
  jpeg: { mime: 'image/jpeg', ext: 'jpg' },
  png: { mime: 'image/png', ext: 'png' },
  webp: { mime: 'image/webp', ext: 'webp' },
  pdf: { mime: 'application/pdf', ext: 'pdf' },
};

const EXT_TO_KIND = { jpg: 'jpeg', jpeg: 'jpeg', png: 'png', webp: 'webp', pdf: 'pdf' };

export const DOCUMENT_TYPES = [
  { value: 'photo', label: 'Student photograph', kinds: ['jpeg', 'png', 'webp'] },
  { value: 'aadhaar', label: 'Aadhaar document', kinds: ['jpeg', 'png', 'pdf'] },
  { value: 'marksheet_10', label: '10th marksheet', kinds: ['jpeg', 'png', 'pdf'] },
  { value: 'marksheet_12', label: '12th marksheet', kinds: ['jpeg', 'png', 'pdf'] },
  { value: 'community_certificate', label: 'Community certificate', kinds: ['jpeg', 'png', 'pdf'] },
  { value: 'other', label: 'Other supporting document', kinds: ['jpeg', 'png', 'pdf'] },
];

export function detectKind(buf) {
  if (!Buffer.isBuffer(buf) || buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg';
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP') return 'webp';
  if (buf.subarray(0, 5).toString('latin1') === '%PDF-') return 'pdf';
  return null;
}

/** Display-safe file name (no path separators, control chars or leading dots). */
export function sanitizeFileName(name) {
  const base = String(name ?? '').split(/[\\/]/).pop() || 'file';
  const cleaned = base.replace(/[\u0000-\u001F\u007F<>:"|?*]/g, '').replace(/^\.+/, '').replace(/\s+/g, ' ').trim().slice(0, 120);
  return cleaned || 'file';
}

function extOf(name) {
  const m = /\.([A-Za-z0-9]{1,6})$/.exec(String(name ?? ''));
  return m ? m[1].toLowerCase() : '';
}

const DANGEROUS_EXT = /\.(exe|dll|bat|cmd|com|msi|sh|ps1|js|mjs|vbs|php|jsp|asp|aspx|html?|svg|jar|scr|hta)(\.|$)/i;

/**
 * Validate an uploaded file. Returns { ok:true, kind, mime, ext, size, displayName } or { ok:false, error }.
 */
export function validateUpload({ fileName, buffer, maxBytes = MAX_DOCUMENT_BYTES, allowedKinds = Object.keys(KINDS) }) {
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) return { ok: false, error: 'File is empty' };
  if (buffer.length > maxBytes) return { ok: false, error: `File is too large (max ${Math.round(maxBytes / 1024 / 1024)} MB)` };
  const rawName = String(fileName ?? '');
  if (DANGEROUS_EXT.test(rawName)) return { ok: false, error: 'This file type is not allowed' };
  const kind = detectKind(buffer);
  if (!kind) return { ok: false, error: 'Unsupported or corrupted file. Allowed: JPG, PNG, WebP, PDF' };
  if (!allowedKinds.includes(kind)) return { ok: false, error: `A ${kind.toUpperCase()} file is not accepted for this upload` };
  const ext = extOf(rawName);
  if (ext && EXT_TO_KIND[ext] !== kind) return { ok: false, error: 'File extension does not match its content' };
  if (kind === 'pdf') {
    const head = buffer.toString('latin1');
    if (/\/(JavaScript|JS|Launch|EmbeddedFile|OpenAction)\b/.test(head)) {
      return { ok: false, error: 'PDF contains active content and was rejected' };
    }
  }
  return { ok: true, kind, mime: KINDS[kind].mime, ext: KINDS[kind].ext, size: buffer.length, displayName: sanitizeFileName(rawName) };
}

/** Decode a base64 payload (optionally a data: URL) with a size guard BEFORE allocating the buffer. */
export function decodeBase64Payload(data, maxBytes = MAX_DOCUMENT_BYTES) {
  if (typeof data !== 'string' || !data) return { ok: false, error: 'No file data supplied' };
  const b64 = data.replace(/^data:[^;]+;base64,/, '');
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(b64)) return { ok: false, error: 'Invalid file encoding' };
  const approx = Math.floor((b64.length * 3) / 4);
  if (approx > maxBytes + 4) return { ok: false, error: `File is too large (max ${Math.round(maxBytes / 1024 / 1024)} MB)` };
  return { ok: true, buffer: Buffer.from(b64, 'base64') };
}

export function uploadRoot() {
  return path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), 'storage', 'uploads'));
}

export function newStorageKey(scope, ext) {
  const safeScope = String(scope).replace(/[^a-z0-9_-]/gi, '').slice(0, 30) || 'misc';
  const now = new Date();
  const folder = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
  return `${safeScope}/${folder}/${crypto.randomBytes(16).toString('hex')}.${ext}`;
}

/** Map a storage key to an absolute path, refusing anything that escapes the upload root. */
export function resolveStoragePath(key, root = uploadRoot()) {
  const k = String(key ?? '');
  if (!k || k.includes('\0') || path.isAbsolute(k) || /(^|[\\/])\.\.([\\/]|$)/.test(k)) throw new Error('Invalid storage key');
  const full = path.resolve(root, k);
  if (full !== root && !full.startsWith(root + path.sep)) throw new Error('Invalid storage key');
  return full;
}

export async function saveBuffer(key, buffer, root = uploadRoot()) {
  const full = resolveStoragePath(key, root);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, buffer, { flag: 'wx', mode: 0o600 });
  return key;
}

export async function readStored(key, root = uploadRoot()) {
  return fs.readFile(resolveStoragePath(key, root));
}

export async function deleteStored(key, root = uploadRoot()) {
  try {
    await fs.unlink(resolveStoragePath(key, root));
    return true;
  } catch (e) {
    if (e.code === 'ENOENT') return false;
    throw e;
  }
}

/** Read pixel dimensions from PNG / JPEG / WebP headers (for banner validation). Returns {width,height} or null. */
export function imageDimensions(buf) {
  const kind = detectKind(buf);
  try {
    if (kind === 'png') return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    if (kind === 'jpeg') {
      let i = 2;
      while (i < buf.length - 9) {
        if (buf[i] !== 0xff) { i++; continue; }
        const marker = buf[i + 1];
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
        }
        i += 2 + buf.readUInt16BE(i + 2);
      }
      return null;
    }
    if (kind === 'webp') {
      const fmt = buf.subarray(12, 16).toString('latin1');
      if (fmt === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
      if (fmt === 'VP8L') {
        const b = buf.readUInt32LE(21);
        return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
      }
      if (fmt === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    }
  } catch {
    return null;
  }
  return null;
}
