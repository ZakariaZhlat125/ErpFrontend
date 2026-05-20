// Global Admin API layer
// Centralized exports for all Admin feature services and types
// Features should import from here instead of directly from other features

// Users API
export { usersApi } from '@/features/Admin/Users/services/users.service';
export type { 
  User, 
  UserRole, 
  UserStatus,
  CreateUserInput, 
  UpdateUserInput,
  UserFilters 
} from '@/features/Admin/Users/types/users.types';

// Plans API
export { plansApi } from '@/features/Admin/Plans/services/plans.service';
export type { 
  Plan, 
  BillingCycle,
  CreatePlanInput, 
  UpdatePlanInput,
  PlanFilters 
} from '@/features/Admin/Plans/types/plans.types';

// Subscriptions API (internal)
export { subscriptionsApi } from '@/features/Admin/Subscriptions/services/subscriptions.service';
export type { 
  Subscription,
  SubscriptionStatus,
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  SubscribeUserInput,
  SubscriptionFilters 
} from '@/features/Admin/Subscriptions/types/subscriptions.types';
