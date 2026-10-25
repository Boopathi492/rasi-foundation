/**
 * Administrator Initial Setup Utility
 *
 * Usage:
 *   node scripts/admin-setup.mjs --username admin --email admin@rasifoundation.org --password YourPasswordHere123!
 *   OR set environment variables:
 *   ADMIN_INITIAL_USERNAME, ADMIN_INITIAL_EMAIL, ADMIN_INITIAL_PASSWORD
 *
 * Requirements:
 *   - Checks MongoDB connection via MONGODB_URI in .env.local
 *   - Ensures password passes security policy (min 12 chars, upper, lower, number, symbol)
 *   - Uses scrypt memory-hard password hashing
 *   - Creates initial user with 'super_admin' role
 *   - NEVER prints passwords or sensitive credentials
 */

import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';
import { hashPassword, passwordPolicyProblems } from '../src/backend/lib/password.js';

// Load .env.local manually if present
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

// Parse CLI arguments
const args = process.argv.slice(2);
function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

const username = getArg('--username') || process.env.ADMIN_INITIAL_USERNAME || 'superadmin';
const email = getArg('--email') || process.env.ADMIN_INITIAL_EMAIL || 'admin@rasifoundation.org';
const password = getArg('--password') || process.env.ADMIN_INITIAL_PASSWORD;

if (!password) {
  console.error('\n[Error] Admin setup password is required.');
  console.error('Provide it via --password <password> or ADMIN_INITIAL_PASSWORD env variable.\n');
  process.exit(1);
}

const problems = passwordPolicyProblems(password);
if (problems.length > 0) {
  console.error('\n[Security Policy Error] Password does not meet security requirements:');
  problems.forEach((p) => console.error(`  - ${p}`));
  console.error('\nPlease supply a stronger password.\n');
  process.exit(1);
}

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('\n[Error] MONGODB_URI is not set in environment or .env.local.\n');
  process.exit(1);
}

async function run() {
  console.log('\n[Admin Setup] Connecting to MongoDB...');
  await mongoose.connect(mongoUri, { bufferCommands: false });
  console.log('[Admin Setup] Connected successfully.');

  const db = mongoose.connection.db;
  const adminUsersCol = db.collection('admin_users');

  const existing = await adminUsersCol.findOne({
    $or: [{ username: username.toLowerCase().trim() }, { email: email.toLowerCase().trim() }],
  });

  if (existing) {
    console.log(`\n[Notice] An administrator with username '${username}' or email '${email}' already exists.`);
    console.log('[Notice] Skipping creation to preserve existing account and credentials.\n');
    await mongoose.disconnect();
    process.exit(0);
  }

  console.log('[Admin Setup] Generating scrypt password hash...');
  const passwordHash = await hashPassword(password);

  const doc = {
    username: username.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    displayName: 'Super Administrator',
    passwordHash,
    role: 'super_admin',
    isActive: true,
    failedLoginCount: 0,
    lockedUntil: null,
    lastLoginAt: null,
    createdBy: 'cli_setup',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await adminUsersCol.insertOne(doc);
  console.log(`\n[Success] Initial Super Admin account created successfully!`);
  console.log(`  Username : ${doc.username}`);
  console.log(`  Email    : ${doc.email}`);
  console.log(`  Role     : ${doc.role}`);
  console.log(`\nYou can now log in at /admin/login using these credentials.\n`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('\n[Setup Failed]', err?.message || err);
  process.exit(1);
});
