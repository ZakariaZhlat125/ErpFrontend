import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateOrganization, useUpdateOrganization } from './useOrganizations';
import { Organization, CreateOrganizationInput, UpdateOrganizationInput } from '../types/organization.types';
import { DEFAULT_ORGANIZATION_VALUES } from '../constants/organization.constants';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  legal_name: z.string().min(1, 'Legal name is required'),
  tax_number: z.string().min(1, 'Tax number is required'),
  base_currency_id: z.number().min(1, 'Base currency is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  locale: z.string().min(1, 'Locale is required'),
  status: z.enum(['active', 'inactive', 'pending']),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email address'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
});

export type OrganizationFormValues = z.infer<typeof schema>;

const defaultValues: OrganizationFormValues = DEFAULT_ORGANIZATION_VALUES as OrganizationFormValues;

interface UseOrganizationFormOptions {
  mode: 'create' | 'edit';
  organization?: Organization | null;
  onSuccess?: () => void;
}

export function useOrganizationForm({ mode, organization, onSuccess }: UseOrganizationFormOptions) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createOrganization = useCreateOrganization();
  const updateOrganization = useUpdateOrganization();

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  const { reset } = form;

  useEffect(() => {
    if (mode === 'edit' && organization) {
      reset({
        name: organization.name,
        legal_name: organization.legal_name,
        tax_number: organization.tax_number,
        base_currency_id: organization.base_currency_id,
        timezone: organization.timezone,
        locale: organization.locale,
        status: organization.status,
        address: organization.address,
        phone: organization.phone,
        email: organization.email,
        website: organization.website,
      });
    } else if (mode === 'create') {
      reset(defaultValues);
    }
  }, [mode, organization, reset]);

  const handleSubmit = async (values: OrganizationFormValues) => {
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'create') {
        const data: CreateOrganizationInput = {
          name: values.name,
          legal_name: values.legal_name,
          tax_number: values.tax_number,
          base_currency_id: values.base_currency_id,
          timezone: values.timezone,
          locale: values.locale,
          status: values.status,
          address: values.address,
          phone: values.phone,
          email: values.email,
          website: values.website || undefined,
        };

        await createOrganization.mutateAsync(data);
        setSuccess('Organization created successfully!');
        
        reset();
      } else if (mode === 'edit' && organization) {
        const data: UpdateOrganizationInput = {
          name: values.name,
          legal_name: values.legal_name,
          tax_number: values.tax_number,
          base_currency_id: values.base_currency_id,
          timezone: values.timezone,
          locale: values.locale,
          status: values.status,
          address: values.address,
          phone: values.phone,
          email: values.email,
          website: values.website || undefined,
        };

        await updateOrganization.mutateAsync({ id: organization.id, data });
        setSuccess('Organization updated successfully!');
      }

      setTimeout(() => {
        onSuccess?.();
      }, 1000);
    } catch (err: any) {
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} organization:`, err);
      const errorMessage = err?.response?.data?.message || err?.message || `Failed to ${mode === 'create' ? 'create' : 'update'} organization`;
      setError(errorMessage);
    }
  };

  const handleReset = () => {
    reset();
    setError(null);
    setSuccess(null);
  };

  const isPending = mode === 'create' ? createOrganization.isPending : updateOrganization.isPending;

  return {
    form,
    error,
    success,
    isPending,
    handleSubmit,
    handleReset,
  };
}
