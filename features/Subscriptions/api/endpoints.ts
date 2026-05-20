// API Endpoints for Organization Subscriptions feature
// Centralized endpoint definitions for maintainability

export const SUBSCRIPTIONS_ENDPOINTS = {
  // Base path
  BASE: '/subscriptions',

  // CRUD operations
  LIST: '/subscriptions',
  CREATE: '/subscriptions',
  DETAIL: (id: string) => `/subscriptions/${id}`,
  UPDATE: (id: string) => `/subscriptions/${id}`,
  DELETE: (id: string) => `/subscriptions/${id}`,

  // Custom actions
  RENEW: (id: string) => `/subscriptions/${id}/renew`,
  CANCEL: (id: string) => `/subscriptions/${id}/cancel`,
} as const;

// Query param keys for filtering
export const SUBSCRIPTIONS_QUERY_KEYS = {
  STATUS: 'status',
  BILLING_CYCLE: 'billing_cycle',
  PLAN_ID: 'plan_id',
  ORGANIZATION_ID: 'organization_id',
  SEARCH: 'search',
  START_DATE_FROM: 'start_date_from',
  START_DATE_TO: 'start_date_to',
  END_DATE_FROM: 'end_date_from',
  END_DATE_TO: 'end_date_to',
  PAGE: 'page',
  PER_PAGE: 'per_page',
} as const;
