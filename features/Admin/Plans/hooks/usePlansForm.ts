"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreatePlan, useUpdatePlan } from './plans';
import { Plan, CreatePlanInput, UpdatePlanInput } from '../types/plans.types';
import { DEFAULT_PLAN } from '../constants/plans.constants';

type FormMode = 'create' | 'edit';

export function usePlansForm(mode: FormMode, entity?: Plan, onSuccess?: () => void) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createMutation = useCreatePlan();
  const updateMutation = useUpdatePlan();

  const form = useForm<CreatePlanInput | UpdatePlanInput>({
    defaultValues: mode === 'edit' && entity ? {
      name: entity.name,
      description: entity.description,
      price: entity.price,
      billing_cycle: entity.billing_cycle,
      max_users: entity.max_users,
      max_branches: entity.max_branches,
      features: entity.features,
      is_active: entity.is_active,
      is_popular: entity.is_popular,
      sort_order: entity.sort_order,
    } : DEFAULT_PLAN,
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = form.handleSubmit((data) => {
    if (mode === 'create') {
      createMutation.mutate(data as CreatePlanInput, {
        onSuccess: () => {
          form.reset(DEFAULT_PLAN);
          setIsModalOpen(false);
          onSuccess?.();
        },
      });
    } else if (mode === 'edit' && entity) {
      updateMutation.mutate(
        { id: entity.id, data: data as Partial<UpdatePlanInput> },
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
        name: entity.name,
        description: entity.description,
        price: entity.price,
        billing_cycle: entity.billing_cycle,
        max_users: entity.max_users,
        max_branches: entity.max_branches,
        features: entity.features,
        is_active: entity.is_active,
        is_popular: entity.is_popular,
        sort_order: entity.sort_order,
      });
    } else {
      form.reset(DEFAULT_PLAN);
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
