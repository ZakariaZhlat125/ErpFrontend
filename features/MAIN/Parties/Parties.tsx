'use client';

import { useState } from 'react';
import { ConfirmModal } from '@/components/ui';
import { ErrorState } from '@/components/ui/ErrorState';
import { PartiesSkeleton } from './components/PartiesSkeleton';
import { PartyCard } from './components/PartyCard';
import { PartiesHeader } from './components/PartiesHeader';
import { SearchFilters } from './components/SearchFilters';
import { PartyFormModal } from './components/PartyFormModal';
import { useParties } from './hooks/useParties';
import { usePartyForm } from './hooks/usePartyForm';
import type { Party } from './types/party.types';
import { useTranslations } from 'next-intl';

interface PartiesProps {
  organizationId: number;
}

export function Parties({ organizationId }: PartiesProps) {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingParty, setEditingParty] = useState<Party | null>(null);
  const t = useTranslations('parties');

  // Business logic hook
  const {
    parties,
    isLoading,
    error,
    deleteModalOpen,
    selectedParty,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteConfirm,
    isDeleting,
  } = useParties({ organizationId });

  // Form logic hook
  const {
    form,
    error: formError,
    success: formSuccess,
    isPending: isFormPending,
    handleSubmit,
    handleReset,
  } = usePartyForm({
    mode: editingParty ? 'edit' : 'create',
    party: editingParty || undefined,
    organizationId,
    onSuccess: () => {
      setFormModalOpen(false);
      setEditingParty(null);
    },
  });

  const handleAddClick = () => {
    setEditingParty(null);
    setFormModalOpen(true);
  };

  const handleEditClick = (party: Party) => {
    setEditingParty(party);
    setFormModalOpen(true);
  };

  const handleFormModalClose = () => {
    setFormModalOpen(false);
    setEditingParty(null);
    handleReset();
  };

  if (isLoading) {
    return <PartiesSkeleton />;
  }

  if (error) {
    return <ErrorState fullScreen />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <PartiesHeader onAdd={handleAddClick} />

        <SearchFilters />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {parties?.map((party) => (
            <PartyCard
              key={party.id}
              party={party}
              onEdit={handleEditClick}
              onDelete={handleOpenDeleteModal}
            />
          ))}
        </div>

        {!parties?.length && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg text-text-secondary">{t('emptyMessage')}</p>
            <p className="mt-2 text-sm text-text-muted">
              {t('createFirstParty')}
            </p>
          </div>
        )}

        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteConfirm}
          type="delete"
          title={t('delete.title')}
          message={`${t('delete.message')} ${selectedParty?.name}?`}
          description={t('delete.description')}
          confirmText={t('delete.confirm')}
          cancelText={t('form.cancel')}
        />

        <PartyFormModal
          isOpen={formModalOpen}
          onClose={handleFormModalClose}
          onSubmit={handleSubmit}
          form={form}
          isEditing={!!editingParty}
          error={formError}
          success={formSuccess}
          isPending={isFormPending}
        />
      </div>
    </div>
  );
}
