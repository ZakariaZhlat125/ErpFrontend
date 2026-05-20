import { Button, Modal } from '@/components/ui';
import { FormContainer } from '@/components/forms/FormContainer';
import { RHFInput } from '@/components/forms/RHFInput';
import { RHFSelect } from '@/components/forms/RHFSelect';
import { RHFTextArea } from '@/components/forms/RHFTextArea';
import { FORM_LABELS, FORM_PLACEHOLDERS, PARTY_TYPE_OPTIONS } from '../constants/party.constants';
import type { PartyFormData } from '../hooks/usePartyForm';
import type { UseFormReturn } from 'react-hook-form';

interface PartyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  form: UseFormReturn<any>;
  isEditing: boolean;
  error: string | null;
  success: string | null;
  isPending: boolean;
}

export function PartyFormModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  isEditing,
  error,
  success,
  isPending,
}: PartyFormModalProps) {
  return (

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      footer={null}
      size="md"
    >
      <FormContainer
        title={isEditing ? 'Edit Party' : 'Add New Party'}
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
          <RHFInput methods={form} name="code" placeholder={FORM_PLACEHOLDERS.code} label={FORM_LABELS.code} />
        </div>

        <div>
          <RHFSelect methods={form} name="type" placeholder="Select type" label={FORM_LABELS.type} options={[...PARTY_TYPE_OPTIONS]} />
        </div>

        <div>
          <RHFInput methods={form} name="display_name" placeholder={FORM_PLACEHOLDERS.display_name} label={FORM_LABELS.display_name} />
        </div>

        <div>
          <RHFInput methods={form} name="legal_name" placeholder={FORM_PLACEHOLDERS.legal_name} label={FORM_LABELS.legal_name} />
        </div>

        <div>
          <RHFInput methods={form} name="tax_number" placeholder={FORM_PLACEHOLDERS.tax_number} label={FORM_LABELS.tax_number} />
        </div>

        <div>
          <RHFTextArea methods={form} name="notes" placeholder={FORM_PLACEHOLDERS.notes} label={FORM_LABELS.notes} rows={3} />
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
