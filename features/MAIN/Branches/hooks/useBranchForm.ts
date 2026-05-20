import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateBranch, useUpdateBranch } from './branches';
import { DEFAULT_FORM_VALUES } from '../constants/branch.constants';
import type { Branch, CreateBranchInput, UpdateBranchInput } from '../types/branch.types';

/**
 * Zod schema for branch form validation
 */
const branchSchema = z.object({
  name: z.string().min(1, 'Branch name is required').max(255, 'Branch name must be less than 255 characters'),
  code: z.string().min(1, 'Branch code is required').max(50, 'Branch code must be less than 50 characters'),
  address: z.string().optional(),
  phone: z.string().max(20, 'Phone must be less than 20 characters').optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  is_active: z.boolean().optional(),
});

export type BranchFormData = z.infer<typeof branchSchema>;

interface UseBranchFormProps {
  mode: 'create' | 'edit';
  organizationId: number;
  branch?: Branch;
  onSuccess?: () => void;
}

interface UseBranchFormReturn {
  form: {
    register: any;
    handleSubmit: any;
    formState: {
      errors: any;
      isDirty: boolean;
    };
    reset: () => void;
    setValue: any;
    watch: any;
  };
  error: string | null;
  success: string | null;
  isPending: boolean;
  handleSubmit: () => void;
  handleReset: () => void;
}

/**
 * Form logic hook for Branch form
 * Handles validation, submission, and error/success states
 */
export function useBranchForm({
  mode,
  organizationId,
  branch,
  onSuccess,
}: UseBranchFormProps): UseBranchFormReturn {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createMutation = useCreateBranch();
  const updateMutation = useUpdateBranch();

  const form = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'onChange',
  });

  // Populate form in edit mode
  useEffect(() => {
    if (mode === 'edit' && branch) {
      form.reset({
        name: branch.name,
        code: branch.code,
        address: branch.address || '',
        phone: branch.phone || '',
        email: branch.email || '',
        is_active: branch.is_active,
      });
    }
  }, [mode, branch, form]);

  const onSubmit = useCallback(
    async (data: BranchFormData) => {
      setError(null);
      setSuccess(null);

      try {
        if (mode === 'create') {
          await createMutation.mutateAsync({
            organizationId,
            data: data as CreateBranchInput,
          });
          setSuccess('Branch created successfully');
        } else if (mode === 'edit' && branch) {
          await updateMutation.mutateAsync({
            organizationId,
            branchId: branch.id,
            data: data as UpdateBranchInput,
          });
          setSuccess('Branch updated successfully');
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
    [mode, organizationId, branch, createMutation, updateMutation, form, onSuccess]
  );

  const handleReset = useCallback(() => {
    form.reset(mode === 'edit' && branch ? {
      name: branch.name,
      code: branch.code,
      address: branch.address || '',
      phone: branch.phone || '',
      email: branch.email || '',
      is_active: branch.is_active,
    } : DEFAULT_FORM_VALUES);
    setError(null);
    setSuccess(null);
  }, [form, mode, branch]);

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
