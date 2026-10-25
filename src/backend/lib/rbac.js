// Role-based access control. Enforced on the BACKEND (withPermission / createHandler); the UI only hides
// actions the current role may not perform as a convenience.
//
// Permission format: "<resource>:<action>"  actions = view | create | edit | approve | export | manage

export const ROLES = Object.freeze({
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  COUNSELLOR: 'counsellor',
  EXAM_MANAGER: 'exam_manager',
});

export const ROLE_LABELS = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  counsellor: 'Counsellor',
  exam_manager: 'Examination Manager',
};

export const RESOURCES = [
  'dashboard', 'students', 'documents', 'aadhaar', 'enquiries', 'contacts', 'feedback', 'counselling',
  'colleges', 'courses', 'banners', 'scholarship_practice', 'scholarship_exam', 'reports',
  'logs', 'audit', 'settings', 'notifications', 'users', 'announcements', 'achievements',
];

const ALL = ['view', 'create', 'edit', 'approve', 'export', 'manage'];

const grant = (resources, actions = ALL) => resources.flatMap((r) => actions.map((a) => `${r}:${a}`));

const ROLE_PERMISSIONS = {
  // Everything, including audit evidence viewing and user/role management.
  super_admin: new Set(grant(RESOURCES)),

  // Day-to-day operations. NOT: user/role management, audit-log management, full Aadhaar, original exam config.
  admin: new Set([
    ...grant(['dashboard', 'notifications'], ['view', 'edit']),
    ...grant(['students', 'documents', 'enquiries', 'contacts', 'feedback', 'counselling',
      'colleges', 'courses', 'banners', 'announcements', 'achievements', 'scholarship_practice']),
    ...grant(['reports'], ['view', 'export']),
    ...grant(['logs'], ['view']),
    ...grant(['settings'], ['view', 'manage']),
    ...grant(['scholarship_exam'], ['view']),
    ...grant(['audit'], ['view']),
  ]),

  // Counselling-focused staff: students (read), counselling (full), enquiries (work them), no exports of PII.
  counsellor: new Set([
    ...grant(['dashboard', 'notifications'], ['view', 'edit']),
    ...grant(['students'], ['view']),
    ...grant(['counselling'], ['view', 'create', 'edit']),
    ...grant(['enquiries'], ['view', 'edit']),
    ...grant(['colleges', 'courses'], ['view']),
    ...grant(['reports'], ['view']),
  ]),

  // Scholarship examinations only.
  exam_manager: new Set([
    ...grant(['dashboard', 'notifications'], ['view', 'edit']),
    ...grant(['scholarship_practice', 'scholarship_exam'], ['view', 'create', 'edit', 'export']),
    ...grant(['students'], ['view']),
    ...grant(['reports'], ['view', 'export']),
    ...grant(['audit'], ['view']),
  ]),
};

export function isValidRole(role) {
  return Object.prototype.hasOwnProperty.call(ROLE_PERMISSIONS, role);
}

/** Unknown / missing roles get NO permissions (fail closed). */
export function can(role, permission) {
  const set = ROLE_PERMISSIONS[role];
  return Boolean(set && set.has(permission));
}

export function permissionsFor(role) {
  return isValidRole(role) ? [...ROLE_PERMISSIONS[role]].sort() : [];
}

/**
 * Tokens issued before roles existed carry no `role`. They were only ever issued to the single
 * environment-configured administrator, who had unrestricted access, so they map to super_admin.
 */
export function roleFromTokenPayload(payload) {
  if (!payload) return null;
  if (payload.role === undefined || payload.role === null) return ROLES.SUPER_ADMIN;
  return isValidRole(payload.role) ? payload.role : null;
}
