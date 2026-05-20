import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partyApi } from '../services/party.service';
import { QUERY_KEY } from '../constants/party.constants';
import type { Party, CreatePartyInput, UpdatePartyInput, PartyFilters } from '../types/party.types';

/**
 * Hook to fetch a single party by ID
 */
export function useParty(organizationId: number, partyId: number) {
  return useQuery({
    queryKey: [QUERY_KEY, organizationId, partyId],
    queryFn: () => partyApi.getById(organizationId, partyId),
    enabled: !!partyId && !!organizationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch all parties for an organization
 */
export function useParties(organizationId: number, filters?: PartyFilters) {
  return useQuery({
    queryKey: [QUERY_KEY, organizationId, filters],
    queryFn: () => partyApi.getAll(organizationId, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to search parties
 */
export function usePartySearch(organizationId: number, query: string) {
  return useQuery({
    queryKey: [QUERY_KEY, organizationId, 'search', query],
    queryFn: () => partyApi.search(organizationId, query),
    enabled: query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to get party statistics
 */
export function usePartyStatistics(organizationId: number) {
  return useQuery({
    queryKey: [QUERY_KEY, organizationId, 'statistics'],
    queryFn: () => partyApi.getStatistics(organizationId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to create a new party
 */
export function useCreateParty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ organizationId, data }: { organizationId: number; data: CreatePartyInput }) =>
      partyApi.create(organizationId, data),
    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId],
      });
    },
  });
}

/**
 * Hook to update a party
 */
export function useUpdateParty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      partyId,
      data,
    }: {
      organizationId: number;
      partyId: number;
      data: UpdatePartyInput;
    }) => partyApi.update(organizationId, partyId, data),
    onSuccess: (_, { organizationId, partyId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId, partyId],
      });
    },
  });
}

/**
 * Hook to delete a party
 */
export function useDeleteParty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ organizationId, partyId }: { organizationId: number; partyId: number }) =>
      partyApi.delete(organizationId, partyId),
    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId],
      });
    },
  });
}

/**
 * Hook to toggle party status
 */
export function useTogglePartyStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ organizationId, partyId }: { organizationId: number; partyId: number }) =>
      partyApi.toggleStatus(organizationId, partyId),
    onSuccess: (_, { organizationId, partyId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, organizationId, partyId],
      });
    },
  });
}

export { QUERY_KEY };
