"use client";

import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateSubscription, useUpdateSubscription, useSubscribeUser } from './subscriptions';
import { Subscription, CreateSubscriptionInput, UpdateSubscriptionInput, SubscribeUserInput } from '../types/subscriptions.types';
import { DEFAULT_SUBSCRIPTION } from '../constants/subscriptions.constants';
import { subscriptionSchema, SubscriptionFormData } from '../schemas/subscriptions.schema';

type FormMode = 'create' | 'edit' | 'subscribe-user';

type FormData = CreateSubscriptionInput | UpdateSubscriptionInput | SubscribeUserInput;

interface UseSubscriptionsFormReturn {
  form: UseFormReturn<FormData>;
  isModalOpen: boolean;
  isPending: boolean;
  handleSubmit: () => void;
  handleReset: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export function useSubscriptionsForm(
  mode: FormMode, 
  entity?: Subscription, 
  onSuccess?: () => void
): UseSubscriptionsFormReturn {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createMutation = useCreateSubscription();
  const updateMutation = useUpdateSubscription();
  const subscribeUserMutation = useSubscribeUser();

  const getDefaultValues = (): FormData => {
    if (mode === 'edit' && entity) {
      return {
        plan_id: entity.plan_id,
        billing_cycle: entity.billing_cycle,
        auto_renew: entity.auto_renew,
        payment_method: entity.payment_method || '',
      } as UpdateSubscriptionInput;
    }
    if (mode === 'subscribe-user') {
      return {
        user_id: '',
        plan_id: '',
        billing_cycle: 'monthly',
        auto_renew: true,
        payment_method: '',
        start_date: '',
      } as SubscribeUserInput;
    }
    // Generate dates for default subscription
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    return {
      ...DEFAULT_SUBSCRIPTION,
      start_date: today,
      end_date: nextMonth.toISOString().split('T')[0],
      status: 'pending',
      price_paid: 0,
    } as CreateSubscriptionInput;
  };

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema) as any,
    mode: 'onBlur',
    defaultValues: getDefaultValues() as SubscriptionFormData,
  });

  const isPending = createMutation.isPending || updateMutation.isPending || subscribeUserMutation.isPending;

  const handleSubmit = form.handleSubmit((data) => {
    if (mode === 'create') {
      createMutation.mutate(data as CreateSubscriptionInput, {
        onSuccess: () => {
          const today = new Date().toISOString().split('T')[0];
          const nextMonth = new Date();
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          
          form.reset({
            ...DEFAULT_SUBSCRIPTION,
            start_date: today,
            end_date: nextMonth.toISOString().split('T')[0],
            status: 'pending',
            price_paid: 0,
          });
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
    } else if (mode === 'subscribe-user') {
      subscribeUserMutation.mutate(data as SubscribeUserInput, {
        onSuccess: () => {
          form.reset({
            user_id: '',
            plan_id: '',
            billing_cycle: 'monthly',
            auto_renew: true,
            payment_method: '',
            start_date: '',
          });
          setIsModalOpen(false);
          onSuccess?.();
        },
      });
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
    } else if (mode === 'subscribe-user') {
      form.reset({
        user_id: '',
        plan_id: '',
        billing_cycle: 'monthly',
        auto_renew: true,
        payment_method: '',
        start_date: '',
      });
    } else {
      const today = new Date().toISOString().split('T')[0];
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      form.reset({
        ...DEFAULT_SUBSCRIPTION,
        start_date: today,
        end_date: nextMonth.toISOString().split('T')[0],
        status: 'pending',
        price_paid: 0,
      });
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
