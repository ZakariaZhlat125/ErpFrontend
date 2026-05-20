import { Subscription, CreateSubscriptionInput, SubscriptionStatus, BillingCycle } from '../types/subscriptions.types';

export const QUERY_KEY = 'subscriptions';

export const DEFAULT_SUBSCRIPTION: CreateSubscriptionInput = {
  user_id: '',
  plan_id: '',
  billing_cycle: 'monthly',
  auto_renew: true,
  payment_method: '',
  start_date: new Date().toISOString().split('T')[0], // Today's date
  end_date: '', // Will be calculated based on billing cycle
  status: 'pending',
  price_paid: 0,
};

export const SUBSCRIPTION_STATUS_OPTIONS: { value: SubscriptionStatus; label: string; color: string }[] = [
  { value: 'active', label: 'Active', color: '#10b981' },
  { value: 'inactive', label: 'Inactive', color: '#6b7280' },
  { value: 'pending', label: 'Pending', color: '#f59e0b' },
  { value: 'cancelled', label: 'Cancelled', color: '#ef4444' },
  { value: 'expired', label: 'Expired', color: '#8b5cf6' },
] as const;

export const BILLING_CYCLE_OPTIONS: { value: BillingCycle; label: string }[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
] as const;

export const PAYMENT_METHOD_OPTIONS = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cash', label: 'Cash' },
] as const;

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    user_id: 'user1',
    user_name: 'John Doe',
    user_email: 'john@example.com',
    plan_id: '1',
    plan_name: 'Starter Plan',
    status: 'active',
    billing_cycle: 'monthly',
    start_date: '2024-01-15',
    end_date: '2024-02-15',
    renewal_date: '2024-02-15',
    price: 29.99,
    auto_renew: true,
    payment_method: 'credit_card',
    last_payment_date: '2024-01-15',
    next_payment_date: '2024-02-15',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    user_id: 'user2',
    user_name: 'Jane Smith',
    user_email: 'jane@example.com',
    plan_id: '2',
    plan_name: 'Professional Plan',
    status: 'active',
    billing_cycle: 'yearly',
    start_date: '2023-12-01',
    end_date: '2024-12-01',
    renewal_date: '2024-12-01',
    price: 79.99,
    auto_renew: true,
    payment_method: 'paypal',
    last_payment_date: '2023-12-01',
    next_payment_date: '2024-12-01',
    created_at: '2023-12-01T10:00:00Z',
  },
  {
    id: '3',
    user_id: 'user3',
    user_name: 'Bob Johnson',
    user_email: 'bob@example.com',
    plan_id: '1',
    plan_name: 'Starter Plan',
    status: 'cancelled',
    billing_cycle: 'monthly',
    start_date: '2024-01-01',
    end_date: '2024-01-20',
    price: 29.99,
    auto_renew: false,
    payment_method: 'credit_card',
    last_payment_date: '2024-01-01',
    cancellation_date: '2024-01-10',
    cancellation_reason: 'Switched to different service',
    created_at: '2024-01-01T10:00:00Z',
  },
  {
    id: '4',
    user_id: 'user4',
    user_name: 'Alice Brown',
    user_email: 'alice@example.com',
    plan_id: '3',
    plan_name: 'Business Plan',
    status: 'expired',
    billing_cycle: 'yearly',
    start_date: '2023-05-15',
    end_date: '2024-05-15',
    price: 149.99,
    auto_renew: false,
    payment_method: 'bank_transfer',
    last_payment_date: '2023-05-15',
    created_at: '2023-05-15T10:00:00Z',
  },
  {
    id: '5',
    user_id: 'user5',
    user_name: 'Charlie Wilson',
    user_email: 'charlie@example.com',
    plan_id: '2',
    plan_name: 'Professional Plan',
    status: 'pending',
    billing_cycle: 'monthly',
    start_date: '2024-02-01',
    end_date: '2024-03-01',
    price: 79.99,
    auto_renew: true,
    payment_method: 'credit_card',
    created_at: '2024-02-01T10:00:00Z',
  },
];
