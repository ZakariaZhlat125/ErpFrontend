/**
 * Query key for React Query cache management
 */
export const QUERY_KEY = 'parties';

/**
 * Default form values for party creation/editing
 */
export const DEFAULT_FORM_VALUES = {
  code: '',
  type: 'individual' as const,
  display_name: '',
  legal_name: '',
  tax_number: '',
  currency_id: null as number | null,
  notes: '',
  is_active: true,
  roles: [] as Array<'customer' | 'supplier' | 'agent' | 'contractor'>,
};

/**
 * Party type enum
 */
export enum PartyType {
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
}

/**
 * Party role enum
 */
export enum PartyRole {
  CUSTOMER = 'customer',
  SUPPLIER = 'supplier',
  AGENT = 'agent',
  CONTRACTOR = 'contractor',
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
  code: 'Party Code',
  type: 'Party Type',
  display_name: 'Display Name',
  legal_name: 'Legal Name',
  tax_number: 'Tax Number',
  currency_id: 'Currency',
  notes: 'Notes',
  is_active: 'Status',
  roles: 'Roles',
} as const;

/**
 * Form field placeholders
 */
export const FORM_PLACEHOLDERS = {
  code: 'e.g., CUST-001',
  display_name: 'e.g., John Doe',
  legal_name: 'e.g., John Doe LLC',
  tax_number: 'e.g., 123456789',
  notes: 'Additional notes...',
} as const;

/**
 * Party type options for dropdown
 */
export const PARTY_TYPE_OPTIONS = [
  { label: 'Individual', value: 'individual' },
  { label: 'Company', value: 'company' },
] as const;

/**
 * Party role options for multi-select
 */
export const PARTY_ROLE_OPTIONS = [
  { label: 'Customer', value: 'customer' },
  { label: 'Supplier', value: 'supplier' },
  { label: 'Agent', value: 'agent' },
  { label: 'Contractor', value: 'contractor' },
] as const;
