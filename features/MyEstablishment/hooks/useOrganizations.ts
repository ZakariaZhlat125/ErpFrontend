import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import organizationApi from '../services/organization.service';
import { Organization, CreateOrganizationInput, UpdateOrganizationInput, OrganizationFilters } from '../types/organization.types';
import { QUERY_KEY, STALE_TIME } from '../constants/organization.constants';

export function useOrganizations(filters?: OrganizationFilters) {
  return useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: () => organizationApi.getAll(filters),
    staleTime: STALE_TIME,
  });
}

export function useOrganization(id: number) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => organizationApi.getById(id),
    enabled: !!id,
    staleTime: STALE_TIME,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrganizationInput) => organizationApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrganizationInput }) =>
      organizationApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => organizationApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function usePatchOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<UpdateOrganizationInput> }) =>
      organizationApi.patch(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
}
