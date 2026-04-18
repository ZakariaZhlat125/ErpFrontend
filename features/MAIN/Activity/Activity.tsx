'use client';

import { useState } from 'react';
import { ConfirmModal, ConfirmModalType } from '@/components/ui';
import { Button } from '@/components/ui';

export function Activity() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ConfirmModalType>('info');

  const openModal = (type: ConfirmModalType) => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    console.log(`${modalType} action confirmed`);
    // Handle the action here (delete, save, etc.)
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[var(--text)]">Activity</h1>
        <p className="mt-2 text-base text-[var(--text-secondary)]">
          Activity log and tracking page
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Button variant="danger" onClick={() => openModal('delete')}>
            Delete Confirmation
          </Button>
          <Button variant="warning" onClick={() => openModal('warning')}>
            Update Warning
          </Button>
          <Button variant="primary" onClick={() => openModal('success')}>
            Save Success
          </Button>
          <Button variant="secondary" onClick={() => openModal('error')}>
            Error Message
          </Button>
          <Button variant="ghost" onClick={() => openModal('info')}>
            Information
          </Button>
        </div>

        <ConfirmModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirm}
          type={modalType}
          title={
            modalType === 'delete' ? 'Delete Activity' :
            modalType === 'warning' ? 'Update Activity' :
            modalType === 'success' ? 'Save Successful' :
            modalType === 'error' ? 'Error Occurred' : undefined
          }
          message={
            modalType === 'delete' ? 'Are you sure you want to delete this activity log?' :
            modalType === 'warning' ? 'This will update the activity. Are you sure you want to proceed?' :
            modalType === 'success' ? 'Activity has been saved successfully.' :
            modalType === 'error' ? 'Failed to save activity. Please try again.' : undefined
          }
          description={
            modalType === 'delete' ? 'This action cannot be undone.' : undefined
          }
          confirmText={
            modalType === 'delete' ? 'Delete' :
            modalType === 'warning' ? 'Update' :
            modalType === 'success' ? 'OK' :
            modalType === 'error' ? 'Retry' : undefined
          }
          cancelText={
            modalType === 'success' || modalType === 'error' ? undefined : 'Cancel'
          }
          showCancel={modalType !== 'success' && modalType !== 'error'}
        />
      </div>
    </div>
  );
}
