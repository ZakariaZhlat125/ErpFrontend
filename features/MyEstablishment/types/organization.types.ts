export interface Organization {
  id: number;
  user_id: number;
  name: string;
  slug?: string;
  legal_name: string;
  tax_number: string;
  base_currency_id: number | null;
  timezone: string;
  locale: string;
  status: 'active' | 'inactive' | 'pending';
  address: string;
  phone: string;
  email: string;
  website: string | null;
  logo_path: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateOrganizationInput {
  name: string;
  legal_name: string;
  tax_number: string;
  base_currency_id: number;
  timezone: string;
  locale: string;
  status: 'active' | 'inactive' | 'pending';
  address: string;
  phone: string;
  email: string;
  website?: string;
}

export interface UpdateOrganizationInput {
  name?: string;
  legal_name?: string;
  tax_number?: string;
  base_currency_id?: number;
  timezone?: string;
  locale?: string;
  status?: 'active' | 'inactive' | 'pending';
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface OrganizationFilters {
  status?: 'active' | 'inactive' | 'pending';
  search?: string;
}
