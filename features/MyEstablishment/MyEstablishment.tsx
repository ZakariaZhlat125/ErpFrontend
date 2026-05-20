'use client';

import React, { useEffect } from 'react';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { useTheme } from '@/lib/theme/use-theme';
import { useTranslations } from 'next-intl';
import { CreateOrganizationForm } from './components/CreateForm/CreateOrganizationForm';
import { EditOrganizationForm } from './components/EditForm/EditOrganizationForm';
import { useMyEstablishment } from './hooks/useMyEstablishment';
import { OrganizationSkeleton } from './components/Skeletons/OrganizationSkeleton';
import { QuickAccessCard } from './components/QuickAccess/QuickAccessCard';
import { ErrorState } from '@/components/ui/ErrorState';
import { HeaderSection } from './components/Cards/HeaderSection';
import { StatsSection } from './components/Cards/StatsSection';
import { EstablishmentCard } from './components/Cards/EstablishmentCard';
import { AddNewCard } from './components/Cards/AddNewCard';

export function MyEstablishment() {
  const { tokens } = useTheme();
  const t = useTranslations('my-establishment');
  
  const {
    organizations,
    isLoading,
    error,
    selectedOrganization,
    deleteConfirm,
    isCreateModalOpen,
    isEditModalOpen,
    handleSelectEstablishment,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleCloseEditModal,
    handleEdit,
    handleDelete,
    handleCancelDelete,
    handleQuickAccess,
    refetch,
    isDeleting,
  } = useMyEstablishment();

  // Keyboard navigation: Escape to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isCreateModalOpen) {
          handleCloseCreateModal();
        } else if (isEditModalOpen) {
          handleCloseEditModal();
        } else if (deleteConfirm) {
          handleCancelDelete(e as unknown as React.MouseEvent);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCreateModalOpen, isEditModalOpen, deleteConfirm, handleCloseCreateModal, handleCloseEditModal, handleCancelDelete]);

  if (isLoading) {
    return <OrganizationSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title={t('error.title') || 'Failed to Load Organizations'}
        message={t('error.message') || 'Unable to load your organizations. Please check your connection and try again.'}
        onRetry={() => refetch()}
        fullScreen
      />
    );
  }

  const establishments = organizations || [];

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <HeaderSection tokens={tokens} onAddNew={handleOpenCreateModal} />

        {/* Stats */}
        <StatsSection
          totalEstablishments={establishments.length}
          totalEmployees={establishments.length}
          activeEstablishments={establishments.filter(e => e.status === 'active').length}
          tokens={tokens}
        />

        {/* Establishments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {establishments.map((establishment) => (
            <EstablishmentCard
              key={establishment.id}
              establishment={establishment}
              tokens={tokens}
              onSelect={handleSelectEstablishment}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}

          {/* Add New Establishment Card */}
          <AddNewCard tokens={tokens} onClick={handleOpenCreateModal} />
        </div>

        {/* Quick Access */}
        <QuickAccessCard onQuickAccess={handleQuickAccess} />
      </div>

      {/* Create Organization Modal */}
      <CreateOrganizationForm
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />

      {/* Edit Organization Modal */}
      <EditOrganizationForm
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        organization={selectedOrganization}
        onSuccess={handleCloseEditModal}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm !== null}
        onClose={() => handleCancelDelete({ stopPropagation: () => {} } as React.MouseEvent)}
        onConfirm={() => deleteConfirm && handleDelete({ stopPropagation: () => {} } as React.MouseEvent, deleteConfirm)}
        type="delete"
        title={t('delete.title') || 'Delete Organization'}
        message={`${t('delete.message') || 'Are you sure you want to delete'} ${establishments.find(e => e.id === deleteConfirm)?.name || 'this organization'}?`}
        description={t('delete.description') || 'This action cannot be undone.'}
        confirmText={t('delete.confirm') || 'Delete'}
        cancelText={t('delete.cancel') || 'Cancel'}
      />
    </div>
  );
}
