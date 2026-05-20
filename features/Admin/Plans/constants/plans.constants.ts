import { Plan, CreatePlanInput } from '../types/plans.types';

export const QUERY_KEY = 'plans';

export const DEFAULT_PLAN: CreatePlanInput = {
  name: '',
  description: '',
  price: 0,
  billing_cycle: 'monthly',
  max_users: 10,
  max_branches: 1,
  features: [],
  is_active: true,
  is_popular: false,
  sort_order: 0,
};

export const BILLING_CYCLE_OPTIONS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
] as const;

export const COMMON_FEATURES = [
  'Basic Storage',
  'Email Support',
  'Standard Reports',
  'Advanced Storage',
  'Priority Support',
  'Custom Reports',
  'API Access',
  'Unlimited Storage',
  '24/7 Support',
  'Advanced Integrations',
  'Multi-Tenant Access',
  'Custom Branding',
] as const;

export const MOCK_PLANS: Plan[] = [
  { 
    id: '1', 
    name: 'Starter Plan',
    description: 'Perfect for small teams getting started',
    price: 29.99,
    billing_cycle: 'monthly',
    max_users: 10,
    max_branches: 2,
    features: ['Basic Storage', 'Email Support', 'Standard Reports'],
    is_active: true,
    is_popular: false,
    sort_order: 1,
  },
  { 
    id: '2', 
    name: 'Professional Plan',
    description: 'For growing businesses with more needs',
    price: 79.99,
    billing_cycle: 'monthly',
    max_users: 50,
    max_branches: 10,
    features: ['Advanced Storage', 'Priority Support', 'Custom Reports', 'API Access'],
    is_active: true,
    is_popular: true,
    sort_order: 2,
  },
  { 
    id: '3', 
    name: 'Business Plan',
    description: 'Comprehensive solution for larger teams',
    price: 149.99,
    billing_cycle: 'yearly',
    max_users: 200,
    max_branches: 25,
    features: ['Unlimited Storage', '24/7 Support', 'Advanced Integrations', 'Multi-Tenant Access', 'Custom Branding'],
    is_active: true,
    is_popular: false,
    sort_order: 3,
  },
  { 
    id: '4', 
    name: 'Enterprise Plan',
    description: 'Unlimited scalability for enterprises',
    price: 199.99,
    billing_cycle: 'yearly',
    max_users: 500,
    max_branches: 50,
    features: ['Unlimited Storage', '24/7 Support', 'Custom Integrations', 'Multi-Tenant Access'],
    is_active: true,
    is_popular: false,
    sort_order: 4,
  },
];
