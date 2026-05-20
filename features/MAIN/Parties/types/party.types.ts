/**
 * Party entity type matching backend API response
 */
export interface Party {
  id: number;
  organization_id: number;
  code: string;
  type: 'individual' | 'company';
  display_name: string;
  legal_name: string | null;
  tax_number: string | null;
  currency_id: number | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * Party role type
 */
export interface PartyRole {
  id: number;
  party_id: number;
  role: 'customer' | 'supplier' | 'agent' | 'contractor';
  created_at: string;
}

/**
 * Input type for creating a new party
 */
export interface CreatePartyInput {
  code: string;
  type: 'individual' | 'company';
  display_name: string;
  legal_name?: string;
  tax_number?: string;
  currency_id?: number;
  notes?: string;
  is_active?: boolean;
  roles?: Array<'customer' | 'supplier' | 'agent' | 'contractor'>;
}

/**
 * Input type for updating a party
 * Explicitly listing all updatable fields (avoiding Partial<>)
 */
export interface UpdatePartyInput {
  code?: string;
  type?: 'individual' | 'company';
  display_name?: string;
  legal_name?: string;
  tax_number?: string;
  currency_id?: number;
  notes?: string;
  is_active?: boolean;
}

/**
 * Filters for party list queries
 */
export interface PartyFilters {
  search?: string;
  type?: 'individual' | 'company';
  role?: 'customer' | 'supplier' | 'agent' | 'contractor';
  is_active?: boolean;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Paginated response type
 */
export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
