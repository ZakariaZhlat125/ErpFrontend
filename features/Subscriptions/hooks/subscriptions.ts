"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionsApi } from '../services/subscriptions.service';
import { 
  Subscription, 
  CreateSubscriptionInput, 
  UpdateSubscriptionInput, 
  SubscriptionFilters, 
  PaginatedResult 
} from '../types/subscriptions.types';
import { QUERY_KEY } from '../constants/subscriptions.constants';

/**
 * Get all subscriptions with optional filters
 */
export const useSubscriptions = (filters?: SubscriptionFilters) => {
  return useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: () => subscriptionsApi.getAll(filters),
  });
};

/**
 * Get a single subscription by ID
 */
export const useSubscription = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => subscriptionsApi.getById(id),
    enabled: !!id,
  });
};

/**
 * Create a new subscription
 */
export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSubscriptionInput) => subscriptionsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

/**
 * Update an existing subscription
 */
export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UpdateSubscriptionInput> }) => 
      subscriptionsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
};

/**
 * Delete a subscription
 */
export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

/**
 * Renew a subscription
 */
export const useRenewSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionsApi.renew(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
};

/**
 * Cancel a subscription
 */
export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => 
      subscriptionsApi.cancel(id, reason),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
};
