// API Endpoints for Users feature
// Centralized endpoint definitions for maintainability

export const USERS_ENDPOINTS = {
  // Base path
  BASE: '/admin/users',

  // CRUD operations
  LIST: '/admin/users',
  CREATE: '/admin/users',
  DETAIL: (id: string) => `/admin/users/${id}`,
  UPDATE: (id: string) => `/admin/users/${id}`,
  DELETE: (id: string) => `/admin/users/${id}`,
} as const;

// Query param keys for filtering
export const USERS_QUERY_KEYS = {
  ROLE: 'role',
  STATUS: 'status',
  ORGANIZATION_ID: 'organization_id',
  BRANCH_ID: 'branch_id',
  SEARCH: 'search',
  EMAIL_VERIFIED: 'email_verified',
  PAGE: 'page',
  PER_PAGE: 'per_page',
} as const;
