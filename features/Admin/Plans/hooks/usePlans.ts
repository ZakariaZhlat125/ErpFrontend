"use client";
import { useState } from 'react';
import { usePlans as usePlansData, useDeletePlan, useTogglePlanActive, useTogglePlanPopular } from './plans';
import { Plan, PlanFilters, PaginationMeta } from '../types/plans.types';

export function usePlans() {
  const [filters, setFilters] = useState<PlanFilters>({ page: 1, per_page: 15 });
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [pendingTogglePlan, setPendingTogglePlan] = useState<Plan | null>(null);

  const { data: result, isLoading, error, refetch } = usePlansData(filters);
  const deletePlanMutation = useDeletePlan();
  const toggleActiveMutation = useTogglePlanActive();
  const togglePopularMutation = useTogglePlanPopular();

  const plans = result?.data || [];
  const pagination = result?.pagination;

  const totalPlans = pagination?.total || 0;
  const activePlans = plans.filter((p: Plan) => p.is_active).length;
  const popularPlans = plans.filter((p: Plan) => p.is_popular).length;
  const inactivePlans = plans.filter((p: Plan) => !p.is_active).length;

  const handleDelete = () => {
    if (selectedPlan) {
      deletePlanMutation.mutate(selectedPlan.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedPlan(null);
        },
      });
    }
  };

  const openToggleActiveModal = (plan: Plan) => setPendingTogglePlan(plan);
  const closeToggleActiveModal = () => setPendingTogglePlan(null);

  const handleToggleActive = () => {
    if (!pendingTogglePlan) return;
    toggleActiveMutation.mutate(
      { id: pendingTogglePlan.id, is_active: !pendingTogglePlan.is_active },
      {
        onSuccess: () => {
          setPendingTogglePlan(null);
          refetch();
        },
      }
    );
  };

  const handleTogglePopular = (plan: Plan) => {
    togglePopularMutation.mutate(
      { id: plan.id, is_popular: !plan.is_popular },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const openDeleteModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedPlan(null);
    setIsDeleteModalOpen(false);
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (plan: Plan) => setEditingPlan(plan);
  const closeEditModal = () => setEditingPlan(null);

  return {
    // Data
    plans,
    pagination,
    totalPlans,
    activePlans,
    popularPlans,
    inactivePlans,
    selectedPlan,
    
    // Loading states
    isLoading,
    isDeleting: deletePlanMutation.isPending,
    isTogglingActive: toggleActiveMutation.isPending,
    isTogglingPopular: togglePopularMutation.isPending,
    
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
    editingPlan,
    pendingTogglePlan,
    
    // Handlers
    handleDelete,
    handleToggleActive,
    handleTogglePopular,
    openToggleActiveModal,
    closeToggleActiveModal,
    openDeleteModal,
    closeDeleteModal,
    setSelectedPlan,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    
    // Refetch
    refetch,
  };
}
