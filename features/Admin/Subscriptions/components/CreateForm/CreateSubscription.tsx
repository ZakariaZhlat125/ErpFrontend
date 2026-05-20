"use client";

import { useEffect } from "react";
import { FormContainer } from "@/components/forms/FormContainer";
import { RHFInput } from "@/components/forms/RHFInput";
import { RHFSelect } from "@/components/forms/RHFSelect";
import { RHFSwitch } from "@/components/forms/RHFSwitch";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import { useSubscriptionsForm } from "../../hooks/useSubscriptionsForm";
import { useSubscriptionFormData } from "../../hooks/useSubscriptionFormData";
import { BILLING_CYCLE_OPTIONS, PAYMENT_METHOD_OPTIONS, SUBSCRIPTION_STATUS_OPTIONS } from "../../constants/subscriptions.constants";
import type { Plan } from "@/features/Admin/Plans/types/plans.types";

interface CreateSubscriptionProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateSubscription({ isOpen, onClose, onSuccess }: CreateSubscriptionProps) {
  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };
  const { form, handleSubmit, isPending } = useSubscriptionsForm("create", undefined, handleSuccess);

  const { 
    userOptions, 
    planOptions, 
    plans,
    isLoadingUsers, 
    isLoadingPlans 
  } = useSubscriptionFormData();

  const billingOptions = BILLING_CYCLE_OPTIONS.map((o) => ({ value: o.value, label: o.label }));
  const paymentOptions = [
    { value: '', label: 'Select payment method' },
    ...PAYMENT_METHOD_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  ];
  const statusOptions = [
    { value: '', label: 'Select status' },
    ...SUBSCRIPTION_STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  ];

  // Watch form values for auto-calculations
  const watchPlanId = form.watch('plan_id');
  const watchBillingCycle = form.watch('billing_cycle');
  const watchStartDate = form.watch('start_date');

  // Auto-populate price when plan is selected
  useEffect(() => {
    if (watchPlanId && plans) {
      const selectedPlan = plans.find((p: Plan) => String(p.id) === watchPlanId);
      if (selectedPlan) {
        form.setValue('price_paid', selectedPlan.price);
      }
    }
  }, [watchPlanId, plans, form]);

  // Auto-calculate end date based on start date and billing cycle
  useEffect(() => {
    if (watchStartDate) {
      const start = new Date(watchStartDate);
      const end = new Date(start);
      
      if (watchBillingCycle === 'monthly') {
        end.setMonth(end.getMonth() + 1);
      } else if (watchBillingCycle === 'yearly') {
        end.setFullYear(end.getFullYear() + 1);
      }
      
      form.setValue('end_date', end.toISOString().split('T')[0]);
    }
  }, [watchStartDate, watchBillingCycle, form]);

  const footer = (
    <div className="flex justify-end gap-3 pt-2">
      <Button
        htmlType="submit"
        variant="primary"
        isLoading={isPending}
        disabled={isPending || isLoadingUsers || isLoadingPlans}
        onClick={handleSubmit}
      >
        Create Subscription
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Subscription"
      size="md"
      footer={null}
    >
    <FormContainer
      title=""
      onSubmit={handleSubmit}
      footer={footer}
    >
      <div className="grid grid-cols-1 gap-4">
        <RHFSelect
          methods={form}
          name="user_id"
          label="User"
          placeholder="Search and select user..."
          options={userOptions}
          showSearch
          filterOption={(input, option) =>
            String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          loading={isLoadingUsers}
        />

        <RHFSelect
          methods={form}
          name="plan_id"
          label="Plan"
          placeholder="Search and select plan..."
          options={planOptions}
          showSearch
          filterOption={(input, option) =>
            String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          loading={isLoadingPlans}
        />

        <RHFSelect
          methods={form}
          name="billing_cycle"
          label="Billing Cycle"
          options={billingOptions}
        />

        <RHFSelect
          methods={form}
          name="payment_method"
          label="Payment Method"
          options={paymentOptions}
        />

        <RHFSwitch
          methods={form}
          name="auto_renew"
          label="Auto Renew"
        />

        <RHFSelect
          methods={form}
          name="status"
          label="Status"
          options={statusOptions}
        />

        <RHFInput
          methods={form}
          name="start_date"
          label="Start Date"
          type="date"
        />

        <RHFInput
          methods={form}
          name="end_date"
          label="End Date"
          type="date"
        />

        <RHFInput
          methods={form}
          name="price_paid"
          label="Price Paid"
          type="number"
          placeholder="0.00"
        />
      </div>
    </FormContainer>
    </Modal>
  );
}
