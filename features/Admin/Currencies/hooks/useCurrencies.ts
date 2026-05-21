"use client";
import { useState } from 'react';
import { 
  useCurrenciesQuery, 
  useDeleteCurrency, 
  useSetBaseCurrency, 
  useToggleCurrencyActive 
} from './currency';
import { Currency, CurrencyFilters } from '../types/currency.types';

export function useCurrencies() {
  const [filters, setFilters] = useState<CurrencyFilters>({ page: 1, per_page: 15 });
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [rateCurrency, setRateCurrency] = useState<Currency | null>(null);

  const { data: result, isLoading, error, refetch } = useCurrenciesQuery(filters);
  const deleteCurrencyMutation = useDeleteCurrency();
  const setBaseMutation = useSetBaseCurrency();
  const toggleActiveMutation = useToggleCurrencyActive();

  const currencies = result?.data || [];
  const pagination = result?.pagination;

  const totalCurrencies = pagination?.total || 0;
  const activeCurrencies = currencies.filter((c: Currency) => c.is_active).length;
  const baseCurrencies = currencies.filter((c: Currency) => c.is_base).length;
  const inactiveCurrencies = currencies.filter((c: Currency) => !c.is_active).length;

  const handleDelete = () => {
    if (selectedCurrency) {
      deleteCurrencyMutation.mutate(selectedCurrency.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedCurrency(null);
        },
      });
    }
  };

  const handleSetBase = (currency: Currency) => {
    if (!currency.is_base) {
      setBaseMutation.mutate(currency.id);
    }
  };

  const handleToggleActive = (currency: Currency) => {
    toggleActiveMutation.mutate(currency.id);
  };

  const openDeleteModal = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedCurrency(null);
    setIsDeleteModalOpen(false);
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (currency: Currency) => setEditingCurrency(currency);
  const closeEditModal = () => setEditingCurrency(null);

  const openRateModal = (currency: Currency) => {
    setRateCurrency(currency);
    setIsRateModalOpen(true);
  };
  const closeRateModal = () => {
    setRateCurrency(null);
    setIsRateModalOpen(false);
  };

  return {
    // Data
    currencies,
    pagination,
    totalCurrencies,
    activeCurrencies,
    baseCurrencies,
    inactiveCurrencies,
    selectedCurrency,
    
    // Loading states
    isLoading,
    isDeleting: deleteCurrencyMutation.isPending,
    isSettingBase: setBaseMutation.isPending,
    isTogglingActive: toggleActiveMutation.isPending,
    
    // Error
    error,
    
    // Filters & pagination
    filters,
    setFilters,
    setPage: (page: number) => setFilters((f) => ({ ...f, page })),
    setPerPage: (per_page: number) => setFilters((f) => ({ ...f, per_page, page: 1 })),
    
    // Modal states
    isDeleteModalOpen,
    isCreateModalOpen,
    editingCurrency,
    isRateModalOpen,
    rateCurrency,
    
    // Handlers
    handleDelete,
    handleSetBase,
    handleToggleActive,
    openDeleteModal,
    closeDeleteModal,
    setSelectedCurrency,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openRateModal,
    closeRateModal,
    setIsCreateModalOpen,
    setIsDeleteModalOpen,
    setIsRateModalOpen,
    setEditingCurrency,
    setRateCurrency,
    
    // Refetch
    refetch,
  };
}
