// API Endpoints for Currencies feature
// Centralized endpoint definitions for maintainability

export const CURRENCY_ENDPOINTS = {
  // Base path
  BASE: '/admin/currencies',

  // CRUD operations
  LIST: '/admin/currencies',
  CREATE: '/admin/currencies',
  DETAIL: (id: number) => `/admin/currencies/${id}`,
  UPDATE: (id: number) => `/admin/currencies/${id}`,
  DELETE: (id: number) => `/admin/currencies/${id}`,

  // Additional actions
  SET_BASE: (id: number) => `/admin/currencies/${id}/set-base`,
  UPDATE_RATE: (id: number) => `/admin/currencies/${id}/update-rate`,
  TOGGLE_ACTIVE: (id: number) => `/admin/currencies/${id}/toggle-active`,

  // Public endpoints
  PUBLIC_LIST: '/currencies',
  PUBLIC_BASE: '/currencies/base',
  CONVERT: '/currencies/convert',
} as const;

// Query param keys for filtering
export const CURRENCY_QUERY_KEYS = {
  SEARCH: 'search',
  IS_ACTIVE: 'is_active',
  IS_BASE: 'is_base',
  PAGE: 'page',
  PER_PAGE: 'per_page',
} as const;
