// API Endpoints for Plans feature
// Centralized endpoint definitions for maintainability

export const PLANS_ENDPOINTS = {
  // Base path
  BASE: '/admin/plans',

  // CRUD operations
  LIST: '/admin/plans',
  CREATE: '/admin/plans',
  DETAIL: (id: string) => `/admin/plans/${id}`,
  UPDATE: (id: string) => `/admin/plans/${id}`,
  DELETE: (id: string) => `/admin/plans/${id}`,
  PATCH: (id: string) => `/admin/plans/${id}`,

  // Custom actions
  TOGGLE_ACTIVE: (id: string) => `/admin/plans/${id}/toggle-active`,
  TOGGLE_POPULAR: (id: string) => `/admin/plans/${id}/toggle-popular`,
} as const;

// Query param keys for filtering
export const PLANS_QUERY_KEYS = {
  IS_ACTIVE: 'is_active',
  IS_POPULAR: 'is_popular',
  BILLING_CYCLE: 'billing_cycle',
  SEARCH: 'search',
  PAGE: 'page',
  PER_PAGE: 'per_page',
} as const;
