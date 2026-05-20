import { useState, useCallback } from 'react';
import { useParties as usePartiesData, useDeleteParty } from './parties';
import type { Party, PartyFilters } from '../types/party.types';

interface UsePartiesProps {
  organizationId: number;
  filters?: PartyFilters;
}

interface UsePartiesReturn {
  // Data
  parties: Party[] | undefined;
  isLoading: boolean;
  error: unknown;

  // State
  deleteModalOpen: boolean;
  selectedParty: { id: number; name: string } | null;

  // Handlers
  handleOpenDeleteModal: (party: { id: number; name: string }) => void;
  handleCloseDeleteModal: () => void;
  handleDeleteConfirm: () => void;

  // Mutation states
  isDeleting: boolean;
}

/**
 * Business logic hook for Parties feature
 * Manages local state and provides memoized event handlers
 */
export function useParties({ organizationId, filters }: UsePartiesProps): UsePartiesReturn {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState<{ id: number; name: string } | null>(null);

  // Data fetching
  const { data: parties, isLoading, error } = usePartiesData(organizationId, filters);

  // Delete mutation
  const deleteMutation = useDeleteParty();

  // Handlers
  const handleOpenDeleteModal = useCallback((party: { id: number; name: string }) => {
    setSelectedParty(party);
    setDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setSelectedParty(null);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedParty) {
      deleteMutation.mutate(
        { organizationId, partyId: selectedParty.id },
        {
          onSuccess: () => {
            handleCloseDeleteModal();
          },
        }
      );
    }
  }, [selectedParty, deleteMutation, handleCloseDeleteModal, organizationId]);

  return {
    // Data
    parties,
    isLoading,
    error,

    // State
    deleteModalOpen,
    selectedParty,

    // Handlers
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteConfirm,

    // Mutation states
    isDeleting: deleteMutation.isPending,
  };
}
