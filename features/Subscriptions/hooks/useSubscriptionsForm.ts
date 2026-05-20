"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateSubscription, useUpdateSubscription } from './subscriptions';
import { Subscription, CreateSubscriptionInput, UpdateSubscriptionInput } from '../types/subscriptions.types';
import { DEFAULT_SUBSCRIPTION } from '../constants/subscriptions.constants';
import { subscriptionSchema, SubscriptionFormData } from '../schemas/subscriptions.schema';

type FormMode = 'create' | 'edit';

export function useSubscriptionsForm(mode: FormMode, entity?: Subscription, onSuccess?: () => void) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createMutation = useCreateSubscription();
  const updateMutation = useUpdateSubscription();

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema) as any,
    mode: 'onBlur',
    defaultValues: mode === 'edit' && entity ? {
      plan_id: entity.plan_id,
      billing_cycle: entity.billing_cycle,
      auto_renew: entity.auto_renew,
      payment_method: entity.payment_method || '',
    } : DEFAULT_SUBSCRIPTION,
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = form.handleSubmit((data) => {
    if (mode === 'create') {
      createMutation.mutate(data as CreateSubscriptionInput, {
        onSuccess: () => {
          form.reset(DEFAULT_SUBSCRIPTION);
          setIsModalOpen(false);
          onSuccess?.();
        },
      });
    } else if (mode === 'edit' && entity) {
      updateMutation.mutate(
        { id: entity.id, data: data as Partial<UpdateSubscriptionInput> },
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
        plan_id: entity.plan_id,
        billing_cycle: entity.billing_cycle,
        auto_renew: entity.auto_renew,
        payment_method: entity.payment_method || '',
      });
    } else {
      form.reset(DEFAULT_SUBSCRIPTION);
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
