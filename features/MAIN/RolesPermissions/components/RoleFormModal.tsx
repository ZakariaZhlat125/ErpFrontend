'use client';

import { Modal, Button, Input, TextArea } from '@/components/ui';

interface RoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  editingRole: any;
  formData: { name: string; description: string; color: string };
  onFormDataChange: (data: { name: string; description: string; color: string }) => void;
}

export function RoleFormModal({ isOpen, onClose, onSubmit, editingRole, formData, onFormDataChange }: RoleFormModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingRole ? 'Edit Role' : 'Create New Role'}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            {editingRole ? 'Update' : 'Create'}
          </Button>
        </div>
      }
      size="md"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-text">Role Name</label>
          <Input
            value={formData.name}
            onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
            placeholder="e.g., Manager"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-text">Description</label>
          <TextArea
            value={formData.description}
            onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
            placeholder="Describe the role and its responsibilities"
            rows={3}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-text">Color</label>
          <Input
            type="color"
            value={formData.color}
            onChange={(e) => onFormDataChange({ ...formData, color: e.target.value })}
            className="h-10 w-20"
          />
        </div>
      </div>
    </Modal>
  );
}
