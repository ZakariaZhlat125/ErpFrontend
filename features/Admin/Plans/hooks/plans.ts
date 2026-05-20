"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { plansApi } from '../services/plans.service';
import { Plan, CreatePlanInput, UpdatePlanInput, PlanFilters, PaginatedResult } from '../types/plans.types';
import { QUERY_KEY } from '../constants/plans.constants';

/**
 * Get all plans with optional filters
 */
export const usePlans = (filters?: PlanFilters) => {
  return useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: () => plansApi.getAll(filters),
  });
};

/**
 * Get a single plan by ID
 */
export const usePlan = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => plansApi.getById(id),
    enabled: !!id,
  });
};

/**
 * Create a new plan
 */
export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlanInput) => plansApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

/**
 * Update an existing plan
 */
export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UpdatePlanInput> }) => 
      plansApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
};

/**
 * Delete a plan
 */
export const useDeletePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => plansApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

/**
 * Toggle plan active status
 */
export const useTogglePlanActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) => 
      plansApi.toggleActive(id, is_active),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
};

/**
 * Toggle plan popular status
 */
export const useTogglePlanPopular = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, is_popular }: { id: string; is_popular: boolean }) => 
      plansApi.togglePopular(id, is_popular),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
};
