import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { branchApi } from '../services/branch.service';
import { QUERY_KEY } from '../constants/branch.constants';
import type { Branch, CreateBranchInput, UpdateBranchInput, BranchFilters } from '../types/branch.types';

/**
 * Hook to fetch a single branch by ID
 */
export function useBranch(organizationId: number, branchId: number) {
  return useQuery({
    queryKey: [QUERY_KEY, organizationId, branchId],
    queryFn: () => branchApi.getById(organizationId, branchId),
    enabled: !!organizationId && !!branchId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch all branches for an organization
 */
export function useBranches(organizationId: number, filters?: BranchFilters) {
  return useQuery({
    queryKey: [QUERY_KEY, organizationId, filters],
    queryFn: () => branchApi.getAll(organizationId, filters),
    enabled: !!organizationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to create a new branch
 */
export function useCreateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ organizationId, data }: { organizationId: number; data: CreateBranchInput }) =>
      branchApi.create(organizationId, data),
    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId],
      });
    },
  });
}

/**
 * Hook to update a branch
 */
export function useUpdateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      branchId,
      data,
    }: {
      organizationId: number;
      branchId: number;
      data: UpdateBranchInput;
    }) => branchApi.update(organizationId, branchId, data),
    onSuccess: (_, { organizationId, branchId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId, branchId],
      });
    },
  });
}

/**
 * Hook to delete a branch
 */
export function useDeleteBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ organizationId, branchId }: { organizationId: number; branchId: number }) =>
      branchApi.delete(organizationId, branchId),
    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId],
      });
    },
  });
}

/**
 * Hook to toggle branch status
 */
export function useToggleBranchStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ organizationId, branchId }: { organizationId: number; branchId: number }) =>
      branchApi.toggleStatus(organizationId, branchId),
    onSuccess: (_, { organizationId, branchId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId, branchId],
      });
    },
  });
}

export { QUERY_KEY };
