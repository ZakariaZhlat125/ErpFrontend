'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { FormContainer } from '@/components/forms/FormContainer';
import { RHFInput } from '@/components/forms/RHFInput';
import { RHFSelect } from '@/components/forms/RHFSelect';
import { useOrganizationForm, OrganizationFormValues } from '../../hooks/useOrganizationForm';

const currencyOptions = [
  { label: 'USD - US Dollar', value: '1' },
  { label: 'EUR - Euro', value: '2' },
  { label: 'GBP - British Pound', value: '3' },
  { label: 'SAR - Saudi Riyal', value: '4' },
  { label: 'AED - UAE Dirham', value: '5' },
];

const timezoneOptions = [
  { label: 'UTC', value: 'UTC' },
  { label: 'America/New_York', value: 'America/New_York' },
  { label: 'Europe/London', value: 'Europe/London' },
  { label: 'Asia/Riyadh', value: 'Asia/Riyadh' },
  { label: 'Asia/Dubai', value: 'Asia/Dubai' },
];

const localeOptions = [
  { label: 'English', value: 'en' },
  { label: 'Arabic', value: 'ar' },
  { label: 'French', value: 'fr' },
];

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
];

interface CreateOrganizationFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateOrganizationForm({ open, onClose, onSuccess }: CreateOrganizationFormProps) {
  const { tokens } = useTheme();
  
  const {
    form,
    error,
    success,
    isPending,
    handleSubmit,
    handleReset,
  } = useOrganizationForm({
    mode: 'create',
    onSuccess: () => {
      setTimeout(() => {
        onClose();
        onSuccess?.();
      }, 1000);
    },
  });

  const { control } = form;

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit(handleSubmit)(e);
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleCancel}
      footer={null}
       height="100%"
      size="lg"
      title=""
    >
      <FormContainer
        title="Create New Organization"
        // subtitle="Fill in the details below to create a new organization"
        error={error}
        success={success}
        onSubmit={onSubmit}
      >
        <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  methods={form}
                  name="name"
                  type="text"
                  label="Organization Name"
                  placeholder="enter text"
                  required
                />

                <RHFInput
                  methods={form}
                  name="legal_name"
                  type="text"
                  label="Legal Name"
                  required
                /> 

                <RHFInput
                  methods={form}
                  name="tax_number"
                  type="text"
                  label="Tax Number"
                  required
                />

                <RHFSelect
                  methods={form}
                  name="base_currency_id"
                  label="Base Currency"
                  required
                  options={currencyOptions}
                />
              </div>
            </div>

            {/* Regional Settings */}
            <div>
              <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
                Regional Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RHFSelect
                  methods={form}
                  name="timezone"
                  label="Timezone"
                  required
                  options={timezoneOptions}
                />

                <RHFSelect
                  methods={form}
                  name="locale"
                  label="Locale"
                  required
                  options={localeOptions}
                />

                <RHFSelect
                  methods={form}
                  name="status"
                  label="Status"
                  required
                  options={statusOptions}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  methods={form}
                  name="address"
                  type="text"
                  label="Address"
                  required
                />

                <RHFInput
                  methods={form}
                  name="phone"
                  type="text"
                  label="Phone"
                  required
                />

                <RHFInput
                  methods={form}
                  name="email"
                  type="email"
                  label="Email"
                  required
                />

                <RHFInput
                  methods={form}
                  name="website"
                  type="text"
                  label="Website"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6" style={{ borderTop: `1px solid ${tokens.border}` }}>
              <Button
                variant="secondary"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                htmlType="submit"
                isLoading={isPending}
              >
                Create Organization
              </Button>
            </div>
          </div>
        </FormContainer>
    </Modal>
  );
}
