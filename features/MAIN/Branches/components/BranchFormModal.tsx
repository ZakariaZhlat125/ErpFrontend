import { Button, Modal } from '@/components/ui';
import { FormContainer } from '@/components/forms/FormContainer';
import { RHFInput } from '@/components/forms/RHFInput';
import { RHFSelect } from '@/components/forms/RHFSelect';
import { FORM_LABELS, FORM_PLACEHOLDERS } from '../constants/branch.constants';
import type { UseFormReturn } from 'react-hook-form';
interface BranchFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  form: UseFormReturn<any>;
  isEditing: boolean;
  error: string | null;
  success: string | null;
  isPending: boolean;
}

export function BranchFormModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  isEditing,
  error,
  success,
  isPending,
}: BranchFormModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      footer={null}
      size="md"
    >
      <FormContainer
        title={isEditing ? 'Edit Branch' : 'Add New Branch'}
        error={error}
        success={success}
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          onSubmit();
        }}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onSubmit} disabled={isPending}>
              {isPending ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        }
      >

        <div>
          <RHFInput methods={form} name="name" placeholder={FORM_PLACEHOLDERS.name} label={FORM_LABELS.name} />
        </div>

        <div>
          <RHFInput methods={form} name="code" placeholder={FORM_PLACEHOLDERS.code} label={FORM_LABELS.code} />
        </div>

        <div>
          <RHFInput methods={form} name="address" placeholder={FORM_PLACEHOLDERS.address} label={FORM_LABELS.address} />
        </div>

        <div>
          <RHFInput methods={form} name="phone" placeholder={FORM_PLACEHOLDERS.phone} label={FORM_LABELS.phone} />
        </div>

        <div>
          <RHFInput methods={form} name="email" placeholder="e.g., branch@example.com" label={FORM_LABELS.email} />
        </div>

        <div>
          <RHFSelect methods={form} name="is_active" placeholder="Select status" label={FORM_LABELS.is_active} options={[
            { label: 'Active', value: true as any },
            { label: 'Inactive', value: false as any },
          ]} />
        </div>
      </FormContainer>
    </Modal>
  );
}
