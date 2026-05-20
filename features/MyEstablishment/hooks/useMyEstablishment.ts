import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useOrganizations, useDeleteOrganization } from './useOrganizations';
import { Organization } from '../types/organization.types';
import { generateSlug } from '@/lib/utils/slug';

export function useMyEstablishment() {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const { data: organizations, isLoading, error, refetch } = useOrganizations();
  const deleteOrganization = useDeleteOrganization();

  const handleSelectEstablishment = useCallback((organization: Organization) => {
    const slug = organization.slug || generateSlug(organization.name, organization.id);
    router.push(`/${slug}/dashboard`);
  }, [router]);

  const handleOpenCreateModal = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  const handleOpenEditModal = useCallback((organization: Organization) => {
    setSelectedOrganization(organization);
    setIsEditModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedOrganization(null);
  }, []);

  const handleEdit = useCallback((e: React.MouseEvent, organization: Organization) => {
    e.stopPropagation();
    handleOpenEditModal(organization);
  }, [handleOpenEditModal]);

  const handleDelete = useCallback(async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (deleteConfirm === id) {
      try {
        await deleteOrganization.mutateAsync(id);
        setDeleteConfirm(null);
      } catch (err) {
        console.error('Error deleting organization:', err);
      }
    } else {
      setDeleteConfirm(id);
    }
  }, [deleteConfirm, deleteOrganization]);

  const handleCancelDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirm(null);
  }, []);

  const handleQuickAccess = useCallback((path: string) => {
    if (organizations && organizations.length > 0) {
      const org = organizations[0];
      const slug = org.slug || generateSlug(org.name, org.id);
      router.push(`/${slug}${path}`);
    }
  }, [organizations, router]);

  return {
    // Data
    organizations: organizations || [],
    isLoading,
    error,
    selectedOrganization,
    deleteConfirm,
    
    // Modal states
    isCreateModalOpen,
    isEditModalOpen,
    
    // Actions
    handleSelectEstablishment,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleEdit,
    handleDelete,
    handleCancelDelete,
    handleQuickAccess,
    refetch,
    
    // Mutation states
    isDeleting: deleteOrganization.isPending,
  };
}
