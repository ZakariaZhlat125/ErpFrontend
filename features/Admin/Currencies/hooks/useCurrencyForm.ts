"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCurrency, useUpdateCurrency, useUpdateExchangeRate } from './currency';
import { Currency, CreateCurrencyInput, UpdateCurrencyInput, UpdateExchangeRateRequest } from '../types/currency.types';
import { DEFAULT_CURRENCY } from '../constants/currency.constants';
import { currencySchema, updateExchangeRateSchema, CurrencyFormData, UpdateExchangeRateFormData } from '../schemas/currency.schema';

type FormMode = 'create' | 'edit';

export function useCurrencyForm(mode: FormMode, entity?: Currency, onSuccess?: () => void) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createMutation = useCreateCurrency();
  const updateMutation = useUpdateCurrency();

  const form = useForm<CurrencyFormData>({
    resolver: zodResolver(currencySchema) as any,
    mode: 'onBlur',
    defaultValues: mode === 'edit' && entity ? {
      code: entity.code,
      name: entity.name,
      symbol: entity.symbol,
      decimal_separator: entity.decimal_separator,
      thousands_separator: entity.thousands_separator,
      decimal_places: entity.decimal_places,
      exchange_rate: entity.exchange_rate,
      is_active: entity.is_active,
    } : DEFAULT_CURRENCY,
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = form.handleSubmit((data) => {
    if (mode === 'create') {
      createMutation.mutate(data as CreateCurrencyInput, {
        onSuccess: () => {
          form.reset(DEFAULT_CURRENCY);
          setIsModalOpen(false);
          onSuccess?.();
        },
      });
    } else if (mode === 'edit' && entity) {
      updateMutation.mutate(
        { id: entity.id, data: data as Partial<UpdateCurrencyInput> },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            onSuccess?.();
          },
        }
      );
    }
  });

  const handleReset = () => {
    if (mode === 'edit' && entity) {
      form.reset({
        code: entity.code,
        name: entity.name,
        symbol: entity.symbol,
        decimal_separator: entity.decimal_separator,
        thousands_separator: entity.thousands_separator,
        decimal_places: entity.decimal_places,
        exchange_rate: entity.exchange_rate,
        is_active: entity.is_active,
      });
    } else {
      form.reset(DEFAULT_CURRENCY);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    handleReset();
  };

  return {
    form,
    isModalOpen,
    isPending,
    handleSubmit,
    handleReset,
    openModal,
    closeModal,
  };
}

export function useExchangeRateForm(currency: Currency | null, onSuccess?: () => void) {
  const updateRateMutation = useUpdateExchangeRate();

  const form = useForm<UpdateExchangeRateFormData>({
    resolver: zodResolver(updateExchangeRateSchema) as any,
    mode: 'onBlur',
    defaultValues: {
      exchange_rate: currency?.exchange_rate ?? 1,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (currency) {
      updateRateMutation.mutate(
        { id: currency.id, data: data as UpdateExchangeRateRequest },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    }
  });

  return {
    form,
    isPending: updateRateMutation.isPending,
    handleSubmit,
  };
}
