// API Endpoints for Parties feature
// Centralized endpoint definitions for maintainability

export const PARTY_ENDPOINTS = {
  // Base paths (nested under organization)
  BASE: (organizationId: number | string) => `/organizations/${organizationId}/parties`,

  // CRUD operations
  LIST: (organizationId: number | string) => `/organizations/${organizationId}/parties`,
  CREATE: (organizationId: number | string) => `/organizations/${organizationId}/parties`,
  DETAIL: (organizationId: number | string, partyId: number | string) => `/organizations/${organizationId}/parties/${partyId}`,
  UPDATE: (organizationId: number | string, partyId: number | string) => `/organizations/${organizationId}/parties/${partyId}`,
  DELETE: (organizationId: number | string, partyId: number | string) => `/organizations/${organizationId}/parties/${partyId}`,

  // Custom actions
  TOGGLE_STATUS: (organizationId: number | string, partyId: number | string) => `/organizations/${organizationId}/parties/${partyId}/toggle-status`,
  SEARCH: (organizationId: number | string) => `/organizations/${organizationId}/parties/search`,
  STATISTICS: (organizationId: number | string) => `/organizations/${organizationId}/parties/statistics`,
} as const;

// Query param keys for filtering
export const PARTY_QUERY_KEYS = {
  TYPE: 'type',
  STATUS: 'status',
  SEARCH: 'search',
  PAGE: 'page',
  PER_PAGE: 'per_page',
} as const;
