// API layer for external data fetching
// This file imports from the global Admin API layer (@/features/Admin/api)
// instead of directly from other features' internal folders

import { 
  usersApi, 
  plansApi,
  type User,
  type Plan 
} from '@/features/Admin/api';

// Export endpoints for centralized management
export { SUBSCRIPTIONS_ENDPOINTS, SUBSCRIPTIONS_QUERY_KEYS } from './endpoints';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormDataApiResult {
  users: User[];
  plans: Plan[];
}

/**
 * Fetch users for form selection
 * Returns raw user data from the API
 */
export async function fetchUsersForSelect(): Promise<User[]> {
  const response = await usersApi.getAll({ per_page: 100 });
  return response.data;
}

/**
 * Fetch plans for form selection
 * Returns raw plan data from the API
 */
export async function fetchPlansForSelect(): Promise<Plan[]> {
  const response = await plansApi.getAll({ per_page: 100 });
  return response.data;
}

/**
 * Convert users to select options format
 */
export function mapUsersToOptions(users: User[]): SelectOption[] {
  return users.map((user) => ({
    value: String(user.id),
    label: `${user.name} (${user.email})`,
  }));
}

/**
 * Convert plans to select options format
 */
export function mapPlansToOptions(plans: Plan[]): SelectOption[] {
  return plans.map((plan) => ({
    value: String(plan.id),
    label: `${plan.name} - $${plan.price}/${plan.billing_cycle}`,
  }));
}

/**
 * Get error option for users
 */
export function getUsersErrorOption(): SelectOption[] {
  return [{ value: '', label: 'Error loading users', disabled: true }];
}

/**
 * Get error option for plans
 */
export function getPlansErrorOption(): SelectOption[] {
  return [{ value: '', label: 'Error loading plans', disabled: true }];
}

// Re-export the service APIs for direct use if needed
export { usersApi, plansApi };
