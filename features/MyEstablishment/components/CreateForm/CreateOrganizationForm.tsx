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
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('myEstablishment');
  
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
        title={t('modalTitle')}
        // subtitle="Fill in the details below to create a new organization"
        error={error}
        success={success}
        onSubmit={onSubmit}
      >
        <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
                {t('sections.basicInfo')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  methods={form}
                  name="name"
                  type="text"
                  label={t('form.name')}
                  placeholder={t('form.namePlaceholder')}
                  required
                />

                <RHFInput
                  methods={form}
                  name="legal_name"
                  type="text"
                  label={t('form.legalName')}
                  required
                /> 

                <RHFInput
                  methods={form}
                  name="tax_number"
                  type="text"
                  label={t('form.taxNumber')}
                  required
                />

                <RHFSelect
                  methods={form}
                  name="base_currency_id"
                  label={t('form.baseCurrency')}
                  required
                  options={currencyOptions}
                />
              </div>
            </div>

            {/* Regional Settings */}
            <div>
              <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
                {t('sections.regionalSettings')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RHFSelect
                  methods={form}
                  name="timezone"
                  label={t('form.timezone')}
                  required
                  options={timezoneOptions}
                />

                <RHFSelect
                  methods={form}
                  name="locale"
                  label={t('form.locale')}
                  required
                  options={localeOptions}
                />

                <RHFSelect
                  methods={form}
                  name="status"
                  label={t('form.status')}
                  required
                  options={statusOptions}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4" style={{ color: tokens.text }}>
                {t('sections.contactInfo')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  methods={form}
                  name="address"
                  type="text"
                  label={t('form.address')}
                  required
                />

                <RHFInput
                  methods={form}
                  name="phone"
                  type="text"
                  label={t('form.phone')}
                  required
                />

                <RHFInput
                  methods={form}
                  name="email"
                  type="email"
                  label={t('form.email')}
                  required
                />

                <RHFInput
                  methods={form}
                  name="website"
                  type="text"
                  label={t('form.website')}
                  placeholder={t('form.websitePlaceholder')}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6" style={{ borderTop: `1px solid ${tokens.border}` }}>
              <Button
                variant="secondary"
                onClick={handleReset}
              >
                {t('reset')}
              </Button>
              <Button
                variant="primary"
                htmlType="submit"
                isLoading={isPending}
              >
                {t('submit')}
              </Button>
            </div>
          </div>
        </FormContainer>
    </Modal>
  );
}
