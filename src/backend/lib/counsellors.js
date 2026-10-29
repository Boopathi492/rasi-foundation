import mongoose from 'mongoose';
import AdminUser from '../models/AdminUser.js';
import { getAdminCredentials } from './adminConfig.js';

/**
 * Retrieve verified staff members eligible for counselling assignment.
 * Legitimate sources:
 * 1. Registered active staff in `admin_users` collection with role 'counsellor', 'admin', or 'super_admin'.
 * 2. Configured environment administrator from `getAdminCredentials()`.
 *
 * No fabricated or hardcoded staff names are ever returned.
 */
export async function getVerifiedCounsellors() {
  const verifiedList = [];
  const seenKeys = new Set();

  // 1. Registered active staff from MongoDB (only query when DB connection is active)
  if (mongoose.connection?.readyState === 1) {
    try {
      const dbStaff = await AdminUser.find(
        {
          isActive: true,
          role: { $in: ['counsellor', 'admin', 'super_admin'] },
        },
        { username: 1, displayName: 1, role: 1 }
      ).lean();

      for (const u of (dbStaff || [])) {
        const uname = (u.username || '').toLowerCase().trim();
        if (uname && !seenKeys.has(uname)) {
          seenKeys.add(uname);
          verifiedList.push({
            id: String(u._id),
            username: u.username,
            displayName: u.displayName || u.username,
            role: u.role,
          });
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('[counsellors] Error fetching staff from admin_users:', err?.message);
      }
    }
  }

  // 2. Configured environment administrator
  try {
    const envAdmin = getAdminCredentials();
    if (envAdmin && envAdmin.username) {
      const envUname = envAdmin.username.toLowerCase().trim();
      if (!seenKeys.has(envUname)) {
        seenKeys.add(envUname);
        verifiedList.push({
          id: 'env_admin',
          username: envAdmin.username,
          displayName: envAdmin.name || 'Administrator',
          role: 'super_admin',
        });
      }
    }
  } catch (err) {
    // Environment admin credentials missing or unconfigured
  }

  // Sort by displayName alphabetically
  return verifiedList.sort((a, b) => (a.displayName || a.username).localeCompare(b.displayName || b.username));
}

/**
 * Validate whether a counsellor assignment matches a legitimate staff record.
 * Accepts:
 * - Empty string / null / undefined / 'unassigned' -> Valid unassignment (clears assignment)
 * - DisplayName, username, or ID of a verified counsellor
 *
 * Rejects arbitrary or unverified names (fail closed).
 */
export async function validateCounsellorAssignment(counsellorInput) {
  const raw = String(counsellorInput ?? '').trim();
  if (
    !raw ||
    raw.toLowerCase() === 'unassigned' ||
    raw.toLowerCase() === 'not assigned' ||
    raw.toLowerCase() === 'none'
  ) {
    return { valid: true, assignedName: '' };
  }

  const staff = await getVerifiedCounsellors();
  const lower = raw.toLowerCase();

  const match = staff.find(
    (s) =>
      s.id === raw ||
      (s.username && s.username.toLowerCase() === lower) ||
      (s.displayName && s.displayName.toLowerCase() === lower)
  );

  if (match) {
    return { valid: true, assignedName: match.displayName || match.username, staffMember: match };
  }

  return {
    valid: false,
    error: 'Invalid counsellor: must be an active registered staff member or left unassigned',
  };
}
