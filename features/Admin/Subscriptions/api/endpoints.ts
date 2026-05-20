// API Endpoints for Subscriptions feature
// Centralized endpoint definitions for maintainability

export const SUBSCRIPTIONS_ENDPOINTS = {
  // Base path
  BASE: '/admin/subscriptions',

  // CRUD operations
  LIST: '/admin/subscriptions',
  CREATE: '/admin/subscriptions',
  DETAIL: (id: string) => `/admin/subscriptions/${id}`,
  UPDATE: (id: string) => `/admin/subscriptions/${id}`,
  DELETE: (id: string) => `/admin/subscriptions/${id}`,

  // Custom actions
  SUBSCRIBE_USER: '/admin/subscriptions/subscribe-user',
  CHANGE_STATUS: (id: string) => `/admin/subscriptions/${id}/change-status`,
  RENEW: (id: string) => `/admin/subscriptions/${id}/renew`,
  CANCEL: (id: string) => `/admin/subscriptions/${id}/cancel`,
} as const;

// Query param keys for filtering
export const SUBSCRIPTIONS_QUERY_KEYS = {
  STATUS: 'status',
  BILLING_CYCLE: 'billing_cycle',
  PLAN_ID: 'plan_id',
  USER_ID: 'user_id',
  SEARCH: 'search',
  START_DATE_FROM: 'start_date_from',
  START_DATE_TO: 'start_date_to',
  END_DATE_FROM: 'end_date_from',
  END_DATE_TO: 'end_date_to',
  PAGE: 'page',
  PER_PAGE: 'per_page',
} as const;
