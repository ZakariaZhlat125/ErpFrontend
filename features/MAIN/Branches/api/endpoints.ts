// API Endpoints for Branches feature
// Centralized endpoint definitions for maintainability

export const BRANCH_ENDPOINTS = {
  // Base paths (nested under organization)
  BASE: (organizationId: number | string) => `/organizations/${organizationId}/branches`,

  // CRUD operations
  LIST: (organizationId: number | string) => `/organizations/${organizationId}/branches`,
  CREATE: (organizationId: number | string) => `/organizations/${organizationId}/branches`,
  DETAIL: (organizationId: number | string, branchId: number | string) => `/organizations/${organizationId}/branches/${branchId}`,
  UPDATE: (organizationId: number | string, branchId: number | string) => `/organizations/${organizationId}/branches/${branchId}`,
  DELETE: (organizationId: number | string, branchId: number | string) => `/organizations/${organizationId}/branches/${branchId}`,

  // Custom actions
  TOGGLE_STATUS: (organizationId: number | string, branchId: number | string) => `/organizations/${organizationId}/branches/${branchId}/toggle-status`,
} as const;

// Query param keys for filtering
export const BRANCH_QUERY_KEYS = {
  STATUS: 'status',
  SEARCH: 'search',
  PAGE: 'page',
  PER_PAGE: 'per_page',
} as const;
