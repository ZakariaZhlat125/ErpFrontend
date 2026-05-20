import { useState, useCallback } from 'react';
import { useBranches as useBranchesData, useDeleteBranch } from './branches';
import type { Branch, BranchFilters } from '../types/branch.types';

interface UseBranchesProps {
  organizationId: number;
  filters?: BranchFilters;
}

interface UseBranchesReturn {
  // Data
  branches: Branch[] | undefined;
  isLoading: boolean;
  error: unknown;

  // State
  deleteModalOpen: boolean;
  selectedBranch: { id: number; name: string } | null;

  // Handlers
  handleOpenDeleteModal: (branch: { id: number; name: string }) => void;
  handleCloseDeleteModal: () => void;
  handleDeleteConfirm: () => void;

  // Mutation states
  isDeleting: boolean;
}

/**
 * Business logic hook for Branches feature
 * Manages local state and provides memoized event handlers
 */
export function useBranchesFeature({ organizationId, filters }: UseBranchesProps): UseBranchesReturn {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<{ id: number; name: string } | null>(null);

  // Data fetching
  const { data: branches, isLoading, error } = useBranchesData(organizationId, filters);

  // Delete mutation
  const deleteMutation = useDeleteBranch();

  // Handlers
  const handleOpenDeleteModal = useCallback((branch: { id: number; name: string }) => {
    setSelectedBranch(branch);
    setDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setSelectedBranch(null);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedBranch) {
      deleteMutation.mutate(
        { organizationId, branchId: selectedBranch.id },
        {
          onSuccess: () => {
            handleCloseDeleteModal();
          },
        }
      );
    }
  }, [selectedBranch, organizationId, deleteMutation, handleCloseDeleteModal]);

  return {
    // Data
    branches,
    isLoading,
    error,

    // State
    deleteModalOpen,
    selectedBranch,

    // Handlers
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteConfirm,

    // Mutation states
    isDeleting: deleteMutation.isPending,
  };
}
