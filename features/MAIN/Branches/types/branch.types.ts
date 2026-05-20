/**
 * Branch entity type matching backend API response
 */
export interface Branch {
  id: number;
  organization_id: number;
  name: string;
  code: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Input type for creating a new branch
 */
export interface CreateBranchInput {
  name: string;
  code: string;
  address?: string;
  phone?: string;
  email?: string;
  is_active?: boolean;
}

/**
 * Input type for updating a branch
 * Explicitly listing all updatable fields (avoiding Partial<>)
 */
export interface UpdateBranchInput {
  name?: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  is_active?: boolean;
}

/**
 * Filters for branch list queries
 */
export interface BranchFilters {
  organization_id?: number;
  search?: string;
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
