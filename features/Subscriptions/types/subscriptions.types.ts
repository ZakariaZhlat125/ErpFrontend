export type SubscriptionStatus = 'active' | 'inactive' | 'pending' | 'cancelled' | 'expired';
export type BillingCycle = 'monthly' | 'yearly';

export interface Subscription {
  id: string;
  organization_id: string;
  organization_name: string;
  plan_id: string;
  plan_name: string;
  status: SubscriptionStatus;
  billing_cycle: BillingCycle;
  start_date: string;
  end_date: string;
  renewal_date?: string;
  price: number;
  auto_renew: boolean;
  payment_method?: string;
  last_payment_date?: string;
  next_payment_date?: string;
  cancellation_date?: string;
  cancellation_reason?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSubscriptionInput {
  organization_id: string;
  plan_id: string;
  billing_cycle: BillingCycle;
  auto_renew: boolean;
  payment_method?: string;
  start_date?: string;
}

export interface UpdateSubscriptionInput {
  plan_id?: string;
  billing_cycle?: BillingCycle;
  auto_renew?: boolean;
  payment_method?: string;
  start_date?: string;
  end_date?: string;
}

export interface SubscriptionFilters {
  status?: SubscriptionStatus;
  billing_cycle?: BillingCycle;
  plan_id?: string;
  organization_id?: string;
  search?: string;
  start_date_from?: string;
  start_date_to?: string;
  end_date_from?: string;
  end_date_to?: string;
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
