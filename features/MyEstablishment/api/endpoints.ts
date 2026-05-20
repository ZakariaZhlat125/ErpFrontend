// API Endpoints for MyEstablishment (Organization) feature
// Centralized endpoint definitions for maintainability

export const ORGANIZATION_ENDPOINTS = {
  // Base path
  BASE: '/organizations',

  // CRUD operations
  LIST: '/organizations',
  CREATE: '/organizations',
  DETAIL: (id: number | string) => `/organizations/${id}`,
  UPDATE: (id: number | string) => `/organizations/${id}`,
  DELETE: (id: number | string) => `/organizations/${id}`,
  PATCH: (id: number | string) => `/organizations/${id}`,
} as const;

// Query param keys for filtering
export const ORGANIZATION_QUERY_KEYS = {
  STATUS: 'status',
  SEARCH: 'search',
  PAGE: 'page',
  PER_PAGE: 'per_page',
} as const;
