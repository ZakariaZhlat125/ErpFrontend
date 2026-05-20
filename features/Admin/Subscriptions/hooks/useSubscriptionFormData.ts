"use client";

import { useQuery } from '@tanstack/react-query';
import { 
  fetchUsersForSelect, 
  fetchPlansForSelect, 
  mapUsersToOptions, 
  mapPlansToOptions,
  getUsersErrorOption,
  getPlansErrorOption,
  SelectOption
} from '../api';
import { QUERY_KEY } from '../constants/subscriptions.constants';
import type { User, Plan } from '@/features/Admin/api';

interface UseSubscriptionFormDataReturn {
  userOptions: SelectOption[];
  planOptions: SelectOption[];
  users: User[] | undefined;
  plans: Plan[] | undefined;
  isLoadingUsers: boolean;
  isLoadingPlans: boolean;
  usersError: Error | null;
  plansError: Error | null;
}

/**
 * Hook to fetch form data (users and plans) for subscription forms
 * Uses the API layer for decoupled data fetching
 */
export function useSubscriptionFormData(): UseSubscriptionFormDataReturn {
  const { 
    data: users, 
    isLoading: isLoadingUsers, 
    error: usersError 
  } = useQuery({
    queryKey: [QUERY_KEY, 'form-users'],
    queryFn: fetchUsersForSelect,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { 
    data: plans, 
    isLoading: isLoadingPlans, 
    error: plansError 
  } = useQuery({
    queryKey: [QUERY_KEY, 'form-plans'],
    queryFn: fetchPlansForSelect,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const userOptions = usersError 
    ? getUsersErrorOption()
    : users ? mapUsersToOptions(users) : [];

  const planOptions = plansError
    ? getPlansErrorOption()
    : plans ? mapPlansToOptions(plans) : [];

  return {
    userOptions,
    planOptions,
    users,
    plans,
    isLoadingUsers,
    isLoadingPlans,
    usersError,
    plansError,
  };
}
