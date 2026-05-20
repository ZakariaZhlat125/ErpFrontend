export type BillingCycle = 'monthly' | 'yearly';

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billing_cycle: BillingCycle;
  max_users: number;
  max_branches: number;
  features: string[];
  is_active: boolean;
  is_popular: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePlanInput {
  name: string;
  description: string;
  price: number;
  billing_cycle: BillingCycle;
  max_users: number;
  max_branches: number;
  features: string[];
  is_active: boolean;
  is_popular: boolean;
  sort_order: number;
}

export interface UpdatePlanInput {
  name?: string;
  description?: string;
  price?: number;
  billing_cycle?: BillingCycle;
  max_users?: number;
  max_branches?: number;
  features?: string[];
  is_active?: boolean;
  is_popular?: boolean;
  sort_order?: number;
}

export interface PlanFilters {
  is_active?: boolean;
  is_popular?: boolean;
  billing_cycle?: BillingCycle;
  search?: string;
  page?: number;
  per_page?: number;
}

export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}
