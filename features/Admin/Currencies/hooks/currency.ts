"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { currencyApi } from '../services/currency.service';
import { 
  Currency, 
  CreateCurrencyInput, 
  UpdateCurrencyInput, 
  CurrencyFilters, 
  PaginatedResult,
  CurrencyConvertRequest,
  UpdateExchangeRateRequest,
} from '../types/currency.types';
import { QUERY_KEY } from '../constants/currency.constants';

/**
 * Get all currencies with optional filters
 */
export const useCurrenciesQuery = (filters?: CurrencyFilters) => {
  return useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: () => currencyApi.getAll(filters),
  });
};

/**
 * Get a single currency by ID
 */
export const useCurrencyQuery = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => currencyApi.getById(id),
    enabled: !!id,
  });
};

/**
 * Create a new currency
 */
export const useCreateCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCurrencyInput) => currencyApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

/**
 * Update an existing currency
 */
export const useUpdateCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<UpdateCurrencyInput> }) => 
      currencyApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
};

/**
 * Delete a currency
 */
export const useDeleteCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => currencyApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

/**
 * Set a currency as base
 */
export const useSetBaseCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => currencyApi.setAsBase(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

/**
 * Update currency exchange rate
 */
export const useUpdateExchangeRate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateExchangeRateRequest }) => 
      currencyApi.updateExchangeRate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
};

/**
 * Toggle currency active status
 */
export const useToggleCurrencyActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => currencyApi.toggleActive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
