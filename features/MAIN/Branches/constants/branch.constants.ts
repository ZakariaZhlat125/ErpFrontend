/**
 * Query key for React Query cache management
 */
export const QUERY_KEY = 'branches';

/**
 * Default form values for branch creation/editing
 */
export const DEFAULT_FORM_VALUES = {
  name: '',
  code: '',
  address: '',
  phone: '',
  email: '',
  is_active: true,
};

/**
 * Branch status enum
 */
export enum BranchStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 15,
} as const;

/**
 * Form field labels
 */
export const FORM_LABELS = {
  name: 'Branch Name',
  code: 'Branch Code',
  address: 'Address',
  phone: 'Phone',
  email: 'Email',
  is_active: 'Status',
} as const;

/**
 * Form field placeholders
 */
export const FORM_PLACEHOLDERS = {
  name: 'e.g., Downtown Office',
  code: 'e.g., BR-001',
  address: 'e.g., 123 Main St, San Francisco, CA 94105',
  phone: 'e.g., +1 (555) 100-1001',
  email: 'e.g., branch@example.com',
} as const;

/**
 * Status options for dropdown
 */
export const STATUS_OPTIONS = [
  { label: 'Active', value: true },
  { label: 'Inactive', value: false },
] as const;
