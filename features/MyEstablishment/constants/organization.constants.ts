import { CreateOrganizationInput } from '../types/organization.types';

export const QUERY_KEY = 'organizations';

export const DEFAULT_ORGANIZATION_VALUES: Partial<CreateOrganizationInput> = {
  status: 'active',
  timezone: 'UTC',
  locale: 'en',
  base_currency_id: 1,
  name: '',
  legal_name: '',
  tax_number: '',
  address: '',
  phone: '',
  email: '',
  website: '',
};

export const ORGANIZATION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const;

export const PAGINATION_DEFAULTS = {
  page: 1,
  perPage: 20,
};

export const STALE_TIME = 5 * 60 * 1000;
