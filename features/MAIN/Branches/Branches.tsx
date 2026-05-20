'use client';

import { useState } from 'react';
import { ConfirmModal } from '@/components/ui';
import { BranchCard } from './components/BranchCard';
import { BranchesHeader } from './components/BranchesHeader';
import { SearchFilters } from './components/SearchFilters';
import { BranchFormModal } from './components/BranchFormModal';
import { useBranchesFeature } from './hooks/useBranches';
import { useBranchForm } from './hooks/useBranchForm';
import type { Branch } from './types/branch.types';
import { useTranslations } from 'next-intl';

// TODO: Get organization ID from context or route params
const ORGANIZATION_ID = 1;

export function Branches() {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const t = useTranslations('branches');

  // Business logic hook
  const {
    branches,
    isLoading,
    error,
    deleteModalOpen,
    selectedBranch,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteConfirm,
    isDeleting,
  } = useBranchesFeature({ organizationId: ORGANIZATION_ID });

  // Form logic hook
  const {
    form,
    error: formError,
    success: formSuccess,
    isPending: isFormPending,
    handleSubmit,
    handleReset,
  } = useBranchForm({
    mode: editingBranch ? 'edit' : 'create',
    organizationId: ORGANIZATION_ID,
    branch: editingBranch || undefined,
    onSuccess: () => {
      setFormModalOpen(false);
      setEditingBranch(null);
    },
  });

  const handleAddClick = () => {
    setEditingBranch(null);
    setFormModalOpen(true);
  };

  const handleEditClick = (branch: Branch) => {
    setEditingBranch(branch);
    setFormModalOpen(true);
  };

  const handleFormModalClose = () => {
    setFormModalOpen(false);
    setEditingBranch(null);
    handleReset();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <div className="h-10 w-48 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-96 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-red-50 p-4 text-red-700">
            {t('error.loading')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <BranchesHeader onAdd={handleAddClick} />

        <SearchFilters />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {branches?.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              onEdit={handleEditClick}
              onDelete={handleOpenDeleteModal}
            />
          ))}
        </div>

        {!branches?.length && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg text-text-secondary">{t('emptyMessage')}</p>
            <p className="mt-2 text-sm text-text-muted">
              {t('createFirstBranch')}
            </p>
          </div>
        )}

        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteConfirm}
          type="delete"
          title={t('delete.title')}
          message={`${t('delete.message')} ${selectedBranch?.name}?`}
          description={t('delete.description')}
          confirmText={t('delete.confirm')}
          cancelText={t('form.cancel')}
        />

        <BranchFormModal
          isOpen={formModalOpen}
          onClose={handleFormModalClose}
          onSubmit={handleSubmit}
          form={form}
          isEditing={!!editingBranch}
          error={formError}
          success={formSuccess}
          isPending={isFormPending}
        />
      </div>
    </div>
  );
}