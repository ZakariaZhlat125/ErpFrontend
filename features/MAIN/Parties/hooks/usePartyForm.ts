import { useState, useEffect, useCallback } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateParty, useUpdateParty } from './parties';
import { DEFAULT_FORM_VALUES } from '../constants/party.constants';
import type { Party, CreatePartyInput, UpdatePartyInput } from '../types/party.types';
import { partySchema, type PartyFormData } from '../schemas/parties.schema';

interface UsePartyFormProps {
  mode: 'create' | 'edit';
  party?: Party;
  organizationId?: number;
  onSuccess?: () => void;
}

interface UsePartyFormReturn {
  form: UseFormReturn<PartyFormData>;
  error: string | null;
  success: string | null;
  isPending: boolean;
  handleSubmit: () => void;
  handleReset: () => void;
}

/**
 * Form logic hook for Party form
 * Handles validation, submission, and error/success states
 */
export function usePartyForm({
  mode,
  party,
  organizationId,
  onSuccess,
}: UsePartyFormProps): UsePartyFormReturn {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createMutation = useCreateParty();
  const updateMutation = useUpdateParty();

  const form = useForm<PartyFormData>({
    resolver: zodResolver(partySchema) as any,
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'onBlur',
  });

  // Populate form in edit mode
  useEffect(() => {
    if (mode === 'edit' && party) {
      form.reset({
        code: party.code,
        type: party.type,
        display_name: party.display_name,
        legal_name: party.legal_name || '',
        tax_number: party.tax_number || '',
        currency_id: party.currency_id,
        notes: party.notes || '',
        is_active: party.is_active,
        roles: [],
      });
    }
  }, [mode, party, form]);

  const onSubmit = useCallback(
    async (data: PartyFormData) => {
      setError(null);
      setSuccess(null);

      try {
        if (mode === 'create') {
          if (!organizationId) {
            throw new Error('Organization ID is required');
          }
          await createMutation.mutateAsync({
            organizationId,
            data: data as CreatePartyInput,
          });
          setSuccess('Party created successfully');
        } else if (mode === 'edit' && party) {
          if (!organizationId) {
            throw new Error('Organization ID is required');
          }
          await updateMutation.mutateAsync({
            organizationId,
            partyId: party.id,
            data: data as UpdatePartyInput,
          });
          setSuccess('Party updated successfully');
        }

        form.reset(DEFAULT_FORM_VALUES);

        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 1000);
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || 'An error occurred. Please try again.');
      }
    },
    [mode, party, organizationId, createMutation, updateMutation, form, onSuccess]
  );

  const handleReset = useCallback(() => {
    form.reset(mode === 'edit' && party ? {
      code: party.code,
      type: party.type,
      display_name: party.display_name,
      legal_name: party.legal_name || '',
      tax_number: party.tax_number || '',
      currency_id: party.currency_id,
      notes: party.notes || '',
      is_active: party.is_active,
      roles: [],
    } : DEFAULT_FORM_VALUES);
    setError(null);
    setSuccess(null);
  }, [form, mode, party]);

  const handleSubmit = useCallback(() => {
    form.handleSubmit(onSubmit)();
  }, [form, onSubmit]);

  return {
    form,
    error,
    success,
    isPending: createMutation.isPending || updateMutation.isPending,
    handleSubmit,
    handleReset,
  };
}
